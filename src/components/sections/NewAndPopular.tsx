"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Heart, Loader2 } from "lucide-react";
import { allProducts, type CatalogProduct } from "@/lib/data";
import { cn } from "@/lib/utils";
import { useUI } from "@/context/UIContext";

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

function formatInr(price: number) {
  return new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 0,
  }).format(Math.round(price * 15));
}

function ProductCard({
  product,
  index,
  isWishlisted,
  onToggleWishlist,
}: {
  product: CatalogProduct;
  index: number;
  isWishlisted: boolean;
  onToggleWishlist: (id: number) => void;
}) {
  const swatches = swatchSets[index % swatchSets.length];

  return (
    <article className="group">
      <Link href={`/product/${product.id}`} className="block">
        <div className="relative aspect-[3/4] bg-[#f5f5f5] overflow-hidden mb-2.5 sm:mb-3">
          <Image
            src={product.image}
            alt={product.name}
            fill
            sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 20vw"
            className="object-cover transition-transform duration-500 group-hover:scale-[1.03]"
          />
          <button
            type="button"
            aria-label="Wishlist"
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              onToggleWishlist(product.id);
            }}
            className="absolute top-2.5 right-2.5 w-8 h-8 flex items-center justify-center z-10"
          >
            <Heart
              className={cn(
                "w-4 h-4 transition-colors",
                isWishlisted ? "fill-[#111] text-[#111]" : "text-[#111]/70"
              )}
              strokeWidth={1.5}
            />
          </button>
        </div>

        <h3 className="text-[11px] sm:text-xs text-[#111] leading-snug line-clamp-2 mb-1">
          {product.name}
        </h3>
        <p className="text-xs sm:text-sm font-semibold text-[#111] mb-2">
          {formatInr(product.price)}
        </p>
      </Link>

      <div className="flex items-center gap-1.5">
        {swatches.map((color) => (
          <span
            key={color}
            className="w-3 h-3 rounded-full border border-black/10 shrink-0"
            style={{ backgroundColor: color }}
          />
        ))}
      </div>
    </article>
  );
}

export function NewAndPopular() {
  const [activeFilter, setActiveFilter] = useState<(typeof filters)[number]["id"]>("all");
  const [visibleCount, setVisibleCount] = useState(INITIAL_BATCH);
  const [loading, setLoading] = useState(false);
  const sentinelRef = useRef<HTMLDivElement>(null);
  const loadingRef = useRef(false);
  const { wishlist, toggleWishlist } = useUI();

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

      <div className="flex flex-wrap justify-center gap-2 sm:gap-2.5 mb-6 sm:mb-8 max-w-4xl mx-auto">
        {filters.map((filter) => (
          <button
            key={filter.id}
            type="button"
            onClick={() => setActiveFilter(filter.id)}
            className={cn(
              "px-3 sm:px-4 py-1.5 sm:py-2 text-[10px] sm:text-[11px] font-semibold uppercase tracking-wide border transition-colors",
              activeFilter === filter.id
                ? "bg-[#111] text-white border-[#111]"
                : "bg-white text-[#111] border-[#111]/25 hover:border-[#111]/50"
            )}
          >
            {filter.label}
          </button>
        ))}
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-x-3 gap-y-6 sm:gap-x-4 sm:gap-y-8 max-w-[1920px] mx-auto">
        {visibleProducts.map((product, index) => (
          <ProductCard
            key={product.id}
            product={product}
            index={index}
            isWishlisted={wishlist.includes(product.id)}
            onToggleWishlist={toggleWishlist}
          />
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
