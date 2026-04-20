import React, { useState, useEffect } from "react";
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

  // Estado para la microanimación de búsqueda
  const [searchStep, setSearchStep] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setSearchStep((prev) => (prev + 1) % 3);
    }, 3000); // Cambia cada 3 segundos
    return () => clearInterval(interval);
  }, []);

  const searchStates = [
    { icon: "🔍", text: "Buscando profesionales cercanos..." },
    { icon: "✓", text: "3 disponibles en tu zona" },
    { icon: "⚡", text: "Tiempo estimado: <10 min" },
  ];

  const currentState = searchStates[searchStep];

  const handleWhatsAppClick = () => {
    toast.success("Conectando con un técnico…", { duration: 1800 });
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
        <div className="flex flex-col gap-8 md:gap-10">
          <h1
            data-testid="hero-title"
            className="ps-rise ps-delay-2 font-display text-[36px] leading-[0.95] sm:text-5xl md:text-6xl lg:text-[80px] font-black uppercase"
          >
            ¿Necesitas un servicio urgente?
          </h1>

          <h3
            data-testid="hero-subtitle-h3"
            className="ps-rise ps-delay-2 font-display text-lg sm:text-2xl md:text-3xl font-black uppercase leading-tight text-zinc-900"
          >
            Te conectamos con un profesional en minutos
          </h3>

          <p
            data-testid="hero-subtitle"
            className="ps-rise ps-delay-3 text-base sm:text-lg md:text-xl font-bold max-w-3xl leading-relaxed"
          >
            Gasfitería, electricidad, aire acondicionado, abogados y más. 
            <span className="block mt-2 text-zinc-700">
              Solicita ahora y recibe respuesta rápida en tu ciudad.
            </span>
          </p>

          {/* CTAs */}
          <div className="ps-rise ps-delay-4 flex flex-col sm:flex-row gap-3 sm:gap-4 mt-6">
            <button
              type="button"
              data-testid="hero-form-btn"
              onClick={onOpenForm}
              className="btn-primary sm:max-w-md text-base md:text-lg py-5"
            >
              <ArrowDown size={24} strokeWidth={2.5} />
              <span className="flex flex-col items-center leading-tight">
                <span>Solicitar servicio ahora</span>
                <span className="text-[11px] md:text-xs font-bold opacity-80 normal-case tracking-normal">
                  respuesta en minutos
                </span>
              </span>
            </button>
            <a
              data-testid="hero-whatsapp-btn"
              href={whatsappHref}
              target="_blank"
              rel="noopener noreferrer"
              onClick={handleWhatsAppClick}
              className="btn-secondary sm:max-w-xs py-5"
            >
              <MessageCircle size={18} strokeWidth={3} />
              Hablar por WhatsApp
            </a>
          </div>

          {/* Live search animation */}
          <div className="ps-rise ps-delay-4 mt-6 bg-white border-2 border-black rounded-sm p-4 md:p-5 inline-flex flex-col gap-2 max-w-sm">
            <div className="flex items-center gap-3">
              <span className="inline-block w-2.5 h-2.5 bg-[#25D366] rounded-full ps-search-pulse" />
              <span className="text-sm md:text-base font-black text-zinc-900">
                {currentState.text}
              </span>
            </div>
            <div className="text-[10px] md:text-xs text-zinc-600 font-bold uppercase tracking-wider">
              Sistema activo · Búsqueda en vivo
            </div>
          </div>

          {/* Urgency micro-strip */}
          <div className="ps-rise ps-delay-4 flex flex-wrap gap-2 mt-4">
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
