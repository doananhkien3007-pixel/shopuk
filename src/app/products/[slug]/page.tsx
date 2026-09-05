"use client";

import React, { useState, useEffect, use, useMemo } from 'react';
import Link from 'next/link';
import Header from '@/components/sites/eql/root/Header';
import Footer from '@/components/sites/eql/root/Footer';
import ProductCard from '@/components/sites/eql/root/ProductCard';
import { useCart } from '@/context/CartContext';

interface ProductDetailData {
  id: string;
  title: string;
  price: string;
  originalPrice?: string;
  rating: number;
  reviewCount: number;
  sku: string;
  colors: {
    name: string;
    hex: string;
    images: string[];
  }[];
  sizes: string[];
  features: { title: string; desc: string; icon: string }[];
  description: string[];
  materialDetails: string[];
}

const productDatabase: Record<string, ProductDetailData> = {
  'sculpt-cream-polka-dot-set': {
    id: 'sculpt-cream-polka-dot-set',
    title: 'Sculpt - Cream Polka Dot - Set',
    price: '$850',
    originalPrice: '$105',
    rating: 5.0,
    reviewCount: 12,
    sku: 'SCU-01',
    colors: [
      {
        name: 'Cream Polka Dot',
        hex: '#EBE5D9',
        images: [
          '/products/polka-dot-cream-set.jpg',
        ],
      },
    ],
    sizes: ['XS', 'S', 'M', 'L'],
    features: [
      {
        title: 'Thoải mái',
        desc: 'Chất liệu co giãn mềm mại, thân thiện với làn da',
        icon: 'stretch',
      },
      {
        title: 'Thấm hút mồ hôi',
        desc: 'Giữ cơ thể luôn khô ráo trong lúc tập luyện',
        icon: 'breath',
      },
      {
        title: 'Nâng đỡ tốt',
        desc: 'Thiết kế vừa vặn, định hình dáng người',
        icon: 'fit',
      },
      {
        title: 'Không đường may',
        desc: 'Mịn màng, không gây hằn cọ xát',
        icon: 'seamless',
      }
    ],
    description: [
      'Set đồ thể thao nữ hoạ tiết chấm bi Cream Polka Dot bao gồm áo bra dáng croptop và quần đùi (biker shorts) đồng điệu. Thiết kế chấm bi tinh tế mang lại vẻ ngoài năng động, trẻ trung.',
      'Sản phẩm sử dụng chất liệu vải cao cấp với độ co giãn 4 chiều, hỗ trợ vận động tối đa dù bạn đang tập yoga, gym hay chạy bộ ngoài trời.',
    ],
    materialDetails: [
      '78% Polyester, 22% Spandex',
      'Giặt máy bằng nước lạnh',
      'Không tẩy',
      'Không giặt khô',
    ],
  },
  'sculpt-black-den-bra': {
    id: 'sculpt-black-den-bra',
    title: 'Sculpt - Black (Đen) - Bra',
    price: '$500',
    originalPrice: '$620',
    rating: 5.0,
    reviewCount: 4,
    sku: 'SCU-02',
    colors: [
      {
        name: 'Black',
        hex: '#000000',
        images: [
          '/products/sculpt-black-bra-1.jpg',
          '/sites/eql/root/images/c8760525ce91eb4c.webp',
          '/sites/eql/root/images/8c1b9c678b71a3d1.webp',
          '/sites/eql/root/images/ff54dacc9e02a984.webp',
        ],
      },
      {
        name: 'Azure',
        hex: '#0A6080',
        images: [
          '/sites/eql/root/images/c8760525ce91eb4c.webp',
          '/sites/eql/root/images/8c1b9c678b71a3d1.webp',
        ],
      },
    ],
    sizes: ['XS', 'S', 'M', 'L', 'XL'],
    features: [
      { title: 'Không đường may', desc: 'Mịn màng, không gây cọ xát', icon: 'seamless' },
      { title: 'Ôm sát body', desc: 'Nâng đỡ và định hình cơ thể', icon: 'fit' },
      { title: 'Co giãn 4 chiều', desc: 'Vận động thoải mái tối đa', icon: 'stretch' },
      { title: 'Thoáng khí', desc: 'Thấm hút mồ hôi vượt trội', icon: 'breath' },
    ],
    description: [
      'Áo Bra thể thao dòng Sculpt cao cấp của EQL được thiết kế với đệm mút mỏng đúc liền, mang lại độ ôm vừa vặn và nâng đỡ tự nhiên.',
      'Chất liệu vải dệt kim kỹ thuật cao cấp, bề mặt mềm mịn như làn da thứ hai, hỗ trợ tối ưu cho các bài tập Yoga, Pilates, Gym hoặc mặc hàng ngày phong cách athleisure.',
    ],
    materialDetails: [
      '75% Nylon, 25% Spandex tái chế cao cấp',
      'Độ dày vừa phải, chống xuyên thấu tuyệt đối',
      'Giặt máy bằng nước lạnh với túi giặt, phơi trong bóng râm',
    ],
  },
};

const defaultProduct = productDatabase['sculpt-black-den-bra'];

