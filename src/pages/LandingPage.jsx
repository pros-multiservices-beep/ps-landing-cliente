import React, { useEffect, useMemo, useRef, useState, lazy, Suspense } from "react";
import Hero from "../components/Hero";
import BadgesMarquee from "../components/BadgesMarquee";
import HowItWorks from "../components/HowItWorks";
import Services from "../components/Services";
import FormSection from "../components/FormSection";
import Footer from "../components/Footer";
import FloatingWhatsApp from "../components/FloatingWhatsApp";
import LiveActivity from "../components/LiveActivity";
import { MessageCircle, MapPin } from "lucide-react";
import { useSearchParams } from "react-router-dom";

// Below-the-fold lazy load (mejora carga inicial)
const TestimonialsSection = lazy(() => import("../components/TestimonialsSection"));

const WHATSAPP_NUMBER = "56989675705";

// Mock dinámico: nº solicitudes hoy (varía por hora para sensación de vida)
const solicitudesHoyMock = () => {
  const h = new Date().getHours();
  return 22 + ((h * 3) % 28); // 22..49
};

const buildWhatsAppMessage = ({ servicio, comuna, problema }) => {
  const s = servicio && servicio.trim() ? servicio.trim() : "un técnico";
  const zona = comuna && comuna.trim() ? comuna.trim() : "mi zona";
  let msg = `Hola, necesito ${s} en ${zona}. Es urgente. ¿Tienen disponibilidad?`;
  if (problema && problema.trim()) {
    msg += `\nProblema: ${problema.trim()}`;
  }
  return msg;
};

const buildWhatsAppUrl = (params) =>
  `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(buildWhatsAppMessage(params))}`;

const LandingPage = () => {
  const [searchParams] = useSearchParams();
  const formRef = useRef(null);
  const [selectedService, setSelectedService] = useState("");
  const [solicitudesHoy] = useState(() => solicitudesHoyMock());

  const servicioParam = searchParams.get("servicio") || "";
  const comunaParam = searchParams.get("comuna") || "";
  const problemaParam = searchParams.get("problema") || "";

  const whatsappHref = useMemo(
    () => buildWhatsAppUrl({ servicio: servicioParam, comuna: comunaParam, problema: problemaParam }),
    [servicioParam, comunaParam, problemaParam]
  );

  const floatingMessage = useMemo(
    () => buildWhatsAppMessage({ servicio: servicioParam, comuna: comunaParam, problema: problemaParam }),
    [servicioParam, comunaParam, problemaParam]
  );

  const scrollToForm = () => {
    formRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  useEffect(() => {
    document.title = problemaParam
      ? `${problemaParam} | ProSolución`
      : "ProSolución · Soluciones urgentes para tu hogar";
  }, [problemaParam]);

  const handleServiceSelect = (key) => {
    setSelectedService(key);
    setTimeout(scrollToForm, 80);
  };

  return (
    <div className="min-h-screen bg-white text-zinc-900">
      <Hero
        servicio={servicioParam}
        comuna={comunaParam}
        problema={problemaParam}
        whatsappHref={whatsappHref}
        onOpenForm={scrollToForm}
        solicitudesHoy={solicitudesHoy}
      />

      <LiveActivity />

      <BadgesMarquee />

      {/* National coverage strip */}
      <section
        data-testid="national-coverage"
        className="bg-white section-divider py-6 md:py-10 px-4 md:px-8"
      >
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-start md:items-center gap-3 md:gap-6">
          <span className="chip bg-[#FFCC00] border-black">
            <MapPin size={14} strokeWidth={3} /> Todo Chile
          </span>
          <p className="text-sm md:text-base font-bold text-zinc-700">
            Disponible en{" "}
            <span className="font-black text-black">
              Antofagasta, La Serena, Valparaíso, Viña del Mar, Concepción, Temuco
            </span>{" "}
            y más.
          </p>
        </div>
      </section>

      <HowItWorks />

      <Services onSelect={handleServiceSelect} />

      {/* Intermediate CTA */}
      <section
        data-testid="mid-cta"
        className="bg-black text-white section-divider py-10 md:py-14 px-4 md:px-8"
      >
        <div className="max-w-4xl mx-auto flex flex-col md:flex-row items-center justify-between gap-5 md:gap-8">
          <h3 className="font-display text-2xl md:text-4xl font-black uppercase leading-[0.95] text-center md:text-left">
            No sigas esperando.{" "}
            <span className="text-[#FFCC00]">Hablar por WhatsApp ahora.</span>
          </h3>
          <a
            data-testid="mid-cta-whatsapp"
            href={whatsappHref}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-primary md:max-w-xs"
          >
            <MessageCircle size={22} strokeWidth={2.5} />
            WhatsApp ahora
          </a>
        </div>
      </section>

      <TestimonialsWithSuspense />

      <FormSection
        ref={formRef}
        defaultServicio={selectedService || servicioParam}
        defaultComuna={comunaParam}
      />

      <Footer />

      <FloatingWhatsApp
        phone={WHATSAPP_NUMBER}
        message={floatingMessage}
      />
    </div>
  );
};

export default LandingPage;

const TestimonialsWithSuspense = () => (
  <Suspense
    fallback={
      <div className="bg-white section-divider py-12 px-4 flex justify-center">
        <div className="h-2 w-32 bg-black animate-pulse" />
      </div>
    }
  >
    <TestimonialsSection />
  </Suspense>
);
