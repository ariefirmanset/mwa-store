# 📄 Kontrak API (API Contract) v1

**Base URL:** `http://localhost:8000/api/v1`
**Format Respons:** JSON

---

## 1. Modul Produk (Katalog Publik)

Endpoint ini digunakan oleh Next.js untuk menampilkan daftar produk di halaman utama. Tidak memerlukan autentikasi.

### A. Mendapatkan Daftar Produk

- **Method:** `GET`
- **Endpoint:** `/products/`
- **Respons Sukses (200 OK):**

```json
{
  "status": "success",
  "data": [
    {
      "id": 1,
      "sku": "PRD-001",
      "name": "Sepatu Lari",
      "price": 350000.0,
      "image_url": "/images/sepatu.jpg",
      "category_id": 2
    }
  ]
}
```

### B. Mendapatkan Detail Satu Produk

- **Method:** `GET`
- **Endpoint:** `/products/{id}/`
- **Respons Sukses (200 OK):**

```json
{
  "status": "success",
  "data": {
    "id": 1,
    "sku": "PRD-001",
    "name": "Sepatu Lari",
    "price": 350000.0,
    "qty": 50,
    "description": "Sepatu lari ringan dan nyaman.",
    "image_url": "/images/sepatu.jpg"
  }
}
```

### 2. Modul Keranjang (cart)

Endpoint ini membutuhkan token JWT di Header untuk memvalidasi sesi pengguna.

### A. Melihat Isi Keranjang

- **Method :** `GET`
- **Endpoint :** `/cart/`
- **Headers :** `Authorization: Bearer <token>`
- **Respons Sukses (200 OK):**

```json
{
  "status": "success",
  "data": {
    "cart_id": 15,
    "items": [
      {
        "product_id": 1,
        "name": "Sepatu Lari",
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

- **Method :** `POST`
- **Endpoint :** `/cart/items/`
- **Headers :** `Authorized: Bearer <token>`
- **Body Request:**

```json
{
  "product_id": 1,
  "qty": 1
}
```

- **Respons Sukses (201 Created):**

```json
{
  "status": "success",
  "message": "Barang berhasil ditambahkan ke keranjang"
}
```
