"use client";

import { FAQSection } from "@/components/sections/FAQSection";
import { FaqJsonLd } from "@/components/FaqJsonLd";
import { FinalCTASection } from "@/components/sections/FinalCTASection";
import { Header } from "@/components/sections/Header";
import { HeroSection } from "@/components/sections/HeroSection";
import { HowItWorksSection } from "@/components/sections/HowItWorksSection";
import { WhyConsiderSection } from "@/components/sections/WhyConsiderSection";
import { WhyOdetteSection } from "@/components/sections/WhyOdetteSection";
import { WhyIFranchiseSection } from "@/components/sections/WhyIFranchiseSection";
import { PostHeroCanvas } from "@/components/ui/PostHeroCanvas";
import { scrollToPathWhenReady } from "@/lib/scroll";
import { isValidSectionPath, type SectionPath } from "@/lib/site";
import { useEffect } from "react";

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
      <FaqJsonLd />
      <Header />
      <main>
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
