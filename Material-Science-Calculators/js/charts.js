function drawHallChart(sigma0 = 70, k = 0.74, selectedD = null) {
  const canvas = document.getElementById("hall-chart");
  if (!canvas) return;

  const ctx = canvas.getContext("2d");
  const w = canvas.width;
  const h = canvas.height;
  const pad = 50;

  const grainSizes = [1, 2, 4, 8, 16, 32, 64, 128, 256];
  const strengths = grainSizes.map(d => sigma0 + (k / Math.sqrt(d)));

  const yMin = Math.min(...strengths) - 1;
  const yMax = Math.max(...strengths) + 1;

  ctx.clearRect(0, 0, w, h);
  ctx.fillStyle = "#fbfdff";
  ctx.fillRect(0, 0, w, h);

  ctx.strokeStyle = "#cbd5e1";
  ctx.lineWidth = 1;
  ctx.beginPath();
  ctx.moveTo(pad, pad / 2);
  ctx.lineTo(pad, h - pad);
  ctx.lineTo(w - pad / 2, h - pad);
  ctx.stroke();

  ctx.fillStyle = "#64748b";
  ctx.font = "12px Segoe UI";
  ctx.fillText("Yield Strength (MPa)", 10, 20);
  ctx.fillText("Grain size d (μm)", w - 130, h - 12);

  ctx.strokeStyle = "#0d6efd";
  ctx.lineWidth = 2.5;
  ctx.beginPath();
  grainSizes.forEach((d, i) => {
    const x = pad + (i / (grainSizes.length - 1)) * (w - 2 * pad);
    const y = h - pad - ((strengths[i] - yMin) / (yMax - yMin)) * (h - 1.8 * pad);
    if (i === 0) ctx.moveTo(x, y);
    else ctx.lineTo(x, y);
  });
  ctx.stroke();

  grainSizes.forEach((d, i) => {
    const x = pad + (i / (grainSizes.length - 1)) * (w - 2 * pad);
    const y = h - pad - ((strengths[i] - yMin) / (yMax - yMin)) * (h - 1.8 * pad);

    ctx.fillStyle = "#0d6efd";
    ctx.beginPath();
    ctx.arc(x, y, 3, 0, Math.PI * 2);
    ctx.fill();

    ctx.fillStyle = "#475569";
    ctx.fillText(String(d), x - 8, h - pad + 18);
  });

  if (selectedD && selectedD > 0) {
    const selectedY = sigma0 + (k / Math.sqrt(selectedD));
    const logMin = Math.log2(grainSizes[0]);
    const logMax = Math.log2(grainSizes[grainSizes.length - 1]);
    const x = pad + ((Math.log2(selectedD) - logMin) / (logMax - logMin)) * (w - 2 * pad);
    const clampedX = Math.max(pad, Math.min(w - pad, x));
    const y = h - pad - ((selectedY - yMin) / (yMax - yMin)) * (h - 1.8 * pad);

    ctx.fillStyle = "#dc3545";
    ctx.beginPath();
    ctx.arc(clampedX, y, 6, 0, Math.PI * 2);
    ctx.fill();

    ctx.fillStyle = "#475569";
    ctx.fillText(`Selected: d=${selectedD}`, clampedX + 8, y - 8);
  }
}