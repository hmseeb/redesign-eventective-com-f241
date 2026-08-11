// The Galiston on Main — site interactions
(function () {
  "use strict";

  /* Mobile nav toggle */
  var navToggle = document.getElementById("navToggle");
  var mainNav = document.getElementById("main-nav");

  if (navToggle && mainNav) {
    navToggle.addEventListener("click", function () {
      var isOpen = mainNav.classList.toggle("open");
      navToggle.classList.toggle("open", isOpen);
      navToggle.setAttribute("aria-expanded", String(isOpen));
    });

    mainNav.querySelectorAll("a").forEach(function (link) {
      link.addEventListener("click", function () {
        mainNav.classList.remove("open");
        navToggle.classList.remove("open");
        navToggle.setAttribute("aria-expanded", "false");
      });
    });
  }

  /* Sticky header shadow on scroll */
  var header = document.querySelector(".site-header");
  if (header) {
    var updateHeader = function () {
      if (window.scrollY > 8) {
        header.style.boxShadow = "0 6px 20px rgba(36,26,21,0.08)";
      } else {
        header.style.boxShadow = "none";
      }
    };
    window.addEventListener("scroll", updateHeader, { passive: true });
    updateHeader();
  }

  /* Reveal-on-scroll animation for sections */
  var revealTargets = document.querySelectorAll(".section, .hero-content");
  if ("IntersectionObserver" in window) {
    revealTargets.forEach(function (el) {
      el.style.opacity = "0";
      el.style.transform = "translateY(24px)";
      el.style.transition = "opacity 0.7s ease, transform 0.7s ease";
    });

    var observer = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            entry.target.style.opacity = "1";
            entry.target.style.transform = "translateY(0)";
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.12 }
    );

    revealTargets.forEach(function (el) {
      observer.observe(el);
    });
  }

  /* Contact form — client-side only (no backend / API configured) */
  var form = document.getElementById("inquiryForm");
  var status = document.getElementById("formStatus");

  if (form && status) {
    form.addEventListener("submit", function (e) {
      e.preventDefault();

      var name = form.querySelector("#name");
      var email = form.querySelector("#email");

      if (!name.value.trim() || !email.value.trim()) {
        status.textContent = "Please add your name and email so we can reach you.";
        status.style.color = "#b5432f";
        return;
      }

      status.textContent =
        "Thanks, " + name.value.trim().split(" ")[0] + "! Your inquiry details are ready — " +
        "call 214-580-6156 or email via the official site to confirm your date.";
      status.style.color = "#6b2c20";
      form.reset();
    });
  }
})();
