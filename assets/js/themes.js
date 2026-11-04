(function () {
  "use strict";
  var picker = document.getElementById("theme-picker");
  var toggle = document.getElementById("theme-toggle");
  if (!picker || !toggle) return;

  var choices = Array.prototype.slice.call(picker.querySelectorAll(".theme-choice"));
  var themes = ["default", "forest", "ocean", "earth"];

  function applyTheme(theme) {
    if (themes.indexOf(theme) === -1) theme = "default";
    document.body.classList.remove("theme-forest", "theme-ocean", "theme-earth");
    if (theme !== "default") document.body.classList.add("theme-" + theme);
    choices.forEach(function (choice) {
      choice.setAttribute("aria-pressed", choice.getAttribute("data-theme") === theme ? "true" : "false");
    });
    try { localStorage.setItem("ukemi-theme", theme); } catch (e) {}
  }

  var saved = "default";
  try { saved = localStorage.getItem("ukemi-theme") || "default"; } catch (e) {}
  applyTheme(saved);

  toggle.addEventListener("click", function (event) {
    event.stopPropagation();
    var open = picker.classList.toggle("is-open");
    toggle.setAttribute("aria-expanded", open ? "true" : "false");
  });

  choices.forEach(function (choice) {
    choice.addEventListener("click", function () {
      applyTheme(choice.getAttribute("data-theme"));
      picker.classList.remove("is-open");
      toggle.setAttribute("aria-expanded", "false");
    });
  });

  document.addEventListener("click", function (event) {
    if (!picker.contains(event.target)) {
      picker.classList.remove("is-open");
      toggle.setAttribute("aria-expanded", "false");
    }
  });
  document.addEventListener("keydown", function (event) {
    if (event.key === "Escape") {
      picker.classList.remove("is-open");
      toggle.setAttribute("aria-expanded", "false");
      toggle.focus();
    }
  });
})();