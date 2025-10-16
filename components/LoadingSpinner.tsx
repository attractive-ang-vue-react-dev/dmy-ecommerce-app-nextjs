import React from "react";
import { FaSpinner } from "react-icons/fa";

interface LoadingSpinnerProps {
  size?: number; // size in pixels
  message?: string;
  fullScreen?: boolean;
}

const LoadingSpinner: React.FC<LoadingSpinnerProps> = ({
  size = 32,
  message,
  fullScreen = false,
}) => {
  return (
    <div
      className={`flex flex-col items-center justify-center ${
        fullScreen ? "fixed inset-0 z-50" : "py-4"
      }`}
    >
      <FaSpinner
        size={size}
        className="animate-spin text-yellow-400 mb-2"
        aria-label="Loading"
      />
      {message && (
        <p className="text-yellow-600 text-sm text-bold">{message}</p>
      )}
    </div>
  );
};

export default LoadingSpinner;
