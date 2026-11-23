# Squad Rush

Un petit jeu de type « runner de foule » jouable dans le navigateur, en un seul fichier HTML/JavaScript (canvas 2D, aucune dépendance).

Guide ton escouade à travers le désert, passe dans les bonnes portes pour grossir tes rangs, abats les ennemis et détruis le colosse au bout de chaque niveau.

## Jouer

Ouvre `index.html` dans un navigateur, c'est tout.

## Règles

- **Portes bleues** (`+8`, `×2`, `TIR +20%`) : plus de soldats ou une meilleure cadence de tir.
- **Portes rouges** (`−6`, `÷2`) : tu perds des soldats.
- Tirer sur une porte `+`/`−` augmente sa valeur : une porte rouge peut devenir bleue.
- **Ennemis** : le nombre affiché correspond à leurs PV. Au contact, ils tuent autant de soldats.
- **Boss** : le colosse avance vers toi en fin de niveau. Abats-le avant qu'il n'écrase ton escouade.
- Entre les niveaux, dépense tes pièces : recrues de départ, cadence de tir, dégâts.

## Contrôles

| Action | Contrôle |
| --- | --- |
| Déplacer l'escouade | Glisser au doigt / à la souris, ou `←` `→` / `A` `D` |

La progression (niveau, pièces, améliorations) est sauvegardée dans le `localStorage` du navigateur.
