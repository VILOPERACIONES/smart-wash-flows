import { Zap, Eye, CheckCircle } from "lucide-react";
import valueImage from "@/assets/value-proposition.jpg";

const ValueProposition = () => {
  return (
    <section className="py-20 md:py-32 bg-andrea-subtle">
      <div className="container px-4 md:px-6">
        <div className="max-w-6xl mx-auto">
          {/* Two column layout */}
          <div className="grid lg:grid-cols-2 gap-12 items-center mb-16">
            {/* Image */}
            <div className="order-2 lg:order-1">
              <div className="rounded-3xl overflow-hidden shadow-lg">
                <img 
                  src={valueImage} 
                  alt="Cliente satisfecho recibiendo su ropa limpia en A LAVAR" 
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
            
            {/* Content */}
            <div className="order-1 lg:order-2">
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6 text-foreground">
                Hacer que lavar
                <br />
                <span className="text-gradient">no se sienta pesado</span>
              </h2>
              <p className="text-lg text-secondary">
                No somos una lavandería tradicional. Somos tecnología aplicada a un problema cotidiano.
              </p>
            </div>
          </div>

          {/* Value cards */}
          <div className="grid md:grid-cols-3 gap-6 md:gap-8">
            <div className="group p-8 rounded-2xl bg-background shadow-card card-hover text-center border border-border">
              <div className="w-14 h-14 rounded-xl bg-accent/20 flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300">
                <Zap className="w-7 h-7 text-primary" />
              </div>
              <h3 className="text-xl font-bold mb-3 text-foreground">Rápido</h3>
              <p className="text-secondary">
                Equipos industriales modernos. Procesos optimizados. Entrega el mismo día.
              </p>
            </div>

            <div className="group p-8 rounded-2xl bg-background shadow-card card-hover text-center border border-border">
              <div className="w-14 h-14 rounded-xl bg-accent/20 flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300">
                <Eye className="w-7 h-7 text-primary" />
              </div>
              <h3 className="text-xl font-bold mb-3 text-foreground">Transparente</h3>
              <p className="text-secondary">
                Precios claros desde el inicio. Sin sorpresas. Sin letra pequeña.
              </p>
            </div>

            <div className="group p-8 rounded-2xl bg-background shadow-card card-hover text-center border border-border">
              <div className="w-14 h-14 rounded-xl bg-accent/20 flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300">
                <CheckCircle className="w-7 h-7 text-primary" />
              </div>
              <h3 className="text-xl font-bold mb-3 text-foreground">Simple</h3>
              <p className="text-secondary">
                Entiendes qué hacer, cuánto cuesta y cuánto tarda. Sin preguntar.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ValueProposition;