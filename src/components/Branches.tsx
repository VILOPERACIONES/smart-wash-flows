import React, { useEffect, useState, useCallback } from "react";
import useEmblaCarousel from "embla-carousel-react";

interface Sucursal {
  id: string;
  nombre: string;
  estado: string;
  direccion: string;
  horario: string;
  url_google_maps: string;
  imagen: String;
}

const Branches: React.FC = () => {
  const [sucursales, setSucursales] = useState<Sucursal[]>([]);
  const [loading, setLoading] = useState(true);
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: false, align: "center" });
  const [selectedIndex, setSelectedIndex] = useState(0);

  const onSelect = useCallback(() => {
    if (!emblaApi) return;
    setSelectedIndex(emblaApi.selectedScrollSnap());
  }, [emblaApi]);

  useEffect(() => {
    if (!emblaApi) return;
    emblaApi.on("select", onSelect);
    onSelect();
    return () => {
      emblaApi.off("select", onSelect);
    };
  }, [emblaApi, onSelect]);

  const scrollTo = useCallback(
    (index: number) => {
      if (emblaApi) emblaApi.scrollTo(index);
    },
    [emblaApi],
  );

  useEffect(() => {
    const fetchSucursales = async () => {
      try {
        const response = await fetch("https://admin.alavar.mx/api/sucursal");
        const result = await response.json();
        if (result.success && result.data) {
          setSucursales(result.data);
        }
      } catch (error) {
        console.error("Error fetching sucursales:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchSucursales();
  }, []);

  if (loading) {
    return (
      <section id="servicios" className="w-full bg-white pt-[61px] pb-32 px-5">
        <div className="max-w-[1400px] mx-auto my-0 flex justify-center items-center min-h-[400px]">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#00F]"></div>
        </div>
      </section>
    );
  }

  const renderCard = (sucursal: Sucursal) => (
    <article
      key={sucursal.id}
      className="w-full max-w-[400px] border overflow-hidden bg-white rounded-2xl border-solid border-gray-200 flex flex-col"
    >
      {/* Imagen */}
      <div className="relative px-4 sm:px-8 pt-16 sm:pt-16">
        <img src={sucursal.imagen} className="w-full h-[188px] bg-[#C4C4C4] rounded-lg" />

        {sucursal.estado === "proximamente" && (
          <div className="flex w-[calc(100%-32px)] sm:w-[calc(100%-64px)] xl:w-[333.79px] h-[188px] rounded-lg justify-center items-center absolute bg-[#4A80DE] left-4 sm:left-8 top-16 sm:top-16">
            <span className="text-white font-poppins text-lg font-bold leading-7">Próximamente</span>
          </div>
        )}

        <div
          className={`inline-flex justify-center items-center absolute px-4 py-1.5 rounded-full left-4 top-4 ${
            sucursal.estado === "activa" ? "bg-[#00F]" : "bg-[#003A9E]"
          }`}
        >
          <span className="text-white text-sm font-medium leading-5">
            {sucursal.estado === "activa" ? "ABIERTO" : "PRÓXIMAMENTE"}
          </span>
        </div>
      </div>

      {/* Contenido */}
      <div className="p-[33px] flex flex-col flex-1">
        {/* TODO lo de arriba */}
        <div className="flex-1">
          <h3 className="text-black text-xl font-bold font-poppins leading-7 tracking-[-0.5px] mb-4">
            {sucursal.nombre}
          </h3>

          {/* Dirección */}
          <div className="flex items-center gap-3 mb-3">
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
              <path
                d="M16.6663 8.33317C16.6663 12.494 12.0505 16.8273 10.5005 18.1657C10.3561 18.2742 10.1803 18.333 9.99967 18.333C9.81901 18.333 9.64324 18.2742 9.49884 18.1657C7.94884 16.8273 3.33301 12.494 3.33301 8.33317C3.33301 6.56506 4.03539 4.86937 5.28563 3.61913C6.53587 2.36888 8.23156 1.6665 9.99967 1.6665C11.7678 1.6665 13.4635 2.36888 14.7137 3.61913C15.964 4.86937 16.6663 6.56506 16.6663 8.33317Z"
                stroke="#4A80DE"
                strokeWidth="1.66667"
              />
            </svg>
            <span className="text-[#003A9E] text-sm">{sucursal.direccion}</span>
          </div>

          {/* Horario o espacio reservado */}
          <div className="flex items-center gap-3 mb-8 min-h-[40px]">
            {sucursal.estado === "activa" && sucursal.horario ? (
              <>
                <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                  <path d="M10 5V10L13.3333 11.6667" stroke="#4A80DE" strokeWidth="1.66667" />
                </svg>
                <span className="text-[#003A9E] text-sm">{sucursal.horario}</span>
              </>
            ) : (
              <span className="invisible">Horario</span>
            )}
          </div>
        </div>

        {/* BOTÓN (siempre abajo) */}
        {sucursal.estado === "activa" ? (
          <a
            href={sucursal.url_google_maps}
            target="_blank"
            rel="noopener noreferrer"
            className="flex justify-center items-center shadow-[0_4px_14px_-3px_rgba(0,0,255,0.40)] bg-[#00F] px-4 sm:px-20 py-3 rounded-xl w-full hover:bg-blue-700 transition-colors"
          >
            <span className="text-white text-sm font-semibold">Ver en Google Maps</span>
          </a>
        ) : (
          <button className="flex justify-center items-center opacity-50 bg-[#F3F5F7] py-3 rounded-xl w-full" disabled>
            <span className="text-[#003A9E] text-sm font-semibold">Próximamente</span>
          </button>
        )}
      </div>
    </article>
  );

  return (
    <section id="sucursales" className="w-full bg-white px-5 py-20">
      <div className="max-w-screen-xl mx-auto my-0">
        <div className="text-center mb-20">
          <h2 className="text-black text-center font-poppins text-[32px] leading-[36px] sm:text-[40px] sm:leading-[60px] font-bold tracking-[-1px] mb-3">
            Nuestras Sucursales
          </h2>
          <p className="text-[#003A9E] text-center font-poppins text-lg font-normal leading-7">
            Encuentra la más cercana a ti
          </p>
        </div>

        {/* Desktop: Static grid */}
        <div className="hidden md:flex justify-center gap-6 flex-wrap">
          {sucursales.map((sucursal) => renderCard(sucursal))}
        </div>

        {/* Mobile: Carousel */}
        <div className="md:hidden">
          <div className="overflow-hidden" ref={emblaRef}>
            <div className="flex">
              {sucursales.map((sucursal) => (
                <div key={sucursal.id} className="flex-[0_0_100%] min-w-0 flex justify-center px-2">
                  {renderCard(sucursal)}
                </div>
              ))}
            </div>
          </div>

          {/* Navigation dots */}
          <div className="flex justify-center gap-2 mt-6">
            {sucursales.map((_, index) => (
              <button
                key={index}
                onClick={() => scrollTo(index)}
                className={`w-2.5 h-2.5 rounded-full transition-all duration-300 ${
                  index === selectedIndex ? "bg-[#00F] w-6" : "bg-gray-300 hover:bg-gray-400"
                }`}
                aria-label={`Ir a sucursal ${index + 1}`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Branches;
