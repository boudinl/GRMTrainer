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
    label: "Tous les services",
    path: "/product/listing/all-products",
    subItems: [
      {
        id : "product",
        label : "Produits",
        path: "/product/listing/products"
      },
      {
        id: "coaching",
        label: "Coachings",
        path: "/product/listing/coaching",
      },
      {
        id: "ebooks",
        label: "E-books",
        path: "/product/listing/ebook",
      }
    ]
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
    id: 'name',
    type: 'text',
    placeholder: 'Entrez votre nom',
    label: 'Nom',
    componentType: 'input'
  },
  {
    id: 'email',
    type: 'email',
    placeholder: 'Entrez votre email',
    label: 'Email',
    componentType: 'input'
  },
  {
    id: 'password',
    type: 'password',
    placeholder: 'Entrez votre mot de passe',
    label: 'Mot de passe',
    componentType: 'input'
  },
  {
    id: 'role',
    type: '',
    placeholder: '',
    label: 'Role',
    componentType: 'select',
    options: [
      {
        id: 'admin',
        label: 'Admin',
      },
      {
        id: 'customer',
        label: 'Client',
      }
    ]
  },
];

export const loginFormControls = [
  {
    id: 'email',
    type: 'email',
    placeholder: 'Entrez votre email',
    label: 'Email',
    componentType: 'input'
  },
  {
    id: 'password',
    type: 'password',
    placeholder: 'Entrez votre mot de passe',
    label: 'Mot de passe',
    componentType: 'input'
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
    visibleFor: ["product"]
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
    componentType: "tile",  // On peut utiliser un TileComponent pour afficher les tailles
    visibleFor: ["product"], // Ce champ est visible seulement pour les vêtements
  },
  // Champ conditionnel pour la durée du coaching
  {
    id: "duration",
    type: "number",
    placeholder: "Enter coaching duration (in months)",
    label: "Durée du coaching (engagement)",
    componentType: "input",
    visibleFor: ["coaching"],  // Ce champ est visible seulement pour les coaching
  },
  // Champ conditionnel pour l'URL de l'ebook
  {
    id: "ebookFile",
    type: "text",
    placeholder: "Enter Ebook URL",
    label: "Ebook URL",
    componentType: "input",
    visibleFor: ["ebook"],  // Ce champ est visible seulement pour les ebooks
  },
];

// export const adminAddProductformControls = [
//   {
//     id: "name",
//     type: "text",
//     placeholder: "Enter name",
//     label: "Name",
//     componentType: "input",
//   },
//   {
//     id: "price",
//     type: "number",
//     placeholder: "Enter price",
//     label: "Price",
//     componentType: "input",
//   },
//   {
//     id: "description",
//     type: "text",
//     placeholder: "Enter description",
//     label: "Description",
//     componentType: "input",
//   },
//   {
//     id: "category",
//     type: "",
//     placeholder: "",
//     label: "Category",
//     componentType: "select",
//     options: [
//       {
//         id: "men",
//         label: "Men",
//       },
//       {
//         id: "women",
//         label: "Women",
//       },
//       {
//         id: "kids",
//         label: "Kids",
//       },
//     ],
//   },
//   {
//     id: "deliveryInfo",
//     type: "text",
//     placeholder: "Enter deliveryInfo",
//     label: "Delivery Info",
//     componentType: "input",
//   },
//   {
//     id: "onSale",
//     type: "",
//     placeholder: "",
//     label: "On Sale",
//     componentType: "select",
//     options: [
//       {
//         id: "yes",
//         label: "Yes",
//       },
//       {
//         id: "no",
//         label: "No",
//       },
//     ],
//   },
//   {
//     id: "priceDrop",
//     type: "number",
//     placeholder: "Enter Price Drop",
//     label: "Price Drop",
//     componentType: "input",
//   },
// ];

export const AvailableSizes = [
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
];

export const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
  measurementId: process.env.NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID
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
]