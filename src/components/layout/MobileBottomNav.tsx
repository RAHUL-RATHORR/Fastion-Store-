"use client";

import Link from "next/link";
import { Home, Grid3X3, ShoppingBag, User } from "lucide-react";
import { useCart } from "@/context/CartContext";

const links = [
  { href: "#home", icon: Home, label: "Home" },
  { href: "#collection", icon: Grid3X3, label: "Shop" },
  { href: "#cart", icon: ShoppingBag, label: "Bag", isCart: true },
  { href: "/account", icon: User, label: "Account" },
];

export function MobileBottomNav() {
  const { openCart, totalItems } = useCart();

  return (
    <nav className="md:hidden fixed bottom-0 left-0 right-0 z-50 glass-strong border-t border-[#e5e5e5] pb-[env(safe-area-inset-bottom)]">
      <div className="flex items-center justify-around py-2">
        {links.map(({ href, icon: Icon, label, isCart }) =>
          isCart ? (
            <button
              key={label}
              onClick={openCart}
              className="flex flex-col items-center gap-1 min-h-[44px] min-w-[44px] justify-center text-[#666666] hover:text-[#111111] relative"
            >
              <Icon className="w-5 h-5" strokeWidth={1.5} />
              {totalItems > 0 && (
                <span className="absolute top-0 right-2 w-4 h-4 bg-[#111111] text-white text-[8px] rounded-full flex items-center justify-center">
                  {totalItems}
                </span>
              )}
              <span className="text-[9px] uppercase tracking-wider">{label}</span>
            </button>
          ) : (
            <Link
              key={label}
              href={href}
              className="flex flex-col items-center gap-1 min-h-[44px] min-w-[44px] justify-center text-[#666666] hover:text-[#111111]"
            >
              <Icon className="w-5 h-5" strokeWidth={1.5} />
              <span className="text-[9px] uppercase tracking-wider">{label}</span>
            </Link>
          )
        )}
      </div>
    </nav>
  );
}
