"use client";

import React, { useState, useEffect } from 'react';

export default function NewsletterPopup() {
  const [isOpen, setIsOpen] = useState(false);
  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    // Check local storage to see if user already dismissed or submitted
    const hasSeenPopup = localStorage.getItem('eql_newsletter_popup');
    if (!hasSeenPopup) {
      // Show popup after 3 seconds
      const timer = setTimeout(() => {
        setIsOpen(true);
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, []);

  const closePopup = () => {
    setIsOpen(false);
    localStorage.setItem('eql_newsletter_popup', 'true');
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    setSubmitted(true);
    // Auto close after 3 seconds of showing success message
    setTimeout(() => {
      closePopup();
    }, 3000);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-black/30 backdrop-blur-sm transition-opacity duration-300"
        onClick={closePopup}
      />
      
      {/* Modal ultra-minimalist EQL style with image */}
      <div className="relative w-full max-w-[720px] bg-white shadow-2xl flex flex-col md:flex-row animate-in fade-in zoom-in-95 duration-300">
        {/* Close Button */}
        <button 
          onClick={closePopup}
          className="absolute top-4 right-4 z-10 p-2 text-gray-400 hover:text-black transition-colors"
        >
          <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>

        {/* Product Image Section (Left) */}
        <div className="md:w-5/12 h-[200px] md:h-auto relative hidden sm:block bg-gray-100">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img 
            src="https://images.unsplash.com/photo-1618354691373-d851c5c3a990?w=800&q=80"
            alt="EQL Apparel Product"
            className="w-full h-full object-cover object-center"
          />
        </div>

        {/* Form Section (Right) */}
        <div className="md:w-7/12 p-10 md:p-12 text-center flex flex-col justify-center">
          {submitted ? (
            <div className="py-8 animate-in fade-in duration-500">
              <svg className="w-10 h-10 text-black mx-auto mb-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1" d="M5 13l4 4L19 7" />
              </svg>
              <h2 className="text-xl font-light text-black tracking-tight mb-2">ĐĂNG KÝ THÀNH CÔNG</h2>
              <p className="text-gray-500 text-xs">
                Mã giảm giá 10% đã được gửi đến email<br/><strong className="text-black font-medium">{email}</strong>
              </p>
            </div>
          ) : (
            <>
              <div className="uppercase tracking-[0.2em] text-[10px] text-gray-500 mb-6">
                EQL REWARDS
              </div>
              
              <h2 className="text-2xl font-light text-black tracking-tight mb-4">
                Nhận ngay 10% Voucher
              </h2>
              
              <p className="text-gray-500 text-xs mb-8 leading-relaxed max-w-[280px] mx-auto">
                Đăng ký email để nhận thông báo về bộ sưu tập mới và voucher giảm giá 10% cho đơn hàng đầu tiên.
              </p>

              <form onSubmit={handleSubmit} className="flex flex-col gap-3">
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Địa chỉ email"
                  className="w-full border border-gray-200 px-4 py-3.5 text-xs focus:outline-none focus:border-black transition-colors text-center placeholder-gray-400"
                />
                
                <button 
                  type="submit"
                  className="w-full bg-black text-white text-[11px] uppercase tracking-[0.15em] font-medium py-4 hover:bg-[#2c2c2c] transition-colors mt-2"
                >
                  NHẬN MÃ GIẢM GIÁ
                </button>
                
                <button 
                  type="button"
                  onClick={closePopup}
                  className="mt-3 text-[11px] text-gray-400 hover:text-black transition-colors"
                >
                  Không, cảm ơn
                </button>
              </form>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
