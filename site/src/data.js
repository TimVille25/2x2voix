export const MEMBERS = [
  { initials: "AL", first: "Anaïs",    last: "Legrand",  voice: "Soprano", range: "C4 — A5", duo: "F" },
  { initials: "JD", first: "Julie",    last: "Delvarre", voice: "Alto",    range: "F3 — E5", duo: "F" },
  { initials: "TV", first: "Timothée", last: "Ville",    voice: "Ténor",   range: "C3 — A4", duo: "M" },
  { initials: "PP", first: "Pierre",   last: "Pain",     voice: "Basse",   range: "E2 — D4", duo: "M" },
];

export const REPERTOIRE = [
  {
    id: "renaissance",
    label: "Renaissance",
    period: "XVe — XVIe siècle",
    roman: "I",
    teaser: "Polyphonies a cappella",
    description:
      "Quatre voix qui s'entrecroisent comme les pierres d'une voûte. Le répertoire de la Renaissance est notre socle — un terrain de jeu pour l'oreille, où chaque ligne mélodique respire pour les autres. Idéal pour les lieux qui ont une histoire&nbsp;: églises, cloîtres, salles voûtées.",
    composers: ["Guillaume Dufay", "Josquin des Prez", "Clément Janequin", "Roland de Lassus"],
    signature: "Mille regretz",
    signatureComposer: "Josquin des Prez",
  },
  {
    id: "classique",
    label: "Classique",
    period: "XVIIe — XIXe siècle",
    roman: "II",
    teaser: "Sacré & profane",
    description:
      "Du motet baroque à la mélodie romantique arrangée pour quatuor. Nous y trouvons la verticalité du chœur — des accords qui se posent comme des bougies allumées en file. Le sacré et le profane s'y répondent&nbsp;: l'Ave verum côtoie la chanson d'amour, le motet répond au lied.",
    composers: ["W. A. Mozart", "Gabriel Fauré", "Claude Debussy", "Camille Saint-Saëns"],
    signature: "Cantique de Jean Racine",
    signatureComposer: "Fauré (arr.)",
  },
  {
    id: "pop",
    label: "Pop arrangée",
    period: "XXe — XXIe siècle",
    roman: "III",
    teaser: "Chansons à quatre voix",
    description:
      "Une chanson connue, soudain remise en quatre lignes&nbsp;: c'est la surprise que nous aimons offrir en fin de programme. Brel, Bruni, Coldplay, Sting — des textes contemporains arrangés pour soprano, alto, ténor et basse. La pop devient choral, sans rien perdre de son émotion.",
    composers: ["Jacques Brel", "Carla Bruni", "Coldplay", "Sting"],
    signature: "La chanson des vieux amants",
    signatureComposer: "Brel (arr.)",
  },
];

export const EVENTS = [
  {
    id: "rennes-2026-07-04",
    date: "2026-07-04",
    time: "20:30",
    duration: 60, // minutes
    day: 4, month: "Juillet", year: 2026,
    title: "Quatuor vocal en introduction à « Over the Pop »",
    venue: "Salle des fêtes, Rennes-sur-Loue",
    address: "Rennes-sur-Loue, 25440",
    note: "Quatre voix en ouverture d'une soirée pop — un avant-goût classique et Renaissance avant la fête.",
    price: "Entrée libre",
  },
  {
    id: "charriez-2026-09-20",
    date: "2026-09-20",
    time: "15:00",
    duration: 90,
    day: 20, month: "Septembre", year: 2026,
    title: "Polyphonies Renaissance — Visite du village médiéval de Charriez",
    venue: "Village médiéval, Charriez",
    address: "Charriez, 70360",
    note: "Polyphonies de la Renaissance déambulatoires à travers les rues anciennes — un dialogue entre la pierre et la voix.",
    price: "Gratuit, dans le cadre des Journées du Patrimoine",
  },
];

export const TRACKS = [
  { title: "Nothern lights",        sub: "Ola Gjeilo",        duration: 254, file: "northern-lights.mp3" },
  { title: "Cantique de Jean Racine", sub: "Fauré · extrait",  duration: 215, file: null },
  { title: "Quelqu'un m'a dit",       sub: "Bruni (arr.) · extrait", duration: 168, file: null },
];

export const GALLERY = [
  { label: "Répétition · mai",   layout: "wide" },
  { label: "Église de Charriez", layout: "tall" },
  { label: "Studio",             layout: "" },
  { label: "Concert d'hiver",    layout: "" },
  { label: "Backstage",          layout: "" },
  { label: "Manuscrits",         layout: "wide" },
];
