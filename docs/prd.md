# 📋 Product Requirement Document (PRD): MWA Store

**Nama produk:** MWA Store (singkatan dari _Made With Arie_)
**Versi:** 1.0
**Tanggal:** 28 September 2026
**Status:** Draft (menunggu finalisasi bagian bertanda 🖊️)

**Konvensi penamaan:**

| Untuk apa                   | Nama yang dipakai |
| --------------------------- | ----------------- |
| Nama tampilan di UI         | `MWA Store`       |
| Nama repo / folder root     | `mwa-store`       |
| Nama project Django         | `mwa_store`       |
| Nama database               | `mwa_store`       |
| Nama folder frontend publik | `web`             |
| Nama folder dashboard admin | `dashboard`       |

---

## 1. Latar Belakang & Tujuan

Project ini adalah aplikasi e-commerce **satu toko** yang dibangun untuk belajar arsitektur 3-layer: frontend publik, backend API, dan frontend admin yang terpisah, dengan kasus nyata e-commerce sebagai studinya.

**Tujuan utama:**

- Belajar membangun REST API end-to-end dengan Django REST Framework.
- Belajar mengelola satu API contract yang dipakai dua frontend berbeda (Next.js dan React/Vue).
- Belajar merancang dan mendokumentasikan sistem dari nol (PRD, ERD, API contract, ADR) sebelum menulis kode.
- 🖊️ Menjadi portofolio yang bisa didemokan.

**Bukan tujuan project ini:**

- Menjadi e-commerce production dengan transaksi uang sungguhan.
- Menjadi marketplace multi-penjual.

---

## 2. Target Pengguna

| Peran                 | Deskripsi                                          | Kebutuhan Utama                                              |
| --------------------- | -------------------------------------------------- | ------------------------------------------------------------ |
| Customer              | Pembeli yang berbelanja di toko                    | Cari produk, pilih varian, checkout, pantau status pesanan   |
| Admin / Store Manager | Pemilik atau pengelola toko (satu orang/tim kecil) | Kelola produk & stok, proses pesanan, ubah status pengiriman |

> Karena ini project belajar, target pengguna berupa asumsi, bukan hasil riset. Tujuannya menjaga keputusan fitur tetap konsisten.

---

## 3. Ruang Lingkup (Scope)

### ✅ IN SCOPE

**Customer (Next.js, publik)**

- Melihat katalog produk dan pencarian
- Melihat detail produk: varian (ukuran/warna), galeri gambar, harga per varian
- Registrasi dan login
- Kelola keranjang (tambah, ubah qty, hapus)
- Checkout dengan alamat pengiriman
- Melihat riwayat dan detail pesanan, termasuk status tiap barang
- Membatalkan pesanan selama masih `pending`
- menggunakan payment sandbox agar mirip dengan yang asli

**Admin (React/Vue, dashboard)**

- Login khusus admin
- CRUD kategori, produk, varian, dan galeri gambar
- Update harga, stok, dan SKU varian
- Melihat semua pesanan dari semua customer
- Mengubah status **per item** pesanan (`pending` → `processing` → `shipped` → `delivered`, atau `cancelled`)
- Membatalkan item tertentu, misalnya saat stok habis

**Aturan bisnis yang sudah diputuskan**

- Status pengiriman dilacak **per item pesanan** (bukan per unit). Satu baris item dengan `qty` 2 memiliki satu status untuk keduanya.
- Status pesanan (`orders.status`) **dihitung otomatis** dari status item: item `cancelled` diabaikan, selebihnya mengikuti tahap paling awal.
- Harga, nama produk, SKU, dan atribut varian **disimpan sebagai snapshot** di detail pesanan, sehingga invoice lama tidak berubah saat data produk diedit.
- Stok berkurang saat checkout (atomic update) dan **dikembalikan** saat item atau pesanan dibatalkan.
- Jika hanya sebagian `qty` yang perlu dibatalkan, pesanan dibatalkan lalu customer membuat pesanan baru.

### ❌ OUT OF SCOPE

