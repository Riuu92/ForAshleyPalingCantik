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
    { title: 'Perfect (cover by @freecoustic)', artist: 'Ed Sheeran', src: 'music/perfect.mp3' },
    { title: 'Angel Baby (cover)', artist: 'Troye Sivan', src: 'music/angel_baby.mp3' },
    // { title: 'A Thousand Years', artist: 'Christina Perri', src: 'music/a-thousand-years.mp3' },
    { title: 'All of Me (cover)', artist: 'John Legend', src: 'music/all-of-me.mp3' },
    { title: 'Thinking Out Loud (cover)', artist: 'Ed Sheeran', src: 'music/thinking-out-loud.mp3' },
    { title: 'Kesayanganku', artist: 'Al-Ghazali', src: 'music/kesayanganku.mp3' },
    { title: 'ASBSK (Aku Sayang Banget Sama Kamu) Cover by windyyy', artist: 'Souqy', src: 'music/asbsk.mp3' },
];

// ╔══════════════════════════════════════════════════════════════╗
// ║  VIDEO — Taruh file video di folder videos/                  ║
// ║  Lalu tambahkan datanya di array VIDEOS di bawah ini.        ║
// ║                                                              ║
// ║  Format:                                                     ║
// ║  {                                                           ║
// ║    src: 'videos/nama-file.mp4',                              ║
// ║    caption: 'Keterangan video',                              ║
// ║    date: 'Tanggal (opsional)'                                ║
// ║  }                                                           ║
// ║                                                              ║
// ║  Contoh (hapus // di depan untuk mengaktifkan):              ║
// ╚══════════════════════════════════════════════════════════════╝
const VIDEOS = [
    { src: 'videos/vid1.mp4', caption: 'Video random Ashley', date: "1 Okt 2026" },
    // { src: 'videos/momen-pertama.mp4', caption: 'Momen pertama kita 💕', date: '26 Sep 2026' },
    // { src: 'videos/jalan-sore.mp4', caption: 'Jalan-jalan sore berdua 🌅', date: '28 Sep 2026' },
    // { src: 'videos/kenangan-indah.mp4', caption: 'Kenangan yang tak terlupakan ✨', date: '30 Sep 2026' },
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
        '.timer-section, .countdown-section, .love-section, .milestones-section, .quotes-section, .gallery-section, .video-section, .playlist-section, .quiz-section, .surprise-section'
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

// Scrapbook cards and photos
const SCRAPBOOK_MEMORIES = [
    {
        type: 'photo',
        src: 'photos/foto1.jpg',
        caption: 'Kesayanganku',
        date: '26 Sep 2026',
        sticker: '💖',
        stickerPos: 's-br',
        tilt: -2.5
    },
    {
        type: 'card',
        icon: '🌹',
        caption: 'Awal Kisah Kita',
        quote: 'Hari terbaik dalam hidup Hasan ketika kamu bilang "iya" 💕',
        date: '26 September 2026',
        sticker: '✨',
        stickerPos: 's-tl',
        tilt: 3.2
    },
    {
        type: 'card',
        icon: '🎶',
        caption: 'Lagu Cinta Berdua',
        quote: '"Darling just hold my hand, be my girl, I will be your man..."',
        date: 'Ed Sheeran - Perfect',
        sticker: '🎀',
        stickerPos: 's-br',
        tilt: -1.8
    },
    {
        type: 'card',
        icon: '☕',
        caption: 'Momen Manis Bareng',
        quote: 'Setiap obrolan sederhana selalu terasa sangat berharga saat bersamamu.',
        date: 'Setiap Waktu',
        sticker: '🌸',
        stickerPos: 's-tl',
        tilt: 2.2
    },
    {
        type: 'card',
        icon: '🥰',
        caption: 'Senyuman Manismu',
        quote: 'Alasan nomor satu kenapa hariku selalu penuh semangat dan tawa.',
        date: 'Untuk Ashley',
        sticker: '🍓',
        stickerPos: 's-br',
        tilt: -3
    },
    {
        type: 'card',
        icon: '💍',
        caption: 'Janji Selamanya',
        quote: 'Menua bersamamu adalah impian terindah yang sedang kujalani sekarang.',
        date: 'Selamanya 💎',
        sticker: '💌',
        stickerPos: 's-tl',
        tilt: 1.5
    }
];

function initGallery() {
    const grid = document.getElementById('galleryGrid');
    if (!grid) return;

    grid.innerHTML = '';

    // Build items list: include any custom photos from PHOTOS array plus our memories cards
    const itemsToRender = [];
    
    // Check if PHOTOS has items not yet in SCRAPBOOK_MEMORIES
    PHOTOS.forEach((photo, idx) => {
        itemsToRender.push({
            type: 'photo',
            src: photo.src,
            caption: photo.caption || 'Foto Kenangan',
            date: 'Momen Spesial',
            sticker: ['💖', '🌸', '✨', '🎀'][idx % 4],
            stickerPos: idx % 2 === 0 ? 's-br' : 's-tl',
            tilt: ((idx * 2.5) % 6) - 3,
            photoIndex: idx
        });
    });

    // Add illustrative cards
    SCRAPBOOK_MEMORIES.forEach((item) => {
        if (item.type === 'card') {
            itemsToRender.push(item);
        }
    });

    itemsToRender.forEach((item, index) => {
        const card = document.createElement('div');
        card.classList.add('polaroid-card');
        card.style.setProperty('--tilt', `${item.tilt || 0}deg`);

        if (item.type === 'photo') {
            card.innerHTML = `
                <div class="polaroid-tape"></div>
                <div class="polaroid-image-wrap">
                    <img src="${item.src}" alt="${item.caption}" loading="lazy">
                </div>
                <p class="polaroid-caption">${item.caption}</p>
                <span class="polaroid-date">${item.date || ''}</span>
                <span class="polaroid-sticker ${item.stickerPos || 's-br'}">${item.sticker || '💖'}</span>
            `;
            card.addEventListener('click', () => {
                openLightbox(item.photoIndex !== undefined ? item.photoIndex : 0);
            });
        } else {
            card.innerHTML = `
                <div class="polaroid-tape"></div>
                <div class="polaroid-image-wrap">
                    <div class="scrapbook-illust-wrap">
                        <span class="scrapbook-illust-icon">${item.icon || '💌'}</span>
                        <p class="scrapbook-illust-quote">${item.quote || ''}</p>
                    </div>
                </div>
                <p class="polaroid-caption">${item.caption}</p>
                <span class="polaroid-date">${item.date || ''}</span>
                <span class="polaroid-sticker ${item.stickerPos || 's-tl'}">${item.sticker || '🌸'}</span>
            `;
            card.addEventListener('click', () => {
                // Flash / pop animation
                card.style.transform = 'scale(1.08) rotate(0deg)';
                setTimeout(() => {
                    card.style.transform = '';
                }, 300);
            });
        }

        grid.appendChild(card);
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

let noteInterval = null;

function syncTurntableUI() {
    const vinylDisc = document.getElementById('vinylDisc');
    const tonearm = document.getElementById('turntableTonearm');
    const statusTag = document.getElementById('turntableStatusTag');
    const ttPlayIcon = document.querySelector('#ttPlayPauseBtn .tt-icon-play');
    const ttPauseIcon = document.querySelector('#ttPlayPauseBtn .tt-icon-pause');
    const songTitle = document.getElementById('turntableSongTitle');
    const songArtist = document.getElementById('turntableSongArtist');
    const vinylCenterTitle = document.getElementById('vinylCenterTitle');

    if (currentSongIndex >= 0 && currentSongIndex < PLAYLIST.length) {
        const currentSong = PLAYLIST[currentSongIndex];
        if (songTitle) songTitle.textContent = currentSong.title;
        if (songArtist) songArtist.textContent = currentSong.artist || 'Hasan & Ashley';
        if (vinylCenterTitle) vinylCenterTitle.textContent = currentSong.title;
    }

    if (isPlaying) {
        if (vinylDisc) vinylDisc.classList.add('spinning');
        if (tonearm) tonearm.classList.add('playing');
        if (statusTag) statusTag.textContent = 'Sedang Berputar 🎶';
        if (ttPlayIcon) ttPlayIcon.style.display = 'none';
        if (ttPauseIcon) ttPauseIcon.style.display = 'block';

        if (!noteInterval) {
            noteInterval = setInterval(spawnTurntableNote, 900);
        }
    } else {
        if (vinylDisc) vinylDisc.classList.remove('spinning');
        if (tonearm) tonearm.classList.remove('playing');
        if (statusTag) statusTag.textContent = 'Siap Diputar 💿';
        if (ttPlayIcon) ttPlayIcon.style.display = 'block';
        if (ttPauseIcon) ttPauseIcon.style.display = 'none';

        if (noteInterval) {
            clearInterval(noteInterval);
            noteInterval = null;
        }
    }
}

function spawnTurntableNote() {
    const notesContainer = document.getElementById('turntableNotes');
    if (!notesContainer || !isPlaying) return;
    const note = document.createElement('span');
    note.classList.add('music-note-float');
    const notes = ['♪', '♫', '♬', '♩', '💖', '✨'];
    note.textContent = notes[Math.floor(Math.random() * notes.length)];
    const startX = 60 + Math.random() * 80;
    const startY = 60 + Math.random() * 70;
    note.style.left = `${startX}px`;
    note.style.top = `${startY}px`;
    note.style.setProperty('--dx', `${(Math.random() - 0.5) * 60}px`);
    note.style.setProperty('--dr', `${(Math.random() - 0.5) * 45}deg`);
    notesContainer.appendChild(note);
    setTimeout(() => note.remove(), 2500);
}

function updatePlayPauseUI() {
    const playIcon = document.querySelector('#playerPlayPause .play-icon');
    const pauseIcon = document.querySelector('#playerPlayPause .pause-icon');

    if (isPlaying) {
        if (playIcon) playIcon.style.display = 'none';
        if (pauseIcon) pauseIcon.style.display = 'block';
    } else {
        if (playIcon) playIcon.style.display = 'block';
        if (pauseIcon) pauseIcon.style.display = 'none';
    }
    syncTurntableUI();
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
    const playerSongTitle = document.getElementById('playerSongTitle');
    const playerSongArtist = document.getElementById('playerSongArtist');
    if (playerSongTitle) playerSongTitle.textContent = song.title;
    if (playerSongArtist) playerSongArtist.textContent = song.artist || '';
    syncTurntableUI();
}

function formatTime(seconds) {
    if (isNaN(seconds) || !isFinite(seconds)) return '0:00';
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins}:${secs.toString().padStart(2, '0')}`;
}

function initTurntablePlayer() {
    const playPauseBtn = document.getElementById('ttPlayPauseBtn');
    const prevBtn = document.getElementById('ttPrevBtn');
    const nextBtn = document.getElementById('ttNextBtn');
    const progressTrack = document.getElementById('ttProgressTrack');

    if (playPauseBtn) {
        playPauseBtn.addEventListener('click', (e) => {
            e.stopPropagation();
            togglePlayPause();
        });
    }
    if (prevBtn) {
        prevBtn.addEventListener('click', (e) => {
            e.stopPropagation();
            playPrev();
        });
    }
    if (nextBtn) {
        nextBtn.addEventListener('click', (e) => {
            e.stopPropagation();
            playNext();
        });
    }
    if (progressTrack) {
        progressTrack.addEventListener('click', (e) => {
            e.stopPropagation();
            if (!audioPlayer || !audioPlayer.duration) return;
            const rect = progressTrack.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const pct = Math.max(0, Math.min(1, x / rect.width));
            audioPlayer.currentTime = pct * audioPlayer.duration;
        });
    }
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
        const curFormatted = formatTime(audioPlayer.currentTime);
        
        const playerProgressFill = document.getElementById('playerProgressFill');
        const playerCurrentTime = document.getElementById('playerCurrentTime');
        const ttProgressBar = document.getElementById('ttProgressBar');
        const ttCurrentTime = document.getElementById('ttCurrentTime');

        if (playerProgressFill) playerProgressFill.style.width = pct + '%';
        if (playerCurrentTime) playerCurrentTime.textContent = curFormatted;
        if (ttProgressBar) ttProgressBar.style.width = pct + '%';
        if (ttCurrentTime) ttCurrentTime.textContent = curFormatted;
    });

    // Duration loaded
    audioPlayer.addEventListener('loadedmetadata', () => {
        const durFormatted = formatTime(audioPlayer.duration);
        const playerDuration = document.getElementById('playerDuration');
        const ttDuration = document.getElementById('ttDuration');

        if (playerDuration) playerDuration.textContent = durFormatted;
        if (ttDuration) ttDuration.textContent = durFormatted;

        // Also update the playlist item duration
        if (currentSongIndex >= 0) {
            const durEl = document.getElementById('duration-' + currentSongIndex);
            if (durEl) durEl.textContent = durFormatted;
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

    // Init Turntable events
    initTurntablePlayer();
}


// ═══════════════════════════════════════════════════════════════
//  VIDEO GALLERY
//  Cara pakai:
//  1. Taruh file video (mp4/webm) ke folder videos/
//  2. Tambahkan entry di array VIDEOS di atas
// ═══════════════════════════════════════════════════════════════
function initVideoGallery() {
    const grid = document.getElementById('videoGrid');

    if (VIDEOS.length === 0) {
        grid.innerHTML = `
            <div class="video-empty">
                <div class="video-empty-icon">🎬</div>
                <p class="video-empty-text">Belum ada video kenangan...</p>
                <p class="video-empty-hint">Taruh video di folder videos/ lalu daftarkan di script.js</p>
            </div>
        `;
        return;
    }

    grid.innerHTML = '';
    VIDEOS.forEach((video, index) => {
        const item = document.createElement('div');
        item.classList.add('video-item');
        item.innerHTML = `
            <video src="${video.src}" preload="metadata" muted></video>
            <div class="video-play-overlay">
                <div class="video-play-btn">
                    <svg viewBox="0 0 24 24" fill="currentColor"><path d="M8 5v14l11-7z"/></svg>
                </div>
            </div>
            <div class="video-info">
                <span class="video-info-title">${video.caption || 'Video kenangan'}</span>
                ${video.date ? `<span class="video-info-date">${video.date}</span>` : ''}
            </div>
        `;
        item.addEventListener('click', () => openVideoLightbox(index));
        grid.appendChild(item);
    });
}

function openVideoLightbox(index) {
    const lightbox = document.getElementById('videoLightbox');
    const player = document.getElementById('videoLightboxPlayer');
    const caption = document.getElementById('videoLightboxCaption');

    player.src = VIDEOS[index].src;
    caption.textContent = VIDEOS[index].caption || '';
    lightbox.classList.add('active');
    document.body.style.overflow = 'hidden';
    player.play().catch(() => {});
}

function closeVideoLightbox() {
    const lightbox = document.getElementById('videoLightbox');
    const player = document.getElementById('videoLightboxPlayer');
    player.pause();
    player.currentTime = 0;
    lightbox.classList.remove('active');
    document.body.style.overflow = '';
}

function initVideoLightbox() {
    document.getElementById('videoLightboxClose').addEventListener('click', closeVideoLightbox);

    document.getElementById('videoLightbox').addEventListener('click', (e) => {
        if (e.target.id === 'videoLightbox') closeVideoLightbox();
    });

    document.addEventListener('keydown', (e) => {
        const lightbox = document.getElementById('videoLightbox');
        if (!lightbox.classList.contains('active')) return;
        if (e.key === 'Escape') closeVideoLightbox();
    });
}


// ═══════════════════════════════════════════════════════════════
//  THEME SWITCHER
//  3 mode: romantic (default), sunset (senja), night (malam)
// ═══════════════════════════════════════════════════════════════
function initThemeSwitcher() {
    const toggleBtn = document.getElementById('themeToggleBtn');
    const panel = document.getElementById('themePanel');
    const options = document.querySelectorAll('.theme-option');

    // Load saved theme from localStorage
    const savedTheme = localStorage.getItem('hasan-ashley-theme') || 'romantic';
    setTheme(savedTheme);

    // Toggle panel
    toggleBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        panel.classList.toggle('open');
    });

    // Close panel when clicking outside
    document.addEventListener('click', (e) => {
        if (!e.target.closest('.theme-switcher')) {
            panel.classList.remove('open');
        }
    });

    // Theme option buttons
    options.forEach(option => {
        option.addEventListener('click', (e) => {
            e.stopPropagation();
            const theme = option.dataset.theme;
            setTheme(theme);
            localStorage.setItem('hasan-ashley-theme', theme);

            // Close panel after short delay
            setTimeout(() => {
                panel.classList.remove('open');
            }, 300);
        });
    });
}

function setTheme(theme) {
    const body = document.body;
    body.setAttribute('data-theme', theme);

    // Update active state on buttons
    const options = document.querySelectorAll('.theme-option');
    options.forEach(opt => {
        opt.classList.toggle('active', opt.dataset.theme === theme);
    });

    // Update toggle button icon
    const toggleBtn = document.getElementById('themeToggleBtn');
    const icons = {
        romantic: `<svg class="theme-toggle-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="4"/><path d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M6.34 17.66l-1.41 1.41M19.07 4.93l-1.41 1.41"/></svg>`,
        sunset: `<svg class="theme-toggle-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="5"/><path d="M12 1v2M12 21v2M4.22 4.22l1.42 1.42M18.36 18.36l1.42 1.42M1 12h2M21 12h2M4.22 19.78l1.42-1.42M18.36 5.64l1.42-1.42"/></svg>`,
        night: `<svg class="theme-toggle-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/></svg>`
    };
    toggleBtn.innerHTML = icons[theme] || icons.romantic;
}


// ═══════════════════════════════════════════════════════════════
//  3. FALLING PETALS (KELOPAK BUNGA JATUH PERLAHAN)
// ═══════════════════════════════════════════════════════════════
function initFallingPetals() {
    const container = document.getElementById('fallingPetals');
    if (!container) return;

    const PETAL_EMOJIS = ['🌸', '💮', '🏵️', '🌺'];
    const petalCount = window.innerWidth < 600 ? 10 : 16;

    for (let i = 0; i < petalCount; i++) {
        const petal = document.createElement('span');
        petal.classList.add('petal');
        petal.textContent = PETAL_EMOJIS[Math.floor(Math.random() * PETAL_EMOJIS.length)];

        const left = Math.random() * 100;
        const size = 0.8 + Math.random() * 1.1; // rem
        const duration = 8 + Math.random() * 10; // seconds
        const delay = Math.random() * 12; // seconds
        const drift = (Math.random() - 0.5) * 160; // px
        const rot = 180 + Math.random() * 360; // deg

        petal.style.cssText = `
            left: ${left}%;
            font-size: ${size}rem;
            animation-duration: ${duration}s;
            animation-delay: ${delay}s;
            --drift-x: ${drift}px;
            --rot: ${rot}deg;
        `;
        container.appendChild(petal);
    }
}


// ═══════════════════════════════════════════════════════════════
//  6. HITUNG MUNDUR HARI SPESIAL (SPECIAL COUNTDOWN)
// ═══════════════════════════════════════════════════════════════
let currentCountdownTarget = new Date('2026-10-26T00:00:00+08:00');
let countdownTimerId = null;

function updateSpecialCountdown() {
    const now = new Date();
    const diff = currentCountdownTarget - now;

    const daysEl = document.getElementById('cdDays');
    const hoursEl = document.getElementById('cdHours');
    const minsEl = document.getElementById('cdMinutes');
    const secsEl = document.getElementById('cdSeconds');

    if (!daysEl || !hoursEl || !minsEl || !secsEl) return;

    if (diff <= 0) {
        daysEl.textContent = '00';
        hoursEl.textContent = '00';
        minsEl.textContent = '00';
        secsEl.textContent = '00';
        return;
    }

    const totalSeconds = Math.floor(diff / 1000);
    const days = Math.floor(totalSeconds / 86400);
    const hours = Math.floor((totalSeconds % 86400) / 3600);
    const minutes = Math.floor((totalSeconds % 3600) / 60);
    const seconds = totalSeconds % 60;

    daysEl.textContent = String(days).padStart(2, '0');
    hoursEl.textContent = String(hours).padStart(2, '0');
    minsEl.textContent = String(minutes).padStart(2, '0');
    secsEl.textContent = String(seconds).padStart(2, '0');
}

function initSpecialCountdown() {
    const tabs = document.querySelectorAll('.countdown-tab');
    const eventTitle = document.getElementById('countdownEventTitle');
    const messageEl = document.getElementById('countdownMessage');

    tabs.forEach(tab => {
        tab.addEventListener('click', () => {
            tabs.forEach(t => t.classList.remove('active'));
            tab.classList.add('active');

            const targetStr = tab.dataset.target;
            const title = tab.dataset.title;
            const msg = tab.dataset.msg;

            if (targetStr) currentCountdownTarget = new Date(targetStr);
            if (eventTitle && title) eventTitle.textContent = `Menuju ${title}`;
            if (messageEl && msg) messageEl.textContent = msg;

            updateSpecialCountdown();
        });
    });

    updateSpecialCountdown();
    countdownTimerId = setInterval(updateSpecialCountdown, 1000);
}


// ═══════════════════════════════════════════════════════════════
//  1. AMPLOP SURAT INTERAKTIF (INTERACTIVE ENVELOPE)
// ═══════════════════════════════════════════════════════════════
function initEnvelope() {
    const envelopeBox = document.getElementById('envelopeBox');
    const openBtn = document.getElementById('openLetterBtn');
    const btnText = document.getElementById('openLetterBtnText');
    const waxSeal = document.getElementById('waxSeal');

    if (!envelopeBox || !openBtn) return;

    const envelopeContainer = document.getElementById('envelopeContainer');

    function toggleEnvelope() {
        const isOpen = envelopeBox.classList.toggle('open');
        if (envelopeContainer) {
            envelopeContainer.classList.toggle('is-open', isOpen);
        }
        if (btnText) {
            btnText.textContent = isOpen ? 'Tutup Surat (Close Letter)' : 'Open Letter (Buka Surat)';
        }

        if (isOpen) {
            // Smoothly center the envelope into view
            setTimeout(() => {
                envelopeBox.scrollIntoView({ behavior: 'smooth', block: 'center' });
            }, 250);

            // Burst sweet sparkle hearts
            const rect = envelopeBox.getBoundingClientRect();
            const centerX = rect.left + rect.width / 2;
            const centerY = rect.top + rect.height / 3;

            for (let i = 0; i < 15; i++) {
                setTimeout(() => {
                    const spark = document.createElement('span');
                    spark.textContent = HEART_EMOJIS[Math.floor(Math.random() * HEART_EMOJIS.length)];
                    spark.style.cssText = `
                        position: fixed;
                        left: ${centerX}px;
                        top: ${centerY}px;
                        pointer-events: none;
                        font-size: ${0.9 + Math.random() * 0.9}rem;
                        z-index: 9999;
                        animation: clickSparkle 1.2s ease-out forwards;
                        --tx: ${(Math.random() - 0.5) * 160}px;
                        --ty: ${-40 - Math.random() * 100}px;
                    `;
                    document.body.appendChild(spark);
                    setTimeout(() => spark.remove(), 1200);
                }, i * 40);
            }
        }
    }

    openBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        toggleEnvelope();
    });

    if (waxSeal) {
        waxSeal.addEventListener('click', (e) => {
            e.stopPropagation();
            toggleEnvelope();
        });
    }

    envelopeBox.addEventListener('click', (e) => {
        // Only toggle if clicking outside the paper text while open
        if (!e.target.closest('.envelope-letter')) {
            toggleEnvelope();
        }
    });
}


