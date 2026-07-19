# Ajouter une image à la galerie

Tu dois ajouter une nouvelle photo à la galerie du site (`src/data.js`, tableau `GALLERY`). Les vignettes et le câblage React sont automatiques : seule l'entrée `GALLERY` est à écrire à la main.

## Étapes

**1. Demande les informations manquantes**

Si les informations ne sont pas fournies dans `$ARGUMENTS`, demande-les :

- **Chemin de l'image source** — fichier `.jpg`/`.jpeg`/`.png` à ajouter (peut être hors du projet)
- **Légende** — texte affiché sur la photo dans la galerie (ex. `Concert à la cathédrale`)
- **Layout** — l'un des trois formats de la grille :
  - `wide` — occupe 2 colonnes (photo large)
  - `tall` — occupe 2 lignes (photo en portrait)
  - *(aucun)* — case standard 1×1

Si le layout n'est pas précisé, propose-le en fonction des dimensions de l'image (paysage large → `wide`, portrait → `tall`, sinon aucun).

**2. Dérive le nom de fichier**

À partir de la légende ou du nom de fichier source, dérive un slug kebab-case sans accents ni espaces (ex. `Concert à la cathédrale` → `concert-cathedrale`). Vérifie dans `src/assets/gallery/` qu'il n'entre pas en collision avec un fichier existant ; sinon, incrémente (`-2`, `-3`…).

**3. Copie l'image source**

Copie le fichier source vers `src/assets/gallery/<slug>.jpg` (ou `.png` si l'original est un PNG — aucune conversion manuelle nécessaire).

**4. Génère la vignette**

Exécute :

```bash
npm run optimize:images
```

Le script scanne `src/assets/gallery/` et génère automatiquement `src/assets/gallery/<slug>-thumb.webp` pour toute image qui n'en a pas. Vérifie la ligne correspondante dans la sortie (dimensions ~800px de large).

**5. Ajoute l'entrée dans `src/data.js`**

Ajoute un objet à la fin du tableau `GALLERY` :

```js
{ label: "<légende>", layout: "<wide|tall>", file: "<slug>.jpg" },
```

Omets `layout` si aucun format spécial n'est nécessaire. Conserve l'alignement des colonnes existant si les autres lignes en ont un.

`Gallery/index.jsx` découvre le fichier et sa vignette automatiquement via `import.meta.glob` sur `src/assets/gallery/` — aucune modification de code n'est nécessaire.

**6. Vérifie**

Lance les tests de la galerie pour t'assurer que rien n'est cassé :

```bash
npx vitest run src/components/organisms/Gallery
```

**7. Confirme**

Affiche un résumé : légende, layout choisi, chemin de la vignette générée, et l'entrée ajoutée à `GALLERY`.
