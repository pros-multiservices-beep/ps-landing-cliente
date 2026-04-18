import React, { useEffect, useState, useCallback } from "react";
import axios from "axios";
import { toast } from "sonner";
import {
  RefreshCcw,
  MessageCircle,
  Loader2,
  CheckCircle2,
  Clock,
  Phone,
  Lock,
  LogOut,
} from "lucide-react";

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;
const API = `${BACKEND_URL}/api`;
const WHATSAPP_NUMBER = "56989675705";

// Clave de acceso simple (sólo UI gate). Para producción reemplazar por auth real.
const ADMIN_KEY = "prosolucion2025";

const STATUSES = [
  { key: "pendiente", label: "Pendiente", color: "#FFCC00", text: "#000" },
  { key: "contactado", label: "Contactado", color: "#00BFFF", text: "#000" },
  { key: "cerrado", label: "Cerrado", color: "#25D366", text: "#000" },
];

const buildLeadWhatsAppUrl = (lead) => {
  const msg = `Hola ${lead.nombre}, te contactamos desde ProSolución por tu solicitud de ${lead.servicio} en ${lead.comuna || "tu zona"}.`;
  const phone = (lead.telefono || "").replace(/\D/g, "");
  return `https://wa.me/${phone || WHATSAPP_NUMBER}?text=${encodeURIComponent(msg)}`;
};

const fmtDate = (iso) => {
  try {
    const d = new Date(iso);
    return d.toLocaleString("es-CL", {
      day: "2-digit",
      month: "2-digit",
      hour: "2-digit",
      minute: "2-digit",
    });
  } catch {
    return "-";
  }
};

