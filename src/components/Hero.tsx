import { Button } from "@/components/ui/button";
import { MessageCircle, Clock, Tag } from "lucide-react";
import heroImage from "@/assets/hero-laundry.jpg";

const Hero = () => {
  const handleWhatsAppClick = () => {
    window.open("https://wa.me/525512345678?text=Hola,%20quiero%20información%20sobre%20A%20LAVAR", "_blank");
  };

  return (
    <section className="relative min-h-[90vh] flex items-center overflow-hidden bg-background">
      {/* Subtle grid pattern */}
      <div 
        className="absolute inset-0 opacity-[0.02]"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%230000FF' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
        }}
      />

      <div className="container relative z-10 px-6 md:px-20 py-12 md:py-0">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-center">
          {/* Left Column - Content */}
          <div className="order-1">
            {/* Badge */}
            <div className="animate-fade-in inline-flex items-center gap-2 px-4 py-2 rounded-full bg-accent text-accent-foreground mb-6">
              <Clock className="w-4 h-4" />
              <span className="text-sm font-medium">Entrega el mismo día</span>
            </div>

            {/* Main headline */}
            <h1 
              className="animate-fade-in text-[2.5rem] md:text-[3.5rem] font-bold leading-[1.1] mb-6 text-foreground"
              style={{ animationDelay: '100ms' }}
            >
              Lavar tu ropa
              <br />
              <span className="text-primary">nunca fue tan fácil</span>
            </h1>

            {/* Subheadline */}
            <div 
              className="animate-fade-in mb-10"
              style={{ animationDelay: '200ms' }}
            >
              <p className="text-lg md:text-[1.125rem] leading-relaxed text-accent mb-1">
                Tecnología aplicada al lavado. Procesos claros, tiempos reales y cero complicaciones.
              </p>
              <p className="text-lg md:text-[1.125rem] font-bold text-secondary">
                Tú decides, nosotros ejecutamos.
              </p>
            </div>

            {/* CTA Buttons */}
            <div 
              className="animate-fade-in flex flex-col sm:flex-row gap-4"
              style={{ animationDelay: '300ms' }}
            >
              <Button 
                variant="hero" 
                size="xl"
                onClick={handleWhatsAppClick}
                className="w-full sm:w-auto px-8 py-4 text-base font-bold"
              >
                <MessageCircle className="w-5 h-5" />
                Escríbenos por WhatsApp
              </Button>
              <Button 
                variant="heroOutline" 
                size="xl"
                className="w-full sm:w-auto px-8 py-4 text-base font-medium"
                onClick={() => document.getElementById('servicios')?.scrollIntoView({ behavior: 'smooth' })}
              >
                Ver servicios
              </Button>
            </div>

            {/* Features badges */}
            <div 
              className="animate-fade-in mt-12 grid grid-cols-1 sm:grid-cols-3 gap-6"
              style={{ animationDelay: '400ms' }}
            >
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-accent/20 flex items-center justify-center flex-shrink-0">
                  <Tag className="w-5 h-5 text-accent" />
                </div>
                <div className="text-left">
                  <p className="text-sm font-bold text-foreground">$30/kg</p>
                  <p className="text-xs text-secondary">Precio claro</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-accent/20 flex items-center justify-center flex-shrink-0">
                  <Clock className="w-5 h-5 text-accent" />
                </div>
                <div className="text-left">
                  <p className="text-sm font-bold text-foreground">Mismo día</p>
                  <p className="text-xs text-secondary">Entrega rápida</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-accent/20 flex items-center justify-center flex-shrink-0">
                  <MessageCircle className="w-5 h-5 text-accent" />
                </div>
                <div className="text-left">
                  <p className="text-sm font-bold text-foreground">WhatsApp</p>
                  <p className="text-xs text-secondary">Respuesta inmediata</p>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column - Image */}
          <div 
            className="order-2 animate-fade-in"
            style={{ animationDelay: '200ms' }}
          >
            <div 
              className="relative w-full aspect-[4/5] lg:aspect-[4/5] rounded-3xl lg:rounded-[24px] overflow-hidden shadow-hero group"
              style={{ 
                boxShadow: '0 20px 60px rgba(0, 0, 255, 0.15)',
                minHeight: '300px'
              }}
            >
              {/* Hero image */}
              <img 
                src={heroImage} 
                alt="Interior moderno de lavandería A LAVAR con máquinas industriales" 
                className="absolute inset-0 w-full h-full object-cover"
              />
              
              {/* Hover overlay */}
              <div className="absolute inset-0 bg-primary/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
