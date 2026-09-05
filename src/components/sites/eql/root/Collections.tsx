"use client";

import React, { useState } from 'react';
import ProductCard, { ProductItem } from './ProductCard';

const productsData: ProductItem[] = [
  {
    id: 'sculpt-cream-polka-dot-set',
    title: 'Sculpt - Cream Polka Dot - Set',
    price: '$850',
    originalPrice: '$105',
    href: '/products/sculpt-cream-polka-dot-set',
    images: [
      '/products/polka-dot-cream-set.jpg',
    ],
    rating: { score: 5.0, count: 12 },
    colors: [
      {
        name: 'Cream Polka Dot',
        hex: '#EBE5D9', // A creamy off-white color
        image: '/products/polka-dot-cream-set.jpg',
        images: [
          '/products/polka-dot-cream-set.jpg',
        ],
      },
    ],
  },
  {
    id: 'sculpt-black-den-bra',
    title: 'Sculpt - Black (Đen) - Bra',
    price: '$500',
    originalPrice: '$620',
    href: '/products/sculpt-black-den-bra',
    images: [
      '/products/sculpt-black-bra-1.jpg',
      '/sites/eql/root/images/c8760525ce91eb4c.webp',
      '/sites/eql/root/images/8c1b9c678b71a3d1.webp',
      '/sites/eql/root/images/ff54dacc9e02a984.webp',
    ],
    rating: { score: 4.8, count: 4 },
    colors: [
      {
        name: 'Azure',
        hex: '#0A6080',
        image: '/sites/eql/root/images/c8760525ce91eb4c.webp',
        images: [
          '/sites/eql/root/images/c8760525ce91eb4c.webp',
          '/sites/eql/root/images/8c1b9c678b71a3d1.webp',
        ],
      },
      {
        name: 'Black',
        hex: '#000000',
        image: '/products/sculpt-black-bra-1.jpg',
        images: [
          '/products/sculpt-black-bra-1.jpg',
          '/sites/eql/root/images/ff54dacc9e02a984.webp',
          '/sites/eql/root/images/c83c6bf808a11dbd.webp',
        ],
      },
    ],
  },
  {
    id: 'sculpt-black-den-short-sleeve',
    title: 'Sculpt - Black (Đen) - Áo Cộc Tay',
    price: '$520',
    href: '/products/sculpt-black-den-short-sleeve-ao-coc-tay',
    images: [
      '/sites/eql/root/images/6383dd9abb074ecf.webp',
      '/sites/eql/root/images/355801d7be79ad8e.webp',
      '/sites/eql/root/images/9570c4eb6919625c.webp',
    ],
    rating: { score: 5.0, count: 6 },
    colors: [
      {
        name: 'Azure',
        hex: '#0A6080',
        image: '/sites/eql/root/images/355801d7be79ad8e.webp',
        images: [
          '/sites/eql/root/images/355801d7be79ad8e.webp',
          '/sites/eql/root/images/9570c4eb6919625c.webp',
        ],
      },
      {
        name: 'Black',
        hex: '#000000',
        image: '/sites/eql/root/images/6383dd9abb074ecf.webp',
        images: [
          '/sites/eql/root/images/6383dd9abb074ecf.webp',
          '/sites/eql/root/images/9570c4eb6919625c.webp',
        ],
      },
    ],
  },
  {
    id: 'sculpt-black-den-standard-leggings',
    title: 'Sculpt - Black (Đen) - Standard Leggings Thường',
    price: '$650',
    href: '/products/sculpt-black-den-standard-leggings-thuong',
    images: [
      '/sites/eql/root/images/d8c11c9783d2c5c7.webp',
      '/sites/eql/root/images/bc5edd8fe8843883.webp',
      '/sites/eql/root/images/b70e81ec479bb2f8.webp',
    ],
    rating: { score: 4.9, count: 12 },
    colors: [
      {
        name: 'Azure',
        hex: '#0A6080',
        image: '/sites/eql/root/images/bc5edd8fe8843883.webp',
        images: [
          '/sites/eql/root/images/bc5edd8fe8843883.webp',
          '/sites/eql/root/images/b70e81ec479bb2f8.webp',
        ],
      },
      {
        name: 'Black',
        hex: '#000000',
        image: '/sites/eql/root/images/d8c11c9783d2c5c7.webp',
        images: [
          '/sites/eql/root/images/d8c11c9783d2c5c7.webp',
          '/sites/eql/root/images/b70e81ec479bb2f8.webp',
        ],
      },
    ],
  },
  {
    id: 'sculpt-black-den-flare-leggings',
    title: 'Sculpt - Black (Đen) - Flare Leggings Loe',
    price: '$680',
    href: '/products/sculpt-black-den-flare-leggings-loe',
    images: [
      '/sites/eql/root/images/0cdf224043bdaf7a.webp',
      '/sites/eql/root/images/3eb8c67d6493465d.webp',
      '/sites/eql/root/images/153d6d332e77e776.webp',
    ],
    rating: { score: 5.0, count: 8 },
    colors: [
      {
        name: 'Azure',
        hex: '#0A6080',
        image: '/sites/eql/root/images/3eb8c67d6493465d.webp',
        images: [
          '/sites/eql/root/images/3eb8c67d6493465d.webp',
          '/sites/eql/root/images/153d6d332e77e776.webp',
        ],
      },
      {
        name: 'Black',
        hex: '#000000',
        image: '/sites/eql/root/images/0cdf224043bdaf7a.webp',
        images: [
          '/sites/eql/root/images/0cdf224043bdaf7a.webp',
          '/sites/eql/root/images/153d6d332e77e776.webp',
        ],
      },
    ],
  },
];

export default function Collections() {
  const [activeTab, setActiveTab] = useState<'all' | 'new' | 'best'>('all');

  const tabs = [
    { key: 'all' as const, label: 'Tất cả sản phẩm' },
    { key: 'new' as const, label: 'Hàng mới về' },
    { key: 'best' as const, label: 'Bán chạy nhất' },
  ];

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

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-x-[8px] gap-y-6 sm:gap-x-4 lg:gap-x-5 lg:gap-y-8">
        {productsData.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </section>
  );
}
