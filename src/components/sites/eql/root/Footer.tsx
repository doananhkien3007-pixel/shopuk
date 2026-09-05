import React from 'react';
import Link from 'next/link';

export default function Footer() {
  return (
    <footer className="bg-[#f4f4f4] border-t border-gray-200 mt-4">
      <div className="mx-auto max-w-[1440px] px-4 sm:px-6 lg:px-8 py-12 lg:py-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 lg:gap-12">
          <div className="col-span-1 md:col-span-2">
            <h3 className="text-sm font-bold uppercase tracking-wider mb-4">Nhận thông tin cập nhật</h3>
            <p className="text-sm text-gray-600 mb-4">Đăng ký để nhận thông tin về các bộ sưu tập mới, sự kiện và nhiều hơn thế nữa.</p>
            <form className="flex gap-2 max-w-sm">
              <input type="email" placeholder="Địa chỉ email" className="flex-1 bg-white border border-gray-300 px-4 py-2 text-sm focus:outline-none focus:border-black" />
              <button type="submit" className="bg-black text-white px-6 py-2 text-sm uppercase tracking-wider hover:bg-gray-800 transition-colors">Đăng ký</button>
            </form>
          </div>
          <div>
            <h3 className="text-sm font-bold uppercase tracking-wider mb-4">Liên kết hữu ích</h3>
            <ul className="space-y-3 text-sm text-gray-600">
              <li><Link href="/about" className="hover:text-black transition-colors">Về chúng tôi</Link></li>
              <li><Link href="/contact" className="hover:text-black transition-colors">Liên hệ</Link></li>
              <li><Link href="/faq" className="hover:text-black transition-colors">Câu hỏi thường gặp</Link></li>
              <li><Link href="/stores" className="hover:text-black transition-colors">Hệ thống cửa hàng</Link></li>
            </ul>
          </div>
          <div>
            <h3 className="text-sm font-bold uppercase tracking-wider mb-4">Chính sách</h3>
            <ul className="space-y-3 text-sm text-gray-600">
              <li><Link href="/policy/shipping" className="hover:text-black transition-colors">Chính sách giao hàng</Link></li>
              <li><Link href="/policy/returns" className="hover:text-black transition-colors">Chính sách đổi trả</Link></li>
              <li><Link href="/policy/privacy" className="hover:text-black transition-colors">Bảo mật thông tin</Link></li>
              <li><Link href="/policy/terms" className="hover:text-black transition-colors">Điều khoản dịch vụ</Link></li>
            </ul>
          </div>
        </div>
        <div className="border-t border-gray-200 mt-12 pt-8 flex flex-col md:flex-row items-center justify-between text-xs text-gray-500 gap-6">
          <p>&copy; 2026 EQL Apparel. Bản quyền thuộc về Công ty TNHH EQL Việt Nam.</p>
          
          {/* Payment Methods */}
          <div className="flex flex-wrap items-center gap-2">
            <span className="text-[10px] uppercase tracking-wider mr-2 text-gray-400">Thanh toán an toàn:</span>
            <div className="px-2.5 py-1 border border-gray-300 bg-white rounded-sm flex items-center justify-center shadow-sm">
              <span className="text-[10px] font-bold text-[#1a1f71] italic tracking-tighter">VISA</span>
            </div>
            <div className="px-2.5 py-1 border border-gray-300 bg-white rounded-sm flex items-center justify-center gap-0.5 shadow-sm">
              <div className="w-2.5 h-2.5 bg-[#eb001b] rounded-full opacity-90"></div>
              <div className="w-2.5 h-2.5 bg-[#f79e1b] rounded-full opacity-90 -ml-1.5 mix-blend-multiply"></div>
              <span className="text-[9px] font-medium text-black ml-1">mastercard</span>
            </div>
            <div className="px-2.5 py-1 border border-gray-300 bg-white rounded-sm flex items-center justify-center shadow-sm">
              <span className="text-[10px] font-medium text-gray-700">G Pay</span>
            </div>
            <div className="px-2.5 py-1 border border-gray-300 bg-white rounded-sm flex items-center justify-center shadow-sm">
              <span className="text-[10px] font-medium text-black"> Pay</span>
            </div>
            <div className="px-2.5 py-1 border border-gray-300 bg-white rounded-sm flex items-center justify-center shadow-sm">
              <span className="text-[10px] font-bold text-[#003087] italic tracking-tight">PayPal</span>
            </div>
          </div>
          
          <div className="flex items-center gap-4">
            <span>US (USD $)</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
