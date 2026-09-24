import React, { useEffect } from 'react';
import { X, Check, ArrowRight, ShieldCheck, Layers, Maximize } from 'lucide-react';

export default function SpaceDetailModal({ space, onClose, onBookSpace }) {
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') onClose();
    };
    if (space) {
      document.body.style.overflow = 'hidden';
      window.addEventListener('keydown', handleKeyDown);
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [space, onClose]);

  if (!space) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 md:p-10">
      {/* Backdrop */}
      <div
        onClick={onClose}
        className="absolute inset-0 bg-[#141210]/65 backdrop-blur-sm transition-opacity"
      ></div>

      {/* Modal Container */}
      <div className="relative w-full max-w-3xl bg-[#fcfbfa] rounded-2xl border border-[#e8dfcf] shadow-2xl overflow-hidden z-10 animate-in fade-in zoom-in-95 duration-200 max-h-[90vh] flex flex-col">
        
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-20 p-2 rounded-full bg-white/80 hover:bg-white text-[#1c1917] shadow-md transition-colors"
          aria-label="Close modal"
        >
          <X className="w-5 h-5" />
        </button>

        {/* PURE PRISTINE HD PHOTO: No text or gradient overlays */}
        <div className="relative h-64 sm:h-80 w-full overflow-hidden flex-shrink-0 bg-[#e6dfd4]">
          <img
            src={space.image}
            alt={space.title}
            onError={(e) => {
              e.currentTarget.src = space.hdImage;
            }}
            className="w-full h-full object-cover object-center"
          />
        </div>

        {/* Content Body */}
        <div className="p-6 sm:p-8 overflow-y-auto space-y-6">
          {/* Header outside of the image */}
          <div className="border-b border-[#ede4d7] pb-4">
            <span className="text-[10px] uppercase tracking-[0.25em] font-bold text-[#a67c33] block mb-1">
              {space.category}
            </span>
            <h2 className="font-display text-2xl sm:text-3xl md:text-4xl font-semibold text-[#1c1917]">
              {space.title}
            </h2>
            <p className="text-xs sm:text-sm text-[#78716c] font-normal mt-1">
              {space.subtitle}
            </p>
          </div>
          {/* Overview text */}
          <p className="font-sans text-sm sm:text-base text-[#403a35] leading-relaxed">
            {space.description}
          </p>

          {/* Quick Specs Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 p-4 bg-[#f6f1e8] rounded-xl border border-[#e5dcce]">
            <div>
              <span className="text-[10px] uppercase font-bold tracking-wider text-[#827a71] block">
                Typical Footprint
              </span>
              <span className="text-xs sm:text-sm font-semibold text-[#24201d]">
                {space.area}
              </span>
            </div>
            <div>
              <span className="text-[10px] uppercase font-bold tracking-wider text-[#827a71] block">
                Acoustic Target
              </span>
              <span className="text-xs sm:text-sm font-semibold text-[#24201d]">
                NRC 0.85+ / STC 48
              </span>
            </div>
            <div className="col-span-2 sm:col-span-1">
              <span className="text-[10px] uppercase font-bold tracking-wider text-[#827a71] block">
                Delivery Model
              </span>
              <span className="text-xs sm:text-sm font-semibold text-[#24201d]">
                Turnkey EPC Fitout
              </span>
            </div>
          </div>

          {/* Key Deliverables & Engineering Details */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-[0.2em] text-[#332e29] mb-3">
              Architectural & Engineering Highlights
            </h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
              {space.highlights.map((highlight, index) => (
                <div key={index} className="flex items-start gap-2.5 text-xs sm:text-sm text-[#504a43]">
                  <span className="mt-0.5 p-0.5 rounded-full bg-[#ebdcc4] text-[#a67c33] flex-shrink-0">
                    <Check className="w-3.5 h-3.5" />
                  </span>
                  <span>{highlight}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Modal Actions */}
          <div className="pt-4 border-t border-[#ede4d7] flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="text-xs text-[#78716c]">
              Ready to transform your workplace?
            </div>
            <button
              onClick={() => {
                onClose();
                onBookSpace(space.id);
              }}
              className="w-full sm:w-auto gold-gradient-btn px-6 py-3 rounded-lg text-white font-semibold text-xs sm:text-sm tracking-wide flex items-center justify-center gap-2"
            >
              <span>Request Custom Proposal for this Space</span>
              <ArrowRight className="w-4 h-4 text-white" />
            </button>
          </div>

        </div>

      </div>
    </div>
  );
}
