export const navOptions = [
  {
    id: "home",
    label: "Accueil",
    path: "/",
  },
  {
    id: "presentation",
    label: "Qui-suis-je ?",
    path: "/presentation",
  },
  {
    id: "listing",
    label: "Mes prestations",
    path: "/product/listing/all-products",
    subItems: [
      {
        id: "product",
        label: "Produits",
        path: "/product/listing/products",
      },
      {
        id: "coaching",
        label: "Programmes",
        path: "/product/listing/coaching",
      },
      {
        id: "ebooks",
        label: "E-books",
        path: "/product/listing/ebook",
      },
    ],
  },
  {
    id: "opinions",
    label: "Mes avis",
    path: "/opinions",
  },
];

export const adminNavOptions = [
  {
    id: "adminListing",
    label: "Gérer les produits",
    path: "/admin-view/all-products",
  },
  {
    id: "adminNewProduct",
    label: "Ajouter un nouveau produit",
    path: "/admin-view/add-product",
  },
  {
    id: "AdminManageSaleCodes",
    label: "Gérer les codes promo",
    path: "/admin-view/sale-codes",
  },
  {
    id: "AdminManageOpinions",
    label: "Gérer les avis",
    path: "/admin-view/opinions",
  },
];

export const registrationFormControls = [
  {
    id: "name",
    type: "text",
    placeholder: "Entrez votre nom",
    label: "Nom",
    componentType: "input",
  },
  {
    id: "email",
    type: "email",
    placeholder: "Entrez votre email",
    label: "Email",
    componentType: "input",
  },
  {
    id: "password",
    type: "password",
    placeholder: "Entrez votre mot de passe",
    label: "Mot de passe",
    componentType: "input",
  },
];

export const loginFormControls = [
  {
    id: "email",
    type: "email",
    placeholder: "Entrez votre email",
    label: "Email",
    componentType: "input",
  },
  {
    id: "password",
    type: "password",
    placeholder: "Entrez votre mot de passe",
    label: "Mot de passe",
    componentType: "input",
  },
];
export const adminAddProductformControls = [
  {
    id: "name",
    type: "text",
    placeholder: "Enter name",
    label: "Nom",
    componentType: "input",
  },
  {
    id: "price",
    type: "number",
    placeholder: "Enter price",
    label: "Prix",
    componentType: "input",
  },
  {
    id: "description",
    type: "text",
    placeholder: "Enter description",
    label: "Description",
    componentType: "input",
  },

  {
    id: "category",
    type: "",
    placeholder: "",
    label: "Catégorie",
    componentType: "select",
    options: [
      {
        id: "mixte",
        label: "Mixte",
      },
      {
        id: "men",
        label: "Homme",
      },
      {
        id: "women",
        label: "Femme",
      },
      {
        id: "kids",
        label: "Enfant",
      },
    ],
    visibleFor: ["product"],
  },
  {
    id: "deliveryInfo",
    type: "text",
    placeholder: "Enter delivery info",
    label: "Informations de livraison",
    componentType: "input",
  },
  {
    id: "onSale",
    type: "",
    placeholder: "",
    label: "Promotion",
    componentType: "select",
    options: [
      {
        id: "yes",
        label: "Oui",
      },
      {
        id: "no",
        label: "Non",
      },
    ],
  },
  {
    id: "priceDrop",
    type: "number",
    placeholder: "Enter Price Drop",
    label: "Pourcentage de réduction",
    componentType: "input",
  },
  // Champ conditionnel pour les tailles, uniquement pour les vêtements
  {
    id: "sizes",
    type: "",
    placeholder: "",
    label: "Tailles",
    componentType: "tile", // On peut utiliser un TileComponent pour afficher les tailles
    visibleFor: ["product"], // Ce champ est visible seulement pour les vêtements
  },

  // Champ conditionnel pour la durée du coaching
  {
    id: "duration",
    type: "number",
    placeholder: "Enter coaching duration (in months)",
    label: "Durée du coaching (engagement)",
    componentType: "input",
    visibleFor: ["coaching"], // Ce champ est visible seulement pour les coaching
  },
  // Champ conditionnel pour l'URL de l'ebook
  {
    id: "ebookFile",
    type: "text",
    placeholder: "Enter Ebook URL",
    label: "Nombre de pages",
    componentType: "input",
    visibleFor: ["ebook"], // Ce champ est visible seulement pour les ebooks
  },
];

export const AvailableSizes = [
  {
    id: "xs",
    label: "XS",
  },
  {
    id: "s",
    label: "S",
  },
  {
    id: "m",
    label: "M",
  },
  {
    id: "l",
    label: "L",
  },
  {
    id: "xl",
    label: "XL",
  },
  {
    id: "xxl",
    label: "XXL",
  },
  {
    id: "xxxl",
    label: "XXXL",
  },
  {
    id: "34",
    label: "34",
  },
  {
    id: "36",
    label: "36",
  },
  {
    id: "38",
    label: "38",
  },
  {
    id: "40",
    label: "40",
  },
  {
    id: "42",
    label: "42",
  },
  {
    id: "44",
    label: "44",
  },
  {
    id: "46",
    label: "46",
  },
  {
    id: "48",
    label: "48",
  },
  {
    id: "50",
    label: "50",
  },
];

export const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
  measurementId: process.env.NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID,
};

export const firebaseStorageURL = process.env.NEXT_PUBLIC_FIREBASE_STORAGE_URL;

export const addNewAddressFormControls = [
  {
    id: "fullName",
    type: "input",
    placeholder: "Entrez votre com complet",
    label: "Nom complet",
    componentType: "input",
  },
  {
    id: "address",
    type: "input",
    placeholder: "Entrez votre adresse",
    label: "Adresse",
    componentType: "input",
  },
  {
    id: "city",
    type: "input",
    placeholder: "Entrez votre ville",
    label: "Ville",
    componentType: "input",
  },
  {
    id: "country",
    type: "input",
    placeholder: "Entrez votre pays",
    label: "Pays",
    componentType: "input",
  },
  {
    id: "postalCode",
    type: "input",
    placeholder: "Entrez votre code postal",
    label: "Code postal",
    componentType: "input",
  },
];

export const addNewSaleCodeForm = [
  {
    id: "code",
    type: "input",
    placeholder: "Entre le code ",
    label: "Code",
    componentType: "input",
  },
  {
    id: "priceDrop",
    type: "number",
    placeholder: "Entre le pourcentage de réduction",
    label: "Pourcentage de réduction",
    componentType: "input",
  },
  {
    id: "sponsor",
    type: "input",
    placeholder: "Optionnel",
    label: "Partenaire",
    componentType: "input",
  },
];
export const addNewOpinionForm = [
  {
    id: "description",
    type: "text",
    placeholder: "Entre la description ",
    label: "Description",
    componentType: "textArea",
  },
  {
    id: "signature",
    type: "input",
    placeholder: "Entre le nom de la personne",
    label: "Signature",
    componentType: "input",
  },
];
