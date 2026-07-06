"use client";

import { EnquiryForm } from "@/components/ui/EnquiryForm";
import { fadeUp } from "@/components/ui/AnimatedSection";
import { GoogleMeetIcon } from "@/components/ui/GoogleMeetIcon";
import { SectionPill } from "@/components/ui/GoldButton";
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
    <SectionShell id="contact">
      <div className="flex w-full max-w-6xl flex-col items-center justify-center">
        <div className="grid w-full items-center gap-6 lg:grid-cols-2 lg:gap-10">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
            variants={fadeUp}
            className="flex flex-col items-start justify-center text-left"
          >
            <div className="w-full max-lg:flex max-lg:justify-center">
              <SectionPill>Contact</SectionPill>
            </div>
            <h2 className="mt-4 font-display text-2xl leading-snug tracking-tight text-charcoal md:text-3xl lg:text-[2rem]">
              Get in Touch With Our Team
            </h2>
            <p className="mt-3 text-sm font-medium text-cta md:text-base">
              Limited franchise slots in select cities — act now before allocation closes.
            </p>
            <p className="mt-3 max-w-md text-sm leading-relaxed text-taupe md:text-base">
              Book a meeting with our franchise consultants to discuss the Odette opportunity and
              get your questions answered.
            </p>

            <div className="mt-5 flex flex-wrap items-center gap-2">
              <a
                href={MEETING_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-full bg-cta px-4 py-2.5 text-[13px] font-semibold text-white shadow-[0_2px_10px_rgba(91,45,139,0.22)] transition-colors duration-200 hover:bg-cta-hover sm:px-5 sm:text-sm"
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
            className="w-full min-w-0"
          >
            <EnquiryForm
              variant="hero"
              id="contact-form"
              heading="Check if This Opportunity is Right for You"
              buttonText="Book Free Consultation"
            />
          </motion.div>
        </div>

        <p className="mt-6 shrink-0 text-center text-[11px] text-taupe/80">
          &copy; {new Date().getFullYear()} iFranchise. All rights reserved.
        </p>
      </div>
    </SectionShell>
  );
}
