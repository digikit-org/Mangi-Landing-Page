import React, { useRef, useState, useEffect } from "react";
import {
  Compass,
  Hammer,
  Sparkles,
  Users2,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";

export default function WhyMangi() {
  const scrollRef = useRef(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);

  const checkScroll = () => {
    if (scrollRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = scrollRef.current;
      setCanScrollLeft(scrollLeft > 10);
      setCanScrollRight(scrollLeft < scrollWidth - clientWidth - 10);
    }
  };

  useEffect(() => {
    checkScroll();
    const el = scrollRef.current;
    if (el) {
      el.addEventListener("scroll", checkScroll);
      window.addEventListener("resize", checkScroll);
      return () => {
        el.removeEventListener("scroll", checkScroll);
        window.removeEventListener("resize", checkScroll);
      };
    }
  }, []);

  const scroll = (direction) => {
    if (scrollRef.current) {
      const cardWidth = 300;
      scrollRef.current.scrollBy({
        left: direction === "left" ? -cardWidth : cardWidth,
        behavior: "smooth",
      });
    }
  };

  const points = [
    {
      title: "Thoughtful Design",
      description: "Layouts designed around how your business actually works.",
      icon: Compass,
    },
    {
      title: "End-to-End Execution",
      description: "From concept and design to execution and handover.",
      icon: Hammer,
    },
    {
      title: "Business-Focused Spaces",
      description: "Every detail balances functionality, experience and brand.",
      icon: Sparkles,
    },
    {
      title: "One Team. One Responsibility.",
      description:
        "Less coordination. Less stress. One team managing your project.",
      icon: Users2,
    },
  ];

  return (
    <section
      id="why-mangi"
      className="w-full py-10 sm:py-14 bg-[#ffffff] border-y border-[#eee7dc]"
    >
      <div className="max-w-[1360px] mx-auto px-5 sm:px-8 md:px-12">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-6 sm:mb-8 gap-4">
          <div className="max-w-2xl">
            <div className="flex items-center gap-3 mb-2">
              <span className="text-[11px] sm:text-xs font-sans font-bold tracking-[0.25em] text-[#a67c33] uppercase">
                — WHY MANGI
              </span>
              <div className="w-8 h-[2px] bg-brand-gold"></div>
            </div>

            <h2 className="font-display text-2xl sm:text-3xl md:text-4xl font-medium text-[#171614] tracking-tight leading-tight">
              Your Space. Your Brand.{" "}
              <span className="italic font-serif text-[#a67c33]">
                Your Business.
              </span>
            </h2>

            <p className="font-sans text-[#524b43] text-xs sm:text-sm mt-2 leading-relaxed">
              A great commercial interior isn't just about aesthetics. It's about
              creating a space that works for your people, clients and business.
            </p>
          </div>

          {/* Scroller Controls */}
          <div className="flex items-center gap-1.5 bg-[#faf8f5] p-1 rounded-full border border-[#e8dfcf] shadow-sm self-start md:self-end">
            <button
              onClick={() => scroll("left")}
              disabled={!canScrollLeft}
              aria-label="Scroll left"
              className={`w-8 h-8 rounded-full flex items-center justify-center transition-all ${
                canScrollLeft
                  ? "bg-white text-[#1c1917] hover:bg-[#c5a059] hover:text-white shadow-xs"
                  : "text-[#c4bcaf] opacity-40 cursor-not-allowed"
              }`}
            >
              <ChevronLeft className="w-4 h-4" />
            </button>

            <span className="text-[10px] font-sans font-bold uppercase tracking-wider text-[#827a71] px-1 select-none">
              Scroll
            </span>

            <button
              onClick={() => scroll("right")}
              disabled={!canScrollRight}
              aria-label="Scroll right"
              className={`w-8 h-8 rounded-full flex items-center justify-center transition-all ${
                canScrollRight
                  ? "bg-white text-[#1c1917] hover:bg-[#c5a059] hover:text-white shadow-xs"
                  : "text-[#c4bcaf] opacity-40 cursor-not-allowed"
              }`}
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Horizontal Scroller Cards */}
        <div
          ref={scrollRef}
          className="horizontal-scroller flex gap-4 pb-2 pt-1 snap-x snap-mandatory"
        >
          {points.map((pt, idx) => {
            const Icon = pt.icon;
            return (
              <div
                key={idx}
                className="w-[260px] sm:w-[290px] md:w-[310px] shrink-0 snap-start group bg-[#faf8f5] hover:bg-[#ffffff] rounded-xl p-5 border border-[#e8dfcf] hover:border-[#c5a059] shadow-sm hover:shadow-md transition-all duration-200"
              >
                {/* Top Row: Icon & Number */}
                <div className="flex items-center justify-between mb-3">
                  <div className="w-9 h-9 rounded-lg bg-[#f0e7d8] text-[#a67c33] flex items-center justify-center group-hover:bg-[#c5a059] group-hover:text-white transition-colors duration-200">
                    <Icon className="w-4 h-4 stroke-[1.8]" />
                  </div>
                  <span className="font-display text-base font-semibold text-[#c5a059]">
                    0{idx + 1}
                  </span>
                </div>

                {/* Title */}
                <h3 className="font-sans font-bold text-base text-[#1a1714] group-hover:text-[#a67c33] transition-colors leading-snug">
                  {pt.title}
                </h3>

                {/* Description */}
                <p className="font-sans text-xs sm:text-[13px] text-[#5a524a] mt-1.5 leading-relaxed">
                  {pt.description}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
