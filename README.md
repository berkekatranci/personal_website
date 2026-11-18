# Berke Katranci Portfolio

Personal portfolio and CV website built with Next.js App Router, TypeScript, Tailwind CSS, Framer Motion, and structured content files.

The homepage is supported by three static project case studies. Gariban Adam
and its spelling variants are used only in SEO metadata and the Person schema;
there is no separate alias page or visible alias content.

## Run locally

```bash
npm install
npm run dev
```

Open `http://localhost:3000`.

## Build

```bash
npm run build
npm run start
```

## Where to edit content

- Profile text, metrics, pillars, socials, and recruiter summary: `data/profile.ts`
- Projects: `data/projects.ts`
- CV timeline: `data/cv.ts`
- Skill groups: `data/skills.ts`
- Investment section: `data/investment.ts`
- Creative lab and 3D model placeholders: `data/creative.ts`
- Favorite games: `data/games.ts`
- Writing/media entries: `data/writing.ts`
- Project case studies: `data/case-studies.ts`
- SEO metadata, canonical origin, and profile schema: `lib/site.ts`
- Hero image: `public/images/hero-systems.png`
- Game images: `public/images/games/*`
- Optional 3D models: place `.glb` or `.gltf` files under `public/models` and add their paths in `data/creative.ts`

Impressum and privacy text are legal placeholders. Replace them with jurisdiction-specific legal content before publishing.

## Deploy to Vercel

This project is ready for Vercel as a standard Next.js app.

1. Push the repository to GitHub, GitLab, or Bitbucket.
2. Import the project in Vercel.
3. Keep the framework preset as Next.js.
4. Use `npm install` as the install command and `npm run build` as the build command.
5. Deploy.

The `vercel.json` file pins the expected install and build commands.

## Database / Neon

The current website is static and does not need a database. Do not add Neon,
Prisma, Drizzle, or database environment variables until you introduce dynamic
features such as CMS-managed projects, writing entries, analytics,
authentication, or saved contact requests.

If a database is needed later, use Neon Postgres and add a `DATABASE_URL` value
in Vercel Project Settings. A template is included in `.env.example`.

## SEO ve yayın sonrası adımlar

- Ana alan adı ve tüm canonical adresleri: `https://berkekatranci.com`.
- Gariban Adam, garibanadam ve gariban_adam yalnızca SEO metadata ve `Person`
  şemasındaki alternatif adlarda kullanılır. Görünür içerikte bu adlar için
  bölüm, bağlantı veya ayrı profil sayfası yoktur.
- Eski `/gariban-adam`, `/garibanadam` ve `/gariban_adam` adresleri 308 ile
  ana sayfaya (`/`) yönlenir.
- `garibanadam.com`, `www.garibanadam.com` ve `www.berkekatranci.com`
  istekleri aynı yol ve sorgu parametreleri korunarak ana alana 308 ile yönlenir.
- Sitemap: `/sitemap.xml`; tarama kuralları: `/robots.txt`.
- Vercel Preview/Development dağıtımları `noindex` kullanır. Sitemap bu
  ortamlarda boştur ve robots.txt taramaya kapalıdır.
- Privacy ve Impressum hâlâ yer tutucu içeriklerdir; bu sayfalar `noindex`
  kullanır ve sitemap'e dahil edilmez. Metinler tamamlandığında indeksleme
  kararı ayrıca güncellenebilir.
- Proje yazıları `data/case-studies.ts`, profil bilgileri `data/profile.ts`,
  SEO yardımcıları `lib/site.ts` içindedir.

Elle tamamlanacak adımlar:

1. Bu değişiklikleri mevcut Git deposuna gönderip Vercel'de Production'a
   dağıt. Preview bağlantısı Google'a açılmaz.
2. Vercel projesinin Domains bölümünde `berkekatranci.com` ana alan adını,
   `garibanadam.com` ve kullanacağın `www` adreslerini kontrol et. İkincil
   alanları ana alana kalıcı yönlendiren ayarı koru. Vercel alanı projeye
   ulaştırmadan Next.js yönlendirme kuralı çalışamaz. DNS kayıtlarını
   Vercel'in gösterdiği değerlere göre ayarla; rastgele IP kullanma.
3. Vercel Production ortam değişkenlerinde `SITE_URL` varsa
   `https://berkekatranci.com` olduğundan emin ol. Kodun varsayılanı da budur;
   eklemek zorunlu değildir. Değişiklik yaptıysan yeniden dağıt.
4. Google Search Console'da `berkekatranci.com` için bir Domain mülkü ekle.
   Verilen TXT kaydını DNS sağlayıcına ekleyip doğrula. URL-prefix/HTML
   etiketi yöntemini seçersen yalnızca etiketin `content` değerini Vercel'de
   `GOOGLE_SITE_VERIFICATION` değişkenine ekleyip yeniden dağıt.
5. Search Console > Sitemaps bölümüne
   `https://berkekatranci.com/sitemap.xml` adresini gönder.
6. URL Denetleme aracıyla yalnızca ana sayfayı ve üç proje sayfasını
   (`/projects/weather-forecasting`, `/projects/lane-detection`,
   `/projects/hardware-aware-gpt`) canlı test et. Taramanın açık ve canonical
   adreslerin ana alanda olduğunu doğrulayıp bu dört URL'nin dizine eklenmesini iste.
7. `https://garibanadam.com/projects/lane-detection?ref=test` adresini açarak
   `https://berkekatranci.com/projects/lane-detection?ref=test` adresine kalıcı yönlendiğini
   kontrol et. İstersen yönlenen alan için de ayrı Search Console Domain
   mülkü doğrulayabilirsin; sitemap ana alanda kalmalıdır.
8. LinkedIn, Instagram ve kullanıyorsan GitHub profilinde site bağlantısını
   güncelle. Gariban Adam adını kullandığın profillerde aynı ad ve site
   bağlantısını tutarlı kullan. Gerçek GitHub/demo/video adreslerini
   `data/projects.ts` içine ekle; boş adresler uydurma bağlantıyla doldurulmaz.
9. PageSpeed Insights ile production ana sayfayı mobilde ölç. Search Console
   performans raporunda `Berke Katrancı`, `Berke Katranci`, `gariban adam`,
   `garibanadam` ve `gariban_adam` sorgularının gösterim ve tıklamalarını izle.
   Sıralama veya indekslenme garantisi yoktur; birkaç haftalık veriye göre
   gerçek proje içeriğini geliştirmeye devam et.

Doğrulama kaynakları:

- [Google Search Console doğrulama](https://support.google.com/webmasters/answer/9008080)
- [Sitemap gönderme](https://developers.google.com/search/docs/crawling-indexing/sitemaps/build-sitemap)
- [Canonical adresler](https://developers.google.com/search/docs/crawling-indexing/consolidate-duplicate-urls)

## SEO doğrulaması

Önce `npm run build`, sonra ayrı bir terminalde `npm run start -- --port 3100`
çalıştır. `npm run seo:check` komutu production sunucusunun HTML metadata,
JSON-LD, robots/sitemap, 308 yönlendirme, 404 ve sosyal görsel kontrollerini yapar.
Ana sayfa ve üç proje sayfasının yanı sıra eski ad yollarının ana sayfaya
yönlendiğini ve görünür içerikte yalnızca SEO için tutulan adın bulunmadığını doğrular.
Farklı bir yerel port için `npm run seo:check -- http://localhost:PORT` kullan.
Bu kontrol localhost üzerinde çalışır; DNS ve canlı Vercel ayarlarını doğrulamaz.
