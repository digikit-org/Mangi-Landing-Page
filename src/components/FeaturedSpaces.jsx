import React from "react";
import { ArrowRight } from "lucide-react";

export const spacesData = [
  {
    id: "corporate",
    title: "Corporate Offices",
    subtitle: "Workspaces that empower teams",
    image: "/images/card_corporate.jpg",
    hdImage:
      "https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=1200&q=85",
    category: "Workplace Design",
    area: "5,000 – 50,000+ sq.ft.",
    highlights: [
      "Ergonomic workstation clusters with acoustic privacy zoning",
      "Integrated biophilic planting systems & natural circadian lighting",
      "Concealed high-density cable routing and tech-ready connectivity",
      "Flexible modular layouts that scale seamlessly with team growth",
    ],
    description:
      "Designed for focus, agility, and employee well-being. Our corporate office environments blend architectural elegance with peak functional performance.",
  },
  {
    id: "meeting",
    title: "Meeting Spaces",
    subtitle: "Spaces for ideas and collaboration",
    image: "/images/card_meeting.jpg",
    hdImage:
      "https://images.unsplash.com/photo-1497215842964-222b430dc094?auto=format&fit=crop&w=1200&q=85",
    category: "Boardrooms & Conference",
    area: "400 – 2,500 sq.ft.",
    highlights: [
      "Double-glazed acoustic acoustic glass partitions with STC 45+ rating",
      "Automated smart conferencing displays & hidden ambient mic arrays",
      "Handcrafted bespoke executive timber tables with discreet power docks",
      "Tunable ambient ceiling lighting with preset presentation scenes",
    ],
    description:
      "Boardrooms and video-conferencing suites engineered to facilitate high-stakes executive decisions, creative brainstorming, and seamless hybrid collaborations.",
  },
  {
    id: "collaboration",
    title: "Collaboration Zones",
    subtitle: "Spaces for spontaneous connection",
    image: "/images/card_collaboration.jpg",
    hdImage:
      "https://images.unsplash.com/photo-1527192491265-7e15c55b1ed2?auto=format&fit=crop&w=1200&q=85",
    category: "Breakouts & Lounges",
    area: "800 – 6,000 sq.ft.",
    highlights: [
      "Residential-inspired soft seating and acoustic wingback lounges",
      "Warm architectural timber slat screening and custom display shelving",
      "Integrated barista café corners and informal touch-down benches",
      "Vibrant community hubs that boost serendipitous cross-team interaction",
    ],
    description:
      "Casual, human-centric breakout spaces that break the routine, cultivate spontaneous creative sparks, and foster a welcoming company culture.",
  },
  {
    id: "reception",
    title: "Reception Areas",
    subtitle: "Make a lasting first impression",
    image: "/images/card_reception.jpg",
    hdImage:
      "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=85",
    category: "Welcome Lounges & Lobbies",
    area: "500 – 3,500 sq.ft.",
    highlights: [
      "Sculptural fluted Italian marble and quartz statement reception desks",
      "Backlit 3D brand identity walls with architectural light grazers",
      "Curated executive waiting lounges with premium hospitality finishes",
      "Touchless visitor registration concierges and discrete security zones",
    ],
    description:
      "The premier touchpoint of your company. We orchestrate architectural presence, warm materiality, and signature brand impact the moment guests step inside.",
  },
];

export default function FeaturedSpaces({ onSelectSpace }) {
  return (
    <section
      id="featured-spaces"
      className="w-full py-12 sm:py-16 bg-[#faf8f5]"
    >
      <div className="max-w-[1320px] mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header with Split Titles */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-8 sm:mb-10 pb-4 border-b border-[#ece4d6]">
          {/* Left Title with Bronze Horizontal Bar */}
          <div className="flex items-center gap-4">
            <h2 className="text-xs sm:text-[13px] md:text-sm font-sans font-bold tracking-[0.22em] text-[#332e29] uppercase">
              FEATURED COMMERCIAL SPACES
            </h2>
            <div className="w-10 sm:w-14 h-[2px] bg-[#c5a059]"></div>
          </div>

          {/* Right Sub-heading */}
          <div className="text-[11px] sm:text-xs font-sans font-medium tracking-[0.2em] text-[#7d756d] uppercase">
            SPACES FOR A BETTER TOMORROW
          </div>
        </div>

        {/* 4 Cards Grid */}
        <div className="mobile-card-scroll md:grid-cols-2 lg:grid-cols-4 gap-5 sm:gap-6">
          {spacesData.map((space) => (
            <div
              key={space.id}
              onClick={() => onSelectSpace(space)}
              className="mobile-card-item group bg-white rounded-xl overflow-hidden border border-[#eae3d5] shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col cursor-pointer card-hover-lift"
            >
              {/* Card Image Container with overflow hidden for zoom */}
              <div className="relative aspect-[16/10] w-full overflow-hidden bg-[#e4ded3]">
                <img
                  src={space.image}
                  alt={space.title}
                  loading="lazy"
                  onError={(e) => {
                    // Fallback to high-res Unsplash image if local crop fails
                    e.currentTarget.src = space.hdImage;
                  }}
                  className="w-full h-full object-cover object-center transform transition-transform duration-700 ease-out group-hover:scale-108"
                />
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors duration-300"></div>
              </div>

              {/* Card Footer Bar */}
              <div className="p-3.5 sm:p-4 flex items-center justify-between bg-white border-t border-[#f2ede4] transition-colors duration-200 group-hover:bg-[#fbf9f5]">
                <span className="font-sans font-semibold text-xs sm:text-sm text-[#24201d] tracking-wide group-hover:text-brand-gold transition-colors duration-200">
                  {space.title}
                </span>
                <span className="inline-flex items-center justify-center text-[#78716c] group-hover:text-brand-gold transition-all duration-300 transform group-hover:translate-x-1">
                  <ArrowRight className="w-4 h-4" />
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
