import { Heading, Hr, Section, Text } from "@react-email/components";
import { EMAIL_BRAND } from "./brand";
import { DetailCard } from "./components/DetailCard";
import { EmailShell } from "./components/EmailShell";
import { StatusBadge } from "./components/StatusBadge";
import type { LeadRecord } from "@/lib/leadSchema";

interface LeadNotificationEmailProps {
  lead: LeadRecord;
}

export function LeadNotificationEmail({ lead }: LeadNotificationEmailProps) {
  const fields = [
    { label: "Full Name", value: lead.fullName },
    { label: "Email Address", value: lead.email || "Not provided" },
    { label: "Phone Number", value: lead.mobileNumber },
    { label: "Franchise Interest", value: lead.franchiseInterest },
    { label: "City", value: lead.city },
    { label: "State", value: lead.state },
    { label: "Budget", value: lead.investmentBudget },
  ];

  return (
    <EmailShell
      preview={`New franchise inquiry from ${lead.fullName}`}
      footerNote="This email was automatically generated from the Odette Landing Page contact form."
    >
      <StatusBadge label="New Lead" />

      <Heading style={titleStyle}>New Contact Form Submission</Heading>
      <Text style={subtitleStyle}>
        A new inquiry has been submitted through the Odette Landing Page.
      </Text>

      <Hr style={dividerStyle} />

      <Section style={metaStyle}>
        <Text style={metaTextStyle}>
          Received on{" "}
          {new Intl.DateTimeFormat("en-IN", {
            dateStyle: "medium",
            timeStyle: "short",
            timeZone: "Asia/Kolkata",
          }).format(new Date())}
        </Text>
      </Section>

      <DetailCard fields={fields} />
    </EmailShell>
  );
}

const titleStyle = {
  margin: "0 0 8px",
  color: EMAIL_BRAND.text,
  fontSize: "28px",
  fontWeight: 700,
  lineHeight: "34px",
  letterSpacing: "-0.02em",
};

const subtitleStyle = {
  margin: "0 0 20px",
  color: EMAIL_BRAND.textMuted,
  fontSize: "15px",
  lineHeight: "24px",
};

const dividerStyle = {
  borderColor: EMAIL_BRAND.border,
  margin: "0 0 18px",
};

const metaStyle = {
  marginBottom: "18px",
};

const metaTextStyle = {
  margin: 0,
  color: EMAIL_BRAND.textMuted,
  fontSize: "12px",
  lineHeight: "18px",
};

export default LeadNotificationEmail;
