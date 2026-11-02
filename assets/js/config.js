/* ==========================================================================
   CONFIGURATION — Le Hangar Fumoir (boutique)
   Le seul fichier à modifier au quotidien : produits, prix, heures, coordonnées.

   Produit :
     price : nombre (ex. 18.71)  |  null = « En boutique »
     stock : false                = affiche « Rupture de stock »
     badge : "hot" (coup de cœur) | "limited" | null
     unit  : texte sous le prix (ex. « la livre »)
   Source des prix : lehangarfumoir.ca/menu (novembre 2026)
   ========================================================================== */

window.HANGAR = {

  contact: {
    email: "info@lehangarfumoir.ca",   // À CONFIRMER : courriel qui reçoit les demandes de traiteur
    phone: "418 831-8288"
  },

  /* Formulaire traiteur : coller ici une adresse Formspree pour l'envoi direct.
     Vide = le bouton ouvre le courriel du visiteur, déjà rempli. */
  formEndpoint: "",

  /* Heures de la boutique (0 = dimanche … 6 = samedi). null = fermé. */
  hours: {
    0: ["12:00", "17:00"],
    1: null,
    2: ["10:00", "18:00"],
    3: ["10:00", "18:00"],
    4: ["10:00", "19:00"],
    5: ["10:00", "19:00"],
    6: ["10:00", "17:00"]
  },

  categories: [
    { id: "viandes",  fr: "Viandes fumées",       en: "Smoked meats" },
    { id: "bouchees", fr: "Bouchées & partage",   en: "Bites & sharing" },
    { id: "jerky",    fr: "Jerky",                en: "Jerky" },
    { id: "plats",    fr: "Plats & accompagnements", en: "Meals & sides" },
    { id: "sauces",   fr: "Sauces & épices",      en: "Sauces & rubs" }
  ],

  menu: [
    /* ----- Viandes fumées ----- */
    { cat: "viandes", badge: "hot", price: 37,
      fr: { name: "Brisket", desc: "Poitrine de bœuf fumée longuement à l'érable. La pièce maîtresse du fumoir.", unit: "la livre" },
      en: { name: "Brisket", desc: "Beef brisket, slow-smoked over maple. The smokehouse's centrepiece.", unit: "per lb" } },
    { cat: "viandes", badge: null, price: 20.41,
      fr: { name: "Côtes levées Texan", desc: "Côtes levées de porc fumées, assaisonnement texan.", unit: "la livre" },
      en: { name: "Texan ribs", desc: "Smoked pork ribs, Texas-style rub.", unit: "per lb" } },
    { cat: "viandes", badge: null, price: 21.77,
      fr: { name: "Côtes levées Master", desc: "Côtes levées de porc fumées, recette Master.", unit: "la livre" },
      en: { name: "Master ribs", desc: "Smoked pork ribs, Master recipe.", unit: "per lb" } },
    { cat: "viandes", badge: null, price: 14.74,
      fr: { name: "Porc effiloché", desc: "Épaule de porc fumée, effilochée et prête à garnir.", unit: "la livre" },
      en: { name: "Pulled pork", desc: "Smoked pork shoulder, pulled and ready to pile on.", unit: "per lb" } },
    { cat: "viandes", badge: null, price: 15.87,
      fr: { name: "Filet de porc", desc: "Filet de porc fumé, tendre et maigre.", unit: "la livre" },
      en: { name: "Pork tenderloin", desc: "Smoked pork tenderloin, lean and tender.", unit: "per lb" } },
    { cat: "viandes", badge: null, price: 6.50,
      fr: { name: "Smoked meat de porc", desc: "Smoked meat maison, version porc." },
      en: { name: "Pork smoked meat", desc: "House smoked meat, pork version." } },
    { cat: "viandes", badge: null, price: 7,
      fr: { name: "Smoked meat de bœuf", desc: "Smoked meat maison, version bœuf." },
      en: { name: "Beef smoked meat", desc: "House smoked meat, beef version." } },
    { cat: "viandes", badge: null, price: null, stock: false,
      fr: { name: "Bacon", desc: "Bacon fumé maison." },
      en: { name: "Bacon", desc: "House-smoked bacon." } },

    /* ----- Bouchées & partage ----- */
    { cat: "bouchees", badge: "hot", price: 18,
      fr: { name: "Burnt ends", desc: "Les pointes du brisket, caramélisées en sauce.", unit: "400 g" },
      en: { name: "Burnt ends", desc: "Brisket point cubes, caramelized in sauce.", unit: "400 g" } },
    { cat: "bouchees", badge: null, price: 16,
      fr: { name: "Bouchées de brisket", desc: "Le brisket en format bouchée, parfait pour partager." },
      en: { name: "Brisket bites", desc: "Brisket in bite-size pieces, made for sharing." } },
    { cat: "bouchees", badge: null, price: 17.24,
      fr: { name: "Boulettes de brisket (2)", desc: "Boulettes maison au brisket fumé.", unit: "la livre" },
      en: { name: "Brisket meatballs (2)", desc: "House meatballs made with smoked brisket.", unit: "per lb" } },
    { cat: "bouchees", badge: null, price: 18.71,
      fr: { name: "Bouchées de poulet", desc: "Bouchées de poulet fumé.", unit: "la livre" },
      en: { name: "Chicken bites", desc: "Smoked chicken bites.", unit: "per lb" } },
    { cat: "bouchees", badge: null, price: 14,
      fr: { name: "Fondue parmesan au saumon fumé (4)", desc: "Croquettes de fondue parmesan au saumon fumé." },
      en: { name: "Smoked salmon parmesan fondue (4)", desc: "Parmesan fondue bites with smoked salmon." } },
    { cat: "bouchees", badge: null, price: 11,
      fr: { name: "Fondue parmesan cajun (4)", desc: "Croquettes de fondue parmesan, touche cajun." },
      en: { name: "Cajun parmesan fondue (4)", desc: "Parmesan fondue bites with a Cajun kick." } },

    /* ----- Jerky ----- */
    { cat: "jerky", badge: null, price: 15,
      fr: { name: "Beef jerky", desc: "Bœuf séché et fumé, à grignoter.", unit: "100 g" },
      en: { name: "Beef jerky", desc: "Smoked, dried beef for snacking.", unit: "100 g" } },
    { cat: "jerky", badge: null, price: 10,
      fr: { name: "Jerky de porc", desc: "Porc séché et fumé.", unit: "100 g" },
      en: { name: "Pork jerky", desc: "Smoked, dried pork.", unit: "100 g" } },

    /* ----- Plats & accompagnements ----- */
    { cat: "plats", badge: null, price: 10,
      fr: { name: "Mac & cheese", desc: "Macaroni au fromage, prêt à réchauffer." },
      en: { name: "Mac & cheese", desc: "Macaroni and cheese, ready to reheat." } },
    { cat: "plats", badge: null, price: 9.07,
      fr: { name: "Patates farcies", desc: "Variétés fromagée, cajun et porc effiloché, selon l'arrivage.", unit: "la livre" },
      en: { name: "Stuffed potatoes", desc: "Cheesy, Cajun and pulled pork varieties, depending on stock.", unit: "per lb" } },
    { cat: "plats", badge: null, price: 8.62,
      fr: { name: "Fèves au lard", desc: "Le classique, avec un goût de fumée.", unit: "la livre" },
      en: { name: "Baked beans", desc: "The classic, with a smoky touch.", unit: "per lb" } },
    { cat: "plats", badge: null, price: 10.58,
      fr: { name: "Chili", desc: "Petite chaleur agréable, goût de fumée bien présent.", unit: "le kg" },
      en: { name: "Chili", desc: "Pleasant gentle heat, with a clear smoky flavour.", unit: "per kg" } },
    { cat: "plats", badge: null, price: 9.98,
      fr: { name: "Sauce à spaghetti", desc: "Sauce à la viande maison. Une favorite des clients.", unit: "la livre" },
      en: { name: "Spaghetti sauce", desc: "House meat sauce. A customer favourite.", unit: "per lb" } },

    /* ----- Sauces & épices ----- */
    { cat: "sauces", badge: "hot", price: 10,
      fr: { name: "Sauce BBQ Master Key", desc: "La sauce signature du Hangar." },
      en: { name: "Master Key BBQ sauce", desc: "The Hangar's signature sauce." } },
    { cat: "sauces", badge: null, price: 11,
      fr: { name: "Sauce BBQ Liquid Gold", desc: "Sauce BBQ maison." },
      en: { name: "Liquid Gold BBQ sauce", desc: "House BBQ sauce." } },
    { cat: "sauces", badge: null, price: 12,
      fr: { name: "Sauce BBQ Deluxe", desc: "Sauce BBQ maison." },
      en: { name: "Deluxe BBQ sauce", desc: "House BBQ sauce." } },
    { cat: "sauces", badge: null, price: 10,
      fr: { name: "Épices cajun", desc: "Le mélange maison pour ton BBQ." },
      en: { name: "Cajun rub", desc: "The house blend for your grill." } },
    { cat: "sauces", badge: null, price: 10,
      fr: { name: "Épices à steak", desc: "Mélange maison à steak." },
      en: { name: "Steak spice", desc: "House steak blend." } }
  ]
};
