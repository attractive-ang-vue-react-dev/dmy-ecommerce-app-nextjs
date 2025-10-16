import React from "react";
import Image from "next/image";
import ProductGallery from "@/components/ProductGallery";
import AddToCartButton from "@/components/AddToCartButton";
import HydrateProduct from "@/components/HydrateProduct";
import { IoPersonCircleSharp } from "react-icons/io5";
import ProductSearchBar from "@/components/ProductSearchBar";
import Tabs from "@/components/Tabs";
import { renderStars } from "@/utils/starRating";
import LoadingSpinner from "@/components/LoadingSpinner";
import { fetchProduct } from "@/services/api";

interface PageProps {
  params?: Promise<{ id?: string | string[] }>;
}

export default async function ProductDetailPage({ params }: PageProps) {
  const resolvedParams = params ? await params : {};
  const id = Array.isArray(resolvedParams?.id)
    ? resolvedParams.id[0]
    : resolvedParams.id;
  const product = await fetchProduct(`${id}`);

  if (!product)
    return <LoadingSpinner fullScreen message="Loading product..." />;

  return (
    <>
      <ProductSearchBar minimal showBack showCart />
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-16">
        {/* hydrate the product detail into client store */}
        <HydrateProduct product={product} />

        {/* Image gallery */}
        <div className="md:col-span-2 border-yellow-200 border">
          <ProductGallery images={product.images ?? []} />
        </div>

        {/* Product info and actions */}
        <div className="flex flex-col gap-4">
          <h1 className="text-2xl font-bold">{product.title}</h1>
          <div className="flex items-center gap-2">
            <div className="text-gray-600 text-sm">
              {product.brand} &middot; {product.category}
            </div>
          </div>
          <div className="text-xl font-semibold">${product.price}</div>
          {product.discountPercentage && (
            <div className="text-green-600 text-sm">
              {product.discountPercentage}% off
            </div>
          )}
          {renderStars(product.rating)}
          <div className="flex gap-2 items-center">
            <span className="text-xs bg-gray-100 px-2 py-1 rounded">
              SKU: {product.sku}
            </span>
            {product.availabilityStatus && (
              <span className="text-xs bg-blue-100 px-2 py-1 rounded">
                {product.availabilityStatus}
              </span>
            )}
          </div>
          <p className="mb-2 text-gray-800">{product.description}</p>
          <div className="max-w-30">
            <AddToCartButton product={product} />
          </div>
          <div className="text-xs text-gray-500">
            Min. order: {product.minimumOrderQuantity ?? 1}
          </div>
          <div className="text-xs text-gray-500">Stock: {product.stock}</div>
          {product.tags && product.tags.length > 0 && (
            <div className="flex flex-wrap gap-1 mt-2">
              {product.tags.map((tag: string) => (
                <span
                  key={tag}
                  className="bg-gray-200 text-xs px-2 py-0.5 rounded"
                >
                  {tag}
                </span>
              ))}
            </div>
          )}
          {product.meta?.barcode && (
            <div className="flex items-center gap-2 mt-2">
              <span className="text-xs text-gray-500">Barcode:</span>
              <span className="font-mono text-xs">{product.meta.barcode}</span>
            </div>
          )}
          {product.meta?.qrCode && (
            <div className="mt-2">
              <span className="text-xs text-gray-500">QR Code:</span>
              <div className="w-20 h-20 relative mt-1">
                <Image
                  src={product.meta.qrCode}
                  alt="QR Code"
                  fill
                  style={{ objectFit: "contain" }}
                />
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Tabs for reviews and specifications */}
      <div className="w-full mx-auto mt-10">
        <Tabs
          tabs={[
            {
              label: "Specifications",
              content: (
                <>
                  <div className="flex flex-row gap-4 space-y-2">
                    {product.dimensions && (
                      <div className="text-sm text-gray-500">
                        Dimensions: {product.dimensions.width} x{" "}
                        {product.dimensions.height} x {product.dimensions.depth}{" "}
                        cm
                      </div>
                    )}
                    {product.weight && (
                      <div className="text-sm text-gray-500">
                        Weight: {product.weight}g
                      </div>
                    )}
                    {product.warrantyInformation && (
                      <div className="text-sm text-gray-500">
                        Warranty: {product.warrantyInformation}
                      </div>
                    )}
                    {product.shippingInformation && (
                      <div className="text-sm text-gray-500">
                        Shipping: {product.shippingInformation}
                      </div>
                    )}
                    {product.returnPolicy && (
                      <div className="text-sm text-gray-500">
                        Return policy: {product.returnPolicy}
                      </div>
                    )}
                  </div>
                  {product.thumbnail && (
                    <Image
                      src={product.thumbnail}
                      alt="Product Thumbnail"
                      width={800}
                      height={500}
                      style={{ objectFit: "contain" }}
                    />
                  )}
                </>
              ),
            },
            {
              label: "Customer Reviews",
              content: (
                <div>
                  {product.reviews && product.reviews.length > 0 ? (
                    <div className="space-y-2 max-w-5xl">
                      {product.reviews.map((review: any, idx: number) => (
                        <div key={idx} className="bg-gray-100 p-3">
                          <div className="flex items-center gap-1">
                            <div className="flex text-2xl gap-2">
                              <IoPersonCircleSharp className="text-gray-400" />
                              <span className="font-semibold text-xs self-center">
                                {review.reviewerName}
                              </span>
                              <span className="text-xs text-gray-400 self-center">
                                {new Date(review.date).toLocaleDateString()}
                              </span>
                            </div>
                          </div>
                          <div className="flex flex-row">
                            <div className="mr-5 self-center">
                              {renderStars(review.rating)}
                            </div>

                            <div className="text-lg text-gray-700">
                              {review.comment}
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="text-gray-500 text-sm">No reviews yet.</div>
                  )}
                </div>
              ),
            },
          ]}
        />
      </div>
    </>
  );
}
