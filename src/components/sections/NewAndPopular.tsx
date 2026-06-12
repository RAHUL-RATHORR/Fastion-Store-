"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { Loader2 } from "lucide-react";
import { allProducts } from "@/lib/data";
import { cn } from "@/lib/utils";
import { ProductCardFromCatalog } from "@/components/ui/ProductCard";

const filters = [
  { id: "all", label: "All" },
  { id: "Shirts", label: "Shirts" },
  { id: "T-Shirts", label: "T-Shirts" },
  { id: "Pants", label: "Pants" },
  { id: "Lower", label: "Lower" },
] as const;

const swatchSets = [
  ["#1a1a1a", "#6b7280", "#92400e"],
  ["#111827", "#374151"],
  ["#1e3a5f", "#ffffff", "#b91c1c"],
  ["#365314", "#78716c"],
];

const INITIAL_BATCH = 10;
const LOAD_BATCH = 10;
const LOAD_DELAY_MS = 1000;

function ColorSwatches({ index }: { index: number }) {
  const swatches = swatchSets[index % swatchSets.length];
  return (
    <div className="flex items-center gap-1.5 mt-2">
      {swatches.map((color) => (
        <span
          key={color}
          className="w-3 h-3 rounded-full border border-black/10 shrink-0"
          style={{ backgroundColor: color }}
        />
      ))}
    </div>
  );
}

export function NewAndPopular() {
  const [activeFilter, setActiveFilter] = useState<(typeof filters)[number]["id"]>("all");
  const [visibleCount, setVisibleCount] = useState(INITIAL_BATCH);
  const [loading, setLoading] = useState(false);
  const sentinelRef = useRef<HTMLDivElement>(null);
  const loadingRef = useRef(false);

  const filteredProducts = useMemo(() => {
    if (activeFilter === "all") return allProducts;
    return allProducts.filter((p) => p.category === activeFilter);
  }, [activeFilter]);

  const visibleProducts = filteredProducts.slice(0, visibleCount);
  const remaining = Math.max(filteredProducts.length - visibleCount, 0);

  useEffect(() => {
    setVisibleCount(INITIAL_BATCH);
    setLoading(false);
    loadingRef.current = false;
  }, [activeFilter]);

  const loadMore = useCallback(() => {
    if (loadingRef.current || visibleCount >= filteredProducts.length) return;

    loadingRef.current = true;
    setLoading(true);

    window.setTimeout(() => {
      setVisibleCount((prev) => Math.min(prev + LOAD_BATCH, filteredProducts.length));
      setLoading(false);
      loadingRef.current = false;
    }, LOAD_DELAY_MS);
  }, [filteredProducts.length, visibleCount]);

  useEffect(() => {
    const node = sentinelRef.current;
    if (!node || remaining <= 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0]?.isIntersecting) loadMore();
      },
      { rootMargin: "240px" }
    );

    observer.observe(node);
    return () => observer.disconnect();
  }, [loadMore, remaining, visibleProducts.length]);

  return (
    <section id="new-arrivals" className="bg-white py-8 sm:py-10 md:py-12 px-4">
      <h2 className="text-center text-sm sm:text-base font-bold uppercase tracking-[0.15em] text-[#111] mb-5 sm:mb-6">
        New and Popular
      </h2>

      <div className="flex overflow-x-auto scrollbar-hide gap-2 mb-6 sm:mb-8 max-w-4xl mx-auto -mx-1 px-1 sm:flex-wrap sm:justify-center sm:overflow-visible">
        {filters.map((filter) => (
          <button
            key={filter.id}
            type="button"
            onClick={() => setActiveFilter(filter.id)}
            className={cn(
              "shrink-0 px-3.5 sm:px-4 py-2 text-[10px] sm:text-[11px] font-semibold uppercase tracking-wide border transition-colors min-h-[40px]",
              activeFilter === filter.id
                ? "bg-[#111] text-white border-[#111]"
                : "bg-white text-[#111] border-[#111]/25 hover:border-[#111]/50"
            )}
          >
            {filter.label}
          </button>
        ))}
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-x-2.5 gap-y-5 sm:gap-x-4 sm:gap-y-8 max-w-[1920px] mx-auto">
        {visibleProducts.map((product, index) => (
          <div key={product.id}>
            <ProductCardFromCatalog product={product} index={index} compact />
            <ColorSwatches index={index} />
          </div>
        ))}
      </div>

      <div ref={sentinelRef} className="h-px w-full" aria-hidden />

      {(loading || remaining > 0) && (
        <div className="flex flex-col items-center justify-center pt-8 sm:pt-10 pb-2 min-h-[72px]">
          {loading ? (
            <Loader2 className="w-6 h-6 text-[#111]/40 animate-spin" />
          ) : (
            <button
              type="button"
              onClick={loadMore}
              className="flex items-center gap-2 text-xs sm:text-sm text-[#111]/70 hover:text-[#111] transition-colors"
            >
              <span className="w-2 h-2 rounded-full bg-[#e65100] shrink-0" />
              {remaining} more {remaining === 1 ? "style" : "styles"} to discover
            </button>
          )}
        </div>
      )}
    </section>
  );
}
