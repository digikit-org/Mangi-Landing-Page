import React, { useRef, useState, useEffect } from "react";
import {
  Search,
  PenTool,
  Wrench,
  CheckCircle,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import useInView from "../hooks/useInView";

export default function Process({ onOpenConsultation }) {
  const scrollRef = useRef(null);
  const [sectionRef, isInView] = useInView({
    threshold: 0.2,
    triggerOnce: false,
  });
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
      const cardWidth = 340;
      scrollRef.current.scrollBy({
        left: direction === "left" ? -cardWidth : cardWidth,
        behavior: "smooth",
      });
    }
  };

  const steps = [
    {
      num: "01",
      title: "DISCOVER",
      description:
        "We understand your business, space, requirements and budget.",
      icon: Search,
      deliverable: "Spatial Audit & Feasibility Brief",
    },
    {
      num: "02",
      title: "DESIGN",
      description: "We develop a concept tailored to your brand and people.",
      icon: PenTool,
      deliverable: "3D Photorealistic Renderings & BOQ",
    },
    {
      num: "03",
      title: "BUILD",
      description: "Our team manages execution, vendors and site coordination.",
      icon: Wrench,
      deliverable: "Turnkey Construction & Quality Audits",
    },
    {
      num: "04",
      title: "HANDOVER",
      description: "You move into a finished space, ready for business.",
      icon: CheckCircle,
      deliverable: "Zero-Snag Keys & Move-In Readiness",
    },
  ];

  return (
    <section
      ref={sectionRef}
      id="process"
      className="w-full py-12 sm:py-16 bg-[#faf8f5] border-t border-[#eee7dc]"
    >
      <div className="max-w-[1360px] mx-auto px-5 sm:px-8 md:px-12">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 sm:mb-10 gap-4">
          <div className="max-w-2xl">
            <div className="flex items-center gap-3 mb-2.5">
              <span className="text-[11px] sm:text-xs font-sans font-bold tracking-[0.25em] text-[#a67c33] uppercase">
                — SIMPLE PROCESS
              </span>
              <div className="w-8 h-[2px] bg-brand-gold"></div>
            </div>

            <h2 className="font-display text-2xl sm:text-3xl md:text-4xl font-medium text-[#171614] tracking-tight">
              A Better Space.{" "}
              <span className="italic font-semibold">
                Without the Headache.
              </span>
            </h2>
          </div>

          {/* Scroller Controls */}
          <div className="flex items-center gap-1.5 bg-[#ffffff] p-1 rounded-full border border-[#e8dfcf] shadow-sm self-start md:self-end">
            <button
              onClick={() => scroll("left")}
              disabled={!canScrollLeft}
              aria-label="Scroll left"
              className={`w-8 h-8 rounded-full flex items-center justify-center transition-all ${
                canScrollLeft
                  ? "bg-[#faf8f5] text-[#1c1917] hover:bg-[#c5a059] hover:text-white shadow-xs"
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
                  ? "bg-[#faf8f5] text-[#1c1917] hover:bg-[#c5a059] hover:text-white shadow-xs"
                  : "text-[#c4bcaf] opacity-40 cursor-not-allowed"
              }`}
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* 4 Process Steps Scroller */}
        <div
          ref={scrollRef}
          className="horizontal-scroller flex gap-5 pb-3 pt-1 snap-x snap-mandatory"
        >
          {steps.map((step, index) => {
            const Icon = step.icon;
            const rotate = (index % 2 === 0 ? -1 : 1) * (index + 1) * 1.4;
            return (
              <div
                key={step.num}
                className={`card-spill ${isInView ? "is-visible" : ""} w-[280px] sm:w-[320px] md:w-[340px] shrink-0 snap-start group relative bg-white rounded-xl p-5 sm:p-6 border border-[#e8dfcf] shadow-sm hover:shadow-lg transition-all duration-300 card-hover-lift flex flex-col justify-between`}
                style={{
                  transitionDelay: `${index * 120}ms`,
                  "--card-rotate": `${rotate}deg`,
                }}
              >
                {/* Step Number & Icon */}
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <span className="font-display text-2xl sm:text-3xl font-bold text-[#c5a059]">
                      {step.num}
                    </span>
                    <div className="w-9 h-9 rounded-lg bg-[#faf8f5] border border-[#ede5d8] text-[#a67c33] flex items-center justify-center group-hover:bg-[#c5a059] group-hover:text-white transition-colors duration-300">
                      <Icon className="w-4 h-4" />
                    </div>
                  </div>

                  <h3 className="font-sans font-bold text-base sm:text-lg text-[#1a1715] tracking-wide mb-1.5 group-hover:text-brand-gold transition-colors">
                    {step.title}
                  </h3>

                  <p className="font-sans text-xs sm:text-sm text-[#5e574f] leading-relaxed mb-4">
                    {step.description}
                  </p>
                </div>

                {/* Step Deliverable Tag */}
                <div className="pt-3 border-t border-[#f2ede4] text-[11px] text-[#78716c]">
                  <span className="font-semibold text-[#1c1917] block mb-0.5">
                    Deliverable:
                  </span>
                  <span>{step.deliverable}</span>
                </div>
              </div>
            );
          })}
        </div>

        {/* Process Guarantee Banner */}
        <div className="mt-8 sm:mt-10 p-5 sm:p-6 bg-[#ffffff] rounded-xl border border-[#e8dfcf] flex flex-col sm:flex-row items-center justify-between gap-4 shadow-sm">
          <div className="flex items-center gap-3.5">
            <div className="w-10 h-10 rounded-full bg-[#f4ece0] text-[#a67c33] flex items-center justify-center flex-shrink-0">
              <CheckCircle className="w-5 h-5" />
            </div>
            <div>
              <h4 className="font-sans font-bold text-sm sm:text-base text-[#1c1917]">
                Guaranteed Handover Timelines & Transparent Commercial Estimates
              </h4>
              <p className="text-xs text-[#665e55] mt-0.5">
                Every project runs on strict milestones with zero unexpected
                budget revisions.
              </p>
            </div>
          </div>

          <button
            onClick={() => onOpenConsultation("Process Briefing")}
            className="gold-gradient-btn px-5 py-2.5 rounded-md text-xs sm:text-sm font-semibold text-white whitespace-nowrap self-start sm:self-auto"
          >
            Start Your Project Brief →
          </button>
        </div>
      </div>
    </section>
  );
}
