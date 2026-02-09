import React from "react";

const Hero: React.FC = () => {
  return (
    <section className="w-full min-h-[100dvh] relative overflow-hidden bg-black">
      {/* Background image with overlay for better text contrast */}
      <img
        src="https://api.builder.io/api/v1/image/assets/TEMP/4d7f3b295583025286305d825347747f6cdce54e?width=3212"
        alt="Modern self-service laundromat interior"
        className="w-full h-full object-cover absolute inset-0"
      />
      {/* Dark overlay for better text readability on mobile */}
      <div className="absolute inset-0 bg-black/40 sm:bg-black/30" />

      {/* Content container - centered vertically and horizontally */}
      <div className="relative z-10 min-h-[100dvh] flex flex-col items-center justify-center px-5 sm:px-8 md:px-10 py-20 sm:py-16">
        <div className="w-full max-w-4xl text-center flex flex-col items-center gap-5 sm:gap-6 xl:gap-6">
          {/* Badge */}
          <div className="relative  neon-pulse inline-flex justify-center items-center gap-2 bg-[hsl(220,68%,57%)] px-4 py-2 rounded-full">
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path
                d="M7.99967 14.6667C11.6816 14.6667 14.6663 11.6819 14.6663 8.00001C14.6663 4.31811 11.6816 1.33334 7.99967 1.33334C4.31778 1.33334 1.33301 4.31811 1.33301 8.00001C1.33301 11.6819 4.31778 14.6667 7.99967 14.6667Z"
                stroke="white"
                strokeWidth="1.33333"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M8 4V8L10.6667 9.33333"
                stroke="white"
                strokeWidth="1.33333"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
            <span className="text-white text-center font-poppins text-xs sm:text-sm font-medium leading-5">
              Entrega el mismo día
            </span>
          </div>

          {/* Main heading - responsive typography */}
          <h1
            className="text-white text-center font-poppins font-bold tracking-tight
            text-[30px] leading-[36px]
            sm:text-[2.75rem] sm:leading-[3rem]
            md:text-[3.5rem] md:leading-[3.75rem]
            lg:text-[3.75rem] lg:leading-[3.9375rem]
            max-w-[90%] sm:max-w-none"
          >
            Lavar tu ropa,
            <br />
            nunca fue tan fácil
          </h1>

          {/* Subtitle - responsive with proper line height */}
          <p
            className="text-white/90 text-center font-poppins font-normal max-w-lg mx-auto
            text-[11px] leading-6 px-2
            sm:text-base sm:leading-7 sm:px-0
            md:text-lg md:leading-8
            lg:text-xl lg:leading-8"
          >
            Tecnología aplicada al lavado. Procesos claros, tiempos reales y cero complicaciones. Tú decides, nosotros
            ejecutamos.
          </p>

          {/* Features - hidden on mobile, horizontal on larger screens */}
          <div className="hidden sm:flex flex-row justify-center items-center gap-4 sm:gap-6 md:gap-8 mt-6 sm:mt-8 w-full">
            {/* Feature 1 */}
            <div className="flex items-center gap-3 sm:bg-transparent sm:backdrop-blur-none sm:px-0 sm:py-0">
              <div className="flex w-9 h-9 sm:w-10 sm:h-10 justify-center items-center bg-[hsla(220,68%,57%,0.25)] rounded-full flex-shrink-0">
                <svg
                  width="18"
                  height="18"
                  viewBox="0 0 20 20"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  className="w-4 h-4 sm:w-5 sm:h-5"
                >
                  <path
                    d="M8.28086 12.9166C8.20647 12.6283 8.05615 12.3651 7.84555 12.1545C7.63494 11.9439 7.37176 11.7935 7.08336 11.7191L1.97086 10.4008C1.88364 10.3761 1.80687 10.3235 1.75221 10.2512C1.69754 10.1788 1.66797 10.0907 1.66797 9.99998C1.66797 9.90931 1.69754 9.82112 1.75221 9.74878C1.80687 9.67644 1.88364 9.62391 1.97086 9.59915L7.08336 8.27998C7.37166 8.20565 7.63477 8.05546 7.84537 7.84502C8.05596 7.63457 8.20634 7.37156 8.28086 7.08332L9.5992 1.97082C9.6237 1.88325 9.67618 1.8061 9.74863 1.75115C9.82108 1.69619 9.90951 1.66644 10.0004 1.66644C10.0914 1.66644 10.1798 1.69619 10.2523 1.75115C10.3247 1.8061 10.3772 1.88325 10.4017 1.97082L11.7192 7.08332C11.7936 7.37171 11.9439 7.6349 12.1545 7.8455C12.3651 8.0561 12.6283 8.20642 12.9167 8.28082L18.0292 9.59832C18.1171 9.62257 18.1946 9.67499 18.2499 9.74755C18.3052 9.8201 18.3351 9.90878 18.3351 9.99998C18.3351 10.0912 18.3052 10.1799 18.2499 10.2524C18.1946 10.325 18.1171 10.3774 18.0292 10.4016L12.9167 11.7191C12.6283 11.7935 12.3651 11.9439 12.1545 12.1545C11.9439 12.3651 11.7936 12.6283 11.7192 12.9166L10.4009 18.0291C10.3764 18.1167 10.3239 18.1939 10.2514 18.2488C10.179 18.3038 10.0905 18.3335 9.99961 18.3335C9.90868 18.3335 9.82025 18.3038 9.7478 18.2488C9.67535 18.1939 9.62287 18.1167 9.59836 18.0291L8.28086 12.9166Z"
                    stroke="white"
                    strokeWidth="1.66667"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M16.667 2.5V5.83333"
                    stroke="white"
                    strokeWidth="1.66667"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M18.3333 4.16669H15"
                    stroke="white"
                    strokeWidth="1.66667"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M3.33301 14.1667V15.8334"
                    stroke="white"
                    strokeWidth="1.66667"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M4.16667 15H2.5"
                    stroke="white"
                    strokeWidth="1.66667"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </div>
              <div className="text-left">
                <div className="text-white font-poppins text-xs sm:text-sm font-semibold leading-tight">
                  Tecnología Aplicada
                </div>
                <div className="text-white/70 font-poppins text-[10px] sm:text-xs font-normal leading-tight">
                  Procesos modernos
                </div>
              </div>
            </div>

            {/* Feature 2 */}
            <div className="flex items-center gap-3 sm:bg-transparent sm:backdrop-blur-none sm:px-0 sm:py-0">
              <div className="flex w-9 h-9 sm:w-10 sm:h-10 justify-center items-center bg-[hsla(220,68%,57%,0.25)] rounded-full flex-shrink-0">
                <svg
                  width="18"
                  height="18"
                  viewBox="0 0 20 20"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  className="w-4 h-4 sm:w-5 sm:h-5"
                >
                  <path
                    d="M10.0003 18.3334C14.6027 18.3334 18.3337 14.6024 18.3337 10C18.3337 5.39765 14.6027 1.66669 10.0003 1.66669C5.39795 1.66669 1.66699 5.39765 1.66699 10C1.66699 14.6024 5.39795 18.3334 10.0003 18.3334Z"
                    stroke="white"
                    strokeWidth="1.66667"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M10 5V10L13.3333 11.6667"
                    stroke="white"
                    strokeWidth="1.66667"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </div>
              <div className="text-left">
                <div className="text-white font-poppins text-xs sm:text-sm font-semibold leading-tight">Mismo día</div>
                <a
                  href="#terminos"
                  className="text-white/70 font-poppins text-[10px] sm:text-xs font-normal leading-tight underline hover:text-white/90"
                >
                  Entrega rápida *[1]
                </a>
              </div>
            </div>

            {/* Feature 3 */}
            <div className="flex items-center gap-3 sm:bg-transparent sm:backdrop-blur-none sm:px-0 sm:py-0">
              <div className="flex w-9 h-9 sm:w-10 sm:h-10 justify-center items-center bg-[hsla(220,68%,57%,0.25)] rounded-full flex-shrink-0">
                <svg
                  width="18"
                  height="18"
                  viewBox="0 0 20 20"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  className="w-4 h-4 sm:w-5 sm:h-5"
                >
                  <path
                    d="M13.9958 11.4095C13.8049 11.3146 12.5641 10.7453 12.3732 10.6504C12.1823 10.5556 11.9915 10.5556 11.8006 10.7453C11.6097 10.9351 11.2279 11.5044 11.037 11.6941C10.9415 11.8839 10.7506 11.8839 10.5597 11.789C9.8916 11.5044 9.2235 11.1248 8.6508 10.6504C8.1736 10.176 7.6963 9.6067 7.3145 9.0375C7.2191 8.8477 7.3145 8.6579 7.41 8.563C7.5054 8.4682 7.6009 8.2784 7.7918 8.1835C7.8872 8.0886 7.9827 7.8989 7.9827 7.804C8.0781 7.7091 8.0781 7.5194 7.9827 7.4245C7.8872 7.3296 7.41 6.191 7.2191 5.7166C7.1236 5.0524 6.9327 5.0524 6.7419 5.0524H6.2646C6.0737 5.0524 5.7874 5.2422 5.6919 5.3371C5.1193 5.9064 4.8329 6.5705 4.8329 7.3296C4.9284 8.1835 5.2147 9.0375 5.7874 9.7965C6.8373 11.3146 8.1736 12.5481 9.7962 13.3071C10.2734 13.4969 10.6552 13.6866 11.1324 13.7815C11.6097 13.9713 12.0869 13.9713 12.6596 13.8764C13.3277 13.7815 13.9004 13.3071 14.2822 12.7378C14.4731 12.3583 14.4731 11.9788 14.3776 11.5992L13.9958 11.4095ZM16.382 2.7753C12.6596 -0.92509 6.6464 -0.92509 2.924 2.7753C-0.1303 5.8115 -0.703 10.4607 1.3968 14.161L0.0605 19L5.1193 17.6717C6.551 18.4307 8.0781 18.8102 9.6053 18.8102C14.8549 18.8102 19.0545 14.6355 19.0545 9.417C19.15 6.9501 18.1001 4.578 16.382 2.7753ZM13.8049 16.0587C12.5641 16.8177 11.1324 17.2921 9.6053 17.2921C8.1736 17.2921 6.8373 16.9126 5.5965 16.2484L5.3101 16.0587L2.3513 16.8177L3.1149 13.9713L2.924 13.6866C0.6332 9.8914 1.7786 5.1473 5.501 2.7753C9.2235 0.4032 13.9958 1.6367 16.2866 5.2422C18.5773 8.9426 17.5274 13.7815 13.8049 16.0587Z"
                    fill="white"
                  />
                </svg>
              </div>
              <div className="text-left">
                <div className="text-white font-poppins text-xs sm:text-sm font-semibold leading-tight">WhatsApp</div>
                <div className="text-white/70 font-poppins text-[10px] sm:text-xs font-normal leading-tight">
                  Respuesta inmediata
                </div>
              </div>
            </div>
          </div>
          {/* CTA Buttons - stack on mobile, row on larger screens */}
          <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center items-center w-full sm:w-auto mt-2">
            {/* <a
              href="#promociones"
              className="w-full max-w-[280px] sm:max-w-none sm:w-auto inline-flex items-center justify-center gap-3 shadow-[0_4px_14px_-3px_hsla(240,100%,50%,0.40)] bg-[hsl(240,100%,50%)] px-6 py-4 sm:py-3.5 rounded-xl hover:bg-[hsl(240,100%,40%)] transition-colors"
            >
              <svg
                width="24"
                height="24"
                viewBox="0 0 27 27"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                className="w-5 h-5 sm:w-6 sm:h-6 flex-shrink-0"
              >
                <path
                  d="M20.9808 3.20624L21.6671 7.54874L25.6158 9.56249L23.6246 13.5L25.6271 17.4375L21.6446 19.4512L20.9583 23.7937L16.5821 23.1075L13.4658 26.2125L10.3383 23.0625L5.99582 23.7825L5.29832 19.4062L1.37207 17.4037L3.37457 13.4662L1.38332 9.56249L5.33207 7.52624L6.01832 3.21749L10.3721 3.93749L13.4996 0.776245L16.6158 3.89249L20.9808 3.20624ZM10.6871 7.87499C10.2395 7.87499 9.8103 8.05278 9.49383 8.36925C9.17736 8.68572 8.99957 9.11494 8.99957 9.56249C8.99957 10.01 9.17736 10.4393 9.49383 10.7557C9.8103 11.0722 10.2395 11.25 10.6871 11.25C11.1346 11.25 11.5638 11.0722 11.8803 10.7557C12.1968 10.4393 12.3746 10.01 12.3746 9.56249C12.3746 9.11494 12.1968 8.68572 11.8803 8.36925C11.5638 8.05278 11.1346 7.87499 10.6871 7.87499ZM16.3121 15.75C15.8645 15.75 15.4353 15.9278 15.1188 16.2443C14.8024 16.5607 14.6246 16.9899 14.6246 17.4375C14.6246 17.885 14.8024 18.3143 15.1188 18.6307C15.4353 18.9472 15.8645 19.125 16.3121 19.125C16.7596 19.125 17.1888 18.9472 17.5053 18.6307C17.8218 18.3143 17.9996 17.885 17.9996 17.4375C17.9996 16.9899 17.8218 16.5607 17.5053 16.2443C17.1888 15.9278 16.7596 15.75 16.3121 15.75ZM9.46082 19.125L19.1246 9.46124L17.5383 7.87499L7.87457 17.5387L9.46082 19.125Z"
                  fill="white"
                />
              </svg>
              <span className="text-white text-center font-poppins text-base sm:text-lg font-semibold">
                Ver Promociones
              </span>
            </a> */}

            <a
              href="#servicios"
              className="w-full max-w-[280px] sm:max-w-none sm:w-auto flex justify-center items-center backdrop-blur-sm bg-white/80 px-8 py-4 sm:py-3.5 rounded-xl border-2 border-white/30 hover:bg-white transition-colors"
            >
              <span className="text-black text-center font-poppins text-base sm:text-lg font-semibold">
                Ver servicios
              </span>
            </a>
          </div>
        </div>
      </div>

      {/* WhatsApp floating button */}
      <a
        href="https://wa.me/529991349225"
        target="_blank"
        rel="noopener noreferrer"
        className="fixed bottom-5 right-5 sm:bottom-6 sm:right-6 z-50 hover:scale-105 transition-transform"
        aria-label="Contactar por WhatsApp"
      >
        <svg
          width="60"
          height="60"
          viewBox="0 0 75 75"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="w-14 h-14 sm:w-[75px] sm:h-[75px]"
        >
          <rect width="75" height="75" rx="37.5" fill="#1EB100" />
          <path
            d="M46.137 40.2185C45.7654 40.0337 43.3491 38.9251 42.9774 38.7403C42.6056 38.5556 42.2339 38.5556 41.8621 38.9251C41.4904 39.2946 40.7469 40.4032 40.3752 40.7728C40.1893 41.1423 39.8175 41.1423 39.4458 40.9576C38.1447 40.4032 36.8436 39.6642 35.7284 38.7403C34.799 37.8165 33.8697 36.7079 33.1262 35.5993C32.9403 35.2297 33.1262 34.8602 33.3121 34.6754C33.4979 34.4906 33.6838 34.1211 34.0555 33.9363C34.2414 33.7516 34.4273 33.382 34.4273 33.1973C34.6132 33.0125 34.6132 32.6429 34.4273 32.4582C34.2414 32.2734 33.3121 30.0562 32.9403 29.1323C32.7544 27.839 32.3827 27.839 32.011 27.839H31.0816C30.7099 27.839 30.1523 28.2085 29.9664 28.3933C28.8512 29.5019 28.2935 30.7953 28.2935 32.2734C28.4794 33.9363 29.037 35.5993 30.1523 37.0774C32.1968 40.0337 34.799 42.4357 37.9588 43.9139C38.8882 44.2834 39.6317 44.6529 40.561 44.8377C41.4904 45.2072 42.4197 45.2072 43.535 45.0225C44.8361 44.8377 45.9513 43.9139 46.6948 42.8052C47.0665 42.0662 47.0665 41.3271 46.8806 40.588L46.137 40.2185ZM50.7839 23.4045C43.535 16.1985 31.8251 16.1985 24.5761 23.4045C18.6283 29.3171 17.513 38.3708 21.6022 45.5768L19 55L28.8512 52.4132C31.6392 53.8914 34.6132 54.6305 37.5871 54.6305C47.81 54.6305 55.9883 46.5006 55.9883 36.3383C56.1742 31.5343 54.1296 26.9151 50.7839 23.4045ZM45.7654 49.2722C43.3491 50.7503 40.561 51.6742 37.5871 51.6742C34.799 51.6742 32.1968 50.9351 29.7805 49.6417L29.2229 49.2722L23.4609 50.7503L24.9479 45.2072L24.5761 44.6529C20.1152 37.2622 22.3457 28.0237 29.5946 23.4045C36.8436 18.7853 46.1372 21.1873 50.5981 28.2085C55.059 35.4145 53.0144 44.8377 45.7654 49.2722Z"
            fill="white"
          />
        </svg>
      </a>
    </section>
  );
};

export default Hero;
