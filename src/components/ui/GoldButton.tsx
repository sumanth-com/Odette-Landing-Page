"use client";

import { motion } from "framer-motion";
import { type ReactNode } from "react";
import { fadeUp } from "./AnimatedSection";

export const ctaButtonBase =
  "inline-flex items-center justify-center gap-1.5 rounded-full bg-cta font-semibold text-white shadow-[0_4px_16px_rgba(91,45,139,0.22)] transition-colors duration-200 hover:bg-cta-hover focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cta focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-60";

export const ctaButtonSize =
  "px-5 py-2.5 text-[13px] leading-snug lg:px-8 lg:py-3.5 lg:text-sm";

export const ctaButtonSizeLarge =
  "px-5 py-2.5 text-[13px] leading-snug lg:px-10 lg:py-4 lg:text-base";

export function ctaButtonClass({
  fullWidth = false,
  large = false,
}: {
  fullWidth?: boolean;
  large?: boolean;
} = {}) {
  return `${ctaButtonBase} ${large ? ctaButtonSizeLarge : ctaButtonSize}${
    fullWidth ? " w-full flex" : ""
  }`;
}

interface GoldButtonProps {
  children: ReactNode;
  fullWidth?: boolean;
  size?: "default" | "large";
  className?: string;
  type?: "button" | "submit" | "reset";
  disabled?: boolean;
  onClick?: () => void;
  staticButton?: boolean;
}

export function GoldButton({
  children,
  fullWidth = false,
  size = "default",
  className = "",
  type = "button",
  disabled = false,
  onClick,
  staticButton = false,
}: GoldButtonProps) {
  const buttonClassName = `${ctaButtonClass({ fullWidth, large: size === "large" })} ${
    staticButton ? "" : ""
  } ${className}`;

  if (staticButton) {
    return (
      <button
        className={buttonClassName}
        type={type}
        disabled={disabled}
        onClick={onClick}
      >
        {children}
      </button>
    );
  }

  return (
    <motion.button
      whileHover={{ y: -2, boxShadow: "0 8px 24px rgba(91, 45, 139, 0.35)" }}
      whileTap={{ scale: 0.98 }}
      transition={{ duration: 0.3, ease: "easeOut" }}
      className={buttonClassName}
      type={type}
      disabled={disabled}
      onClick={onClick}
    >
      {children}
    </motion.button>
  );
}

interface SectionHeadingProps {
  pill?: string;
  title?: string;
  tagline?: string;
  subtitle?: string;
  centered?: boolean;
  light?: boolean;
  compact?: boolean;
  dense?: boolean;
  tight?: boolean;
}

export function SectionPill({ children }: { children: ReactNode }) {
  return (
    <span className="inline-flex items-center rounded-full border border-cta/20 bg-white px-4 py-1.5 text-[11px] font-semibold uppercase tracking-[0.12em] text-charcoal">
      {children}
    </span>
  );
}

export function CardTitleHighlight({
  children,
  compact = false,
}: {
  children: ReactNode;
  compact?: boolean;
}) {
  return (
    <div className="flex shrink-0 justify-center">
      <span
        className={`inline-flex items-center rounded-full bg-cta font-display font-semibold text-white shadow-[0_2px_10px_rgba(91,45,139,0.22)] ${
          compact
            ? "px-3.5 py-1 text-xs sm:px-4 sm:py-1.5 sm:text-sm"
            : "px-4 py-1.5 text-sm sm:px-5 sm:py-2 sm:text-[15px]"
        }`}
      >
        {children}
      </span>
    </div>
  );
}

export function SectionHeading({
  pill,
  title,
  tagline,
  subtitle,
  centered = false,
  light = false,
  compact = false,
  dense = false,
  tight = false,
}: SectionHeadingProps) {
  const spacing = tight ? "mb-2 lg:mb-2.5" : dense ? "mb-3" : compact ? "mb-3 lg:mb-5" : "mb-14 md:mb-16";

  return (
    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.3 }}
      variants={fadeUp}
      className={`shrink-0 ${spacing} ${centered ? "text-center" : ""}`}
    >
      {pill && (
        <div
          className={`${tight ? "mb-1.5" : dense ? "mb-2" : "mb-3"} ${centered ? "flex justify-center" : ""}`}
        >
          <SectionPill>{pill}</SectionPill>
        </div>
      )}
      {title ? (
        <h2
          className={`font-display leading-tight tracking-tight ${
            tight
              ? "text-lg md:text-xl lg:text-[1.65rem]"
              : dense
                ? "text-xl md:text-2xl lg:text-[1.75rem]"
                : compact
                  ? "text-2xl md:text-3xl lg:text-[2.25rem]"
                  : "text-3xl md:text-4xl lg:text-[2.75rem]"
          } ${light ? "text-white" : "text-charcoal"}`}
        >
          {title}
        </h2>
      ) : null}
      {tagline && (
        <p
          className={`font-display font-semibold leading-snug ${
            dense
              ? "mt-2 text-sm sm:text-base"
              : compact
                ? "mt-2 text-base lg:mt-3 lg:text-lg"
                : "mt-4 text-lg md:text-xl"
          } ${centered ? "mx-auto" : ""} ${light ? "text-white/90" : "text-charcoal"}`}
        >
          {tagline}
        </p>
      )}
      {subtitle && (
        <p
          className={`leading-relaxed ${
            compact ? "max-w-4xl" : "max-w-2xl"
          } ${
            tight
              ? "mt-1.5 text-[11px] leading-snug sm:text-xs"
              : dense
                ? "mt-2 text-xs leading-snug sm:text-sm"
                : compact
                ? "mt-2 text-xs leading-snug lg:mt-3 lg:text-sm lg:leading-relaxed lg:text-base"
                : "mt-5 text-base md:text-lg"
          } ${centered ? "mx-auto" : ""} ${light ? "text-white/75" : "text-taupe"}`}
        >
          {subtitle}
        </p>
      )}
      <div
        className={`h-px w-16 bg-cta ${tight ? "mt-2" : dense ? "mt-3" : compact ? "mt-3 lg:mt-4" : "mt-8"} ${centered ? "mx-auto" : ""}`}
        aria-hidden="true"
      />
    </motion.div>
  );
}
