"use client";

import Link from "next/link";
import { shopYourSizeBanner } from "@/lib/data";

export function ShopYourSizeBanner() {
  const { heading, tagline, offer, image, href, bgColor } = shopYourSizeBanner;

  return (
    <section className="bg-white py-6 sm:py-8 md:py-10">
      <h2 className="text-center text-sm sm:text-base font-bold uppercase tracking-[0.15em] text-[#111] mb-4 sm:mb-5 px-4">
        {heading}
      </h2>

      <Link href={href} className="block group relative overflow-hidden" style={{ backgroundColor: bgColor }}>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={image}
          alt="Shop your size"
          className="w-full h-auto block transition-transform duration-700 group-hover:scale-[1.01]"
        />

        <div className="absolute inset-0 flex items-center pointer-events-none">
          <div className="px-6 sm:px-10 md:px-16 lg:px-20 max-w-[55%] sm:max-w-[50%]">
            <p className="text-white text-base sm:text-xl md:text-2xl font-normal mb-0.5 sm:mb-1 drop-shadow-sm">
              {tagline}
            </p>
            <p className="text-white text-xl sm:text-3xl md:text-4xl lg:text-5xl font-bold uppercase tracking-wide leading-tight drop-shadow-sm">
              {offer}
            </p>
          </div>
        </div>
      </Link>
    </section>
  );
}
