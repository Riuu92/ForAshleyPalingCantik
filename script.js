const START_DATE = new Date('2026-09-26T00:00:00+08:00');

const LOVE_QUOTES = [
    "Aku tidak tahu kapan takdirku bertemu denganmu, tapi aku tahu… itu adalah hari terbaik dalam hidupku.",
    "Kamu adalah alasan kenapa aku percaya bahwa cinta itu nyata.",
    "Bersamamu, waktu terasa terlalu cepat. Tanpamu, satu detik terasa seperti selamanya.",
    "Kamu bukan hanya seseorang yang aku cintai. Kamu adalah rumahku.",
    "Setiap pagi aku bersyukur, karena aku tahu bahwa hari ini pun aku bisa mencintaimu.",
    "Aku mencintaimu bukan karena siapa dirimu, tapi karena siapa diriku saat bersamamu.",
    "Jika aku harus memilih antara bernapas dan mencintaimu, aku akan menggunakan napas terakhirku untuk mengatakan aku mencintaimu.",
    "Cinta kita baru dimulai, dan aku sudah tidak sabar menjalani setiap harinya bersamamu.",
];

const HEART_EMOJIS = ['💕', '💖', '💗', '💝', '💘', '❤️', '🩷', '🤍', '✨', '🌸'];

// ╔══════════════════════════════════════════════════════════════╗
// ║  FOTO — Taruh file gambar di folder photos/                  ║
// ║  Lalu tambahkan datanya di array PHOTOS di bawah ini.        ║
// ║                                                              ║
// ║  Format:                                                     ║
// ║  { src: 'photos/nama-file.jpg', caption: 'Keterangan' }      ║
// ║                                                              ║
// ║  Contoh (hapus // di depan untuk mengaktifkan):              ║
// ╚══════════════════════════════════════════════════════════════╝
const PHOTOS = [
    { src: 'photos/foto1.jpg', caption: 'Kesayanganku' },
    // { src: 'photos/kenangan-2.jpg', caption: 'Momen indah berdua 💕' },
    // { src: 'photos/jalan-jalan.jpg', caption: 'Jalan-jalan bersama 🌸' },
    // { src: 'photos/selfie.jpg', caption: 'Selfie pertama kita ✨' },
];

// ╔══════════════════════════════════════════════════════════════╗
// ║  LAGU — Taruh file .mp3 di folder music/                     ║
// ║  Lalu tambahkan datanya di array PLAYLIST di bawah ini.      ║
// ║                                                              ║
// ║  Format:                                                     ║
// ║  {                                                           ║
// ║    title: 'Judul Lagu',                                      ║
// ║    artist: 'Nama Artis',                                     ║
// ║    src: 'music/nama-file.mp3'                                ║
// ║  }                                                           ║
// ║                                                              ║
// ║  Contoh (hapus // di depan untuk mengaktifkan):              ║
// ╚══════════════════════════════════════════════════════════════╝
const PLAYLIST = [
    { title: 'Perfect (cover)', artist: 'Ed Sheeran', src: 'music/perfect.mp3' },
    { title: 'Angel Baby (cover)', artist: 'Troye Sivan', src: 'music/angel_baby.mp3' },
    // { title: 'A Thousand Years', artist: 'Christina Perri', src: 'music/a-thousand-years.mp3' },
    { title: 'All of Me (cover)', artist: 'John Legend', src: 'music/all-of-me.mp3' },
    { title: 'Thinking Out Loud (cover)', artist: 'Ed Sheeran', src: 'music/thinking-out-loud.mp3' },
    { title: 'kesayanganku', artist: 'Al-Ghazali', src: 'music/kesayanganku.mp3' },
];


// ── Timer Logic ────────────────────────────────
function updateTimer() {
    const now = new Date();
    const diff = now - START_DATE;

    if (diff < 0) return;

    const totalSec = Math.floor(diff / 1000);
    const totalMin = Math.floor(totalSec / 60);
    const totalHr = Math.floor(totalMin / 60);
    const days = Math.floor(totalHr / 24);
    const hours = totalHr % 24;
    const minutes = totalMin % 60;
    const seconds = totalSec % 60;
    const weeks = Math.floor(days / 7);

    // Update main timer
    animateValue('days', days);
    animateValue('hours', hours);
    animateValue('minutes', minutes);
    animateValue('seconds', seconds);

    // Update detailed time
    document.getElementById('totalWeeks').textContent = weeks.toLocaleString();
    document.getElementById('totalHours').textContent = totalHr.toLocaleString();
    document.getElementById('totalMinutes').textContent = totalMin.toLocaleString();
    document.getElementById('totalSeconds').textContent = totalSec.toLocaleString();

    // Update milestones
    updateMilestones(days);
}

