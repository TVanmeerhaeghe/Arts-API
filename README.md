# Arts API

## Installation des dépendances

Pour installer les dépendances nécessaires, exécutez la commande suivante :

```bash
npm install
```

## Lancer l'API

Pour démarrer l'API, utilisez la commande suivante :

```bash
npm start
```

## Configuration de la base de données

Pour vous connecter à la base de données, remplissez le fichier .env avec les informations suivantes :

```bash
DB_HOST=VotreDbHost
DB_USER=VotreDbUser
DB_PASSWORD=VotreMotDePasse
DB_NAME=arts_api
DB_PORT=
JWT_SECRET=VotreJWTSecret
```

## Générer le JWT_SECRET

Pour générer un secret JWT, vous pouvez utiliser vous rendre sur ce site et créer votre JWT avec le nom de votre choix et l'algorithme HS256

```bash
https://www.javainuse.com/jwtgenerator
```

## Importer la structure et les données

Dans le dossier dump, vous trouverez un dump de la structure et des données de l'application. Vous pouvez les importer via PhpMyAdmin ou tout autre outil de gestion de base de données.

## Collection Postman

Dans le dossier postman, vous trouverez la collection Postman que vous pouvez importer pour tester les routes une fois l'API lancée.
