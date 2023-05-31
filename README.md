# Documentation du Projet WiiQare

[![Deploy to AWS](https://github.com/WiiQare/frontend/actions/workflows/main.yml/badge.svg)](https://github.com/WiiQare/frontend/actions/workflows/main.yml)
[![Tests](https://github.com/WiiQare/frontend/actions/workflows/jest.js.yml/badge.svg?branch=main)](https://github.com/WiiQare/frontend/actions/workflows/jest.js.yml)
[![codecov](https://codecov.io/gh/WiiQare/frontend/branch/main/graph/badge.svg?token=72SLV6EFSP)](https://codecov.io/gh/WiiQare/frontend)


Ce projet Next.js est une application web développée pour une entreprise du secteur de la santé qui est WiiQare. Il vise à fournir une plateforme technologique robuste et conviviale pour répondre aux besoins spécifiques de l'industrie médicale, où les expatriés peuvent envoyer à leur membre de famille vivant dans les pays africains de l'argent pour des fins médicaux grâce à cette plateforme.

## Fonctionnalités principales

1. **Achat de Pass santé**: Cela permet aux expatriés de pouvoir envoyer de l'argent aux membres de leur famille qui ne l'utiliserons que pour les soins de santé

2. **Paiement Sécurisé**: La plateforme offre un moyen de paiement très sécurisé soit par Carte Bancaire avec Stripe soit avec la crypto Stable Coin

3. **Historique des transactions**: L'historique des transactions et aussi le moyen de faire des quickly transfert avec un système d'historisation de bénéficiaire

4. **Système de Tracking**: Tout envoie de passe santé et tracké pour savoir où il en est dans son utilisation.

5. **Contactez l'équipe WiiQare**: Possibilité d'envoyer et recevoir des messages venant la team WiiQare.

## Configuration et installation

Pour installer et exécuter localement ce projet Next.js, suivez les étapes ci-dessous :

1. Clonez le dépôt GitHub sur votre machine locale en utilisant la commande suivante :

   ```shell
   git clone https://github.com/WiiQare/frontend.git "frontend-wiiQare"
   ```

2. Accédez au répertoire du projet :

   ```shell
   cd frontend-wiiQare
   ```

3. Installez les dépendances en utilisant npm ou yarn :

   ```shell
   npm install

   ou

   yarn install
   ```

4. Configurez les variables d'environnement nécessaires, telles que les clés d'API, les URL de base, etc., dans un fichier `.env` à la racine du projet.

5. Lancer l'application en mode développement: 

    ```shell
    npm run dev
    ```
    L'application sera accessible à l'adresse suivante : `http://localhost:3000`.

## Structure du projet

La structure du projet est organisée de la manière suivante :

- `/pages`: Ce répertoire contient les différentes pages de l'application Next.js, telles que la page d'accueil, les pages de connexion, les pages de gestion des rendez-vous, etc.
- `/components`: Ce répertoire contient les composants réutilisables utilisés à travers l'application, tels que les formulaires, les cartes, les barres de navigation, etc. Dans ce dossier la structuration est celle étudié en chimie partant du plus petit élémént au plus grand: 
    - `atoms` (Pour les composant de base lié à aucune fonctionnalités des pages. Ex: Dropdown, button, modal, etc.), 
    - `molecules` (C'est la composition des atoms pour former un composant aussi réutilisable), 
    - `organisms` (Organisms c'est le composant principal d'une page).
- `/api`: Ce répertoire contient les fichiers qui définissent les points de terminaison de l'API utilisée par l'application pour communiquer avec le backend.
- `/styles`: Ce répertoire contient les fichiers CSS et les styles globaux utilisés pour la mise en forme de l'application.
- `/public`: Ce répertoire contient les fichiers statiques, tels que les images, les icônes, etc.

## Contribuer

Les contributions à ce projet sont les bienvenues. Si vous souhaitez contribuer, veuillez suivre ces étapes :

1. Fork du projet depuis GitHub.

2. Créez une branche pour votre fonctionnalité ou votre correctif.

3. Effectuez vos modifications.

4. Soumettez une demande de pull à la branche principale du projet.

Nous apprécions vos contributions pour améliorer ce projet et le rendre encore plus utile pour le secteur de la santé.

## Avertissement

Ce projet est destiné à des fins sanitaire et ne doit pas être utilisé en production sans une évaluation et une adaptation appropriées pour répondre aux exigences spécifiques de sécurité et de confidentialité des données de santé.

## License

Ce projet est distribué sous la licence GNU GENERAL PUBLIC LICENSE. Pour plus d'informations, veuillez consulter le fichier LICENSE.