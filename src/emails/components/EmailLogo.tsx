import { Img, Section, Text } from "@react-email/components";
import { EMAIL_BRAND, getOdetteLogoUrl } from "../brand";

export function EmailLogo() {
  return (
    <Section style={logoSectionStyle}>
      <Img
        src={getOdetteLogoUrl()}
        alt="Odette"
        width="168"
        height="48"
        style={logoImageStyle}
      />
      <Text style={taglineStyle}>{EMAIL_BRAND.tagline}</Text>
    </Section>
  );
}

const logoSectionStyle = {
  textAlign: "center" as const,
  marginBottom: "28px",
};

const logoImageStyle = {
  margin: "0 auto",
  display: "block",
  maxWidth: "168px",
  height: "auto",
};

const taglineStyle = {
  margin: "10px 0 0",
  color: EMAIL_BRAND.textMuted,
  fontSize: "11px",
  fontWeight: 600,
  letterSpacing: "0.18em",
  textTransform: "uppercase" as const,
};
