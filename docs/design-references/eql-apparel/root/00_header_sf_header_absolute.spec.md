# Component Spec: header.sf-header.absolute

## 1. Overview & Dimensions
- **Width:** 1440px
- **Height:** 80px
- **Background:** rgba(255, 255, 255, 0.95) none repeat scroll 0% 0% / auto padding-box border-box
- **Typography:** "DM Sans", system-ui, sans-serif, Color: rgb(0, 0, 0)

## 2. Interactive Elements (UI/UX Details)
- `button`: ""
  - Classes: `sf-icon-btn lg:hidden transition-colors text-black`
  - Typography: 12px "DM Sans", system-ui, sans-serif
  - Styles: color rgb(0, 0, 0), bg rgba(0, 0, 0, 0), border 0px solid rgb(229, 231, 235), padding 0px
- `a`: "Cửa hàng"
  - Classes: `sf-nav-link text-[13px] font-normal tracking-[0.01em] transition-colors text-black hover:opacity-70`
  - Typography: 13px "DM Sans", system-ui, sans-serif
  - Styles: color rgb(0, 0, 0), bg rgba(0, 0, 0, 0), border 0px solid rgb(229, 231, 235), padding 0px
- `a`: "Tất cả sản phẩm"
  - Classes: `sf-nav-link text-[13px] font-normal tracking-[0.01em] transition-colors text-black hover:opacity-70`
  - Typography: 13px "DM Sans", system-ui, sans-serif
  - Styles: color rgb(0, 0, 0), bg rgba(0, 0, 0, 0), border 0px solid rgb(229, 231, 235), padding 0px
- `a`: ""
  - Classes: `absolute left-1/2 -translate-x-1/2`
  - Typography: 12px "DM Sans", system-ui, sans-serif
  - Styles: color rgb(0, 0, 0), bg rgba(0, 0, 0, 0), border 0px solid rgb(229, 231, 235), padding 0px
- `input`: ""
  - Classes: `w-48 xl:w-56 text-xs border-b bg-transparent py-1.5 pr-7 pl-1 focus:outline-none transition-colors border-[#e0e0e0] text-black placeholder:text-[#999] focus:border-black`
  - Typography: 12px "DM Sans", system-ui, sans-serif
  - Styles: color rgb(0, 0, 0), bg rgba(0, 0, 0, 0), border , padding 6px 28px 6px 4px
- `a`: "EN"
  - Classes: `hidden lg:block px-2 py-2 -mx-2 text-[11px] font-normal tracking-[0.05em] transition-colors text-[#767676] hover:opacity-70`
  - Typography: 11px "DM Sans", system-ui, sans-serif
  - Styles: color rgb(118, 118, 118), bg rgba(0, 0, 0, 0), border 0px solid rgb(229, 231, 235), padding 8px
- `a`: "Về chúng tôi"
  - Classes: `hidden lg:block sf-nav-link text-[13px] font-normal tracking-[0.01em] transition-colors text-black hover:opacity-70`
  - Typography: 13px "DM Sans", system-ui, sans-serif
  - Styles: color rgb(0, 0, 0), bg rgba(0, 0, 0, 0), border 0px solid rgb(229, 231, 235), padding 0px
- `button`: ""
  - Classes: `sf-icon-btn lg:hidden transition-colors text-[#767676] hover:opacity-70`
  - Typography: 12px "DM Sans", system-ui, sans-serif
  - Styles: color rgb(118, 118, 118), bg rgba(0, 0, 0, 0), border 0px solid rgb(229, 231, 235), padding 0px
- `a`: ""
  - Classes: `sf-icon-btn relative transition-colors text-[#767676] hover:opacity-70`
  - Typography: 12px "DM Sans", system-ui, sans-serif
  - Styles: color rgb(118, 118, 118), bg rgba(0, 0, 0, 0), border 0px solid rgb(229, 231, 235), padding 0px
