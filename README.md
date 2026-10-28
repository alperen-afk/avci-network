# Avcı Network

Her gün yeni, filler yok.

Türkiye'nin iş, girişim ve teknoloji gündemi. 30 farklı sosyal medya hesabından oluşan içerik üretici ağı, aylık 100 milyon kişiye ulaşır.

## Yapı

```
avci-network/
├── index.html          # Ana site (public)
├── admin/
│   └── index.html      # Yönetici paneli (noindex)
├── logos/              # Partner/müşteri logoları
├── vercel.json         # Deploy konfigürasyonu
├── robots.txt          # Arama motoru kuralları
├── sitemap.xml         # SEO sitemap
└── .gitignore
```

## Routing

- `/` → Ana site (anasayfa, kategoriler, haber detay, Birlikte Çalışalım, hakkında/iletişim/kvkk, arama, yazar)
- `/admin` → Yönetici paneli (dashboard, haberler, AI agent, form başvuruları, hizmetler, ayarlar)

Admin paneli `noindex` ve `nofollow` ile Google'dan gizli. İleride auth eklenecek.

## Deploy

Vercel'e GitHub ile bağlı. `main` branch'e her push otomatik deploy olur.

Üretim: `avcinetwork.com`  
Preview: her PR için otomatik `*.vercel.app`

## Backend (planlanıyor)

- **Supabase** → DB + auth + storage
- **Claude API** → haber üretimi
- **DALL-E 3** → kapak görselleri
- **Make.com** → form webhook
- **Plausible** → analytics

## Kurucu

Alperen Kurtuldu · [hello@avci.network](mailto:hello@avci.network)
