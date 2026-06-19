/* ============================================================
   main.js — Funcionalidades principales
   Batalla de Talentos SENA
   ============================================================ */

document.addEventListener("DOMContentLoaded", () => {
  // ── 1. Navbar: scroll shadow + hamburguesa ──────────────────
  const navbar = document.querySelector(".navbar");
  const hamburger = document.querySelector(".hamburger");
  const navLinks = document.querySelector(".nav-links");

  if (navbar) {
    window.addEventListener("scroll", () => {
      navbar.classList.toggle("scrolled", window.scrollY > 20);
    });
  }

  if (hamburger && navLinks) {
    hamburger.addEventListener("click", () => {
      const open = hamburger.classList.toggle("open");
      navLinks.classList.toggle("open", open);
      hamburger.setAttribute("aria-expanded", String(open));
    });

    // Cerrar menú al elegir un enlace
    navLinks.querySelectorAll("a").forEach((link) => {
      link.addEventListener("click", () => {
        hamburger.classList.remove("open");
        navLinks.classList.remove("open");
        hamburger.setAttribute("aria-expanded", "false");
      });
    });

    // Cerrar al hacer clic fuera
    document.addEventListener("click", (e) => {
      if (!navbar.contains(e.target)) {
        hamburger.classList.remove("open");
        navLinks.classList.remove("open");
        hamburger.setAttribute("aria-expanded", "false");
      }
    });
  }

  // ── 2. Marcar enlace activo según página actual ─────────────
  const currentPage = window.location.pathname.split("/").pop() || "index.html";
  document.querySelectorAll(".nav-links a").forEach((link) => {
    const href = link.getAttribute("href").split("/").pop();
    if (href === currentPage) link.classList.add("active");
  });

  // ── 3. Botón "volver arriba" ────────────────────────────────
  const backBtn = document.getElementById("back-to-top");
  if (backBtn) {
    window.addEventListener("scroll", () => {
      backBtn.classList.toggle("visible", window.scrollY > 400);
    });
    backBtn.addEventListener("click", () => {
      window.scrollTo({ top: 0, behavior: "smooth" });
    });
  }

  // ── 4. Galería Lightbox (pintura.html) ─────────────────────
  initLightbox();
});

/* ── Lightbox ──────────────────────────────────────────────── */
function initLightbox() {
  const lightbox = document.getElementById("lightbox");
  if (!lightbox) return;

  const lightboxImg = lightbox.querySelector("img");
  const lightboxClose = lightbox.querySelector(".lightbox-close");

  document.querySelectorAll(".gallery-item[data-src]").forEach((item) => {
    item.addEventListener("click", () => {
      const src = item.getAttribute("data-src");
      const alt = item.getAttribute("data-alt") || "";
      if (lightboxImg) {
        lightboxImg.src = src;
        lightboxImg.alt = alt;
      }
      lightbox.classList.add("active");
      document.body.style.overflow = "hidden";
    });
  });

  function closeLightbox() {
    lightbox.classList.remove("active");
    document.body.style.overflow = "";
  }

  if (lightboxClose) lightboxClose.addEventListener("click", closeLightbox);
  lightbox.addEventListener("click", (e) => {
    if (e.target === lightbox) closeLightbox();
  });
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") closeLightbox();
  });
}
