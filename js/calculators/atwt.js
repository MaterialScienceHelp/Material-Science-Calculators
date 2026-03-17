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