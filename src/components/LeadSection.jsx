import React, { useState } from "react";
import {
  Send,
  CheckCircle2,
  Phone,
  Mail,
  Clock,
  ShieldCheck,
  ArrowRight,
} from "lucide-react";
import confetti from "canvas-confetti";

export default function LeadSection() {
  const [form, setForm] = useState({
    name: "",
    phone: "",
    company: "",
    location: "",
    approxArea: "5,000 – 15,000 sq.ft.",
    projectType: "Corporate Office",
    message: "",
  });

  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setSubmitted(true);
      confetti({
        particleCount: 80,
        spread: 70,
        origin: { y: 0.6 },
        colors: ["#c5a059", "#1c1917", "#e2c99a"],
      });
    }, 600);
  };

  return (
    <section
      id="consultation"
      className="w-full py-16 sm:py-24 bg-[#ffffff] border-t border-[#eee7dc] relative overflow-hidden"
    >
      {/* Decorative background ambient circles */}
      <div className="absolute -top-40 -right-40 w-96 h-96 rounded-full bg-[#f6eee0] blur-3xl opacity-60 pointer-events-none"></div>
      <div className="absolute -bottom-40 -left-40 w-96 h-96 rounded-full bg-[#f6eee0] blur-3xl opacity-60 pointer-events-none"></div>

      <div className="max-w-[1360px] mx-auto px-5 sm:px-8 md:px-12 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          {/* Left Column: 06 — LEAD SECTION Copy */}
          <div className="lg:col-span-6 flex flex-col justify-center">
            <div className="flex items-center gap-3 mb-3">
              <span className="text-[11px] sm:text-xs font-sans font-bold tracking-[0.25em] text-[#a67c33] uppercase">
                — LEAD SECTION
              </span>
              <div className="w-10 h-[2px] bg-brand-gold"></div>
            </div>

            <h2 className="font-display text-3xl sm:text-4xl md:text-5xl lg:text-[54px] font-medium text-[#171614] tracking-tight leading-[1.1] mb-6">
              Planning Your Next <br />
              <span className="italic font-semibold">Commercial Space?</span>
            </h2>

            <p className="font-sans text-base sm:text-lg text-[#443e39] leading-relaxed mb-4">
              Whether you're setting up a new office, expanding or renovating,
              let's talk.
            </p>

            <p className="font-sans text-base sm:text-lg font-semibold text-[#1c1917] mb-8">
              Get a free consultation with the Mangi Interiors team.
            </p>

            {/* Reassurance points */}
            <div className="space-y-3.5 mb-8 p-5 bg-[#faf8f5] rounded-xl border border-[#ece4d6]">
              <div className="flex items-center gap-3 text-sm font-medium text-[#2d2824]">
                <ShieldCheck className="w-5 h-5 text-[#a67c33] flex-shrink-0" />
                <span>
                  No obligation. No pressure. Just a conversation about your
                  project.
                </span>
              </div>
              <div className="flex items-center gap-3 text-sm font-medium text-[#2d2824]">
                <Clock className="w-5 h-5 text-[#a67c33] flex-shrink-0" />
                <span>
                  Dedicated architect response within 24 business hours.
                </span>
              </div>
            </div>

            {/* Direct Contact Links */}
            <div className="flex flex-wrap items-center gap-6 pt-2 text-xs sm:text-sm">
              <a
                href="tel:+918088196750"
                className="flex items-center gap-2 text-[#1c1917] font-semibold hover:text-[#a67c33] transition-colors"
              >
                <div className="w-8 h-8 rounded-full bg-[#f4ece0] text-[#a67c33] flex items-center justify-center">
                  <Phone className="w-4 h-4" />
                </div>
                <span>+91 80881 96750</span>
              </a>

              <a
                href="mailto:Bapanmistry@mangiinteriors.com"
                className="flex items-center gap-2 text-[#1c1917] font-semibold hover:text-[#a67c33] transition-colors"
              >
                <div className="w-8 h-8 rounded-full bg-[#f4ece0] text-[#a67c33] flex items-center justify-center">
                  <Mail className="w-4 h-4" />
                </div>
                <span>Bapanmistry@mangiinteriors.com</span>
              </a>
            </div>
          </div>

          {/* Right Column: QUICK FORM (Directly matches Google Doc) */}
          <div className="lg:col-span-6">
            <div className="bg-[#faf8f5] rounded-2xl border border-[#e8dfcf] p-6 sm:p-9 shadow-xl relative">
              {/* Gold Top Accent */}
              <div className="absolute top-0 inset-x-0 h-1.5 bg-gradient-to-r from-[#dfc28f] via-[#c5a059] to-[#ad8940] rounded-t-2xl"></div>

              {submitted ? (
                /* Success Confirmation */
                <div className="py-12 text-center flex flex-col items-center">
                  <div className="w-16 h-16 rounded-full bg-[#f4ece0] text-[#a67c33] flex items-center justify-center mb-5">
                    <CheckCircle2 className="w-9 h-9" />
                  </div>
                  <h3 className="font-display text-3xl font-semibold text-[#1c1917] mb-2">
                    Consultation Confirmed
                  </h3>
                  <p className="font-sans text-sm text-[#5a534c] max-w-md mx-auto mb-6 leading-relaxed">
                    Thank you,{" "}
                    <span className="font-semibold text-[#1c1917]">
                      {form.name}
                    </span>
                    . Our senior workspace architect will connect with you at{" "}
                    <span className="font-semibold text-[#1c1917]">
                      {form.phone}
                    </span>{" "}
                    to discuss your project for{" "}
                    <span className="font-semibold text-[#1c1917]">
                      {form.projectType}
                    </span>
                    .
                  </p>
                  <button
                    onClick={() => setSubmitted(false)}
                    className="gold-gradient-btn px-6 py-2.5 rounded text-xs font-semibold text-white"
                  >
                    Submit Another Inquiry
                  </button>
                </div>
              ) : (
                /* Form Fields */
                <div>
                  <div className="mb-6">
                    <span className="text-[10px] font-sans font-bold tracking-[0.25em] text-[#a67c33] uppercase block mb-1">
                      QUICK FORM
                    </span>
                    <h3 className="font-display text-2xl sm:text-3xl font-medium text-[#1c1917]">
                      Let's Discuss Your Project
                    </h3>
                  </div>

                  <form onSubmit={handleSubmit} className="space-y-4">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      {/* Name* */}
                      <div>
                        <label className="block text-xs font-semibold text-[#3d3833] uppercase tracking-wider mb-1.5">
                          Name *
                        </label>
                        <input
                          type="text"
                          required
                          placeholder="Your Full Name"
                          value={form.name}
                          onChange={(e) =>
                            setForm({ ...form, name: e.target.value })
                          }
                          className="w-full px-3.5 py-2.5 bg-white border border-[#dcd3c3] rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#c5a059] transition-all"
                        />
                      </div>

                      {/* Phone / WhatsApp* */}
                      <div>
                        <label className="block text-xs font-semibold text-[#3d3833] uppercase tracking-wider mb-1.5">
                          Phone / WhatsApp *
                        </label>
                        <input
                          type="tel"
                          required
                          placeholder="+91 / WhatsApp Number"
                          value={form.phone}
                          onChange={(e) =>
                            setForm({ ...form, phone: e.target.value })
                          }
                          className="w-full px-3.5 py-2.5 bg-white border border-[#dcd3c3] rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#c5a059] transition-all"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      {/* Company Name */}
                      <div>
                        <label className="block text-xs font-semibold text-[#3d3833] uppercase tracking-wider mb-1.5">
                          Company Name
                        </label>
                        <input
                          type="text"
                          placeholder="Your Organization"
                          value={form.company}
                          onChange={(e) =>
                            setForm({ ...form, company: e.target.value })
                          }
                          className="w-full px-3.5 py-2.5 bg-white border border-[#dcd3c3] rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#c5a059] transition-all"
                        />
                      </div>

                      {/* Project Location */}
                      <div>
                        <label className="block text-xs font-semibold text-[#3d3833] uppercase tracking-wider mb-1.5">
                          Project Location
                        </label>
                        <input
                          type="text"
                          placeholder="City / Tech Park"
                          value={form.location}
                          onChange={(e) =>
                            setForm({ ...form, location: e.target.value })
                          }
                          className="w-full px-3.5 py-2.5 bg-white border border-[#dcd3c3] rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#c5a059] transition-all"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      {/* Approx. Area */}
                      <div>
                        <label className="block text-xs font-semibold text-[#3d3833] uppercase tracking-wider mb-1.5">
                          Approx. Area
                        </label>
                        <select
                          value={form.approxArea}
                          onChange={(e) =>
                            setForm({ ...form, approxArea: e.target.value })
                          }
                          className="w-full px-3 py-2.5 bg-white border border-[#dcd3c3] rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#c5a059]"
                        >
                          <option value="Under 3,000 sq.ft.">
                            &lt; 3,000 sq.ft.
                          </option>
                          <option value="3,000 – 7,500 sq.ft.">
                            3,000 – 7,500 sq.ft.
                          </option>
                          <option value="7,500 – 15,000 sq.ft.">
                            7,500 – 15,000 sq.ft.
                          </option>
                          <option value="15,000 – 35,000 sq.ft.">
                            15,000 – 35,000 sq.ft.
                          </option>
                          <option value="35,000+ sq.ft.">35,000+ sq.ft.</option>
                        </select>
                      </div>

                      {/* Project Type */}
                      <div>
                        <label className="block text-xs font-semibold text-[#3d3833] uppercase tracking-wider mb-1.5">
                          Project Type
                        </label>
                        <select
                          value={form.projectType}
                          onChange={(e) =>
                            setForm({ ...form, projectType: e.target.value })
                          }
                          className="w-full px-3 py-2.5 bg-white border border-[#dcd3c3] rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#c5a059]"
                        >
                          <option value="Corporate Office">
                            Corporate Office
                          </option>
                          <option value="Executive Workspace">
                            Executive Workspace
                          </option>
                          <option value="Meeting & Conference Spaces">
                            Meeting Spaces
                          </option>
                          <option value="Reception Area">Reception Area</option>
                          <option value="Collaboration Zone">
                            Collaboration Zone
                          </option>
                          <option value="Retail Space">Retail space</option>
                          <option value="Turnkey Commercial Fitout">
                            Full Turnkey Fitout
                          </option>
                        </select>
                      </div>
                    </div>

                    {/* Submit Button */}
                    <div className="pt-2">
                      <button
                        type="submit"
                        disabled={loading}
                        className="w-full gold-gradient-btn py-3.5 rounded-lg text-white font-semibold text-sm sm:text-base tracking-wide flex items-center justify-center gap-2 group"
                      >
                        <span>
                          {loading
                            ? "Processing..."
                            : "Submit & Get a Free Consultation"}
                        </span>
                        <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1 text-white" />
                      </button>
                    </div>

                    <p className="text-center text-[11px] text-[#827a71] pt-1">
                      🔒 Your commercial project details are kept strictly
                      confidential.
                    </p>
                  </form>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
