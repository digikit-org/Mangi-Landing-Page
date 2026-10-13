import React, { useEffect } from "react";
import {
  CheckCircle2,
  Clock,
  Phone,
  ArrowLeft,
  ArrowRight,
  ShieldCheck,
  Building2,
  Calendar,
  Sparkles,
} from "lucide-react";
import WhatsAppIcon from "./WhatsAppIcon";
import confetti from "canvas-confetti";

export default function ThankYou({ lead, onBackHome }) {
  // Fire celebration confetti on page mount
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });

    const timer = setTimeout(() => {
      try {
        confetti({
          particleCount: 90,
          spread: 80,
          origin: { y: 0.45 },
          colors: ["#c5a059", "#dfc28f", "#a67c33", "#ffffff"],
        });
      } catch (_) {}
    }, 200);

    return () => clearTimeout(timer);
  }, []);

  // Retrieve lead info from props or sessionStorage fallback
  const leadData = (() => {
    if (lead && (lead.name || lead.phone)) return lead;
    if (typeof window !== "undefined") {
      try {
        const stored = sessionStorage.getItem("mangi_lead");
        if (stored) return JSON.parse(stored);
      } catch (_) {}
    }
    return {
      name: "",
      phone: "",
      service: "Commercial Interior",
      area: "3,000 – 10,000 sq.ft.",
    };
  })();

  const phone = "918088196750";
  const displayPhone = "+91 80881 96750";
  const clientName = leadData.name ? leadData.name.trim() : "";
  const selectedService = leadData.service || "Commercial Space Fitout";
  const selectedArea = leadData.area || "Tailored Commercial Scope";

  const whatsappMessage = encodeURIComponent(
    `Hi Mangi Interiors, I just requested a consultation for ${selectedService} (${selectedArea}). My name is ${clientName || "a client"}.`
  );

  return (
    <section className="min-h-[85vh] w-full pt-28 sm:pt-32 pb-16 sm:pb-24 bg-[#faf8f5] flex flex-col justify-center">
      <div className="max-w-[1080px] mx-auto px-4 sm:px-6 md:px-8 w-full">
        {/* Back Link */}
        <div className="mb-6 sm:mb-8">
          <button
            onClick={onBackHome}
            className="inline-flex items-center gap-2 text-xs sm:text-sm font-semibold text-[#8a6320] hover:text-[#1c1917] transition-colors cursor-pointer group"
          >
            <ArrowLeft className="w-4 h-4 transition-transform group-hover:-translate-x-1" />
            <span>Return to Homepage</span>
          </button>
        </div>

        {/* Main Card Container */}
        <div className="bg-white rounded-3xl border border-[#e8dfcf] p-6 sm:p-10 md:p-12 shadow-[0_16px_50px_rgba(180,150,110,0.12)] relative overflow-hidden">
          {/* Top Gold Gradient Bar */}
          <div className="absolute top-0 inset-x-0 h-2 bg-gradient-to-r from-[#dfc28f] via-[#c5a059] to-[#996f2a]"></div>

          {/* Header Content */}
          <div className="text-center max-w-2xl mx-auto mb-8 sm:mb-12">
            {/* Animated Success Badge */}
            <div className="relative inline-flex items-center justify-center mb-5">
              <div className="w-20 h-20 sm:w-24 sm:h-24 rounded-full bg-[#f6eee0] flex items-center justify-center ring-8 ring-[#f9f5ed]">
                <CheckCircle2 className="w-10 h-10 sm:w-12 sm:h-12 text-[#a67c33]" />
              </div>
              <div className="absolute -top-1 -right-1 p-1.5 rounded-full bg-[#c5a059] text-white shadow-xs">
                <Sparkles className="w-4 h-4" />
              </div>
            </div>

            {/* Category Tag */}
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#f4ebd9] border border-[#c5a059]/40 text-[#8a6320] text-[11px] sm:text-xs font-bold tracking-widest uppercase mb-3">
              Consultation Request Received
            </div>

            <h1 className="font-display text-3xl sm:text-4xl md:text-5xl font-semibold text-[#1c1917] tracking-tight leading-tight">
              {clientName ? `Thank You, ${clientName}!` : "Thank You!"}
            </h1>

            <p className="font-sans text-sm sm:text-base md:text-lg text-[#554d45] mt-3 sm:mt-4 leading-relaxed font-normal">
              Your consultation request has been successfully received. A senior commercial architect from Mangi Interiors will review your space details and get in touch within{" "}
              <strong className="font-semibold text-[#1c1917]">24 business hours</strong>.
            </p>
          </div>

          {/* Submitted Request Details Card */}
          <div className="bg-[#faf8f5] rounded-2xl border border-[#e8dfcf] p-5 sm:p-7 mb-8 sm:mb-12">
            <div className="flex items-center justify-between border-b border-[#e8dfcf] pb-3 mb-4">
              <span className="text-xs font-bold tracking-wider uppercase text-[#8a6320]">
                Submitted Requirement Summary
              </span>
              <span className="text-[11px] font-semibold text-[#1c1917] bg-[#efe5d3] px-2.5 py-0.5 rounded-full border border-[#d6c4a5]">
                Status: Architect Assigned
              </span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-6 text-left">
              <div>
                <span className="text-[11px] uppercase font-bold text-[#78716c] block mb-1">
                  Requested Domain
                </span>
                <span className="text-sm sm:text-[15px] font-bold text-[#1c1917] flex items-center gap-1.5">
                  <Building2 className="w-4 h-4 text-[#a67c33]" />
                  {selectedService}
                </span>
              </div>

              <div>
                <span className="text-[11px] uppercase font-bold text-[#78716c] block mb-1">
                  Approximate Area
                </span>
                <span className="text-sm sm:text-[15px] font-bold text-[#1c1917] flex items-center gap-1.5">
                  <Calendar className="w-4 h-4 text-[#a67c33]" />
                  {selectedArea}
                </span>
              </div>

              <div>
                <span className="text-[11px] uppercase font-bold text-[#78716c] block mb-1">
                  Registered Contact
                </span>
                <span className="text-sm sm:text-[15px] font-bold text-[#1c1917] flex items-center gap-1.5">
                  <Phone className="w-4 h-4 text-[#a67c33]" />
                  {leadData.phone || "On File"}
                </span>
              </div>
            </div>
          </div>

          {/* 3-Step Process: What Happens Next */}
          <div className="mb-10 sm:mb-12">
            <h2 className="text-xs sm:text-sm font-bold uppercase tracking-[0.2em] text-[#8a6320] text-center mb-6">
              What Happens Next
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-6">
              <div className="p-5 rounded-xl bg-[#faf8f5] border border-[#ede3d4] flex flex-col justify-between">
                <div>
                  <span className="text-xs font-bold text-[#a67c33] tracking-widest block mb-2">
                    STEP 01
                  </span>
                  <h3 className="font-sans font-bold text-base text-[#1c1917] mb-2">
                    Requirement Discovery
                  </h3>
                  <p className="text-xs text-[#5f574e] leading-relaxed">
                    Our lead architect will call you to discuss your business workflow, compliance standards, and spatial vision.
                  </p>
                </div>
                <div className="flex items-center gap-1.5 text-[11px] text-[#78716c] font-medium mt-4 pt-3 border-t border-[#ede3d4]">
                  <Clock className="w-3.5 h-3.5 text-[#a67c33]" />
                  <span>Within 24 Hours</span>
                </div>
              </div>

              <div className="p-5 rounded-xl bg-[#faf8f5] border border-[#ede3d4] flex flex-col justify-between">
                <div>
                  <span className="text-xs font-bold text-[#a67c33] tracking-widest block mb-2">
                    STEP 02
                  </span>
                  <h3 className="font-sans font-bold text-base text-[#1c1917] mb-2">
                    Layout & BOQ Scope
                  </h3>
                  <p className="text-xs text-[#5f574e] leading-relaxed">
                    We prepare a functional space zoning blueprint along with a transparent bill of quantities and timeline estimate.
                  </p>
                </div>
                <div className="flex items-center gap-1.5 text-[11px] text-[#78716c] font-medium mt-4 pt-3 border-t border-[#ede3d4]">
                  <ShieldCheck className="w-3.5 h-3.5 text-[#a67c33]" />
                  <span>Transparent Budgeting</span>
                </div>
              </div>

              <div className="p-5 rounded-xl bg-[#faf8f5] border border-[#ede3d4] flex flex-col justify-between">
                <div>
                  <span className="text-xs font-bold text-[#a67c33] tracking-widest block mb-2">
                    STEP 03
                  </span>
                  <h3 className="font-sans font-bold text-base text-[#1c1917] mb-2">
                    Turnkey Handover
                  </h3>
                  <p className="text-xs text-[#5f574e] leading-relaxed">
                    Single-window engineering, procurement, and execution with a guaranteed snag-free handover date.
                  </p>
                </div>
                <div className="flex items-center gap-1.5 text-[11px] text-[#78716c] font-medium mt-4 pt-3 border-t border-[#ede3d4]">
                  <Sparkles className="w-3.5 h-3.5 text-[#a67c33]" />
                  <span>100% On-Time Guarantee</span>
                </div>
              </div>
            </div>
          </div>

          {/* Urgent / Direct Action Buttons */}
          <div className="pt-6 sm:pt-8 border-t border-[#e8dfcf] flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="text-center sm:text-left">
              <span className="text-xs font-semibold text-[#78716c] block">
                Have floor plans or urgent architectural queries?
              </span>
              <span className="text-sm font-bold text-[#1c1917]">
                Connect immediately with our principal designers:
              </span>
            </div>

            <div className="flex flex-wrap items-center justify-center gap-3">
              <a
                href={`https://wa.me/${phone}?text=${whatsappMessage}`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg border border-[#25D366]/40 bg-white hover:bg-[#faf8f5] text-[#1c1917] font-semibold text-xs sm:text-sm tracking-wide shadow-xs transition-all hover:shadow-md cursor-pointer"
              >
                <WhatsAppIcon className="w-4 h-4 text-[#25D366]" />
                <span>Chat on WhatsApp</span>
              </a>

              <a
                href={`tel:${phone}`}
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg bg-[#c5a059] hover:bg-[#b08b46] text-white font-semibold text-xs sm:text-sm tracking-wide shadow-sm hover:shadow-md transition-all cursor-pointer"
              >
                <Phone className="w-3.5 h-3.5" />
                <span>Call {displayPhone}</span>
              </a>

              <button
                onClick={onBackHome}
                className="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-lg border border-[#e8dfcf] bg-white hover:bg-[#faf8f5] text-[#554d45] font-semibold text-xs sm:text-sm transition-all cursor-pointer"
              >
                <span>Back to Home</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
