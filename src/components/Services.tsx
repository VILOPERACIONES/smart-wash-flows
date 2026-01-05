import { Button } from "@/components/ui/button";
import { MessageCircle, Zap, Shirt, CheckCircle2, Clock, Info, ShoppingBag } from "lucide-react";
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

              {/* SECCIÓN DE PRECIOS DESTACADA */}
              <div className="bg-gradient-to-br from-primary/5 to-accent/10 border-2 border-primary rounded-2xl p-6 my-6">
                <span className="text-xs font-bold text-primary uppercase tracking-wider mb-4 block">
                  PRECIOS
                </span>
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-6">
                  {/* Precio 1 */}
                  <div className="flex flex-col">
                    <span className="text-sm font-medium text-secondary mb-1">Máquinas chicas</span>
                    <div className="flex items-baseline gap-1">
                      <span className="text-4xl font-bold text-primary">$80</span>
                      <span className="text-sm text-accent">MXN</span>
                    </div>
                  </div>
                  
                  {/* Separador */}
                  <div className="hidden sm:block w-px h-16 bg-border"></div>
                  
                  {/* Precio 2 */}
                  <div className="flex flex-col">
                    <span className="text-sm font-medium text-secondary mb-1">Máquinas grandes</span>
                    <div className="flex items-baseline gap-1">
                      <span className="text-4xl font-bold text-primary">$125</span>
                      <span className="text-sm text-accent">MXN</span>
                    </div>
                  </div>
                </div>
              </div>

              <p className="text-secondary mb-6">
                Equipos comerciales modernos a tu disposición. 
                Rápido, autónomo y sin esperas innecesarias.
              </p>

              <ul className="space-y-3 mb-6">
                <li className="flex items-center gap-3">
                  <CheckCircle2 className="w-5 h-5 text-primary flex-shrink-0" />
                  <span className="text-sm text-foreground">Equipos comerciales modernos</span>
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
                <li className="flex items-center gap-3">
                  <ShoppingBag className="w-5 h-5 text-accent flex-shrink-0" />
                  <span className="text-sm text-foreground">Productos disponibles por ciclo</span>
                </li>
              </ul>

              {/* Banner de productos disponibles */}
              <div className="bg-accent/10 border border-accent/20 rounded-xl p-4 flex items-start gap-3 mb-6">
                <ShoppingBag className="w-5 h-5 text-accent flex-shrink-0 mt-0.5" />
                <div>
                  <span className="font-bold text-sm text-accent block mb-1">¿Sin productos?</span>
                  <p className="text-sm text-secondary leading-relaxed">
                    Vendemos detergente, blanqueador y suavizante por ciclo. Compra solo lo que necesitas.
                  </p>
                </div>
              </div>

              {/* Tiempo de ciclo */}
              <div className="flex items-center gap-3 pt-4 border-t border-border">
                <Clock className="w-5 h-5 text-accent flex-shrink-0" />
                <span className="text-sm text-secondary">Ciclo de Lavado y Secado ~80 min</span>
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

              {/* SECCIÓN DE PRECIOS DESTACADA */}
              <div className="bg-background rounded-2xl p-6 md:p-7 my-6 shadow-lg text-center">
                <span className="text-xs font-bold text-primary uppercase tracking-wider mb-3 block">
                  PRECIO POR KILOGRAMO
                </span>
                <div className="flex items-baseline justify-center gap-1 mb-3">
                  <span className="text-3xl font-bold text-primary">$</span>
                  <span className="text-6xl md:text-7xl font-extrabold text-primary leading-none">30</span>
                  <span className="text-xl font-medium text-secondary">/kg</span>
                </div>
                <span className="inline-block px-4 py-1.5 rounded-full bg-primary/10 text-primary text-sm font-semibold">
                  MXN
                </span>
                
                {/* Precios especiales */}
                <div className="mt-5 pt-5 border-t border-border">
                  <span className="text-sm font-medium text-secondary block mb-2">Edredones y Hamacas</span>
                  <div className="flex items-baseline justify-center gap-1">
                    <span className="text-2xl font-bold text-primary">$80-$175</span>
                    <span className="text-sm text-secondary">MXN</span>
                  </div>
                </div>
              </div>

              <p className="text-primary-foreground/90 mb-6">
                La solución perfecta para gente ocupada. 
                Delega sin culpa y recibe tu ropa impecable el mismo día.
              </p>

              <ul className="space-y-3 mb-6">
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

              <Button 
                variant="default"
                className="w-full bg-primary-foreground text-primary hover:bg-primary-foreground/90"
                onClick={handleWhatsAppClick}
              >
                <MessageCircle className="w-4 h-4" />
                Agendar por WhatsApp
              </Button>
            </div>
          </div>
        </div>

        {/* Nota informativa sobre horarios de entrega */}
        <div className="max-w-5xl mx-auto mt-8 px-4 md:px-0">
          <aside 
            role="note" 
            aria-label="Nota importante sobre horarios de entrega"
            className="bg-accent/10 border-l-4 border-accent rounded-xl p-5 md:p-6 flex items-start gap-4 shadow-sm"
          >
            <Info className="w-5 h-5 text-accent flex-shrink-0 mt-0.5" />
            <p className="text-sm text-secondary leading-relaxed">
              <span className="font-bold text-accent">*[1]:</span>{" "}
              El servicio de lavado por encargo con entrega el mismo día está disponible de lunes a viernes para pedidos recibidos antes de las 11:00 a. m.
            </p>
          </aside>
        </div>
      </div>
    </section>
  );
};

export default Services;