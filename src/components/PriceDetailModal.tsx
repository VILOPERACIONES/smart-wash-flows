import React, { useEffect, useState } from "react";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { X } from "lucide-react";
import logoWhite from "@/assets/logo-alavar-white.png";

interface PriceDetailModalProps {
  isOpen: boolean;
  onClose: () => void;
}

interface PriceRowProps {
  name: string;
  priceCard: string;
  priceNoCard?: string;
}

interface PrecioDetail {
  imagen_desktop: string | null;
  imagen_mobile: string | null;
}

const PriceRow: React.FC<PriceRowProps> = ({ name, priceCard, priceNoCard }) => (
  <div className="flex justify-between items-center py-2 border-b border-gray-100 last:border-b-0">
    <span className="text-[#003A9E] font-poppins text-sm">{name}</span>
    <div className="flex items-center gap-2 text-right">
      <span className="text-[#00F] font-poppins font-bold text-sm">{priceCard}</span>
      {priceNoCard && <span className="text-[#003A9E]/60 font-poppins text-xs">/ {priceNoCard}</span>}
    </div>
  </div>
);

interface SectionProps {
  title: string;
  children: React.ReactNode;
}

const Section: React.FC<SectionProps> = ({ title, children }) => (
  <div className="mb-5">
    <h4 className="text-[#0033A0] font-poppins text-sm font-bold uppercase tracking-wide mb-2 pb-2 border-b-2 border-[#00F]">
      {title}
    </h4>
    <div>{children}</div>
  </div>
);

const PriceDetailModal: React.FC<PriceDetailModalProps> = ({ isOpen, onClose }) => {
  const [data, setData] = useState<PrecioDetail | null>(null);
  useEffect(() => {
    fetch("https://admin.alavar.mx/api/precioDetail")
      .then((res) => res.json())
      .then((data) => setData(data))
      .catch((err) => console.error("Error cargando precios:", err));
  }, []);

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-3xl w-[95vw] max-h-[90vh] overflow-y-auto p-0 bg-transparent border-none rounded-2xl">
        {/* Header */}
        <div className="sticky top-0 z-10 bg-transparent pt-6 pb-4 px-6 text-center">
          <button
            onClick={onClose}
            className="absolute right-4 top-4 text-white/70 hover:text-white transition-colors z-20"
          >
            <X className="w-6 h-6" />
          </button>

          {/* <img src={logoWhite} alt="A Lavar" className="h-8 md:h-10 mx-auto mb-3" />
          <h3 className="text-white font-poppins text-xl md:text-2xl font-bold">Lista de Precios</h3> */}
        </div>
        <div className="flex justify-center items-center">
          {data?.imagen_desktop && (
            <img
              src={data.imagen_desktop}
              alt="A Lavar precios desktop"
              className="hidden sm:flex sm:justify-center sm:w-[500px] sm:h-auto  object-cover md:p-6 md:mx-6 rounded-[2.75rem] z-[20]"
            />
          )}

          {data?.imagen_mobile && (
            <img
              src={data.imagen_mobile}
              alt="A Lavar precios mobile"
              className="block sm:hidden w-[398px] h-auto p-6 mx-6 rounded-[2.75rem] z-[20] "
            />
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default PriceDetailModal;
