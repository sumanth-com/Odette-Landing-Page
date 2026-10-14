import type { Metadata, Viewport } from "next";
import { Plus_Jakarta_Sans } from "next/font/google";
import { Suspense } from "react";
import { GoogleAnalyticsProvider } from "@/components/GoogleAnalyticsProvider";
import {
  GoogleTagManagerNoscript,
  GoogleTagManagerScript,
} from "@/components/GoogleTagManager";
import { AttributionCapture } from "@/components/AttributionCapture";
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
  themeColor: "#2e0ca2",
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
        <GoogleTagManagerScript />
        <link rel="preconnect" href="https://www.googletagmanager.com" crossOrigin="anonymous" />
        <link rel="dns-prefetch" href="https://www.googletagmanager.com" />
        <link rel="preconnect" href="https://www.google-analytics.com" crossOrigin="anonymous" />
        <link rel="dns-prefetch" href="https://www.google-analytics.com" />
        <link rel="preconnect" href="https://connect.facebook.net" crossOrigin="anonymous" />
        <link rel="dns-prefetch" href="https://connect.facebook.net" />
      </head>
      <body className="font-body antialiased">
        <GoogleTagManagerNoscript />
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[200] focus:rounded-full focus:bg-cta focus:px-4 focus:py-2 focus:text-sm focus:font-semibold focus:text-white"
        >
          Skip to main content
        </a>
        {children}
        <AttributionCapture />
        <Suspense fallback={null}>
          <WhatsAppButton />
        </Suspense>
        <GoogleAnalyticsProvider />
      </body>
    </html>
  );
}
