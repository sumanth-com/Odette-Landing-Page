"use client";

import { EnquiryForm } from "@/components/ui/EnquiryForm";
import { fadeUp } from "@/components/ui/AnimatedSection";
import { GoogleMeetIcon } from "@/components/ui/GoogleMeetIcon";
import { SectionPill, ctaButtonClass } from "@/components/ui/GoldButton";
import { SectionShell } from "@/components/ui/SectionShell";
import {
  CONTACT_EMAIL,
  CONTACT_PHONE,
  CONTACT_WEBSITE,
  MEETING_URL,
} from "@/lib/site";
import { motion } from "framer-motion";
import { Globe, Mail, Phone } from "lucide-react";

export function FinalCTASection() {
  return (
    <SectionShell id="contact" gradientTone={5}>
      <div className="section-fit mx-auto flex min-h-0 w-full max-w-6xl flex-col">
        <div className="grid min-h-0 flex-1 grid-cols-1 items-center gap-3 max-lg:gap-2.5 lg:grid-cols-2 lg:gap-8">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
            variants={fadeUp}
            className="flex flex-col items-start justify-center text-left max-lg:items-center max-lg:text-center"
          >
            <SectionPill>Contact</SectionPill>
            <h2 className="mt-3 font-display text-xl leading-snug tracking-tight text-black sm:text-2xl lg:text-[1.75rem]">
              Get in Touch With Our Team
            </h2>
            <p className="mt-2 text-sm font-medium text-cta">
              Limited franchise slots in select cities — act now before allocation closes.
            </p>
            <p className="mt-2 max-w-md text-sm leading-relaxed text-black">
              Book a meeting with our franchise consultants to discuss the Odette opportunity and
              get your questions answered.
            </p>

            <div className="mt-4 flex flex-wrap items-center gap-2 max-lg:justify-center">
              <a
                href={MEETING_URL}
                target="_blank"
                rel="noopener noreferrer"
                className={ctaButtonClass()}
              >
                <GoogleMeetIcon className="h-4 w-4 text-white" />
                Book a Meeting with Us
              </a>
              <a
                href={CONTACT_PHONE}
                aria-label="Call us"
                className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-cta text-white shadow-[0_2px_10px_rgba(91,45,139,0.22)] transition-colors duration-200 hover:bg-cta-hover"
              >
                <Phone className="h-4 w-4" strokeWidth={1.5} />
              </a>
              <a
                href={`mailto:${CONTACT_EMAIL}`}
                aria-label="Email us"
                className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-cta text-white shadow-[0_2px_10px_rgba(91,45,139,0.22)] transition-colors duration-200 hover:bg-cta-hover"
              >
                <Mail className="h-4 w-4" strokeWidth={1.5} />
              </a>
              <a
                href={CONTACT_WEBSITE}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Visit our website"
                className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-cta text-white shadow-[0_2px_10px_rgba(91,45,139,0.22)] transition-colors duration-200 hover:bg-cta-hover"
              >
                <Globe className="h-4 w-4" strokeWidth={1.5} />
              </a>
            </div>
          </motion.div>

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
            variants={fadeUp}
            className="flex min-h-0 w-full min-w-0 max-w-[400px] justify-center lg:ml-auto lg:justify-end"
          >
            <EnquiryForm
              variant="hero"
              id="contact-form"
              heading="Check if This Opportunity is Right for You"
              buttonText="Book Free Consultation"
              showHeading
              showEmail
              showBudget
              showSecurityNote={false}
            />
          </motion.div>
        </div>

        <p className="mt-1 shrink-0 text-center text-[10px] text-black/70 max-lg:mt-0.5 sm:text-[11px]">
          &copy; {new Date().getFullYear()} iFranchise. All rights reserved.
        </p>
      </div>
    </SectionShell>
  );
}
