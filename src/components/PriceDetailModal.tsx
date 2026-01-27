import React from "react";
import {
  Dialog,
  DialogContent,
} from "@/components/ui/dialog";
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

const PriceRow: React.FC<PriceRowProps> = ({ name, priceCard, priceNoCard }) => (
  <div className="flex justify-between items-center py-2 border-b border-gray-100 last:border-b-0">
    <span className="text-[#003A9E] font-poppins text-sm">{name}</span>
    <div className="flex items-center gap-2 text-right">
      <span className="text-[#00F] font-poppins font-bold text-sm">{priceCard}</span>
      {priceNoCard && (
        <span className="text-[#003A9E]/60 font-poppins text-xs">/ {priceNoCard}</span>
      )}
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
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-3xl w-[95vw] max-h-[90vh] overflow-y-auto p-0 bg-[#0033A0] border-none rounded-2xl">
        {/* Header */}
        <div className="sticky top-0 z-10 bg-[#0033A0] pt-6 pb-4 px-6 text-center">
          <button
            onClick={onClose}
            className="absolute right-4 top-4 text-white/70 hover:text-white transition-colors z-20"
          >
            <X className="w-6 h-6" />
          </button>
          
          <img 
            src={logoWhite} 
            alt="A Lavar" 
            className="h-8 md:h-10 mx-auto mb-3"
          />
          <h3 className="text-white font-poppins text-xl md:text-2xl font-bold">
            Lista de Precios
          </h3>
        </div>

        {/* Content */}
        <div className="bg-white mx-3 md:mx-6 mb-4 md:mb-6 rounded-xl p-4 md:p-6">
          {/* Monedero highlight */}
          <div className="bg-gradient-to-r from-[#00F]/10 to-[#4A80DE]/10 rounded-xl p-3 md:p-4 mb-5 flex justify-between items-center">
            <span className="text-[#0033A0] font-poppins text-sm md:text-base font-semibold">
              Costo del monedero
            </span>
            <span className="text-[#00F] font-poppins text-lg md:text-xl font-bold">$40</span>
          </div>

          {/* Grid Layout - responsive */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-4">
            {/* Column 1 */}
            <div>
              <Section title="Lavadoras">
                <PriceRow name="Lavadora chica" priceCard="$30" priceNoCard="$35" />
                <PriceRow name="Lavadora grande" priceCard="$55" priceNoCard="$60" />
              </Section>

              <Section title="Secadoras">
                <PriceRow name="Secadora chica" priceCard="$50" priceNoCard="$55" />
                <PriceRow name="Secadora grande" priceCard="$70" priceNoCard="$75" />
                <PriceRow name="Medio tiempo (20 min)" priceCard="$35" priceNoCard="$40" />
              </Section>

              <Section title="Punto de Venta">
                <div className="grid grid-cols-2 gap-x-4">
                  <PriceRow name="Detergente" priceCard="$8" />
                  <PriceRow name="Suavizante" priceCard="$8" />
                  <PriceRow name="Pinol" priceCard="$8" />
                  <PriceRow name="Vinagre" priceCard="$8" />
                  <PriceRow name="Cloro" priceCard="$8" />
                  <PriceRow name="Vanish" priceCard="$12" />
                  <PriceRow name="Jabón zote líquido" priceCard="$10" />
                  <PriceRow name="Perlitas" priceCard="$20" />
                  <PriceRow name="Hojitas suavizantes" priceCard="$2 c/u" />
                  <PriceRow name="Bolsas" priceCard="$3" />
                </div>
              </Section>
            </div>

            {/* Column 2 */}
            <div>
              <Section title="Por Encargo">
                <div className="space-y-2">
                  <div className="bg-[#00F]/5 rounded-lg p-3 flex justify-between items-center">
                    <div>
                      <p className="text-[#003A9E] font-poppins text-sm font-medium">Lavado por encargo</p>
                      <p className="text-[#003A9E]/60 font-poppins text-xs">Mínimo 5kg</p>
                    </div>
                    <span className="text-[#00F] font-poppins text-xl font-bold">$30<span className="text-sm font-normal">/kg</span></span>
                  </div>
                  <div className="bg-[#00F]/5 rounded-lg p-3 flex justify-between items-center">
                    <div>
                      <p className="text-[#003A9E] font-poppins text-sm font-medium">Secado por encargo</p>
                      <p className="text-[#003A9E]/60 font-poppins text-xs">Mínimo 5kg</p>
                    </div>
                    <span className="text-[#00F] font-poppins text-xl font-bold">$20<span className="text-sm font-normal">/kg</span></span>
                  </div>
                </div>
              </Section>

              <Section title="Edredones">
                <div className="overflow-hidden rounded-lg border border-gray-100">
                  <table className="w-full text-sm">
                    <thead className="bg-[#00F]/5">
                      <tr>
                        <th className="text-left text-[#003A9E] font-poppins font-semibold py-2 px-3">Tamaño</th>
                        <th className="text-center text-[#003A9E] font-poppins font-semibold py-2 px-2">Ligero</th>
                        <th className="text-center text-[#003A9E] font-poppins font-semibold py-2 px-2">Pesado</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr className="border-t border-gray-100">
                        <td className="text-[#003A9E] font-poppins py-2 px-3">Individual</td>
                        <td className="text-center text-[#00F] font-poppins font-bold py-2">$85</td>
                        <td className="text-center text-[#00F] font-poppins font-bold py-2">$110</td>
                      </tr>
                      <tr className="border-t border-gray-100">
                        <td className="text-[#003A9E] font-poppins py-2 px-3">Matrimonial</td>
                        <td className="text-center text-[#00F] font-poppins font-bold py-2">$100</td>
                        <td className="text-center text-[#00F] font-poppins font-bold py-2">$135</td>
                      </tr>
                      <tr className="border-t border-gray-100">
                        <td className="text-[#003A9E] font-poppins py-2 px-3">Queen/King</td>
                        <td className="text-center text-[#00F] font-poppins font-bold py-2">$120</td>
                        <td className="text-center text-[#00F] font-poppins font-bold py-2">$175</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </Section>

              <Section title="Hamacas (sin marco)">
                <PriceRow name="Individual" priceCard="$110" />
                <PriceRow name="Matrimonial" priceCard="$135" />
                <PriceRow name="Queen/King size" priceCard="$175" />
              </Section>
            </div>
          </div>

          {/* Legend */}
          <div className="mt-4 pt-3 border-t border-gray-200 flex flex-wrap gap-4 justify-center text-xs text-[#003A9E]/60">
            <span>Precios con tarjeta / sin tarjeta</span>
            <span>•</span>
            <span>Precios en MXN</span>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default PriceDetailModal;
