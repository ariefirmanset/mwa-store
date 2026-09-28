# 📄 Kontrak API (API Contract) v1

**Base URL:** `http://localhost:8000/api/v1`
**Format Respons:** JSON

**Konvensi bahasa:**

- Bahasa Inggris: nama field JSON, nilai `status`, dan `code` error.
- Bahasa Indonesia: `message` dan seluruh isi dokumentasi.

---

## 0. Format Error (berlaku untuk SEMUA endpoint di bawah)

```json
{
  "status": "error",
  "message": "Produk tidak ditemukan",
  "code": "PRODUCT_NOT_FOUND"
}
```

**Daftar skenario error yang harus ditangani:**

| Skenario                                               | HTTP Status | code                        |
| ------------------------------------------------------ | ----------- | --------------------------- |
| Produk tidak ditemukan                                 | 404         | `PRODUCT_NOT_FOUND`         |
| Varian produk tidak ditemukan                          | 404         | `PRODUCT_VARIANT_NOT_FOUND` |
| Order tidak ditemukan                                  | 404         | `ORDER_NOT_FOUND`           |
| Stok tidak cukup saat checkout                         | 400         | `OUT_OF_STOCK`              |
| Order tidak bisa dibatalkan (status bukan `pending`)   | 400         | `ORDER_CANNOT_BE_CANCELLED` |
| Perubahan status item tidak valid                      | 400         | `INVALID_STATUS_TRANSITION` |
| Token tidak valid / expired                            | 401         | `TOKEN_EXPIRED`             |
| Email sudah terdaftar (register)                       | 422         | `EMAIL_ALREADY_EXISTS`      |
| Password salah (login)                                 | 401         | `INVALID_CREDENTIALS`       |
| Body request tidak lengkap / salah format              | 400         | `VALIDATION_ERROR`          |
| User tidak punya akses (customer akses endpoint admin) | 403         | `FORBIDDEN`                 |

Contoh error validasi (banyak field sekaligus):

```json
{
  "status": "error",
  "message": "Validasi gagal",
  "code": "VALIDATION_ERROR",
  "errors": {
    "email": "Format email tidak valid",
    "password": "Password minimal 8 karakter"
  }
}
```

---

## 1. Modul Autentikasi (Auth)

> Menggunakan httpOnly cookie untuk menyimpan JWT (bukan localStorage/body) untuk mengurangi risiko XSS.
> Access token expiry: 7 hari. Tidak menggunakan refresh token (skip untuk simplicity).
> CORS di-setup untuk mengizinkan origin Next.js dan React/Vue dashboard secara eksplisit.

### A. Register

- **Method:** `POST`
- **Endpoint:** `/auth/register/`
- **Body Request:**

```json
{
  "username": "ariefirman",
  "email": "devariefirman@gmail.com",
  "no_hp": "08549684649",
  "password": "User@123"
}
```

- **Respons Sukses (201 Created):**

```json
{
  "code": 201,
  "status": "success",
  "message": "User berhasil dibuat",
  "data": {
    "id": 1,
    "username": "ariefirman",
    "email": "devariefirman@gmail.com",
    "no_hp": "08549684649"
  }
}
```

> Catatan: `password` TIDAK PERNAH dikembalikan dalam response, meskipun sudah di-hash.

### B. Login

- **Method:** `POST`
- **Endpoint:** `/auth/login/`
- **Body Request:**

```json
{
  "email": "devariefirman@gmail.com",
  "password": "User@123"
}
```

- **Respons Sukses (200 OK):**

Token JWT dikirim lewat `Set-Cookie` (httpOnly), TIDAK muncul di body response.

```json
{
  "code": 200,
  "status": "success",
  "message": "Login berhasil",
  "data": {
    "id": 1,
    "username": "ariefirman",
    "email": "devariefirman@gmail.com",
    "role": "customer"
  }
}
```

**Response Header (contoh):**

```
Set-Cookie: access_token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...; HttpOnly; Secure; SameSite=Lax; Max-Age=604800; Path=/
```

> `Max-Age=604800` = 7 hari, sesuai keputusan expiry di atas.

