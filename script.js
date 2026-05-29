/* ─── PROJECT PREVIEWS (SVG art per project) ─── */
const PROJ_SVG = [
  /* 0 Meridian */
  `<svg viewBox="0 0 400 300" xmlns="http://www.w3.org/2000/svg">
    <rect x="0" y="0" width="400" height="300" fill="#080e12"/>
    <rect x="40" y="120" width="320" height="160" fill="#29ABE2" opacity=".12"/>
    <rect x="80" y="60" width="80" height="220" fill="#29ABE2" opacity=".3"/>
    <rect x="170" y="20" width="120" height="260" fill="#29ABE2" opacity=".45"/>
    <rect x="300" y="90" width="60" height="190" fill="#29ABE2" opacity=".22"/>
  </svg>`,
  /* 1 Vantage */
  `<svg viewBox="0 0 400 300" xmlns="http://www.w3.org/2000/svg">
    <rect x="0" y="0" width="400" height="300" fill="#090909"/>
    <rect x="30" y="30" width="340" height="240" fill="none" stroke="#29ABE2" stroke-width="1.5"/>
    <line x1="30" y1="150" x2="370" y2="150" stroke="#29ABE2" stroke-width=".6"/>
    <line x1="200" y1="30" x2="200" y2="270" stroke="#29ABE2" stroke-width=".6"/>
    <circle cx="200" cy="150" r="70" fill="none" stroke="#29ABE2" stroke-width="1"/>
    <circle cx="200" cy="150" r="35" fill="#29ABE2" opacity=".18"/>
  </svg>`,
  /* 2 Solace */
  `<svg viewBox="0 0 400 300" xmlns="http://www.w3.org/2000/svg">
    <rect x="0" y="0" width="400" height="300" fill="#0a0c0a"/>
    <polygon points="200,20 380,280 20,280" fill="none" stroke="#29ABE2" stroke-width="1.5"/>
    <line x1="110" y1="150" x2="290" y2="150" stroke="#29ABE2" stroke-width=".5"/>
    <line x1="65" y1="215" x2="335" y2="215" stroke="#29ABE2" stroke-width=".5"/>
    <circle cx="200" cy="160" r="24" fill="none" stroke="#29ABE2" stroke-width=".7"/>
  </svg>`,
  /* 3 Altitude */
  `<svg viewBox="0 0 400 300" xmlns="http://www.w3.org/2000/svg">
    <rect x="0" y="0" width="400" height="300" fill="#0c0a09"/>
    <rect x="30" y="80" width="70" height="210" fill="#29ABE2" opacity=".28"/>
    <rect x="110" y="40" width="80" height="250" fill="#29ABE2" opacity=".38"/>
    <rect x="200" y="10" width="80" height="280" fill="#29ABE2" opacity=".5"/>
    <rect x="290" y="60" width="60" height="230" fill="#29ABE2" opacity=".22"/>
  </svg>`,
  /* 4 Pavilion */
  `<svg viewBox="0 0 400 300" xmlns="http://www.w3.org/2000/svg">
    <rect x="0" y="0" width="400" height="300" fill="#090b0c"/>
    <circle cx="200" cy="150" r="120" fill="none" stroke="#29ABE2" stroke-width="1.2"/>
    <circle cx="200" cy="150" r="80" fill="none" stroke="#29ABE2" stroke-width=".6"/>
    <circle cx="200" cy="150" r="40" fill="#29ABE2" opacity=".18"/>
    <line x1="80" y1="150" x2="320" y2="150" stroke="#29ABE2" stroke-width=".5"/>
    <line x1="200" y1="30" x2="200" y2="270" stroke="#29ABE2" stroke-width=".5"/>
  </svg>`,
  /* 5 Greenfield */
  `<svg viewBox="0 0 400 300" xmlns="http://www.w3.org/2000/svg">
    <rect x="0" y="0" width="400" height="300" fill="#090b09"/>
    <rect x="20" y="20" width="150" height="260" fill="none" stroke="#29ABE2" stroke-width="1.2"/>
    <rect x="180" y="60" width="130" height="220" fill="none" stroke="#29ABE2" stroke-width="1.2"/>
    <rect x="320" y="100" width="60" height="180" fill="none" stroke="#29ABE2" stroke-width="1.2"/>
    <line x1="170" y1="110" x2="180" y2="80" stroke="#29ABE2" stroke-width=".9"/>
  </svg>`
];
 
let previewVisible = false;
const preview = document.getElementById('projPreview');
const previewInner = document.getElementById('projPreviewInner');
 
function showPreview(e, idx) {
  previewInner.innerHTML = PROJ_SVG[idx];
  preview.classList.add('show');
  previewVisible = true;
  movePreview(e);
}
function hidePreview() {
  preview.classList.remove('show');
  previewVisible = false;
}
function movePreview(e) {
  if (!previewVisible) return;
  const x = e.clientX + 28;
  const y = e.clientY - 100;
  const maxX = window.innerWidth - 340;
  const maxY = window.innerHeight - 260;
  preview.style.left = Math.min(x, maxX) + 'px';
  preview.style.top  = Math.max(20, Math.min(y, maxY)) + 'px';
}
 
