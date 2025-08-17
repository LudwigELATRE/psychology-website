# Site Web de Psychologie - Psychology Website

## 📋 Description

Site web professionnel pour psychologue avec système de gestion des patients, prise de rendez-vous et interface d'administration complète. Développé avec Symfony 7.3 pour le backend et React avec TypeScript pour le frontend.

## 🚀 Fonctionnalités

### Interface Publique
- **Page d'accueil** avec présentation des services
- **Section À propos** du psychologue
- **Formulaire de contact** avec validation
- **Services proposés** et tarifs
- **Design responsive** adapté à tous les écrans

### Authentification
- **Inscription/Connexion** utilisateur classique
- **Authentification Google OAuth2** 
- **Gestion JWT** pour l'API
- **Sécurisation des routes** selon les rôles

### Espace Administration
- **Tableau de bord** avec statistiques
- **Gestion des rendez-vous** avec calendrier interactif
- **Profils patients** et historique
- **Gestion des documents**
- **Module de formations**

### Calendrier de Rendez-vous
- **Vue mensuelle/hebdomadaire/quotidienne**
- **Drag & drop** des événements
- **Types de consultation** (première, suivi, etc.)
- **Statuts** (confirmé, en attente, annulé)
- **Interface style Outlook**

## 🛠️ Technologies

### Backend
- **Symfony 7.3** - Framework PHP
- **API Platform** - API REST/GraphQL
- **Doctrine ORM** - Base de données
- **JWT Authentication** - Sécurité
- **Google OAuth2** - Authentification sociale

### Frontend
- **React 19** - Interface utilisateur
- **TypeScript** - Typage statique
- **Tailwind CSS** - Styling
- **Radix UI** - Composants d'interface
- **React Big Calendar** - Gestion du calendrier
- **React Router** - Navigation SPA

### Outils de développement
- **Webpack Encore** - Bundling des assets
- **PostCSS & Autoprefixer** - CSS
- **PHPUnit** - Tests PHP
- **Symfony WebProfiler** - Debug

## 📦 Installation

### Prérequis
- PHP 8.2+
- Node.js 18+
- Composer
- MySQL/PostgreSQL (ou SQLite pour le développement)

### 1. Cloner le projet
```bash
git clone <repository-url>
cd psychology-website
```

### 2. Installer les dépendances PHP
```bash
composer install
```

### 3. Installer les dépendances Node.js
```bash
npm install
```

### 4. Configuration de l'environnement
```bash
cp .env .env.local
# Éditer .env.local avec vos paramètres
```

Variables d'environnement importantes :
```env
DATABASE_URL="sqlite:///%kernel.project_dir%/var/data.db"
JWT_SECRET_KEY=%kernel.project_dir%/config/jwt/private.pem
JWT_PUBLIC_KEY=%kernel.project_dir%/config/jwt/public.pem
JWT_PASSPHRASE=your_passphrase
GOOGLE_OAUTH_CLIENT_ID=your_google_client_id
GOOGLE_OAUTH_CLIENT_SECRET=your_google_client_secret
```

### 5. Générer les clés JWT
```bash
php bin/console lexik:jwt:generate-keypair
```

### 6. Créer la base de données
```bash
php bin/console doctrine:database:create
php bin/console doctrine:migrations:migrate
```

## 🚀 Lancement du projet

### Mode développement

1. **Démarrer le serveur Symfony :**
```bash
symfony server:start
# ou
php -S localhost:8000 -t public/
```

2. **Compiler les assets en mode développement :**
```bash
npm run dev
# ou pour le mode watch
npm run watch
```

3. **Accéder à l'application :**
- Frontend : `http://localhost:8000`
- API : `http://localhost:8000/api`
- Admin : `http://localhost:8000/admin`

### Mode production

1. **Optimiser l'environnement :**
```bash
composer install --no-dev --optimize-autoloader
APP_ENV=prod composer dump-env prod
```

2. **Compiler les assets pour la production :**
```bash
npm run build
```

3. **Vider le cache :**
```bash
php bin/console cache:clear --env=prod
```

## 🗂️ Structure du projet

```
psychology-website/
├── assets/                    # Assets frontend
│   ├── react/                # Composants React
│   │   ├── components/       # Composants réutilisables
│   │   ├── pages/           # Pages de l'application
│   │   ├── contexts/        # Context API React
│   │   └── styles/          # Feuilles de style CSS
│   └── app.js               # Point d'entrée JS
├── config/                   # Configuration Symfony
├── migrations/              # Migrations de base de données
├── public/                  # Dossier public (assets compilés)
├── src/                     # Code source PHP
│   ├── Controller/          # Contrôleurs
│   ├── Entity/             # Entités Doctrine
│   ├── Repository/         # Repositories
│   └── Security/           # Sécurité et authentification
├── templates/              # Templates Twig
└── tests/                  # Tests PHPUnit
```

## 🔧 Commandes utiles

### Symfony
```bash
# Créer une nouvelle entité
php bin/console make:entity

# Générer une migration
php bin/console make:migration

# Exécuter les migrations
php bin/console doctrine:migrations:migrate

# Vider le cache
php bin/console cache:clear

# Lister les routes
php bin/console debug:router
```

### Frontend
```bash
# Mode développement avec watch
npm run watch

# Build de production
npm run build

# Serveur de développement
npm run dev-server
```

## 🧪 Tests

### Tests PHP
```bash
php bin/phpunit
```

### Linting et formatage
```bash
# Si configuré dans le projet
npm run lint
npm run format
```

## 📚 Documentation API

Une fois le projet lancé, la documentation de l'API est disponible à :
- **OpenAPI/Swagger** : `http://localhost:8000/api`
- **GraphiQL** : `http://localhost:8000/api/graphql`

## 🔒 Sécurité

- **Authentification JWT** pour l'API
- **CSRF Protection** pour les formulaires
- **Validation** des données côté client et serveur
- **Sanitisation** des entrées utilisateur
- **CORS** configuré pour l'API

## 🌐 Déploiement

### Variables d'environnement de production
```env
APP_ENV=prod
APP_DEBUG=false
DATABASE_URL="mysql://user:password@host:port/database"
MAILER_DSN="smtp://user:password@host:port"
```

### Optimisations recommandées
- Activer OPcache PHP
- Configurer un serveur web (Apache/Nginx)
- Utiliser un cache Redis/Memcached
- Optimiser les images et assets

## 📝 Licence

Ce projet est sous licence propriétaire. Tous droits réservés.

## 👥 Support

Pour toute question ou problème, contactez l'équipe de développement.

---

**Version :** 1.0.0  
**Dernière mise à jour :** Août 2025