function animateValue(id, newValue) {
    const el = document.getElementById(id);
    const current = el.textContent;
    const formatted = String(newValue).padStart(2, '0');

    if (current !== formatted) {
        el.style.transform = 'scale(1.1)';
        el.textContent = formatted;
        setTimeout(() => {
            el.style.transform = 'scale(1)';
        }, 200);
    }
}

function updateMilestones(currentDays) {
    const items = document.querySelectorAll('.milestone-item');
    items.forEach(item => {
        const requiredDays = parseInt(item.dataset.days);
        if (currentDays >= requiredDays) {
            item.classList.add('completed');
        } else {
            item.classList.remove('completed');
        }
    });
}

// ── Floating Hearts ────────────────────────────
function createFloatingHeart() {
    const container = document.getElementById('floatingHearts');
    const heart = document.createElement('span');
    heart.classList.add('floating-heart');
    heart.textContent = HEART_EMOJIS[Math.floor(Math.random() * HEART_EMOJIS.length)];

    const size = 0.8 + Math.random() * 1.2;
    const left = Math.random() * 100;
    const duration = 8 + Math.random() * 12;
    const delay = Math.random() * 5;

    heart.style.cssText = `
        left: ${left}%;
        font-size: ${size}rem;
        animation-duration: ${duration}s;
        animation-delay: ${delay}s;
    `;

    container.appendChild(heart);

    // Remove after animation
    setTimeout(() => {
        if (heart.parentNode) {
            heart.parentNode.removeChild(heart);
        }
    }, (duration + delay) * 1000);
}

function initFloatingHearts() {
    // Create initial batch
    for (let i = 0; i < 15; i++) {
        createFloatingHeart();
    }
    // Continuously create new hearts
    setInterval(createFloatingHeart, 2000);
}

// ── Sparkle Particles ──────────────────────────
function createSparkle() {
    const container = document.getElementById('sparkles');
    const sparkle = document.createElement('div');
    sparkle.classList.add('sparkle');

    const x = Math.random() * 100;
    const y = Math.random() * 100;
    const size = 2 + Math.random() * 4;
    const duration = 2 + Math.random() * 3;
    const delay = Math.random() * 5;

    sparkle.style.cssText = `
        left: ${x}%;
        top: ${y}%;
        width: ${size}px;
        height: ${size}px;
        animation-duration: ${duration}s;
        animation-delay: ${delay}s;
    `;

    container.appendChild(sparkle);

    setTimeout(() => {
        if (sparkle.parentNode) {
            sparkle.parentNode.removeChild(sparkle);
        }
    }, (duration + delay) * 1000);
}

function initSparkles() {
    for (let i = 0; i < 25; i++) {
        createSparkle();
    }
    setInterval(createSparkle, 800);
}

// ── Love Quotes Carousel ──────────────────────
let currentQuote = 0;
let quoteInterval;

function initQuotes() {
    const dotsContainer = document.getElementById('quoteDots');
    LOVE_QUOTES.forEach((_, i) => {
        const dot = document.createElement('span');
        dot.classList.add('quote-dot');
        if (i === 0) dot.classList.add('active');
        dot.addEventListener('click', () => showQuote(i));
        dotsContainer.appendChild(dot);
    });

    showQuote(0);
    quoteInterval = setInterval(nextQuote, 6000);
}

function showQuote(index) {
    const textEl = document.getElementById('quoteText');
    const dots = document.querySelectorAll('.quote-dot');

    textEl.style.opacity = '0';

    setTimeout(() => {
        textEl.textContent = LOVE_QUOTES[index];
        textEl.style.opacity = '1';
    }, 300);

    dots.forEach((d, i) => {
        d.classList.toggle('active', i === index);
    });

    currentQuote = index;
}

function nextQuote() {
    const next = (currentQuote + 1) % LOVE_QUOTES.length;
    showQuote(next);
}

// ── Scroll Reveal ──────────────────────────────
function initScrollReveal() {
    const sections = document.querySelectorAll(
        '.timer-section, .love-section, .milestones-section, .quotes-section, .gallery-section, .playlist-section'
    );

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, {
        threshold: 0.15,
        rootMargin: '0px 0px -50px 0px'
    });

    sections.forEach(section => observer.observe(section));
}

