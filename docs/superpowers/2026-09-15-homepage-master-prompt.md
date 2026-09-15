# MASTER PROMPT — Ana sayfa yeniden tasarımı + att-promotions.com içerik paritesi

Proje: `C:\Users\huozg\OneDrive\Masaüstü\attspecial-clone` (Next.js 16 App Router, React 19, Tailwind 4, Vercel'de canlı, `main` dalı = production). Önce `AGENTS.md`'yi oku; oradaki kurallar bu prompt'un üstündedir. Git deposu var; her görevi ayrı commit'le, `npm run build` yeşil olmadan commit etme. Deploy = `git push` (Vercel `main`'i otomatik yayınlar, ~1 dk). Push'tan önce bana özet ver, ben "deploy" deyince push et.

## Neyi bozmayacaksın (kırmızı çizgiler)

1. **Kod yapısı:** fiyat/metin/telefon `src/lib/site-config.ts`'ten gelir, sayfalara hardcode yazılmaz. Wizard (`src/components/AvailabilityWizard.tsx` + `src/lib/wizard-copy.ts`), `WizardProvider`, `WizardButton`, `Modal`, `HeroPanel`, `HeroSwoosh`, `MobileCtaBar`, `template.tsx` olduğu gibi kalır. Yeni bağımlılık yok.
2. **Tasarım dili (globals.css'teki tokenlar):** AT&T paleti (`att-navy #00388F`, `att-cyan #009FDB`, `att-sky #00A0E1`, `att-ink #1D2329`, `att-light-blue #E9F6FD`, `att-dark #0B1B2B`), pill butonlar (`btn-primary/secondary/outline/on-dark/outline-white`), 16px kart radius, gövde 16px, `att-display/att-h2/att-h3/att-lead/att-fine` tipografi, `surface-card`, `plan-card`, `reveal` (CSS-only scroll reveal; hero'ya asla koyma), `page-in` (sadece opacity — transform ekleme, fixed modal'ları bozar), ikonlar çıplak ince-çizgi ink (`.icon-badge` / `.feature-icon`), listelerde cyan tik. Yeni bir bölüm eklerken bu sınıfları kullan; yeni renk/yeni font yok.
3. **Dürüstlük:** "adresinizde hizmet VAR" asla deme (`scripts/wizard-copy.test.mjs` bunu test eder: `node --test scripts/wizard-copy.test.mjs`). Sahte yorum, sahte sayaç, sahte "son X saat" yok. Her fiyat/kampanya için `site-config.ts`'e kaynak URL + tarih yorumu yaz. Doğrulayamadığın rakamı koyma; bana sor.
4. **OneConnect eklenmeyecek.** "Quantum bölgelerinde 1 GIG $40" doğrulanamadı → 1 GIG $50 kalır.
5. Fotoğraf seçimi sadece kalite/kompozisyon kriteriyle yapılır (Unsplash; `public/images/hero-*.jpg`, 2400px, sağ-ağırlıklı kırpım; dosyayı değiştirince adını da değiştir, cache 1 yıl).
6. Telefon numarası (`866.307.3525` vs `866.878.7382`) ve Resend e-posta domain'i **henüz açık** — dokunma, ben söyleyince yapılacak.

## Bugünkü durum (15 Eylül 2026, hepsi canlıda)

- Ana sayfa: dönen hero (slayt 1: 1 GIG $50; slayt 2: "AT&T fiber + AT&T wireless" lockup, "Get America's fastest 1 Gig internet¹ for $30/mo. for 12 mos.*", $200 Reward Card rozeti, Save up to $420/year; sağda sabit availability kartı; 4.5 sn crossfade, hover'da durur, noktalarla manuel). Altında: $200 Reward Card bandı (büyük kart görseli — **fazla yer kaplıyor, küçültülebilir/birleştirilebilir**), plan kartları (bundle fiyat satırıyla), TrustStrip, "What you get" (sol başlık + sağ 2×2 liste), "What happens next" lacivert zaman çizelgesi, Fiber vs Internet Air, FAQ önizleme.
- `/wireless`: $800/line switcher bandı + 4 unlimited plan grid (Value/Extra/Premium/Elite 2.0). `/att-internet-air`: $55 + $47 bundled. `/why-fiber`, `/business`, `/espanol`, `/att-fiber` (36 şehir) fotoğraflı hero.
- `scripts/og-images.mjs` OG kartlarını üretir (playwright-core gerekir, dosyanın başındaki nota bak). Playwright ile ekran görüntüsü alma altyapısı: `%TEMP%\pw\` altında `playwright-core` kurulu, Chromium headless shell `%LOCALAPPDATA%\ms-playwright\chromium_headless_shell-1234\`.

## Kaynak veri — att-promotions.com ana sayfası (15 Eylül 2026, bir başka AT&T Preferred Dealer)

Sayfa yapısı sırayla:
1. Üst bar: "Customer Service | Business Fiber" + dil (English | Español). Header: logo, "● Agents available 24/7", "CALL TO ORDER 844-940-2893".
2. H1 "Shop deals for AT&T Fiber® and AT&T Wireless".
3. **"Get a personalized quote" kutusu — "What service are you looking for?"** 3 büyük buton: **Internet / Wireless / Internet & Wireless Bundle**. (Bizde wizard'ın 1. adımı aynı soruyu soruyor: `openWizard({source})` ile doğrudan o seçimle açılabilir — bkz. `wizard-copy.ts` `service.choices`: internet | wireless | bundle | unsure. Ana sayfaya bu 3 tıklanabilir seçenek konacak; tıklayınca wizard o seçim ön-seçili açılmalı → `OpenWizardOptions`'a `service?: string` eklemek gerekebilir; `AvailabilityWizard` bunu `answers.service` olarak alıp 2. adımdan başlatsın.)
4. Fotoğraflı hero (aile, telefon).
5. **iPhone 18 Pro for $0** — "with iPhone trade-in. Any condition. Req. trade-in of iPhone 14 or higher (excl. 16e) & eligible plan." CTA: "Call to preorder".
6. **AT&T fiber + AT&T wireless** lockup: "Get America's fastest 1 Gig internet¹ for $30/mo. for 12 mos.* when you bundle with an unlimited wireless plan." Dipnot: "*Price after discounts: New customers only. $20/mo w elig wireless svc, $30/mo for 12mos for new customers, and $10/mo AutoPay & Paperless bill. Discounts start w/in 3 bills." "¹Best & Fastest Internet, AT&T Fiber based on analysis by Ookla® of Speedtest Intelligence® data 2H 2025."
7. **"Customize your bundle with AT&T Fiber and AT&T Wireless"** — sekmeli: Internet Packages | Wireless Plans (tıklanabilir sekme). Internet Packages: 300 Mbps $35 (was $60), 500 Mbps $50 ($75), Up to 1 GIG $50 ($90), Up to 5 GIG. Her kartta: "See Broadband Facts: www.att.com/dapbbfacts", "Included with Internet 300/500/1000: … equal upload and download speeds, 15X/20X/25X faster upload speeds than cable¹", butonlar "Call to order" + "Check availability". Wireless Plans sekmesi: **AT&T Premium 2.0 — $50/mo per line when you get 4 lines**: Unlimited talk, text & high-speed data that can't slow down based on how much you use; **100GB hotspot data per line per month** (after 100GB, 128kbps); AT&T ActiveArmor® security (free app); unlimited talk/text/data in **20 Latin American countries** at no extra cost; **4K UHD streaming**. Butonlar: "Call to get started" + "Order online".
8. **Save up to $420/year** bandı — "Enjoy both of these great services and stay connected to what matters most when you bundle your wireless and internet services with AT&T." + "call for this offer".
9. **Samsung Galaxy S26+ for $0** with eligible trade-in ("Req. trade-in of $95 or more & eligible plan").
10. **"Introducing the AT&T Guarantee℠"** — "All guaranteed, or AT&T will make it right." (att.com/why-att/guarantee: AT&T Guarantee = fiber ve wireless için kesinti olursa fatura kredisi, 5 dakikada destek; att.com'daki tam metni ve şartları fetch edip doğru yaz.)
11. **Get up to $800/line to break your contract!** "Switch to any plan and we'll pay off your phone balance." (Şartlar zaten `site-config.ts` → `switcherOffer`.)
12. Alt dipnotlar: speed101, All-Fi Pro ekipman şartı, Ookla notu, © AT&T.

**Bizde olmayanlar:** (3) 3-seçenekli giriş, (5)/(9) telefon teklifleri, (7) Internet Packages | Wireless Plans **sekmeli** bölüm (bizde ayrı sayfalar), Premium 2.0 özellik listesi (hotspot/ActiveArmor/Latin Amerika/4K), Broadband Facts linki, (10) AT&T Guarantee bölümü, "Call for this deal" + **"Get more info"** ikili CTA'lar, her kampanya için detay sayfası.

## Görev (sırayla; her adım = commit + build)

**0. Analiz.** Repo'yu, `AGENTS.md`'yi, `src/app/page.tsx`, `src/lib/site-config.ts`, `globals.css`'i oku. Playwright ile `/` sayfasının masaüstü (1280) ve mobil (400) tam ekran görüntüsünü al, mevcut bölümleri listele. Sonra kısa bir plan yaz (bölüm sırası + hangi bileşen), onayımı al, uygula.

**1. Ana sayfa bilgi mimarisi (yeniden kurabilirsin, tasarım dili aynı kalır).** Önerilen sıra:
   1. Hero (dönen 2 slayt kalabilir; ama slayt 2 zaten bundle'ı anlatıyorsa aşağıdaki bundle bölümüyle tekrar etmesin — birini seç)
   2. **"What are you looking for?"** 3 tıklanabilir seçenek: Internet Packages / Wireless Plans / Internet & Wireless Bundle → wizard'ı o `service` ön-seçili açar (`WizardProvider`/`AvailabilityWizard`'a küçük, geriye uyumlu ekleme)
   3. **Internet Packages | Wireless Plans sekmeli plan bölümü** (client state; URL hash ile `#internet` / `#wireless` derin link). Internet: mevcut `plans` + bundle satırı + "See Broadband Facts" linki (att.com/dapbbfacts). Wireless: `wirelessPlans` + Premium 2.0 özellik listesi (`site-config`'e `features: string[]` ekle; diğer planlar için doğrulanmış özellik yoksa sadece tagline).
   4. **AT&T fiber + AT&T wireless — Save up to $420/year** bandı (bundle açıklaması + $200 Reward Card **bu banda birleştirilebilir**; mevcut büyük Reward Card bandı küçülür ya da kalkar)
   5. **AT&T Guarantee℠** bölümü (att.com/why-att/guarantee'den doğrulanmış 3 madde + "See details")
   6. **Switcher: Get up to $800/line** (wireless sayfasındaki bandın kısa hali)
   7. Telefon teklifleri (iPhone 18 Pro / Galaxy S26+ $0 with trade-in) — **kaynak: att.com/deals** ile doğrula; doğrulanamazsa ekleme. Sık değişir; `site-config`'e tarih yorumu koy.
   8. "What you get", "What happens next", Fiber vs Internet Air, FAQ — mevcut, kalır.

**2. "Call for this deal" + "Get more info" ikili CTA.** Her kampanya bloğunda (bundle, $800 switcher, Guarantee, telefon teklifleri, Reward Card): sol `btn-primary` "Call for this deal" (`telHref(phoneNumber)` + `trackCall`), sağ `btn-outline` "Get more info" → o kampanyanın detay sayfasına `Link`. Tek bir `DealCta` bileşeni yaz (`src/components/DealCta.tsx`), tekrar kod yazma.

**3. Detay sayfaları** — `src/app/deals/[slug]/page.tsx` tek dinamik sayfa + `src/lib/deals.ts` veri dosyası (slug, title, hero özeti, "how it works" adımları, şartlar, kaynak URL, SEO metadata via `pageMetadata`). Slug'lar: `fiber-wireless-bundle`, `switcher-800`, `att-guarantee`, `reward-card-200`, gerekiyorsa `iphone-trade-in`, `galaxy-trade-in`. Her sayfa: `HeroPanel`, adımlar, şartlar, `AvailabilityCard`/`WizardButton` CTA, ilgili plan kartları. `sitemap.ts`'e ekle. Gereksiz sayfa üretme: bir kampanyanın şartı 2 cümleyse detay sayfası yerine `Modal` kullan.

**4. Mobil.** Her yeni bölümü 400px'de kontrol et (Playwright screenshot): yatay taşma yok (`document.documentElement.scrollWidth === 400`), sekmeler dokunulabilir, `MobileCtaBar` ile çakışma yok, çerez bandı barın üstünde.

**5. Doğrulama + rapor.** `npm run lint` (main'deki 11 eski hata dışında yeni hata yok), `node --test scripts/wizard-copy.test.mjs`, `npm run build`, Playwright: `/` masaüstü + mobil tam sayfa; wizard 3 giriş seçeneğiyle açılıyor; sekmeler çalışıyor; her "Get more info" doğru sayfaya gidiyor; her modal görünür (viewport içinde). Bana ne değişti / ne eklendi / hangi rakam hangi kaynaktan listesini ver; ben "deploy" deyince push.

## Üslup

Türkçe, kısa. Sorulara doğrudan cevap. Uzun açıklama yerine ekran görüntüsü. Kendi kararını verebileceğin yerde sorma; rakam/kampanya doğrulanamıyorsa **sor**.
