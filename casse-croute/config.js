/* ==========================================================================
   CONFIGURATION — Casse-Croûte du Hangar
   Prix : null = « Au comptoir ». Badge : "hot" | "limited" | null
   ========================================================================== */

window.HANGAR = {
  contact: {
    email: "info@lehangarfumoir.ca",   // À CONFIRMER
    phone: "418 831-8288"              // Source : fiche Resto en ligne. À CONFIRMER
  },
  formEndpoint: "",

  /* 0 = dimanche … 6 = samedi. À CONFIRMER (fiche publique) */
  hours: {
    0: ["11:30", "19:30"],
    1: null,
    2: ["11:30", "19:30"],
    3: ["11:30", "19:30"],
    4: ["11:30", "20:00"],
    5: ["11:30", "20:00"],
    6: ["11:30", "20:00"]
  },

  /* Les spéciaux (jeudi poutine, vendredi côtes levées) sont dans index.html, section « speciaux ». */

  categories: [
    { id: "poutines", fr: "Poutines",       en: "Poutines" },
    { id: "burgers",  fr: "Burgers & grilled cheese", en: "Burgers & grilled cheese" },
    { id: "cotes",    fr: "À-côtés",        en: "Sides" },
    { id: "enfants",  fr: "Pour les petits", en: "For the kids" }
  ],

  menu: [
    { cat: "poutines", badge: "hot", price: null,
      fr: { name: "La Carnivore", desc: "La poutine pour les vrais : un mélange de viandes fumées du Hangar par-dessus." },
      en: { name: "The Carnivore", desc: "The poutine for the brave: a mix of the Hangar's smoked meats on top." } },
    { cat: "poutines", badge: null, price: null,
      fr: { name: "Poutine classique", desc: "Frites, fromage en grains qui fait couic, sauce brune." },
      en: { name: "Classic poutine", desc: "Fries, squeaky cheese curds, brown gravy." } },
    { cat: "poutines", badge: null, price: null,
      fr: { name: "Poutine porc effiloché", desc: "Garnie du porc effiloché fumé d'à côté." },
      en: { name: "Pulled pork poutine", desc: "Topped with pulled pork smoked next door." } },
    { cat: "poutines", badge: null, price: null,
      fr: { name: "Poutine boulettes de brisket", desc: "Les boulettes de brisket maison du Hangar." },
      en: { name: "Brisket meatball poutine", desc: "The Hangar's house brisket meatballs." } },
    { cat: "poutines", badge: null, price: null,
      fr: { name: "Poutine smoked meat", desc: "Viande fumée tranchée, généreusement." },
      en: { name: "Smoked meat poutine", desc: "Sliced smoked meat, piled high." } },
    { cat: "poutines", badge: null, price: null,
      fr: { name: "Poutine bouchées de poulet", desc: "Bouchées de poulet croustillantes." },
      en: { name: "Chicken bites poutine", desc: "Crispy chicken bites." } },

    { cat: "burgers", badge: null, price: null,
      fr: { name: "Les burgers", desc: "Plusieurs burgers au menu, dont des versions aux viandes fumées. Demande ceux du jour." },
      en: { name: "Burgers", desc: "Several burgers on the menu, including smoked-meat versions. Ask about today's." } },
    { cat: "burgers", badge: null, price: null,
      fr: { name: "Les grilled cheese", desc: "Pain doré, fromage qui file, et une option fumée pour les gourmands." },
      en: { name: "Grilled cheeses", desc: "Golden bread, stretchy cheese, and a smoky option for the hungry." } },

    { cat: "cotes", badge: "hot", price: null,
      fr: { name: "Mac & cheese", desc: "Celui dont on parle dans les avis." },
      en: { name: "Mac & cheese", desc: "The one people mention in reviews." } },
    { cat: "cotes", badge: null, price: null,
      fr: { name: "Frites", desc: "Coupées, dorées, salées comme il faut." },
      en: { name: "Fries", desc: "Cut, golden, salted just right." } },
    { cat: "cotes", badge: null, price: null,
      fr: { name: "Rondelles d'oignon", desc: "Panées et croustillantes." },
      en: { name: "Onion rings", desc: "Battered and crispy." } },
    { cat: "cotes", badge: null, price: null,
      fr: { name: "Corn dog", desc: "Le classique de casse-croûte." },
      en: { name: "Corn dog", desc: "The snack-bar classic." } },
    { cat: "cotes", badge: null, price: null,
      fr: { name: "Doigts de poulet", desc: "Croustillants, avec sauce à tremper." },
      en: { name: "Chicken fingers", desc: "Crispy, with dipping sauce." } },

    { cat: "enfants", badge: null, price: null,
      fr: { name: "Menu enfant", desc: "Des portions pensées pour les petites faims." },
      en: { name: "Kids' menu", desc: "Portions made for smaller appetites." } }
  ]
};
