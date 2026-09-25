import React from "react";
import { Phone } from "lucide-react";
import WhatsAppIcon from "./WhatsAppIcon";

export default function FloatingWhatsApp() {
  const phone = "918088196750";

  return (
    <div className="fixed bottom-6 right-5 sm:right-6 z-50 flex flex-col items-end gap-2.5 select-none">
      {/* Floating Call Button (Directly Above WhatsApp) */}
      <a
        href={`tel:+${phone}`}
        aria-label="Call Mangi Interiors"
        className="flex items-center gap-2.5 bg-gradient-to-r from-[#dfc28f] via-[#c5a059] to-[#b88e4c] text-white px-3.5 py-2.5 sm:px-4 sm:py-3 rounded-full shadow-[0_4px_18px_rgba(197,160,89,0.4)] transition-all duration-300 hover:scale-105 active:scale-95 group"
      >
        <div className="w-6 h-6 rounded-full bg-white/25 flex items-center justify-center">
          <Phone className="w-3.5 h-3.5 text-white fill-current" />
        </div>
        <span className="hidden sm:inline font-sans text-xs font-bold tracking-wide text-white drop-shadow-[0_1px_2px_rgba(0,0,0,0.2)]">
          Call Now
        </span>
      </a>

      {/* Floating WhatsApp Button */}
      <a
        href={`https://wa.me/${phone}?text=Hi%20Mangi%20Interiors,%20I'd%20like%20to%20discuss%20a%20commercial%20interior%20project.`}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Chat on WhatsApp"
        className="flex items-center gap-2.5 bg-[#25D366] hover:bg-[#20ba59] text-white px-3.5 py-2.5 sm:px-4 sm:py-3 rounded-full shadow-[0_4px_20px_rgba(37,211,102,0.45)] transition-all duration-300 hover:scale-105 active:scale-95 group relative"
      >
        <WhatsAppIcon className="w-6 h-6 text-white" />
        <span className="hidden sm:inline font-sans text-xs font-bold tracking-wide">
          WhatsApp
        </span>
        {/* Subtle Pulse ping animation */}
        <span className="absolute -top-1 -right-1 flex h-3 w-3">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-white opacity-75"></span>
          <span className="relative inline-flex rounded-full h-3 w-3 bg-emerald-400"></span>
        </span>
      </a>
    </div>
  );
}