const relatedProducts = [
  {
    id: 'sculpt-black-den-short-sleeve',
    title: 'Sculpt - Black (Đen) - Áo Cộc Tay',
    price: '$520',
    href: '/products/sculpt-black-den-short-sleeve-ao-coc-tay',
    images: [
      '/sites/eql/root/images/6383dd9abb074ecf.webp',
      '/sites/eql/root/images/355801d7be79ad8e.webp',
    ],
    rating: { score: 5.0, count: 6 },
    colors: [
      { name: 'Black', hex: '#000000', image: '/sites/eql/root/images/6383dd9abb074ecf.webp' },
      { name: 'Azure', hex: '#0A6080', image: '/sites/eql/root/images/355801d7be79ad8e.webp' },
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
    ],
    rating: { score: 4.9, count: 12 },
    colors: [
      { name: 'Black', hex: '#000000', image: '/sites/eql/root/images/d8c11c9783d2c5c7.webp' },
      { name: 'Azure', hex: '#0A6080', image: '/sites/eql/root/images/bc5edd8fe8843883.webp' },
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
    ],
    rating: { score: 5.0, count: 8 },
    colors: [
      { name: 'Black', hex: '#000000', image: '/sites/eql/root/images/0cdf224043bdaf7a.webp' },
      { name: 'Azure', hex: '#0A6080', image: '/sites/eql/root/images/3eb8c67d6493465d.webp' },
    ],
  },
];

