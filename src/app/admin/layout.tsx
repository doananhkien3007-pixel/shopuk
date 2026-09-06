import React from 'react';
import Link from 'next/link';

export const metadata = {
  title: 'Admin Dashboard',
  description: 'Quản lý cửa hàng',
};

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-gray-50 font-sans flex">
      {/* Sidebar */}
      <aside className="w-64 bg-white border-r border-gray-200 hidden md:flex flex-col">
        <div className="h-16 flex items-center px-6 border-b border-gray-200">
          <Link href="/admin" className="text-xl font-bold tracking-tighter text-black">
            ADMIN PANEL
          </Link>
        </div>
        <nav className="flex-1 px-4 py-6 space-y-2">
          <Link href="/admin" className="flex items-center px-4 py-2.5 text-sm font-medium text-gray-900 rounded-md hover:bg-gray-100 transition-colors">
            <svg className="w-5 h-5 mr-3 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
            </svg>
            Tổng quan
          </Link>
          <Link href="/admin/products" className="flex items-center px-4 py-2.5 text-sm font-medium text-gray-900 rounded-md hover:bg-gray-100 transition-colors">
            <svg className="w-5 h-5 mr-3 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
            </svg>
            Sản phẩm
          </Link>
        </nav>
        <div className="p-4 border-t border-gray-200">
          <Link href="/" className="flex items-center px-4 py-2 text-sm font-medium text-gray-600 hover:text-black transition-colors">
            &larr; Về trang chủ
          </Link>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 flex flex-col min-w-0 overflow-hidden">
        {/* Header */}
        <header className="h-16 bg-white border-b border-gray-200 flex items-center justify-end px-6 sm:px-8">
          <div className="flex items-center">
             <span className="text-sm font-medium text-gray-700 mr-4">Admin</span>
             <div className="h-8 w-8 rounded-full bg-gray-200 flex items-center justify-center">
               <svg className="h-5 w-5 text-gray-500" fill="currentColor" viewBox="0 0 20 20">
                 <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" />
               </svg>
             </div>
          </div>
        </header>

        {/* Page Content */}
        <div className="flex-1 overflow-auto">
          {children}
        </div>
      </main>
    </div>
  );
}
