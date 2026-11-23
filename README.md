# Satisfy Arcade

Une appli mobile (PWA) qui regroupe 10 mini-jeux « satisfaisants », 2 par catégorie. Tout est en HTML/JavaScript, sans dépendance. Elle s'installe sur l'écran d'accueil et marche hors ligne.

| Catégorie | Jeux |
| --- | --- |
| Foule et chiffres | Squad Rush, Trou glouton |
| Satisfaisant | Tri des couleurs, Karcher |
| Puzzle | Fusion 2048, Bloc puzzle |
| Réflexes | Lancer de couteaux, Tour infinie |
| Idle et gestion | Empire idle, Dernière tour |

Les pièces (●) gagnées dans chaque jeu sont partagées et affichées dans le menu.

## Lancer en local

```
python -m http.server 8765
```

Puis ouvre http://localhost:8765 dans le navigateur.

## Installer sur le téléphone

L'appli doit être servie en HTTPS (par exemple avec GitHub Pages). Ouvre l'adresse dans Chrome sur Android puis « Installer l'application » (ou Safari sur iPhone, Partager puis « Sur l'écran d'accueil »).

## Structure

- `index.html` : menu d'accueil
- `games/` : un fichier par jeu
- `shared/` : style et fonctions communes (pièces, sauvegarde, barre du haut)
- `manifest.webmanifest`, `sw.js`, `icons/` : ce qui rend l'appli installable et disponible hors ligne
