"use client";

import React, { useEffect } from "react";
import type { ProductDetail } from "../types/product";
import { useProductStore } from "../stores/useProductStore";

const HydrateProduct: React.FC<{ product: ProductDetail }> = ({ product }) => {
  const setProductDetail = useProductStore((s) => s.setProductDetail);

  useEffect(() => {
    setProductDetail(product);
  }, [product, setProductDetail]);

  return null;
};

export default HydrateProduct;
