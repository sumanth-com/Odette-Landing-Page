"use client";

import image1 from "@/assets/1.png";
import image2 from "@/assets/2.png";
import image3 from "@/assets/3.png";
import image4 from "@/assets/4.png";
import image5 from "@/assets/5.png";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowRight, ChevronLeft, ChevronRight } from "lucide-react";
import Image, { type StaticImageData } from "next/image";
import { useState } from "react";
import { GoldButton } from "../ui/GoldButton";

const galleryImages: { src: StaticImageData; alt: string }[] = [
  { src: image1, alt: "Odette premium fashion store interior" },
  { src: image2, alt: "Odette luxury retail showroom" },
  { src: image3, alt: "Odette fashion boutique display" },
  { src: image4, alt: "Odette premium clothing collection" },
  { src: image5, alt: "Odette elegant store environment" },
];

export function FinalCTASection() {
  const [current, setCurrent] = useState(0);
  const activeImage = galleryImages[current].src;

  const scrollToForm = () => {
    document.getElementById("enquiry-form")?.scrollIntoView({ behavior: "smooth" });
  };

  const goPrev = () => {
    setCurrent((index) => (index === 0 ? galleryImages.length - 1 : index - 1));
  };

  const goNext = () => {
    setCurrent((index) => (index === galleryImages.length - 1 ? 0 : index + 1));
  };

  return (
    <section className="relative snap-start overflow-hidden bg-charcoal">
      <div
        className="pointer-events-none absolute inset-0 bg-linear-to-br from-charcoal via-[#333] to-[#1f1f1f]"
        aria-hidden="true"
      />

      <div className="page-container relative z-10 py-10 lg:py-14">
        <div className="grid items-center gap-8 lg:grid-cols-2 lg:gap-12">
          {/* Left — Image gallery */}
          <div className="w-full">
            <motion.div
              layout
              className="relative w-full overflow-hidden rounded-[22px] luxury-shadow-lg"
              style={{ aspectRatio: `${activeImage.width} / ${activeImage.height}` }}
              transition={{ duration: 0.4, ease: "easeOut" }}
            >
              <AnimatePresence mode="wait">
                <motion.div
                  key={current}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.35, ease: "easeOut" }}
                  className="absolute inset-0"
                >
                  <Image
                    src={activeImage}
                    alt={galleryImages[current].alt}
                    fill
                    className="object-cover"
                    sizes="(max-width: 1024px) 100vw, 50vw"
                    priority={current === 0}
                  />
                </motion.div>
              </AnimatePresence>

              <button
                type="button"
                onClick={goPrev}
                aria-label="Previous image"
                className="absolute left-3 top-1/2 z-10 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full border border-white/20 bg-white/90 text-charcoal shadow-md transition-all duration-300 hover:bg-white"
              >
                <ChevronLeft className="h-5 w-5" strokeWidth={1.5} />
              </button>
              <button
                type="button"
                onClick={goNext}
                aria-label="Next image"
                className="absolute right-3 top-1/2 z-10 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full border border-white/20 bg-white/90 text-charcoal shadow-md transition-all duration-300 hover:bg-white"
              >
                <ChevronRight className="h-5 w-5" strokeWidth={1.5} />
              </button>

              <div className="absolute bottom-3 left-0 right-0 z-10 flex justify-center gap-1.5">
                {galleryImages.map((_, index) => (
                  <button
                    key={index}
                    type="button"
                    aria-label={`Go to image ${index + 1}`}
                    onClick={() => setCurrent(index)}
                    className={`h-1.5 rounded-full transition-all duration-300 ${
                      index === current ? "w-5 bg-gold" : "w-1.5 bg-white/50 hover:bg-white/70"
                    }`}
                  />
                ))}
              </div>
            </motion.div>
          </div>

          {/* Right — Text & CTA */}
          <div className="text-center lg:text-left">
            <h2 className="font-display text-2xl leading-snug tracking-tight text-white md:text-3xl lg:text-[2rem] xl:text-4xl">
              Interested in Exploring the Odette Franchise Opportunity?
            </h2>
            <p className="mx-auto mt-4 max-w-xl text-sm leading-relaxed text-white/70 md:text-base lg:mx-0">
              If you&apos;re looking to invest in a premium fashion business, our team is here to help
              you understand the opportunity and answer your questions.
            </p>
            <div className="mt-6 flex justify-center lg:justify-start">
              <GoldButton size="large" onClick={scrollToForm}>
                Get Franchise Details
                <ArrowRight className="h-4 w-4" />
              </GoldButton>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
