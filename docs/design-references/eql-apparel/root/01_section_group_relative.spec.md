# Component Spec: section.group.relative

## 1. Overview & Dimensions
- **Width:** 1440px
- **Height:** 800px
- **Background:** rgb(0, 0, 0) none repeat scroll 0% 0% / auto padding-box border-box
- **Typography:** "DM Sans", system-ui, sans-serif, Color: rgb(0, 0, 0)

## 2. Interactive Elements (UI/UX Details)
- `a`: "SHOP THE COLLECTION"
  - Classes: `inline-flex items-center justify-center h-10 px-6 text-xs font-normal uppercase tracking-[0.1em] text-black bg-white hover:bg-black hover:text-white transition-colors rounded-none`
  - Typography: 12px "DM Sans", system-ui, sans-serif
  - Styles: color rgb(0, 0, 0), bg rgb(255, 255, 255), border 0px solid rgb(229, 231, 235), padding 0px 24px
- `a`: "EXPLORE"
  - Classes: `hidden sm:inline-flex items-center justify-center h-10 px-6 text-xs font-normal uppercase tracking-[0.1em] text-white border border-white hover:bg-white hover:text-black transition-colors rounded-none`
  - Typography: 12px "DM Sans", system-ui, sans-serif
  - Styles: color rgb(255, 255, 255), bg rgba(0, 0, 0, 0), border 1px solid rgb(255, 255, 255), padding 0px 24px
- `button`: ""
  - Classes: `w-9 h-9 sm:w-10 sm:h-10 flex items-center justify-center rounded-none text-white bg-black/30 backdrop-blur-sm border border-white/40 hover:bg-black/60 transition-all disabled:opacity-50`
  - Typography: 16px "DM Sans", system-ui, sans-serif
  - Styles: color rgb(255, 255, 255), bg rgba(0, 0, 0, 0.3), border 1px solid rgba(255, 255, 255, 0.4), padding 0px
- `button`: ""
  - Classes: `w-9 h-9 sm:w-10 sm:h-10 flex items-center justify-center rounded-none text-white bg-black/30 backdrop-blur-sm border border-white/40 hover:bg-black/60 transition-all disabled:opacity-50`
  - Typography: 16px "DM Sans", system-ui, sans-serif
  - Styles: color rgb(255, 255, 255), bg rgba(0, 0, 0, 0.3), border 1px solid rgba(255, 255, 255, 0.4), padding 0px

## 3. Raw HTML Reference
```html
<section class="group relative aspect-[2/3] sm:aspect-auto sm:h-[calc(100vh_-_100px)] min-h-[400px] sm:min-h-[500px] overflow-hidden bg-black"><div class="absolute inset-0 transition-opacity duration-700 ease-in-out" style="opacity:1;z-index:2;pointer-events:auto"><picture class="absolute inset-0 w-full h-full hidden sm:block"><source type="image/webp" srcset="https://cdn.eql-apparel.com/hero/monaco-summer-landscape-1779690517726.jpg?w=768 768w, https://cdn.eql-apparel.com/hero/monaco-summer-landscape-1779690517726.jpg?w=1280 1280w, https://cdn.eql-apparel.com/hero/monaco-summer-landscape-1779690517726.jpg?w=1920 1920w" sizes="100vw"><img src="https://cdn.eql-apparel.com/hero/monaco-summer-landscape-1779690517726.jpg" alt="Monaco Summer — it's time for ice cream. Shop the Monaco collection in summer colours." width="1920" height="1080" class="absolute inset-0 w-full h-full object-cover" loading="eager" fetchpriority="high"></picture><picture class="absolute inset-0 w-full h-full sm:hidden"><source type="image/webp" srcset="https://cdn.eql-apparel.com/hero/monaco-summer-portrait-1779690517726.jpg?w=480 480w, https://cdn.eql-apparel.com/hero/monaco-summer-portrait-1779690517726.jpg?w=1280 1280w, https://cdn.eql-apparel.com/hero/monaco-summer-portrait-1779690517726.jpg?w=2000 2000w" sizes="100vw"><img src="https://cdn.eql-apparel.com/hero/monaco-summer-portrait-1779690517726.jpg" alt="Monaco Summer — it's time for ice cream. Shop the Monaco collection in summer colours." width="768" height="1024" class="absolute inset-0 w-full h-full object-cover" loading="eager" fetchpriority="high"></picture><div class="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent"></div></div><div class="absolute bottom-6 sm:bottom-8 left-4 sm:left-10 lg:left-16 right-4 sm:right-8 flex items-center justify-between z-20"><div class="flex gap-4 sm:gap-6"><a class="inline-flex items-center justify-center h-10 px-6 text-xs font-normal uppercase tracking-[0.1em] text-black bg-white hover:bg-black hover:text-white transition-colors rounded-none" data-discover="true" href="/products?q=monaco">Shop the collection</a><a class="hidden sm:inline-flex items-center justify-center h-10 px-6 text-xs font-normal uppercase tracking-[0.1em] text-white border border-white hover:bg-white hover:text-black transition-colors rounded-none" data-discover="true" href="/collections">Explore</a></div><div class="flex items-center gap-2 sm:opacity-0 sm:group-hover:opacity-100 transition-opacity duration-300"><button class="w-9 h-9 sm:w-10 sm:h-10 flex items-center justify-center rounded-none text-white bg-black/30 backdrop-blur-sm border border-white/40 hover:bg-black/60 transition-all disabled:opacity-50" aria-label="Previous slide"><svg class="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="1.5"><path stroke-linecap="round" stroke-linejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5"></path></svg></button><button class="w-9 h-9 sm:w-10 sm:h-10 flex items-center justify-center rounded-none text-white bg-black/30 backdrop-blur-sm border border-white/40 hover:bg-black/60 transition-all disabled:opacity-50" aria-label="Next slide"><svg class="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="1.5"><path stroke-linecap="round" stroke-linejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5"></path></svg></button></div></div></section>
```
