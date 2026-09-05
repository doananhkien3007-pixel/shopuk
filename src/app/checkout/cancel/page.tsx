import Link from 'next/link';

export default function CheckoutCancelPage() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center font-sans bg-gray-50 px-4">
      <div className="max-w-md w-full bg-white p-8 rounded-sm shadow-sm text-center">
        <div className="w-16 h-16 bg-red-100 text-red-600 rounded-full flex items-center justify-center mx-auto mb-6">
          <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </div>
        <h1 className="text-2xl font-light text-black mb-2">Đã hủy thanh toán</h1>
        <p className="text-sm text-gray-500 mb-8">
          Bạn đã hủy quá trình thanh toán. Các sản phẩm vẫn được giữ trong giỏ hàng của bạn.
        </p>
        <Link
          href="/products"
          className="inline-flex items-center justify-center h-12 w-full text-xs font-normal uppercase tracking-[0.15em] text-black border border-black hover:bg-gray-50 transition-colors"
        >
          QUAY LẠI CỬA HÀNG
        </Link>
      </div>
    </div>
  );
}
