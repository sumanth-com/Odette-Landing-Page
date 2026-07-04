"use client";

import { motion } from "framer-motion";
import { type ReactNode } from "react";

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
      whileHover={{ y: -2, boxShadow: "0 8px 24px rgba(199, 164, 106, 0.35)" }}
      whileTap={{ scale: 0.98 }}
      transition={{ duration: 0.3, ease: "easeOut" }}
      className={`
        inline-flex items-center justify-center gap-2
        rounded-full bg-gold font-semibold text-charcoal
        shadow-[0_4px_16px_rgba(199,164,106,0.25)]
        transition-colors duration-300 hover:bg-gold-hover
        focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold focus-visible:ring-offset-2
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
  title: string;
  subtitle?: string;
  centered?: boolean;
  light?: boolean;
  compact?: boolean;
}

export function SectionHeading({
  title,
  subtitle,
  centered = false,
  light = false,
  compact = false,
}: SectionHeadingProps) {
  return (
    <div className={`${compact ? "mb-8 md:mb-10" : "mb-14 md:mb-16"} ${centered ? "text-center" : ""}`}>
      <h2
        className={`font-display leading-tight tracking-tight ${
          compact ? "text-2xl md:text-3xl lg:text-[2.25rem]" : "text-3xl md:text-4xl lg:text-[2.75rem]"
        } ${light ? "text-white" : "text-charcoal"}`}
      >
        {title}
      </h2>
      {subtitle && (
        <p
          className={`mt-4 max-w-2xl leading-relaxed ${
            compact ? "text-sm md:text-base" : "mt-5 text-base md:text-lg"
          } ${centered ? "mx-auto" : ""} ${light ? "text-white/75" : "text-taupe"}`}
        >
          {subtitle}
        </p>
      )}
      <div
        className={`h-px w-16 bg-gold ${compact ? "mt-5" : "mt-8"} ${centered ? "mx-auto" : ""}`}
        aria-hidden="true"
      />
    </div>
  );
}
