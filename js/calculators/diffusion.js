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