| Fitur                                           | Alasan                                                                                        |
| ----------------------------------------------- | --------------------------------------------------------------------------------------------- |
| Multi-vendor / marketplace                      | Project single-store dengan satu admin. Tidak ada tabel toko/seller                           |
| Pemecahan status per unit (partial fulfillment) | Kasus jarang untuk satu gudang, menambah tabel dan validasi yang rumit. Bisa di-upgrade nanti |
| Nomor resi dan pilihan kurir                    | Status pengiriman cukup lewat status item, tanpa data paket                                   |
| Payment gateway asli                            | Menggunakan sandbox karena project portofolio                                                 |
| Refresh token                                   | Disederhanakan: access token 7 hari dalam httpOnly cookie                                     |
| Notifikasi email / WhatsApp                     | Di luar fokus belajar                                                                         |
| Review dan rating produk                        | Di luar fokus belajar                                                                         |
| Diskon dan voucher                              | Di luar fokus belajar                                                                         |
| Multi-bahasa dan multi-currency                 | Target pengguna satu bahasa. `message` API tetap bahasa Indonesia                             |
| Soft delete untuk order                         | Cukup lewat `status`. Order tidak pernah dihapus                                              |

---

## 4. Batasan Teknis

- **Arsitektur:** 3-layer terpisah: Next.js (publik), Django REST Framework (API), React/Vue (dashboard admin)
- **Database:** PostgreSQL
- **Auth:** JWT di httpOnly cookie, expiry 7 hari, tanpa refresh token. Dua peran utama: `customer` dan `admin`
- **Konvensi bahasa:** field JSON, nilai `status`, dan `code` error dalam bahasa Inggris. `message` dan dokumentasi dalam bahasa Indonesia
- **Format respons:** seragam untuk sukses dan error, didefinisikan di API contract
- **Deployment:** 🖊️ belum diputuskan (lihat roadmap Fase 6, opsional)

---

## 5. Kriteria Sukses

Project dianggap selesai jika:

- [ ] Customer dapat menjalankan alur lengkap: cari produk → pilih varian → keranjang → checkout → lihat status pesanan, tanpa bug yang menghalangi
- [ ] Admin dapat mengelola produk dan memproses pesanan dari dashboard tanpa membuka Django Admin
- [ ] Semua endpoint di `api-contract.md` terimplementasi dan responsnya sesuai kontrak
- [ ] Dua checkout bersamaan pada stok terbatas tidak menghasilkan stok minus
- [ ] Customer tidak dapat mengakses data atau endpoint milik customer lain maupun endpoint admin
- [ ] 🖊️ Tambahkan kriteria pribadi (misalnya: dapat didemokan dalam 5 menit)

---

## 6. Risiko & Asumsi

| Risiko / Asumsi                                                        | Dampak                                  | Mitigasi                                                       |
| ---------------------------------------------------------------------- | --------------------------------------- | -------------------------------------------------------------- |
| Fase perancangan memakan waktu lebih lama dari rencana (sudah 1 bulan) | Development mundur                      | Trello dengan list "Hari Ini", maksimal 2-3 task per hari      |
| Dokumen dan ERD tidak sinkron setelah perubahan                        | Bug karena kontrak dan kode berbeda     | Setiap perubahan ERD langsung diikuti pengecekan API contract  |
| Stok tidak konsisten (lupa dikembalikan saat cancel)                   | Angka stok tidak cocok dengan kenyataan | Task khusus di roadmap, diuji dengan skenario cancel           |
| Race condition pada checkout                                           | Stok minus                              | Atomic update `F()` dan pengujian request bersamaan            |
| Cookie tidak terkirim antar port saat development                      | Login gagal di frontend                 | Uji `credentials: 'include'` dan konfigurasi CORS sejak Fase 1 |
| Scope bertambah di tengah jalan                                        | Project molor                           | Rujuk bagian Out of Scope sebelum menambah fitur               |

**Asumsi:** satu gudang dan satu toko, semua barang dalam satu pesanan diproses oleh admin yang sama, dan tidak ada transaksi uang sungguhan.

---

## 7. Referensi Dokumen Lain

- `api-contract.md`: kontrak API tiap endpoint
- `database-erd`: struktur database (dbdiagram.io)
- `arsitektur.png`: diagram alur sistem 3-layer
- `roadmap.md`: breakdown task dari perancangan sampai post-launch
- `/adr/*.md`: keputusan teknis beserta alasannya
