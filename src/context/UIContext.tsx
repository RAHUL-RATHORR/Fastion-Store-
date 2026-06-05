"use client";

import {
  createContext,
  useContext,
  useState,
  type ReactNode,
} from "react";

type UIContextType = {
  searchOpen: boolean;
  openSearch: () => void;
  closeSearch: () => void;
  sizeGuideOpen: boolean;
  openSizeGuide: () => void;
  closeSizeGuide: () => void;
  wishlist: number[];
  toggleWishlist: (id: number) => void;
};

const UIContext = createContext<UIContextType | null>(null);

export function UIProvider({ children }: { children: ReactNode }) {
  const [searchOpen, setSearchOpen] = useState(false);
  const [sizeGuideOpen, setSizeGuideOpen] = useState(false);
  const [wishlist, setWishlist] = useState<number[]>([]);

  const toggleWishlist = (id: number) => {
    setWishlist((prev) =>
      prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]
    );
  };

  return (
    <UIContext.Provider
      value={{
        searchOpen,
        openSearch: () => setSearchOpen(true),
        closeSearch: () => setSearchOpen(false),
        sizeGuideOpen,
        openSizeGuide: () => setSizeGuideOpen(true),
        closeSizeGuide: () => setSizeGuideOpen(false),
        wishlist,
        toggleWishlist,
      }}
    >
      {children}
    </UIContext.Provider>
  );
}

export function useUI() {
  const ctx = useContext(UIContext);
  if (!ctx) throw new Error("useUI must be used within UIProvider");
  return ctx;
}
