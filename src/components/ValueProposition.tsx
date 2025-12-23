import { Zap, Eye, CheckCircle } from "lucide-react";

const ValueProposition = () => {
  return (
    <section className="py-20 md:py-32 bg-muted/30">
      <div className="container px-4 md:px-6">
        <div className="max-w-4xl mx-auto">
          {/* Section header */}
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6">
              Hacer que lavar
              <br />
              <span className="text-gradient">no se sienta pesado</span>
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              No somos una lavandería tradicional. Somos tecnología aplicada a un problema cotidiano.
            </p>
          </div>

          {/* Value cards */}
          <div className="grid md:grid-cols-3 gap-6 md:gap-8">
            <div className="group p-8 rounded-2xl bg-background shadow-card card-hover text-center">
              <div className="w-14 h-14 rounded-xl bg-accent flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300">
                <Zap className="w-7 h-7 text-primary" />
              </div>
              <h3 className="text-xl font-bold mb-3">Rápido</h3>
              <p className="text-muted-foreground">
                Equipos industriales modernos. Procesos optimizados. Entrega el mismo día.
              </p>
            </div>

            <div className="group p-8 rounded-2xl bg-background shadow-card card-hover text-center">
              <div className="w-14 h-14 rounded-xl bg-accent flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300">
                <Eye className="w-7 h-7 text-primary" />
              </div>
              <h3 className="text-xl font-bold mb-3">Transparente</h3>
              <p className="text-muted-foreground">
                Precios claros desde el inicio. Sin sorpresas. Sin letra pequeña.
              </p>
            </div>

            <div className="group p-8 rounded-2xl bg-background shadow-card card-hover text-center">
              <div className="w-14 h-14 rounded-xl bg-accent flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300">
                <CheckCircle className="w-7 h-7 text-primary" />
              </div>
              <h3 className="text-xl font-bold mb-3">Simple</h3>
              <p className="text-muted-foreground">
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
