import React from "react";
import { toast } from "sonner";
import {
  MessageCircle,
  ArrowDown,
  MapPin,
  Clock,
  Zap,
  CircleCheckBig,
} from "lucide-react";

/**
 * Hero nacional, generalista.
 * Props:
 *   servicio (string)   ej: "Gasfitería"
 *   comuna   (string)   ej: "Providencia" | "" -> "tu zona"
 *   problema (string)   ej: "Fuga de agua" (opcional)
 */
const Hero = ({
  servicio = "",
  comuna = "",
  problema = "",
  whatsappHref,
  onOpenForm,
  solicitudesHoy = 37,
}) => {
  const servicioLabel = servicio && servicio.trim() ? servicio : "Técnico";
  const zona = comuna && comuna.trim() ? comuna : "tu zona";

  const handleWhatsAppClick = () => {
    toast.success("Conectando con un técnico…", { duration: 1800 });
    // Allow default navigation (target _blank) to proceed.
  };

  return (
    <section
      data-testid="hero-section"
      className="relative w-full bg-[#FFCC00] section-divider overflow-hidden"
    >
      {/* Top urgency strip (slow pulse, not aggressive) */}
      <div className="w-full bg-black text-white text-[11px] sm:text-xs font-black uppercase tracking-[0.22em] py-2 px-4 flex items-center justify-center gap-2">
        <span className="inline-block w-2 h-2 bg-[#25D366] rounded-full ps-pulse-dot" />
        <span data-testid="top-urgency-strip">
          Técnicos disponibles ahora · Atención en todo Chile · 24/7
        </span>
      </div>

      <div className="max-w-6xl mx-auto px-4 md:px-8 pt-7 pb-10 md:pt-14 md:pb-20 min-h-[86vh] md:min-h-[78vh] flex flex-col justify-between gap-6">
        {/* Brand row */}
        <div className="flex items-center justify-between ps-rise">
          <div className="flex items-center gap-2">
            <div className="w-9 h-9 md:w-10 md:h-10 bg-black text-[#FFCC00] flex items-center justify-center font-black text-lg brutal-border">
              P
            </div>
            <span className="font-display text-lg md:text-xl font-black uppercase tracking-tight">
              ProSolución
            </span>
          </div>
          <span className="chip bg-black text-white border-black hidden sm:inline-flex">
            <Clock size={14} strokeWidth={3} /> 24/7
          </span>
        </div>

        {/* Live availability pill */}
        <div className="ps-rise ps-delay-1">
          <span
            data-testid="availability-badge"
            className="inline-flex items-center gap-2 bg-black text-white brutal-border px-3 py-2 text-xs md:text-sm font-black uppercase tracking-[0.18em]"
          >
            <span className="inline-block w-2.5 h-2.5 bg-[#25D366] rounded-full ps-pulse-dot" />
            Técnicos disponibles ahora
          </span>
        </div>

        {/* Main copy */}
        <div className="flex flex-col gap-4">
          <h1
            data-testid="hero-title"
            className="ps-rise ps-delay-2 font-display text-[36px] leading-[0.95] sm:text-5xl md:text-6xl lg:text-[80px] font-black uppercase"
          >
            ¿Necesitas un técnico <br className="hidden sm:block" />
            urgente en tu hogar?
          </h1>

          <p
            data-testid="hero-subtitle"
            className="ps-rise ps-delay-3 font-display text-xl sm:text-2xl md:text-3xl font-black leading-tight"
          >
            <span className="bg-black text-[#FFCC00] px-2 inline-block">
              {servicioLabel}
            </span>{" "}
            en{" "}
            <span className="inline-flex items-center gap-1 underline decoration-black decoration-4 underline-offset-[6px]">
              <MapPin size={22} strokeWidth={3} /> {zona}
            </span>{" "}
            disponible ahora.
          </p>

          <p className="ps-rise ps-delay-3 text-base sm:text-lg font-bold max-w-2xl">
            Te conectamos con un técnico en minutos, sin complicaciones.
            {problema ? (
              <>
                {" "}
                <span className="underline decoration-black decoration-2">
                  ({problema})
                </span>
              </>
            ) : null}
          </p>

          {/* CTAs */}
          <div className="ps-rise ps-delay-4 flex flex-col sm:flex-row gap-3 sm:gap-4 mt-2">
            <a
              data-testid="hero-whatsapp-btn"
              href={whatsappHref}
              target="_blank"
              rel="noopener noreferrer"
              onClick={handleWhatsAppClick}
              className="btn-primary sm:max-w-md text-base md:text-xl py-5 ps-breath"
            >
              <MessageCircle size={24} strokeWidth={2.5} />
              <span className="flex flex-col items-center leading-tight">
                <span>Hablar por WhatsApp</span>
                <span className="text-[11px] md:text-xs font-bold opacity-80 normal-case tracking-normal">
                  respuesta en minutos
                </span>
              </span>
            </a>
            <button
              type="button"
              data-testid="hero-form-btn"
              onClick={onOpenForm}
              className="btn-secondary sm:max-w-xs"
            >
              <ArrowDown size={18} strokeWidth={3} />
              Prefiero el formulario
            </button>
          </div>

          {/* Urgency micro-strip */}
          <div className="ps-rise ps-delay-4 flex flex-wrap gap-2 mt-2">
            <span className="chip" data-testid="trust-badge-response">
              <Zap size={14} strokeWidth={3} /> Respuesta promedio &lt; 5 min
            </span>
            <span className="chip" data-testid="trust-badge-national">
              <MapPin size={14} strokeWidth={3} /> Atención en todo Chile
            </span>
            <span
              className="chip bg-black text-white border-black"
              data-testid="trust-badge-today"
            >
              <CircleCheckBig size={14} strokeWidth={3} className="text-[#25D366]" />
              +{solicitudesHoy} solicitudes hoy en tu zona
            </span>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
