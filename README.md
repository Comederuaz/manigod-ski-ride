# Manigod Ski Ride — site web

Site vitrine statique du magasin Manigod Ski Ride au Col de la Croix-Fry. Il présente la location de matériel, les services du magasin et les informations pratiques, puis conduit à la réservation Rentool.

## Organisation

- 20 pages françaises à la racine ; leurs 20 versions anglaises dans `en/`.
- `css/site.css` : styles communs et adaptations par taille d’écran.
- [`docs/design-system.md`](docs/design-system.md) : référence des couleurs, titres, composants, en-têtes, Heroes et comportements sur ordinateur et mobile.
- `js/site-header.js` : menu Services, menu mobile et conservation du contexte de recherche dans les liens internes FR/EN.
- `images/` : photos, logos et illustrations.
- `sitemap.xml` et `robots.txt` : référencement, actuellement configuré pour une version de test non indexée.

Pour consulter le site localement, lancer `python -m http.server 5500 --bind 127.0.0.1` dans ce dossier, puis ouvrir `http://127.0.0.1:5500/`. Cette origine exacte est déclarée pour le développement Rentool ; un autre hôte ou port doit aussi être déclaré pour accéder au formulaire avant publication.

## Parcours de location

L’accueil affiche seulement le widget de recherche Rentool. Une recherche ouvre `location.html` avec le magasin et les dates dans l’URL, sans ancre pour arriver en haut de la page ; cette page affiche la recherche dans son héros et le catalogue avec ses filtres immédiatement en dessous, sur toute la largeur disponible. Les liens « Réserver » qui ciblent directement la recherche peuvent conserver l’ancre `#reserver`. Le panier et le compte sont dans l’en-tête de chaque page. La navigation principale contient « Location de ski », « Services » (Consigne, Atelier, Bootfitting) et « Le magasin ». L’en-tête revient en haut de l’écran quand le visiteur remonte la page.

La configuration et les snippets du MCP Rentool sont la référence pour l’intégration. La configuration lue le 8 novembre 2026 déclare uniquement `fr` pour les contenus CMS ; les 20 pages anglaises statiques sont incluses dans l’export et vérifiées dans l’aperçu. Une première version a été importée puis activée sur Rentool le 8 novembre 2026, en révision 1. L’adresse publique et la disponibilité de l’API Contact restent à vérifier : voir le [compte rendu de déploiement](docs/deploiement-rentool.md).

## Contact

Les pages `contact.html` et `en/contact.html` regroupent le formulaire, les coordonnées, les horaires et les informations d’accès. Elles sont liées depuis tous les pieds de page et réutilisent les visuels existants.

Le composant officiel `rentool-contact-widget` utilise la clé `contact`. Elle est désormais découvrable dans `forms` de `rentool://site/config`, avec `templateKind: "contact"` et son `configPath`. L’outil MCP `read_site_api`, chemin `forms/contact`, permet de lire la configuration avant publication, sans credential dans le site ni en-tête Origin fourni par l’agent.

Le navigateur peut lui aussi charger le formulaire avant publication depuis une origine de développement explicitement déclarée. La configuration lue le 7 novembre 2026 autorise `http://127.0.0.1:5500` et `https://comederuaz.github.io`. Respecter exactement l’origine déclarée, y compris le protocole, l’hôte et le port. Les soumissions depuis ces origines sont réelles.

Vérification du 7 novembre 2026 : formulaire standard activé, cinq champs attendus, libellés français et anglais, lecture MCP réussie et configuration HTTP 200 avec CORS sur les deux origines. Le formulaire réel s’affiche sur les pages FR/EN à 320, 390 et 1440 px ; les champs obligatoires et le téléphone facultatif ont été vérifiés sans simulation de configuration. Aucun message n’a été envoyé : la réception et la livraison d’e-mail ne sont pas validées par ces contrôles.

## Export pour Rentool

L’import MCP accepte au plus 8 Mio de fichiers décodés. Le transfert JSON/base64 doit également rester sous le tampon HTTP actuel de 10 Mio. Les sources et photos originales restent dans le dépôt ; l’export de publication prépare des WebP et adapte leurs références sans modifier les sources HTML.

Avec Python et Pillow disponibles, lancer `python scripts/prepare-rentool.py --output /tmp/manigod-rentool-export` vers un dossier vide situé hors du dépôt. Le script exporte les 40 pages, les styles, le JavaScript, les fichiers de référencement et les images utilisées. Les photos JPEG sont limitées à 1440 px sur leur plus grand côté, en WebP de qualité 70 ; les PNG sont convertis en WebP sans perte et les SVG sont conservés. Aucun fichier de travail, instruction agent, réglage d’éditeur ou credential n’est inclus. Les limites de taille sont vérifiées avant le transfert.

L’export conserve actuellement `noindex, nofollow` et le blocage de `robots.txt` : la publication Rentool reste une version de test. Après import, vérifier le rapport Rentool et l’aperçu privé, puis publier uniquement sur instruction explicite. Les pages anglaises sont des fichiers statiques sous `en/` ; les langues du CMS Rentool sont un réglage distinct.

## Méthode de travail

Conserver le contenu éditorial autant que possible. Pour chaque évolution, vérifier le parcours en français et en anglais, sur ordinateur et sur mobile, puis contrôler les liens et les composants Rentool. Les consignes détaillées pour les agents figurent dans `AGENTS.md`.

Le design system explique les choix et les usages ; `css/site.css` applique les valeurs et `js/site-header.js` les comportements. Mettre à jour le guide dans la même PR qu’une évolution commune pour éviter les règles contradictoires entre pages ou entre agents.
