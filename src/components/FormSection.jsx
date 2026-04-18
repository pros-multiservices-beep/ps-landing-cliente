import React, { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "sonner";
import { Send, MessageCircle, Loader2 } from "lucide-react";
import { SERVICES_LIST } from "./Services";

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;
const API = `${BACKEND_URL}/api`;

const FormSection = React.forwardRef(({ defaultServicio = "", defaultComuna = "" }, ref) => {
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({
    nombre: "",
    servicio: defaultServicio || SERVICES_LIST[0],
    comuna: defaultComuna || "",
    descripcion: "",
    telefono: "",
  });

  const update = (k) => (e) => setForm((f) => ({ ...f, [k]: e.target.value }));

  useEffect(() => {
    if (defaultServicio) {
      setForm((f) => ({ ...f, servicio: defaultServicio }));
    }
  }, [defaultServicio]);

  useEffect(() => {
    if (defaultComuna) {
      setForm((f) => ({ ...f, comuna: defaultComuna }));
    }
  }, [defaultComuna]);

  const onSubmit = async (e) => {
    e.preventDefault();
    if (!form.nombre.trim() || !form.telefono.trim() || !form.comuna.trim()) {
      toast.error("Completa nombre, comuna y teléfono");
      return;
    }
    setLoading(true);
    try {
      const res = await axios.post(`${API}/leads`, form, { timeout: 15000 });
      toast.success("Solicitud enviada. Abriendo WhatsApp...");
      // Redirect to WhatsApp (open in new tab for desktop safety)
      const url = res.data.whatsapp_url;
      // Short delay so toast is visible
      setTimeout(() => {
        window.location.href = url;
      }, 600);
    } catch (err) {
      console.error(err);
      toast.error("No pudimos enviar. Usa el botón de WhatsApp directo.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <section
      ref={ref}
      id="formulario"
      data-testid="form-section"
      className="bg-[#FFCC00] section-divider py-14 md:py-24 px-4 md:px-8"
    >
      <div className="max-w-5xl mx-auto grid md:grid-cols-2 gap-8 md:gap-12 items-start">
        <div className="flex flex-col gap-5">
          <span className="chip bg-black text-white border-black">
            Formulario rápido
          </span>
          <h2 className="font-display text-3xl md:text-5xl font-black uppercase leading-[0.95]">
            30 segundos. <br />
            <span className="bg-black text-[#FFCC00] px-2 inline-block">
              Listo.
            </span>
          </h2>
          <p className="text-base md:text-lg font-bold max-w-md">
            Déjanos tus datos y te conectamos al instante con un profesional
            disponible.
          </p>
          <div className="hidden md:flex flex-col gap-2 mt-2">
            <p className="text-sm font-black uppercase tracking-widest">
              ¿Prefieres hablar directo?
            </p>
            <a
              href="https://wa.me/56989675705"
              target="_blank"
              rel="noopener noreferrer"
              className="btn-primary max-w-sm"
              data-testid="form-section-whatsapp"
            >
              <MessageCircle size={22} strokeWidth={2.5} />
              WhatsApp directo
            </a>
          </div>
        </div>

        <form
          onSubmit={onSubmit}
          data-testid="contact-form"
          className="bg-white brutal-border-thick brutal-shadow-lg p-5 md:p-7 flex flex-col gap-4"
        >
          <label className="flex flex-col gap-1.5">
            <span className="text-[11px] font-black uppercase tracking-[0.18em]">
              Tu nombre
            </span>
            <input
              data-testid="form-input-nombre"
              value={form.nombre}
              onChange={update("nombre")}
              className="ps-input"
              placeholder="Ej: María Pérez"
              required
            />
          </label>

          <div className="grid grid-cols-2 gap-3">
            <label className="flex flex-col gap-1.5">
              <span className="text-[11px] font-black uppercase tracking-[0.18em]">
                Servicio
              </span>
              <select
                data-testid="form-input-servicio"
                value={form.servicio}
                onChange={update("servicio")}
                className="ps-input appearance-none"
              >
                {SERVICES_LIST.map((s) => (
                  <option key={s} value={s}>
                    {s}
                  </option>
                ))}
              </select>
            </label>
            <label className="flex flex-col gap-1.5">
              <span className="text-[11px] font-black uppercase tracking-[0.18em]">
                Comuna / ciudad
              </span>
              <input
                data-testid="form-input-comuna"
                value={form.comuna}
                onChange={update("comuna")}
                className="ps-input"
                placeholder="Ej: Antofagasta"
                required
              />
            </label>
          </div>

          <label className="flex flex-col gap-1.5">
            <span className="text-[11px] font-black uppercase tracking-[0.18em]">
              Descripción corta
            </span>
            <textarea
              data-testid="form-input-descripcion"
              value={form.descripcion}
              onChange={update("descripcion")}
              rows={3}
              className="ps-input resize-none"
              placeholder="Ej: Fuga bajo el lavaplatos, urgente."
            />
          </label>

          <label className="flex flex-col gap-1.5">
            <span className="text-[11px] font-black uppercase tracking-[0.18em]">
              Teléfono
            </span>
            <input
              data-testid="form-input-telefono"
              type="tel"
              inputMode="tel"
              value={form.telefono}
              onChange={update("telefono")}
              className="ps-input"
              placeholder="+56 9 1234 5678"
              required
            />
          </label>

          <button
            type="submit"
            disabled={loading}
            data-testid="form-submit-btn"
            className="btn-primary mt-1 disabled:opacity-70 disabled:cursor-not-allowed"
          >
            {loading ? (
              <Loader2 size={22} className="animate-spin" />
            ) : (
              <Send size={22} strokeWidth={2.5} />
            )}
            {loading ? "Enviando..." : "Solicitar ayuda ahora"}
          </button>

          <p className="text-[11px] font-bold text-zinc-600 text-center">
            Al enviar, se abrirá WhatsApp con tu solicitud pre-escrita.
          </p>
        </form>
      </div>
    </section>
  );
});

FormSection.displayName = "FormSection";
export default FormSection;
