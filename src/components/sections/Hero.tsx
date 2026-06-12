"use client";

import { useState, useEffect, useCallback } from "react";
import Link from "next/link";
import { ChevronLeft, ChevronRight, ArrowRight } from "lucide-react";
import { heroSlides, heroBrand } from "@/lib/data";
import { cn } from "@/lib/utils";

const AUTO_INTERVAL = 5500;

export function Hero() {
  const [active, setActive] = useState(0);
  const total = heroSlides.length;
  const slide = heroSlides[active];

  const next = useCallback(() => setActive((i) => (i + 1) % total), [total]);
  const prev = useCallback(() => setActive((i) => (i - 1 + total) % total), [total]);

  useEffect(() => {
    const timer = setInterval(next, AUTO_INTERVAL);
    return () => clearInterval(timer);
  }, [next]);

  return (
    <section
      id="home"
      className="relative w-full bg-white sm:bg-[#111111] pt-[calc(6.25rem+env(safe-area-inset-top))] md:pt-[calc(6.75rem+env(safe-area-inset-top))]"
    >
      <div className="relative w-full min-h-[480px] sm:min-h-[62vh] md:min-h-[68vh] lg:min-h-[72vh] max-h-[820px] overflow-hidden">
        {heroSlides.map((item, i) => (
          <div
            key={item.id}
            aria-hidden={i !== active}
            className={cn(
              "absolute inset-0 transition-opacity duration-1000 ease-in-out",
              i === active ? "opacity-100 z-0" : "opacity-0 z-0"
            )}
          >
            {/* Mobile — larger centered image, same slider height */}
            <div className="absolute inset-0 sm:hidden bg-[#f5f5f5] overflow-hidden">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={item.image}
                alt={item.title}
                className="absolute left-1/2 top-[46%] -translate-x-1/2 -translate-y-1/2 w-[155%] max-w-none h-[155%] object-contain object-center"
              />
            </div>

            {/* Tablet+ — gradient + side model */}
            <div className="absolute inset-0 hidden sm:block" style={{ background: item.gradient }} />
            <div className="absolute inset-0 hidden sm:block bg-gradient-to-r from-black/75 via-black/45 to-black/10" />
            <div className="absolute inset-y-0 right-0 w-[52%] md:w-[48%] lg:w-[45%] hidden sm:block">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={item.image}
                alt=""
                className="absolute bottom-0 right-0 h-[95%] md:h-full w-auto max-w-none object-contain object-bottom opacity-95"
              />
            </div>
          </div>
        ))}

        {/* Mobile — Shop Now only, bottom center */}
        <div className="sm:hidden absolute bottom-10 left-0 right-0 z-20 flex justify-center px-6">
          <Link
            href={heroBrand.ctaHref}
            className="inline-flex items-center justify-center gap-2 min-h-[48px] w-full max-w-[260px] px-8 py-3.5 bg-[#111111] text-white text-xs font-bold uppercase tracking-[0.14em] hover:bg-[#333333] transition-colors shadow-md"
          >
            {heroBrand.ctaLabel}
            <ArrowRight className="w-4 h-4" strokeWidth={2.5} />
          </Link>
        </div>

        {/* Desktop — full text + CTA */}
        <div className="relative z-10 h-full min-h-[inherit] hidden sm:flex items-center">
          <div className="w-full px-8 md:px-12 lg:px-16 xl:px-20 py-12 md:py-14">
            <div className="max-w-xl lg:max-w-2xl">
              <span
                className="inline-block text-xs font-bold uppercase tracking-[0.28em] mb-5"
                style={{ color: slide.accent }}
              >
                {slide.tag}
              </span>
              <h1 className="font-[family-name:var(--font-playfair)] text-5xl md:text-6xl lg:text-7xl font-bold uppercase text-white leading-[0.95] tracking-[0.04em] mb-5">
                {heroBrand.headline}
              </h1>
              <p className="text-base md:text-lg text-white/90 leading-relaxed max-w-md md:max-w-lg mb-9">
                {heroBrand.subline}
              </p>
              <Link
                href={heroBrand.ctaHref}
                className="inline-flex items-center justify-center gap-2.5 min-h-[48px] px-9 py-4 bg-white text-[#111111] text-sm font-bold uppercase tracking-[0.14em] hover:bg-[#f0f0f0] transition-colors shadow-lg"
              >
                {heroBrand.ctaLabel}
                <ArrowRight className="w-4 h-4" strokeWidth={2.5} />
              </Link>
            </div>
          </div>
        </div>

        <h1 className="sr-only">{heroBrand.headline}</h1>

        <div
          className="absolute right-5 sm:right-8 md:right-12 top-1/2 -translate-y-1/2 z-20 rounded-2xl px-4 sm:px-6 py-3 sm:py-5 text-center shadow-2xl hidden sm:block"
          style={{ backgroundColor: slide.badgeBg }}
        >
          <p className="text-[10px] sm:text-xs uppercase tracking-wider text-white/90 font-semibold">
            {slide.discountLabel}
          </p>
          <p className="text-3xl sm:text-4xl md:text-5xl font-black text-white leading-none my-1">
            {slide.discount}%
          </p>
          <p className="text-xs sm:text-sm font-bold uppercase tracking-wider" style={{ color: slide.accent }}>
            Off
          </p>
        </div>

        <button
          type="button"
          aria-label="Previous slide"
          onClick={prev}
          className="absolute left-2 sm:left-5 top-1/2 -translate-y-1/2 z-30 w-9 h-9 sm:w-11 sm:h-11 flex items-center justify-center rounded-full bg-white/95 text-[#111111] shadow-lg hover:bg-white transition-colors"
        >
          <ChevronLeft className="w-5 h-5" />
        </button>
        <button
          type="button"
          aria-label="Next slide"
          onClick={next}
          className="absolute right-2 sm:right-5 top-1/2 -translate-y-1/2 z-30 w-9 h-9 sm:w-11 sm:h-11 flex items-center justify-center rounded-full bg-white/95 text-[#111111] shadow-lg hover:bg-white transition-colors"
        >
          <ChevronRight className="w-5 h-5" />
        </button>

        <div className="absolute bottom-3 sm:bottom-6 left-1/2 -translate-x-1/2 z-30 flex items-center gap-2">
          {heroSlides.map((item, i) => (
            <button
              key={item.id}
              type="button"
              aria-label={`Go to slide ${i + 1}`}
              onClick={() => setActive(i)}
              className={cn(
                "h-1.5 rounded-full transition-all duration-300",
                i === active
                  ? "w-8 bg-[#111111] sm:bg-white"
                  : "w-1.5 bg-[#111111]/30 sm:bg-white/35 hover:bg-[#111111]/50 sm:hover:bg-white/55"
              )}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
