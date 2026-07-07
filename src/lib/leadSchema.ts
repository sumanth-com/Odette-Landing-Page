import { z } from "zod";

export const BUDGET_OPTIONS = [
  "₹45 Lakhs",
  "₹45–75 Lakhs",
  "Above ₹75 Lakhs",
] as const;

export const DEFAULT_FRANCHISE_INTEREST = "Odette Premium Fashion Franchise";

export const leadSchema = z.object({
  fullName: z
    .string()
    .trim()
    .min(2, "Full name is required")
    .max(120, "Full name is too long"),
  mobileNumber: z
    .string()
    .trim()
    .min(10, "Phone number is required")
    .max(24, "Phone number is too long"),
  email: z
    .string()
    .trim()
    .min(1, "Email address is required")
    .email("Please enter a valid email address")
    .max(160, "Email is too long"),
  state: z.string().trim().min(1, "State is required").max(80),
  city: z.string().trim().min(1, "City is required").max(80),
  investmentBudget: z.enum(BUDGET_OPTIONS, {
    error: "Please select a valid investment budget",
  }),
  franchiseInterest: z.string().trim().max(120).optional(),
});

export type LeadInput = z.infer<typeof leadSchema>;

export type LeadRecord = LeadInput & {
  franchiseInterest: string;
};

export function normalizeLeadInput(input: LeadInput): LeadRecord {
  return {
    ...input,
    fullName: input.fullName.trim(),
    mobileNumber: input.mobileNumber.trim(),
    email: input.email.trim(),
    state: input.state.trim(),
    city: input.city.trim(),
    franchiseInterest:
      input.franchiseInterest?.trim() || DEFAULT_FRANCHISE_INTEREST,
  };
}
