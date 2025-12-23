import { Button } from "@/components/ui/button";
import { MessageCircle, Menu, X } from "lucide-react";
import { useState } from "react";

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const handleWhatsAppClick = () => {
    window.open("https://wa.me/525512345678?text=Hola,%20quiero%20información%20sobre%20A%20LAVAR", "_blank");
  };

  const scrollToSection = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
    setIsMenuOpen(false);
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-md border-b border-border/50">
      <div className="container px-4 md:px-6">
        <div className="flex items-center justify-between h-16 md:h-20">
          {/* Logo */}
          <a href="/" className="flex items-center gap-2">
            <span className="text-xl md:text-2xl font-bold text-gradient">A LAVAR</span>
          </a>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-8">
            <button 
              onClick={() => scrollToSection('servicios')}
              className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
            >
              Servicios
            </button>
            <button 
              onClick={() => scrollToSection('tecnologia')}
              className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
            >
              Tecnología
            </button>
          </nav>

          {/* Desktop CTA */}
          <div className="hidden md:block">
            <Button variant="default" onClick={handleWhatsAppClick}>
              <MessageCircle className="w-4 h-4" />
              WhatsApp
            </Button>
          </div>

          {/* Mobile Menu Button */}
          <button 
            className="md:hidden p-2"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? (
              <X className="w-6 h-6" />
            ) : (
              <Menu className="w-6 h-6" />
            )}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="md:hidden bg-background border-t border-border/50 animate-fade-in">
          <div className="container px-4 py-6 space-y-4">
            <button 
              onClick={() => scrollToSection('servicios')}
              className="block w-full text-left py-2 text-lg font-medium"
            >
              Servicios
            </button>
            <button 
              onClick={() => scrollToSection('tecnologia')}
              className="block w-full text-left py-2 text-lg font-medium"
            >
              Tecnología
            </button>
            <Button 
              variant="whatsapp" 
              className="w-full mt-4"
              onClick={handleWhatsAppClick}
            >
              <MessageCircle className="w-4 h-4" />
              Escribir por WhatsApp
            </Button>
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;
