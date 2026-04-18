import React, { useEffect, useState } from "react";
import { Activity } from "lucide-react";

// Mock realista: solicitud reciente rotando cada ~20s.
const POOL = [
  { ciudad: "Concepción", servicio: "Gasfitería" },
  { ciudad: "Antofagasta", servicio: "Cerrajería" },
  { ciudad: "La Serena", servicio: "Electricidad" },
  { ciudad: "Temuco", servicio: "Multiservicio" },
  { ciudad: "Viña del Mar", servicio: "Limpieza Hogar" },
  { ciudad: "Valparaíso", servicio: "Cerrajería" },
  { ciudad: "Iquique", servicio: "Gasfitería" },
  { ciudad: "Rancagua", servicio: "Electricidad" },
  { ciudad: "Puerto Montt", servicio: "Gasfitería" },
  { ciudad: "Talca", servicio: "Multiservicio" },
];

const pick = () => {
  const it = POOL[Math.floor(Math.random() * POOL.length)];
  const min = 1 + Math.floor(Math.random() * 9); // 1..9 min
  return { ...it, min };
};

const LiveActivity = () => {
  const [item, setItem] = useState(() => pick());
  const [fading, setFading] = useState(false);

  useEffect(() => {
    const id = setInterval(() => {
      setFading(true);
      setTimeout(() => {
        setItem(pick());
        setFading(false);
      }, 220);
    }, 20000);
    return () => clearInterval(id);
  }, []);

  return (
    <div
      data-testid="live-activity"
      className="bg-white section-divider px-4 md:px-8 py-3 md:py-3.5"
    >
      <div className="max-w-6xl mx-auto flex items-center gap-2.5 text-[11px] sm:text-xs md:text-sm">
        <span className="inline-flex items-center justify-center w-6 h-6 bg-[#25D366] brutal-border">
          <Activity size={12} strokeWidth={3} className="text-black" />
        </span>
        <span className="inline-block w-2 h-2 bg-[#25D366] rounded-full ps-pulse-dot" />
        <span
          className={`font-bold text-zinc-700 transition-opacity duration-200 ${
            fading ? "opacity-0" : "opacity-100"
          }`}
          data-testid="live-activity-text"
        >
          Última solicitud hace{" "}
          <span className="font-black text-black">{item.min} min</span> en{" "}
          <span className="font-black text-black">{item.ciudad}</span>
          <span className="hidden sm:inline text-zinc-500"> · {item.servicio}</span>
        </span>
      </div>
    </div>
  );
};

export default LiveActivity;
