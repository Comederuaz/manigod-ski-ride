# Manigod Ski Ride — site web

Site vitrine statique du magasin Manigod Ski Ride au Col de la Croix-Fry. Il présente la location de matériel, les services du magasin et les informations pratiques, puis conduit à la réservation Rentool.

## Organisation

- 20 pages françaises à la racine ; leurs 20 versions anglaises dans `en/`.
- `css/site.css` : styles communs et adaptations par taille d’écran.
- [`docs/design-system.md`](docs/design-system.md) : référence des couleurs, titres, composants, en-têtes, Heroes et comportements sur ordinateur et mobile.
- `js/site-header.js` : menu Services, menu mobile et contexte partenaire public.
- `images/` : photos, logos et illustrations.
- `sitemap.xml` et `robots.txt` : référencement, actuellement configuré pour une version de test non indexée.

Pour consulter le site localement, lancer `python -m http.server 8765` dans ce dossier, puis ouvrir `http://127.0.0.1:8765/`.

## Parcours de location

L’accueil affiche seulement le widget de recherche Rentool. Une recherche ouvre `location.html` avec le magasin et les dates dans l’URL, sans ancre pour arriver en haut de la page ; cette page affiche la recherche dans son héros et le catalogue avec ses filtres immédiatement en dessous, sur toute la largeur disponible. Les liens « Réserver » qui ciblent directement la recherche peuvent conserver l’ancre `#reserver`. Le panier et le compte sont dans l’en-tête de chaque page. La navigation principale contient « Location de ski », « Services » (Consigne, Atelier, Bootfitting) et « Le magasin ». L’en-tête revient en haut de l’écran quand le visiteur remonte la page.

La configuration et les snippets du MCP Rentool sont la référence pour l’intégration. Le site dispose aussi de pages anglaises ; la configuration d’hébergement Rentool lue le 5 novembre 2026 ne déclarait que `fr`, point à vérifier avant publication. Aucune version du site n’était alors importée ou publiée sur Rentool.

## Contact

Les pages `contact.html` et `en/contact.html` regroupent le formulaire, les coordonnées, les horaires et les informations d’accès. Elles sont liées depuis tous les pieds de page et réutilisent les visuels existants.

Le composant officiel `rentool-contact-widget` utilise le site public et la clé `contact` fournie par le propriétaire. Sa configuration doit être celle d’un formulaire standard (`templateKind: "contact"`), activé dans Rentool. Le service public exige aussi un site publié. Lors de l’intégration du 6 novembre 2026, l’API de configuration répondait 404 et le MCP indiquait qu’aucune version n’était publiée ; vérifier sa disponibilité et les libellés FR/EN lors de la mise en service. Aucun envoi réel n’est effectué pour les tests.

## Méthode de travail

Conserver le contenu éditorial autant que possible. Pour chaque évolution, vérifier le parcours en français et en anglais, sur ordinateur et sur mobile, puis contrôler les liens et les composants Rentool. Les consignes détaillées pour les agents figurent dans `AGENTS.md`.

Le design system explique les choix et les usages ; `css/site.css` applique les valeurs et `js/site-header.js` les comportements. Mettre à jour le guide dans la même PR qu’une évolution commune pour éviter les règles contradictoires entre pages ou entre agents.
