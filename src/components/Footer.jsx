import React from "react";
import Logo from "./Logo";
import { Phone, Mail, ArrowRight } from "lucide-react";
import WhatsAppIcon from "./WhatsAppIcon";

export default function Footer({ onOpenConsultation }) {
  const phone = "918088196750";
  const displayPhone = "+91 80881 96750";
  const email = "bapanmistry@mangiinteriors.com";

  return (
    <footer className="w-full bg-[#f5f0e6] text-[#2c2825] pt-16 sm:pt-20 pb-10 border-t border-[#e8dfcf]">
      <div className="max-w-[1360px] mx-auto px-5 sm:px-8 md:px-12">
        {/* 07 — FINAL CTA Banner */}
        <div className="mb-14 sm:mb-16 pb-12 sm:pb-16 border-b border-[#e8dfcf] flex flex-col lg:flex-row lg:items-center justify-between gap-8">
          <div>
            <span className="text-[11px] sm:text-xs font-sans font-bold tracking-[0.25em] text-[#a67c33] uppercase block mb-3">
              — FINAL CTA
            </span>
            <h2 className="font-display text-3xl sm:text-4xl md:text-5xl font-medium text-[#1c1917] tracking-tight leading-tight max-w-2xl">
              Let's Build a Space Your Business Is{" "}
              <span className="italic font-semibold text-[#a67c33]">
                Proud Of.
              </span>
            </h2>
            <p className="font-sans text-sm sm:text-base text-[#524b43] mt-3 max-w-xl">
              Partner with Mangi Interiors for end-to-end commercial design,
              precision engineering, and turnkey execution across Healthcare,
              Hospitality, Workplaces & Retail.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 flex-shrink-0">
            <button
              onClick={() => onOpenConsultation("Footer CTA")}
              className="gold-gradient-btn px-8 py-4 rounded-md text-white font-semibold text-sm tracking-wide inline-flex items-center justify-center gap-2 group shadow-md"
            >
              <span>Get a Free Consultation</span>
              <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
            </button>
            <a
              href={`https://wa.me/${phone}?text=Hi%20Mangi%20Interiors,%20I'd%20like%20to%20discuss%20a%20commercial%20interior%20project.`}
              target="_blank"
              rel="noopener noreferrer"
              className="px-6 py-4 rounded-md border border-[#c5a059] bg-white hover:bg-[#faf8f5] text-[#2c2825] font-semibold text-sm tracking-wide inline-flex items-center justify-center gap-2 transition-all shadow-sm group"
            >
              <WhatsAppIcon className="w-5 h-5 text-[#25D366] transition-transform duration-300 group-hover:scale-110" />
              <span>WhatsApp Us</span>
            </a>
          </div>
        </div>

        {/* Contact Links & Brand Strip */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-8 lg:gap-12 pb-12 border-b border-[#e8dfcf]">
          {/* Brand Info */}
          <div className="lg:col-span-5 flex flex-col justify-between">
            <div>
              <Logo light={false} size="large" />
              <div className="mt-4">
                <span className="text-xs font-semibold tracking-[0.25em] text-[#a67c33] uppercase block">
                  Design. Build. Inspire.
                </span>
                <p className="text-xs sm:text-sm text-[#524b43] mt-1.5 leading-relaxed">
                  Healthcare | Hospitality | Workplaces | Retail
                </p>
              </div>
            </div>

            <p className="text-xs text-[#78716c] mt-6">
              Designing better businesses through high-performing spaces across
              India.
            </p>
          </div>

          {/* Quick Direct Contacts */}
          <div className="lg:col-span-7 flex flex-col justify-center space-y-4">
            <span className="text-xs font-bold uppercase tracking-wider text-[#2c2825]">
              Direct Contact & Consultations
            </span>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              {/* Call Us */}
              <a
                href={`tel:+${phone}`}
                className="p-4 rounded-xl bg-white border border-[#e8dfcf] hover:border-[#c5a059] shadow-sm transition-all group flex flex-col justify-between"
              >
                <div className="flex items-center gap-2.5 text-[#a67c33] text-xs font-semibold mb-1">
                  <Phone className="w-4 h-4" />
                  <span>Call Us</span>
                </div>
                <span className="font-sans text-sm font-semibold text-[#1c1917] group-hover:text-[#a67c33] transition-colors">
                  {displayPhone}
                </span>
              </a>

              {/* WhatsApp Us */}
              <a
                href={`https://wa.me/${phone}?text=Hi%20Mangi%20Interiors,%20I'd%20like%20to%20consult%20about%20a%20commercial%20interior%20project.`}
                target="_blank"
                rel="noopener noreferrer"
                className="p-4 rounded-xl bg-white border border-[#e8dfcf] hover:border-[#25D366] shadow-sm transition-all group flex flex-col justify-between"
              >
                <div className="flex items-center gap-2.5 text-[#25D366] text-xs font-semibold mb-1">
                  <WhatsAppIcon className="w-5 h-5 text-[#25D366] transition-transform duration-300 group-hover:scale-110" />
                  <span>WhatsApp Us</span>
                </div>

                <span className="font-sans text-sm font-semibold text-[#1c1917] group-hover:text-[#25D366] transition-colors">
                  {displayPhone}
                </span>
              </a>
              {/* Email Us */}
              <a
                href={`mailto:${email}`}
                className="p-4 rounded-xl bg-white border border-[#e8dfcf] hover:border-[#c5a059] shadow-sm transition-all group flex flex-col justify-between"
              >
                <div className="flex items-center gap-2.5 text-[#a67c33] text-xs font-semibold mb-1">
                  <Mail className="w-4 h-4" />
                  <span>Mail Us</span>
                </div>
                <span className="font-sans text-xs font-medium text-[#1c1917] truncate group-hover:text-[#a67c33] transition-colors">
                  {email}
                </span>
              </a>
            </div>
          </div>
        </div>

        {/* Bottom Sub-bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between text-xs text-[#6e665d] gap-4">
          <p>
            © {new Date().getFullYear()} Mangi Interiors. Commercial Interiors |
            Turnkey Execution. All rights reserved.
          </p>
          <div className="flex items-center gap-5">
            <span>
              Digital Experience Crafted by{" "}
              <a
                href="https://www.digikit.in/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-[#a67c33] hover:text-[#8a6320] hover:underline font-semibold transition-colors"
              >
                Digikit
              </a>
            </span>

            <span className="text-[#c4bcaf]">|</span>

            <button
              onClick={() => onOpenConsultation()}
              className="hover:text-[#a67c33] transition-colors"
            >
              Book a Consultation
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
}
