"use client";
import React, { useState, useEffect } from "react";
import { FaShoppingBasket } from "react-icons/fa";
import Link from "next/link";
import { useCart } from "../context/CartContext";
import { SlBasket } from "react-icons/sl";
import { SlBasketLoaded } from "react-icons/sl";

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
      {mounted && totalCount > 0 ? (
        <>
          <SlBasketLoaded className="text-3xl text-yellow-500 group-hover:text-yellow-600 transition-colors" />
          <span className="absolute -top-1 -right-3 bg-red-500 text-white text-xs rounded-full px-1.5 py-0.5 font-bold shadow">
            {totalCount}
          </span>
        </>
      ) : (
        <SlBasket className="text-3xl text-yellow-500 group-hover:text-yellow-600 transition-colors" />
      )}
    </Link>
  );
}
