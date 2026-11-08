# Design system — Manigod Ski Ride

Ce guide regroupe les choix visuels et les comportements communs validés pour le site français et anglais. Il sert de référence pour les nouvelles pages et les reprises de pages existantes.

## Références et entretien

| Fichier | Rôle |
| --- | --- |
| [`css/site.css`](../css/site.css) | Valeurs appliquées, variables `--site-*`, composants et adaptations aux écrans |
| [`js/site-header.js`](../js/site-header.js) | Navigation, en-tête sticky, hauteur partagée et visibilité du bouton flottant |
| Ce guide | Intentions, usages des composants et règles à conserver |
| [`AGENTS.md`](../AGENTS.md) | Consignes de travail pour les agents |

Pour toute évolution visuelle, réutiliser les composants et les variables existants. Mettre à jour les styles et ce guide dans le même changement lorsqu’une règle commune évolue. Une nouvelle couleur, un nouvel arrondi ou une exception par page doit avoir un usage explicite documenté. Les styles inline historiques encore présents dans le contenu ne constituent pas de nouveaux modèles à reproduire.

## Identité et couleurs

Police : Archivo, centralisée dans `--site-font-family`. Titres affirmés, texte courant lisible et contraste conservé sur les photos. Les textes et informations commerciales du client restent la référence éditoriale.

| Variable CSS | Valeur | Usage |
| --- | --- | --- |
| `--site-ink` | `#0C1C1F` | Titres, navigation, icônes et texte des boutons orange |
| `--site-text-secondary` | `#3E4B4D` | Descriptions et texte secondaire |
| `--site-text-muted` | `#677475` | Libellés complémentaires |
| `--site-surface` | `#FFFFFF` | Fond principal et panneaux de navigation |
| `--site-surface-soft` | `#F3F5F4` | Fonds secondaires et survol des liens |
| `--site-border` | `#DDE2E1` | Séparateurs et contours de panneaux |
| `--site-control-border` | `#C5CFCE` | Contours des champs et de la recherche |
| `--site-accent` | `#F0A06A` | Boutons principaux et repères décoratifs |
| `--site-discount` | `#B42318` | Fond et contour des badges de remise, avec du texte blanc |
| `--site-accent-text` | `#C8632A` | Liens, navigation active, promotions et flèches |
| `--site-accent-hover` | `#F4B587` | Survol d’un bouton orange |
| `--site-focus` | `var(--site-accent-text)` | Indicateur de focus clavier |

La sélection dans les widgets Rentool utilise l’encre sombre avec du texte blanc. La navigation active du site utilise l’orange. Le turquoise n’est pas utilisé pour ces contrôles. Une surface sur une photo reste claire et suffisamment opaque pour conserver la lisibilité du texte sombre.

## Typographie des titres

Les pages partagent les règles de `css/site.css` : Archivo, chasse de 125 % et graisse de 800 pour H1 et H2.

| Élément | Ordinateur et tablette (> 760 px) | Mobile (≤ 760 px) |
| --- | --- | --- |
| H1 | `clamp(34px, 3.6vw, 54px)` | `26px` |
| Interligne H1 | `0.98` | `1.05` |
| Espacement des lettres H1 | `-1.5px` | `-0.5px` |
| Surtitre du H1 | `15px`, interligne 24 px, graisse 400 | `11px`, interligne 18 px, graisse 400 |
| Écart surtitre / titre | `22px` | `14px` |
| H2 | `35px`, interligne `1.15` | `35px`, interligne `1.15` |

Le H1 reprend l’échelle de l’accueil, avec ou sans surtitre. Les variables `--site-h1-*` et `--site-h2-font-size` centralisent ces valeurs. Ne pas ajouter de taille ou d’interligne inline sur les titres. Les italiques et les retours à la ligne du contenu sont conservés. Les mots très longs peuvent se couper pour éviter un débordement sur petit écran.

Structure d’un titre avec surtitre :

```html
<h1 class="page-title page-title--stacked">
  <span class="page-title__eyebrow">CONTACT · COL DE LA CROIX-FRY, MANIGOD</span>
  <span class="page-title__text">CONTACTEZ<br><i>LE MAGASIN</i></span>
</h1>
```

Un titre simple utilise `<h1 class="page-title">…</h1>`. Les H2 utilisent directement `<h2>…</h2>` et la règle partagée.

## Angles, boutons et champs

