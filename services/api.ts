import { ProductDetail, ProductSummary } from "@/types/product";

const url = "https://dummyjson.com/products";
export async function fetchProducts(): Promise<{ products: ProductSummary[] }> {
  const res = await fetch("https://dummyjson.com/products", {
    cache: "no-store",
  });
  if (!res.ok) throw new Error("Failed to fetch products");
  return res.json();
}

export async function fetchProduct(id: string): Promise<ProductDetail> {
  const res = await fetch(`${url}/${id}`, { cache: "no-store" });
  if (!res.ok) throw new Error("Failed to fetch product");
  return res.json();
}
