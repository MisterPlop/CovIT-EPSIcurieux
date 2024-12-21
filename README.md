# CovIT-EPSIcurieux Documentation

## Table des matières

1. [Introduction](#introduction)  
2. [Structure du projet](#structure-du-projet)  
3. [Docker](#docker)  
4. [Commandes utiles](#commandes-utiles)  

---

## Introduction

Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus feugiat risus sit amet magna placerat condimentum.

---

## Structure du projet

La structure des dossiers du projet est la suivante :
```plaintext
CovIT-EPSIcurieux/
│
├── docker-compose.yml
├── volumes/
│   ├── postgre/
│   ├── grafana/
│   └── common/
│
├── backend/
│   └── (fichiers du backend Node.js)
│
└── frontend/
    └── build/
        └── (fichiers du frontend React après build)
```
Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus feugiat risus sit amet magna placerat condimentum.
Docker
Description des services

Ce projet utilise Docker Compose pour orchestrer plusieurs services :

    PostgreSQL
        Base de données PostgreSQL avec persistance des données.
        Volume : ./volumes/postgre

    Backend Node.js
        Serveur backend en Node.js.
        Monte le code source depuis ./backend.
        Partage le volume ./volumes/common avec les autres services.

    Frontend React (Apache)
        Serveur Apache pour héberger le frontend React.
        Monte le dossier ./frontend/build pour servir les fichiers statiques.
        Partage le volume ./volumes/common.

    Grafana
        Serveur Grafana pour visualisation et monitoring.
        Volume : ./volumes/grafana

Commande pour lancer le projet

Pour lancer tous les services avec Docker Compose, exécute :

docker compose up -d

Commandes utiles

    Arrêter les services :

docker compose down

Voir les logs :

docker compose logs -f

Liste des conteneurs :

    docker ps

Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus feugiat risus sit amet magna placerat condimentum.
