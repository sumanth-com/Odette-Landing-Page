"use client";

import image1 from "@/assets/1.png";
import image2 from "@/assets/2.png";
import image3 from "@/assets/3.png";
import image4 from "@/assets/4.png";
import image5 from "@/assets/5.png";
import image6 from "@/assets/6.png";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { type StaticImageData } from "next/image";
import { useCallback, useState } from "react";

const galleryImages: { src: StaticImageData; alt: string }[] = [
  { src: image1, alt: "Odette premium fashion store interior" },
  { src: image2, alt: "Odette luxury retail showroom" },
  { src: image3, alt: "Odette fashion boutique display" },
  { src: image4, alt: "Odette premium clothing collection" },
  { src: image5, alt: "Odette franchise retail experience" },
  { src: image6, alt: "Odette brand showcase" },
];

interface ImageGalleryProps {
  className?: string;
}

export function ImageGallery({ className = "" }: ImageGalleryProps) {
  const [index, setIndex] = useState(0);
  const total = galleryImages.length;
  const current = galleryImages[index];

  const goPrev = useCallback(() => {
    setIndex((i) => (i - 1 + total) % total);
  }, [total]);

  const goNext = useCallback(() => {
    setIndex((i) => (i + 1) % total);
  }, [total]);

  return (
    <div className={`flex w-full min-w-0 flex-col ${className}`}>
      <div className="premium-rotating-border premium-rotating-border--gallery luxury-shadow w-full">
        <div className="premium-rotating-border__inner w-full overflow-hidden">
          <div className="relative aspect-[4/3] w-full">
            <button
              type="button"
              onClick={goPrev}
              aria-label="Previous image"
              className="absolute left-2 top-1/2 z-10 flex h-9 w-9 -translate-y-1/2 items-center justify-center rounded-full bg-cta text-white shadow-[0_2px_10px_rgba(91,45,139,0.22)] transition-colors duration-200 hover:bg-cta-hover sm:left-3"
            >
              <ChevronLeft className="h-4 w-4" strokeWidth={2} />
            </button>

            <div className="absolute inset-0 flex items-center justify-center px-11 py-4 sm:px-12 sm:py-5">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                key={current.alt}
                src={current.src.src}
                alt={current.alt}
                draggable={false}
                className="max-h-full max-w-full object-contain object-center"
              />
            </div>

            <button
              type="button"
              onClick={goNext}
              aria-label="Next image"
              className="absolute right-2 top-1/2 z-10 flex h-9 w-9 -translate-y-1/2 items-center justify-center rounded-full bg-cta text-white shadow-[0_2px_10px_rgba(91,45,139,0.22)] transition-colors duration-200 hover:bg-cta-hover sm:right-3"
            >
              <ChevronRight className="h-4 w-4" strokeWidth={2} />
            </button>
          </div>
        </div>
      </div>

      <div className="mt-3 flex shrink-0 justify-center gap-1.5">
        {galleryImages.map((_, i) => (
          <button
            key={i}
            type="button"
            onClick={() => setIndex(i)}
            aria-label={`Go to image ${i + 1}`}
            className={`h-1.5 rounded-full transition-[width,background-color] duration-200 ${
              i === index ? "w-5 bg-cta" : "w-1.5 bg-border hover:bg-cta/40"
            }`}
          />
        ))}
      </div>
    </div>
  );
}
