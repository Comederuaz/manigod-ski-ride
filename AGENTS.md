# Consignes de projet pour les agents

## Objet et périmètre

Site statique de Manigod Ski Ride, en français à la racine et en anglais dans `en/`. Préserver les textes et les informations commerciales, sauf demande explicite ou correction nécessaire au parcours. Les ajustements de navigation, de présentation et d’accessibilité sont attendus.

## Structure

- Pages HTML autonomes ; styles communs dans `css/site.css` ; interactions communes de l’en-tête dans `js/site-header.js`.
- Lire `docs/design-system.md` avant toute évolution visuelle et réutiliser ses couleurs, sa typographie et ses composants. Maintenir ce guide et les styles communs dans le même changement lorsqu’une règle évolue ; documenter les exceptions.
- Chaque modification d’un parcours public doit être vérifiée dans les deux langues. Garder des chemins relatifs qui fonctionnent avec `python -m http.server`.
- Ne pas introduire de framework ou de compilation sans besoin démontré. Éviter d’ajouter des styles inline pour les composants réutilisés.

## Rentool

- Lire `rentool://site/config` et les guides pertinents avec `mcp__rentool__read_resource`, puis obtenir les snippets autoritaires avec `mcp__rentool__get_widget_snippets` avant de modifier une intégration.
- L’accueil contient la recherche de location et dirige vers `location.html`, sans ancre pour arriver en haut de la page ; le catalogue complet est uniquement sur `location.html`. La page Location place la recherche dans le héros et le catalogue avec ses filtres juste en dessous ; elle utilise `search-params` pour lire le contexte de recherche transmis dans l’URL. Les liens qui invitent explicitement à rejoindre la réservation peuvent conserver `#reserver`.
- Utiliser les composants Rentool pour la recherche, le catalogue, le panier et le compte. Ne pas recréer la réservation, le paiement, l’authentification ou les états de chargement des widgets.
- Conserver les attributs et jetons publics des snippets du même site ; ne jamais placer de credential de déploiement ou de données privées dans les pages. Charger le bootstrap Rentool une seule fois par page et placer les métadonnées Rentool dans le `<head>`.
- Ne pas imposer de dates de location dans le code. Vérifier les capacités du magasin et la langue anglaise avec la configuration Rentool avant de publier.
- La page Contact utilise le composant indépendant `rentool-contact-widget` et la clé réelle du formulaire standard. Lire `rentool://docs/contact.md` ; ne pas recréer le formulaire ni envoyer de message réel pendant les vérifications sans instruction explicite.
- Découvrir les formulaires activés dans `forms` de `rentool://site/config`, puis lire leur configuration avec `read_site_api` (`forms/{formKey}`). Pour les tests navigateur avant publication, utiliser une origine déclarée dans `developmentOrigins` ; l’origine locale actuelle est `http://127.0.0.1:5500`. Ne jamais copier le credential MCP dans le code du site.

## Vérification et publication

- Tester l’accueil, la page Location, le menu Services, le panier et le compte sur ordinateur et mobile ; vérifier les liens, ancres et deux langues.
- Le dépôt est actuellement une version de test avec `noindex` et `robots.txt` bloquant l’indexation. Revoir ces réglages seulement lors de la préparation de la mise en ligne.
- Aucun import ou publication Rentool sans instruction explicite de l’utilisateur.
