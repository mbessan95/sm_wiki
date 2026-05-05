# sm_wiki — documentation (Starlight)

Site statique généré avec [Astro](https://astro.build) et [Starlight](https://starlight.astro.build). Le contenu vit dans `src/content/docs/` (Markdown / MDX), versionné sur GitHub.

## Prérequis

- **Node.js** ≥ 18.17 (testé avec Node 20).  
  Les versions récentes d’Astro (v6+) exigent Node 22 ; ce dépôt utilise **Astro 4 + Starlight 0.28** pour rester compatible avec Node 20 en local.

## Commandes

| Commande        | Action                          |
| --------------- | ------------------------------- |
| `npm install`   | Installer les dépendances       |
| `npm run dev`   | Serveur de dev (port 4321)      |
| `npm run build` | Build production dans `dist/`   |
| `npm run preview` | Prévisualiser le build local |

## Publication GitHub Pages

- **URL prévue :** [https://mbessan95.github.io/sm_wiki/](https://mbessan95.github.io/sm_wiki/)  
  Elle correspond à `site` + `base` dans `astro.config.mjs`. Si vous renommez le dépôt GitHub, mettez à jour `site`, `base` et `editLink.baseUrl`.

### Activer Pages

Configurez la publication dans **les réglages du dépôt** (`github.com/mbessan95/sm_wiki` → **Settings**), pas dans les réglages du compte personnel. Dans la barre latérale : **Code and automation → Pages**.

1. Section **Build and deployment** : source **GitHub Actions** (pas « Deploy from a branch » si vous utilisez le workflow fourni).
2. Pousser sur `main` : le workflow `.github/workflows/deploy.yml` build et déploie le dossier `dist/`.

### Prévisualisation locale

- **`npm run dev`** : le `base` est désactivé en dev → ouvrir **http://localhost:4321/** (pas `…/sm_wiki`, sinon 404).
- **`npm run build`** puis **`npm run preview`** : le `base` vaut `/sm_wiki` → **http://localhost:4321/sm_wiki/** (équivalent à la prod).

### 404 sur `mbessan95.github.io/sm_wiki/`

- Vérifiez que **`.github/workflows/deploy.yml` est bien poussé** sur `main`.
- L’artefact GitHub Pages doit être le dossier **`dist`** complet (c’est là qu’Astro écrit `index.html` ; `base` ne duplique pas les fichiers dans `dist/sm_wiki/`).
- Après un push, onglet **Actions** : le workflow doit être vert, puis recharger l’URL du site.

## Processus Scrum PU Platform

Le contenu de `process-scrum-generique-standalone.html` est **intégré en Markdown** sous `src/content/docs/processus-scrum/` (recherche Pagefind, sidebar, thème Starlight). Les captures sont dans `public/processus-scrum/`.

Pour **régénérer** les fichiers `.md` à partir du HTML mis à jour :

```bash
npm run extract:processus
```

Le script utilise `cheerio` et `turndown` (dépendances de dev). Relisez et ajustez le Markdown à la main si besoin.

Le fichier HTML d’origine peut rester comme archive ou être retiré une fois le rendu validé.

## Structure utile

- `astro.config.mjs` — titre du site, sidebar, lien « Modifier cette page », `site` / `base`.
- `src/content/config.ts` — schéma de la collection `docs` Starlight.
- `src/content/docs/` — pages de la documentation.
