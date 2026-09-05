import Header from "@/components/sites/eql/root/Header";
import Footer from "@/components/sites/eql/root/Footer";
import Link from "next/link";

export default function PlaceholderPage() {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1 flex flex-col items-center justify-center py-20 px-4 text-center">
        <h1 className="text-3xl md:text-4xl font-light mb-4 text-black tracking-tight">Tính năng đang phát triển</h1>
        <p className="text-gray-500 mb-8 max-w-md">Trang này đang trong quá trình xây dựng và sẽ sớm ra mắt. Mong bạn thông cảm và quay lại sau nhé!</p>
        <Link href="/" className="px-8 py-3 bg-black text-white text-sm tracking-wider font-medium hover:bg-gray-900 transition-colors">
          VỀ TRANG CHỦ
        </Link>
      </main>
      <Footer />
    </div>
  );
}
