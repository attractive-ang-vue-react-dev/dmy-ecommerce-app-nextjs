import React from "react";

export const Skeleton: React.FC<{
  className?: string;
  style?: React.CSSProperties;
}> = ({ className = "", style }) => (
  <span
    className={`animate-pulse bg-gray-200 rounded ${className}`}
    style={style}
    aria-hidden="true"
  />
);

export default Skeleton;
