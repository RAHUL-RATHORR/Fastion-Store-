"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { User, Menu, X, Heart, Package, Search } from "lucide-react";
import { navLinks } from "@/lib/data";
import { cn } from "@/lib/utils";
import { Container } from "@/components/ui/Container";
import { SearchButton, DesktopSearchBar } from "@/components/layout/SearchOverlay";
import { CartButton } from "@/components/layout/CartDrawer";
import { WishlistButton } from "@/components/layout/WishlistDrawer";
import { useUI } from "@/context/UIContext";

function Logo({ className, showText = true }: { className?: string; showText?: boolean }) {
  return (
    <Link href="/" className={cn("flex items-center gap-2 shrink-0 min-h-[44px]", className)}>
      <div className="relative shrink-0 w-9 h-9 sm:w-10 sm:h-10 lg:w-11 lg:h-11">
        <Image
          src="/logo.png?v=3"
          alt="GILZOD Logo"
          fill
          unoptimized
          sizes="44px"
          className="object-contain"
          priority
        />
      </div>
      {showText && (
        <span className="font-[family-name:var(--font-playfair)] text-base sm:text-lg lg:text-xl leading-none tracking-[0.08em] text-[#111111] hidden min-[480px]:block">
          GILZOD
        </span>
      )}
    </Link>
  );
}

function NavItem({ href, label }: { href: string; label: string }) {
  const pathname = usePathname();
  const [hash, setHash] = useState("");

  useEffect(() => {
    const updateHash = () => setHash(window.location.hash);
    updateHash();
    window.addEventListener("hashchange", updateHash);
    return () => window.removeEventListener("hashchange", updateHash);
  }, [pathname]);

  const isActive =
    href === "#home" || href === "/"
      ? pathname === "/" && (hash === "" || hash === "#home")
      : hash === href;

  return (
    <Link
      href={href}
      className={cn(
        "relative inline-flex items-center min-h-[44px] px-1 text-[13px] xl:text-sm font-bold uppercase tracking-[0.06em] text-[#111111] hover:text-[#333333] transition-colors",
        "after:absolute after:bottom-1 after:left-0 after:right-0 after:h-[2px] after:bg-[#111111] after:transition-transform after:duration-200",
        isActive ? "after:scale-x-100" : "after:scale-x-0 hover:after:scale-x-100"
      )}
    >
      {label}
    </Link>
  );
}

export function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const { openSearch, openWishlist } = useUI();

  useEffect(() => {
    document.body.style.overflow = mobileOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileOpen]);

  const iconClass =
    "text-[#111111] hover:text-[#555555] min-h-[44px] min-w-[44px] flex items-center justify-center transition-colors";

  return (
    <>
      <header className="fixed top-0 left-0 right-0 z-50 bg-white border-b border-[#e8e8e8] pt-[env(safe-area-inset-top)] shadow-[0_1px_0_rgba(0,0,0,0.04)]">
        <Container className="!px-4 sm:!px-6 md:!px-8 lg:!px-10 xl:!px-12">
          <nav className="flex items-center justify-between gap-3 py-3 lg:py-4 lg:grid lg:grid-cols-[1fr_auto_1fr] lg:items-center">
            {/* Left — mobile logo / desktop nav */}
            <div className="flex items-center min-w-0 lg:justify-start">
              <Logo className="lg:hidden" />
              <ul className="hidden lg:flex items-center gap-8 xl:gap-10">
                {navLinks.map((link) => (
                  <li key={link.label}>
                    <NavItem href={link.href} label={link.label} />
                  </li>
                ))}
              </ul>
            </div>

            {/* Center — desktop logo */}
            <Logo className="hidden lg:flex justify-self-center" />

            {/* Right — search + icons */}
            <div className="flex items-center justify-end gap-0.5 sm:gap-1 lg:gap-2 min-w-0">
              <DesktopSearchBar className="hidden lg:flex flex-1 max-w-[240px] xl:max-w-[320px] 2xl:max-w-[360px] mr-1 xl:mr-2" />
              <SearchButton className={cn(iconClass, "lg:hidden")} />
              <Link href="/account" aria-label="Account" className={cn(iconClass, "hidden sm:flex")}>
                <User className="w-[22px] h-[22px]" strokeWidth={1.75} />
              </Link>
              <WishlistButton className={cn(iconClass, "hidden sm:flex")} />
              <CartButton className={iconClass} />
              <button
                aria-label="Menu"
                className={cn(iconClass, "lg:hidden")}
                onClick={() => setMobileOpen(true)}
              >
                <Menu className="w-6 h-6" strokeWidth={1.75} />
              </button>
            </div>
          </nav>
        </Container>
      </header>

      {mobileOpen && (
        <div className="fixed inset-0 z-[60] lg:hidden">
          <div className="absolute inset-0 bg-black/40" onClick={() => setMobileOpen(false)} />
          <div className="absolute right-0 top-0 bottom-0 w-full max-w-[min(100vw,24rem)] bg-white border-l border-[#e8e8e8] p-6 pt-[calc(1.5rem+env(safe-area-inset-top))] pb-[calc(1.5rem+env(safe-area-inset-bottom))]">
            <div className="flex justify-between items-center mb-8">
              <Link href="/" onClick={() => setMobileOpen(false)} className="flex items-center gap-3 min-h-[44px]">
                <div className="relative shrink-0 w-10 h-10">
                  <Image src="/logo.png?v=3" alt="GILZOD Logo" fill unoptimized sizes="40px" className="object-contain" />
                </div>
                <span className="font-[family-name:var(--font-playfair)] text-lg tracking-[0.08em] text-[#111111]">
                  GILZOD
                </span>
              </Link>
              <button
                aria-label="Close menu"
                onClick={() => setMobileOpen(false)}
                className="text-[#111111] min-h-[44px] min-w-[44px] flex items-center justify-center"
              >
                <X className="w-6 h-6" />
              </button>
            </div>
            <ul className="space-y-1">
              {navLinks.map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    onClick={() => setMobileOpen(false)}
                    className="block py-3.5 text-sm font-bold uppercase tracking-[0.08em] text-[#111111] hover:text-[#555555] min-h-[48px] flex items-center border-b border-[#f0f0f0]"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>

            <div className="mt-6 pt-6 border-t border-[#eeeeee] space-y-1">
              <button
                type="button"
                onClick={() => {
                  setMobileOpen(false);
                  openSearch();
                }}
                className="w-full flex items-center gap-3 py-3.5 text-sm font-semibold text-[#111111] min-h-[48px]"
              >
                <Search className="w-5 h-5" strokeWidth={1.75} />
                Search Products
              </button>
              <Link
                href="/account"
                onClick={() => setMobileOpen(false)}
                className="flex items-center gap-3 py-3.5 text-sm font-semibold text-[#111111] min-h-[48px]"
              >
                <User className="w-5 h-5" strokeWidth={1.75} />
                My Account
              </Link>
              <Link
                href="/track-order"
                onClick={() => setMobileOpen(false)}
                className="flex items-center gap-3 py-3.5 text-sm font-semibold text-[#111111] min-h-[48px]"
              >
                <Package className="w-5 h-5" strokeWidth={1.75} />
                Track Order
              </Link>
              <button
                type="button"
                onClick={() => {
                  setMobileOpen(false);
                  openWishlist();
                }}
                className="w-full flex items-center gap-3 py-3.5 text-sm font-semibold text-[#111111] min-h-[48px]"
              >
                <Heart className="w-5 h-5" strokeWidth={1.75} />
                Wishlist
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
