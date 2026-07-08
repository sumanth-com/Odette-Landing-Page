"use client";

import { SITE_IMAGES } from "@/lib/images";
import { ctaButtonClass } from "@/components/ui/GoldButton";
import { trackBookConsultation } from "@/lib/analytics";
import { CONTACT_PATH, NAV_LINKS, HOME_PATH, SECTION_ID_TO_PATH, type SectionId } from "@/lib/site";
import { isScrollingProgrammatically } from "@/lib/scroll";
import { useSectionNavigation } from "@/lib/useSectionNavigation";
import { AnimatePresence, motion } from "framer-motion";
import { Menu, X } from "lucide-react";
import Image from "next/image";
import { useEffect, useRef, useState, type MouseEvent } from "react";

const HEADER_HEIGHT_WITH_TAGLINE = "4.75rem";
const HEADER_HEIGHT_COMPACT = "4rem";

const SCROLL_SECTION_IDS = [
  "hero",
  "about-odette",
  "why-odette",
  "invest-process",
  "why-ifranchise",
  "faq",
  "contact",
] as const;

function navLinkClass(isActive: boolean) {
  return isActive
    ? "bg-white font-semibold text-cta shadow-[0_4px_16px_rgba(0,0,0,0.12)]"
    : "text-white/80 hover:bg-white/10 hover:text-white";
}

