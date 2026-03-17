let explorerElement = null;

function updateBadges() {
  const solventBadge = document.getElementById("solvent-badge");
  const soluteBadge = document.getElementById("solute-badge");
  const explorerBadge = document.getElementById("explorer-badge");

  if (solventBadge) {
    if (currentMode === "at-wt" || currentMode === "wt-at" || currentMode === "density") {
      solventBadge.textContent = `Element 1: ${solvent ? solvent.s : "—"}`;
    } else {
      solventBadge.textContent = `Solvent: ${solvent ? solvent.s : "—"}`;
    }
  }

  if (soluteBadge) {
    if (currentMode === "at-wt" || currentMode === "wt-at" || currentMode === "density") {
      soluteBadge.textContent = `Element 2: ${solute ? solute.s : "—"}`;
    } else {
      soluteBadge.textContent = `Solute: ${solute ? solute.s : "—"}`;
    }
  }

  if (explorerBadge) {
    explorerBadge.textContent = `Explorer: ${explorerElement ? explorerElement.s : "—"}`;
  }
}

function updateCompositionLabels() {
  const atLabel = document.getElementById("at-label");
  const wtLabel = document.getElementById("wt-label");

  if (atLabel) atLabel.textContent = solvent ? `Atomic % of ${solvent.s}` : "Atomic % of Element 1";
  if (wtLabel) wtLabel.textContent = solvent ? `Weight % of ${solvent.s}` : "Weight % of Element 1";
}

function syncSelectionStyles() {
  document.querySelectorAll(".element").forEach(node => {
    node.classList.remove("solvent", "solute");

    if (currentMode === "explorer") {
      if (explorerElement && node.dataset.symbol === explorerElement.s) {
        node.classList.add("solvent");
      }
    } else {
      if (solvent && node.dataset.symbol === solvent.s) node.classList.add("solvent");
      if (solute && node.dataset.symbol === solute.s) node.classList.add("solute");
    }
  });
}

function setRuleCard(id, html, pass) {
  const node = document.getElementById(id);
  if (!node) return;
  node.innerHTML = html;
  node.style.borderLeftColor = pass ? "var(--success)" : "var(--danger)";
}

function showInlineMessage(message, type = "success") {
  const targetId =
    currentMode === "at-wt"
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
  [
    "summary",
    "hp-result",
    "atwt-result",
    "wtat-result",
    "density-result",
    "diff-result",
    "ternary-result"
  ].forEach(id => {
    const node = document.getElementById(id);
    if (node) {
      node.style.display = "none";
      node.innerHTML = "";
      node.style.borderTop = "";
    }
  });

  const pairMeta = document.getElementById("pair-meta");
  const humeMetrics = document.getElementById("hume-metrics");
  const atwtExtra = document.getElementById("atwt-extra");
  const wtatExtra = document.getElementById("wtat-extra");
  const ternaryExtra = document.getElementById("ternary-extra");

  if (pairMeta) pairMeta.style.display = "none";
  if (humeMetrics) humeMetrics.style.display = "none";
  if (atwtExtra) atwtExtra.style.display = "none";
  if (wtatExtra) wtatExtra.style.display = "none";
  if (ternaryExtra) ternaryExtra.style.display = "none";

  ["rule1", "rule2", "rule3", "rule4"].forEach((id, idx) => {
    const node = document.getElementById(id);
    if (node) {
      node.innerHTML = `Rule ${idx + 1}: Select two elements.`;
      node.style.borderLeftColor = "#cbd5e1";
    }
  });

  const phase = document.getElementById("phase-tendency");
  const strength = document.getElementById("strength-tendency");
  if (phase) phase.innerHTML = "Phase tendency will appear here.";
  if (strength) strength.innerHTML = "Strengthening trend will appear here.";
}

function resetExplorerPanel() {
  const emptyNode = document.getElementById("explorer-empty");
  const propertiesNode = document.getElementById("explorer-properties");
  const structureVisual = document.getElementById("structure-visual");
  const structureInfo = document.getElementById("structure-info");

  if (emptyNode) emptyNode.style.display = "block";
  if (propertiesNode) {
    propertiesNode.style.display = "none";
    propertiesNode.innerHTML = "";
  }
  if (structureVisual) structureVisual.innerHTML = "Select an element to view its structure.";
  if (structureInfo) structureInfo.innerHTML = "Structure notes will appear here.";
}

function resetTable() {
  solvent = null;
  solute = null;
  explorerElement = null;

  ["at-val", "wt-val", "density-rho1", "density-rho2"].forEach(id => {
    const node = document.getElementById(id);
    if (node) node.value = "";
  });

  const densityC1 = document.getElementById("density-c1");
  if (densityC1) densityC1.value = "50";

  updateBadges();
  updateCompositionLabels();
  syncSelectionStyles();
  resetResultsOnly();
  resetExplorerPanel();

  if (typeof drawHallChart === "function") drawHallChart();
}

function selectElement(el) {
  if (currentMode === "explorer") {
    explorerElement = el;
    updateBadges();
    syncSelectionStyles();
    if (typeof showElementExplorer === "function") showElementExplorer(el);
    return;
  }

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

  updateBadges();
  updateCompositionLabels();
  syncSelectionStyles();
  resetResultsOnly();

  if (currentMode === "hume" && solvent && solute) {
    try {
      calculateHume();
    } catch (err) {
      console.error("Hume-Rothery calculation error:", err);
      showInlineMessage("There was an issue running the Hume-Rothery calculation. Check console.", "warning");
    }
  }

  if (["at-wt", "wt-at", "density"].includes(currentMode) && solvent && solute) {
    showInlineMessage(`Selected pair: ${solvent.s} and ${solute.s}`, "success");
  }
}

function buildTable() {
  const table = document.getElementById("table");
  if (!table) return;

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
  document.querySelectorAll(".theory-block").forEach(el => { el.style.display = "none"; });

  const targetView = document.getElementById(`view-${mode}`);
  const targetBtn = document.getElementById(`btn-${mode}`);
  const targetTheory = document.getElementById(`theory-${mode}`);

  if (targetView) targetView.classList.add("active");
  if (targetBtn) targetBtn.classList.add("active");
  if (targetTheory) targetTheory.style.display = "block";

  const periodicContainer = document.getElementById("periodic-container");
  const hideTable = ["hall", "diffusion", "ternary", "structures"].includes(mode);
  if (periodicContainer) periodicContainer.style.display = hideTable ? "none" : "block";

  if (mode === "hall" && typeof drawHallChart === "function") drawHallChart();

  updateBadges();
  syncSelectionStyles();
}