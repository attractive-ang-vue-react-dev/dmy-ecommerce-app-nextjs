import React from "react";

const StarFull = ({ title }: { title?: string }) => (
  <svg
    aria-hidden="true"
    width="14"
    height="14"
    viewBox="0 0 24 24"
    fill="currentColor"
    className="text-yellow-500"
  >
    <title>{title ?? "full star"}</title>
    <path d="M12 .587l3.668 7.431L23 9.753l-5.5 5.356L18.335 24 12 19.897 5.665 24l1.835-8.891L1 9.753l7.332-1.735z" />
  </svg>
);

const StarHalf = ({ title }: { title?: string }) => (
  <svg
    aria-hidden="true"
    width="14"
    height="14"
    viewBox="0 0 24 24"
    className="text-yellow-500"
  >
    <title>{title ?? "half star"}</title>
    <defs>
      <linearGradient id="half-grad">
        <stop offset="50%" stopColor="currentColor" />
        <stop offset="50%" stopColor="#e5e7eb" />
      </linearGradient>
    </defs>
    <path
      fill="url(#half-grad)"
      d="M12 .587l3.668 7.431L23 9.753l-5.5 5.356L18.335 24 12 19.897 5.665 24l1.835-8.891L1 9.753l7.332-1.735z"
    />
  </svg>
);

const StarEmpty = ({ title }: { title?: string }) => (
  <svg
    aria-hidden="true"
    width="14"
    height="14"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    className="text-gray-300"
  >
    <title>{title ?? "empty star"}</title>
    <path d="M12 .587l3.668 7.431L23 9.753l-5.5 5.356L18.335 24 12 19.897 5.665 24l1.835-8.891L1 9.753l7.332-1.735z" />
  </svg>
);

export const renderStars = (rating?: number) => {
  if (rating == null) return null;
  const full = Math.floor(rating);
  const half = rating - full >= 0.5;
  const empty = 5 - full - (half ? 1 : 0);
  const stars = [] as React.ReactNode[];
  for (let i = 0; i < full; i++) stars.push(<StarFull key={`f-${i}`} />);
  if (half) stars.push(<StarHalf key="half" />);
  for (let i = 0; i < empty; i++) stars.push(<StarEmpty key={`e-${i}`} />);

  return (
    <div
      className="flex items-center"
      role="img"
      aria-label={`Rating: ${rating.toFixed(1)} out of 5`}
      tabIndex={0}
    >
      {stars}
      <span className="text-xs text-gray-600 ml-2">{rating.toFixed(1)}</span>
    </div>
  );
};
