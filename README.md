
# 🎯 Premunia CRM - Plateforme Complète Mutuelle Santé Seniors

## 🌟 Vue d'ensemble

Premunia CRM est une plateforme spécialement conçue pour optimiser le cycle de vente des courtiers spécialisés en mutuelle santé pour seniors. Le système s'articule autour d'une gestion multi-rôles sophistiquée, d'un moteur d'automatisation marketing puissant pour la relance ciblée, de tableaux de bord de performance avancés, et d'une intégration native avec le comparateur d'offres Oggo Data.

## 🚀 Fonctionnalités Principales

### 🔐 Gestion Multi-Rôles
- **Admin** : Accès complet, gestion utilisateurs, marketing automation, analytics avancés
- **Gestionnaire** : Supervision d'équipe, rapports, analytics
- **Commercial** : Gestion contacts/opportunités, rapports personnels, comparateur intégré

### 📊 Modules Complets
- **Dashboard Intelligent** - Métriques en temps réel, graphiques interactifs
- **Gestion Prospects** - CRM avancé avec scoring et segmentation seniors
- **Pipeline Opportunités** - Suivi visuel des ventes
- **Marketing Automation** - Campagnes email spécialisées seniors, nurturing, analytics
- **Reporting Avancé** - Tableaux de bord personnalisés par rôle
- **Comparateur Oggo** - Intégration native pour comparaison directe des offres

### 🎨 Design & UX Premium
- Interface moderne avec gradients et animations
- Responsive design pour tous les écrans
- Navigation contextuelle selon le rôle
- Composants réutilisables et modulaires

### ⚡ Fonctionnalités Techniques
- Authentification sécurisée avec gestion des rôles
- Base de données Supabase intégrée
- Hooks personnalisés pour la gestion d'état
- TypeScript pour la sécurité des types
- Architecture modulaire et scalable

## 🔧 Technologies Utilisées

### Frontend
- **React 18** avec TypeScript
- **Tailwind CSS** pour le styling
- **Shadcn/UI** pour les composants
- **Lucide React** pour les icônes
- **Recharts** pour les graphiques

### Backend & Base de Données
- **Supabase** pour l'authentification et la base de données
- **PostgreSQL** avec Row Level Security (RLS)
- **API REST** avec hooks personnalisés

### Intégrations
- **Oggo Data** - Comparateur d'offres mutuelle santé
- **Marketing Automation** - Templates seniors personnalisés
- **Import de données** - Excel, HubSpot, Google Sheets

## 📁 Structure du Projet

```
premunia-crm/
├── components/
│   ├── Dashboard/
│   │   └── AdminDashboard.tsx          # Dashboard admin complet
│   ├── Layout/
│   │   └── PremuniaLayout.tsx          # Layout principal multi-rôles
│   ├── Marketing/
│   │   └── AutomationEngine.tsx        # Moteur automation seniors
│   ├── Prospects/
│   │   ├── ProspectsWithComparator.tsx # Gestion prospects + comparateur
│   │   └── OggoIntegration.tsx         # Intégration Oggo Data
│   └── Reports/
│       └── AdvancedReporting.tsx       # Reporting commercial avancé
├── hooks/
│   └── useSupabase.ts                  # Hooks personnalisés Supabase
├── lib/
│   └── supabase/
│       ├── enhanced-client.ts          # Client Supabase étendu
│       ├── types.ts                    # Types TypeScript
│       └── enhanced-database.sql       # Schéma DB complet
└── src/
    └── pages/
        └── Index.tsx                   # Point d'entrée principal
```

## 🚀 Installation et Configuration

### 1. Prérequis
```bash
Node.js 18+
npm ou yarn
Compte Supabase
```

### 2. Installation
```bash
# Cloner le repository
git clone https://github.com/your-org/premunia-crm.git

# Installer les dépendances
cd premunia-crm
npm install

# Configuration Supabase
cp .env.example .env.local
```

### 3. Configuration Supabase
```bash
# Dans .env.local
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_anon_key
```

### 4. Base de Données
```sql
-- Exécuter le script dans Supabase SQL Editor
-- Fichier: lib/supabase/enhanced-database.sql
```

### 5. Démarrage
```bash
npm run dev
```

## 📊 Fonctionnalités Détaillées

