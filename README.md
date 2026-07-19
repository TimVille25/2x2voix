# 2x2 Voix

Site vitrine du quatuor vocal **2x2 Voix**, basé à Besançon. Le quatuor interprète des polyphonies a cappella allant de la Renaissance (Josquin des Prez, Roland de Lassus...) au répertoire classique et contemporain (Fauré, Whitacre, Gjeilo...).

Le site présente le quatuor, ses deux programmes de répertoire, l'agenda des concerts, une galerie photo, des extraits audio et un formulaire de contact.

Pour l'architecture du code (stack, structure des dossiers, composition des pages), voir [ARCHITECTURE.md](./ARCHITECTURE.md). Pour les conventions de code, voir [CLAUDE.md](./CLAUDE.md).

## Prérequis

- [Node.js](https://nodejs.org/) 18+
- npm

## Installation

```bash
npm install
```

## Lancer le projet en local

```bash
npm run dev
```

Le site est alors accessible sur [http://localhost:5173](http://localhost:5173).

## Autres commandes

```bash
npm run build           # build de production dans dist/
npm run preview         # prévisualiser le build de production
npm test                # lancer les tests une fois
npm run test:watch      # lancer les tests en mode watch
npm run optimize:images # optimiser les images de src/assets
```
