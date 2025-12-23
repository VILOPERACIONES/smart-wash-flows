import { Cog, Timer, MapPin, Headphones } from "lucide-react";

const features = [
  {
    icon: Cog,
    title: "Equipos industriales",
    description: "Máquinas de última generación con capacidad y potencia profesional para resultados impecables.",
  },
  {
    icon: Timer,
    title: "Tiempos reales",
    description: "Sabes exactamente cuánto tarda tu lavado. Sin estimaciones vagas, sin incertidumbre.",
  },
  {
    icon: MapPin,
    title: "Espacios optimizados",
    description: "Sucursales diseñadas para flujo eficiente. Entras, lavas, sales. Sin obstáculos.",
  },
  {
    icon: Headphones,
    title: "Atención directa",
    description: "Respuestas claras por WhatsApp. Sin bots, sin esperas largas, sin intermediarios.",
  },
];

const TechFeatures = () => {
  return (
    <section id="tecnologia" className="py-20 md:py-32 bg-andrea-subtle">
      <div className="container px-4 md:px-6">
        {/* Section header */}
        <div className="text-center mb-16">
          <span className="inline-block px-4 py-1.5 rounded-full bg-accent/20 text-accent text-sm font-medium mb-4">
            Tecnología
          </span>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6 text-foreground">
            Tecnología que
            <br />
            <span className="text-gradient">funciona para ti</span>
          </h2>
          <p className="text-lg text-secondary max-w-2xl mx-auto">
            No hablamos de tecnología compleja. Hablamos de tecnología útil que hace tu vida más simple.
          </p>
        </div>

        {/* Features grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
          {features.map((feature, index) => (
            <div 
              key={feature.title}
              className="group relative p-6 rounded-2xl bg-background border border-border shadow-card card-hover transition-all duration-300 hover:border-primary"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              {/* Icon - Andrea Blue */}
              <div className="w-12 h-12 rounded-xl bg-accent/20 flex items-center justify-center mb-5 group-hover:scale-110 transition-transform duration-300">
                <feature.icon className="w-6 h-6 text-accent" />
              </div>

              {/* Content */}
              <h3 className="text-lg font-bold mb-2 text-foreground">{feature.title}</h3>
              <p className="text-sm text-secondary leading-relaxed">
                {feature.description}
              </p>

              {/* Hover accent */}
              <div className="absolute inset-x-0 bottom-0 h-1 bg-gradient-to-r from-primary to-secondary rounded-b-2xl scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left" />
            </div>
          ))}
        </div>

        {/* Bottom stat */}
        <div className="mt-16 text-center">
          <div className="inline-flex items-center gap-6 p-6 rounded-2xl bg-background border border-border shadow-card">
            <div className="text-center px-6 border-r border-border">
              <p className="text-3xl md:text-4xl font-bold text-gradient">+500</p>
              <p className="text-sm text-secondary mt-1">Clientes satisfechos</p>
            </div>
            <div className="text-center px-6 border-r border-border">
              <p className="text-3xl md:text-4xl font-bold text-gradient">24h</p>
              <p className="text-sm text-secondary mt-1">Tiempo máx. entrega</p>
            </div>
            <div className="text-center px-6">
              <p className="text-3xl md:text-4xl font-bold text-gradient">100%</p>
              <p className="text-sm text-secondary mt-1">Equipos industriales</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TechFeatures;