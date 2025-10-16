"use client";
import React, { useState, useEffect, useRef } from "react";
import ProductCard from "./ProductCard";
import ProductSearchBar from "./ProductSearchBar";
import type { ProductSummary } from "../types/product";

export default function ProductListClient({
  products,
}: {
  products: ProductSummary[];
}) {
  const [search, setSearch] = useState("");
  const [sort, setSort] = useState("price");
  const [sortDir, setSortDir] = useState<"asc" | "desc">("asc");
  const [minPrice, setMinPrice] = useState("");
  const [maxPrice, setMaxPrice] = useState("");
  const [showBar, setShowBar] = useState(true);
  const lastScroll = useRef(0);
  const [mounted, setMounted] = React.useState(false);
  useEffect(() => {
    setMounted(true);
    const onScroll = () => {
      const y = window.scrollY;
      setShowBar(y < 80 || y < lastScroll.current);
      lastScroll.current = y;
    };
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  if (!mounted) return null;

  let filtered = products.filter((p) =>
    p.title.toLowerCase().includes(search.toLowerCase()),
  );
  if (minPrice) filtered = filtered.filter((p) => p.price >= Number(minPrice));
  if (maxPrice) filtered = filtered.filter((p) => p.price <= Number(maxPrice));
  filtered = filtered.sort((a, b) => {
    let cmp = 0;
    if (sort === "price") cmp = a.price - b.price;
    else if (sort === "title") cmp = a.title.localeCompare(b.title);
    return sortDir === "asc" ? cmp : -cmp;
  });

  return (
    <>
      <ProductSearchBar
        search={search}
        setSearch={setSearch}
        sort={sort}
        setSort={setSort}
        sortDir={sortDir}
        setSortDir={setSortDir}
        minPrice={minPrice}
        setMinPrice={setMinPrice}
        maxPrice={maxPrice}
        setMaxPrice={setMaxPrice}
        show={showBar}
      />
      <div className="grid grid-cols-1 sm:grid-cols-3 md:grid-cols-5 gap-4 mt-16">
        {filtered.map((p) => (
          <ProductCard key={p.id} product={p} />
        ))}
        {filtered.length === 0 && (
          <div className="col-span-full text-center text-gray-400 py-12">
            No products found.
          </div>
        )}
      </div>
    </>
  );
}
