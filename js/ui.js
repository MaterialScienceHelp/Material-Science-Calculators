function updateBadges() {
  document.getElementById("solvent-badge").textContent = `Solvent: ${solvent ? solvent.s : "—"}`;
  document.getElementById("solute-badge").textContent = `Solute: ${solute ? solute.s : "—"}`;
}

function updateCompositionLabels() {
  document.getElementById("at-label").textContent = solvent ? `Atomic % of ${solvent.s}` : "Atomic % of Element 1";
  document.getElementById("wt-label").textContent = solvent ? `Weight % of ${solvent.s}` : "Weight % of Element 1";
}

function syncSelectionStyles() {
  document.querySelectorAll(".element").forEach(node => {
    node.classList.remove("solvent", "solute");
    if (solvent && node.dataset.symbol === solvent.s) node.classList.add("solvent");
    if (solute && node.dataset.symbol === solute.s) node.classList.add("solute");
  });
}

function setRuleCard(id, html, pass) {
  const node = document.getElementById(id);
  node.innerHTML = html;
  node.style.borderLeftColor = pass ? "var(--success)" : "var(--danger)";
}

function showInlineMessage(message, type = "success") {
  const targetId = currentMode === "at-wt"
    ? "atwt-result"
    : currentMode === "wt-at"
    ? "wtat-result"
    : currentMode === "density"
    ? "density-result"
    : "summary";

  const node = document.getElementById(targetId);
  if (!node) return;

  node.style.display = "block";
  node.style.borderTop = `5px solid ${type === "success" ? "var(--success)" : "var(--warning)"}`;
  node.innerHTML = message;
}

function resetResultsOnly() {
  ["summary", "temp-note", "hp-result", "atwt-result", "wtat-result", "density-result", "diff-result", "ternary-result"].forEach(id => {
    const node = document.getElementById(id);
    if (node) {
      node.style.display = "none";
      node.innerHTML = "";
      node.style.borderTop = "";
    }
  });

  document.getElementById("pair-meta").style.display = "none";
  document.getElementById("hume-metrics").style.display = "none";
  document.getElementById("atwt-extra").style.display = "none";
  document.getElementById("wtat-extra").style.display = "none";
  document.getElementById("ternary-extra").style.display = "none";

  ["rule1", "rule2", "rule3", "rule4"].forEach((id, idx) => {
    const node = document.getElementById(id);
    node.innerHTML = `Rule ${idx + 1}: Select two elements.`;
    node.style.borderLeftColor = "#cbd5e1";
  });

  document.getElementById("phase-tendency").innerHTML = "Phase tendency will appear here.";
  document.getElementById("strength-tendency").innerHTML = "Strengthening trend will appear here.";
}

function resetTable() {
  solvent = null;
  solute = null;

  ["at-val", "wt-val", "density-rho1", "density-rho2", "temp-input"].forEach(id => {
    const node = document.getElementById(id);
    if (node) node.value = "";
  });

  const densityC1 = document.getElementById("density-c1");
  if (densityC1) densityC1.value = "50";

  updateBadges();
  updateCompositionLabels();
  syncSelectionStyles();
  resetResultsOnly();
  drawHallChart();
}

function selectElement(el) {
  if (!solvent || (solvent && solute)) {
    solvent = el;
    solute = null;
  } else if (solvent && !solute) {
    if (solvent.s === el.s) {
      showInlineMessage("Please choose a different second element.", "warning");
      return;
    }
    solute = el;
  }

  syncSelectionStyles();
  updateBadges();
  updateCompositionLabels();
  resetResultsOnly();

  if (currentMode === "hume" && solvent && solute && typeof calculateHume === "function") {
    calculateHume();
  }

  if (["at-wt", "wt-at", "density"].includes(currentMode) && solvent && solute) {
    showInlineMessage(`Selected pair: ${solvent.s} and ${solute.s}`, "success");
  }
}

function buildTable() {
  const table = document.getElementById("table");
  table.innerHTML = "";

  for (let row = 1; row <= 9; row++) {
    for (let col = 1; col <= 18; col++) {
      const el = elementsData.find(e => e.r === row && e.c === col);
      const div = document.createElement("div");
      div.style.gridColumn = col;
      div.style.gridRow = row;

      if (!el) {
        div.className = "element empty";
        table.appendChild(div);
        continue;
      }

      div.className = "element";
      div.style.backgroundColor = `var(--${el.cat})`;
      div.dataset.symbol = el.s;
      div.title = `${el.s} | Radius: ${el.rad} nm | Structure: ${el.str} | EN: ${el.en} | Valency: ${el.v} | AW: ${el.aw}`;
      div.innerHTML = `<b>${el.s}</b><small>${el.rad} nm</small>`;
      div.addEventListener("click", () => selectElement(el));

      table.appendChild(div);
    }
  }

  syncSelectionStyles();
}

function populateTernarySelects() {
  const defaults = ["Al", "Si", "Mg"];
  ["ternary-e1", "ternary-e2", "ternary-e3"].forEach((id, idx) => {
    const select = document.getElementById(id);
    if (!select) return;

    select.innerHTML = elementsData.map(el => `<option value="${el.s}">${el.s}</option>`).join("");
    select.value = defaults[idx];
  });
}

function showCalc(mode) {
  currentMode = mode;

  document.querySelectorAll(".calc-view").forEach(el => el.classList.remove("active"));
  document.querySelectorAll(".tab-btn").forEach(el => el.classList.remove("active"));
  document.querySelectorAll(".theory-block").forEach(el => el.style.display = "none");

  document.getElementById(`view-${mode}`).classList.add("active");
  document.getElementById(`btn-${mode}`).classList.add("active");
  document.getElementById(`theory-${mode}`).style.display = "block";

  const hideTable = ["hall", "diffusion", "ternary", "structures"].includes(mode);
  document.getElementById("periodic-container").style.display = hideTable ? "none" : "block";

  if (mode === "hall") drawHallChart();
}