| Famille | Variable | Rayon |
| --- | --- | ---: |
| Boutons et champs | `--site-radius-control` | `0px` |
| Cartes, menus et blocs | `--site-radius-card` | `0px` |
| Fenêtres modales | `--site-radius-dialog` | `0px` |

Les contrôles sont rectangulaires. Conserver également les rayons Rentool à zéro par leurs variables publiques ; ne pas ajouter de bordures arrondies locales aux sélecteurs de catégories ou aux boutons.

Les actions principales utilisent un fond orange et du texte encre. `.site-button` fournit ce style aux nouvelles pages ; `.site-button--secondary` utilise une surface claire avec une bordure fine. Les liens secondaires utilisent l’accent texte et un soulignement lorsque leur contexte le demande. Les boutons Panier, Compte et Langue ont un fond blanc et partagent le même espacement.

Le focus clavier reste visible. La fermeture d’un menu retire ses liens du parcours clavier ; Échap ferme la navigation et restitue le focus au bouton concerné.

## En-tête commun

Toutes les pages utilisent le même en-tête vitré que l’accueil.

| Variable | Valeur / règle |
| --- | --- |
| `--site-header-surface` | `rgba(255,255,255,.84)` |
| `--site-header-sticky-surface` | `rgba(255,255,255,.92)` |
| `--site-header-border` | `rgba(221,226,225,.65)` |
| `--site-header-backdrop` | `blur(14px) saturate(1.1)` |
| `--site-header-height` | Hauteur réelle partagée par JavaScript ; replis CSS de 95, 73 et 63 px selon le format |
| `--site-header-control-gap` | 8 px, puis 4 px à ≤ 760 px, puis 2 px à ≤ 380 px |

L’en-tête occupe toute la largeur. Il quitte naturellement la vue à la descente, puis réapparaît avec une transition à la remontée. Il réapparaît aussi lorsqu’un de ses contrôles reçoit le focus clavier. Son espace est conservé dans le document lorsqu’il devient fixe, pour éviter les décalages et le flash observé auparavant.

`js/site-header.js` mesure la hauteur de l’en-tête au chargement, après chargement des polices et au redimensionnement. Il renseigne la variable racine `--site-header-height`, utilisée aussi par le Hero et le menu mobile. Ne pas remettre de décalage fixe propre à chaque page.

### Navigation et menu Services

La navigation principale contient Location de ski, Services et Le magasin, avec Panier, Compte et Langue à droite. La page Contact est accessible depuis les pieds de page pour garder cette navigation courte.

Services ouvre un panneau avec Consigne, Atelier et Bootfitting : icônes encre sur fond doux, descriptions secondaires et flèches orange. Les trois pages restent autonomes. Sur ordinateur, le panneau est rattaché au bas de l’en-tête, avec une largeur maximale de 460 px et une entrée/sortie par opacité et translation.

À ≤ 1100 px, le menu passe dans le bouton de navigation et Services devient un accordéon. La hauteur disponible du menu tient compte de l’en-tête ; le contenu reste défilable sur un écran court en paysage.

## Hero et photographies

Chaque section `.hero` commence derrière l’en-tête, sur ordinateur et mobile. Le chevauchement utilise `--site-header-height`. La hauteur de la photo compense ce chevauchement pour conserver un titre lisible sous l’en-tête. Les pages sans Hero gardent leur fond clair et le même en-tête vitré, sans ajout de photo.

Les photos existantes du site sont réutilisées avec un texte alternatif pertinent. Leurs cadrages restent propres à chaque page, avec une source mobile lorsqu’elle existe. Les dégradés fondent la photo dans le blanc pour conserver la lisibilité du titre.

Le contenu du Hero est limité à 1360 px avec un retrait de 40 px sur ordinateur, puis 20 px sur mobile. Les variantes `.hero--home` et `.hero--rental` conservent leurs cadrages et hauteurs spécifiques ; une page de service ou Contact utilise le Hero commun.

| Surface | Présentation |
| --- | --- |
| Bloc de réservation de l’accueil | Largeur maximale 620 px ; blanc à 18 %, flou de 16 px, bordure et ombre légères ; angles droits |
| Intérieur du bloc d’accueil | Retrait de 20 px, puis 16 px sur mobile ; écart texte / recherche de 24 px, puis 20 px |
| Recherche dans le Hero Location | Largeur maximale 540 px |
| Catalogue d’offres | Toute la largeur disponible ; les espacements internes et le carrousel restent gérés par Rentool |

