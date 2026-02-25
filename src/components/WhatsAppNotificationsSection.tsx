import { CircleCheck } from "lucide-react";

const WhatsAppNotificationsSection: React.FC = () => {
  return (
    <section className="w-full py-16 px-4">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-14">
          <h2 className="text-2xl font-poppins md:text-4xl font-bold text-gray-900">
            Siempre informado, sin tener que preguntar
          </h2>
          <p className="mt-4 text-sm font-poppins md:text-base text-blue-600 max-w-2xl mx-auto">
            Te notificamos automáticamente por WhatsApp en cada paso del proceso
          </p>
        </div>

        {/* Content */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-0 items-center">
          {/* Left: WhatsApp mock */}
          <div className="flex justify-center">
            <div className="w-[260px] md:w-[300px] rounded-3xl shadow-xl  overflow-hidden">
              <img
                src="https://res.cloudinary.com/diefluaw7/image/upload/v1772048382/whatsapp-mockup_op8y9l.png"
                alt="Notificaciones por WhatsApp"
                className="w-full h-auto"
              />
            </div>
          </div>

          {/* Right: Text content */}
          <div>
            {/* Badge */}
            <span className="inline-block mb-4 rounded-full bg-[#4A80DE] font-poppins px-4 py-1 text-xs font-semibold text-white">
              ¿POR QUÉ A LAVAR?
            </span>

            <h3 className="text-xl font-poppins md:text-2xl font-bold text-gray-900 mb-4">
              Notificaciones automáticas en cada etapa
            </h3>

            <p className="text-gray-600 font-poppins mb-6 leading-relaxed">
              A diferencia de otras lavanderías, en A LAVAR no necesitas estar preguntando por tu pedido. Nuestro
              sistema te notifica automáticamente vía WhatsApp cuando:
            </p>

            {/* List */}
            <ul className="space-y-4 mb-6">
              {[
                "Tu pedido fue recibido y está en proceso",
                "Tu ropa está lista para recoger",
                "Recordatorios si no has recogido tu pedido",
              ].map((item, index) => (
                <li key={index} className="flex items-start gap-3">
                  <CircleCheck className="h-6 w-6 text-blue-600 flex-shrink-0 mt-0.5" />
                  <span className="text-gray-700 font-poppins text-sm md:text-base">{item}</span>
                </li>
              ))}
            </ul>

            <p className="text-blue-600 font-semibold text-sm md:text-base">
              Consulta el estado de tu pedido 24/7 sin llamadas ni esperas.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};
export default WhatsAppNotificationsSection;
