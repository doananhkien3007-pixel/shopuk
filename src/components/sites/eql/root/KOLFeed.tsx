"use client";

import React, { useRef, useState } from 'react';
import Link from 'next/link';

interface KOLProduct {
  title: string;
  price: string;
  image: string;
  url: string;
}

interface KOLPost {
  id: string;
  image: string;
  username: string;
  avatar: string;
  caption: string;
  products: KOLProduct[];
}

const mockPosts: KOLPost[] = [
  {
    id: '1',
    image: '/sites/eql/root/images/6383dd9abb074ecf.webp',
    username: '@huynnnhnhu',
    avatar: '/sites/eql/root/images/bc5edd8fe8843883.webp',
    caption: 'yoga day in my fav cream fit 🤍',
    products: [
      {
        title: 'Sculpt - Cream Polka Dot - Set',
        price: '$850',
        image: '/products/polka-dot-cream-set.jpg',
        url: '/products/sculpt-cream-polka-dot-set',
      }
    ]
  },
  {
    id: '2',
    image: '/sites/eql/root/images/bc5edd8fe8843883.webp',
    username: '@vananhscarlet',
    avatar: '/sites/eql/root/images/0cdf224043bdaf7a.webp',
    caption: 'Starting the month strong 💪',
    products: [
      {
        title: 'Sculpt - Black (Đen) - Bra',
        price: '$500',
        image: '/products/sculpt-black-bra-1.jpg',
        url: '/products/sculpt-black-den-bra',
      }
    ]
  },
  {
    id: '3',
    image: '/sites/eql/root/images/355801d7be79ad8e.webp',
    username: '@tu_hhao',
    avatar: '/sites/eql/root/images/9570c4eb6919625c.webp',
    caption: 'in my tennis girl era 🎾',
    products: [
      {
        title: 'Muse - Navy',
        price: '$850',
        image: '/sites/eql/root/images/355801d7be79ad8e.webp',
        url: '/products/nestle-snow-top',
      }
    ]
  },
  {
    id: '4',
    image: '/sites/eql/root/images/153d6d332e77e776.webp',
    username: '@_hatmitmit_',
    avatar: '/sites/eql/root/images/ff54dacc9e02a984.webp',
    caption: 'Serving Valentine energy all day in our Celebre Collection ❤️',
    products: [
      {
        title: 'Layer - Jacket Hồng',
        price: '$720',
        image: '/sites/eql/root/images/9570c4eb6919625c.webp',
        url: '/products/layer-jacket-pink',
      }
    ]
  },
  {
    id: '5',
    image: '/sites/eql/root/images/9570c4eb6919625c.webp',
    username: '@eql.girls',
    avatar: '/sites/eql/root/images/c8760525ce91eb4c.webp',
    caption: 'Morning run essential 🏃‍♀️',
    products: [
      {
        title: 'Femme Long Leggings',
        price: '$650',
        image: '/sites/eql/root/images/b70e81ec479bb2f8.webp',
        url: '/products/femme-long-leggings-black',
      }
    ]
  },
];

