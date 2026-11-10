/**
 * NIGHTWAVE FESTIVAL 2027 — 100% OFFLINE JAVASCRIPT
 * Vanilla JS modular architecture with zero external APIs or remote scripts.
 */

document.addEventListener("DOMContentLoaded", () => {
  initNavigation();
  initThemeToggle();
  initCountdown();
  initArtists();
  initSchedule();
  initTickets();
  initGallery();
  initFaq();
  initScrollReveal();
  initBackToTop();
});

/* ==========================================================================
   1. NAVIGATION & SCROLL SPY
   ========================================================================== */
function initNavigation() {
  const hamburger = document.getElementById("hamburgerBtn");
  const navMenu = document.getElementById("navMenu");
  const navLinks = document.querySelectorAll(".nav-link");
  const navbar = document.querySelector(".navbar");

  if (hamburger && navMenu) {
    hamburger.addEventListener("click", () => {
      const isOpen = navMenu.classList.toggle("open");
      hamburger.classList.toggle("active");
      hamburger.setAttribute("aria-expanded", isOpen);
    });

    // Close mobile nav when clicking a link
    navLinks.forEach((link) => {
      link.addEventListener("click", () => {
        navMenu.classList.remove("open");
        hamburger.classList.remove("active");
        hamburger.setAttribute("aria-expanded", "false");
      });
    });
  }

  // Sticky navbar shadow and active link scroll spy
  const sections = document.querySelectorAll("section[id]");
  window.addEventListener("scroll", () => {
    const scrollY = window.pageYOffset;

    if (scrollY > 50) {
      navbar.style.boxShadow = "var(--shadow-md)";
    } else {
      navbar.style.boxShadow = "none";
    }

    sections.forEach((current) => {
      const sectionHeight = current.offsetHeight;
      const sectionTop = current.offsetTop - 120;
      const sectionId = current.getAttribute("id");
      const link = document.querySelector(`.nav-link[href*="${sectionId}"]`);

      if (link) {
        if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
          link.classList.add("active");
        } else {
          link.classList.remove("active");
        }
      }
    });
  });
}

/* ==========================================================================
   2. THEME TOGGLE (DARK / LIGHT)
   ========================================================================== */
function initThemeToggle() {
  const toggleBtn = document.getElementById("themeToggleBtn");
  const iconSun = document.getElementById("iconSun");
  const iconMoon = document.getElementById("iconMoon");

  const savedTheme = localStorage.getItem("nightwave_theme") || "light";
  document.documentElement.setAttribute("data-theme", savedTheme);
  updateThemeIcons(savedTheme);

  if (toggleBtn) {
    toggleBtn.addEventListener("click", () => {
      const current = document.documentElement.getAttribute("data-theme");
      const next = current === "light" ? "dark" : "light";
      document.documentElement.setAttribute("data-theme", next);
      localStorage.setItem("nightwave_theme", next);
      updateThemeIcons(next);
      showToast(`Mode tampilan: ${next === "light" ? "Terang (Light)" : "Gelap (Dark)"}`, "info");
    });
  }

  function updateThemeIcons(theme) {
    if (!iconSun || !iconMoon) return;
    if (theme === "light") {
      iconSun.style.display = "none";
      iconMoon.style.display = "block";
    } else {
      iconSun.style.display = "block";
      iconMoon.style.display = "none";
    }
  }
}

/* ==========================================================================
   3. COUNTDOWN TIMER (DUAL COUNTDOWNS)
   ========================================================================== */
