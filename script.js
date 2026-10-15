/* ============================================================
   Patliputra Guns Shooting Academy — script.js
   ============================================================ */

/* ---------- 1. DISCIPLINE DETAIL PANEL ---------- */
const disciplineDetails = {
  rifle: {
    title: "10m Air Rifle",
    brief: "A precision Olympic discipline where the athlete shoots from a standing position at a 10 metre target using an air rifle.",
    basic: "Beginners learn range safety, rifle handling, standing posture, balance, sight alignment, breathing rhythm, and controlled follow-through.",
    advanced: "Advanced training focuses on shot routine consistency, hold stability, trigger timing, electronic score analysis, match simulation, and pressure management."
  },
  pistol: {
    title: "10m Air Pistol",
    brief: "A focused Olympic discipline that develops control, patience, and accuracy while shooting one-handed at a 10 metre target.",
    basic: "Basic sessions cover safe pistol handling, grip, stance, sight picture, breathing, trigger squeeze, and responsible range conduct.",
    advanced: "Advanced sessions refine trigger control, shot timing, mental rehearsal, grouping analysis, competition rhythm, and recovery after low-scoring shots."
  },
  beginner: {
    title: "Beginner Training",
    brief: "A structured starting program for students who are new to shooting and need a safe, confident introduction to the sport.",
    basic: "Students learn equipment parts, target basics, range commands, safety rules, dry practice, first live shots, and coach-led correction.",
    advanced: "As confidence grows, students move into scoring awareness, repeatable shot process, early match habits, and discipline selection between rifle and pistol."
  },
  advanced: {
    title: "Advanced Coaching",
    brief: "Personalized coaching for athletes who already understand the basics and want sharper technique and competition performance.",
    basic: "The coach reviews posture, grip, aiming pattern, breathing, triggering, and follow-through to remove technical gaps.",
    advanced: "Athletes work on training plans, electronic target feedback, match strategy, mental discipline, finals pressure, and performance tracking."
  },
  competition: {
    title: "Competition Preparation",
    brief: "A performance-focused pathway for shooters preparing for district, state, national trials, and higher competitive opportunities.",
    basic: "Athletes learn match rules, preparation and sighting time, scoring expectations, safety protocol, equipment checks, and range-officer commands.",
    advanced: "Training includes full match simulation, time management, shot plan discipline, pressure routines, post-match review, and trial-readiness planning."
  }
};

const detailPanel = document.querySelector("#discipline-detail");
const disciplineButtons = document.querySelectorAll(".discipline-link");

function renderDiscipline(key) {
  const item = disciplineDetails[key];
  if (!item || !detailPanel) return;

  disciplineButtons.forEach((btn) => {
    btn.classList.toggle("active", btn.dataset.discipline === key);
  });

  detailPanel.innerHTML = `
    <p class="detail-kicker">Training Detail</p>
    <h3>${item.title}</h3>
    <p class="detail-brief">${item.brief}</p>
    <div class="detail-columns">
      <article>
        <strong>Basic Introduction</strong>
        <p>${item.basic}</p>
      </article>
      <article>
        <strong>Advanced Development</strong>
        <p>${item.advanced}</p>
      </article>
    </div>
  `;

  // Smooth scroll to detail panel
  detailPanel.scrollIntoView({ behavior: "smooth", block: "nearest" });
}

disciplineButtons.forEach((btn) => {
  btn.addEventListener("click", () => renderDiscipline(btn.dataset.discipline));
});

// Also make clicking a discipline card article open the detail
document.querySelectorAll(".discipline-grid article").forEach((card) => {
  card.addEventListener("click", (e) => {
    // Only trigger if user didn't click the button itself (button handles its own click)
    const btn = card.querySelector(".discipline-link");
    if (btn && e.target !== btn) btn.click();
  });
});


/* ---------- 2. GALLERY IMAGES — all sources ---------- */
const galleryImages = [
  { src: "assets/gallery-1.jpeg", alt: "Air rifles on the shooting bench with SIUS targets" },
  { src: "assets/gallery-2.jpeg", alt: "Air rifles at a range with Olympic logo" },
  { src: "assets/gallery-3.jpeg", alt: "PGSA shooter aiming an air pistol at the range" },
  { src: "assets/gallery-4.jpeg", alt: "PGSA athlete on podium at 10th East Zone Shooting Championship" },
  { src: "assets/gallery-5.jpeg", alt: "PGSA Shooting Team at the East Zone Championship" },
  { src: "assets/gallery-6.jpeg", alt: "PGSA team at XXXVI Bihar State Shooting Championship" },
];


