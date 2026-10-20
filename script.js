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
  img.addEventListener("click", () => openLightbox(galleryImages, Number(img.dataset.index)));
  img.addEventListener("keydown", (e) => {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      openLightbox(galleryImages, Number(img.dataset.index));
    }
  });
});

// Wire up gallery category filters
const gFilterBtns = document.querySelectorAll(".g-filter-btn");
const galleryCards = document.querySelectorAll(".gallery-card");

if (gFilterBtns.length && galleryCards.length) {
  gFilterBtns.forEach((btn) => {
    btn.addEventListener("click", () => {
      gFilterBtns.forEach((b) => {
        b.classList.remove("active");
        b.setAttribute("aria-selected", "false");
      });
      btn.classList.add("active");
      btn.setAttribute("aria-selected", "true");

      const filter = btn.dataset.filter;
      galleryCards.forEach((card) => {
        const match = filter === "all" || card.dataset.category === filter;
        card.classList.toggle("hidden", !match);
      });
    });
  });
}


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
const locTabs        = document.querySelectorAll(".loc-tab");
const mapFrame       = document.getElementById("map-frame");
const locLabel       = document.getElementById("loc-label");
const locAddress     = document.getElementById("loc-address");
const mapDirLink     = document.getElementById("map-directions-link");
const mapTitleLabel  = document.getElementById("map-title-label");

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
    const locKey = tab.dataset.loc;
    if (locLabel)   locLabel.textContent = locNames[locKey] || "";
    if (locAddress) locAddress.innerHTML = tab.dataset.address || "";

    // Update directions button and map title
    if (mapDirLink && tab.dataset.dir) {
      mapDirLink.href = tab.dataset.dir;
    }
    if (mapTitleLabel && locNames[locKey]) {
      mapTitleLabel.textContent = `Range Map — ${locNames[locKey]}`;
    }
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


/* ---------- 8. NAVIGATION, HEADER FREEZE & MOBILE SECTION SELECTOR ---------- */
const siteHeader = document.querySelector(".site-header");
const navToggle = document.getElementById("nav-toggle");
const primaryNav = document.getElementById("primary-nav");
const mobileSectionSelect = document.getElementById("mobile-section-select");

// 8A. Header scroll state
window.addEventListener("scroll", () => {
  if (siteHeader) {
    siteHeader.classList.toggle("scrolled", window.scrollY > 20);
  }
}, { passive: true });

// 8B. Mobile Dropdown Section Jump
if (mobileSectionSelect) {
  mobileSectionSelect.addEventListener("change", (e) => {
    const targetId = e.target.value;
    if (!targetId) return;
    const targetEl = document.querySelector(targetId);
    if (targetEl) {
      targetEl.scrollIntoView({ behavior: "smooth" });
    }
  });
}

// 8C. Mobile Nav Toggle
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

// 8D. ScrollSpy: Highlight active desktop link & sync mobile section dropdown
const observedSectionIds = [
  "home", "about", "training", "hall-of-fame", "medals", "coaches", "stats", "khojj", "alerts", "gallery", "contact", "enquiry"
];

function updateActiveSection(currentId) {
  if (!currentId) return;

  // Update desktop nav
  if (primaryNav) {
    primaryNav.querySelectorAll("a").forEach((link) => {
      const href = link.getAttribute("href");
      link.classList.toggle("active", href === `#${currentId}`);
    });
  }

  // Update mobile section dropdown
  if (mobileSectionSelect && mobileSectionSelect.value !== `#${currentId}`) {
    const option = mobileSectionSelect.querySelector(`option[value="#${currentId}"]`);
    if (option) {
      mobileSectionSelect.value = `#${currentId}`;
    }
  }
}

