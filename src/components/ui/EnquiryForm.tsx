"use client";

import { CITIES_BY_STATE, INDIAN_STATES, STATE_DISPLAY_LABELS, type IndianState } from "@/lib/indianLocations";
import { submitLead } from "@/lib/submitLead";
import { motion } from "framer-motion";
import {
  Mail,
  Phone,
  Send,
  Shield,
  UserRound,
} from "lucide-react";
import { FormEvent, type ReactNode, useMemo, useState } from "react";
import { FormSelect } from "./FormSelect";
import { GoldButton } from "./GoldButton";

export interface EnquiryFormData {
  fullName: string;
  countryCode: string;
  mobile: string;
  email: string;
  state: string;
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
  stackStateCityOnMobile?: boolean;
  showSecurityNote?: boolean;
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

function resolveStateFromCity(city: string) {
  const normalized = city.trim().toLowerCase();
  if (!normalized) return "";

  for (const state of INDIAN_STATES) {
    const cities = CITIES_BY_STATE[state];
    if (cities.some((entry) => entry.toLowerCase() === normalized)) {
      return state;
    }
  }

  return "";
}

function HeroIconField({
  icon,
  children,
  className = "",
}: {
  icon: ReactNode;
  children: ReactNode;
  className?: string;
}) {
  return (
    <div
      className={`flex h-10 w-full min-w-0 items-stretch overflow-hidden rounded-xl border border-border bg-white shadow-[0_1px_4px_rgba(43,43,43,0.08)] focus-within:border-cta focus-within:ring-[3px] focus-within:ring-cta/20 ${className}`}
    >
      <span className="flex w-10 shrink-0 items-center justify-center border-r border-border/80 bg-[#f7f5f2] text-charcoal/80">
        {icon}
      </span>
      <div className="flex min-w-0 flex-1 items-center">{children}</div>
    </div>
  );
}

export function EnquiryForm({
  heading = "Check if This Opportunity is Right for You",
  buttonText = "Book Free Consultation",
  helperText = "",
  variant = "hero",
  showEmail = true,
  showBudget = true,
  showHeading = true,
  nameLabel = "Full Name",
  phoneLabel = "Mobile Number",
  id = "enquiry-form",
  stackStateCityOnMobile = false,
  showSecurityNote = true,
}: EnquiryFormProps) {
  const [submitted, setSubmitted] = useState(false);
  const [mobileError, setMobileError] = useState("");
  const [locationError, setLocationError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState<EnquiryFormData>({
    fullName: "",
    countryCode: "+91",
    mobile: "",
    email: "",
    state: "",
    city: "",
    investmentBudget: "",
  });

  const isHero = variant === "hero";

  const stateOptions = useMemo(
    () =>
      INDIAN_STATES.map((state) => ({
        value: state,
        label: STATE_DISPLAY_LABELS[state],
        title: state,
      })),
    []
  );

  const budgetSelectOptions = useMemo(
    () => budgetOptions.map((option) => ({ value: option, label: option })),
    []
  );

  const countryOptions = useMemo(
    () => countryCodes.map((item) => ({ value: item.code, label: item.label })),
    []
  );

  const heroFieldClass =
    "form-field-hero gold-focus flex w-full min-w-0 items-center rounded-xl border border-border bg-white text-sm font-medium text-charcoal shadow-[0_1px_4px_rgba(43,43,43,0.08)] placeholder:font-normal placeholder:text-charcoal/50";

  const heroInputClass =
    "h-10 w-full min-w-0 border-0 bg-transparent px-3 text-sm font-medium text-charcoal placeholder:font-normal placeholder:text-charcoal/50 focus:outline-none";

  const inputClasses = isHero
    ? heroFieldClass
    : "form-field-secondary gold-focus w-full min-w-0 rounded-2xl border border-border bg-white text-sm text-charcoal placeholder:text-taupe/60 transition-all duration-300 md:text-base";

  const labelClasses = isHero
    ? "mb-1.5 block text-[11px] font-medium uppercase tracking-wider text-taupe"
    : "mb-2 block text-xs font-medium uppercase tracking-wider text-taupe";

  const shellClasses = isHero
    ? "hero-form-scroll flex h-full w-full max-w-full flex-col overflow-y-auto rounded-[20px] border border-white bg-white/90 p-4 shadow-[0_16px_48px_rgba(43,43,43,0.16)] backdrop-blur-2xl sm:p-5"
    : `luxury-shadow-lg w-full max-w-full rounded-[22px] bg-white p-8 md:p-10`;

  const handleMobileChange = (value: string) => {
    const digits = value.replace(/\D/g, "").slice(0, 10);
    setFormData({ ...formData, mobile: digits });
    if (mobileError) setMobileError("");
  };

  const handleStateChange = (state: string) => {
    setFormData((prev) => ({ ...prev, state, city: "" }));
    if (locationError) setLocationError("");
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    if (formData.mobile.length !== 10) {
      setMobileError("Please enter a valid 10-digit mobile number.");
      return;
    }

    const resolvedState = formData.state || resolveStateFromCity(formData.city);

    if (isHero && !formData.state) {
      setLocationError("Please select your state.");
      return;
    }

    if (!resolvedState) {
      setLocationError("Please enter a valid city from the suggestions.");
      return;
    }

    if (!formData.city.trim()) {
      setLocationError("Please enter your city.");
      return;
    }

    if (showBudget && !formData.investmentBudget) {
      return;
    }

    setIsSubmitting(true);

    const cityValue = formData.city.trim();

    try {
      await submitLead({
        fullName: formData.fullName.trim(),
        mobileNumber: `${formData.countryCode} ${formData.mobile}`,
        email: formData.email.trim(),
        state: resolvedState,
        city: cityValue,
        investmentBudget: formData.investmentBudget,
      });

      setSubmitted(true);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleSubmitAnother = () => {
    setSubmitted(false);
    setMobileError("");
    setLocationError("");
    setFormData({
      fullName: "",
      countryCode: "+91",
      mobile: "",
      email: "",
      state: "",
      city: "",
      investmentBudget: "",
    });
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
          <div className="mb-6 flex h-16 w-16 items-center justify-center rounded-full bg-gray-100">
            <svg className="h-8 w-8 text-cta" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M5 13l4 4L19 7" />
            </svg>
          </div>
          <h3 className="font-display text-2xl text-charcoal">Thank You</h3>
          <p className="mt-3 max-w-xs text-sm leading-relaxed text-taupe">
            Our franchise consultant will contact you within one business day.
          </p>
          <div className="mt-8 w-full max-w-xs">
            <GoldButton
              type="button"
              fullWidth
              size={isHero ? "default" : "large"}
              staticButton={isHero}
              onClick={handleSubmitAnother}
            >
              Submit Another Enquiry
            </GoldButton>
          </div>
        </div>
      </motion.div>
    );
  }

  if (isHero) {
    const cityEnabled = Boolean(formData.state);

    return (
      <div className={shellClasses}>
        {showHeading && (
          <div className="flex flex-col items-center text-center">
            <div className="flex h-11 w-11 items-center justify-center rounded-full border border-border/60 bg-white shadow-sm">
              <UserRound className="h-5 w-5 text-cta" strokeWidth={2.5} />
            </div>
            <h3 className="mt-3 font-display text-[15px] font-semibold leading-tight text-charcoal sm:text-base lg:whitespace-nowrap xl:text-[17px]">
              {heading}
            </h3>
            {helperText ? (
              <p className="mt-2.5 max-w-[18rem] text-xs leading-relaxed text-taupe sm:text-[13px]">
                {helperText}
              </p>
            ) : null}
          </div>
        )}

        <form
          id={id}
          onSubmit={handleSubmit}
          className={`${showHeading ? "mt-5" : "mt-0"} flex flex-1 flex-col gap-2.5`}
          noValidate
        >
          <HeroIconField icon={<UserRound className="h-4 w-4 text-charcoal/85" strokeWidth={2.5} />}>
            <input
              id={`${id}-name`}
              type="text"
              required
              autoComplete="name"
              placeholder="Enter your full name"
              className={heroInputClass}
              value={formData.fullName}
              onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
            />
          </HeroIconField>

          <div className="grid grid-cols-[6.25rem_minmax(0,1fr)] gap-2">
            <FormSelect
              id={`${id}-country-code`}
              value={formData.countryCode}
              onChange={(code) => setFormData({ ...formData, countryCode: code })}
              options={countryOptions}
              placeholder="Code"
              fieldClassName={`${heroFieldClass} px-2.5`}
            />
            <HeroIconField icon={<Phone className="h-4 w-4 text-charcoal/85" strokeWidth={2.5} />}>
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
                className={heroInputClass}
                value={formData.mobile}
                onChange={(e) => handleMobileChange(e.target.value)}
                aria-invalid={!!mobileError}
                aria-describedby={mobileError ? `${id}-mobile-error` : undefined}
              />
            </HeroIconField>
          </div>
          {mobileError && (
            <p id={`${id}-mobile-error`} className="-mt-1 text-xs text-red-600/80">
              {mobileError}
            </p>
          )}

          {showEmail && (
            <HeroIconField icon={<Mail className="h-4 w-4 text-charcoal/85" strokeWidth={2.5} />}>
              <input
                id={`${id}-email`}
                type="email"
                autoComplete="email"
                placeholder="Email address (optional)"
                className={heroInputClass}
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              />
            </HeroIconField>
          )}

          <div
            className={`grid gap-2 ${
              stackStateCityOnMobile ? "grid-cols-1 lg:grid-cols-2" : "grid-cols-2"
            }`}
          >
            <FormSelect
              id={`${id}-state`}
              value={formData.state}
              onChange={handleStateChange}
              options={stateOptions}
              placeholder="State"
              fieldClassName={`${heroFieldClass} px-2.5`}
            />
            <input
              id={`${id}-city`}
              type="text"
              required
              list={cityEnabled ? `${id}-city-suggestions` : undefined}
              autoComplete="address-level2"
              readOnly={!cityEnabled}
              placeholder={cityEnabled ? "City" : "Select state first"}
              className={`${heroFieldClass} px-2.5 ${
                cityEnabled
                  ? "text-charcoal"
                  : "cursor-not-allowed bg-[#f7f5f2] text-charcoal/45"
              }`}
              value={formData.city}
              onChange={(e) => {
                setFormData({ ...formData, city: e.target.value });
                if (locationError) setLocationError("");
              }}
              onFocus={(e) => {
                if (!cityEnabled) e.target.blur();
              }}
              aria-invalid={!!locationError}
              aria-describedby={locationError ? `${id}-location-error` : undefined}
            />
          </div>

          {cityEnabled && CITIES_BY_STATE[formData.state as IndianState]?.length > 0 && (
            <datalist id={`${id}-city-suggestions`}>
              {CITIES_BY_STATE[formData.state as IndianState].map((city) => (
                <option key={city} value={city} />
              ))}
            </datalist>
          )}
          {locationError && (
            <p id={`${id}-location-error`} className="-mt-1 text-xs text-red-600/80">
              {locationError}
            </p>
          )}

          {showBudget && (
            <FormSelect
              id={`${id}-budget`}
              value={formData.investmentBudget}
              onChange={(budget) => setFormData({ ...formData, investmentBudget: budget })}
              options={budgetSelectOptions}
              placeholder="Select budget"
              fieldClassName={`${heroFieldClass} px-3.5 pr-3`}
            />
          )}

          <div className="mt-auto flex flex-col gap-2.5 pt-4">
            <GoldButton
              type="submit"
              fullWidth
              staticButton
              disabled={isSubmitting}
            >
              {isSubmitting ? "Submitting..." : buttonText}
              {!isSubmitting && <Send className="h-4 w-4" strokeWidth={2} />}
            </GoldButton>

            {showSecurityNote ? (
              <p className="flex items-center justify-center gap-1.5 text-center text-[10px] leading-relaxed text-charcoal/65 sm:text-[11px]">
                <Shield className="h-3 w-3 shrink-0 text-charcoal/60" strokeWidth={2.5} />
                Your information is secure and will not be shared
              </p>
            ) : null}
          </div>
        </form>
      </div>
    );
  }

  const cityEnabled = Boolean(formData.state);

  return (
    <div className={shellClasses}>
      {showHeading && (
        <>
          <h3 className="font-display text-xl leading-snug text-charcoal md:text-2xl">{heading}</h3>
          <div className="divider-line my-6" aria-hidden="true" />
        </>
      )}

      <form id={id} onSubmit={handleSubmit} className="space-y-5" noValidate>
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
            <div className="w-[6.5rem] shrink-0 lg:w-[7rem]">
              <FormSelect
                id={`${id}-country-code`}
                value={formData.countryCode}
                onChange={(code) => setFormData({ ...formData, countryCode: code })}
                options={countryOptions}
                placeholder="Code"
                fieldClassName={inputClasses}
              />
            </div>
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
          {mobileError && (
            <p id={`${id}-mobile-error`} className="mt-1.5 text-xs text-red-600/80">
              {mobileError}
            </p>
          )}
        </div>

        {showEmail && (
          <div>
            <label htmlFor={`${id}-email`} className={labelClasses}>
              Email{" "}
              <span className="normal-case tracking-normal text-taupe/70">(Optional)</span>
            </label>
            <input
              id={`${id}-email`}
              type="email"
              autoComplete="email"
              placeholder="Email address"
              className={inputClasses}
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
            />
          </div>
        )}

        <div>
          <div className="grid grid-cols-2 gap-2.5">
            <div className="min-w-0">
              <label htmlFor={`${id}-state`} className={labelClasses}>
                State
              </label>
              <FormSelect
                id={`${id}-state`}
                value={formData.state}
                onChange={handleStateChange}
                options={stateOptions}
                placeholder="Select state"
                fieldClassName={inputClasses}
              />
            </div>

            <div className="min-w-0">
              <label htmlFor={`${id}-city`} className={labelClasses}>
                City
              </label>
              <input
                id={`${id}-city`}
                type="text"
                required
                list={cityEnabled ? `${id}-city-suggestions` : undefined}
                autoComplete="address-level2"
                readOnly={!cityEnabled}
                placeholder={cityEnabled ? "Type your city" : "Select state first"}
                className={`${inputClasses} ${
                  cityEnabled
                    ? "bg-white text-charcoal"
                    : "cursor-not-allowed bg-gray-50 text-taupe/70"
                }`}
                value={formData.city}
                onChange={(e) => {
                  setFormData({ ...formData, city: e.target.value });
                  if (locationError) setLocationError("");
                }}
                onFocus={(e) => {
                  if (!cityEnabled) e.target.blur();
                }}
                aria-invalid={!!locationError}
                aria-describedby={locationError ? `${id}-location-error` : undefined}
              />
            </div>
          </div>

          {cityEnabled && CITIES_BY_STATE[formData.state as IndianState]?.length > 0 && (
            <datalist id={`${id}-city-suggestions`}>
              {CITIES_BY_STATE[formData.state as IndianState].map((city) => (
                <option key={city} value={city} />
              ))}
            </datalist>
          )}
          {locationError && (
            <p id={`${id}-location-error`} className="mt-1.5 text-xs text-red-600/80">
              {locationError}
            </p>
          )}
        </div>

        {showBudget && (
          <div>
            <label htmlFor={`${id}-budget`} className={labelClasses}>
              Investment Budget
            </label>
            <FormSelect
              id={`${id}-budget`}
              value={formData.investmentBudget}
              onChange={(budget) => setFormData({ ...formData, investmentBudget: budget })}
              options={budgetSelectOptions}
              placeholder="Select budget"
              fieldClassName={inputClasses}
            />
          </div>
        )}

        <div className="pt-2">
          <GoldButton type="submit" fullWidth size="large" disabled={isSubmitting}>
            {isSubmitting ? "Submitting..." : buttonText}
          </GoldButton>
        </div>

        {helperText && (
          <p className="text-center text-[10px] leading-relaxed text-taupe lg:text-xs">{helperText}</p>
        )}
      </form>
    </div>
  );
}
