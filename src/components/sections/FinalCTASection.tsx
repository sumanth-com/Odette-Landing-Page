"use client";

import { EnquiryForm } from "@/components/ui/EnquiryForm";
import { fadeUp } from "@/components/ui/AnimatedSection";
import { GoogleMeetIcon } from "@/components/ui/GoogleMeetIcon";
import { SectionHeading, ctaButtonClass, sectionBodyTextClass } from "@/components/ui/GoldButton";
import { SectionShell } from "@/components/ui/SectionShell";
import {
  CONTACT_EMAIL,
  CONTACT_PHONE,
  CONTACT_WEBSITE,
  MEETING_URL,
} from "@/lib/site";
import { motion } from "framer-motion";
import { Globe, Mail, Phone } from "lucide-react";

const contactStackShellClass =
  "contact-stack-width mx-auto flex w-full max-w-[min(100%,19.5rem)] flex-col gap-3 md:max-w-[min(100%,28rem)] lg:contents";

export function FinalCTASection() {
  const copyright = (
    <p className="text-center text-[10px] leading-relaxed text-black/55 sm:text-[11px]">
      &copy; {new Date().getFullYear()} iFranchise. All rights reserved.
    </p>
  );

  return (
    <SectionShell id="contact" gradientTone={5}>
      <div className="section-fit mx-auto flex min-h-0 w-full max-w-6xl flex-col max-lg:py-1">
        <div className="min-h-0 flex-1 lg:grid lg:grid-cols-2 lg:items-center lg:gap-8">
          <div className={contactStackShellClass}>
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.2 }}
              variants={fadeUp}
              className="flex w-full flex-col items-start justify-center text-left max-lg:items-center max-lg:text-center"
            >
              <SectionHeading
                compact
                pill="Contact"
                title="Get in Touch With Our Team"
              />
              <p className="mt-1.5 w-full text-sm font-medium text-cta max-lg:mt-1">
                Limited franchise slots in select cities — act now before allocation closes.
              </p>
              <p className={`mt-1.5 w-full max-lg:mt-1 max-lg:text-sm lg:max-w-md ${sectionBodyTextClass}`}>
                Book a meeting with our franchise consultants to discuss the Odette opportunity and
                get your questions answered.
              </p>

              <div className="mt-3 flex w-full items-center gap-2 max-lg:mt-2">
                <a
                  href={MEETING_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`${ctaButtonClass()} min-h-[2.75rem] min-w-0 flex-1 justify-center whitespace-nowrap px-2.5 py-2.5 !font-medium text-[11px] leading-none sm:px-3 sm:text-xs lg:px-5 lg:!font-semibold lg:text-[13px]`}
                >
                  <GoogleMeetIcon className="h-3.5 w-3.5 shrink-0 text-white sm:h-4 sm:w-4" />
                  <span className="lg:hidden">Book a Meeting</span>
                  <span className="hidden lg:inline">Book a Meeting with Us</span>
                </a>
                <div className="flex shrink-0 items-center gap-2">
                  <a
                    href={CONTACT_PHONE}
                    aria-label="Call us"
                    className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-cta text-white shadow-[0_2px_10px_rgba(91,45,139,0.22)] transition-colors duration-200 hover:bg-cta-hover"
                  >
                    <Phone className="h-4 w-4" strokeWidth={1.5} />
                  </a>
                  <a
                    href={`mailto:${CONTACT_EMAIL}`}
                    aria-label="Email us"
                    className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-cta text-white shadow-[0_2px_10px_rgba(91,45,139,0.22)] transition-colors duration-200 hover:bg-cta-hover"
                  >
                    <Mail className="h-4 w-4" strokeWidth={1.5} />
                  </a>
                  <a
                    href={CONTACT_WEBSITE}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="Visit our website"
                    className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-cta text-white shadow-[0_2px_10px_rgba(91,45,139,0.22)] transition-colors duration-200 hover:bg-cta-hover"
                  >
                    <Globe className="h-4 w-4" strokeWidth={1.5} />
                  </a>
                </div>
              </div>
            </motion.div>

            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.2 }}
              variants={fadeUp}
              className="contact-form-wrap flex w-full min-w-0 lg:ml-auto lg:max-w-[400px] lg:justify-end"
            >
              <EnquiryForm
                variant="hero"
                id="contact-form"
                heading="Check Your Franchise Eligibility"
                buttonText="CHECK FRANCHISE AVAILABILITY"
                showHeading
                showEmail={true}
                showBudget
                stackStateCityOnMobile
                showSecurityNote={false}
                footer={<div className="lg:hidden">{copyright}</div>}
              />
            </motion.div>
          </div>
        </div>

        <div className="mt-1 hidden shrink-0 lg:block">
          {copyright}
        </div>
      </div>
    </SectionShell>
  );
}
