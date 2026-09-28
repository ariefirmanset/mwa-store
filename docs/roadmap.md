# 🗺️ Roadmap Project MWA Store (3-Layer Architecture)

Panduan urutan kerja dari awal sampai akhir. Task yang terlewat boleh ditambahkan sendiri di fase yang paling sesuai. Dokumen ini kerangka, bukan daftar final yang kaku.

**Stack:** Next.js (publik) · Django REST Framework (API) · React/Vue (dashboard admin) · PostgreSQL

**Terakhir diperbarui:** 28 September 2026

---

## FASE 0: Perancangan ✅ (hampir selesai)

> Tujuan fase ini: dokumen dan ERD saling sinkron sebelum coding besar-besaran.

**Sudah selesai**

- [x] API contract disinkronkan dengan ERD varian produk (`product_variant_id`)
- [x] Response Register tanpa password, `no_hp` sebagai string
- [x] Keputusan auth: JWT di httpOnly cookie, 7 hari, tanpa refresh token
- [x] Daftar status: `pending`, `processing`, `shipped`, `delivered`, `cancelled`
- [x] Keputusan status per item (Level 2), `orders.status` dihitung otomatis
- [x] Aturan perpindahan status item dan pengembalian stok saat cancel
- [x] Snapshot nama produk, SKU, atribut, dan harga di `order_details`
- [x] Konvensi bahasa (field/status/code Inggris, message Indonesia)
- [x] PRD terisi
- [x] Update DBML: hapus `order_detail_fulfillments`, tambah `status` di `order_details`
- [x] Update DBML: `variant_attributes` jadi `jsonb` (atau putuskan tetap `varchar`)
- [x] Putuskan di PRD: ada simulasi pembayaran atau tidak
- [x] ADR: pemilihan Django REST Framework
- [x] ADR: strategi auth (httpOnly cookie)
- [x] ADR: status per item dengan status order turunan
- [x] ADR: strategi varian produk

**Masih tersisa**

- [ ] ADR: message API berbahasa Indonesia
- [ ] Simpan DBML sebagai `docs/database.dbml` di repo, ekspor ulang PNG

**Keluar dari fase ini kalau:** DBML, api-contract, dan PRD tidak lagi saling bertentangan.

---

## FASE 1: Environment & Fondasi

> Siapkan kerangka project supaya tidak bongkar-pasang struktur di tengah jalan.

**Hari 1**

- [ ] Buat repo `mwa-store` dengan folder `docs/`, `backend/`, `web/`, `dashboard/` (nama sesuai konvensi di PRD)
- [ ] Setup `.gitignore` per project (pastikan `.env` tidak ikut ter-commit)
- [ ] Buat `README.md` di root: nama produk, cara menjalankan, tautan ke `docs/`
- [ ] Setup project Django REST Framework dan dependencies awal (djangorestframework, djangorestframework-simplejwt, psycopg2, django-cors-headers)
- [ ] Setup koneksi PostgreSQL, buat `.env.example`
- [ ] Susun struktur folder Django (apps per modul: `users`, `products`, `cart`, `orders`)

**Hari 2**

- [ ] Migrasi: `users`, `roles`
- [ ] Migrasi: `categories`, `products`, `products_variants`
- [ ] Migrasi: `products_attributes`, `product_image`
- [ ] Migrasi: `cart`, `cart_items` (termasuk unique `(cart_id, product_variant_id)`)
- [ ] Migrasi: `orders`, `order_details`
- [ ] Definisikan status sebagai `TextChoices` di Django
- [ ] Setup Django Admin untuk cek data manual
- [ ] Seed data awal: role `customer` dan `admin`, beberapa kategori dan produk contoh

**Hari 3**

- [ ] Setup CORS dan cookie (`SameSite`, `credentials`) untuk origin Next.js dan dashboard
- [ ] Setup project Next.js App Router
- [ ] Setup project React/Vue untuk dashboard
- [ ] Custom exception handler DRF agar format error sesuai `api-contract.md`
- [ ] Buat endpoint health check dan tes dari kedua frontend