// ── Scroll to Top Button ───────────────────────
function initScrollTop() {
    const btn = document.getElementById('scrollTop');

    window.addEventListener('scroll', () => {
        if (window.scrollY > 400) {
            btn.classList.add('visible');
        } else {
            btn.classList.remove('visible');
        }
    });

    btn.addEventListener('click', () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    });
}

// ── Click Sparkle Effect ───────────────────────
function initClickEffect() {
    document.addEventListener('click', (e) => {
        for (let i = 0; i < 5; i++) {
            const sparkle = document.createElement('span');
            sparkle.textContent = HEART_EMOJIS[Math.floor(Math.random() * HEART_EMOJIS.length)];
            sparkle.style.cssText = `
                position: fixed;
                left: ${e.clientX}px;
                top: ${e.clientY}px;
                pointer-events: none;
                font-size: ${0.6 + Math.random() * 0.8}rem;
                z-index: 9999;
                animation: clickSparkle 1s ease-out forwards;
                --tx: ${(Math.random() - 0.5) * 80}px;
                --ty: ${-30 - Math.random() * 60}px;
            `;
            document.body.appendChild(sparkle);
            setTimeout(() => sparkle.remove(), 1000);
        }
    });

    // Add CSS animation for click sparkles
    const style = document.createElement('style');
    style.textContent = `
        @keyframes clickSparkle {
            0% {
                opacity: 1;
                transform: translate(0, 0) scale(1);
            }
            100% {
                opacity: 0;
                transform: translate(var(--tx), var(--ty)) scale(0.3) rotate(180deg);
            }
        }
    `;
    document.head.appendChild(style);
}

// ── Cursor Trail ───────────────────────────────
function initCursorTrail() {
    let lastTime = 0;
    document.addEventListener('mousemove', (e) => {
        const now = Date.now();
        if (now - lastTime < 50) return;
        lastTime = now;

        const trail = document.createElement('div');
        trail.style.cssText = `
            position: fixed;
            left: ${e.clientX}px;
            top: ${e.clientY}px;
            width: 6px;
            height: 6px;
            border-radius: 50%;
            background: radial-gradient(circle, rgba(255,107,157,0.8), transparent);
            pointer-events: none;
            z-index: 9998;
            transition: all 0.8s ease-out;
        `;
        document.body.appendChild(trail);

        requestAnimationFrame(() => {
            trail.style.opacity = '0';
            trail.style.transform = 'scale(3)';
        });

        setTimeout(() => trail.remove(), 800);
    });
}


// ═══════════════════════════════════════════════════════════════
//  GALERI FOTO
//  Cara pakai:
//  1. Taruh file gambar (jpg/png/webp) ke folder photos/
//  2. Tambahkan entry di array PHOTOS di atas
// ═══════════════════════════════════════════════════════════════
let currentLightboxIndex = 0;

function initGallery() {
    const grid = document.getElementById('galleryGrid');

    if (PHOTOS.length === 0) {
        grid.innerHTML = `
            <div class="gallery-empty">
                <div class="gallery-empty-icon">📸</div>
                <p class="gallery-empty-text">Belum ada foto kenangan...</p>
                <p class="gallery-empty-hint">Taruh foto di folder photos/ lalu daftarkan di script.js</p>
            </div>
        `;
        return;
    }

    grid.innerHTML = '';
    PHOTOS.forEach((photo, index) => {
        const item = document.createElement('div');
        item.classList.add('gallery-item');
        item.innerHTML = `
            <img src="${photo.src}" alt="${photo.caption || 'Foto kenangan'}" loading="lazy">
            ${photo.caption ? `<div class="gallery-overlay"><span class="gallery-overlay-text">${photo.caption}</span></div>` : ''}
        `;
        item.addEventListener('click', () => openLightbox(index));
        grid.appendChild(item);
    });
}

function openLightbox(index) {
    currentLightboxIndex = index;
    const lightbox = document.getElementById('lightbox');
    const img = document.getElementById('lightboxImg');
    const caption = document.getElementById('lightboxCaption');

    img.src = PHOTOS[index].src;
    caption.textContent = PHOTOS[index].caption || '';
    lightbox.classList.add('active');
    document.body.style.overflow = 'hidden';
}

function closeLightbox() {
    document.getElementById('lightbox').classList.remove('active');
    document.body.style.overflow = '';
}

