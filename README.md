# E-Commerce CRUD App (Next.js)

A modern e-commerce demo built with Next.js, React, and Tailwind CSS. Features product browsing, search, cart, and a clean, responsive UI.

---

## 🚀 Local Installation

1. **Clone the repository:**
   ```bash
   git clone [https://github.com/attractive-ang-vue-react-dev/dmy-ecommerce-app-nextjs/]
   cd dmy-ecommerce-app-nextjs
   ```
2. **Install dependencies:**
   ```bash
   npm install
   # or
   yarn install
   ```
3. **Run the development server:**
   ```bash
   npm run build
   npm run dev
   # or
   yarn dev
   ```
4. **Open your browser:**
   Visit [http://localhost:3000](http://localhost:3000)

---

## 🧪 Running Tests

This project uses Jest and React Testing Library for unit and integration tests.

- **Run all tests:**
  ```bash
  npm test
  # or
  npx jest --config jest.config.js
  ```
- Tests cover add-to-cart logic, product card UI, and integration flows.

---

## 🖥️ UI & Navigation Walkthrough

- **Product List:**
  - Browse all products on the home page.
  - Use the search bar to filter products by name or brand.
  - Each product card displays an image, title, brand, price, and star rating.
  - Click each ```product name``` on the card to view its details.

- **Product Detail Page:**
  - See a larger image gallery, full description, price, stock, and reviews.
  - Add the product to your cart with the yellow "Add to Cart" button.
  - Tabs let you switch between specifications and customer reviews.

- **Cart:**
  - Access the cart from the top navigation/cart icon.
  - View all items, adjust quantities, or clear the cart (with confirmation modal).
  - Cart state is preserved in session storage.

- **Star Ratings:**
  - Consistent star display on both product cards and detail pages.

---

## 🛠️ Project Structure

- `app/` - Next.js app directory (pages, layout, cart, products)
- `components/` - UI components (ProductCard, AddToCartButton, CartToast, etc.)
- `context/` - React context for cart state
- `services/` - API functions
- `stores/` - (Optional) State management utilities
- `types/` - TypeScript types
- `utils/` - Utility functions (e.g., star rating renderer)

---

## 📸 UI Preview

- **Product List:**
  <img width="1705" height="906" alt="image" src="https://github.com/user-attachments/assets/0f909a10-9ce8-4a37-92da-43219bb25f01" />


- **Product Detail:**
  <img width="1471" height="894" alt="image" src="https://github.com/user-attachments/assets/2d6bc52f-27a1-4559-989b-f2f582e8386f" />


- **Cart:**
  <img width="1508" height="894" alt="image" src="https://github.com/user-attachments/assets/cb6d7601-c755-4896-81f4-e4644e15262e" />




> _Additional screenshots for richer documentation!_
- **Cart clear confirm dialog:** 
<img width="1473" height="886" alt="image" src="https://github.com/user-attachments/assets/a6c20c75-4c95-4aa7-a92a-d61814f369dd" />

- **Product detail page on review tab:**
<img width="1486" height="873" alt="image" src="https://github.com/user-attachments/assets/e111246d-4b5f-4cd7-bba8-82067a6d37f6" />

- **Product detail page multi-image with swiper slider:**
<img width="1272" height="705" alt="image" src="https://github.com/user-attachments/assets/95067a6e-6f6e-4ecf-b48f-c851a87eccbf" />


---

## 🤝 Contributing

Pull requests and issues are welcome!

---

## 📚 Learn More

- [Next.js Documentation](https://nextjs.org/docs)
- [Jest Testing](https://jestjs.io/docs/getting-started)
- [React Testing Library](https://testing-library.com/docs/)
- [Tailwind CSS](https://tailwindcss.com/docs)
