import React from 'react';
import Header from '@/components/sites/eql/root/Header';
import Footer from '@/components/sites/eql/root/Footer';

export default function AboutPage() {
  return (
    <>
      <Header />
      <main>
        <div className="mx-auto max-w-[1440px] px-4 sm:px-6 lg:px-8 py-12">
          <nav aria-label="Breadcrumb" className="mb-3">
            <ol className="flex items-center gap-2 text-xs font-normal text-[#767676]">
              <li className="flex items-center gap-2">
                <a className="hover:text-black transition-colors" data-discover="true" href="/">Trang chủ</a>
              </li>
              <li className="flex items-center gap-2">
                <span className="text-[#c0c0c0]" aria-hidden="true">/</span>
                <span className="text-black" aria-current="page">Về chúng tôi</span>
              </li>
            </ol>
          </nav>
          <div className="text-center mb-16">
            <p className="text-xs uppercase tracking-widest text-luxury-stone mb-4">Câu chuyện thương hiệu</p>
            <h1 className="font-display text-3xl sm:text-4xl lg:text-5xl font-light text-luxury-charcoal tracking-wide">EQL Apparel</h1>
            <p className="mt-6 max-w-2xl mx-auto text-luxury-stone text-sm sm:text-base leading-relaxed">Ra đời từ niềm đam mê với chất liệu cao cấp và thiết kế tinh tế, EQL Apparel mang đến dòng athleisure sang trọng — được thiết kế tại Việt Nam cho phụ nữ hiện đại trên toàn thế giới.</p>
          </div>
          <div className="mb-16">
            <div className="aspect-[21/9] rounded-sm overflow-hidden">
              <img src="/hero/landscape-2.jpg" alt="EQL Apparel — Premium Athleisure" className="w-full h-full object-cover" />
            </div>
          </div>
          <div className="max-w-3xl mx-auto text-center mb-20">
            <h2 className="font-display text-xl sm:text-2xl font-light text-luxury-charcoal tracking-wide mb-6">Sứ mệnh của chúng tôi</h2>
            <p className="text-luxury-stone text-sm sm:text-base leading-relaxed">Chúng tôi tin rằng trang phục thể thao có thể vừa đẹp vừa bền vững. Mỗi sản phẩm EQL đều được chế tác từ những chất liệu cao cấp nhất, mang đến sự thoải mái từ phòng tập đến cuộc sống thường ngày — mà không phải đánh đổi phong cách hay trách nhiệm với môi trường.</p>
          </div>
          <div className="mb-20">
            <h2 className="font-display text-xl sm:text-2xl font-light text-luxury-charcoal tracking-wide text-center mb-12">Giá trị cốt lõi</h2>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-8">
              <div className="text-center p-6">
                <div className="w-14 h-14 mx-auto mb-5 rounded-full bg-luxury-cream flex items-center justify-center text-luxury-charcoal">
                  <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1" d="M9 12.75L11.25 15 15 9.75M21 12c0 1.268-.63 2.39-1.593 3.068a3.745 3.745 0 01-1.043 3.296 3.745 3.745 0 01-3.296 1.043A3.745 3.745 0 0112 21c-1.268 0-2.39-.63-3.068-1.593a3.746 3.746 0 01-3.296-1.043 3.746 3.746 0 01-1.043-3.296A3.745 3.745 0 013 12c0-1.268.63-2.39 1.593-3.068a3.745 3.745 0 011.043-3.296 3.746 3.746 0 013.296-1.043A3.746 3.746 0 0112 3c1.268 0 2.39.63 3.068 1.593a3.746 3.746 0 013.296 1.043 3.746 3.746 0 011.043 3.296A3.745 3.745 0 0121 12z"></path>
                  </svg>
                </div>
                <h3 className="font-display text-sm uppercase tracking-widest text-luxury-charcoal mb-3">Chất lượng</h3>
                <p className="text-luxury-stone text-sm leading-relaxed">Chất liệu cao cấp được tuyển chọn kỹ lưỡng, đường may tinh tế và kiểm tra chất lượng nghiêm ngặt trong mọi công đoạn sản xuất.</p>
              </div>
              <div className="text-center p-6">
                <div className="w-14 h-14 mx-auto mb-5 rounded-full bg-luxury-cream flex items-center justify-center text-luxury-charcoal">
                  <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1" d="M12.75 3.03v.568c0 .334.148.65.405.864l1.068.89c.442.369.535 1.01.216 1.49l-.51.766a2.25 2.25 0 01-1.161.886l-.143.048a1.107 1.107 0 00-.57 1.664c.369.555.169 1.307-.427 1.592L9 13.125l.423 1.059a.956.956 0 01-1.652.928l-.679-.906a1.125 1.125 0 00-1.906.172L4.5 15.75l-.612.153M12.75 3.031a9 9 0 00-8.862 12.872M12.75 3.031a9 9 0 016.69 14.036m0 0l-.177-.529A2.25 2.25 0 0017.128 15H16.5l-.324-.324a1.453 1.453 0 00-2.328.377l-.036.073a1.586 1.586 0 01-.982.816l-.99.282c-.55.157-.894.702-.8 1.267l.073.438a2.253 2.253 0 01-1.699 2.652L8.4 20.07a9 9 0 004.35-2.953"></path>
                  </svg>
                </div>
                <h3 className="font-display text-sm uppercase tracking-widest text-luxury-charcoal mb-3">Bền vững</h3>
                <p className="text-luxury-stone text-sm leading-relaxed">Cam kết sử dụng vải tái chế, bao bì thân thiện với môi trường và quy trình sản xuất có trách nhiệm.</p>
              </div>
              <div className="text-center p-6">
                <div className="w-14 h-14 mx-auto mb-5 rounded-full bg-luxury-cream flex items-center justify-center text-luxury-charcoal">
                  <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1" d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z"></path>
                  </svg>
                </div>
                <h3 className="font-display text-sm uppercase tracking-widest text-luxury-charcoal mb-3">Thoải mái</h3>
                <p className="text-luxury-stone text-sm leading-relaxed">Thiết kế ôm sát cơ thể một cách tự nhiên, mang lại sự tự tin và thoải mái tuyệt đối trong mọi hoạt động.</p>
              </div>
            </div>
          </div>
          <div className="max-w-3xl mx-auto">
            <div className="aspect-[16/9] rounded-sm overflow-hidden mb-6">
              <img src="/hero/landscape-3.jpg" alt="Đội ngũ EQL" className="w-full h-full object-cover" />
            </div>
            <p className="text-center text-luxury-stone text-sm leading-relaxed">Đội ngũ EQL Apparel tại thành phố Hồ Chí Minh — nơi mỗi thiết kế được sinh ra từ đam mê và sự sáng tạo.</p>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