/* ---------- 3. LIGHTBOX ---------- */
const lightbox     = document.getElementById("lightbox");
const lbImg        = document.getElementById("lightbox-img");
const lbCaption    = document.getElementById("lightbox-caption");
const lbClose      = document.getElementById("lightbox-close");
const lbPrev       = document.getElementById("lightbox-prev");
const lbNext       = document.getElementById("lightbox-next");

let lbCurrentIndex = 0;
let lbImages       = galleryImages; // default set; overridden by modal
let lbPreviousFocus = null;

function openLightbox(images, index) {
  lbImages       = images;
  lbCurrentIndex = index;
  lbPreviousFocus = document.activeElement;
  showLightboxSlide();
  lightbox.removeAttribute("hidden");
  document.body.style.overflow = "hidden";
  lbClose.focus();
}

function closeLightbox() {
  lightbox.setAttribute("hidden", "");
  document.body.style.overflow = "";
  if (lbPreviousFocus) lbPreviousFocus.focus();
}

function showLightboxSlide() {
  const item = lbImages[lbCurrentIndex];
  lbImg.src     = item.src;
  lbImg.alt     = item.alt;
  lbCaption.textContent = `${item.alt}  (${lbCurrentIndex + 1} / ${lbImages.length})`;

  // Re-trigger zoom animation
  lbImg.style.animation = "none";
  lbImg.offsetHeight; // reflow
  lbImg.style.animation = "";
}

function lightboxPrev() {
  lbCurrentIndex = (lbCurrentIndex - 1 + lbImages.length) % lbImages.length;
  showLightboxSlide();
}

function lightboxNext() {
  lbCurrentIndex = (lbCurrentIndex + 1) % lbImages.length;
  showLightboxSlide();
}

lbClose.addEventListener("click", closeLightbox);
lbPrev.addEventListener("click",  lightboxPrev);
lbNext.addEventListener("click",  lightboxNext);

lightbox.addEventListener("click", (e) => {
  if (e.target === lightbox) closeLightbox();
});

document.addEventListener("keydown", (e) => {
  if (lightbox.hasAttribute("hidden")) return;
  if (e.key === "Escape")      closeLightbox();
  if (e.key === "ArrowLeft")   lightboxPrev();
  if (e.key === "ArrowRight")  lightboxNext();
});

// Wire up gallery thumbnails
document.querySelectorAll(".gallery-thumb").forEach((img) => {
  img.addEventListener("click",   () => openLightbox(galleryImages, Number(img.dataset.index)));
  img.addEventListener("keydown", (e) => {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      openLightbox(galleryImages, Number(img.dataset.index));
    }
  });
});


/* ---------- 4. FULL GALLERY MODAL ---------- */
const fullGalleryModal   = document.getElementById("full-gallery-modal");
const fullGalleryGrid    = document.getElementById("modal-gallery-grid");
const openGalleryBtn     = document.getElementById("open-full-gallery");
const closeGalleryBtn    = document.getElementById("full-gallery-close");
let modalFocusBefore     = null;

function buildModalGrid() {
  if (fullGalleryGrid.children.length > 0) return; // already built
  galleryImages.forEach((item, i) => {
    const img = document.createElement("img");
    img.src       = item.src;
    img.alt       = item.alt;
    img.tabIndex  = 0;
    img.setAttribute("role", "button");
    img.setAttribute("aria-label", `View: ${item.alt}`);
    img.addEventListener("click", () => {
      closeFullGallery();          // close modal first
      openLightbox(galleryImages, i); // then open lightbox
    });
    img.addEventListener("keydown", (e) => {
      if (e.key === "Enter" || e.key === " ") {
        e.preventDefault();
        closeFullGallery();
        openLightbox(galleryImages, i);
      }
    });
    fullGalleryGrid.appendChild(img);
  });
}

function openFullGallery() {
  buildModalGrid();
  modalFocusBefore = document.activeElement;
  fullGalleryModal.removeAttribute("hidden");
  document.body.style.overflow = "hidden";
  closeGalleryBtn.focus();
}

