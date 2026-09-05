"use client";

import React, { useState, useMemo } from 'react';
import Header from '@/components/sites/eql/root/Header';
import Footer from '@/components/sites/eql/root/Footer';
import ProductCard, { ProductItem } from '@/components/sites/eql/root/ProductCard';
import Link from 'next/link';

const activityCategories = [
  { label: 'Tất cả', image: '/activity/all.jpg', value: 'all' },
  { label: 'Mới', image: '/activity/new-in.jpg', value: 'new' },
  { label: 'Sân', image: '/activity/tennis.jpg', value: 'court' },
  { label: 'Studio', image: '/activity/yoga.jpg', value: 'studio' },
  { label: 'Tập', image: '/activity/train.jpg', value: 'train' },
  { label: 'Nghỉ ngơi', image: '/activity/lounge.jpg', value: 'lounge' },
  { label: 'Chạy', image: '/activity/run.jpg', value: 'run' },
  { label: 'Phụ kiện', image: '/activity/tennis.jpg', value: 'accessories' },
];

const mockProducts: ProductItem[] = [
  {
    id: 'sculpt-cream-polka-dot-set',
    title: 'Sculpt - Cream Polka Dot - Set',
    price: '$850',
    originalPrice: '$105',
    href: '/products/sculpt-cream-polka-dot-set',
    images: [
      '/products/polka-dot-cream-set.jpg',
    ],
    rating: { score: 5.0, count: 12 }, sizes: ['S', 'M'], activity: ['studio'], isNewProduct: true,
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
    rating: { score: 4.8, count: 4 }, sizes: ['XS', 'M'], activity: ['train', 'new'],
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
        ],
      },
    ],
  },
  {
    id: 'sculpt-black-den-short-sleeve',
    title: 'Sculpt - Black (Đen) - Áo Cộc Tay',
    price: '$520',
    originalPrice: '$650',
    href: '/products/sculpt-black-den-short-sleeve-ao-coc-tay',
    images: [
      '/sites/eql/root/images/6383dd9abb074ecf.webp',
      '/sites/eql/root/images/355801d7be79ad8e.webp',
      '/sites/eql/root/images/9570c4eb6919625c.webp',
    ],
    rating: { score: 5.0, count: 6 }, sizes: ['L', 'XL'], activity: ['court', 'run'], isNewProduct: true,
    colors: [
      {
        name: 'Azure',
        hex: '#0A6080',
        image: '/sites/eql/root/images/355801d7be79ad8e.webp',
        images: ['/sites/eql/root/images/355801d7be79ad8e.webp'],
      },
      {
        name: 'Black',
        hex: '#000000',
        image: '/sites/eql/root/images/6383dd9abb074ecf.webp',
        images: ['/sites/eql/root/images/6383dd9abb074ecf.webp'],
      },
    ],
  },
  {
    id: 'sculpt-black-den-standard-leggings',
    title: 'Sculpt - Black (Đen) - Standard Leggings Thường',
    price: '$650',
    originalPrice: '$750',
    href: '/products/sculpt-black-den-standard-leggings-thuong',
    images: [
      '/sites/eql/root/images/d8c11c9783d2c5c7.webp',
      '/sites/eql/root/images/bc5edd8fe8843883.webp',
      '/sites/eql/root/images/b70e81ec479bb2f8.webp',
    ],
    rating: { score: 4.9, count: 12 }, sizes: ['S', 'M', 'L'], activity: ['studio', 'lounge'],
    colors: [
      {
        name: 'Azure',
        hex: '#0A6080',
        image: '/sites/eql/root/images/bc5edd8fe8843883.webp',
        images: ['/sites/eql/root/images/bc5edd8fe8843883.webp'],
      },
      {
        name: 'Black',
        hex: '#000000',
        image: '/sites/eql/root/images/d8c11c9783d2c5c7.webp',
        images: ['/sites/eql/root/images/d8c11c9783d2c5c7.webp'],
      },
    ],
  },
  {
    id: 'sculpt-black-den-flare-leggings',
    title: 'Sculpt - Black (Đen) - Flare Leggings Loe',
    price: '$680',
    originalPrice: '$800',
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
        images: ['/sites/eql/root/images/3eb8c67d6493465d.webp'],
      },
      {
        name: 'Black',
        hex: '#000000',
        image: '/sites/eql/root/images/0cdf224043bdaf7a.webp',
        images: ['/sites/eql/root/images/0cdf224043bdaf7a.webp'],
      },
    ],
  },
  {
    id: 'femme-long-leggings-black',
    title: 'Femme Long Leggings - Đen',
    price: '$650',
    href: '/products/femme-long-leggings-black',
    images: [
      '/sites/eql/root/images/b70e81ec479bb2f8.webp',
      '/sites/eql/root/images/d8c11c9783d2c5c7.webp',
    ],
    rating: { score: 4.7, count: 5 }, sizes: ['S'], activity: ['train'],
    colors: [
      { name: 'Black', hex: '#000000', image: '/sites/eql/root/images/b70e81ec479bb2f8.webp' },
      { name: 'Cream', hex: '#FFFDD0', image: '/sites/eql/root/images/d8c11c9783d2c5c7.webp' },
      { name: 'Navy', hex: '#1B2A4A', image: '/sites/eql/root/images/0cdf224043bdaf7a.webp' },
    ],
  },
  {
    id: 'layer-jacket-pink',
    title: 'Layer - Jacket Thể Thao Hồng',
    price: '$720',
    originalPrice: '$850',
    href: '/products/layer-jacket-pink',
    images: [
      '/sites/eql/root/images/9570c4eb6919625c.webp',
      '/sites/eql/root/images/6383dd9abb074ecf.webp',
    ],
    rating: { score: 4.9, count: 9 }, sizes: ['M', 'L'], activity: ['run', 'new'], isNewProduct: true,
    colors: [
      { name: 'Pink', hex: '#FFC2D1', image: '/sites/eql/root/images/9570c4eb6919625c.webp' },
      { name: 'White', hex: '#FFFFFF', image: '/sites/eql/root/images/6383dd9abb074ecf.webp' },
    ],
  },
  {
    id: 'focus-set-pastel-green',
    title: 'Focus 3.0 - Pastel Green Set',
    price: '$950',
    href: '/products/focus-set-pastel-green',
    images: [
      '/sites/eql/root/images/355801d7be79ad8e.webp',
      '/sites/eql/root/images/bc5edd8fe8843883.webp',
    ],
    rating: { score: 5.0, count: 11 }, sizes: ['XS', 'S'], activity: ['studio'],
    colors: [
      { name: 'Green', hex: '#9CAF88', image: '/sites/eql/root/images/355801d7be79ad8e.webp' },
      { name: 'Black', hex: '#000000', image: '/sites/eql/root/images/bc5edd8fe8843883.webp' },
    ],
  },
  {
    id: 'nestle-snow-top',
    title: 'Nestle - Trắng Snow Top',
    price: '$580',
    href: '/products/nestle-snow-top',
    images: [
      '/sites/eql/root/images/153d6d332e77e776.webp',
      '/sites/eql/root/images/c8760525ce91eb4c.webp',
    ],
    rating: { score: 4.6, count: 7 }, sizes: ['M', 'XL'], activity: ['lounge'],
    colors: [
      { name: 'White', hex: '#FFFFFF', image: '/sites/eql/root/images/153d6d332e77e776.webp' },
      { name: 'Grey', hex: '#D3D3D3', image: '/sites/eql/root/images/c8760525ce91eb4c.webp' },
    ],
  },
];

