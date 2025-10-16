"use client";
import React from "react";

interface QuantityButtonProps {
  type: "increment" | "decrement"; // decides + or -
  onClick?: () => void;
  size?: "sm" | "md" | "lg";
  className?: string;
}

const sizeMap = {
  sm: "w-5 h-5 text-sm",
  md: "w-6 h-6 text-md",
  lg: "w-8 h-8 text-lg",
};

const QuantityButton: React.FC<QuantityButtonProps> = ({
  type,
  onClick,
  size = "md",
  className = "",
}) => {
  const sizeClasses = sizeMap[size] || sizeMap.md;
  const symbol = type === "increment" ? "+" : "-";

  return (
    <button
      className={`${sizeClasses} flex items-center justify-center rounded-sm font-bold bg-white hover:bg-gray-200 ${className}`}
      onClick={onClick}
      aria-label={
        type === "increment" ? "Increase quantity" : "Decrease quantity"
      }
      type="button"
    >
      {symbol}
    </button>
  );
};

export default QuantityButton;
