import { Button } from "@/components/ui/button";
import { MessageCircle, Timer, Zap, Shirt, DollarSign, CheckCircle2 } from "lucide-react";
import selfServiceImage from "@/assets/services-self-service.jpg";
import washFoldImage from "@/assets/services-wash-fold.jpg";

const Services = () => {
  const handleWhatsAppClick = () => {
    window.open("https://wa.me/525512345678?text=Hola,%20quiero%20información%20sobre%20A%20LAVAR", "_blank");
  };

  return (
    <section id="servicios" className="py-20 md:py-32 bg-background">
      <div className="container px-4 md:px-6">
        {/* Section header */}
        <div className="text-center mb-16">
          <span className="inline-block px-4 py-1.5 rounded-full bg-accent/20 text-accent text-sm font-medium mb-4">
            Servicios
          </span>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6 text-foreground">
            Dos soluciones,
            <br />
            <span className="text-gradient">un mismo estándar</span>
          </h2>
          <p className="text-lg text-secondary max-w-2xl mx-auto">
            Elige cómo quieres lavar. Nosotros garantizamos la misma calidad y eficiencia.
          </p>
        </div>

        {/* Services grid */}
        <div className="grid lg:grid-cols-2 gap-8 max-w-5xl mx-auto">
          {/* Autoservicio Card */}
          <div className="group relative rounded-3xl bg-background border border-border shadow-card card-hover overflow-hidden transition-all duration-300 hover:border-primary">
            {/* Image */}
            <div className="aspect-video overflow-hidden">
              <img 
                src={selfServiceImage} 
                alt="Servicio de autolavado en A LAVAR" 
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              />
            </div>
            
            <div className="relative p-8 md:p-10">
              <div className="flex items-center gap-4 mb-6">
                <div className="w-14 h-14 rounded-2xl bg-primary flex items-center justify-center">
                  <Zap className="w-7 h-7 text-primary-foreground" />
                </div>
                <div>
                  <h3 className="text-2xl font-bold text-foreground">Autoservicio</h3>
                  <p className="text-sm text-secondary">Tú controlas tu tiempo</p>
                </div>
              </div>

              <p className="text-secondary mb-8">
                Máquinas industriales de última generación a tu disposición. 
                Rápido, autónomo y sin esperas innecesarias.
              </p>

              <ul className="space-y-4 mb-8">
                <li className="flex items-center gap-3">
                  <CheckCircle2 className="w-5 h-5 text-primary flex-shrink-0" />
                  <span className="text-sm text-foreground">Equipos industriales modernos</span>
                </li>
                <li className="flex items-center gap-3">
                  <CheckCircle2 className="w-5 h-5 text-primary flex-shrink-0" />
                  <span className="text-sm text-foreground">Proceso visible y entendible</span>
                </li>
                <li className="flex items-center gap-3">
                  <CheckCircle2 className="w-5 h-5 text-primary flex-shrink-0" />
                  <span className="text-sm text-foreground">Sin filas, sin fricción</span>
                </li>
                <li className="flex items-center gap-3">
                  <CheckCircle2 className="w-5 h-5 text-primary flex-shrink-0" />
                  <span className="text-sm text-foreground">Espacios limpios y ordenados</span>
                </li>
              </ul>

              <div className="flex items-center justify-between pt-6 border-t border-border">
                <div className="flex items-center gap-2">
                  <Timer className="w-5 h-5 text-primary" />
                  <span className="text-sm font-medium text-foreground">~60 min ciclo completo</span>
                </div>
              </div>
            </div>
          </div>

          {/* Lavado por encargo Card */}
          <div className="group relative rounded-3xl gradient-hero text-primary-foreground shadow-card card-hover overflow-hidden">
            {/* Image */}
            <div className="aspect-video overflow-hidden relative">
              <img 
                src={washFoldImage} 
                alt="Ropa limpia y doblada del servicio de lavado por encargo" 
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              />
              {/* Badge */}
              <div className="absolute top-4 right-4">
                <span className="px-3 py-1 rounded-full bg-primary text-primary-foreground text-sm font-medium backdrop-blur-sm">
                  Más popular
                </span>
              </div>
            </div>

            <div className="relative p-8 md:p-10">
              <div className="flex items-center gap-4 mb-6">
                <div className="w-14 h-14 rounded-2xl bg-primary-foreground/20 backdrop-blur-sm flex items-center justify-center">
                  <Shirt className="w-7 h-7" />
                </div>
                <div>
                  <h3 className="text-2xl font-bold">Lavado por encargo</h3>
                  <p className="text-sm text-primary-foreground/80">Nosotros nos encargamos</p>
                </div>
              </div>

              <p className="text-primary-foreground/90 mb-8">
                La solución perfecta para gente ocupada. 
                Delega sin culpa y recibe tu ropa impecable el mismo día.
              </p>

              <ul className="space-y-4 mb-8">
                <li className="flex items-center gap-3">
                  <CheckCircle2 className="w-5 h-5 flex-shrink-0" />
                  <span className="text-sm">Precio claro: $30/kg</span>
                </li>
                <li className="flex items-center gap-3">
                  <CheckCircle2 className="w-5 h-5 flex-shrink-0" />
                  <span className="text-sm">Entrega el mismo día</span>
                </li>
                <li className="flex items-center gap-3">
                  <CheckCircle2 className="w-5 h-5 flex-shrink-0" />
                  <span className="text-sm">Lavado + secado + doblado</span>
                </li>
                <li className="flex items-center gap-3">
                  <CheckCircle2 className="w-5 h-5 flex-shrink-0" />
                  <span className="text-sm">Seguimiento por WhatsApp</span>
                </li>
              </ul>

              <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 pt-6 border-t border-primary-foreground/20">
                <div className="flex items-center gap-2">
                  <DollarSign className="w-5 h-5" />
                  <span className="text-2xl font-bold">$30</span>
                  <span className="text-sm text-primary-foreground/80">/kg</span>
                </div>
                <Button 
                  variant="default"
                  className="sm:ml-auto bg-primary-foreground text-primary hover:bg-primary-foreground/90"
                  onClick={handleWhatsAppClick}
                >
                  <MessageCircle className="w-4 h-4" />
                  Agendar por WhatsApp
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Services;