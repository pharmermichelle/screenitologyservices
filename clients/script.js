// File upload name display (supports multiple files)
const fileInput = document.getElementById("attachment");
const fileName = document.querySelector(".file-name");

fileInput.addEventListener("change", () => {
  const fileCount = fileInput.files.length;
  fileName.dataset.count = fileCount;

  if (fileCount === 0) {
    fileName.textContent = "No file selected";
  } else if (fileCount === 1) {
    fileName.textContent = fileInput.files[0].name;
  } else {
    fileName.textContent = `${fileCount} files selected`;
  }
});

// Format phone number as user types
const phoneInput = document.querySelector('input[name="phone"]');
phoneInput.addEventListener("input", (e) => {
  let value = e.target.value.replace(/\D/g, "");
  if (value.length > 10) value = value.slice(0, 10);

  if (value.length >= 6) {
    e.target.value = `(${value.slice(0, 3)}) ${value.slice(3, 6)}-${value.slice(
      6
    )}`;
  } else if (value.length >= 3) {
    e.target.value = `(${value.slice(0, 3)}) ${value.slice(3)}`;
  } else {
    e.target.value = value;
  }
});

// Category tile image rotation
document.querySelectorAll(".category-tile").forEach((tile) => {
  const images = tile.dataset.images.split(",");
  let index = 0;
  tile.style.backgroundImage = `url(client-assets/${images[0]})`;
  setInterval(() => {
    index = (index + 1) % images.length;
    tile.style.backgroundImage = `url(client-assets/${images[index]})`;
  }, 3500);
});

// Process cards scroll animation
const processCards = document.querySelectorAll("#process .card");
const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry, index) => {
      if (entry.isIntersecting) {
        setTimeout(() => {
          entry.target.style.opacity = "1";
          entry.target.style.transform = "translateY(0)";
        }, index * 200);
      }
    });
  },
  { threshold: 0.2 }
);

processCards.forEach((card) => {
  card.style.opacity = "0";
  card.style.transform = "translateY(40px)";
  card.style.transition = "all 0.6s cubic-bezier(0.34, 1.56, 0.64, 1)";
  observer.observe(card);
});

// Nozzle trail (FIXED VERSION)
const canvas = document.getElementById("nozzle-trail");
const ctx = canvas.getContext("2d");

function resizeCanvas() {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
}
resizeCanvas();
window.addEventListener("resize", resizeCanvas);

const trail = [];
const maxTrail = 20;

document.addEventListener("mousemove", (e) => {
  trail.push({ x: e.clientX, y: e.clientY, life: 1 });
  if (trail.length > maxTrail) trail.shift();
});

function animate() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  for (let i = trail.length - 1; i >= 0; i--) {
    const point = trail[i];
    point.life -= 0.05;

    if (point.life <= 0) {
      trail.splice(i, 1);
      continue;
    }

    const size = point.life * 4;
    const alpha = point.life * 0.8;

    // Simple circle instead of gradient to avoid errors
    ctx.fillStyle = `rgba(249, 196, 6, ${alpha})`;
    ctx.beginPath();
    ctx.arc(point.x, point.y, size, 0, Math.PI * 2);
    ctx.fill();
  }

  requestAnimationFrame(animate);
}

animate();
// Scale G-code paths on window resize
function scaleGCodePaths() {
  const svg = document.querySelector(".gcode-paths");
  if (svg) {
    svg.setAttribute(
      "viewBox",
      `0 0 ${window.innerWidth} ${window.innerHeight}`
    );
  }
}

scaleGCodePaths();
window.addEventListener("resize", scaleGCodePaths);
// Animated header on scroll
const header = document.querySelector("header");
let lastScroll = 0;

window.addEventListener("scroll", () => {
  const currentScroll = window.pageYOffset;

  // Add shadow when scrolled
  if (currentScroll > 50) {
    header.classList.add("scrolled");
  } else {
    header.classList.remove("scrolled");
  }

  lastScroll = currentScroll;
});

// Optional: Add active state to current nav link
const sections = document.querySelectorAll("section[id]");
const navLinks = document.querySelectorAll("nav a");

window.addEventListener("scroll", () => {
  let current = "";

  sections.forEach((section) => {
    const sectionTop = section.offsetTop;
    const sectionHeight = section.clientHeight;
    if (window.pageYOffset >= sectionTop - 200) {
      current = section.getAttribute("id");
    }
  });

  navLinks.forEach((link) => {
    link.classList.remove("active");
    if (link.getAttribute("href") === `#${current}`) {
      link.classList.add("active");
    }
  });
});
// Scroll progress bar
window.addEventListener("scroll", () => {
  const progressBar = document.querySelector(".header-progress");
  const windowHeight =
    document.documentElement.scrollHeight - window.innerHeight;
  const scrolled = (window.pageYOffset / windowHeight) * 100;
  progressBar.style.width = `${scrolled}%`;
});
// Mobile navigation toggle
const navToggle = document.querySelector(".nav-toggle");
const nav = document.querySelector("nav");

navToggle.addEventListener("click", () => {
  nav.classList.toggle("active");
});

// Close nav when clicking a link
document.querySelectorAll("nav a").forEach((link) => {
  link.addEventListener("click", () => {
    nav.classList.remove("active");
  });
});

// Close nav when clicking outside
document.addEventListener("click", (e) => {
  if (!nav.contains(e.target) && !navToggle.contains(e.target)) {
    nav.classList.remove("active");
  }
});
