# Étape 1 : Construction de l'application Angular
FROM node:18 AS build

# Définir le répertoire de travail
WORKDIR /app

# Copier les fichiers package.json et package-lock.json
COPY package*.json ./

# Installer les dépendances
RUN npm install

# Copier le reste des fichiers
COPY . .

# Construire l'application Angular pour la production
RUN npm run build --prod

# Étape 2 : Servir l'application avec Nginx
FROM nginx:alpine

# Copier les fichiers construits dans le répertoire d'index de Nginx
COPY --from=build /app/dist/emp-front /usr/share/nginx/html

# Exposer le port 4200 pour le frontend
EXPOSE 4200

# Démarrer Nginx
CMD ["nginx", "-g", "daemon off;"]
