"use client";

import { motion } from "framer-motion";
import { type ReactNode } from "react";
import { fadeUp } from "./AnimatedSection";

interface GoldButtonProps {
  children: ReactNode;
  fullWidth?: boolean;
  size?: "default" | "large";
  className?: string;
  type?: "button" | "submit" | "reset";
  disabled?: boolean;
  onClick?: () => void;
}

export function GoldButton({
  children,
  fullWidth = false,
  size = "default",
  className = "",
  type = "button",
  disabled = false,
  onClick,
}: GoldButtonProps) {
  const sizeClasses =
    size === "large"
      ? "px-10 py-4 text-base"
      : "px-8 py-3.5 text-sm";

  return (
    <motion.button
      whileHover={{ y: -2, boxShadow: "0 8px 24px rgba(91, 45, 139, 0.35)" }}
      whileTap={{ scale: 0.98 }}
      transition={{ duration: 0.3, ease: "easeOut" }}
      className={`
        inline-flex items-center justify-center gap-2
        rounded-full bg-cta font-semibold text-white
        shadow-[0_4px_16px_rgba(91,45,139,0.28)]
        transition-colors duration-300 hover:bg-cta-hover
        focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cta focus-visible:ring-offset-2
        disabled:cursor-not-allowed disabled:opacity-60
        ${sizeClasses}
        ${fullWidth ? "w-full" : ""}
        ${className}
      `}
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
  title: string;
  tagline?: string;
  subtitle?: string;
  centered?: boolean;
  light?: boolean;
  compact?: boolean;
  dense?: boolean;
}

export function SectionPill({ children }: { children: ReactNode }) {
  return (
    <span className="inline-flex items-center rounded-full border border-cta/20 bg-white px-4 py-1.5 text-[11px] font-semibold uppercase tracking-[0.12em] text-charcoal">
      {children}
    </span>
  );
}

export function CardTitleHighlight({ children }: { children: ReactNode }) {
  return (
    <div className="flex justify-center">
      <span className="inline-flex items-center rounded-full bg-cta px-4 py-1.5 font-display text-sm font-semibold text-white shadow-[0_2px_10px_rgba(91,45,139,0.22)] sm:px-5 sm:py-2 sm:text-[15px]">
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
}: SectionHeadingProps) {
  return (
    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.3 }}
      variants={fadeUp}
      className={`${
        dense ? "mb-3" : compact ? "mb-3 lg:mb-5" : "mb-14 md:mb-16"
      } ${centered ? "text-center" : ""}`}
    >
      {pill && (
        <div className={`${dense ? "mb-2" : "mb-3"} ${centered ? "flex justify-center" : ""}`}>
          <SectionPill>{pill}</SectionPill>
        </div>
      )}
      <h2
        className={`font-display leading-tight tracking-tight ${
          dense
            ? "text-xl md:text-2xl lg:text-[1.75rem]"
            : compact
              ? "text-2xl md:text-3xl lg:text-[2.25rem]"
              : "text-3xl md:text-4xl lg:text-[2.75rem]"
        } ${light ? "text-white" : "text-charcoal"}`}
      >
        {title}
      </h2>
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
            dense
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
        className={`h-px w-16 bg-cta ${dense ? "mt-3" : compact ? "mt-3 lg:mt-4" : "mt-8"} ${centered ? "mx-auto" : ""}`}
        aria-hidden="true"
      />
    </motion.div>
  );
}
