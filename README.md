# Projet d'application Web pour Coach Sportif

## Description

Ce projet consiste en la création d'une application web pour un coach sportif souhaitant vendre des services de coaching en ligne ainsi que divers produits physiques. L'application est en cours de développement et vise à fournir une plateforme fonctionnelle pour gérer à la fois les aspects commerciaux (produits, services) et les interactions avec les clients. 

### Fonctionnalités principales :
- **Page d'accueil statique** : Présentation des services et du coach.
- **Pages dynamiques** : Présentation des produits et témoignages clients.
- **Authentification et gestion des utilisateurs** : Inscription, connexion, visualisation de l'état des commandes.
- **Paiement en ligne sécurisé** : Intégration de Stripe pour le paiement des services de coaching et des produits.
- **Catalogue de produits** : Possibilité de consulter, ajouter au panier, et acheter des produits physiques.
- **Fonctions administrateur** : L'application étant destinée à un non-développeur, l'application comporte une vue utilisateur pour gérer directement les produits, les commandes, codes de réduction...

## Technologies utilisées

- **Frontend** : 
  - React
  - Next.js (framework React pour SSR et SSG)
- **Backend** : 
  - Next.js API Routes  (pour créer des endpoints côté serveur)
  - Mongoose (pour la gestion des données avec MongoDB)

- **Stockage** : 
  - MongoDB (pour stocker les produits, commandes et utilisateurs)
  - FireBase (pour stocker les images de produits)
- **Paiement** : 
  - Stripe (pour la gestion des paiements en ligne)
- **Sécurisation** : 
  - Authentification par JWT (JSON Web Tokens)
  - Protéger les API avec des mécanismes d'authentification

## Fonctionalités en cours de développement
- **Design de l'application** : Le design se limite à une présentation visuelle minimale, en attendant la personnalisation complète des styles pour répondre à la chartre graphique.
- **Ajout plugin mondial relay** :  Pour la gestion des expéditions des produits physiques.
- **Sécurisation** : Renforcement de la sécurité, notamment pour l'accès au compte

## Installation et Configuration

Actuellement, les clés API Stripe ont été retirées et l'accès à la base de données est restreint à un usage privé. Ce projet est donc limité à la visualisation de la structure du code et de l'architecture générale, sans possibilité de tester la fonctionnalité complète. Le projet est toute fois adaptable si vous avez vos propres accès Stripe, MongoDB et FireBase.


### Documentation pour utilisation future

## Prérequis

Avant de commencer, assurez-vous d'avoir installé les outils suivants sur votre machine :
- **Node.js** (version 16 ou supérieure) : [Télécharger Node.js](https://nodejs.org/)
- **npm** (généralement installé avec Node.js)

Vérifiez les installations avec ces commandes :
```bash
node -v npm -v
```

## Lancer le Projet en Développement

1. Installez les dépendances du projet via **npm** :
```bash
npm install
```

Cela va installer toutes les dépendances nécessaires au projet, listées dans le fichier `package.json`.

2. Configurer vos clés API et variables d'environnement
Avant de pouvoir tester l'application, vous devez ajouter vos clés API Stripe et MongoDB dans un fichier .env
Voici un exemple de structure pour ce fichier :
```text
STRIPE_PUBLIC_KEY_TEST=Votre_Clef_Stripe_Public
STRIPE_SECRET_KEY_TEST=Votre_Clef_Stripe_Secrète

MONGODB_URI=Votre_URL_MongoDB

JWT_SECRET=Votre_Clé_Sécrète_JWT

FIREBASE_API_KEY=Votre_Clé_Firebase_API
FIREBASE_AUTH_DOMAIN=Votre_Domaine_Auth_Firebase
FIREBASE_PROJECT_ID=Votre_ID_Projet_Firebase
FIREBASE_STORAGE_BUCKET=Votre_Bucket_Stockage_Firebase
FIREBASE_MESSAGING_SENDER_ID=Votre_ID_Messagerie_Firebase
FIREBASE_APP_ID=Votre_ID_App_Firebase
FIREBASE_MEASUREMENT_ID=Votre_ID_Measurement
FIREBASE_STORAGE_URL=Votre_URL_Storage
```

2. Une fois que les dépendances sont installées et les variables d'environnements configurée, vous pouvez lancer le serveur de développement de Nextjs :

```bash
npm run dev
```

Cela démarre un serveur local, généralement accessible à l'adresse `http://localhost:3000` dans votre navigateur. L'application sera automatiquement mise à jour si vous effectuez des modifications dans le code source.


