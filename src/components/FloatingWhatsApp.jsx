import React from "react";
import WhatsAppIcon from "./WhatsAppIcon";

export default function FloatingWhatsApp() {
  const phone = "918088196750";

  return (
    <a
      href={`https://wa.me/${phone}?text=Hi%20Mangi%20Interiors,%20I'd%20like%20to%20discuss%20a%20commercial%20interior%20project.`}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Chat on WhatsApp"
      className="fixed bottom-6 right-6 z-50 flex items-center gap-2.5 bg-[#25D366] hover:bg-[#20ba59] text-white px-4 py-3 rounded-full shadow-[0_4px_20px_rgba(37,211,102,0.45)] transition-all duration-300 hover:scale-105 active:scale-95 group"
    >
      <WhatsAppIcon className="w-6 h-6 text-white" />
      <span className="hidden sm:inline font-sans text-xs font-bold tracking-wide">
        Chat with Us
      </span>
      {/* Pulse ping animation */}
      <span className="absolute -top-1 -right-1 flex h-3.5 w-3.5">
        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-white opacity-75"></span>
        <span className="relative inline-flex rounded-full h-3.5 w-3.5 bg-emerald-400"></span>
      </span>
    </a>
  );
}
