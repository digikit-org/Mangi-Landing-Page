import React, { useState } from "react";
import { Phone, Mail, Clock, ShieldCheck, ArrowRight } from "lucide-react";

export default function LeadSection() {
  const [errors, setErrors] = useState({});

  const validateForm = (form) => {
    const data = new FormData(form);
    const values = Object.fromEntries(data.entries());
    const nextErrors = {};

    const name = (values.name || "").trim();
    const phone = (values.phone || "").trim();
    const company = (values.company || "").trim();
    const location = (values.location || "").trim();
    const area = values.area || "";
    const project = values.project || "";

    // Name validation
    if (!name) {
      nextErrors.name = "Name is required.";
    } else if (
      name.length < 2 ||
      name.length > 100 ||
      !/^[\p{L}][\p{L}\s'.-]*$/u.test(name)
    ) {
      nextErrors.name = "Enter a valid name (2–100 characters).";
    }

    // Phone validation: exactly 10 digits
    if (!phone) {
      nextErrors.phone = "Phone number is required.";
    } else if (!/^[6-9]\d{9}$/.test(phone)) {
      nextErrors.phone =
        "Enter a valid 10-digit mobile number starting with 6–9.";
    }

    // Company validation
    if (!company) {
      nextErrors.company = "Company name is required.";
    } else if (company.length < 2 || company.length > 100) {
      nextErrors.company = "Company name must contain 2–100 characters.";
    }

    // Project location validation
    if (!location) {
      nextErrors.location = "Project location is required.";
    } else if (location.length < 2 || location.length > 100) {
      nextErrors.location = "Project location must contain 2–100 characters.";
    }

    // Area selection
    const allowedAreas = [
      "Under 3,000 sq.ft.",
      "3,000 – 7,500 sq.ft.",
      "7,500 – 15,000 sq.ft.",
      "15,000 – 35,000 sq.ft.",
      "35,000+ sq.ft.",
    ];

    if (!allowedAreas.includes(area)) {
      nextErrors.area = "Please select an approximate area.";
    }

    // Project type selection
    const allowedProjects = [
      "Healthcare (Clinics, Hospitals, Labs)",
      "Hospitality (Hotels, Lounges, Dining)",
      "Workplaces & Corporate Offices",
      "Retail & Showrooms",
      "Executive Workspace",
      "Meeting Spaces",
      "Reception Area",
      "Turnkey Commercial Fitout",
    ];

    if (!allowedProjects.includes(project)) {
      nextErrors.project = "Please select a project type.";
    }

    setErrors(nextErrors);

    if (Object.keys(nextErrors).length > 0) {
      const firstInvalidField = form.querySelector(
        `[name="${Object.keys(nextErrors)[0]}"]`,
      );

      firstInvalidField?.focus();
      return false;
    }

    return true;
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const form = e.currentTarget;

    if (!validateForm(form)) return;

    // Submit valid data to the existing PHP endpoint.
    form.submit();
  };

  const clearError = (field) => {
    setErrors((previous) => ({
      ...previous,
      [field]: "",
    }));
  };

  const inputClass = (field) =>
    `w-full px-3.5 py-2.5 bg-white border ${
      errors[field] ? "border-red-500" : "border-[#dcd3c3]"
    } rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#c5a059] transition-all`;

  const ErrorMessage = ({ field }) =>
    errors[field] ? (
      <p className="mt-1 text-xs text-red-600" role="alert">
        {errors[field]}
      </p>
    ) : null;

  return (
    <section
      id="consultation"
      className="w-full py-16 sm:py-24 bg-[#ffffff] border-t border-[#eee7dc] relative overflow-hidden"
    >
      {/* Decorative background */}
      <div className="absolute -top-40 -right-40 w-96 h-96 rounded-full bg-[#f6eee0] blur-3xl opacity-60 pointer-events-none" />
      <div className="absolute -bottom-40 -left-40 w-96 h-96 rounded-full bg-[#f6eee0] blur-3xl opacity-60 pointer-events-none" />

      <div className="max-w-[1360px] mx-auto px-5 sm:px-8 md:px-12 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          {/* Left column */}
          <div className="lg:col-span-6 flex flex-col justify-center">
            <div className="flex items-center gap-3 mb-3">
              <span className="text-[11px] sm:text-xs font-sans font-bold tracking-[0.25em] text-[#a67c33] uppercase">
                — LEAD SECTION
              </span>
              <div className="w-10 h-[2px] bg-brand-gold" />
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

            <div className="flex flex-wrap items-center gap-6 pt-2 text-xs sm:text-sm">
              <a
                href="tel:+917742036962"
                className="flex items-center gap-2 text-[#1c1917] font-semibold hover:text-[#a67c33] transition-colors"
              >
                <div className="w-8 h-8 rounded-full bg-[#f4ece0] text-[#a67c33] flex items-center justify-center">
                  <Phone className="w-4 h-4" />
                </div>
                <span>+91 7742036962</span>
              </a>

              <a
                href="mailto:info@mangiinteriors.com"
                className="flex items-center gap-2 text-[#1c1917] font-semibold hover:text-[#a67c33] transition-colors"
              >
                <div className="w-8 h-8 rounded-full bg-[#f4ece0] text-[#a67c33] flex items-center justify-center">
                  <Mail className="w-4 h-4" />
                </div>
                <span>info@mangiinteriors.com</span>
              </a>
            </div>
          </div>

          {/* Right column: form */}
          <div className="lg:col-span-6">
            <div className="bg-[#faf8f5] rounded-2xl border border-[#e8dfcf] p-6 sm:p-9 shadow-xl relative">
              <div className="absolute top-0 inset-x-0 h-1.5 bg-gradient-to-r from-[#dfc28f] via-[#c5a059] to-[#ad8940] rounded-t-2xl" />

              <div className="mb-6">
                <span className="text-[10px] font-sans font-bold tracking-[0.25em] text-[#a67c33] uppercase block mb-1">
                  QUICK FORM
                </span>
                <h3 className="font-display text-2xl sm:text-3xl font-medium text-[#1c1917]">
                  Let's Discuss Your Project
                </h3>
              </div>

              <form
                action="https://mail.digikit.in/forms/mangi/lead.php"
                method="POST"
                onSubmit={handleSubmit}
                noValidate
                className="space-y-4"
              >
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {/* Name */}
                  <div>
                    <label className="block text-xs font-semibold text-[#3d3833] uppercase tracking-wider mb-1.5">
                      Name *
                    </label>
                    <input
                      name="name"
                      type="text"
                      required
                      minLength={2}
                      maxLength={100}
                      autoComplete="name"
                      placeholder="Your Full Name"
                      aria-invalid={Boolean(errors.name)}
                      onChange={() => clearError("name")}
                      className={inputClass("name")}
                    />
                    <ErrorMessage field="name" />
                  </div>

                  {/* Phone */}
                  <div>
                    <label className="block text-xs font-semibold text-[#3d3833] uppercase tracking-wider mb-1.5">
                      Phone / WhatsApp *
                    </label>
                    <input
                      name="phone"
                      type="tel"
                      required
                      inputMode="numeric"
                      pattern="[6-9][0-9]{9}"
                      minLength={10}
                      maxLength={10}
                      placeholder="10-digit mobile number"
                      title="Enter exactly 10 digits, starting with 6–9."
                      aria-invalid={Boolean(errors.phone)}
                      onInput={(e) => {
                        e.currentTarget.value = e.currentTarget.value
                          .replace(/\D/g, "")
                          .slice(0, 10);
                        clearError("phone");
                      }}
                      className={inputClass("phone")}
                    />
                    <ErrorMessage field="phone" />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {/* Company */}
                  <div>
                    <label className="block text-xs font-semibold text-[#3d3833] uppercase tracking-wider mb-1.5">
                      Company Name *
                    </label>
                    <input
                      name="company"
                      type="text"
                      required
                      minLength={2}
                      maxLength={100}
                      placeholder="Your Organization"
                      aria-invalid={Boolean(errors.company)}
                      onChange={() => clearError("company")}
                      className={inputClass("company")}
                    />
                    <ErrorMessage field="company" />
                  </div>

                  {/* Location */}
                  <div>
                    <label className="block text-xs font-semibold text-[#3d3833] uppercase tracking-wider mb-1.5">
                      Project Location *
                    </label>
                    <input
                      name="location"
                      type="text"
                      required
                      minLength={2}
                      maxLength={100}
                      placeholder="City / Tech Park"
                      aria-invalid={Boolean(errors.location)}
                      onChange={() => clearError("location")}
                      className={inputClass("location")}
                    />
                    <ErrorMessage field="location" />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {/* Area */}
                  <div>
                    <label className="block text-xs font-semibold text-[#3d3833] uppercase tracking-wider mb-1.5">
                      Approx. Area *
                    </label>
                    <select
                      name="area"
                      required
                      defaultValue=""
                      aria-invalid={Boolean(errors.area)}
                      onChange={() => clearError("area")}
                      className={inputClass("area")}
                    >
                      <option value="" disabled>
                        Select approximate area
                      </option>
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
                    <ErrorMessage field="area" />
                  </div>

                  {/* Project */}
                  <div>
                    <label className="block text-xs font-semibold text-[#3d3833] uppercase tracking-wider mb-1.5">
                      Project Type *
                    </label>
                    <select
                      name="project"
                      required
                      defaultValue=""
                      aria-invalid={Boolean(errors.project)}
                      onChange={() => clearError("project")}
                      className={inputClass("project")}
                    >
                      <option value="" disabled>
                        Select project type
                      </option>
                      <option value="Healthcare (Clinics, Hospitals, Labs)">
                        Healthcare (Clinics, Hospitals, Labs)
                      </option>
                      <option value="Hospitality (Hotels, Lounges, Dining)">
                        Hospitality (Hotels, Lounges, Dining)
                      </option>
                      <option value="Workplaces & Corporate Offices">
                        Workplaces &amp; Corporate Offices
                      </option>
                      <option value="Retail & Showrooms">
                        Retail &amp; Showrooms
                      </option>
                      <option value="Executive Workspace">
                        Executive Workspace
                      </option>
                      <option value="Meeting Spaces">Meeting Spaces</option>
                      <option value="Reception Area">Reception Area</option>
                      <option value="Turnkey Commercial Fitout">
                        Full Turnkey Fitout
                      </option>
                    </select>
                    <ErrorMessage field="project" />
                  </div>
                </div>

                {/* Submit */}
                <div className="pt-2">
                  <button
                    type="submit"
                    className="w-full gold-gradient-btn py-3.5 rounded-lg text-white font-semibold text-sm sm:text-base tracking-wide flex items-center justify-center gap-2 group"
                  >
                    Submit &amp; Get a Free Consultation
                    <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1 text-white" />
                  </button>
                </div>

                <p className="text-center text-[11px] text-[#827a71] pt-1">
                  🔒 Your commercial project details are kept strictly
                  confidential.
                </p>
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
