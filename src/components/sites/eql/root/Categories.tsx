import React from 'react';
import Link from 'next/link';

const categories = [
  {
    title: 'COURT',
    href: '/products?activity=tennis',
    image: '/activity/tennis.jpg?v=20260416',
  },
  {
    title: 'STUDIO',
    href: '/products?activity=yoga',
    image: '/activity/yoga.jpg?v=20260416',
  },
  {
    title: 'TẬP LUYỆN',
    href: '/products?activity=gym',
    image: '/activity/train.jpg',
  },
  {
    title: 'LOUNGE',
    href: '/products?activity=lounge',
    image: '/activity/lounge.jpg',
  },
  {
    title: 'CHẠY BỘ',
    href: '/products?activity=run',
    image: '/activity/run.jpg',
  },
];

export default function Categories() {
  return (
    <section className="pt-4 pb-6 lg:py-8 lg:px-8 max-w-[1440px] mx-auto border-b border-[#e0e0e0]">
      <div className="flex gap-4 sm:gap-6 lg:gap-12 justify-start sm:justify-center overflow-x-auto scrollbar-hide px-4 sm:px-6 lg:px-0">
        {categories.map((cat) => (
          <Link
            key={cat.title}
            className="group flex flex-col items-center shrink-0 w-[72px] sm:w-[90px] lg:w-[110px]"
            data-discover="true"
            href={cat.href}
          >
            <div className="relative aspect-square w-full rounded-full overflow-hidden bg-[#f5f5f5] ring-1 ring-gray-200 group-hover:ring-gray-400 group-hover:shadow-sm transition-all duration-300">
              <img
                src={cat.image}
                alt={cat.title}
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                loading="lazy"
              />
            </div>
            <span className="text-[10px] sm:text-[11px] font-normal uppercase tracking-[0.1em] text-center mt-3 text-black group-hover:opacity-60 transition-opacity whitespace-nowrap">
              {cat.title}
            </span>
          </Link>
        ))}
      </div>
    </section>
  );
}
