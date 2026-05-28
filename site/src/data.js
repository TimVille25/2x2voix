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
      "Le programme renaissance est au cœur de 2x2 Voix.<br>Nous y explorons les polyphonies de la Renaissance et la musique vocale ancienne à quatre voix, à travers un répertoire adapté aussi bien aux concerts qu'aux fêtes médiévales, événements historiques et moments conviviaux.<br><br>Nous interprétons des œuvres de compositeurs de la Renaissance comme Josquin des Prez, Clément Janequin, Roland de Lassus, en mettant en valeur le chant polyphonique et le répertoire vocal ancien à quatre voix.",
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
      "Ce programme met en avant différentes écritures pour les voix, depuis les œuvres classiques de Anton Bruckner ou Gabriel Fauré jusqu'aux compositions contemporaines de Ola Gjeilo ou Eric Whitacre. Il permet de découvrir différentes couleurs du chant choral, entre répertoire classique et musique contemporaine pour quatuor vocal.",
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
  { label: "Église de Thise",           layout: "wide", file: "Visuel-eglise-sans-texte.jpg" },
  { label: "Répétition dans le jardin", layout: "wide", file: "Jardin.jpg" },
];
