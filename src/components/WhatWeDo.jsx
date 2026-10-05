import React, { useRef, useState, useEffect } from "react";
import {
  ArrowRight,
  Building,
  Presentation,
  DoorOpen,
  Users,
  KeyRound,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import useInView from "../hooks/useInView";

export default function WhatWeDo({ onOpenConsultation }) {
  const scrollRef = useRef(null);
  const [sectionRef, isInView] = useInView({
    threshold: 0.15,
    triggerOnce: false,
  });
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);
  const [scrollProgress, setScrollProgress] = useState(0);

  const checkScroll = () => {
    if (scrollRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = scrollRef.current;
      setCanScrollLeft(scrollLeft > 10);
      setCanScrollRight(scrollLeft < scrollWidth - clientWidth - 10);
      const maxScroll = scrollWidth - clientWidth;
      if (maxScroll > 0) {
        setScrollProgress(
          Math.min(100, Math.max(0, (scrollLeft / maxScroll) * 100)),
        );
      }
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
      const cardWidth = 360;
      scrollRef.current.scrollBy({
        left: direction === "left" ? -cardWidth : cardWidth,
        behavior: "smooth",
      });
    }
  };

  // Content strictly matching the reference images
  const services = [
    {
      id: "corporate",
      title: "Corporate Offices",
      description:
        "Workspaces designed for productivity, collaboration and growth.",
      icon: Building,
      badge: "PRODUCTIVITY & CULTURE",
      image: "/images/Corporate.png",
      points: [
        "Ergonomic workstations",
        "Acoustic zoning",
        "Smart power distribution",
      ],
    },
    {
      id: "meeting",
      title: "Meeting & Conference Spaces",
      description: "Professional environments built for ideas and decisions.",
      icon: Presentation,
      badge: "HIGH-TECH BOARDROOMS",
      image: "/images/Conference.png",
      points: [
        "Acoustic glass partitions",
        "Integrated VC & AV",
        "Bespoke boardroom tables",
      ],
    },
    {
      id: "reception",
      title: "Reception Areas",
      description:
        "Make the right first impression with a reception that represents your brand.",
      icon: DoorOpen,
      badge: "SIGNATURE LOBBIES",
      image: "/images/Reception1.png",
      points: [
        "Fluted stone & marble desks",
        "Backlit brand identity walls",
        "Hospitality guest lounges",
      ],
    },
    {
      id: "collaboration",
      title: "Collaboration Spaces",
      description: "Flexible environments that bring teams together.",
      icon: Users,
      badge: "BREAKOUTS & CAFÉS",
      image: "/images/Collaboration.png",
      points: [
        "Soft lounge seating",
        "Biophilic green walls",
        "Agile project hubs",
      ],
    },
    {
      id: "turnkey",
      title: "Turnkey Interiors",
      description:
        "Design, execution, coordination and handover — all under one roof.",
      icon: KeyRound,
      badge: "FULL EPC FITOUT",
      image: "/images/Executive.png",
      points: [
        "Single-window accountability",
        "Material procurement",
        "On-time project delivery",
      ],
    },
  ];

  return (
    <section
      ref={sectionRef}
      id="services"
      className="w-full py-12 sm:py-16 md:py-20 bg-[#f9f5ed] border-y border-[#e2d5c1]"
    >
      <div className="max-w-[1360px] mx-auto px-5 sm:px-8 md:px-12">
        {/* Section Header exactly matching the reference image */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 sm:mb-10 gap-4 pb-5 sm:pb-6 border-b border-[#e2d5c1]">
          <div>
            {/* Gold label: — WHAT WE DO ──── */}
            <div className="flex items-center gap-2 mb-2 sm:mb-2.5">
              <span className="text-[#a67c33] font-bold text-xs sm:text-sm">—</span>
              <span className="text-[11px] sm:text-xs font-sans font-bold tracking-[0.25em] text-[#a67c33] uppercase">
                WHAT WE DO
              </span>
              <div className="w-8 sm:w-10 h-[2px] bg-[#a67c33]"></div>
            </div>

            <h2 className="font-display text-2xl sm:text-3xl md:text-4xl lg:text-[42px] font-normal text-[#171614] tracking-tight leading-tight">
              From First Sketch to{" "}
              <span className="italic font-semibold text-[#171614]">Final Handover.</span>
            </h2>
          </div>

          {/* Action CTA & Scroll Button */}
          <div className="flex items-center gap-4 sm:gap-6">
            <button
              onClick={() =>
                onOpenConsultation("Full Turnkey Commercial Fitout")
              }
              className="inline-flex items-center gap-1.5 text-xs sm:text-sm font-semibold text-[#a67c33] hover:text-[#171614] transition-colors cursor-pointer"
            >
              <span>Explore Turnkey Execution</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>

            {/* Scroller Button Pill exactly matching reference */}
            <div className="flex items-center gap-2 bg-[#ffffff] pl-3 pr-1 py-1 rounded-full border border-[#e2d5c1] shadow-xs">
              <button
                onClick={() => scroll("left")}
                disabled={!canScrollLeft}
                aria-label="Scroll left"
                className={`p-1 flex items-center justify-center transition-colors cursor-pointer ${
                  canScrollLeft
                    ? "text-[#1c1917] hover:text-[#c5a059]"
                    : "text-[#d1c8bb] cursor-not-allowed"
                }`}
              >
                <ChevronLeft className="w-4 h-4" />
              </button>

              <span className="text-[10px] font-sans font-bold uppercase tracking-wider text-[#78716c] px-1 select-none">
                SCROLL
              </span>

              <button
                onClick={() => scroll("right")}
                disabled={!canScrollRight}
                aria-label="Scroll right"
                className={`w-7 h-7 rounded-full flex items-center justify-center transition-all cursor-pointer shadow-xs border border-[#e2d5c1] ${
                  canScrollRight
                    ? "bg-[#ffffff] text-[#1c1917] hover:bg-[#c5a059] hover:text-white"
                    : "bg-[#faf8f5] text-[#d1c8bb] cursor-not-allowed"
                }`}
              >
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>

        {/* Horizontal Services Scroller */}
        <div
          ref={scrollRef}
          className="horizontal-scroller flex gap-5 pb-3 pt-1 snap-x snap-mandatory"
        >
          {services.map((svc, index) => {
            const Icon = svc.icon;
            const rotate = (index % 2 === 0 ? -1 : 1) * (index + 1) * 0.9;
            return (
              <div
                key={svc.id}
                onClick={() => onOpenConsultation(svc.title)}
                className={`card-spill ${isInView ? "is-visible" : ""} w-[285px] sm:w-[325px] md:w-[355px] shrink-0 snap-start group bg-white rounded-xl overflow-hidden border border-[#e8dfcf] shadow-xs hover:shadow-xl transition-all duration-300 card-hover-lift cursor-pointer flex flex-col justify-between`}
                style={{
                  transitionDelay: `${index * 150}ms`,
                  "--card-rotate": `${rotate}deg`,
                  "--card-shift": `${index * -28}px`,
                  zIndex: 10 + index,
                }}
              >
                <div>
                  {/* Photo Container */}
                  <div className="relative w-full h-44 sm:h-48 overflow-hidden bg-[#e6dfd4]">
                    <img
                      src={svc.image}
                      alt={svc.title}
                      loading="lazy"
                      className="w-full h-full object-cover object-center transform transition-transform duration-700 ease-out group-hover:scale-105"
                    />
                  </div>

                  {/* Card Body */}
                  <div className="p-5 sm:p-6">
                    <div className="flex items-center justify-between mb-3">
                      <div className="w-9 h-9 rounded-lg bg-[#faf8f5] border border-[#ede5d8] text-[#a67c33] flex items-center justify-center group-hover:bg-[#c5a059] group-hover:text-white transition-colors duration-300">
                        <Icon className="w-4 h-4" />
                      </div>
                      <span className="text-[10px] font-bold uppercase tracking-wider text-[#78716c] bg-[#faf8f5] px-2.5 py-1 rounded border border-[#e8dfcf]">
                        {svc.badge}
                      </span>
                    </div>

                    <h3 className="font-sans font-bold text-lg sm:text-xl text-[#1c1917] group-hover:text-brand-gold transition-colors mb-2">
                      {svc.title}
                    </h3>
                    <p className="font-sans text-xs sm:text-sm text-[#5c554e] leading-relaxed mb-4">
                      {svc.description}
                    </p>

                    {/* Feature tags */}
                    <div className="flex flex-wrap gap-1.5 pt-3 border-t border-[#f2ece2]">
                      {svc.points.map((pt, i) => (
                        <span
                          key={i}
                          className="text-[11px] font-medium text-[#78716c] bg-[#faf8f5] px-2.5 py-1 rounded border border-[#ede5d8]"
                        >
                          • {pt}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Footer link */}
                <div className="px-5 sm:px-6 py-3 bg-[#ffffff] border-t border-[#f2ece2] flex items-center justify-between text-xs sm:text-[13px] font-semibold text-[#a67c33] group-hover:text-[#8a6320]">
                  <span>Request Scope Details</span>
                  <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-1" />
                </div>
              </div>
            );
          })}
        </div>

        {/* Gold Scroll Progress Track matching reference screenshot */}
      </div>
    </section>
  );
}