### C. Cara Kirim Token (berlaku di semua endpoint bertanda 🔒 di bawah)

Karena pakai httpOnly cookie, browser otomatis mengirim cookie ini di setiap request ke domain yang sama, sehingga **tidak perlu** header `Authorization` manual dari frontend.

> TODO: pastikan request dari frontend (fetch/axios) menyertakan `credentials: 'include'` supaya cookie ikut terkirim, terutama karena Next.js dan Django kemungkinan beda port saat development.

### D. Perbedaan Akses per Role

| Role                | Bisa akses                                                                                                                                                                                         | Batasan / Scope                                                                  |
| ------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------- |
| guest (belum login) | Lihat daftar produk & pencarian, lihat detail produk & galeri gambar, lihat daftar kategori, registrasi & login                                                                                    | Tidak bisa transaksi atau menyimpan keranjang ke server                          |
| customer            | Kelola keranjang belanja, checkout, lihat riwayat & detail invoice, batalkan order sendiri (status masih pending), update profil & alamat pribadi                                                  | Hanya bisa akses cart/order miliknya sendiri (`WHERE user_id = current_user.id`) |
| admin               | CRUD kategori, CRUD produk + varian + galeri foto, update stok, lihat semua order semua customer, ubah status item order, batalkan item order jika stok kosong, kelola role/status user (opsional) | Akses penuh ke back-office, tidak ada batasan user-scope pada transaksi          |

---

## 2. Modul Produk (Katalog Publik)

Endpoint ini digunakan oleh Next.js untuk menampilkan daftar produk. Tidak memerlukan autentikasi.

### A. Mendapatkan Daftar Produk

- **Method:** `GET`
- **Endpoint:** `/products/`
- **Respons Sukses (200 OK):**

```json
{
  "code": 200,
  "status": "success",
  "data": [
    {
      "id": 1,
      "category_id": 2,
      "name": "Sepatu Lari",
      "description": "Sepatu nyaman untuk lari",
      "thumbnail_url": "/images/sepatu.jpg",
      "price_from": 350000.0,
      "created_at": "2026-09-27T16:05:13.000000Z",
      "updated_at": "2026-09-27T16:05:13.000000Z"
    }
  ]
}
```

> Catatan: `price_from` = harga varian termurah dari produk ini (karena harga sekarang melekat ke varian, bukan produk). `thumbnail_url` diambil dari `product_image` dengan `is_thumbnail = true`.

### B. Mendapatkan Detail Satu Produk

- **Method:** `GET`
- **Endpoint:** `/products/{id}/`
- **Respons Sukses (200 OK):**

```json
{
  "code": 200,
  "status": "success",
  "data": {
    "id": 1,
    "name": "Sepatu Lari",
    "category_id": 2,
    "description": "Sepatu lari ringan dan nyaman.",
    "images": [
      { "image_url": "/images/sepatu-1.jpg", "is_thumbnail": true },
      { "image_url": "/images/sepatu-2.jpg", "is_thumbnail": false }
    ],
    "variants": [
      {
        "id": 1,
        "sku": "PRD-001-42-HITAM",
        "price": 350000.0,
        "qty": 50,
        "attributes": [
          { "name": "Ukuran", "value": "42" },
          { "name": "Warna", "value": "Hitam" }
        ]
      },
      {
        "id": 2,
        "sku": "PRD-001-43-HITAM",
        "price": 355000.0,
        "qty": 20,
        "attributes": [
          { "name": "Ukuran", "value": "43" },
          { "name": "Warna", "value": "Hitam" }
        ]
      }
    ]
  }
}
```

---

## 3. Modul Keranjang (Cart) 🔒

Endpoint ini butuh sesi login aktif (cookie JWT).

### A. Melihat Isi Keranjang

- **Method:** `GET`
- **Endpoint:** `/cart/`
- **Respons Sukses (200 OK):**

