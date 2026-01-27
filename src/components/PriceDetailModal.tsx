import React from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { X } from "lucide-react";

interface PriceDetailModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const PriceDetailModal: React.FC<PriceDetailModalProps> = ({ isOpen, onClose }) => {
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl w-[95vw] max-h-[90vh] overflow-y-auto p-0 bg-gradient-to-b from-[#0033A0] to-[#001f5c] border-none rounded-2xl">
        {/* Header */}
        <div className="sticky top-0 z-10 bg-gradient-to-b from-[#0033A0] to-[#0033A0] pt-6 pb-4 px-6 md:px-10">
          <button
            onClick={onClose}
            className="absolute right-4 top-4 text-white/70 hover:text-white transition-colors"
          >
            <X className="w-6 h-6" />
          </button>
          
          <div className="text-center">
            <h2 className="text-white font-poppins text-2xl md:text-3xl font-bold italic mb-1">
              a lavar
            </h2>
            <p className="text-white/80 font-poppins text-sm md:text-base italic">
              mejor y más rápido
            </p>
            <h3 className="text-white font-poppins text-xl md:text-2xl font-bold mt-4">
              Lista de Precios
            </h3>
          </div>
        </div>

        {/* Content */}
        <div className="bg-white mx-4 md:mx-8 mb-6 rounded-xl p-5 md:p-8">
          {/* Desktop: 2 columns / Mobile: 1 column */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-10">
            {/* Left Column */}
            <div className="space-y-6">
              {/* Costo Monedero */}
              <div className="bg-[#4A80DE]/10 rounded-xl p-4">
                <p className="text-[#0033A0] font-poppins text-base md:text-lg font-bold">
                  Costo del monedero: <span className="text-[#00F]">$40</span>
                </p>
              </div>

              {/* Lavadoras */}
              <div>
                <h4 className="text-[#0033A0] font-poppins text-lg font-bold mb-3 pb-2 border-b-2 border-[#00F]">
                  Lavadoras
                </h4>
                <div className="space-y-2">
                  <div className="flex justify-between items-start py-2">
                    <span className="text-[#003A9E] font-poppins text-sm md:text-base">Lavadora chica</span>
                    <div className="text-right">
                      <span className="text-[#00F] font-poppins font-bold text-sm md:text-base">$30</span>
                      <span className="text-[#003A9E] font-poppins text-xs md:text-sm ml-1">con tarjeta</span>
                      <span className="text-[#003A9E] font-poppins text-xs md:text-sm ml-2">/ $35 sin tarjeta</span>
                    </div>
                  </div>
                  <div className="flex justify-between items-start py-2">
                    <span className="text-[#003A9E] font-poppins text-sm md:text-base">Lavadora grande</span>
                    <div className="text-right">
                      <span className="text-[#00F] font-poppins font-bold text-sm md:text-base">$55</span>
                      <span className="text-[#003A9E] font-poppins text-xs md:text-sm ml-1">con tarjeta</span>
                      <span className="text-[#003A9E] font-poppins text-xs md:text-sm ml-2">/ $60 sin tarjeta</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Secadoras */}
              <div>
                <h4 className="text-[#0033A0] font-poppins text-lg font-bold mb-3 pb-2 border-b-2 border-[#00F]">
                  Secadoras
                </h4>
                <div className="space-y-2">
                  <div className="flex justify-between items-start py-2">
                    <span className="text-[#003A9E] font-poppins text-sm md:text-base">Secadora chica</span>
                    <div className="text-right">
                      <span className="text-[#00F] font-poppins font-bold text-sm md:text-base">$50</span>
                      <span className="text-[#003A9E] font-poppins text-xs md:text-sm ml-1">con tarjeta</span>
                      <span className="text-[#003A9E] font-poppins text-xs md:text-sm ml-2">/ $55 sin tarjeta</span>
                    </div>
                  </div>
                  <div className="flex justify-between items-start py-2">
                    <span className="text-[#003A9E] font-poppins text-sm md:text-base">Secadora grande</span>
                    <div className="text-right">
                      <span className="text-[#00F] font-poppins font-bold text-sm md:text-base">$70</span>
                      <span className="text-[#003A9E] font-poppins text-xs md:text-sm ml-1">con tarjeta</span>
                      <span className="text-[#003A9E] font-poppins text-xs md:text-sm ml-2">/ $75 sin tarjeta</span>
                    </div>
                  </div>
                  <div className="flex justify-between items-start py-2">
                    <span className="text-[#003A9E] font-poppins text-sm md:text-base">Secadora medio tiempo <span className="text-xs">(20 min)</span></span>
                    <div className="text-right">
                      <span className="text-[#00F] font-poppins font-bold text-sm md:text-base">$35</span>
                      <span className="text-[#003A9E] font-poppins text-xs md:text-sm ml-1">con tarjeta</span>
                      <span className="text-[#003A9E] font-poppins text-xs md:text-sm ml-2">/ $40 sin tarjeta</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Punto de Venta */}
              <div>
                <h4 className="text-[#0033A0] font-poppins text-lg font-bold mb-3 pb-2 border-b-2 border-[#00F]">
                  Punto de Venta
                </h4>
                <div className="grid grid-cols-2 gap-2">
                  <div className="flex justify-between py-1">
                    <span className="text-[#003A9E] font-poppins text-xs md:text-sm">1 medida detergente</span>
                    <span className="text-[#00F] font-poppins font-bold text-xs md:text-sm">$8</span>
                  </div>
                  <div className="flex justify-between py-1">
                    <span className="text-[#003A9E] font-poppins text-xs md:text-sm">1 medida suavizante</span>
                    <span className="text-[#00F] font-poppins font-bold text-xs md:text-sm">$8</span>
                  </div>
                  <div className="flex justify-between py-1">
                    <span className="text-[#003A9E] font-poppins text-xs md:text-sm">1 medida pinol</span>
                    <span className="text-[#00F] font-poppins font-bold text-xs md:text-sm">$8</span>
                  </div>
                  <div className="flex justify-between py-1">
                    <span className="text-[#003A9E] font-poppins text-xs md:text-sm">1 medida vinagre</span>
                    <span className="text-[#00F] font-poppins font-bold text-xs md:text-sm">$8</span>
                  </div>
                  <div className="flex justify-between py-1">
                    <span className="text-[#003A9E] font-poppins text-xs md:text-sm">1 medida cloro</span>
                    <span className="text-[#00F] font-poppins font-bold text-xs md:text-sm">$8</span>
                  </div>
                  <div className="flex justify-between py-1">
                    <span className="text-[#003A9E] font-poppins text-xs md:text-sm">1 medida vanish</span>
                    <span className="text-[#00F] font-poppins font-bold text-xs md:text-sm">$12</span>
                  </div>
                  <div className="flex justify-between py-1">
                    <span className="text-[#003A9E] font-poppins text-xs md:text-sm">Jabón zote líquido</span>
                    <span className="text-[#00F] font-poppins font-bold text-xs md:text-sm">$10</span>
                  </div>
                  <div className="flex justify-between py-1">
                    <span className="text-[#003A9E] font-poppins text-xs md:text-sm">Perlitas</span>
                    <span className="text-[#00F] font-poppins font-bold text-xs md:text-sm">$20</span>
                  </div>
                  <div className="flex justify-between py-1">
                    <span className="text-[#003A9E] font-poppins text-xs md:text-sm">Hojitas suavizantes</span>
                    <span className="text-[#00F] font-poppins font-bold text-xs md:text-sm">$2 c/u</span>
                  </div>
                  <div className="flex justify-between py-1">
                    <span className="text-[#003A9E] font-poppins text-xs md:text-sm">Bolsas</span>
                    <span className="text-[#00F] font-poppins font-bold text-xs md:text-sm">$3</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Column */}
            <div className="space-y-6">
              {/* Por Encargo */}
              <div>
                <h4 className="text-[#0033A0] font-poppins text-lg font-bold mb-3 pb-2 border-b-2 border-[#00F]">
                  Por Encargo
                </h4>
                <div className="space-y-3">
                  <div className="bg-[#00F]/5 rounded-lg p-3">
                    <div className="flex justify-between items-center">
                      <span className="text-[#003A9E] font-poppins text-sm md:text-base font-medium">Lavado por encargo</span>
                      <span className="text-[#00F] font-poppins font-bold text-lg md:text-xl">$30<span className="text-sm font-normal">/kg</span></span>
                    </div>
                    <p className="text-[#003A9E]/70 font-poppins text-xs mt-1">Carga mínima de 5kg</p>
                  </div>
                  <div className="bg-[#00F]/5 rounded-lg p-3">
                    <div className="flex justify-between items-center">
                      <span className="text-[#003A9E] font-poppins text-sm md:text-base font-medium">Secado por encargo</span>
                      <span className="text-[#00F] font-poppins font-bold text-lg md:text-xl">$20<span className="text-sm font-normal">/kg</span></span>
                    </div>
                    <p className="text-[#003A9E]/70 font-poppins text-xs mt-1">Carga mínima de 5kg</p>
                  </div>
                </div>
              </div>

              {/* Edredones */}
              <div>
                <h4 className="text-[#0033A0] font-poppins text-lg font-bold mb-3 pb-2 border-b-2 border-[#00F]">
                  Edredones
                </h4>
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="border-b border-gray-200">
                        <th className="text-left text-[#003A9E] font-poppins text-xs md:text-sm font-semibold py-2">Tamaño</th>
                        <th className="text-center text-[#003A9E] font-poppins text-xs md:text-sm font-semibold py-2">Ligero</th>
                        <th className="text-center text-[#003A9E] font-poppins text-xs md:text-sm font-semibold py-2">Pesado</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr className="border-b border-gray-100">
                        <td className="text-[#003A9E] font-poppins text-xs md:text-sm py-2">Individual</td>
                        <td className="text-center text-[#00F] font-poppins font-bold text-xs md:text-sm py-2">$85</td>
                        <td className="text-center text-[#00F] font-poppins font-bold text-xs md:text-sm py-2">$110</td>
                      </tr>
                      <tr className="border-b border-gray-100">
                        <td className="text-[#003A9E] font-poppins text-xs md:text-sm py-2">Matrimonial</td>
                        <td className="text-center text-[#00F] font-poppins font-bold text-xs md:text-sm py-2">$100</td>
                        <td className="text-center text-[#00F] font-poppins font-bold text-xs md:text-sm py-2">$135</td>
                      </tr>
                      <tr>
                        <td className="text-[#003A9E] font-poppins text-xs md:text-sm py-2">Queen/King</td>
                        <td className="text-center text-[#00F] font-poppins font-bold text-xs md:text-sm py-2">$120</td>
                        <td className="text-center text-[#00F] font-poppins font-bold text-xs md:text-sm py-2">$175</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>

              {/* Hamacas */}
              <div>
                <h4 className="text-[#0033A0] font-poppins text-lg font-bold mb-3 pb-2 border-b-2 border-[#00F]">
                  Hamacas <span className="font-normal text-sm">(sin marco de madera)</span>
                </h4>
                <div className="space-y-2">
                  <div className="flex justify-between py-2 border-b border-gray-100">
                    <span className="text-[#003A9E] font-poppins text-sm md:text-base">Individual</span>
                    <span className="text-[#00F] font-poppins font-bold text-sm md:text-base">$110</span>
                  </div>
                  <div className="flex justify-between py-2 border-b border-gray-100">
                    <span className="text-[#003A9E] font-poppins text-sm md:text-base">Matrimonial</span>
                    <span className="text-[#00F] font-poppins font-bold text-sm md:text-base">$135</span>
                  </div>
                  <div className="flex justify-between py-2">
                    <span className="text-[#003A9E] font-poppins text-sm md:text-base">Queen/King size</span>
                    <span className="text-[#00F] font-poppins font-bold text-sm md:text-base">$175</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Footer note */}
          <div className="mt-6 pt-4 border-t border-gray-200">
            <p className="text-[#003A9E]/60 font-poppins text-xs text-center">
              Precios en MXN. Válidos en todas nuestras sucursales. Precios sujetos a cambio sin previo aviso.
            </p>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default PriceDetailModal;