export default function ProductsPage() {
  const [selectedActivity, setSelectedActivity] = useState('all');
  const [sortBy, setSortBy] = useState('featured');
  const [selectedSizes, setSelectedSizes] = useState<string[]>([]);
  const [selectedColors, setSelectedColors] = useState<string[]>([]);
  const [isOnlyNew, setIsOnlyNew] = useState(false);
  const [isOnlySale, setIsOnlySale] = useState(false);
  const [maxPrice, setMaxPrice] = useState(1500000);
  const [mobileFilterOpen, setMobileFilterOpen] = useState(false);

  // Filter & Sort Logic
  const filteredProducts = useMemo(() => {
    let result = [...mockProducts];

    // Filter by Activity (category)
    if (selectedActivity !== 'all') {
      if (selectedActivity === 'new') {
        result = result.filter((p) => p.isNewProduct);
      } else {
        result = result.filter((p) => p.activity?.includes(selectedActivity));
      }
    }

    if (isOnlyNew) {
      result = result.filter((p) => p.isNewProduct);
    }

    if (isOnlySale) {
      result = result.filter((p) => Boolean(p.originalPrice));
    }

    if (selectedSizes.length > 0) {
      result = result.filter((p) =>
        p.sizes?.some((s) => selectedSizes.includes(s))
      );
    }

    if (selectedColors.length > 0) {
      result = result.filter((p) =>
        p.colors.some((c) => selectedColors.includes(c.name))
      );
    }

    result = result.filter((p) => {
      const pPrice = parseInt(p.price.replace(/\D/g, ''));
      return pPrice <= maxPrice;
    });

    if (sortBy === 'price-asc') {
      result.sort((a, b) => parseInt(a.price.replace(/\D/g, '')) - parseInt(b.price.replace(/\D/g, '')));
    } else if (sortBy === 'price-desc') {
      result.sort((a, b) => parseInt(b.price.replace(/\D/g, '')) - parseInt(a.price.replace(/\D/g, '')));
    }

    return result;
  }, [selectedActivity, sortBy, selectedSizes, selectedColors, isOnlyNew, isOnlySale, maxPrice]);

  const toggleSize = (size: string) => {
    setSelectedSizes((prev) =>
      prev.includes(size) ? prev.filter((s) => s !== size) : [...prev, size]
    );
  };

  const toggleColor = (color: string) => {
    setSelectedColors((prev) =>
      prev.includes(color) ? prev.filter((c) => c !== color) : [...prev, color]
    );
  };

  return (
    <div className="min-h-screen flex flex-col font-sans bg-white">
      {/* Header bar */}
      <Header />

      <main className="flex-1 pt-16 lg:pt-20">
        <div className="mx-auto max-w-[1440px] px-4 sm:px-6 lg:px-8 py-6">
          
          {/* Breadcrumb & Title */}
          <div className="mb-2">
            <nav className="text-[11px] text-gray-500 tracking-wide font-normal flex gap-2">
              <Link href="/" className="hover:text-black">Trang chủ</Link>
              <span>/</span>
              <span className="text-black font-medium">Tất cả sản phẩm</span>
            </nav>
          </div>

          <div className="mt-4">
            <h1 className="text-2xl sm:text-3xl font-light text-black tracking-wide">
              Đồ thể thao chuẩn form, đậm chất thời trang.
            </h1>
            <p className="mt-1 text-sm text-gray-500 max-w-xl">
              Thiết kế cho sân đấu, phòng tập và dạo phố — theo cách bạn vận động.
            </p>
          </div>

          {/* Activity Category Minimalist Text Tabs */}
          <div className="mt-8 mb-10 border-b border-gray-100 pb-1">
            <div className="overflow-x-auto flex gap-6 sm:gap-8 pb-3 -mx-4 px-4 sm:mx-0 sm:px-0 scrollbar-hide">
              {activityCategories.map((cat) => {
                const isActive = selectedActivity === cat.value;
                return (
                  <button
                    key={cat.label}
                    onClick={() => setSelectedActivity(cat.value)}
                    className={`relative flex-shrink-0 whitespace-nowrap text-[11px] uppercase tracking-widest font-semibold transition-colors pb-2 cursor-pointer ${
                      isActive
                        ? 'text-black'
                        : 'text-gray-400 hover:text-gray-700'
                    }`}
                  >
                    {cat.label}
                    {isActive && (
                      <span className="absolute bottom-0 left-0 w-full h-[2px] bg-black"></span>
                    )}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Bar: Product Count & Sort Dropdown */}
          <div className="flex items-center justify-between border-b border-[#e0e0e0] py-3 mb-6">
            <p className="text-[12px] uppercase tracking-[0.08em] text-gray-500">
              <strong className="text-black font-semibold">{filteredProducts.length}</strong> sản phẩm
            </p>

            <div className="flex items-center gap-3">
              {/* Mobile Filter Button */}
              <button
                onClick={() => setMobileFilterOpen(true)}
                className="lg:hidden flex items-center gap-1.5 text-xs border border-gray-300 px-3 py-1.5 rounded cursor-pointer"
              >
                <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M3 4h18M6 10h12M10 16h4" />
                </svg>
                <span>Bộ lọc</span>
              </button>

              <label className="flex items-center gap-2 text-xs text-black">
                <span className="uppercase tracking-[0.1em] text-gray-500 hidden sm:inline">Sắp xếp:</span>
                <div className="relative">
                  <select
                    value={sortBy}
                    onChange={(e) => setSortBy(e.target.value)}
                    className="appearance-none h-9 pl-3 pr-8 border border-[#e0e0e0] bg-white text-xs text-black focus:outline-none focus:border-black cursor-pointer rounded-none"
                  >
                    <option value="featured">Nổi bật</option>
                    <option value="best-selling">Bán chạy nhất</option>
                    <option value="newest">Mới nhất</option>
                    <option value="price-asc">Giá tăng dần</option>
                    <option value="price-desc">Giá giảm dần</option>
                  </select>
                  <svg
                    className="absolute right-2.5 top-1/2 -translate-y-1/2 w-3 h-3 text-gray-500 pointer-events-none"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M19 9l-7 7-7-7" />
                  </svg>
                </div>
              </label>
            </div>
          </div>

          {/* Main Layout: Sidebar Filters + Product Grid */}
          <div className="flex gap-8">
            
            {/* Desktop Filter Sidebar */}
            <aside className="hidden lg:block w-[240px] flex-shrink-0 sticky top-24 self-start max-h-[calc(100vh-8rem)] overflow-y-auto pr-4 pb-12">
              <div className="flex items-center justify-between mb-4 pb-2 border-b border-black">
                <h2 className="text-xs font-bold uppercase tracking-[0.12em] text-black">Bộ lọc</h2>
                {(selectedSizes.length > 0 || selectedColors.length > 0 || isOnlySale) && (
                  <button
                    onClick={() => {
                      setSelectedSizes([]);
                      setSelectedColors([]);
                      setIsOnlySale(false);
                    }}
                    className="text-[11px] text-gray-500 hover:text-black underline cursor-pointer"
                  >
                    Xóa tất cả
                  </button>
                )}
              </div>

              {/* Toggles */}
              <div className="space-y-3 pb-5 mb-5 border-b border-[#e0e0e0]">
                <label className="flex items-center justify-between cursor-pointer group">
                  <span className="text-xs text-black group-hover:text-gray-600 transition-colors">Mới về</span>
                  <input
                    type="checkbox"
                    checked={isOnlyNew}
                    onChange={(e) => setIsOnlyNew(e.target.checked)}
                    className="w-4 h-4 accent-black cursor-pointer"
                  />
                </label>
                <label className="flex items-center justify-between cursor-pointer group">
                  <span className="text-xs text-black group-hover:text-gray-600 transition-colors">Đang giảm giá</span>
                  <input
                    type="checkbox"
                    checked={isOnlySale}
                    onChange={(e) => setIsOnlySale(e.target.checked)}
                    className="w-4 h-4 accent-black cursor-pointer"
                  />
                </label>
              </div>

              {/* Kích thước */}
              <div className="pb-5 mb-5 border-b border-[#e0e0e0]">
                <h3 className="text-[11px] font-bold uppercase tracking-[0.12em] text-black mb-3">Kích thước</h3>
                <div className="flex flex-wrap gap-2">
                  {['XS', 'S', 'M', 'L', 'XL'].map((size) => {
                    const isSelected = selectedSizes.includes(size);
                    return (
                      <button
                        key={size}
                        type="button"
                        onClick={() => toggleSize(size)}
                        className={`min-w-[2.5rem] h-9 px-3 text-[11px] border transition-all cursor-pointer ${
                          isSelected
                            ? 'border-black bg-black text-white font-medium'
                            : 'border-[#e0e0e0] text-black hover:border-black'
                        }`}
                      >
                        {size}
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Màu sắc */}
              <div className="pb-5 mb-5 border-b border-[#e0e0e0]">
                <h3 className="text-[11px] font-bold uppercase tracking-[0.12em] text-black mb-3">Màu sắc</h3>
                <div className="flex flex-wrap gap-2.5">
                  {[
                    { name: 'Black', hex: '#000000' },
                    { name: 'Azure', hex: '#0A6080' },
                    { name: 'White', hex: '#FFFFFF' },
                    { name: 'Pink', hex: '#FFC2D1' },
                    { name: 'Green', hex: '#9CAF88' },
                    { name: 'Grey', hex: '#D3D3D3' },
                  ].map((c) => {
                    const isSelected = selectedColors.includes(c.name);
                    return (
                      <button
                        key={c.name}
                        onClick={() => toggleColor(c.name)}
                        className={`w-6 h-6 rounded-full border transition-all cursor-pointer flex items-center justify-center ${
                          isSelected
                            ? 'ring-2 ring-black ring-offset-1 scale-110 shadow-sm'
                            : 'border-gray-300 hover:scale-110'
                        }`}
                        style={{ backgroundColor: c.hex }}
                        title={c.name}
                        aria-label={c.name}
                      >
                        {isSelected && (
                          <span
                            className={`w-1.5 h-1.5 rounded-full ${
                              c.hex === '#FFFFFF' ? 'bg-black' : 'bg-white'
                            }`}
                          />
                        )}
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Khoảng giá */}
              <div className="pb-5 mb-5 border-b border-[#e0e0e0]">
                <h3 className="text-[11px] font-bold uppercase tracking-[0.12em] text-black mb-3">Khoảng giá</h3>
                <div className="text-[11px] text-gray-500 mb-2 flex justify-between">
                  <span>0 ₫</span>
                  <span className="font-medium text-black">{(maxPrice).toLocaleString('vi-VN')} ₫</span>
                </div>
                <input
                  type="range"
                  min="0"
                  max="1500000"
                  step="50000"
                  value={maxPrice}
                  onChange={(e) => setMaxPrice(parseInt(e.target.value))}
                  className="w-full accent-black cursor-pointer"
                />
              </div>
            </aside>

            {/* Product Grid */}
            <div className="flex-1 min-w-0">
              {filteredProducts.length === 0 ? (
                <div className="py-16 text-center">
                  <p className="text-gray-500 text-sm">Không tìm thấy sản phẩm nào phù hợp với bộ lọc.</p>
                  <button
                    onClick={() => {
                      setSelectedSizes([]);
                      setSelectedColors([]);
                      setIsOnlySale(false);
                      setSelectedActivity('all');
                    }}
                    className="mt-4 px-6 py-2 bg-black text-white text-xs uppercase tracking-wider"
                  >
                    Đặt lại bộ lọc
                  </button>
                </div>
              ) : (
                <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-x-3 sm:gap-x-4 lg:gap-x-5 gap-y-8 lg:gap-y-10">
                  {filteredProducts.map((product) => (
                    <ProductCard key={product.id} product={product} />
                  ))}
                </div>
              )}

              {/* Load More Button */}
              <div className="mt-14 mb-10 text-center">
                <button className="px-10 py-3.5 bg-black text-white text-xs font-normal uppercase tracking-[0.15em] hover:bg-[#2c2c2c] transition-colors cursor-pointer">
                  Tải thêm sản phẩm
                </button>
              </div>
            </div>

          </div>
        </div>
      </main>

      {/* Footer bar */}
      <Footer />
    </div>
  );
}