```json
{
  "code": 200,
  "status": "success",
  "data": {
    "cart_id": 15,
    "items": [
      {
        "id": 1,
        "product_variant_id": 1,
        "product_name": "Sepatu Lari",
        "variant_attributes": [
          { "name": "Ukuran", "value": "42" },
          { "name": "Warna", "value": "Hitam" }
        ],
        "thumbnail_url": "/images/sepatu-1.jpg",
        "qty": 2,
        "price": 350000.0,
        "subtotal": 700000.0
      }
    ],
    "grand_total": 700000.0
  }
}
```

### B. Menambah Barang ke Keranjang

- **Method:** `POST`
- **Endpoint:** `/cart/items/`
- **Body Request:**

```json
{
  "product_variant_id": 1,
  "qty": 1
}
```

- **Respons Sukses (201 Created):**

```json
{
  "code": 201,
  "status": "success",
  "message": "Barang berhasil ditambahkan ke keranjang"
}
```

> Catatan: kalau `product_variant_id` yang sama sudah ada di cart, `qty` ditambahkan ke item yang sudah ada (bukan bikin row baru), sesuai unique constraint `(cart_id, product_variant_id)`.

### C. Update Qty Item Cart

- **Method:** `PATCH`
- **Endpoint:** `/cart/items/{id}/`
- **Body Request:**

```json
{
  "qty": 3
}
```

- **Respons Sukses (200 OK):**

```json
{
  "code": 200,
  "status": "success",
  "message": "Jumlah barang berhasil diperbarui"
}
```

### D. Hapus Item dari Cart

- **Method:** `DELETE`
- **Endpoint:** `/cart/items/{id}/`
- **Respons Sukses (200 OK):**

```json
{
  "code": 200,
  "status": "success",
  "message": "Barang berhasil dihapus dari keranjang"
}
```

---

## 4. Modul Order / Checkout 🔒

**Nilai valid untuk `status`** (dipakai di level item order maupun level order):

| Nilai        | Keterangan                                                                      |
| ------------ | ------------------------------------------------------------------------------- |
| `pending`    | Baru dibuat, menunggu diproses                                                  |
| `processing` | Sedang disiapkan oleh admin                                                     |
| `shipped`    | Sudah dikirim ke customer                                                       |
| `delivered`  | Diterima customer                                                               |
| `cancelled`  | Dibatalkan (oleh customer saat masih pending, atau oleh admin saat stok kosong) |

**Aturan `orders.status`:**

`orders.status` dihitung otomatis oleh backend dari status item-itemnya, bukan diubah manual. Dihitung ulang setiap kali status item berubah.

1. Item `cancelled` diabaikan.
2. Jika semua item `cancelled`, order `cancelled`.
3. Selain itu, order mengikuti tahap paling awal dari item yang tersisa (urutan: `pending` → `processing` → `shipped` → `delivered`).

Contoh: item 1 `shipped` dan item 2 `pending` menghasilkan order `pending`.

**Aturan perpindahan status item:**

- Status hanya boleh maju sesuai urutan `pending` → `processing` → `shipped` → `delivered`.
- Item boleh diubah ke `cancelled` selama belum `shipped`.
- Item yang sudah `cancelled` atau `delivered` tidak bisa diubah lagi.
- Perubahan di luar aturan ini ditolak dengan error `400 INVALID_STATUS_TRANSITION`.

### A. Checkout (Buat Order dari Isi Cart)

- **Method:** `POST`
- **Endpoint:** `/orders/`
- **Body Request:**

```json
{
  "shipping_address": "Jl Sukamaju 10, Kota Bandung, Jawa Barat, Indonesia",
  "cart_item_ids": [1, 2]
}
```

- **Respons Sukses (201 Created):**

```json
{
  "code": 201,
  "status": "success",
  "data": {
    "id": 1,
    "user_id": 2,
    "invoice": "INV-001",
    "status": "pending",
    "shipping_address": "Jl Sukamaju 10, Kota Bandung, Jawa Barat, Indonesia",
    "total_amount": 700000.0,
    "items": [
      {
        "id": 1,
        "product_variant_id": 1,
        "product_name": "Sepatu Lari",
        "sku": "PRD-001-42-HITAM",
        "variant_attributes": [
          { "name": "Ukuran", "value": "42" },
          { "name": "Warna", "value": "Hitam" }
        ],
        "qty": 2,
        "price_per_unit": 350000.0,
        "subtotal": 700000.0,
        "status": "pending"
      }
    ]
  }
}
```

