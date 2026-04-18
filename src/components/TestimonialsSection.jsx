import React from "react";
import Marquee from "react-fast-marquee";
import { Star, Quote, MapPin } from "lucide-react";

const TESTIMONIOS = [
  { nombre: "Camila R.", ciudad: "Antofagasta", servicio: "Cerrajería", rating: 5, texto: "Me quedé fuera a las 11pm. En 25 min llegó el técnico. Me salvaron." },
  { nombre: "Jorge M.", ciudad: "Temuco", servicio: "Gasfitería", rating: 5, texto: "Fuga bajo el lavaplatos un domingo. Respondieron al toque por WhatsApp." },
  { nombre: "Valentina A.", ciudad: "Viña del Mar", servicio: "Limpieza Hogar", rating: 5, texto: "Muy buena atención. Post-obra impecable, quedó como nuevo." },
  { nombre: "Diego P.", ciudad: "Concepción", servicio: "Electricidad", rating: 5, texto: "Se cortó la luz y pensé que era el edificio. Vinieron el mismo día." },
  { nombre: "Francisca B.", ciudad: "La Serena", servicio: "Gasfitería", rating: 4, texto: "Calefont muerto en pleno invierno. Lo revivieron en una tarde." },
  { nombre: "Nicolás S.", ciudad: "Valparaíso", servicio: "Cerrajería", rating: 5, texto: "Chapa rota en la oficina. Profesional y rápido, 10/10." },
  { nombre: "Paula V.", ciudad: "Iquique", servicio: "Multiservicio", rating: 5, texto: "Arreglaron 3 cosas en una sola visita. Ahorro total de tiempo." },
  { nombre: "Matías H.", ciudad: "Rancagua", servicio: "Electricidad", rating: 4, texto: "Tablero saltaba cada rato, encontraron el problema de inmediato." },
  { nombre: "Isidora C.", ciudad: "Puerto Montt", servicio: "Gasfitería", rating: 5, texto: "Transparentes con el precio, nada de sorpresas al final." },
  { nombre: "Tomás E.", ciudad: "Talca", servicio: "Multiservicio", rating: 5, texto: "Los llamé a las 8am, a las 10 ya estaban en la puerta. Cumplen." },
];

const Card = ({ t, idx }) => (
  <article
    data-testid={`testimonial-${idx}`}
    className="w-[280px] sm:w-[320px] shrink-0 brutal-border-thick brutal-shadow bg-white p-4 md:p-5 flex flex-col gap-3 mx-2"
  >
    <div className="flex items-center justify-between">
      <div className="flex gap-0.5">
        {Array.from({ length: t.rating }).map((_, i) => (
          <Star key={i} size={14} strokeWidth={2} fill="#000" className="text-black" />
        ))}
        {Array.from({ length: 5 - t.rating }).map((_, i) => (
          <Star key={"e" + i} size={14} strokeWidth={2} className="text-zinc-300" />
        ))}
      </div>
      <Quote size={20} strokeWidth={2.5} className="text-zinc-300" />
    </div>
    <p className="font-display text-[15px] md:text-base font-bold leading-snug min-h-[64px]">
      “{t.texto}”
    </p>
    <div className="flex items-center justify-between border-t-2 border-black pt-2.5 mt-1">
      <div>
        <p className="font-black uppercase text-[13px] tracking-wider">{t.nombre}</p>
        <p className="text-[10px] font-bold text-zinc-600 uppercase tracking-widest inline-flex items-center gap-1">
          <MapPin size={10} strokeWidth={3} />
          {t.ciudad}
        </p>
      </div>
      <span className="chip bg-black text-white border-black text-[9px]">{t.servicio}</span>
    </div>
  </article>
);

const TestimonialsSection = () => {
  return (
    <section
      data-testid="testimonials-section"
      className="bg-white section-divider py-12 md:py-20"
    >
      <div className="max-w-6xl mx-auto px-4 md:px-8 mb-6 md:mb-10 flex items-center gap-3 flex-wrap">
        <span className="chip">Clientes reales</span>
        <span
          className="chip bg-[#FFCC00] border-black"
          data-testid="testimonials-rating"
        >
          <Star size={14} strokeWidth={3} fill="#000" /> 4.8 promedio · +2.000 servicios
        </span>
        <span className="chip hidden sm:inline-flex">
          <MapPin size={14} strokeWidth={3} /> Clientes en todo Chile
        </span>
      </div>

      <Marquee
        speed={4}
        direction="left"
        gradient={true}
        gradientColor="rgb(255,255,255)"
        gradientWidth={40}
        pauseOnHover
        className="py-2"
      >
        {TESTIMONIOS.map((t, i) => (
          <Card key={i} t={t} idx={i} />
        ))}
      </Marquee>
    </section>
  );
};

export default TestimonialsSection;
