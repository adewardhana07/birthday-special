// Konfigurasi
const config = {
    namaSpesial: "Sayangku ❤️",
    tanggalUlangTahun: "2026-10-27T00:00:00", // Ganti dengan tanggal ulang tahun
    pesanUcapan: "Di hari spesial ini, aku ingin kamu tahu betapa berartinya kamu bagiku. Setiap detik bersamamu adalah hadiah terindah. Semoga semua impianmu menjadi kenyataan. I love you! 💕",
    pesanKejutan: [
        "🎉 Selamat ulang tahun! Kamu adalah orang terbaik yang pernah aku kenal!",
        "💝 Semoga semua kebahagiaan menyertaimu hari ini dan selamanya!",
        "🌟 Kamu adalah bintang dalam hidupku, terima kasih telah menjadi dirimu!",
        "🎂 Hari ini adalah hari istimewa karena kamu lahir ke dunia ini!",
        "❤️ Aku mencintaimu lebih dari apapun di dunia ini!"
    ]
};

// DOM Elements
const namaElement = document.getElementById('namaSpesial');
const pesanElement = document.getElementById('pesanUcapan');
const surpriseMessage = document.getElementById('surpriseMessage');

// Set data
if (namaElement) namaElement.textContent = config.namaSpesial;
if (pesanElement) pesanElement.textContent = config.pesanUcapan;

// Countdown Timer
function updateCountdown() {
    const targetDate = new Date(config.tanggalUlangTahun).getTime();
    const now = new Date().getTime();
    const distance = targetDate - now;

    if (distance < 0) {
        document.getElementById('days').textContent = '🎉';
        document.getElementById('hours').textContent = '🎉';
        document.getElementById('minutes').textContent = '🎉';
        document.getElementById('seconds').textContent = '🎉';
        return;
    }

    const days = Math.floor(distance / (1000 * 60 * 60 * 24));
    const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((distance % (1000 * 60)) / 1000);

    document.getElementById('days').textContent = String(days).padStart(2, '0');
    document.getElementById('hours').textContent = String(hours).padStart(2, '0');
    document.getElementById('minutes').textContent = String(minutes).padStart(2, '0');
    document.getElementById('seconds').textContent = String(seconds).padStart(2, '0');
}

// Update setiap detik
updateCountdown();
setInterval(updateCountdown, 1000);

// Fungsi Musik
function playMusic() {
    const audio = document.getElementById('birthdaySong');
    if (audio.paused) {
        audio.play().then(() => {
            showNotification('🎵 Musik diputar! Selamat menikmati!');
        }).catch(() => {
            showNotification('⚠️ Mohon klik lagi untuk memutar musik');
        });
    } else {
        audio.pause();
        showNotification('⏸️ Musik dijeda');
    }
}

// Fungsi Kejutan
function surprise() {
    const popup = document.getElementById('surprisePopup');
    const randomMessage = config.pesanKejutan[Math.floor(Math.random() * config.pesanKejutan.length)];
    
    if (surpriseMessage) {
        surpriseMessage.textContent = randomMessage;
    }
    
    popup.style.display = 'flex';
    
    // Konfeti
    confetti({
        particleCount: 100,
        spread: 70,
        origin: { y: 0.6 }
    });
    
    setTimeout(() => {
        confetti({
            particleCount: 100,
            spread: 70,
            origin: { y: 0.6 }
        });
    }, 200);
}

// Tutup Kejutan
function closeSurprise() {
    document.getElementById('surprisePopup').style.display = 'none';
}

// Notifikasi
function showNotification(message) {
    const notification = document.createElement('div');
    notification.className = 'notification';
    notification.style.cssText = `
        position: fixed;
        bottom: 20px;
        left: 50%;
        transform: translateX(-50%);
        background: rgba(0,0,0,0.8);
        color: white;
        padding: 15px 30px;
        border-radius: 50px;
        z-index: 1000;
        animation: fadeIn 0.5s ease;
        font-family: 'Poppins', sans-serif;
    `;
    notification.textContent = message;
    document.body.appendChild(notification);
    
    setTimeout(() => {
        notification.style.opacity = '0';
        notification.style.transition = 'opacity 0.5s ease';
        setTimeout(() => notification.remove(), 500);
    }, 3000);
}

// Auto load music (optional)
document.addEventListener('DOMContentLoaded', function() {
    // Auto play musik dengan user interaction
    document.addEventListener('click', function initAudio() {
        const audio = document.getElementById('birthdaySong');
        audio.play().catch(() => {});
        document.removeEventListener('click', initAudio);
    }, { once: true });
    
    // Kirim konfeti otomatis saat load
    setTimeout(() => {
        confetti({
            particleCount: 50,
            spread: 50,
            origin: { y: 0.6 }
        });
    }, 1000);
});