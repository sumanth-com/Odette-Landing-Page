import type { Metadata } from "next";
import { ThankYouContent } from "@/components/ThankYouContent";

export const metadata: Metadata = {
  title: "Thank You | Odette Franchise Enquiry Received",
  description:
    "Thank you for your Odette franchise enquiry. Our iFranchise consultants will contact you shortly.",
  robots: { index: false, follow: false },
};

export default function ThankYouPage() {
  return <ThankYouContent />;
}
