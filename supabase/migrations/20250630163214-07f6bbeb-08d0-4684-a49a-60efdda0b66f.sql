
-- Réinitialisation complète de la base de données
DROP TABLE IF EXISTS workflows CASCADE;
DROP TABLE IF EXISTS tickets CASCADE;
DROP TABLE IF EXISTS taches CASCADE;
DROP TABLE IF EXISTS propositions CASCADE;
DROP TABLE IF EXISTS contrats CASCADE;
DROP TABLE IF EXISTS contacts CASCADE;
DROP TABLE IF EXISTS campagnes CASCADE;
DROP TABLE IF EXISTS objectifs CASCADE;
DROP TABLE IF EXISTS users CASCADE;
DROP TABLE IF EXISTS roles CASCADE;
DROP TABLE IF EXISTS equipes CASCADE;

-- Extension pour UUID
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Table des rôles
CREATE TABLE roles (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    nom TEXT NOT NULL UNIQUE,
    permissions JSONB DEFAULT '{}',
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Table des équipes
CREATE TABLE equipes (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    nom TEXT NOT NULL,
    manager_id UUID,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Table des utilisateurs (compatible avec Supabase Auth)
CREATE TABLE users (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    email TEXT NOT NULL UNIQUE,
    nom_complet TEXT NOT NULL,
    role_id UUID REFERENCES roles(id),
    equipe_id UUID REFERENCES equipes(id),
    statut TEXT DEFAULT 'actif' CHECK (statut IN ('actif', 'inactif')),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Table des contacts/prospects
CREATE TABLE contacts (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    nom TEXT NOT NULL,
    prenom TEXT NOT NULL,
    email TEXT,
    telephone TEXT,
    date_naissance DATE,
    statut_lead TEXT DEFAULT 'Nouveau' CHECK (statut_lead IN ('Nouveau', 'Qualifié', 'En cours', 'Converti', 'Perdu')),
    score INTEGER DEFAULT 0 CHECK (score >= 0 AND score <= 100),
    source TEXT,
    collaborateur_en_charge UUID REFERENCES users(id),
    notes TEXT,
    tags TEXT[],
    derniere_relance_envoyee TEXT DEFAULT 'Aucune',
    date_derniere_relance TIMESTAMP WITH TIME ZONE,
    date_dernier_statut TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Table des campagnes marketing
CREATE TABLE campagnes (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    nom TEXT NOT NULL,
    description TEXT,
    type TEXT NOT NULL,
    statut TEXT DEFAULT 'brouillon' CHECK (statut IN ('brouillon', 'actif', 'pause', 'termine')),
    declencheur JSONB DEFAULT '{}',
    etapes JSONB DEFAULT '[]',
    date_debut TIMESTAMP WITH TIME ZONE,
    date_fin TIMESTAMP WITH TIME ZONE,
    cree_par UUID REFERENCES users(id),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Table des tâches
CREATE TABLE taches (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    titre TEXT NOT NULL,
    description TEXT,
    statut TEXT DEFAULT 'a_faire' CHECK (statut IN ('a_faire', 'en_cours', 'termine', 'annule')),
    priorite TEXT DEFAULT 'normale' CHECK (priorite IN ('basse', 'normale', 'haute', 'urgente')),
    date_echeance TIMESTAMP WITH TIME ZONE,
    date_completion TIMESTAMP WITH TIME ZONE,
    assigne_a UUID REFERENCES users(id),
    cree_par UUID REFERENCES users(id),
    contact_id UUID REFERENCES contacts(id),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Insertion des données de test
INSERT INTO roles (id, nom, permissions) VALUES
    ('11111111-1111-1111-1111-111111111111', 'admin', '{"all": true}'),
    ('22222222-2222-2222-2222-222222222222', 'gestionnaire', '{"manage_team": true, "view_reports": true}'),
    ('33333333-3333-3333-3333-333333333333', 'commercial', '{"manage_prospects": true, "create_tasks": true}');

INSERT INTO equipes (id, nom) VALUES
    ('eeeeeeee-eeee-eeee-eeee-eeeeeeeeeeee', 'Équipe Commerciale'),
    ('ffffffff-ffff-ffff-ffff-ffffffffffff', 'Équipe Support');

-- Utilisateur admin de test
INSERT INTO users (id, email, nom_complet, role_id, statut) VALUES
    ('aaaaaaaa-aaaa-aaaa-aaaa-aaaaaaaaaaaa', 'admin@premunia.fr', 'Administrateur Premunia', '11111111-1111-1111-1111-111111111111', 'actif'),
    ('bbbbbbbb-bbbb-bbbb-bbbb-bbbbbbbbbbbb', 'manager@premunia.fr', 'Manager Commercial', '22222222-2222-2222-2222-222222222222', 'actif'),
    ('cccccccc-cccc-cccc-cccc-cccccccccccc', 'commercial@premunia.fr', 'Jean Dupont', '33333333-3333-3333-3333-333333333333', 'actif');

-- Quelques contacts de test
INSERT INTO contacts (nom, prenom, email, telephone, statut_lead, score, collaborateur_en_charge) VALUES
    ('Durand', 'Pierre', 'pierre.durand@email.com', '0123456789', 'Qualifié', 75, 'cccccccc-cccc-cccc-cccc-cccccccccccc'),
    ('Martin', 'Sophie', 'sophie.martin@email.com', '0123456790', 'En cours', 85, 'cccccccc-cccc-cccc-cccc-cccccccccccc'),
    ('Bernard', 'Michel', 'michel.bernard@email.com', '0123456791', 'Nouveau', 45, 'cccccccc-cccc-cccc-cccc-cccccccccccc');

-- Campagne de test
INSERT INTO campagnes (nom, description, type, statut, cree_par) VALUES
    ('Campagne Seniors 2024', 'Campagne de prospection pour les seniors', 'Email', 'actif', 'aaaaaaaa-aaaa-aaaa-aaaa-aaaaaaaaaaaa');

-- Tâches de test
INSERT INTO taches (titre, description, priorite, assigne_a, cree_par, contact_id) VALUES
    ('Appeler Pierre Durand', 'Suivi commercial pour proposition mutuelle', 'haute', 'cccccccc-cccc-cccc-cccc-cccccccccccc', 'bbbbbbbb-bbbb-bbbb-bbbb-bbbbbbbbbbbb', (SELECT id FROM contacts WHERE email = 'pierre.durand@email.com')),
    ('Envoyer devis Sophie Martin', 'Préparer et envoyer le devis personnalisé', 'normale', 'cccccccc-cccc-cccc-cccc-cccccccccccc', 'bbbbbbbb-bbbb-bbbb-bbbb-bbbbbbbbbbbb', (SELECT id FROM contacts WHERE email = 'sophie.martin@email.com'));

-- Activer RLS sur toutes les tables
ALTER TABLE users ENABLE ROW LEVEL SECURITY;
ALTER TABLE contacts ENABLE ROW LEVEL SECURITY;
ALTER TABLE campagnes ENABLE ROW LEVEL SECURITY;
ALTER TABLE taches ENABLE ROW LEVEL SECURITY;

-- Politiques RLS basiques (tous peuvent lire pour le moment)
CREATE POLICY "Allow all for authenticated users" ON users FOR ALL USING (true);
CREATE POLICY "Allow all for authenticated users" ON contacts FOR ALL USING (true);
CREATE POLICY "Allow all for authenticated users" ON campagnes FOR ALL USING (true);
CREATE POLICY "Allow all for authenticated users" ON taches FOR ALL USING (true);
CREATE POLICY "Allow read for roles" ON roles FOR SELECT USING (true);
CREATE POLICY "Allow read for equipes" ON equipes FOR SELECT USING (true);
