```markdown
# ADR 001: Pemilihan Framework Frontend untuk Aplikasi Publik

**Tanggal:** 11 Agustus 2026
**Status:** Diterima

## Konteks

Kita membutuhkan _framework_ antarmuka untuk membangun halaman publik _e-commerce_ (Katalog, Detail Produk, Keranjang). Karena ini berhadapan langsung dengan pembeli, aplikasi harus cepat dimuat dan katalog produk harus bisa dibaca oleh mesin pencari (Google).

## Keputusan

Kami memutuskan untuk menggunakan **Next.js** (App Router) dibandingkan React (SPA) murni (seperti Vite/Create React App).

## Alasan (Trade-offs)

1. **Keuntungan SEO:** Halaman detail produk dapat dirender di _server_ (SSR), sehingga metadata langsung tersedia saat halaman dimuat oleh _bot_ pencari.
2. **Kinerja Awal (Initial Load):** _Client_ tidak perlu mengunduh seluruh _bundle_ JavaScript sebelum melihat katalog produk.
3. **Kekurangan:** Membutuhkan lingkungan _server_ (Node.js) untuk berjalan maksimal, tidak bisa sekadar di- _hosting_ statis biasa. Namun, platform seperti Vercel sudah menangani hal ini secara otomatis.
```
