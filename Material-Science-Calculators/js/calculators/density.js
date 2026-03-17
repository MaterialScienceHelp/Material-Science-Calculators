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