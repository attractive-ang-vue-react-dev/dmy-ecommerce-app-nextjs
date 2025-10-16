"use client";

import React, { createContext, useContext, useEffect, useState } from "react";
import type { CartItem, ProductSummary } from "../types/product";

type CartContextShape = {
  items: CartItem[];
  addItem: (product: ProductSummary, qty?: number) => void;
  removeItem: (productId: number) => void;
  decrementItem: (productId: number) => void;
  clear: () => void;
  totalCount: number;
  totalPrice: number;
};

const CartContext = createContext<CartContextShape | undefined>(undefined);

const SESSION_KEY = "ecom_cart_v1";

export function useCart() {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error("useCart must be used within CartProvider");
  return ctx;
}

export const CartProvider: React.FC<{
  children: React.ReactNode;
}> = ({ children }) => {
  const [items, setItems] = useState<CartItem[]>(() => {
    try {
      const raw = sessionStorage.getItem(SESSION_KEY);
      if (!raw) return [];
      return JSON.parse(raw) as CartItem[];
    } catch (e) {
      return [];
    }
  });

  useEffect(() => {
    try {
      sessionStorage.setItem(SESSION_KEY, JSON.stringify(items));
    } catch (e) {
      // ignore
    }
  }, [items]);

  const addItem = (product: ProductSummary, qty = 1) => {
    setItems((prev) => {
      const existing = prev.find((p) => p.product.id === product.id);
      if (existing) {
        return prev.map((p) =>
          p.product.id === product.id
            ? { ...p, quantity: p.quantity + qty }
            : p,
        );
      }
      return [...prev, { product, quantity: qty }];
    });
  };

  const removeItem = (productId: number) => {
    setItems((prev) => prev.filter((p) => p.product.id !== productId));
  };

  const decrementItem = (productId: number) => {
    setItems(
      (prev) =>
        prev
          .map((p) => {
            if (p.product.id === productId) {
              if (p.quantity > 1) {
                return { ...p, quantity: p.quantity - 1 };
              } else {
                return null;
              }
            }
            return p;
          })
          .filter(Boolean) as CartItem[],
    );
  };

  const clear = () => setItems([]);

  const totalCount = items.reduce((s, it) => s + it.quantity, 0);
  const totalPrice = items.reduce(
    (s, it) => s + it.quantity * it.product.price,
    0,
  );

  return (
    <CartContext.Provider
      value={{
        items,
        addItem,
        removeItem,
        decrementItem,
        clear,
        totalCount,
        totalPrice,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export default CartContext;
