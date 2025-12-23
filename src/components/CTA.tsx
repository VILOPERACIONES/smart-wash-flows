import { Button } from "@/components/ui/button";
import { MessageCircle, ArrowRight } from "lucide-react";

const CTA = () => {
  const handleWhatsAppClick = () => {
    window.open("https://wa.me/525512345678?text=Hola,%20quiero%20información%20sobre%20A%20LAVAR", "_blank");
  };

  return (
    <section className="py-20 md:py-32 bg-andrea-light">
      <div className="container px-4 md:px-6">
        <div className="relative max-w-4xl mx-auto rounded-3xl gradient-hero p-10 md:p-16 overflow-hidden">
          {/* Decorative elements */}
          <div className="absolute top-0 right-0 w-64 h-64 bg-primary-foreground/10 rounded-full blur-3xl" />
          <div className="absolute bottom-0 left-0 w-48 h-48 bg-primary-foreground/5 rounded-full blur-2xl" />

          <div className="relative text-center text-primary-foreground">
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6">
              ¿Listo para lavar
              <br />
              sin complicaciones?
            </h2>
            <p className="text-lg md:text-xl text-primary-foreground/90 max-w-xl mx-auto mb-10">
              Escríbenos ahora y resolvemos tus dudas al instante. 
              Sin formularios largos, sin esperas.
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Button 
                size="xl"
                className="w-full sm:w-auto bg-primary-foreground text-primary hover:bg-primary-foreground/90 shadow-lg"
                onClick={handleWhatsAppClick}
              >
                <MessageCircle className="w-5 h-5" />
                Escribir por WhatsApp
                <ArrowRight className="w-5 h-5" />
              </Button>
            </div>

            <p className="mt-8 text-sm text-primary-foreground/70">
              Respuesta promedio: menos de 5 minutos
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CTA;