import React from 'react';

export default function Hero() {
  return (
    <section className="group relative aspect-[2/3] sm:aspect-auto sm:h-[calc(100vh_-_100px)] min-h-[400px] sm:min-h-[500px] overflow-hidden bg-black">
      <div className="absolute inset-0 transition-opacity duration-700 ease-in-out" style={{ opacity: 1, zIndex: 2, pointerEvents: 'auto' }}>
        <picture className="absolute inset-0 w-full h-full hidden sm:block">
          <source type="image/webp" srcSet="https://cdn.eql-apparel.com/hero/monaco-summer-landscape-1779690517726.jpg?w=768 768w, https://cdn.eql-apparel.com/hero/monaco-summer-landscape-1779690517726.jpg?w=1280 1280w, https://cdn.eql-apparel.com/hero/monaco-summer-landscape-1779690517726.jpg?w=1920 1920w" sizes="100vw" />
          <img src="https://cdn.eql-apparel.com/hero/monaco-summer-landscape-1779690517726.jpg" alt="Monaco Summer" width={1920} height={1080} className="absolute inset-0 w-full h-full object-cover object-[center_20%]" loading="eager" fetchPriority="high" />
        </picture>
        <picture className="absolute inset-0 w-full h-full sm:hidden">
          <source type="image/webp" srcSet="https://cdn.eql-apparel.com/hero/monaco-summer-portrait-1779690517726.jpg?w=480 480w, https://cdn.eql-apparel.com/hero/monaco-summer-portrait-1779690517726.jpg?w=1280 1280w, https://cdn.eql-apparel.com/hero/monaco-summer-portrait-1779690517726.jpg?w=2000 2000w" sizes="100vw" />
          <img src="https://cdn.eql-apparel.com/hero/monaco-summer-portrait-1779690517726.jpg" alt="Monaco Summer" width={768} height={1024} className="absolute inset-0 w-full h-full object-cover object-[center_10%]" loading="eager" fetchPriority="high" />
        </picture>
        <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent"></div>
      </div>
      <div className="absolute bottom-6 sm:bottom-8 left-4 sm:left-10 lg:left-16 right-4 sm:right-8 flex items-center justify-between z-20">
        <div className="flex gap-4 sm:gap-6">
          <a className="inline-flex items-center justify-center h-10 px-6 text-xs font-normal uppercase tracking-[0.1em] text-black bg-white hover:bg-black hover:text-white transition-colors rounded-none" data-discover="true" href="/products?q=monaco">Shop the collection</a>
          <a className="hidden sm:inline-flex items-center justify-center h-10 px-6 text-xs font-normal uppercase tracking-[0.1em] text-white border border-white hover:bg-white hover:text-black transition-colors rounded-none" data-discover="true" href="/collections">Explore</a>
        </div>
        <div className="flex items-center gap-2 sm:opacity-0 sm:group-hover:opacity-100 transition-opacity duration-300">
          <button className="w-9 h-9 sm:w-10 sm:h-10 flex items-center justify-center rounded-none text-white bg-black/30 backdrop-blur-sm border border-white/40 hover:bg-black/60 transition-all disabled:opacity-50" aria-label="Previous slide">
            <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5">
              <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5"></path>
            </svg>
          </button>
          <button className="w-9 h-9 sm:w-10 sm:h-10 flex items-center justify-center rounded-none text-white bg-black/30 backdrop-blur-sm border border-white/40 hover:bg-black/60 transition-all disabled:opacity-50" aria-label="Next slide">
            <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5">
              <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5"></path>
            </svg>
          </button>
        </div>
      </div>
    </section>
  );
}
