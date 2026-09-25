import React, { useState, useEffect } from "react";
import {
  ArrowRight,
  Sparkles,
  Building2,
  Store,
  Hotel,
  Briefcase,
  Stethoscope,
} from "lucide-react";

export default function Hero({ onOpenConsultation }) {
  // Count-up animation for stats
  const [counts, setCounts] = useState({
    years: 0,
    projects: 0,
    sectors: 0,
  });
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    const revealTimer = window.setTimeout(() => setIsLoaded(true), 80);
    return () => window.clearTimeout(revealTimer);
  }, []);

  useEffect(() => {
    let startTimestamp = null;
    const duration = 1200; // ms

    const step = (timestamp) => {
      if (!startTimestamp) startTimestamp = timestamp;
      const progress = Math.min((timestamp - startTimestamp) / duration, 1);
      const ease = 1 - Math.pow(1 - progress, 3);

      setCounts({
        years: Math.floor(ease * 10),
        projects: Math.floor(ease * 250),
        sectors: Math.floor(ease * 7),
      });

      if (progress < 1) {
        window.requestAnimationFrame(step);
      } else {
        setCounts({
          years: 10,
          projects: 250,
          sectors: 7,
        });
      }
    };

    const animFrame = window.requestAnimationFrame(step);
    return () => window.cancelAnimationFrame(animFrame);
  }, []);

  const sectors = [
    { label: "Offices", icon: Building2 },
    { label: "Retail", icon: Store },
    { label: "Hospitality", icon: Hotel },
    { label: "Commercial Spaces", icon: Briefcase },
    { label: "Healthcare", icon: Stethoscope },
  ];

  return (
    <section className="relative w-full h-[100dvh] max-h-[100dvh] flex flex-col justify-between overflow-hidden bg-[#faf8f5] pt-14 sm:pt-20 pb-2 sm:pb-4">
      {/* Background Architectural Layer - hero_mobile.png on mobile and Hero.png on desktop */}
      <div className="absolute inset-0 z-0 overflow-hidden">
        {/* Mobile View: Dedicated clean hero_mobile.png with zero text overlap, no white shade, and prominent brand logo */}
        <div
          className="md:hidden absolute inset-0 w-full h-full bg-cover bg-bottom"
          style={{
            backgroundImage: `url('/images/hero_mobile.png')`,
            backgroundColor: "#faf8f5",
          }}
        >
          {/* Subtle bottom fade into Why Mangi */}
          <div className="absolute bottom-0 inset-x-0 h-16 bg-gradient-to-t from-[#faf8f5] via-[#faf8f5]/40 to-transparent"></div>
        </div>

        {/* Desktop View: Hero.png with side-by-side layout */}
        <div
          className="hidden md:block absolute inset-0 w-full h-full bg-cover sm:bg-[center_right] transition-all duration-700"
          style={{
            backgroundImage: `url('/images/Hero.png')`,
            backgroundColor: "#faf8f5",
          }}
        >
          {/* Subtle gradient feather on the left only, leaving the entire right room and wall name 100% visible */}
          <div className="absolute inset-0 bg-gradient-to-r from-[#faf8f5] via-[#faf8f5]/85 to-transparent w-full md:w-[60%] lg:w-[48%]"></div>
          {/* Bottom gentle fade into Why Mangi */}
          <div className="absolute bottom-0 inset-x-0 h-24 bg-gradient-to-t from-[#faf8f5] via-[#faf8f5]/60 to-transparent"></div>
        </div>
      </div>

      {/* Main Hero Container: Left Content (Card on mobile only, transparent as initial on desktop) */}
      <div className="relative z-10 max-w-[1360px] mx-auto px-5 sm:px-8 md:px-12 w-full my-auto py-1 sm:py-3">
        <div className="max-w-xl lg:max-w-2xl flex flex-col justify-center rounded-[24px] border border-[#e9ddc7] bg-[#f8f4ee]/85 px-4 py-4 shadow-[0_18px_35px_rgba(140,110,60,0.08)] md:bg-transparent md:border-0 md:p-0 md:shadow-none md:rounded-none md:max-w-[620px]">
          {/* Tagline Badge */}
          <div
            className={`hero-from-image ${isLoaded ? "is-in" : ""} inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#f3ebd9]/95 border border-[#e2d5bd] text-[#a67c33] text-[10px] sm:text-[11px] font-sans font-bold tracking-[0.2em] uppercase mb-1.5 sm:mb-3 w-fit shadow-sm`}
            style={{ transitionDelay: "120ms" }}
          >
            <Sparkles className="w-3 h-3 text-[#c5a059]" />
            <span>Design. Build. Inspire.</span>
          </div>

          {/* Main Headline from Google Doc */}
          <h1
            className={`hero-from-image ${isLoaded ? "is-in" : ""} font-display text-2xl sm:text-4xl md:text-5xl lg:text-[44px] xl:text-[50px] leading-[1.14] font-medium text-[#171614] tracking-tight drop-shadow-[0_1px_0_rgba(255,255,255,0.7)]`}
            style={{ transitionDelay: "220ms" }}
          >
            Commercial Spaces, <br />
            <span className="italic font-semibold">Designed to Perform.</span>
          </h1>

          {/* Bronze Accent Rule */}
          <div
            className={`hero-from-image ${isLoaded ? "is-in" : ""} w-12 sm:w-16 h-[2.5px] bg-[#c5a059] mt-1.5 sm:mt-2 mb-2 sm:mb-3.5`}
            style={{ transitionDelay: "320ms" }}
          ></div>

          {/* Subheading Copy */}
          <p
            className={`hero-from-image ${isLoaded ? "is-in" : ""} font-sans text-[#3d3834] text-xs sm:text-sm md:text-[15px] lg:text-base leading-snug sm:leading-relaxed max-w-lg mb-2 sm:mb-3.5 font-normal`}
            style={{ transitionDelay: "420ms" }}
          >
            We create functional, premium commercial interiors that help
            businesses{" "}
            <span className="font-semibold text-[#1c1917]">
              work better, look better, and grow better.
            </span>
          </p>

          {/* Specialized Sectors Chips */}
          <div
            className={`hero-from-image ${isLoaded ? "is-in" : ""} mb-2 sm:mb-4`}
            style={{ transitionDelay: "520ms" }}
          >
            <span className="text-[10px] sm:text-[11px] font-sans font-bold uppercase tracking-[0.2em] text-[#78716c] block mb-1 sm:mb-1.5">
              Specialized In
            </span>
            <div className="flex flex-wrap items-center gap-1.5 sm:gap-2">
              {sectors.map((sector, index) => {
                const Icon = sector.icon;
                return (
                  <span
                    key={sector.label}
                    className={`hero-from-image ${isLoaded ? "is-in" : ""} inline-flex items-center gap-1.5 px-2.5 py-0.5 sm:py-1 rounded-md bg-[#ffffff]/95 border border-[#e8dfcf] text-[11px] sm:text-xs font-semibold text-[#2f2b27] shadow-sm`}
                    style={{ transitionDelay: `${620 + index * 90}ms` }}
                  >
                    <Icon className="w-3 h-3 text-[#a67c33]" />
                    <span>{sector.label}</span>
                  </span>
                );
              })}
            </div>
          </div>

          {/* CTA Button that triggers the POP-UP FORM */}
          <div
            className={`hero-from-image ${isLoaded ? "is-in" : ""} flex flex-col sm:flex-row items-start sm:items-center gap-2 sm:gap-3.5`}
            style={{ transitionDelay: "840ms" }}
          >
            <button
              onClick={() => onOpenConsultation("Hero CTA")}
              className="gold-gradient-btn inline-flex items-center gap-2.5 px-6 sm:px-8 py-2 sm:py-3 rounded-md text-white font-sans font-semibold text-xs sm:text-sm tracking-wide group shadow-md"
            >
              <span>Book a Free Consultation</span>
              <ArrowRight className="w-3.5 h-3.5 transition-transform duration-300 group-hover:translate-x-1 text-white" />
            </button>

            <span className="text-[10px] sm:text-xs text-[#6d665e] max-w-xs leading-tight sm:leading-snug">
              Tell us about your project. Our team will get back to you.
            </span>
          </div>
        </div>
      </div>

      {/* Bottom Stats: 10+ Years Experience | 250+ Projects | 7+ Sectors */}
      <div className="relative z-10 max-w-[1360px] mx-auto px-4 sm:px-8 md:px-12 w-full pt-1 sm:pt-2 pb-1.5 sm:pb-3">
        <div className="w-full bg-[#fdfbf7]/95 backdrop-blur-md rounded-xl border border-[#e8dfcf] px-2.5 sm:px-4 py-2 sm:py-3 shadow-lg">
          <div className="grid grid-cols-3 divide-x divide-[#e8dfcf] items-center">
            {/* Metric 1 */}
            <div className="flex flex-col sm:flex-row items-center justify-center text-center sm:text-left gap-0.5 sm:gap-2.5 px-1 sm:px-4">
              <span className="font-display text-xl sm:text-2xl lg:text-4xl font-semibold text-[#171614] leading-none">
                {counts.years}+
              </span>
              <span className="text-[9px] sm:text-xs text-[#78716c] font-medium tracking-wide uppercase leading-tight">
                Years
                <span className="hidden sm:inline">
                  <br />
                </span>{" "}
                <strong className="text-[#2c2825] block sm:inline">
                  Experience
                </strong>
              </span>
            </div>

            {/* Metric 2 */}
            <div className="flex flex-col sm:flex-row items-center justify-center text-center sm:text-left gap-0.5 sm:gap-2.5 px-1 sm:px-4">
              <span className="font-display text-xl sm:text-2xl lg:text-4xl font-semibold text-[#171614] leading-none">
                {counts.projects}+
              </span>
              <span className="text-[9px] sm:text-xs text-[#78716c] font-medium tracking-wide uppercase leading-tight">
                Projects
                <span className="hidden sm:inline">
                  <br />
                </span>{" "}
                <strong className="text-[#2c2825] block sm:inline">
                  Delivered
                </strong>
              </span>
            </div>

            {/* Metric 3 */}
            <div className="flex flex-col sm:flex-row items-center justify-center text-center sm:text-left gap-0.5 sm:gap-2.5 px-1 sm:px-4">
              <span className="font-display text-xl sm:text-2xl lg:text-4xl font-semibold text-[#171614] leading-none">
                {counts.sectors}+
              </span>
              <span className="text-[9px] sm:text-xs text-[#78716c] font-medium tracking-wide uppercase leading-tight">
                Sectors
                <span className="hidden sm:inline">
                  <br />
                </span>{" "}
                <strong className="text-[#2c2825] block sm:inline">
                  Served
                </strong>
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