// ═══════════════════════════════════════════════════════════════
//  5. MINI KUIS KHUSUS ASHLEY (INTERACTIVE LOVE QUIZ)
// ═══════════════════════════════════════════════════════════════
const QUIZ_QUESTIONS = [
    {
        icon: "💍",
        question: "Kapan tanggal jadian resmi kita berdua?",
        options: [
            "26 September 2026",
            "14 Februari 2026",
            "1 Januari 2026",
            "26 Oktober 2026"
        ],
        correct: 0,
        explanation: "Benar sekali! 26 September 2026 adalah hari terbaik Hasan 💕"
    },
    {
        icon: "🥰",
        question: "Apa hal paling menggemaskan dari Ashley menurut Hasan?",
        options: [
            "Waktu Ashley ketawa lepas",
            "Waktu Ashley lagi ngambek tapi tetep imut",
            "Waktu Ashley perhatian dan nanyain kabar",
            "Semua hal tentang Ashley tanpa terkecuali! 💖"
        ],
        correct: 3,
        explanation: "1000% betul! Segala hal tentang Ashley selalu bikin Hasan jatuh cinta lagi dan lagi!"
    },
    {
        icon: "🍕",
        question: "Kalau Ashley lagi laper tapi bingung mau makan apa, jurus paling ampuh Hasan?",
        options: [
            "Biarin aja sampai nemu sendiri",
            "Sebutin 10 rekomendasi makanan & siap pesanin kesukaannya",
            "Suruh minum air putih banyak-banyak",
            "Ditinggal tidur"
        ],
        correct: 1,
        explanation: "Tentu dong! Siap melayani dan manjain perut tuan putri kesayangan!"
    },
    {
        icon: "🎵",
        question: "Lagu apa yang paling mewakili perasaan Hasan ke Ashley?",
        options: [
            "Ed Sheeran - Perfect",
            "Troye Sivan - Angel Baby",
            "Al-Ghazali - Kesayanganku",
            "Semua lagu cinta di semesta ini 🎶"
        ],
        correct: 3,
        explanation: "Yup! Semua lirik lagu cinta di dunia ini terasa seperti menceritakan Ashley!"
    },
    {
        icon: "👑",
        question: "Seberapa besar cinta Hasan buat Ashley hari ini dan selamanya?",
        options: [
            "Seluas samudera",
            "Setinggi bintang di langit",
            "Tak terhingga dan tak terhitung",
            "Lebih dari seluruh alam semesta ✨"
        ],
        correct: 3,
        explanation: "Bingo! Cinta Hasan ke Ashley melampaui seluruh bintang dan galaksi di semesta! 💕"
    }
];