**Keluar dari fase ini kalau:** ketiga project jalan bersamaan di local, Django terhubung ke database, dan request dari Next.js ke Django berhasil tanpa error CORS.

---

## FASE 2: Development Backend (Django REST Framework)

### Modul Auth

**Hari 4**

- [ ] Serializer dan endpoint Register
- [ ] Serializer dan endpoint Login (set JWT lewat httpOnly cookie)
- [ ] Custom authentication class yang membaca JWT dari cookie
- [ ] Permission class per role (guest, customer, admin)

**Hari 5**

- [ ] Endpoint Logout (hapus cookie)
- [ ] Uji manual dengan Postman: register → login → akses endpoint terproteksi → akses endpoint admin sebagai customer (harus ditolak)

### Modul Produk

**Hari 6**

- [ ] Endpoint list produk (dengan `price_from` dan `thumbnail_url`)
- [ ] Endpoint detail produk (dengan `images` dan `variants` beserta atribut)
- [ ] Endpoint list kategori

**Hari 7**

- [ ] Uji manual endpoint produk sesuai kontrak
- [ ] Optimasi query (`select_related` dan `prefetch_related`) agar tidak N+1

### Modul Cart

**Hari 8**

- [ ] Endpoint lihat isi cart
- [ ] Endpoint tambah item (jika varian sudah ada, qty ditambahkan)
- [ ] Endpoint update qty item
- [ ] Endpoint hapus item

**Hari 9**

- [ ] Validasi qty tidak melebihi stok varian
- [ ] Uji manual modul cart, termasuk kasus item yang sama ditambah dua kali

### Modul Order / Checkout

**Hari 10**

- [ ] Endpoint checkout: ambil item cart, hitung ulang total di backend
- [ ] Simpan snapshot (nama produk, SKU, atribut, harga) ke `order_details`
- [ ] Kurangi stok dengan atomic update (`F()` expression), dibungkus transaksi database
- [ ] Buat nomor invoice unik
- [ ] Kosongkan item cart yang di-checkout

**Hari 11**

- [ ] Endpoint riwayat order customer (list ringkas)
- [ ] Endpoint detail order (validasi kepemilikan, `403` jika bukan pemilik)
- [ ] Fungsi hitung `orders.status` dari status item (aturan di api-contract bagian 4)

**Hari 12**

- [ ] Endpoint batalkan order (hanya jika `pending`): semua item jadi `cancelled`, stok dikembalikan
- [ ] Uji checkout end-to-end: cart terisi sampai order tercatat
- [ ] Uji race condition: dua checkout bersamaan pada stok terbatas

### Modul Admin

**Hari 13**

- [ ] Endpoint admin: list semua order
- [ ] Endpoint admin: detail order (dengan `customer_name`, `no_hp`)
- [ ] Endpoint update status item order

**Hari 14**

- [ ] Validasi perpindahan status item (`INVALID_STATUS_TRANSITION`)
- [ ] Kembalikan stok sebesar `qty` item saat item di-`cancelled`
- [ ] Panggil ulang hitung `orders.status` setiap status item berubah
- [ ] Uji skenario campuran: satu item `shipped`, satu `cancelled`, cek status order

**Hari 15**

- [ ] Endpoint admin: update produk dan varian (termasuk validasi SKU unik)
- [ ] Endpoint admin: tambah dan hapus gambar produk (validasi satu thumbnail per varian)
- [ ] Endpoint admin: CRUD kategori
- [ ] Review konsistensi format error di semua modul

**Keluar dari fase ini kalau:** semua endpoint di `api-contract.md` berjalan dan responsnya sesuai kontrak saat diuji lewat Postman.

---

## FASE 3: Frontend Next.js (Publik)

**Hari 16**

- [ ] Layout dasar (navbar, footer)
- [ ] Halaman katalog produk (SSR)

**Hari 17**

