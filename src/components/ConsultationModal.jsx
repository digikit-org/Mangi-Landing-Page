import React, { useState, useEffect } from "react";
import {
  X,
  CheckCircle2,
  ShieldCheck,
  Send,
  Clock,
  Phone,
  Mail,
  Sparkles,
  ArrowRight,
} from "lucide-react";
import confetti from "canvas-confetti";

export default function ConsultationModal({ isOpen, onClose }) {
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "Escape") onClose();
    };
    if (isOpen) {
      document.body.style.overflow = "hidden";
      window.addEventListener("keydown", handleKeyDown);
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 md:p-10">
      {/* Backdrop */}
      <div
        onClick={onClose}
        className="absolute inset-0 bg-[#2a241e]/55 backdrop-blur-sm transition-opacity"
      ></div>

      {/* Modal Card */}
      <div className="relative w-full max-w-xl bg-[#fcfbfa] rounded-2xl border border-[#e8dfcf] shadow-2xl overflow-hidden z-10 animate-in fade-in zoom-in-95 duration-200">
        {/* Top Gold Accent Bar */}
        <div className="h-1.5 w-full bg-gradient-to-r from-[#dfc28f] via-[#c5a059] to-[#ad8940]"></div>
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 rounded-full text-[#78716c] hover:text-[#1c1917] hover:bg-[#ede5d8] transition-colors z-20"
          aria-label="Close modal"
        >
          <X className="w-5 h-5" />
        </button>
        {/* /* Form Content: SIGN UP. VISIT. SAVE.  */}
        <div className="p-6 sm:p-8 max-h-[85vh] overflow-y-auto">
          {/* Header */}
          <div className="mb-5">
            <span className="text-[10px] font-sans font-bold tracking-[0.25em] text-[#a67c33] uppercase block mb-1">
              SIGN UP. VISIT. SAVE.
            </span>
            <h2 className="font-display text-2xl sm:text-3xl font-medium text-[#1c1917]">
              Your Space Makeover Starts Here...
            </h2>
            <p className="font-sans text-xs text-[#78716c] mt-1">
              Get a free consultation with the Mangi Interiors design & build
              team.
            </p>
          </div>

          <form
            action="https://mail.digikit.in/forms/mangi/consultation.php"
            method="post"
            className="space-y-3.5"
          >
            {/* Name */}
            <div>
              <label className="block text-[11px] font-semibold text-[#3d3833] uppercase tracking-wider mb-1">
                Your Name *
              </label>
              <input
                name="name"
                type="text"
                required
                placeholder="e.g. Rahul Sharma"
                className="w-full px-3.5 py-2.5 bg-white border border-[#dcd3c3] rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#c5a059]"
              />
            </div>

            {/* Contact no. & Country */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="block text-[11px] font-semibold text-[#3d3833] uppercase tracking-wider mb-1">
                  Contact no. *
                </label>
                <input
                  name="phone"
                  type="tel"
                  required
                  placeholder="+91 / WhatsApp"
                  className="w-full px-3.5 py-2.5 bg-white border border-[#dcd3c3] rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#c5a059]"
                />
              </div>
              <div>
                <label className="block text-[11px] font-semibold text-[#3d3833] uppercase tracking-wider mb-1">
                  Country *
                </label>
                <input
                  name="country"
                  type="text"
                  required
                  placeholder="e.g. India"
                  className="w-full px-3.5 py-2.5 bg-white border border-[#dcd3c3] rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#c5a059]"
                />
              </div>
            </div>

            {/* Email & Postal code */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="block text-[11px] font-semibold text-[#3d3833] uppercase tracking-wider mb-1">
                  Corporate / Personal Email *
                </label>
                <input
                  name="email"
                  type="email"
                  required
                  placeholder="name@company.com"
                  className="w-full px-3.5 py-2.5 bg-white border border-[#dcd3c3] rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#c5a059]"
                />
              </div>
              <div>
                <label className="block text-[11px] font-semibold text-[#3d3833] uppercase tracking-wider mb-1">
                  Postal code
                </label>
                <input
                  name="code"
                  type="text"
                  placeholder="PIN / Postal Code"
                  className="w-full px-3.5 py-2.5 bg-white border border-[#dcd3c3] rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#c5a059]"
                />
              </div>
            </div>

            {/* Space Type */}
            <div>
              <label className="block text-[11px] font-semibold text-[#3d3833] uppercase tracking-wider mb-1">
                Commercial Space Type
              </label>
              <select
                name="space"
                className="w-full px-3 py-2.5 bg-white border border-[#dcd3c3] rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#c5a059]"
              >
                <option value="Healthcare (Clinics, Hospitals, Labs)">
                  Healthcare (Clinics, Hospitals, Labs)
                </option>
                <option value="Hospitality (Hotels, Lounges, Dining)">
                  Hospitality (Hotels, Lounges, Dining)
                </option>
                <option value="Workplaces & Corporate Offices">
                  Workplaces & Corporate Offices
                </option>
                <option value="Retail & Showrooms">Retail & Showrooms</option>
                <option value="Executive Workspace">Executive Workspace</option>
                <option value="Meeting & Conference Spaces">
                  Meeting & Conference Spaces
                </option>
                <option value="Reception Areas">Reception Areas</option>
                <option value="Turnkey Interiors">
                  Turnkey Commercial Fitout
                </option>
              </select>
            </div>

            {/* Submit CTA Button */}
            <div className="pt-2">
              <button
                type="submit"
                className="w-full gold-gradient-btn py-3.5 rounded-lg text-white font-semibold text-sm sm:text-base tracking-wide flex items-center justify-center gap-2 group shadow-md"
              >
                Get a Free Consultation
                <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
              </button>
            </div>

            <div className="flex items-center justify-center gap-2 pt-1 text-[11px] text-[#857e75]">
              <ShieldCheck className="w-3.5 h-3.5 text-[#a67c33]" />
              <span>No obligation. No pressure. 100% Confidential.</span>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
