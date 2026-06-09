"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { User, Menu, X } from "lucide-react";
import { navLinks } from "@/lib/data";
import { cn } from "@/lib/utils";
import { Container } from "@/components/ui/Container";
import { SearchButton } from "@/components/layout/SearchOverlay";
import { CartButton } from "@/components/layout/CartDrawer";

export function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    document.body.style.overflow = mobileOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileOpen]);

  const linkClass =
    "text-[10px] xl:text-[11px] uppercase tracking-[0.18em] font-medium text-[#111] hover:text-[#555] min-h-[44px] inline-flex items-center";
  const iconClass =
    "text-[#111] hover:text-[#555] min-h-[44px] min-w-[44px] flex items-center justify-center";

  return (
    <>
      <header className="fixed top-0 left-0 right-0 z-50 bg-white border-b border-black/10 pt-[env(safe-area-inset-top)]">
        <Container className="!px-4 sm:!px-6 md:!px-8 lg:!px-10 xl:!px-12">
          <nav className="flex items-center justify-between gap-3 py-3 md:py-3.5">
            <Link href="/" className="flex items-center gap-2.5 sm:gap-3 shrink-0 min-h-[44px]">
              <div className="relative shrink-0 w-10 h-10 sm:w-11 sm:h-11">
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
              <span className="font-[family-name:var(--font-playfair)] text-base sm:text-lg leading-none tracking-[0.12em] text-[#111] hidden min-[480px]:block">
                GILZOD
              </span>
            </Link>

            <ul className="hidden lg:flex items-center gap-6 xl:gap-10">
              {navLinks.map((link) => (
                <li key={link.label}>
                  <Link href={link.href} className={linkClass}>
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>

            <div className="flex items-center gap-2 sm:gap-3">
              <SearchButton className={iconClass} />
              <Link href="/account" aria-label="Account" className={cn(iconClass, "hidden sm:flex")}>
                <User className="w-5 h-5" strokeWidth={1.5} />
              </Link>
              <CartButton className={iconClass} />
              <button
                aria-label="Menu"
                className={cn(iconClass, "lg:hidden")}
                onClick={() => setMobileOpen(true)}
              >
                <Menu className="w-6 h-6" strokeWidth={1.5} />
              </button>
            </div>
          </nav>
        </Container>
      </header>

      {mobileOpen && (
        <div className="fixed inset-0 z-[60] lg:hidden">
          <div
            className="absolute inset-0 bg-black/40"
            onClick={() => setMobileOpen(false)}
          />
          <div className="absolute right-0 top-0 bottom-0 w-full max-w-[min(100vw,24rem)] bg-white border-l border-black/10 p-6 pt-[calc(1.5rem+env(safe-area-inset-top))] pb-[calc(1.5rem+env(safe-area-inset-bottom))]">
            <div className="flex justify-between items-center mb-8">
              <Link href="/" onClick={() => setMobileOpen(false)} className="flex items-center gap-3">
                <div className="relative shrink-0 w-10 h-10">
                  <Image src="/logo.png?v=3" alt="GILZOD Logo" fill unoptimized sizes="40px" className="object-contain" />
                </div>
                <span className="font-[family-name:var(--font-playfair)] text-lg tracking-[0.12em] text-[#111]">
                  GILZOD
                </span>
              </Link>
              <button
                aria-label="Close menu"
                onClick={() => setMobileOpen(false)}
                className="text-[#111] min-h-[44px] min-w-[44px] flex items-center justify-center"
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
                    className="block py-3 text-sm uppercase tracking-[0.15em] text-[#111] hover:text-[#555] min-h-[44px] flex items-center"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
      )}
    </>
  );
}