**Keputusan yang sudah final:**

- Setelah checkout sukses, `cart_items` yang di-checkout otomatis dikosongkan.
- `total_amount` dan `subtotal` dihitung ulang di backend, tidak percaya angka dari frontend.
- Nama produk, SKU, atribut varian, dan harga disimpan sebagai snapshot di `order_details`, sehingga invoice lama tidak berubah walau data produk diedit.
- Stok tidak cukup saat checkout → response error `400 OUT_OF_STOCK` (lihat tabel error di atas).
- Update stok saat checkout menggunakan atomic update (`F()` expression di Django) untuk mencegah race condition saat 2 checkout bersamaan.

### B. Melihat Riwayat Order (Customer)

- **Method:** `GET`
- **Endpoint:** `/orders/`
- **Respons Sukses (200 OK):**

```json
{
  "code": 200,
  "status": "success",
  "data": [
    {
      "id": 1,
      "invoice": "INV-001",
      "status": "pending",
      "total_amount": 700000.0,
      "created_at": "2026-09-27T16:05:13.000000Z"
    }
  ]
}
```

> Catatan: ini list ringkas (tanpa detail item) untuk halaman riwayat. Detail lengkap ada di endpoint C.

### C. Melihat Detail Satu Order

- **Method:** `GET`
- **Endpoint:** `/orders/{id}/`
- **Respons Sukses (200 OK):**

```json
{
  "code": 200,
  "status": "success",
  "data": {
    "id": 1,
    "invoice": "INV-001",
    "status": "pending",
    "shipping_address": "Jl Sukamaju 10, Kota Bandung, Jawa Barat, Indonesia",
    "total_amount": 700000.0,
    "created_at": "2026-09-27T16:05:13.000000Z",
    "items": [
      {
        "id": 1,
        "product_variant_id": 1,
        "product_name": "Sepatu Lari",
        "sku": "PRD-001-42-HITAM",
        "variant_attributes": [
          { "name": "Ukuran", "value": "42" },
          { "name": "Warna", "value": "Hitam" }
        ],
        "qty": 2,
        "price_per_unit": 350000.0,
        "subtotal": 700000.0,
        "status": "pending"
      }
    ]
  }
}
```

> Hanya bisa diakses oleh pemilik order (`user_id` sesuai token). Jika bukan pemiliknya, response `403 FORBIDDEN`.

### D. Batalkan Order (Customer)

- **Method:** `PATCH`
- **Endpoint:** `/orders/{id}/cancel/`
- **Respons Sukses (200 OK):**

```json
{
  "code": 200,
  "status": "success",
  "message": "Order berhasil dibatalkan"
}
```

> Hanya bisa dilakukan jika `status` order masih `pending`. Selain itu, response `400 ORDER_CANNOT_BE_CANCELLED`.
> Saat order dibatalkan, semua item menjadi `cancelled` dan stok varian dikembalikan sesuai `qty` tiap item.
> Customer hanya bisa membatalkan seluruh order. Pembatalan sebagian item dilakukan oleh admin (lihat 5.C).

---

## 5. Modul Admin 🔒 (khusus role admin, dipakai React/Vue Dashboard)

Mengacu ke diagram arsitektur: step 5-6 (Cek Order Masuk) dan step 7-8 (Update Status Order/Produk).

### A. Melihat Semua Order Masuk

- **Method:** `GET`
- **Endpoint:** `/admin/orders/`
- **Respons Sukses (200 OK):**

```json
{
  "code": 200,
  "status": "success",
  "data": [
    {
      "id": 1,
      "invoice": "INV-001",
      "customer_name": "ariefirman",
      "status": "pending",
      "total_amount": 700000.0,
      "created_at": "2026-09-27T16:05:13.000000Z"
    }
  ]
}
```

