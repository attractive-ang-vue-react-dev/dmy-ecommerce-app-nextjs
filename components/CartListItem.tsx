"use client";
import React from "react";
import Link from "next/link";
import { FaTrash } from "react-icons/fa";
import QuantityButton from "@/components/QuantityButton";

interface CartItemProps {
  id: number | string;
  title: string;
  thumb?: string;
  quantity: number;
  price: number;
  href?: string; // link to product
  first?: boolean; // add top border if first item
  last?: boolean; // add bottom border if last item
  onAdd?: (id: number | string) => void;
  onDecrement?: (id: number | string) => void;
  onRemove?: (id: number | string) => void;
}

const CartItem: React.FC<CartItemProps> = ({
  id,
  title,
  thumb,
  quantity,
  price,
  href = `/products/${id}`,
  first = false,
  last = false,
  onAdd,
  onDecrement,
  onRemove,
}) => {
  return (
    <div
      className={`flex items-center justify-between py-2 ${
        first ? "border-t border-yellow-400" : ""
      } ${last ? "border-b border-yellow-400" : ""}`}
    >
      <div className="flex items-center gap-5 w-2/3">
        {thumb && (
          <img src={thumb} alt={title} className="w-20 h-20 object-cover" />
        )}
        <div>
          <Link
            href={href}
            className="font-semibold text-yellow-500 hover:underline text-lg"
          >
            {title}
          </Link>
          <div className="text-sm text-muted-foreground flex items-center gap-2 mt-2">
            <QuantityButton
              type="decrement"
              onClick={() => onDecrement && onDecrement(id)}
              size="md"
            />
            <span className="mx-2 min-w-[2ch] text-center text-lg">
              {quantity}
            </span>

            <QuantityButton
              type="increment"
              onClick={() => onAdd && onAdd(id)}
              size="md"
            />
          </div>
        </div>
      </div>
      <div className="flex items-center gap-6">
        <div className="font-bold text-lg">
          ${(price * quantity).toFixed(2)}
        </div>
        <button
          onClick={() => onRemove && onRemove(id)}
          className="text-red-600 flex items-center"
          aria-label="Remove"
        >
          <FaTrash className="inline-block text-xl" />
        </button>
      </div>
    </div>
  );
};

export default CartItem;
