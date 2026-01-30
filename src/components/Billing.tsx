import React, { useState } from "react";

interface BillingFormData {
  ticketNumber: string;
  cfdiUse: string;
  paymentMethod: string;
  email: string;
  fiscalDocument: File | null;
}

const Billing: React.FC = () => {
  const [formData, setFormData] = useState<BillingFormData>({
    ticketNumber: "",
    cfdiUse: "",
    paymentMethod: "",
    email: "",
    fiscalDocument: null,
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] || null;
    setFormData((prev) => ({
      ...prev,
      fiscalDocument: file,
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Billing form submitted:", formData);
  };

  const requirements = ["Foto de Nota de compra", "Uso de CFDI", "Método de Pago", "Correo Electrónico"];

  return (
    <section id="facturacion" className="w-full bg-[#EDEFF4] pt-[51px] pb-[50px] px-5">
      <div className="max-w-[1200px] mx-auto my-0">
        <div className="text-center mb-[60px]">
          <div className="inline-flex justify-center items-center bg-[rgba(74,128,222,0.10)] mb-5 px-5 py-2 rounded-full">
            <span className="text-[#4A80DE] font-poppins text-center text-sm font-semibold leading-5">Facturación</span>
          </div>
          <h2 className="text-black text-center font-poppins text-[32px] leading-[36px] sm:text-[40px] sm:leading-9 font-bold tracking-[-1px] mb-5">
            Solicita tu factura fácilmente
          </h2>
          <p className="text-[#003A9E] text-center font-poppins text-lg font-normal leading-[29px] mb-[60px]">
            Genera tu factura de manera rápida y sin complicaciones. Solo necesitas tu ticket de compra.
          </p>
        </div>

        <div className="max-w-[800px] shadow-[0_4px_20px_0_rgba(0,0,255,0.08)] mx-auto my-0 px-10 py-11 rounded-[20px] border-2 border-solid border-[rgba(0,0,255,0.10)] bg-[#0000FF]/10 ">
          <div className="text-center mb-10">
            <div className="inline-flex w-28 h-28 justify-center items-center bg-[rgba(0,0,255,0.10)] mb-5 p-6 rounded-2xl">
              <svg width="64" height="64" viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path
                  d="M40.0003 5.3335H16.0003C14.5858 5.3335 13.2293 5.8954 12.2291 6.89559C11.2289 7.89579 10.667 9.25234 10.667 10.6668V53.3335C10.667 54.748 11.2289 56.1045 12.2291 57.1047C13.2293 58.1049 14.5858 58.6668 16.0003 58.6668H48.0003C49.4148 58.6668 50.7714 58.1049 51.7716 57.1047C52.7718 56.1045 53.3337 54.748 53.3337 53.3335V18.6668L40.0003 5.3335Z"
                  stroke="#0000FF"
                  strokeWidth="5.33333"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d="M37.333 5.3335V16.0002C37.333 17.4147 37.8949 18.7712 38.8951 19.7714C39.8953 20.7716 41.2519 21.3335 42.6663 21.3335H53.333"
                  stroke="#0000FF"
                  strokeWidth="5.33333"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d="M26.6663 24H21.333"
                  stroke="#0000FF"
                  strokeWidth="5.33333"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d="M42.6663 34.6665H21.333"
                  stroke="#0000FF"
                  strokeWidth="5.33333"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d="M42.6663 45.3335H21.333"
                  stroke="#0000FF"
                  strokeWidth="5.33333"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </div>
            <h3 className="text-black text-center font-poppins text-lg font-semibold leading-7 tracking-[-0.45px]">
              Datos que necesitarás:
            </h3>
          </div>

          <div className="grid grid-cols-2 gap-4 mb-3 max-sm:grid-cols-1">
            {requirements.map((requirement, index) => (
              <div
                key={index}
                className="flex items-start gap-3 shadow-[0_2px_8px_0_rgba(0,0,0,0.04)] bg-white px-4 py-3 rounded-[10px]"
              >
                <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path
                    d="M18.1678 8.33357C18.5484 10.2013 18.2772 12.1431 17.3994 13.8351C16.5216 15.527 15.0902 16.8669 13.3441 17.6313C11.5979 18.3957 9.64252 18.5384 7.80391 18.0355C5.9653 17.5327 4.35465 16.4147 3.24056 14.8681C2.12646 13.3214 1.57626 11.4396 1.68171 9.53639C1.78717 7.63318 2.54189 5.82364 3.82004 4.40954C5.09818 2.99545 6.82248 2.06226 8.70538 1.76561C10.5883 1.46897 12.516 1.82679 14.167 2.7794"
                    stroke="#4A80DE"
                    strokeWidth="1.66667"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M7.5 9.16683L10 11.6668L18.3333 3.3335"
                    stroke="#4A80DE"
                    strokeWidth="1.66667"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
                <span className="text-[#003A9E] font-poppins text-[15px] font-medium leading-[23px]">
                  {requirement}
                </span>
              </div>
            ))}
          </div>

          <div className="flex items-start gap-3 shadow-[0_2px_8px_0_rgba(0,0,0,0.04)] bg-white mb-10 px-4 py-3 rounded-[10px]">
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path
                d="M18.1678 8.33357C18.5484 10.2013 18.2772 12.1431 17.3994 13.8351C16.5216 15.527 15.0902 16.8669 13.3441 17.6313C11.5979 18.3957 9.64252 18.5384 7.80391 18.0355C5.9653 17.5327 4.35465 16.4147 3.24056 14.8681C2.12646 13.3214 1.57626 11.4396 1.68171 9.53639C1.78717 7.63318 2.54189 5.82364 3.82004 4.40954C5.09818 2.99545 6.82248 2.06226 8.70538 1.76561C10.5883 1.46897 12.516 1.82679 14.167 2.7794"
                stroke="#4A80DE"
                strokeWidth="1.66667"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M7.5 9.16683L10 11.6668L18.3333 3.3335"
                stroke="#4A80DE"
                strokeWidth="1.66667"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
            <span className="text-[#003A9E] text-[15px] font-poppins font-medium leading-[23px]">
              Constancia de Situación Fiscal Actualizada
            </span>
          </div>

          <div className="flex items-center gap-[18px] bg-[rgba(74,128,222,0.08)] mb-10 px-4 py-3 rounded-xl border-l-4 border-l-[#4A80DE] border-solid">
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path
                d="M10.0003 18.3332C14.6027 18.3332 18.3337 14.6022 18.3337 9.99984C18.3337 5.39746 14.6027 1.6665 10.0003 1.6665C5.39795 1.6665 1.66699 5.39746 1.66699 9.99984C1.66699 14.6022 5.39795 18.3332 10.0003 18.3332Z"
                stroke="#4A80DE"
                strokeWidth="1.66667"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M10 13.3333V10"
                stroke="#4A80DE"
                strokeWidth="1.66667"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M10 6.6665H10.0083"
                stroke="#4A80DE"
                strokeWidth="1.66667"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
            <p className="text-[#003A9E] text-sm font-normal font-poppins leading-[23px]">
              Tienes hasta <span className="font-medium">3 días hábiles</span> después de tu compra para solicitar tu
              factura. Si tu compra fue realizada en los <span className="font-semibold">últimos días del mes</span>, la
              solicitud deberá hacerse <span className="font-medium">antes</span> de que finalice el mes.
            </p>
          </div>

          <div className="text-center mt-8">
            <a
              href="https://wa.me/529991349225"
              target="_blank"
              className="inline-flex justify-center items-center shadow-[0_4px_14px_0_rgba(0,0,255,0.40)] gap-[13px] bg-[#00F] pt-[11px] pb-3 px-[34px] rounded-xl hover:bg-blue-700 transition-colors"
            >
              <svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path
                  d="M13.2019 10.809C13.021 10.7191 11.8455 10.1798 11.6647 10.0899C11.4838 10 11.303 10 11.1221 10.1798C10.9413 10.3596 10.5796 10.8989 10.3987 11.0787C10.3083 11.2584 10.1275 11.2584 9.94661 11.1685C9.31364 10.8989 8.68067 10.5393 8.13813 10.0899C7.68601 9.64045 7.2339 9.10112 6.8722 8.5618C6.78178 8.38202 6.8722 8.20225 6.96262 8.11236C7.05305 8.02247 7.14347 7.8427 7.32432 7.75281C7.41474 7.66292 7.50517 7.48315 7.50517 7.39326C7.59559 7.30337 7.59559 7.1236 7.50517 7.03371C7.41474 6.94382 6.96262 5.86517 6.78178 5.41573C6.69135 4.78652 6.51051 4.78652 6.32966 4.78652H5.87754C5.69669 4.78652 5.42542 4.96629 5.335 5.05618C4.79246 5.59551 4.52118 6.22472 4.52118 6.94382C4.61161 7.75281 4.88288 8.5618 5.42542 9.2809C6.42008 10.7191 7.68601 11.8876 9.22322 12.6067C9.67534 12.7865 10.037 12.9663 10.4891 13.0562C10.9413 13.236 11.3934 13.236 11.9359 13.1461C12.5689 13.0562 13.1114 12.6067 13.4731 12.0674C13.654 11.7079 13.654 11.3483 13.5636 10.9888L13.2019 10.809ZM15.4625 2.62921C11.9359 -0.876404 6.23924 -0.876404 2.71271 2.62921C-0.180847 5.50562 -0.72339 9.91011 1.26593 13.4157L0 18L4.79246 16.7416C6.14881 17.4607 7.59559 17.8202 9.04237 17.8202C14.0157 17.8202 17.9943 13.8652 17.9943 8.92135C18.0847 6.58427 17.0901 4.33708 15.4625 2.62921ZM13.021 15.2135C11.8455 15.9326 10.4891 16.382 9.04237 16.382C7.68601 16.382 6.42008 16.0225 5.24457 15.3933L4.9733 15.2135L2.17017 15.9326L2.89356 13.236L2.71271 12.9663C0.542542 9.37079 1.62763 4.8764 5.15415 2.62921C8.68067 0.382023 13.2019 1.55056 15.372 4.96629C17.5422 8.47191 16.5475 13.0562 13.021 15.2135Z"
                  fill="white"
                />
              </svg>
              <span className="text-white text-center font-poppins text-lg font-bold leading-7">Solicitar factura</span>
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path
                  d="M3.33301 8H12.6663"
                  stroke="white"
                  strokeWidth="1.33333"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d="M8 3.3335L12.6667 8.00016L8 12.6668"
                  stroke="white"
                  strokeWidth="1.33333"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Billing;