> Beda dengan endpoint 4.B: yang ini menampilkan order dari **semua customer** (tanpa filter `user_id`), dan menyertakan `customer_name` karena admin perlu tahu order milik siapa.

### B. Melihat Detail Satu Order (Admin)

- **Method:** `GET`
- **Endpoint:** `/admin/orders/{id}/`
- **Respons Sukses (200 OK):**

```json
{
  "code": 200,
  "status": "success",
  "data": {
    "id": 1,
    "invoice": "INV-001",
    "customer_name": "ariefirman",
    "no_hp": "08549684649",
    "status": "pending",
    "shipping_address": "Jl Sukamaju 10, Kota Bandung, Jawa Barat, Indonesia",
    "total_amount": 700000.0,
    "created_at": "2026-09-27T16:05:13.000000Z",
    "items": [
      {
        "id": 1,
        "product_variant_id": 1,
        "product_name": "Sepatu Lari",
        "sku": "PRD-001-42-HITAM",
        "variant_attributes": [
          { "name": "Ukuran", "value": "42" },
          { "name": "Warna", "value": "Hitam" }
        ],
        "qty": 2,
        "price_per_unit": 350000.0,
        "subtotal": 700000.0,
        "status": "pending"
      }
    ]
  }
}
```

> Struktur sama dengan 4.C, ditambah `customer_name` dan `no_hp`. Tidak ada batasan kepemilikan order. `id` item di sini dipakai untuk endpoint 5.C.

### C. Update Status Item Order

- **Method:** `PATCH`
- **Endpoint:** `/admin/orders/{order_id}/items/{item_id}/`
- **Body Request:**

```json
{
  "status": "processing"
}
```

- **Respons Sukses (200 OK):**

```json
{
  "code": 200,
  "status": "success",
  "message": "Status item order berhasil diperbarui"
}
```

> Nilai `status` yang valid dan aturan perpindahannya mengikuti bagian 4. Perubahan yang melanggar aturan ditolak dengan `400 INVALID_STATUS_TRANSITION`.
> Setelah status item berubah, `orders.status` dihitung ulang otomatis oleh backend (admin tidak mengubahnya manual).
> Jika status diubah ke `cancelled`, stok varian dikembalikan sesuai `qty` item tersebut saja, bukan seluruh order.

### D. Update Data Produk & Varian

- **Method:** `PATCH`
- **Endpoint:** `/admin/products/{id}/`
- **Body Request:**

```json
{
  "name": "Sepatu Lari",
  "category_id": 2,
  "description": "Sepatu lari ringan dan nyaman.",
  "variants": [{ "id": 1, "price": 360000.0, "qty": 45 }]
}
```

- **Respons Sukses (200 OK):**

```json
{
  "code": 200,
  "status": "success",
  "message": "Produk berhasil diperbarui"
}
```

> Admin boleh mengubah `name`, `category_id`, `description` di level produk, serta `price`, `qty`, dan `sku` di level varian.
> Karena `sku` bersifat unik, mengganti ke SKU yang sudah dipakai varian lain ditolak dengan `400 VALIDATION_ERROR`.
> Perubahan harga atau SKU tidak memengaruhi order lama, karena order menyimpan snapshot.

### E. Kelola Galeri Gambar Produk

**Tambah gambar**

- **Method:** `POST`
- **Endpoint:** `/admin/products/{id}/images/`
- **Body Request:**

```json
{
  "image_url": "/images/sepatu-3.jpg",
  "is_thumbnail": false
}
```

- **Respons Sukses (201 Created):**

```json
{
  "code": 201,
  "status": "success",
  "message": "Gambar berhasil ditambahkan"
}
```

**Hapus gambar**

- **Method:** `DELETE`
- **Endpoint:** `/admin/products/{id}/images/{image_id}/`
- **Respons Sukses (200 OK):**

```json
{
  "code": 200,
  "status": "success",
  "message": "Gambar berhasil dihapus"
}
```

> Satu produk hanya boleh punya satu gambar dengan `is_thumbnail = true`. Validasinya dilakukan di level aplikasi (Django).
