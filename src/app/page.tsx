import { FAQSection } from "@/components/sections/FAQSection";
import { FaqJsonLd } from "@/components/FaqJsonLd";
import { FinalCTASection } from "@/components/sections/FinalCTASection";
import { Header } from "@/components/sections/Header";
import { HeroSection } from "@/components/sections/HeroSection";
import { HowItWorksSection } from "@/components/sections/HowItWorksSection";
import { WhyConsiderSection } from "@/components/sections/WhyConsiderSection";
import { WhyOdetteSection } from "@/components/sections/WhyOdetteSection";
import { WhyIFranchiseSection } from "@/components/sections/WhyIFranchiseSection";

export default function Home() {
  return (
    <>
      <FaqJsonLd />
      <Header />
      <main>
        <HeroSection />
        <WhyConsiderSection />
        <WhyOdetteSection />
        <HowItWorksSection />
        <WhyIFranchiseSection />
        <FAQSection />
        <FinalCTASection />
      </main>
    </>
  );
}
