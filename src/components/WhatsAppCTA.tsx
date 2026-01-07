import { FC } from "react";

interface WhatsAppCTAProps {
  whatsappUrl?: string;
}

const WhatsAppCTA: FC<WhatsAppCTAProps> = ({ whatsappUrl = "https://wa.me/5210000000000" }) => {
  return (
    <section className="w-full px-4 py-16">
      <div className="mx-auto max-w-4xl">
        <div
          className="relative overflow-hidden rounded-2xl px-6 py-20 text-center text-white shadow-xl md:px-12"
          style={{ background: "linear-gradient(90deg, #0019FF 0%, #0033CC 50%, #00008B 100%)" }}
        >
          {/* Title */}
          <h2 className="text-2xl xl:text-[48px] xl:leading-[48px] font-bold font-poppins leading-tight md:text-4xl">
            ¿Listo para lavar
            <br className="hidden md:block" />
            sin complicaciones?
          </h2>

          {/* Subtitle */}
          <p className="mx-auto mt-4 max-w-xl font-poppins text-sm text-blue-100 md:text-base">
            Escríbenos ahora y resolvemos tus dudas al instante. Sin formularios largos, sin esperas.
          </p>

          {/* CTA */}
          <div className="mt-8 flex justify-center">
            <a
              href={whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center font-poppins gap-2 rounded-lg bg-white px-6 py-3 text-sm font-semibold text-[#0000FF] transition hover:bg-blue-50 focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-blue-700 md:text-base"
            >
              {/* WhatsApp Icon */}
              <svg className="h-5 w-5" viewBox="0 0 32 32" fill="currentColor">
                <path d="M19.11 17.71c-.29-.15-1.71-.84-1.98-.94-.26-.1-.45-.15-.64.15-.19.29-.74.94-.9 1.13-.17.19-.33.21-.62.07-.29-.15-1.22-.45-2.32-1.43-.86-.77-1.44-1.72-1.61-2.01-.17-.29-.02-.45.13-.6.13-.13.29-.33.43-.5.14-.17.19-.29.29-.48.1-.19.05-.36-.02-.5-.07-.15-.64-1.55-.88-2.12-.23-.55-.46-.48-.64-.49-.17-.01-.36-.01-.55-.01s-.5.07-.76.36c-.26.29-1 1-.99 2.43.01 1.43 1.03 2.81 1.18 3.01.15.19 2.03 3.1 4.92 4.35.69.3 1.23.48 1.65.61.69.22 1.32.19 1.82.12.55-.08 1.71-.7 1.95-1.38.24-.69.24-1.27.17-1.38-.07-.11-.26-.17-.55-.31z" />
                <path d="M16.04 2.67c-7.36 0-13.33 5.97-13.33 13.33 0 2.35.61 4.65 1.77 6.67L2.67 29.33l6.83-1.79c1.93 1.05 4.11 1.6 6.33 1.6 7.36 0 13.33-5.97 13.33-13.33S23.4 2.67 16.04 2.67zm0 24.33c-2.02 0-3.99-.54-5.69-1.56l-.41-.24-4.05 1.06 1.08-3.95-.27-.42a11.29 11.29 0 01-1.72-6.08c0-6.23 5.07-11.29 11.29-11.29s11.29 5.07 11.29 11.29-5.07 11.29-11.29 11.29z" />
              </svg>
              Escribir por WhatsApp →
            </a>
          </div>

          {/* Footer note */}
          <p className="mt-4 text-xs font-poppins text-blue-200">Respuesta promedio: menos de 3 minutos</p>
        </div>
      </div>
    </section>
  );
};

export default WhatsAppCTA;
