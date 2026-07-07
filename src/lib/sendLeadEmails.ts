import { LeadConfirmationEmail } from "@/emails/LeadConfirmationEmail";
import { LeadNotificationEmail } from "@/emails/LeadNotificationEmail";
import { getOdetteLogoAttachment } from "@/emails/odetteLogo";
import { CONTACT_EMAIL } from "@/lib/site";
import type { LeadRecord } from "@/lib/leadSchema";
import { Resend } from "resend";

let resendClient: Resend | null = null;

function getResendClient() {
  const apiKey = process.env.RESEND_API_KEY;

  if (!apiKey) {
    throw new Error("RESEND_API_KEY is not configured");
  }

  if (!resendClient) {
    resendClient = new Resend(apiKey);
  }

  return resendClient;
}

function getFromAddress() {
  return (
    process.env.RESEND_FROM_EMAIL?.trim() ||
    "iFranchise <contact@ifranchise.in>"
  );
}

function getNotificationRecipient() {
  return process.env.CONTACT_NOTIFICATION_EMAIL?.trim() || CONTACT_EMAIL;
}

function getEmailAttachments() {
  return [getOdetteLogoAttachment()];
}

export async function sendLeadNotificationEmail(lead: LeadRecord) {
  const resend = getResendClient();

  const { data, error } = await resend.emails.send({
    from: getFromAddress(),
    to: [getNotificationRecipient()],
    replyTo: lead.email || undefined,
    subject: `New Odette Franchise Inquiry — ${lead.fullName}`,
    react: LeadNotificationEmail({ lead }),
    attachments: getEmailAttachments(),
  });

  if (error) {
    throw new Error(error.message);
  }

  return data;
}

export async function sendLeadConfirmationEmail(lead: LeadRecord) {
  if (!lead.email) {
    return null;
  }

  const resend = getResendClient();

  const { data, error } = await resend.emails.send({
    from: getFromAddress(),
    to: [lead.email],
    replyTo: getNotificationRecipient(),
    subject: "Thank you for contacting Odette",
    react: LeadConfirmationEmail({ lead }),
    attachments: getEmailAttachments(),
  });

  if (error) {
    throw new Error(error.message);
  }

  return data;
}

export async function sendLeadEmails(lead: LeadRecord) {
  const notification = await sendLeadNotificationEmail(lead);

  let confirmation: Awaited<ReturnType<typeof sendLeadConfirmationEmail>> = null;

  if (lead.email) {
    try {
      confirmation = await sendLeadConfirmationEmail(lead);
    } catch (error) {
      console.error("Lead confirmation email failed:", error);
    }
  }

  return { notification, confirmation };
}
