import React, { useState, useRef, useEffect } from "react";
import { ArrowRight, MapPin, ChevronLeft, ChevronRight } from "lucide-react";
import { projectsList } from "../data/projectsData";
import useInView from "../hooks/useInView";

export default function OurWork({ onSelectProject, onOpenConsultation }) {
  const [activeFilter, setActiveFilter] = useState("All");
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
  }, [activeFilter]);

  const scroll = (direction) => {
    if (scrollRef.current) {
      const cardWidth = 360;
      scrollRef.current.scrollBy({
        left: direction === "left" ? -cardWidth : cardWidth,
        behavior: "smooth",
      });
    }
  };

  const categories = [
    "All",
    "Corporate Office",
    "Executive Workspace",
    "Meeting Spaces",
    "Reception Area",
    "Collaboration Zone",
    "Retail space",
  ];

  const filteredProjects =
    activeFilter === "All"
      ? projectsList
      : projectsList.filter((p) => p.category === activeFilter);

  return (
    <section
      ref={sectionRef}
      id="projects"
      className="w-full py-12 sm:py-16 bg-[#ffffff]"
    >
      <div className="max-w-[1360px] mx-auto px-5 sm:px-8 md:px-12">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-6 sm:mb-8 gap-4">
          <div>
            <div className="flex items-center gap-3 mb-2.5">
              <span className="text-[11px] sm:text-xs font-sans font-bold tracking-[0.25em] text-[#a67c33] uppercase">
                — OUR WORK
              </span>
              <div className="w-8 h-[2px] bg-brand-gold"></div>
            </div>
            <h2 className="font-display text-2xl sm:text-3xl md:text-4xl font-medium text-[#171614] tracking-tight">
              Spaces That Speak for{" "}
              <span className="italic font-semibold">Your Business.</span>
            </h2>
          </div>

          {/* Action CTA & Scroller Controls */}
          <div className="flex items-center gap-3">
            {/* Scroller Controls */}
            <div className="flex items-center gap-1.5 bg-[#faf8f5] p-1 rounded-full border border-[#e8dfcf] shadow-sm">
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

            <button
              onClick={() => onOpenConsultation("Portfolio Review")}
              className="gold-gradient-btn inline-flex items-center gap-1.5 px-4 py-2 rounded-md text-xs font-semibold text-white"
            >
              <span>View All</span>
              <ArrowRight className="w-3.5 h-3.5 text-white" />
            </button>
          </div>
        </div>

        {/* Filter Pills */}
        <div className="flex flex-wrap items-center gap-2 mb-6 pb-2 border-b border-[#f2ede4] overflow-x-auto">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveFilter(cat)}
              className={`px-3.5 py-1.5 rounded-full text-xs font-semibold tracking-wide transition-all duration-200 whitespace-nowrap ${
                activeFilter === cat
                  ? "bg-[#1c1917] text-white shadow-sm"
                  : "bg-[#faf8f5] text-[#5e574f] border border-[#e8dfcf] hover:border-[#c5a059] hover:text-[#1c1917]"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Horizontal Projects Scroller */}
        <div
          ref={scrollRef}
          className="horizontal-scroller flex gap-5 pb-3 pt-1 snap-x snap-mandatory"
        >
          {filteredProjects.map((project, index) => {
            const rotate = (index % 2 === 0 ? -1 : 1) * (index + 1) * 1.2;
            return (
              <div
                key={project.id}
                onClick={() => onSelectProject(project)}
                className={`card-spill ${isInView ? "is-visible" : ""} w-[290px] sm:w-[330px] md:w-[360px] shrink-0 snap-start group bg-[#ffffff] rounded-xl overflow-hidden border border-[#eae3d5] shadow-sm hover:shadow-lg transition-all duration-300 flex flex-col cursor-pointer card-hover-lift`}
                style={{
                  transitionDelay: `${index * 140}ms`,
                  "--card-rotate": `${rotate}deg`,
                }}
              >
                {/* PURE PRISTINE HD PHOTO */}
                <div className="relative aspect-[16/10] w-full overflow-hidden bg-[#e6dfd4]">
                  <img
                    src={project.image}
                    alt={project.title}
                    loading="lazy"
                    className="w-full h-full object-cover object-center transform transition-transform duration-700 ease-out group-hover:scale-105"
                  />
                </div>

                {/* Card Body */}
                <div className="p-4 sm:p-5 flex-1 flex flex-col justify-between bg-white">
                  <div>
                    {/* Category & Location Badges */}
                    <div className="flex items-center justify-between text-xs mb-2.5">
                      <span className="text-[10px] font-bold uppercase tracking-wider text-[#827a71] bg-[#faf8f5] px-2 py-0.5 rounded border border-[#e8dfcf]">
                        {project.category}
                      </span>
                      <span className="flex items-center gap-1 text-[11px] text-[#78716c] font-medium">
                        <MapPin className="w-3 h-3 text-[#a67c33]" />
                        {project.location}
                      </span>
                    </div>

                    <h3 className="font-sans font-bold text-base sm:text-[17px] text-[#1c1917] group-hover:text-brand-gold transition-colors leading-snug">
                      {project.title}
                    </h3>

                    <p className="font-sans text-xs sm:text-[13px] text-[#615a52] mt-1.5 line-clamp-2 leading-relaxed">
                      {project.description}
                    </p>
                  </div>

                  <div className="mt-4 pt-2.5 border-t border-[#f2ede4] flex items-center justify-between text-xs font-semibold text-[#a67c33]">
                    <span>{project.area} • Handed Over</span>
                    <div className="flex items-center gap-1 group-hover:translate-x-1 transition-transform">
                      <span>Explore Blueprint</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
