import type { Metadata } from "next";
import { Inter, Playfair_Display } from "next/font/google";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-playfair",
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
    <html lang="en" className={`${inter.variable} ${playfair.variable}`}>
      <body className="antialiased">{children}</body>
    </html>
  );
}
