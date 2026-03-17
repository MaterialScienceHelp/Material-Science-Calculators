const R_GAS = 8.314;

let solvent = null;
let solute = null;
let currentMode = "hume";

const elementsData = [
  { s: "H", r: 1, c: 1, cat: "nonmetal", rad: 0.053, str: "Gas", en: 2.20, v: 1, aw: 1.008 },
  { s: "He", r: 1, c: 18, cat: "noble", rad: 0.031, str: "Gas", en: 0, v: 0, aw: 4.003 },
  { s: "Li", r: 2, c: 1, cat: "alkali", rad: 0.152, str: "BCC", en: 0.98, v: 1, aw: 6.94 },
  { s: "Be", r: 2, c: 2, cat: "alkaline", rad: 0.112, str: "HCP", en: 1.57, v: 2, aw: 9.012 },
  { s: "B", r: 2, c: 13, cat: "metalloid", rad: 0.082, str: "Rhom", en: 2.04, v: 3, aw: 10.81 },
  { s: "C", r: 2, c: 14, cat: "nonmetal", rad: 0.077, str: "Hex", en: 2.55, v: 4, aw: 12.011 },
  { s: "N", r: 2, c: 15, cat: "nonmetal", rad: 0.075, str: "Gas", en: 3.04, v: 3, aw: 14.007 },
  { s: "O", r: 2, c: 16, cat: "nonmetal", rad: 0.073, str: "Gas", en: 3.44, v: 2, aw: 15.999 },
  { s: "F", r: 2, c: 17, cat: "nonmetal", rad: 0.071, str: "Gas", en: 3.98, v: 1, aw: 18.998 },
  { s: "Ne", r: 2, c: 18, cat: "noble", rad: 0.069, str: "Gas", en: 0, v: 0, aw: 20.180 },

  { s: "Na", r: 3, c: 1, cat: "alkali", rad: 0.186, str: "BCC", en: 0.93, v: 1, aw: 22.990 },
  { s: "Mg", r: 3, c: 2, cat: "alkaline", rad: 0.160, str: "HCP", en: 1.31, v: 2, aw: 24.305 },
  { s: "Al", r: 3, c: 13, cat: "post-trans", rad: 0.143, str: "FCC", en: 1.61, v: 3, aw: 26.982 },
  { s: "Si", r: 3, c: 14, cat: "metalloid", rad: 0.118, str: "Dia", en: 1.90, v: 4, aw: 28.085 },
  { s: "P", r: 3, c: 15, cat: "nonmetal", rad: 0.110, str: "Orth", en: 2.19, v: 5, aw: 30.974 },
  { s: "S", r: 3, c: 16, cat: "nonmetal", rad: 0.103, str: "Orth", en: 2.58, v: 2, aw: 32.06 },
  { s: "Cl", r: 3, c: 17, cat: "nonmetal", rad: 0.099, str: "Gas", en: 3.16, v: 1, aw: 35.45 },
  { s: "Ar", r: 3, c: 18, cat: "noble", rad: 0.097, str: "Gas", en: 0, v: 0, aw: 39.948 },

  { s: "K", r: 4, c: 1, cat: "alkali", rad: 0.227, str: "BCC", en: 0.82, v: 1, aw: 39.098 },
  { s: "Ca", r: 4, c: 2, cat: "alkaline", rad: 0.197, str: "FCC", en: 1.00, v: 2, aw: 40.078 },
  { s: "Sc", r: 4, c: 3, cat: "transition", rad: 0.162, str: "HCP", en: 1.36, v: 3, aw: 44.956 },
  { s: "Ti", r: 4, c: 4, cat: "transition", rad: 0.145, str: "HCP", en: 1.54, v: 4, aw: 47.867 },
  { s: "V", r: 4, c: 5, cat: "transition", rad: 0.132, str: "BCC", en: 1.63, v: 3, aw: 50.942 },
  { s: "Cr", r: 4, c: 6, cat: "transition", rad: 0.125, str: "BCC", en: 1.66, v: 3, aw: 51.996 },
  { s: "Mn", r: 4, c: 7, cat: "transition", rad: 0.124, str: "Comp", en: 1.55, v: 2, aw: 54.938 },
  { s: "Fe", r: 4, c: 8, cat: "transition", rad: 0.124, str: "BCC", en: 1.83, v: 2, aw: 55.845 },
  { s: "Co", r: 4, c: 9, cat: "transition", rad: 0.125, str: "HCP", en: 1.88, v: 2, aw: 58.933 },
  { s: "Ni", r: 4, c: 10, cat: "transition", rad: 0.125, str: "FCC", en: 1.91, v: 2, aw: 58.693 },
  { s: "Cu", r: 4, c: 11, cat: "transition", rad: 0.128, str: "FCC", en: 1.90, v: 2, aw: 63.546 },
  { s: "Zn", r: 4, c: 12, cat: "transition", rad: 0.133, str: "HCP", en: 1.65, v: 2, aw: 65.38 },
  { s: "Ga", r: 4, c: 13, cat: "post-trans", rad: 0.122, str: "Orth", en: 1.81, v: 3, aw: 69.723 },
  { s: "Ge", r: 4, c: 14, cat: "metalloid", rad: 0.122, str: "Dia", en: 2.01, v: 4, aw: 72.630 },

  { s: "Zr", r: 5, c: 4, cat: "transition", rad: 0.159, str: "HCP", en: 1.33, v: 4, aw: 91.224 },
  { s: "Nb", r: 5, c: 5, cat: "transition", rad: 0.143, str: "BCC", en: 1.60, v: 5, aw: 92.906 },
  { s: "Mo", r: 5, c: 6, cat: "transition", rad: 0.136, str: "BCC", en: 2.16, v: 4, aw: 95.95 },
  { s: "Ag", r: 5, c: 11, cat: "transition", rad: 0.144, str: "FCC", en: 1.93, v: 1, aw: 107.868 },
  { s: "Sn", r: 5, c: 14, cat: "post-trans", rad: 0.141, str: "BCT", en: 1.96, v: 4, aw: 118.710 },

  { s: "W", r: 6, c: 6, cat: "transition", rad: 0.137, str: "BCC", en: 2.36, v: 4, aw: 183.84 },
  { s: "Pt", r: 6, c: 10, cat: "transition", rad: 0.139, str: "FCC", en: 2.28, v: 2, aw: 195.084 },
  { s: "Au", r: 6, c: 11, cat: "transition", rad: 0.144, str: "FCC", en: 2.54, v: 1, aw: 196.967 },
  { s: "Pb", r: 6, c: 14, cat: "post-trans", rad: 0.175, str: "FCC", en: 2.33, v: 2, aw: 207.2 },

  { s: "La", r: 8, c: 4, cat: "lanthanide", rad: 0.187, str: "DHCP", en: 1.10, v: 3, aw: 138.905 },
  { s: "Ce", r: 8, c: 5, cat: "lanthanide", rad: 0.182, str: "FCC", en: 1.12, v: 3, aw: 140.116 },

  { s: "Ac", r: 9, c: 4, cat: "actinide", rad: 0.188, str: "FCC", en: 1.10, v: 3, aw: 227.0 },
  { s: "Th", r: 9, c: 5, cat: "actinide", rad: 0.180, str: "FCC", en: 1.30, v: 4, aw: 232.038 }
];

const phaseNotes = {
  Fe: [
    { min: -273, max: 912, text: "Fe is primarily BCC (α-ferrite) in this temperature range." },
    { min: 912, max: 1394, text: "Fe transitions to FCC (γ-austenite) above ~912°C." },
    { min: 1394, max: 2500, text: "Fe returns to BCC (δ-ferrite) at very high temperature." }
  ],
  Ti: [
    { min: -273, max: 882, text: "Ti is HCP (α-Ti) below ~882°C." },
    { min: 882, max: 2500, text: "Ti becomes BCC (β-Ti) above ~882°C." }
  ],
  Co: [
    { min: -273, max: 417, text: "Co is mostly HCP at lower temperature." },
    { min: 417, max: 2500, text: "Co tends toward FCC at elevated temperature." }
  ]
};