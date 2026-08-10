"use client";

import {
  getLocationSuggestionsForState,
  INDIAN_STATES,
  resolveIndianState,
  STATE_DISPLAY_LABELS,
} from "@/lib/indianLocations";
import { trackGenerateLead } from "@/lib/analytics";
import { THANK_YOU_PATH } from "@/lib/site";
import { submitLead } from "@/lib/submitLead";
import {
  Mail,
  Phone,
  Send,
  Shield,
  UserRound,
} from "lucide-react";
import { FormEvent, type ReactNode, useMemo, useState } from "react";
import { FormAutocomplete } from "./FormAutocomplete";
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
  footer?: ReactNode;
}

const budgetOptions = [
  "₹45 Lakhs",
  "₹45–75 Lakhs",
  "Above ₹75 Lakhs",
] as const;

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
      <span className="flex w-10 shrink-0 items-center justify-center border-r border-border/80 bg-[#f7f5f2] text-charcoal/80" aria-hidden>
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
  footer,
}: EnquiryFormProps) {
  const [submitError, setSubmitError] = useState("");
  const [mobileError, setMobileError] = useState("");
  const [emailError, setEmailError] = useState("");
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

  const cityOptions = useMemo(
    () =>
      getLocationSuggestionsForState(formData.state).map((location) => ({
        value: location,
        label: location,
      })),
    [formData.state]
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
    const resolved = resolveIndianState(state);
    setFormData((prev) => ({
      ...prev,
      state: resolved ?? state,
      city: "",
    }));
    if (locationError) setLocationError("");
  };

  const goToThankYou = () => {
    window.location.assign(THANK_YOU_PATH);
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    if (formData.mobile.length !== 10) {
      setMobileError("Please enter a valid 10-digit mobile number.");
      return;
    }

    const emailValue = formData.email.trim();
    if (!emailValue) {
      setEmailError("Please enter your email address.");
      return;
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(emailValue)) {
      setEmailError("Please enter a valid email address.");
      return;
    }

    const stateValue = formData.state.trim();
    if (!stateValue) {
      setLocationError("Please enter your state.");
      return;
    }

    const cityValue = formData.city.trim();
    if (!cityValue) {
      setLocationError("Please enter your city.");
      return;
    }

    if (showBudget && !formData.investmentBudget) {
      return;
    }

    setIsSubmitting(true);
    setSubmitError("");

    const resolvedState = resolveIndianState(stateValue) ?? stateValue;
    const leadPayload = {
      fullName: formData.fullName.trim(),
      mobileNumber: `${formData.countryCode} ${formData.mobile}`,
      email: emailValue,
      state: resolvedState,
      city: cityValue,
      investmentBudget: formData.investmentBudget,
    };

    type SettleResult =
      | { status: "ok" }
      | { status: "error"; message: string };

    const settlement: { current: SettleResult | null } = { current: null };

    const submission = submitLead(leadPayload)
      .then((): SettleResult => {
        const okResult: SettleResult = { status: "ok" };
        settlement.current = okResult;
        trackGenerateLead();
        return okResult;
      })
      .catch((error): SettleResult => {
        const errResult: SettleResult = {
          status: "error",
          message:
            error instanceof Error
              ? error.message
              : "Unable to submit your inquiry. Please try again.",
        };
        settlement.current = errResult;
        return errResult;
      });

    // Show thank-you within ~0.5–1s; don't wait on slow email/Sheets
    await Promise.race([
      submission,
      new Promise<void>((resolve) => {
        window.setTimeout(resolve, 700);
      }),
    ]);

    if (settlement.current?.status === "error") {
      setSubmitError(settlement.current.message);
      setIsSubmitting(false);
      return;
    }

    if (!settlement.current) {
      trackGenerateLead();
    }

    goToThankYou();
  };

  if (isHero) {
    const cityEnabled = Boolean(formData.state);

    return (
      <div className={shellClasses}>
        {showHeading && (
          <div className="flex flex-col items-center text-center">
            <div className="flex h-11 w-11 items-center justify-center rounded-full border border-border/60 bg-white shadow-sm">
              <UserRound className="h-5 w-5 text-cta" strokeWidth={2.5} aria-hidden />
            </div>
            <h2 className="mt-3 font-display text-[15px] font-semibold leading-tight text-charcoal sm:text-base lg:whitespace-nowrap xl:text-[17px]">
              {heading}
            </h2>
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
          <HeroIconField icon={<UserRound className="h-4 w-4 text-charcoal/85" strokeWidth={2.5} aria-hidden />}>
            <label htmlFor={`${id}-name`} className="sr-only">
              {nameLabel}
            </label>
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
            <label htmlFor={`${id}-country-code`} className="sr-only">
              Country code
            </label>
            <FormSelect
              id={`${id}-country-code`}
              value={formData.countryCode}
              onChange={(code) => setFormData({ ...formData, countryCode: code })}
              options={countryOptions}
              placeholder="Code"
              fieldClassName={`${heroFieldClass} px-2.5`}
            />
            <HeroIconField icon={<Phone className="h-4 w-4 text-charcoal/85" strokeWidth={2.5} aria-hidden />}>
              <label htmlFor={`${id}-mobile`} className="sr-only">
                {phoneLabel}
              </label>
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
            <>
              <HeroIconField
                className="hero-form-email-field"
                icon={<Mail className="h-4 w-4 text-charcoal/85" strokeWidth={2.5} aria-hidden />}
              >
                <label htmlFor={`${id}-email`} className="sr-only">
                  Email address
                </label>
                <input
                  id={`${id}-email`}
                  type="email"
                  required
                  autoComplete="email"
                  placeholder="Email address"
                  className={heroInputClass}
                  value={formData.email}
                  onChange={(e) => {
                    setFormData({ ...formData, email: e.target.value });
                    if (emailError) setEmailError("");
                  }}
                  aria-invalid={!!emailError}
                  aria-describedby={emailError ? `${id}-email-error` : undefined}
                />
              </HeroIconField>
              {emailError && (
                <p id={`${id}-email-error`} className="-mt-1 text-xs text-red-600/80">
                  {emailError}
                </p>
              )}
            </>
          )}

          <div
            className={`grid gap-2 ${
              stackStateCityOnMobile ? "grid-cols-1 lg:grid-cols-2" : "grid-cols-2"
            }`}
          >
            <label htmlFor={`${id}-state`} className="sr-only">
              State
            </label>
            <FormAutocomplete
              id={`${id}-state`}
              value={formData.state}
              onChange={handleStateChange}
              options={stateOptions}
              placeholder="State"
              allowCustom
              fieldClassName={`${heroFieldClass} pr-8`}
              inputClassName="px-2.5 pr-7"
              emptyMessage="No match — type your state"
              aria-invalid={!!locationError}
              aria-describedby={locationError ? `${id}-location-error` : undefined}
            />
            <label htmlFor={`${id}-city`} className="sr-only">
              City
            </label>
            <FormAutocomplete
              id={`${id}-city`}
              value={formData.city}
              onChange={(city) => {
                setFormData({ ...formData, city });
                if (locationError) setLocationError("");
              }}
              options={cityOptions}
              placeholder={cityEnabled ? "City / district" : "Select state first"}
              disabled={!cityEnabled}
              allowCustom
              fieldClassName={`${heroFieldClass} pr-8 ${
                cityEnabled ? "" : "cursor-not-allowed bg-[#f7f5f2] text-charcoal/45"
              }`}
              inputClassName="px-2.5 pr-7"
              emptyMessage="No match — type your city or district"
              aria-invalid={!!locationError}
              aria-describedby={locationError ? `${id}-location-error` : undefined}
            />
          </div>

          {locationError && (
            <p id={`${id}-location-error`} className="-mt-1 text-xs text-red-600/80">
              {locationError}
            </p>
          )}

          {submitError && (
            <p className="-mt-1 text-xs text-red-600/80" role="alert">
              {submitError}
            </p>
          )}

          {showBudget && (
            <>
              <label htmlFor={`${id}-budget`} className="sr-only">
                Investment budget
              </label>
              <FormSelect
                id={`${id}-budget`}
              value={formData.investmentBudget}
              onChange={(budget) => setFormData({ ...formData, investmentBudget: budget })}
              options={budgetSelectOptions}
              placeholder="Select budget"
              fieldClassName={`${heroFieldClass} px-3.5 pr-3`}
              />
            </>
          )}

          <div className="mt-auto flex flex-col gap-2.5 pt-4">
            <GoldButton
              type="submit"
              fullWidth
              staticButton
              disabled={isSubmitting}
              className="hero-form-cta min-h-[2.75rem] py-2.5 text-xs sm:text-[13px]"
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

        {footer ? (
          <div className="mt-3 shrink-0 border-t border-border/50 pt-2.5">{footer}</div>
        ) : null}
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
              Email
            </label>
            <input
              id={`${id}-email`}
              type="email"
              required
              autoComplete="email"
              placeholder="Email address"
              className={inputClasses}
              value={formData.email}
              onChange={(e) => {
                setFormData({ ...formData, email: e.target.value });
                if (emailError) setEmailError("");
              }}
              aria-invalid={!!emailError}
              aria-describedby={emailError ? `${id}-email-error` : undefined}
            />
            {emailError && (
              <p id={`${id}-email-error`} className="mt-1.5 text-xs text-red-600/80">
                {emailError}
              </p>
            )}
          </div>
        )}

        <div>
          <div className="grid grid-cols-2 gap-2.5">
            <div className="min-w-0">
              <label htmlFor={`${id}-state`} className={labelClasses}>
                State
              </label>
              <FormAutocomplete
                id={`${id}-state`}
                value={formData.state}
                onChange={handleStateChange}
                options={stateOptions}
                placeholder="Type or select state"
                allowCustom
                fieldClassName={`${inputClasses} relative pr-8`}
                inputClassName="px-3 pr-7"
                emptyMessage="No match — type your state"
                aria-invalid={!!locationError}
                aria-describedby={locationError ? `${id}-location-error` : undefined}
              />
            </div>

            <div className="min-w-0">
              <label htmlFor={`${id}-city`} className={labelClasses}>
                City
              </label>
              <FormAutocomplete
                id={`${id}-city`}
                value={formData.city}
                onChange={(city) => {
                  setFormData({ ...formData, city });
                  if (locationError) setLocationError("");
                }}
                options={cityOptions}
                placeholder={cityEnabled ? "City / district / mandal" : "Select state first"}
                disabled={!cityEnabled}
                allowCustom
                fieldClassName={`${inputClasses} relative pr-8 ${
                  cityEnabled ? "bg-white text-charcoal" : "cursor-not-allowed bg-gray-50 text-taupe/70"
                }`}
                inputClassName="px-3 pr-7"
                emptyMessage="No match — type your city or district"
                aria-invalid={!!locationError}
                aria-describedby={locationError ? `${id}-location-error` : undefined}
              />
            </div>
          </div>

          {locationError && (
            <p id={`${id}-location-error`} className="mt-1.5 text-xs text-red-600/80">
              {locationError}
            </p>
          )}
        </div>

        {submitError && (
          <p className="text-xs text-red-600/80" role="alert">
            {submitError}
          </p>
        )}

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
