import React from 'react';
import Link from 'next/link';

export default function CategoryNav() {
  const links = [
    { label: 'MỚI VỀ', href: '/products?tag=new' },
    { label: 'SÂN', href: '/products?activity=tennis' },
    { label: 'STUDIO', href: '/products?activity=yoga' },
    { label: 'LOUNGE', href: '/products?activity=lounge' },
    { label: 'PHỤ KIỆN', href: '/products?tag=accessories' },
    { label: 'SALE', href: '/products?tag=sale' },
  ];

  return (
    <nav className="border-b border-[#e0e0e0]">
      <div className="flex items-center justify-start sm:justify-center overflow-x-auto whitespace-nowrap scrollbar-hide px-4 gap-3 sm:gap-8">
        {links.map((link) => (
          <Link
            key={link.label}
            href={link.href}
            className="text-[11px] uppercase tracking-[0.1em] font-normal text-black hover:opacity-60 transition-opacity shrink-0 py-3 px-2 sm:px-3 min-h-[40px] flex items-center"
          >
            {link.label}
          </Link>
        ))}
      </div>
    </nav>
  );
}