function initCountdown() {
  // Countdown 1: Tanggal Mulai Festival (11 Juni 2027 15:00 WIB)
  const targetDate1 = new Date("2027-06-11T15:00:00").getTime();
  const daysEl1 = document.getElementById("countDays1");
  const hoursEl1 = document.getElementById("countHours1");
  const minsEl1 = document.getElementById("countMins1");
  const secsEl1 = document.getElementById("countSecs1");
  const statusEl1 = document.getElementById("countdownStatus1");

  // Countdown 2: Malam Puncak Festival & Secret Special (13 Juni 2027 18:00 WIB)
  const targetDate2 = new Date("2027-06-13T18:00:00").getTime();
  const daysEl2 = document.getElementById("countDays2");
  const hoursEl2 = document.getElementById("countHours2");
  const minsEl2 = document.getElementById("countMins2");
  const secsEl2 = document.getElementById("countSecs2");
  const statusEl2 = document.getElementById("countdownStatus2");

  function updateTimers() {
    const now = new Date().getTime();

    // Update Timer 1 (Festival Opening)
    if (daysEl1) {
      const distance1 = targetDate1 - now;
      if (distance1 <= 0) {
        daysEl1.textContent = "00";
        if (hoursEl1) hoursEl1.textContent = "00";
        if (minsEl1) minsEl1.textContent = "00";
        if (secsEl1) secsEl1.textContent = "00";
        if (statusEl1) statusEl1.textContent = "🔥 FESTIVAL RESMI DIBUKA!";
      } else {
        const d1 = Math.floor(distance1 / (1000 * 60 * 60 * 24));
        const h1 = Math.floor((distance1 % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const m1 = Math.floor((distance1 % (1000 * 60 * 60)) / (1000 * 60));
        const s1 = Math.floor((distance1 % (1000 * 60)) / 1000);

        daysEl1.textContent = String(d1).padStart(2, "0");
        if (hoursEl1) hoursEl1.textContent = String(h1).padStart(2, "0");
        if (minsEl1) minsEl1.textContent = String(m1).padStart(2, "0");
        if (secsEl1) secsEl1.textContent = String(s1).padStart(2, "0");
      }
    }

    // Update Timer 2 (Malam Puncak & Secret Finale)
    if (daysEl2) {
      const distance2 = targetDate2 - now;
      if (distance2 <= 0) {
        daysEl2.textContent = "00";
        if (hoursEl2) hoursEl2.textContent = "00";
        if (minsEl2) minsEl2.textContent = "00";
        if (secsEl2) secsEl2.textContent = "00";
        if (statusEl2) statusEl2.textContent = "✨ MALAM PUNCAK & SECRET FINALE BERLANGSUNG!";
      } else {
        const d2 = Math.floor(distance2 / (1000 * 60 * 60 * 24));
        const h2 = Math.floor((distance2 % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const m2 = Math.floor((distance2 % (1000 * 60 * 60)) / (1000 * 60));
        const s2 = Math.floor((distance2 % (1000 * 60)) / 1000);

        daysEl2.textContent = String(d2).padStart(2, "0");
        if (hoursEl2) hoursEl2.textContent = String(h2).padStart(2, "0");
        if (minsEl2) minsEl2.textContent = String(m2).padStart(2, "0");
        if (secsEl2) secsEl2.textContent = String(s2).padStart(2, "0");
      }
    }
  }

  updateTimers();
  setInterval(updateTimers, 1000);
}

/* ==========================================================================
   4. ARTIST DATA & MODAL
   ========================================================================== */
const ARTISTS_DATA = [
  {
    id: "hindia",
    name: "Hindia",
    isHeadliner: true,
    day: "Day 1 (11 Juni)",
    genre: "Indie / Alternative",
    category: "indie",
    stage: "Main Stage (Wave Arena)",
    time: "21:30 - 23:00 WIB",
    image: "assets/images/artist-01.jpg",
    alt: "Hindia performing on stage",
    bio: "Baskara Putra alias Hindia adalah ikon musik indie Indonesia modern. Dengan lirik tajam dan melodi emosional, Hindia akan membawakan set megah di Main Stage Nightwave Festival.",
    topTracks: ["Evaluasi", "Everything u are", "Secukupnya", "Kita Ke Sana", "Cincin", "Ramai Sepi Bersama"]
  },
  {
    id: "nadin",
    name: "Nadin Amizah",
    isHeadliner: true,
    day: "Day 3 (13 Juni - Malam Puncak)",
    genre: "Folk & Pop",
    category: "folk",
    stage: "Main Stage (Wave Arena)",
    time: "21:00 - 23:00 WIB",
    image: "assets/images/artist-02.jpg",
    alt: "Nadin Amizah performing on stage",
    bio: "Penyanyi dan pencipta lagu beraliran folk-pop dengan vokal lembut magis dan lirik puitis. Penampilan Nadin Amizah di Malam Puncak 13 Juni 2027 akan menjadi penutup rahasia penuh kejutan dengan lentera serta pesta kembang api spektakuler!",
    topTracks: ["Rayuan Perempuan Gila", "Berpayung Tuhan", "Sorai", "Semua Aku Dirayakan", "Di Akhir Perang"]
  },
  {
    id: "sheila-on-7",
    name: "Sheila On 7",
    isHeadliner: true,
    day: "Day 1 (11 Juni)",
    genre: "Pop Rock / Alternative",
    category: "rock",
    stage: "Main Stage (Wave Arena)",
    time: "19:45 - 21:00 WIB",
    image: "assets/images/artist-03.jpg",
    alt: "Sheila On 7 performing live",
    bio: "Band pop rock legendaris Indonesia asal Yogyakarta. Dengan lagu-lagu evergreen yang dicintai lintas generasi, Duta dan kawan-kawan siap membawakan koor nostalgia terbesar di panggung Nightwave 2027.",
    topTracks: ["Dan...", "Seberapa Pantas", "Melompat Lebih Tinggi", "Kisah Klasik Untuk Masa Depan", "Anugerah Terindah Yang Pernah Ku Miliki", "Film Favorit"]
  },
  {
    id: "hivi",
    name: "HiVi!",
    isHeadliner: false,
    day: "Day 2 (12 Juni)",
    genre: "Pop & Soul",
    category: "folk",
    stage: "Neon Garden",
    time: "20:00 - 21:15 WIB",
    image: "assets/images/artist-05.jpg",
    alt: "HiVi! performing at Neon Garden",
    bio: "Grup musik pop/soul ternama Indonesia dengan harmonisasi vokal manis, melodi earworm, dan energi panggung gembira yang siap mengajak seluruh penonton bernyanyi bersama.",
    topTracks: ["Pelangi", "Siapkah Kau 'Tuk Jatuh Cinta Lagi", "Remaja", "Orang Ke-3", "Satu-Satunya"]
  },
  {
    id: "pamungkas",
    name: "Pamungkas",
    isHeadliner: false,
    day: "Day 1 (11 Juni)",
    genre: "Folk & Pop",
    category: "folk",
    stage: "Cyber Stage",
    time: "18:30 - 19:30 WIB",
    image: "assets/images/artist-04.jpg",
    alt: "Pamungkas performing on stage",
    bio: "Solois dengan vokal khas dan aransemen synth-guitar, menghadirkan nuansa senja romantis di Nightwave.",
    topTracks: ["To The Bone", "Monolog", "Kenangan Manis", "I Love You But I'm Letting Go"]
  },
  {
    id: "lomba-sihir",
    name: "Lomba Sihir",
    isHeadliner: false,
    day: "Day 2 (12 Juni)",
    genre: "Indie / Alternative",
    category: "indie",
    stage: "Cyber Stage",
    time: "19:00 - 20:15 WIB",
    image: "assets/images/artist-06.jpg",
    alt: "Lomba Sihir performing at Cyber Stage",
    bio: "Supergroup beranggotakan musisi papan atas ibukota dengan perpaduan synth-pop eksentrik, kritik sosial cerdas, dan hook yang sangat adiktif.",
    topTracks: ["Ribuan Memori", "Ribet", "Semua Orang Pernah Sakit Hati", "Nirwana"]
  },
  {
    id: "barasuara",
    name: "Barasuara",
    isHeadliner: false,
    day: "Day 2 (12 Juni)",
    genre: "Rock",
    category: "rock",
    stage: "Main Stage (Wave Arena)",
    time: "21:15 - 22:30 WIB",
    image: "assets/images/artist-07.jpg",
    alt: "Barasuara performing on stage",
    bio: "Kekuatan rock kontemporer dengan ritme dinamis drum Marco Steffiano dan vokal Iga Massardi, menampilkan energi tinggi di Main Stage.",
    topTracks: ["Terbuang Dalam Waktu", "Api & Lentera", "Bahas Bahasa", "Guna Manusia"]
  },
  {
    id: "feast",
    name: ".Feast",
    isHeadliner: false,
    day: "Day 3 (13 Juni)",
    genre: "Rock",
    category: "rock",
    stage: "Cyber Stage",
    time: "19:30 - 20:45 WIB",
    image: "assets/images/artist-08.jpg",
    alt: ".Feast performing on stage",
    bio: "Unit rock keras asal Jakarta dengan riff bertenaga distorsi tinggi dan pesan keberanian sosial yang menggerakkan penonton.",
    topTracks: ["Tarot", "Peradaban", "Tarian Penghancur Raya", "Nina"]
  }
];

function initArtists() {
  const grid = document.getElementById("lineupGrid");
  const filterBtns = document.querySelectorAll(".filter-btn");

  renderArtists("all");

  filterBtns.forEach((btn) => {
    btn.addEventListener("click", () => {
      filterBtns.forEach((b) => b.classList.remove("active"));
      btn.classList.add("active");
      const cat = btn.getAttribute("data-filter");
      renderArtists(cat);
    });
  });

  function renderArtists(category) {
    if (!grid) return;
    grid.innerHTML = "";

    const filtered = category === "all"
      ? ARTISTS_DATA
      : ARTISTS_DATA.filter((a) => a.category === category);

    filtered.forEach((artist) => {
      const card = document.createElement("div");
      card.className = "artist-card reveal-on-scroll revealed";
      card.setAttribute("role", "button");
      card.setAttribute("tabindex", "0");
      card.setAttribute("aria-label", `Lihat profil ${artist.name}`);

      card.innerHTML = `
        ${artist.isHeadliner ? `<span class="artist-headliner-badge">★ HEADLINER</span>` : ""}
        <div class="artist-img-wrapper">
          <img src="${artist.image}" alt="${artist.name}" loading="lazy">
          <div class="artist-img-overlay"></div>
        </div>
        <div class="artist-info">
          <div class="artist-genre">${artist.genre}</div>
          <h3 class="artist-name">${artist.name}</h3>
          <div class="artist-meta-line">
            <span>${artist.stage.split(" (")[0]}</span>
            <span>${artist.day}</span>
          </div>
        </div>
      `;

      card.addEventListener("click", () => openArtistModal(artist));
      card.addEventListener("keydown", (e) => {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          openArtistModal(artist);
        }
      });

      grid.appendChild(card);
    });
  }
}

function openArtistModal(artist) {
  const modal = document.getElementById("artistModal");
  if (!modal) return;

  document.getElementById("artistModalImg").src = artist.image;
  document.getElementById("artistModalImg").alt = artist.name;
  document.getElementById("artistModalGenre").textContent = artist.genre;
  document.getElementById("artistModalName").textContent = artist.name;
  document.getElementById("artistModalStage").textContent = `${artist.stage} • ${artist.time}`;
  document.getElementById("artistModalBio").textContent = artist.bio;

  const tracksContainer = document.getElementById("artistModalTracks");
  tracksContainer.innerHTML = "";
  artist.topTracks.forEach((track, idx) => {
    const item = document.createElement("div");
    item.className = "track-item";
    item.innerHTML = `
      <span><strong>0${idx + 1}.</strong> ${track}</span>
      <span style="color: var(--accent-cyan); font-size: 0.8rem;">Popular Track</span>
    `;
    tracksContainer.appendChild(item);
  });

  modal.classList.add("active");
  document.body.style.overflow = "hidden";
}

/* ==========================================================================
   5. SCHEDULE FILTER & TABS
   ========================================================================== */
const SCHEDULE_DATA = {
  day1: [
    { time: "16:00 - 17:15", artist: "Festival Opening & Soundscape", stage: "Main Stage", stageType: "main", desc: "Gate opening & ambient festival kick-off (11 Juni 2027)" },
    { time: "17:30 - 18:30", artist: "Sunset Grooves Special", stage: "Neon Garden", stageType: "garden", desc: "Chillout electronic sessions by resident selectors" },
    { time: "18:30 - 19:30", artist: "Pamungkas", stage: "Cyber Stage", stageType: "cyber", desc: "Sing-along acoustic & synth set" },
    { time: "19:45 - 21:00", artist: "Sheila On 7", stage: "Main Stage (Wave Arena)", stageType: "main", desc: "Penampilan nostalgia megah menyanyikan Dan..., Seberapa Pantas & Melompat Lebih Tinggi" },
    { time: "21:30 - 23:00", artist: "HINDIA (HEADLINER)", stage: "Main Stage (Wave Arena)", stageType: "main", desc: "Puncak festival hari pertama dengan aransemen orkestra & paduan suara Evaluasi" }
  ],
  day2: [
    { time: "16:00 - 17:15", artist: "Indie Rising Showcase", stage: "Cyber Stage", stageType: "cyber", desc: "Acoustic sets & emerging community bands" },
    { time: "17:30 - 18:45", artist: "Neon Sound Bath", stage: "Neon Garden", stageType: "garden", desc: "Synthesizer exploration & chillout" },
    { time: "19:00 - 20:15", artist: "Lomba Sihir", stage: "Cyber Stage", stageType: "cyber", desc: "Eclectic synth-pop anthems" },
    { time: "20:00 - 21:15", artist: "HiVi!", stage: "Neon Garden", stageType: "garden", desc: "Penampilan gembira & bernyanyi bersama lagu Pelangi, Remaja, & Siapkah Kau 'Tuk Jatuh Cinta Lagi" },
    { time: "21:15 - 22:30", artist: "Barasuara", stage: "Main Stage (Wave Arena)", stageType: "main", desc: "Explosive rock & intricate polyrhythms" }
  ],
  day3: [
    { time: "16:00 - 17:30", artist: "Secret Opening Special Parade", stage: "Festival Plaza", stageType: "cyber", desc: "Selebrasi pembuka Malam Puncak 13 Juni 2027" },
    { time: "17:30 - 19:00", artist: "All-Star Secret Acoustic Jam", stage: "Neon Garden", stageType: "garden", desc: "Sesi kolaborasi rahasia musisi tanah air di panggung keutamaan" },
    { time: "19:30 - 20:45", artist: ".Feast", stage: "Cyber Stage", stageType: "cyber", desc: "Intense alternative rock & barricade anthem" },
    { time: "21:00 - 23:00", artist: "NADIN AMIZAH (MALAM PUNCAK SECRET HEADLINER)", stage: "Main Stage (Wave Arena)", stageType: "main", desc: "Penutupan sakral Malam Puncak 13 Juni 2027 (Secret Grand Finale), aransemen Rayuan Perempuan Gila & pesta kembang api raksasa!" }
  ]
};

function initSchedule() {
  const dayTabs = document.querySelectorAll(".day-tab-btn");
  const listContainer = document.getElementById("scheduleList");

  renderSchedule("day1");

  dayTabs.forEach((tab) => {
    tab.addEventListener("click", () => {
      dayTabs.forEach((t) => t.classList.remove("active"));
      tab.classList.add("active");
      const day = tab.getAttribute("data-day");

      // Fade out current items before re-rendering
      listContainer.style.opacity = "0";
      listContainer.style.transform = "translateY(10px)";
      listContainer.style.transition = "opacity 0.22s ease, transform 0.22s ease";

      setTimeout(() => {
        renderSchedule(day);
        listContainer.style.opacity = "1";
        listContainer.style.transform = "translateY(0)";
      }, 220);
    });
  });

  function renderSchedule(day) {
    if (!listContainer) return;
    listContainer.innerHTML = "";
    // Reset container transition for smooth re-entry
    listContainer.style.transition = "opacity 0.3s ease, transform 0.3s ease";

    const items = SCHEDULE_DATA[day] || [];
    items.forEach((item, index) => {
      const el = document.createElement("div");
      // Use "revealed" directly so items are always visible regardless of scroll position
      el.className = "schedule-item revealed";
      el.style.animationDelay = `${index * 70}ms`;
      el.style.opacity = "0";
      el.style.transform = "translateY(18px)";
      el.style.transition = `opacity 0.38s ease ${index * 70}ms, transform 0.38s cubic-bezier(0.16,1,0.3,1) ${index * 70}ms`;

      el.innerHTML = `
        <div class="schedule-time">${item.time}</div>
        <div class="schedule-details">
          <h4>${item.artist}</h4>
          <p>${item.desc}</p>
        </div>
        <div>
          <span class="schedule-stage-tag ${item.stageType}">${item.stage}</span>
        </div>
      `;
      listContainer.appendChild(el);

      // Trigger staggered animation on next frame
      requestAnimationFrame(() => {
        requestAnimationFrame(() => {
          el.style.opacity = "1";
          el.style.transform = "translateY(0)";
        });
      });
    });
  }
}

/* ==========================================================================
   6. TICKETS SIMULATION & MODAL
   ========================================================================== */
const TICKET_PRICES = {
  ga: 350000,
  vip: 750000,
  vvip: 1250000
};

const TICKET_NAMES = {
  ga: "General Admission (GA)",
  vip: "VIP Experience Pass",
  vvip: "Premium / VVIP All-Access"
};

function initTickets() {
  const modal = document.getElementById("ticketModal");
  const openBtns = document.querySelectorAll(".open-ticket-modal-btn");
  const form = document.getElementById("ticketBookingForm");
  const tierSelect = document.getElementById("ticketTierSelect");
  const qtyInput = document.getElementById("ticketQtyInput");
  const summarySubtotal = document.getElementById("summarySubtotal");
  const summaryTotal = document.getElementById("summaryTotal");
  const orderResultView = document.getElementById("orderResultView");
  const orderFormView = document.getElementById("orderFormView");

  openBtns.forEach((btn) => {
    btn.addEventListener("click", (e) => {
      e.preventDefault();
      const tier = btn.getAttribute("data-tier") || "vip";
      if (tierSelect) tierSelect.value = tier;
      resetTicketModal();
      modal.classList.add("active");
      document.body.style.overflow = "hidden";
      calculateTotal();
    });
  });

  if (tierSelect) tierSelect.addEventListener("change", calculateTotal);
  if (qtyInput) qtyInput.addEventListener("input", calculateTotal);

  function calculateTotal() {
    const tier = tierSelect ? tierSelect.value : "vip";
    const qty = parseInt(qtyInput ? qtyInput.value : 1) || 1;
    const pricePerTicket = TICKET_PRICES[tier] || 750000;
    const total = pricePerTicket * qty;

    const formatted = formatIDR(total);
    if (summarySubtotal) summarySubtotal.textContent = formatted;
    if (summaryTotal) summaryTotal.textContent = formatted;
  }

  if (form) {
    form.addEventListener("submit", (e) => {
      e.preventDefault();

      const name = document.getElementById("buyerName").value.trim();
      const email = document.getElementById("buyerEmail").value.trim();
      const phone = document.getElementById("buyerPhone").value.trim();
      const tier = tierSelect.value;
      const qty = parseInt(qtyInput.value) || 1;

      if (!name || !email || !phone) {
        showToast("Mohon lengkapi semua kolom pendaftaran!", "error");
        return;
      }

      // Generate random mock booking reference
      const bookingCode = `NW26-${Math.floor(100000 + Math.random() * 900000)}`;

      // Display simulated e-ticket
      document.getElementById("eticketCodeDisplay").textContent = bookingCode;
      document.getElementById("eticketTierDisplay").textContent = TICKET_NAMES[tier];
      document.getElementById("eticketNameDisplay").textContent = name;
      document.getElementById("eticketQtyDisplay").textContent = `${qty} Tiket`;
      document.getElementById("eticketTotalDisplay").textContent = formatIDR(TICKET_PRICES[tier] * qty);

      orderFormView.style.display = "none";
      orderResultView.style.display = "block";

      showToast("🎉 Pemesanan Berhasil! (Simulasi Tiket Offline)", "success");
    });
  }

  function resetTicketModal() {
    if (orderFormView) orderFormView.style.display = "block";
    if (orderResultView) orderResultView.style.display = "none";
    if (form) form.reset();
    if (qtyInput) qtyInput.value = 1;
  }
}

function formatIDR(amount) {
  return "Rp " + amount.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
}

/* ==========================================================================
   7. GALLERY & LIGHTBOX
   ========================================================================== */
function initGallery() {
  const items = document.querySelectorAll(".gallery-item");
  const lightbox = document.getElementById("galleryLightbox");
  const lightboxImg = document.getElementById("lightboxImg");
  const lightboxCaption = document.getElementById("lightboxCaption");
  const btnClose = document.getElementById("lightboxClose");
  const btnPrev = document.getElementById("lightboxPrev");
  const btnNext = document.getElementById("lightboxNext");

  let currentIndex = 0;
  const galleryData = Array.from(items).map((item) => {
    const img = item.querySelector("img");
    const title = item.querySelector(".gallery-title");
    return {
      src: img ? img.getAttribute("src") : "",
      alt: img ? img.getAttribute("alt") : "Concert Photo",
      caption: title ? title.textContent : ""
    };
  });

  items.forEach((item, index) => {
    item.addEventListener("click", () => {
      currentIndex = index;
      showLightbox(currentIndex);
    });
  });

  function showLightbox(index) {
    if (!lightbox || !galleryData[index]) return;
    lightboxImg.src = galleryData[index].src;
    lightboxImg.alt = galleryData[index].alt;
    lightboxCaption.textContent = galleryData[index].caption;
    lightbox.classList.add("active");
    document.body.style.overflow = "hidden";
  }

  function closeLightbox() {
    if (lightbox) {
      lightbox.classList.remove("active");
      document.body.style.overflow = "";
    }
  }

  if (btnClose) btnClose.addEventListener("click", closeLightbox);
  if (btnPrev) {
    btnPrev.addEventListener("click", (e) => {
      e.stopPropagation();
      currentIndex = (currentIndex - 1 + galleryData.length) % galleryData.length;
      showLightbox(currentIndex);
    });
  }
  if (btnNext) {
    btnNext.addEventListener("click", (e) => {
      e.stopPropagation();
      currentIndex = (currentIndex + 1) % galleryData.length;
      showLightbox(currentIndex);
    });
  }

  if (lightbox) {
    lightbox.addEventListener("click", (e) => {
      if (e.target === lightbox) closeLightbox();
    });
  }

  document.addEventListener("keydown", (e) => {
    if (!lightbox || !lightbox.classList.contains("active")) return;
    if (e.key === "Escape") closeLightbox();
    if (e.key === "ArrowLeft") {
      currentIndex = (currentIndex - 1 + galleryData.length) % galleryData.length;
      showLightbox(currentIndex);
    }
    if (e.key === "ArrowRight") {
      currentIndex = (currentIndex + 1) % galleryData.length;
      showLightbox(currentIndex);
    }
  });
}

/* ==========================================================================
   8. FAQ ACCORDION
   ========================================================================== */
function initFaq() {
  const faqHeaders = document.querySelectorAll(".faq-header");

  faqHeaders.forEach((header) => {
    header.addEventListener("click", () => {
      const parent = header.parentElement;
      const isOpen = parent.classList.contains("active");

      // Optional: Close others
      document.querySelectorAll(".faq-item").forEach((item) => item.classList.remove("active"));

      if (!isOpen) {
        parent.classList.add("active");
      }
    });
  });
}

/* ==========================================================================
   9. SCROLL REVEAL & UTILITIES
   ========================================================================== */
function initScrollReveal() {
  const elements = document.querySelectorAll(".reveal-on-scroll");

  if ("IntersectionObserver" in window) {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("revealed");
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12 });

    elements.forEach((el) => observer.observe(el));
  } else {
    // Fallback: immediate reveal
    elements.forEach((el) => el.classList.add("revealed"));
  }
}

function initBackToTop() {
  const backBtn = document.getElementById("backToTopBtn");
  if (!backBtn) return;

  window.addEventListener("scroll", () => {
    if (window.pageYOffset > 400) {
      backBtn.classList.add("visible");
    } else {
      backBtn.classList.remove("visible");
    }
  });

  backBtn.addEventListener("click", () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  });
}

