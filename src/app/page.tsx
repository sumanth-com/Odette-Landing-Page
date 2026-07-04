import { FAQSection } from "@/components/sections/FAQSection";
import { FinalCTASection } from "@/components/sections/FinalCTASection";
import { Footer } from "@/components/sections/Footer";
import { Header } from "@/components/sections/Header";
import { HeroSection } from "@/components/sections/HeroSection";
import { HowItWorksSection } from "@/components/sections/HowItWorksSection";
import { InvestmentSection } from "@/components/sections/InvestmentSection";
import { SecondLeadFormSection } from "@/components/sections/SecondLeadFormSection";
import { WhoIsThisForSection } from "@/components/sections/WhoIsThisForSection";
import { WhyConsiderSection } from "@/components/sections/WhyConsiderSection";
import { WhyIFranchiseSection } from "@/components/sections/WhyIFranchiseSection";
import { StickyMobileCTA } from "@/components/StickyMobileCTA";

export default function Home() {
  return (
    <main className="snap-y snap-proximity scroll-smooth pb-20 lg:snap-mandatory lg:pb-0">
      <Header />
      <HeroSection />
      <WhyConsiderSection />
      <HowItWorksSection />
      <InvestmentSection />
      <WhoIsThisForSection />
      <WhyIFranchiseSection />
      <SecondLeadFormSection />
      <FAQSection />
      <FinalCTASection />
      <Footer />
      <StickyMobileCTA />
    </main>
  );
}
