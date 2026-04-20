import React from "react";
import { MessageCircle, Instagram, Mail } from "lucide-react";

const Footer = () => {
  return (
    <footer
      data-testid="site-footer"
      className="bg-black text-white py-10 px-4 md:px-8"
    >
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row md:items-center md:justify-between gap-6">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-[#FFCC00] text-black flex items-center justify-center font-black text-lg">
            P
          </div>
          <div>
            <p className="font-display text-xl font-black uppercase">
              ProSolución
            </p>
            <p className="text-xs font-bold uppercase tracking-widest text-zinc-400">
              Atención inmediata · Todo Chile
            </p>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <a
            href="https://wa.me/56989675705"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 bg-[#25D366] text-black px-4 py-2 brutal-border font-black uppercase text-sm tracking-widest"
            data-testid="footer-whatsapp"
          >
            <MessageCircle size={16} strokeWidth={3} />
            WhatsApp
          </a>
          <a
            href="mailto:contacto@prosolucion.cl"
            className="inline-flex items-center gap-2 bg-white text-black px-4 py-2 brutal-border font-black uppercase text-sm tracking-widest"
          >
            <Mail size={16} strokeWidth={3} />
            Email
          </a>
          <a
            href="#"
            aria-label="Instagram"
            className="inline-flex items-center justify-center w-10 h-10 bg-white text-black brutal-border"
          >
            <Instagram size={18} strokeWidth={2.5} />
          </a>
        </div>
      </div>

      <div className="max-w-6xl mx-auto mt-8 pt-6 border-t border-zinc-800 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs font-bold uppercase tracking-widest text-zinc-500">
        <p>© {new Date().getFullYear()} ProSolución. Todos los derechos reservados. <br/> Producto desarrollado y operado por GFC Systems Nexus SpA. 
          <br/>Santiago, Chile.</p>
      </div>
    </footer>
  );
};

export default Footer;
