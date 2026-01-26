# Structure Atomic Design

Ce projet suit la méthodologie **Atomic Design** pour organiser les composants React.

## 📁 Structure

```
components/
├── ui/                    # Atomes - Composants UI de base
│   ├── button.tsx
│   ├── input.tsx
│   ├── card.tsx
│   └── ...
├── molecules/             # Molécules - Combinaisons d'atomes
│   ├── SearchBar/
│   ├── StatusBadge/
│   ├── PlatformIcon/
│   ├── PostActionsMenu/
│   ├── PlatformSelector/
│   ├── PostTypeSelector/
│   ├── VariationCard/
│   └── FilterBar/
└── organisms/             # Organismes - Combinaisons de molécules
    ├── PageHeader/
    ├── PostCard/
    ├── PostList/
    ├── GenerateForm/
    ├── VariationsList/
    ├── DashboardHeader/
    └── DashboardSidebar/
```

## 🎯 Niveaux

### Atomes (`ui/`)
Composants UI de base, réutilisables et indépendants. Généralement fournis par shadcn/ui.

**Exemples :** `Button`, `Input`, `Card`, `Label`, `Select`

### Molécules (`molecules/`)
Combinaisons simples d'atomes qui forment des composants fonctionnels réutilisables.

**Exemples :**
- `SearchBar` : Input + icône de recherche
- `StatusBadge` : Badge avec couleur selon le statut
- `PlatformSelector` : Boutons pour sélectionner une plateforme
- `VariationCard` : Card complète pour une variation de post

### Organismes (`organisms/`)
Combinaisons complexes de molécules et d'atomes qui forment des sections complètes de l'interface.

**Exemples :**
- `PostCard` : Card complète d'un post avec actions
- `PostList` : Liste de PostCard avec gestion du vide
- `GenerateForm` : Formulaire complet de génération
- `DashboardSidebar` : Sidebar complète avec navigation

## 📦 Imports

Utilisez les fichiers `index.ts` pour importer facilement :

```tsx
// Molécules
import { SearchBar, StatusBadge, PlatformSelector } from "@/components/molecules";

// Organismes
import { PageHeader, PostList, GenerateForm } from "@/components/organisms";
```

## 🔄 Règles

1. **Atomes** : Ne doivent dépendre que d'autres atomes ou de librairies externes
2. **Molécules** : Peuvent utiliser des atomes et d'autres molécules
3. **Organismes** : Peuvent utiliser atomes, molécules et autres organismes
4. **Pages** : Utilisent les organismes pour composer l'interface complète

## ✅ Avantages

- **Réutilisabilité** : Composants facilement réutilisables
- **Maintenabilité** : Structure claire et organisée
- **Testabilité** : Composants isolés et testables
- **Scalabilité** : Facile d'ajouter de nouveaux composants
- **Collaboration** : Structure claire pour les équipes
