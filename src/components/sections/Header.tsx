"use client";

import Logo from "@/assets/Logo.webp";
import { motion } from "framer-motion";
import Image from "next/image";
import { useEffect, useState } from "react";

export function Header() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };

    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <motion.header
      initial={false}
      animate={{
        backgroundColor: scrolled ? "rgba(255, 255, 255, 0.98)" : "rgba(255, 255, 255, 0)",
        boxShadow: scrolled
          ? "0 1px 0 rgba(230, 221, 210, 0.8), 0 4px 24px rgba(43, 43, 43, 0.04)"
          : "0 0 0 rgba(0,0,0,0)",
      }}
      transition={{ duration: 0.4, ease: "easeOut" }}
      className="fixed left-0 right-0 top-0 z-50 h-[var(--header-height)] backdrop-blur-sm"
    >
      <div className="page-container flex h-full items-center">
        <div className="flex items-center gap-3 md:gap-3.5">
          <Image
            src={Logo}
            alt=""
            aria-hidden
            priority
            className="h-9 w-9 object-contain md:h-10 md:w-10"
          />
          <span className="font-display text-[1.35rem] leading-none tracking-[0.04em] text-charcoal md:text-[1.5rem]">
            Odette
          </span>
        </div>
      </div>
    </motion.header>
  );
}
