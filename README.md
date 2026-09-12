# 🛒 E-Commerce Public Storefront (Frontend Architecture)

Proyek ini adalah antarmuka publik untuk sistem _e-commerce headless_. Fokus utama repositori ini adalah pada performa antarmuka, optimasi SEO, manajemen _state_, dan eksperimen keamanan siber (_cybersecurity_) di sisi klien.

## 🏗️ Tech Stack & Keputusan Alat

- **Framework:** Next.js - Dipilih untuk memanfaatkan _Server-Side Rendering_ (SSR) agar katalog produk optimal untuk mesin pencari (SEO).
- **Styling:** Tailwind CSS - Untuk iterasi desain komponen UI yang cepat dan konsisten.
- **Backend / API:** Django REST Framework (Repositori Terpisah) - Sistem ini sepenuhnya mengonsumsi API eksternal, memisahkan logika antarmuka secara tegas dari pengelolaan _database_.

## 📚 Dokumentasi Arsitektur

Gambaran menyeluruh mengenai bagaimana antarmuka ini berinteraksi dengan sistem di belakang layar dapat dilihat pada tautan berikut:

- [Diagram Sistem & Alur Komunikasi](./docs/arsitektur.png)
- [Skema Database (ERD)](./docs/database-erd.png)
- [Kontrak API (API Contract)](./docs/api-contract.md)
- [Dokumentasi Brand & Design System](https://docs.google.com/document/d/1hjM3tJmmGOqfzQ64fAyfLbETHWTa8YTRgxkKDqmLxgs/edit?tab=t.0)

## 🚀 Cara Menjalankan di Lokal (Development)

1. Clone repositori ini:
   ```bash
   git clone <url-repo-anda>
   ```
