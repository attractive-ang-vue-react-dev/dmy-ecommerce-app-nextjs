import React from "react";
import { render, fireEvent } from "@testing-library/react";
import AddToCartButton from "../AddToCartButton";
import { CartProvider } from "../../context/CartContext";

describe("AddToCartButton", () => {
  const product = { id: 1, title: "Test Product", price: 10 };

  it("renders button with default text", () => {
    const { getByText } = render(
      <CartProvider>
        <AddToCartButton product={product} />
      </CartProvider>,
    );
    expect(getByText(/add to cart/i)).toBeInTheDocument();
  });

  it("calls onAdd callback when clicked", () => {
    const onAdd = jest.fn();
    const { getByRole } = render(
      <CartProvider>
        <AddToCartButton product={product} onAdd={onAdd} />
      </CartProvider>,
    );
    fireEvent.click(getByRole("button"));
    expect(onAdd).toHaveBeenCalled();
  });

  it("accepts custom children", () => {
    const { getByText } = render(
      <CartProvider>
        <AddToCartButton product={product}>Buy Now</AddToCartButton>
      </CartProvider>,
    );
    expect(getByText(/buy now/i)).toBeInTheDocument();
  });
});
