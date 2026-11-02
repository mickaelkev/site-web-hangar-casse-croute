/* ==========================================================================
   CONFIGURATION — Casse-Croûte du Hangar
   price : nombre | null = « Au comptoir » · stock:false = rupture
   badge : "hot" (coup de cœur) | null
   Source : menu Resto en ligne mis à jour le 5 octobre 2026.
   ========================================================================== */

window.HANGAR = {
  contact: {
    email: "info@lehangarfumoir.ca",   // À CONFIRMER
    phone: "418 831-8288"
  },
  formEndpoint: "",

  /* 0 = dimanche … 6 = samedi. À CONFIRMER : heures tirées d'une fiche publique. */
  hours: {
    0: ["11:30", "19:30"],
    1: null,
    2: ["11:30", "19:30"],
    3: ["11:30", "19:30"],
    4: ["11:30", "20:00"],
    5: ["11:30", "20:00"],
    6: ["11:30", "20:00"]
  },

  categories: [
    { id: "poutines", fr: "Poutines",        en: "Poutines" },
    { id: "burgers",  fr: "Burgers",         en: "Burgers" },
    { id: "mac",      fr: "Mac & cheese",    en: "Mac & cheese" },
    { id: "grilled",  fr: "Grilled cheese",  en: "Grilled cheese" },
    { id: "cotes",    fr: "À-côtés",         en: "Sides" },
    { id: "enfants",  fr: "Menu enfant",     en: "Kids' menu" },
    { id: "boire",    fr: "Breuvages",       en: "Drinks" }
  ],

  menu: [
    /* Poutines */
    { cat: "poutines", badge: "hot", price: 16.88,
      fr: { name: "Poutine carnivore", desc: "Frites, fromage en grains et sauce brune, garnies d'un mélange de viandes fumées." },
      en: { name: "Carnivore poutine", desc: "Fries, cheese curds and brown gravy topped with assorted smoked meats." } },
    { cat: "poutines", badge: null, price: 11.97,
      fr: { name: "Poutine classique", desc: "Frites, fromage en grains et sauce brune." },
      en: { name: "Classic poutine", desc: "Fries topped with cheese curds and brown gravy." } },
    { cat: "poutines", badge: "hot", price: 16.63,
      fr: { name: "Poutine porc effiloché", desc: "Frites, fromage en grains, sauce et porc effiloché fumé." },
      en: { name: "Pulled pork poutine", desc: "Fries, cheese curds and gravy topped with pulled pork." } },
    { cat: "poutines", badge: null, price: 16.63,
      fr: { name: "Poutine boulettes de brisket", desc: "Frites, fromage en grains, sauce et boulettes de brisket." },
      en: { name: "Brisket meatball poutine", desc: "Fries, cheese curds, gravy and brisket meatballs." } },
    { cat: "poutines", badge: null, price: 17.76,
      fr: { name: "Poutine smoked meat", desc: "Frites, fromage en grains, sauce et smoked meat." },
      en: { name: "Smoked meat poutine", desc: "Fries, cheese curds and gravy topped with smoked meat." } },
    { cat: "poutines", badge: null, price: 17.76,
      fr: { name: "Poutine bouchées de poulet", desc: "Frites, fromage en grains, sauce brune et bouchées de poulet." },
      en: { name: "Chicken bites poutine", desc: "Fries, cheese curds and brown gravy topped with chicken bites." } },

    /* Burgers */
    { cat: "burgers", badge: "hot", price: 22.50,
      fr: { name: "Burger bœuf effiloché", desc: "Bœuf effiloché fumé du Hangar, en burger." },
      en: { name: "Pulled beef burger", desc: "The Hangar's smoked pulled beef, burger-style." } },
    { cat: "burgers", badge: null, price: 19.38,
      fr: { name: "Burger smoked meat", desc: "Smoked meat du Hangar en burger." },
      en: { name: "Smoked meat burger", desc: "The Hangar's smoked meat, burger-style." } },
    { cat: "burgers", badge: null, price: 16.56,
      fr: { name: "Burger porc effiloché", desc: "Du porc effiloché à la place de la galette de bœuf." },
      en: { name: "Pulled pork burger", desc: "Pulled pork instead of a beef patty." } },

    /* Mac & cheese */
    { cat: "mac", badge: null, price: 10.32,
      fr: { name: "Mac & cheese classique", desc: "Macaroni au fromage, tout simplement." },
      en: { name: "Classic mac & cheese", desc: "Macaroni and cheese, plain and simple." } },
    { cat: "mac", badge: null, price: 13.02,
      fr: { name: "Mac & cheese porc effiloché", desc: "Garni de porc effiloché fumé." },
      en: { name: "Pulled pork mac & cheese", desc: "Topped with smoked pulled pork." } },
    { cat: "mac", badge: null, price: 12.48,
      fr: { name: "Mac & cheese boulettes de brisket", desc: "Garni de boulettes de brisket." },
      en: { name: "Brisket meatball mac & cheese", desc: "Topped with brisket meatballs." } },
    { cat: "mac", badge: null, price: 16.50,
      fr: { name: "Mac & cheese smoked meat", desc: "Garni de smoked meat." },
      en: { name: "Smoked meat mac & cheese", desc: "Topped with smoked meat." } },
    { cat: "mac", badge: null, price: 16.68,
      fr: { name: "Mac & cheese Le Carnivore", desc: "Garni d'un mélange de viandes fumées." },
      en: { name: "Carnivore mac & cheese", desc: "Topped with assorted smoked meats." } },
    { cat: "mac", badge: null, price: 16.50,
      fr: { name: "Mac & cheese bouchées de poulet", desc: "Garni de bouchées de poulet." },
      en: { name: "Chicken bites mac & cheese", desc: "Topped with chicken bites." } },
    { cat: "mac", badge: null, price: 16.56,
      fr: { name: "Mac & cheese Général Tao", desc: "Version Général Tao." },
      en: { name: "General Tao mac & cheese", desc: "General Tao style." } },

    /* Grilled cheese */
    { cat: "grilled", badge: null, price: 6.25,
      fr: { name: "Grilled cheese classique fumé", desc: "Pain grillé, fromage fondant, goût de fumée." },
      en: { name: "Classic smoked grilled cheese", desc: "Toasted bread, melted cheese, smoky flavour." } },
    { cat: "grilled", badge: null, price: 12.50,
      fr: { name: "Grilled cheese porc effiloché", desc: "Fromage fondant et porc effiloché entre deux tranches grillées." },
      en: { name: "Pulled pork grilled cheese", desc: "Melted cheese and pulled pork on grilled bread." } },

    /* À-côtés */
    { cat: "cotes", badge: null, price: 15.96,
      fr: { name: "Filets de poulet (4)", desc: "Avec sauces Master Key, mayo moutarde et mayo cajun." },
      en: { name: "Chicken fillets (4)", desc: "With Master Key, mustard mayo and Cajun mayo." } },
    { cat: "cotes", badge: null, price: 5,
      fr: { name: "Frites", desc: "Frites classiques, légèrement salées." },
      en: { name: "Fries", desc: "Classic fries, lightly salted." } },
    { cat: "cotes", badge: null, price: 6.88,
      fr: { name: "Frites sauce", desc: "Frites servies avec sauce." },
      en: { name: "Fries with gravy", desc: "Fries served with gravy." } },
    { cat: "cotes", badge: null, price: 4.99,
      fr: { name: "Pogo", desc: "Le classique de casse-croûte." },
      en: { name: "Corn dog", desc: "The snack-bar classic." } },

    /* Menu enfant */
    { cat: "enfants", badge: null, price: 3.99,
      fr: { name: "Mini grilled cheese", desc: "Format enfant." },
      en: { name: "Mini grilled cheese", desc: "Kid-sized." } },
    { cat: "enfants", badge: null, price: 7.65,
      fr: { name: "Mini grilled cheese porc", desc: "Fromage et porc effiloché, format enfant." },
      en: { name: "Mini pork grilled cheese", desc: "Cheese and pulled pork, kid-sized." } },
    { cat: "enfants", badge: null, price: 8.65,
      fr: { name: "Mini filets de poulet (2)", desc: "Deux mini filets de poulet blanc, format enfant." },
      en: { name: "Mini chicken fillets (2)", desc: "Two mini white-meat chicken fillets, kid-sized." } },
    { cat: "enfants", badge: null, price: 8.65,
      fr: { name: "Mini burger porc effiloché", desc: "Format enfant." },
      en: { name: "Mini pulled pork burger", desc: "Kid-sized." } },
    { cat: "enfants", badge: null, price: 12.64,
      fr: { name: "Mini burger bœuf effiloché", desc: "Format enfant." },
      en: { name: "Mini pulled beef burger", desc: "Kid-sized." } },

    /* Breuvages */
    { cat: "boire", badge: null, price: 2.66,
      fr: { name: "Eau", desc: "Eau plate." },
      en: { name: "Water", desc: "Still water." } },
    { cat: "boire", badge: null, price: 6.65,
      fr: { name: "Monster", desc: "Boisson énergisante." },
      en: { name: "Monster", desc: "Energy drink." } }
  ]
};