## Widgets et parcours de location

Utiliser les composants officiels pour recherche, catalogue, panier et compte. Le site choisit leur place, leur largeur et leur thème ; Rentool conserve la réservation, le paiement et l’authentification. Lire les guides et les snippets du MCP avant de modifier une intégration. Les valeurs du thème sont appliquées par variables publiques, sans modification du Shadow DOM.

- L’accueil contient uniquement la recherche de location. Sa destination est `location.html`, sans ancre : les dates sont transmises et la page s’ouvre en haut.
- La page Location contient la recherche dans son Hero, puis le catalogue avec ses filtres immédiatement en dessous. `search-params` conserve la lecture du magasin et des dates dans l’URL.
- Les liens internes entre pages, dont Location de ski et le changement de langue, conservent le contexte appliqué de l’URL (`rental-store`, `rental-start`, `rental-end`, `rental-period` et `ref`). Le script commun relit ce contexte à l’activation du lien, car la recherche peut modifier l’URL sans rechargement. Les paramètres propres à la destination et ses ancres restent conservés ; aucun contexte n’est mémorisé en dehors de l’URL ni transmis aux liens externes.
- Les liens qui invitent explicitement à rejoindre la réservation peuvent utiliser `#reserver`.
- La largeur maximale des filtres est `1280px`, via `--rentool-rental-filters-max-width`. Les offres restent sur toute la largeur de la fenêtre.
- La barre compacte des filtres est sticky sur mobile. Le conteneur de la page Location utilise `overflow: clip` : `overflow: hidden` sur un ancêtre bloque ce comportement natif.
- Le bouton Réserver flottant est masqué tant que la recherche ou le catalogue est visible, pour ne pas recouvrir les contrôles ou le panneau de catégories.

Les sélections sombres utilisent `--rentool-secondary`, `--rentool-secondary-fg`, `--rentool-control-active` et `--rentool-control-active-fg`, centralisés dans la feuille commune. Les cartes utilisent `reserve-button-style="solid"` : fond orange et texte encre, via `--rentool-primary-fg` et `--rentool-action-primary-fg`.

### Hiérarchie commune à tous les widgets

La feuille commune couvre Recherche, Location, Panier et Compte, y compris leurs panneaux, leurs fenêtres et leurs composants imbriqués. La base typographique est également transmise au formulaire Contact, qui conserve son thème indépendant. Utiliser les rôles `--rentool-type-*` et les parts publiques du contrat v1, sans modifier les éléments internes en JavaScript.

| Famille | Règle commune |
| --- | --- |
| Titres | Archivo 20 px, chasse 125 %, graisse 800, interligne 1,2, espacement 0,3 px, majuscules |
| Descriptions et textes courants | Archivo 14 px, interligne 1,5, casse normale ; textes secondaires 13 px et couleur secondaire |
| Libellés et indications compactes | Archivo 12 px minimum ; libellés en graisse 700, sans agrandir les icônes ou les jours du calendrier |
| Actions principales | Orange/encre, Archivo 13 px, chasse 125 %, graisse 700, majuscules, espacement 1 px, hauteur minimale 48 px |
| Actions secondaires avec contour | Encre, bordure grise, Archivo 12 px, chasse 115 %, graisse 700, majuscules, espacement 0,6 px |
| Actions discrètes et choix compacts | Casse normale, graisse 600 ; les filtres, accessoires, étapes et onglets ne reprennent pas la grande typographie des appels à l’action |
| Champs de saisie | Archivo 16 px, graisse 400, casse normale, angles droits ; la taille évite le zoom automatique de saisie sur mobile |
| Sélections | Encre/blanc ; les étapes actives et accessoires conservent leurs états natifs |
| Focus | Contour de 2 px dans l’accent texte avec retrait extérieur de 3 px |

À ≤ 380 px, les actions principales passent à 12 px, chasse normale et espacement 0,6 px pour conserver les libellés longs. Le pied de panier mobile réserve au moins 88 px au total, sans réduire sa zone à cause du bouton de validation. La hauteur tactile de 48 px est conservée.

