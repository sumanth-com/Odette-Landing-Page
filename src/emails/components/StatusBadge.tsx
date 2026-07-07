import { Section, Text } from "@react-email/components";
import { EMAIL_BRAND } from "../brand";

interface StatusBadgeProps {
  label: string;
}

export function StatusBadge({ label }: StatusBadgeProps) {
  return (
    <Section style={wrapperStyle}>
      <Text style={badgeStyle}>
        <span style={dotStyle}>●</span> {label}
      </Text>
    </Section>
  );
}

const wrapperStyle = {
  margin: "0 0 20px",
};

const badgeStyle = {
  display: "inline-block",
  margin: 0,
  padding: "6px 12px",
  borderRadius: "999px",
  backgroundColor: EMAIL_BRAND.accentMuted,
  color: EMAIL_BRAND.accent,
  fontSize: "12px",
  fontWeight: 700,
  letterSpacing: "0.04em",
};

const dotStyle = {
  color: "#22c55e",
  marginRight: "4px",
};
