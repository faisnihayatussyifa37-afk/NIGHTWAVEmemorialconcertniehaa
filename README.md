# NIGHTWAVE FESTIVAL 2027 — EventWave Offline Website

Website promosi dan informasi konser/event modern, interaktif, responsif, dan **100% Offline-First**. 

Website ini dirancang secara khusus untuk berjalan langsung dari komputer lokal dengan membuka file `index.html` (cukup double-click) tanpa membutuhkan server backend, koneksi internet, Google Fonts, remote CDN, ataupun remote image API apa pun.

Festival ini menghadirkan **Sheila On 7**, **Hindia**, **HiVi!**, dan **Nadin Amizah** (Headliner Malam Puncak 13 Juni 2027 Spesial Ulang Tahun).

---

## 🚀 Cara Menjalankan Website

1. Buka folder proyek ini di File Explorer perangkat Anda.
2. Cari file `index.html`.
3. **Double-click file `index.html`** untuk membukanya di browser favorit Anda (Chrome, Edge, Firefox, Safari).
4. Website akan langsung tampil dan seluruh fitur interaktifnya (modal artis, simulasi tiket, filter jadwal 3 hari, galeri lightbox, FAQ accordion, theme toggle, dan dual countdown timer) berfungsi 100% tanpa internet.

---

## 📁 Struktur Direktori

```text
night wave/
├── index.html                  # Struktur markup semantik HTML5
├── README.md                   # Dokumentasi lengkap panduan proyek
├── PRD-Website-Konser-Event-Offline.md  # Dokumen spesifikasi PRD asli
├── css/
│   └── style.css               # Desain token, dark/light theme, dual countdown & animasi
├── js/
│   └── script.js               # Logika Vanilla JavaScript modular (Dual Countdowns, 3-Day Schedule)
└── assets/
    ├── images/                 # Seluruh aset gambar lokal
    │   ├── hero.jpg            # Foto panggung spektakuler konser
    │   ├── about.jpg           # Suasana penonton dan festival grounds
    │   ├── venue.jpg           # GBK Senayan Arena
    │   ├── artist-01.jpg       # Foto Hindia
    │   ├── artist-02.jpg       # Foto Nadin Amizah
    │   ├── artist-03.jpg       # Foto Sheila On 7
    │   ├── artist-05.jpg       # Foto HiVi!
    │   └── gallery/            # Galeri foto momen konser
    ├── icons/                  # Folder ikon lokal
    └── fonts/                  # Folder font lokal
```

---

## 🛠️ Panduan Kustomisasi & Edit Konten

### 1. Cara Mengganti Tanggal Dual Countdown
Buka file `js/script.js` pada fungsi `initCountdown()` (sekitar baris 110):
```javascript
// Countdown 1: Mulai Festival (11 Juni 2027)
const targetDate1 = new Date("2027-06-11T15:00:00").getTime();

// Countdown 2: Malam Puncak Festival (13 Juni 2027)
const targetDate2 = new Date("2027-06-13T18:00:00").getTime();
```

### 2. Cara Mengganti Data Artis & Headliner
Buka file `js/script.js` pada variabel `ARTISTS_DATA` (sekitar baris 130):
```javascript
const ARTISTS_DATA = [
  {
    id: "hindia",
    name: "Hindia",
    isHeadliner: true,
    day: "Day 1 (24 Okt)",
    genre: "Indie / Alternative",
    category: "indie",
    stage: "Main Stage (Wave Arena)",
    time: "21:30 - 23:00 WIB",
    image: "assets/images/artist-01.jpg",
    bio: "Biografi singkat artis...",
    topTracks: ["Evaluasi", "Rumah Ke Rumah", "Secukupnya", "Cincin", "Mata Air"]
  },
  // ...
];
```

### 3. Cara Mengganti Rundown Jadwal (Schedule)
Buka file `js/script.js` pada variabel `SCHEDULE_DATA` (sekitar baris 260):
```javascript
const SCHEDULE_DATA = {
  day1: [
    { time: "21:30 - 23:00", artist: "HINDIA (HEADLINER)", stage: "Main Stage (Wave Arena)", stageType: "main", desc: "..." },
  ],
  day2: [
    { time: "21:30 - 23:00", artist: "NADIN AMIZAH (HEADLINER)", stage: "Main Stage (Wave Arena)", stageType: "main", desc: "..." },
  ]
};
```

### 4. Cara Mengganti Harga & Kategori Tiket
Buka file `js/script.js` pada `TICKET_PRICES`:
```javascript
const TICKET_PRICES = {
  ga: 350000,
  vip: 750000,
  vvip: 1250000
};
```
Dan sesuaikan label teksnya pada file `index.html` di bagian `<section id="tickets">`.

### 5. Cara Mengganti Gambar
Anda cukup menimpa file gambar di dalam folder `assets/images/` dengan gambar baru menggunakan nama file yang sama (format `.jpg` atau `.png`).

---

## ✨ Fitur-Fitur Interaktif Offline

1. **Sticky Navigation & Scroll Spy**: Indikator menu navbar aktif mengikuti posisi scroll halaman.
2. **Theme Switcher**: Pilihan tema Dark Mode & Light Mode tersimpan rapi di browser lokal (`localStorage`).
3. **Live Countdown Timer**: Penghitungan mundur akurat hari, jam, menit, dan detik.
4. **Lineup Filter & Artist Modal**: Pengelompokan genre serta modal pop-up biodata dan tracklist populer saat kartu artis diklik.
5. **Simulasi Pemesanan Tiket**: Form validasi interaktif dengan kalkulasi otomatis dan output E-Ticket simulasi lengkap dengan kode booking dan QR Code.
6. **Denah Panggung Interaktif (Offline Vector Map)**: Peta denah arena GBK Senayan berbasis SVG yang bersih dan informatif tanpa memerlukan koneksi Google Maps.
7. **Lightbox Galeri**: Galeri foto yang dapat diperbesar fullscreen dengan navigasi Next, Prev, dan keyboard shortcut (Arrow / Esc).
8. **FAQ Accordion**: Pertanyaan umum yang dapat dibuka-tutup dengan transisi halus.
9. **Toast Notifications & Back to Top**: Notifikasi interaktif dan tombol kembali ke atas otomatis.

---

## 🔒 Jaminan 100% Offline

Website ini telah diverifikasi:
- **0 Remote Link / CDN**: Tidak ada `@import`, `<link href="http...">`, atau `<script src="http...">`.
- **Portabilitas Tinggi**: Seluruh folder dapat disalin ke komputer, flashdisk, atau perangkat lain dan dapat langsung dibuka seketika.
