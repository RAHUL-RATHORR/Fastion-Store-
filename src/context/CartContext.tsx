"use client";

import {
  createContext,
  useContext,
  useState,
  useCallback,
  type ReactNode,
} from "react";
import { allProducts } from "@/lib/data";

const MAX_QTY = 10;

export type CartItem = {
  id: number;
  name: string;
  price: number;
  image: string;
  size: string;
  quantity: number;
};

type CartContextType = {
  items: CartItem[];
  isOpen: boolean;
  openCart: () => void;
  closeCart: () => void;
  addToCart: (productId: number, size?: string, quantity?: number) => void;
  updateQuantity: (id: number, size: string, quantity: number) => void;
  getQuantity: (id: number, size?: string) => number;
  removeFromCart: (id: number, size: string) => void;
  clearCart: () => void;
  totalItems: number;
};

const CartContext = createContext<CartContextType | null>(null);

function normalizeSize(size?: string) {
  return (size || "M").trim();
}

export function CartProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([]);
  const [isOpen, setIsOpen] = useState(false);

  const addToCart = useCallback((productId: number, size = "M", quantity = 1) => {
    const id = Number(productId);
    if (!Number.isFinite(id)) return;

    const product = allProducts.find((p) => p.id === id);
    if (!product) return;

    const normalizedSize = normalizeSize(size);
    const qty = Math.min(MAX_QTY, Math.max(1, quantity));

    setItems((prev) => {
      const existing = prev.find((i) => i.id === id && i.size === normalizedSize);
      if (existing) {
        return prev.map((i) =>
          i.id === id && i.size === normalizedSize
            ? { ...i, quantity: Math.min(MAX_QTY, i.quantity + qty) }
            : i
        );
      }
      return [
        ...prev,
        {
          id: product.id,
          name: product.name,
          price: product.price,
          image: product.image,
          size: normalizedSize,
          quantity: qty,
        },
      ];
    });
  }, []);

  const updateQuantity = useCallback((id: number, size: string, quantity: number) => {
    const normalizedSize = normalizeSize(size);
    const qty = Math.min(MAX_QTY, Math.max(0, quantity));

    setItems((prev) => {
      if (qty === 0) {
        return prev.filter((i) => !(i.id === id && i.size === normalizedSize));
      }
      return prev.map((i) =>
        i.id === id && i.size === normalizedSize ? { ...i, quantity: qty } : i
      );
    });
  }, []);

  const getQuantity = useCallback(
    (id: number, size = "M") => {
      const normalizedSize = normalizeSize(size);
      return items.find((i) => i.id === id && i.size === normalizedSize)?.quantity ?? 0;
    },
    [items]
  );

  const removeFromCart = useCallback((id: number, size: string) => {
    const normalizedSize = normalizeSize(size);
    setItems((prev) => prev.filter((i) => !(i.id === id && i.size === normalizedSize)));
  }, []);

  const clearCart = useCallback(() => {
    setItems([]);
    setIsOpen(false);
  }, []);

  const totalItems = items.reduce((sum, i) => sum + i.quantity, 0);

  return (
    <CartContext.Provider
      value={{
        items,
        isOpen,
        openCart: () => setIsOpen(true),
        closeCart: () => setIsOpen(false),
        addToCart,
        updateQuantity,
        getQuantity,
        removeFromCart,
        clearCart,
        totalItems,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error("useCart must be used within CartProvider");
  return ctx;
}
