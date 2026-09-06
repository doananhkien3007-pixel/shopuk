"use client";

import React, { useState, useEffect } from 'react';
import ProductCard, { ProductItem } from './ProductCard';
import { supabase } from '@/utils/supabase';

// Dữ liệu dự phòng trong lúc tải hoặc lỗi mạng
const fallbackData: ProductItem[] = [
  {
    id: 'sculpt-cream-polka-dot-set',
    title: 'Sculpt - Cream Polka Dot - Set',
    price: '$850',
    originalPrice: '$105',
    href: '/products/sculpt-cream-polka-dot-set',
    images: ['/products/polka-dot-cream-set.jpg'],
    rating: { score: 5.0, count: 12 },
    colors: [
      {
        name: 'Cream Polka Dot',
        hex: '#EBE5D9',
        image: '/products/polka-dot-cream-set.jpg',
        images: ['/products/polka-dot-cream-set.jpg'],
      },
    ],
  }
];

export default function Collections() {
  const [activeTab, setActiveTab] = useState<'all' | 'new' | 'best'>('all');
  const [products, setProducts] = useState<ProductItem[]>([]);
  const [loading, setLoading] = useState(true);

  const tabs = [
    { key: 'all' as const, label: 'Tất cả sản phẩm' },
    { key: 'new' as const, label: 'Hàng mới về' },
    { key: 'best' as const, label: 'Bán chạy nhất' },
  ];

  useEffect(() => {
    async function fetchProducts() {
      try {
        const { data, error } = await supabase
          .from('products')
          .select('*')
          .limit(8);

        if (error) throw error;

        if (data && data.length > 0) {
          // Map dữ liệu từ DB sang format UI cần
          const formattedData: ProductItem[] = data.map((item: any) => ({
            id: item.slug || String(item.id),
            title: item.title,
            // Format giá tiền (Ví dụ: 358800 -> $358)
            price: `$${Math.round(item.price / 1000)}`,
            originalPrice: item.compare_at_price ? `$${Math.round(item.compare_at_price / 1000)}` : undefined,
            href: `/products/${item.slug}`,
            images: [item.thumbnail_url || 'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?w=300'],
            rating: { 
              score: parseFloat(item.avg_rating || '5.0'), 
              count: item.review_count || 0 
            },
            colors: [], // Lấy default trống do DB hiện tại chưa có bảng colors detail
          }));
          setProducts(formattedData);
        } else {
          setProducts(fallbackData);
        }
      } catch (err) {
        console.error("Lỗi khi tải Supabase:", err);
        setProducts(fallbackData);
      } finally {
        setLoading(false);
      }
    }

    fetchProducts();
  }, []);

  return (
    <section className="mx-auto max-w-[1440px] px-3 sm:px-6 lg:px-8 py-6 lg:py-10">
      <div className="text-center mb-4 lg:mb-6">
        <h2 className="text-xl sm:text-2xl font-normal uppercase tracking-[0.1em] text-black">
          Bộ sưu tập
        </h2>
        <div className="relative mt-3">
          <div className="flex items-center justify-center gap-1">
            {tabs.map((tab) => (
              <button
                key={tab.key}
                onClick={() => setActiveTab(tab.key)}
                className={`px-3 sm:px-5 py-2 min-h-[44px] text-[11px] font-normal uppercase tracking-[0.1em] transition-colors duration-300 cursor-pointer ${
                  activeTab === tab.key
                    ? 'text-black font-semibold border-b-2 border-black'
                    : 'text-[#767676] hover:text-black'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      {loading ? (
        <div className="flex justify-center py-20">
           <div className="w-8 h-8 border-2 border-gray-200 border-t-black rounded-full animate-spin"></div>
        </div>
      ) : (
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-x-[8px] gap-y-6 sm:gap-x-4 lg:gap-x-5 lg:gap-y-8">
          {products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      )}
    </section>
  );
}