function navigateLightbox(direction) {
    if (PHOTOS.length === 0) return;
    currentLightboxIndex = (currentLightboxIndex + direction + PHOTOS.length) % PHOTOS.length;
    const img = document.getElementById('lightboxImg');
    const caption = document.getElementById('lightboxCaption');
    img.src = PHOTOS[currentLightboxIndex].src;
    caption.textContent = PHOTOS[currentLightboxIndex].caption || '';
}

function initLightbox() {
    document.getElementById('lightboxClose').addEventListener('click', closeLightbox);
    document.getElementById('lightboxPrev').addEventListener('click', () => navigateLightbox(-1));
    document.getElementById('lightboxNext').addEventListener('click', () => navigateLightbox(1));

    document.getElementById('lightbox').addEventListener('click', (e) => {
        if (e.target.id === 'lightbox') closeLightbox();
    });

    document.addEventListener('keydown', (e) => {
        const lightbox = document.getElementById('lightbox');
        if (!lightbox.classList.contains('active')) return;

        if (e.key === 'Escape') closeLightbox();
        if (e.key === 'ArrowLeft') navigateLightbox(-1);
        if (e.key === 'ArrowRight') navigateLightbox(1);
    });
}


// ═══════════════════════════════════════════════════════════════
//  MUSIC PLAYER & PLAYLIST
//  Cara pakai:
//  1. Taruh file .mp3 ke folder music/
//  2. Tambahkan entry di array PLAYLIST di atas
// ═══════════════════════════════════════════════════════════════
let currentSongIndex = -1;
let isPlaying = false;
let audioPlayer;

function initPlaylist() {
    audioPlayer = document.getElementById('audioPlayer');
    const container = document.getElementById('playlistContainer');

    if (PLAYLIST.length === 0) {
        container.innerHTML = `
            <div class="playlist-empty">
                <div class="playlist-empty-icon">🎵</div>
                <p class="playlist-empty-text">Belum ada lagu di playlist...</p>
                <p class="playlist-empty-hint">Taruh file .mp3 di folder music/ lalu daftarkan di script.js</p>
            </div>
        `;
        return;
    }

    container.innerHTML = '';
    PLAYLIST.forEach((song, index) => {
        const item = document.createElement('div');
        item.classList.add('playlist-item');
        item.dataset.index = index;
        item.innerHTML = `
            <span class="playlist-item-number">${String(index + 1).padStart(2, '0')}</span>
            <div class="playlist-item-icon">🎵</div>
            <div class="playlist-playing-indicator">
                <div class="playing-bar"></div>
                <div class="playing-bar"></div>
                <div class="playing-bar"></div>
                <div class="playing-bar"></div>
            </div>
            <div class="playlist-item-info">
                <span class="playlist-item-title">${song.title}</span>
                <span class="playlist-item-artist">${song.artist || ''}</span>
            </div>
            <span class="playlist-item-duration" id="duration-${index}">--:--</span>
        `;
        item.addEventListener('click', () => playSong(index));
        container.appendChild(item);
    });
}

function playSong(index) {
    if (index < 0 || index >= PLAYLIST.length) return;

    const song = PLAYLIST[index];
    currentSongIndex = index;

    // Update audio source
    audioPlayer.src = song.src;
    audioPlayer.play().then(() => {
        isPlaying = true;
        updatePlayPauseUI();
        updatePlaylistActiveState();
        updatePlayerBarInfo();
    }).catch(err => {
        console.warn('Audio play failed:', err);
    });
}

function togglePlayPause() {
    if (PLAYLIST.length === 0) return;

    if (currentSongIndex === -1) {
        playSong(0);
        return;
    }

    if (isPlaying) {
        audioPlayer.pause();
        isPlaying = false;
    } else {
        audioPlayer.play().catch(() => {});
        isPlaying = true;
    }
    updatePlayPauseUI();
    updatePlaylistActiveState();
}

function playPrev() {
    if (PLAYLIST.length === 0) return;
    const prev = currentSongIndex <= 0 ? PLAYLIST.length - 1 : currentSongIndex - 1;
    playSong(prev);
}

function playNext() {
    if (PLAYLIST.length === 0) return;
    const next = (currentSongIndex + 1) % PLAYLIST.length;
    playSong(next);
}

function updatePlayPauseUI() {
    const playIcon = document.querySelector('#playerPlayPause .play-icon');
    const pauseIcon = document.querySelector('#playerPlayPause .pause-icon');

    if (isPlaying) {
        playIcon.style.display = 'none';
        pauseIcon.style.display = 'block';
    } else {
        playIcon.style.display = 'block';
        pauseIcon.style.display = 'none';
    }
}

