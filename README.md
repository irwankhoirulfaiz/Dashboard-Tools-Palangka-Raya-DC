# Internal Palangka Raya DC

Tool monitoring internal untuk operasional Sortation Center / Outbound di **Palangka Raya DC (SPX Express)**.

> ⚠️ **Internal use only.** Project ini dibuat untuk kebutuhan operasional internal tim, bukan produk publik. Akses ke data dilindungi Firebase Authentication + Security Rules (`auth != null`) — tanpa akun yang terdaftar, data tidak bisa diakses. Halaman juga di-*noindex* (lihat `robots.txt`) supaya tidak muncul di hasil pencarian.

## Struktur

| File | Fungsi |
|---|---|
| `index.html` | App shell — navigasi tab (Rest Time Monitoring, Performance Bagger, Outbound Monitoring), tiap tab dimuat sebagai iframe |
| `login.html` | Halaman login (Firebase Auth, email/password) |
| `auth-guard.js` | Proteksi akses — redirect ke `login.html` kalau belum login |
| `rest-time.html` | Modul Rest Time Monitoring |
| `performance-bagger.html` | Modul Performance Bagger (leaderboard produktivitas operator) |
| `outbound.html` | Modul Outbound Monitoring (aging, occupancy, log update) |
| `robots.txt` | Blokir seluruh crawler (`Disallow: /`) |

## Tech stack

- HTML/CSS/JS statis (tanpa build step)
- Firebase Authentication (email/password, session persistence per-tab)
- Firebase Realtime Database

## Akses

Akun baru ditambahkan manual oleh admin lewat **Firebase Console → Authentication → Users**. Tidak ada pendaftaran mandiri.

## Catatan keamanan

Config Firebase (`apiKey`, `projectId`, dll.) memang tertanam di kode client-side — ini normal untuk aplikasi Firebase, bukan secret rahasia. Keamanan data sepenuhnya bergantung pada **Firebase Security Rules**, yang membatasi read/write hanya untuk user yang sudah login.
