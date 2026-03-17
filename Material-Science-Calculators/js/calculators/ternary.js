function getElementBySymbol(symbol) {
  return elementsData.find(e => e.s === symbol) || null;
}

function calculateTernary() {
  const e1 = getElementBySymbol(document.getElementById("ternary-e1").value);
  const e2 = getElementBySymbol(document.getElementById("ternary-e2").value);
  const e3 = getElementById("ternary-e3") ? getElementBySymbol(document.getElementById("ternary-e3").value) : null;

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

  const rBar = x1 * e1.rad + x2 * e2.rad + x3 * e3.rad;
  const delta = Math.sqrt(
    x1 * Math.pow(1 - e1.rad / rBar, 2) +
    x2 * Math.pow(1 - e2.rad / rBar, 2) +
    x3 * Math.pow(1 - e3.rad / rBar, 2)
  ) * 100;

  result.style.display = "block";
  result.innerHTML = `${e1.s}: ${w1.toFixed(2)} wt% | ${e2.s}: ${w2.toFixed(2)} wt% | ${e3.s}: ${w3.toFixed(2)} wt%`;

  document.getElementById("ternary-extra").style.display = "grid";
  document.getElementById("ternary-aaw").textContent = avgAtomicWeight.toFixed(3);
  document.getElementById("ternary-vec").textContent = vec.toFixed(3);
  document.getElementById("ternary-delta").textContent = `${delta.toFixed(3)}%`;
}