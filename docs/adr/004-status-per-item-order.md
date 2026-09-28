# ADR 004: Status per Item Order dengan Status Order Turunan

**Tanggal:** 28 September 2026
**Status:** Diterima

## Konteks

Satu order dapat berisi beberapa barang. Dalam praktiknya, tidak selalu semua barang bernasib sama: misalnya sepatu sudah dikirim, sedangkan kaos kaki dibatalkan karena stok habis. Kami perlu memutuskan di level mana status dilacak.

Tiga level dipertimbangkan:

1. **Per order:** satu status untuk seluruh order.
2. **Per item order:** tiap baris `order_details` punya status sendiri.
3. **Per unit:** satu baris dengan `qty` 2 dapat dipecah (1 unit `shipped`, 1 unit `processing`), membutuhkan tabel tambahan.

## Keputusan

Kami memilih **level 2**: status dilacak di tabel `order_details` (per item). Kolom `orders.status` tetap ada, tetapi **dihitung otomatis** oleh backend dari status item-itemnya, bukan diubah manual oleh admin.

Aturan penghitungan:

1. Item `cancelled` diabaikan.
2. Jika semua item `cancelled`, order menjadi `cancelled`.
3. Selain itu, order mengikuti tahap paling awal dari item yang tersisa, dengan urutan `pending` → `processing` → `shipped` → `delivered`.

Aturan perpindahan status item: hanya boleh maju sesuai urutan tersebut, boleh menjadi `cancelled` selama belum `shipped`, dan item yang sudah `cancelled` atau `delivered` tidak dapat diubah lagi. Saat item dibatalkan, stok varian dikembalikan sebesar `qty` item tersebut.

## Alasan (Trade-offs)

1. **Sesuai kebutuhan nyata:** Kasus "satu jenis barang habis, yang lain lanjut" realistis untuk satu toko. Kasus memecah satu jenis barang per unit jarang terjadi untuk satu gudang.
2. **Lebih sederhana dari level 3:** Level 3 membutuhkan tabel tambahan, validasi bahwa total `qty` pecahan sama dengan `qty` item, dan UI admin untuk memecah pengiriman. Kompleksitas itu tidak sebanding dengan manfaatnya di project ini.
3. **Lebih ekspresif dari level 1:** Level 1 tidak bisa menggambarkan pembatalan sebagian barang.
4. **Satu sumber kebenaran:** Dengan `orders.status` sebagai turunan, status order tidak bisa bertentangan dengan status item-itemnya.
5. **Kekurangan:** Satu baris item dengan `qty` lebih dari 1 hanya memiliki satu status. Jika hanya sebagian `qty` yang perlu dibatalkan, order dibatalkan lalu customer membuat order baru.
6. **Kekurangan:** Status order harus dihitung ulang setiap kali status item berubah. Jalur kode yang lupa memanggil perhitungan ini akan membuat status order tidak sinkron, sehingga perlu diuji khusus.
7. **Jalur upgrade:** Jika suatu saat level 3 dibutuhkan, tabel pecahan status per unit dapat ditambahkan tanpa mengubah struktur `orders` dan `order_details`.
