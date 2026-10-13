import React, { useState, useEffect } from "react";
import { X, ShieldCheck, ArrowRight } from "lucide-react";

export default function ConsultationModal({ isOpen, onClose }) {
  const [errors, setErrors] = useState({});

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "Escape") onClose();
    };

    if (isOpen) {
      document.body.style.overflow = "hidden";
      window.addEventListener("keydown", handleKeyDown);
    } else {
      document.body.style.overflow = "unset";
    }

    return () => {
      document.body.style.overflow = "unset";
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [isOpen, onClose]);

  useEffect(() => {
    if (!isOpen) setErrors({});
  }, [isOpen]);

  if (!isOpen) return null;

  const validateForm = (form) => {
    const data = new FormData(form);
    const name = (data.get("name") || "").trim();
    const phone = (data.get("phone") || "").trim();
    const country = (data.get("country") || "").trim();
    const email = (data.get("email") || "").trim();
    const code = (data.get("code") || "").trim();
    const space = data.get("space") || "";

    const nextErrors = {};

    if (!name) {
      nextErrors.name = "Name is required.";
    } else if (
      name.length < 2 ||
      name.length > 100 ||
      !/^[\p{L}][\p{L}\s'.-]*$/u.test(name)
    ) {
      nextErrors.name = "Enter a valid name (2–100 characters).";
    }

    if (!phone) {
      nextErrors.phone = "Phone number is required.";
    } else if (!/^[6-9]\d{9}$/.test(phone)) {
      nextErrors.phone = "Enter exactly 10 digits, starting with 6–9.";
    }

    if (!country) {
      nextErrors.country = "Country is required.";
    } else if (
      country.length > 60 ||
      !/^[\p{L}][\p{L}\s'.-]*$/u.test(country)
    ) {
      nextErrors.country = "Enter a valid country name.";
    }

    if (!email) {
      nextErrors.email = "Email is required.";
    } else if (
      email.length > 254 ||
      !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)
    ) {
      nextErrors.email = "Enter a valid email address.";
    }

    if (!code) {
      nextErrors.code = "Postal code is required.";
    } else if (
      code.length < 3 ||
      code.length > 10 ||
      !/^[A-Za-z0-9]+(?:[ -][A-Za-z0-9]+)*$/.test(code)
    ) {
      nextErrors.code = "Enter a valid postal code (3–10 characters).";
    }

    if (!space) {
      nextErrors.space = "Please select a commercial space type.";
    }

    setErrors(nextErrors);

    if (Object.keys(nextErrors).length > 0) {
      const firstField = form.querySelector(
        `[name="${Object.keys(nextErrors)[0]}"]`,
      );
      firstField?.focus();
      return false;
    }

    return true;
  };

  const handleSubmit = (e) => {
    const form = e.currentTarget;

    // Allow native constraints to be checked by the custom validator.
    e.preventDefault();

    if (!validateForm(form)) return;

    // Submit normally to the PHP endpoint after validation.
    form.submit();
  };

  const clearError = (field) => {
    setErrors((prev) => ({ ...prev, [field]: "" }));
  };

  const fieldClass = (field) =>
    `w-full px-3.5 py-2.5 bg-white border ${
      errors[field] ? "border-red-500" : "border-[#dcd3c3]"
    } rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#c5a059]`;

  const ErrorMessage = ({ field }) =>
    errors[field] ? (
      <p className="mt-1 text-xs text-red-600" role="alert">
        {errors[field]}
      </p>
    ) : null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 md:p-10">
      {/* Backdrop */}
      <div
        onClick={onClose}
        className="absolute inset-0 bg-[#2a241e]/55 backdrop-blur-sm transition-opacity"
      />

      {/* Modal Card */}
      <div className="relative w-full max-w-xl bg-[#fcfbfa] rounded-2xl border border-[#e8dfcf] shadow-2xl overflow-hidden z-10 animate-in fade-in zoom-in-95 duration-200">
        <div className="h-1.5 w-full bg-gradient-to-r from-[#dfc28f] via-[#c5a059] to-[#ad8940]" />

        <button
          type="button"
          onClick={onClose}
          className="absolute top-4 right-4 p-2 rounded-full text-[#78716c] hover:text-[#1c1917] hover:bg-[#ede5d8] transition-colors z-20"
          aria-label="Close modal"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="p-6 sm:p-8 max-h-[85vh] overflow-y-auto">
          <div className="mb-5">
            <span className="text-[10px] font-sans font-bold tracking-[0.25em] text-[#a67c33] uppercase block mb-1">
              SIGN UP. VISIT. SAVE.
            </span>

            <h2 className="font-display text-2xl sm:text-3xl font-medium text-[#1c1917]">
              Your Space Makeover Starts Here...
            </h2>

            <p className="font-sans text-xs text-[#78716c] mt-1">
              Get a free consultation with the Mangi Interiors design &amp;
              build team.
            </p>
          </div>

          <form
            action="https://mail.digikit.in/forms/mangi/consultation.php"
            method="post"
            onSubmit={handleSubmit}
            noValidate
            className="space-y-3.5"
          >
            {/* Name */}
            <div>
              <label className="block text-[11px] font-semibold text-[#3d3833] uppercase tracking-wider mb-1">
                Your Name *
              </label>
              <input
                name="name"
                type="text"
                required
                minLength={2}
                maxLength={100}
                autoComplete="name"
                placeholder="e.g. Rahul Sharma"
                aria-invalid={Boolean(errors.name)}
                onChange={() => clearError("name")}
                className={fieldClass("name")}
              />
              <ErrorMessage field="name" />
            </div>

            {/* Contact no. & Country */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="block text-[11px] font-semibold text-[#3d3833] uppercase tracking-wider mb-1">
                  Contact no. *
                </label>
                <input
                  name="phone"
                  type="tel"
                  required
                  inputMode="numeric"
                  pattern="[6-9][0-9]{9}"
                  minLength={10}
                  maxLength={10}
                  autoComplete="tel-national"
                  placeholder="10-digit mobile number"
                  title="Enter exactly 10 digits, starting with 6–9."
                  aria-invalid={Boolean(errors.phone)}
                  onInput={(e) => {
                    e.currentTarget.value = e.currentTarget.value
                      .replace(/\D/g, "")
                      .slice(0, 10);
                    clearError("phone");
                  }}
                  className={fieldClass("phone")}
                />
                <ErrorMessage field="phone" />
              </div>

              <div>
                <label className="block text-[11px] font-semibold text-[#3d3833] uppercase tracking-wider mb-1">
                  Country *
                </label>
                <input
                  name="country"
                  type="text"
                  required
                  maxLength={60}
                  autoComplete="country-name"
                  placeholder="e.g. India"
                  aria-invalid={Boolean(errors.country)}
                  onChange={() => clearError("country")}
                  className={fieldClass("country")}
                />
                <ErrorMessage field="country" />
              </div>
            </div>

            {/* Email & Postal code */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="block text-[11px] font-semibold text-[#3d3833] uppercase tracking-wider mb-1">
                  Corporate / Personal Email *
                </label>
                <input
                  name="email"
                  type="email"
                  required
                  maxLength={254}
                  autoComplete="email"
                  placeholder="name@company.com"
                  aria-invalid={Boolean(errors.email)}
                  onChange={() => clearError("email")}
                  className={fieldClass("email")}
                />
                <ErrorMessage field="email" />
              </div>

              <div>
                <label className="block text-[11px] font-semibold text-[#3d3833] uppercase tracking-wider mb-1">
                  Postal code *
                </label>
                <input
                  name="code"
                  type="text"
                  required
                  minLength={3}
                  maxLength={10}
                  autoComplete="postal-code"
                  placeholder="PIN / Postal Code"
                  aria-invalid={Boolean(errors.code)}
                  onChange={() => clearError("code")}
                  className={fieldClass("code")}
                />
                <ErrorMessage field="code" />
              </div>
            </div>

            {/* Space Type */}
            <div>
              <label className="block text-[11px] font-semibold text-[#3d3833] uppercase tracking-wider mb-1">
                Commercial Space Type *
              </label>
              <select
                name="space"
                required
                defaultValue=""
                aria-invalid={Boolean(errors.space)}
                onChange={() => clearError("space")}
                className={fieldClass("space")}
              >
                <option value="" disabled>
                  Select commercial space type
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
                <option value="Executive Workspace">Executive Workspace</option>
                <option value="Meeting & Conference Spaces">
                  Meeting &amp; Conference Spaces
                </option>
                <option value="Reception Areas">Reception Areas</option>
                <option value="Turnkey Interiors">
                  Turnkey Commercial Fitout
                </option>
              </select>
              <ErrorMessage field="space" />
            </div>

            {/* Submit */}
            <div className="pt-2">
              <button
                type="submit"
                className="w-full gold-gradient-btn py-3.5 rounded-lg text-white font-semibold text-sm sm:text-base tracking-wide flex items-center justify-center gap-2 group shadow-md"
              >
                Get a Free Consultation
                <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
              </button>
            </div>

            <div className="flex items-center justify-center gap-2 pt-1 text-[11px] text-[#857e75]">
              <ShieldCheck className="w-3.5 h-3.5 text-[#a67c33]" />
              <span>No obligation. No pressure. 100% Confidential.</span>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