Les intitulés des filtres Matériel et Type utilisent des majuscules espacées à 13 px, en graisse 500. Leurs choix restent en casse normale, à 15 px et en graisse 500, avec des retraits de 10 px / 18 px et une hauteur minimale de 44 px (48 px dans le panneau mobile). Les groupes peuvent passer à la ligne si la largeur disponible ne permet plus de les juxtaposer. Le résumé mobile utilise également 15 px et une graisse de 500. Le fond actif utilise l’indicateur natif animé, dont la hauteur suit les boutons de 44 px. Chaque groupe de choix reste sur une ligne ; un défilement horizontal apparaît si nécessaire, tandis que les groupes Matériel et Type peuvent s’empiler. Cela préserve le déplacement natif du fond sans recouvrir une deuxième ligne de choix. `prefers-reduced-motion: reduce` désactive ce déplacement. Les états de sélection et le comportement des filtres restent natifs. Les chaussures, casques et options utilisent des noms à 14 px et des suppléments à 12 px. Les boutons Panier et Compte de l’en-tête gardent une surface blanche et un texte compact de 12 px en casse normale ; le compteur utilise orange/encre. Les icônes et les libellés internes des choix sélectionnés héritent du premier plan de leur contrôle pour conserver leur contraste sur une surface sombre, notamment dans le calendrier et les sélecteurs numériques.

Les mêmes familles d’actions s’appliquent à Rechercher, Suivant, Ajouter au panier, Valider mon panier et Continuer. Seul Réserver reçoit une flèche décorative. Les couleurs d’erreur, de succès, d’indisponibilité et les opacités de désactivation restent fonctionnelles et natives. Les jours du calendrier, les cases à cocher, les conditions de vente et les commandes de fermeture conservent leurs dimensions et leurs comportements. Les interfaces de paiement dans une iframe externe restent pilotées par le prestataire ; le CSS du site ne traverse pas cette iframe.

Au survol, les lignes de choix des chaussures, casques et options du pack (`member`, y compris dans les fenêtres de Location et Panier) reprennent la couleur du contour natif des catégories : encre à 35 % d’opacité. Le contour intérieur de 1 px remplace l’ombre native trop claire, sans modifier les dimensions des lignes ni les cases à cocher. Les états de sélection et de focus restent natifs.

### Cartes du catalogue

Les finitions propres aux cartes sont définies dans `css/site.css`, sous `.rental-catalog`, en complément du thème commun, avec les variables et les parts publiques du contrat de présentation Rentool v1 (`rentool://docs/widget-styling.md`, disponible le 8 novembre 2026). Il s’applique aux pages Location FR/EN, sans injection de styles dans le Shadow DOM ni modification des libellés métier.

| Élément | Présentation |
| --- | --- |
| Carte (`card`) | Surface blanche, contour `--site-border`, angles droits |
| Titres des cartes (`card` → `text-title`) | Archivo, chasse 125 %, 17 px, graisse 800, interligne 1,2, espacement 0,3 px, majuscules, encre ; les autres titres de widgets gardent leur échelle commune |
| Description du pack (`desc`) | Archivo 14 px, interligne 1,4 ; texte secondaire `--site-text-secondary` |
| Prix (`amount`) | Archivo, graisse 800, espacement −0,5 px, encre ; taille et unité natives |
| Badge de remise (`discount-note`) | Rouge de remise/blanc, contour rouge, angles droits, Archivo 14 px, graisse 800, interligne 1,2, espacement 0,2 px, retraits 5 px / 8 px, sans ombre |
| Photos et détails (`media-details-button`) | Archivo, graisse 600, accent texte |
| Réserver (`reserve-button`) | Action principale commune et flèche décorative ; espacement 1,5 px ; hauteur minimale 48 px |

Le survol du bouton utilise `--site-accent-hover` ; le focus conserve un contour visible. La flèche cible uniquement la réservation. Les boutons de choix, les actions d’en-tête et les descriptions restent en casse normale ; les titres de filtres et les actions principales suivent la hiérarchie commune. Les états désactivés et de chargement restent natifs. Les dimensions, le carrousel, les disponibilités et les choix d’accessoires restent gérés par Rentool.

### Recherche et stabilité du chargement

La barre et son bouton gardent leur largeur et leur animation natives : le libellé apparaît quand une recherche reste à appliquer, puis le bouton se réduit à la loupe après application. Le texte et les états sont entièrement rendus par Rentool ; ne pas masquer `search-label`, ajouter un libellé via `::after` ou imposer une largeur/position au bouton. Le conteneur `submit-wrap` transmet `--rentool-button-padding-x: 6px` et une chasse normale de 100 % à son action uniquement, pour que le texte Archivo de 13 px reste lisible dans la largeur dépliée native. Les contrôles du pied de calendrier conservent leur présentation.

