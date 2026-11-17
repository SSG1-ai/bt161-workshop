// Shared workshop agenda sidebar. Each page sets <body data-current="..."> to
// highlight its entry. Keeping the markup in one place avoids drift across pages.
(function () {
  var ITEMS = [
    { id: "home", href: "index.html", icon: "clip", title: "Agenda &amp; Overview", sub: "Session introduction" },
    { id: "ex0", href: "ex0.html", badge: "GS", title: "Getting Started", time: "10 min", steps: 3 },
    { id: "ex1", href: "ex1.html", badge: "1", title: "AI Agent Hub Dashboard", time: "20 min", steps: 4 },
    { id: "ex2", href: "ex2.html", badge: "2", title: "From Discovery to Inventory", time: "15 min", steps: 4 },
    { id: "ex3", href: "ex3.html", badge: "3", title: "Complete Governance Profile", time: "15 min", steps: 4 },
    { id: "ex4", href: "ex4.html", badge: "4", title: "Collect Info via Survey", time: "20 min", steps: 5 },
    { id: "ex5", href: "ex5.html", badge: "5", title: "Verify the Agent", time: "10 min", steps: 4 },
    { id: "ex6", href: "ex6.html", badge: "6", title: "Decommission Legacy Agent", time: "10 min", steps: 5 }
  ];

  // Read how many steps are ticked for an exercise page from localStorage.
  function doneCount(href) {
    try {
      var raw = localStorage.getItem("bt161-progress:" + href);
      if (!raw) return 0;
      var obj = JSON.parse(raw) || {};
      return Object.keys(obj).filter(function (k) { return obj[k]; }).length;
    } catch (e) { return 0; }
  }

  var current = document.body.getAttribute("data-current") || "";

  var clockSvg =
    '<svg class="ag-clock" viewBox="0 0 24 24" width="14" height="14" aria-hidden="true">' +
    '<circle cx="12" cy="12" r="9" fill="none" stroke="currentColor" stroke-width="2"/>' +
    '<path d="M12 7v5l3 2" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"/></svg>';

  var clipSvg =
    '<svg viewBox="0 0 24 24" width="18" height="18" aria-hidden="true">' +
    '<rect x="5" y="4" width="14" height="17" rx="2" fill="#fff" stroke="#cfd8e3" stroke-width="1.5"/>' +
    '<rect x="9" y="2.5" width="6" height="3.5" rx="1.2" fill="#8aa0b6"/></svg>';

  var rows = ITEMS.map(function (it) {
    var isCur = it.id === current;
    var badge;
    if (it.icon === "clip") {
      badge = '<span class="ag-icon ag-clip">' + clipSvg + "</span>";
    } else {
      badge = '<span class="ag-badge' + (isCur ? " ag-badge-cur" : "") + '">' + it.badge + "</span>";
    }
    var meta = it.sub
      ? '<span class="ag-sub">' + it.sub + "</span>"
      : '<span class="ag-time">' + clockSvg + " " + it.time + "</span>";

    // Mini progress bar for exercises (not the Agenda/home row)
    var prog = "";
    if (it.steps) {
      var n = doneCount(it.href);
      var pct = Math.round((n / it.steps) * 100);
      prog =
        '<span class="ag-prog' + (n === it.steps ? " ag-prog-done" : "") + '" data-ex="' + it.href +
        '" data-steps="' + it.steps + '">' +
        '<span class="ag-prog-track"><span class="ag-prog-fill" style="width:' + pct + '%"></span></span>' +
        '<span class="ag-prog-txt">' + n + "/" + it.steps + "</span>" +
        "</span>";
    }

    return (
      '<a class="ag-row' + (isCur ? " ag-current" : "") + '" href="' + it.href + '"' +
      (isCur ? ' aria-current="page"' : "") + ' title="' + it.title.replace(/&amp;/g, "&") + '">' +
      badge +
      '<span class="ag-text"><span class="ag-title">' + it.title + "</span>" + meta + prog + "</span>" +
      "</a>"
    );
  }).join("");

  var html =
    '<div class="ag-head"><span class="ag-head-text">WORKSHOP AGENDA</span>' +
    '<button class="ag-collapse-btn" aria-label="Collapse agenda" title="Collapse agenda">&#10094;</button>' +
    "</div>" +
    '<nav class="ag-list">' + rows + "</nav>";

  var aside = document.createElement("aside");
  aside.className = "agenda";
  aside.innerHTML = html;
  document.body.insertBefore(aside, document.body.firstChild);
  document.body.classList.add("has-agenda");

  // Restore collapsed state (desktop rail) from a previous page
  try {
    if (localStorage.getItem("bt161-agenda-collapsed") === "1") {
      document.body.classList.add("ag-collapsed");
    }
  } catch (e) {}

  // Desktop collapse / expand
  var collapseBtn = aside.querySelector(".ag-collapse-btn");
  collapseBtn.addEventListener("click", function () {
    var collapsed = document.body.classList.toggle("ag-collapsed");
    collapseBtn.setAttribute("aria-label", collapsed ? "Expand agenda" : "Collapse agenda");
    collapseBtn.setAttribute("title", collapsed ? "Expand agenda" : "Collapse agenda");
    try {
      localStorage.setItem("bt161-agenda-collapsed", collapsed ? "1" : "0");
    } catch (e) {}
  });

  // Mobile toggle
  var toggle = document.createElement("button");
  toggle.className = "ag-toggle";
  toggle.setAttribute("aria-label", "Toggle workshop agenda");
  toggle.innerHTML = "&#9776; Agenda";
  toggle.addEventListener("click", function () {
    document.body.classList.toggle("ag-open");
  });
  document.body.insertBefore(toggle, document.body.firstChild);
  aside.addEventListener("click", function (e) {
    if (e.target.closest("a")) document.body.classList.remove("ag-open");
  });

  // Live-update a row's mini progress bar when steps are ticked on this page.
  function refreshProg(href) {
    var el = aside.querySelector('.ag-prog[data-ex="' + href + '"]');
    if (!el) return;
    var total = parseInt(el.getAttribute("data-steps"), 10) || 0;
    var n = doneCount(href);
    var pct = total ? Math.round((n / total) * 100) : 0;
    el.querySelector(".ag-prog-fill").style.width = pct + "%";
    el.querySelector(".ag-prog-txt").textContent = n + "/" + total;
    el.classList.toggle("ag-prog-done", total > 0 && n === total);
  }
  // Same-tab updates (from progress.js on the current page)
  document.addEventListener("bt161:progress", function (e) {
    if (e.detail && e.detail.page) refreshProg(e.detail.page);
  });
  // Cross-tab updates (localStorage changed in another tab)
  window.addEventListener("storage", function (e) {
    if (e.key && e.key.indexOf("bt161-progress:") === 0) {
      refreshProg(e.key.slice("bt161-progress:".length));
    }
  });
})();