if ("IntersectionObserver" in window) {
  const sectionObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        updateActiveSection(entry.target.id);
      }
    });
  }, {
    rootMargin: "-15% 0px -60% 0px",
    threshold: 0
  });

  observedSectionIds.forEach((id) => {
    const el = document.getElementById(id);
    if (el) sectionObserver.observe(el);
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
  "issf-a-ganguly": {
    kicker: "Academy Milestone Announcement",
    title: "Congratulations to Mr. Bibaswan Ganguly on Achieving the Prestigious ISSF 'A' License!",
    actionText: "View on Instagram ↗",
    actionHref: "https://www.instagram.com/p/Delos_JSYUg/?cplk=MWJmbXZqdmhidmlpeA==",
    hideDownload: true,
    body: `
      <div class="circ-callout" style="border-left-color: #f4c95c; background: rgba(244, 201, 92, 0.12);">
        <strong>Prestigious Achievement:</strong> Highest International Shooting Sport Federation (ISSF) coaching accreditation achieved by Consultant Head Coach Mr. Bibaswan Ganguly.
      </div>
      <p style="font-size: 15px; line-height: 1.7; margin-bottom: 16px;">
        The Patliputra Gun's Shooting Academy (PGSA) family extends its proudest congratulations to <strong>Mr. Bibaswan Ganguly</strong>, on successfully achieving the prestigious <strong>ISSF 'A' License</strong>!
      </p>
      <p style="font-size: 14px; line-height: 1.6; margin-bottom: 16px; color: rgba(255, 255, 255, 0.9);">
        Since beginning our strategic coaching partnership last month, your expertise and dedication have been invaluable to our academy's vision and growth. This outstanding milestone is a true testament to your relentless commitment to the sport of shooting and your excellence in coaching.
      </p>
      <p style="font-size: 14px; line-height: 1.6; margin-bottom: 18px; color: rgba(255, 255, 255, 0.9);">
        We are incredibly fortunate to have you guiding our shooters and coaches; and elevating our training programs. Here is to reaching even greater heights and shaping future champions together!
      </p>
      <p style="font-weight: 700; color: #f4c95c; margin-bottom: 20px;">
        With best wishes and immense pride,<br>
        <span style="font-size: 13px; font-weight: 400; color: rgba(255, 255, 255, 0.8);">The Patliputra Gun's Shooting Academy Family</span>
      </p>
      <h4>Partnership &amp; Training Highlights</h4>
      <ul>
        <li><strong>ISSF 'A' License:</strong> The pinnacle coaching certification recognized worldwide by the International Shooting Sport Federation.</li>
        <li><strong>Coach &amp; Athlete Development:</strong> Mentoring PGSA resident coaches and junior/senior shooters in technical mastery and match psychology.</li>
        <li><strong>High-Performance Integration:</strong> SIUS electronic diagnostic integration, SCATT trace calibration, and international match simulation.</li>
      </ul>
      <div style="margin-top: 18px; padding: 14px; background: rgba(255, 255, 255, 0.05); border-radius: 8px; border: 1px solid rgba(255, 255, 255, 0.1); display: flex; align-items: center; justify-content: space-between; gap: 12px; flex-wrap: wrap;">
        <div>
          <strong style="color: #fff; font-size: 13.5px;">Official Announcement on Instagram</strong>
          <p style="margin: 0; font-size: 12.5px; color: rgba(255, 255, 255, 0.7);">View the original post and congratulate Coach Bibaswan Ganguly</p>
        </div>
        <a href="https://www.instagram.com/p/Delos_JSYUg/?cplk=MWJmbXZqdmhidmlpeA==" target="_blank" rel="noopener noreferrer" class="button instagram-btn compact" style="text-decoration: none;">Open Instagram Post ↗</a>
      </div>
    `
  },
  "mavlankar-35": {
    kicker: "NRAI All India Championship Circular",
    title: "XXXV All India G.V. Mavlankar Shooting Championship (Pistol Events)",
    actionText: "Contact Range Desk for Assistance",
    actionHref: "#enquiry",
    body: `
      <div class="circ-callout">
        <strong>Championship Milestone:</strong> The prestigious 35th All India G.V. Mavlankar Shooting Championship (Pistol Events) serves as the primary national qualification gateway into the National Shooting Championship Competitions (NSCC).
      </div>
      <h4>Championship Schedule &amp; Dates</h4>
      <ul>
        <li><strong>Competition Dates:</strong> October 23 to November 1, 2026</li>
        <li><strong>Host Range &amp; Venue:</strong> Trishul Shooting Range, Maharana Pratap Sports College, Raipur, Dehradun, Uttarakhand</li>
        <li><strong>Disciplines:</strong> Pistol Events (10m Air Pistol, 25m Sports Pistol, 25m Standard Pistol, 25m Centre Fire Pistol, 50m Free Pistol)</li>
        <li><strong>Governing Body:</strong> National Rifle Association of India (NRAI) in coordination with Uttarakhand State Rifle Association</li>
      </ul>
      <h4>Eligibility &amp; Qualification Pathway</h4>
      <ul>
        <li>Open to qualified competitors meeting the pre-requisite Minimum Qualifying Score (MQS) at State Shooting Championships.</li>
        <li>Athletes achieving the required National MQS at this championship secure direct entry into the 69th National Shooting Championship Competitions (NSCC).</li>
      </ul>
      <h4>PGSA Shooter Assistance</h4>
      <p>PGSA provides traveling shooters with pre-match weapon tuning, ammunition checks, and coach guidance to ensure peak competitive performance in Dehradun.</p>
    `
  },
  "nscc-69": {
    kicker: "NRAI National Championship Notification",
    title: "69th National Shooting Championship Competitions (NSCC) — Rifle & Pistol Events",
    actionText: "Prepare with PGSA Coaches",
    actionHref: "#enquiry",
    body: `
      <div class="circ-callout">
        <strong>Apex National Championship:</strong> The 69th NSCC is India's premier national shooting event, determining the national champions and serving as the primary qualification stage for National Selection Trials and the Indian National Squad.
      </div>
      <h4>Tournament Highlights</h4>
      <ul>
        <li><strong>Dates:</strong> Around December 2026 (Tentative Schedule)</li>
        <li><strong>Venue:</strong> Dr. Karni Singh Shooting Ranges (DKSSR), Tughlakabad, New Delhi</li>
        <li><strong>Events:</strong> Rifle &amp; Pistol Events (10m Air Rifle, 10m Air Pistol, 25m Sports Pistol, 25m Rapid Fire Pistol, 50m Rifle 3 Positions, 50m Prone, 50m Free Pistol)</li>
        <li><strong>Categories:</strong> Sub-Youth, Youth, Junior, Senior &amp; Masters (Men &amp; Women)</li>
      </ul>
      <h4>Significance &amp; Progression</h4>
      <ul>
        <li><strong>Renowned Shot Status:</strong> Shooters achieving the national benchmark score obtain the prestigious "Renowned Shot" certification.</li>
        <li><strong>Selection Trials:</strong> Top performers qualify for the NRAI National Selection Trials 1 &amp; 2 for international team selection.</li>
      </ul>
      <h4>PGSA High-Performance Preparation</h4>
      <p>Academy shooters will undergo dedicated SIUS electronic target match practice, finals pressure drills, and SCATT diagnostic analysis leading up to the championship.</p>
    `
  },
  "christmas-knockout": {
    kicker: "Patliputra Gun's Shooting Academy Tournament",
    title: "PGSA Christmas Knockout Competition 2026",
    actionText: "Register Firing Slot",
    actionHref: "#enquiry",
    body: `
      <div class="circ-callout">
        <strong>Academy Tournament:</strong> Annual high-intensity head-to-head matchplay tournament designed to test nerve, speed, and precision under direct elimination pressure.
      </div>
      <h4>Competition Details</h4>
      <ul>
        <li><strong>Dates:</strong> December 24 &amp; 25, 2026</li>
        <li><strong>Venue:</strong> Patliputra Gun's Shooting Academy Ranges (Digha &amp; Kankarbagh, Patna)</li>
        <li><strong>Disciplines:</strong> 10m Air Rifle &amp; 10m Air Pistol</li>
        <li><strong>Eligibility:</strong> All active PGSA academy members across Sub-Youth, Youth, Junior &amp; Senior divisions</li>
      </ul>
      <h4>Knockout Tournament Format</h4>
      <ul>
        <li><strong>Seeding Round:</strong> 30-shot qualification round to establish tournament bracket seeding.</li>
        <li><strong>Knockout Duels:</strong> Single-elimination head-to-head matchplay under direct countdown timing with sudden-death shoot-offs.</li>
        <li><strong>Finals &amp; Awards:</strong> Christmas Champion Trophies, medals, and specialized shooting equipment grants for winners.</li>
      </ul>
      <p>Contact the range administration desk or your personal coach to confirm your relay slot before December 20, 2026.</p>
    `
  },
  "arjuna-series": {
    kicker: "Patliputra Gun's Shooting Academy Test Series",
    title: "PGSA Weekly Arjuna Award Test Series",
    actionText: "Enrol in Test Series",
    actionHref: "#enquiry",
    body: `
      <div class="circ-callout">
        <strong>High-Performance Benchmarking:</strong> A rigorous weekly diagnostic test series aimed at cultivating athlete discipline, match consistency, and elite competition mindset mirroring India's highest sporting standards.
      </div>
      <h4>Series Schedule &amp; Format</h4>
      <ul>
        <li><strong>Commencement:</strong> Starts from 1st Week of December 2026 (Weekly rounds conducted every weekend)</li>
        <li><strong>Venue:</strong> PGSA Ranges (10m SIUS Electronic Target Lines)</li>
        <li><strong>Disciplines:</strong> 10m Air Rifle &amp; 10m Air Pistol</li>
        <li><strong>Course of Fire:</strong> Full 60-shot competition series under ISSF regulation lighting and timing.</li>
      </ul>
      <h4>Key Highlights &amp; Athlete Benefits</h4>
      <ul>
        <li><strong>SCATT &amp; Decimal Scoring:</strong> Precision trace analysis recording stability of hold, trigger break timing, and follow-through.</li>
        <li><strong>Continuous Leaderboard:</strong> Cumulative ranking updated weekly to track personal bests and performance trends.</li>
        <li><strong>Coach Reviews:</strong> One-on-one diagnostic feedback after each weekly match to rectify technical flaws.</li>
      </ul>
      <p>Open to all aspiring PGSA shooters aiming for State, Zonal, and National squad selections.</p>
    `
  },
  "pgsa-league": {
    kicker: "Patliputra Gun's Shooting Academy League Season",
    title: "PGSA League 2027",
    actionText: "Register for PGSA League",
    actionHref: "#enquiry",
    body: `
      <div class="circ-callout">
        <strong>Flagship Annual League:</strong> The premier season-long shooting league organized by Patliputra Gun's Shooting Academy, featuring multi-stage matches, point-based standings, and grand finals.
      </div>
      <h4>League Schedule &amp; Venue</h4>
      <ul>
        <li><strong>Commencement:</strong> Starts from January 2027</li>
        <li><strong>Venue:</strong> Patliputra Gun's Shooting Academy (Digha &amp; Patliputra Complex Ranges, Patna)</li>
        <li><strong>Structure:</strong> Multi-Stage League (Monthly Stages followed by Super Final Stage)</li>
        <li><strong>Events:</strong> 10m Air Rifle and 10m Air Pistol across all age categories</li>
      </ul>
      <h4>League Structure &amp; Rewards</h4>
      <ul>
        <li><strong>Stage Matches:</strong> Shooters accumulate points across consecutive league rounds.</li>
        <li><strong>Olympic Final Simulation:</strong> Top 8 league point leaders advance to live audience ISSF decimal finals.</li>
        <li><strong>Prizes &amp; Honors:</strong> Annual League Championship Shields, cash vouchers, match pellets, and sponsored academy training hours.</li>
      </ul>
      <p>Registration opens in late December 2026 at the academy desk. All registered members are encouraged to join and compete.</p>
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
      if (data.actionHref && data.actionHref.startsWith("http")) {
        circAction.target = "_blank";
        circAction.rel = "noopener noreferrer";
      } else {
        circAction.removeAttribute("target");
        circAction.removeAttribute("rel");
      }
    }
    const circDownload = document.getElementById("circ-modal-download");
    if (circDownload) {
      if (data.hideDownload) {
        circDownload.style.display = "none";
      } else {
        circDownload.style.display = "";
      }
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
    } else if (window.innerWidth <= 1120) {
      return Math.max(0, fameSlides.length - 2);
    } else {
      // 3 slides visible on desktop
      return Math.max(0, fameSlides.length - 3);
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
      const maxIdx = getMaxSlideIndex();
      showFameSlide(Math.min(targetIndex, maxIdx));
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

/* ==========================================================================
   10. INTERACTIVE 10M OLYMPIC SIUS RANGE SIMULATOR (WITH GUN POV & STABILITY)
   ========================================================================== */
function initShootingSimulator() {
  const viewport = document.getElementById("sim-target-viewport");
  if (!viewport) return;

  const reticle = document.getElementById("sim-reticle");
  const pelletLayer = document.getElementById("sim-pellet-layer");
  const muzzleFlash = document.getElementById("sim-recoil-flash");
  const gunStage = document.getElementById("sim-gun-stage");
  const muzzlePuff = document.getElementById("sim-muzzle-puff");
  const gunPistol = document.getElementById("sim-gun-pistol");
  const gunRifle = document.getElementById("sim-gun-rifle");
  const startHint = document.getElementById("sim-start-hint");

  // Controls
  const btnPistol = document.getElementById("sim-weapon-pistol");
  const btnRifle = document.getElementById("sim-weapon-rifle");
  const diffToggle = document.getElementById("sim-diff-toggle");
  const diffLabel = document.getElementById("sim-diff-label");
  const audioToggle = document.getElementById("sim-audio-toggle");
  const audioIcon = document.getElementById("sim-audio-icon");
  const audioText = document.getElementById("sim-audio-text");
  const resetBtn = document.getElementById("sim-reset-btn");

  // Breath & Stability Controls
  const breathBtn = document.getElementById("sim-breath-btn");
  const breathBtnLabel = document.getElementById("sim-breath-btn-label");
  const breathDot = document.getElementById("sim-breath-dot");
  const breathPctReadout = document.getElementById("sim-breath-pct");
  const breathBar = document.getElementById("sim-breath-bar");
  const breathInstruction = document.getElementById("sim-breath-instruction");

  // Console Displays
  const currentShotNumEl = document.getElementById("sim-current-shot-num");
  const lastScoreEl = document.getElementById("sim-last-score");
  const scoreBadgeEl = document.getElementById("sim-score-badge");
  const ringPillEl = document.getElementById("sim-ring-pill");
  const offsetXEl = document.getElementById("sim-offset-x");
  const offsetYEl = document.getElementById("sim-offset-y");
  const statusEl = document.getElementById("sim-shot-status");
  const avgScoreEl = document.getElementById("sim-avg-score");
  const totalScoreEl = document.getElementById("sim-total-score");
  const outcomeCard = document.getElementById("sim-outcome-card");
  const outcomeIcon = document.getElementById("sim-outcome-icon");
  const outcomeTitle = document.getElementById("sim-outcome-title");
  const outcomeDesc = document.getElementById("sim-outcome-desc");
  const specGunEl = document.getElementById("sim-spec-gun");
  const specSwayEl = document.getElementById("sim-spec-sway");

  // State Variables
  const MAX_SHOTS = 5;
  let shotCount = 0;
  let seriesScores = [];
  let isAudioEnabled = true;
  let isHovering = false;
  let isSeriesComplete = false;

  // Weapon & Difficulty Settings
  let currentWeapon = "pistol"; // 'pistol' or 'rifle'
  let isOlympicFinals = false; // false = Academy Training, true = Olympic Finals

  // Aim coordinates (in viewport pixels)
  let currentAimX = 0;
  let currentAimY = 0;
  let targetAimX = 0;
  let targetAimY = 0;
  let swayOffsetX = 0;
  let swayOffsetY = 0;

  // Breath & Stability Mechanics
  let isHoldingBreath = false;
  let breathCapacity = 1.0; // 0.0 to 1.0
  let isExhausted = false;

  // Web Audio Context for synthesized gunshot and heartbeats
  let audioCtx = null;

  function getAudioContext() {
    if (!audioCtx) {
      const AudioContextClass = window.AudioContext || window.webkitAudioContext;
      if (AudioContextClass) {
        audioCtx = new AudioContextClass();
      }
    }
    if (audioCtx && audioCtx.state === "suspended") {
      audioCtx.resume();
    }
    return audioCtx;
  }

  // Synthesize realistic Olympic 10m Gunshot (Air Pistol vs Air Rifle acoustic tuning)
  function playSynthesizedShotSound() {
    if (!isAudioEnabled) return;
    try {
      const ctx = getAudioContext();
      if (!ctx) return;

      const now = ctx.currentTime;
      const isRifle = currentWeapon === "rifle";

      // 1. Pneumatic Air Release (Filtered Noise Burst)
      const bufferSize = Math.floor(ctx.sampleRate * 0.05);
      const noiseBuffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
      const output = noiseBuffer.getChannelData(0);
      for (let i = 0; i < bufferSize; i++) {
        output[i] = Math.random() * 2 - 1;
      }

      const whiteNoise = ctx.createBufferSource();
      whiteNoise.buffer = noiseBuffer;

      const filter = ctx.createBiquadFilter();
      filter.type = "bandpass";
      // Air pistol has a sharper snap (980Hz), air rifle has a deeper acoustic pop (580Hz)
      filter.frequency.setValueAtTime(isRifle ? 580 : 980, now);
      filter.Q.setValueAtTime(isRifle ? 3.0 : 2.2, now);

      const noiseGain = ctx.createGain();
      noiseGain.gain.setValueAtTime(isRifle ? 0.75 : 0.85, now);
      noiseGain.gain.exponentialRampToValueAtTime(0.001, now + (isRifle ? 0.05 : 0.04));

      whiteNoise.connect(filter);
      filter.connect(noiseGain);
      noiseGain.connect(ctx.destination);
      whiteNoise.start(now);

      // 2. Lead Pellet Steel Target Sensor Strike Ping
      const osc1 = ctx.createOscillator();
      const osc2 = ctx.createOscillator();
      const oscGain = ctx.createGain();

      osc1.type = "sine";
      osc1.frequency.setValueAtTime(isRifle ? 2300 : 2100, now + 0.012);
      osc1.frequency.exponentialRampToValueAtTime(1450, now + 0.15);

      osc2.type = "sine";
      osc2.frequency.setValueAtTime(isRifle ? 3600 : 3300, now + 0.012);
      osc2.frequency.exponentialRampToValueAtTime(2200, now + 0.12);

      oscGain.gain.setValueAtTime(0, now);
      oscGain.gain.setValueAtTime(0.38, now + 0.012);
      oscGain.gain.exponentialRampToValueAtTime(0.001, now + 0.16);

      osc1.connect(oscGain);
      osc2.connect(oscGain);
      oscGain.connect(ctx.destination);

      osc1.start(now + 0.012);
      osc2.start(now + 0.012);
      osc1.stop(now + 0.17);
      osc2.stop(now + 0.17);
    } catch (e) {
      // Audio autoplay fallback
    }
  }

  // Play subtle heartbeat thump on tension/exhaustion
  function playHeartbeatThump() {
    if (!isAudioEnabled) return;
    try {
      const ctx = getAudioContext();
      if (!ctx) return;
      const now = ctx.currentTime;
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();

      osc.type = "sine";
      osc.frequency.setValueAtTime(75, now);
      osc.frequency.exponentialRampToValueAtTime(40, now + 0.12);

      gain.gain.setValueAtTime(0.2, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.14);

      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start(now);
      osc.stop(now + 0.15);
    } catch (e) {}
  }

  // Audio Toggle Button
  if (audioToggle) {
    audioToggle.addEventListener("click", (e) => {
      e.stopPropagation();
      getAudioContext();
      isAudioEnabled = !isAudioEnabled;
      if (isAudioEnabled) {
        audioIcon.textContent = "🔊";
        audioText.textContent = "Audio ON";
        audioToggle.classList.remove("muted");
      } else {
        audioIcon.textContent = "🔇";
        audioText.textContent = "Audio OFF";
        audioToggle.classList.add("muted");
      }
    });
  }

  // Weapon Switcher
  function setWeapon(weapon) {
    currentWeapon = weapon;
    if (weapon === "pistol") {
      btnPistol.classList.add("active");
      btnRifle.classList.remove("active");
      gunPistol.classList.add("active");
      gunRifle.classList.remove("active");
      if (specGunEl) specGunEl.textContent = "🔫 10m Air Pistol Armed";
      if (specSwayEl) specSwayEl.textContent = isOlympicFinals ? "Olympic One-Hand Sway" : "Natural Pistol Sway";
    } else {
      btnRifle.classList.add("active");
      btnPistol.classList.remove("active");
      gunRifle.classList.add("active");
      gunPistol.classList.remove("active");
      if (specGunEl) specGunEl.textContent = "🎯 10m Air Rifle Armed";
      if (specSwayEl) specSwayEl.textContent = isOlympicFinals ? "Olympic Rifle Aperture Sway" : "Natural Rifle Sway";
    }
  }

  if (btnPistol) btnPistol.addEventListener("click", () => setWeapon("pistol"));
  if (btnRifle) btnRifle.addEventListener("click", () => setWeapon("rifle"));

  // Difficulty Mode Toggle
  if (diffToggle) {
    diffToggle.addEventListener("click", () => {
      isOlympicFinals = !isOlympicFinals;
      diffToggle.setAttribute("aria-pressed", isOlympicFinals ? "true" : "false");
      diffToggle.classList.toggle("active-olympic", isOlympicFinals);
      if (isOlympicFinals) {
        diffLabel.textContent = "Olympic Finals: ON";
        if (specSwayEl) specSwayEl.textContent = "Olympic Finals Sway + Inertia";
      } else {
        diffLabel.textContent = "Olympic Finals: OFF";
        if (specSwayEl) specSwayEl.textContent = "Natural Hold Sway";
      }
    });
  }

  // Dynamic Breath Label based on Touch vs Keyboard Device
  const isTouchDevice = ('ontouchstart' in window) || (navigator.maxTouchPoints > 0) || (window.innerWidth <= 768);
  function getDefaultBreathLabel() {
    return isTouchDevice ? "HOLD BREATH TO STEADY AIM" : "HOLD BREATH (SPACEBAR)";
  }
  if (breathBtnLabel) {
    breathBtnLabel.textContent = getDefaultBreathLabel();
  }

  // Breath Control Logic
  function startHoldingBreath() {
    if (isExhausted) return;
    isHoldingBreath = true;
    if (breathBtn) breathBtn.classList.add("active");
    if (breathBtnLabel) breathBtnLabel.textContent = "HOLDING BREATH... (STEADY)";
    if (breathDot) {
      breathDot.className = "breath-indicator-dot holding";
    }
  }

  function stopHoldingBreath() {
    isHoldingBreath = false;
    if (breathBtn) breathBtn.classList.remove("active");
    if (breathBtnLabel) breathBtnLabel.textContent = getDefaultBreathLabel();
    if (!isExhausted && breathDot) {
      breathDot.className = "breath-indicator-dot";
    }
  }

  // Keyboard Spacebar for Hold Breath
  window.addEventListener("keydown", (e) => {
    if (e.code === "Space" && e.target === document.body) {
      e.preventDefault();
      getAudioContext();
      startHoldingBreath();
    }
  });

  window.addEventListener("keyup", (e) => {
    if (e.code === "Space") {
      stopHoldingBreath();
    }
  });

  // Hold Breath Button Events (Optimized for Mobile Touch & Desktop Mouse)
  if (breathBtn) {
    breathBtn.addEventListener("mousedown", (e) => {
      e.preventDefault();
      getAudioContext();
      startHoldingBreath();
    });
    breathBtn.addEventListener("mouseup", stopHoldingBreath);
    breathBtn.addEventListener("mouseleave", stopHoldingBreath);

    breathBtn.addEventListener("touchstart", (e) => {
      e.preventDefault();
      getAudioContext();
      startHoldingBreath();
    }, { passive: false });

    breathBtn.addEventListener("touchend", (e) => {
      e.preventDefault();
      stopHoldingBreath();
    }, { passive: false });

    breathBtn.addEventListener("touchcancel", stopHoldingBreath);
  }

  // Calculate center of viewport
  function updateViewportCenter() {
    const rect = viewport.getBoundingClientRect();
    if (!isHovering) {
      targetAimX = rect.width / 2;
      targetAimY = rect.height / 2;
    }
  }
  updateViewportCenter();
  window.addEventListener("resize", updateViewportCenter);

  // Main Animation Loop: Physical Sway, Breathing, Weapon Inertia & Parallax
  let lastHeartbeatTime = 0;

  function animateAimSway() {
    const time = Date.now() * 0.0015;
    const nowMs = Date.now();

    // 1. Update Breath Capacity Meter
    if (isHoldingBreath && !isExhausted) {
      // Faster depletion in Olympic Finals mode
      const drainRate = isOlympicFinals ? 0.0075 : 0.005;
      breathCapacity = Math.max(0, breathCapacity - drainRate);

      if (breathCapacity <= 0) {
        // Hypoxia: Tremors kick in!
        isExhausted = true;
        isHoldingBreath = false;
        if (breathBtn) breathBtn.classList.remove("active");
        if (breathBtnLabel) breathBtnLabel.textContent = "⚠️ RECOVERING BREATH...";
        viewport.classList.add("tremor-shake");
        playHeartbeatThump();
      }
    } else {
      // Recharge breath
      const rechargeRate = 0.006;
      breathCapacity = Math.min(1.0, breathCapacity + rechargeRate);

      if (isExhausted && breathCapacity >= 0.4) {
        isExhausted = false;
        viewport.classList.remove("tremor-shake");
        if (breathBtnLabel) breathBtnLabel.textContent = getDefaultBreathLabel();
      }
    }

    // Update Breath Bar UI
    if (breathBar) {
      breathBar.style.width = `${(breathCapacity * 100).toFixed(0)}%`;
      breathBar.classList.toggle("exhausted", isExhausted);
    }
    if (breathPctReadout) {
      if (isExhausted) {
        breathPctReadout.textContent = "⚠️ TREMORS! FATIGUE";
        breathPctReadout.className = "breath-pct-readout exhausted";
        if (breathDot) breathDot.className = "breath-indicator-dot exhausted";
      } else if (isHoldingBreath) {
        breathPctReadout.textContent = `${(breathCapacity * 100).toFixed(0)}% STEADY HOLD`;
        breathPctReadout.className = "breath-pct-readout holding";
      } else {
        breathPctReadout.textContent = `${(breathCapacity * 100).toFixed(0)}% READY`;
        breathPctReadout.className = "breath-pct-readout";
        if (breathDot) breathDot.className = "breath-indicator-dot";
      }
    }

    // 2. Compute Natural Lissajous Figure-8 Hold Sway
    let swayMultiplier = 1.0;
    if (isHoldingBreath) {
      // Steady sight: Sway drops by 80%!
      swayMultiplier = 0.22;
    } else if (isExhausted) {
      // Violent breathing gasp and trembling
      swayMultiplier = 3.4;
    } else if (isOlympicFinals) {
      // Olympic Finals has authentic pressure sway
      swayMultiplier = 1.45;
    }

    // Pistol has a larger, more mobile sway pattern than Rifle
    const baseAmpX = (currentWeapon === "pistol" ? 9.5 : 6.0) * swayMultiplier;
    const baseAmpY = (currentWeapon === "pistol" ? 11.5 : 7.5) * swayMultiplier;

    // Authentic ISSF Lissajous ellipse (breathing + cardiovascular pulse)
    swayOffsetX = (Math.sin(time * 1.4) * 0.7 + Math.cos(time * 2.8) * 0.3) * baseAmpX;
    swayOffsetY = (Math.cos(time * 1.1) * 0.75 + Math.sin(time * 2.2) * 0.25) * baseAmpY;

    // Heartbeat twitch every 850ms in Olympic mode
    if (isOlympicFinals && !isHoldingBreath && (nowMs - lastHeartbeatTime > 900)) {
      lastHeartbeatTime = nowMs;
      swayOffsetY += (Math.random() - 0.5) * 4.5;
    }

    // 3. Weapon Inertia Physics: Heavy match gun does not snap instantly!
    // Lerp factor: lower = heavier weapon mass & inertia
    const inertiaLerp = isOlympicFinals ? 0.075 : 0.15;
    currentAimX += (targetAimX - currentAimX) * inertiaLerp;
    currentAimY += (targetAimY - currentAimY) * inertiaLerp;

    const finalX = currentAimX + swayOffsetX;
    const finalY = currentAimY + swayOffsetY;

    // Position Aiming Reticle
    if (reticle) {
      reticle.style.left = `${finalX}px`;
      reticle.style.top = `${finalY}px`;
    }

    // 4. First-Person Gun Parallax Tracking
    // The match gun barrel pivots smoothly towards the reticle
    if (gunStage) {
      const rect = viewport.getBoundingClientRect();
      const normCenterX = rect.width / 2;
      const gunOffset = (currentAimX - normCenterX) * 0.28;
      const gunTilt = (currentAimX - normCenterX) * 0.035;
      gunStage.style.transform = `translate(calc(-50% + ${gunOffset}px), 0px) rotate(${gunTilt}deg)`;
    }

    requestAnimationFrame(animateAimSway);
  }
  requestAnimationFrame(animateAimSway);

  // Viewport Mouse Tracking
  viewport.addEventListener("mouseenter", () => {
    isHovering = true;
    if (startHint) startHint.classList.add("hidden");
  });

  viewport.addEventListener("mouseleave", () => {
    isHovering = false;
    const rect = viewport.getBoundingClientRect();
    targetAimX = rect.width / 2;
    targetAimY = rect.height / 2;
  });

  viewport.addEventListener("mousemove", (e) => {
    isHovering = true;
    const rect = viewport.getBoundingClientRect();
    targetAimX = Math.max(8, Math.min(rect.width - 8, e.clientX - rect.left));
    targetAimY = Math.max(8, Math.min(rect.height - 8, e.clientY - rect.top));
  });

  // Calculate ISSF 10m Target Decimal Score
  function calculateShotScore(pixelX, pixelY) {
    const rect = viewport.getBoundingClientRect();
    const svgX = (pixelX / rect.width) * 400;
    const svgY = (pixelY / rect.height) * 400;

    const diffX = svgX - 200;
    const diffY = svgY - 200;
    const radius = Math.sqrt(diffX * diffX + diffY * diffY);

    const mmOffsetX = (diffX * 0.115).toFixed(1);
    const mmOffsetY = (diffY * 0.115).toFixed(1);

    let ring = 0;
    let score = 0;
    let badgeText = "";
    let isInnerTen = false;

    // Olympic ISSF 10m Target Geometry:
    // Outer border = 180 (Ring 1)
    // Ring 10 = 18
    // Inner-Ten X = 3.6
    if (radius <= 18) {
      ring = 10;
      if (radius <= 3.8) {
        score = 10.9;
        badgeText = "INNER TEN (10.9 X) 🎯";
        isInnerTen = true;
      } else {
        const ringFraction = (18 - radius) / (18 - 3.8);
        score = +(10.0 + ringFraction * 0.8).toFixed(1);
        badgeText = score >= 10.7 ? "CENTRE BULL 🎯" : "BULLSEYE 10 🌟";
      }
    } else if (radius <= 36) {
      ring = 9;
      const frac = (36 - radius) / 18;
      score = +(9.0 + frac * 0.9).toFixed(1);
      badgeText = "EXCELLENT 9 ✨";
    } else if (radius <= 54) {
      ring = 8;
      const frac = (54 - radius) / 18;
      score = +(8.0 + frac * 0.9).toFixed(1);
      badgeText = "SOLID 8 👍";
    } else if (radius <= 72) {
      ring = 7;
      const frac = (72 - radius) / 18;
      score = +(7.0 + frac * 0.9).toFixed(1);
      badgeText = "IN BULL (7)";
    } else if (radius <= 90) {
      ring = 6;
      const frac = (90 - radius) / 18;
      score = +(6.0 + frac * 0.9).toFixed(1);
      badgeText = "RING 6";
    } else if (radius <= 108) {
      ring = 5;
      const frac = (108 - radius) / 18;
      score = +(5.0 + frac * 0.9).toFixed(1);
      badgeText = "RING 5";
    } else if (radius <= 126) {
      ring = 4;
      const frac = (126 - radius) / 18;
      score = +(4.0 + frac * 0.9).toFixed(1);
      badgeText = "RING 4";
    } else if (radius <= 144) {
      ring = 3;
      const frac = (144 - radius) / 18;
      score = +(3.0 + frac * 0.9).toFixed(1);
      badgeText = "RING 3";
    } else if (radius <= 162) {
      ring = 2;
      const frac = (162 - radius) / 18;
      score = +(2.0 + frac * 0.9).toFixed(1);
      badgeText = "RING 2";
    } else if (radius <= 180) {
      ring = 1;
      const frac = (180 - radius) / 18;
      score = +(1.0 + frac * 0.9).toFixed(1);
      badgeText = "RING 1 (BORDER)";
    } else {
      ring = 0;
      score = 0.0;
      badgeText = "OFF TARGET (MISS)";
    }

    return {
      score,
      ring,
      mmOffsetX: (diffX >= 0 ? "+" : "") + mmOffsetX,
      mmOffsetY: (diffY >= 0 ? "+" : "") + mmOffsetY,
      badgeText,
      isInnerTen,
      pixelX,
      pixelY
    };
  }

  // Fire Shot Handler
  function executeShot(clientX, clientY) {
    if (isSeriesComplete) {
      resetSeries();
    }

    const rect = viewport.getBoundingClientRect();
    let hitX = currentAimX + swayOffsetX;
    let hitY = currentAimY + swayOffsetY;

    // Keep within bounds
    hitX = Math.max(8, Math.min(rect.width - 8, hitX));
    hitY = Math.max(8, Math.min(rect.height - 8, hitY));

    shotCount++;
    const result = calculateShotScore(hitX, hitY);
    seriesScores.push(result.score);

    // Audio & Gunshot Synthesis
    playSynthesizedShotSound();

    // Visual Gun Recoil Kick
    if (gunStage) {
      gunStage.classList.add("recoil");
      setTimeout(() => gunStage.classList.remove("recoil"), 90);
    }

    // Muzzle Vapor Puff
    if (muzzlePuff) {
      muzzlePuff.classList.remove("puff-active");
      void muzzlePuff.offsetWidth; // trigger reflow
      muzzlePuff.classList.add("puff-active");
    }

    // Reticle Kick
    if (reticle) {
      reticle.classList.add("recoil");
      setTimeout(() => reticle.classList.remove("recoil"), 90);
    }

    // Target Muzzle Flash Overlay
    if (muzzleFlash) {
      muzzleFlash.classList.add("active");
      setTimeout(() => muzzleFlash.classList.remove("active"), 70);
    }

    // Shockwave Ripple
    const ripple = document.createElement("div");
    ripple.className = "shot-ripple";
    ripple.style.left = `${hitX}px`;
    ripple.style.top = `${hitY}px`;
    viewport.appendChild(ripple);
    setTimeout(() => ripple.remove(), 550);

    // Persistent Pellet Hole
    const pellet = document.createElement("div");
    pellet.className = "pellet-hole";
    pellet.style.left = `${hitX}px`;
    pellet.style.top = `${hitY}px`;
    pellet.innerHTML = `<span class="pellet-badge">${shotCount}</span>`;
    pelletLayer.appendChild(pellet);

    // Update Console Displays
    updateScoreboard(result);

    // Check if 5-shot round complete
    if (shotCount >= MAX_SHOTS) {
      isSeriesComplete = true;
      showSeriesCompletion();
    }
  }

  // Update Console & Series Chips
  function updateScoreboard(res) {
    currentShotNumEl.textContent = shotCount;
    lastScoreEl.textContent = res.score.toFixed(1);
    ringPillEl.textContent = res.ring > 0 ? `RING ${res.ring}` : "OUT";

    scoreBadgeEl.textContent = res.badgeText;
    scoreBadgeEl.classList.toggle("inner-ten", res.isInnerTen);

    offsetXEl.textContent = `${res.mmOffsetX} mm`;
    offsetYEl.textContent = `${res.mmOffsetY} mm`;
    statusEl.textContent = shotCount < MAX_SHOTS ? "RECORDED" : "SERIES DONE";

    // Update Series Chip
    const chip = document.getElementById(`chip-${shotCount}`);
    if (chip) {
      chip.classList.remove("pending");
      chip.classList.add("active-chip");
      const chipVal = chip.querySelector(".chip-val");
      if (chipVal) chipVal.textContent = res.score.toFixed(1);

      if (res.score >= 10.0) {
        chip.classList.add("grade-10");
      } else if (res.score >= 9.0) {
        chip.classList.add("grade-9");
      }
    }

    // Calculate Average & Cumulative Total
    const total = seriesScores.reduce((acc, curr) => acc + curr, 0);
    const avg = total / seriesScores.length;

    totalScoreEl.innerHTML = `${total.toFixed(1)} <small>/ 54.5</small>`;
    avgScoreEl.textContent = avg.toFixed(2);
  }

  // Series Completion Evaluation
  function showSeriesCompletion() {
    const total = seriesScores.reduce((acc, curr) => acc + curr, 0);

    if (outcomeCard) {
      if (total >= 51.5) {
        outcomeIcon.textContent = "🏆";
        outcomeTitle.textContent = `Olympic Finalist Level (${total.toFixed(1)} / 54.5)!`;
        outcomeDesc.textContent = "Phenomenal precision and group consistency! You're shooting at international championship standard.";
      } else if (total >= 47.0) {
        outcomeIcon.textContent = "🥇";
        outcomeTitle.textContent = `National Qualifier Precision (${total.toFixed(1)} / 54.5)!`;
        outcomeDesc.textContent = "Remarkable sight alignment and hold! You possess high natural potential for competitive rifle/pistol shooting.";
      } else if (total >= 40.0) {
        outcomeIcon.textContent = "⭐";
        outcomeTitle.textContent = `State Championship Contender (${total.toFixed(1)} / 54.5)!`;
        outcomeDesc.textContent = "Solid grouping on the target bull! With systematic coach-led trigger routines, you can easily top the podium.";
      } else {
        outcomeIcon.textContent = "🎯";
        outcomeTitle.textContent = `Promising Marksman (${total.toFixed(1)} / 54.5)!`;
        outcomeDesc.textContent = "Great effort! Practice your breath control and stance with certified coaches at PGSA's Patna ranges.";
      }
      outcomeCard.style.display = "flex";
    }
  }

  // Reset Series
  function resetSeries() {
    shotCount = 0;
    seriesScores = [];
    isSeriesComplete = false;

    pelletLayer.innerHTML = "";
    currentShotNumEl.textContent = "0";
    lastScoreEl.textContent = "--.-";
    ringPillEl.textContent = "RING --";
    scoreBadgeEl.textContent = "READY TO FIRE";
    scoreBadgeEl.classList.remove("inner-ten");

    offsetXEl.textContent = "0.0 mm";
    offsetYEl.textContent = "0.0 mm";
    statusEl.textContent = "ARMED";

    avgScoreEl.textContent = "--.-";
    totalScoreEl.innerHTML = `0.0 <small>/ 54.5</small>`;

    if (outcomeCard) outcomeCard.style.display = "none";

    for (let i = 1; i <= MAX_SHOTS; i++) {
      const chip = document.getElementById(`chip-${i}`);
      if (chip) {
        chip.className = "series-chip pending";
        const val = chip.querySelector(".chip-val");
        if (val) val.textContent = "--";
      }
    }
  }

  if (resetBtn) {
    resetBtn.addEventListener("click", resetSeries);
  }

  // Viewport Click & Touch to Shoot (Debounced for Mobile to prevent ghost double-shots)
  let lastTouchFireTime = 0;

  viewport.addEventListener("touchstart", (e) => {
    lastTouchFireTime = Date.now();
    getAudioContext();
    if (startHint) startHint.classList.add("hidden");
    const touch = e.touches[0];
    if (touch) {
      const rect = viewport.getBoundingClientRect();
      targetAimX = Math.max(8, Math.min(rect.width - 8, touch.clientX - rect.left));
      targetAimY = Math.max(8, Math.min(rect.height - 8, touch.clientY - rect.top));
      currentAimX = targetAimX;
      currentAimY = targetAimY;
      executeShot(touch.clientX, touch.clientY);
    }
  }, { passive: true });

  viewport.addEventListener("touchmove", (e) => {
    const touch = e.touches[0];
    if (touch) {
      const rect = viewport.getBoundingClientRect();
      targetAimX = Math.max(8, Math.min(rect.width - 8, touch.clientX - rect.left));
      targetAimY = Math.max(8, Math.min(rect.height - 8, touch.clientY - rect.top));
    }
  }, { passive: true });

  viewport.addEventListener("click", (e) => {
    // Ignore synthetic click event dispatched by mobile browsers after touchstart
    if (Date.now() - lastTouchFireTime < 600) {
      return;
    }
    getAudioContext();
    executeShot(e.clientX, e.clientY);
  });
}

// Initialize simulator when DOM is ready
if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", initShootingSimulator);
} else {
  initShootingSimulator();
}

