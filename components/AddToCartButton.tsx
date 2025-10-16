"use client";

import React, { useState } from "react";
import { useCart } from "../context/CartContext";
import type { ProductSummary } from "../types/product";

interface AddToCartButtonProps {
  product: ProductSummary;
  className?: string;
  children?: React.ReactNode;
  onAdd?: () => void;
}

const AddToCartButton: React.FC<AddToCartButtonProps> = ({
  product,
  className = "",
  children,
  onAdd,
}) => {
  const { addItem } = useCart();

  const handleAdd = () => {
    addItem(product, 1);
    if (onAdd) onAdd();
  };

  return (
    <>
      <button
        onClick={handleAdd}
        className={`w-full bg-gradient-to-r from-yellow-300 to-yellow-500 hover:from-yellow-400 hover:to-yellow-600 text-black font-semibold py-2 rounded-b-sm transition-colors duration-150 focus:outline-none focus:ring-2 focus:ring-yellow-600 shadow-sm ${className}`}
        style={{ borderTopLeftRadius: 0, borderTopRightRadius: 0 }}
      >
        {children || "Add to Cart"}
      </button>
      {/* Optionally, you can add a toast here if needed */}
    </>
  );
};

export default AddToCartButton;
