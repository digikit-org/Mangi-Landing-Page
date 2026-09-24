import React from 'react';

export default function Pillars({ onSelectCategory }) {
  const pillars = [
    {
      id: 'corporate',
      title: 'Corporate Offices',
      subtitle: 'Workspaces that empower teams',
      icon: (
        <svg className="w-9 h-9 stroke-[#a67c33]" viewBox="0 0 36 36" fill="none" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
          {/* Architectural modern office skyscraper icon */}
          <rect x="6" y="10" width="11" height="22" rx="1" />
          <rect x="17" y="4" width="13" height="28" rx="1" />
          <line x1="10" y1="15" x2="13" y2="15" />
          <line x1="10" y1="20" x2="13" y2="20" />
          <line x1="10" y1="25" x2="13" y2="25" />
          <line x1="22" y1="9" x2="25" y2="9" />
          <line x1="22" y1="14" x2="25" y2="14" />
          <line x1="22" y1="19" x2="25" y2="19" />
          <line x1="22" y1="24" x2="25" y2="24" />
          <line x1="3" y1="32" x2="33" y2="32" />
        </svg>
      ),
    },
    {
      id: 'meeting',
      title: 'Meeting Spaces',
      subtitle: 'Spaces for ideas and collaboration',
      icon: (
        <svg className="w-9 h-9 stroke-[#a67c33]" viewBox="0 0 36 36" fill="none" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
          {/* Team collaboration circle icon */}
          <circle cx="18" cy="11" r="3.5" />
          <circle cx="10" cy="17" r="3" />
          <circle cx="26" cy="17" r="3" />
          <path d="M13.5 28c0-3 2-4.5 4.5-4.5s4.5 1.5 4.5 4.5" />
          <path d="M6 31c0-2.5 1.8-3.5 4-3.5 1 0 2 .5 2.5 1.2" />
          <path d="M30 31c0-2.5-1.8-3.5-4-3.5-1 0-2 .5-2.5 1.2" />
        </svg>
      ),
    },
    {
      id: 'reception',
      title: 'Reception Areas',
      subtitle: 'Make a lasting first impression',
      icon: (
        <svg className="w-9 h-9 stroke-[#a67c33]" viewBox="0 0 36 36" fill="none" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
          {/* Reception desk with lamp and welcoming persona */}
          <circle cx="18" cy="9" r="3.5" />
          <path d="M12 18c0-2 2.5-3 6-3s6 1 6 3" />
          <path d="M7 23h22v8H7z" />
          <line x1="4" y1="31" x2="32" y2="31" />
          <line x1="11" y1="23" x2="11" y2="31" />
          <line x1="25" y1="23" x2="25" y2="31" />
        </svg>
      ),
    },
    {
      id: 'turnkey',
      title: 'Turnkey Execution',
      subtitle: 'From design to delivery. Hassle-free.',
      icon: (
        <svg className="w-9 h-9 stroke-[#a67c33]" viewBox="0 0 36 36" fill="none" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
          {/* Precision cog / turnkey execution */}
          <circle cx="18" cy="18" r="4.5" />
          <path d="M18 5v3m0 20v3m-9.2-20.8l2.1 2.1m14.2 14.2l2.1 2.1M5 18h3m20 0h3m-20.8 9.2l2.1-2.1m14.2-14.2l2.1-2.1" />
          <circle cx="18" cy="18" r="8.5" strokeDasharray="3 3" />
        </svg>
      ),
    },
  ];

  return (
    <section id="pillars" className="w-full py-10 sm:py-14 bg-[#faf8f5] border-y border-[#ede6da]">
      <div className="max-w-[1320px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-0 divide-y sm:divide-y-0 lg:divide-x divide-[#e2d8c7]">
          {pillars.map((item, idx) => (
            <div
              key={item.id}
              onClick={() => onSelectCategory && onSelectCategory(item.id)}
              className={`flex flex-col items-start pt-6 sm:pt-0 ${
                idx === 0 ? 'lg:pr-8' : idx === 3 ? 'lg:pl-8' : 'lg:px-8'
              } group cursor-pointer transition-colors duration-200`}
            >
              {/* Icon Container with subtle warm gold glow on hover */}
              <div className="mb-4 p-2 -ml-2 rounded-lg transition-transform duration-300 group-hover:-translate-y-1">
                {item.icon}
              </div>

              {/* Title */}
              <h3 className="font-sans font-bold text-lg sm:text-[19px] text-[#1f1b18] tracking-tight group-hover:text-brand-gold transition-colors duration-200">
                {item.title}
              </h3>

              {/* Subtitle */}
              <p className="font-sans text-sm text-[#736c64] mt-1.5 leading-relaxed">
                {item.subtitle}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