function updatePlaylistActiveState() {
    const items = document.querySelectorAll('.playlist-item');
    items.forEach((item, i) => {
        item.classList.toggle('active', i === currentSongIndex);
        item.classList.toggle('playing', i === currentSongIndex && isPlaying);
    });
}

function updatePlayerBarInfo() {
    if (currentSongIndex < 0 || currentSongIndex >= PLAYLIST.length) return;
    const song = PLAYLIST[currentSongIndex];
    document.getElementById('playerSongTitle').textContent = song.title;
    document.getElementById('playerSongArtist').textContent = song.artist || '';
}

function formatTime(seconds) {
    if (isNaN(seconds) || !isFinite(seconds)) return '0:00';
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins}:${secs.toString().padStart(2, '0')}`;
}

function initMusicPlayer() {
    audioPlayer = document.getElementById('audioPlayer');
    audioPlayer.volume = 0.8;

    // Play/Pause button
    document.getElementById('playerPlayPause').addEventListener('click', (e) => {
        e.stopPropagation();
        togglePlayPause();
    });

    // Prev/Next
    document.getElementById('playerPrev').addEventListener('click', (e) => {
        e.stopPropagation();
        playPrev();
    });
    document.getElementById('playerNext').addEventListener('click', (e) => {
        e.stopPropagation();
        playNext();
    });

    // Progress bar click to seek
    const progressBar = document.getElementById('playerProgressBar');
    progressBar.addEventListener('click', (e) => {
        e.stopPropagation();
        if (!audioPlayer.duration) return;
        const rect = progressBar.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const pct = x / rect.width;
        audioPlayer.currentTime = pct * audioPlayer.duration;
    });

    // Volume bar click
    const volumeBar = document.getElementById('playerVolumeBar');
    volumeBar.addEventListener('click', (e) => {
        e.stopPropagation();
        const rect = volumeBar.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const pct = Math.max(0, Math.min(1, x / rect.width));
        audioPlayer.volume = pct;
        document.getElementById('playerVolumeFill').style.width = (pct * 100) + '%';
    });

    // Volume mute toggle
    document.getElementById('playerVolumeBtn').addEventListener('click', (e) => {
        e.stopPropagation();
        audioPlayer.muted = !audioPlayer.muted;
        if (audioPlayer.muted) {
            document.getElementById('playerVolumeFill').style.width = '0%';
        } else {
            document.getElementById('playerVolumeFill').style.width = (audioPlayer.volume * 100) + '%';
        }
    });

    // Time update
    audioPlayer.addEventListener('timeupdate', () => {
        if (!audioPlayer.duration) return;
        const pct = (audioPlayer.currentTime / audioPlayer.duration) * 100;
        document.getElementById('playerProgressFill').style.width = pct + '%';
        document.getElementById('playerCurrentTime').textContent = formatTime(audioPlayer.currentTime);
    });

    // Duration loaded
    audioPlayer.addEventListener('loadedmetadata', () => {
        document.getElementById('playerDuration').textContent = formatTime(audioPlayer.duration);

        // Also update the playlist item duration
        if (currentSongIndex >= 0) {
            const durEl = document.getElementById('duration-' + currentSongIndex);
            if (durEl) durEl.textContent = formatTime(audioPlayer.duration);
        }
    });

    // Auto play next song when current ends
    audioPlayer.addEventListener('ended', () => {
        isPlaying = false;
        updatePlayPauseUI();
        updatePlaylistActiveState();
        playNext();
    });

    // Pause/play events
    audioPlayer.addEventListener('pause', () => {
        isPlaying = false;
        updatePlayPauseUI();
        updatePlaylistActiveState();
    });

    audioPlayer.addEventListener('play', () => {
        isPlaying = true;
        updatePlayPauseUI();
        updatePlaylistActiveState();
    });
}


// ── Initialize Everything ──────────────────────
document.addEventListener('DOMContentLoaded', () => {
    // Start timer
    updateTimer();
    setInterval(updateTimer, 1000);

    // Visual effects
    initFloatingHearts();
    initSparkles();
    initQuotes();
    initScrollReveal();
    initScrollTop();
    initClickEffect();
    initCursorTrail();

    // Photo Gallery
    initGallery();
    initLightbox();

    // Music Player
    initPlaylist();
    initMusicPlayer();
});