// Modal closing helpers
document.querySelectorAll(".modal-backdrop").forEach((modal) => {
  modal.addEventListener("click", (e) => {
    if (e.target === modal) {
      modal.classList.remove("active");
      document.body.style.overflow = "";
    }
  });
});

document.querySelectorAll(".modal-close-btn").forEach((btn) => {
  btn.addEventListener("click", () => {
    const modal = btn.closest(".modal-backdrop");
    if (modal) {
      modal.classList.remove("active");
      document.body.style.overflow = "";
    }
  });
});

document.querySelectorAll(".modal-close-btn-trigger").forEach((btn) => {
  btn.addEventListener("click", () => {
    document.querySelectorAll(".modal-backdrop.active").forEach((m) => {
      m.classList.remove("active");
      document.body.style.overflow = "";
    });
  });
});

document.addEventListener("keydown", (e) => {
  if (e.key === "Escape") {
    document.querySelectorAll(".modal-backdrop.active").forEach((m) => {
      m.classList.remove("active");
      document.body.style.overflow = "";
    });
  }
});

/* ==========================================================================
   10. TOAST NOTIFICATION SYSTEM
   ========================================================================== */
function showToast(message, type = "info") {
  let container = document.getElementById("toastContainer");
  if (!container) {
    container = document.createElement("div");
    container.id = "toastContainer";
    container.className = "toast-container";
    document.body.appendChild(container);
  }

  const toast = document.createElement("div");
  toast.className = `toast ${type}`;
  toast.innerHTML = `
    <span>${message}</span>
  `;

  container.appendChild(toast);

  setTimeout(() => {
    toast.style.opacity = "0";
    toast.style.transform = "translateX(20px)";
    setTimeout(() => toast.remove(), 300);
  }, 3800);
}
