"use client";

import Link from "next/link";
import { featuredCategoryGrid } from "@/lib/data";
import { Container } from "@/components/ui/Container";

export function FeaturedCategories() {
  return (
    <section id="collection" className="bg-white pt-4 sm:pt-5 pb-6 sm:pb-8">
      <Container className="!px-3 sm:!px-6 md:!px-8">
        <h2 className="text-center text-sm sm:text-base font-bold uppercase tracking-[0.15em] text-[#111] mb-5 sm:mb-6">
          Featured Categories
        </h2>

        <div className="grid grid-cols-3 lg:grid-cols-6 gap-2 sm:gap-2.5 lg:gap-3">
          {featuredCategoryGrid.map((category) => (
            <Link
              key={category.id}
              href={category.href}
              className="group flex flex-col bg-white border border-[#e0e0e0] aspect-[4/5] overflow-hidden transition-shadow duration-300 hover:shadow-[0_2px_12px_rgba(0,0,0,0.06)]"
            >
              <div className="px-2.5 sm:px-3 pt-2 sm:pt-2 shrink-0">
                <span className="text-[10px] sm:text-[11px] font-bold uppercase leading-none tracking-wide text-[#111111]">
                  {category.label}
                </span>
              </div>

              <div className="relative flex-1 min-h-0 flex items-center justify-center px-0 bg-white overflow-hidden">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={category.image}
                  alt={category.label}
                  className="h-[118%] w-auto max-w-[125%] object-contain mix-blend-multiply transition-transform duration-500 ease-out group-hover:scale-[1.05]"
                />
              </div>
            </Link>
          ))}
        </div>
      </Container>
    </section>
  );
}
