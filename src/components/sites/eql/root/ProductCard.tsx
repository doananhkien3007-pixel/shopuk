"use client";

import React, { useState } from 'react';
import Link from 'next/link';

export interface ColorVariant {
  name: string;
  hex: string;
  image?: string;
  images?: string[];
}

export interface ProductItem {
  id: string | number;
  title: string;
  price: string;
  originalPrice?: string;
  href: string;
  images: string[];
  colors: ColorVariant[];
  rating?: { score: number; count: number };
  sizes?: string[];
  activity?: string[];
  isNewProduct?: boolean;
}

export default function ProductCard({ product }: { product: ProductItem }) {
  const [selectedColor, setSelectedColor] = useState<ColorVariant>(
    product.colors[product.colors.length - 1] || product.colors[0]
  );
  const [activeImages, setActiveImages] = useState<string[]>(
    selectedColor?.images && selectedColor.images.length > 0
      ? selectedColor.images
      : product.images
  );
  const [currentImageIdx, setCurrentImageIdx] = useState(0);
  const [isSaved, setIsSaved] = useState(false);

  // Switch color on hover or click
  const handleColorChange = (color: ColorVariant) => {
    setSelectedColor(color);
    if (color.images && color.images.length > 0) {
      setActiveImages(color.images);
      setCurrentImageIdx(0);
    } else if (color.image) {
      setActiveImages([color.image, ...product.images.filter((img) => img !== color.image)]);
      setCurrentImageIdx(0);
    }
  };

  const nextImage = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setCurrentImageIdx((prev) => (prev + 1) % activeImages.length);
  };

  const prevImage = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setCurrentImageIdx((prev) => (prev - 1 + activeImages.length) % activeImages.length);
  };

  const displayImage = activeImages[currentImageIdx] || activeImages[0] || product.images[0];

  return (
    <div className="sf-product-card group pb-1 font-sans">
      {/* Image container */}
      <div className="relative w-full aspect-[4/5] overflow-hidden bg-[#f5f5f5]">
        <Link href={product.href} className="block w-full h-full">
          <img
            src={displayImage}
            alt={`${product.title} - ${selectedColor?.name || ''}`}
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-[1.02]"
            loading="lazy"
          />
        </Link>

        {/* Progress bar at bottom */}
        {activeImages.length > 1 && (
          <div className="absolute bottom-0 inset-x-0 h-[3px] bg-black/10 z-10" aria-hidden="true">
            <div
              className="h-full bg-black transition-all duration-300"
              style={{
                width: `${100 / activeImages.length}%`,
                transform: `translateX(${currentImageIdx * 100}%)`,
              }}
            />
          </div>
        )}

        {/* Prev & Next Arrow Buttons */}
        {activeImages.length > 1 && (
          <>
            <button
              onClick={nextImage}
              className="absolute right-2 top-1/2 -translate-y-1/2 w-7 h-7 bg-white/95 hover:bg-white text-black flex items-center justify-center rounded shadow-md opacity-90 sm:opacity-0 sm:group-hover:opacity-100 transition-all z-20 cursor-pointer hover:scale-105"
              aria-label="Next image"
            >
              <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
              </svg>
            </button>
            {currentImageIdx > 0 && (
              <button
                onClick={prevImage}
                className="absolute left-2 top-1/2 -translate-y-1/2 w-7 h-7 bg-white/95 hover:bg-white text-black flex items-center justify-center rounded shadow-md opacity-90 sm:opacity-0 sm:group-hover:opacity-100 transition-all z-20 cursor-pointer hover:scale-105"
                aria-label="Previous image"
              >
                <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7" />
                </svg>
              </button>
            )}
          </>
        )}
      </div>

      {/* Info Section */}
      <div className="mt-3 px-0.5">
        {/* Title & Bookmark Button */}
        <div className="flex items-start justify-between gap-2">
          <Link href={product.href} className="flex-1 min-w-0">
            <h2 className="text-[13px] sm:text-[14px] font-normal text-black line-clamp-1 hover:opacity-75 transition-opacity">
              {product.title}
            </h2>
          </Link>
          <button
            onClick={() => setIsSaved(!isSaved)}
            className="flex-shrink-0 transition-colors text-gray-400 hover:text-black cursor-pointer p-0.5"
            aria-label="Save"
          >
            <svg
              className="w-4 h-4 transition-transform active:scale-125"
              fill={isSaved ? "currentColor" : "none"}
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth="1.5"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M17.593 3.322c1.1.128 1.907 1.077 1.907 2.185V21L12 17.25 4.5 21V5.507c0-1.108.806-2.057 1.907-2.185a48.507 48.507 0 0111.186 0z"
              />
            </svg>
          </button>
        </div>

        {/* Price - Nổi bật hơn theo yêu cầu */}
        <div className="flex items-baseline gap-2 mt-1">
          <span className="text-[15px] sm:text-[16px] font-bold text-black tracking-tight">
            {product.price}
          </span>
          {product.originalPrice && (
            <span className="text-xs text-gray-400 line-through">
              {product.originalPrice}
            </span>
          )}
        </div>

        {/* Reviews / Rating */}
        <div className="mt-1 flex items-center gap-1.5">
          <div className="flex items-center gap-0.5 text-amber-400">
            {[1, 2, 3, 4, 5].map((star) => (
              <svg key={star} className="w-3 h-3 fill-current" viewBox="0 0 20 20">
                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
              </svg>
            ))}
          </div>
          <span className="text-[10px] text-[#767676] font-medium">
            ({product.rating?.count || 4})
          </span>
        </div>

        {/* Color swatches - To hơn & Đổi màu khi hover/rê chuột */}
        <div className="flex items-center gap-2 mt-2.5">
          {product.colors.map((color) => {
            const isSelected = selectedColor?.name === color.name;
            return (
              <button
                key={color.name}
                onMouseEnter={() => handleColorChange(color)}
                onClick={() => handleColorChange(color)}
                className={`relative w-5 h-5 rounded-full transition-all duration-200 cursor-pointer flex items-center justify-center ${
                  isSelected
                    ? 'ring-2 ring-black ring-offset-1 scale-110 shadow-sm'
                    : 'border border-gray-300 hover:border-gray-600 hover:scale-110'
                }`}
                style={{ backgroundColor: color.hex }}
                title={`${color.name}${isSelected ? ' (Đang chọn)' : ''}`}
                aria-label={color.name}
              >
              </button>
            );
          })}
          {selectedColor?.name && (
            <span className="text-[11px] text-gray-500 ml-1 transition-opacity">
              {selectedColor.name}
            </span>
          )}
        </div>
      </div>
    </div>
  );
}
