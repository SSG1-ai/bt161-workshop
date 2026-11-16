// Click-to-zoom lightbox for step screenshots. Shared across all pages.
(function () {
  var overlay = document.createElement("div");
  overlay.className = "lb-overlay";
  overlay.innerHTML =
    '<button class="lb-close" aria-label="Close image">&times;</button>' +
    '<img class="lb-img" alt="">' +
    '<div class="lb-cap"></div>';
  document.body.appendChild(overlay);

  var lbImg = overlay.querySelector(".lb-img");
  var lbCap = overlay.querySelector(".lb-cap");

  function open(src, alt, caption) {
    lbImg.src = src;
    lbImg.alt = alt || "";
    lbCap.textContent = caption || "";
    lbCap.style.display = caption ? "block" : "none";
    overlay.classList.add("lb-on");
    document.body.classList.add("lb-locked");
  }
  function close() {
    overlay.classList.remove("lb-on");
    document.body.classList.remove("lb-locked");
    lbImg.src = "";
  }

  // Delegate clicks from any step screenshot
  document.addEventListener("click", function (e) {
    var img = e.target.closest("figure.shot img");
    if (img) {
      var fig = img.closest("figure.shot");
      var cap = fig ? fig.querySelector("figcaption") : null;
      open(img.currentSrc || img.src, img.alt, cap ? cap.textContent : "");
      return;
    }
    if (e.target === overlay || e.target.closest(".lb-close")) close();
  });

  document.addEventListener("keydown", function (e) {
    if (e.key === "Escape" && overlay.classList.contains("lb-on")) close();
  });

  // Make the screenshots look clickable
  document.querySelectorAll("figure.shot img").forEach(function (img) {
    img.style.cursor = "zoom-in";
    img.setAttribute("title", "Click to enlarge");
  });
})();
