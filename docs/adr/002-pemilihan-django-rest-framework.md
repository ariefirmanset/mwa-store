# ADR 002: Pemilihan Django REST Framework sebagai Backend

**Tanggal:** 28 September 2026
**Status:** Diterima

## Konteks

Dua frontend terpisah (Next.js untuk toko publik dan React/Vue untuk dashboard admin) membutuhkan satu backend API yang menyimpan data di PostgreSQL. Backend ini harus mendukung autentikasi, pembagian peran (customer dan admin), validasi input, serta format respons dan error yang seragam.

## Keputusan

Kami memutuskan menggunakan **Django REST Framework (DRF)** sebagai backend, dibandingkan membangun API dengan framework yang lebih minimal seperti Express atau FastAPI.

## Alasan (Trade-offs)

1. **Fitur bawaan yang relevan:** ORM, migrasi database, serializer untuk validasi, sistem permission, dan Django Admin sudah tersedia. Tidak perlu merakit dari nol.
2. **Cocok dengan tujuan belajar:** Project ini untuk mempelajari arsitektur 3-layer dan pengelolaan API contract. Dengan DRF, waktu lebih banyak dipakai untuk memahami desain API daripada menyiapkan fondasi.
3. **Dukungan PostgreSQL yang baik:** Tipe seperti `JSONField` (untuk snapshot atribut varian) dan operasi atomik dengan `F()` expression (untuk update stok) tersedia langsung.
4. **Kekurangan:** Struktur Django cukup opinionated dan bisa terasa berat untuk API sekecil ini. Format error default DRF (`{"detail": "..."}`) juga berbeda dari format di API contract, sehingga perlu custom exception handler.
