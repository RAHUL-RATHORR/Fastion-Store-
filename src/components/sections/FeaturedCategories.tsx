"use client";

import Link from "next/link";
import { featuredCategoryGrid } from "@/lib/data";

export function FeaturedCategories() {
  return (
    <section id="collection" className="bg-white py-8 sm:py-10 md:py-12">
      <h2 className="text-center text-sm sm:text-base font-bold uppercase tracking-[0.15em] text-[#111] mb-6 sm:mb-8 px-4">
        Featured Categories
      </h2>

      <div className="grid grid-cols-2 sm:grid-cols-4 border-t border-l border-[#e8e8e8]">
        {featuredCategoryGrid.map((category) => (
          <Link
            key={category.id}
            href={category.href}
            className="group relative flex flex-col border-r border-b border-[#e8e8e8] bg-white aspect-[4/5] sm:aspect-[3/4] overflow-hidden hover:bg-[#fafafa] transition-colors"
          >
            <div className="px-3 sm:px-4 pt-3 sm:pt-4 z-10">
              <span className="text-[10px] sm:text-[11px] font-semibold uppercase tracking-wide text-[#111]">
                {category.label}
              </span>
            </div>

            <div className="relative flex-1 flex items-end justify-center px-2 sm:px-4 pb-2 sm:pb-4">
              <div className="absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-[#f0f0f0]/80 to-transparent pointer-events-none" />
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={category.image}
                alt={category.label}
                className="relative z-[1] max-h-[75%] sm:max-h-[80%] w-auto object-contain transition-transform duration-500 group-hover:scale-105"
              />
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}