const AdminPage = () => {
  const [pass, setPass] = useState(() => localStorage.getItem("ps_admin") || "");
  const [authed, setAuthed] = useState(() => localStorage.getItem("ps_admin") === ADMIN_KEY);
  const [loading, setLoading] = useState(false);
  const [leads, setLeads] = useState([]);
  const [stats, setStats] = useState({ total: 0, by_service: [] });
  const [filter, setFilter] = useState("all");

  const fetchData = useCallback(async () => {
    setLoading(true);
    try {
      const [r1, r2] = await Promise.all([
        axios.get(`${API}/leads?limit=200`),
        axios.get(`${API}/leads/stats`),
      ]);
      setLeads(r1.data || []);
      setStats(r2.data || { total: 0, by_service: [] });
    } catch (e) {
      console.error(e);
      toast.error("No se pudieron cargar los leads");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    if (!authed) return;
    fetchData();
    const id = setInterval(fetchData, 15000); // refresh cada 15s
    return () => clearInterval(id);
  }, [authed, fetchData]);

  const handleLogin = (e) => {
    e.preventDefault();
    if (pass === ADMIN_KEY) {
      localStorage.setItem("ps_admin", pass);
      setAuthed(true);
      toast.success("Bienvenido");
    } else {
      toast.error("Clave incorrecta");
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("ps_admin");
    setAuthed(false);
    setPass("");
  };

  const updateStatus = async (lead, newStatus) => {
    try {
      const res = await axios.patch(`${API}/leads/${lead.id}/status`, { status: newStatus });
      setLeads((prev) => prev.map((l) => (l.id === lead.id ? { ...l, ...res.data } : l)));
      toast.success(`Lead marcado como ${newStatus}`);
    } catch (e) {
      console.error(e);
      toast.error("No se pudo actualizar");
    }
  };

  const visibleLeads = filter === "all" ? leads : leads.filter((l) => (l.status || "pendiente") === filter);
  const pendingCount = leads.filter((l) => (l.status || "pendiente") === "pendiente").length;

  if (!authed) {
    return (
      <div className="min-h-screen bg-[#FFCC00] flex items-center justify-center p-4">
        <form
          onSubmit={handleLogin}
          data-testid="admin-login-form"
          className="bg-white brutal-border-thick brutal-shadow-lg p-6 md:p-8 w-full max-w-md flex flex-col gap-4"
        >
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 bg-black text-[#FFCC00] flex items-center justify-center font-black text-xl brutal-border">
              <Lock size={22} strokeWidth={2.5} />
            </div>
            <div>
              <h1 className="font-display text-2xl font-black uppercase">Admin</h1>
              <p className="text-xs font-bold uppercase tracking-widest text-zinc-600">
                ProSolución · Panel de leads
              </p>
            </div>
          </div>
          <label className="flex flex-col gap-1.5">
            <span className="text-[11px] font-black uppercase tracking-[0.18em]">Clave</span>
            <input
              data-testid="admin-pass-input"
              type="password"
              value={pass}
              onChange={(e) => setPass(e.target.value)}
              className="ps-input"
              placeholder="••••••••"
              autoFocus
            />
          </label>
          <button
            type="submit"
            data-testid="admin-login-btn"
            className="btn-primary"
          >
            Entrar
          </button>
          <p className="text-[11px] font-bold text-zinc-500 text-center">
            Clave de prueba: <span className="font-black">{ADMIN_KEY}</span>
          </p>
        </form>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#F4F4F5] pb-12">
      {/* Header */}
      <header className="bg-black text-white px-4 md:px-8 py-4 md:py-5 flex items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-[#FFCC00] text-black flex items-center justify-center font-black">
            P
          </div>
          <div>
            <h1 className="font-display text-lg md:text-xl font-black uppercase">
              Panel de Leads
            </h1>
            <p className="text-[11px] md:text-xs font-bold uppercase tracking-widest text-zinc-400">
              Actualización automática · cada 15s
            </p>
          </div>
        </div>
        <div className="flex items-center gap-2 md:gap-3">
          <button
            onClick={fetchData}
            data-testid="admin-refresh-btn"
            className="inline-flex items-center gap-2 bg-[#FFCC00] text-black px-3 py-2 brutal-border font-black uppercase text-xs tracking-widest"
          >
            {loading ? <Loader2 size={14} className="animate-spin" /> : <RefreshCcw size={14} strokeWidth={3} />}
            Refrescar
          </button>
          <button
            onClick={handleLogout}
            className="inline-flex items-center gap-2 bg-white text-black px-3 py-2 brutal-border font-black uppercase text-xs tracking-widest"
          >
            <LogOut size={14} strokeWidth={3} />
            Salir
          </button>
        </div>
      </header>

      {/* Stats */}
      <section className="px-4 md:px-8 py-6 grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4 max-w-6xl mx-auto">
        <StatCard label="Total leads" value={stats.total} color="#000" textColor="#FFCC00" />
        <StatCard label="Pendientes" value={pendingCount} color="#FFCC00" textColor="#000" />
        <StatCard
          label="Top servicio"
          value={stats.by_service?.[0]?.servicio || "-"}
          color="#25D366"
          textColor="#000"
          big
        />
        <StatCard
          label="Hoy"
          value={leads.filter((l) => new Date(l.created_at).toDateString() === new Date().toDateString()).length}
          color="#FF3B30"
          textColor="#fff"
        />
      </section>

      {/* Filters */}
      <section className="px-4 md:px-8 max-w-6xl mx-auto flex gap-2 flex-wrap mb-4">
        {[
          { k: "all", l: "Todos" },
          { k: "pendiente", l: "Pendientes" },
          { k: "contactado", l: "Contactados" },
          { k: "cerrado", l: "Cerrados" },
        ].map((f) => (
          <button
            key={f.k}
            onClick={() => setFilter(f.k)}
            data-testid={`admin-filter-${f.k}`}
            className={`px-3 py-2 text-xs font-black uppercase tracking-widest brutal-border ${
              filter === f.k ? "bg-black text-white" : "bg-white text-black"
            }`}
          >
            {f.l}
          </button>
        ))}
      </section>

      {/* Leads list */}
      <section className="px-4 md:px-8 max-w-6xl mx-auto">
        {loading && leads.length === 0 ? (
          <div className="flex items-center gap-2 text-sm font-bold">
            <Loader2 className="animate-spin" size={16} /> Cargando...
          </div>
        ) : visibleLeads.length === 0 ? (
          <div className="bg-white brutal-border-thick p-8 text-center">
            <p className="font-display text-xl font-black uppercase">Sin leads aún</p>
            <p className="text-sm font-bold text-zinc-600 mt-1">
              Cuando llegue una solicitud, aparecerá aquí al instante.
            </p>
          </div>
        ) : (
          <div className="grid gap-3 md:gap-4">
            {visibleLeads.map((lead) => {
              const current = lead.status || "pendiente";
              const cfg = STATUSES.find((s) => s.key === current) || STATUSES[0];
              return (
                <article
                  key={lead.id}
                  data-testid={`admin-lead-${lead.id}`}
                  className="bg-white brutal-border-thick brutal-shadow p-4 md:p-5 grid md:grid-cols-[1fr_auto] gap-4 items-start"
                >
                  <div className="flex flex-col gap-2">
                    <div className="flex items-center gap-2 flex-wrap">
                      <span
                        className="chip brutal-border"
                        style={{ background: cfg.color, color: cfg.text }}
                        data-testid={`lead-status-${lead.id}`}
                      >
                        {current === "pendiente" && <Clock size={12} strokeWidth={3} />}
                        {current === "contactado" && <Phone size={12} strokeWidth={3} />}
                        {current === "cerrado" && <CheckCircle2 size={12} strokeWidth={3} />}
                        {cfg.label}
                      </span>
                      <span className="chip">{lead.servicio}</span>
                      <span className="text-xs font-bold text-zinc-500 uppercase tracking-widest">
                        {fmtDate(lead.created_at)}
                      </span>
                    </div>
                    <h3 className="font-display text-xl md:text-2xl font-black uppercase leading-tight">
                      {lead.nombre}{" "}
                      <span className="text-zinc-500 font-bold normal-case">
                        · {lead.comuna || "sin comuna"}
                      </span>
                    </h3>
                    {lead.descripcion ? (
                      <p className="text-sm font-semibold text-zinc-700">
                        “{lead.descripcion}”
                      </p>
                    ) : null}
                    <p className="text-sm font-bold">
                      <span className="text-zinc-500 uppercase text-[11px] tracking-widest">
                        Tel:
                      </span>{" "}
                      <a
                        href={`tel:${lead.telefono}`}
                        className="underline decoration-2"
                        data-testid={`lead-phone-${lead.id}`}
                      >
                        {lead.telefono}
                      </a>
                    </p>
                  </div>

                  <div className="flex flex-col gap-2 md:min-w-[220px]">
                    <a
                      href={buildLeadWhatsAppUrl(lead)}
                      target="_blank"
                      rel="noopener noreferrer"
                      data-testid={`lead-whatsapp-${lead.id}`}
                      className="btn-primary"
                    >
                      <MessageCircle size={18} strokeWidth={2.5} />
                      WhatsApp al cliente
                    </a>
                    <div className="grid grid-cols-3 gap-1">
                      {STATUSES.map((s) => (
                        <button
                          key={s.key}
                          onClick={() => updateStatus(lead, s.key)}
                          data-testid={`lead-set-${s.key}-${lead.id}`}
                          className={`px-2 py-2 text-[10px] font-black uppercase tracking-widest brutal-border ${
                            current === s.key ? "bg-black text-white" : "bg-white text-black"
                          }`}
                        >
                          {s.label}
                        </button>
                      ))}
                    </div>
                  </div>
                </article>
              );
            })}
          </div>
        )}
      </section>
    </div>
  );
};

const StatCard = ({ label, value, color, textColor = "#000", big }) => (
  <div
    className="brutal-border-thick brutal-shadow p-4 flex flex-col gap-1"
    style={{ background: color, color: textColor }}
  >
    <span className="text-[11px] font-black uppercase tracking-[0.18em] opacity-80">
      {label}
    </span>
    <span className={`font-display font-black ${big ? "text-lg md:text-xl" : "text-2xl md:text-3xl"} leading-none`}>
      {value}
    </span>
  </div>
);

export default AdminPage;
