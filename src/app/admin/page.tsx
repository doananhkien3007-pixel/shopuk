import React from 'react';
import { supabase } from '@/utils/supabase';

export const dynamic = 'force-dynamic';

export default async function AdminDashboard() {
  // Đếm tổng số sản phẩm
  const { count: productCount } = await supabase
    .from('products')
    .select('*', { count: 'exact', head: true });

  const totalProducts = productCount || 0;

  // Lấy dữ liệu đơn hàng
  const { data: orders, error: ordersError } = await supabase
    .from('orders')
    .select('total, status');

  let totalRevenue = 0;
  let totalOrdersCount = 0;
  let paidOrdersCount = 0;

  if (orders) {
    totalOrdersCount = orders.length;
    orders.forEach(order => {
      if (order.status === 'paid' || order.status === 'completed') {
        paidOrdersCount++;
        totalRevenue += (order.total || 0);
      }
    });
  }

  // Format doanh thu ($)
  const formattedRevenue = (totalRevenue / 10000).toLocaleString('en-US', {
    style: 'currency',
    currency: 'USD'
  });

  return (
    <div className="p-6 sm:p-8">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-900">Tổng quan</h1>
        <p className="text-sm text-gray-500 mt-1">Chào mừng bạn quay lại trang quản trị.</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        
        {/* Thẻ Doanh thu */}
        <div className="bg-white rounded-lg border border-gray-200 p-6 shadow-sm">
          <div className="flex items-center">
            <div className="p-3 rounded-md bg-green-50 text-green-600">
              <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <div className="ml-4">
              <h2 className="text-sm font-medium text-gray-500">Doanh thu</h2>
              <p className="text-2xl font-semibold text-gray-900">{formattedRevenue}</p>
            </div>
          </div>
        </div>

        {/* Thẻ Đơn hàng */}
        <div className="bg-white rounded-lg border border-gray-200 p-6 shadow-sm">
          <div className="flex items-center">
            <div className="p-3 rounded-md bg-purple-50 text-purple-600">
              <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
              </svg>
            </div>
            <div className="ml-4">
              <h2 className="text-sm font-medium text-gray-500">Đơn hàng (Đã thanh toán)</h2>
              <p className="text-2xl font-semibold text-gray-900">{paidOrdersCount} <span className="text-sm text-gray-400 font-normal">/ {totalOrdersCount} tổng</span></p>
            </div>
          </div>
        </div>

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
