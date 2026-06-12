"use client";

import { useEffect } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { Minus, Plus, X, ShoppingBag } from "lucide-react";
import { useCart } from "@/context/CartContext";
import { useCheckoutGate } from "@/hooks/useCheckoutGate";
import { formatPrice, formatRupee, toInr } from "@/lib/utils";
import { cn } from "@/lib/utils";

export function CartDrawer() {
  const { items, isOpen, closeCart, updateQuantity, totalItems } = useCart();
  const { goToCheckout } = useCheckoutGate();
  const totalInr = items.reduce((sum, i) => sum + toInr(i.price) * i.quantity, 0);

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
            className="fixed inset-0 bg-black/40 backdrop-blur-sm z-[70]"
            onClick={closeCart}
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
                Your Bag ({totalItems})
              </h2>
              <button
                onClick={closeCart}
                aria-label="Close cart"
                className="text-[#666666] hover:text-[#111111] min-h-[44px] min-w-[44px] flex items-center justify-center"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="flex-1 overflow-y-auto p-6 space-y-4">
              {items.length === 0 ? (
                <div className="text-center py-16">
                  <ShoppingBag className="w-12 h-12 text-[#cccccc] mx-auto mb-4" strokeWidth={1} />
                  <p className="text-[#666666] text-sm">Your bag is empty</p>
                </div>
              ) : (
                items.map((item) => (
                  <div key={`${item.id}-${item.size}`} className="flex gap-4 glass p-3">
                    <div className="relative w-20 h-24 shrink-0 overflow-hidden bg-[#f4f4f4]">
                      <Image src={item.image} alt={item.name} fill className="object-cover" sizes="80px" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <h3 className="text-sm text-[#111111] truncate">{item.name}</h3>
                      <p className="text-xs text-[#666666] mt-1">Size: {item.size}</p>
                      <p className="text-sm text-[#333333] mt-1">{formatPrice(item.price)}</p>
                      <div className="flex items-center justify-between mt-3">
                        <div className="inline-flex items-center border border-[#e5e5e5]">
                          <button
                            type="button"
                            onClick={() => updateQuantity(item.id, item.size, item.quantity - 1)}
                            aria-label="Decrease quantity"
                            className="w-8 h-8 flex items-center justify-center text-[#666666] hover:text-[#111111] transition-colors"
                          >
                            <Minus className="w-3.5 h-3.5" />
                          </button>
                          <span className="w-8 text-center text-xs text-[#111111] font-medium">
                            {item.quantity}
                          </span>
                          <button
                            type="button"
                            onClick={() => updateQuantity(item.id, item.size, item.quantity + 1)}
                            disabled={item.quantity >= 10}
                            aria-label="Increase quantity"
                            className="w-8 h-8 flex items-center justify-center text-[#666666] hover:text-[#111111] transition-colors disabled:opacity-40"
                          >
                            <Plus className="w-3.5 h-3.5" />
                          </button>
                        </div>
                        <button
                          type="button"
                          onClick={() => updateQuantity(item.id, item.size, 0)}
                          className="text-[10px] uppercase tracking-wider text-[#888888] hover:text-[#111111]"
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
              <div className="p-6 border-t border-[#e5e5e5] space-y-4">
                <div className="flex justify-between text-sm">
                  <span className="text-[#666666]">Subtotal</span>
                  <span className="text-[#111111] font-medium">{formatRupee(totalInr)}</span>
                </div>
                <button
                  type="button"
                  onClick={() => {
                    closeCart();
                    goToCheckout();
                  }}
                  className="inline-flex items-center justify-center w-full min-h-[44px] px-6 py-3 text-[10px] sm:text-xs font-medium uppercase tracking-[0.15em] sm:tracking-[0.2em] transition-all duration-300 bg-[#111111] text-white hover:bg-[#333333]"
                >
                  Checkout
                </button>
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
        className ?? "text-[#111111] hover:text-[#666666]"
      )}
    >
      <ShoppingBag className="w-5 h-5" strokeWidth={1.5} />
      {totalItems > 0 && (
        <span className="absolute top-2 right-1 w-4 h-4 bg-[#111111] text-white text-[9px] font-medium rounded-full flex items-center justify-center">
          {totalItems}
        </span>
      )}
    </button>
  );
}
