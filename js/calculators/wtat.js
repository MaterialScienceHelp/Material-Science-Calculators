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