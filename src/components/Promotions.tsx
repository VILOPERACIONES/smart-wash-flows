import React, { useState } from 'react';

const Promotions: React.FC = () => {
  const [currentSlide, setCurrentSlide] = useState(1);
  const totalSlides = 3;

  const nextSlide = () => {
    setCurrentSlide(currentSlide === totalSlides - 1 ? 0 : currentSlide + 1);
  };

  const prevSlide = () => {
    setCurrentSlide(currentSlide === 0 ? totalSlides - 1 : currentSlide - 1);
  };

  const goToSlide = (index: number) => {
    setCurrentSlide(index);
  };

  return (
    <section id="promociones" className="w-full bg-white pt-[61px] pb-32 px-5">
      <div className="max-w-[1400px] mx-auto my-0">
        <div className="text-center mb-20">
          <div className="inline-flex justify-center items-center bg-[rgba(74,128,222,0.20)] mb-5 px-4 py-1.5 rounded-full">
            <span className="text-[#4A80DE] font-poppins text-center text-sm font-medium leading-5">
              Promociones
            </span>
          </div>
          <h2 className="text-black text-center font-poppins text-5xl font-bold leading-[48px] tracking-[-1.2px] mb-10 max-md:text-[40px] max-md:leading-10 max-sm:text-[32px] max-sm:leading-9">
            Conoce nuestras promociones
          </h2>
        </div>
        
        <div className="relative max-w-[1074px] mx-auto my-0">
          <div className="relative rounded-xl">
            <div className="w-full h-[586px] flex justify-center items-center shadow-[0_10px_15px_-3px_rgba(0,0,0,0.10),0_4px_6px_-4px_rgba(0,0,0,0.10)] bg-gray-200 rounded-xl">
              <div className="text-[#003A9E] text-2xl font-bold leading-8">
                Promoción {currentSlide + 1}
              </div>
            </div>
            
            <div className="flex justify-center gap-2 mt-5">
              {[0, 1, 2].map((index) => (
                <button
                  key={index}
                  onClick={() => goToSlide(index)}
                  className={`w-3 h-3 rounded-full transition-colors ${
                    currentSlide === index ? 'bg-[#00F]' : 'bg-gray-200'
                  }`}
                  aria-label={`Go to slide ${index + 1}`}
                />
              ))}
            </div>
          </div>
          
          <button
            onClick={prevSlide}
            className="flex w-12 h-12 justify-center items-center shadow-[0_4px_6px_-1px_rgba(0,0,0,0.10),0_2px_4px_-2px_rgba(0,0,0,0.10)] absolute -translate-y-2/4 bg-[rgba(255,255,255,0.80)] p-4 rounded-full left-0 top-2/4 hover:bg-white transition-colors"
            aria-label="Previous promotion"
          >
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M10 12L6 8L10 4" stroke="#0000FF" strokeWidth="1.33333" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </button>
          
          <button
            onClick={nextSlide}
            className="flex w-12 h-12 justify-center items-center shadow-[0_4px_6px_-1px_rgba(0,0,0,0.10),0_2px_4px_-2px_rgba(0,0,0,0.10)] absolute -translate-y-2/4 bg-[rgba(255,255,255,0.80)] p-4 rounded-full right-0 top-2/4 hover:bg-white transition-colors"
            aria-label="Next promotion"
          >
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M6 12L10 8L6 4" stroke="#0000FF" strokeWidth="1.33333" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </button>
        </div>
      </div>
    </section>
  );
};

export default Promotions;
