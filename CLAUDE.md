# 2x2 Voix — Guidelines du projet

## Stack

- React 18 + Vite
- CSS vanilla (pas de framework CSS)
- Tests : Vitest + React Testing Library

---

## Structure des composants

Chaque composant suit le design **atomique** et est isolé dans son propre dossier :

```
src/components/
└── ComponentName/
    ├── index.jsx        # Code du composant
    ├── style.css        # Styles scoped au composant
    └── index.test.jsx   # Tests unitaires
```

Les atomes (éléments primitifs réutilisables) vont dans `src/components/atoms/`.
Les molécules (combinaisons d'atomes) vont dans `src/components/molecules/`.
Les organismes (sections complètes) vont dans `src/components/organisms/`.

Les imports se font par le dossier, pas par le fichier :

```js
// Correct
import Nav from './components/Nav';

// À éviter
import Nav from './components/Nav/index.jsx';
```

---

## Clean code

### Nommage

- Composants React : `PascalCase` (`HeroSection`, `NavLink`)
- Fonctions et variables : `camelCase` (`useScrollSpy`, `menuOpen`)
- Constantes de configuration : `SCREAMING_SNAKE_CASE` (`NAV_LINKS`, `SCROLL_OFFSET`)
- Fichiers de composants : `PascalCase/` pour le dossier, `index.jsx` à l'intérieur
- Hooks personnalisés : préfixe `use` obligatoire (`useScrollSpy`, `useMediaQuery`)

### Composants

- Un composant = une responsabilité unique
- Props destructurées dans la signature : `const Button = ({ label, onClick, disabled = false }) => {}`
- PropTypes ou JSDoc pour documenter les props non-évidentes
- Pas de logique métier dans le JSX — extraire dans des variables ou des hooks
- Extraire les constantes de données hors du composant (ex. `NAV_LINKS`)

### Fonctions

- Fonctions courtes : une fonction fait une chose
- Noms explicites qui décrivent l'intention, pas l'implémentation
- Pas de nombres magiques : nommer les constantes (`const SCROLL_OFFSET = 120`)

### Commentaires

- Ne pas commenter ce que le code dit déjà
- Commenter uniquement le **pourquoi** quand ce n'est pas évident (contrainte cachée, contournement)
- Supprimer le code commenté — git log retrouve le passé

### CSS

- Un fichier `style.css` par composant, importé dans `index.jsx`
- Classes BEM : `.nav__link`, `.nav__link--active`
- Variables CSS dans `tokens.css`, jamais de valeurs brutes répétées

---

## Tests

Chaque composant **doit** avoir un fichier `index.test.jsx`. Les tests vivent dans le même dossier que le composant.

### Outillage

```bash
# Lancer les tests
npm test

# Mode watch
npm run test:watch
```

### Ce qu'on teste

- Le rendu par défaut (smoke test)
- Les variantes de props importantes
- Les interactions utilisateur (clics, saisie clavier)
- Les états conditionnels (menu ouvert/fermé, chargement, erreur)
- L'accessibilité de base (rôles ARIA, labels)

### Ce qu'on ne teste pas

- Les détails d'implémentation internes (state interne non observable)
- Les styles CSS
- Les snapshots exhaustifs — trop fragiles

### Exemple de structure

```jsx
// Nav/index.test.jsx
import { render, screen, fireEvent } from '@testing-library/react';
import Nav from '.';

describe('Nav', () => {
  it('affiche tous les liens de navigation', () => {
    render(<Nav />);
    expect(screen.getByText('Le quatuor')).toBeInTheDocument();
  });

  it('ouvre le menu mobile au clic sur le hamburger', () => {
    render(<Nav />);
    fireEvent.click(screen.getByRole('button', { name: /ouvrir le menu/i }));
    expect(screen.getByRole('button', { name: /fermer le menu/i })).toBeInTheDocument();
  });

  it('ferme le menu mobile avec la touche Escape', () => {
    render(<Nav />);
    fireEvent.click(screen.getByRole('button', { name: /ouvrir le menu/i }));
    fireEvent.keyDown(window, { key: 'Escape' });
    expect(screen.getByRole('button', { name: /ouvrir le menu/i })).toBeInTheDocument();
  });
});
```

---

## Workflow

- Pas de logique dans `App.jsx` — seulement la composition des organismes
- `data.js` contient les données statiques du site, pas les composants
- Chaque nouvelle feature doit avoir ses tests avant d'être considérée comme terminée
