"use client";

import { AuthProvider } from "@/context/AuthContext";
import { CartProvider } from "@/context/CartContext";
import { UIProvider } from "@/context/UIContext";
import { ScrollToTop } from "@/components/layout/ScrollToTop";
import { SiteShell } from "@/components/layout/SiteShell";

export function AppProviders({ children }: { children: React.ReactNode }) {
  return (
    <AuthProvider>
      <CartProvider>
        <UIProvider>
          <SiteShell>{children}</SiteShell>
          <ScrollToTop />
        </UIProvider>
      </CartProvider>
    </AuthProvider>
  );
}
