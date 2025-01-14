# Utilisation de l'image officielle de Node.js
FROM node:18

# Installer des outils de compilation nécessaires (pour les modules natifs)
RUN apt-get update && apt-get install -y \
  build-essential \
  python3 \
  postgresql \
  postgresql-contrib \
  && rm -rf /var/lib/apt/lists/*

# Définir le répertoire de travail à /app dans le conteneur
WORKDIR /app

# Copier package.json et package-lock.json pour installer les dépendances
COPY package.json package-lock.json ./

# Installer les dépendances nécessaires
RUN npm install

# Copier l'ensemble des fichiers du backend dans le répertoire de travail
COPY . .

# Configurer PostgreSQL et créer une base de données
RUN service postgresql start && \
    su postgres -c "psql -tc \"SELECT 1 FROM pg_roles WHERE rolname='postgres';\" | grep -q 1 || psql -c \"CREATE USER postgres WITH PASSWORD 'sbamo';\"" && \
    su postgres -c "psql -tc \"SELECT 1 FROM pg_database WHERE datname='Emp';\" | grep -q 1 || psql -c \"CREATE DATABASE Emp OWNER postgres;\""

# Exposer le port utilisé par l'API (ici 3002) et PostgreSQL (5432)
EXPOSE 3002 5432

# Définir la variable d'environnement pour la base de données PostgreSQL
ENV DB_HOST=postgres
ENV DB_USER=postgres
ENV DB_PASSWORD=sbamo
ENV DB_NAME=Emp

# Commande pour démarrer PostgreSQL et l'application Node.js
CMD service postgresql start && node index.js
