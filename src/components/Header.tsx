import React, { useState } from 'react';

const Header: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <header className="flex w-full justify-center items-center  absolute z-10 md:px-[50px] xl:px-[88px] py-5 left-0 top-0 max-md:px-5">
      <div className="flex w-full max-w-[1264px] justify-between items-center">
        <img
          src="https://api.builder.io/api/v1/image/assets/TEMP/fdebf2230022f3a59dfddaf30f66b3b43b056236?width=324"
          alt="A LAVAR Logo"
          className="w-[162px] h-[53px]"
        />
        <div className="flex items-center gap-6">
          
          <nav className="flex justify-center items-start gap-8 max-sm:hidden">
            <a href="#promociones" className="text-white font-poppins text-center text-sm font-medium leading-5 hover:text-blue-200 transition-colors">
              Promociones
            </a>
            <a href="#servicios" className="flex justify-center items-center">
              <span className="text-white text-center text-sm font-medium font-poppins leading-5 hover:text-blue-200 transition-colors">
                Servicios
              </span>
            </a>
            <a href="#facturacion" className="flex justify-center items-center">
              <span className="text-white text-center text-sm font-medium font-poppins leading-5 hover:text-blue-200 transition-colors">
                Facturación
              </span>
            </a>
            <a href="#sucursales" className="flex justify-center items-center">
              <span className="text-white text-center text-sm font-medium font-poppins leading-5 hover:text-blue-200 transition-colors">
                Sucursales
              </span>
            </a>
          </nav>
          <button 
            className="text-white text-2xl cursor-pointer sm:hidden"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-label="Toggle menu"
          >
            ☰
          </button>
        </div>
      </div>
      
      {isMenuOpen && (
        <div className="absolute top-full left-0 w-full bg-black bg-opacity-90 backdrop-blur-md sm:hidden">
          <nav className="flex flex-col gap-4 p-6">
            <a href="#promociones" className="text-white text-sm font-medium hover:text-blue-200 transition-colors">
              Promociones
            </a>
            <a href="#servicios" className="text-white text-sm font-medium hover:text-blue-200 transition-colors">
              Servicios
            </a>
            <a href="#facturacion" className="text-white text-sm font-medium hover:text-blue-200 transition-colors">
              Facturación
            </a>
            <a href="#sucursales" className="text-white text-sm font-medium hover:text-blue-200 transition-colors">
              Sucursales
            </a>
          </nav>
        </div>
      )}
    </header>
  );
};

export default Header;