let currentQuizIndex = 0;
let quizScore = 0;
let answered = false;

function initQuiz() {
    const quizCard = document.getElementById('quizCard');
    const resultCard = document.getElementById('quizResultCard');
    const nextBtn = document.getElementById('quizNextBtn');
    const restartBtn = document.getElementById('quizRestartBtn');

    if (!quizCard) return;

    renderQuizQuestion();

    if (nextBtn) {
        nextBtn.addEventListener('click', () => {
            currentQuizIndex++;
            if (currentQuizIndex < QUIZ_QUESTIONS.length) {
                renderQuizQuestion();
            } else {
                showQuizResult();
            }
        });
    }

    if (restartBtn) {
        restartBtn.addEventListener('click', () => {
            currentQuizIndex = 0;
            quizScore = 0;
            quizCard.style.display = 'block';
            resultCard.style.display = 'none';
            renderQuizQuestion();
        });
    }
}

function renderQuizQuestion() {
    answered = false;
    const q = QUIZ_QUESTIONS[currentQuizIndex];
    const total = QUIZ_QUESTIONS.length;

    document.getElementById('quizStepBadge').textContent = `Pertanyaan ${currentQuizIndex + 1} dari ${total}`;
    document.getElementById('quizScoreBadge').textContent = `Skor: ${quizScore} 💕`;
    document.getElementById('quizProgressFill').style.width = `${((currentQuizIndex + 1) / total) * 100}%`;

    document.getElementById('quizQuestionIcon').textContent = q.icon;
    document.getElementById('quizQuestionTitle').textContent = q.question;

    const feedback = document.getElementById('quizFeedback');
    feedback.className = 'quiz-feedback';
    feedback.style.display = 'none';

    const nextBtn = document.getElementById('quizNextBtn');
    nextBtn.style.display = 'none';
    if (currentQuizIndex === total - 1) {
        nextBtn.textContent = 'Lihat Hasil Kejutan 🏆';
    } else {
        nextBtn.textContent = 'Pertanyaan Selanjutnya ➔';
    }

    const optionsList = document.getElementById('quizOptionsList');
    optionsList.innerHTML = '';

    const letters = ['A', 'B', 'C', 'D'];
    q.options.forEach((optText, optIdx) => {
        const btn = document.createElement('button');
        btn.classList.add('quiz-option-btn');
        btn.innerHTML = `
            <span class="quiz-option-letter">${letters[optIdx]}</span>
            <span class="quiz-option-text">${optText}</span>
        `;
        btn.addEventListener('click', () => handleQuizAnswer(optIdx, btn));
        optionsList.appendChild(btn);
    });
}

