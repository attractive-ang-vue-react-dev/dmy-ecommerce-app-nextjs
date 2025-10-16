import { redirect } from "next/navigation";

export default function Home() {
  // Server-side redirect to /products so the app root opens at /products
  redirect("/products");
}
