"use client";

import { useEffect, useMemo } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { Heart, ShoppingBag, X } from "lucide-react";
import { allProducts } from "@/lib/data";
import { useUI } from "@/context/UIContext";
import { useCart } from "@/context/CartContext";
import { formatPrice, cn } from "@/lib/utils";

export function WishlistDrawer() {
  const { wishlist, wishlistOpen, closeWishlist, toggleWishlist } = useUI();
  const { addToCart } = useCart();

  const items = useMemo(
    () =>
      wishlist
        .map((id) => allProducts.find((p) => p.id === id))
        .filter((p): p is NonNullable<typeof p> => Boolean(p)),
    [wishlist]
  );

  useEffect(() => {
    document.body.style.overflow = wishlistOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [wishlistOpen]);

  return (
    <AnimatePresence>
      {wishlistOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/40 backdrop-blur-sm z-[70]"
            onClick={closeWishlist}
          />
          <motion.aside
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", damping: 30, stiffness: 300 }}
            className="fixed right-0 top-0 bottom-0 w-full max-w-md bg-white border-l border-[#e5e5e5] z-[80] flex flex-col pt-[env(safe-area-inset-top)] pb-[env(safe-area-inset-bottom)] shadow-[-4px_0_24px_rgba(0,0,0,0.08)]"
          >
            <div className="flex items-center justify-between p-6 border-b border-[#e5e5e5]">
              <h2 className="font-[family-name:var(--font-playfair)] text-xl text-[#111111]">
                Wishlist ({wishlist.length})
              </h2>
              <button
                type="button"
                onClick={closeWishlist}
                aria-label="Close wishlist"
                className="text-[#666666] hover:text-[#111111] min-h-[44px] min-w-[44px] flex items-center justify-center"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="flex-1 overflow-y-auto p-6 space-y-4">
              {items.length === 0 ? (
                <div className="text-center py-16">
                  <Heart className="w-12 h-12 text-[#cccccc] mx-auto mb-4" strokeWidth={1} />
                  <p className="text-[#666666] text-sm">Your wishlist is empty</p>
                  <p className="text-[#999999] text-xs mt-2">
                    Tap the heart on any product to save it here.
                  </p>
                </div>
              ) : (
                items.map((item) => (
                  <div key={item.id} className="flex gap-4 glass p-3">
                    <Link
                      href={`/product/${item.id}`}
                      onClick={closeWishlist}
                      className="relative w-20 h-24 shrink-0 overflow-hidden bg-[#f4f4f4]"
                    >
                      <Image src={item.image} alt={item.name} fill className="object-cover" sizes="80px" />
                    </Link>
                    <div className="flex-1 min-w-0">
                      <Link
                        href={`/product/${item.id}`}
                        onClick={closeWishlist}
                        className="text-sm text-[#111111] truncate block hover:text-[#444444]"
                      >
                        {item.name}
                      </Link>
                      <p className="text-sm text-[#333333] mt-1">{formatPrice(item.price)}</p>
                      <div className="flex items-center gap-3 mt-2">
                        <button
                          type="button"
                          onClick={() => {
                            addToCart(item.id);
                            closeWishlist();
                          }}
                          className="text-[10px] uppercase tracking-wider text-[#111111] hover:text-[#666666] flex items-center gap-1"
                        >
                          <ShoppingBag className="w-3 h-3" />
                          Add to Bag
                        </button>
                        <button
                          type="button"
                          onClick={() => toggleWishlist(item.id)}
                          className="text-[10px] uppercase tracking-wider text-[#888888] hover:text-[#e53935]"
                        >
                          Remove
                        </button>
                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>
          </motion.aside>
        </>
      )}
    </AnimatePresence>
  );
}

export function WishlistButton({ className }: { className?: string }) {
  const { openWishlist, wishlist } = useUI();

  return (
    <button
      type="button"
      onClick={openWishlist}
      aria-label="Wishlist"
      className={cn(
        "relative min-h-[44px] min-w-[44px] flex items-center justify-center transition-colors",
        className ?? "text-[#111111] hover:text-[#666666]"
      )}
    >
      <Heart className="w-[22px] h-[22px]" strokeWidth={1.75} />
      {wishlist.length > 0 && (
        <span className="absolute top-2 right-1 w-4 h-4 bg-[#e53935] text-white text-[9px] font-medium rounded-full flex items-center justify-center">
          {wishlist.length}
        </span>
      )}
    </button>
  );
}
