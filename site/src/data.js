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
      "Le programme renaissance est au cœur de 2x2 Voix.<br>Nous y explorons les polyphonies de la renaissance et la musique vocale ancienne à quatre voix, dans des programmes pensés pour les lieux chargés d'histoire&nbsp;: églises, cloîtres, chapelles ou salles voûtées.<br><br>Quatre lignes vocales qui s'entrecroisent, se répondent et construisent un équilibre vivant porté par l'acoustique des pierres et des voix.",
    composers: [ "Josquin des Prez", "Clément Janequin", "Roland de Lassus", "Pierre Certon", "John Bennet"],
    signature: "Mille regretz",
    signatureComposer: "Josquin des Prez",
  },
  {
    id: "classique",
    label: "Classique & contemporain",
    period: "XVIIe — XXe siècle",
    roman: "II",
    teaser: "Sacré & profane",
    description:
      "Notre quatuor vocal interprète un répertoire de musique classique et de chant choral contemporain mêlant émotion, finesse harmonique et richesse sonore.<br>À travers des œuvres sacrées et profanes, nous faisons dialoguer les grandes pages du répertoire classique avec des compositions modernes aux textures vocales enveloppantes.<br><br>Notre programme met notamment à l'honneur des compositeurs contemporains majeurs comme Ola Gjeilo ou Eric Whitacre, reconnus pour leur écriture chorale immersive et cinématographique.<br><br>Entre musique classique, harmonies contemporaines et chant a cappella, ce programme propose une expérience vocale sensible et accessible, idéale pour concerts, églises, festivals, cérémonies et événements culturels.",
    composers: ["Gabriel Fauré", "Ola Gjeilo", "Anton Bruckner", "Eric Whitacre"],
    signature: "Cantique de Jean Racine",
    signatureComposer: "Fauré (arr.)",
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
    note: "Quatre voix en ouverture d'une soirée pop — un avant-goût classique et renaissance avant la fête.",
    price: "Entrée libre",
  },
  {
    id: "chariez-2026-09-20",
    date: "2026-09-20",
    time: "15:00",
    duration: 90,
    day: 20, month: "Septembre", year: 2026,
    title: "Polyphonies renaissance — Visite du village médiéval de Chariez",
    venue: "Village médiéval, Chariez",
    address: "Chariez, 70360",
    note: "Polyphonies de la renaissance déambulatoires à travers les rues anciennes — un dialogue entre la pierre et la voix.",
    price: "Gratuit, dans le cadre des Journées du Patrimoine",
  },
];

export const TRACKS = [
  { title: "Nothern lights",          sub: "Ola Gjeilo",        duration: 254, file: "northern-lights.mp3" },
  { title: "Cantique de Jean Racine", sub: "Gabriel Fauré",     duration: 210, file: "cantique-de-jean-racine.mp3" },
  { title: "Mille regretz",           sub: "Josquin des Prez",  duration: 107, file: "mille-regretz.mp3" },
  { title: "Weep O mine eyes",        sub: "John Bennet",       duration: 188, file: "weep-o-mine-eyes.mp3" },
];

export const GALLERY = [
  { label: "Répétition · mai",   layout: "wide" },
  { label: "Église de Chariez", layout: "tall" },
  { label: "Studio",             layout: "" },
  { label: "Concert d'hiver",    layout: "" },
  { label: "Backstage",          layout: "" },
  { label: "Manuscrits",         layout: "wide" },
];
