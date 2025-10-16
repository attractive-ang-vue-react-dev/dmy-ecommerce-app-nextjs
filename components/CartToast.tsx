"use client";
import React from "react";

export default function CartToast({
  show,
  productTitle,
}: {
  show: boolean;
  productTitle: string;
}) {
  if (!show) return null;
  return (
    <div className="fixed w-full z-50 top-0 right-0 bg-green-500 text-white px-6 py-1 rounded shadow-sm animate-fade-in-out pointer-events-none">
      <span className="font-semibold text-md">{productTitle}</span>
      &nbsp;&nbsp;added to cart!
    </div>
  );
}
