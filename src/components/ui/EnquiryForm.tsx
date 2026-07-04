"use client";

import { motion } from "framer-motion";
import { FormEvent, useState } from "react";
import { GoldButton } from "./GoldButton";

export interface EnquiryFormData {
  fullName: string;
  countryCode: string;
  mobile: string;
  email: string;
  city: string;
  investmentBudget: string;
}

interface EnquiryFormProps {
  heading?: string;
  buttonText?: string;
  helperText?: string;
  variant?: "hero" | "secondary";
  showEmail?: boolean;
  showBudget?: boolean;
  showHeading?: boolean;
  nameLabel?: string;
  phoneLabel?: string;
  id?: string;
}

const budgetOptions = [
  "₹25–45 Lakhs",
  "₹45–75 Lakhs",
  "Above ₹75 Lakhs",
];

const countryCodes = [
  { code: "+91", label: "IN +91" },
  { code: "+1", label: "US +1" },
  { code: "+44", label: "UK +44" },
  { code: "+971", label: "UAE +971" },
  { code: "+966", label: "SA +966" },
  { code: "+65", label: "SG +65" },
  { code: "+61", label: "AU +61" },
  { code: "+974", label: "QA +974" },
  { code: "+968", label: "OM +968" },
  { code: "+973", label: "BH +973" },
];

const selectChevron =
  "cursor-pointer appearance-none bg-[url('data:image/svg+xml;charset=utf-8,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%2224%22%20height%3D%2224%22%20viewBox%3D%220%200%2024%2024%22%20fill%3D%22none%22%20stroke%3D%22%23756A60%22%20stroke-width%3D%222%22%20stroke-linecap%3D%22round%22%20stroke-linejoin%3D%22round%22%3E%3Cpath%20d%3D%22m6%209%206%206%206-6%22%2F%3E%3C%2Fsvg%3E')] bg-size-[18px] bg-position-[right_10px_center] bg-no-repeat pr-9";

