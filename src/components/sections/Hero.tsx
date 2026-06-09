"use client";

import { useState, useEffect, useCallback } from "react";
import Link from "next/link";
import { ChevronLeft, ChevronRight, ArrowRight } from "lucide-react";
import { heroSlides } from "@/lib/data";
import { cn } from "@/lib/utils";

const AUTO_INTERVAL = 5000;

export function Hero() {
  const [active, setActive] = useState(0);
  const total = heroSlides.length;

  const next = useCallback(() => setActive((i) => (i + 1) % total), [total]);
  const prev = useCallback(() => setActive((i) => (i - 1 + total) % total), [total]);

  useEffect(() => {
    const timer = setInterval(next, AUTO_INTERVAL);
    return () => clearInterval(timer);
  }, [next]);

  return (
    <section
      id="home"
      className="bg-white pt-[calc(5.5rem+env(safe-area-inset-top))] md:pt-[calc(6rem+env(safe-area-inset-top))]"
    >
      <div className="relative h-[52vh] min-h-[300px] max-h-[480px] sm:min-h-[340px] sm:max-h-[520px] md:min-h-[380px] md:max-h-[560px] overflow-hidden">
        {heroSlides.map((slide, i) => (
          <Link
            key={slide.id}
            href={slide.href}
            aria-hidden={i !== active}
            className={cn(
              "absolute inset-0 transition-opacity duration-700 ease-in-out block",
              i === active ? "opacity-100 z-10" : "opacity-0 z-0 pointer-events-none"
            )}
          >
            <div
              className="absolute inset-0"
              style={{ background: slide.gradient }}
            />

            <div className="relative h-full flex items-center">
              <div className="relative z-10 flex flex-col justify-center px-6 sm:px-10 md:px-14 lg:px-20 max-w-[55%] sm:max-w-[50%]">
                <span
                  className="text-[10px] sm:text-xs font-semibold uppercase tracking-[0.2em] mb-2 sm:mb-3"
                  style={{ color: slide.accent }}
                >
                  {slide.tag}
                </span>
                <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold uppercase text-white leading-tight tracking-wide mb-2 sm:mb-3">
                  {slide.title}
                </h2>
                <p className="text-xs sm:text-sm text-white/75 leading-relaxed mb-4 sm:mb-6 max-w-[280px]">
                  {slide.subtitle}
                </p>
                <span
                  className="inline-flex items-center gap-2 w-fit px-5 sm:px-6 py-2.5 sm:py-3 text-[11px] sm:text-xs font-bold uppercase tracking-wider text-[#111] rounded-sm"
                  style={{ backgroundColor: slide.accent }}
                >
                  Shop Now
                  <ArrowRight className="w-4 h-4" />
                </span>
              </div>

              <div className="absolute right-0 top-0 bottom-0 w-[55%] sm:w-[50%] pointer-events-none">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={slide.image}
                  alt={slide.title}
                  className="absolute bottom-0 right-0 h-[95%] sm:h-full w-auto max-w-none object-contain object-bottom drop-shadow-2xl"
                />
              </div>

              <div
                className="absolute right-6 sm:right-10 md:right-14 top-1/2 -translate-y-1/2 z-20 rounded-2xl px-4 sm:px-5 py-3 sm:py-4 text-center shadow-lg hidden sm:block"
                style={{ backgroundColor: slide.badgeBg }}
              >
                <p className="text-[10px] sm:text-xs uppercase tracking-wider text-white/90 font-medium">
                  {slide.discountLabel}
                </p>
                <p className="text-3xl sm:text-4xl md:text-5xl font-black text-white leading-none my-0.5">
                  {slide.discount}%
                </p>
                <p
                  className="text-xs sm:text-sm font-bold uppercase tracking-wider"
                  style={{ color: slide.accent }}
                >
                  Off
                </p>
              </div>
            </div>
          </Link>
        ))}

        <button
          type="button"
          aria-label="Previous slide"
          onClick={prev}
          className="absolute left-3 sm:left-4 top-1/2 -translate-y-1/2 z-30 w-9 h-9 sm:w-10 sm:h-10 flex items-center justify-center rounded-full bg-white/90 text-[#111] shadow-md hover:bg-white transition-colors"
        >
          <ChevronLeft className="w-5 h-5" />
        </button>
        <button
          type="button"
          aria-label="Next slide"
          onClick={next}
          className="absolute right-3 sm:right-4 top-1/2 -translate-y-1/2 z-30 w-9 h-9 sm:w-10 sm:h-10 flex items-center justify-center rounded-full bg-white/90 text-[#111] shadow-md hover:bg-white transition-colors"
        >
          <ChevronRight className="w-5 h-5" />
        </button>

        <div className="absolute bottom-3 sm:bottom-4 left-1/2 -translate-x-1/2 z-30 flex items-center gap-2">
          {heroSlides.map((slide, i) => (
            <button
              key={slide.id}
              type="button"
              aria-label={`Go to slide ${i + 1}`}
              onClick={() => setActive(i)}
              className={cn(
                "h-1.5 rounded-full transition-all duration-300",
                i === active
                  ? "w-7 bg-[#F5C518]"
                  : "w-1.5 bg-white/40 hover:bg-white/60"
              )}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
