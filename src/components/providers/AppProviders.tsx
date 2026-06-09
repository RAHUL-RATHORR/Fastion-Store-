"use client";

import { AuthProvider } from "@/context/AuthContext";
import { CartProvider } from "@/context/CartContext";
import { UIProvider } from "@/context/UIContext";
import { ScrollToTop } from "@/components/layout/ScrollToTop";

export function AppProviders({ children }: { children: React.ReactNode }) {
  return (
    <AuthProvider>
      <CartProvider>
        <UIProvider>
          {children}
          <ScrollToTop />
        </UIProvider>
      </CartProvider>
    </AuthProvider>
  );
}
