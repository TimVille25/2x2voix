# Ajouter un concert

Tu dois ajouter un nouveau concert à `src/data.js` dans le tableau `EVENTS`.

## Étapes

**1. Demande les informations manquantes**

Si les informations ne sont pas fournies dans `$ARGUMENTS`, demande-les une par une ou toutes ensemble :

- **Titre** — titre du concert ou de l'événement
- **Date** — format `YYYY-MM-DD`
- **Heure(s) de début** — format `HH:MM` (24h). Si le concert a lieu plusieurs fois dans la journée, demande la liste des horaires (ex. `11:00, 17:00`)
- **Durée** — en minutes, par créneau (par défaut : 60)
- **Lieu** — nom du lieu / festival
- **Adresse** — ville et code postal
- **Note** — courte description du programme ou du contexte
- **Prix** — ex. `Entrée libre`, `Gratuit`, `10 €`

**2. Propose des optimisations SEO pour le titre et la note**

Avant de générer l'objet, propose 2 alternatives SEO pour le **titre** et 2 pour la **note**, puis demande à l'utilisateur de choisir ou de garder sa version originale.

Règles SEO à appliquer :
- **Titre** : commencer par le type d'événement (`Concert`, `Récital`, `Spectacle vocal`…), inclure le lieu ou la ville, viser 50–60 caractères. Ex. : `Concert de musique ancienne – Cathédrale de Besançon`
- **Note** : 1–2 phrases, 120–160 caractères idéalement. Inclure des mots-clés naturels : `quatuor vocal`, `polyphonies`, `a cappella`, `musique de la Renaissance`, `concert choral`… Décrire le programme et l'atmosphère.

Format de présentation :

```
Titre original : "..."

Propositions SEO :
  A. "..." (XX caractères)
  B. "..." (XX caractères)

→ Choix (A / B / original) :

Note originale : "..."

Propositions SEO :
  A. "..." (XX caractères)
  B. "..." (XX caractères)

→ Choix (A / B / original) :
```

Utilise les versions choisies pour la suite.

---

**3. Génère l'objet événement**

À partir de la date `YYYY-MM-DD`, dérive :
- `id` : `<slug-du-lieu>-<YYYY-MM-DD>` — le slug est le nom du lieu en minuscules, sans accents, espaces remplacés par des tirets, caractères spéciaux supprimés
- `day` : le jour en entier (ex. `20`)
- `month` : le mois en français avec une majuscule (`Janvier`, `Février`, `Mars`, `Avril`, `Mai`, `Juin`, `Juillet`, `Août`, `Septembre`, `Octobre`, `Novembre`, `Décembre`)
- `year` : l'année en entier (ex. `2026`)

Format de l'objet :

```js
{
  id: "slug-lieu-YYYY-MM-DD",
  date: "YYYY-MM-DD",
  times: ["HH:MM"],
  duration: 60,
  day: D, month: "Mois", year: YYYY,
  title: "...",
  venue: "...",
  address: "...",
  note: "...",
  price: "...",
},
```

`times` contient un horaire par représentation dans la journée, ex. `times: ["11:00", "17:00"]` pour un concert donné deux fois.

**4. Insère dans `src/data.js`**

- Lis `src/data.js` pour voir les événements existants
- Insère le nouvel événement dans le tableau `EVENTS` **dans l'ordre chronologique** (par `date`)
- Conserve la mise en forme existante (indentation, virgules)

**5. Confirme**

Affiche un résumé de ce qui a été ajouté : titre, date, lieu.
