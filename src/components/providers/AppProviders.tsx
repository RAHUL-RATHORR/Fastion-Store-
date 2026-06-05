"use client";

import { CartProvider } from "@/context/CartContext";
import { UIProvider } from "@/context/UIContext";

export function AppProviders({ children }: { children: React.ReactNode }) {
  return (
    <CartProvider>
      <UIProvider>{children}</UIProvider>
    </CartProvider>
  );
}
