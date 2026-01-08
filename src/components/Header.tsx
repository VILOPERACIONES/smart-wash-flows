import React, { useState } from 'react';
import { Menu, X } from 'lucide-react';

const Header: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(prev => !prev);
  };

  const closeMenu = () => {
    setIsMenuOpen(false);
  };

  return (
    <header className="absolute z-50 left-0 top-0 w-full md:px-[50px] xl:px-[88px] py-5 max-md:px-5">
      <div className="flex w-full max-w-[1264px] mx-auto justify-between items-center">
        <img
          src="https://res.cloudinary.com/diefluaw7/image/upload/v1767894340/Group_14_rwibjk.svg"
          alt="A LAVAR Logo"
          className="w-[162px] h-auto"
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
            className="text-white cursor-pointer sm:hidden p-2 z-50"
            onClick={toggleMenu}
            aria-label={isMenuOpen ? "Cerrar menú" : "Abrir menú"}
            type="button"
          >
            {isMenuOpen ? <X size={28} /> : <Menu size={28} />}
          </button>
        </div>
      </div>
      
      {/* Mobile Menu Overlay */}
      <div 
        className={`fixed inset-0 bg-black/95 backdrop-blur-md sm:hidden transition-all duration-300 ${
          isMenuOpen ? 'opacity-100 visible' : 'opacity-0 invisible'
        }`}
        style={{ top: '73px' }}
      >
        <nav className="flex flex-col gap-6 p-8 pt-6">
          <a 
            href="#promociones" 
            className="text-white text-lg font-medium hover:text-blue-200 transition-colors"
            onClick={closeMenu}
          >
            Promociones
          </a>
          <a 
            href="#servicios" 
            className="text-white text-lg font-medium hover:text-blue-200 transition-colors"
            onClick={closeMenu}
          >
            Servicios
          </a>
          <a 
            href="#facturacion" 
            className="text-white text-lg font-medium hover:text-blue-200 transition-colors"
            onClick={closeMenu}
          >
            Facturación
          </a>
          <a 
            href="#sucursales" 
            className="text-white text-lg font-medium hover:text-blue-200 transition-colors"
            onClick={closeMenu}
          >
            Sucursales
          </a>
        </nav>
      </div>
    </header>
  );
};

export default Header;
