# Déploiement Vercel - Guide

## Problèmes courants et solutions

### 1. Structure du projet
Le projet React se trouve dans le dossier `client-app/client/`. Configurez Vercel comme suit :

**Dans le dashboard Vercel :**
- Allez dans **Settings** → **General**
- Définissez **Root Directory** sur : `client-app/client`
- Définissez **Build Command** sur : `npm run build`
- Définissez **Output Directory** sur : `build`

### 2. Variables d'environnement
Dans Vercel, ajoutez la variable d'environnement :
- Nom : `REACT_APP_API_URL`
- Valeur : URL de votre backend de production (ex: `https://votre-backend.vercel.app/api`)

### 3. Fichiers de configuration
- `vercel.json` : Gère le routing SPA
- `.gitignore` : Ignore node_modules et build

### Étapes de déploiement
1. Poussez votre code sur GitHub/GitLab
2. Importez le dépôt dans Vercel
3. Configurez le Root Directory et les variables d'environnement
4. Déployez !
