import React, { useState, useEffect } from 'react';
import Logo from './Logo';
import { ArrowRight, Menu, X } from 'lucide-react';

export default function Navbar({ onOpenConsultation }) {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
        scrolled
          ? 'bg-[#faf8f5]/95 backdrop-blur-md shadow-[0_2px_15px_-3px_rgba(0,0,0,0.06)] py-2 sm:py-2.5'
          : 'bg-gradient-to-b from-black/50 via-black/20 to-transparent py-2.5 sm:py-3'
      }`}
    >
      <div className="max-w-[1280px] mx-auto px-4 sm:px-6 md:px-8 flex items-center justify-between">
        
        {/* Brand Logo: MANGI INTERIORS (Compact) */}
        <a href="#" className="flex items-center">
          <Logo light={!scrolled} size="small" />
        </a>

        {/* Desktop Nav: Commercial Interiors | Projects | Services | Book a consultation */}
        <div className="hidden lg:flex items-center gap-6">
          <nav
            className={`flex items-center space-x-3.5 text-xs sm:text-[13px] font-sans font-semibold tracking-wide transition-colors duration-300 ${
              scrolled
                ? 'text-[#2c2825]'
                : 'text-white drop-shadow-[0_1px_3px_rgba(0,0,0,0.6)]'
            }`}
          >
            <a
              href="#why-mangi"
              className="hover:text-brand-gold transition-colors duration-200"
            >
              Commercial Interiors
            </a>

            <span className={scrolled ? 'text-[#c5a059]' : 'text-[#f2d79c]'}>|</span>

            <a
              href="#projects"
              className="hover:text-brand-gold transition-colors duration-200"
            >
              Projects
            </a>

            <span className={scrolled ? 'text-[#c5a059]' : 'text-[#f2d79c]'}>|</span>

            <a
              href="#services"
              className="hover:text-brand-gold transition-colors duration-200"
            >
              Services
            </a>

            <span className={scrolled ? 'text-[#c5a059]' : 'text-[#f2d79c]'}>|</span>

            <a
              href="#consultation"
              onClick={(e) => {
                e.preventDefault();
                onOpenConsultation('Navbar Link');
              }}
              className="hover:text-brand-gold transition-colors duration-200"
            >
              Book a consultation
            </a>
          </nav>

          {/* Button: [ Get a Free Consultation → ] */}
          <button
            onClick={() => onOpenConsultation('Navbar Button')}
            className="gold-gradient-btn inline-flex items-center gap-1.5 px-4 py-2 text-xs font-semibold tracking-wide text-white rounded shadow-md transition-all duration-200"
          >
            <span>Get a Free Consultation</span>
            <ArrowRight className="w-3.5 h-3.5 text-white" />
          </button>
        </div>

        {/* Mobile View Toggle */}
        <div className="flex items-center gap-2.5 lg:hidden">
          <button
            onClick={() => onOpenConsultation('Mobile Nav CTA')}
            className="gold-gradient-btn px-2.5 py-1.5 text-[11px] font-semibold text-white rounded shadow-sm"
          >
            Consultation →
          </button>
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className={`p-1 rounded-lg transition-colors ${
              scrolled ? 'text-[#1c1917]' : 'text-white'
            }`}
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>

      </div>

      {/* Mobile Menu Dropdown */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-[#faf8f5] border-b border-[#e8dfcf] px-6 py-4 shadow-xl animate-in slide-in-from-top duration-200">
          <nav className="flex flex-col space-y-2.5 text-xs font-semibold text-[#2c2825]">
            <a
              href="#why-mangi"
              onClick={() => setMobileMenuOpen(false)}
              className="py-1 hover:text-brand-gold transition-colors"
            >
              Commercial Interiors
            </a>
            <div className="h-[1px] bg-[#e8dfcf]"></div>
            <a
              href="#projects"
              onClick={() => setMobileMenuOpen(false)}
              className="py-1 hover:text-brand-gold transition-colors"
            >
              Projects
            </a>
            <div className="h-[1px] bg-[#e8dfcf]"></div>
            <a
              href="#services"
              onClick={() => setMobileMenuOpen(false)}
              className="py-1 hover:text-brand-gold transition-colors"
            >
              Services
            </a>
            <div className="h-[1px] bg-[#e8dfcf]"></div>
            <a
              href="#consultation"
              onClick={(e) => {
                e.preventDefault();
                setMobileMenuOpen(false);
                onOpenConsultation('Mobile Menu Link');
              }}
              className="py-1 text-[#a67c33] hover:text-[#1c1917] transition-colors"
            >
              Book a consultation
            </a>
          </nav>
        </div>
      )}
    </header>
  );
}
