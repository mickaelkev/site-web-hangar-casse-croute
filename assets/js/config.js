/* ==========================================================================
   CONFIGURATION DU SITE — le seul fichier à modifier au quotidien.
   Menu, prix, heures et coordonnées sont ici.
   Prix : mettre null pour afficher « Au comptoir » au lieu d'un prix.
   ========================================================================== */

window.HANGAR = {

  /* ---------- Coordonnées ---------- */
  contact: {
    // À CONFIRMER avec le client : courriel qui reçoit les demandes de traiteur.
    email: "info@lehangarfumoir.ca",
    // À CONFIRMER : numéro de téléphone (format affiché).
    phone: ""
  },

  /* ---------- Formulaire traiteur ----------
     Option A (recommandée) : créer un formulaire gratuit sur https://formspree.io
     et coller l'adresse ici, ex. "https://formspree.io/f/abcdwxyz".
     Option B : laisser vide → le bouton ouvre le courriel du visiteur, déjà rempli. */
  formEndpoint: "",

  /* ---------- Heures (0 = dimanche … 6 = samedi) ----------
     Format 24 h. null = fermé.  À CONFIRMER : heures tirées d'une fiche publique. */
  hours: {
    0: ["11:30", "19:30"],
    1: null,
    2: ["11:30", "19:30"],
    3: ["11:30", "19:30"],
    4: ["11:30", "20:00"],
    5: ["11:30", "20:00"],
    6: ["11:30", "20:00"]
  },

  /* ---------- Menu ----------
     cat : identifiant de catégorie (voir categories)
     badge : "hot" (coup de cœur, accent) | "limited" (quantité limitée) | null */
  categories: [
    { id: "fumoir",  fr: "Le fumoir",  en: "Smoked meats" },
    { id: "bouchees", fr: "Bouchées",  en: "Bites" },
    { id: "burgers", fr: "Burgers",    en: "Burgers" },
    { id: "poutines", fr: "Poutines",  en: "Poutines" },
    { id: "sauces",  fr: "Sauces",     en: "Sauces" }
  ],

  menu: [
    {
      cat: "fumoir", badge: "limited",
      fr: { name: "Brisket", desc: "Poitrine de bœuf fumée à l'érable toute la nuit. Écorce poivrée, cœur fondant.", unit: "la livre" },
      en: { name: "Brisket", desc: "Beef brisket smoked overnight over maple. Peppery bark, melt-in-your-mouth center.", unit: "per lb" },
      price: 35
    },
    {
      cat: "fumoir", badge: null,
      fr: { name: "Porc effiloché", desc: "Épaule de porc fumée longuement, effilochée à la main." },
      en: { name: "Pulled pork", desc: "Slow-smoked pork shoulder, hand-pulled." },
      price: null
    },
    {
      cat: "fumoir", badge: null,
      fr: { name: "Côtes levées", desc: "Ribs de porc fumés jusqu'à ce qu'ils se détachent tout seuls de l'os." },
      en: { name: "Ribs", desc: "Pork ribs smoked until they pull clean off the bone." },
      price: null
    },
    {
      cat: "bouchees", badge: "hot",
      fr: { name: "Burnt ends", desc: "Les pointes du brisket, caramélisées en sauce.", unit: "400 g" },
      en: { name: "Burnt ends", desc: "Brisket point cubes, caramelized in sauce.", unit: "400 g" },
      price: 18
    },
    {
      cat: "bouchees", badge: null,
      fr: { name: "Bouchées de brisket", desc: "Le brisket en format grignotine, parfait pour partager." },
      en: { name: "Brisket bites", desc: "Brisket in snackable bites, made for sharing." },
      price: 16
    },
    {
      cat: "bouchees", badge: null,
      fr: { name: "Boulettes de brisket", desc: "Boulettes maison au brisket fumé." },
      en: { name: "Brisket meatballs", desc: "House meatballs made with smoked brisket." },
      price: null
    },
    {
      cat: "burgers", badge: "hot",
      fr: { name: "Le Smoke", desc: "Le burger signature du Hangar, garni de viande fumée." },
      en: { name: "The Smoke", desc: "The Hangar's signature burger, loaded with smoked meat." },
      price: null
    },
    {
      cat: "poutines", badge: null,
      fr: { name: "Poutine au brisket", desc: "Frites, fromage en grains, sauce et brisket fumé." },
      en: { name: "Brisket poutine", desc: "Fries, cheese curds, gravy and smoked brisket." },
      price: null
    },
    {
      cat: "poutines", badge: null,
      fr: { name: "Poutine au porc effiloché", desc: "Frites, fromage en grains, sauce et porc effiloché." },
      en: { name: "Pulled pork poutine", desc: "Fries, cheese curds, gravy and pulled pork." },
      price: null
    },
    {
      cat: "sauces", badge: null,
      fr: { name: "Sauces BBQ maison", desc: "Plusieurs sauces préparées sur place. Demande la sélection du jour." },
      en: { name: "House BBQ sauces", desc: "Several sauces made in-house. Ask about today's lineup." },
      price: null
    }
  ]
};