/* ─── MENU ─── */
let menuOpen = false;
function toggleMenu() {
  menuOpen = !menuOpen;
  document.getElementById('menu-overlay').classList.toggle('open', menuOpen);
  document.getElementById('menuBtn').classList.toggle('open', menuOpen);
  document.getElementById('menuBtn').textContent = menuOpen ? 'close' : 'menu';
}
function navTo(id) {
  toggleMenu();
  setTimeout(() => smoothTo(id), 600);
}
function smoothTo(id) {
  document.getElementById(id).scrollIntoView({ behavior: 'smooth' });
}
 
/* ─── NAV SCROLL ─── */
window.addEventListener('scroll', () => {
  document.getElementById('nav').classList.toggle('compact', window.scrollY > 60);
});
 
/* ─── LOADER SEQUENCE ─── */
(function(){
  const lNum  = document.getElementById('lNum');
  const lFill = document.getElementById('lFill');
  const loader= document.getElementById('loader');
  const cols  = [document.getElementById('lc0'), document.getElementById('lc1'), document.getElementById('lc2')];
 
  let pct = 0;
 
  // Counter
  const iv = setInterval(() => {
    pct += Math.random() * 2.6 + 0.5;
    if (pct >= 100) {
      pct = 100;
      clearInterval(iv);
      lNum.textContent = '100';
      lFill.style.width = '100%';
      lNum.classList.add('hide');
      setTimeout(exitLoader, 700);
      return;
    }
    lNum.textContent = Math.floor(pct);
    lFill.style.width = pct + '%';
  }, 72);
 
  function exitLoader() {
    loader.classList.add('exit');
    setTimeout(() => {
      loader.style.display = 'none';
      // Hero words rise
      ['hw0','hw1','hw2'].forEach((id, i) => {
        setTimeout(() => document.getElementById(id).classList.add('up'), i * 90);
      });
      setTimeout(() => document.getElementById('heroRight').classList.add('show'), 600);
    }, 1100);
  }
})();
 
/* ─── SCROLL REVEAL ─── */
const rvEls = document.querySelectorAll('.rv');
const rvObs = new IntersectionObserver(entries => {
  entries.forEach(e => {
    if (e.isIntersecting) {
      e.target.classList.add('in');
      e.target.querySelectorAll('.linner').forEach(l => l.classList.add('up'));
    }
  });
}, { threshold: 0.1 });
rvEls.forEach(el => rvObs.observe(el));
 





const slides = document.querySelectorAll(".slide");
const dotsContainer = document.querySelector(".dots");

let current = 0;
let interval;

// CREATE DOTS
slides.forEach((_, i) => {
  const dot = document.createElement("div");
  dot.classList.add("dot");
  if (i === 0) dot.classList.add("active");

  dot.addEventListener("click", () => {
    goToSlide(i);
    resetAuto();
  });

  dotsContainer.appendChild(dot);
});

const dots = document.querySelectorAll(".dot");

function updateSlides(index) {
  slides.forEach((s, i) => {
    s.classList.toggle("active", i === index);
    dots[i].classList.toggle("active", i === index);
  });
}

function goToSlide(index) {
  current = index;
  updateSlides(current);
}

function nextSlide() {
  current = (current + 1) % slides.length;
  updateSlides(current);
}

function autoSlide() {
  interval = setInterval(nextSlide, 4000); // 4s change
}

function resetAuto() {
  clearInterval(interval);
  autoSlide();
}

autoSlide();

<<<<<<< Updated upstream
  
/* ═══════════════════════════════════════════════════
   CONTACT FORM
═══════════════════════════════════════════════════ */

const form = document.getElementById("contactForm");
const successModal = document.getElementById("successModal");
const closeSuccess = document.getElementById("closeSuccess");

form.addEventListener("submit", async function(e) {

  e.preventDefault();

  const formData = new FormData(form);

  try {

    const response = await fetch(
      "https://formspree.io/f/mykvvkrn",
      {
        method: "POST",
        body: formData,
        headers: {
          Accept: "application/json"
        }
      }
    );

    if (response.ok) {

      successModal.classList.add("active");

      form.reset();

    } else {

      alert("Something went wrong. Please try again.");

    }

  } catch (error) {

    alert("Network error. Please try again.");

  }

});

/* CLOSE MODAL */

closeSuccess.addEventListener("click", () => {
  successModal.classList.remove("active");
});

/* CLOSE WHEN CLICKING OUTSIDE */

successModal.addEventListener("click", (e) => {

  if (e.target === successModal || e.target.classList.contains("success-backdrop")) {

    successModal.classList.remove("active");

  }

});

=======

function toggleProject(row){

  const item = row.parentElement;

  document.querySelectorAll('.proj-item').forEach(el => {

    if(el !== item){
      el.classList.remove('active');
    }

  });

  item.classList.toggle('active');

}
>>>>>>> Stashed changes
