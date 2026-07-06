import type { Metadata } from "next";
import { Plus_Jakarta_Sans } from "next/font/google";
import { WhatsAppButton } from "@/components/WhatsAppButton";
import "./globals.css";

const plusJakarta = Plus_Jakarta_Sans({
  subsets: ["latin"],
  variable: "--font-jakarta",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Odette Franchise Opportunity | Premium Fashion Franchise",
  description:
    "Partner with Odette through a company-operated franchise model. Investment starts from ₹45 Lakhs. Premium fashion retail franchise opportunity across selected cities in India.",
  keywords: [
    "Clothing Franchise",
    "Fashion Franchise",
    "Premium Fashion Franchise",
    "Retail Franchise",
    "Women's Clothing Franchise",
    "Odette Franchise",
    "FICO Model",
  ],
  openGraph: {
    title: "Odette Franchise Opportunity | Premium Fashion Franchise",
    description:
      "Own a premium fashion business with Odette. Company-operated franchise model with investment from ₹45 Lakhs.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={plusJakarta.variable}>
      <body className="font-body antialiased">
        {children}
        <WhatsAppButton />
      </body>
    </html>
  );
}
