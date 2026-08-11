// ============================================
// KONFIGURASI
// ============================================
const CONFIG = {
    // Tanggal target countdown (2026-08-11)
    targetDate: new Date(2026, 7, 11, 0, 0, 0),
    
    // Pesan cinta untuk surprise
    loveMessages: [
        "💝 Kamu adalah cinta terbaik yang pernah aku temui. Setiap hari bersamamu adalah mimpi yang jadi kenyataan. Aku bersyukur memiliki kamu di hidupku.",
        "🌹 Di dunia sebesar ini, aku bersyukur bisa menemukanmu. Kamu adalah rumah bagi hatiku dan tempatku pulang setiap saat.",
        "❤️ Cintaku padamu tidak pernah pudar, bahkan semakin dalam setiap hari. Kamu adalah segalanya bagiku dan aku akan selalu mencintaimu.",
        "💕 Ketika aku melihatmu, aku melihat masa depan yang indah. Bersamamu, semua terasa mungkin dan aku tak ingin kehilanganmu.",
        "🌟 Kamu adalah bintang yang menerangi gelapnya hidupku. Tanpamu, aku takkan pernah menemukan cahaya dan kebahagiaan sejati.",
        "💖 Setiap detik bersamamu adalah hadiah terindah. Kamu membuat hidupku lebih berwarna dan penuh cinta.",
        "🌺 Cintaku padamu seperti lautan yang dalam, tak pernah surut dan selalu mengalir. Kamu adalah segalanya bagiku."
    ],
    
    // Warna confetti
    confettiColors: ['#ff0000', '#cc0000', '#8b0000', '#ff4444', '#ff6b6b', '#ff9999', '#ff3333']
};

// ============================================
// VARIABEL GLOBAL
// ============================================
let musicPlaying = false;
const audio = document.getElementById('birthdaySong');
const surpriseOverlay = document.getElementById('surpriseOverlay');
const surpriseMessage = document.getElementById('surpriseMessage');

// ============================================
// BACKGROUND HEARTS
// ============================================
function createFloatingHearts() {
    const container = document.getElementById('bgHearts');
    const heartSymbols = ['❤️', '♥️', '💕', '💗', '💖', '💝', '🌹'];
    
    for (let i = 0; i < 35; i++) {
        const heart = document.createElement('div');
        heart.className = 'heart-float';
        heart.textContent = heartSymbols[Math.floor(Math.random() * heartSymbols.length)];
        heart.style.left = Math.random() * 100 + '%';
        heart.style.fontSize = (Math.random() * 25 + 15) + 'px';
        heart.style.animationDelay = (Math.random() * 20) + 's';
        heart.style.animationDuration = (Math.random() * 15 + 10) + 's';
        container.appendChild(heart);
    }
}

// Panggil saat halaman dimuat
createFloatingHearts();

// ============================================
// COUNTDOWN TIMER
// ============================================
function updateCountdown() {
    const now = new Date().getTime();
    const distance = CONFIG.targetDate.getTime() - now;

    if (distance < 0) {
        document.getElementById('days').textContent = '00';
        document.getElementById('hours').textContent = '00';
        document.getElementById('minutes').textContent = '00';
        document.getElementById('seconds').textContent = '00';
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

// Update countdown setiap detik
setInterval(updateCountdown, 1000);
updateCountdown();

// ============================================
// FUNGSI MUSIK
// ============================================
function playMusic() {
    const btn = document.querySelector('.btn-primary');
    
    if (!musicPlaying) {
        audio.play()
            .then(() => {
                musicPlaying = true;
                btn.innerHTML = '<i class="fas fa-pause"></i> Hentikan Musik';
                btn.onclick = stopMusic;
                launchConfetti(50);
            })
            .catch((error) => {
                console.log('Autoplay tidak diizinkan. Klik lagi untuk memutar.');
                // Fallback: coba lagi
                audio.play();
            });
    }
}

function stopMusic() {
    audio.pause();
    audio.currentTime = 0;
    musicPlaying = false;
    const btn = document.querySelector('.btn-primary');
    btn.innerHTML = '<i class="fas fa-music"></i> Putar Musik';
    btn.onclick = playMusic;
}

// ============================================
// FUNGSI SURPRISE
// ============================================
function openSurprise() {
    // Pilih pesan cinta secara acak
    const randomIndex = Math.floor(Math.random() * CONFIG.loveMessages.length);
    surpriseMessage.textContent = CONFIG.loveMessages[randomIndex];
    
    // Tampilkan popup dengan animasi
    surpriseOverlay.style.display = 'flex';
    document.body.style.overflow = 'hidden';
    
    // Efek confetti meriah
    launchConfetti(200);
    
    // Putar musik otomatis jika belum diputar
    if (!musicPlaying) {
        playMusic();
    }
    
    // Animasi gallery foto masuk satu per satu
    document.querySelectorAll('.gallery-item').forEach((item, index) => {
        item.style.opacity = '0';
        item.style.transform = 'scale(0.8) translateY(20px)';
        setTimeout(() => {
            item.style.transition = 'all 0.5s cubic-bezier(0.34, 1.56, 0.64, 1)';
            item.style.opacity = '1';
            item.style.transform = 'scale(1) translateY(0)';
        }, 200 + (index * 150));
    });
}

function closeSurprise() {
    surpriseOverlay.style.display = 'none';
    document.body.style.overflow = 'auto';
}

// Event listener untuk ESC
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && surpriseOverlay.style.display === 'flex') {
        closeSurprise();
    }
});

