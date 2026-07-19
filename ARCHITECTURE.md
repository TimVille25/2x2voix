# Architecture

## Stack technique

- [React 18](https://react.dev/) + [Vite](https://vitejs.dev/)
- CSS vanilla (pas de framework CSS), design atomique (`atoms` / `molecules` / `organisms`)
- [Vitest](https://vitest.dev/) + [React Testing Library](https://testing-library.com/react) pour les tests
- PWA via `vite-plugin-pwa`

Voir [CLAUDE.md](./CLAUDE.md) pour les conventions de code du projet.

## Structure du projet

```
src/
├── components/
│   ├── atoms/       # éléments primitifs réutilisables (Icon, Portrait...)
│   ├── molecules/   # combinaisons d'atomes (EventCard, GalleryItem...)
│   └── organisms/   # sections complètes de la page (Nav, Hero, Programmes, Agenda...)
├── assets/          # images
├── utils/           # fonctions utilitaires
├── data.js          # données statiques du site (membres, répertoire, événements...)
├── styles.css        # styles globaux
├── tokens.css         # variables CSS (couleurs, typographie...)
└── App.jsx           # composition des organismes
```

Chaque composant est isolé dans son propre dossier (`index.jsx`, `style.css`, `index.test.jsx`), suivant le design atomique. Les imports se font par le dossier du composant, pas par le fichier.

## Composition de la page

`App.jsx` compose uniquement les organismes, sans logique métier :

```
Nav
Hero
About
Agenda      ┐
Programmes  │
Listen      ├─ chargés en lazy (React.lazy + Suspense)
Gallery     │
Contact     ┘
Footer      (lazy)
```

`Nav`, `Hero` et `About` sont chargés en amont (au-dessus de la ligne de flottaison) ; les organismes suivants sont chargés paresseusement pour réduire le bundle initial.

## Données

Les données statiques du site (membres du quatuor, répertoire, événements de l'agenda...) vivent dans [src/data.js](./src/data.js), séparées des composants qui les consomment.
