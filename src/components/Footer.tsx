import React from "react";

const Footer: React.FC = () => {
  return (
    <footer className="w-full bg-[#003A9E] pt-[61px] pb-0 px-6 md:px-12 lg:px-16 xl:px-20">
      <div className="max-w-[1280px] mx-auto my-0">
        <div className="flex justify-between items-start gap-10 flex-wrap mb-10">
          <div className="w-full flex justify-center">
            <img
              src="https://res.cloudinary.com/diefluaw7/image/upload/v1767894340/Group_14_rwibjk.svg"
              alt="A LAVAR Logo"
              className="w-[263px] h-[85px]"
            />
          </div>
          <img
            src="https://res.cloudinary.com/diefluaw7/image/upload/v1767894340/Group_14_rwibjk.svg"
            alt="A LAVAR Logo"
            className="hidden sm:block sm:w-[327px] sm:h-auto"
          />
          <div className="hidden sm:block">
            <h4 className="text-white text-base font-poppins font-semibold leading-6 tracking-[-0.4px] mb-5">
              Contacto
            </h4>
            <ul className="flex flex-col gap-3">
              <li className="flex items-center gap-3">
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path
                    d="M5.26634 13.3332C6.53873 13.9859 8.0024 14.1627 9.3936 13.8317C10.7848 13.5007 12.012 12.6838 12.8542 11.528C13.6963 10.3722 14.098 8.95367 13.9867 7.52798C13.8755 6.10228 13.2587 4.76318 12.2475 3.752C11.2364 2.74081 9.89727 2.12404 8.47157 2.01281C7.04587 1.90159 5.62732 2.30323 4.47155 3.14537C3.31579 3.9875 2.4988 5.21474 2.16782 6.60594C1.83684 7.99714 2.01364 9.46082 2.66634 10.7332L1.33301 14.6665L5.26634 13.3332Z"
                    stroke="white"
                    strokeOpacity="0.8"
                    strokeWidth="1.33333"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
                <a
                  href="https://wa.me/529991234567"
                  className="text-[rgba(255,255,255,0.80)] text-sm font-normal leading-5 hover:text-white font-poppins transition-colors"
                >
                  WhatsApp: +52 999 123 4567
                </a>
              </li>
              <li className="flex items-start gap-3">
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path
                    d="M13.3337 6.66683C13.3337 9.9955 9.64099 13.4622 8.40099 14.5328C8.28548 14.6197 8.14486 14.6667 8.00033 14.6667C7.85579 14.6667 7.71518 14.6197 7.59966 14.5328C6.35966 13.4622 2.66699 9.9955 2.66699 6.66683C2.66699 5.25234 3.2289 3.89579 4.22909 2.89559C5.22928 1.8954 6.58584 1.3335 8.00033 1.3335C9.41481 1.3335 10.7714 1.8954 11.7716 2.89559C12.7718 3.89579 13.3337 5.25234 13.3337 6.66683Z"
                    stroke="white"
                    strokeOpacity="0.8"
                    strokeWidth="1.33333"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M8 8.6665C9.10457 8.6665 10 7.77107 10 6.6665C10 5.56193 9.10457 4.6665 8 4.6665C6.89543 4.6665 6 5.56193 6 6.6665C6 7.77107 6.89543 8.6665 8 8.6665Z"
                    stroke="white"
                    strokeOpacity="0.8"
                    strokeWidth="1.33333"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
                <address className="text-[rgba(255,255,255,0.80)] text-sm font-poppins font-normal leading-5 not-italic">
                  Plaza Polígono 108, Polígono Itzimná.
                  <br />
                  Mérida, Yucatán
                </address>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="text-white text-base font-semibold font-poppins leading-6 tracking-[-0.4px] mb-5">
              Horario
            </h4>
            <div className="flex items-center gap-3">
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path
                  d="M7.99967 14.6668C11.6816 14.6668 14.6663 11.6821 14.6663 8.00016C14.6663 4.31826 11.6816 1.3335 7.99967 1.3335C4.31778 1.3335 1.33301 4.31826 1.33301 8.00016C1.33301 11.6821 4.31778 14.6668 7.99967 14.6668Z"
                  stroke="white"
                  strokeOpacity="0.8"
                  strokeWidth="1.33333"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d="M8 4V8L10.6667 9.33333"
                  stroke="white"
                  strokeOpacity="0.8"
                  strokeWidth="1.33333"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
              <span className="text-[rgba(255,255,255,0.80)] font-poppins text-sm font-normal leading-5">
                Lun - Dom: 7:00 AM - 8:00 PM
              </span>
            </div>
          </div>
        </div>

        <div className="px-0 py-[17px] border-t-[rgba(255,255,255,0.10)] border-t border-solid">
          <p className="text-[rgba(255,255,255,0.60)] text-sm font-poppins font-semibold leading-5 mb-4">
            *[1]: El servicio de lavado por encargo con entrega el mismo día está disponible de lunes a viernes para
            pedidos recibidos antes de las 11:00 a. m.
          </p>
        </div>

        <div className="flex justify-between items-center flex-wrap gap-5 px-0 py-[17px] border-t-[rgba(255,255,255,0.10)] border-t border-solid">
          <div className="flex items-center gap-2">
            <p className="text-[rgba(255,255,255,0.60)] text-sm font-poppins font-normal leading-5">
              © 2026 A LAVAR | Diseñado y Desarrollado por{" "}
              <a href="#" className="underline hover:text-white transition-colors">
                Búho Solutions
              </a>
              .
            </p>
            <a href="#" className="cursor-pointer">
              <svg width="18" height="20" viewBox="0 0 18 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path
                  fillRule="evenodd"
                  clipRule="evenodd"
                  d="M0 8.417C0 5.219 2.98023e-08 3.62 0.378 3.082C0.755 2.545 2.258 2.03 5.265 1.001L5.838 0.805C7.405 0.268 8.188 0 9 0C9.812 0 10.595 0.268 12.162 0.805L12.735 1.001C15.742 2.03 17.245 2.545 17.622 3.082C18 3.62 18 5.22 18 8.417V9.991C18 15.629 13.761 18.366 11.101 19.527C10.38 19.842 10.02 20 9 20C7.98 20 7.62 19.842 6.899 19.527C4.239 18.365 0 15.63 0 9.991V8.417ZM11 7C11 7.53043 10.7893 8.03914 10.4142 8.41421C10.0391 8.78929 9.53043 9 9 9C8.46957 9 7.96086 8.78929 7.58579 8.41421C7.21071 8.03914 7 7.53043 7 7C7 6.46957 7.21071 5.96086 7.58579 5.58579C7.96086 5.21071 8.46957 5 9 5C9.53043 5 10.0391 5.21071 10.4142 5.58579C10.7893 5.96086 11 6.46957 11 7ZM9 15C13 15 13 14.105 13 13C13 11.895 11.21 11 9 11C6.79 11 5 11.895 5 13C5 14.105 5 15 9 15Z"
                  fill="#4A80DE"
                />
              </svg>
            </a>
          </div>
          <p className="hidden sm:block text-[rgba(255,255,255,0.60)] font-poppins text-sm font-normal leading-5">
            Mejor y más rápido.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
