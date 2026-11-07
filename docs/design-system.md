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

Police : Archivo. Titres affirmés, texte courant lisible et contraste conservé sur les photos. Les textes et informations commerciales du client restent la référence éditoriale.

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

Les boutons du widget Location reprennent Archivo, une taille de 13 px et une graisse de 700 via `--rentool-button-font`, `--rentool-button-font-size` et `--rentool-button-font-weight`. Leurs dimensions et états restent natifs. La version du widget vérifiée le 7 novembre 2026 ne propose ni variable de casse, de chasse ou d’espacement des lettres, ni part réexportée pour cibler le bouton Réserver depuis le site. Les majuscules et la chasse de 125 % avec espacement de 1,5 px des boutons éditoriaux restent donc à exposer côté Rentool pour une correspondance complète ; ne pas appliquer ces propriétés au catalogue entier ni modifier son Shadow DOM.

### Recherche et stabilité du chargement

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

## Limite suivie côté Rentool

Lors des vérifications du 5 novembre 2026, le bouton Rechercher conservait un texte blanc malgré les variables de premier plan héritées. Son contraste sur l’orange était de 2,1:1, contre 8,3:1 avec l’encre sombre utilisée par les boutons Réserver. Revalider le widget distribué lorsque ce comportement est corrigé côté Rentool ; conserver son encapsulation.
