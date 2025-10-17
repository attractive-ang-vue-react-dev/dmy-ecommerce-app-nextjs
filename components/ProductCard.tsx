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
import { Autoplay, Navigation, Pagination } from "swiper/modules";

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
      className="bg-gray-50 shadow-md p-4 flex flex-col gap-2 group transition-transform duration-200 hover:scale-[1.02] relative h-[400px]"
      onMouseEnter={() => setIsActive(true)}
      onMouseLeave={() => setIsActive(false)}
    >
      <div className="relative w-full h-50 mb-2 overflow-hidden bg-white">
        {images && images.length > 1 ? (
          <Swiper
            modules={[Autoplay, Pagination, Navigation]}
            spaceBetween={0}
            slidesPerView={1}
            centeredSlides={true}
            loop
            autoplay={isActive ?? { delay: 1200, disableOnInteraction: true }}
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
        className="truncate font-semibold line-clamp-2 min-h-[1em] hover:cursor-pointer hover:text-yellow-500"
        onClick={() => goToDetail(product?.id)}
      >
        {product.title}
      </h3>
      <div className="overflow-hidden relative whitespace-nowrap cursor-pointer">
        <div className="inline-flex gap-8 will-change-transform hover:animate-[tw-marquee_12s_linear_infinite]">
          <p className="text-xs font-semibold text-gray-600 truncate">
            {product.description}
          </p>
        </div>
      </div>
      <div className="grid grid-flow-col grid-rows-3 gap-5 mt-3">
        <div className="row-span-2 font-bold text-lg text-gray-900">
          ${product.price}
        </div>
        <div className="row-span-2 flex items-center">
          {renderStars(product.rating)}
        </div>
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