function handleQuizAnswer(selectedIndex, selectedBtn) {
    if (answered) return;
    answered = true;

    const q = QUIZ_QUESTIONS[currentQuizIndex];
    const optionBtns = document.querySelectorAll('.quiz-option-btn');
    const feedback = document.getElementById('quizFeedback');
    const nextBtn = document.getElementById('quizNextBtn');

    optionBtns.forEach(btn => btn.disabled = true);

    if (selectedIndex === q.correct) {
        quizScore++;
        selectedBtn.classList.add('correct');
        feedback.textContent = `✨ ${q.explanation}`;
        feedback.className = 'quiz-feedback show-correct';
        feedback.style.display = 'block';
    } else {
        selectedBtn.classList.add('wrong');
        optionBtns[q.correct].classList.add('correct');
        feedback.textContent = `Jawaban yang paling pas: ${q.options[q.correct]}. ${q.explanation}`;
        feedback.className = 'quiz-feedback show-wrong';
        feedback.style.display = 'block';
    }

    document.getElementById('quizScoreBadge').textContent = `Skor: ${quizScore} 💕`;
    nextBtn.style.display = 'inline-block';
}

function showQuizResult() {
    const quizCard = document.getElementById('quizCard');
    const resultCard = document.getElementById('quizResultCard');
    const certScore = document.getElementById('certScoreDisplay');
    const desc = document.getElementById('quizResultDesc');

    quizCard.style.display = 'none';
    resultCard.style.display = 'block';

    certScore.textContent = `Skor Akhir: ${quizScore} / ${QUIZ_QUESTIONS.length} ❤️`;

    if (quizScore === QUIZ_QUESTIONS.length) {
        desc.textContent = "Sempurna! Kamu adalah wanita paling mengerti dan paling dicintai Hasan seumur hidup!";
    } else {
        desc.textContent = "Hebat banget! Apapun skornya, Ashley tetap juara satu di hati Hasan selamanya 💕";
    }

    triggerConfetti();
}