### 🎯 Marketing Automation Seniors
- **Templates spécialisés** : Contenus adaptés aux seniors (65+ ans)
- **Séquences intelligentes** : Nurturing personnalisé selon l'âge et besoins
- **Scoring automatique** : Algorithme de qualification des prospects seniors
- **Analytics avancés** : Taux d'ouverture, conversion, ROI par segment

### 📈 Reporting Commercial
- **Métriques temps réel** : CA, conversions, objectifs
- **Performance par commercial** : Comparaisons, évolutions, KPIs
- **Analyse par segments** : Focus sur seniors Premium/Standard
- **Prédictions IA** : Projections basées sur les tendances

### 🔄 Intégration Oggo Data
- **Comparateur intégré** : Frame directement dans les fiches prospects
- **Recommandations IA** : Offres personnalisées selon profil senior
- **Analyse concurrentielle** : Comparaison temps réel des offres
- **Génération de propositions** : Export automatique des meilleures offres

### 👥 Gestion Prospects Seniors
- **Segmentation automatique** : Senior Premium, Senior Standard
- **Scoring IA** : Algorithme prenant en compte âge, budget, santé, urgence
- **Suivi santé** : Problématiques spécifiques aux seniors
- **Pipeline visuel** : Étapes adaptées au cycle de vente mutuelle

## 🔐 Sécurité et Rôles

### Niveaux d'Accès
- **Admin** : CRUD complet, automation, objectifs, imports
- **Manager** : Supervision équipe, rapports, analytics (lecture seule)
- **Commercial** : Prospects assignés, comparateur, rapports personnels

### Sécurité
- **Row Level Security (RLS)** : Isolation des données par rôle
- **Authentification JWT** : Via Supabase Auth
- **Policies granulaires** : Contrôle d'accès au niveau table

## 📊 Métriques et KPIs

### KPIs Globaux
- **Chiffre d'affaires** : Total, par commercial, par segment
- **Taux de conversion** : Global et par tranche d'âge senior
- **Score moyen prospects** : Qualité du pipeline
- **ROI automation** : Performance des campagnes seniors

### Métriques Seniors
- **Conversions 60+** : Focus segment principal
- **Ticket moyen senior** : Valeur des contrats
- **Satisfaction clients** : Feedback post-vente
- **Délai de conversion** : Cycle de vente seniors

## 🔗 Intégrations

### Oggo Data
```javascript
// Intégration native dans les fiches prospects
<div id="oggodata-icomparator-health" style="width:100%;height:600px;"></div>
<script src="https://cks.oggo-data.net/icomparator/health.js"></script>
```

### Sources de Données
- **Excel** : Import massif prospects
- **HubSpot API** : Synchronisation CRM
- **Google Sheets** : Import collaboratif

## 🚀 Déploiement

### Production
```bash
# Build de production
npm run build

# Déploiement
npm run deploy
```

### Variables d'Environnement
```bash
NEXT_PUBLIC_SUPABASE_URL=
NEXT_PUBLIC_SUPABASE_ANON_KEY=
NEXT_PUBLIC_OGGO_API_KEY=
NEXT_PUBLIC_ENVIRONMENT=production
```

## 📚 Documentation Technique

### Architecture
- **Frontend** : React 18 + TypeScript + Tailwind
- **Backend** : Supabase (PostgreSQL + Auth + Realtime)
- **State Management** : Custom hooks + Context
- **Styling** : Tailwind CSS + Shadcn/UI

### Performance
- **Lazy Loading** : Composants et routes
- **Optimized Queries** : Index DB optimisés pour seniors
- **Caching** : React Query pour les API calls
- **Responsive** : Mobile-first design

## 🤝 Contribution

### Développement
```bash
# Fork du projet
# Créer une branche feature
git checkout -b feature/nouvelle-fonctionnalite

# Commit et push
git commit -m "Ajout fonctionnalité X"
git push origin feature/nouvelle-fonctionnalite

# Créer une Pull Request
```

### Standards
- **TypeScript** strict mode
- **ESLint** + Prettier
- **Tests** unitaires Jest
- **Documentation** inline JSDoc

## 📞 Support

### Contact
- **Email** : support@premunia.fr
- **Documentation** : docs.premunia.fr
- **Issues** : GitHub Issues

### Licence
MIT License - Voir [LICENSE.md](LICENSE.md)

---

**Premunia CRM** - *La solution CRM nouvelle génération pour courtiers en mutuelle santé seniors* 🎯
