const elementDetails = {
  H:  { name: "Hydrogen", atomicNumber: 1, density: 0.0000899, meltingPoint: -259.16, boilingPoint: -252.87, oxidationStates: "+1, -1", electronConfig: "1s1" },
  He: { name: "Helium", atomicNumber: 2, density: 0.0001785, meltingPoint: "—", boilingPoint: -268.93, oxidationStates: "0", electronConfig: "1s2" },

  Li: { name: "Lithium", atomicNumber: 3, density: 0.534, meltingPoint: 180.5, boilingPoint: 1342, oxidationStates: "+1", electronConfig: "[He] 2s1" },
  Be: { name: "Beryllium", atomicNumber: 4, density: 1.85, meltingPoint: 1287, boilingPoint: 2469, oxidationStates: "+2", electronConfig: "[He] 2s2" },
  B:  { name: "Boron", atomicNumber: 5, density: 2.34, meltingPoint: 2075, boilingPoint: 4000, oxidationStates: "+3", electronConfig: "[He] 2s2 2p1" },
  C:  { name: "Carbon", atomicNumber: 6, density: 2.26, meltingPoint: 3550, boilingPoint: 4027, oxidationStates: "±4, +2", electronConfig: "[He] 2s2 2p2" },
  N:  { name: "Nitrogen", atomicNumber: 7, density: 0.0012506, meltingPoint: -210.0, boilingPoint: -195.8, oxidationStates: "-3 to +5", electronConfig: "[He] 2s2 2p3" },
  O:  { name: "Oxygen", atomicNumber: 8, density: 0.001429, meltingPoint: -218.8, boilingPoint: -183.0, oxidationStates: "-2", electronConfig: "[He] 2s2 2p4" },
  F:  { name: "Fluorine", atomicNumber: 9, density: 0.001696, meltingPoint: -219.6, boilingPoint: -188.1, oxidationStates: "-1", electronConfig: "[He] 2s2 2p5" },
  Ne: { name: "Neon", atomicNumber: 10, density: 0.0008999, meltingPoint: -248.6, boilingPoint: -246.1, oxidationStates: "0", electronConfig: "[He] 2s2 2p6" },

  Na: { name: "Sodium", atomicNumber: 11, density: 0.971, meltingPoint: 97.8, boilingPoint: 883, oxidationStates: "+1", electronConfig: "[Ne] 3s1" },
  Mg: { name: "Magnesium", atomicNumber: 12, density: 1.738, meltingPoint: 650, boilingPoint: 1091, oxidationStates: "+2", electronConfig: "[Ne] 3s2" },
  Al: { name: "Aluminum", atomicNumber: 13, density: 2.70, meltingPoint: 660.3, boilingPoint: 2470, oxidationStates: "+3", electronConfig: "[Ne] 3s2 3p1" },
  Si: { name: "Silicon", atomicNumber: 14, density: 2.33, meltingPoint: 1414, boilingPoint: 3265, oxidationStates: "±4", electronConfig: "[Ne] 3s2 3p2" },
  P:  { name: "Phosphorus", atomicNumber: 15, density: 1.82, meltingPoint: 44.1, boilingPoint: 280.5, oxidationStates: "-3, +3, +5", electronConfig: "[Ne] 3s2 3p3" },
  S:  { name: "Sulfur", atomicNumber: 16, density: 2.07, meltingPoint: 115.2, boilingPoint: 444.6, oxidationStates: "-2, +4, +6", electronConfig: "[Ne] 3s2 3p4" },
  Cl: { name: "Chlorine", atomicNumber: 17, density: 0.003214, meltingPoint: -101.5, boilingPoint: -34.0, oxidationStates: "-1, +1, +3, +5, +7", electronConfig: "[Ne] 3s2 3p5" },
  Ar: { name: "Argon", atomicNumber: 18, density: 0.0017837, meltingPoint: -189.3, boilingPoint: -185.8, oxidationStates: "0", electronConfig: "[Ne] 3s2 3p6" },

  K:  { name: "Potassium", atomicNumber: 19, density: 0.862, meltingPoint: 63.5, boilingPoint: 759, oxidationStates: "+1", electronConfig: "[Ar] 4s1" },
  Ca: { name: "Calcium", atomicNumber: 20, density: 1.55, meltingPoint: 842, boilingPoint: 1484, oxidationStates: "+2", electronConfig: "[Ar] 4s2" },
  Sc: { name: "Scandium", atomicNumber: 21, density: 2.99, meltingPoint: 1541, boilingPoint: 2836, oxidationStates: "+3", electronConfig: "[Ar] 3d1 4s2" },
  Ti: { name: "Titanium", atomicNumber: 22, density: 4.51, meltingPoint: 1668, boilingPoint: 3287, oxidationStates: "+2, +3, +4", electronConfig: "[Ar] 3d2 4s2" },
  V:  { name: "Vanadium", atomicNumber: 23, density: 6.11, meltingPoint: 1910, boilingPoint: 3407, oxidationStates: "+2, +3, +4, +5", electronConfig: "[Ar] 3d3 4s2" },
  Cr: { name: "Chromium", atomicNumber: 24, density: 7.15, meltingPoint: 1907, boilingPoint: 2671, oxidationStates: "+2, +3, +6", electronConfig: "[Ar] 3d5 4s1" },
  Mn: { name: "Manganese", atomicNumber: 25, density: 7.21, meltingPoint: 1246, boilingPoint: 2061, oxidationStates: "+2, +4, +7", electronConfig: "[Ar] 3d5 4s2" },
  Fe: { name: "Iron", atomicNumber: 26, density: 7.87, meltingPoint: 1538, boilingPoint: 2862, oxidationStates: "+2, +3", electronConfig: "[Ar] 3d6 4s2" },
  Co: { name: "Cobalt", atomicNumber: 27, density: 8.90, meltingPoint: 1495, boilingPoint: 2927, oxidationStates: "+2, +3", electronConfig: "[Ar] 3d7 4s2" },
  Ni: { name: "Nickel", atomicNumber: 28, density: 8.90, meltingPoint: 1455, boilingPoint: 2913, oxidationStates: "+2, +3", electronConfig: "[Ar] 3d8 4s2" },
  Cu: { name: "Copper", atomicNumber: 29, density: 8.96, meltingPoint: 1084.6, boilingPoint: 2562, oxidationStates: "+1, +2", electronConfig: "[Ar] 3d10 4s1" },
  Zn: { name: "Zinc", atomicNumber: 30, density: 7.14, meltingPoint: 419.5, boilingPoint: 907, oxidationStates: "+2", electronConfig: "[Ar] 3d10 4s2" },
  Ga: { name: "Gallium", atomicNumber: 31, density: 5.91, meltingPoint: 29.8, boilingPoint: 2403, oxidationStates: "+3", electronConfig: "[Ar] 3d10 4s2 4p1" },
  Ge: { name: "Germanium", atomicNumber: 32, density: 5.32, meltingPoint: 938.3, boilingPoint: 2833, oxidationStates: "+2, +4", electronConfig: "[Ar] 3d10 4s2 4p2" },
  As: { name: "Arsenic", atomicNumber: 33, density: 5.73, meltingPoint: 817, boilingPoint: 614, oxidationStates: "-3, +3, +5", electronConfig: "[Ar] 3d10 4s2 4p3" },
  Se: { name: "Selenium", atomicNumber: 34, density: 4.81, meltingPoint: 221, boilingPoint: 685, oxidationStates: "-2, +4, +6", electronConfig: "[Ar] 3d10 4s2 4p4" },
  Br: { name: "Bromine", atomicNumber: 35, density: 3.12, meltingPoint: -7.2, boilingPoint: 58.8, oxidationStates: "-1, +1, +5", electronConfig: "[Ar] 3d10 4s2 4p5" },
  Kr: { name: "Krypton", atomicNumber: 36, density: 0.003733, meltingPoint: -157.4, boilingPoint: -153.4, oxidationStates: "0", electronConfig: "[Ar] 3d10 4s2 4p6" },

  Rb: { name: "Rubidium", atomicNumber: 37, density: 1.53, meltingPoint: 39.3, boilingPoint: 688, oxidationStates: "+1", electronConfig: "[Kr] 5s1" },
  Sr: { name: "Strontium", atomicNumber: 38, density: 2.64, meltingPoint: 777, boilingPoint: 1382, oxidationStates: "+2", electronConfig: "[Kr] 5s2" },
  Y:  { name: "Yttrium", atomicNumber: 39, density: 4.47, meltingPoint: 1526, boilingPoint: 3338, oxidationStates: "+3", electronConfig: "[Kr] 4d1 5s2" },
  Zr: { name: "Zirconium", atomicNumber: 40, density: 6.52, meltingPoint: 1855, boilingPoint: 4409, oxidationStates: "+4", electronConfig: "[Kr] 4d2 5s2" },
  Nb: { name: "Niobium", atomicNumber: 41, density: 8.57, meltingPoint: 2477, boilingPoint: 4744, oxidationStates: "+5", electronConfig: "[Kr] 4d4 5s1" },
  Mo: { name: "Molybdenum", atomicNumber: 42, density: 10.28, meltingPoint: 2623, boilingPoint: 4639, oxidationStates: "+4, +6", electronConfig: "[Kr] 4d5 5s1" },
  Ag: { name: "Silver", atomicNumber: 47, density: 10.49, meltingPoint: 961.8, boilingPoint: 2162, oxidationStates: "+1", electronConfig: "[Kr] 4d10 5s1" },
  Cd: { name: "Cadmium", atomicNumber: 48, density: 8.65, meltingPoint: 321.1, boilingPoint: 767, oxidationStates: "+2", electronConfig: "[Kr] 4d10 5s2" },
  In: { name: "Indium", atomicNumber: 49, density: 7.31, meltingPoint: 156.6, boilingPoint: 2072, oxidationStates: "+1, +3", electronConfig: "[Kr] 4d10 5s2 5p1" },
  Sn: { name: "Tin", atomicNumber: 50, density: 7.31, meltingPoint: 231.9, boilingPoint: 2602, oxidationStates: "+2, +4", electronConfig: "[Kr] 4d10 5s2 5p2" },

  Hf: { name: "Hafnium", atomicNumber: 72, density: 13.31, meltingPoint: 2233, boilingPoint: 4603, oxidationStates: "+4", electronConfig: "[Xe] 4f14 5d2 6s2" },
  Ta: { name: "Tantalum", atomicNumber: 73, density: 16.69, meltingPoint: 3017, boilingPoint: 5458, oxidationStates: "+5", electronConfig: "[Xe] 4f14 5d3 6s2" },
  W:  { name: "Tungsten", atomicNumber: 74, density: 19.25, meltingPoint: 3422, boilingPoint: 5555, oxidationStates: "+4, +6", electronConfig: "[Xe] 4f14 5d4 6s2" },
  Pt: { name: "Platinum", atomicNumber: 78, density: 21.45, meltingPoint: 1768.3, boilingPoint: 3825, oxidationStates: "+2, +4", electronConfig: "[Xe] 4f14 5d9 6s1" },
  Au: { name: "Gold", atomicNumber: 79, density: 19.32, meltingPoint: 1064.2, boilingPoint: 2970, oxidationStates: "+1, +3", electronConfig: "[Xe] 4f14 5d10 6s1" },
  Hg: { name: "Mercury", atomicNumber: 80, density: 13.53, meltingPoint: -38.8, boilingPoint: 356.7, oxidationStates: "+1, +2", electronConfig: "[Xe] 4f14 5d10 6s2" },
  Tl: { name: "Thallium", atomicNumber: 81, density: 11.85, meltingPoint: 304, boilingPoint: 1473, oxidationStates: "+1, +3", electronConfig: "[Xe] 4f14 5d10 6s2 6p1" },
  Pb: { name: "Lead", atomicNumber: 82, density: 11.34, meltingPoint: 327.5, boilingPoint: 1749, oxidationStates: "+2, +4", electronConfig: "[Xe] 4f14 5d10 6s2 6p2" },
  Bi: { name: "Bismuth", atomicNumber: 83, density: 9.78, meltingPoint: 271.4, boilingPoint: 1564, oxidationStates: "+3, +5", electronConfig: "[Xe] 4f14 5d10 6s2 6p3" },

  La: { name: "Lanthanum", atomicNumber: 57, density: 6.15, meltingPoint: 920, boilingPoint: 3464, oxidationStates: "+3", electronConfig: "[Xe] 5d1 6s2" },
  Ce: { name: "Cerium", atomicNumber: 58, density: 6.77, meltingPoint: 798, boilingPoint: 3443, oxidationStates: "+3, +4", electronConfig: "[Xe] 4f1 5d1 6s2" },
  Th: { name: "Thorium", atomicNumber: 90, density: 11.72, meltingPoint: 1750, boilingPoint: 4788, oxidationStates: "+4", electronConfig: "[Rn] 6d2 7s2" },
  U:  { name: "Uranium", atomicNumber: 92, density: 19.1, meltingPoint: 1132.2, boilingPoint: 4131, oxidationStates: "+3, +4, +5, +6", electronConfig: "[Rn] 5f3 6d1 7s2" }
};

function getElementDetail(symbol) {
  return elementDetails[symbol] || {
    name: symbol,
    atomicNumber: "—",
    density: "—",
    meltingPoint: "—",
    boilingPoint: "—",
    oxidationStates: "—",
    electronConfig: "—"
  };
}