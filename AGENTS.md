# Consignes de projet pour les agents

## Objet et périmètre

Site statique de Manigod Ski Ride, en français à la racine et en anglais dans `en/`. Préserver les textes et les informations commerciales, sauf demande explicite ou correction nécessaire au parcours. Les ajustements de navigation, de présentation et d’accessibilité sont attendus.

## Structure

- Pages HTML autonomes ; styles communs dans `css/site.css` ; interactions communes de l’en-tête dans `js/site-header.js`.
- Utiliser les couleurs, arrondis et règles d’interface de `docs/design-system.md` pour les nouveaux composants.
- Chaque modification d’un parcours public doit être vérifiée dans les deux langues. Garder des chemins relatifs qui fonctionnent avec `python -m http.server`.
- Ne pas introduire de framework ou de compilation sans besoin démontré. Éviter d’ajouter des styles inline pour les composants réutilisés.

## Rentool

- Lire `rentool://site/config` et les guides pertinents avec `mcp__rentool__read_resource`, puis obtenir les snippets autoritaires avec `mcp__rentool__get_widget_snippets` avant de modifier une intégration.
- L’accueil contient la recherche de location et dirige vers `location.html#reserver` ; le catalogue complet est uniquement sur `location.html`. La page Location place la recherche dans le héros et le catalogue avec ses filtres juste en dessous ; elle utilise `search-params` pour lire le contexte de recherche transmis dans l’URL.
- Utiliser les composants Rentool pour la recherche, le catalogue, le panier et le compte. Ne pas recréer la réservation, le paiement, l’authentification ou les états de chargement des widgets.
- Conserver les attributs et jetons publics des snippets du même site ; ne jamais placer de credential de déploiement ou de données privées dans les pages. Charger le bootstrap Rentool une seule fois par page et placer les métadonnées Rentool dans le `<head>`.
- Ne pas imposer de dates de location dans le code. Vérifier les capacités du magasin et la langue anglaise avec la configuration Rentool avant de publier.

## Vérification et publication

- Tester l’accueil, la page Location, le menu Services, le panier et le compte sur ordinateur et mobile ; vérifier les liens, ancres et deux langues.
- Le dépôt est actuellement une version de test avec `noindex` et `robots.txt` bloquant l’indexation. Revoir ces réglages seulement lors de la préparation de la mise en ligne.
- Aucun import ou publication Rentool sans instruction explicite de l’utilisateur.