- [ ] Halaman detail produk (pilih varian, galeri gambar)
- [ ] Komponen kartu produk yang reusable

**Hari 18**

- [ ] Halaman register dan login (cookie-based)
- [ ] Proteksi halaman yang butuh login

**Hari 19**

- [ ] Halaman cart (lihat, ubah qty, hapus)
- [ ] State management cart

**Hari 20**

- [ ] Halaman checkout (alamat, review order)
- [ ] Tangani respons sukses dan error checkout (termasuk `OUT_OF_STOCK`)

**Hari 21**

- [ ] Halaman riwayat order dan detail order (tampilkan status per item)
- [ ] Tombol batalkan order (hanya saat `pending`)
- [ ] Uji manual alur: katalog → cart → checkout → riwayat

**Keluar dari fase ini kalau:** customer bisa menyelesaikan alur dari katalog sampai melihat status pesanan tanpa error di console.

---

## FASE 4: Frontend Dashboard Admin (React/Vue)

**Hari 22**

- [ ] Layout dasar dan halaman login admin
- [ ] Proteksi halaman berdasarkan role admin

**Hari 23**

- [ ] Halaman list order masuk
- [ ] Halaman detail order dengan daftar item

**Hari 24**

- [ ] Kontrol ubah status per item (hanya tampilkan pilihan yang valid)
- [ ] Tampilkan status order yang terhitung otomatis

**Hari 25**

- [ ] Halaman CRUD produk, varian, dan galeri gambar
- [ ] Halaman update stok
- [ ] Uji alur admin: lihat order → proses item → cancel satu item → cek status order

**Keluar dari fase ini kalau:** admin bisa mengelola produk dan memproses pesanan dari dashboard tanpa membuka Django Admin.

---

## FASE 5: Testing Terintegrasi

**Hari 26**

- [ ] Uji lintas layer: order dibuat di Next.js, muncul di dashboard admin
- [ ] Uji CORS dan cookie dengan tiga port berjalan bersamaan
- [ ] Uji kasus stok: cancel item mengembalikan stok yang benar

**Hari 27**

- [ ] Uji edge case: stok habis saat checkout, cookie expired di tengah sesi, input tidak valid
- [ ] Uji hak akses: customer mengakses endpoint admin dan order milik orang lain (harus ditolak)
- [ ] Uji perubahan harga/SKU produk tidak mengubah invoice lama (snapshot)

**Keluar dari fase ini kalau:** tidak ada bug penghalang di alur utama dan kasus penting menghasilkan pesan error yang jelas.

---

## FASE 6: Deployment (opsional)

> Masuk fase ini hanya jika sudah diputuskan untuk deploy. Kalau cukup di local sebagai portofolio, lanjut ke Fase 7.

- [ ] Putuskan hosting tiap layer
- [ ] Siapkan environment variable production
- [ ] Siapkan database production
- [ ] Sesuaikan CORS dan cookie untuk domain production (`Secure`, `SameSite`)
- [ ] Deploy backend dan jalankan migrasi
- [ ] Deploy Next.js dan dashboard, sambungkan ke API production
- [ ] Uji end-to-end di production

---

## FASE 7: Post-Launch

- [ ] Update README tiap repo (cara install dan menjalankan)
- [ ] Rapikan semua ADR di `/docs/adr`
- [ ] Catatan retrospektif: apa yang dipelajari, apa yang akan dilakukan berbeda
- [ ] Screenshot atau video demo alur utama

---

## Cara pakai dokumen ini

- Kriteria "keluar dari fase ini kalau..." dipakai sebagai patokan pindah fase, bukan syarat semua checklist tercentang.
- Nomor hari itu estimasi, bukan tenggat kaku. Kalau meleset, geser saja, yang penting urutannya tetap logis.
- Task baru yang muncul saat jalan ditambahkan di fase yang paling sesuai, jangan ditumpuk di akhir.
- Jika ada keputusan yang mengubah scope, perbarui PRD lebih dulu, baru dokumen lain.
