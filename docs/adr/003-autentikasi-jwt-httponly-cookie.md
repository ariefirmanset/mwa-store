# ADR 003: Autentikasi dengan JWT di httpOnly Cookie

**Tanggal:** 28 September 2026
**Status:** Diterima

## Konteks

Dua frontend (Next.js dan dashboard admin) memakai satu API yang sama. Dibutuhkan cara menyimpan sesi login yang aman dari serangan XSS, dan cukup sederhana untuk project belajar.

## Keputusan

JWT disimpan di **httpOnly cookie**, bukan di `localStorage` maupun response body. Access token berlaku **7 hari** dan **tidak menggunakan refresh token**. Backend mengirim token lewat header `Set-Cookie`, dan frontend tidak perlu mengirim header `Authorization` secara manual.

## Alasan (Trade-offs)

1. **Keamanan terhadap XSS:** JavaScript tidak dapat membaca cookie httpOnly, sehingga token tidak bisa dicuri lewat skrip berbahaya. Token di `localStorage` rentan terhadap hal ini.
2. **Kesederhanaan:** Tanpa refresh token, alur autentikasi lebih sederhana dan lebih mudah dipahami saat belajar.
3. **Kekurangan:** Cookie lintas port atau domain membutuhkan konfigurasi CORS dan `SameSite` yang teliti, dan frontend harus mengirim request dengan `credentials: 'include'`. Untuk pengembangan lokal dengan tiga port berbeda, ini perlu diuji sejak awal.
4. **Kekurangan:** Access token 7 hari tetap berlaku sampai kedaluwarsa jika bocor, dan tanpa refresh token tidak ada cara mencabutnya selain menunggu atau mengganti kunci penandatangan. Untuk skala project ini, risiko tersebut diterima.
5. **Perlindungan CSRF:** Karena memakai cookie, request yang mengubah data perlu dilindungi dari CSRF. Atribut `SameSite=Lax` menjadi lapisan pertama, dan perlu dievaluasi kembali jika domain frontend dan API berbeda saat deployment.
