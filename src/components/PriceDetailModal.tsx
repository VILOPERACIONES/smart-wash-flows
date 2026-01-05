import { useEffect, useState } from "react";
import { X } from "lucide-react";
import { useIsMobile } from "@/hooks/use-mobile";

interface ImageData {
  url: string;
  nombre: string;
  tamaño: string;
  fechaSubida: string;
  dimensiones: string;
}

interface DetallePreciosData {
  imagenDesktop: ImageData | null;
  imagenMobile: ImageData | null;
}

interface PriceDetailModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const PriceDetailModal = ({ isOpen, onClose }: PriceDetailModalProps) => {
  const [data, setData] = useState<DetallePreciosData | null>(null);
  const isMobile = useIsMobile();

  useEffect(() => {
    const saved = localStorage.getItem("detallePreciosData");
    if (saved) {
      setData(JSON.parse(saved));
    }
  }, [isOpen]);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  if (!isOpen) return null;

  const imageToShow = isMobile ? data?.imagenMobile : data?.imagenDesktop;
  const fallbackImage = isMobile ? data?.imagenDesktop : data?.imagenMobile;
  const displayImage = imageToShow || fallbackImage;

  return (
    <div 
      className="fixed inset-0 bg-black/85 backdrop-blur-sm z-[1000] flex items-center justify-center p-4 animate-in fade-in duration-200"
      onClick={onClose}
    >
      <div 
        className="relative bg-white rounded-2xl max-w-[1200px] w-full max-h-[90vh] overflow-hidden shadow-2xl animate-in zoom-in-95 duration-300"
        onClick={e => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between p-5 border-b border-gray-200">
          <h2 className="text-xl font-bold text-black">Detalle de Precios</h2>
          <button
            onClick={onClose}
            className="w-9 h-9 bg-gray-100 hover:bg-[#0000FF]/10 hover:text-[#0000FF] rounded-lg flex items-center justify-center transition-colors"
            aria-label="Cerrar"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 overflow-auto max-h-[calc(90vh-80px)]">
          {displayImage ? (
            <img 
              src={displayImage.url} 
              alt="Detalle de precios"
              className="w-full h-auto object-contain rounded-lg"
            />
          ) : (
            <div className="text-center py-16">
              <p className="text-gray-500 text-lg">No hay imagen de precios disponible.</p>
              <p className="text-gray-400 text-sm mt-2">El administrador aún no ha subido las imágenes.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
