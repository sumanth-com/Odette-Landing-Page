"use client";

import dynamic from "next/dynamic";
import { Header } from "@/components/sections/Header";
import { HeroSection } from "@/components/sections/HeroSection";
import { PostHeroCanvas } from "@/components/ui/PostHeroCanvas";
import { scrollToPathWhenReady } from "@/lib/scroll";
import { isValidSectionPath, type SectionPath } from "@/lib/site";
import { useEffect } from "react";

const WhyConsiderSection = dynamic(
  () =>
    import("@/components/sections/WhyConsiderSection").then((module) => ({
      default: module.WhyConsiderSection,
    })),
  { loading: () => null }
);

const WhyOdetteSection = dynamic(
  () =>
    import("@/components/sections/WhyOdetteSection").then((module) => ({
      default: module.WhyOdetteSection,
    })),
  { loading: () => null }
);

const HowItWorksSection = dynamic(
  () =>
    import("@/components/sections/HowItWorksSection").then((module) => ({
      default: module.HowItWorksSection,
    })),
  { loading: () => null }
);

const WhyIFranchiseSection = dynamic(
  () =>
    import("@/components/sections/WhyIFranchiseSection").then((module) => ({
      default: module.WhyIFranchiseSection,
    })),
  { loading: () => null }
);

const FAQSection = dynamic(
  () =>
    import("@/components/sections/FAQSection").then((module) => ({
      default: module.FAQSection,
    })),
  { loading: () => null }
);

const FinalCTASection = dynamic(
  () =>
    import("@/components/sections/FinalCTASection").then((module) => ({
      default: module.FinalCTASection,
    })),
  { loading: () => null }
);

function getInitialPath(): SectionPath {
  if (typeof window === "undefined") return "/";
  const path = window.location.pathname;
  return isValidSectionPath(path) ? path : "/";
}

export function LandingPage() {
  useEffect(() => {
    const initialPath = getInitialPath();
    if (initialPath !== "/") {
      scrollToPathWhenReady(initialPath);
    }

    const onPopState = () => {
      const path = window.location.pathname;
      if (isValidSectionPath(path)) {
        scrollToPathWhenReady(path);
      }
    };

    window.addEventListener("popstate", onPopState);
    return () => window.removeEventListener("popstate", onPopState);
  }, []);

  return (
    <>
      <Header />
      <main id="main-content" aria-label="Odette franchise opportunity">
        <HeroSection />
        <PostHeroCanvas>
          <WhyConsiderSection />
          <WhyOdetteSection />
          <HowItWorksSection />
          <WhyIFranchiseSection />
          <FAQSection />
          <FinalCTASection />
        </PostHeroCanvas>
      </main>
    </>
  );
}
