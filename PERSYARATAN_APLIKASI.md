# 📱 Spesifikasi Produk: Aplikasi Konsultasi Obat & E-Commerce

## Daftar Isi

- [1. Gambaran Umum](#1-gambaran-umum)
- [2. Fitur Utama](#2-fitur-utama)
  - [2.1 Konsultasi Berbasis Gejala](#21-konsultasi-berbasis-gejala)
  - [2.2 Mesin Rekomendasi Obat](#22-mesin-rekomendasi-obat)
  - [2.3 Katalog Produk & Proses Pembelian](#23-katalog-produk--proses-pembelian)
  - [2.4 Sistem Pembayaran](#24-sistem-pembayaran)
  - [2.5 Pengiriman & Logistik](#25-pengiriman--logistik)
- [3. Alur Pengguna](#3-alur-pengguna)
- [4. Kebutuhan Fungsional](#4-kebutuhan-fungsional)
- [5. Kebutuhan Non-Fungsional](#5-kebutuhan-non-fungsional)
- [6. Pengembangan di Masa Depan (Opsional)](#6-pengembangan-di-masa-depan-opsional)
- [7. Pertimbangan Teknologi](#7-pertimbangan-teknologi)
- [8. Perubahan Versi 2 (V2)](#8-perubahan-versi-2-v2)
  - [8.1 Konsultasi Berbasis Gejala — Penambahan Input Teks Bebas](#81-konsultasi-berbasis-gejala--penambahan-input-teks-bebas)
  - [8.2 Rekomendasi Obat — Cakupan Harga & Kategori Obat](#82-rekomendasi-obat--cakupan-harga--kategori-obat)
  - [8.3 Katalog Produk — Informasi Cara Penggunaan Obat](#83-katalog-produk--informasi-cara-penggunaan-obat)
  - [8.4 Pengiriman & Logistik — Peta pada Input Alamat](#84-pengiriman--logistik--peta-pada-input-alamat)
  - [8.5 Alur Pengguna — Profil Tersimpan & Konsultasi Dokter](#85-alur-pengguna--profil-tersimpan--konsultasi-dokter)
  - [8.6 Pengembangan Masa Depan — Klarifikasi Fitur Penting](#86-pengembangan-masa-depan--klarifikasi-fitur-penting)
  - [Ringkasan Perubahan V1 → V2](#ringkasan-perubahan-v1--v2)
- [9. Ide Pengembangan Masa Depan (V3+)](#9-ide-pengembangan-masa-depan-v3)
  - [9.1 Konsultasi Gejala Berbasis AI](#91-konsultasi-gejala-berbasis-ai)

---

## 1. Gambaran Umum
Aplikasi mobile/web yang memungkinkan pengguna untuk:
- Menginput gejala dan data kesehatan pribadi  
- Menerima rekomendasi obat yang disesuaikan dengan profil mereka  
- Membeli obat yang direkomendasikan langsung di dalam platform  
- Memilih metode pembayaran dan opsi pengiriman  

**Target pasar:** Indonesia  

---

## 2. Fitur Utama

### 2.1 Konsultasi Berbasis Gejala

**Deskripsi:**  
Pengguna menginput keluhan kesehatan untuk mendapatkan rekomendasi obat.

**Data yang Harus Diinput Pengguna:**
- Gejala / keluhan (teks bebas atau kategori pilihan)  
- Usia  
- Berat badan  
- Alergi obat (pilihan atau teks bebas)  

**Aturan Validasi:**
- Usia dan berat badan wajib diisi  
- Harus mengonfirmasi alergi (meskipun “tidak ada”)  
- Rekomendasi tidak akan ditampilkan jika data belum lengkap  

---

### 2.2 Mesin Rekomendasi Obat

**Deskripsi:**  
Sistem menghasilkan saran obat berdasarkan data pengguna.

**Logika:**
- Mengelompokkan pengguna berdasarkan:
  - Kelompok usia (anak, remaja, dewasa, lansia)  
  - Rentang berat badan  
- Mencocokkan gejala dengan pengobatan umum  
- Mengambil obat yang paling sering digunakan di Indonesia (melalui API atau database)  
- Menyaring obat yang berpotensi menyebabkan alergi  

**Output:**
- Daftar rekomendasi obat:
  - Nama obat  
  - Panduan dosis (dasar)  
  - Cara penggunaan  
  - Peringatan (jika ada)  

**Batasan:**
- Rekomendasi harus relevan untuk Indonesia  
- Sertakan disclaimer: “Bukan pengganti saran medis profesional”  

---

### 2.3 Katalog Produk & Proses Pembelian

**Deskripsi:**  
Pengguna dapat langsung membeli obat yang direkomendasikan.

**Alur:**
1. Menampilkan produk yang direkomendasikan  
2. “Beli Sekarang” atau “Tambah ke Keranjang”  
3. Lanjut ke checkout  

**Informasi Produk:**
- Nama produk  
- Harga  
- Ketersediaan  
- Deskripsi  
- Status stok  

---

### 2.4 Sistem Pembayaran

**Metode Pembayaran yang Didukung:**
- Kartu kredit  
- Kartu debit  
- QRIS  
- GoPay  
- OVO  
- Dompet digital lainnya  

**Kebutuhan:**
- Integrasi payment gateway yang aman  
- Konfirmasi pembayaran secara real-time  
- Penanganan pembayaran gagal + opsi coba lagi  

---

### 2.5 Pengiriman & Logistik

**Deskripsi:**  
Pengguna memilih metode pengiriman setelah pembayaran.

**Opsi Pengiriman:**
- Kurir standar:
  - JNE  
  - J&T  
  - SiCepat  
- Pengiriman cepat:
  - Gojek  
  - Grab  

**Fitur:**
- Perhitungan ongkir  
- Estimasi waktu pengiriman  
- Pelacakan real-time (jika didukung API kurir)  

---

## 3. Alur Pengguna

1. Pengguna membuka aplikasi  
2. Menginput gejala + data pribadi  
3. Mendapatkan rekomendasi obat  
4. Memilih produk  
5. Lanjut ke checkout  
6. Memilih metode pembayaran  
7. Menyelesaikan pembayaran  
8. Memilih opsi pengiriman  
9. Mendapatkan konfirmasi dan pelacakan pesanan  

---

## 4. Kebutuhan Fungsional

- Validasi form input pengguna  
- Mesin rekomendasi (berbasis aturan atau API)  
- Integrasi dengan:
  - Database obat atau pencarian berbasis Google  
  - Payment gateway (khusus Indonesia)  
  - API kurir/logistik  
- Manajemen sesi pengguna  
- Sistem manajemen pesanan  

---

## 5. Kebutuhan Non-Fungsional

- **Keamanan:** Melindungi data pribadi pengguna (PII)  
- **Performa:** Rekomendasi muncul < 3 detik  
- **Skalabilitas:** Mendukung pertumbuhan (awal menggunakan SQLite; dapat di-upgrade ke PostgreSQL di masa depan)  
- **Lokalisasi:** Mendukung Bahasa Indonesia  
- **Kepatuhan:** Menyertakan disclaimer medis dan mengikuti regulasi lokal  

---

## 6. Pengembangan di Masa Depan (Opsional)

- Pemeriksa gejala berbasis AI  
- Chat dengan apoteker/dokter berlisensi  
- Profil pengguna dengan riwayat kesehatan  
- Upload resep dokter  
- Langganan obat rutin  

---

## 7. Pertimbangan Teknologi

- **Backend:** Node.js / Python (FastAPI)
- **Database:** SQLite (berbasis file, biaya rendah, cocok untuk MVP; dapat di-upgrade ke PostgreSQL di masa depan)
- **API:**
  - Pembayaran (Midtrans, Xendit)
  - Logistik (RajaOngkir, Gojek/Grab API)
- **Frontend:** React / React Native
- **Deployment:** Docker-based container

---

## 8. Perubahan Versi 2 (V2)

Bagian ini merangkum seluruh perubahan dan penambahan fitur yang diusulkan dalam dokumen spesifikasi Versi 2 dibandingkan Versi 1.

---

### 8.1 Konsultasi Berbasis Gejala — Penambahan Input Teks Bebas

**Perubahan pada §2.2 (Logika Mesin Rekomendasi) dan §3 (Alur Pengguna — Langkah 3):**

Selain memilih gejala dari daftar kategori yang tersedia, pengguna kini juga dapat **mengetik gejala secara bebas** (free-text input). Ini memberikan fleksibilitas bagi pengguna yang gejalanya tidak tercakup dalam pilihan yang ada.

---

### 8.2 Rekomendasi Obat — Cakupan Harga & Kategori Obat

**Perubahan pada §2.2 (Output dan Batasan):**

**Cakupan harga:**
- Daftar rekomendasi obat kini wajib menampilkan **minimal 3 pilihan**, mulai dari obat paten (bermerek) hingga obat generik, agar pengguna dapat memilih sesuai kemampuan finansial mereka.

**Kategori obat yang boleh ditampilkan:**
- Aplikasi hanya boleh menampilkan obat dalam kategori:
  - Obat bebas (logo lingkaran hijau)
  - Obat bebas terbatas (logo lingkaran biru)
  - Obat herbal / jamu
- **Obat keras tidak boleh ditampilkan** kecuali melalui jalur resep digital dari dokter berlisensi (lihat §8.5 di bawah).

**Penambahan field output:**
- Harga produk kini menjadi bagian wajib dari informasi obat yang ditampilkan.

---

### 8.3 Katalog Produk — Informasi Cara Penggunaan Obat

**Perubahan pada §2.3 (Informasi Produk):**

Halaman detail produk kini wajib menyertakan **aturan minum atau cara penggunaan obat** (misalnya: "diminum 3x sehari setelah makan"). Informasi ini sebelumnya tidak tercantum secara eksplisit sebagai field wajib.

---

### 8.4 Pengiriman & Logistik — Peta pada Input Alamat

**Perubahan pada §2.5 (Fitur Pengiriman):**

Saat pengguna mengisi alamat pengiriman, aplikasi kini harus **menampilkan peta interaktif** untuk membantu pengguna menentukan lokasi pengiriman secara akurat. Integrasi peta (misalnya Google Maps API) diperlukan untuk fitur ini.

---

### 8.5 Alur Pengguna — Profil Tersimpan & Konsultasi Dokter

**Perubahan pada §3 (Alur Pengguna):**

Dua perubahan signifikan pada alur pengguna:

1. **Data pribadi tersimpan (Langkah 2):**
   Data pribadi pengguna — termasuk usia, berat badan, dan **riwayat alergi** — disimpan di dalam aplikasi. Pada penggunaan berikutnya, pengguna tidak perlu mengisi ulang data tersebut. Ini memerlukan fitur akun/profil pengguna.

2. **Pilihan konsultasi dokter (Langkah 4 baru):**
   Sebelum menampilkan rekomendasi obat, aplikasi menampilkan **opsi konsultasi langsung dengan dokter** apabila pengguna merasa membutuhkan penanganan lebih lanjut. Alur pengguna kini menjadi 11 langkah (sebelumnya 9 langkah).

---

### 8.6 Pengembangan Masa Depan — Klarifikasi Fitur Penting

**Perubahan pada §6 (Pengembangan di Masa Depan):**

Dua fitur opsional mendapat penjelasan lebih rinci:

1. **Chat dengan apoteker/dokter berlisensi:**
   Fitur ini bukan sekadar nilai tambah — ini adalah **syarat regulasi** untuk dapat menjual obat keras di dalam aplikasi. Alurnya adalah:
   - Pengguna berkonsultasi dengan dokter berlisensi melalui aplikasi
   - Dokter dapat menerbitkan **resep digital** langsung di dalam aplikasi
   - Pengguna dapat langsung membeli obat keras berdasarkan resep tersebut

   Referensi aplikasi serupa yang sudah beroperasi di Indonesia: **HALODOC**.

2. **Langganan obat rutin:**
   Aplikasi dapat memberikan **notifikasi atau saran pembelian ulang** secara otomatis apabila obat rutin yang dibeli pengguna diperkirakan sudah habis berdasarkan dosis dan tanggal pembelian terakhir.

---

### Ringkasan Perubahan V1 → V2

| Area | V1 | V2 |
|---|---|---|
| Input gejala | Pilihan kategori saja | Pilihan kategori + teks bebas |
| Jumlah rekomendasi obat | Tidak ditentukan | Minimal 3 pilihan (paten s/d generik) |
| Kategori obat | Tidak dibatasi | Hanya bebas, bebas terbatas, herbal |
| Info produk | Nama, harga, stok, deskripsi | + Aturan minum / cara penggunaan |
| Input alamat pengiriman | Form teks biasa | Form teks + peta interaktif |
| Data pengguna | Diisi ulang setiap sesi | Tersimpan di profil (termasuk alergi) |
| Alur konsultasi dokter | Tidak ada | Ditawarkan sebelum rekomendasi obat |
| Fitur dokter berlisensi | Opsional masa depan | Diprioritaskan (syarat jual obat keras) |
| Langganan obat rutin | Disebutkan singkat | + Notifikasi otomatis saat stok habis |

---

## 9. Ide Pengembangan Masa Depan (V3+)

### 9.1 Konsultasi Gejala Berbasis AI

**Deskripsi:**
Menggantikan sistem pemilihan gejala berbasis daftar dengan percakapan alami yang dipandu oleh AI. Pengguna dapat mendeskripsikan keluhan mereka secara bebas, dan sistem akan mengajukan pertanyaan lanjutan secara otomatis untuk memperjelas kondisi — seperti durasi gejala, tingkat keparahan, dan riwayat obat sebelumnya — sebelum memberikan rekomendasi yang lebih tepat.

**Manfaat bisnis:**
- Meningkatkan akurasi rekomendasi obat secara signifikan
- Pengalaman pengguna yang lebih alami dan mudah digunakan
- Mampu menangani kombinasi gejala yang kompleks yang tidak tercakup dalam daftar pilihan
- Membedakan Apotek Mutiara dari apotek online konvensional

**Batasan yang tetap berlaku:**
- Sistem hanya boleh merekomendasikan obat bebas dan obat bebas terbatas sesuai regulasi BPOM
- Bukan pengganti konsultasi dokter; disclaimer medis tetap wajib ditampilkan
- Untuk obat keras, tetap memerlukan jalur resep dokter berlisensi (lihat §8.5)

**Catatan implementasi:**
Pendekatan yang direkomendasikan adalah sistem hibrida: AI menangani percakapan dan diagnosis, sementara katalog obat yang telah diverifikasi (dengan harga, kategori BPOM, dan dosis yang akurat) tetap dikelola secara internal oleh tim Apotek Mutiara. Hal ini memastikan informasi produk yang ditampilkan kepada pengguna selalu akurat dan dapat dipertanggungjawabkan.
