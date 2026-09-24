import React, { useState, useEffect } from 'react';
import { X, CheckCircle2, ShieldCheck, Send, Clock, Phone, Mail, Sparkles, ArrowRight } from 'lucide-react';
import confetti from 'canvas-confetti';

export default function ConsultationModal({ isOpen, onClose, initialCategory = '' }) {
  const [formData, setFormData] = useState({
    name: '',
    contact: '',
    country: 'India',
    email: '',
    postalCode: '',
    spaceType: 'Corporate Offices',
    area: '5,000 – 15,000 sq.ft.',
    timeline: 'Within 1–3 Months',
    message: '',
  });

  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    if (initialCategory) {
      setFormData((prev) => ({ ...prev, spaceType: initialCategory }));
    }
  }, [initialCategory]);

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') onClose();
    };
    if (isOpen) {
      document.body.style.overflow = 'hidden';
      window.addEventListener('keydown', handleKeyDown);
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitting(true);

    setTimeout(() => {
      setSubmitting(false);
      setSubmitted(true);
      confetti({
        particleCount: 80,
        spread: 70,
        origin: { y: 0.6 },
        colors: ['#c5a059', '#1c1917', '#e2c99a'],
      });
    }, 600);
  };

  const handleReset = () => {
    setSubmitted(false);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 md:p-10">
      {/* Backdrop */}
      <div
        onClick={onClose}
        className="absolute inset-0 bg-[#141210]/65 backdrop-blur-sm transition-opacity"
      ></div>

      {/* Modal Card */}
      <div className="relative w-full max-w-xl bg-[#fcfbfa] rounded-2xl border border-[#e8dfcf] shadow-2xl overflow-hidden z-10 animate-in fade-in zoom-in-95 duration-200">
        
        {/* Top Gold Accent Bar */}
        <div className="h-1.5 w-full bg-gradient-to-r from-[#dfc28f] via-[#c5a059] to-[#ad8940]"></div>

        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 rounded-full text-[#78716c] hover:text-[#1c1917] hover:bg-[#ede5d8] transition-colors z-20"
          aria-label="Close modal"
        >
          <X className="w-5 h-5" />
        </button>

        {submitted ? (
          /* Confirmation State */
          <div className="p-8 sm:p-12 text-center flex flex-col items-center">
            <div className="w-16 h-16 rounded-full bg-[#f4ece0] text-[#a67c33] flex items-center justify-center mb-5">
              <CheckCircle2 className="w-9 h-9" />
            </div>
            <h3 className="font-display text-3xl font-semibold text-[#1c1917] mb-2">
              Consultation Scheduled
            </h3>
            <p className="font-sans text-[#5c564f] text-sm max-w-md mx-auto mb-6 leading-relaxed">
              Thank you, <span className="font-semibold text-[#1c1917]">{formData.name || 'there'}</span>. Our senior workspace architect will review your project requirements for <span className="font-semibold text-[#1c1917]">{formData.spaceType}</span> and contact you at <span className="font-semibold text-[#1c1917]">{formData.contact || formData.email}</span> within 24 business hours.
            </p>
            <div className="bg-[#f7f2ea] rounded-xl p-4 w-full max-w-md text-xs text-[#736c64] mb-6 space-y-1.5 border border-[#e5dcce]">
              <div className="flex justify-between">
                <span>Confirmation sent to:</span>
                <span className="font-semibold text-[#2b2723]">{formData.email}</span>
              </div>
              <div className="flex justify-between">
                <span>Country & Postal:</span>
                <span className="font-semibold text-[#2b2723]">{formData.country} {formData.postalCode ? `(${formData.postalCode})` : ''}</span>
              </div>
            </div>
            <button
              onClick={handleReset}
              className="gold-gradient-btn px-8 py-3 rounded-md text-white font-semibold text-sm tracking-wide"
            >
              Return to Site
            </button>
          </div>
        ) : (
          /* Form Content: SIGN UP. VISIT. SAVE. */
          <div className="p-6 sm:p-8 max-h-[85vh] overflow-y-auto">
            {/* Header */}
            <div className="mb-5">
              <span className="text-[10px] font-sans font-bold tracking-[0.25em] text-[#a67c33] uppercase block mb-1">
                SIGN UP. VISIT. SAVE.
              </span>
              <h2 className="font-display text-2xl sm:text-3xl font-medium text-[#1c1917]">
                Your Space Makeover Starts Here...
              </h2>
              <p className="font-sans text-xs text-[#78716c] mt-1">
                Get a free consultation with the Mangi Interiors design & build team.
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-3.5">
              {/* Name */}
              <div>
                <label className="block text-[11px] font-semibold text-[#3d3833] uppercase tracking-wider mb-1">
                  Your Name *
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Rahul Sharma"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full px-3.5 py-2.5 bg-white border border-[#dcd3c3] rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#c5a059]"
                />
              </div>

              {/* Contact no. & Country */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-[11px] font-semibold text-[#3d3833] uppercase tracking-wider mb-1">
                    Contact no. *
                  </label>
                  <input
                    type="tel"
                    required
                    placeholder="+91 / WhatsApp"
                    value={formData.contact}
                    onChange={(e) => setFormData({ ...formData, contact: e.target.value })}
                    className="w-full px-3.5 py-2.5 bg-white border border-[#dcd3c3] rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#c5a059]"
                  />
                </div>
                <div>
                  <label className="block text-[11px] font-semibold text-[#3d3833] uppercase tracking-wider mb-1">
                    Country *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. India"
                    value={formData.country}
                    onChange={(e) => setFormData({ ...formData, country: e.target.value })}
                    className="w-full px-3.5 py-2.5 bg-white border border-[#dcd3c3] rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#c5a059]"
                  />
                </div>
              </div>

              {/* Email & Postal code */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-[11px] font-semibold text-[#3d3833] uppercase tracking-wider mb-1">
                    Corporate / Personal Email *
                  </label>
                  <input
                    type="email"
                    required
                    placeholder="name@company.com"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="w-full px-3.5 py-2.5 bg-white border border-[#dcd3c3] rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#c5a059]"
                  />
                </div>
                <div>
                  <label className="block text-[11px] font-semibold text-[#3d3833] uppercase tracking-wider mb-1">
                    Postal code
                  </label>
                  <input
                    type="text"
                    placeholder="PIN / Postal Code"
                    value={formData.postalCode}
                    onChange={(e) => setFormData({ ...formData, postalCode: e.target.value })}
                    className="w-full px-3.5 py-2.5 bg-white border border-[#dcd3c3] rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#c5a059]"
                  />
                </div>
              </div>

              {/* Space Type */}
              <div>
                <label className="block text-[11px] font-semibold text-[#3d3833] uppercase tracking-wider mb-1">
                  Commercial Space Type
                </label>
                <select
                  value={formData.spaceType}
                  onChange={(e) => setFormData({ ...formData, spaceType: e.target.value })}
                  className="w-full px-3 py-2.5 bg-white border border-[#dcd3c3] rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#c5a059]"
                >
                  <option value="Corporate Offices">Corporate Offices</option>
                  <option value="Executive Workspace">Executive Workspace</option>
                  <option value="Meeting & Conference Spaces">Meeting & Conference Spaces</option>
                  <option value="Reception Areas">Reception Areas</option>
                  <option value="Collaboration Spaces">Collaboration Spaces</option>
                  <option value="Retail Space">Retail Space</option>
                  <option value="Turnkey Interiors">Turnkey Interiors (Design + Build)</option>
                </select>
              </div>

              {/* Submit CTA Button */}
              <div className="pt-2">
                <button
                  type="submit"
                  disabled={submitting}
                  className="w-full gold-gradient-btn py-3.5 rounded-lg text-white font-semibold text-sm sm:text-base tracking-wide flex items-center justify-center gap-2 group shadow-md"
                >
                  {submitting ? (
                    <span>Submitting Brief...</span>
                  ) : (
                    <>
                      <span>Get a Free Consultation</span>
                      <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                    </>
                  )}
                </button>
              </div>

              <div className="flex items-center justify-center gap-2 pt-1 text-[11px] text-[#857e75]">
                <ShieldCheck className="w-3.5 h-3.5 text-[#a67c33]" />
                <span>No obligation. No pressure. 100% Confidential.</span>
              </div>
            </form>
          </div>
        )}

      </div>
    </div>
  );
}
