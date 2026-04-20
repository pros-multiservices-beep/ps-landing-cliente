import React from "react";
import { toast } from "sonner";
import { FaWhatsapp } from "react-icons/fa";

const FloatingWhatsApp = ({
  phone = "56989675705",
  message = "Hola, necesito un técnico en mi zona. Es urgente. ¿Tienen disponibilidad?",
}) => {
  const href = `https://wa.me/${phone}?text=${encodeURIComponent(message)}`;

  const handleClick = () => {
    toast.success("Conectando con un técnico…", { duration: 1800 });
  };

  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      onClick={handleClick}
      data-testid="floating-whatsapp-btn"
      aria-label="Hablar por WhatsApp ahora"
      className="fixed bottom-5 right-5 md:bottom-8 md:right-8 z-50 group"
    >
      <span className="relative inline-flex items-center">
        {/* glow */}
        <span className="absolute inset-0 -m-1 rounded-[2px] bg-[#25D366] opacity-40 blur-[10px] group-hover:opacity-70 transition-opacity" />

        <span className="relative inline-flex items-center gap-2 bg-[#25D366] text-white brutal-border brutal-shadow px-4 py-3 md:px-5 md:py-4 font-black uppercase tracking-wider text-sm md:text-base ps-breath group-hover:bg-[#1DA851] group-hover:text-white transition-colors">
          
          <FaWhatsapp size={22} />

          <span className="hidden sm:flex flex-col leading-tight">
            <span>WhatsApp</span>
            <span className="text-[10px] font-bold opacity-80 normal-case tracking-normal">
              respuesta en minutos
            </span>
          </span>

        </span>
      </span>
    </a>
  );
};

export default FloatingWhatsApp;