"use client";
import React, { useState, useEffect } from "react";
import { FaShoppingBasket } from "react-icons/fa";
import Link from "next/link";
import { useCart } from "../context/CartContext";

export default function CartIconWithCount() {
  const { totalCount } = useCart();
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);
  return (
    <Link
      href="/cart"
      className="relative flex items-center group"
      aria-label="Cart"
    >
      <FaShoppingBasket className="text-2xl text-yellow-500 group-hover:text-yellow-600 transition-colors" />
      {mounted && totalCount > 0 && (
        <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full px-1.5 py-0.5 font-bold shadow">
          {totalCount}
        </span>
      )}
    </Link>
  );
}
