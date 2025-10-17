"use client";

import React from "react";
import {
  FaSearch,
  FaSortAmountDown,
  FaSortAmountUp,
  FaArrowLeft,
} from "react-icons/fa";
import CartIconWithCount from "./CartIconWithCount";
import { useRouter } from "next/navigation";

export default function ProductSearchBar({
  search,
  setSearch,
  sort,
  setSort,
  sortDir,
  setSortDir,
  minPrice,
  setMinPrice,
  maxPrice,
  setMaxPrice,
  show = true,
  minimal = false,
  showBack = false,
  showCart = true,
}: {
  search?: string;
  setSearch?: (v: string) => void;
  sort?: string;
  setSort?: (v: string) => void;
  sortDir?: "asc" | "desc";
  setSortDir?: (v: "asc" | "desc") => void;
  minPrice?: string;
  setMinPrice?: (v: string) => void;
  maxPrice?: string;
  setMaxPrice?: (v: string) => void;
  show?: boolean;
  minimal?: boolean;
  showBack?: boolean;
  showCart?: boolean;
}) {
  const router = useRouter();
  if (!show) return null;

  // Only back button centered if minimal and showBack and not showCart
  if (minimal && showBack && !showCart) {
    return (
      <div className="fixed top-0 left-0 w-full z-50 bg-white/95 py-3 px-4 flex items-center justify-start">
        <button
          onClick={() => router.back()}
          className="p-2 rounded-full bg-blue-50 hover:bg-blue-100 text-blue-700 shadow"
          aria-label="Back"
        >
          <FaArrowLeft />
        </button>
      </div>
    );
  }

  return (
    <div className="fixed top-0 left-0 w-full z-50 bg-white/95 py-3 px-4 border-b border-yellow-200 backdrop-blur-md flex items-center">
      {/* Left: Back button */}
      <div className="flex items-center" style={{ minWidth: 48 }}>
        {showBack && (
          <button
            onClick={() => router.back()}
            className="p-2 rounded-full bg-blue-50 hover:bg-blue-100 text-blue-700 shadow"
            aria-label="Back"
          >
            <FaArrowLeft />
          </button>
        )}
      </div>
      {/* Center: Search/sort controls */}
      <div className="flex items-center gap-2 mx-auto">
        {!minimal && (
          <>
            <div className="flex items-center gap-2 bg-gray-100 rounded px-2 py-1">
              <FaSearch className="text-gray-400" />
              <input
                type="text"
                placeholder="Search products..."
                value={search}
                onChange={(e) => setSearch && setSearch(e.target.value)}
                className="bg-transparent outline-none px-1 py-1 min-w-[180px]"
              />
            </div>
            <div className="flex items-center gap-2 bg-gray-100 rounded px-2 py-1">
              <span className="text-xs text-gray-500">Price:</span>
              <input
                type="number"
                placeholder="Min"
                value={minPrice}
                onChange={(e) => setMinPrice && setMinPrice(e.target.value)}
                className="bg-transparent outline-none w-16 px-1 py-1 text-xs"
              />
              <span className="text-gray-400">-</span>
              <input
                type="number"
                placeholder="Max"
                value={maxPrice}
                onChange={(e) => setMaxPrice && setMaxPrice(e.target.value)}
                className="bg-transparent outline-none w-16 px-1 py-1 text-xs"
              />
            </div>
            <div className="flex items-center gap-2 bg-gray-100 rounded px-2 py-1">
              <span className="text-xs text-gray-500">Sort:</span>
              <select
                value={sort}
                onChange={(e) => setSort && setSort(e.target.value)}
                className="bg-transparent outline-none text-xs"
              >
                <option value="price">Price</option>
                <option value="title">Title</option>
              </select>
              <button
                onClick={() =>
                  setSortDir && setSortDir(sortDir === "asc" ? "desc" : "asc")
                }
                className="ml-1"
                aria-label="Toggle sort direction"
              >
                {sortDir === "asc" ? <FaSortAmountUp /> : <FaSortAmountDown />}
              </button>
            </div>
          </>
        )}
      </div>
      {/* Right: Cart icon */}
      {showCart && (
        <div className="flex-shrink-0 mr-20">
          <CartIconWithCount />
        </div>
      )}
    </div>
  );
}
