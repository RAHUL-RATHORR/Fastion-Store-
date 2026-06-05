"use client";

import { useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { X, ShoppingBag } from "lucide-react";
import { useCart } from "@/context/CartContext";
import { formatPrice } from "@/lib/utils";
import { cn } from "@/lib/utils";
export function CartDrawer() {
  const { items, isOpen, closeCart, removeFromCart, totalItems } = useCart();
  const total = items.reduce((sum, i) => sum + i.price * i.quantity, 0);

  useEffect(() => {
    document.body.style.overflow = isOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-[#050505]/70 backdrop-blur-sm z-[70]"
            onClick={closeCart}
          />
          <motion.aside
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", damping: 30, stiffness: 300 }}
            className="fixed right-0 top-0 bottom-0 w-full max-w-md bg-[#0d0d0d] border-l border-[rgba(192,192,192,0.08)] z-[80] flex flex-col pt-[env(safe-area-inset-top)] pb-[env(safe-area-inset-bottom)]"
          >
            <div className="flex items-center justify-between p-6 border-b border-[rgba(192,192,192,0.08)]">
              <h2 className="font-[family-name:var(--font-playfair)] text-xl text-white">
                Your Bag ({totalItems})
              </h2>
              <button onClick={closeCart} aria-label="Close cart" className="text-[#a1a1aa] hover:text-white min-h-[44px] min-w-[44px] flex items-center justify-center">
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="flex-1 overflow-y-auto p-6 space-y-4">
              {items.length === 0 ? (
                <div className="text-center py-16">
                  <ShoppingBag className="w-12 h-12 text-[#a1a1aa] mx-auto mb-4" strokeWidth={1} />
                  <p className="text-[#a1a1aa] text-sm">Your bag is empty</p>
                </div>
              ) : (
                items.map((item) => (
                  <div key={`${item.id}-${item.size}`} className="flex gap-4 glass p-3">
                    <div className="relative w-20 h-24 shrink-0 overflow-hidden bg-[#111111]">
                      <Image src={item.image} alt={item.name} fill className="object-cover" sizes="80px" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <h3 className="text-sm text-white truncate">{item.name}</h3>
                      <p className="text-xs text-[#a1a1aa] mt-1">Size: {item.size}</p>
                      <p className="text-sm text-[#c0c0c0] mt-1">{formatPrice(item.price)}</p>
                      <div className="flex items-center justify-between mt-2">
                        <span className="text-xs text-[#a1a1aa]">Qty: {item.quantity}</span>
                        <button
                          onClick={() => removeFromCart(item.id, item.size)}
                          className="text-[10px] uppercase tracking-wider text-[#a1a1aa] hover:text-white"
                        >
                          Remove
                        </button>
                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>

            {items.length > 0 && (
              <div className="p-6 border-t border-[rgba(192,192,192,0.08)] space-y-4">
                <div className="flex justify-between text-sm">
                  <span className="text-[#a1a1aa]">Subtotal</span>
                  <span className="text-white font-medium">{formatPrice(total)}</span>
                </div>
                <Link
                  href="/checkout"
                  onClick={closeCart}
                  className="inline-flex items-center justify-center w-full min-h-[44px] px-6 py-3 text-[10px] sm:text-xs font-medium uppercase tracking-[0.15em] sm:tracking-[0.2em] transition-all duration-300 bg-[#e5e5e5] text-[#050505] hover:bg-white border border-transparent hover:shadow-[0_0_30px_rgba(229,229,229,0.3)]"
                >
                  Checkout
                </Link>
              </div>
            )}
          </motion.aside>
        </>
      )}
    </AnimatePresence>
  );
}

export function CartButton({ className }: { className?: string }) {
  const { openCart, totalItems } = useCart();
  return (
    <button
      onClick={openCart}
      aria-label="Cart"
      className={cn(
        "relative min-h-[44px] min-w-[44px] flex items-center justify-center transition-colors",
        className ?? "text-[#e5e5e5]/85 hover:text-white"
      )}
    >
      <ShoppingBag className="w-5 h-5" strokeWidth={1.5} />
      {totalItems > 0 && (
        <span className="absolute top-2 right-1 w-4 h-4 bg-[#e5e5e5] text-[#050505] text-[9px] font-medium rounded-full flex items-center justify-center">
          {totalItems}
        </span>
      )}
    </button>
  );
}
