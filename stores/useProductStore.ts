"use client";

import { create } from "zustand";
import type { ProductDetail, ProductSummary } from "../types/product";
import { fetchProducts, fetchProduct } from "@/services/api";

type ProductStore = {
  products: ProductSummary[];
  productMap: Record<number, ProductDetail>;
  isLoading: boolean;
  error: string | null;

  // Actions
  loadProducts: () => Promise<void>;
  loadProductDetail: (id: number) => Promise<void>;
  setProducts: (items: ProductSummary[]) => void;
  setProductDetail: (p: ProductDetail) => void;
  clear: () => void;
};

export const useProductStore = create<ProductStore>((set, get) => ({
  products: [],
  productMap: {},
  isLoading: false,
  error: null,

  // ✅ Fetch & store products
  loadProducts: async () => {
    set({ isLoading: true, error: null });
    try {
      const data = await fetchProducts();
      set({ products: data.products, isLoading: false });
    } catch (err: any) {
      set({
        error: err.message || "Failed to fetch products",
        isLoading: false,
      });
    }
  },

  // ✅ Fetch & store single product detail
  loadProductDetail: async (id: number) => {
    set({ isLoading: true, error: null });
    try {
      // if product already exists, skip fetching
      const cached = get().productMap[id];
      if (cached) {
        set({ isLoading: false });
        return;
      }

      const detail = await fetchProduct(String(id));
      set((state) => ({
        productMap: { ...state.productMap, [id]: detail },
        isLoading: false,
      }));
    } catch (err: any) {
      set({
        error: err.message || "Failed to fetch product detail",
        isLoading: false,
      });
    }
  },

  setProducts: (items) => set({ products: items }),
  setProductDetail: (p) =>
    set((state) => ({ productMap: { ...state.productMap, [p.id]: p } })),
  clear: () => set({ products: [], productMap: {}, error: null }),
}));

export default useProductStore;
