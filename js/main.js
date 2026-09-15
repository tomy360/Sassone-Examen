/* ═══════════════════════════════════════════════════════
   Sassone Juegos de mesa · Interacciones
   Navbar scroll · Mobile nav · Reveal on scroll
   ═══════════════════════════════════════════════════════ */

(function () {
  "use strict";

  /* ── Navbar: sombra + padding al scrollear ── */
  const nav = document.getElementById("mainNav");

  function toggleNavScroll() {
    if (window.scrollY > 50) {
      nav.classList.add("scrolled");
    } else {
      nav.classList.remove("scrolled");
    }
  }

  window.addEventListener("scroll", toggleNavScroll, { passive: true });
  toggleNavScroll();

  /* ── Mobile nav: cerrar al hacer clic en un link ── */
  const collapse = document.getElementById("navCollapse");
  const bsCollapse =
    collapse && typeof bootstrap !== "undefined"
      ? bootstrap.Collapse.getOrCreateInstance(collapse, { toggle: false })
      : null;

  collapse?.querySelectorAll(".nav-link, .btn-gold").forEach(function (link) {
    link.addEventListener("click", function () {
      if (bsCollapse && collapse.classList.contains("show")) {
        bsCollapse.hide();
      }
    });
  });

  /* ── Scroll reveal: IntersectionObserver ── */
  if ("IntersectionObserver" in window) {
    const revealObserver = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            revealObserver.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.12, rootMargin: "0px 0px -40px 0px" }
    );

    document.querySelectorAll(".reveal").forEach(function (el) {
      revealObserver.observe(el);
    });
  } else {
    document.querySelectorAll(".reveal").forEach(function (el) {
      el.classList.add("is-visible");
    });
  }

  /* ── Active nav-link según scroll ── */
  const sections = document.querySelectorAll("section[id]");
  const navLinks = document.querySelectorAll(".site-nav .nav-link");

  function highlightNav() {
    let current = "";
    sections.forEach(function (section) {
      const top = section.offsetTop - 140;
      if (window.scrollY >= top) {
        current = section.getAttribute("id");
      }
    });

    navLinks.forEach(function (link) {
      link.classList.remove("active");
      if (link.getAttribute("href") === "#" + current) {
        link.classList.add("active");
      }
    });
  }

  window.addEventListener("scroll", highlightNav, { passive: true });
  highlightNav();
})();