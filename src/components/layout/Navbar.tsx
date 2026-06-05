"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { User, Menu, X } from "lucide-react";
import { navLinks } from "@/lib/data";
import { cn } from "@/lib/utils";
import { Container } from "@/components/ui/Container";
import { SearchButton } from "@/components/layout/SearchOverlay";
import { CartButton } from "@/components/layout/CartDrawer";

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = mobileOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileOpen]);

  const linkColor = scrolled
    ? "text-[#c0c0c0] hover:text-[#ffffff]"
    : "text-[#e5e5e5]/90 hover:text-white";

  const iconColor = scrolled
    ? "text-[#c0c0c0] hover:text-white"
    : "text-[#e5e5e5]/85 hover:text-white";

  return (
    <>
      <motion.header
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
        className={cn(
          "fixed top-0 left-0 right-0 z-50 transition-all duration-500",
          "pt-[env(safe-area-inset-top)]",
          scrolled ? "glass-strong py-2.5 md:py-3" : "bg-transparent py-4 md:py-5 lg:py-6"
        )}
      >
        <Container className="!px-4 sm:!px-6 md:!px-8 lg:!px-10 xl:!px-12">
          <nav className="flex items-center justify-between gap-3">
            <Link href="#home" className="flex items-center gap-2.5 sm:gap-3 group shrink-0 min-h-[44px]">
              <div className="relative shrink-0 w-11 h-11 sm:w-12 sm:h-12 md:w-[52px] md:h-[52px] transition-transform duration-300 group-hover:scale-105">
                <Image
                  src="/logo.png?v=3"
                  alt="GILZOD Logo"
                  fill
                  unoptimized
                  sizes="52px"
                  className="object-contain"
                  priority
                />
              </div>
              <span className="font-[family-name:var(--font-playfair)] text-base sm:text-lg md:text-xl leading-none tracking-[0.12em] sm:tracking-[0.15em] text-[#f5f5f5] group-hover:text-white transition-colors duration-300 hidden min-[480px]:block drop-shadow-[0_1px_8px_rgba(0,0,0,0.5)]">
                GILZOD
              </span>
            </Link>

            {/* Desktop + Tablet landscape nav */}
            <ul className="hidden lg:flex items-center gap-6 xl:gap-10">
              {navLinks.map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    className={cn(
                      "text-[10px] xl:text-[11px] uppercase tracking-[0.18em] xl:tracking-[0.22em] font-medium transition-all duration-300 relative group drop-shadow-[0_1px_6px_rgba(0,0,0,0.4)] min-h-[44px] inline-flex items-center",
                      linkColor
                    )}
                  >
                    {link.label}
                    <span className="absolute -bottom-1 left-0 w-0 h-px bg-gradient-to-r from-[#c0c0c0] to-[#e5e5e5] transition-all duration-300 group-hover:w-full" />
                  </Link>
                </li>
              ))}
            </ul>

            <div className="flex items-center gap-3 sm:gap-4 md:gap-6">
              <SearchButton className={cn("transition-colors duration-300 min-h-[44px] min-w-[44px] flex items-center justify-center", iconColor)} />
              <Link
                href="/account"
                aria-label="Account"
                className={cn(
                  "transition-colors duration-300 min-h-[44px] min-w-[44px] items-center justify-center hidden sm:flex",
                  iconColor
                )}
              >
                <User className="w-5 h-5" strokeWidth={1.5} />
              </Link>
              <CartButton className={cn("transition-colors duration-300", iconColor)} />
              <button
                aria-label="Menu"
                className={cn(
                  "lg:hidden transition-colors duration-300 min-h-[44px] min-w-[44px] flex items-center justify-center",
                  iconColor
                )}
                onClick={() => setMobileOpen(true)}
              >
                <Menu className="w-6 h-6" strokeWidth={1.5} />
              </button>
            </div>
          </nav>
        </Container>
      </motion.header>

      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[60] lg:hidden"
          >
            <div
              className="absolute inset-0 bg-[#050505]/90 backdrop-blur-xl"
              onClick={() => setMobileOpen(false)}
            />
            <motion.div
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", damping: 30, stiffness: 300 }}
              className="absolute right-0 top-0 bottom-0 w-full max-w-[min(100vw,24rem)] bg-[#0d0d0d] border-l border-[rgba(192,192,192,0.08)] p-6 sm:p-8 pt-[calc(1.5rem+env(safe-area-inset-top))] pb-[calc(1.5rem+env(safe-area-inset-bottom))]"
            >
              <div className="flex justify-between items-center mb-10 sm:mb-12">
                <Link href="#home" onClick={() => setMobileOpen(false)} className="flex items-center gap-3">
                  <div className="relative shrink-0 w-11 h-11 sm:w-12 sm:h-12">
                    <Image src="/logo.png?v=3" alt="GILZOD Logo" fill unoptimized sizes="48px" className="object-contain" />
                  </div>
                  <span className="font-[family-name:var(--font-playfair)] text-lg sm:text-xl leading-none tracking-[0.15em] text-[#f5f5f5]">
                    GILZOD
                  </span>
                </Link>
                <button
                  aria-label="Close menu"
                  onClick={() => setMobileOpen(false)}
                  className="text-[#c0c0c0] hover:text-white transition-colors min-h-[44px] min-w-[44px] flex items-center justify-center"
                >
                  <X className="w-6 h-6" />
                </button>
              </div>
              <ul className="space-y-2">
                {navLinks.map((link, i) => (
                  <motion.li
                    key={link.label}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.05 }}
                  >
                    <Link
                      href={link.href}
                      onClick={() => setMobileOpen(false)}
                      className="block py-3 text-base sm:text-lg uppercase tracking-[0.18em] text-[#e5e5e5] hover:text-white transition-colors duration-300 min-h-[44px] flex items-center"
                    >
                      {link.label}
                    </Link>
                  </motion.li>
                ))}
              </ul>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
