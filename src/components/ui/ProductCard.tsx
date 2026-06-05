"use client";

import { useState } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { Heart, ShoppingBag, Ruler } from "lucide-react";
import { formatPrice } from "@/lib/utils";
import { useCart } from "@/context/CartContext";
import { useUI } from "@/context/UIContext";
import { sizes } from "@/lib/data";
import { Button } from "./Button";

interface ProductCardProps {
  id: number;
  name: string;
  price: number;
  category: string;
  image: string;
  index: number;
  badge?: "New" | "Bestseller";
}

export function ProductCard({
  id,
  name,
  price,
  category,
  image,
  index,
  badge,
}: ProductCardProps) {
  const [isHovered, setIsHovered] = useState(false);
  const [selectedSize, setSelectedSize] = useState("M");
  const { addToCart } = useCart();
  const { wishlist, toggleWishlist, openSizeGuide } = useUI();
  const isWishlisted = wishlist.includes(id);

  return (
    <motion.article
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.6, delay: index * 0.08, ease: [0.22, 1, 0.36, 1] }}
      className="group relative"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="relative aspect-[3/4] overflow-hidden bg-[#111111] luxury-shadow">
        <Image
          src={image}
          alt={name}
          fill
          sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
          className="object-cover transition-transform duration-700 ease-out md:group-hover:scale-110"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#050505]/80 via-transparent to-transparent opacity-60" />

        {badge && (
          <span className="absolute top-3 left-3 text-[8px] sm:text-[10px] uppercase tracking-[0.15em] bg-[#e5e5e5] text-[#050505] px-2 py-1 sm:px-3 sm:py-1.5 font-medium">
            {badge}
          </span>
        )}

        <button
          onClick={() => toggleWishlist(id)}
          aria-label="Wishlist"
          className="absolute top-3 right-3 w-9 h-9 glass rounded-full flex items-center justify-center hover:silver-glow transition-all"
        >
          <Heart
            className={`w-4 h-4 transition-colors ${isWishlisted ? "fill-[#e5e5e5] text-[#e5e5e5]" : "text-[#c0c0c0]"}`}
            strokeWidth={1.5}
          />
        </button>

        <div className={`absolute inset-0 hidden md:flex flex-col items-center justify-end p-3 lg:p-4 pb-5 lg:pb-6 bg-[#050505]/40 backdrop-blur-[2px] transition-opacity duration-300 ${isHovered ? "opacity-100" : "opacity-0"}`}>
          <div className="flex gap-1.5 mb-3 flex-wrap justify-center">
            {sizes.slice(0, 5).map((size) => (
              <button
                key={size}
                onClick={() => setSelectedSize(size)}
                className={`w-8 h-8 text-[10px] border transition-colors ${selectedSize === size ? "border-[#e5e5e5] text-white bg-[#111111]" : "border-[rgba(192,192,192,0.2)] text-[#a1a1aa] hover:border-[#c0c0c0]"}`}
              >
                {size}
              </button>
            ))}
          </div>
          <div className="flex gap-2">
            <Button variant="primary" className="px-3 lg:px-5 py-2 text-[9px] lg:text-[10px]" onClick={() => addToCart(id, selectedSize)}>
              <ShoppingBag className="w-3 h-3 lg:w-3.5 lg:h-3.5 mr-1.5" />
              Add to Cart
            </Button>
            <Button variant="secondary" className="px-3 py-2 text-[9px]" onClick={openSizeGuide}>
              <Ruler className="w-3 h-3 mr-1" />
              Size
            </Button>
          </div>
        </div>

        <div className="md:hidden absolute bottom-0 inset-x-0 p-2.5 flex gap-2 bg-gradient-to-t from-[#050505]/90 to-transparent pt-8">
          <Button variant="primary" className="flex-1 px-2 py-2 text-[8px] sm:text-[9px] min-h-[36px]" onClick={() => addToCart(id, selectedSize)}>
            Add
          </Button>
          <Button variant="secondary" className="flex-1 px-2 py-2 text-[8px] sm:text-[9px] min-h-[36px]" onClick={openSizeGuide}>
            Size
          </Button>
        </div>
      </div>

      <div className="mt-3 sm:mt-4 md:mt-5 space-y-0.5 sm:space-y-1">
        <h3 className="text-xs sm:text-sm md:text-base font-light text-white tracking-wide line-clamp-2">{name}</h3>
        <p className="text-[#c0c0c0] text-xs sm:text-sm tracking-wider">{formatPrice(price)}</p>
      </div>
    </motion.article>
  );
}
