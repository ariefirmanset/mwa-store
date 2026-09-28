# ADR 005: Strategi Varian Produk dan Snapshot pada Order

**Tanggal:** 28 September 2026
**Status:** Diterima

## Konteks

Satu produk (misalnya "Sepatu Lari") dapat tersedia dalam beberapa varian dengan atribut berbeda (ukuran, warna), dan tiap varian memiliki SKU, harga, dan stok sendiri. Desain awal menyimpan `sku`, `price`, dan `qty` langsung di tabel `products`, yang tidak dapat menggambarkan kasus ini.

Selain itu, invoice harus menjadi catatan historis yang tidak berubah walaupun data produk kemudian diedit atau dihapus.

## Keputusan

1. **Produk dan varian dipisah.** Tabel `products` hanya menyimpan data umum (nama, deskripsi, kategori). Tabel `products_variants` menyimpan `sku`, `price`, dan `qty`.
2. **Atribut varian disimpan di tabel terpisah** (`products_attributes`) dengan pasangan nama dan nilai (misalnya `Ukuran: 42`, `Warna: Hitam`).
3. **Gambar terhubung ke varian** lewat tabel `product_image`, dengan penanda `is_thumbnail` dan urutan tampil.
4. **Cart dan order mereferensikan `product_variant_id`**, bukan `product_id`.
5. **Order menyimpan snapshot.** Tabel `order_details` menyalin `product_name`, `sku`, `variant_attributes` (bertipe `jsonb`), dan `price_per_unit` pada saat checkout.

## Alasan (Trade-offs)

1. **Sesuai kenyataan:** Yang dibeli customer adalah varian tertentu (sepatu ukuran 42 hitam), bukan produk generik. Stok dan harga memang melekat pada varian.
2. **Atribut fleksibel:** Dengan tabel atribut terpisah, produk baru dapat memiliki atribut berbeda (misalnya "Bahan") tanpa menambah kolom.
3. **Invoice tetap utuh:** Dengan snapshot, admin bebas mengubah harga atau SKU tanpa merusak riwayat, dan invoice lama tetap valid meskipun varian dihapus. Ini juga memungkinkan SKU diedit karena tidak ada order lama yang bergantung pada nilai SKU di master data.
4. **Denormalisasi yang disengaja:** Data di `order_details` tampak duplikat dari master produk. Ini disengaja, karena data transaksional harus beku.
5. **Kekurangan:** Query katalog menjadi lebih kompleks. Daftar produk perlu menghitung `price_from` (harga varian termurah) dan mengambil thumbnail lewat join, sehingga perlu memperhatikan optimasi query (`select_related`, `prefetch_related`) agar tidak terjadi N+1.
6. **Kekurangan:** Satu produk hanya boleh memiliki satu gambar thumbnail, dan aturan ini tidak dapat dipaksakan oleh DBML biasa. Validasi dilakukan di level aplikasi (Django).
7. **Kekurangan:** `variant_attributes` di order disimpan sebagai `jsonb`, sehingga tidak dapat diquery per atribut secara relasional. Ini diterima karena data snapshot hanya dibaca, tidak dicari.
