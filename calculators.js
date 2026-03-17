function getElementBySymbol(symbol) {
  return elementsData.find(e => e.s === symbol) || null;
}

function computeDelta(elements, fractions) {
  const rBar = elements.reduce((sum, el, i) => sum + fractions[i] * el.rad, 0);
  if (!rBar) return 0;
  return Math.sqrt(
    elements.reduce((sum, el, i) => sum + fractions[i] * Math.pow(1 - (el.rad / rBar), 2), 0)
  ) * 100;
}

function getSeverity(diff) {
  if (diff <= 5) return { text: "Very low mismatch", cls: "severity-low" };
  if (diff <= 10) return { text: "Low mismatch", cls: "severity-low" };
  if (diff <= 15) return { text: "Moderate mismatch", cls: "severity-mid" };
  return { text: "High mismatch", cls: "severity-high" };
}

function getPhaseTendency(score, diff, enDiff) {
  if (score === 4) {
    return {
      label: "Likely substitutional solid solution",
      cls: "badge-success",
      text: "All four simplified Hume-Rothery checks are favorable."
    };
  }
  if (score >= 3 && diff <= 15) {
    return {
      label: "Moderate solid solution tendency",
      cls: "badge-warning",
      text: "Compatibility is reasonable, but one criterion may limit full miscibility."
    };
  }
  if (enDiff > 0.4 && diff <= 15) {
    return {
      label: "Intermetallic tendency",
      cls: "badge-purple",
      text: "Electronegativity difference suggests compound-forming tendency."
    };
  }
  return {
    label: "Limited solubility / phase separation tendency",
    cls: "badge-danger",
    text: "Multiple criteria indicate poor substitutional compatibility."
  };
}

function getStrengthTendency(diff, enDiff) {
  if (diff > 12 || enDiff > 0.5) {
    return "High qualitative solid-solution strengthening tendency due to strong local lattice/electronic mismatch.";
  }
  if (diff > 6 || enDiff > 0.25) {
    return "Moderate strengthening tendency with meaningful but not extreme mismatch.";
  }
  return "Low strengthening tendency; pair is relatively close in size and electronegativity.";
}

function getTemperatureNote(element, tempC) {
  if (Number.isNaN(tempC) || !phaseNotes[element.s]) return null;
  const note = phaseNotes[element.s].find(n => tempC >= n.min && tempC < n.max);
  return note ? note.text : null;
}

function calculateHume() {
  if (!solvent || !solute) return;

  const sizeDiff = Math.abs((solute.rad - solvent.rad) / solvent.rad) * 100;
  const enDiff = Math.abs(solvent.en - solute.en);
  const avgVEC = (solvent.v + solute.v) / 2;
  const delta = computeDelta([solvent, solute], [0.5, 0.5]);

  const sizePass = sizeDiff <= 15;
  const structurePass = solvent.str === solute.str;
  const enPass = enDiff <= 0.40;
  const valencyPass = solvent.v === solute.v;

  const score = [sizePass, structurePass, enPass, valencyPass].filter(Boolean).length;

  setRuleCard("rule1", `${sizePass ? "✅" : "❌"} <b>Atomic Size:</b> ${sizeDiff.toFixed(2)}% ${sizePass ? "(within 15%)" : "(above 15%)"}`, sizePass);
  setRuleCard("rule2", `${structurePass ? "✅" : "❌"} <b>Crystal Structure:</b> ${solvent.str} vs ${solute.str}`, structurePass);
  setRuleCard("rule3", `${enPass ? "✅" : "❌"} <b>Electronegativity Difference:</b> ${enDiff.toFixed(2)} ${enPass ? "(small)" : "(large)"}`, enPass);
  setRuleCard("rule4", `${valencyPass ? "✅" : "❌"} <b>Valency:</b> ${solvent.v} vs ${solute.v}`, valencyPass);

  const severity = getSeverity(sizeDiff);
  document.getElementById("hume-metrics").style.display = "grid";
  document.getElementById("metric-mismatch").textContent = `${sizeDiff.toFixed(2)}%`;
  document.getElementById("metric-severity").innerHTML = `<span class="${severity.cls}">${severity.text}</span>`;
  document.getElementById("metric-vec").textContent = avgVEC.toFixed(2);
  document.getElementById("metric-delta").textContent = `${delta.toFixed(2)}%`;

  const phase = getPhaseTendency(score, sizeDiff, enDiff);
  document.getElementById("phase-tendency").innerHTML = `<span class="phase-badge ${phase.cls}">${phase.label}</span><br>${phase.text}`;
  document.getElementById("strength-tendency").innerHTML = `<b>Strengthening trend</b><br><br>${getStrengthTendency(sizeDiff, enDiff)}`;

  const summary = document.getElementById("summary");
  summary.style.display = "block";

  let verdict = "";
  let color = "var(--danger)";
  if (score === 4) {
    verdict = "EXCELLENT SOLID SOLUBILITY";
    color = "var(--success)";
  } else if (score >= 2) {
    verdict = "LIMITED / MODERATE SOLUBILITY";
    color = "var(--warning)";
  } else {
    verdict = "POOR SUBSTITUTIONAL COMPATIBILITY";
  }

  summary.style.borderTop = `5px solid ${color}`;
  summary.innerHTML = `${verdict}<small>Score: ${score}/4 | Pair: ${solvent.s} and ${solute.s} based on simplified Hume-Rothery screening, size-misfit, and electronic descriptors.</small>`;

  document.getElementById("pair-meta").style.display = "grid";
  document.getElementById("solvent-meta").innerHTML = `<b>Solvent: ${solvent.s}</b><br>Radius: ${solvent.rad} nm<br>Structure: ${solvent.str}<br>EN: ${solvent.en}<br>Valency: ${solvent.v}<br>Atomic wt: ${solvent.aw}`;
  document.getElementById("solute-meta").innerHTML = `<b>Solute: ${solute.s}</b><br>Radius: ${solute.rad} nm<br>Structure: ${solute.str}<br>EN: ${solute.en}<br>Valency: ${solute.v}<br>Atomic wt: ${solute.aw}`;

  const tempC = parseFloat(document.getElementById("temp-input").value);
  const notes = [getTemperatureNote(solvent, tempC), getTemperatureNote(solute, tempC)].filter(Boolean);
  const tempNode = document.getElementById("temp-note");

  if (notes.length) {
    tempNode.style.display = "block";
    tempNode.style.borderTop = "5px solid var(--purple)";
    tempNode.innerHTML = `Temperature-aware phase note<small>${notes.join(" ")}</small>`;
  } else {
    tempNode.style.display = "none";
  }
}

