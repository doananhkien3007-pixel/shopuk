import Stripe from 'stripe';
import Link from 'next/link';
import Header from '@/components/sites/eql/root/Header';
import Footer from '@/components/sites/eql/root/Footer';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY || 'sk_test_mock');

export default async function TrackOrderPage({
  searchParams,
}: {
  searchParams: Promise<{ order_id?: string; email?: string }>;
}) {
  const resolvedParams = await searchParams;
  const orderId = resolvedParams.order_id;
  const email = resolvedParams.email;

  let session: Stripe.Checkout.Session | null = null;
  let lineItems: Stripe.ApiList<Stripe.LineItem> | null = null;
  let errorMsg = '';

  if (orderId && email) {
    try {
      let sessionId = orderId.trim();
      if (sessionId.toUpperCase() === 'TESTMOCK') {
        sessionId = 'cs_test_mock';
      }
      
      if (!sessionId.startsWith('cs_')) {
         errorMsg = 'Vui lòng nhập chính xác Mã Đơn Hàng (Bắt đầu bằng cs_...) hoặc mã test (TESTMOCK)';
      } else if (sessionId === 'cs_test_mock' && email.trim().toLowerCase() === 'test@test.com') {
        // MOCK DATA FOR TESTING UI
        session = {
          id: 'cs_test_mock',
          amount_subtotal: 1180000,
          amount_total: 1210000,
          customer_details: {
            name: 'Khách hàng Test',
            email: 'test@test.com',
            address: {
              line1: '123 Đường Test',
              city: 'TP Hồ Chí Minh',
              country: 'VN',
            }
          },
        } as any;
        lineItems = {
          data: [
            {
              id: 'li_1',
              description: 'Sculpt - Black (Đen) - Bra',
              quantity: 1,
              amount_total: 500000,
              price: { product: { images: ['/products/sculpt-black-bra-1.jpg'] } }
            },
            {
              id: 'li_2',
              description: 'Sculpt - Leggings Loe',
              quantity: 1,
              amount_total: 680000,
              price: { product: { images: ['/sites/eql/root/images/0cdf224043bdaf7a.webp'] } }
            }
          ]
        } as any;
      } else {
        const retrievedSession = await stripe.checkout.sessions.retrieve(sessionId);
        if (retrievedSession.customer_details?.email?.toLowerCase() === email.toLowerCase().trim()) {
          session = retrievedSession;
          lineItems = await stripe.checkout.sessions.listLineItems(sessionId, {
            expand: ['data.price.product'],
          });
        } else {
          errorMsg = 'Email không khớp với đơn hàng này.';
        }
      }
    } catch (err) {
      console.error('Error fetching order:', err);
      errorMsg = 'Không tìm thấy đơn hàng. Vui lòng kiểm tra lại Mã đơn hàng.';
    }
  }

  const formatUSD = (num: number | null) => {
    if (num === null) return '$0.00';
    return '$' + (num / 10000).toLocaleString('en-US', {minimumFractionDigits: 2, maximumFractionDigits: 2});
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#fdfdfd] font-sans">
      <Header />
      <main className="flex-1 max-w-3xl w-full mx-auto px-4 pt-24 pb-16 md:pt-32">
        <div className="text-center mb-12">
          <h1 className="text-2xl font-light text-black mb-3 uppercase tracking-widest">Tra cứu đơn hàng</h1>
          <p className="text-sm text-gray-500">
            Nhập mã đơn hàng 8 ký tự (hoặc mã cs_...) và Email để xem tình trạng.
          </p>
        </div>

        {!session && (
          <form method="GET" action="/track-order" className="max-w-md mx-auto space-y-4 bg-white p-6 border border-gray-200 shadow-sm rounded-sm">
            {errorMsg && (
              <div className="bg-red-50 text-red-600 text-xs p-3 rounded-sm border border-red-100">
                {errorMsg}
              </div>
            )}
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-black mb-1.5">
                Mã đơn hàng
              </label>
              <input 
                type="text" 
                name="order_id"
                required
                defaultValue={orderId || ''}
                placeholder="Dùng TESTMOCK để test"
                className="w-full h-12 px-4 border border-gray-300 text-sm focus:border-black outline-none transition-all"
              />
            </div>
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-black mb-1.5">
                Email đặt hàng
              </label>
              <input 
                type="email" 
                name="email"
                required
                defaultValue={email || ''}
                placeholder="Dùng test@test.com để test"
                className="w-full h-12 px-4 border border-gray-300 text-sm focus:border-black outline-none transition-all"
              />
            </div>
            <button 
              type="submit"
              className="w-full h-12 bg-black text-white text-xs uppercase tracking-[0.15em] font-medium hover:bg-[#2c2c2c] transition-colors mt-2"
            >
              Tra cứu
            </button>
          </form>
        )}

        {session && lineItems && (
          <div className="bg-white p-8 border border-gray-200 shadow-sm rounded-sm animate-fade-in">
            <div className="flex items-center justify-between border-b border-gray-100 pb-4 mb-8">
              <div>
                <h2 className="text-lg font-medium text-black">Đơn hàng: <span className="font-mono text-sm tracking-wider">{session.id.split('_').pop()?.substring(0, 8).toUpperCase()}</span></h2>
              </div>
            </div>

            {/* Order Timeline */}
            <div className="mb-10 px-2">
              <div className="flex items-start justify-between relative pt-2">
                {/* Horizontal Line Background */}
                <div className="absolute top-7 left-[12.5%] right-[12.5%] h-1 bg-gray-200 z-0"></div>
                {/* Active Horizontal Line */}
                <div className="absolute top-7 left-[12.5%] w-1/4 h-1 bg-green-500 z-0"></div>

                {/* Step 1: Đặt hàng (Completed) */}
                <div className="flex flex-col items-center gap-2 relative z-10 w-1/4">
                  <div className="w-10 h-10 bg-green-500 rounded-full border-2 border-white ring-2 ring-green-500 flex items-center justify-center text-white shadow-sm">
                    {/* Checkmark icon for completed */}
                    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7" /></svg>
                  </div>
                  <span className="text-[10px] sm:text-xs font-semibold text-green-600 text-center">Đã Đặt Hàng</span>
                  <span className="text-[9px] text-gray-500 mt-[-4px]">Hoàn tất</span>
                </div>
                
                {/* Step 2: Thanh toán (Current/Active) */}
                <div className="flex flex-col items-center gap-2 relative z-10 w-1/4">
                  {/* Outer pulsing ring for active state */}
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

            <div className="space-y-6 border-t border-gray-100 pt-8">
              <div>
                <h3 className="text-xs font-bold uppercase tracking-widest text-black mb-3">Sản phẩm</h3>
                <div className="space-y-3 divide-y divide-gray-100">
                  {lineItems.data.map((item) => {
                    // Extract image from stripe product object or use placeholder
                    const productObj = item.price?.product as any;
                    const imageUrl = productObj?.images?.[0] || '/products/sculpt-black-bra-1.jpg';
                    return (
                      <div key={item.id} className="pt-3 flex justify-between items-center gap-4">
                        <div className="flex items-center gap-4">
                          <img src={imageUrl} alt={item.description || 'Sản phẩm'} className="w-16 h-16 object-cover rounded shadow-sm border border-gray-100" />
                          <div>
                            <p className="text-sm font-medium text-black">{item.description}</p>
                            <p className="text-xs text-gray-500 mt-0.5">Số lượng: {item.quantity}</p>
                          </div>
                        </div>
                        <p className="text-sm font-medium text-black">
                          {formatUSD(item.amount_total)}
                        </p>
                      </div>
                    );
                  })}
                </div>
              </div>

              <div className="border-t border-gray-100 pt-4 space-y-2">
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

              <div className="border-t border-gray-100 pt-6">
                <h3 className="text-xs font-bold uppercase tracking-widest text-black mb-3">Thông tin giao hàng</h3>
                <p className="text-sm text-gray-700 font-medium">{session.customer_details?.name}</p>
                <p className="text-sm text-gray-600">{session.customer_details?.email}</p>
                {(() => {
                  const shipping = (session as any).shipping_details?.address || session.customer_details?.address;
                  if (shipping) {
                    return (
                      <div className="text-sm text-gray-600 mt-2">
                        <p>{shipping.line1}</p>
                        {shipping.line2 && <p>{shipping.line2}</p>}
                        <p>{shipping.city}{shipping.state ? `, ${shipping.state}` : ''}</p>
                      </div>
                    );
                  }
                  return null;
                })()}
              </div>
            </div>

            <div className="mt-8 pt-6 border-t border-gray-100 text-center">
              <Link href="/track-order" className="text-xs text-gray-500 hover:text-black underline">
                Tra cứu đơn hàng khác
              </Link>
            </div>
          </div>
        )}
      </main>
      <Footer />
    </div>
  );
}
