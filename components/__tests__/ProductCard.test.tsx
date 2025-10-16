import React from "react";
import { render, fireEvent } from "@testing-library/react";
import ProductCard from "../ProductCard";
jest.mock("next/navigation", () => ({
  useRouter: () => ({ push: jest.fn() }),
}));
import { CartProvider } from "../../context/CartContext";

describe("ProductCard integration", () => {
  const product = {
    id: 1,
    title: "Test Product",
    price: 10,
    brand: "Brand",
    rating: 4,
    thumbnail: "",
    images: [],
  };

  it("renders product info and add to cart button", () => {
    const { getByText } = render(
      <CartProvider>
        <ProductCard product={product} />
      </CartProvider>,
    );
    expect(getByText(/test product/i)).toBeInTheDocument();
    expect(getByText(/add to cart/i)).toBeInTheDocument();
  });

  it("shows toast when add to cart is clicked", () => {
    jest.useFakeTimers();
    const { getByText } = render(
      <CartProvider>
        <ProductCard product={product} />
      </CartProvider>,
    );
    fireEvent.click(getByText(/add to cart/i));
    expect(getByText(/added to cart/i)).toBeInTheDocument();
    jest.runAllTimers();
  });
});
