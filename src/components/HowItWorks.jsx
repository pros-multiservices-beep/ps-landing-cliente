import React from "react";
import { MessageCircle, UserCheck, Wrench } from "lucide-react";

const steps = [
  {
    n: "1",
    icon: MessageCircle,
    title: "Escribes",
    desc: "Por WhatsApp o formulario. Nos cuentas tu problema en 30 segundos.",
  },
  {
    n: "2",
    icon: UserCheck,
    title: "Conectamos",
    desc: "Asignamos un profesional disponible y verificado en tu zona.",
  },
  {
    n: "3",
    icon: Wrench,
    title: "Solucionamos",
    desc: "Llega, evalúa y resuelve. Tú vuelves a tu día tranquilo.",
  },
];

const HowItWorks = () => {
  return (
    <section
      data-testid="how-it-works"
      className="bg-white section-divider py-14 md:py-24 px-4 md:px-8"
    >
      <div className="max-w-6xl mx-auto">
        <div className="mb-8 md:mb-12">
          <span className="chip">Cómo funciona</span>
          <h2 className="mt-4 font-display text-3xl md:text-5xl font-black uppercase leading-[0.95]">
            3 pasos. <br className="sm:hidden" />
            <span className="bg-[#FFCC00] px-2 inline-block">Cero complicaciones.</span>
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6">
          {steps.map((s) => {
            const Icon = s.icon;
            return (
              <article
                key={s.n}
                className="brutal-border-thick brutal-shadow bg-white p-6 md:p-7 flex flex-col gap-4"
                data-testid={`how-step-${s.n}`}
              >
                <div className="flex items-center justify-between">
                  <div className="w-14 h-14 bg-black text-[#FFCC00] flex items-center justify-center font-display text-3xl font-black">
                    {s.n}
                  </div>
                  <Icon size={32} strokeWidth={2.5} className="text-black" />
                </div>
                <h3 className="font-display text-2xl font-black uppercase">
                  {s.title}
                </h3>
                <p className="text-base font-semibold text-zinc-700 leading-relaxed">
                  {s.desc}
                </p>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;
