const structureMeta = {
  FCC: {
    name: "Face-Centered Cubic (FCC)",
    coordination: 12,
    apf: 0.74,
    note: "Close-packed structure with high ductility and many slip systems.",
    svg: `
      <svg viewBox="0 0 220 220" width="100%" height="220">
        <rect x="40" y="40" width="140" height="140" fill="none" stroke="#64748b" stroke-width="2"/>
        <circle cx="40" cy="40" r="12" fill="#2563eb"/>
        <circle cx="180" cy="40" r="12" fill="#2563eb"/>
        <circle cx="40" cy="180" r="12" fill="#2563eb"/>
        <circle cx="180" cy="180" r="12" fill="#2563eb"/>
        <circle cx="110" cy="40" r="12" fill="#f97316"/>
        <circle cx="110" cy="180" r="12" fill="#f97316"/>
        <circle cx="40" cy="110" r="12" fill="#f97316"/>
        <circle cx="180" cy="110" r="12" fill="#f97316"/>
        <circle cx="110" cy="110" r="10" fill="#94a3b8"/>
        <text x="110" y="208" text-anchor="middle" font-size="12" fill="#334155">FCC schematic</text>
      </svg>
    `
  },
  BCC: {
    name: "Body-Centered Cubic (BCC)",
    coordination: 8,
    apf: 0.68,
    note: "More open than FCC, strong but often less ductile at lower temperature.",
    svg: `
      <svg viewBox="0 0 220 220" width="100%" height="220">
        <rect x="40" y="40" width="140" height="140" fill="none" stroke="#64748b" stroke-width="2"/>
        <circle cx="40" cy="40" r="12" fill="#2563eb"/>
        <circle cx="180" cy="40" r="12" fill="#2563eb"/>
        <circle cx="40" cy="180" r="12" fill="#2563eb"/>
        <circle cx="180" cy="180" r="12" fill="#2563eb"/>
        <circle cx="110" cy="110" r="16" fill="#f97316"/>
        <line x1="40" y1="40" x2="110" y2="110" stroke="#94a3b8" stroke-width="2"/>
        <line x1="180" y1="40" x2="110" y2="110" stroke="#94a3b8" stroke-width="2"/>
        <line x1="40" y1="180" x2="110" y2="110" stroke="#94a3b8" stroke-width="2"/>
        <line x1="180" y1="180" x2="110" y2="110" stroke="#94a3b8" stroke-width="2"/>
        <text x="110" y="208" text-anchor="middle" font-size="12" fill="#334155">BCC schematic</text>
      </svg>
    `
  },
  HCP: {
    name: "Hexagonal Close-Packed (HCP)",
    coordination: 12,
    apf: 0.74,
    note: "Close-packed structure with fewer easy slip systems than FCC.",
    svg: `
      <svg viewBox="0 0 240 220" width="100%" height="220">
        <polygon points="70,40 170,40 210,110 170,180 70,180 30,110" fill="none" stroke="#64748b" stroke-width="2"/>
        <circle cx="70" cy="40" r="10" fill="#2563eb"/>
        <circle cx="170" cy="40" r="10" fill="#2563eb"/>
        <circle cx="210" cy="110" r="10" fill="#2563eb"/>
        <circle cx="170" cy="180" r="10" fill="#2563eb"/>
        <circle cx="70" cy="180" r="10" fill="#2563eb"/>
        <circle cx="30" cy="110" r="10" fill="#2563eb"/>
        <circle cx="120" cy="80" r="12" fill="#f97316"/>
        <circle cx="120" cy="140" r="12" fill="#f97316"/>
        <text x="120" y="208" text-anchor="middle" font-size="12" fill="#334155">HCP schematic</text>
      </svg>
    `
  }
};

function getCategoryLabel(cat) {
  const map = {
    alkali: "Alkali metal",
    alkaline: "Alkaline earth metal",
    transition: "Transition metal",
    "post-trans": "Post-transition metal",
    metalloid: "Metalloid",
    nonmetal: "Nonmetal",
    noble: "Noble gas",
    lanthanide: "Lanthanide",
    actinide: "Actinide"
  };
  return map[cat] || cat || "Unknown";
}

function renderUnknownStructure(name) {
  return `
    <div class="info-box">
      <b>${name || "Unknown structure"}</b><br>
      No schematic is available for this structure type yet.
    </div>
  `;
}

function showElementExplorer(el) {
  const emptyNode = document.getElementById("explorer-empty");
  const propertiesNode = document.getElementById("explorer-properties");
  const structureVisual = document.getElementById("structure-visual");
  const structureInfo = document.getElementById("structure-info");

  if (!el || !propertiesNode || !structureVisual || !structureInfo) return;

  const extra = typeof getElementDetail === "function"
    ? getElementDetail(el.s)
    : {
        name: el.s,
        atomicNumber: "—",
        density: "—",
        meltingPoint: "—",
        boilingPoint: "—",
        oxidationStates: "—",
        electronConfig: "—"
      };

  if (emptyNode) emptyNode.style.display = "none";
  propertiesNode.style.display = "block";

  propertiesNode.innerHTML = `
    <div class="explorer-top">
      <div class="explorer-symbol" style="background: var(--${el.cat});">
        ${el.s}
      </div>
      <div>
        <div class="explorer-title">${extra.name}</div>
        <div class="mini-note">${getCategoryLabel(el.cat)}</div>
      </div>
    </div>

    <div class="explorer-props-grid">
      <div class="explorer-prop"><b>Symbol</b><span>${el.s}</span></div>
      <div class="explorer-prop"><b>Atomic Number</b><span>${extra.atomicNumber}</span></div>
      <div class="explorer-prop"><b>Atomic Weight</b><span>${el.aw ?? "—"}</span></div>
      <div class="explorer-prop"><b>Atomic Radius</b><span>${el.rad ?? "—"} nm</span></div>
      <div class="explorer-prop"><b>Electronegativity</b><span>${el.en ?? "—"}</span></div>
      <div class="explorer-prop"><b>Valency</b><span>${el.v ?? "—"}</span></div>
      <div class="explorer-prop"><b>Crystal Structure</b><span>${el.str ?? "—"}</span></div>
      <div class="explorer-prop"><b>Density</b><span>${extra.density} g/cm³</span></div>
      <div class="explorer-prop"><b>Melting Point</b><span>${extra.meltingPoint} °C</span></div>
      <div class="explorer-prop"><b>Boiling Point</b><span>${extra.boilingPoint} °C</span></div>
      <div class="explorer-prop"><b>Oxidation States</b><span>${extra.oxidationStates}</span></div>
      <div class="explorer-prop"><b>Electron Config</b><span>${extra.electronConfig}</span></div>
    </div>
  `;

  const meta = structureMeta[el.str];
  if (meta) {
    structureVisual.innerHTML = meta.svg;
    structureInfo.innerHTML = `
      <b>${meta.name}</b><br>
      Coordination Number: ${meta.coordination}<br>
      Atomic Packing Factor: ${meta.apf}<br><br>
      ${meta.note}
    `;
  } else {
    structureVisual.innerHTML = renderUnknownStructure(el.str);
    structureInfo.innerHTML = `
      <b>${el.str || "Unknown"}</b><br>
      A detailed structure schematic is not available yet for this type.
    `;
  }
}