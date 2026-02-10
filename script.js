var hero_image = document.getElementById("hero-image");
hero_image.src =
  localStorage.getItem("theme") === "dark" ? "image1.png" : "image.jpg";
// Initialize theme from localStorage
function initTheme() {
  const savedTheme = localStorage.getItem("theme") || "dark";
  document.documentElement.setAttribute("data-theme", savedTheme);
  updateThemeButton(savedTheme);
}

// Update theme button icon
function updateThemeButton(theme) {
  const themeBtn = document.getElementById("theme-toggle");
  if (themeBtn) {
    themeBtn.innerHTML =
      theme === "dark"
        ? '<i class="fas fa-sun"></i>'
        : '<i class="fas fa-moon"></i>';
  }
}

// Toggle theme
function toggleTheme() {
  const currentTheme =
    document.documentElement.getAttribute("data-theme") || "dark";
  const newTheme = currentTheme === "dark" ? "light" : "dark";

  image = newTheme === "dark" ? "image1.png" : "image.jpg";
  hero_image.src = image;

  document.documentElement.setAttribute("data-theme", newTheme);
  localStorage.setItem("theme", newTheme);
  updateThemeButton(newTheme);
}

// Update all translated elements
function updateLanguage(lang) {
  document.documentElement.lang = lang;
  document.body.dir = lang === "ar" ? "rtl" : "ltr";

  // Update all elements with data-i18n attribute
  document.querySelectorAll("[data-i18n]").forEach((element) => {
    const key = element.getAttribute("data-i18n");
    const translation = translations[lang]?.[key];
    if (translation) {
      element.textContent = translation;
    }
  });

  // Save language preference
  localStorage.setItem("language", lang);
}

// Initialize language from localStorage
function initLanguage() {
  const savedLang = localStorage.getItem("language") || "ar";
  updateLanguage(savedLang);

  // Update active button
  document.querySelectorAll(".lang-btn").forEach((btn) => {
    btn.classList.remove("active");
    if (btn.getAttribute("data-lang") === savedLang) {
      btn.classList.add("active");
    }
  });
}

// Language switch event listeners
document.querySelectorAll(".lang-btn").forEach((button) => {
  button.addEventListener("click", function () {
    const lang = this.getAttribute("data-lang");

    // Update active state
    document.querySelectorAll(".lang-btn").forEach((btn) => {
      btn.classList.remove("active");
    });
    this.classList.add("active");

    // Update language
    updateLanguage(lang);
  });
});

// Theme toggle event listener
const themeToggle = document.getElementById("theme-toggle");
if (themeToggle) {
  themeToggle.addEventListener("click", toggleTheme);
}

// Smooth scroll for navigation links
document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
  anchor.addEventListener("click", function (e) {
    const href = this.getAttribute("href");
    if (href !== "#") {
      e.preventDefault();
      const target = document.querySelector(href);
      if (target) {
        target.scrollIntoView({
          behavior: "smooth",
          block: "start",
        });
      }
    }
  });
});

// Intersection Observer for fade-in animations
const observerOptions = {
  threshold: 0.1,
  rootMargin: "0px 0px -100px 0px",
};

const observer = new IntersectionObserver(function (entries) {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.style.opacity = "1";
      entry.target.style.transform = "translateY(0)";
    }
  });
}, observerOptions);

// Observe all cards and sections
document
  .querySelectorAll(".card-custom, .certificate-card, .contact-item")
  .forEach((el) => {
    el.style.opacity = "0";
    el.style.transform = "translateY(20px)";
    el.style.transition = "opacity 0.6s ease, transform 0.6s ease";
    observer.observe(el);
  });

// Certificate flip animation on click
document.querySelectorAll(".certificate-card").forEach((card) => {
  card.addEventListener("click", function () {
    this.classList.toggle("flipped");
  });
});

// Navbar toggle functionality
const navbarToggle = document.getElementById("navbar-toggle");
const navbarMenu = document.getElementById("navbar-menu");

if (navbarToggle) {
  navbarToggle.addEventListener("click", function () {
    navbarMenu.classList.toggle("active");
    navbarToggle.classList.toggle("active");
  });
}

// Close navbar when clicking on a link
if (navbarMenu) {
  navbarMenu.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", function () {
      navbarMenu.classList.remove("active");
      navbarToggle.classList.remove("active");
    });
  });
}

// Initialize on page load
document.addEventListener("DOMContentLoaded", function () {
  initTheme();
  initLanguage();

  // Add smooth scroll behavior
  document.documentElement.style.scrollBehavior = "smooth";
});

// Handle window resize for responsive adjustments
let resizeTimer;
window.addEventListener("resize", function () {
  clearTimeout(resizeTimer);
  resizeTimer = setTimeout(function () {
    // Close navbar on larger screens
    if (window.innerWidth > 768) {
      navbarMenu.classList.remove("active");
      navbarToggle.classList.remove("active");
    }
  }, 250);
});

// Navbar scroll effect
let lastScrollTop = 0;
const navbar = document.querySelector(".navbar");

window.addEventListener("scroll", function () {
  let scrollTop = window.pageYOffset || document.documentElement.scrollTop;

  if (scrollTop > 100) {
    navbar.classList.add("scrolled");
  } else {
    navbar.classList.remove("scrolled");
  }

  lastScrollTop = scrollTop <= 0 ? 0 : scrollTop;
});
