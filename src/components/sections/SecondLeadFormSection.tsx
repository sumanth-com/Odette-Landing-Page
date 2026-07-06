import { EnquiryForm } from "../ui/EnquiryForm";
import { SectionHeading } from "../ui/GoldButton";
import { SectionShell } from "../ui/SectionShell";

export function SecondLeadFormSection() {
  return (
    <SectionShell id="consultation-section" className="!min-h-0">
      <SectionHeading
        compact
        title="Ready to Take the Next Step?"
        subtitle="Share your details and our franchise consultant will walk you through the Odette opportunity, investment, and how to get started."
        centered
      />

      <div className="mx-auto w-full max-w-md">
        <EnquiryForm
          variant="secondary"
          id="consultation-form"
          buttonText="Schedule Free Consultation"
          showHeading={false}
          showEmail={false}
          showBudget={false}
          nameLabel="Name"
          phoneLabel="Phone"
          helperText="No obligation. Our team responds within one business day."
        />
      </div>
    </SectionShell>
  );
}
