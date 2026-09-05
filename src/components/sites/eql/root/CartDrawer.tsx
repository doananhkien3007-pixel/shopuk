"use client";

import React, { useState } from 'react';
import { useCart } from '@/context/CartContext';
import Link from 'next/link';

export default function CartDrawer() {
  const [isCheckingOut, setIsCheckingOut] = useState(false);
  const {
    items,
    isCartOpen,
    closeCart,
    addToCart,
    removeFromCart,
    updateQuantity,
    totalCount,
    subtotal,
  } = useCart();

  const freeShippingThreshold = 500000;
  const remainingForFreeShip = Math.max(0, freeShippingThreshold - subtotal);
  const freeShipPercent = Math.min(100, (subtotal / freeShippingThreshold) * 100);

  const formatUSD = (num: number) => {
    return '$' + (num / 10000).toLocaleString('en-US', {minimumFractionDigits: 2, maximumFractionDigits: 2});
  };

  if (!isCartOpen) return null;

  return (
    <div className="fixed inset-0 z-[100] font-sans">
      {/* Backdrop overlay */}
      <div
        onClick={closeCart}
        className="fixed inset-0 bg-black/50 backdrop-blur-xs transition-opacity duration-300 animate-fade-in"
      />

      {/* Slide-over Panel */}
      <div className="fixed inset-y-0 right-0 max-w-full flex">
        <div className="w-screen max-w-md bg-white shadow-2xl flex flex-col justify-between">
          
          {/* Header */}
          <div className="p-5 border-b border-[#e0e0e0] flex items-center justify-between">
            <h2 className="text-xs font-bold uppercase tracking-[0.15em] text-black">
              Giỏ hàng ({totalCount})
            </h2>
            <button
              onClick={closeCart}
              className="p-1 text-gray-500 hover:text-black text-lg cursor-pointer"
              aria-label="Đóng"
            >
              ✕
            </button>
          </div>

          {/* Free Shipping Progress */}
          <div className="px-5 py-3.5 bg-[#fafafa] border-b border-gray-200/80">
            <p className="text-[11px] text-gray-700 font-medium">
              {remainingForFreeShip === 0 ? (
                <span className="text-emerald-700 font-semibold">
                  🎉 Chúc mừng! Đơn hàng được MIỄN PHÍ VẬN CHUYỂN
                </span>
              ) : (
                <span>
                  Mua thêm <strong className="text-black">{formatUSD(remainingForFreeShip)}</strong> để được{' '}
                  <strong className="text-black">MIỄN PHÍ VẬN CHUYỂN</strong>
                </span>
              )}
            </p>
            <div className="mt-2 h-1.5 w-full bg-gray-200 rounded-full overflow-hidden">
              <div
                className="h-full bg-black rounded-full transition-all duration-500"
                style={{ width: `${freeShipPercent}%` }}
              />
            </div>
          </div>

          {/* Cart Items List */}
          <div className="flex-1 overflow-y-auto p-5 divide-y divide-gray-100">
            {items.length === 0 ? (
              <div className="py-20 text-center space-y-4">
                <svg
                  className="w-12 h-12 mx-auto text-gray-300"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="1"
                    d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"
                  />
                </svg>
                <p className="text-xs text-gray-500 uppercase tracking-wider">
                  Giỏ hàng của bạn đang trống
                </p>
                <button
                  onClick={closeCart}
                  className="px-6 py-2.5 bg-black text-white text-xs uppercase tracking-wider hover:bg-gray-800 transition-colors"
                >
                  Tiếp tục mua sắm
                </button>
              </div>
            ) : (
              items.map((item) => (
                <div key={`${item.id}-${item.color}-${item.size}`} className="py-4 flex gap-4">
                  {/* Thumbnail */}
                  <div className="w-16 sm:w-20 aspect-[4/5] bg-[#f5f5f5] shrink-0 overflow-hidden rounded-xs border border-gray-100">
                    <img src={item.image} alt={item.title} className="w-full h-full object-cover" />
                  </div>

                  {/* Info */}
                  <div className="flex-1 min-w-0 flex flex-col justify-between">
                    <div>
                      <div className="flex items-start justify-between gap-2">
                        <h3 className="text-xs font-medium text-black line-clamp-1 leading-snug">
                          {item.title}
                        </h3>
                        <button
                          onClick={() => removeFromCart(item.id, item.color, item.size)}
                          className="text-gray-400 hover:text-black text-xs cursor-pointer"
                          title="Xóa sản phẩm"
                        >
                          ✕
                        </button>
                      </div>
                      <p className="text-[11px] text-[#767676] mt-0.5">
                        {item.color} / {item.size}
                      </p>
                    </div>

                    <div className="flex items-center justify-between mt-3">
                      {/* Quantity Controls */}
                      <div className="flex items-center border border-gray-300 h-7 text-xs">
                        <button
                          onClick={() => updateQuantity(item.id, item.color, item.size, -1)}
                          className="w-7 h-full text-gray-600 hover:text-black flex items-center justify-center cursor-pointer"
                        >
                          −
                        </button>
                        <span className="w-6 text-center font-medium">{item.quantity}</span>
                        <button
                          onClick={() => updateQuantity(item.id, item.color, item.size, 1)}
                          className="w-7 h-full text-gray-600 hover:text-black flex items-center justify-center cursor-pointer"
                        >
                          +
                        </button>
                      </div>

                      {/* Price */}
                      <div className="flex flex-col items-end gap-0.5">
                        <div className="flex items-center gap-1.5">
                          {item.originalPriceNum && item.originalPriceNum > item.priceNum && (
                            <span className="text-[10px] text-gray-400 line-through">
                              {formatUSD(item.originalPriceNum * item.quantity)}
                            </span>
                          )}
                          <span className={`text-xs font-bold tracking-tight ${item.originalPriceNum && item.originalPriceNum > item.priceNum ? 'text-red-600' : 'text-black'}`}>
                            {formatUSD(item.priceNum * item.quantity)}
                          </span>
                        </div>
                        {item.originalPriceNum && item.originalPriceNum > item.priceNum && (
                          <span className="text-[9px] text-red-600 font-medium">
                            Đã giảm {formatUSD((item.originalPriceNum - item.priceNum) * item.quantity)}
                          </span>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>

          {/* Cart Upsell */}
          {items.length > 0 && !items.some(item => item.id === 'sculpt-black-den-flare-leggings') && (
            <div className="mx-5 mb-5 p-3 bg-[#fcfcfc] border border-dashed border-gray-300 rounded-sm relative">
              <div className="absolute top-0 right-0 bg-red-600 text-white text-[9px] uppercase font-bold px-1.5 py-0.5">
                Giảm 10%
              </div>
              <h4 className="text-[10px] font-bold uppercase tracking-wider text-black mb-2 flex items-center gap-1">
                🔥 Gợi ý mua kèm
              </h4>
              <div className="flex items-center gap-3">
                <img 
                  src="/sites/eql/root/images/0cdf224043bdaf7a.webp" 
                  alt="Upsell leggings" 
                  className="w-12 h-12 object-cover rounded border border-gray-100" 
                />
                <div className="flex-1">
                  <p className="text-[11px] font-medium text-black">Sculpt - Leggings Loe</p>
                  <div className="flex items-center gap-1.5 mt-0.5">
                    <span className="text-[10px] text-red-600 font-bold">$612</span>
                    <span className="text-[9px] text-gray-400 line-through">$680</span>
                  </div>
                </div>
                <button
                  onClick={() => addToCart({
                    id: 'sculpt-black-den-flare-leggings',
                    title: 'Sculpt - Black (Đen) - Flare Leggings Loe',
                    price: '$612',
                    priceNum: 612000,
                    originalPriceNum: 680000,
                    image: '/sites/eql/root/images/0cdf224043bdaf7a.webp',
                    color: 'Black',
                    size: 'S',
                    quantity: 1,
                  })}
                  className="px-3 py-1.5 border border-black text-[9px] uppercase font-bold hover:bg-black hover:text-white transition-colors cursor-pointer"
                >
                  + Thêm
                </button>
              </div>
            </div>
          )}

          {/* Footer Summary & Checkout Button */}
          {items.length > 0 && (
            <div className="p-5 border-t border-[#e0e0e0] bg-white space-y-3">
              <div className="flex items-center justify-between text-xs">
                <span className="text-gray-600">Tạm tính:</span>
                <span className="text-sm font-bold text-black">{formatUSD(subtotal)}</span>
              </div>
              <p className="text-[10px] text-[#767676] leading-tight">
                Thuế và phí vận chuyển sẽ được tính toán chi tiết tại bước thanh toán.
              </p>

              <Link
                href="/checkout"
                onClick={closeCart}
                className="w-full h-12 bg-black text-white text-xs uppercase tracking-[0.15em] font-semibold hover:bg-[#2c2c2c] transition-colors cursor-pointer flex items-center justify-center"
              >
                THANH TOÁN — {formatUSD(subtotal)}
              </Link>

              {/* Secure Payments Badge */}
              <div className="flex flex-wrap items-center justify-center gap-1.5 pt-2">
                <div className="px-2 py-0.5 border border-gray-200 bg-gray-50 rounded-xs flex items-center justify-center">
                  <span className="text-[8px] font-bold text-[#1a1f71] italic tracking-tighter">VISA</span>
                </div>
                <div className="px-2 py-0.5 border border-gray-200 bg-gray-50 rounded-xs flex items-center justify-center gap-0.5">
                  <div className="w-2 h-2 bg-[#eb001b] rounded-full opacity-90"></div>
                  <div className="w-2 h-2 bg-[#f79e1b] rounded-full opacity-90 -ml-1 mix-blend-multiply"></div>
                  <span className="text-[8px] font-medium text-black ml-0.5">mastercard</span>
                </div>
                <div className="px-2 py-0.5 border border-gray-200 bg-gray-50 rounded-xs flex items-center justify-center">
                  <span className="text-[8px] font-medium text-gray-700">G Pay</span>
                </div>
                <div className="px-2 py-0.5 border border-gray-200 bg-gray-50 rounded-xs flex items-center justify-center">
                  <span className="text-[8px] font-medium text-black"> Pay</span>
                </div>
                <div className="px-2 py-0.5 border border-gray-200 bg-gray-50 rounded-xs flex items-center justify-center">
                  <span className="text-[8px] font-bold text-[#003087] italic tracking-tight">PayPal</span>
                </div>
              </div>

              <button
                onClick={closeCart}
                className="w-full text-center text-[11px] text-gray-500 hover:text-black underline cursor-pointer py-1"
              >
                Tiếp tục mua sắm
              </button>
            </div>
          )}

        </div>
      </div>
    </div>
  );
}
