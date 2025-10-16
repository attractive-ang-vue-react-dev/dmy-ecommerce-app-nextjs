"use client";

import React, { useEffect } from "react";
import type { ProductSummary } from "../types/product";
import { useProductStore } from "../stores/useProductStore";

const HydrateProducts: React.FC<{ products: ProductSummary[] }> = ({
  products,
}) => {
  const setProducts = useProductStore((s) => s.setProducts);

  useEffect(() => {
    setProducts(products);
  }, [products, setProducts]);

  return null;
};

export default HydrateProducts;