function closeFullGallery() {
  fullGalleryModal.setAttribute("hidden", "");
  document.body.style.overflow = "";
  if (modalFocusBefore) modalFocusBefore.focus();
}

openGalleryBtn.addEventListener("click",  openFullGallery);
closeGalleryBtn.addEventListener("click", closeFullGallery);

fullGalleryModal.addEventListener("click", (e) => {
  if (e.target === fullGalleryModal) closeFullGallery();
});

document.addEventListener("keydown", (e) => {
  if (!fullGalleryModal.hasAttribute("hidden") && e.key === "Escape") closeFullGallery();
});


/* ---------- 5. LOCATION TABS + GOOGLE MAPS ---------- */
const locTabs     = document.querySelectorAll(".loc-tab");
const mapFrame    = document.getElementById("map-frame");
const locLabel    = document.getElementById("loc-label");
const locAddress  = document.getElementById("loc-address");

const locNames = {
  digha:      "Digha — Patna",
  kankarbagh: "Kankarbagh — Patna",
  ranchi:     "Ranchi — Coming Soon"
};

locTabs.forEach((tab) => {
  tab.addEventListener("click", () => {
    // Update tab states
    locTabs.forEach((t) => {
      t.classList.remove("active");
      t.setAttribute("aria-selected", "false");
    });
    tab.classList.add("active");
    tab.setAttribute("aria-selected", "true");

    // Update map
    const mapUrl = tab.dataset.map;
    if (mapFrame && mapUrl) {
      mapFrame.src = mapUrl;
    }

    // Update address panel
    if (locLabel)   locLabel.textContent = locNames[tab.dataset.loc] || "";
    if (locAddress) locAddress.innerHTML = tab.dataset.address || "";
  });
});


/* ---------- 6. ACTIVE NAV ON SCROLL ---------- */
const navLinks = document.querySelectorAll("nav a[href^='#']");
const sections = Array.from(navLinks)
  .map((a) => document.querySelector(a.getAttribute("href")))
  .filter(Boolean);

const navObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        navLinks.forEach((a) => a.classList.remove("active"));
        const active = document.querySelector(`nav a[href="#${entry.target.id}"]`);
        if (active) active.classList.add("active");
      }
    });
  },
  { rootMargin: "-40% 0px -55% 0px" }
);

sections.forEach((sec) => navObserver.observe(sec));


/* ---------- 7. MEDAL HALL OF FAME — YEAR TABS + FILTER ---------- */
const yearTabs   = document.querySelectorAll(".my-tab");
const yearPanels = document.querySelectorAll(".medal-year-panel");
const filterPills = document.querySelectorAll(".mf-pill");
let currentFilter = "all";

function showYear(year) {
  yearTabs.forEach((t) => {
    t.classList.toggle("active", t.dataset.year === year);
    t.setAttribute("aria-selected", t.dataset.year === year ? "true" : "false");
  });

  yearPanels.forEach((p) => {
    p.classList.toggle("active", p.dataset.year === year);
  });

  // Re-apply current filter inside the newly active panel
  applyFilter(currentFilter);
}

function applyFilter(filter) {
  currentFilter = filter;

  filterPills.forEach((p) => p.classList.toggle("active", p.dataset.filter === filter));

  // Only operate on the currently visible panel
  const activePanel = document.querySelector(".medal-year-panel.active");
  if (!activePanel) return;

  activePanel.querySelectorAll(".championship-block").forEach((block) => {
    const type = block.dataset.type; // "state" or "zone"
    const show = filter === "all" || filter === type;
    block.classList.toggle("hidden", !show);
  });
}

yearTabs.forEach((tab) => {
  tab.addEventListener("click", () => showYear(tab.dataset.year));
});

filterPills.forEach((pill) => {
  pill.addEventListener("click", () => applyFilter(pill.dataset.filter));
});


/* ---------- 8. MOBILE NAV TOGGLE ---------- */
const navToggle = document.getElementById("nav-toggle");
const primaryNav = document.getElementById("primary-nav");

