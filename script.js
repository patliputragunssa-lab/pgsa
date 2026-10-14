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
  digha:      "Digha Branch",
  kankarbagh: "Kankarbagh Branch",
  ranchi:     "Ranchi (Coming Soon)"
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
