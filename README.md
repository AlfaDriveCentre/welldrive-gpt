# WellDrive — Astro + React (SSG)

Bu proje, WellDrive ana sayfasının Apple tarzı, beyaz temalı ve performans odaklı bir versiyonudur.

## Kurulum
```bash
npm i
npm run dev
```

## Build
```bash
npm run build
npm run preview
```

Cloudflare Pages için:
- Build command: `npm run build`
- Output directory: `dist`

## Yapı
- `public/assets` — görseller
- `src/pages` — sayfalar (`/`, `/wd750`, `/wd770`, `/destek`, `/iletisim`, `/search`)
- `src/components` — Navbar, Footer, LanguageSwitch, SearchOverlay, Reveal
- `src/i18n` — dil dosyaları (`tr.json` hazırdır; EN/RU placeholder)
- `src/styles/global.css` — Tailwind + genel stiller

## Notlar
- Inter fontu Google Fonts üzerinden yüklenmektedir. İstenirse kolayca lokal barındırmaya çevrilebilir.
- Arama sonucu sayfası ve çok-dilli URL yapısı (hreflang ile) 2. aşamada detaylandırılacaktır.