if (navToggle && primaryNav) {
  navToggle.addEventListener("click", () => {
    const isOpen = primaryNav.classList.toggle("open");
    navToggle.classList.toggle("open", isOpen);
    navToggle.setAttribute("aria-expanded", isOpen ? "true" : "false");
  });

  // Close nav when clicking any link
  primaryNav.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", () => {
      primaryNav.classList.remove("open");
      navToggle.classList.remove("open");
      navToggle.setAttribute("aria-expanded", "false");
    });
  });

  // Close nav on click outside
  document.addEventListener("click", (e) => {
    if (!primaryNav.contains(e.target) && !navToggle.contains(e.target) && primaryNav.classList.contains("open")) {
      primaryNav.classList.remove("open");
      navToggle.classList.remove("open");
      navToggle.setAttribute("aria-expanded", "false");
    }
  });
}


/* ---------- 9. TOURNAMENT ALERTS & CIRCULAR MODAL ---------- */
const tFilterBtns = document.querySelectorAll(".t-filter-btn");
const tournamentCards = document.querySelectorAll(".tournament-card");

tFilterBtns.forEach((btn) => {
  btn.addEventListener("click", () => {
    tFilterBtns.forEach((b) => {
      b.classList.remove("active");
      b.setAttribute("aria-selected", "false");
    });
    btn.classList.add("active");
    btn.setAttribute("aria-selected", "true");

    const filter = btn.dataset.filter;
    tournamentCards.forEach((card) => {
      const match = filter === "all" || card.dataset.category === filter;
      card.classList.toggle("hidden", !match);
    });
  });
});

// Circular Modal data & handler
const circularModal = document.getElementById("circular-modal");
const circularModalClose = document.getElementById("circular-modal-close");
const circKicker = document.getElementById("circ-modal-kicker");
const circTitle = document.getElementById("circ-modal-title");
const circBody = document.getElementById("circ-modal-body");
const circAction = document.getElementById("circ-modal-action");

const circularData = {
  "state-36": {
    kicker: "Bihar State Rifle Association (BSSA) Circular",
    title: "36th Bihar State Shooting Championship 2026",
    actionText: "Register Shooter via PGSA",
    actionHref: "#enquiry",
    body: `
      <div class="circ-callout">
        <strong>Mandatory Pre-requisite:</strong> All participating shooters must hold an active shooter ID with the Bihar State Rifle Association or NRAI.
      </div>
      <h4>Championship Schedule & Dates</h4>
      <ul>
        <li><strong>Competition Dates:</strong> November 12 – 19, 2026</li>
        <li><strong>Weapons Checking & Kit Inspection:</strong> November 11, 2026 (10:00 AM – 4:00 PM)</li>
        <li><strong>Air Weapons Venue:</strong> Patliputra Sports Complex Range, Kankarbagh, Patna</li>
        <li><strong>Fire Arms Venue (25m / 50m):</strong> Kalyan Bigha Shooting Range, Nalanda</li>
      </ul>
      <h4>Eligible Disciplines & Events</h4>
      <ul>
        <li>10m Air Rifle (Sub-Youth, Youth, Junior & Senior Men/Women - NR & ISSF)</li>
        <li>10m Air Pistol (Sub-Youth, Youth, Junior & Senior Men/Women - NR & ISSF)</li>
        <li>25m Sports Pistol & Standard Pistol</li>
        <li>50m Rifle 3 Positions & 50m Free Pistol</li>
      </ul>
      <h4>Registration & Submission Guidelines</h4>
      <p>Submit your entry fees and weapon serial numbers at the PGSA administrative office by <strong>October 30, 2026</strong>. Late fee applicable thereafter.</p>
    `
  },
  "internal-sius": {
    kicker: "Patliputra Guns Shooting Academy Internal Circular",
    title: "Monthly SIUS Ranking Match & League — Stage 4",
    actionText: "Book Match Firing Point",
    actionHref: "#enquiry",
    body: `
      <div class="circ-callout">
        <strong>Tournament Objective:</strong> Electronic target simulation match under strict ISSF timing to establish internal academy rankings and select team representations.
      </div>
      <h4>Match Details</h4>
      <ul>
        <li><strong>Dates:</strong> October 25 & 26, 2026 (Saturday & Sunday)</li>
        <li><strong>Firing Relays:</strong> Relay 1 (08:30 AM), Relay 2 (11:00 AM), Relay 3 (02:00 PM)</li>
        <li><strong>Venue:</strong> PGSA Digha Range (Lane 1 to 12 SIUS Electronic Targets)</li>
        <li><strong>Match Course:</strong> 60 competition shots in 75 minutes (Air Rifle/Pistol)</li>
        <li><strong>Finals:</strong> Top 8 shooters per category advance to the 24-shot ISSF decimal final</li>
      </ul>
      <h4>Incentives & Awards</h4>
      <p>Medals for Top 3 in each category. Stage 4 winner receives match-grade H&N / RWS pellets grant and subsidised range hours for state preparation.</p>
    `
  },
  "east-zone-11": {
    kicker: "East Zone Shooting Championship Circular (NRAI)",
    title: "11th East Zone Shooting Championship 2026 (Pre-National)",
    actionText: "Join Academy Travel Squad",
    actionHref: "#enquiry",
    body: `
      <div class="circ-callout">
        <strong>Eligibility:</strong> Shooters achieving Minimum Qualifying Score (MQS) at the 35th or 36th Bihar State Shooting Championship.
      </div>
      <h4>Zonal Championship Overview</h4>
      <ul>
        <li><strong>Dates:</strong> December 04 – 10, 2026</li>
        <li><strong>Host Range:</strong> Asansol Rifle Club & Range, West Bengal</li>
        <li><strong>Participating States:</strong> Bihar, West Bengal, Jharkhand, Odisha</li>
        <li><strong>Qualification Goal:</strong> Achieving National MQS qualifies athlete for the 68th National Shooting Championship Competitions (NSCC).</li>
      </ul>
      <h4>PGSA Team Logistics Support</h4>
      <p>PGSA provides supervised squad travel, hotel reservations, coach accompaniment (Head Coach Bibaswan Ganguly & team coaches), and official weapon transportation documentation.</p>
    `
  },
  "nrai-trials": {
    kicker: "National Rifle Association of India (NRAI)",
    title: "National Selection Trials 1 & 2 (Rifle / Pistol 2027)",
    actionText: "Enrol in High-Performance Camp",
    actionHref: "#enquiry",
    body: `
      <div class="circ-callout">
        <strong>High Performance Pathway:</strong> Official trials for selection of the Indian National Shooting Squad for ISSF World Cups and Asian Championships.
      </div>
      <h4>Trials Overview</h4>
      <ul>
        <li><strong>Dates:</strong> January 15 – 24, 2027</li>
        <li><strong>Venue:</strong> Dr. Karni Singh Shooting Range (DKSSR), Tughlakabad, New Delhi</li>
        <li><strong>Eligibility:</strong> Shooters holding Renowned Shot status or qualified from 67th NSCC with qualifying averages.</li>
      </ul>
      <h4>PGSA Intensive Preparation Camp</h4>
      <p>Consultant Head Coach Bibaswan Ganguly (ISSF A License) will conduct a 2-week intensive match-simulation camp covering trigger timing, electronic trace analysis (SCATT), and finals pressure routines.</p>
    `
  }
};

