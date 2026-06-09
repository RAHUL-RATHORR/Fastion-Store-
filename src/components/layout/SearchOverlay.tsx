"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { Search, X } from "lucide-react";
import { useUI } from "@/context/UIContext";
import { allProducts, searchTrending } from "@/lib/data";

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
          className="fixed inset-0 z-[90] bg-[#050505]/95 backdrop-blur-xl flex flex-col pt-[env(safe-area-inset-top)]"
        >
          <div className="max-w-3xl mx-auto w-full px-4 sm:px-6 pt-8 sm:pt-12">
            <div className="flex items-center gap-4 border-b border-[rgba(192,192,192,0.15)] pb-4">
              <Search className="w-5 h-5 text-[#c0c0c0] shrink-0" />
              <input
                autoFocus
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search products..."
                className="flex-1 bg-transparent text-white text-lg sm:text-xl outline-none placeholder:text-[#a1a1aa]"
              />
              <button onClick={closeSearch} aria-label="Close search" className="text-[#a1a1aa] hover:text-white min-h-[44px] min-w-[44px] flex items-center justify-center">
                <X className="w-6 h-6" />
              </button>
            </div>

            {!query && (
              <div className="mt-8">
                <p className="text-[10px] uppercase tracking-[0.3em] text-[#a1a1aa] mb-4">Trending</p>
                <div className="flex flex-wrap gap-2">
                  {searchTrending.map((term) => (
                    <button
                      key={term}
                      onClick={() => setQuery(term)}
                      className="glass px-4 py-2 text-xs text-[#c0c0c0] hover:text-white transition-colors"
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
                  <p className="text-[#a1a1aa] text-sm">No results for &quot;{query}&quot;</p>
                ) : (
                  filtered.map((p) => (
                    <Link
                      key={p.id}
                      href={`/product/${p.id}`}
                      onClick={closeSearch}
                      className="block glass p-4 hover:silver-glow transition-all"
                    >
                      <span className="text-white text-sm">{p.name}</span>
                      <span className="text-[#a1a1aa] text-xs ml-3">{p.category}</span>
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
