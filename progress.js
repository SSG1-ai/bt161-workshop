// Per-exercise step progress: a checkbox on each step, a progress bar that
// fills as steps are ticked, persisted in localStorage per page.
(function () {
  var steps = Array.from(document.querySelectorAll(".step"));
  if (!steps.length) return; // index page has no steps

  var page = location.pathname.split("/").pop() || "index.html";
  var storeKey = "bt161-progress:" + page;

  // Load saved state
  var done = {};
  try {
    done = JSON.parse(localStorage.getItem(storeKey) || "{}") || {};
  } catch (e) { done = {}; }
  function save() {
    try { localStorage.setItem(storeKey, JSON.stringify(done)); } catch (e) {}
    // Notify the sidebar (same tab) to refresh this exercise's mini bar.
    document.dispatchEvent(new CustomEvent("bt161:progress", { detail: { page: page } }));
  }

  // --- Build the progress bar, inserted right after the exercise nav ---
  var bar = document.createElement("div");
  bar.className = "exprog";
  bar.innerHTML =
    '<div class="exprog-top">' +
      '<span class="exprog-label">Your progress</span>' +
      '<span class="exprog-count"></span>' +
    "</div>" +
    '<div class="exprog-track"><div class="exprog-fill"></div></div>' +
    '<button class="exprog-reset" type="button">Reset</button>';

  var anchor = document.querySelector(".exnav");
  if (anchor && anchor.parentNode) {
    anchor.parentNode.insertBefore(bar, anchor.nextSibling);
  } else {
    var main = document.querySelector("main");
    if (main) main.insertBefore(bar, main.firstChild);
  }

  var fill = bar.querySelector(".exprog-fill");
  var count = bar.querySelector(".exprog-count");

  function render() {
    var total = steps.length;
    var n = 0;
    steps.forEach(function (s, i) {
      if (done[i]) n++;
    });
    var pct = total ? Math.round((n / total) * 100) : 0;
    fill.style.width = pct + "%";
    count.textContent = n + " of " + total + " steps complete (" + pct + "%)";
    bar.classList.toggle("exprog-complete", n === total && total > 0);
  }

  // --- Add a checkbox to each step header ---
  steps.forEach(function (step, i) {
    var head = step.querySelector(".step-head");
    if (!head) return;

    var label = document.createElement("label");
    label.className = "step-check";
    label.title = "Mark this step complete";

    var cb = document.createElement("input");
    cb.type = "checkbox";
    cb.checked = !!done[i];

    var mark = document.createElement("span");
    mark.className = "step-check-box";
    mark.setAttribute("aria-hidden", "true");

    var txt = document.createElement("span");
    txt.className = "step-check-txt";
    txt.textContent = "Done";

    label.appendChild(cb);
    label.appendChild(mark);
    label.appendChild(txt);
    head.appendChild(label);

    if (done[i]) step.classList.add("step-done");

    cb.addEventListener("change", function () {
      if (cb.checked) { done[i] = true; step.classList.add("step-done"); }
      else { delete done[i]; step.classList.remove("step-done"); }
      save();
      render();
    });
  });

  bar.querySelector(".exprog-reset").addEventListener("click", function () {
    done = {};
    save();
    steps.forEach(function (s, i) {
      s.classList.remove("step-done");
      var cb = s.querySelector(".step-check input");
      if (cb) cb.checked = false;
    });
    render();
  });

  render();
})();