export default function KOLFeed() {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [activePost, setActivePost] = useState<KOLPost | null>(null);
  const [currentProductIdx, setCurrentProductIdx] = useState(0);

  const scroll = (direction: 'left' | 'right') => {
    if (scrollRef.current) {
      const scrollAmount = 300;
      scrollRef.current.scrollBy({
        left: direction === 'left' ? -scrollAmount : scrollAmount,
        behavior: 'smooth',
      });
    }
  };

  return (
    <section className="py-12 lg:py-16 bg-white overflow-hidden">
      <div className="mx-auto max-w-[1440px] px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-[11px] font-bold uppercase tracking-[0.15em] text-black">Shop the look</h2>
          <span className="text-[11px] font-medium uppercase tracking-[0.1em] text-gray-500">EQL ON YOU</span>
        </div>

        {/* Carousel */}
        <div className="relative group">
          {/* Nav Buttons */}
          <button
            onClick={() => scroll('left')}
            className="absolute left-0 top-1/2 -translate-y-1/2 -ml-3 sm:-ml-4 z-10 w-8 h-8 sm:w-10 sm:h-10 bg-white border border-gray-200 flex items-center justify-center text-black shadow-sm opacity-0 group-hover:opacity-100 transition-opacity disabled:opacity-0"
            aria-label="Previous"
          >
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
              <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" />
            </svg>
          </button>
          <button
            onClick={() => scroll('right')}
            className="absolute right-0 top-1/2 -translate-y-1/2 -mr-3 sm:-mr-4 z-10 w-8 h-8 sm:w-10 sm:h-10 bg-white border border-gray-200 flex items-center justify-center text-black shadow-sm opacity-0 group-hover:opacity-100 transition-opacity disabled:opacity-0"
            aria-label="Next"
          >
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
              <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
            </svg>
          </button>

          {/* Scroll Container */}
          <div
            ref={scrollRef}
            className="flex gap-1 sm:gap-2 overflow-x-auto snap-x snap-mandatory hide-scrollbar pb-4"
            style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
          >
            {mockPosts.map((post) => (
              <div
                key={post.id}
                className="relative flex-none w-[280px] sm:w-[300px] md:w-[320px] aspect-square snap-start group/card overflow-hidden"
              >
                <img
                  src={post.image}
                  alt={post.caption}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover/card:scale-105"
                />
                
                {/* Gradient Overlay for Text */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-80" />

                {/* Shop Button Overlay (Top Right) */}
                <div className="absolute top-4 right-4 opacity-0 group-hover/card:opacity-100 transition-opacity duration-300">
                  <button
                    onClick={() => { setActivePost(post); setCurrentProductIdx(0); }}
                    className="inline-flex items-center gap-1.5 bg-white/90 backdrop-blur-sm px-3 py-1.5 text-[10px] font-bold uppercase tracking-wider text-black hover:bg-white transition-colors shadow-sm cursor-pointer"
                  >
                    <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15.75 10.5V6a3.75 3.75 0 10-7.5 0v4.5m11.356-1.993l1.263 12c.07.665-.45 1.243-1.119 1.243H4.25a1.125 1.125 0 01-1.12-1.243l1.264-12A1.125 1.125 0 015.513 7.5h12.974c.576 0 1.059.435 1.119 1.007zM8.625 10.5a.375.375 0 11-.75 0 .375.375 0 01.75 0zm7.5 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z" />
                    </svg>
                    Shop
                  </button>
                </div>

                {/* KOL Info (Bottom) */}
                <div className="absolute bottom-4 left-4 right-4 text-white">
                  <div className="flex items-center gap-2 mb-2">
                    <img
                      src={post.avatar}
                      alt={post.username}
                      className="w-5 h-5 rounded-full object-cover border border-white/30"
                    />
                    <span className="text-[11px] font-medium tracking-wide">{post.username}</span>
                  </div>
                  <p className="text-[11px] font-light leading-snug line-clamp-2 opacity-90">
                    {post.caption}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Interactive Modal */}
      {activePost && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
          {/* Backdrop */}
          <div 
            className="absolute inset-0 bg-black/70 backdrop-blur-sm cursor-pointer animate-fade-in"
            onClick={() => setActivePost(null)}
          ></div>
          
          {/* Modal Content */}
          <div className="relative w-full max-w-4xl bg-white shadow-2xl flex flex-col md:flex-row h-[80vh] max-h-[800px] animate-fade-in overflow-hidden">
            {/* Left side: Full Image */}
            <div className="hidden md:block w-1/2 h-full bg-black">
              <img 
                src={activePost.image} 
                alt={activePost.caption} 
                className="w-full h-full object-cover"
              />
            </div>

            {/* Right side: Product details */}
            <div className="w-full md:w-1/2 h-full flex flex-col bg-white">
              {/* Header */}
              <div className="flex items-center justify-between p-6 border-b border-gray-100">
                <div className="flex items-center gap-3">
                  <img src={activePost.avatar} alt={activePost.username} className="w-10 h-10 rounded-full border border-gray-200 object-cover" />
                  <span className="text-sm font-medium text-black">{activePost.username}</span>
                </div>
                <button 
                  onClick={() => setActivePost(null)}
                  className="w-8 h-8 flex items-center justify-center rounded-full bg-gray-100 text-gray-500 hover:bg-gray-200 transition-colors cursor-pointer"
                >
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>

              {/* Body */}
              <div className="flex-1 overflow-y-auto p-6 md:p-10 flex flex-col justify-center relative">
                
                {/* KOL Review / Caption */}
                <div className="mb-12">
                  <p className="text-lg md:text-xl font-light text-black italic">
                    "{activePost.caption}"
                  </p>
                </div>

                <p className="text-[10px] font-bold uppercase tracking-widest text-gray-400 mb-8">Shop the look</p>
                
                {/* Product Carousel inside Modal */}
                <div className="relative flex items-center justify-between">
                  <button 
                    disabled={currentProductIdx === 0}
                    onClick={() => setCurrentProductIdx(p => Math.max(0, p - 1))}
                    className="w-10 h-10 rounded-full bg-white border border-gray-200 flex items-center justify-center shadow-sm disabled:opacity-30 disabled:cursor-not-allowed hover:bg-gray-50 transition-colors z-10"
                  >
                    <svg className="w-5 h-5 text-gray-600" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M15.75 19.5L8.25 12l7.5-7.5" /></svg>
                  </button>
                  
                  <div className="flex-1 flex items-center gap-6 px-4">
                    <div className="w-28 h-36 sm:w-36 sm:h-44 shrink-0 bg-gray-50 border border-gray-100 overflow-hidden rounded-md">
                      <img src={activePost.products[currentProductIdx].image} alt={activePost.products[currentProductIdx].title} className="w-full h-full object-cover" />
                    </div>
                    <div>
                      <h3 className="text-sm sm:text-base font-medium text-black mb-1">{activePost.products[currentProductIdx].title}</h3>
                      <p className="text-xs text-gray-500 mb-4">{activePost.products[currentProductIdx].price}</p>
                      <Link 
                        href={activePost.products[currentProductIdx].url}
                        className="text-[10px] font-bold uppercase tracking-widest text-gray-400 hover:text-black transition-colors inline-flex items-center gap-1"
                      >
                        View Product
                        <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 8l4 4m0 0l-4 4m4-4H3" /></svg>
                      </Link>
                    </div>
                  </div>

                  <button 
                    disabled={currentProductIdx === activePost.products.length - 1}
                    onClick={() => setCurrentProductIdx(p => Math.min(activePost.products.length - 1, p + 1))}
                    className="w-10 h-10 rounded-full bg-white border border-gray-200 flex items-center justify-center shadow-sm disabled:opacity-30 disabled:cursor-not-allowed hover:bg-gray-50 transition-colors z-10"
                  >
                    <svg className="w-5 h-5 text-gray-600" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M8.25 4.5l7.5 7.5-7.5 7.5" /></svg>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
