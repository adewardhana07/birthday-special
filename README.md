# 🎉 Birthday Project for Special Someone

Website ulang tahun spesial yang bisa di-deploy ke Netlify.

## Fitur
- 🎂 Ucapan ulang tahun yang personal
- ⏰ Countdown timer menuju hari spesial
- 🎵 Background music
- 🎊 Konfeti interaktif
- 📱 Responsive design dengan Bootstrap
- 💝 Kejutan dengan pesan random

## Cara Deploy ke Netlify

1. **Buat akun Netlify** di netlify.com

2. **Persiapan file:**
   - Copy semua file ke folder project
   - Ganti konfigurasi di `script.js`:
     ```javascript
     const config = {
         namaSpesial: "Nama Orang Spesial",
         tanggalUlangTahun: "2026-08-10T00:00:00", // Ganti tanggal
         // ... lainnya
     };