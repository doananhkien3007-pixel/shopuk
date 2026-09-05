import Stripe from 'stripe';
import Link from 'next/link';
import { redirect } from 'next/navigation';
import Header from '@/components/sites/eql/root/Header';
import Footer from '@/components/sites/eql/root/Footer';

// Use the secret key to fetch the session securely on the server
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY || '');

export default async function CheckoutSuccessPage({
  searchParams,
}: {
  searchParams: Promise<{ session_id?: string }>;
}) {
  const resolvedParams = await searchParams;
  const sessionId = resolvedParams.session_id;

  if (!sessionId) {
    redirect('/');
  }

  let session: Stripe.Checkout.Session;
  let lineItems: Stripe.ApiList<Stripe.LineItem>;

  try {
    session = await stripe.checkout.sessions.retrieve(sessionId);
    lineItems = await stripe.checkout.sessions.listLineItems(sessionId, {
      expand: ['data.price.product'],
    });
  } catch (err) {
    console.error('Error fetching Stripe session:', err);
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50 text-black">
        <p>Không tìm thấy thông tin đơn hàng hoặc mã phiên thanh toán không hợp lệ.</p>
      </div>
    );
  }

  const customerName = session.customer_details?.name || 'Khách hàng';
  const customerEmail = session.customer_details?.email || '';
  const shipping = (session as any).shipping_details?.address || session.customer_details?.address;
  
  const formatUSD = (num: number | null) => {
    if (num === null) return '$0.00';
    return '$' + (num / 10000).toLocaleString('en-US', {minimumFractionDigits: 2, maximumFractionDigits: 2});
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#fdfdfd] font-sans">
      <Header />
      
      <main className="flex-1 max-w-4xl w-full mx-auto px-4 pt-24 pb-16 md:pt-32">
        <div className="text-center mb-12">
          <div className="w-16 h-16 bg-black text-white rounded-full flex items-center justify-center mx-auto mb-6">
            <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M5 13l4 4L19 7" />
            </svg>
          </div>
          <h1 className="text-3xl font-light text-black mb-3">Đơn hàng đã được xác nhận</h1>
          <p className="text-sm text-gray-500">
            Cảm ơn {customerName} đã mua sắm tại EQL Apparel. Mã đơn hàng của bạn là:
          </p>
          <p className="font-mono text-xs mt-2 text-black bg-gray-100 py-1 px-3 inline-block rounded-sm tracking-wider">
            {session.id.split('_').pop()?.substring(0, 8).toUpperCase()}
          </p>
        </div>

        {/* Order Timeline */}
        <div className="mb-12 overflow-hidden px-2 max-w-2xl mx-auto">
          <div className="flex items-start justify-between relative pt-2">
            {/* Horizontal Line Background */}
            <div className="absolute top-7 left-[12.5%] right-[12.5%] h-1 bg-gray-200 z-0"></div>
            {/* Active Horizontal Line */}
            <div className="absolute top-7 left-[12.5%] w-1/4 h-1 bg-green-500 z-0"></div>

            {/* Step 1: Đặt hàng (Completed) */}
            <div className="flex flex-col items-center gap-2 relative z-10 w-1/4">
              <div className="w-10 h-10 bg-green-500 rounded-full border-2 border-white ring-2 ring-green-500 flex items-center justify-center text-white shadow-sm">
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7" /></svg>
              </div>
              <span className="text-[10px] sm:text-xs font-semibold text-green-600 text-center">Đã Đặt Hàng</span>
              <span className="text-[9px] text-gray-500 mt-[-4px]">Hoàn tất</span>
            </div>
            
            {/* Step 2: Thanh toán (Current/Active) */}
            <div className="flex flex-col items-center gap-2 relative z-10 w-1/4">
              <div className="relative flex items-center justify-center w-10 h-10">
                <span className="absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-20 animate-ping"></span>
                <div className="relative w-10 h-10 bg-white rounded-full border-2 border-green-500 flex items-center justify-center text-green-500 shadow-sm">
                  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 9V7a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2m2 4h10a2 2 0 002-2v-6a2 2 0 00-2-2H9a2 2 0 00-2 2v6a2 2 0 002 2zm7-5a2 2 0 11-4 0 2 2 0 014 0z" /></svg>
                </div>
              </div>
              <span className="text-[10px] sm:text-xs font-bold text-black text-center">Đã Thanh Toán</span>
              <span className="text-[9px] text-green-600 font-medium mt-[-4px]">Hiện tại</span>
            </div>

            {/* Step 3: Đã giao cho ĐVVC (Future) */}
            <div className="flex flex-col items-center gap-2 relative z-10 w-1/4 opacity-60">
              <div className="w-10 h-10 bg-white rounded-full border-2 border-gray-300 flex items-center justify-center text-gray-400">
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 14v3m4-3v3m4-3v3M3 21h18M3 10h18M3 7l9-4 9 4M4 10h16v11H4V10z" /></svg>
              </div>
              <span className="text-[10px] sm:text-xs font-medium text-gray-500 text-center">Giao Cho ĐVVC</span>
            </div>

            {/* Step 4: Chờ Giao Hàng (Future) */}
            <div className="flex flex-col items-center gap-2 relative z-10 w-1/4 opacity-60">
              <div className="w-10 h-10 bg-white rounded-full border-2 border-gray-300 flex items-center justify-center text-gray-400">
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 8h14M5 8a2 2 0 110-4h14a2 2 0 110 4M5 8v10a2 2 0 002 2h10a2 2 0 002-2V8m-9 4h4" /></svg>
              </div>
              <span className="text-[10px] sm:text-xs font-medium text-gray-500 text-center">Chờ Giao Hàng</span>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Cột trái: Thông tin giao hàng */}
          <div className="space-y-8">
            <div className="bg-white p-6 border border-gray-200 shadow-sm rounded-sm">
              <h2 className="text-xs font-bold uppercase tracking-widest text-black mb-4 pb-2 border-b border-gray-100">
                Thông tin khách hàng
              </h2>
              <div className="text-sm text-gray-700 space-y-1">
                <p><span className="font-medium text-black">Họ tên:</span> {customerName}</p>
                <p><span className="font-medium text-black">Email:</span> {customerEmail}</p>
              </div>
            </div>

            <div className="bg-white p-6 border border-gray-200 shadow-sm rounded-sm">
              <h2 className="text-xs font-bold uppercase tracking-widest text-black mb-4 pb-2 border-b border-gray-100">
                Địa chỉ giao hàng
              </h2>
              {shipping ? (
                <div className="text-sm text-gray-700 space-y-1 leading-relaxed">
                  <p>{shipping.line1}</p>
                  {shipping.line2 && <p>{shipping.line2}</p>}
                  <p>{shipping.city}{shipping.state ? `, ${shipping.state}` : ''}</p>
                  <p>{shipping.country}</p>
                </div>
              ) : (
                <p className="text-sm text-gray-500">Không có thông tin giao hàng.</p>
              )}
            </div>
          </div>

          {/* Cột phải: Tóm tắt đơn hàng */}
          <div className="bg-white p-6 border border-gray-200 shadow-sm rounded-sm flex flex-col">
            <h2 className="text-xs font-bold uppercase tracking-widest text-black mb-6 pb-2 border-b border-gray-100">
              Tóm tắt đơn hàng
            </h2>
            
            <div className="flex-1 space-y-4">
              {lineItems.data.map((item) => {
                const productObj = item.price?.product as any;
                const imageUrl = productObj?.images?.[0] || '/products/sculpt-black-bra-1.jpg';
                return (
                  <div key={item.id} className="flex justify-between items-center gap-4">
                    <div className="flex items-center gap-4">
                      <img src={imageUrl} alt={item.description || 'Sản phẩm'} className="w-16 h-16 object-cover rounded shadow-sm border border-gray-100" />
                      <div>
                        <p className="text-sm font-medium text-black">{item.description}</p>
                        <p className="text-xs text-gray-500 mt-0.5">Số lượng: {item.quantity}</p>
                      </div>
                    </div>
                    <p className="text-sm font-medium text-black whitespace-nowrap ml-2">
                      {formatUSD(item.amount_total)}
                    </p>
                  </div>
                );
              })}
            </div>

            <div className="mt-8 pt-4 border-t border-gray-100 space-y-2">
              <div className="flex justify-between text-sm text-gray-600">
                <span>Tạm tính</span>
                <span>{formatUSD(session.amount_subtotal)}</span>
              </div>
              <div className="flex justify-between text-sm text-gray-600">
                <span>Phí vận chuyển</span>
                <span>{formatUSD((session.amount_total || 0) - (session.amount_subtotal || 0))}</span>
              </div>
              <div className="flex justify-between text-base font-bold text-black pt-2 mt-2 border-t border-gray-100">
                <span>Tổng cộng</span>
                <span>{formatUSD(session.amount_total)}</span>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-12 text-center">
          <Link
            href="/"
            className="inline-flex items-center justify-center h-12 px-8 text-xs font-medium uppercase tracking-[0.15em] text-white bg-black hover:bg-[#2c2c2c] transition-colors cursor-pointer"
          >
            Tiếp tục mua sắm
          </Link>
        </div>
      </main>

      <Footer />
    </div>
  );
}
