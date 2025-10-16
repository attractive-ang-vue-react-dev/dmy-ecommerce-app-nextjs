"use client";

import React, { useEffect } from "react";

import HydrateProducts from "@/components/HydrateProducts";
import { useProductStore } from "@/stores/useProductStore";
import ProductListClient from "@/components/ProductListClient";
import LoadingSpinner from "@/components/LoadingSpinner";

export default function ProductsPage() {
  const { products, isLoading, error, loadProducts } = useProductStore();

  useEffect(() => {
    loadProducts();
  }, [loadProducts]);

  if (isLoading)
    return <LoadingSpinner fullScreen message="Loading products..." />;
  if (error) return <p className="p-4 text-red-500">{error}</p>;
  return (
    <div className="bg-gradient-to-b from-white to-blue-50 min-h-screen pb-8">
      {/* hydrate client-side store with server-fetched list */}
      <HydrateProducts products={products} />
      <ProductListClient products={products} />
    </div>
  );
}
