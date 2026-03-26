# 📱 Spesifikasi Produk: Aplikasi Konsultasi Obat & E-Commerce

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
