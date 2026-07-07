import { Column, Row, Section, Text } from "@react-email/components";
import { EMAIL_BRAND } from "../brand";

export interface DetailField {
  label: string;
  value: string;
}

interface DetailCardProps {
  title?: string;
  fields: DetailField[];
}

export function DetailCard({ title = "Submission Details", fields }: DetailCardProps) {
  return (
    <Section style={cardStyle}>
      <Text style={cardTitleStyle}>{title}</Text>

      {fields.map((field, index) => (
        <Row
          key={field.label}
          style={{
            ...rowStyle,
            borderTop: index === 0 ? "none" : `1px solid ${EMAIL_BRAND.border}`,
          }}
        >
          <Column style={labelColumnStyle}>
            <Text style={labelStyle}>{field.label}</Text>
          </Column>
          <Column style={valueColumnStyle}>
            <Text style={valueStyle}>{field.value}</Text>
          </Column>
        </Row>
      ))}
    </Section>
  );
}

const cardStyle = {
  margin: "0",
  border: `1px solid ${EMAIL_BRAND.border}`,
  borderRadius: "16px",
  backgroundColor: EMAIL_BRAND.surfaceMuted,
  overflow: "hidden",
};

const cardTitleStyle = {
  margin: 0,
  padding: "16px 18px 14px",
  color: EMAIL_BRAND.text,
  fontSize: "13px",
  fontWeight: 700,
  letterSpacing: "0.06em",
  textTransform: "uppercase" as const,
  borderBottom: `1px solid ${EMAIL_BRAND.border}`,
  backgroundColor: EMAIL_BRAND.surface,
};

const rowStyle = {
  padding: "14px 18px",
};

const labelColumnStyle = {
  width: "38%",
  verticalAlign: "top" as const,
};

const valueColumnStyle = {
  width: "62%",
  verticalAlign: "top" as const,
};

const labelStyle = {
  margin: 0,
  color: EMAIL_BRAND.textMuted,
  fontSize: "12px",
  fontWeight: 600,
  lineHeight: "20px",
};

const valueStyle = {
  margin: 0,
  color: EMAIL_BRAND.text,
  fontSize: "14px",
  fontWeight: 600,
  lineHeight: "22px",
  wordBreak: "break-word" as const,
};
