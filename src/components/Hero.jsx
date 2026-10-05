import React, { useState, useEffect } from "react";
import {
  ArrowRight,
  Sparkles,
  Building2,
  Store,
  Hotel,
  Briefcase,
  Stethoscope,
  CheckCircle2,
  ShieldCheck,
  Clock,
} from "lucide-react";
import confetti from "canvas-confetti";

export default function Hero({ onOpenConsultation }) {
  // Count-up animation for stats
  const [counts, setCounts] = useState({
    years: 0,
    projects: 0,
    sectors: 0,
  });
  const [isLoaded, setIsLoaded] = useState(false);

  // First page booking form state
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    service: "Healthcare",
    area: "3,000 – 10,000 sq.ft.",
  });
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

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

  const handleFormSubmit = (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSubmitted(true);
      confetti({
        particleCount: 70,
        spread: 60,
        origin: { y: 0.6 },
        colors: ["#c5a059", "#dfc28f", "#a67c33"],
      });
    }, 500);
  };

  const sectors = [
    { label: "Offices", icon: Building2, featured: false },
    { label: "Retail", icon: Store, featured: false },
    { label: "Hospitality", icon: Hotel, featured: false },
    { label: "Commercial Spaces", icon: Briefcase, featured: false },
    { label: "Healthcare", icon: Stethoscope, featured: true },
  ];

  return (
    <section className="relative w-full min-h-[100dvh] flex flex-col justify-between overflow-hidden bg-[#faf8f5] pt-24 sm:pt-28 lg:pt-32 pb-4">
      {/* Background Architectural Layer */}
      <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
        {/* Mobile View: Dedicated hero background */}
        <div
          className="md:hidden absolute inset-0 w-full h-full bg-cover bg-bottom opacity-20"
          style={{
            backgroundImage: `url('/images/hero_mobile.png')`,
            backgroundColor: "#faf8f5",
          }}
        >
          <div className="absolute bottom-0 inset-x-0 h-16 bg-gradient-to-t from-[#faf8f5] via-[#faf8f5]/60 to-transparent"></div>
        </div>

        {/* Desktop View: Hero.png */}
        <div
          className="hidden md:block absolute inset-0 w-full h-full bg-cover sm:bg-[center_right] transition-all duration-700 opacity-60 lg:opacity-85"
          style={{
            backgroundImage: `url('/images/Hero.png')`,
            backgroundColor: "#faf8f5",
          }}
        >
          {/* Subtle gradient feather on the left */}
          <div className="absolute inset-0 bg-gradient-to-r from-[#faf8f5] via-[#faf8f5]/90 to-transparent w-full md:w-[65%] lg:w-[55%]"></div>
          {/* Bottom gentle fade into Why Mangi */}
          <div className="absolute bottom-0 inset-x-0 h-24 bg-gradient-to-t from-[#faf8f5] via-[#faf8f5]/70 to-transparent"></div>
        </div>
      </div>

      {/* Main Hero Container: Left Content & Right Booking Form Side-by-Side (Comfortably below header) */}
      <div className="relative z-10 max-w-[1360px] mx-auto px-4 sm:px-8 md:px-12 w-full flex-1 flex flex-col justify-center py-2 sm:py-4">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-center">
          
          {/* Left Column: Headlines, Content & Sectors matching 2nd image */}
          <div className="lg:col-span-7 flex flex-col justify-center">
            {/* Tagline Badge */}
            <div
              className={`hero-from-image ${isLoaded ? "is-in" : ""} inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#f3ebd9]/95 border border-[#e2d5bd] text-[#a67c33] text-[10px] sm:text-[11px] font-sans font-bold tracking-[0.2em] uppercase mb-2 sm:mb-3 w-fit shadow-sm`}
              style={{ transitionDelay: "120ms" }}
            >
              <Sparkles className="w-3 h-3 text-[#c5a059]" />
              <span>Design. Build. Inspire.</span>
            </div>

            {/* Main Headline */}
            <h1
              className={`hero-from-image ${isLoaded ? "is-in" : ""} font-display text-3xl sm:text-4xl md:text-5xl lg:text-[46px] xl:text-[52px] leading-[1.12] font-medium text-[#1c1917] tracking-tight`}
              style={{ transitionDelay: "220ms" }}
            >
              Commercial Spaces, <br />
              <span className="italic font-semibold text-[#a67c33]">Designed to Perform.</span>
            </h1>

            {/* Bronze Accent Rule */}
            <div
              className={`hero-from-image ${isLoaded ? "is-in" : ""} w-14 sm:w-20 h-[2.5px] bg-[#c5a059] mt-2 mb-3 sm:mb-4`}
              style={{ transitionDelay: "320ms" }}
            ></div>

            {/* Subheading Copy exactly matching 2nd image */}
            <p
              className={`hero-from-image ${isLoaded ? "is-in" : ""} font-sans text-[#423c36] text-xs sm:text-sm md:text-[15px] lg:text-base leading-snug sm:leading-relaxed max-w-xl mb-4 font-normal`}
              style={{ transitionDelay: "420ms" }}
            >
              We create functional, premium commercial interiors that help businesses{" "}
              <span className="font-semibold text-[#1c1917]">
                work better, look better, and grow better.
              </span>
            </p>

            {/* Specialized Sectors Chips (Matching 2nd image, Healthcare highlighted) */}
            <div
              className={`hero-from-image ${isLoaded ? "is-in" : ""} mb-5 sm:mb-6`}
              style={{ transitionDelay: "520ms" }}
            >
              <span className="text-[10px] sm:text-[11px] font-sans font-bold uppercase tracking-[0.2em] text-[#78716c] block mb-2">
                SPECIALIZED IN
              </span>
              <div className="flex flex-wrap items-center gap-1.5 sm:gap-2">
                {sectors.map((sector, index) => {
                  const Icon = sector.icon;
                  return (
                    <span
                      key={sector.label}
                      className={`hero-from-image ${isLoaded ? "is-in" : ""} inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold shadow-xs transition-transform hover:scale-102 ${
                        sector.featured
                          ? "bg-[#f4ebd9] border-2 border-[#c5a059] text-[#8a6320] font-bold shadow-xs ring-1 ring-[#c5a059]/30"
                          : "bg-white border border-[#e8dfcf] text-[#2f2b27]"
                      }`}
                      style={{ transitionDelay: `${620 + index * 90}ms` }}
                    >
                      <Icon className="w-3.5 h-3.5 text-[#a67c33]" />
                      <span>{sector.label}</span>
                    </span>
                  );
                })}
              </div>
            </div>

            {/* Reassurance Bullet Strip */}
            <div
              className={`hero-from-image ${isLoaded ? "is-in" : ""} hidden sm:flex items-center gap-5 text-xs text-[#5f5850] pt-1`}
              style={{ transitionDelay: "750ms" }}
            >
              <div className="flex items-center gap-1.5">
                <ShieldCheck className="w-4 h-4 text-[#a67c33]" />
                <span>Turnkey EPC Execution</span>
              </div>
              <div className="flex items-center gap-1.5">
                <Clock className="w-4 h-4 text-[#a67c33]" />
                <span>On-Time Snag-Free Handover</span>
              </div>
            </div>
          </div>

          {/* Right Column: Embedded Booking Form On The First Page */}
          <div className="lg:col-span-5 w-full">
            <div
              className={`hero-from-image ${isLoaded ? "is-in" : ""} bg-[#faf8f5]/95 backdrop-blur-md rounded-2xl border border-[#e8dfcf] p-5 sm:p-7 shadow-[0_16px_40px_rgba(180,150,110,0.16)] relative`}
              style={{ transitionDelay: "360ms" }}
            >
              {/* Top Accent Strip */}
              <div className="absolute top-0 inset-x-0 h-1.5 bg-gradient-to-r from-[#dfc28f] via-[#c5a059] to-[#ad8940] rounded-t-2xl"></div>

              {isSubmitted ? (
                <div className="py-8 text-center flex flex-col items-center">
                  <div className="w-14 h-14 rounded-full bg-[#f4ece0] text-[#a67c33] flex items-center justify-center mb-3">
                    <CheckCircle2 className="w-8 h-8" />
                  </div>
                  <h3 className="font-display text-2xl font-semibold text-[#1c1917] mb-1.5">
                    Consultation Booked!
                  </h3>
                  <p className="font-sans text-xs sm:text-sm text-[#5a534c] max-w-xs mx-auto mb-5 leading-relaxed">
                    Thank you, <strong className="text-[#1c1917]">{formData.name}</strong>. Our senior architect for{" "}
                    <strong className="text-[#a67c33]">{formData.service}</strong> will contact you at{" "}
                    <strong className="text-[#1c1917]">{formData.phone}</strong> within 24 hours.
                  </p>
                  <button
                    onClick={() => setIsSubmitted(false)}
                    className="gold-gradient-btn px-5 py-2 rounded text-xs font-semibold text-white shadow-sm"
                  >
                    Book Another Space
                  </button>
                </div>
              ) : (
                <div>
                  <div className="mb-4">
                    <div className="flex items-center gap-2 mb-1">
                      <span className="text-[10px] font-sans font-bold tracking-[0.2em] text-[#a67c33] uppercase">
                        Quick Booking
                      </span>
                      <span className="text-[9px] px-1.5 py-0.5 rounded bg-[#f0e7d8] text-[#8a6320] font-semibold">
                        Free Consultation
                      </span>
                    </div>
                    <h3 className="font-display text-2xl sm:text-[26px] font-semibold text-[#1c1917] leading-tight">
                      Book a Free Consultation
                    </h3>
                    <p className="font-sans text-xs text-[#6e665d] mt-1">
                      Share your requirement — our senior architect will connect within 24 hours.
                    </p>
                  </div>

                  <form onSubmit={handleFormSubmit} className="space-y-3">
                    <div>
                      <label className="block text-[11px] font-semibold text-[#423c36] uppercase tracking-wider mb-1">
                        Full Name *
                      </label>
                      <input
                        type="text"
                        required
                        placeholder="Your Full Name"
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        className="w-full px-3 py-2 bg-white border border-[#dcd3c3] rounded-lg text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-[#c5a059] transition-all text-[#1c1917]"
                      />
                    </div>

                    <div>
                      <label className="block text-[11px] font-semibold text-[#423c36] uppercase tracking-wider mb-1">
                        Phone / WhatsApp *
                      </label>
                      <input
                        type="tel"
                        required
                        placeholder="+91 / WhatsApp Number"
                        value={formData.phone}
                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                        className="w-full px-3 py-2 bg-white border border-[#dcd3c3] rounded-lg text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-[#c5a059] transition-all text-[#1c1917]"
                      />
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      <div>
                        <label className="block text-[11px] font-semibold text-[#423c36] uppercase tracking-wider mb-1">
                          Service Required *
                        </label>
                        <select
                          value={formData.service}
                          onChange={(e) => setFormData({ ...formData, service: e.target.value })}
                          className="w-full px-2.5 py-2 bg-white border border-[#dcd3c3] rounded-lg text-xs focus:outline-none focus:ring-2 focus:ring-[#c5a059] text-[#1c1917]"
                        >
                          <option value="Healthcare">Healthcare (Clinics/Hospitals)</option>
                          <option value="Hospitality">Hospitality (Hotels/Lounges)</option>
                          <option value="Workplaces">Workplaces (Offices/Corporate)</option>
                          <option value="Retail">Retail (Stores/Showrooms)</option>
                        </select>
                      </div>

                      <div>
                        <label className="block text-[11px] font-semibold text-[#423c36] uppercase tracking-wider mb-1">
                          Approx. Area
                        </label>
                        <select
                          value={formData.area}
                          onChange={(e) => setFormData({ ...formData, area: e.target.value })}
                          className="w-full px-2.5 py-2 bg-white border border-[#dcd3c3] rounded-lg text-xs focus:outline-none focus:ring-2 focus:ring-[#c5a059] text-[#1c1917]"
                        >
                          <option value="Under 3,000 sq.ft.">&lt; 3,000 sq.ft.</option>
                          <option value="3,000 – 10,000 sq.ft.">3,000 – 10,000 sq.ft.</option>
                          <option value="10,000 – 25,000 sq.ft.">10,000 – 25,000 sq.ft.</option>
                          <option value="25,000+ sq.ft.">25,000+ sq.ft.</option>
                        </select>
                      </div>
                    </div>

                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="gold-gradient-btn w-full mt-2 py-2.5 px-4 rounded-lg text-xs sm:text-sm font-semibold text-white tracking-wide flex items-center justify-center gap-2 shadow-md transition-all cursor-pointer"
                    >
                      <span>{isSubmitting ? "Submitting..." : "Book Free Consultation"}</span>
                      <ArrowRight className="w-3.5 h-3.5 text-white" />
                    </button>

                    <p className="text-[10px] text-center text-[#78716c] pt-1 flex items-center justify-center gap-1">
                      <span>🔒 100% Free consultation</span>
                      <span>•</span>
                      <span>No obligation</span>
                      <span>•</span>
                      <span>Zero spam</span>
                    </p>
                  </form>
                </div>
              )}
            </div>
          </div>

        </div>
      </div>

      {/* Bottom Stats: 10+ Years Experience | 250+ Projects | 4 Core Sectors */}
      <div className="relative z-10 max-w-[1360px] mx-auto px-4 sm:px-8 md:px-12 w-full pt-1 sm:pt-2 pb-1.5 sm:pb-3">
        <div className="w-full bg-[#fdfbf7]/95 backdrop-blur-md rounded-xl border border-[#e8dfcf] px-2.5 sm:px-4 py-2 sm:py-3 shadow-md">
          <div className="grid grid-cols-3 divide-x divide-[#e8dfcf] items-center">
            {/* Metric 1 */}
            <div className="flex flex-col sm:flex-row items-center justify-center text-center sm:text-left gap-0.5 sm:gap-2.5 px-1 sm:px-4">
              <span className="font-display text-xl sm:text-2xl lg:text-3xl font-semibold text-[#1c1917] leading-none">
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
              <span className="font-display text-xl sm:text-2xl lg:text-3xl font-semibold text-[#1c1917] leading-none">
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
              <span className="font-display text-xl sm:text-2xl lg:text-3xl font-semibold text-[#1c1917] leading-none">
                4
              </span>
              <span className="text-[9px] sm:text-xs text-[#78716c] font-medium tracking-wide uppercase leading-tight">
                Core Sectors
                <span className="hidden sm:inline">
                  <br />
                </span>{" "}
                <strong className="text-[#2c2825] block sm:inline">
                  Healthcare & More
                </strong>
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
