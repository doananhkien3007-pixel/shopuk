"use client";

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useCart } from '@/context/CartContext';

export default function Header() {
  const pathname = usePathname();
  const { openCart, totalCount } = useCart();
  const isHomePage = pathname === '/';
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [showAnnouncement, setShowAnnouncement] = useState(true);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 30) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll();

    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Trên các trang con (không phải trang chủ), Header luôn có nền trắng, chữ đen, logo đen
  const isSolid = !isHomePage || isScrolled;

  const textColor = isSolid ? 'text-black' : 'text-white';
  const iconColor = isSolid ? 'text-black hover:opacity-70' : 'text-white hover:opacity-70';
  const bgColor = isSolid ? 'bg-white border-b border-[#e0e0e0]/80 shadow-xs' : 'bg-transparent';
  const logoSrc = isSolid ? '/eql-logo-black.png' : '/eql-logo-white.png';
  const searchBorder = isSolid ? 'border-[#e0e0e0] focus:border-black' : 'border-white/40 focus:border-white';
  const searchPlaceholder = isSolid ? 'placeholder:text-[#999]' : 'placeholder:text-white/70';

  return (
    <div className={`fixed top-0 left-0 right-0 z-50 transition-all duration-200 ${bgColor}`}>
      {/* Top Announcement Bar */}
      {showAnnouncement && (
        <div className="bg-black text-white text-[11px] sm:text-xs font-normal uppercase tracking-[0.08em] py-2 px-4 flex items-center justify-center text-center relative">
          <button
            onClick={() => setShowAnnouncement(false)}
            className="absolute left-4 top-1/2 -translate-y-1/2 text-white/70 hover:text-white text-xs cursor-pointer p-1"
            aria-label="Đóng thông báo"
          >
            ✕
          </button>
          <p className="px-6 truncate">
            MIỄN PHÍ VẬN CHUYỂN ĐƠN HÀNG TRÊN $50
          </p>
        </div>
      )}

      <header className="w-full">
        <div className="mx-auto max-w-[1440px] px-3 sm:px-6 lg:px-8">
          <div className="flex h-14 sm:h-16 lg:h-20 items-center justify-between">
            
            {/* Mobile Menu Button & Desktop Nav */}
            <div className="flex items-center gap-4 lg:gap-8">
              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className={`lg:hidden p-1 transition-colors ${iconColor} cursor-pointer`}
                aria-label="Menu"
              >
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.75" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
                </svg>
              </button>

              <nav className="hidden lg:flex items-center gap-8 h-full">
                <div className="relative group h-14 sm:h-16 lg:h-20 flex items-center">
                  <Link href="/products" className={`text-[13px] font-normal tracking-[0.01em] transition-colors hover:opacity-70 flex items-center gap-1 ${textColor}`}>
                    Danh mục
                    <svg className="w-3.5 h-3.5 opacity-50 transition-transform group-hover:rotate-180" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" /></svg>
                  </Link>
                  
                  {/* Mega Menu Dropdown */}
                  <div className="absolute top-full left-0 w-[700px] bg-white border border-gray-100 shadow-xl opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 transform origin-top -translate-y-2 group-hover:translate-y-0 flex z-50">
                    <div className="flex-1 p-8 grid grid-cols-3 gap-8">
                      {/* Column 1 */}
                      <div>
                        <h4 className="text-[11px] uppercase tracking-widest font-semibold text-black mb-4">QUẦN ÁO (CLOTHING)</h4>
                        <ul className="space-y-3 flex flex-col">
                          <li><Link href="/products" className="text-xs text-gray-500 hover:text-black transition-colors">Áo Thun (T-Shirts)</Link></li>
                          <li><Link href="/products" className="text-xs text-gray-500 hover:text-black transition-colors">Áo Polo (Polos)</Link></li>
                          <li><Link href="/products" className="text-xs text-gray-500 hover:text-black transition-colors">Áo Khoác (Outerwear)</Link></li>
                          <li><Link href="/products" className="text-xs text-gray-500 hover:text-black transition-colors">Quần Short (Shorts)</Link></li>
                          <li><Link href="/products" className="text-xs text-gray-500 hover:text-black transition-colors">Quần Dài (Pants)</Link></li>
                        </ul>
                      </div>
                      
                      {/* Column 2 */}
                      <div>
                        <h4 className="text-[11px] uppercase tracking-widest font-semibold text-black mb-4">PHỤ KIỆN (ACCESSORIES)</h4>
                        <ul className="space-y-3 flex flex-col">
                          <li><Link href="/products" className="text-xs text-gray-500 hover:text-black transition-colors">Túi Tập (Duffle Bags)</Link></li>
                          <li><Link href="/products" className="text-xs text-gray-500 hover:text-black transition-colors">Balo (Backpacks)</Link></li>
                          <li><Link href="/products" className="text-xs text-gray-500 hover:text-black transition-colors">Mũ Lưỡi Trai (Caps)</Link></li>
                          <li><Link href="/products" className="text-xs text-gray-500 hover:text-black transition-colors">Tất/Vớ (Socks)</Link></li>
                          <li><Link href="/products" className="text-xs text-gray-500 hover:text-black transition-colors">Bình Nước (Water Bottles)</Link></li>
                        </ul>
                      </div>

                      {/* Column 3 */}
                      <div>
                        <h4 className="text-[11px] uppercase tracking-widest font-semibold text-black mb-4">BỘ SƯU TẬP (COLLECTIONS)</h4>
                        <ul className="space-y-3 flex flex-col">
                          <li><Link href="/products" className="text-xs text-gray-500 hover:text-black transition-colors">Hàng Mới Về (New Arrivals)</Link></li>
                          <li><Link href="/products" className="text-xs text-gray-500 hover:text-black transition-colors">Bộ sưu tập Mùa Hè</Link></li>
                          <li><Link href="/products" className="text-xs text-gray-500 hover:text-black transition-colors">Core Basics</Link></li>
                          <li><Link href="/products" className="text-xs text-red-500 font-medium hover:text-red-600 transition-colors">Đang Giảm Giá (Sale)</Link></li>
                        </ul>
                      </div>
                    </div>
                    {/* Featured Image inside Mega Menu */}
                    <div className="w-64 bg-gray-50 p-4 flex flex-col border-l border-gray-100">
                      <div className="h-48 relative overflow-hidden mb-3">
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img src="https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?w=400&q=80" alt="New Collection" className="object-cover w-full h-full hover:scale-105 transition-transform duration-500" />
                      </div>
                      <h5 className="text-xs font-semibold uppercase tracking-wider text-black">New Season</h5>
                      <p className="text-[10px] text-gray-500 mt-1">Khám phá bộ sưu tập mới nhất.</p>
                      <Link href="/products" className="text-[10px] uppercase font-semibold text-black underline mt-2">Xem ngay</Link>
                    </div>
                  </div>
                </div>

                <div className="relative h-14 sm:h-16 lg:h-20 flex items-center">
                  <Link href="/about" className={`text-[13px] font-normal tracking-[0.01em] transition-colors hover:opacity-70 ${textColor}`}>
                    Về chúng tôi
                  </Link>
                </div>
              </nav>
            </div>

            {/* Logo */}
            <Link href="/" className="absolute left-1/2 -translate-x-1/2 flex items-center justify-center">
              <img
                src={logoSrc}
                alt="EQL Apparel"
                className="h-[22px] sm:h-[26px] lg:h-[30px] transition-all duration-200 object-contain"
              />
            </Link>

            {/* Right Tools: Search, Account, Wishlist, Cart */}
            <div className="flex items-center gap-2 sm:gap-4">
              {/* Search Bar (Desktop) */}
              <div className="relative hidden lg:block">
                <input 
                  type="text" 
                  placeholder="Tìm kiếm" 
                  className={`w-44 xl:w-52 text-xs border-b bg-transparent py-1.5 pr-7 pl-1 focus:outline-none transition-colors ${searchBorder} ${textColor} ${searchPlaceholder}`} 
                />
                <svg className={`absolute right-1 top-1/2 -translate-y-1/2 w-4 h-4 ${isSolid ? 'text-gray-500' : 'text-white'}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z" />
                </svg>
              </div>

              {/* Language Switcher */}
              <button className={`hidden lg:block px-2 py-1 text-[11px] font-normal tracking-[0.05em] transition-colors ${iconColor}`}>
                EN
              </button>

              <Link href="/about" className={`hidden lg:block text-[13px] font-normal tracking-[0.01em] transition-colors hover:opacity-70 ${textColor}`}>
                Về chúng tôi
              </Link>

              {/* Search Icon (Mobile) */}
              <button className={`lg:hidden p-1 transition-colors ${iconColor} cursor-pointer`} aria-label="Search">
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.75" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z" />
                </svg>
              </button>

              {/* Wishlist */}
              <Link href="/wishlist" className={`p-1 transition-colors ${iconColor} cursor-pointer`} aria-label="Wishlist">
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.75" d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z" />
                </svg>
              </Link>

              {/* Track Order */}
              <Link href="/track-order" className={`hidden sm:inline-flex p-1 transition-colors ${iconColor}`} aria-label="Tra cứu đơn hàng" title="Tra cứu đơn hàng">
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.75" d="M8.25 18.75a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m3 0h6m-9 0H3.375a1.125 1.125 0 01-1.125-1.125V14.25m17.25 4.5a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m3 0h1.125c.621 0 1.129-.504 1.09-1.124a17.902 17.902 0 00-3.213-9.193 2.056 2.056 0 00-1.58-.86H14.25M16.5 18.75h-2.25m0-11.177v-.958c0-.568-.422-1.048-.987-1.106a48.554 48.554 0 00-10.026 0 1.106 1.106 0 00-.987 1.106v7.635m12-6.677v6.677m0 4.5v-4.5m0 0h-12" />
                </svg>
              </Link>

              {/* Account (Desktop) */}
              <Link href="/account" className={`hidden sm:inline-flex p-1 transition-colors ${iconColor}`} aria-label="Tài khoản" title="Tài khoản">
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.75" d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z" />
                </svg>
              </Link>

              {/* Cart Button */}
              <button
                onClick={openCart}
                className={`p-1 relative transition-colors ${iconColor} cursor-pointer`}
                aria-label={`Giỏ hàng (${totalCount})`}
              >
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.75" d="M15.75 10.5V6a3.75 3.75 0 10-7.5 0v4.5m11.356-1.993l1.263 12c.07.665-.45 1.243-1.119 1.243H4.25a1.125 1.125 0 01-1.12-1.243l1.264-12A1.125 1.125 0 015.513 7.5h12.974c.576 0 1.059.435 1.119 1.007zM8.625 10.5a.375.375 0 11-.75 0 .375.375 0 01.75 0zm7.5 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z" />
                </svg>
                {totalCount > 0 && (
                  <span className="absolute -top-1 -right-1 min-w-[17px] h-[17px] bg-black text-white text-[9px] font-bold rounded-full flex items-center justify-center px-0.5 shadow-sm border border-white">
                    {totalCount}
                  </span>
                )}
              </button>

            </div>
          </div>
        </div>
      </header>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 z-50 lg:hidden">
          <div
            onClick={() => setMobileMenuOpen(false)}
            className="fixed inset-0 bg-black/50 backdrop-blur-xs"
          />
          <div className="fixed inset-y-0 left-0 w-4/5 max-w-sm bg-white p-6 shadow-2xl flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between pb-6 border-b border-gray-100">
                <img src="/eql-logo-black.png" alt="EQL" className="h-6" />
                <button
                  onClick={() => setMobileMenuOpen(false)}
                  className="p-1 text-black text-xl cursor-pointer"
                >
                  ✕
                </button>
              </div>
              <nav className="mt-6 flex flex-col gap-4">
                <Link
                  href="/"
                  onClick={() => setMobileMenuOpen(false)}
                  className="text-sm uppercase tracking-wider text-black py-2 border-b border-gray-50"
                >
                  Trang chủ
                </Link>
                <Link
                  href="/products"
                  onClick={() => setMobileMenuOpen(false)}
                  className="text-sm uppercase tracking-wider text-black py-2 border-b border-gray-50"
                >
                  Tất cả sản phẩm
                </Link>
                <Link
                  href="/products?tag=new"
                  onClick={() => setMobileMenuOpen(false)}
                  className="text-sm uppercase tracking-wider text-black py-2 border-b border-gray-50"
                >
                  Hàng mới về
                </Link>
                <Link
                  href="/about"
                  onClick={() => setMobileMenuOpen(false)}
                  className="text-sm uppercase tracking-wider text-black py-2 border-b border-gray-50"
                >
                  Về chúng tôi
                </Link>
              </nav>
            </div>

            <div className="pt-6 border-t border-gray-100 text-xs text-gray-500">
              <p>EQL Apparel Vietnam</p>
              <p className="mt-1">Hotline: 090 123 4567</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
