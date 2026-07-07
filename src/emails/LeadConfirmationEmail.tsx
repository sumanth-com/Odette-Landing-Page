import { Button, Heading, Hr, Section, Text } from "@react-email/components";
import { EMAIL_BRAND } from "./brand";
import { EmailShell } from "./components/EmailShell";
import type { LeadRecord } from "@/lib/leadSchema";

interface LeadConfirmationEmailProps {
  lead: LeadRecord;
}

export function LeadConfirmationEmail({ lead }: LeadConfirmationEmailProps) {
  const firstName = lead.fullName.split(" ")[0] || lead.fullName;

  return (
    <EmailShell
      preview="Thank you for contacting Odette. Our team will be in touch shortly."
      footerNote="This confirmation was sent because you submitted an inquiry on the Odette Landing Page."
    >
      <Heading style={titleStyle}>Thank you for contacting Odette</Heading>

      <Text style={greetingStyle}>Hi {firstName},</Text>

      <Text style={bodyStyle}>
        Thank you for reaching out to us about the Odette franchise opportunity. We have
        received your inquiry and our franchise consulting team is reviewing your details.
      </Text>

      <Section style={highlightCardStyle}>
        <Text style={highlightTitleStyle}>What happens next?</Text>
        <Text style={highlightBodyStyle}>
          A member of our team will contact you within{" "}
          <strong style={{ color: EMAIL_BRAND.accent }}>24 hours</strong> to discuss your
          interest, answer your questions, and guide you through the next steps.
        </Text>
      </Section>

      <Text style={bodyStyle}>
        Odette is India's mass-premium fashion brand — built for investors who want a
        professionally managed franchise experience with premium retail positioning.
      </Text>

      <Hr style={dividerStyle} />

      <Section style={ctaSectionStyle}>
        <Button href={EMAIL_BRAND.websiteUrl} style={buttonStyle}>
          Visit Our Website
        </Button>
        <Text style={ctaHintStyle}>{EMAIL_BRAND.websiteLabel}</Text>
      </Section>
    </EmailShell>
  );
}

const titleStyle = {
  margin: "0 0 16px",
  color: EMAIL_BRAND.text,
  fontSize: "28px",
  fontWeight: 700,
  lineHeight: "34px",
  letterSpacing: "-0.02em",
};

const greetingStyle = {
  margin: "0 0 12px",
  color: EMAIL_BRAND.text,
  fontSize: "16px",
  fontWeight: 600,
  lineHeight: "24px",
};

const bodyStyle = {
  margin: "0 0 16px",
  color: EMAIL_BRAND.textMuted,
  fontSize: "15px",
  lineHeight: "24px",
};

const highlightCardStyle = {
  margin: "8px 0 20px",
  padding: "18px 20px",
  borderRadius: "16px",
  border: `1px solid ${EMAIL_BRAND.border}`,
  backgroundColor: EMAIL_BRAND.surfaceMuted,
};

const highlightTitleStyle = {
  margin: "0 0 8px",
  color: EMAIL_BRAND.text,
  fontSize: "14px",
  fontWeight: 700,
  lineHeight: "20px",
};

const highlightBodyStyle = {
  margin: 0,
  color: EMAIL_BRAND.textMuted,
  fontSize: "14px",
  lineHeight: "22px",
};

const dividerStyle = {
  borderColor: EMAIL_BRAND.border,
  margin: "24px 0",
};

const ctaSectionStyle = {
  textAlign: "center" as const,
};

const buttonStyle = {
  display: "inline-block",
  padding: "14px 28px",
  borderRadius: "999px",
  backgroundColor: EMAIL_BRAND.accent,
  color: "#ffffff",
  fontSize: "14px",
  fontWeight: 700,
  textDecoration: "none",
  boxShadow: "0 8px 24px rgba(91, 45, 139, 0.24)",
};

const ctaHintStyle = {
  margin: "12px 0 0",
  color: EMAIL_BRAND.textMuted,
  fontSize: "12px",
  lineHeight: "18px",
};

export default LeadConfirmationEmail;