export function EnquiryForm({
  heading = "Check if This Opportunity is Right for You",
  buttonText = "Get Franchise Details",
  helperText = "Our franchise consultant will contact you within one business day.",
  variant = "hero",
  showEmail = true,
  showBudget = true,
  showHeading = true,
  nameLabel = "Full Name",
  phoneLabel = "Mobile Number",
  id = "enquiry-form",
}: EnquiryFormProps) {
  const [submitted, setSubmitted] = useState(false);
  const [mobileError, setMobileError] = useState("");
  const [formData, setFormData] = useState<EnquiryFormData>({
    fullName: "",
    countryCode: "+91",
    mobile: "",
    email: "",
    city: "",
    investmentBudget: "",
  });

  const isHero = variant === "hero";

  const inputClasses = isHero
    ? "gold-focus w-full rounded-xl border border-border bg-white px-3.5 py-2.5 text-sm text-charcoal placeholder:text-taupe/60 transition-all duration-300"
    : "gold-focus w-full rounded-2xl border border-border bg-white px-5 py-4 text-sm text-charcoal placeholder:text-taupe/60 transition-all duration-300 md:text-base";

  const labelClasses = isHero
    ? "mb-1 block text-[11px] font-medium uppercase tracking-wider text-taupe"
    : "mb-2 block text-xs font-medium uppercase tracking-wider text-taupe";

  const shellClasses = `luxury-shadow-lg w-full rounded-[22px] bg-white ${
    isHero ? "p-5 lg:p-6" : "p-8 md:p-10"
  }`;

  const handleMobileChange = (value: string) => {
    const digits = value.replace(/\D/g, "").slice(0, 10);
    setFormData({ ...formData, mobile: digits });
    if (mobileError) setMobileError("");
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();

    if (formData.mobile.length !== 10) {
      setMobileError("Please enter a valid 10-digit mobile number.");
      return;
    }

    setSubmitted(true);
  };

  if (submitted) {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.98 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className={shellClasses}
      >
        <div className="flex flex-col items-center py-8 text-center">
          <div className="mb-6 flex h-16 w-16 items-center justify-center rounded-full bg-beige">
            <svg className="h-8 w-8 text-gold" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M5 13l4 4L19 7" />
            </svg>
          </div>
          <h3 className="font-display text-2xl text-charcoal">Thank You</h3>
          <p className="mt-3 max-w-xs text-sm leading-relaxed text-taupe">
            Our franchise consultant will contact you within one business day.
          </p>
        </div>
      </motion.div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, ease: "easeOut", delay: 0.3 }}
      className={shellClasses}
    >
      {showHeading && (
        <>
          <h3
            className={`font-display leading-snug text-charcoal ${
              isHero ? "text-base lg:text-lg" : "text-xl md:text-2xl"
            }`}
          >
            {heading}
          </h3>
          <div className={`divider-line ${isHero ? "my-4" : "my-6"}`} aria-hidden="true" />
        </>
      )}

      <form id={id} onSubmit={handleSubmit} className={isHero ? "space-y-3" : "space-y-5"} noValidate>
        <div>
          <label htmlFor={`${id}-name`} className={labelClasses}>
            {nameLabel}
          </label>
          <input
            id={`${id}-name`}
            type="text"
            required
            autoComplete="name"
            placeholder="Enter your full name"
            className={inputClasses}
            value={formData.fullName}
            onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
          />
        </div>

        <div>
          <label htmlFor={`${id}-mobile`} className={labelClasses}>
            {phoneLabel}
          </label>
          <div className="flex gap-2">
            <select
              id={`${id}-country-code`}
              aria-label="Country code"
              value={formData.countryCode}
              onChange={(e) => setFormData({ ...formData, countryCode: e.target.value })}
              className={`${inputClasses} ${selectChevron} w-[6.75rem] shrink-0 px-2.5 text-xs lg:w-[7.25rem] lg:text-sm`}
            >
              {countryCodes.map((item) => (
                <option key={item.code} value={item.code}>
                  {item.label}
                </option>
              ))}
            </select>
            <input
              id={`${id}-mobile`}
              type="tel"
              required
              inputMode="numeric"
              autoComplete="tel-national"
              placeholder="10-digit number"
              pattern="[0-9]{10}"
              minLength={10}
              maxLength={10}
              className={`${inputClasses} min-w-0 flex-1`}
              value={formData.mobile}
              onChange={(e) => handleMobileChange(e.target.value)}
              aria-invalid={!!mobileError}
              aria-describedby={mobileError ? `${id}-mobile-error` : undefined}
            />
          </div>
          {mobileError ? (
            <p id={`${id}-mobile-error`} className="mt-1.5 text-xs text-red-600/80">
              {mobileError}
            </p>
          ) : (
            !isHero && (
              <p className="mt-1 text-[10px] text-taupe/80">Enter 10 digits without spaces</p>
            )
          )}
        </div>

        {showEmail && (
          <div>
            <label htmlFor={`${id}-email`} className={labelClasses}>
              Email Address{" "}
              <span className="normal-case tracking-normal text-taupe/70">(Optional)</span>
            </label>
            <input
              id={`${id}-email`}
              type="email"
              autoComplete="email"
              placeholder="Enter your email address"
              className={inputClasses}
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
            />
          </div>
        )}

        <div>
          <label htmlFor={`${id}-city`} className={labelClasses}>
            City
          </label>
          <input
            id={`${id}-city`}
            type="text"
            required
            autoComplete="address-level2"
            placeholder="Enter your city"
            className={inputClasses}
            value={formData.city}
            onChange={(e) => setFormData({ ...formData, city: e.target.value })}
          />
        </div>

        {showBudget && (
          <div>
            <label htmlFor={`${id}-budget`} className={labelClasses}>
              Investment Budget
            </label>
            <select
              id={`${id}-budget`}
              required
              className={`${inputClasses} ${selectChevron} pr-10`}
              value={formData.investmentBudget}
              onChange={(e) => setFormData({ ...formData, investmentBudget: e.target.value })}
            >
              <option value="" disabled>
                Select investment budget
              </option>
              {budgetOptions.map((option) => (
                <option key={option} value={option}>
                  {option}
                </option>
              ))}
            </select>
          </div>
        )}

        <div className={isHero ? "pt-0.5" : "pt-2"}>
          <GoldButton type="submit" fullWidth size={isHero ? "default" : "large"}>
            {buttonText}
          </GoldButton>
        </div>

        {helperText && (
          <p className="text-center text-[10px] leading-relaxed text-taupe lg:text-xs">{helperText}</p>
        )}
      </form>
    </motion.div>
  );
}
