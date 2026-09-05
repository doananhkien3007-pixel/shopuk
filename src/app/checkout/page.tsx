"use client";

import React, { useEffect, useState } from "react";
import { loadStripe } from "@stripe/stripe-js";
import { EmbeddedCheckoutProvider, EmbeddedCheckout } from "@stripe/react-stripe-js";
import { useCart } from "@/context/CartContext";
import Header from "@/components/sites/eql/root/Header";
import Footer from "@/components/sites/eql/root/Footer";
import { useRouter } from "next/navigation";
import Link from "next/link";

// Initialize Stripe outside of component to avoid recreating the object
const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY || "");

export default function CheckoutPage() {
  const [clientSecret, setClientSecret] = useState<string>("");
  const { items } = useCart();
  const router = useRouter();

  useEffect(() => {
    if (!items || items.length === 0) {
      router.push("/");
      return;
    }

    // Fetch the client secret from our API
    fetch("/api/checkout", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ items }),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.clientSecret) {
          setClientSecret(data.clientSecret);
        } else {
          console.error("No client secret returned:", data);
        }
      })
  }, [items, router]);

  return (
    <div className="min-h-screen flex flex-col font-sans bg-[#fcfcfc]">
      <Header />
      
      {/* Sleek Breadcrumb / Header Banner */}
      <div className="w-full bg-white border-b border-gray-200 pt-24 md:pt-32">
        <div className="max-w-6xl mx-auto px-4 pb-6 md:pb-10 flex flex-col items-center">
          <nav className="flex text-xs uppercase tracking-widest text-gray-400 space-x-2 mb-4">
            <Link href="/" className="hover:text-black transition-colors">Trang chủ</Link>
            <span>/</span>
            <span className="text-black font-semibold">Thanh Toán</span>
          </nav>
          <h1 className="text-3xl md:text-4xl font-light text-black tracking-tight mb-6">Hoàn Tất Đơn Hàng</h1>
          
          <div className="flex flex-wrap items-center justify-center gap-4 sm:gap-8 text-[11px] sm:text-xs text-gray-600 font-medium">
            <div className="flex items-center gap-1.5">
              <svg className="w-4 h-4 text-[#635BFF]" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" /></svg>
              <span className="flex items-center gap-1">
                Bảo mật bởi
                <span className="font-bold text-[#635BFF] tracking-tight text-sm leading-none mt-[1px]">stripe</span>
              </span>
            </div>
            <div className="hidden sm:block text-gray-300">•</div>
            <div className="flex items-center gap-1.5">
              <svg className="w-4 h-4 text-black" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" /></svg>
              <span>Đổi trả 30 ngày không cần lý do</span>
            </div>
            <div className="hidden sm:block text-gray-300">•</div>
            <div className="flex items-center gap-1.5">
              <svg className="w-4 h-4 text-black" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M5 8h14M5 8a2 2 0 110-4h14a2 2 0 110 4M5 8v10a2 2 0 002 2h10a2 2 0 002-2V8m-9 4h4" /></svg>
              <span>Cam kết chính hãng 100%</span>
            </div>
          </div>
        </div>
      </div>
      
      <main className="flex-1 py-10 px-4 max-w-6xl mx-auto w-full">
        {clientSecret ? (
          <div className="bg-white border border-gray-100 shadow-[0_8px_30px_rgb(0,0,0,0.04)] animate-fade-in w-full">
            <EmbeddedCheckoutProvider
              stripe={stripePromise}
              options={{ clientSecret }}
            >
              <EmbeddedCheckout className="w-full" />
            </EmbeddedCheckoutProvider>
          </div>
        ) : (
          <div className="flex flex-col justify-center items-center py-32 bg-white border border-gray-100">
            <div className="relative w-12 h-12">
              <div className="absolute inset-0 border-2 border-gray-200 rounded-full"></div>
              <div className="absolute inset-0 border-2 border-black rounded-full border-t-transparent animate-spin"></div>
            </div>
            <span className="mt-6 text-xs text-gray-500 uppercase tracking-widest font-medium">Khởi tạo môi trường bảo mật...</span>
          </div>
        )}
      </main>

      <Footer />
    </div>
  );
}
