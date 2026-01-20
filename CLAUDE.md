# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

Psychology website built with Symfony 7.3 backend and React 19 frontend. Uses API Platform for REST API, JWT authentication, and Google OAuth.

## Commands

### Development
```bash
# Start Symfony server
symfony server:start

# Start Webpack dev server (for React hot reload)
yarn dev-server

# Build frontend assets
yarn build          # production
yarn dev            # development
yarn watch          # development with watch
```

### Database
```bash
# Run migrations
php bin/console doctrine:migrations:migrate

# Create migration after entity changes
php bin/console make:migration
```

### Cache
```bash
php bin/console cache:clear
```

### Testing
```bash
php bin/phpunit
```

## Architecture

### Backend (Symfony)

- **API Platform** exposes entities as REST resources at `/api`
- **JWT Authentication** via Lexik bundle - stateless API firewall
- **Google OAuth** via KnpUOAuth2ClientBundle for social login
- Entities use PHP 8 attributes for ORM mapping and API Platform configuration
- Access control defined in `config/packages/security.yaml`

Key API endpoints:
- `POST /api/login` - JWT authentication
- `POST /api/register` - User registration
- `GET /api/me` - Current user info (requires JWT)
- `/api/contacts` - Contact form submissions
- `/connect/google` - Google OAuth flow

### Frontend (React)

- React app lives in `assets/react/`
- Entry point: `assets/react/app.tsx`
- Bundled via Webpack Encore with TypeScript
- Path alias `@` maps to `assets/react/`
- Uses Tailwind CSS with shadcn/ui components
- shadcn/ui components in `assets/react/components/ui/`

**Routing**: Client-side routing based on `window.location.pathname` in app.tsx. All React routes (`/app`, `/profile`, `/appointments`, `/admin`) are caught by `ReactController` and serve the same Twig template.

**Authentication**: `AuthContext` manages JWT tokens stored in localStorage. Handles both standard login and Google OAuth callback.

### API Platform Entity Configuration

Entities like `User` and `Contact` use attributes to define:
- Operations (Get, Post, Put, Patch)
- Security expressions per operation
- Serialization groups (`user:read`, `user:write`)

Example pattern from `User.php`:
```php
#[ApiResource(
    operations: [
        new Get(security: "is_granted('ROLE_ADMIN') or object == user"),
        new Post(security: "true"),
    ],
    normalizationContext: ['groups' => ['user:read']],
    denormalizationContext: ['groups' => ['user:write']]
)]
```

## Key Configuration Files

- `config/packages/security.yaml` - Firewalls, access control, JWT config
- `config/packages/api_platform.yaml` - API Platform settings
- `webpack.config.js` - Encore config with React, TypeScript, PostCSS
- `tailwind.config.js` - Tailwind with custom theme tokens (HSL CSS variables)
