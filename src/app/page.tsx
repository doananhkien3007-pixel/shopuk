import Header from '@/components/sites/eql/root/Header';
import Hero from '@/components/sites/eql/root/Hero';
import CategoryNav from '@/components/sites/eql/root/CategoryNav';
import Categories from '@/components/sites/eql/root/Categories';
import Footer from "@/components/sites/eql/root/Footer";
import Collections from '@/components/sites/eql/root/Collections';
import KOLFeed from '@/components/sites/eql/root/KOLFeed';
import Link from 'next/link';

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col font-sans">
      <Header />
      <main id="main-content" className="flex-1 overflow-x-clip">
        <h1 className="sr-only">EQL Apparel — Đồ thể thao cao cấp, thiết kế tại Việt Nam</h1>
        <Hero />
        <CategoryNav />
        <Categories />
        
        <section className="mx-auto max-w-[1440px] px-4 sm:px-6 lg:px-8 py-8 lg:py-12 text-center">
          <Link
            href="/products"
            className="inline-flex items-center justify-center h-12 px-10 text-xs font-normal uppercase tracking-[0.15em] text-white bg-black hover:bg-[#2c2c2c] transition-colors"
          >
            XEM TẤT CẢ SẢN PHẨM
          </Link>
        </section>

        <Collections />
        <KOLFeed />
      </main>
      <Footer />
    </div>
  );
}
