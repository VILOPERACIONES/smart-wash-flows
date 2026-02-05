import React, { useState, useEffect } from "react";
import { Loader2, AlertCircle } from "lucide-react";

interface Promocion {
  id: number;
  nombre: string;
  imagen_desktop: string;
  imagen_mobile: string;
  activo: boolean;
  publicar_inmediatamente: boolean;
  created_at: string;
}

interface ApiResponse {
  success: boolean;
  data: Promocion[];
  count: number;
}

const Promotions: React.FC = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [promociones, setPromociones] = useState<Promocion[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchPromociones = async () => {
      try {
        setLoading(true);
        setError(null);

        const response = await fetch("https://admin.alavar.mx/api/promociones");

        if (!response.ok) {
          throw new Error("Error al cargar las promociones");
        }

        const data: ApiResponse = await response.json();

        if (data.success && data.data) {
          setPromociones(data.data);
        } else {
          setPromociones([]);
        }
      } catch (err) {
        setError(err instanceof Error ? err.message : "Error al cargar las promociones");
      } finally {
        setLoading(false);
      }
    };

    fetchPromociones();
  }, []);

  const nextSlide = () => {
    if (promociones.length > 0) {
      setCurrentSlide((prev) => (prev + 1) % promociones.length);
    }
  };

  const prevSlide = () => {
    if (promociones.length > 0) {
      setCurrentSlide((prev) => (prev - 1 + promociones.length) % promociones.length);
    }
  };

  const goToSlide = (index: number) => {
    setCurrentSlide(index);
  };

  // Loading state
  if (loading) {
    return (
      <section id="promociones" className="w-full bg-white pt-[61px] pb-32 px-5">
        <div className="max-w-[1400px] mx-auto my-0">
          <div className="text-center mb-20">
            <div className="inline-flex justify-center items-center bg-[rgba(74,128,222,0.20)] mb-5 px-4 py-1.5 rounded-full">
              <span className="text-[#4A80DE] font-poppins text-center text-sm font-medium leading-5">Promociones</span>
            </div>
            <h2 className="text-black text-center font-poppins text-5xl font-bold leading-[48px] tracking-[-1.2px] mb-10 max-md:text-[40px] max-md:leading-10 max-sm:text-[32px] max-sm:leading-9">
              Conoce nuestras promociones
            </h2>
          </div>

          <div className="relative max-w-[1074px] mx-auto my-0">
            <div className="relative rounded-xl">
              <div className="w-full h-[586px] flex justify-center items-center shadow-[0_10px_15px_-3px_rgba(0,0,0,0.10),0_4px_6px_-4px_rgba(0,0,0,0.10)] bg-gray-100 rounded-xl animate-pulse">
                <Loader2 className="w-12 h-12 text-[#0000FF] animate-spin" />
              </div>

              <div className="flex justify-center gap-2 mt-5">
                {[0, 1, 2].map((index) => (
                  <div key={index} className="w-3 h-3 rounded-full bg-gray-200 animate-pulse" />
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>
    );
  }

  // Error state
  if (error) {
    return (
      <section id="promociones" className="w-full bg-white pt-[61px] pb-32 px-5">
        <div className="max-w-[1400px] mx-auto my-0">
          <div className="text-center mb-20">
            <div className="inline-flex justify-center items-center bg-[rgba(74,128,222,0.20)] mb-5 px-4 py-1.5 rounded-full">
              <span className="text-[#4A80DE] font-poppins text-center text-sm font-medium leading-5">Promociones</span>
            </div>
            <h2 className="text-black text-center font-poppins text-5xl font-bold leading-[48px] tracking-[-1.2px] mb-10 max-md:text-[40px] max-md:leading-10 max-sm:text-[32px] max-sm:leading-9">
              Conoce nuestras promociones
            </h2>
          </div>

          <div className="relative max-w-[1074px] mx-auto my-0">
            <div className="rounded-xl bg-red-50 border border-red-200 p-12 text-center">
              <AlertCircle className="w-12 h-12 text-red-500 mx-auto mb-4" />
              <p className="text-red-600 font-poppins font-medium text-lg mb-2">No pudimos cargar las promociones</p>
              <p className="text-red-500 font-poppins text-sm">Por favor, intenta de nuevo más tarde.</p>
            </div>
          </div>
        </div>
      </section>
    );
  }

  // Empty state
  if (promociones.length === 0) {
    return (
      <section id="promociones" className="w-full bg-white pt-[61px] pb-32 px-5">
        <div className="max-w-[1400px] mx-auto my-0">
          <div className="text-center mb-20">
            <div className="inline-flex justify-center items-center bg-[rgba(74,128,222,0.20)] mb-5 px-4 py-1.5 rounded-full">
              <span className="text-[#4A80DE] font-poppins text-center text-sm font-medium leading-5">Promociones</span>
            </div>
            <h2 className="text-black text-center font-poppins text-5xl font-bold leading-[48px] tracking-[-1.2px] mb-10 max-md:text-[40px] max-md:leading-10 max-sm:text-[32px] max-sm:leading-9">
              Conoce nuestras promociones
            </h2>
          </div>

          <div className="relative max-w-[1074px] mx-auto my-0">
            <div className="rounded-xl bg-gray-50 border border-gray-200 p-12 text-center">
              <p className="text-[#0033a0] font-poppins font-medium text-lg">No hay promociones activas</p>
              <p className="text-gray-500 font-poppins text-sm mt-2">Vuelve pronto para ver nuestras nuevas ofertas.</p>
            </div>
          </div>
        </div>
      </section>
    );
  }

  const currentPromocion = promociones[currentSlide];

  return (
    <section id="promociones" className="w-full bg-white pt-[61px] pb-32 px-5">
      <div className="max-w-[1400px] mx-auto my-0">
        <div className="text-center mb-20">
          <div className="inline-flex justify-center items-center bg-[rgba(74,128,222,0.20)] mb-5 px-4 py-1.5 rounded-full">
            <span className="text-[#4A80DE] font-poppins text-center text-sm font-medium leading-5">Promociones</span>
          </div>
          <h2 className="text-black text-center font-poppins text-5xl font-bold leading-[48px] tracking-[-1.2px] mb-10 max-md:text-[40px] max-md:leading-10 max-sm:text-[32px] max-sm:leading-9">
            Conoce nuestras promociones
          </h2>
        </div>

        <div className="relative max-w-[1074px] mx-auto my-0">
          <div className="relative rounded-xl overflow-hidden">
            <div className="w-full h-[586px] max-md:h-[400px] max-sm:h-[300px] shadow-[0_10px_15px_-3px_rgba(0,0,0,0.10),0_4px_6px_-4px_rgba(0,0,0,0.10)] bg-gray-100 rounded-xl">
              {/* Desktop image */}
              <img
                src={currentPromocion.imagen_desktop}
                alt={currentPromocion.nombre || `Promoción ${currentSlide + 1}`}
                className="hidden md:block w-full h-full object-cover"
              />

              {/* Mobile image */}
              <img
                src={currentPromocion.imagen_mobile}
                alt={currentPromocion.nombre || `Promoción ${currentSlide + 1}`}
                className="block md:hidden w-full h-full object-cover"
              />

              {/* Overlay with title (if nombre exists) */}
              {currentPromocion.nombre && (
                <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/60 to-transparent p-6 md:p-8">
                  <h3 className="text-white font-poppins font-bold text-lg md:text-2xl">{currentPromocion.nombre}</h3>
                </div>
              )}
            </div>
          </div>

          {/* Dots navigation - moved outside the overflow-hidden container */}
          {promociones.length > 1 && (
            <div className="flex justify-center gap-2 mt-6">
              {promociones.map((_, index) => (
                <button
                  key={index}
                  onClick={() => goToSlide(index)}
                  className={`w-3 h-3 rounded-full transition-all duration-300 ${
                    currentSlide === index ? "bg-[#00F] w-8" : "bg-gray-200 hover:bg-gray-300"
                  }`}
                  aria-label={`Ir a promoción ${index + 1}`}
                />
              ))}
            </div>
          )}

          {promociones.length > 1 && (
            <>
              <button
                onClick={prevSlide}
                className="flex w-12 h-12 justify-center items-center shadow-[0_4px_6px_-1px_rgba(0,0,0,0.10),0_2px_4px_-2px_rgba(0,0,0,0.10)] absolute -translate-y-2/4 bg-[rgba(255,255,255,0.80)] p-4 rounded-full left-0 top-2/4 hover:bg-white transition-colors"
                aria-label="Promoción anterior"
              >
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path
                    d="M10 12L6 8L10 4"
                    stroke="#0000FF"
                    strokeWidth="1.33333"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </button>

              <button
                onClick={nextSlide}
                className="flex w-12 h-12 justify-center items-center shadow-[0_4px_6px_-1px_rgba(0,0,0,0.10),0_2px_4px_-2px_rgba(0,0,0,0.10)] absolute -translate-y-2/4 bg-[rgba(255,255,255,0.80)] p-4 rounded-full right-0 top-2/4 hover:bg-white transition-colors"
                aria-label="Siguiente promoción"
              >
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path
                    d="M6 12L10 8L6 4"
                    stroke="#0000FF"
                    strokeWidth="1.33333"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </button>
            </>
          )}
        </div>
      </div>
    </section>
  );
};

export default Promotions;
