"use client";
import React, { useState, useEffect } from "react";
import Skeleton from "./Skeleton";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Thumbs } from "swiper/modules";
import Image from "next/image";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/thumbs";

type Review = {
  id: string | number;
  reviewer: string;
  score: number;
  comment: string;
};

type ProductGalleryProps = {
  images: string[];
  meta?: { weight?: string; dimensions?: string };
  reviews?: Review[];
};

const ProductGallery: React.FC<ProductGalleryProps> = ({
  images,
  meta,
  reviews,
}) => {
  const [mounted, setMounted] = useState(false);
  const [thumbsSwiper, setThumbsSwiper] = useState<any>(null);
  const [showTabs, setShowTabs] = useState(false);
  const [tab, setTab] = useState<"detail" | "reviews">("detail");

  useEffect(() => {
    setMounted(true);
  }, []);

  // Show tabs if there are reviews or meta
  useEffect(() => {
    setShowTabs(!!(reviews?.length || meta?.weight || meta?.dimensions));
  }, [reviews, meta]);

  if (!images || images.length === 0) {
    return (
      <div className="w-full h-96 flex items-center justify-center">
        <Skeleton className="w-full h-96" />
      </div>
    );
  }

  // SSR: show static first image as fallback
  if (!mounted) {
    return (
      <div className="w-full h-96 relative flex items-center justify-center bg-white mb-2">
        <Image
          src={images[0]}
          alt="Product image"
          fill
          style={{ objectFit: "contain" }}
          sizes="(max-width: 768px) 100vw, 50vw"
          priority
        />
      </div>
    );
  }

  // Client: show Swiper
  return (
    <div className="mb-4">
      <Swiper
        modules={[Navigation, Thumbs]}
        spaceBetween={10}
        navigation
        thumbs={{ swiper: thumbsSwiper }}
        className="w-full h-120 mb-2"
      >
        {images.map((url, i) => (
          <SwiperSlide key={i}>
            <div className="w-full h-96 relative flex items-center justify-center bg-white">
              <Image
                src={url}
                alt={`Product image ${i + 1}`}
                fill
                style={{ objectFit: "contain" }}
                sizes="(max-width: 768px) 100vw, 50vw"
                priority={i === 0}
              />
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
      {images.length > 1 && (
        <Swiper
          modules={[Thumbs]}
          onSwiper={setThumbsSwiper}
          spaceBetween={8}
          slidesPerView={Math.min(images.length, 6)}
          watchSlidesProgress
          className="w-full h-20"
        >
          {images.map((url, i) => (
            <SwiperSlide key={i}>
              <div
                className="w-full h-20 relative flex items-center justify-center border-2 border-yellow-300 bg-gray-50 transition-all hover:border-yellow-500 focus-within:border-yellow-500"
                style={{ width: "100%" }}
              >
                <Image
                  src={url}
                  alt={`Thumbnail ${i + 1}`}
                  fill
                  style={{ objectFit: "contain" }}
                  sizes="80px"
                  priority={i === 0}
                />
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      )}

      {/* Product meta info always visible */}
      <div className="my-4 flex flex-col gap-2">
        {meta?.weight && (
          <div>
            <span className="font-semibold">Weight:</span> {meta.weight}
          </div>
        )}
        {meta?.dimensions && (
          <div>
            <span className="font-semibold">Dimensions:</span> {meta.dimensions}
          </div>
        )}
      </div>

      {/* When scrolled down, show tabs for details/reviews */}
      {showTabs && (
        <div className="mt-8">
          <div className="flex border-b mb-4">
            <button
              className={`px-4 py-2 font-medium border-b-2 transition-colors duration-150 ${tab === "detail" ? "border-blue-500 text-blue-600" : "border-transparent text-gray-500 hover:text-blue-500"}`}
              onClick={() => setTab("detail")}
              type="button"
            >
              Product Detail
            </button>
            <button
              className={`px-4 py-2 font-medium border-b-2 transition-colors duration-150 ${tab === "reviews" ? "border-blue-500 text-blue-600" : "border-transparent text-gray-500 hover:text-blue-500"}`}
              onClick={() => setTab("reviews")}
              type="button"
            >
              Customer Reviews
            </button>
          </div>
          {tab === "detail" && (
            <div className="my-4 flex flex-col gap-2">
              {meta?.weight && (
                <div>
                  <span className="font-semibold">Weight:</span> {meta.weight}
                </div>
              )}
              {meta?.dimensions && (
                <div>
                  <span className="font-semibold">Dimensions:</span>{" "}
                  {meta.dimensions}
                </div>
              )}
            </div>
          )}
          {tab === "reviews" && (
            <div className="space-y-4">
              {reviews && reviews.length > 0 ? (
                reviews.map((review) => (
                  <div
                    key={review.id}
                    className="border rounded p-4 bg-gray-50"
                  >
                    <div className="flex items-center gap-2 mb-1">
                      <span className="font-semibold text-gray-700">
                        {review.reviewer}
                      </span>
                      <span className="text-yellow-500 flex items-center">
                        {Array.from({ length: 5 }).map((_, idx) => (
                          <svg
                            key={idx}
                            className={`w-4 h-4 ${idx < Math.round(review.score) ? "fill-yellow-400" : "fill-gray-300"}`}
                            viewBox="0 0 20 20"
                            aria-hidden="true"
                          >
                            <polygon points="10,1 12.59,7.36 19.51,7.64 14,12.14 15.82,18.99 10,15.27 4.18,18.99 6,12.14 0.49,7.64 7.41,7.36" />
                          </svg>
                        ))}
                      </span>
                      <span className="ml-2 text-sm text-gray-500">
                        {review.score.toFixed(1)} / 5
                      </span>
                    </div>
                    <div className="text-gray-700">{review.comment}</div>
                  </div>
                ))
              ) : (
                <div className="text-gray-500">No reviews yet.</div>
              )}
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default ProductGallery;
