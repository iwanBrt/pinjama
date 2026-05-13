# 📄 Generator Surat Pinjaman Internal

Aplikasi web berbasis *client-side* untuk mengotomatisasi pembuatan "Surat Permohonan dan Pernyataan Pinjaman" bagi keperluan operasional internal usaha. Aplikasi ini berfungsi sebagai "Mesin Ketik Pintar" yang menghilangkan kebutuhan pengetikan manual di Microsoft Word dan mencegah *human-error* dalam perhitungan kalkulasi kredit.

## 🎯 Tujuan Proyek
Proyek ini dibangun untuk mempercepat proses administrasi nasabah dengan cara:
1. **Otomatisasi Perhitungan:** Menghitung otomatis total "Sisa Diterima" nasabah dan memecah "Besar Cicilan" ke dalam tabel tenor bulan.
2. **Standardisasi Format:** Memastikan hasil cetak dokumen selalu konsisten, rapi, dan sesuai dengan standar kertas A4/F4.
3. **Privasi & Kecepatan:** Berjalan 100% di sisi *client* (browser) tanpa *database*. Data yang diinput hanya bersifat sementara (hilang saat di-*refresh*), menjaga kerahasiaan data nasabah sekaligus mempercepat proses *generate* dokumen.

## ✨ Fitur Utama
* **Split-Screen Interface:** Pengalaman UI/UX yang membagi layar menjadi dua; area form input di sebelah kiri dan *live preview* dokumen di sebelah kanan.
* **Real-time Preview:** Teks yang diketik pada form akan langsung tampil di *template* surat virtual secara *real-time*.
* **Auto-Calculation Engine:** * Menghitung otomatis "Sisa Diterima" (Pinjaman Baru - Pinjaman Lama - Biaya Admin).
    * Men-generate baris tabel otomatis berdasarkan input "Tenor" (1-12 bulan) lengkap dengan nominal cicilan per bulannya.
* **One-Click Print/Save:** Menggunakan CSS Print Document (`@media print`) untuk mencetak langsung hasil *preview* menjadi PDF yang presisi tanpa memerlukan *library* pihak ketiga yang berat.

## 🛠️ Tech Stack
* **Framework:** [Next.js](https://nextjs.org/) (App Router)
* **Library UI:** React (Hooks: `useState`, `useEffect`)
* **Styling:** [Tailwind CSS](https://tailwindcss.com/) (memanfaatkan utility class `print:hidden` dan styling khusus ukuran kertas A4).