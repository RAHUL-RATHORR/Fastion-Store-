"use client";

import Link from "next/link";
import { shopYourSizeBanner } from "@/lib/data";

export function ShopYourSizeBanner() {
  const { heading, tagline, offer, image, href, bgColor } = shopYourSizeBanner;

  return (
    <section className="bg-white py-4 sm:py-5 md:py-6">
      <h2 className="text-center text-sm sm:text-base font-bold uppercase tracking-[0.15em] text-[#111] mb-5 sm:mb-6 px-4">
        {heading}
      </h2>

      <Link
        href={href}
        className="block group relative overflow-hidden w-full"
        style={{ backgroundColor: bgColor }}
      >
        <div className="relative h-[180px] sm:h-[210px] md:h-[250px] lg:h-[280px]">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={image}
            alt="Shop your size"
            className="absolute inset-0 w-full h-full object-cover object-[70%_center] sm:object-[65%_center] transition-transform duration-700 group-hover:scale-[1.02]"
          />

          <div className="absolute inset-0 flex items-center pointer-events-none">
            <div className="px-4 sm:px-6 md:px-8 max-w-[58%] sm:max-w-[50%]">
              <p className="text-white text-xs sm:text-sm md:text-base font-normal mb-0.5 drop-shadow-sm">
                {tagline}
              </p>
              <p className="text-white text-base sm:text-xl md:text-2xl lg:text-3xl font-bold uppercase tracking-wide leading-tight drop-shadow-sm">
                {offer}
              </p>
            </div>
          </div>
        </div>
      </Link>
    </section>
  );
}
