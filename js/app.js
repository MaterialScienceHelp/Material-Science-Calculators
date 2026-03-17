document.addEventListener("DOMContentLoaded", () => {
  buildTable();
  populateTernarySelects();
  updateBadges();
  updateCompositionLabels();
  resetResultsOnly();
  drawHallChart();

  document.querySelectorAll(".tab-btn").forEach(btn => {
    btn.addEventListener("click", () => showCalc(btn.dataset.mode));
  });

  document.getElementById("reset-selection-btn").addEventListener("click", resetTable);
  document.getElementById("hall-btn").addEventListener("click", calculateHallPetch);
  document.getElementById("atwt-btn").addEventListener("click", calcAtWt);
  document.getElementById("wtat-btn").addEventListener("click", calcWtAt);
  document.getElementById("density-btn").addEventListener("click", calculateDensity);
  document.getElementById("diffusion-btn").addEventListener("click", calculateDiffusion);
  document.getElementById("ternary-btn").addEventListener("click", calculateTernary);
});