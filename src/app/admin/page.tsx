import React from 'react';
import { supabase } from '@/utils/supabase';

export const dynamic = 'force-dynamic';

export default async function AdminDashboard() {
  // Đếm tổng số sản phẩm
  const { count, error } = await supabase
    .from('products')
    .select('*', { count: 'exact', head: true });

  const totalProducts = count || 0;

  return (
    <div className="p-6 sm:p-8">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-900">Tổng quan</h1>
        <p className="text-sm text-gray-500 mt-1">Chào mừng bạn quay lại trang quản trị.</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {/* Thẻ Sản phẩm */}
        <div className="bg-white rounded-lg border border-gray-200 p-6 shadow-sm">
          <div className="flex items-center">
            <div className="p-3 rounded-md bg-blue-50 text-blue-600">
              <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
              </svg>
            </div>
            <div className="ml-4">
              <h2 className="text-sm font-medium text-gray-500">Tổng sản phẩm</h2>
              <p className="text-2xl font-semibold text-gray-900">{totalProducts}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
