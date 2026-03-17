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