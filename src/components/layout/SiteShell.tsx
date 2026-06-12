"use client";

import { Navbar } from "@/components/layout/Navbar";
import { PincodeBar } from "@/components/layout/PincodeBar";
import { CartDrawer } from "@/components/layout/CartDrawer";
import { WishlistDrawer } from "@/components/layout/WishlistDrawer";
import { SearchOverlay } from "@/components/layout/SearchOverlay";
import { MobileBottomNav } from "@/components/layout/MobileBottomNav";
import { SizeGuideModal } from "@/components/ui/SizeGuideModal";
import { CheckoutAuthModal } from "@/components/auth/CheckoutAuthModal";

export function SiteShell({ children }: { children: React.ReactNode }) {
  return (
    <>
      <CartDrawer />
      <WishlistDrawer />
      <SearchOverlay />
      <SizeGuideModal />
      <CheckoutAuthModal />
      <Navbar />
      <PincodeBar />
      {children}
      <MobileBottomNav />
    </>
  );
}