// ═══════════════════════════════════════════════════════════════
//  7. HALAMAN KEJUTAN TERAKHIR (ONE LAST THING & CONFETTI)
// ═══════════════════════════════════════════════════════════════
let confettiAnimationId = null;

function triggerConfetti() {
    const canvas = document.getElementById('confettiCanvas');
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    const pieces = [];
    const colors = ['#ff6b9d', '#ff4b72', '#ffd700', '#c44569', '#d6bcfa', '#ffffff'];

    for (let i = 0; i < 90; i++) {
        pieces.push({
            x: Math.random() * canvas.width,
            y: -20 - Math.random() * 100,
            size: 6 + Math.random() * 8,
            color: colors[Math.floor(Math.random() * colors.length)],
            speedY: 2 + Math.random() * 4,
            speedX: (Math.random() - 0.5) * 3,
            rot: Math.random() * 360,
            rotSpeed: (Math.random() - 0.5) * 8,
            isHeart: Math.random() > 0.6
        });
    }

    if (confettiAnimationId) cancelAnimationFrame(confettiAnimationId);

    function renderConfetti() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        pieces.forEach(p => {
            p.y += p.speedY;
            p.x += p.speedX;
            p.rot += p.rotSpeed;

            ctx.save();
            ctx.translate(p.x, p.y);
            ctx.rotate((p.rot * Math.PI) / 180);
            ctx.fillStyle = p.color;

            if (p.isHeart) {
                ctx.font = `${p.size + 4}px sans-serif`;
                ctx.fillText('💖', -p.size / 2, p.size / 2);
            } else {
                ctx.fillRect(-p.size / 2, -p.size / 2, p.size, p.size * 1.4);
            }
            ctx.restore();
        });

        const activePieces = pieces.filter(p => p.y < canvas.height + 50);
        if (activePieces.length > 0) {
            confettiAnimationId = requestAnimationFrame(renderConfetti);
        } else {
            ctx.clearRect(0, 0, canvas.width, canvas.height);
        }
    }

    renderConfetti();
}

