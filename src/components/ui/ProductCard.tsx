"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { Heart, Star, Eye } from "lucide-react";
import { getProductMeta, type CatalogProduct } from "@/lib/data";
import { formatInr, cn } from "@/lib/utils";
import { useUI } from "@/context/UIContext";

interface ProductCardProps {
  id: number;
  name: string;
  price: number;
  category: string;
  image: string;
  index?: number;
  badge?: "New" | "Bestseller";
  compact?: boolean;
}

export function ProductCard({
  id,
  name,
  price,
  category: _category,
  image,
  index = 0,
  badge,
  compact = false,
}: ProductCardProps) {
  const [isHovered, setIsHovered] = useState(false);
  const { wishlist, toggleWishlist } = useUI();
  const isWishlisted = wishlist.includes(id);
  const meta = getProductMeta({ id, name, price, category: _category, image, badge });

  return (
    <motion.article
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ duration: 0.5, delay: (index % 10) * 0.04, ease: [0.22, 1, 0.36, 1] }}
      className="group"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="relative aspect-[3/4] bg-[#f4f4f4] overflow-hidden mb-2.5 sm:mb-3">
        <Link href={`/product/${id}`} className="absolute inset-0 block z-[1]">
          <Image
            src={image}
            alt={name}
            fill
            sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 20vw"
            className={cn(
              "object-cover transition-all duration-500",
              isHovered ? "opacity-0 scale-105" : "opacity-100 scale-100"
            )}
          />
          <Image
            src={meta.hoverImage}
            alt=""
            fill
            sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 20vw"
            className={cn(
              "object-cover transition-all duration-500",
              isHovered ? "opacity-100 scale-105" : "opacity-0 scale-100"
            )}
            aria-hidden
          />
        </Link>

        <div className="absolute top-2.5 left-2.5 flex flex-col gap-1.5 z-10 pointer-events-none">
          {meta.saleLabel && (
            <span className="bg-[#e53935] text-white text-[9px] sm:text-[10px] font-bold uppercase tracking-wider px-2 py-1">
              {meta.saleLabel}
            </span>
          )}
          {badge && (
            <span className="bg-[#111111] text-white text-[9px] sm:text-[10px] font-bold uppercase tracking-wider px-2 py-1">
              {badge}
            </span>
          )}
        </div>

        <button
          type="button"
          onClick={(e) => {
            e.preventDefault();
            e.stopPropagation();
            toggleWishlist(id);
          }}
          aria-label="Wishlist"
          className="absolute top-2 right-2 sm:top-2.5 sm:right-2.5 w-10 h-10 sm:w-9 sm:h-9 rounded-full bg-white/95 shadow-sm flex items-center justify-center z-[3] active:scale-95 transition-transform"
        >
          <Heart
            className={cn(
              "w-4 h-4 transition-colors",
              isWishlisted ? "fill-[#e53935] text-[#e53935]" : "text-[#111111]"
            )}
            strokeWidth={1.75}
          />
        </button>

        <Link
          href={`/product/${id}`}
          className={cn(
            "absolute inset-x-2 sm:inset-x-3 bottom-2 sm:bottom-3 z-10 flex items-center justify-center gap-2 min-h-[40px] py-2 bg-white/95 text-[#111111] text-[10px] sm:text-[11px] font-bold uppercase tracking-wider shadow-md transition-all duration-300",
            "md:opacity-0 md:translate-y-2 md:pointer-events-none md:group-hover:opacity-100 md:group-hover:translate-y-0 md:group-hover:pointer-events-auto"
          )}
        >
          <Eye className="w-3.5 h-3.5" strokeWidth={2} />
          Quick View
        </Link>
      </div>

      <Link href={`/product/${id}`} className="block space-y-1">
        <div className="flex items-center gap-1 mb-0.5">
          <Star className="w-3 h-3 fill-[#f59e0b] text-[#f59e0b] shrink-0" />
          <span className="text-[11px] sm:text-xs font-semibold text-[#111111]">{meta.rating}</span>
          <span className="text-[10px] sm:text-[11px] text-[#888888]">
            ({meta.reviewCount})
          </span>
        </div>
        <h3
          className={cn(
            "text-[#111111] leading-snug line-clamp-2 group-hover:text-[#444444] transition-colors",
            compact ? "text-[11px] sm:text-xs" : "text-xs sm:text-sm"
          )}
        >
          {name}
        </h3>
        <div className="flex items-center gap-2 flex-wrap pt-0.5">
          <span className="text-xs sm:text-sm font-bold text-[#111111]">{formatInr(price)}</span>
          {meta.originalPrice && (
            <span className="text-[11px] sm:text-xs text-[#999999] line-through">
              {formatInr(meta.originalPrice)}
            </span>
          )}
        </div>
      </Link>
    </motion.article>
  );
}

export function ProductCardFromCatalog({
  product,
  index = 0,
  compact,
}: {
  product: CatalogProduct;
  index?: number;
  compact?: boolean;
}) {
  return (
    <ProductCard
      id={product.id}
      name={product.name}
      price={product.price}
      category={product.category}
      image={product.image}
      badge={product.badge}
      index={index}
      compact={compact}
    />
  );
}
