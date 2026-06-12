"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
  type ReactNode,
} from "react";

const WISHLIST_KEY = "gilzod-wishlist";

function readWishlist(): number[] {
  if (typeof window === "undefined") return [];
  try {
    const raw = localStorage.getItem(WISHLIST_KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw) as unknown;
    return Array.isArray(parsed)
      ? parsed.filter((x): x is number => typeof x === "number")
      : [];
  } catch {
    return [];
  }
}

type UIContextType = {
  searchOpen: boolean;
  openSearch: () => void;
  closeSearch: () => void;
  sizeGuideOpen: boolean;
  openSizeGuide: () => void;
  closeSizeGuide: () => void;
  wishlist: number[];
  wishlistOpen: boolean;
  openWishlist: () => void;
  closeWishlist: () => void;
  toggleWishlist: (id: number) => void;
  isWishlisted: (id: number) => boolean;
  checkoutAuthOpen: boolean;
  checkoutAuthRedirect: string;
  openCheckoutAuth: (redirect?: string) => void;
  closeCheckoutAuth: () => void;
};

const UIContext = createContext<UIContextType | null>(null);

export function UIProvider({ children }: { children: ReactNode }) {
  const [searchOpen, setSearchOpen] = useState(false);
  const [sizeGuideOpen, setSizeGuideOpen] = useState(false);
  const [wishlistOpen, setWishlistOpen] = useState(false);
  const [wishlist, setWishlist] = useState<number[]>([]);
  const [checkoutAuthOpen, setCheckoutAuthOpen] = useState(false);
  const [checkoutAuthRedirect, setCheckoutAuthRedirect] = useState("/checkout");
  const [ready, setReady] = useState(false);

  useEffect(() => {
    setWishlist(readWishlist());
    setReady(true);
  }, []);

  useEffect(() => {
    if (!ready) return;
    localStorage.setItem(WISHLIST_KEY, JSON.stringify(wishlist));
  }, [wishlist, ready]);

  const toggleWishlist = useCallback((id: number) => {
    setWishlist((prev) =>
      prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]
    );
  }, []);

  const isWishlisted = useCallback(
    (id: number) => wishlist.includes(id),
    [wishlist]
  );

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
        wishlistOpen,
        openWishlist: () => setWishlistOpen(true),
        closeWishlist: () => setWishlistOpen(false),
        toggleWishlist,
        isWishlisted,
        checkoutAuthOpen,
        checkoutAuthRedirect,
        openCheckoutAuth: (redirect = "/checkout") => {
          setCheckoutAuthRedirect(redirect);
          setCheckoutAuthOpen(true);
        },
        closeCheckoutAuth: () => setCheckoutAuthOpen(false),
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
