import {
  Body,
  Container,
  Font,
  Head,
  Html,
  Preview,
  Section,
  Text,
} from "@react-email/components";
import type { ReactNode } from "react";
import { EMAIL_BRAND } from "../brand";
import { EmailLogo } from "./EmailLogo";

interface EmailShellProps {
  preview: string;
  children: ReactNode;
  footerNote: string;
}

export function EmailShell({ preview, children, footerNote }: EmailShellProps) {
  return (
    <Html lang="en">
      <Head>
        <Font
          fontFamily="Plus Jakarta Sans"
          fallbackFontFamily="Arial"
          webFont={{
            url: "https://fonts.gstatic.com/s/plusjakartasans/v8/LDIbaomQNQcsA88c7O9yZ4KMCoOg4IA6-91aHEjcWuA_qU79TR_I.ttf",
            format: "truetype",
          }}
          fontWeight={400}
          fontStyle="normal"
        />
        <Font
          fontFamily="Plus Jakarta Sans"
          fallbackFontFamily="Arial"
          webFont={{
            url: "https://fonts.gstatic.com/s/plusjakartasans/v8/LDIbaomQNQcsA88c7O9yZ4KMCoOg4IA6-91aHEjcWuA_qU79TR_I.ttf",
            format: "truetype",
          }}
          fontWeight={600}
          fontStyle="normal"
        />
        <Font
          fontFamily="Plus Jakarta Sans"
          fallbackFontFamily="Arial"
          webFont={{
            url: "https://fonts.gstatic.com/s/plusjakartasans/v8/LDIbaomQNQcsA88c7O9yZ4KMCoOg4IA6-91aHEjcWuA_qU79TR_I.ttf",
            format: "truetype",
          }}
          fontWeight={700}
          fontStyle="normal"
        />
      </Head>
      <Preview>{preview}</Preview>
      <Body style={bodyStyle}>
        <Container style={outerContainerStyle}>
          <Section style={cardStyle}>
            <EmailLogo />
            {children}
          </Section>

          <Section style={footerStyle}>
            <Text style={footerTextStyle}>{footerNote}</Text>
            <Text style={footerCopyrightStyle}>
              © {new Date().getFullYear()} iFranchise. All Rights Reserved.
            </Text>
          </Section>
        </Container>
      </Body>
    </Html>
  );
}

const bodyStyle = {
  margin: 0,
  padding: "32px 16px",
  backgroundColor: EMAIL_BRAND.accentSoft,
  fontFamily: '"Plus Jakarta Sans", Arial, sans-serif',
} as const;

const outerContainerStyle = {
  margin: "0 auto",
  maxWidth: "600px",
} as const;

const cardStyle = {
  backgroundColor: EMAIL_BRAND.surface,
  border: `1px solid ${EMAIL_BRAND.border}`,
  borderRadius: "20px",
  boxShadow: EMAIL_BRAND.shadow,
  overflow: "hidden",
  padding: "32px 28px",
} as const;

const footerStyle = {
  marginTop: "20px",
  textAlign: "center" as const,
};

const footerTextStyle = {
  margin: "0 0 8px",
  color: EMAIL_BRAND.textMuted,
  fontSize: "12px",
  lineHeight: "20px",
};

const footerCopyrightStyle = {
  margin: 0,
  color: EMAIL_BRAND.textMuted,
  fontSize: "12px",
  lineHeight: "20px",
};