document.querySelectorAll(".open-circular-btn").forEach((btn) => {
  btn.addEventListener("click", () => {
    const key = btn.dataset.circular;
    const data = circularData[key];
    if (!data || !circularModal) return;

    if (circKicker) circKicker.textContent = data.kicker;
    if (circTitle) circTitle.textContent = data.title;
    if (circBody) circBody.innerHTML = data.body;
    if (circAction) {
      circAction.textContent = data.actionText;
      circAction.href = data.actionHref;
    }

    circularModal.removeAttribute("hidden");
    document.body.style.overflow = "hidden";
  });
});

function closeCircularModal() {
  if (!circularModal) return;
  circularModal.setAttribute("hidden", "");
  document.body.style.overflow = "";
}

if (circularModalClose) circularModalClose.addEventListener("click", closeCircularModal);
if (circularModal) {
  circularModal.addEventListener("click", (e) => {
    if (e.target === circularModal) closeCircularModal();
  });
}
document.addEventListener("keydown", (e) => {
  if (circularModal && !circularModal.hasAttribute("hidden") && e.key === "Escape") {
    closeCircularModal();
  }
});


/* ---------- 10. FLOATING CARDS 3D TILT ON DESKTOP ---------- */
if (window.matchMedia("(min-width: 981px)").matches) {
  const fameCards = document.querySelectorAll(".fame-card");
  fameCards.forEach((card) => {
    card.addEventListener("mousemove", (e) => {
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      const xPct = (x / rect.width - 0.5) * 12;
      const yPct = (y / rect.height - 0.5) * -12;
      card.style.transform = `perspective(1000px) rotateX(${yPct}deg) rotateY(${xPct}deg) translateY(-8px) scale(1.02)`;
    });

    card.addEventListener("mouseleave", () => {
      card.style.transform = "";
    });
  });
}


