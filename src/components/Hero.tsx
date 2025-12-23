import { Button } from "@/components/ui/button";
import { MessageCircle, Clock, Sparkles } from "lucide-react";

const Hero = () => {
  const handleWhatsAppClick = () => {
    window.open("https://wa.me/525512345678?text=Hola,%20quiero%20información%20sobre%20A%20LAVAR", "_blank");
  };

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-background">
      {/* Background gradient glow */}
      <div className="absolute inset-0 gradient-glow opacity-60" />
      
      {/* Subtle grid pattern */}
      <div 
        className="absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%230000FF' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
        }}
      />

      <div className="container relative z-10 px-4 md:px-6">
        <div className="max-w-4xl mx-auto text-center">
          {/* Badge - Andrea Blue background */}
          <div className="animate-fade-up inline-flex items-center gap-2 px-4 py-2 rounded-full bg-accent text-accent-foreground mb-8">
            <Clock className="w-4 h-4" />
            <span className="text-sm font-medium">Entrega el mismo día</span>
          </div>

          {/* Main headline - Black */}
          <h1 className="animate-fade-up animation-delay-100 text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold leading-tight mb-6 text-foreground">
            Lavar tu ropa
            <br />
            <span className="text-gradient">nunca fue tan fácil</span>
          </h1>

          {/* Subheadline - Dark Powder Blue */}
          <p className="animate-fade-up animation-delay-200 text-lg md:text-xl text-secondary max-w-2xl mx-auto mb-10">
            Tecnología aplicada al lavado. Procesos claros, tiempos reales y cero complicaciones. 
            <span className="text-foreground font-medium"> Tú decides, nosotros ejecutamos.</span>
          </p>

          {/* CTA Buttons */}
          <div className="animate-fade-up animation-delay-300 flex flex-col sm:flex-row items-center justify-center gap-4">
            <Button 
              variant="hero" 
              size="xl"
              onClick={handleWhatsAppClick}
              className="w-full sm:w-auto"
            >
              <MessageCircle className="w-5 h-5" />
              Escríbenos por WhatsApp
            </Button>
            <Button 
              variant="heroOutline" 
              size="xl"
              className="w-full sm:w-auto"
              onClick={() => document.getElementById('servicios')?.scrollIntoView({ behavior: 'smooth' })}
            >
              Ver servicios
            </Button>
          </div>

          {/* Trust indicators */}
          <div className="animate-fade-up animation-delay-400 mt-16 flex flex-col md:flex-row items-center justify-center gap-8 md:gap-12">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-accent/20 flex items-center justify-center">
                <Sparkles className="w-5 h-5 text-primary" />
              </div>
              <div className="text-left">
                <p className="text-sm font-semibold text-foreground">$30/kg</p>
                <p className="text-xs text-muted-foreground">Precio claro</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-accent/20 flex items-center justify-center">
                <Clock className="w-5 h-5 text-primary" />
              </div>
              <div className="text-left">
                <p className="text-sm font-semibold text-foreground">Mismo día</p>
                <p className="text-xs text-muted-foreground">Entrega rápida</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-accent/20 flex items-center justify-center">
                <MessageCircle className="w-5 h-5 text-primary" />
              </div>
              <div className="text-left">
                <p className="text-sm font-semibold text-foreground">WhatsApp</p>
                <p className="text-xs text-muted-foreground">Respuesta inmediata</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom fade */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-background to-transparent" />
    </section>
  );
};

export default Hero;