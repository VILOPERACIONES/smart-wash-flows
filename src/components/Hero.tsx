import { Button } from "@/components/ui/button";
import { MessageCircle, Clock, Tag } from "lucide-react";
import heroImage from "@/assets/hero-laundry.jpg";

const Hero = () => {
  const handleWhatsAppClick = () => {
    window.open("https://wa.me/525512345678?text=Hola,%20quiero%20información%20sobre%20A%20LAVAR", "_blank");
  };

  return (
    <section className="relative min-h-[90vh] md:min-h-[90vh] flex items-center overflow-hidden">
      {/* Background Image */}
      <div 
        className="absolute inset-0 bg-cover bg-center"
        style={{ backgroundImage: `url(${heroImage})` }}
      />
      
      {/* Dark Overlay */}
      <div className="absolute inset-0 bg-black/50" />

      {/* Content */}
      <div className="relative z-10 container mx-auto px-6 md:px-20 py-16 flex flex-col items-center text-center max-w-[900px]">
        {/* Badge */}
        <div 
          className="animate-fade-in inline-flex items-center gap-2 px-5 py-2.5 rounded-full mb-8"
          style={{ 
            backgroundColor: 'rgba(0, 0, 255, 0.9)',
            boxShadow: '0 4px 12px rgba(0, 0, 255, 0.3)'
          }}
        >
          <Clock className="w-4 h-4 text-white" />
          <span className="text-[15px] font-bold text-white">Entrega el mismo día</span>
        </div>

        {/* Main headline */}
        <h1 
          className="animate-fade-in text-[2.8rem] md:text-[4rem] font-bold leading-[1.1] mb-6 text-white"
          style={{ 
            animationDelay: '100ms',
            textShadow: '0 2px 8px rgba(0, 0, 0, 0.3)'
          }}
        >
          Lavar tu ropa nunca fue tan fácil
        </h1>

        {/* Subheadline */}
        <p 
          className="animate-fade-in text-[1.1rem] md:text-[1.25rem] leading-relaxed text-white mb-12 max-w-[700px]"
          style={{ 
            animationDelay: '200ms',
            textShadow: '0 2px 6px rgba(0, 0, 0, 0.3)'
          }}
        >
          Tecnología aplicada al lavado. Procesos claros, tiempos reales y cero complicaciones.
        </p>

        {/* CTA Button */}
        <div 
          className="animate-fade-in mb-14"
          style={{ animationDelay: '300ms' }}
        >
          <Button 
            onClick={handleWhatsAppClick}
            className="px-10 py-5 text-lg font-bold rounded-[10px] bg-primary text-white hover:scale-105 transition-all duration-300"
            style={{ 
              boxShadow: '0 6px 20px rgba(0, 0, 255, 0.4)',
            }}
          >
            <MessageCircle className="w-5 h-5" />
            Escríbenos por WhatsApp
          </Button>
        </div>

        {/* Facts Grid */}
        <div 
          className="animate-fade-in grid grid-cols-1 md:grid-cols-3 gap-6 w-full max-w-[800px]"
          style={{ animationDelay: '400ms' }}
        >
          {/* Fact 1 - Precio */}
          <div 
            className="rounded-2xl p-6 text-center"
            style={{
              background: 'rgba(255, 255, 255, 0.15)',
              backdropFilter: 'blur(10px)',
              border: '1px solid rgba(255, 255, 255, 0.2)'
            }}
          >
            <Tag className="w-8 h-8 text-primary mx-auto mb-3" />
            <div 
              className="inline-block bg-white rounded-full px-4 py-2 mb-2"
            >
              <span className="text-[2.5rem] font-bold text-primary">$30<span className="text-lg">/kg</span></span>
            </div>
            <p className="text-sm font-medium text-white">Precio claro y justo</p>
          </div>

          {/* Fact 2 - Entrega Rápida */}
          <div 
            className="rounded-2xl p-6 text-center"
            style={{
              background: 'rgba(255, 255, 255, 0.15)',
              backdropFilter: 'blur(10px)',
              border: '1px solid rgba(255, 255, 255, 0.2)'
            }}
          >
            <Clock className="w-8 h-8 text-accent mx-auto mb-3" />
            <p className="text-[1.5rem] font-bold text-white mb-1">Mismo día</p>
            <p className="text-sm text-white/90">Entrega entre semana</p>
          </div>

          {/* Fact 3 - WhatsApp */}
          <div 
            className="rounded-2xl p-6 text-center"
            style={{
              background: 'rgba(255, 255, 255, 0.15)',
              backdropFilter: 'blur(10px)',
              border: '1px solid rgba(255, 255, 255, 0.2)'
            }}
          >
            <MessageCircle className="w-8 h-8 text-accent mx-auto mb-3" />
            <p className="text-[1.5rem] font-bold text-white mb-1">Atención WhatsApp</p>
            <p className="text-sm text-white/90">Te avisamos cuando esté listo</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
