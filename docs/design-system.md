# Design system — Manigod Ski Ride

Première base visuelle. Les valeurs de référence sont les variables `--site-*` au début de `css/site.css` ; ce document décrit leur usage.

## Identité

- Police : Archivo. Titres affirmés et courts ; texte courant lisible sans espacement excessif.

La palette ci-dessous reprend les couleurs déjà présentes dans le site du client. Les nouveaux composants utilisent ces variables ; une nouvelle teinte doit être ajoutée ici avec un usage précis.

| Variable CSS | Valeur | Usage |
| --- | --- | --- |
| `--site-ink` | `#0C1C1F` | Titres, navigation, icônes, texte des boutons abricot |
| `--site-text-secondary` | `#3E4B4D` | Descriptions et texte secondaire |
| `--site-text-muted` | `#677475` | Libellés complémentaires |
| `--site-surface` | `#FFFFFF` | Fond principal et panneaux de navigation |
| `--site-surface-soft` | `#F3F5F4` | Fonds secondaires, cases d’icônes et survol des liens |
| `--site-border` | `#DDE2E1` | Séparateurs et contours de panneaux |
| `--site-control-border` | `#C5CFCE` | Contours des champs et de la recherche |
| `--site-accent` | `#F0A06A` | Bouton principal et repères décoratifs |
| `--site-accent-text` | `#C8632A` | Accent sur fond blanc : liens, promotions, flèches |
| `--site-accent-hover` | `#F4B587` | Survol d’un bouton abricot |
| `--site-focus` | `var(--site-accent-text)` | Focus clavier et navigation active |

Le menu Services utilise des icônes encre sur fond doux, des descriptions secondaires et des flèches dans l’accent chaud. La navigation active utilise l’orange. Les sélections des widgets Rentool utilisent l’encre sombre avec du texte blanc ; aucun turquoise n’est utilisé pour ces contrôles.

Les photos peuvent se fondre dans le blanc par dégradé. Une surface posée sur une photo utilise un blanc translucide et un flou léger, avec un texte sombre lisible.

## Arrondis et composants

| Élément | Rayon |
| --- | ---: |
| Boutons, champs et contrôles | `0px` |
| Cartes, menus et blocs | `0px` |
| Fenêtres modales | `0px` |

La barre de recherche utilise une bordure fine et aucune ombre, sur un bloc translucide flouté. Les boutons Panier, Compte et Langue partagent le même espacement à chaque taille d’écran. Le même rayon s’applique aux composants Rentool par leurs variables CSS publiques. Ne pas modifier leur Shadow DOM. Les éléments interactifs conservent un focus visible et une cible tactile suffisante ; la transparence ne doit jamais diminuer la lisibilité.

## Mouvement

Les transitions servent à signaler un changement d’état, par exemple l’entrée de l’en-tête lors d’une remontée. La photo d’accueil a un mouvement lent. Tout mouvement décoratif est désactivé avec `prefers-reduced-motion: reduce`.

Cette base sera étendue progressivement aux cartes et aux pages secondaires lors de leur reprise, sans changer les textes du magasin.

Les couleurs de sélection Rentool sont centralisées dans `css/site.css` via `--rentool-secondary`, `--rentool-secondary-fg`, `--rentool-control-active` et `--rentool-control-active-fg`, plutôt que répétées dans les snippets HTML.

Les widgets réservent leur espace dès le premier affichage : emplacements fixes et adaptatifs pour Panier et Compte, hauteur minimale de 70 px pour la recherche. Le skeleton natif Rentool est conservé ; sa marge basse est supprimée via `::part(loading)` pour éviter un saut de hauteur et le débordement de son ombre. Ne pas ajouter de skeleton externe ou masquer les widgets pendant leur initialisation.

Sur la page Location, les filtres du catalogue ont une largeur maximale de `1280px`, alignée sur la largeur du contenu du héros, via `--rentool-rental-filters-max-width`. Le catalogue d’offres conserve toute la largeur disponible.

Les boutons « Réserver » des cartes de location utilisent le fond orange plein via `reserve-button-style="solid"` sur le widget, en français et en anglais. Le texte des actions orange utilise l’encre sombre via `--rentool-primary-fg` et `--rentool-action-primary-fg` : le blanc sur cet orange manque de contraste.

Limite constatée lors de la revue du 5 novembre 2026 : le bouton « Rechercher » conserve un texte blanc dans le widget actuellement distribué, malgré ces variables correctement héritées. Son contraste sur l’orange est de 2,1:1, contre 8,3:1 avec l’encre sombre. Corriger ce comportement côté Rentool ; ne pas contourner l’encapsulation de ses composants.
