"use client";

import React, { useEffect, useState } from "react";
import { FaShoppingBasket } from "react-icons/fa";
import { useCart } from "@/context/CartContext";
import ProductSearchBar from "@/components/ProductSearchBar";
import { AlertModal } from "@/components/AlertModal";
import CartItem from "@/components/CartListItem";

export default function CartPage() {
  const {
    items,
    addItem,
    removeItem,
    decrementItem,
    clear,
    totalCount,
    totalPrice,
  } = useCart();
  const [mounted, setMounted] = useState<boolean>(false);
  useEffect(() => setMounted(true), []);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

  const handleConfirm = () => {
    setIsModalOpen(false);
    clear();
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };
  // Group items by brand
  const grouped: { [brand: string]: typeof items } = {};
  const noBrand: typeof items = [];
  items.forEach((it) => {
    const brand = it.product.brand;
    if (brand) {
      if (!grouped[brand]) grouped[brand] = [];
      grouped[brand].push(it);
    } else {
      noBrand.push(it);
    }
  });

  if (!mounted) return null;

  return (
    <>
      <ProductSearchBar minimal showBack showCart />

      <AlertModal
        isOpen={isModalOpen}
        title="Clear Cart"
        message="Are you sure you want to clear the cart? This action is permanent."
        confirmText="Clear"
        cancelText="Cancel"
        onConfirm={handleConfirm}
        onCancel={handleCancel}
      />
      <div className="max-w-6xl mx-auto mt-16">
        {items.length === 0 ? (
          <div className="bg-gray-100 rounded-sm p-8 text-center text-gray-500">
            Your cart is empty.
          </div>
        ) : (
          <div className="bg-gray-100 rounded-sm p-6 divide-y divide-gray-200">
            {/* Grouped by brand */}
            {Object.keys(grouped).map((brand) => (
              <div key={brand} className="mb-4">
                <div className="font-bold text-lg mb-2">{brand}</div>
                <div>
                  {grouped[brand].map((it, idx) => {
                    const thumb = it.product.thumbnail;
                    return (
                      <CartItem
                        key={it.product.id}
                        id={it.product.id}
                        title={it.product.title}
                        thumb={thumb}
                        quantity={it.quantity}
                        price={it.product.price}
                        first={idx === 0}
                        last={idx === grouped[brand].length - 1}
                        onAdd={(id) => addItem(it.product, 1)}
                        onDecrement={(id) => decrementItem(it.product.id)}
                        onRemove={(id) => removeItem(it.product.id)}
                      />
                    );
                  })}
                </div>
              </div>
            ))}
            {/* Items without brand */}
            {noBrand.length > 0 && (
              <div className="mb-4">
                <div className="font-bold text-lg mb-2 text-gray-700">
                  Other
                </div>
                <div>
                  {noBrand.map((it, idx) => {
                    const thumb = it.product.thumbnail;
                    return (
                      <CartItem
                        key={it.product.id}
                        id={it.product.id}
                        title={it.product.title}
                        thumb={thumb}
                        quantity={it.quantity}
                        price={it.product.price}
                        first={idx === 0}
                        last={idx === noBrand.length - 1}
                        onAdd={(id) => addItem(it.product, 1)}
                        onDecrement={(id) => decrementItem(it.product.id)}
                        onRemove={(id) => removeItem(it.product.id)}
                      />
                    );
                  })}
                </div>
              </div>
            )}

            <div className="border-t py-4 flex justify-between items-center bg-gray-50 px-4">
              <div className="flex items-center gap-2 self-center">
                <FaShoppingBasket className="text-yellow-500" />
                <span className="font-semibold">Total</span><span>({totalCount} items)</span>
              </div>
              <div className="font-bold text-lg">${totalPrice.toFixed(2)}</div>
            </div>

            <div className="pt-4 text-right">
              <button
                onClick={() => setIsModalOpen(true)}
                className="bg-red-600 text-white px-4 py-2 rounded shadow hover:bg-red-700 transition"
              >
                Clear Cart
              </button>
            </div>
          </div>
        )}
      </div>
    </>
  );
}