function calculateHallPetch() {
  const sigma0 = parseFloat(document.getElementById("hp-sigma").value);
  const k = parseFloat(document.getElementById("hp-k").value);
  const d = parseFloat(document.getElementById("hp-d").value);
  const out = document.getElementById("hp-result");

  if ([sigma0, k, d].some(v => Number.isNaN(v))) {
    out.style.display = "block";
    out.textContent = "Please fill all Hall-Petch inputs.";
    return;
  }

  if (d <= 0) {
    out.style.display = "block";
    out.textContent = "Grain size must be greater than zero.";
    return;
  }

  const sigmaY = sigma0 + (k / Math.sqrt(d));
  out.style.display = "block";
  out.innerHTML = `Yield Strength: ${sigmaY.toFixed(3)} MPa<br><span style="font-size:12px; font-weight:600; color:#4b5563;">Using σy = σ0 + ky / √d</span>`;
  drawHallChart(sigma0, k, d);
}

function calcAtWt() {
  const result = document.getElementById("atwt-result");

  if (!solvent || !solute) {
    result.style.display = "block";
    result.textContent = "Please select two elements first.";
    return;
  }

  const atomicPercent1 = parseFloat(document.getElementById("at-val").value);
  if (Number.isNaN(atomicPercent1) || atomicPercent1 < 0 || atomicPercent1 > 100) {
    result.style.display = "block";
    result.textContent = "Enter a valid atomic % between 0 and 100.";
    return;
  }

  const x1 = atomicPercent1 / 100;
  const x2 = 1 - x1;
  const avgAtomicWeight = x1 * solvent.aw + x2 * solute.aw;
  const w1 = (x1 * solvent.aw / avgAtomicWeight) * 100;
  const w2 = 100 - w1;

  result.style.display = "block";
  result.innerHTML = `${solvent.s}: ${w1.toFixed(2)} wt%<br>${solute.s}: ${w2.toFixed(2)} wt%`;

  document.getElementById("atwt-extra").style.display = "grid";
  document.getElementById("atwt-aaw").textContent = avgAtomicWeight.toFixed(3);
  document.getElementById("atwt-mole").textContent = x1.toFixed(4);
  document.getElementById("atwt-mass").textContent = (w1 / 100).toFixed(4);
}

