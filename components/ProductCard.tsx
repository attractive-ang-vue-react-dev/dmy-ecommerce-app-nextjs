"use client";

import Image from "next/image";
import { Swiper, SwiperSlide } from "swiper/react";
import { useRouter } from "next/navigation";
import "swiper/css";
import "swiper/css/autoplay";

import React, { useState } from "react";
import Skeleton from "./Skeleton";
import CartToast from "./CartToast";
import { renderStars } from "../utils/starRating";

import type { ProductSummary } from "../types/product";

import AddToCartButton from "./AddToCartButton";

export const ProductCard: React.FC<{
  product: ProductSummary;
  loading?: boolean;
}> = ({ product, loading }) => {
  const [showToast, setShowToast] = useState<boolean>(false);
  const router = useRouter();

  const goToDetail = (id: number) => {
    router.push(`/products/${id}`);
  };

  // Only autoplay images on hover/focus, keep card height fixed
  const [isActive, setIsActive] = React.useState(false);
  const images = (product as any).images as string[] | undefined;

  if (loading) {
    return (
      <div className="border border-blue-100 bg-white/90 rounded-xl p-4 flex flex-col gap-3 shadow-md min-h-[370px] animate-pulse">
        <Skeleton className="w-full h-40 mb-2" />
        <Skeleton className="h-6 w-3/4 mb-1" />
        <Skeleton className="h-4 w-1/3 mb-1" />
        <div className="flex gap-1 mb-1">
          {Array.from({ length: 5 }).map((_, i) => (
            <Skeleton key={i} className="w-4 h-4 rounded-full" />
          ))}
        </div>
        <Skeleton className="h-6 w-1/4 mb-14 mt-2" />
        <Skeleton className="h-10 w-full rounded-b-xl" />
      </div>
    );
  }

  return (
    <div
      className="bg-gray-50 border border-gray-100  rounded-sm p-4 flex flex-col gap-2 group focus-within:ring-1 focus-within:ring-yellow-400 transition-transform duration-200 hover:scale-[1.02] shadow-xs relative h-[400px]"
      tabIndex={0}
      onFocus={() => setIsActive(true)}
      onBlur={() => setIsActive(false)}
      onMouseEnter={() => setIsActive(true)}
      onMouseLeave={() => setIsActive(false)}
    >
      <div className="relative w-full h-40 mb-2 overflow-hidden bg-white">
        {images && images.length > 1 ? (
          <Swiper
            modules={[]}
            spaceBetween={0}
            slidesPerView={1}
            loop
            autoplay={
              isActive ? { delay: 1200, disableOnInteraction: false } : false
            }
            navigation={isActive}
            className="w-full h-40 group"
          >
            {images.map((url, i) => (
              <SwiperSlide key={i}>
                <div className="w-full h-40 relative">
                  <Image
                    src={url}
                    alt={product.title}
                    fill
                    style={{ objectFit: "cover" }}
                    sizes="200px"
                    priority={i === 0}
                  />
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        ) : product.thumbnail ? (
          <Image
            src={product.thumbnail}
            alt={product.title}
            fill
            style={{ objectFit: "cover" }}
          />
        ) : null}
      </div>

      <h3
        className="font-semibold line-clamp-3 min-h-[2.5em] hover:cursor-pointer hover:text-yellow-600"
        onClick={() => goToDetail(product?.id)}
      >
        {product.title}
      </h3>
      <p className="text-xs text-gray-500 mb-1">{product.brand}</p>
      <div>{renderStars(product.rating)}</div>
      <div className="flex items-center justify-between mb-14 mt-2">
        <div className="font-bold text-lg text-gray-900">${product.price}</div>
      </div>

      <div className="absolute left-0 right-0 bottom-0 w-full">
        <AddToCartButton
          product={product}
          onAdd={() => {
            setShowToast(true);
            setTimeout(() => setShowToast(false), 2000);
          }}
        />
        <CartToast show={showToast} productTitle={product.title} />
      </div>
    </div>
  );
};

export default ProductCard;