function initSurpriseModal() {
    const triggerBtn = document.getElementById('surpriseTriggerBtn');
    const modal = document.getElementById('surpriseModal');
    const closeBtn = document.getElementById('surpriseCloseBtn');
    const virtualHugBtn = document.getElementById('virtualHugBtn');

    if (!triggerBtn || !modal) return;

    function openModal() {
        modal.classList.add('active');
        document.body.style.overflow = 'hidden';
        setTimeout(triggerConfetti, 100);
    }

    function closeModal() {
        modal.classList.remove('active');
        document.body.style.overflow = '';
        if (confettiAnimationId) cancelAnimationFrame(confettiAnimationId);
    }

    triggerBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        openModal();
    });

    if (closeBtn) {
        closeBtn.addEventListener('click', closeModal);
    }

    modal.addEventListener('click', (e) => {
        if (e.target === modal) closeModal();
    });

    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && modal.classList.contains('active')) {
            closeModal();
        }
    });

    if (virtualHugBtn) {
        virtualHugBtn.addEventListener('click', (e) => {
            e.stopPropagation();
            virtualHugBtn.innerHTML = `<span>Peluk Hangat Terkirim! 🥰🫂</span>`;
            virtualHugBtn.style.background = 'linear-gradient(135deg, #22c55e 0%, #16a34a 100%)';

            for (let i = 0; i < 35; i++) {
                setTimeout(() => {
                    const heart = document.createElement('span');
                    heart.textContent = ['🫂', '💖', '🥰', '🌸', '✨', '💕'][Math.floor(Math.random() * 6)];
                    heart.style.cssText = `
                        position: fixed;
                        left: ${10 + Math.random() * 80}vw;
                        bottom: -30px;
                        font-size: ${1.5 + Math.random() * 1.5}rem;
                        z-index: 100000;
                        pointer-events: none;
                        animation: floatHeart 3s ease-out forwards;
                    `;
                    document.body.appendChild(heart);
                    setTimeout(() => heart.remove(), 3000);
                }, i * 70);
            }

            setTimeout(() => {
                virtualHugBtn.innerHTML = `<span class="hug-icon">🤗</span><span class="hug-text">Kirim Peluk Lagi!</span>`;
                virtualHugBtn.style.background = '';
            }, 3500);
        });
    }
}


// ── Initialize Everything ──────────────────────
document.addEventListener('DOMContentLoaded', () => {
    // Theme switcher (init first so theme applies immediately)
    initThemeSwitcher();

    // Start timer
    updateTimer();
    setInterval(updateTimer, 1000);

    // 6. Special countdown
    initSpecialCountdown();

    // Visual effects (Hearts, Sparkles, Falling Petals, Quotes)
    initFloatingHearts();
    initSparkles();
    initFallingPetals();
    initQuotes();
    initScrollReveal();
    initScrollTop();
    initClickEffect();
    initCursorTrail();

    // 1. Amplop surat interaktif
    initEnvelope();

    // 2. Scrapbook Polaroid Gallery
    initGallery();
    initLightbox();

    // Video Gallery
    initVideoGallery();
    initVideoLightbox();

    // 4. Music Player & Vinyl Turntable
    initPlaylist();
    initMusicPlayer();

    // 5. Mini Kuis khusus Ashley
    initQuiz();

    // 7. Halaman Kejutan Terakhir
    initSurpriseModal();
});