export function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [showHeroTagline, setShowHeroTagline] = useState(true);
  const [activeSection, setActiveSection] = useState<string>("hero");
  const { navigate } = useSectionNavigation();
  const urlSyncTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
    document.body.classList.toggle("mobile-menu-open", menuOpen);
    return () => {
      document.body.style.overflow = "";
      document.body.classList.remove("mobile-menu-open");
    };
  }, [menuOpen]);

  useEffect(() => {
    document.documentElement.style.setProperty(
      "--header-height",
      showHeroTagline ? HEADER_HEIGHT_WITH_TAGLINE : HEADER_HEIGHT_COMPACT
    );
  }, [showHeroTagline]);

  useEffect(() => {
    const hero = document.getElementById("hero");
    if (!hero) return;

    const heroObserver = new IntersectionObserver(
      ([entry]) => {
        setShowHeroTagline(entry.isIntersecting && entry.intersectionRatio > 0.35);
      },
      { threshold: [0, 0.35, 0.6, 1], rootMargin: "-10% 0px -55% 0px" }
    );

    heroObserver.observe(hero);

    const sections = SCROLL_SECTION_IDS.map((id) => document.getElementById(id)).filter(
      Boolean
    ) as HTMLElement[];

    const sectionObserver = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio);

        if (visible[0]) {
          const sectionId = visible[0].target.id as SectionId;
          setActiveSection(sectionId);

          if (isScrollingProgrammatically()) return;

          const path = SECTION_ID_TO_PATH[sectionId];
          if (!path || window.location.pathname === path) return;

          if (urlSyncTimer.current) {
            clearTimeout(urlSyncTimer.current);
          }

          urlSyncTimer.current = setTimeout(() => {
            if (!isScrollingProgrammatically() && window.location.pathname !== path) {
              window.history.replaceState({ sectionPath: path }, "", path);
            }
          }, 120);
        }
      },
      { threshold: [0, 0.2, 0.4, 0.6], rootMargin: "-25% 0px -55% 0px" }
    );

    sections.forEach((section) => sectionObserver.observe(section));

    return () => {
      heroObserver.disconnect();
      sectionObserver.disconnect();
      if (urlSyncTimer.current) {
        clearTimeout(urlSyncTimer.current);
      }
    };
  }, []);

  const closeMenu = () => setMenuOpen(false);

  const goToSection = (
    event: MouseEvent<HTMLAnchorElement>,
    href: string,
    onAfterScroll?: () => void
  ) => {
    if (href.startsWith("/")) {
      const sectionId =
        href === HOME_PATH
          ? "hero"
          : NAV_LINKS.find((link) => link.href === href)?.sectionId;

      if (sectionId) {
        setActiveSection(sectionId);
      }
    }

    navigate(event, href, onAfterScroll);
  };

  return (
    <>
      <header
        className={`fixed left-0 right-0 top-0 z-50 border-b border-white/10 bg-cta shadow-[0_4px_24px_rgba(43,43,43,0.12)] transition-[height] duration-300 ease-out ${
          showHeroTagline ? "h-[4.75rem]" : "h-16"
        }`}
      >
        <div className="page-container flex h-full items-center justify-between gap-4">
          <a
            href={HOME_PATH}
            onClick={(e) => goToSection(e, HOME_PATH)}
            className="flex min-w-0 shrink-0 items-center gap-2.5 sm:gap-3"
          >
            <Image
              src={SITE_IMAGES.brand.iFranchiseLogo.src}
              alt=""
              aria-hidden
              width={SITE_IMAGES.brand.iFranchiseLogo.width}
              height={SITE_IMAGES.brand.iFranchiseLogo.height}
              sizes="40px"
              priority
              unoptimized
              className="h-9 w-9 shrink-0 object-contain sm:h-10 sm:w-10"
            />
            <div className="min-w-0">
              <span className="block font-display text-base font-semibold leading-tight tracking-[0.02em] text-white sm:text-[1.2rem]">
                iFranchise
              </span>
              <span
                className={`block overflow-hidden text-[10px] leading-tight text-white/75 transition-all duration-300 ease-out sm:text-[11px] ${
                  showHeroTagline ? "mt-0.5 max-h-5 opacity-100" : "max-h-0 opacity-0"
                }`}
              >
                India&apos;s Trusted Franchise Growth Platform
              </span>
            </div>
          </a>

          <nav className="hidden items-center gap-1 xl:flex" aria-label="Main navigation">
            {NAV_LINKS.map((link) => {
              const isActive = activeSection === link.sectionId;

              return (
                <a
                  key={link.href}
                  href={link.href}
                  onClick={(e) => goToSection(e, link.href)}
                  aria-current={isActive ? "page" : undefined}
                  className={`rounded-full px-3 py-2 text-[13px] font-medium transition-colors duration-300 ${navLinkClass(isActive)}`}
                >
                  {link.label}
                </a>
              );
            })}
          </nav>

          <div className="flex items-center gap-2">
            <a
              href={CONTACT_PATH}
              onClick={(e) => {
                trackBookConsultation("header_book_a_call");
                goToSection(e, CONTACT_PATH);
              }}
              className="hidden items-center justify-center rounded-full bg-white px-3.5 py-2 text-[13px] font-semibold text-cta shadow-[0_4px_16px_rgba(0,0,0,0.12)] transition-all duration-300 hover:bg-white/90 sm:inline-flex lg:px-4"
            >
              Book a call
            </a>

            <button
              type="button"
              onClick={() => setMenuOpen((open) => !open)}
              className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-white/20 text-white transition-colors duration-300 hover:bg-white/10 xl:hidden"
              aria-expanded={menuOpen}
              aria-label={menuOpen ? "Close menu" : "Open menu"}
            >
              <AnimatePresence mode="wait" initial={false}>
                {menuOpen ? (
                  <motion.span
                    key="close"
                    initial={{ opacity: 0, rotate: -90, scale: 0.8 }}
                    animate={{ opacity: 1, rotate: 0, scale: 1 }}
                    exit={{ opacity: 0, rotate: 90, scale: 0.8 }}
                    transition={{ duration: 0.2, ease: "easeOut" }}
                  >
                    <X className="h-5 w-5" />
                  </motion.span>
                ) : (
                  <motion.span
                    key="menu"
                    initial={{ opacity: 0, rotate: 90, scale: 0.8 }}
                    animate={{ opacity: 1, rotate: 0, scale: 1 }}
                    exit={{ opacity: 0, rotate: -90, scale: 0.8 }}
                    transition={{ duration: 0.2, ease: "easeOut" }}
                  >
                    <Menu className="h-5 w-5" />
                  </motion.span>
                )}
              </AnimatePresence>
            </button>
          </div>
        </div>
      </header>

      <AnimatePresence>
        {menuOpen && (
          <motion.button
            type="button"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25, ease: "easeOut" }}
            className="fixed inset-0 z-40 bg-charcoal/40 backdrop-blur-sm xl:hidden"
            onClick={closeMenu}
            aria-label="Close menu"
          />
        )}
      </AnimatePresence>

      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ duration: 0.32, ease: [0.32, 0.72, 0, 1] }}
            className="fixed right-0 top-[var(--header-height)] z-50 flex h-[calc(100dvh-var(--header-height))] w-[min(100%,20rem)] flex-col border-l border-border bg-white shadow-2xl xl:hidden"
          >
            <nav className="flex flex-1 flex-col gap-1 overflow-y-auto p-5" aria-label="Mobile navigation">
              {NAV_LINKS.map((link, index) => {
                const isActive = activeSection === link.sectionId;

                return (
                  <motion.a
                    key={link.href}
                    href={link.href}
                    initial={{ opacity: 0, x: 16 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.25, delay: 0.05 + index * 0.04, ease: "easeOut" }}
                    onClick={(e) => goToSection(e, link.href, closeMenu)}
                    aria-current={isActive ? "page" : undefined}
                    className={`rounded-xl px-4 py-3 text-sm font-medium transition-colors ${
                      isActive
                        ? "bg-white font-semibold text-cta shadow-[0_4px_16px_rgba(0,0,0,0.08)]"
                        : "text-charcoal hover:bg-cta/5 hover:text-cta"
                    }`}
                  >
                    {link.label}
                  </motion.a>
                );
              })}
            </nav>
            <div className="border-t border-border p-5">
              <motion.a
                href={CONTACT_PATH}
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.25, delay: 0.3, ease: "easeOut" }}
                onClick={(e) => {
                  trackBookConsultation("header_mobile_book_a_call");
                  goToSection(e, CONTACT_PATH, closeMenu);
                }}
                className={ctaButtonClass({ fullWidth: true })}
              >
                Book a call
              </motion.a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
