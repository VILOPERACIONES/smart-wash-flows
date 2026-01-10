import React from 'react';
import { Wifi, Coffee, LayoutGrid, Armchair, Clock, MapPin, Info } from 'lucide-react';

const amenities = [
  {
    icon: Wifi,
    title: "WiFi Gratuito",
    description: "Conexión de alta velocidad para que trabajes, estudies o disfrutes de películas y redes sociales.",
    bgColor: "bg-[rgba(0,0,255,0.1)]",
    iconColor: "text-[#0000FF]"
  },
  {
    icon: LayoutGrid,
    title: "Mesas Disponibles",
    description: "Mesas amplias para trabajar en tu laptop, estudiar o simplemente relajarte con comodidad.",
    bgColor: "bg-[rgba(75,130,223,0.1)]",
    iconColor: "text-[#4B82DF]"
  },
  {
    icon: Coffee,
    title: "Café y Agua Gratis",
    description: "Disfruta de café recién hecho y agua purificada sin costo. Haz tu espera más agradable.",
    bgColor: "bg-[rgba(0,0,255,0.1)]",
    iconColor: "text-[#0000FF]"
  },
  {
    icon: Armchair,
    title: "Ambiente Cómodo y Limpio",
    description: "Instalaciones climatizadas, limpias y bien cuidadas. Un espacio donde te sientes como en casa.",
    bgColor: "bg-[rgba(75,130,223,0.1)]",
    iconColor: "text-[#4B82DF]"
  },
  {
    icon: Clock,
    title: "Aprovecha los ~80 Minutos",
    description: "El tiempo justo para terminar pendientes, revisar emails o simplemente desconectar un rato.",
    bgColor: "bg-[rgba(0,0,255,0.1)]",
    iconColor: "text-[#0000FF]"
  }
];

const WaitingRoom: React.FC = () => {
  const scrollToSucursales = () => {
    const sucursalesSection = document.getElementById('sucursales');
    if (sucursalesSection) {
      sucursalesSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section className="py-[60px] md:py-[100px] bg-white">
      <div className="max-w-[1200px] mx-auto px-6 md:px-20">
        {/* Header */}
        <div className="text-center mb-14">
          <span className="inline-flex px-5 py-2 bg-[rgba(0,0,255,0.08)] text-[#0000FF] font-semibold text-[0.85rem] rounded-3xl mb-5">
            Sala de Espera
          </span>
          <h2 className="font-bold text-[2rem] md:text-[2.5rem] text-black tracking-[-0.02em] mb-4">
            Relájate mientras tu ropa se lava
          </h2>
          <p className="text-[#0033a0] text-lg leading-relaxed max-w-[800px] mx-auto">
            Nuestra sala de espera está equipada para que aproveches tu tiempo. Trabaja, descansa o disfruta de un café mientras esperas tu ciclo de lavado.
          </p>
        </div>

        {/* Main Layout 50/50 */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-center">
          {/* Left Column - Image */}
          <div className="relative rounded-[20px] lg:rounded-[20px] rounded-2xl overflow-hidden shadow-[0_20px_60px_rgba(0,0,0,0.15)] order-first">
            <img
              src="https://images.unsplash.com/photo-1497366216548-37526070297c?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
              alt="Sala de espera acogedora con mesas y sillas"
              className="w-full aspect-[4/3] object-cover"
            />
            {/* Floating Badge - WiFi (Top Right) */}
            <div className="absolute top-4 right-4 md:top-5 md:right-5 bg-[rgba(0,0,255,0.95)] text-white px-3.5 py-2.5 md:px-4 md:py-2.5 rounded-xl flex items-center gap-2 shadow-[0_6px_16px_rgba(0,0,0,0.2)]">
              <Wifi className="w-[18px] h-[18px]" />
              <span className="font-bold text-[0.75rem] md:text-[0.85rem]">WiFi Gratis</span>
            </div>
            {/* Floating Badge - Coffee (Bottom Right) */}
            <div className="absolute bottom-4 right-4 md:bottom-5 md:right-5 bg-[rgba(75,130,223,0.95)] text-white px-3.5 py-2.5 md:px-4 md:py-2.5 rounded-xl flex items-center gap-2 shadow-[0_6px_16px_rgba(0,0,0,0.2)]">
              <Coffee className="w-[18px] h-[18px]" />
              <span className="font-bold text-[0.75rem] md:text-[0.85rem]">Café Gratis</span>
            </div>
          </div>

          {/* Right Column - Amenities */}
          <div>
            <span className="font-semibold text-base text-[#0000FF] mb-6 block">
              Todo lo que necesitas mientras esperas
            </span>
            <div className="flex flex-col gap-6 md:gap-7">
              {amenities.map((amenity, index) => (
                <div key={index} className="flex gap-4 md:gap-5 items-start">
                  <div className={`w-14 h-14 md:w-16 md:h-16 ${amenity.bgColor} rounded-2xl flex items-center justify-center flex-shrink-0`}>
                    <amenity.icon className={`w-7 h-7 md:w-8 md:h-8 ${amenity.iconColor}`} />
                  </div>
                  <div>
                    <h3 className="font-bold text-[1.125rem] md:text-[1.25rem] text-black mb-2">
                      {amenity.title}
                    </h3>
                    <p className="text-[#0033a0] text-[0.875rem] md:text-[0.95rem] leading-relaxed">
                      {amenity.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            {/* Info Banner */}
            <div className="mt-8 bg-gradient-to-br from-[rgba(0,0,255,0.05)] to-[rgba(75,130,223,0.08)] border-2 border-[rgba(0,0,255,0.15)] rounded-2xl py-5 px-6 md:py-6 md:px-7 flex flex-col md:flex-row items-center gap-4 text-center md:text-left">
              <Info className="w-7 h-7 text-[#0000FF] flex-shrink-0" />
              <p className="text-[#0033a0] text-[0.95rem] font-medium leading-relaxed">
                Disponible en nuestras sucursales de autoservicio. Haz tu espera más productiva y agradable.
              </p>
            </div>
          </div>
        </div>

        {/* CTA Banner */}
        <div className="mt-12 bg-[rgba(0,0,255,0.05)] border-2 border-[rgba(0,0,255,0.1)] rounded-2xl py-8 px-6 md:px-10 flex flex-col md:flex-row justify-between items-center gap-5">
          <span className="font-bold text-[1.125rem] md:text-[1.25rem] text-black text-center md:text-left">
            ¿Quieres conocer nuestras sucursales?
          </span>
          <button
            onClick={scrollToSucursales}
            className="w-full md:w-auto bg-[#0000FF] hover:bg-[#0033a0] hover:-translate-y-0.5 text-white font-bold py-3 md:py-3.5 px-8 rounded-[10px] flex items-center justify-center gap-2 transition-all"
          >
            <MapPin className="w-5 h-5" />
            Ver ubicaciones
          </button>
        </div>
      </div>
    </section>
  );
};

export default WaitingRoom;