function calcWtAt() {
  const result = document.getElementById("wtat-result");

  if (!solvent || !solute) {
    result.style.display = "block";
    result.textContent = "Please select two elements first.";
    return;
  }

  const weightPercent1 = parseFloat(document.getElementById("wt-val").value);
  if (Number.isNaN(weightPercent1) || weightPercent1 < 0 || weightPercent1 > 100) {
    result.style.display = "block";
    result.textContent = "Enter a valid weight % between 0 and 100.";
    return;
  }

  const wf1 = weightPercent1 / 100;
  const wf2 = 1 - wf1;
  const n1 = wf1 / solvent.aw;
  const n2 = wf2 / solute.aw;
  const x1 = n1 / (n1 + n2);
  const x2 = 1 - x1;
  const avgAtomicWeight = x1 * solvent.aw + x2 * solute.aw;

  result.style.display = "block";
  result.innerHTML = `${solvent.s}: ${(x1 * 100).toFixed(2)} at%<br>${solute.s}: ${(x2 * 100).toFixed(2)} at%`;

  document.getElementById("wtat-extra").style.display = "grid";
  document.getElementById("wtat-aaw").textContent = avgAtomicWeight.toFixed(3);
  document.getElementById("wtat-mole").textContent = x1.toFixed(4);
  document.getElementById("wtat-mass").textContent = wf1.toFixed(4);
}

function calculateDensity() {
  const result = document.getElementById("density-result");

  if (!solvent || !solute) {
    result.style.display = "block";
    result.textContent = "Select two elements from the table first.";
    return;
  }

  const c1 = parseFloat(document.getElementById("density-c1").value);
  const rho1 = parseFloat(document.getElementById("density-rho1").value);
  const rho2 = parseFloat(document.getElementById("density-rho2").value);

  if ([c1, rho1, rho2].some(v => Number.isNaN(v)) || c1 < 0 || c1 > 100 || rho1 <= 0 || rho2 <= 0) {
    result.style.display = "block";
    result.textContent = "Enter valid composition and density inputs.";
    return;
  }

  const w1 = c1 / 100;
  const w2 = 1 - w1;
  const rhoMix = 1 / ((w1 / rho1) + (w2 / rho2));

  result.style.display = "block";
  result.innerHTML = `${solvent.s}-${solute.s} estimated density: ${rhoMix.toFixed(4)} g/cm³<br><span style="font-size:12px; font-weight:600; color:#4b5563;">Using inverse rule of mixtures.</span>`;
}

function calculateDiffusion() {
  const d0 = parseFloat(document.getElementById("diff-d0").value);
  const q = parseFloat(document.getElementById("diff-q").value);
  const t = parseFloat(document.getElementById("diff-t").value);
  const out = document.getElementById("diff-result");

  if ([d0, q, t].some(v => Number.isNaN(v)) || d0 <= 0 || q <= 0 || t <= 0) {
    out.style.display = "block";
    out.textContent = "Please enter valid positive diffusion inputs.";
    return;
  }

  const D = d0 * Math.exp(-q / (R_GAS * t));
  out.style.display = "block";
  out.innerHTML = `Diffusion coefficient D = ${D.toExponential(4)} m²/s<br><span style="font-size:12px; font-weight:600; color:#4b5563;">Arrhenius relation applied at ${t} K</span>`;
}

function calculateTernary() {
  const e1 = getElementBySymbol(document.getElementById("ternary-e1").value);
  const e2 = getElementBySymbol(document.getElementById("ternary-e2").value);
  const e3 = getElementBySymbol(document.getElementById("ternary-e3").value);

  const c1 = parseFloat(document.getElementById("ternary-c1").value);
  const c2 = parseFloat(document.getElementById("ternary-c2").value);
  const c3 = parseFloat(document.getElementById("ternary-c3").value);
  const result = document.getElementById("ternary-result");

  if (!e1 || !e2 || !e3 || [c1, c2, c3].some(v => Number.isNaN(v) || v < 0)) {
    result.style.display = "block";
    result.textContent = "Choose three elements and valid atomic percentages.";
    return;
  }

  const sum = c1 + c2 + c3;
  if (sum <= 0) {
    result.style.display = "block";
    result.textContent = "Atomic percentages must sum to a positive value.";
    return;
  }

  const x1 = c1 / sum;
  const x2 = c2 / sum;
  const x3 = c3 / sum;

  const avgAtomicWeight = x1 * e1.aw + x2 * e2.aw + x3 * e3.aw;
  const w1 = (x1 * e1.aw / avgAtomicWeight) * 100;
  const w2 = (x2 * e2.aw / avgAtomicWeight) * 100;
  const w3 = 100 - w1 - w2;
  const vec = x1 * e1.v + x2 * e2.v + x3 * e3.v;
  const delta = computeDelta([e1, e2, e3], [x1, x2, x3]);

  result.style.display = "block";
  result.innerHTML = `${e1.s}: ${w1.toFixed(2)} wt% | ${e2.s}: ${w2.toFixed(2)} wt% | ${e3.s}: ${w3.toFixed(2)} wt%`;

  document.getElementById("ternary-extra").style.display = "grid";
  document.getElementById("ternary-aaw").textContent = avgAtomicWeight.toFixed(3);
  document.getElementById("ternary-vec").textContent = vec.toFixed(3);
  document.getElementById("ternary-delta").textContent = `${delta.toFixed(3)}%`;
}