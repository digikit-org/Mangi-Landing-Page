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
      const cardWidth = 360;
      scrollRef.current.scrollBy({
        left: direction === "left" ? -cardWidth : cardWidth,
        behavior: "smooth",
      });
    }
  };

  const services = [
    {
      id: "corporate",
      title: "Corporate Offices",
      description:
        "Workspaces designed for productivity, collaboration and growth.",
      icon: Building,
      badge: "Productivity & Culture",
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
      badge: "High-Tech Boardrooms",
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
      badge: "Signature Lobbies",
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
      badge: "Breakouts & Cafés",
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
      badge: "Full EPC Fitout",
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
      className="w-full py-12 sm:py-16 bg-[#faf8f5]"
    >
      <div className="max-w-[1360px] mx-auto px-5 sm:px-8 md:px-12">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 sm:mb-10 gap-4 pb-5 border-b border-[#e8dfcf]">
          <div>
            <div className="flex items-center gap-3 mb-2.5">
              <span className="text-[11px] sm:text-xs font-sans font-bold tracking-[0.25em] text-[#a67c33] uppercase">
                — WHAT WE DO
              </span>
              <div className="w-8 h-[2px] bg-brand-gold"></div>
            </div>
            <h2 className="font-display text-2xl sm:text-3xl md:text-4xl font-medium text-[#171614] tracking-tight">
              From First Sketch to{" "}
              <span className="italic font-semibold">Final Handover.</span>
            </h2>
          </div>

          {/* Scroller Controls & Consultation CTA */}
          <div className="flex items-center gap-4">
            <button
              onClick={() =>
                onOpenConsultation("Full Turnkey Commercial Fitout")
              }
              className="hidden sm:inline-flex items-center gap-2 text-xs font-semibold tracking-wider text-[#a67c33] hover:text-[#171614] transition-colors"
            >
              <span>Explore Turnkey Execution</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>

            {/* Scroller Buttons */}
            <div className="flex items-center gap-2 bg-[#ffffff] p-1 rounded-full border border-[#e8dfcf] shadow-sm">
              <button
                onClick={() => scroll("left")}
                disabled={!canScrollLeft}
                aria-label="Scroll left"
                className={`w-8 h-8 rounded-full flex items-center justify-center transition-all ${
                  canScrollLeft
                    ? "bg-[#faf8f5] text-[#1c1917] hover:bg-[#c5a059] hover:text-white"
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
                    ? "bg-[#faf8f5] text-[#1c1917] hover:bg-[#c5a059] hover:text-white"
                    : "text-[#c4bcaf] opacity-40 cursor-not-allowed"
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
                className={`card-spill ${isInView ? "is-visible" : ""} w-[280px] sm:w-[320px] md:w-[350px] shrink-0 snap-start group bg-white rounded-xl overflow-hidden border border-[#e8dfcf] shadow-sm hover:shadow-lg transition-all duration-300 card-hover-lift cursor-pointer flex flex-col justify-between`}
                style={{
                  transitionDelay: `${index * 150}ms`,
                  "--card-rotate": `${rotate}deg`,
                  "--card-shift": `${index * -28}px`,
                  zIndex: 10 + index,
                }}
              >
                <div>
                  {/* Clean Uniform Photo Container */}
                  <div className="relative w-full h-40 sm:h-44 overflow-hidden bg-[#e6dfd4]">
                    <img
                      src={svc.image}
                      alt={svc.title}
                      loading="lazy"
                      className="w-full h-full object-cover object-center transform transition-transform duration-700 ease-out group-hover:scale-105"
                    />
                  </div>

                  {/* Card Body */}
                  <div className="p-5">
                    <div className="flex items-center justify-between mb-2.5">
                      <div className="w-9 h-9 rounded-lg bg-[#faf8f5] border border-[#ede5d8] text-[#a67c33] flex items-center justify-center group-hover:bg-[#c5a059] group-hover:text-white transition-colors duration-300">
                        <Icon className="w-4 h-4" />
                      </div>
                      <span className="text-[10px] font-bold uppercase tracking-wider text-[#827a71] bg-[#faf8f5] px-2 py-0.5 rounded border border-[#e8dfcf]">
                        {svc.badge}
                      </span>
                    </div>

                    <h3 className="font-sans font-bold text-lg text-[#1c1917] group-hover:text-brand-gold transition-colors mb-1.5">
                      {svc.title}
                    </h3>
                    <p className="font-sans text-xs sm:text-sm text-[#5c554e] leading-relaxed mb-3">
                      {svc.description}
                    </p>

                    {/* Feature tags */}
                    <div className="flex flex-wrap gap-1.5 pt-2 border-t border-[#f2ece2]">
                      {svc.points.map((pt, i) => (
                        <span
                          key={i}
                          className="text-[10px] font-medium text-[#78716c] bg-[#faf8f5] px-2 py-0.5 rounded border border-[#ede5d8]"
                        >
                          • {pt}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Footer link */}
                <div className="px-5 py-2.5 bg-[#fbf9f6] border-t border-[#f2ece2] flex items-center justify-between text-xs font-semibold text-[#a67c33]">
                  <span>Request Scope Details</span>
                  <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-1" />
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
