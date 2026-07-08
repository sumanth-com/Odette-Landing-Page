import type { Metadata, Viewport } from "next";
import { Plus_Jakarta_Sans } from "next/font/google";
import { GoogleAnalyticsProvider } from "@/components/GoogleAnalyticsProvider";
import { WhatsAppButton } from "@/components/WhatsAppButton";
import { rootMetadata } from "@/lib/seo";
import "./globals.css";

const plusJakarta = Plus_Jakarta_Sans({
  subsets: ["latin"],
  variable: "--font-jakarta",
  display: "swap",
  preload: true,
  adjustFontFallback: true,
});

export const metadata: Metadata = rootMetadata;

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#5b2d8b",
  colorScheme: "light",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en-IN" className={plusJakarta.variable}>
      <head>
        <link rel="preconnect" href="https://www.googletagmanager.com" crossOrigin="anonymous" />
        <link rel="dns-prefetch" href="https://www.googletagmanager.com" />
        <link rel="preconnect" href="https://www.google-analytics.com" crossOrigin="anonymous" />
        <link rel="dns-prefetch" href="https://www.google-analytics.com" />
      </head>
      <body className="font-body antialiased">
        {children}
        <WhatsAppButton />
        <GoogleAnalyticsProvider />
      </body>
    </html>
  );
}
