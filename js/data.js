const R_GAS = 8.314;

let solvent = null;
let solute = null;
let currentMode = "hume";

const elementsData = [
  // Period 1
  { s: "H",  r: 1, c: 1,  cat: "nonmetal",   rad: 0.053, str: "Gas",     en: 2.20, v: 1, aw: 1.008 },
  { s: "He", r: 1, c: 18, cat: "noble",      rad: 0.031, str: "Gas",     en: 0.00, v: 0, aw: 4.003 },

  // Period 2
  { s: "Li", r: 2, c: 1,  cat: "alkali",     rad: 0.152, str: "BCC",     en: 0.98, v: 1, aw: 6.94 },
  { s: "Be", r: 2, c: 2,  cat: "alkaline",   rad: 0.112, str: "HCP",     en: 1.57, v: 2, aw: 9.012 },
  { s: "B",  r: 2, c: 13, cat: "metalloid",  rad: 0.082, str: "Rhom",    en: 2.04, v: 3, aw: 10.81 },
  { s: "C",  r: 2, c: 14, cat: "nonmetal",   rad: 0.077, str: "Hex",     en: 2.55, v: 4, aw: 12.011 },
  { s: "N",  r: 2, c: 15, cat: "nonmetal",   rad: 0.075, str: "Gas",     en: 3.04, v: 3, aw: 14.007 },
  { s: "O",  r: 2, c: 16, cat: "nonmetal",   rad: 0.073, str: "Gas",     en: 3.44, v: 2, aw: 15.999 },
  { s: "F",  r: 2, c: 17, cat: "nonmetal",   rad: 0.071, str: "Gas",     en: 3.98, v: 1, aw: 18.998 },
  { s: "Ne", r: 2, c: 18, cat: "noble",      rad: 0.069, str: "Gas",     en: 0.00, v: 0, aw: 20.180 },

  // Period 3
  { s: "Na", r: 3, c: 1,  cat: "alkali",     rad: 0.186, str: "BCC",     en: 0.93, v: 1, aw: 22.990 },
  { s: "Mg", r: 3, c: 2,  cat: "alkaline",   rad: 0.160, str: "HCP",     en: 1.31, v: 2, aw: 24.305 },
  { s: "Al", r: 3, c: 13, cat: "post-trans", rad: 0.143, str: "FCC",     en: 1.61, v: 3, aw: 26.982 },
  { s: "Si", r: 3, c: 14, cat: "metalloid",  rad: 0.118, str: "Dia",     en: 1.90, v: 4, aw: 28.085 },
  { s: "P",  r: 3, c: 15, cat: "nonmetal",   rad: 0.110, str: "Orth",    en: 2.19, v: 5, aw: 30.974 },
  { s: "S",  r: 3, c: 16, cat: "nonmetal",   rad: 0.103, str: "Orth",    en: 2.58, v: 2, aw: 32.06 },
  { s: "Cl", r: 3, c: 17, cat: "nonmetal",   rad: 0.099, str: "Gas",     en: 3.16, v: 1, aw: 35.45 },
  { s: "Ar", r: 3, c: 18, cat: "noble",      rad: 0.097, str: "Gas",     en: 0.00, v: 0, aw: 39.948 },

  // Period 4
  { s: "K",  r: 4, c: 1,  cat: "alkali",     rad: 0.227, str: "BCC",     en: 0.82, v: 1, aw: 39.098 },
  { s: "Ca", r: 4, c: 2,  cat: "alkaline",   rad: 0.197, str: "FCC",     en: 1.00, v: 2, aw: 40.078 },
  { s: "Sc", r: 4, c: 3,  cat: "transition", rad: 0.162, str: "HCP",     en: 1.36, v: 3, aw: 44.956 },
  { s: "Ti", r: 4, c: 4,  cat: "transition", rad: 0.145, str: "HCP",     en: 1.54, v: 4, aw: 47.867 },
  { s: "V",  r: 4, c: 5,  cat: "transition", rad: 0.132, str: "BCC",     en: 1.63, v: 5, aw: 50.942 },
  { s: "Cr", r: 4, c: 6,  cat: "transition", rad: 0.125, str: "BCC",     en: 1.66, v: 6, aw: 51.996 },
  { s: "Mn", r: 4, c: 7,  cat: "transition", rad: 0.124, str: "Comp",    en: 1.55, v: 7, aw: 54.938 },
  { s: "Fe", r: 4, c: 8,  cat: "transition", rad: 0.124, str: "BCC",     en: 1.83, v: 8, aw: 55.845 },
  { s: "Co", r: 4, c: 9,  cat: "transition", rad: 0.125, str: "HCP",     en: 1.88, v: 9, aw: 58.933 },
  { s: "Ni", r: 4, c: 10, cat: "transition", rad: 0.125, str: "FCC",     en: 1.91, v: 10, aw: 58.693 },
  { s: "Cu", r: 4, c: 11, cat: "transition", rad: 0.128, str: "FCC",     en: 1.90, v: 11, aw: 63.546 },
  { s: "Zn", r: 4, c: 12, cat: "transition", rad: 0.133, str: "HCP",     en: 1.65, v: 12, aw: 65.38 },
  { s: "Ga", r: 4, c: 13, cat: "post-trans", rad: 0.122, str: "Orth",    en: 1.81, v: 3, aw: 69.723 },
  { s: "Ge", r: 4, c: 14, cat: "metalloid",  rad: 0.122, str: "Dia",     en: 2.01, v: 4, aw: 72.630 },
  { s: "As", r: 4, c: 15, cat: "metalloid",  rad: 0.119, str: "Rhom",    en: 2.18, v: 5, aw: 74.922 },
  { s: "Se", r: 4, c: 16, cat: "nonmetal",   rad: 0.116, str: "Hex",     en: 2.55, v: 6, aw: 78.971 },
  { s: "Br", r: 4, c: 17, cat: "nonmetal",   rad: 0.114, str: "Liq",     en: 2.96, v: 7, aw: 79.904 },
  { s: "Kr", r: 4, c: 18, cat: "noble",      rad: 0.110, str: "Gas",     en: 3.00, v: 0, aw: 83.798 },

  // Period 5
  { s: "Rb", r: 5, c: 1,  cat: "alkali",     rad: 0.248, str: "BCC",     en: 0.82, v: 1, aw: 85.468 },
  { s: "Sr", r: 5, c: 2,  cat: "alkaline",   rad: 0.215, str: "FCC",     en: 0.95, v: 2, aw: 87.62 },
  { s: "Y",  r: 5, c: 3,  cat: "transition", rad: 0.180, str: "HCP",     en: 1.22, v: 3, aw: 88.906 },
  { s: "Zr", r: 5, c: 4,  cat: "transition", rad: 0.159, str: "HCP",     en: 1.33, v: 4, aw: 91.224 },
  { s: "Nb", r: 5, c: 5,  cat: "transition", rad: 0.143, str: "BCC",     en: 1.60, v: 5, aw: 92.906 },
  { s: "Mo", r: 5, c: 6,  cat: "transition", rad: 0.136, str: "BCC",     en: 2.16, v: 6, aw: 95.95 },
  { s: "Tc", r: 5, c: 7,  cat: "transition", rad: 0.136, str: "HCP",     en: 1.90, v: 7, aw: 98.0 },
  { s: "Ru", r: 5, c: 8,  cat: "transition", rad: 0.134, str: "HCP",     en: 2.20, v: 8, aw: 101.07 },
  { s: "Rh", r: 5, c: 9,  cat: "transition", rad: 0.134, str: "FCC",     en: 2.28, v: 9, aw: 102.906 },
  { s: "Pd", r: 5, c: 10, cat: "transition", rad: 0.137, str: "FCC",     en: 2.20, v: 10, aw: 106.42 },
  { s: "Ag", r: 5, c: 11, cat: "transition", rad: 0.144, str: "FCC",     en: 1.93, v: 11, aw: 107.868 },
  { s: "Cd", r: 5, c: 12, cat: "transition", rad: 0.151, str: "HCP",     en: 1.69, v: 12, aw: 112.414 },
  { s: "In", r: 5, c: 13, cat: "post-trans", rad: 0.144, str: "Tetr",    en: 1.78, v: 3, aw: 114.818 },
  { s: "Sn", r: 5, c: 14, cat: "post-trans", rad: 0.141, str: "BCT",     en: 1.96, v: 4, aw: 118.710 },
  { s: "Sb", r: 5, c: 15, cat: "metalloid",  rad: 0.138, str: "Rhom",    en: 2.05, v: 5, aw: 121.760 },
  { s: "Te", r: 5, c: 16, cat: "metalloid",  rad: 0.135, str: "Hex",     en: 2.10, v: 6, aw: 127.60 },
  { s: "I",  r: 5, c: 17, cat: "nonmetal",   rad: 0.133, str: "Orth",    en: 2.66, v: 7, aw: 126.904 },
  { s: "Xe", r: 5, c: 18, cat: "noble",      rad: 0.130, str: "Gas",     en: 2.60, v: 0, aw: 131.293 },

  // Period 6
  { s: "Cs", r: 6, c: 1,  cat: "alkali",     rad: 0.265, str: "BCC",     en: 0.79, v: 1, aw: 132.905 },
  { s: "Ba", r: 6, c: 2,  cat: "alkaline",   rad: 0.222, str: "BCC",     en: 0.89, v: 2, aw: 137.327 },
  { s: "Hf", r: 6, c: 4,  cat: "transition", rad: 0.159, str: "HCP",     en: 1.30, v: 4, aw: 178.49 },
  { s: "Ta", r: 6, c: 5,  cat: "transition", rad: 0.146, str: "BCC",     en: 1.50, v: 5, aw: 180.948 },
  { s: "W",  r: 6, c: 6,  cat: "transition", rad: 0.137, str: "BCC",     en: 2.36, v: 6, aw: 183.84 },
  { s: "Re", r: 6, c: 7,  cat: "transition", rad: 0.137, str: "HCP",     en: 1.90, v: 7, aw: 186.207 },
  { s: "Os", r: 6, c: 8,  cat: "transition", rad: 0.135, str: "HCP",     en: 2.20, v: 8, aw: 190.23 },
  { s: "Ir", r: 6, c: 9,  cat: "transition", rad: 0.136, str: "FCC",     en: 2.20, v: 9, aw: 192.217 },
  { s: "Pt", r: 6, c: 10, cat: "transition", rad: 0.139, str: "FCC",     en: 2.28, v: 10, aw: 195.084 },
  { s: "Au", r: 6, c: 11, cat: "transition", rad: 0.144, str: "FCC",     en: 2.54, v: 11, aw: 196.967 },
  { s: "Hg", r: 6, c: 12, cat: "transition", rad: 0.151, str: "Liq",     en: 2.00, v: 12, aw: 200.592 },
  { s: "Tl", r: 6, c: 13, cat: "post-trans", rad: 0.156, str: "HCP",     en: 1.62, v: 3, aw: 204.38 },
  { s: "Pb", r: 6, c: 14, cat: "post-trans", rad: 0.175, str: "FCC",     en: 2.33, v: 4, aw: 207.2 },
  { s: "Bi", r: 6, c: 15, cat: "post-trans", rad: 0.148, str: "Rhom",    en: 2.02, v: 5, aw: 208.980 },
  { s: "Po", r: 6, c: 16, cat: "metalloid",  rad: 0.140, str: "SC",      en: 2.00, v: 6, aw: 209.0 },
  { s: "At", r: 6, c: 17, cat: "metalloid",  rad: 0.150, str: "Unknown", en: 2.20, v: 7, aw: 210.0 },
  { s: "Rn", r: 6, c: 18, cat: "noble",      rad: 0.145, str: "Gas",     en: 0.00, v: 0, aw: 222.0 },

  // Period 7
  { s: "Fr", r: 7, c: 1,  cat: "alkali",     rad: 0.270, str: "BCC",     en: 0.70, v: 1, aw: 223.0 },
  { s: "Ra", r: 7, c: 2,  cat: "alkaline",   rad: 0.223, str: "BCC",     en: 0.90, v: 2, aw: 226.0 },
  { s: "Rf", r: 7, c: 4,  cat: "transition", rad: 0.157, str: "Unknown", en: 1.30, v: 4, aw: 267.0 },
  { s: "Db", r: 7, c: 5,  cat: "transition", rad: 0.149, str: "Unknown", en: 1.50, v: 5, aw: 270.0 },
  { s: "Sg", r: 7, c: 6,  cat: "transition", rad: 0.143, str: "Unknown", en: 1.90, v: 6, aw: 271.0 },
  { s: "Bh", r: 7, c: 7,  cat: "transition", rad: 0.141, str: "Unknown", en: 2.00, v: 7, aw: 270.0 },
  { s: "Hs", r: 7, c: 8,  cat: "transition", rad: 0.134, str: "Unknown", en: 2.20, v: 8, aw: 277.0 },
  { s: "Mt", r: 7, c: 9,  cat: "transition", rad: 0.129, str: "Unknown", en: 2.30, v: 9, aw: 278.0 },
  { s: "Ds", r: 7, c: 10, cat: "transition", rad: 0.128, str: "Unknown", en: 2.40, v: 10, aw: 281.0 },
  { s: "Rg", r: 7, c: 11, cat: "transition", rad: 0.138, str: "Unknown", en: 2.60, v: 11, aw: 282.0 },
  { s: "Cn", r: 7, c: 12, cat: "transition", rad: 0.147, str: "Unknown", en: 2.00, v: 12, aw: 285.0 },
  { s: "Nh", r: 7, c: 13, cat: "post-trans", rad: 0.170, str: "Unknown", en: 1.50, v: 3, aw: 286.0 },
  { s: "Fl", r: 7, c: 14, cat: "post-trans", rad: 0.160, str: "Unknown", en: 1.80, v: 4, aw: 289.0 },
  { s: "Mc", r: 7, c: 15, cat: "post-trans", rad: 0.155, str: "Unknown", en: 1.90, v: 5, aw: 290.0 },
  { s: "Lv", r: 7, c: 16, cat: "post-trans", rad: 0.150, str: "Unknown", en: 2.00, v: 6, aw: 293.0 },
  { s: "Ts", r: 7, c: 17, cat: "metalloid",  rad: 0.145, str: "Unknown", en: 2.20, v: 7, aw: 294.0 },
  { s: "Og", r: 7, c: 18, cat: "noble",      rad: 0.152, str: "Unknown", en: 0.00, v: 0, aw: 294.0 },

  // Lanthanides (row 8)
  { s: "La", r: 8, c: 4,  cat: "lanthanide", rad: 0.187, str: "DHCP",    en: 1.10, v: 3, aw: 138.905 },
  { s: "Ce", r: 8, c: 5,  cat: "lanthanide", rad: 0.182, str: "FCC",     en: 1.12, v: 4, aw: 140.116 },
  { s: "Pr", r: 8, c: 6,  cat: "lanthanide", rad: 0.182, str: "DHCP",    en: 1.13, v: 3, aw: 140.908 },
  { s: "Nd", r: 8, c: 7,  cat: "lanthanide", rad: 0.181, str: "DHCP",    en: 1.14, v: 3, aw: 144.242 },
  { s: "Pm", r: 8, c: 8,  cat: "lanthanide", rad: 0.180, str: "Hex",     en: 1.13, v: 3, aw: 145.0 },
  { s: "Sm", r: 8, c: 9,  cat: "lanthanide", rad: 0.180, str: "Rhom",    en: 1.17, v: 3, aw: 150.36 },
  { s: "Eu", r: 8, c: 10, cat: "lanthanide", rad: 0.199, str: "BCC",     en: 1.20, v: 2, aw: 151.964 },
  { s: "Gd", r: 8, c: 11, cat: "lanthanide", rad: 0.180, str: "HCP",     en: 1.20, v: 3, aw: 157.25 },
  { s: "Tb", r: 8, c: 12, cat: "lanthanide", rad: 0.177, str: "HCP",     en: 1.10, v: 3, aw: 158.925 },
  { s: "Dy", r: 8, c: 13, cat: "lanthanide", rad: 0.178, str: "HCP",     en: 1.22, v: 3, aw: 162.500 },
  { s: "Ho", r: 8, c: 14, cat: "lanthanide", rad: 0.176, str: "HCP",     en: 1.23, v: 3, aw: 164.930 },
  { s: "Er", r: 8, c: 15, cat: "lanthanide", rad: 0.176, str: "HCP",     en: 1.24, v: 3, aw: 167.259 },
  { s: "Tm", r: 8, c: 16, cat: "lanthanide", rad: 0.175, str: "HCP",     en: 1.25, v: 3, aw: 168.934 },
  { s: "Yb", r: 8, c: 17, cat: "lanthanide", rad: 0.194, str: "FCC",     en: 1.10, v: 2, aw: 173.045 },
  { s: "Lu", r: 8, c: 18, cat: "lanthanide", rad: 0.173, str: "HCP",     en: 1.27, v: 3, aw: 174.967 },

  // Actinides (row 9)
  { s: "Ac", r: 9, c: 4,  cat: "actinide",   rad: 0.188, str: "FCC",     en: 1.10, v: 3, aw: 227.0 },
  { s: "Th", r: 9, c: 5,  cat: "actinide",   rad: 0.180, str: "FCC",     en: 1.30, v: 4, aw: 232.038 },
  { s: "Pa", r: 9, c: 6,  cat: "actinide",   rad: 0.161, str: "Tetr",    en: 1.50, v: 5, aw: 231.036 },
  { s: "U",  r: 9, c: 7,  cat: "actinide",   rad: 0.156, str: "Orth",    en: 1.38, v: 6, aw: 238.029 },
  { s: "Np", r: 9, c: 8,  cat: "actinide",   rad: 0.155, str: "Orth",    en: 1.36, v: 5, aw: 237.0 },
  { s: "Pu", r: 9, c: 9,  cat: "actinide",   rad: 0.159, str: "Mono",    en: 1.28, v: 4, aw: 244.0 },
  { s: "Am", r: 9, c: 10, cat: "actinide",   rad: 0.173, str: "DHCP",    en: 1.13, v: 3, aw: 243.0 },
  { s: "Cm", r: 9, c: 11, cat: "actinide",   rad: 0.174, str: "DHCP",    en: 1.28, v: 3, aw: 247.0 },
  { s: "Bk", r: 9, c: 12, cat: "actinide",   rad: 0.170, str: "HCP",     en: 1.30, v: 3, aw: 247.0 },
  { s: "Cf", r: 9, c: 13, cat: "actinide",   rad: 0.169, str: "HCP",     en: 1.30, v: 3, aw: 251.0 },
  { s: "Es", r: 9, c: 14, cat: "actinide",   rad: 0.168, str: "HCP",     en: 1.30, v: 3, aw: 252.0 },
  { s: "Fm", r: 9, c: 15, cat: "actinide",   rad: 0.167, str: "Unknown", en: 1.30, v: 3, aw: 257.0 },
  { s: "Md", r: 9, c: 16, cat: "actinide",   rad: 0.166, str: "Unknown", en: 1.30, v: 3, aw: 258.0 },
  { s: "No", r: 9, c: 17, cat: "actinide",   rad: 0.176, str: "FCC",     en: 1.30, v: 2, aw: 259.0 },
  { s: "Lr", r: 9, c: 18, cat: "actinide",   rad: 0.161, str: "Unknown", en: 1.30, v: 3, aw: 266.0 }
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