La barre de recherche a une bordure fine `--site-control-border`, sans ombre visible. Son cadre réserve au moins 70 px dès le premier affichage. La barre définitive mesure 66 px, puis 70 px lorsque son conteneur mesure au plus 520 px. La hauteur finale n’est appliquée qu’après `rentool-ready`, pour laisser les erreurs initiales visibles.

Les emplacements Panier et Compte réservent respectivement 164 et 128 px sur ordinateur, puis 42 px chacun à ≤ 760 px. Leur espace existe avant le chargement du module.

Conserver les skeletons natifs. La marge basse du chargement de la recherche est supprimée via `::part(loading)` pour éviter le saut de hauteur et le débordement de son ombre. Ne pas ajouter de skeleton externe, de voile, de transition d’opacité ou d’observation du Shadow DOM autour des widgets.

### Contact

Les pages `contact.html` et `en/contact.html` réutilisent l’en-tête, le Hero et la typographie communs. Elles regroupent les coordonnées, les horaires, l’accès au magasin et des liens utiles ; les informations proviennent des pages existantes.

Les sections reprennent une largeur maximale de 1360 px et des retraits de 40 px, puis 20 px sur mobile. Le bloc principal associe le formulaire à gauche, dans une colonne limitée à 674 px, et les coordonnées à droite ; il s’empile à ≤ 1100 px. La photo du bloc d’accès utilise un ratio de 4/3, puis 3/2 sur mobile.

Le formulaire est le composant officiel `rentool-contact-widget`, avec la clé réelle du formulaire standard configuré dans Rentool. Il est indépendant du catalogue des cinq autres widgets et ne nécessite pas de jeton public `rtw_…`. Réutiliser le loader une seule fois, les métadonnées publiques du site et l’`account-id` officiel pour la session client facultative. Les destinataires et la logique d’envoi restent gérés par Rentool.

Les libellés localisés et la disponibilité du formulaire restent pilotés par Rentool. Découvrir le formulaire dans `forms` de la configuration MCP et lire ses paramètres avec `read_site_api`. Avant publication, le navigateur doit utiliser une des origines de `developmentOrigins` ; les conditions et vérifications sont décrites dans le [README](../README.md). Conserver les états natifs de validation, d’erreur et de réception, avec leurs couleurs fonctionnelles.

La page garde le téléphone et l’e-mail accessibles. Elle ne comporte pas de bouton Réserver flottant qui recouvrirait le formulaire sur mobile. Le bouton d’envoi du composant Contact utilise l’encre avec du texte blanc pour conserver un contraste lisible ; les autres appels à l’action de la page restent orange. Ses champs et boutons restent carrés via `--rentool-radius-inner`, en plus des rayons du thème. Le formulaire natif conserve son propre contour, sans seconde carte superposée autour. Aucun message de test réel n’est envoyé pour vérifier sa présentation ; une simulation de réception ne prouve pas une livraison d’e-mail.

## Adaptation aux écrans et mouvement

| Seuil | Usage |
| --- | --- |
| 1100 px | Navigation dans le bouton menu ; grille Contact sur une colonne |
| 760 px | Typographie mobile, photos pleine largeur et contrôles compacts |
| 380 px | En-tête resserré pour les petits écrans |
| 520 px de largeur du conteneur | Présentation compacte de la recherche Rentool |

Les transitions signalent un changement d’état : entrée sticky de 0,34 s et entrée/sortie du panneau Services. La photo d’accueil a un mouvement lent de 14 s en alternance. `prefers-reduced-motion: reduce` désactive ce mouvement et les transitions de l’en-tête et du menu Services.

Vérifier les pages concernées dans les deux langues sur ordinateur et mobile. Lors d’un changement de règle commune aux en-têtes ou aux titres, contrôler également sa propagation aux autres pages, le focus clavier, les menus, l’absence de débordement et les positions avant/après chargement des widgets.

## Contraste des actions Rentool

Le texte des actions orange utilise l’encre sombre, y compris Rechercher. Le contrat public de présentation v1 permet de définir ce premier plan sur `button-primary` et de réutiliser les variables du site. Conserver ce contraste lors des mises à jour du widget ; les textes, les prix et les indications de durée gardent leur hiérarchie propre.
