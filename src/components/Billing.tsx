import { FileText, CheckCircle, Info, ArrowRight, MessageCircle } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";

const requirements = [
  "RFC (Registro Federal de Contribuyentes)",
  "Correo electrónico",
  "Número de ticket de compra",
  "Uso de CFDI",
];

const Billing = () => {
  const navigate = useNavigate();

  const handleWhatsAppClick = () => {
    window.open("https://wa.me/525512345678?text=Hola,%20necesito%20ayuda%20con%20mi%20factura", "_blank");
  };

  return (
    <section id="facturacion" className="py-16 md:py-24 bg-background">
      <div className="container px-6 md:px-20 max-w-[1200px] mx-auto">
        {/* Header */}
        <div className="text-center mb-14">
          <span className="inline-block px-5 py-2 rounded-full bg-accent/10 text-accent text-sm font-semibold mb-5">
            Facturación
          </span>
          <h2 className="text-3xl md:text-[2.5rem] font-bold mb-4 text-foreground tracking-tight">
            Solicita tu factura fácilmente
          </h2>
          <p className="text-lg text-secondary max-w-[700px] mx-auto leading-relaxed">
            Genera tu CFDI de manera rápida y sin complicaciones. Solo necesitas tu ticket de compra.
          </p>
        </div>

        {/* Main Card */}
        <div className="max-w-[800px] mx-auto bg-gradient-to-br from-primary/[0.03] to-accent/[0.05] border-2 border-primary/10 rounded-[20px] p-8 md:p-12 shadow-[0_4px_20px_rgba(0,0,255,0.08)]">
          {/* Decorative Icon */}
          <div className="flex justify-center mb-8">
            <div className="w-24 h-24 md:w-28 md:h-28 rounded-2xl bg-primary/10 flex items-center justify-center">
              <FileText className="w-12 h-12 md:w-16 md:h-16 text-primary" />
            </div>
          </div>

          {/* Requirements Title */}
          <h3 className="text-lg font-semibold text-foreground text-center mb-6">
            Datos que necesitarás:
          </h3>

          {/* Requirements Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 max-w-[600px] mx-auto mb-8">
            {requirements.map((requirement, index) => (
              <div
                key={index}
                className="flex items-center gap-3 bg-background px-4 py-3 rounded-[10px] shadow-[0_2px_8px_rgba(0,0,0,0.04)]"
              >
                <CheckCircle className="w-5 h-5 text-accent flex-shrink-0" />
                <span className="text-[0.95rem] font-medium text-secondary">
                  {requirement}
                </span>
              </div>
            ))}
          </div>

          {/* Important Note */}
          <div className="max-w-[600px] mx-auto mb-8 bg-accent/[0.08] border-l-4 border-accent rounded-lg p-4 md:p-5">
            <div className="flex gap-3 items-start">
              <Info className="w-5 h-5 text-accent flex-shrink-0 mt-0.5" />
              <p className="text-sm text-secondary leading-relaxed">
                Tienes 30 días a partir de la fecha de compra para solicitar tu factura.
              </p>
            </div>
          </div>

          {/* CTA Button */}
          <div className="flex flex-col items-center">
            <Button
              onClick={() => navigate("/facturacion")}
              className="w-full md:w-auto px-12 py-6 text-lg font-bold rounded-xl shadow-[0_8px_20px_rgba(0,0,255,0.3)] hover:shadow-[0_12px_28px_rgba(0,0,255,0.4)] hover:-translate-y-0.5 active:translate-y-0 transition-all duration-300"
            >
              Solicitar factura
              <ArrowRight className="w-5 h-5 ml-2" />
            </Button>

            {/* Support Text */}
            <p className="mt-5 text-sm text-secondary text-center">
              ¿Necesitas ayuda?{" "}
              <button
                onClick={handleWhatsAppClick}
                className="text-primary font-semibold hover:underline inline-flex items-center gap-1"
              >
                Escríbenos por WhatsApp
                <MessageCircle className="w-4 h-4" />
              </button>
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Billing;
