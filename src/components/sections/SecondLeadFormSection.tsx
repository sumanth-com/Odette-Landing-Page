"use client";

import { EnquiryForm } from "../ui/EnquiryForm";
import { SectionHeading } from "../ui/GoldButton";
import { SectionShell } from "../ui/SectionShell";

export function SecondLeadFormSection() {
  return (
    <SectionShell className="bg-beige">
      <SectionHeading
        compact
        title="Want to Learn More?"
        subtitle="Fill in your details and our franchise consultant will help you understand the business model, investment, and next steps."
        centered
      />

      <div className="mx-auto w-full max-w-md">
        <EnquiryForm
          variant="secondary"
          id="secondary-enquiry-form"
          buttonText="Schedule a Free Consultation"
          showHeading={false}
          showEmail={false}
          showBudget={false}
          nameLabel="Name"
          phoneLabel="Phone"
          helperText=""
        />
      </div>
    </SectionShell>
  );
}
