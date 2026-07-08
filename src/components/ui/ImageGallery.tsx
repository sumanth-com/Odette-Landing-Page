"use client";

import { SITE_IMAGES } from "@/lib/images";
import { ChevronLeft, ChevronRight } from "lucide-react";
import Image from "next/image";
import { useCallback, useState } from "react";

interface ImageGalleryProps {
  className?: string;
}

export function ImageGallery({ className = "" }: ImageGalleryProps) {
  const [index, setIndex] = useState(0);
  const total = SITE_IMAGES.gallery.length;
  const current = SITE_IMAGES.gallery[index];

  const goPrev = useCallback(() => {
    setIndex((i) => (i - 1 + total) % total);
  }, [total]);

  const goNext = useCallback(() => {
    setIndex((i) => (i + 1) % total);
  }, [total]);

  return (
    <div className={`flex w-full min-w-0 flex-col ${className}`} role="region" aria-label="Odette franchise gallery">
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

            <div className="absolute inset-0 px-11 py-4 sm:px-12 sm:py-5">
              <div className="relative h-full w-full">
                <Image
                  key={current.src}
                  src={current.src}
                  alt={current.alt}
                  fill
                  quality={85}
                  sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 480px"
                  loading={index === 0 ? "eager" : "lazy"}
                  draggable={false}
                  className="object-contain object-center"
                />
              </div>
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

      <div className="mt-3 flex items-center justify-center gap-2">
        {SITE_IMAGES.gallery.map((item, dotIndex) => (
          <button
            key={item.src}
            type="button"
            onClick={() => setIndex(dotIndex)}
            aria-label={`Show image ${dotIndex + 1}`}
            aria-current={dotIndex === index ? "true" : undefined}
            className={`h-2 w-2 rounded-full transition-colors duration-200 ${
              dotIndex === index ? "bg-cta" : "bg-cta/25 hover:bg-cta/40"
            }`}
          />
        ))}
      </div>
    </div>
  );
}
