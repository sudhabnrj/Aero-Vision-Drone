import React, { useState, useEffect } from 'react';
import { ShoppingBag, Menu, X } from 'lucide-react';

interface HeaderNavProps {
  onOpenBuyModal: () => void;
  onOpenSearchModal?: () => void;
}

export const HeaderNav: React.FC<HeaderNavProps> = ({ onOpenBuyModal }) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 30) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();

    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header
      className='fixed top-0 left-0 right-0 z-50 transition-all duration-300 ease-in-out bg-gradient-to-b from-black/60 via-black/30 to-transparent py-4 sm:py-5'>
      <div className={`max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between transition-all duration-300 ${isScrolled
        ? 'bg-white/0.2 backdrop-blur-xl border-b border-white/10 shadow-2xl py-4 sm:py-2.5 rounded-full'
        : ''
        }`}>
        {/* Left Logo / Brand */}
        <div className="flex items-center space-x-6">
          <a href="#" className="flex items-center group">
            <img
              src={`${import.meta.env.BASE_URL}logo.png`}
              alt="AeroVision Logo"
              className={`w-[200px] object-contain transition-all duration-300 drop-shadow-md group-hover:opacity-90 ${isScrolled ? '' : ''
                }`}
            />
          </a>
        </div>

        {/* Desktop Navigation Links */}
        <nav
          className={`hidden md:flex items-center text-white/90 drop-shadow-sm font-medium transition-all duration-300 space-x-8 ${isScrolled ? 'text-xs sm:text-sm' : ' text-sm'
            }`}
        >
          <a href="#consumer" className="hover:text-white transition-colors">Camera Drones</a>
          <a href="#handheld" className="hover:text-white transition-colors">Handheld</a>
          <a href="#agriculture" className="hover:text-white transition-colors">Agriculture</a>
          <a href="#enterprise" className="hover:text-white transition-colors">Enterprise</a>
          <a href="#components" className="hover:text-white transition-colors">Components</a>
          <a href="#support" className="hover:text-white transition-colors">Support</a>
        </nav>

        {/* Right Action Button */}
        <div className="flex items-center space-x-3">
          <button
            onClick={onOpenBuyModal}
            className={`flex items-center space-x-1.5 bg-[#0070d2] hover:bg-[#005fb3] text-white rounded-full font-semibold shadow-lg hover:shadow-xl transition-all duration-300 cursor-pointer transform active:scale-95 ${isScrolled
              ? 'px-4 py-1.5 text-xs sm:text-sm'
              : 'px-4 py-1.5 text-xs sm:text-sm'
              }`}
          >
            <ShoppingBag className={isScrolled ? 'w-3.5 h-3.5' : 'w-3.5 h-3.5'} />
            <span>Buy Now</span>
          </button>

          {/* Mobile hamburger menu toggle */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-1.5 rounded-full bg-black/40 text-white hover:bg-black/60 transition-colors pointer-events-auto"
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-slate-900/95 backdrop-blur-md text-white border-b border-white/10 px-6 py-6 space-y-4 pointer-events-auto shadow-2xl animate-fadeIn">
          <a
            href="#consumer"
            onClick={() => setMobileMenuOpen(false)}
            className="block text-base font-medium hover:text-blue-400 transition-colors"
          >
            Camera Drones
          </a>
          <a
            href="#handheld"
            onClick={() => setMobileMenuOpen(false)}
            className="block text-base font-medium hover:text-blue-400 transition-colors"
          >
            Handheld
          </a>
          <a
            href="#agriculture"
            onClick={() => setMobileMenuOpen(false)}
            className="block text-base font-medium hover:text-blue-400 transition-colors"
          >
            Agriculture
          </a>
          <a
            href="#enterprise"
            onClick={() => setMobileMenuOpen(false)}
            className="block text-base font-medium hover:text-blue-400 transition-colors"
          >
            Enterprise
          </a>
          <a
            href="#support"
            onClick={() => setMobileMenuOpen(false)}
            className="block text-base font-medium hover:text-blue-400 transition-colors"
          >
            Support & Fly Safe
          </a>
        </div>
      )}
    </header>
  );
};
