"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { Search, X } from "lucide-react";
import { useUI } from "@/context/UIContext";
import { allProducts, searchTrending } from "@/lib/data";
import { cn } from "@/lib/utils";

export function SearchOverlay() {
  const { searchOpen, closeSearch } = useUI();
  const [query, setQuery] = useState("");

  useEffect(() => {
    document.body.style.overflow = searchOpen ? "hidden" : "";
    if (!searchOpen) setQuery("");
    return () => {
      document.body.style.overflow = "";
    };
  }, [searchOpen]);

  const filtered = query
    ? allProducts.filter((p) =>
        p.name.toLowerCase().includes(query.toLowerCase())
      )
    : [];

  return (
    <AnimatePresence>
      {searchOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[90] bg-white/98 backdrop-blur-xl flex flex-col pt-[env(safe-area-inset-top)]"
        >
          <div className="max-w-3xl mx-auto w-full px-4 sm:px-6 pt-8 sm:pt-12">
            <div className="flex items-center gap-4 border-b border-[#e5e5e5] pb-4">
              <Search className="w-5 h-5 text-[#666666] shrink-0" />
              <input
                autoFocus
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search products..."
                className="flex-1 bg-transparent text-[#111111] text-lg sm:text-xl outline-none placeholder:text-[#999999]"
              />
              <button onClick={closeSearch} aria-label="Close search" className="text-[#666666] hover:text-[#111111] min-h-[44px] min-w-[44px] flex items-center justify-center">
                <X className="w-6 h-6" />
              </button>
            </div>

            {!query && (
              <div className="mt-8">
                <p className="text-[10px] uppercase tracking-[0.3em] text-[#888888] mb-4">Trending</p>
                <div className="flex flex-wrap gap-2">
                  {searchTrending.map((term) => (
                    <button
                      key={term}
                      onClick={() => setQuery(term)}
                      className="glass px-4 py-2 text-xs text-[#666666] hover:text-[#111111] transition-colors"
                    >
                      {term}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {query && (
              <div className="mt-8 space-y-3">
                {filtered.length === 0 ? (
                  <p className="text-[#666666] text-sm">No results for &quot;{query}&quot;</p>
                ) : (
                  filtered.map((p) => (
                    <Link
                      key={p.id}
                      href={`/product/${p.id}`}
                      onClick={closeSearch}
                      className="block glass p-4 hover:shadow-[0_2px_8px_rgba(0,0,0,0.08)] transition-all"
                    >
                      <span className="text-[#111111] text-sm">{p.name}</span>
                      <span className="text-[#888888] text-xs ml-3">{p.category}</span>
                    </Link>
                  ))
                )}
              </div>
            )}
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

export function SearchButton({ className }: { className?: string }) {
  const { openSearch } = useUI();
  return (
    <button
      onClick={openSearch}
      aria-label="Search"
      className={className}
    >
      <Search className="w-5 h-5" strokeWidth={1.5} />
    </button>
  );
}

export function DesktopSearchBar({ className }: { className?: string }) {
  const { openSearch } = useUI();

  return (
    <button
      type="button"
      onClick={openSearch}
      aria-label="Search products"
      className={cn(
        "flex items-center gap-3 h-10 xl:h-11 w-full px-4 xl:px-5 rounded-full border border-[#d4d4d4] bg-white hover:border-[#111111] transition-colors text-left shadow-[0_1px_2px_rgba(0,0,0,0.04)]",
        className
      )}
    >
      <span className="flex-1 text-[13px] xl:text-sm text-[#999999] truncate">
        What are you looking for?
      </span>
      <Search className="w-[18px] h-[18px] text-[#111111] shrink-0" strokeWidth={2} />
    </button>
  );
}