export default function ProductDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const resolvedParams = use(params);
  const slug = resolvedParams?.slug || 'sculpt-black-den-bra';
  const product = productDatabase[slug] || defaultProduct;

  const [selectedColorIdx, setSelectedColorIdx] = useState(0);
  const [selectedSize, setSelectedSize] = useState('S');
  const [activeImageIdx, setActiveImageIdx] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [showToast, setShowToast] = useState(false);
  const [openAccordion, setOpenAccordion] = useState<string | null>('desc');
  const [showSizeModal, setShowSizeModal] = useState(false);
  const [sizeModalTab, setSizeModalTab] = useState<'recommender' | 'chart'>('recommender');
  const [bustVal, setBustVal] = useState(84);
  const [waistVal, setWaistVal] = useState(67);
  const [hipsVal, setHipsVal] = useState(92);
  const [showStickyBar, setShowStickyBar] = useState(false);

  const [isZooming, setIsZooming] = useState(false);
  const [zoomOrigin, setZoomOrigin] = useState({ x: 50, y: 50 });

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const { left, top, width, height } = e.currentTarget.getBoundingClientRect();
    const x = ((e.clientX - left) / width) * 100;
    const y = ((e.clientY - top) / height) * 100;
    setZoomOrigin({ x, y });
  };

  const calculatedRecommendedSize = useMemo(() => {
    if (bustVal <= 81 && waistVal <= 64 && hipsVal <= 89) return 'XS';
    if (bustVal <= 86 && waistVal <= 69 && hipsVal <= 94) return 'S';
    if (bustVal <= 91 && waistVal <= 74 && hipsVal <= 99) return 'M';
    if (bustVal <= 97 && waistVal <= 80 && hipsVal <= 105) return 'L';
    return 'XL';
  }, [bustVal, waistVal, hipsVal]);

  useEffect(() => {
    const handleScroll = () => {
      // Show sticky bar when user scrolls past 500px
      if (window.scrollY > 500) {
        setShowStickyBar(true);
      } else {
        setShowStickyBar(false);
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const { addToCart } = useCart();
  const currentColor = product.colors[selectedColorIdx] || product.colors[0];
  const images = currentColor.images || [];

  const handleAddToCart = () => {
    addToCart({
      id: product.id,
      title: product.title,
      price: product.price,
      priceNum: (() => {
        const raw = parseInt(product.price.replace(/\D/g, '')) || 500000;
        return raw < 10000 ? raw * 1000 : raw;
      })(),
      image: images[0] || product.colors[0]?.images[0] || '/products/sculpt-black-bra-1.jpg',
      color: currentColor.name,
      size: selectedSize,
      quantity: quantity,
    });
    
    setShowToast(true);
    setTimeout(() => setShowToast(false), 3000);
  };

  const toggleAccordion = (key: string) => {
    setOpenAccordion((prev) => (prev === key ? null : key));
  };

  return (
    <div className="min-h-screen flex flex-col font-sans bg-white">
      <Header />

      {/* Toast Notification */}
      {showToast && (
        <div className="fixed top-20 right-4 z-50 bg-black text-white px-6 py-3.5 shadow-2xl text-xs uppercase tracking-widest flex items-center gap-3 transition-all animate-fade-in">
          <svg className="w-4 h-4 text-emerald-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
          </svg>
          <span>Đã thêm vào giỏ hàng thành công!</span>
        </div>
      )}

      {/* Size Guide & Smart Measurement Recommender Modal */}
      {showSizeModal && (
        <div
          onClick={() => setShowSizeModal(false)}
          className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4 animate-fade-in"
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="bg-white max-w-lg w-full p-6 sm:p-8 shadow-2xl relative rounded-xs font-sans max-h-[90vh] overflow-y-auto"
          >
            <button
              onClick={() => setShowSizeModal(false)}
              className="absolute right-4 top-4 text-gray-400 hover:text-black text-xl cursor-pointer p-1"
              aria-label="Đóng"
            >
              ✕
            </button>

            {/* Modal Title */}
            <h3 className="text-sm font-bold uppercase tracking-wider text-black mb-1">
              Tư vấn & Gợi ý kích thước
            </h3>
            <p className="text-xs text-gray-500 mb-5">
              Nhập số đo 3 vòng để hệ thống tự động tính toán size vừa vặn nhất cho bạn.
            </p>

            {/* Two Tabs */}
            <div className="flex border-b border-gray-200 mb-6">
              <button
                onClick={() => setSizeModalTab('recommender')}
                className={`flex-1 pb-3 text-xs font-bold uppercase tracking-wider transition-colors cursor-pointer text-center ${
                  sizeModalTab === 'recommender'
                    ? 'border-b-2 border-black text-black'
                    : 'text-gray-400 hover:text-black'
                }`}
              >
                ✦ Máy tính gợi ý size
              </button>
              <button
                onClick={() => setSizeModalTab('chart')}
                className={`flex-1 pb-3 text-xs font-bold uppercase tracking-wider transition-colors cursor-pointer text-center ${
                  sizeModalTab === 'chart'
                    ? 'border-b-2 border-black text-black'
                    : 'text-gray-400 hover:text-black'
                }`}
              >
                Bảng thông số chuẩn
              </button>
            </div>

            {sizeModalTab === 'recommender' ? (
              <div className="space-y-5">
                {/* Vòng ngực */}
                <div>
                  <div className="flex items-center justify-between text-xs mb-1.5">
                    <label className="font-semibold text-gray-800">
                      Vòng ngực (Bust): <span className="text-black font-bold">{bustVal} cm</span>
                    </label>
                    <span className="text-[10px] text-gray-400">Đo ngang đỉnh ngực</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <input
                      type="range"
                      min="70"
                      max="115"
                      value={bustVal}
                      onChange={(e) => setBustVal(Number(e.target.value))}
                      className="flex-1 accent-black cursor-pointer"
                    />
                    <input
                      type="number"
                      min="70"
                      max="115"
                      value={bustVal}
                      onChange={(e) => setBustVal(Number(e.target.value))}
                      className="w-16 h-8 text-center text-xs border border-gray-300 font-medium focus:border-black focus:outline-none"
                    />
                  </div>
                </div>

                {/* Vòng eo */}
                <div>
                  <div className="flex items-center justify-between text-xs mb-1.5">
                    <label className="font-semibold text-gray-800">
                      Vòng eo (Waist): <span className="text-black font-bold">{waistVal} cm</span>
                    </label>
                    <span className="text-[10px] text-gray-400">Đo phần thắt nhỏ nhất</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <input
                      type="range"
                      min="55"
                      max="100"
                      value={waistVal}
                      onChange={(e) => setWaistVal(Number(e.target.value))}
                      className="flex-1 accent-black cursor-pointer"
                    />
                    <input
                      type="number"
                      min="55"
                      max="100"
                      value={waistVal}
                      onChange={(e) => setWaistVal(Number(e.target.value))}
                      className="w-16 h-8 text-center text-xs border border-gray-300 font-medium focus:border-black focus:outline-none"
                    />
                  </div>
                </div>

                {/* Vòng mông */}
                <div>
                  <div className="flex items-center justify-between text-xs mb-1.5">
                    <label className="font-semibold text-gray-800">
                      Vòng mông (Hips): <span className="text-black font-bold">{hipsVal} cm</span>
                    </label>
                    <span className="text-[10px] text-gray-400">Đo đỉnh nở nhất của mông</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <input
                      type="range"
                      min="75"
                      max="125"
                      value={hipsVal}
                      onChange={(e) => setHipsVal(Number(e.target.value))}
                      className="flex-1 accent-black cursor-pointer"
                    />
                    <input
                      type="number"
                      min="75"
                      max="125"
                      value={hipsVal}
                      onChange={(e) => setHipsVal(Number(e.target.value))}
                      className="w-16 h-8 text-center text-xs border border-gray-300 font-medium focus:border-black focus:outline-none"
                    />
                  </div>
                </div>

                {/* Recommended Result Banner */}
                <div className="mt-6 p-4 bg-[#f8f8f8] border border-black/10 rounded-sm text-center space-y-2">
                  <p className="text-xs uppercase tracking-wider text-gray-500">
                    Kích thước đề xuất cho bạn
                  </p>
                  <div className="inline-flex items-center justify-center w-14 h-14 bg-black text-white text-xl font-bold rounded-full shadow-md">
                    {calculatedRecommendedSize}
                  </div>
                  <p className="text-xs text-gray-700 leading-relaxed max-w-sm mx-auto">
                    Với số đo <strong>{bustVal} - {waistVal} - {hipsVal} cm</strong>, size{' '}
                    <strong>{calculatedRecommendedSize}</strong> sẽ mang lại cảm giác ôm sát body nâng đỡ hoàn hảo nhất!
                  </p>

                  <button
                    onClick={() => {
                      setSelectedSize(calculatedRecommendedSize);
                      setShowSizeModal(false);
                    }}
                    className="w-full mt-3 h-11 bg-black text-white text-xs uppercase tracking-widest font-semibold hover:bg-[#2c2c2c] transition-colors cursor-pointer"
                  >
                    Áp dụng Size {calculatedRecommendedSize} ngay
                  </button>
                </div>
              </div>
            ) : (
              /* Size Chart Tab */
              <div className="space-y-4">
                <table className="w-full text-xs text-left border-collapse">
                  <thead>
                    <tr className="border-b-2 border-black">
                      <th className="py-2.5 font-bold">Size</th>
                      <th className="py-2.5 font-bold">Vòng ngực (cm)</th>
                      <th className="py-2.5 font-bold">Vòng eo (cm)</th>
                      <th className="py-2.5 font-bold">Vòng mông (cm)</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200">
                    {[
                      { s: 'XS', b: '76 - 81', w: '60 - 64', h: '84 - 89' },
                      { s: 'S', b: '82 - 86', w: '65 - 69', h: '90 - 94' },
                      { s: 'M', b: '87 - 91', w: '70 - 74', h: '95 - 99' },
                      { s: 'L', b: '92 - 97', w: '75 - 80', h: '100 - 105' },
                      { s: 'XL', b: '98 - 103', w: '81 - 86', h: '106 - 111' },
                    ].map((row) => (
                      <tr
                        key={row.s}
                        className={row.s === selectedSize ? 'bg-gray-100 font-bold' : ''}
                      >
                        <td className="py-2.5 font-bold">{row.s}</td>
                        <td className="py-2.5">{row.b}</td>
                        <td className="py-2.5">{row.w}</td>
                        <td className="py-2.5">{row.h}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
                <p className="text-[11px] text-gray-500 italic">
                  * Chất liệu thể thao co giãn 4 chiều nên nếu số đo của bạn nằm giữa 2 size: Chọn size nhỏ hơn nếu thích ôm sát, chọn size lớn hơn nếu thích thoải mái.
                </p>
              </div>
            )}
          </div>
        </div>
      )}

      <main className="flex-1 pt-14 sm:pt-16 lg:pt-20">
        <div className="mx-auto max-w-[1440px] px-3 sm:px-6 lg:px-8 py-2 sm:py-4">
          
          {/* Breadcrumb */}
          <nav className="text-[11px] text-gray-500 mb-3 sm:mb-6 flex items-center gap-1.5 sm:gap-2">
            <Link href="/" className="hover:text-black transition-colors">Trang chủ</Link>
            <span>/</span>
            <Link href="/products" className="hover:text-black transition-colors">Sản phẩm</Link>
            <span>/</span>
            <span className="text-black font-medium truncate">{product.title}</span>
          </nav>

          {/* Product Hero Layout: Left Images + Right Sticky Info */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 max-w-[1240px] mx-auto">
            
            {/* Left Image Gallery Column (Balanced 6 cols on lg) */}
            <div className="lg:col-span-6 flex flex-col-reverse sm:flex-row gap-3.5 items-start justify-center">
              
              {/* Vertical Thumbnail List */}
              <div className="flex sm:flex-col gap-2 overflow-x-auto sm:overflow-y-auto sm:w-16 shrink-0 scrollbar-hide">
                {images.map((img, idx) => (
                  <button
                    key={idx}
                    onClick={() => setActiveImageIdx(idx)}
                    className={`relative w-14 sm:w-16 aspect-[4/5] bg-[#f5f5f5] overflow-hidden transition-all cursor-pointer rounded-xs ${
                      activeImageIdx === idx
                        ? 'ring-2 ring-black shadow-sm'
                        : 'opacity-70 hover:opacity-100 ring-1 ring-gray-200'
                    }`}
                  >
                    <img src={img} alt={`Thumb ${idx + 1}`} className="w-full h-full object-cover" />
                  </button>
                ))}
              </div>

              {/* Main Display Image (Gọn gàng vừa mắt) */}
              <div className="flex-1 w-full max-w-[460px] mx-auto">
                <div 
                  className={`relative aspect-[4/5] max-h-[560px] bg-[#f5f5f5] overflow-hidden group rounded-xs shadow-xs cursor-crosshair ${isZooming ? 'z-20' : ''}`}
                  onMouseEnter={() => setIsZooming(true)}
                  onMouseLeave={() => { setIsZooming(false); setZoomOrigin({ x: 50, y: 50 }); }}
                  onMouseMove={handleMouseMove}
                >
                  <img
                    src={images[activeImageIdx] || images[0]}
                    alt={product.title}
                    style={{
                      transformOrigin: `${zoomOrigin.x}% ${zoomOrigin.y}%`,
                      transform: isZooming ? 'scale(1.8)' : 'scale(1)'
                    }}
                    className="w-full h-full object-cover transition-transform duration-200 ease-out pointer-events-none"
                  />
                  {/* Previous / Next buttons */}
                  {images.length > 1 && (
                    <>
                      <button
                        onMouseEnter={() => setIsZooming(false)}
                        onMouseLeave={() => setIsZooming(true)}
                        onClick={(e) => {
                          e.stopPropagation();
                          setActiveImageIdx((prev) => (prev - 1 + images.length) % images.length);
                        }}
                        className="absolute left-3 top-1/2 -translate-y-1/2 w-9 h-9 bg-white/90 hover:bg-white text-black flex items-center justify-center rounded-full shadow-md transition-all cursor-pointer opacity-80 hover:opacity-100 z-30"
                        aria-label="Ảnh trước"
                      >
                        ‹
                      </button>
                      <button
                        onMouseEnter={() => setIsZooming(false)}
                        onMouseLeave={() => setIsZooming(true)}
                        onClick={(e) => {
                          e.stopPropagation();
                          setActiveImageIdx((prev) => (prev + 1) % images.length);
                        }}
                        className="absolute right-3 top-1/2 -translate-y-1/2 w-9 h-9 bg-white/90 hover:bg-white text-black flex items-center justify-center rounded-full shadow-md transition-all cursor-pointer opacity-80 hover:opacity-100 z-30"
                        aria-label="Ảnh sau"
                      >
                        ›
                      </button>
                    </>
                  )}
                </div>
              </div>

            </div>

            {/* Right Sticky Info Column (Balanced 6 cols on lg) */}
            <div className="lg:col-span-6 lg:sticky lg:top-24 lg:self-start space-y-5">
              
              {/* Title & Reviews */}
              <div>
                <h1 className="text-xl sm:text-2xl font-bold uppercase tracking-wider text-black leading-snug">
                  {product.title}
                </h1>

                {/* Rating */}
                <div className="flex items-center gap-2 mt-2">
                  <div className="flex items-center gap-0.5 text-amber-400">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <svg key={star} className="w-3.5 h-3.5 fill-current" viewBox="0 0 20 20">
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                      </svg>
                    ))}
                  </div>
                  <span className="text-xs text-gray-500 underline cursor-pointer">
                    {product.reviewCount} đánh giá
                  </span>
                  <span className="text-gray-300">|</span>
                  <span className="text-xs text-gray-500">Mã: {product.sku}</span>
                </div>
              </div>

              {/* Price */}
              <div className="flex items-baseline gap-3">
                <span className="text-2xl font-bold text-black tracking-tight">
                  {product.price}
                </span>
                {product.originalPrice && (
                  <span className="text-sm text-gray-400 line-through">
                    {product.originalPrice}
                  </span>
                )}
                <span className="text-[11px] bg-red-50 text-red-600 px-2 py-0.5 font-medium">
                  Tiết kiệm 20%
                </span>
              </div>

              <div className="border-t border-gray-100 pt-5 space-y-5">
                
                {/* Color Selector */}
                <div>
                  <div className="flex items-center justify-between text-xs mb-2.5">
                    <span className="text-gray-700">
                      Màu sắc: <strong className="text-black font-semibold">{currentColor.name}</strong>
                    </span>
                  </div>
                  <div className="flex items-center gap-3">
                    {product.colors.map((color, idx) => {
                      const isSelected = selectedColorIdx === idx;
                      return (
                        <button
                          key={color.name}
                          onClick={() => {
                            setSelectedColorIdx(idx);
                            setActiveImageIdx(0);
                          }}
                          className={`w-7 h-7 rounded-full transition-all cursor-pointer flex items-center justify-center ${
                            isSelected
                              ? 'ring-2 ring-black ring-offset-2 scale-110 shadow-sm'
                              : 'border border-gray-300 hover:scale-105'
                          }`}
                          style={{ backgroundColor: color.hex }}
                          title={color.name}
                        />
                      );
                    })}
                  </div>
                </div>

                {/* Size Selector */}
                <div>
                  <div className="flex items-center justify-between text-xs mb-2.5">
                    <span className="text-gray-700">
                      Kích cỡ: <strong className="text-black font-semibold">{selectedSize}</strong>
                    </span>
                    <button
                      onClick={() => setShowSizeModal(true)}
                      className="text-[11px] text-gray-500 hover:text-black underline cursor-pointer"
                    >
                      Hướng dẫn chọn size
                    </button>
                  </div>
                  <div className="grid grid-cols-5 gap-2">
                    {product.sizes.map((size) => {
                      const isSelected = selectedSize === size;
                      return (
                        <button
                          key={size}
                          onClick={() => setSelectedSize(size)}
                          className={`h-11 border text-xs uppercase tracking-wider transition-all cursor-pointer font-medium ${
                            isSelected
                              ? 'border-black bg-black text-white'
                              : 'border-gray-200 text-black hover:border-black'
                          }`}
                        >
                          {size}
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* Quantity & CTA */}
                <div className="space-y-3 pt-2">
                  <div className="flex gap-3">
                    {/* Quantity counter */}
                    <div className="flex items-center border border-gray-300 h-12 w-28 shrink-0">
                      <button
                        onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                        className="flex-1 text-base text-gray-600 hover:text-black cursor-pointer"
                      >
                        −
                      </button>
                      <span className="w-8 text-center text-xs font-semibold">{quantity}</span>
                      <button
                        onClick={() => setQuantity((q) => q + 1)}
                        className="flex-1 text-base text-gray-600 hover:text-black cursor-pointer"
                      >
                        +
                      </button>
                    </div>

                    {/* Add to Cart */}
                    <button
                      onClick={handleAddToCart}
                      className="flex-1 h-12 bg-black text-white text-xs uppercase tracking-[0.15em] font-medium hover:bg-[#2c2c2c] transition-colors cursor-pointer"
                    >
                      Thêm vào giỏ hàng
                    </button>
                  </div>

                  {/* Buy Now */}
                  <button
                    onClick={handleAddToCart}
                    className="w-full h-12 border border-black bg-white text-black text-xs uppercase tracking-[0.15em] font-medium hover:bg-gray-50 transition-colors cursor-pointer"
                  >
                    Mua ngay
                  </button>
                </div>

                {/* Selling Points Badges with Custom Drawn SVG Icons */}
                <div className="grid grid-cols-4 gap-2 pt-4 border-t border-gray-100 text-center">
                  {product.features.map((feat) => (
                    <div
                      key={feat.title}
                      className="p-3 bg-[#fbfbfb] border border-gray-100/80 rounded-sm hover:border-gray-300 transition-colors flex flex-col items-center justify-center text-center group"
                    >
                      {/* Custom SVG Icon */}
                      <div className="w-7 h-7 flex items-center justify-center mb-2 text-black group-hover:scale-110 transition-transform">
                        {feat.icon === 'seamless' && (
                          <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M3 12h18" />
                            <circle cx="6" cy="12" r="1.5" fill="currentColor" />
                            <circle cx="12" cy="12" r="1.5" fill="currentColor" />
                            <circle cx="18" cy="12" r="1.5" fill="currentColor" />
                          </svg>
                        )}
                        {feat.icon === 'fit' && (
                          <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M8 3c2.5 3 2.5 6 0 9s-2.5 6 0 9M16 3c-2.5 3-2.5 6 0 9s2.5 6 0 9M8 12h8" />
                          </svg>
                        )}
                        {feat.icon === 'stretch' && (
                          <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M12 3v18M3 12h18M12 3l-2.5 2.5M12 3l2.5 2.5M12 21l-2.5-2.5M12 21l2.5-2.5M3 12l2.5-2.5M3 12l2.5 2.5M21 12l-2.5-2.5M21 12l2.5 2.5" />
                          </svg>
                        )}
                        {feat.icon === 'breath' && (
                          <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M4 14.5c2-1 4-1 6 0s4 1 6 0 4-1 4-1M4 10.5c2-1 4-1 6 0s4 1 6 0 4-1 4-1M4 6.5c2-1 4-1 6 0s4 1 6 0 4-1 4-1" />
                          </svg>
                        )}
                      </div>

                      <p className="text-[10px] font-bold uppercase tracking-wider text-black leading-tight">
                        {feat.title}
                      </p>
                      <p className="text-[9px] text-gray-500 mt-1 leading-tight">{feat.desc}</p>
                    </div>
                  ))}
                </div>

                {/* Accordions */}
                <div className="border-t border-gray-200 divide-y divide-gray-200 pt-2">
                  
                  {/* Mô tả sản phẩm */}
                  <div>
                    <button
                      onClick={() => toggleAccordion('desc')}
                      className="w-full py-4 flex items-center justify-between text-left text-xs font-bold uppercase tracking-wider text-black cursor-pointer"
                    >
                      <span>Mô tả sản phẩm</span>
                      <span>{openAccordion === 'desc' ? '−' : '+'}</span>
                    </button>
                    {openAccordion === 'desc' && (
                      <div className="pb-4 text-xs text-gray-600 space-y-2 leading-relaxed">
                        {product.description.map((p, i) => (
                          <p key={i}>{p}</p>
                        ))}
                      </div>
                    )}
                  </div>

                  {/* Chất liệu & Bảo quản */}
                  <div>
                    <button
                      onClick={() => toggleAccordion('material')}
                      className="w-full py-4 flex items-center justify-between text-left text-xs font-bold uppercase tracking-wider text-black cursor-pointer"
                    >
                      <span>Chất liệu & Bảo quản</span>
                      <span>{openAccordion === 'material' ? '−' : '+'}</span>
                    </button>
                    {openAccordion === 'material' && (
                      <div className="pb-4 text-xs text-gray-600 space-y-1.5 leading-relaxed">
                        <ul className="list-disc pl-4 space-y-1">
                          {product.materialDetails.map((item, i) => (
                            <li key={i}>{item}</li>
                          ))}
                        </ul>
                      </div>
                    )}
                  </div>

                  {/* Vận chuyển & Đổi trả */}
                  <div>
                    <button
                      onClick={() => toggleAccordion('shipping')}
                      className="w-full py-4 flex items-center justify-between text-left text-xs font-bold uppercase tracking-wider text-black cursor-pointer"
                    >
                      <span>Vận chuyển & Đổi hàng</span>
                      <span>{openAccordion === 'shipping' ? '−' : '+'}</span>
                    </button>
                    {openAccordion === 'shipping' && (
                      <div className="pb-4 text-xs text-gray-600 space-y-1.5 leading-relaxed">
                        <p>• Miễn phí giao hàng cho đơn hàng từ $50.</p>
                        <p>• Thời gian giao hàng: 1-2 ngày (Hà Nội, TP.HCM), 3-4 ngày (các tỉnh thành khác).</p>
                        <p>• Đổi hàng miễn phí trong vòng 7 ngày nếu không vừa kích cỡ hoặc có lỗi sản xuất.</p>
                      </div>
                    )}
                  </div>

                </div>

              </div>

            </div>

          </div>

          {/* Customer Reviews Section */}
          <section id="reviews" className="mt-16 pt-12 border-t border-[#e0e0e0] font-sans">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16">
              
              {/* Left Column: Summary & Rating Breakdown */}
              <div className="lg:col-span-4 space-y-6">
                <h2 className="text-xs font-normal uppercase tracking-[0.12em] text-black">
                  ĐÁNH GIÁ KHÁCH HÀNG
                </h2>

                {/* Big Score + Stars */}
                <div className="flex items-center gap-3">
                  <span className="text-4xl font-normal text-black tracking-tight">5.0</span>
                  <div>
                    <div className="flex items-center gap-0.5 text-amber-400">
                      {[1, 2, 3, 4, 5].map((s) => (
                        <svg key={s} className="w-3.5 h-3.5 fill-current" viewBox="0 0 20 20">
                          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                        </svg>
                      ))}
                    </div>
                    <p className="text-[11px] text-[#767676] mt-0.5">Based on 3 reviews</p>
                  </div>
                </div>

                {/* Distribution Bars */}
                <div className="space-y-2 text-xs text-[#767676]">
                  {[
                    { star: 5, count: 3, percent: 100 },
                    { star: 4, count: 0, percent: 0 },
                    { star: 3, count: 0, percent: 0 },
                    { star: 2, count: 0, percent: 0 },
                    { star: 1, count: 0, percent: 0 },
                  ].map((item) => (
                    <div key={item.star} className="flex items-center gap-3">
                      <span className="w-5 text-right">{item.star} ★</span>
                      <div className="flex-1 h-1.5 bg-[#e0e0e0] rounded-full overflow-hidden">
                        <div
                          className="h-full bg-black rounded-full"
                          style={{ width: `${item.percent}%` }}
                        />
                      </div>
                      <span className="w-3 text-right">{item.count}</span>
                    </div>
                  ))}
                </div>

                {/* Write Review Button */}
                <button className="w-full h-11 border border-[#e0e0e0] bg-white text-black text-xs uppercase tracking-wider hover:border-black transition-colors cursor-pointer">
                  Viết đánh giá
                </button>
              </div>

              {/* Right Column: Search + Sort + Review Items */}
              <div className="lg:col-span-8 space-y-6">
                {/* Search & Sort Bar */}
                <div className="flex flex-col sm:flex-row gap-3 items-stretch sm:items-center justify-between pb-4 border-b border-[#e0e0e0]">
                  <div className="relative flex-1 max-w-md">
                    <svg className="w-4 h-4 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-4.35-4.35m1.35-5.65a7 7 0 11-14 0 7 7 0 0114 0z" />
                    </svg>
                    <input
                      type="text"
                      placeholder="Search reviews..."
                      className="w-full h-10 pl-9 pr-3 text-xs border border-[#e0e0e0] focus:border-black focus:outline-none"
                    />
                  </div>

                  <select className="h-10 px-3 text-xs border border-[#e0e0e0] bg-white text-black focus:outline-none cursor-pointer">
                    <option>Verified First</option>
                    <option>Newest</option>
                    <option>Highest Rating</option>
                    <option>Lowest Rating</option>
                  </select>
                </div>

                {/* Reviews List */}
                <div className="divide-y divide-[#f0f0f0]">
                  
                  {/* Review 1 */}
                  <div className="py-6 space-y-2">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-0.5 text-amber-400">
                        {[1, 2, 3, 4, 5].map((s) => (
                          <svg key={s} className="w-3 h-3 fill-current" viewBox="0 0 20 20">
                            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                          </svg>
                        ))}
                      </div>
                      <span className="text-[11px] text-[#767676]">Apr 27, 2026</span>
                    </div>
                    <h4 className="text-xs font-semibold text-black">Buying another</h4>
                    <p className="text-xs text-gray-700 leading-relaxed">
                      Compliments every time I wear it. Such a versatile staple.
                    </p>
                    
                    {/* Review Image */}
                    <div className="mt-3 mb-2 flex gap-2 overflow-x-auto pb-1">
                      <img 
                        src={product.colors[0]?.images[0] || '/products/sculpt-black-bra-1.jpg'} 
                        alt="Customer photo" 
                        className="h-20 w-20 object-cover rounded-md border border-gray-200 cursor-pointer hover:opacity-80 transition-opacity"
                      />
                    </div>

                    <div className="flex items-center gap-2 pt-1">
                      <span className="text-xs text-black font-medium">Hong P.</span>
                      <span className="inline-flex items-center gap-1 text-[10px] text-gray-500 bg-gray-100 px-1.5 py-0.5 rounded">
                        <svg className="w-3 h-3 text-emerald-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                        </svg>
                        Verified Buyer
                      </span>
                    </div>
                  </div>

                  {/* Review 2 */}
                  <div className="py-6 space-y-2">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-0.5 text-amber-400">
                        {[1, 2, 3, 4, 5].map((s) => (
                          <svg key={s} className="w-3 h-3 fill-current" viewBox="0 0 20 20">
                            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                          </svg>
                        ))}
                      </div>
                      <span className="text-[11px] text-[#767676]">Apr 7, 2026</span>
                    </div>
                    <h4 className="text-xs font-semibold text-black">Holds up beautifully</h4>
                    <p className="text-xs text-gray-700 leading-relaxed">
                      Got this as a gift for myself and zero regrets. The fit is spot-on.
                    </p>
                    <div className="flex items-center gap-2 pt-1">
                      <span className="text-xs text-black font-medium">Ngoc D.</span>
                      <span className="inline-flex items-center gap-1 text-[10px] text-gray-500 bg-gray-100 px-1.5 py-0.5 rounded">
                        <svg className="w-3 h-3 text-emerald-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                        </svg>
                        Verified Buyer
                      </span>
                    </div>
                  </div>

                  {/* Review 3 */}
                  <div className="py-6 space-y-2">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-0.5 text-amber-400">
                        {[1, 2, 3, 4, 5].map((s) => (
                          <svg key={s} className="w-3 h-3 fill-current" viewBox="0 0 20 20">
                            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                          </svg>
                        ))}
                      </div>
                      <span className="text-[11px] text-[#767676]">Apr 23, 2026</span>
                    </div>
                    <h4 className="text-xs font-semibold text-black">Holds up beautifully</h4>
                    <p className="text-xs text-gray-700 leading-relaxed">
                      Bought my first EQL piece and now hooked. Will be back for more.
                    </p>
                    <div className="flex items-center gap-2 pt-1">
                      <span className="text-xs text-black font-medium">My L.</span>
                    </div>
                  </div>

                </div>
              </div>

            </div>
          </section>

          {/* Related Products Section */}
          <section className="mt-20 pt-12 border-t border-gray-200">
            <div className="text-center mb-8">
              <h2 className="text-xl font-normal uppercase tracking-widest text-black">
                Có thể bạn cũng thích
              </h2>
              <p className="text-xs text-gray-500 mt-1">Phối hợp hoàn hảo theo phong cách của bạn</p>
            </div>

            <div className="grid grid-cols-2 lg:grid-cols-3 gap-6">
              {relatedProducts.map((p) => (
                <ProductCard key={p.id} product={p as any} />
              ))}
            </div>
          </section>
        </div>
      </main>

      {/* Sticky Bottom Add-to-Cart Bar (Slides up when scrolled) */}
      <div
        className={`fixed bottom-0 left-0 right-0 z-50 bg-white border-t border-[#e0e0e0] shadow-xl transition-transform duration-300 font-sans ${
          showStickyBar ? 'translate-y-0' : 'translate-y-full'
        }`}
      >
        <div className="mx-auto max-w-[1440px] px-4 sm:px-6 lg:px-10 py-3 flex items-center justify-between gap-4">
          
          {/* Left: Thumbnail & Title & Color */}
          <div className="flex items-center gap-3 min-w-0">
            <div className="w-10 h-13 sm:w-11 sm:h-14 bg-[#f5f5f5] flex-shrink-0 overflow-hidden rounded-xs border border-gray-100">
              <img
                src={images[0] || product.colors[0]?.images[0]}
                alt={product.title}
                className="w-full h-full object-cover"
              />
            </div>
            <div className="min-w-0">
              <p className="text-xs sm:text-[13px] font-normal text-black truncate leading-tight">
                {product.title}
              </p>
              <p className="text-[11px] text-[#767676] truncate mt-0.5">
                {currentColor.name}
              </p>
            </div>
          </div>

          {/* Right: Price + Size Selector + Add To Cart Button */}
          <div className="flex items-center gap-4 sm:gap-6 flex-shrink-0">
            <span className="text-xs sm:text-[13px] font-normal text-black">
              {product.price}
            </span>

            {/* Size Dropdown */}
            <div className="relative">
              <select
                value={selectedSize}
                onChange={(e) => setSelectedSize(e.target.value)}
                className="appearance-none h-11 pl-4 pr-9 border border-black bg-white text-xs font-normal text-black cursor-pointer rounded-none focus:outline-none min-w-[140px] sm:min-w-[170px]"
              >
                {product.sizes.map((s) => (
                  <option key={s} value={s}>
                    Chọn kích thước ({s})
                  </option>
                ))}
              </select>
              <svg
                className="w-3 h-3 text-black absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
              </svg>
            </div>

            {/* Add to Cart Button */}
            <button
              onClick={handleAddToCart}
              className="h-11 px-6 sm:px-8 bg-black text-white text-xs font-normal transition-colors hover:bg-[#2c2c2c] cursor-pointer whitespace-nowrap flex items-center justify-center rounded-none"
            >
              Thêm vào giỏ — {product.price}
            </button>
          </div>

        </div>
      </div>

      <Footer />
    </div>
  );
}
