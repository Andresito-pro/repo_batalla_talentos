/* ============================================================
   navigation.js — Navegación y utilidades de scroll
   Batalla de Talentos SENA
   ============================================================ */

document.addEventListener("DOMContentLoaded", () => {
  // ── 1. Highlight de sección activa al hacer scroll ──────────
  // Solo en index.html donde hay anclas internas
  const sections = document.querySelectorAll("section[id]");
  const navItems = document.querySelectorAll('.nav-links a[href*="#"]');

  if (sections.length && navItems.length) {
    const sectionObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const id = entry.target.id;
            navItems.forEach((link) => {
              link.classList.toggle(
                "active",
                link.getAttribute("href").endsWith("#" + id),
              );
            });
          }
        });
      },
      { rootMargin: "-30% 0px -60% 0px" },
    );

    sections.forEach((sec) => sectionObserver.observe(sec));
  }

  // ── 2. Skip-to-content para accesibilidad ───────────────────
  const skip = document.querySelector(".skip-link");
  if (skip) {
    skip.addEventListener("click", (e) => {
      e.preventDefault();
      const target = document.querySelector(skip.getAttribute("href"));
      if (target) {
        target.setAttribute("tabindex", "-1");
        target.focus();
      }
    });
  }

  // ── 3. Preloader suave ───────────────────────────────────────
  window.addEventListener("load", () => {
    document.body.classList.add("loaded");
  });
});
