import { MessageCircle, MapPin, Clock } from "lucide-react";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-secondary text-secondary-foreground">
      <div className="container px-4 md:px-6 py-12 md:py-16">
        <div className="grid md:grid-cols-3 gap-10 md:gap-8">
          {/* Brand */}
          <div>
            <span className="text-2xl font-bold">A LAVAR</span>
            <p className="mt-4 text-secondary-foreground/80 text-sm leading-relaxed">
              Tecnología aplicada al lavado. Hacemos que lavar tu ropa no se sienta pesado.
            </p>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-semibold mb-4">Contacto</h4>
            <ul className="space-y-3">
              <li>
                <a 
                  href="https://wa.me/525512345678"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-3 text-sm text-secondary-foreground/80 hover:text-secondary-foreground transition-colors"
                >
                  <MessageCircle className="w-4 h-4" />
                  WhatsApp: +52 55 1234 5678
                </a>
              </li>
              <li className="flex items-center gap-3 text-sm text-secondary-foreground/80">
                <MapPin className="w-4 h-4" />
                Mérida, Yucatán
              </li>
            </ul>
          </div>

          {/* Hours */}
          <div>
            <h4 className="font-semibold mb-4">Horario</h4>
            <ul className="space-y-3">
              <li className="flex items-center gap-3 text-sm text-secondary-foreground/80">
                <Clock className="w-4 h-4" />
                Lun - Dom: 8:00 AM - 10:00 PM
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom */}
        <div className="mt-12 pt-8 border-t border-secondary-foreground/10">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <p className="text-sm text-secondary-foreground/60">
              © {currentYear} A LAVAR. Todos los derechos reservados.
            </p>
            <p className="text-sm text-secondary-foreground/60">
              Mejor y más rápido.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;