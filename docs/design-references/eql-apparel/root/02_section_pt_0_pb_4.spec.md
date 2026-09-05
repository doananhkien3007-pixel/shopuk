# Component Spec: section.pt-0.pb-4

## 1. Overview & Dimensions
- **Width:** 1440px
- **Height:** 425.875px
- **Background:** rgba(0, 0, 0, 0) none repeat scroll 0% 0% / auto padding-box border-box
- **Typography:** "DM Sans", system-ui, sans-serif, Color: rgb(0, 0, 0)

## 2. Interactive Elements (UI/UX Details)
- `a`: "COURT"
  - Classes: `group flex flex-col items-center shrink-0 w-[36vw] sm:w-[32vw] lg:w-auto snap-start`
  - Typography: 16px "DM Sans", system-ui, sans-serif
  - Styles: color rgb(0, 0, 0), bg rgba(0, 0, 0, 0), border 0px solid rgb(229, 231, 235), padding 0px
- `a`: "STUDIO"
  - Classes: `group flex flex-col items-center shrink-0 w-[36vw] sm:w-[32vw] lg:w-auto snap-start`
  - Typography: 16px "DM Sans", system-ui, sans-serif
  - Styles: color rgb(0, 0, 0), bg rgba(0, 0, 0, 0), border 0px solid rgb(229, 231, 235), padding 0px
- `a`: "TẬP LUYỆN"
  - Classes: `group flex flex-col items-center shrink-0 w-[36vw] sm:w-[32vw] lg:w-auto snap-start`
  - Typography: 16px "DM Sans", system-ui, sans-serif
  - Styles: color rgb(0, 0, 0), bg rgba(0, 0, 0, 0), border 0px solid rgb(229, 231, 235), padding 0px
- `a`: "LOUNGE"
  - Classes: `group flex flex-col items-center shrink-0 w-[36vw] sm:w-[32vw] lg:w-auto snap-start`
  - Typography: 16px "DM Sans", system-ui, sans-serif
  - Styles: color rgb(0, 0, 0), bg rgba(0, 0, 0, 0), border 0px solid rgb(229, 231, 235), padding 0px
- `a`: "CHẠY BỘ"
  - Classes: `group flex flex-col items-center shrink-0 w-[36vw] sm:w-[32vw] lg:w-auto snap-start`
  - Typography: 16px "DM Sans", system-ui, sans-serif
  - Styles: color rgb(0, 0, 0), bg rgba(0, 0, 0, 0), border 0px solid rgb(229, 231, 235), padding 0px

## 3. Raw HTML Reference
```html
<section class="pt-0 pb-4 lg:py-6 lg:px-8 max-w-[1440px] mx-auto"><div class="flex gap-2 overflow-x-auto scrollbar-hide snap-x snap-mandatory lg:grid lg:grid-cols-5 lg:gap-4 lg:overflow-visible pb-2 lg:pb-0 pl-0 pr-4 sm:px-6 lg:px-0"><a class="group flex flex-col items-center shrink-0 w-[36vw] sm:w-[32vw] lg:w-auto snap-start" data-discover="true" href="/products?activity=tennis"><div class="relative aspect-[3/4] w-full overflow-hidden bg-[#f5f5f5]"><img src="/activity/tennis.jpg?v=20260416" alt="COURT" width="600" height="800" class="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" loading="lazy"></div><span class="text-[11px] sm:text-xs font-normal uppercase tracking-[0.1em] text-center mt-3 text-black group-hover:opacity-60 transition-opacity">COURT</span></a><a class="group flex flex-col items-center shrink-0 w-[36vw] sm:w-[32vw] lg:w-auto snap-start" data-discover="true" href="/products?activity=yoga"><div class="relative aspect-[3/4] w-full overflow-hidden bg-[#f5f5f5]"><img src="/activity/yoga.jpg?v=20260416" alt="STUDIO" width="600" height="800" class="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" loading="lazy"></div><span class="text-[11px] sm:text-xs font-normal uppercase tracking-[0.1em] text-center mt-3 text-black group-hover:opacity-60 transition-opacity">STUDIO</span></a><a class="group flex flex-col items-center shrink-0 w-[36vw] sm:w-[32vw] lg:w-auto snap-start" data-discover="true" href="/products?activity=gym"><div class="relative aspect-[3/4] w-full overflow-hidden bg-[#f5f5f5]"><img src="/activity/train.jpg" alt="TẬP LUYỆN" width="600" height="800" class="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" loading="lazy"></div><span class="text-[11px] sm:text-xs font-normal uppercase tracking-[0.1em] text-center mt-3 text-black group-hover:opacity-60 transition-opacity">TẬP LUYỆN</span></a><a class="group flex flex-col items-center shrink-0 w-[36vw] sm:w-[32vw] lg:w-auto snap-start" data-discover="true" href="/products?activity=lounge"><div class="relative aspect-[3/4] w-full overflow-hidden bg-[#f5f5f5]"><img src="/activity/lounge.jpg" alt="LOUNGE" width="600" height="800" class="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" loading="lazy"></div><span class="text-[11px] sm:text-xs font-normal uppercase tracking-[0.1em] text-center mt-3 text-black group-hover:opacity-60 transition-opacity">LOUNGE</span></a><a class="group flex flex-col items-center shrink-0 w-[36vw] sm:w-[32vw] lg:w-auto snap-start" data-discover="true" href="/products?activity=run"><div class="relative aspect-[3/4] w-full overflow-hidden bg-[#f5f5f5]"><img src="/activity/run.jpg" alt="CHẠY BỘ" width="600" height="800" class="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" loading="lazy"></div><span class="text-[11px] sm:text-xs font-normal uppercase tracking-[0.1em] text-center mt-3 text-black group-hover:opacity-60 transition-opacity">CHẠY BỘ</span></a></div></section>
```
