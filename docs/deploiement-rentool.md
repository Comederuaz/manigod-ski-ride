# Déploiement Rentool du 8 novembre 2026

Publication explicitement demandée par le propriétaire. Rentool confirme l’activation de la version ci-dessous ; l’accès sur le domaine public reste à contrôler.

| Élément | Valeur |
| --- | --- |
| Déploiement | `yh7w9nzg8pgj4gka6pfzs3dv5s8htdgg` |
| Révision de publication | `1` |
| État | `ready`, version active en hébergement `static` |
| Inventaire | 140 fichiers, dont 40 pages et 96 images |
| Taille extraite | 8 227 522 octets |
| SHA-256 de l’archive Rentool | `b9d77667d47bac5b0f40ddcc35b1b30c6b2877b7e84f32cc85566e1754daa5ba` |
| Rapport du validateur | 0 erreur, 0 avertissement ; information `CALCULATED_LINKS` |
| Version des pages et styles | Commit `f0022e2` |

L’export est préparé avec `scripts/prepare-rentool.py`, selon la méthode du README. Les originaux restent dans le dépôt. Les deux premières tentatives d’import de l’export précédent ont été refusées par le transport HTTP avant création de version ; une requête de 10 444 220 octets a ensuite réussi. Aucun export incomplet n’a été publié.

## Contrôles réalisés

- 40 pages et références HTML/CSS locales valides dans l’inventaire exporté.
- Aperçu privé réel : accueil, menu Services, recherche, catalogue, filtres mobiles, panier et compte vérifiés en FR/EN à 1440 et 390 px, sans débordement horizontal. Photos WebP contrôlées visuellement ; titres des cartes à 17 px confirmés.
- Configuration Contact disponible par MCP et depuis l’origine locale autorisée. Aucun message, paiement, commande ou authentification réelle soumis.
- Publication confirmée par `publish_version`, puis par la relecture du pointeur actif avec `get_version`.
- `noindex, nofollow` et `robots.txt` bloquant l’indexation sont conservés pour cette version de test.

## Accès public à finaliser

Après activation, l’API publique de configuration du formulaire Contact renvoie encore HTTP 404, y compris depuis l’origine de l’aperçu privé. Les widgets Recherche, Location, Panier et Compte fonctionnent dans cet aperçu. Cela ne valide pas encore le formulaire depuis le domaine public.

Le MCP actuel ne fournit pas la liste ni l’état des domaines. L’adresse affichée dans la section Domaines du back-office a été demandée au propriétaire pour poursuivre les vérifications DNS/TLS et Contact. Le contrôle HTTPS de `www.manigod-ski-ride.com` renvoie toujours l’ancien site WordPress chez o2switch ; aucun changement DNS n’a été effectué.

L’activation Rentool est confirmée, mais ce compte rendu ne constitue pas encore une validation de mise en service sur le domaine public. Les URL et jetons de prévisualisation privés ne sont pas enregistrés dans le dépôt.