// Event listener untuk klik di luar popup
surpriseOverlay.addEventListener('click', (e) => {
    if (e.target === surpriseOverlay) {
        closeSurprise();
    }
});

// ============================================
// FUNGSI CONFETTI
// ============================================
function launchConfetti(count = 100) {
    const colors = CONFIG.confettiColors;
    
    for (let i = 0; i < count; i++) {
        setTimeout(() => {
            confetti({
                particleCount: 3,
                spread: 80,
                origin: {
                    y: Math.random() * 0.8 + 0.1,
                    x: Math.random()
                },
                colors: [colors[Math.floor(Math.random() * colors.length)]],
                startVelocity: Math.random() * 25 + 10,
                gravity: Math.random() * 0.5 + 0.5,
                drift: Math.random() * 2 - 1,
                ticks: 200
            });
        }, i * 15);
    }
}

// Auto confetti saat halaman dimuat
setTimeout(() => {
    launchConfetti(100);
}, 1500);

// ============================================
// EFEK PARALLAX 3D
// ============================================
const card = document.querySelector('.birthday-card');
let isHovering = false;

card.addEventListener('mouseenter', () => {
    isHovering = true;
});

card.addEventListener('mouseleave', () => {
    isHovering = false;
    card.style.transform = 'perspective(1000px) rotateY(0deg) rotateX(0deg) translateY(0px)';
});

document.addEventListener('mousemove', (e) => {
    if (!isHovering) return;
    
    const rect = card.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width;
    const y = (e.clientY - rect.top) / rect.height;
    
    const rotateY = (x - 0.5) * 10;
    const rotateX = (0.5 - y) * 10;
    
    card.style.transform = `
        perspective(1000px) 
        rotateY(${rotateY}deg) 
        rotateX(${rotateX}deg)
        translateY(-5px)
    `;
});

// ============================================
// EFEK KLIK TOMBOL
// ============================================
document.querySelectorAll('.btn').forEach(btn => {
    btn.addEventListener('click', function() {
        this.style.transform = 'scale(0.95)';
        setTimeout(() => {
            this.style.transform = '';
        }, 200);
    });
});

// ============================================
// GALERI FOTO - KLIK UNTUK PREVIEW
// ============================================
document.querySelectorAll('.gallery-item').forEach(item => {
    item.addEventListener('click', function() {
        const img = this.querySelector('img');
        const overlay = this.querySelector('.overlay');
        const imageUrl = img ? img.src : '';
        const message = overlay ? overlay.textContent : 'Foto spesial 💕';
        
        // Efek animasi klik
        this.style.transform = 'scale(0.95)';
        setTimeout(() => {
            this.style.transform = 'scale(1.05)';
        }, 200);
        setTimeout(() => {
            this.style.transform = 'scale(1)';
        }, 400);
        
        // Tampilkan preview dengan alert
        alert(`📸 ${message}\n\nIni adalah kenangan indah kita yang selalu aku simpan di hati. ❤️\n\n${imageUrl ? 'Foto: ' + imageUrl : ''}`);
    });
});

// ============================================
// INISIALISASI
// =========================================
