**Ghostwriter Pro** est une plateforme SaaS permettant aux professionnels de générer du contenu authentique pour LinkedIn et Twitter/X en s'appuyant sur l'IA. L'application apprend le style d'écriture de l'utilisateur pour produire des posts qui sonnent naturels et personnels.

### Prérequis
- Node.js 18+ 
- npm ou yarn

### Démarrage
```bash
npm install
npm run dev
```

Ouvre [http://localhost:3000] dans ton navigateur.

### Scripts disponibles

```bash
npm run dev      # Démarre le serveur de développement
npm run build    # Compile l'application pour la production
npm run start    # Lance l'application en mode production
npm run lint     # Vérifie le code avec ESLint
```

## Architecture du projet

### Structure des dossiers

```
src/
├── app/              # Pages Next.js (App Router)
│   └── [locale]/     # Routes avec internationalisation
├── components/       # Composants React
│   ├── ui/          # Composants UI de base (shadcn/ui)
│   ├── molecules/   # Composants molécules (Atomic Design)
│   └── organisms/   # Composants organismes (Atomic Design)
├── hooks/           # Composables React (hooks personnalisés)
├── store/           # Stores Zustand (state management)
├── data/            # Données mockées (simulation API)
├── services/        # Services (génération de contenu, etc.)
├── lib/             # Utilitaires et validations
├── types/           # Types TypeScript
└── i18n/            # Configuration internationalisation
```

## Architecture & Concepts

### 1. **Stores (State Management)**

Le projet utilise **Zustand** pour la gestion d'état globale avec persistance dans `localStorage`.

**Stores disponibles :**
- **`authStore`** : Gestion de l'authentification (user, token, login/logout)
- **`postStore`** : Gestion des posts générés (variations, bibliothèque)
- **`profileStore`** : Gestion du profil utilisateur avec cache intelligent

**Fonctionnalités clés :**
- Persistance automatique dans `localStorage`
- Cache intelligent : ne recharge pas si les données sont déjà en mémoire
- Prêt pour migration vers API/BDD (remplacer les fonctions mockées)

**Exemple d'utilisation :**
```typescript
import { useAuthStore } from "@/store/authStore";

const { user, login, logout } = useAuthStore();
```

### 2. **Composables (Custom Hooks)**

Composables réutilisables pour encapsuler la logique métier :

- **`useProfile`** : Gestion du profil utilisateur avec chargement automatique
- **`useDebounce`** : Debounce de valeurs (utile pour la recherche)
- **`useSearch`** : Recherche avec debounce intégré
- **`useFilters`** : Filtres génériques réutilisables
- **`usePagination`** : Pagination complète avec navigation
- **`useSort`** : Tri de listes (strings, numbers, dates)
- **`usePostsFilters`** : Filtres spécialisés pour les posts (recherche, statut, plateforme, type)
- **`usePostsWithFilters`** : Tout-en-un (filtres + tri + pagination)

**Exemple :**
```typescript
import { usePostsFilters } from "@/hooks/usePostsFilters";

const { filters, filteredPosts, updateSearch, updateStatus } = usePostsFilters(posts);
```

### 3. **Atomic Design**

Le projet suit la méthodologie **Atomic Design** pour organiser les composants :

- **`ui/`** : Atomes (Button, Input, Card, etc.) - Composants de base
- **`molecules/`** : Molécules (SearchBar, FilterBar, StatusBadge, etc.) - Combinaisons d'atomes
- **`organisms/`** : Organismes (PostList, GenerateForm, DashboardHeader, etc.) - Sections complexes

**Avantages :**
- Réutilisabilité maximale
- Maintenance facilitée
- Scalabilité du design system

### 4. **Internationalisation (i18n)**

Le projet utilise **next-intl** pour la gestion multilingue (FR/EN).

**Configuration :**
- Langues supportées : Français (par défaut), Anglais
- Routes préfixées : `/fr/...` ou `/en/...`
- Traductions dans `/messages/fr.json` et `/messages/en.json`

**Utilisation :**
```typescript
import { useTranslations } from "next-intl";

const t = useTranslations("posts");
<h1>{t("title")}</h1>
```

**Navigation i18n :**
```typescript
import { Link } from "@/i18n/routing";
<Link href="/dashboard">Dashboard</Link>
```

### 5. **Validation de formulaires**

**React Hook Form + Zod** (équivalent de VeeValidate pour React).

- **React Hook Form** : Gestion performante des formulaires
- **Zod** : Validation TypeScript-first avec schémas
- **@hookform/resolvers** : Intégration Zod ↔ React Hook Form

**Exemple :**
```typescript
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { loginSchema } from "@/lib/validations/auth";

const form = useForm({
  resolver: zodResolver(loginSchema),
  defaultValues: { email: "", password: "" }
});
```

### 6. **Data Fetching**

Le projet utilise actuellement des **données mockées** dans `/src/data/` pour simuler une API.

**Structure actuelle :**
- `data/auth.ts` : Authentification mockée
- `data/users.ts` : Données utilisateurs
- `data/posts.ts` : Posts mockés
- `data/analytics.ts` : Analytics mockés
- `data/calendar.ts` : Événements calendrier

**Migration vers API :**
Quand tu auras une vraie API, remplace simplement les fonctions dans `/data/` par de vrais appels `fetch()` ou utilise une bibliothèque comme **React Query** pour le cache et la synchronisation.

**Exemple de migration :**
```typescript
// Avant (mocké)
export async function getCurrentUser(): Promise<User> {
  return mockCurrentUser;
}

// Après (vraie API)
export async function getCurrentUser(): Promise<User> {
  const response = await fetch('/api/user', {
    headers: { Authorization: `Bearer ${token}` }
  });
  return response.json();
}
```

## Technologies utilisées

- **Next.js 16** (App Router) - Framework React
- **TypeScript** - Typage statique
- **Tailwind CSS** - Styling
- **shadcn/ui** - Composants UI
- **Zustand** - State management
- **React Hook Form + Zod** - Validation de formulaires
- **next-intl** - Internationalisation
- **date-fns** - Manipulation de dates
- **lucide-react** - Icônes

## Fonctionnalités implémentées

- Authentification (login/register) avec validation
- Dashboard avec navigation
- Génération de contenu IA (mockée)
- Bibliothèque de posts avec filtres et recherche
- Calendrier éditorial interactif
- Profil utilisateur avec sous-pages
- Internationalisation (FR/EN)
- Stores avec persistance localStorage
- Composables réutilisables (filtres, pagination, tri)

## Fonctionnalités bonus à ajouter

### Priorité haute

1. **Mode sombre (Dark Mode)**
   - Toggle dans le header
   - Persistance de la préférence
   - Support complet Tailwind dark mode

2. **Notifications toast**
   - Remplacer les `alert()` par des toasts élégants
   - Utiliser `sonner` ou `react-hot-toast`
   - Feedback visuel pour toutes les actions

3. **Drag & Drop dans le calendrier**
   - Déplacer les posts entre dates
   - Bibliothèque : `@dnd-kit` ou `react-beautiful-dnd`

4. **Recherche avancée**
   - Filtres multiples combinables
   - Recherche par tags/thématiques
   - Historique de recherche

### 🚀 Priorité moyenne

5. **Export de posts**
   - Export PDF des posts
   - Export CSV pour analytics
   - Copie en masse

6. **Templates de posts**
   - Bibliothèque de templates
   - Création de templates personnels
   - Partage de templates

7. **Statistiques en temps réel**
   - Graphiques avec `recharts` ou `chart.js`
   - Comparaisons de périodes
   - Insights automatiques

8. **Mode hors-ligne (PWA)**
   - Service Worker
   - Cache des données
   - Synchronisation au retour en ligne

### ✨ Nice to have

9. **Éditeur de texte riche**
   - Pour éditer les posts générés
   - Formatage (gras, italique, listes)
   - Preview en temps réel

10. **Système de tags**
    - Tags personnalisés pour organiser les posts
    - Filtrage par tags
    - Nuage de tags

11. **Historique des modifications**
    - Versioning des posts
    - Restauration de versions précédentes
    - Diff visuel

12. **Collaboration**
    - Partage de posts entre utilisateurs
    - Commentaires sur les posts
    - Workflow d'approbation

## Comptes de test

Les comptes de test sont disponibles sur la page de connexion :
- **Pro** : `pro@test.com` / `password123`
- **Free** : `free@test.com` / `password123`

## Notes de développement

- Les données sont actuellement mockées dans `/src/data/`
- Les stores utilisent `localStorage` pour la persistance
- L'i18n est configuré pour FR (défaut) et EN
- Tous les composants suivent Atomic Design

BRANCO Aurélien.
