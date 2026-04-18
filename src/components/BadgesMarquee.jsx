import React from "react";
import Marquee from "react-fast-marquee";
import { Star, CheckCircle2, MapPin, Users } from "lucide-react";

const items = [
  { icon: CheckCircle2, text: "+2.000 servicios realizados" },
  { icon: Star, text: "Calificación promedio 4.8★" },
  { icon: Users, text: "Clientes en todo Chile" },
  { icon: MapPin, text: "Antofagasta · La Serena · Valparaíso · Concepción · Temuco y más" },
];

const BadgesMarquee = () => {
  return (
    <div
      data-testid="badges-marquee"
      className="w-full bg-black text-white section-divider"
    >
      <Marquee speed={5} gradient={false} pauseOnHover className="py-3.5">
        {items.concat(items).map((it, i) => {
          const Icon = it.icon;
          return (
            <span
              key={i}
              className="mx-8 inline-flex items-center gap-3 font-black uppercase tracking-[0.18em] text-sm md:text-base"
            >
              <Icon size={18} strokeWidth={2.5} className="text-[#FFCC00]" />
              {it.text}
              <span className="text-[#FFCC00] mx-2">•</span>
            </span>
          );
        })}
      </Marquee>
    </div>
  );
};

export default BadgesMarquee;
