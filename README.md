# Le Hangar Fumoir + Casse-Croûte du Hangar — sites web

Deux sites liés pour deux commerces voisins appartenant au même propriétaire, au 1810, route des Rivières à Lévis :

| Site | Adresse web | Identité |
|---|---|---|
| **Le Hangar Fumoir** (local 502) | `/` | Charbon et braise : BBQ texan, fumoir |
| **Casse-Croûte du Hangar** (local 503) | `/casse-croute/` | Moutarde et charbon : poutines, burgers |

**Le lien entre les deux, « les 15 pas »** : sur le site du Hangar, la section « T'as faim, là, maintenant? » montre 15 empreintes de pas animées qui mènent au casse-croûte, avec le bouton « Faire les 15 pas ». Le casse-croûte fait le chemin inverse (« Le fumoir est à 15 pas »). Chaque en-tête et chaque pied de page a aussi un lien vers l'autre site. Le choix de langue FR/EN suit le visiteur d'un site à l'autre.

Sites statiques HTML/CSS/JS, sans dépendance ni étape de compilation. Les deux partagent le même système de design (`assets/css/style.css`) ; le casse-croûte y ajoute une surcouche (`casse-croute/cc.css`).

## Contenu des sites

**Le Hangar Fumoir** (boutique de viandes fumées prêtes-à-manger) : accueil avec photo, passerelle « 15 pas », incontournables, catalogue de 26 produits avec prix et filtres, « Comment ça marche » (fumé, scellé, 20 min dans l'eau bouillante), promos, avis Google, formulaire traiteur, heures, points de vente et carte.

**Casse-Croûte du Hangar** : accueil moutarde avec photo animée, spéciaux de la semaine (celui du jour s'allume), galerie, résumé des avis, menu complet de 29 plats avec prix, passerelle de retour vers le Hangar, heures et carte.

## Mettre en ligne

Il suffit de téléverser tout le dossier (`index.html` + `assets/`) chez n'importe quel hébergeur : l'hébergeur actuel, Netlify (glisser-déposer), GitHub Pages ou Cloudflare Pages.

Pour le voir sur son ordinateur, on ouvre simplement `index.html` dans un navigateur.

## Modifier le menu, les prix ou les heures

Tout se trouve dans **`assets/js/config.js`** (Hangar) et **`casse-croute/config.js`** (casse-croûte). Aucune autre connaissance n'est nécessaire.

- Prix : mettre un nombre (`35`). Avec `null`, le site affiche « Au comptoir ».
- Badge : `"hot"` (Coup de cœur), `"limited"` (Limité) ou `null`.
- Heures : `["11:30", "20:00"]`, ou `null` pour un jour fermé.

Les textes sont dans les fichiers `index.html` (français), `assets/js/i18n.js` et `casse-croute/i18n-cc.js` (anglais).
Les spéciaux de la semaine du casse-croûte (jeudi poutine, vendredi côtes levées) sont dans `casse-croute/index.html`. Le spécial du jour est mis en évidence automatiquement.

## Photos

Les photos actuelles viennent du site lehangarfumoir.ca et de la fiche Resto en ligne du casse-croûte (photos du commerce). Elles sont dans `assets/img/photos/` :

| Fichier | Contenu | Utilisé où |
|---|---|---|
| `planche.jpg` | Planche de viandes fumées | Accueil du Hangar, galerie du casse-croûte |
| `pitmaster.jpg` | Le propriétaire avec une côte levée | Carte « Côtes levées » |
| `boutique.jpg` | Comptoir de la boutique | « Comment ça marche » |
| `cc-poutine.jpg`, `cc-burger.jpg`, `cc-mac-cheese.jpg` | Plats du casse-croûte | Accueil et galerie du casse-croûte |
| `og.jpg`, `og-cc.jpg` | Images de partage (Facebook, textos) | Balises Open Graph |

Les emplacements sans photo (brisket, burnt ends, sauces, grilled cheese) affichent le nom du plat en grand. Pour en ajouter une, déposer l'image et ajouter une balise `<img>` dans la `<figure>` correspondante.

## Sources du contenu

- Hangar : lehangarfumoir.ca (accueil, menu, distribution), novembre 2026. Prix, heures, téléphone, points de vente et avis Google proviennent de là.
- Casse-croûte : menu Resto en ligne mis à jour le 5 octobre 2026 (prix), note 4,9 sur 49 évaluations et résumé des avis (Resto en ligne).

## À confirmer avec le client avant la mise en ligne

- [ ] **Courriel** qui reçoit les demandes de traiteur : `info@lehangarfumoir.ca` est provisoire (`assets/js/config.js` → `contact.email`)
- [ ] **Heures du casse-croûte** : tirées d'une fiche publique (Chaudière-Appalaches), à valider (`casse-croute/config.js` → `hours`)
- [ ] **Vendredi côtes levées** au casse-croûte : vient du site de tourisme, à valider
- [ ] **Jeudis poutine 17 h à 19 h** : annoncé sur le site du Hangar ; confirmer que ça se passe au casse-croûte
- [ ] **Minimum traiteur** : le formulaire exige 10 personnes (`assets/js/main.js`, chercher `>= 10`)
- [ ] **Avis Google** : citations courtes avec prénom et initiale. Confirmer que le client est à l'aise de les afficher.
- [ ] **Facebook du casse-croûte** : s'il existe, ajouter le lien

## Formulaire traiteur

Par défaut, l'envoi ouvre le logiciel de courriel du visiteur avec la demande déjà rédigée.
Pour un envoi direct, sans logiciel de courriel : créer un formulaire gratuit sur [formspree.io](https://formspree.io), puis coller l'adresse obtenue dans `config.js` → `formEndpoint`.

## Choix de design

- Palette : charbon et crème « papier boucherie ». Une seule couleur d'accent, la braise (`#E5642F`).
- Typographies : Anton (titres d'affiche), Barlow Condensed (étiquettes), Barlow (texte).
- Les animations sont désactivées automatiquement si le visiteur a choisi de réduire les animations.
- Accessibilité : lien d'évitement, navigation au clavier dans le menu, contrastes AA, champs étiquetés.
- Référencement : balises meta, Open Graph et données structurées `BarbecueRestaurant` (schema.org).
