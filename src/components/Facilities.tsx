import React from "react";
import { Wifi, Coffee, LayoutGrid, Armchair, Sparkles, Clock, MapPin } from "lucide-react";

const facilities = [
  {
    icon: Coffee,
    title: "Tiempo Productivo",
    description:
      "Trabaja, estudia o relájate. El ciclo de lavado (~80 min) es perfecto para avanzar en tus pendientes.",
  },
  {
    icon: Wifi,
    title: "WiFi Gratuito",
    description: "Conexión rápida y estable para trabajar, ver películas o navegar en redes sociales mientras esperas.",
  },

  {
    icon: Armchair,
    title: "Espacios Cómodos",
    description: "Áreas de espera amplias y climatizadas con asientos cómodos. Aprovecha el tiempo como prefieras.",
  },
  {
    icon: Sparkles,
    title: "Ambiente Limpio",
    description: "Instalaciones impecables y bien mantenidas. Espacios ordenados y agradables para tu comodidad.",
  },
  {
    icon: Clock,
    title: "Tiempo Productivo",
    description:
      "Trabaja, estudia o relájate. El ciclo de lavado (~80 min) es perfecto para avanzar en tus pendientes.",
  },
];

const Facilities: React.FC = () => {
  const scrollToSucursales = () => {
    const sucursalesSection = document.getElementById("sucursales");
    if (sucursalesSection) {
      sucursalesSection.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section className="py-[60px] md:py-[100px] bg-white">
      <div className="max-w-[1200px] mx-auto px-6 md:px-20">
        {/* Header */}
        <div className="text-center mb-12 md:mb-14">
          <span className="inline-flex px-5 py-2 bg-[rgba(0,0,255,0.08)] text-[#0000FF] font-semibold text-[0.85rem] rounded-3xl mb-5">
            Instalaciones
          </span>
          <h2 className="font-bold text-[2rem] md:text-[2.5rem] text-black tracking-[-0.02em] mb-4">
            Espera cómodo mientras tu ropa se lava
          </h2>
          <p className="text-[#0033a0] text-lg leading-relaxed max-w-[700px] mx-auto">
            Nuestras sucursales están diseñadas para que tu tiempo de espera sea productivo y agradable.
          </p>
        </div>

        {/* Grid de Beneficios - 2 columnas x 3 filas */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8 mb-12">
          {facilities.map((facility, index) => (
            <div key={index} className="flex gap-4 md:gap-5 items-start">
              <div className="w-14 h-14 md:w-16 md:h-16 bg-[rgba(0,0,255,0.1)] rounded-2xl flex items-center justify-center flex-shrink-0">
                <facility.icon className="w-7 h-7 md:w-8 md:h-8 text-[#0000FF]" />
              </div>
              <div className="flex-1">
                <h3 className="font-bold text-[1.125rem] md:text-[1.25rem] text-black mb-2">{facility.title}</h3>
                <p className="text-[#0033a0] text-[0.875rem] md:text-[0.95rem] leading-relaxed">
                  {facility.description}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* CTA Banner */}
        <div className="bg-[rgba(0,0,255,0.05)] border-2 border-[rgba(0,0,255,0.1)] rounded-2xl py-8 px-6 md:px-10 flex flex-col md:flex-row justify-between items-center gap-5">
          <span className="font-bold text-[1.125rem] md:text-[1.25rem] text-black text-center md:text-left">
            ¿Listo para una experiencia de lavandería diferente?
          </span>
          <button
            onClick={scrollToSucursales}
            className="w-full md:w-auto bg-[#0000FF] hover:bg-[#0033a0] hover:-translate-y-0.5 text-white font-bold py-3 md:py-3.5 px-8 rounded-[10px] flex items-center justify-center gap-2 transition-all shadow-md"
          >
            <MapPin className="w-5 h-5" />
            Ver nuestras sucursales
          </button>
        </div>
      </div>
    </section>
  );
};

export default Facilities;