/* ---------- 11. HALL OF FAME — STAR PERFORMERS SLIDESHOW ---------- */
const fameSliderTrack = document.getElementById("fame-slider-track");
const fameSlides = document.querySelectorAll(".fame-slide");
const famePrevBtn = document.getElementById("fame-prev");
const fameNextBtn = document.getElementById("fame-next");
const fameDots = document.querySelectorAll(".fame-dot");
const fameWrapper = document.getElementById("fame-slider-wrapper");

if (fameSliderTrack && fameSlides.length) {
  let currentSlide = 0;
  let autoplayTimer = null;

  function getSlideStep() {
    if (!fameSlides.length) return 0;
    const slide = fameSlides[0];
    const style = window.getComputedStyle(slide);
    const marginRight = parseFloat(style.marginRight) || 0;
    return slide.offsetWidth + marginRight;
  }

  function getMaxSlideIndex() {
    if (window.innerWidth <= 768) {
      return fameSlides.length - 1;
    } else {
      // 2 slides visible on larger screens
      return Math.max(0, fameSlides.length - 2);
    }
  }

  function showFameSlide(index) {
    const maxIdx = getMaxSlideIndex();
    if (index > maxIdx) {
      currentSlide = 0;
    } else if (index < 0) {
      currentSlide = maxIdx;
    } else {
      currentSlide = index;
    }

    const step = getSlideStep();
    fameSliderTrack.style.transform = `translateX(-${currentSlide * step}px)`;

    fameDots.forEach((dot, i) => {
      const isActive = i === currentSlide;
      dot.classList.toggle("active", isActive);
      dot.setAttribute("aria-selected", isActive ? "true" : "false");
    });
  }

  function nextFameSlide() {
    showFameSlide(currentSlide + 1);
  }

  function prevFameSlide() {
    showFameSlide(currentSlide - 1);
  }

  if (fameNextBtn) fameNextBtn.addEventListener("click", nextFameSlide);
  if (famePrevBtn) famePrevBtn.addEventListener("click", prevFameSlide);

  fameDots.forEach((dot) => {
    dot.addEventListener("click", () => {
      const targetIndex = parseInt(dot.dataset.slide, 10);
      showFameSlide(targetIndex);
      restartAutoplay();
    });
  });

  // Autoplay functionality
  function startAutoplay() {
    stopAutoplay();
    autoplayTimer = setInterval(nextFameSlide, 4500);
  }

  function stopAutoplay() {
    if (autoplayTimer) {
      clearInterval(autoplayTimer);
      autoplayTimer = null;
    }
  }

  function restartAutoplay() {
    stopAutoplay();
    startAutoplay();
  }

  if (fameWrapper) {
    fameWrapper.addEventListener("mouseenter", stopAutoplay);
    fameWrapper.addEventListener("mouseleave", startAutoplay);
    fameWrapper.addEventListener("focusin", stopAutoplay);
    fameWrapper.addEventListener("focusout", startAutoplay);

    // Touch swipe support for mobile
    let touchStartX = 0;
    let touchEndX = 0;

    fameWrapper.addEventListener("touchstart", (e) => {
      touchStartX = e.changedTouches[0].screenX;
      stopAutoplay();
    }, { passive: true });

    fameWrapper.addEventListener("touchend", (e) => {
      touchEndX = e.changedTouches[0].screenX;
      const diffX = touchEndX - touchStartX;
      if (Math.abs(diffX) > 40) {
        if (diffX < 0) {
          nextFameSlide();
        } else {
          prevFameSlide();
        }
      }
      startAutoplay();
    }, { passive: true });
  }

  window.addEventListener("resize", () => {
    showFameSlide(currentSlide);
  });

  // Initialize slideshow
  showFameSlide(0);
  startAutoplay();
}

/* ---------- 9. FLOATING WHATSAPP VISIBILITY ---------- */
const floatingWA = document.querySelector(".floating-whatsapp");
if (floatingWA) {
  const toggleFloatingWA = () => {
    if (window.scrollY > 250) {
      floatingWA.classList.add("visible");
    } else {
      floatingWA.classList.remove("visible");
    }
  };
  window.addEventListener("scroll", toggleFloatingWA, { passive: true });
  toggleFloatingWA();
}