- `a`: ""
  - Classes: `sf-icon-btn hidden sm:inline-flex transition-colors text-[#767676] hover:opacity-70`
  - Typography: 12px "DM Sans", system-ui, sans-serif
  - Styles: color rgb(118, 118, 118), bg rgba(0, 0, 0, 0), border 0px solid rgb(229, 231, 235), padding 0px
- `button`: ""
  - Classes: `sf-icon-btn relative transition-colors text-[#767676] hover:opacity-70`
  - Typography: 12px "DM Sans", system-ui, sans-serif
  - Styles: color rgb(118, 118, 118), bg rgba(0, 0, 0, 0), border 0px solid rgb(229, 231, 235), padding 0px

## 3. Raw HTML Reference
```html
<header class="sf-header absolute left-0 right-0" data-announcement="true" style="position: fixed;" data-scrolled="true"><div class="mx-auto max-w-[1440px] px-4 sm:px-6 lg:px-8"><div class="flex h-16 lg:h-20 items-center justify-between sf-header-bar"><div class="flex items-center gap-6"><button class="sf-icon-btn lg:hidden transition-colors text-black" aria-label="Menu" aria-expanded="false" aria-controls="mobile-drawer"><svg class="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M3 12h18M3 6h18M3 18h18"></path></svg></button><nav class="hidden lg:flex items-center gap-8"><div class="relative"><a class="sf-nav-link text-[13px] font-normal tracking-[0.01em] transition-colors text-black hover:opacity-70" data-discover="true" href="/products">Cửa hàng</a></div><div class="relative"><a class="sf-nav-link text-[13px] font-normal tracking-[0.01em] transition-colors text-black hover:opacity-70" data-discover="true" href="/products">Tất cả sản phẩm</a></div></nav></div><a class="absolute left-1/2 -translate-x-1/2" data-discover="true" href="/"><img src="/eql-logo-black.png" alt="EQL Apparel" class="h-[28px] lg:h-[32px]"></a><div class="flex items-center gap-1 sm:gap-4"><div data-search-container="true"><div class="relative hidden lg:block"><div class="relative"><input type="text" placeholder="Tìm kiếm" aria-label="Tìm sản phẩm" class="w-48 xl:w-56 text-xs border-b bg-transparent py-1.5 pr-7 pl-1 focus:outline-none transition-colors border-[#e0e0e0] text-black placeholder:text-[#999] focus:border-black" value=""><svg class="absolute right-1 top-1/2 -translate-y-1/2 w-4 h-4 text-[#767676]" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z"></path></svg></div></div></div><a href="#" class="hidden lg:block px-2 py-2 -mx-2 text-[11px] font-normal tracking-[0.05em] transition-colors text-[#767676] hover:opacity-70">EN</a><a class="hidden lg:block sf-nav-link text-[13px] font-normal tracking-[0.01em] transition-colors text-black hover:opacity-70" data-discover="true" href="/about">Về chúng tôi</a><button class="sf-icon-btn lg:hidden transition-colors text-[#767676] hover:opacity-70" aria-label="Search"><svg class="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z"></path></svg></button><a class="sf-icon-btn relative transition-colors text-[#767676] hover:opacity-70" aria-label="Wishlist" data-discover="true" href="/wishlist"><svg class="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z"></path></svg></a><a class="sf-icon-btn hidden sm:inline-flex transition-colors text-[#767676] hover:opacity-70" aria-label="Account" data-discover="true" href="/account"><svg class="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z"></path></svg></a><button class="sf-icon-btn relative transition-colors text-[#767676] hover:opacity-70" aria-label="Giỏ hàng trống"><svg class="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M15.75 10.5V6a3.75 3.75 0 10-7.5 0v4.5m11.356-1.993l1.263 12c.07.665-.45 1.243-1.119 1.243H4.25a1.125 1.125 0 01-1.12-1.243l1.264-12A1.125 1.125 0 015.513 7.5h12.974c.576 0 1.059.435 1.119 1.007zM8.625 10.5a.375.375 0 11-.75 0 .375.375 0 01.75 0zm7.5 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z"></path></svg></button></div></div></div></header>
```
