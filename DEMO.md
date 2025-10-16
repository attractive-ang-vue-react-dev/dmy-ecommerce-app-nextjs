Shopping Cart Demo

This workspace contains a small shopping cart demo built on top of the Next.js starter app.

Pages

- /products — Product listing page. Data fetched from https://dummyjson.com/products
- /products/[id] — Product detail page. Data fetched from https://dummyjson.com/products/{id}
- /cart — Cart page. Items persist for the browser session using sessionStorage via a React Context.

How to run locally

1. npm install
2. npm run dev

Notes

- Types are defined under `types/product.ts` (ProductSummary, ProductDetail, CartItem).
- Cart logic is in `context/CartContext.tsx` and is provided to the app via `app/layout.tsx`.
- Reusable components:
  - `components/ProductCard.tsx`
  - `components/AddToCartButton.tsx`

Build verification

- I ran `npm run build` in this workspace; the build completed successfully and routes were generated.
