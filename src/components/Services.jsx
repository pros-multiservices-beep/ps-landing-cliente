import React from "react";
import {
  Droplets,
  Zap,
  KeyRound,
  Sparkles,
  Wrench,
  ArrowUpRight,
  Flame,
} from "lucide-react";

// Orden por urgencia. Primeros 3 destacados.
const services = [
  { key: "Cerrajería", icon: KeyRound, color: "#FF3B30", subtitle: "Puerta cerrada · chapas rotas", examples: ["Puerta bloqueada", "Llave rota", "Chapa dañada"], featured: true },
  { key: "Gasfitería", icon: Droplets, color: "#25D366", subtitle: "Fugas · WC · calefont", examples: ["Fuga de agua", "WC tapado", "Calefont malo"], featured: true },
  { key: "Electricidad", icon: Zap, color: "#FFCC00", subtitle: "Cortes · tablero · enchufes", examples: ["Sin luz", "Tablero saltado", "Corto circuito"], featured: true },
  { key: "Limpieza Hogar", icon: Sparkles, color: "#7CFC00", subtitle: "Profunda · post-obra", examples: ["Post-obra", "Profunda", "Alfombras"] },
  { key: "Multiservicio", icon: Wrench, color: "#FF8A00", subtitle: "Carpintería · pintura · todo", examples: ["Pintura", "Carpintería", "Varios"] },
];

const Services = ({ onSelect }) => {
  return (
    <section
      data-testid="services-section"
      className="bg-[#F4F4F5] section-divider py-14 md:py-24 px-4 md:px-8"
    >
      <div className="max-w-6xl mx-auto">
        <div className="mb-8 md:mb-12 flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4">
          <div>
            <span className="chip">Servicios</span>
            <h2 className="mt-4 font-display text-3xl md:text-5xl font-black uppercase leading-[0.95]">
              Elige tu urgencia.
            </h2>
          </div>
          <p className="text-sm md:text-base font-bold text-zinc-700 max-w-sm">
            Un solo click te conecta con el profesional correcto.
            <br />
            <span className="inline-flex items-center gap-1 mt-1 text-[#FF3B30]">
              <Flame size={14} strokeWidth={3} /> Más urgentes primero
            </span>
          </p>
        </div>

        {/* Featured 3 */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 md:gap-5 mb-4 md:mb-5">
          {services.filter((s) => s.featured).map((s) => {
            const Icon = s.icon;
            const testid = `service-card-${s.key.toLowerCase().replace(/\s+/g, "-")}`;
            return (
              <button
                key={s.key}
                data-testid={testid}
                onClick={() => onSelect?.(s.key)}
                className="group text-left brutal-border-thick brutal-shadow bg-white p-5 md:p-6 flex flex-col gap-3 hover:bg-[#FFCC00] transition-colors relative"
              >
                <span className="absolute -top-3 -right-3 bg-[#FF3B30] text-white text-[10px] font-black uppercase tracking-widest px-2 py-1 brutal-border">
                  Top urgencia
                </span>
                <div className="flex items-center justify-between">
                  <div
                    className="w-14 h-14 md:w-16 md:h-16 brutal-border flex items-center justify-center"
                    style={{ background: s.color }}
                  >
                    <Icon size={30} strokeWidth={2.5} className="text-black" />
                  </div>
                  <ArrowUpRight
                    size={24}
                    strokeWidth={3}
                    className="opacity-50 group-hover:opacity-100 group-hover:translate-x-1 group-hover:-translate-y-1 transition-all"
                  />
                </div>
                <h3 className="font-display text-2xl md:text-[26px] font-black uppercase leading-none">
                  {s.key}
                </h3>
                <p className="text-xs md:text-sm font-bold text-zinc-700">
                  {s.subtitle}
                </p>
                <div className="flex flex-wrap gap-1.5 mt-1">
                  {s.examples.map((ex) => (
                    <span
                      key={ex}
                      className="text-[10px] md:text-[11px] font-black uppercase tracking-wider px-2 py-0.5 bg-black text-white"
                    >
                      {ex}
                    </span>
                  ))}
                </div>
              </button>
            );
          })}
        </div>

        {/* Rest */}
        <div className="grid grid-cols-2 gap-3 md:gap-5">
          {services.filter((s) => !s.featured).map((s) => {
            const Icon = s.icon;
            const testid = `service-card-${s.key.toLowerCase().replace(/\s+/g, "-")}`;
            return (
              <button
                key={s.key}
                data-testid={testid}
                onClick={() => onSelect?.(s.key)}
                className="group text-left brutal-border-thick brutal-shadow bg-white p-5 flex flex-col gap-3 hover:bg-[#FFCC00] transition-colors"
              >
                <div className="flex items-center justify-between">
                  <div
                    className="w-12 h-12 brutal-border flex items-center justify-center"
                    style={{ background: s.color }}
                  >
                    <Icon size={24} strokeWidth={2.5} className="text-black" />
                  </div>
                  <ArrowUpRight
                    size={20}
                    strokeWidth={3}
                    className="opacity-0 group-hover:opacity-100 transition-opacity"
                  />
                </div>
                <h3 className="font-display text-lg md:text-xl font-black uppercase leading-none">
                  {s.key}
                </h3>
                <p className="text-xs font-bold text-zinc-700">{s.subtitle}</p>
                <div className="flex flex-wrap gap-1">
                  {s.examples.slice(0, 2).map((ex) => (
                    <span
                      key={ex}
                      className="text-[10px] font-black uppercase tracking-wider px-1.5 py-0.5 bg-zinc-900 text-white"
                    >
                      {ex}
                    </span>
                  ))}
                </div>
              </button>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export const SERVICES_LIST = services.map((s) => s.key);
export default Services;
