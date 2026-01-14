import React from "react";

interface Branch {
  id: string;
  name: string;
  status: "open" | "coming-soon";
  address?: string;
  hours?: string;
  description?: string;
}

const Branches: React.FC = () => {
  const branches: Branch[] = [
    {
      id: "centro",
      name: "Plaza Polígono 108",
      status: "open",
      address: "Calle X #123, Col. Polígono Itzimná",
      hours: "Lun - Dom: 7:00 AM - 8:00 PM",
    },
    {
      id: "norte",
      name: "Sucursal Norte",
      status: "coming-soon",
      description: "Muy pronto en Zona Norte",
    },
    {
      id: "poniente",
      name: "Sucursal Poniente",
      status: "coming-soon",
      description: "Muy pronto en Zona Poniente",
    },
  ];

  return (
    <section id="sucursales" className="w-full bg-white px-5 py-20">
      <div className="max-w-screen-xl mx-auto my-0">
        <div className="text-center mb-20">
          <h2 className="text-black text-center font-poppins text-[32px] leading-[36px] sm:text-[40px] sm:leading-[60px] font-bold tracking-[-1px] mb-3">
            Nuestras Sucursales
          </h2>
          <p className="text-[#003A9E] text-center font-poppins text-lg font-normal leading-7">
            Encuentra la más cercana a ti
          </p>
        </div>

        <div className="flex justify-center gap-6 flex-wrap">
          {branches.map((branch) => (
            <article
              key={branch.id}
              className="w-full max-w-[400px] border overflow-hidden bg-white rounded-2xl border-solid border-gray-200"
            >
              <div className="relative px-4 sm:px-8 pt-16 sm:pt-16">
                <div className="w-full h-[188px] bg-[#C4C4C4] rounded-lg" />

                {branch.status === "coming-soon" && (
                  <div className="flex w-[calc(100%-32px)] sm:w-[calc(100%-64px)] xl:w-[333.79px] h-[188px] rounded-lg justify-center items-center absolute bg-[#4A80DE] left-4 sm:left-8 top-16 sm:top-16">
                    <span className="text-white font-poppins text-lg font-bold leading-7">Próximamente</span>
                  </div>
                )}

                <div
                  className={`inline-flex justify-center items-center absolute px-4 py-1.5 rounded-full left-4 top-4 ${
                    branch.status === "open" ? "bg-[#00F]" : "bg-[#003A9E]"
                  }`}
                >
                  <span className="text-white text-sm font-medium leading-5">
                    {branch.status === "open" ? "ABIERTO" : "PRÓXIMAMENTE"}
                  </span>
                </div>
              </div>

              <div className="p-[33px]">
                <h3 className="text-black text-xl font-bold font-poppins leading-7 tracking-[-0.5px] mb-4">
                  {branch.name}
                </h3>

                {branch.status === "open" ? (
                  <>
                    <div className="flex items-center gap-3 mb-3">
                      <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path
                          d="M16.6663 8.33317C16.6663 12.494 12.0505 16.8273 10.5005 18.1657C10.3561 18.2742 10.1803 18.333 9.99967 18.333C9.81901 18.333 9.64324 18.2742 9.49884 18.1657C7.94884 16.8273 3.33301 12.494 3.33301 8.33317C3.33301 6.56506 4.03539 4.86937 5.28563 3.61913C6.53587 2.36888 8.23156 1.6665 9.99967 1.6665C11.7678 1.6665 13.4635 2.36888 14.7137 3.61913C15.964 4.86937 16.6663 6.56506 16.6663 8.33317Z"
                          stroke="#4A80DE"
                          strokeWidth="1.66667"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                        <path
                          d="M10 10.8335C11.3807 10.8335 12.5 9.71421 12.5 8.3335C12.5 6.95278 11.3807 5.8335 10 5.8335C8.61929 5.8335 7.5 6.95278 7.5 8.3335C7.5 9.71421 8.61929 10.8335 10 10.8335Z"
                          stroke="#4A80DE"
                          strokeWidth="1.66667"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                      <span className="text-[#003A9E] font-poppins text-sm font-normal leading-5">
                        {branch.address}
                      </span>
                    </div>

                    <div className="flex items-center gap-3 mb-8">
                      <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path
                          d="M10.0003 18.3332C14.6027 18.3332 18.3337 14.6022 18.3337 9.99984C18.3337 5.39746 14.6027 1.6665 10.0003 1.6665C5.39795 1.6665 1.66699 5.39746 1.66699 9.99984C1.66699 14.6022 5.39795 18.3332 10.0003 18.3332Z"
                          stroke="#4A80DE"
                          strokeWidth="1.66667"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                        <path
                          d="M10 5V10L13.3333 11.6667"
                          stroke="#4A80DE"
                          strokeWidth="1.66667"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                      <span className="text-[#003A9E] text-sm font-poppins font-normal leading-5">{branch.hours}</span>
                    </div>

                    <button className="flex justify-center items-center shadow-[0_4px_14px_-3px_rgba(0,0,255,0.40)] bg-[#00F] px-4 sm:px-20 py-3 rounded-xl w-full hover:bg-blue-700 transition-colors whitespace-nowrap">
                      <span className="text-white text-center text-sm font-poppins font-semibold leading-5">
                        Ver en Google Maps
                      </span>
                    </button>
                  </>
                ) : (
                  <>
                    <p className="text-[#003A9E] text-sm font-normal font-poppins leading-5 mb-16">
                      {branch.description}
                    </p>

                    <button
                      className="flex justify-center items-center opacity-50 shadow-[0_4px_14px_-3px_rgba(0,0,255,0.40)] bg-[#F3F5F7] px-[114px] py-3 rounded-xl w-full"
                      disabled
                    >
                      <span className="text-[#003A9E] text-center font-poppins text-sm font-semibold leading-5">
                        Próximamente
                      </span>
                    </button>
                  </>
                )}
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Branches;
