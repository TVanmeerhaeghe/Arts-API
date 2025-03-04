﻿# Arts API

## Description

Cette application est l'API permettant de faire fonctionner le frontend de l'application ARTS trouvable ici : https://github.com/Dufi1928/Panel-Art-Front

## Tech Stack

**Server:** Node, Express

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

## Configuration de l'accès à la base de données

Pour vous connecter à la base de données, remplissez le fichier .env avec les informations suivantes :

```bash
DB_HOST=VotreDbHost
DB_USER=VotreDbUser
DB_PASSWORD=VotreMotDePasse
DB_NAME=arts_api
DB_PORT=VotrePortSiBesoin
JWT_SECRET=VotreJWTSecret
```

## Générer le JWT_SECRET

Pour générer un secret JWT, vous pouvez utiliser vous rendre sur ce site et créer votre JWT avec le nom de votre choix et l'algorithme HS256

```bash
https://www.javainuse.com/jwtgenerator
```

## Collection Postman

Dans le dossier postman, vous trouverez la collection Postman que vous pouvez importer pour tester les routes une fois l'API lancée.