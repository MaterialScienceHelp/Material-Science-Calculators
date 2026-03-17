function computeDelta(elements, fractions) {
  const rBar = elements.reduce((sum, el, i) => sum + fractions[i] * el.rad, 0);
  if (!rBar) return 0;

  return Math.sqrt(
    elements.reduce((sum, el, i) => {
      return sum + fractions[i] * Math.pow(1 - el.rad / rBar, 2);
    }, 0)
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

  setRuleCard(
    "rule1",
    `${sizePass ? "✅" : "❌"} <b>Atomic Size:</b> ${sizeDiff.toFixed(2)}% ${sizePass ? "(within 15%)" : "(above 15%)"}`,
    sizePass
  );

  setRuleCard(
    "rule2",
    `${structurePass ? "✅" : "❌"} <b>Crystal Structure:</b> ${solvent.str} vs ${solute.str}`,
    structurePass
  );

  setRuleCard(
    "rule3",
    `${enPass ? "✅" : "❌"} <b>Electronegativity Difference:</b> ${enDiff.toFixed(2)} ${enPass ? "(small)" : "(large)"}`,
    enPass
  );

  setRuleCard(
    "rule4",
    `${valencyPass ? "✅" : "❌"} <b>Valency:</b> ${solvent.v} vs ${solute.v}`,
    valencyPass
  );

  const humeMetrics = document.getElementById("hume-metrics");
  if (humeMetrics) humeMetrics.style.display = "grid";

  const severity = getSeverity(sizeDiff);

  const mismatchNode = document.getElementById("metric-mismatch");
  const severityNode = document.getElementById("metric-severity");
  const vecNode = document.getElementById("metric-vec");
  const deltaNode = document.getElementById("metric-delta");

  if (mismatchNode) mismatchNode.textContent = `${sizeDiff.toFixed(2)}%`;
  if (severityNode) severityNode.innerHTML = `<span class="${severity.cls}">${severity.text}</span>`;
  if (vecNode) vecNode.textContent = avgVEC.toFixed(2);
  if (deltaNode) deltaNode.textContent = `${delta.toFixed(2)}%`;

  const phase = getPhaseTendency(score, sizeDiff, enDiff);

  const phaseNode = document.getElementById("phase-tendency");
  const strengthNode = document.getElementById("strength-tendency");

  if (phaseNode) {
    phaseNode.innerHTML = `<span class="phase-badge ${phase.cls}">${phase.label}</span><br>${phase.text}`;
  }

  if (strengthNode) {
    strengthNode.innerHTML = `<b>Strengthening trend</b><br><br>${getStrengthTendency(sizeDiff, enDiff)}`;
  }

  const pairMeta = document.getElementById("pair-meta");
  if (pairMeta) pairMeta.style.display = "grid";

  const solventMeta = document.getElementById("solvent-meta");
  const soluteMeta = document.getElementById("solute-meta");

  if (solventMeta) {
    solventMeta.innerHTML = `<b>Solvent: ${solvent.s}</b><br>Radius: ${solvent.rad} nm<br>Structure: ${solvent.str}<br>EN: ${solvent.en}<br>Valency: ${solvent.v}<br>Atomic wt: ${solvent.aw}`;
  }

  if (soluteMeta) {
    soluteMeta.innerHTML = `<b>Solute: ${solute.s}</b><br>Radius: ${solute.rad} nm<br>Structure: ${solute.str}<br>EN: ${solute.en}<br>Valency: ${solute.v}<br>Atomic wt: ${solute.aw}`;
  }

  const summary = document.getElementById("summary");
  if (!summary) return;

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
    color = "var(--danger)";
  }

  summary.style.borderTop = `5px solid ${color}`;
  summary.innerHTML = `${verdict}<small>Score: ${score}/4 | Pair: ${solvent.s} and ${solute.s}</small>`;
}