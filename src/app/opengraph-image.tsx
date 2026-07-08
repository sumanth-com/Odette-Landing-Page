import { ImageResponse } from "next/og";
import { BRAND_NAME, SITE_NAME } from "@/lib/seo";

export const alt = `${BRAND_NAME} Franchise Opportunity — Premium Fashion Franchise in India`;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

const OG_DESCRIPTION =
  "Partner with Odette through a company-operated FICO franchise model. Premium women's fashion franchise opportunities across selected cities in India with iFranchise consulting.";

export default function OpenGraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          padding: "72px",
          background: "linear-gradient(135deg, #f3ebf9 0%, #ebe0f5 45%, #5b2d8b 100%)",
          color: "#111111",
        }}
      >
        <div
          style={{
            display: "flex",
            fontSize: 28,
            fontWeight: 700,
            color: "#5b2d8b",
            marginBottom: 24,
          }}
        >
          {SITE_NAME}
        </div>
        <div
          style={{
            display: "flex",
            fontSize: 64,
            fontWeight: 800,
            lineHeight: 1.1,
            maxWidth: 900,
            letterSpacing: "-0.02em",
          }}
        >
          {BRAND_NAME} Franchise Opportunity
        </div>
        <div
          style={{
            display: "flex",
            marginTop: 24,
            fontSize: 30,
            lineHeight: 1.4,
            maxWidth: 860,
            color: "#1f1f1f",
          }}
        >
          {OG_DESCRIPTION}
        </div>
      </div>
    ),
    { ...size }
  );
}
