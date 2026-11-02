# Le Hangar Fumoir + Casse-Croûte du Hangar — sites web

Deux sites liés pour deux commerces voisins appartenant au même propriétaire, au 1810, route des Rivières à Lévis :

| Site | Adresse web | Identité |
|---|---|---|
| **Le Hangar Fumoir** (local 502) | `/` | Charbon et braise : BBQ texan, fumoir |
| **Casse-Croûte du Hangar** (local 503) | `/casse-croute/` | Moutarde et charbon : poutines, burgers |

**Le lien entre les deux, « les 15 pas »** : sur le site du Hangar, la section « T'as faim, là, maintenant? » montre 15 empreintes de pas animées qui mènent au casse-croûte, avec le bouton « Faire les 15 pas ». Le casse-croûte fait le chemin inverse (« Le fumoir est à 15 pas »). Chaque en-tête et chaque pied de page a aussi un lien vers l'autre site. Le choix de langue FR/EN suit le visiteur d'un site à l'autre.

Sites statiques HTML/CSS/JS, sans dépendance ni étape de compilation. Les deux partagent le même système de design (`assets/css/style.css`) ; le casse-croûte y ajoute une surcouche (`casse-croute/cc.css`).

## Contenu du site

| Section | Ce qu'elle fait |
|---|---|
| Accueil | « Fumé lentement. Servi vite. », appels à l'action vers le menu et les heures |
| Les incontournables | Brisket, burnt ends, Smoke burger, poutines |
| Menu interactif | Filtres par catégorie, prix, badges « Coup de cœur » et « Limité » |
| Notre fumée | Le procédé en 3 étapes : fumé à l'érable, scellé sous vide, servi en ~20 min |
| Avis | Ce qui revient dans les avis des clients, avec un lien vers Facebook |
| Traiteur | Formulaire de soumission avec validation et messages d'erreur rédigés |
| Nous trouver | Adresse, carte, heures avec l'indicateur « Ouvert / Fermé » en direct |
| FR / EN | Bouton de langue. Le choix est mémorisé, et `?lang=en` fonctionne aussi dans l'adresse |

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

Le site est conçu pour fonctionner **sans photos** : chaque emplacement affiche le nom du plat en grand, sur fond de braise.
Pour ajouter les vraies photos, déposer ces fichiers dans `assets/img/photos/` (format paysage, environ 1600 px de large, en JPG compressé) :

- `brisket.jpg`
- `burnt-ends.jpg`
- `smoke-burger.jpg`
- `poutine.jpg`
- `og.jpg` (1200×630, l'image affichée quand on partage le lien sur Facebook)

Pour le casse-croûte, dans le même dossier :

- `cc-carnivore.jpg`, `cc-burger.jpg`, `cc-grilled-cheese.jpg`, `cc-mac-cheese.jpg`, `cc-rondelles.jpg`, `cc-poutine.jpg` (format portrait 4:5, environ 1000 px de large)
- `og-cc.jpg` (1200×630)

Elles apparaissent automatiquement.

## À confirmer avec le client avant la mise en ligne

Le contenu vient de sources publiques (fiches de restaurant, page Facebook). Ces points doivent être validés :

- [ ] **Heures d'ouverture** : elles viennent d'une fiche publique et peuvent dater (`config.js` → `hours`)
- [ ] **Courriel** qui reçoit les demandes de traiteur : `info@lehangarfumoir.ca` est un exemple provisoire (`config.js` → `contact.email`)
- [ ] **Téléphone** (`config.js` → `contact.phone`)
- [ ] **Prix** : brisket 35 $/lb, burnt ends 18 $/400 g et bouchées 16 $ viennent du menu en ligne. Les autres prix sont à ajouter.
- [ ] **Menu complet** : n'y figurent que les plats mentionnés publiquement. Ajouter les accompagnements, sandwichs, boissons, etc.
- [ ] **Minimum traiteur** : le formulaire exige 10 personnes (`main.js`, recherche `>= 10`, et le message d'erreur)
- [ ] **Photos** des plats (les deux sites)
- [ ] **Casse-croûte** : menu tiré d'une ancienne fiche Uber Eats, sans prix. Noms exacts des burgers et grilled cheese à fournir.
- [ ] **Casse-croûte** : téléphone 418 831-8288 (fiche Resto en ligne) et spéciaux jeudi/vendredi (site de tourisme Chaudière-Appalaches)
- [ ] **Heures** : la fiche publique trouvée concerne le casse-croûte. Celles du fumoir sont peut-être différentes.

## Formulaire traiteur

Par défaut, l'envoi ouvre le logiciel de courriel du visiteur avec la demande déjà rédigée.
Pour un envoi direct, sans logiciel de courriel : créer un formulaire gratuit sur [formspree.io](https://formspree.io), puis coller l'adresse obtenue dans `config.js` → `formEndpoint`.

## Choix de design

- Palette : charbon et crème « papier boucherie ». Une seule couleur d'accent, la braise (`#E5642F`).
- Typographies : Anton (titres d'affiche), Barlow Condensed (étiquettes), Barlow (texte).
- Les animations sont désactivées automatiquement si le visiteur a choisi de réduire les animations.
- Accessibilité : lien d'évitement, navigation au clavier dans le menu, contrastes AA, champs étiquetés.
- Référencement : balises meta, Open Graph et données structurées `BarbecueRestaurant` (schema.org).
