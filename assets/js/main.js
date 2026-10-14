document.addEventListener("DOMContentLoaded", function () {
  var progress = document.getElementById("reading-progress");
  var themeToggle = document.getElementById("theme-toggle");
  var randomIdea = document.getElementById("random-idea");
  var idea = document.getElementById("idea");
  var ideas = [
    "Láska bez hranic může být krásná — ale také snadno zneužitelná.",
    "V Paříži rozhoduje nejen talent, ale hlavně to, koho znáš.",
    "Goriot ztrácí všechno, protože věří, že oběť je totéž co láska.",
    "Rastignac si musí vybrat mezi svědomím a místem ve společnosti.",
    "Nejkrutější odmítnutí někdy není vyslovené — je to nepřítomnost."
  ];

  window.addEventListener("scroll", function () {
    var max = document.documentElement.scrollHeight - window.innerHeight;
    progress.style.width = max > 0 ? Math.min(window.scrollY / max * 100, 100) + "%" : "0%";
  });

  themeToggle.addEventListener("click", function () {
    document.body.classList.toggle("dark");
    themeToggle.textContent = document.body.classList.contains("dark") ? "☾" : "☼";
    themeToggle.setAttribute("aria-label", document.body.classList.contains("dark") ? "Zapnout světlý režim" : "Zapnout tmavý režim");
  });

  randomIdea.addEventListener("click", function () {
    var index = Math.floor(Math.random() * ideas.length);
    idea.textContent = ideas[index];
  });

  document.querySelectorAll(".motif").forEach(function (motif) {
    motif.addEventListener("click", function () {
      document.querySelectorAll(".motif").forEach(function (item) {
        item.classList.remove("is-selected");
      });
      motif.classList.add("is-selected");
    });
  });

  document.querySelectorAll(".character-summary").forEach(function (summary) {
    summary.addEventListener("click", function () {
      var character = summary.closest(".character");
      var wasOpen = character.classList.contains("is-open");
      document.querySelectorAll(".character").forEach(function (item) {
        item.classList.remove("is-open");
        item.querySelector(".character-summary").setAttribute("aria-expanded", "false");
      });
      if (!wasOpen) {
        character.classList.add("is-open");
        summary.setAttribute("aria-expanded", "true");
      }
    });
  });

  document.querySelectorAll(".filter-pill").forEach(function (pill) {
    pill.addEventListener("click", function () {
      document.querySelectorAll(".filter-pill").forEach(function (item) {
        item.classList.remove("is-active");
      });
      pill.classList.add("is-active");
      var filter = pill.dataset.filter;
      document.querySelectorAll(".character").forEach(function (character) {
        character.classList.toggle("is-hidden", filter !== "all" && character.dataset.group !== filter);
      });
    });
  });

  document.querySelectorAll(".quiz-options button").forEach(function (option) {
    option.addEventListener("click", function () {
      var result = document.getElementById("quiz-result");
      document.querySelectorAll(".quiz-options button").forEach(function (button) {
        button.classList.remove("is-correct", "is-wrong");
      });
      if (option.dataset.correct === "true") {
        option.classList.add("is-correct");
        result.textContent = "Správně! Honoré de Balzac román vydal v roce 1835.";
      } else {
        option.classList.add("is-wrong");
        result.textContent = "Tentokrát ne. Správná odpověď je Honoré de Balzac.";
      }
    });
  });
});
