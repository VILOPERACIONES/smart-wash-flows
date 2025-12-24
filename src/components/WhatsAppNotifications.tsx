import { Check } from "lucide-react";

const WhatsAppNotifications = () => {
  return (
    <section className="relative py-16 md:py-24 bg-background overflow-hidden">
      {/* Subtle dot pattern */}
      <div 
        className="absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage: `radial-gradient(circle, hsl(var(--accent)) 1px, transparent 1px)`,
          backgroundSize: '20px 20px'
        }}
      />

      <div className="container relative z-10 px-6 md:px-20">
        {/* Section Header */}
        <div className="text-center mb-12 md:mb-16">
          <h2 className="text-[2rem] md:text-[2.5rem] font-bold text-foreground mb-4">
            Siempre informado, sin tener que preguntar
          </h2>
          <p className="text-lg md:text-[1.125rem] text-secondary max-w-2xl mx-auto">
            Te notificamos automáticamente por WhatsApp en cada paso del proceso
          </p>
        </div>

        {/* Two Column Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-center">
          {/* Left Column - WhatsApp Mockup */}
          <div className="order-1 flex justify-center lg:justify-end">
            <div 
              className="w-full max-w-[380px] rounded-[20px] overflow-hidden"
              style={{ boxShadow: '0 10px 40px rgba(0, 0, 0, 0.15)' }}
            >
              {/* Chat Header */}
              <div className="bg-[#075E54] px-4 py-4 flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center">
                  <span className="text-white font-bold text-sm">AL</span>
                </div>
                <div>
                  <p className="text-white font-medium text-sm">A LAVAR</p>
                  <p className="text-white/70 text-xs">En línea</p>
                </div>
              </div>

              {/* Chat Body */}
              <div 
                className="p-4 min-h-[380px]"
                style={{ 
                  backgroundColor: '#E5DDD5',
                  backgroundImage: `url("data:image/svg+xml,%3Csvg width='100' height='100' viewBox='0 0 100 100' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M11 18c3.866 0 7-3.134 7-7s-3.134-7-7-7-7 3.134-7 7 3.134 7 7 7zm48 25c3.866 0 7-3.134 7-7s-3.134-7-7-7-7 3.134-7 7 3.134 7 7 7zm-43-7c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zm63 31c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zM34 90c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zm56-76c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zM12 86c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm28-65c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm23-11c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zm-6 60c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm29 22c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zM32 63c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zm57-13c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zm-9-21c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2zM60 91c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2zM35 41c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2zM12 60c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2z' fill='%23CCCCCC' fill-opacity='0.15' fill-rule='evenodd'/%3E%3C/svg%3E")`
                }}
              >
                {/* User message 1 */}
                <div className="flex justify-end mb-2">
                  <div 
                    className="max-w-[70%] px-4 py-3 rounded-lg text-sm"
                    style={{ 
                      backgroundColor: '#DCF8C6',
                      borderRadius: '10px 10px 0 10px'
                    }}
                  >
                    <p className="text-black">Hola, ¿ya está listo mi pedido?</p>
                    <p className="text-[10px] text-gray-500 text-right mt-1">10:23 AM</p>
                  </div>
                </div>

                {/* A LAVAR message 1 */}
                <div className="flex justify-start mb-2">
                  <div 
                    className="max-w-[75%] px-4 py-3 bg-white text-sm"
                    style={{ borderRadius: '10px 10px 10px 0' }}
                  >
                    <p className="text-black">¡Hola! 👋 Tu pedido #1234 está listo para recoger.</p>
                    <p className="text-[10px] text-gray-500 text-right mt-1">10:23 AM</p>
                  </div>
                </div>

                {/* A LAVAR message 2 */}
                <div className="flex justify-start mb-2">
                  <div 
                    className="max-w-[75%] px-4 py-3 bg-white text-sm"
                    style={{ borderRadius: '10px 10px 10px 0' }}
                  >
                    <p className="text-black whitespace-pre-line">Total: $180 MXN{'\n'}📍 Sucursal Centro{'\n'}🕐 Horario: 8:00 AM - 10:00 PM</p>
                    <p className="text-[10px] text-gray-500 text-right mt-1">10:23 AM</p>
                  </div>
                </div>

                {/* User message 2 */}
                <div className="flex justify-end mb-2">
                  <div 
                    className="max-w-[70%] px-4 py-3 text-sm"
                    style={{ 
                      backgroundColor: '#DCF8C6',
                      borderRadius: '10px 10px 0 10px'
                    }}
                  >
                    <p className="text-black">¡Perfecto! Voy en camino 🚗</p>
                    <p className="text-[10px] text-gray-500 text-right mt-1">10:24 AM</p>
                  </div>
                </div>

                {/* Typing indicator */}
                <div className="flex justify-start">
                  <div 
                    className="px-4 py-3 bg-white"
                    style={{ borderRadius: '10px 10px 10px 0' }}
                  >
                    <div className="flex gap-1">
                      <span className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
                      <span className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
                      <span className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column - Content */}
          <div className="order-2">
            {/* Badge */}
            <div className="inline-flex items-center px-4 py-2 rounded-full bg-accent text-white text-xs font-bold mb-6">
              VENTAJA COMPETITIVA
            </div>

            {/* Title */}
            <h3 className="text-[1.75rem] md:text-[2rem] font-bold text-foreground leading-tight mb-5">
              Notificaciones automáticas en cada etapa
            </h3>

            {/* Description */}
            <p className="text-[1.125rem] text-secondary leading-relaxed mb-8">
              A diferencia de otras lavanderías, en A LAVAR no necesitas estar preguntando por tu pedido. Nuestro sistema te notifica automáticamente vía WhatsApp cuando:
            </p>

            {/* Benefits List */}
            <ul className="space-y-5 mb-8">
              <li className="flex items-start gap-3">
                <div className="w-6 h-6 rounded-full bg-primary flex items-center justify-center flex-shrink-0 mt-0.5">
                  <Check className="w-4 h-4 text-white" />
                </div>
                <span className="text-base font-medium text-foreground">Tu pedido fue recibido y está en proceso</span>
              </li>
              <li className="flex items-start gap-3">
                <div className="w-6 h-6 rounded-full bg-primary flex items-center justify-center flex-shrink-0 mt-0.5">
                  <Check className="w-4 h-4 text-white" />
                </div>
                <span className="text-base font-medium text-foreground">Tu ropa está lista para recoger</span>
              </li>
              <li className="flex items-start gap-3">
                <div className="w-6 h-6 rounded-full bg-primary flex items-center justify-center flex-shrink-0 mt-0.5">
                  <Check className="w-4 h-4 text-white" />
                </div>
                <span className="text-base font-medium text-foreground">Recordatorios si no has recogido tu pedido</span>
              </li>
            </ul>

            {/* Closing statement */}
            <p className="text-[1.125rem] font-bold text-primary">
              Consulta el estado de tu pedido 24/7 sin llamadas ni esperas.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default WhatsAppNotifications;
