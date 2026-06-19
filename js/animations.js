/* ============================================================
   animations.js — Animaciones de scroll con IntersectionObserver
   Batalla de Talentos SENA
   ============================================================ */

document.addEventListener("DOMContentLoaded", () => {
  // Elementos con animación fade-up y fade-in
  const animatedEls = document.querySelectorAll(".fade-up, .fade-in");

  if (!animatedEls.length) return;

  // Respeta prefers-reduced-motion
  const prefersReduced = window.matchMedia(
    "(prefers-reduced-motion: reduce)",
  ).matches;
  if (prefersReduced) {
    animatedEls.forEach((el) => el.classList.add("visible"));
    return;
  }

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("visible");
          observer.unobserve(entry.target); // Solo animar una vez
        }
      });
    },
    {
      threshold: 0.12,
      rootMargin: "0px 0px -40px 0px",
    },
  );

  animatedEls.forEach((el) => observer.observe(el));

  // ── Stagger para grillas ─────────────────────────────────────
  // Aplica delay escalonado a elementos con clase .stagger
  document.querySelectorAll(".stagger").forEach((group) => {
    const children = group.children;
    Array.from(children).forEach((child, i) => {
      child.style.transitionDelay = `${i * 80}ms`;
      child.classList.add("fade-up");
      observer.observe(child);
    });
  });
});
