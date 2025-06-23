
-- ============================================
-- PREMUNIA CRM - BASE DE DONNÉES COMPLÈTE
-- Schéma SQL avec tous les modules et données
-- ============================================

-- Extensions nécessaires
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
CREATE EXTENSION IF NOT EXISTS "pgcrypto";

-- ============================================
-- SUPPRESSION DES TABLES EXISTANTES
-- ============================================
DROP TABLE IF EXISTS workflow_executions CASCADE;
DROP TABLE IF EXISTS workflow_steps CASCADE;
DROP TABLE IF EXISTS workflows CASCADE;
DROP TABLE IF EXISTS email_template_usage CASCADE;
DROP TABLE IF EXISTS email_templates CASCADE;
DROP TABLE IF EXISTS interaction_history CASCADE;
DROP TABLE IF EXISTS task_assignments CASCADE;
DROP TABLE IF EXISTS tasks CASCADE;
DROP TABLE IF EXISTS company_contacts CASCADE;
DROP TABLE IF EXISTS companies CASCADE;
DROP TABLE IF EXISTS activities CASCADE;
DROP TABLE IF EXISTS marketing_campaigns CASCADE;
DROP TABLE IF EXISTS opportunities CASCADE;
DROP TABLE IF EXISTS prospects CASCADE;
DROP TABLE IF EXISTS users CASCADE;

-- ============================================
-- TABLE USERS AVEC AUTHENTIFICATION
-- ============================================
CREATE TABLE users (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    email VARCHAR(255) UNIQUE NOT NULL,
    password_hash VARCHAR(255) NOT NULL,
    name VARCHAR(255) NOT NULL,
    role VARCHAR(20) CHECK (role IN ('admin', 'manager', 'commercial')) NOT NULL DEFAULT 'commercial',
    avatar_url VARCHAR(500),
    is_active BOOLEAN DEFAULT true,
    objectives JSONB DEFAULT '{"monthly_target": 50000, "quarterly_target": 150000, "annual_target": 600000}',
    team_id UUID,
    last_login TIMESTAMP WITH TIME ZONE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- ============================================
-- TABLE COMPANIES - GESTION ENTREPRISES
-- ============================================
CREATE TABLE companies (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    name VARCHAR(255) NOT NULL,
    sector VARCHAR(100),
    size VARCHAR(50) CHECK (size IN ('Startup', 'PME', 'ETI', 'Grande Entreprise')),
    revenue DECIMAL(15,2),
    contacts_count INTEGER DEFAULT 0,
    status VARCHAR(50) CHECK (status IN ('Prospect', 'Client', 'Partenaire', 'Inactif')) DEFAULT 'Prospect',
    location VARCHAR(255),
    phone VARCHAR(50),
    email VARCHAR(255),
    website VARCHAR(255),
    created_year INTEGER,
    siret VARCHAR(14),
    notes TEXT,
    assigned_to UUID REFERENCES users(id),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- ============================================
-- TABLE PROSPECTS AVANCÉE
-- ============================================
CREATE TABLE prospects (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    name VARCHAR(255) NOT NULL,
    email VARCHAR(255) UNIQUE NOT NULL,
    phone VARCHAR(50),
    company_id UUID REFERENCES companies(id),
    age INTEGER CHECK (age >= 0 AND age <= 120),
    segment VARCHAR(20) CHECK (segment IN ('Senior', 'Premium', 'Standard')) DEFAULT 'Standard',
    score INTEGER CHECK (score >= 0 AND score <= 100) DEFAULT 0,
    status VARCHAR(20) CHECK (status IN ('Nouveau', 'Qualifié', 'En cours', 'Converti', 'Perdu')) DEFAULT 'Nouveau',
    assigned_to UUID REFERENCES users(id),
    source VARCHAR(50) DEFAULT 'Manuel',
    revenue_potential DECIMAL(10,2) DEFAULT 0,
    last_contact TIMESTAMP WITH TIME ZONE,
    next_action TIMESTAMP WITH TIME ZONE,
    notes TEXT,
    health_situation JSONB DEFAULT '{}',
    automation_stage VARCHAR(50),
    tags TEXT[],
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- ============================================
-- TABLE TASKS - GESTION TÂCHES
-- ============================================
CREATE TABLE tasks (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    title VARCHAR(255) NOT NULL,
    description TEXT,
    type VARCHAR(50) CHECK (type IN ('call', 'email', 'meeting', 'demo', 'follow_up', 'admin')) NOT NULL,
    priority VARCHAR(20) CHECK (priority IN ('low', 'medium', 'high', 'urgent')) DEFAULT 'medium',
    status VARCHAR(20) CHECK (status IN ('pending', 'in_progress', 'completed', 'cancelled')) DEFAULT 'pending',
    due_date TIMESTAMP WITH TIME ZONE,
    estimated_duration INTEGER, -- en minutes
    actual_duration INTEGER,
    assigned_to UUID REFERENCES users(id),
    created_by UUID REFERENCES users(id),
    prospect_id UUID REFERENCES prospects(id),
    company_id UUID REFERENCES companies(id),
    tags TEXT[],
    completed_at TIMESTAMP WITH TIME ZONE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- ============================================
-- TABLE EMAIL TEMPLATES
-- ============================================
CREATE TABLE email_templates (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    name VARCHAR(255) NOT NULL,
    subject VARCHAR(500) NOT NULL,
    content TEXT NOT NULL,
    template_type VARCHAR(50) NOT NULL,
    category VARCHAR(100),
    variables JSONB DEFAULT '[]',
    is_active BOOLEAN DEFAULT true,
    usage_count INTEGER DEFAULT 0,
    created_by UUID REFERENCES users(id),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- ============================================
-- TABLE WORKFLOWS
-- ============================================
CREATE TABLE workflows (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    name VARCHAR(255) NOT NULL,
    description TEXT,
    trigger_type VARCHAR(50) NOT NULL,
    trigger_conditions JSONB DEFAULT '{}',
    is_active BOOLEAN DEFAULT true,
    execution_count INTEGER DEFAULT 0,
    success_rate DECIMAL(5,2) DEFAULT 0,
    created_by UUID REFERENCES users(id),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- ============================================
-- TABLE WORKFLOW STEPS
-- ============================================
CREATE TABLE workflow_steps (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    workflow_id UUID REFERENCES workflows(id) ON DELETE CASCADE,
    step_order INTEGER NOT NULL,
    step_type VARCHAR(50) NOT NULL,
    step_config JSONB DEFAULT '{}',
    delay_duration INTEGER DEFAULT 0, -- en minutes
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- ============================================
-- TABLE INTERACTION HISTORY
-- ============================================
CREATE TABLE interaction_history (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    prospect_id UUID REFERENCES prospects(id),
    company_id UUID REFERENCES companies(id),
    user_id UUID REFERENCES users(id),
    type VARCHAR(50) CHECK (type IN ('call', 'email', 'meeting', 'sms', 'whatsapp', 'note')) NOT NULL,
    direction VARCHAR(20) CHECK (direction IN ('inbound', 'outbound')) DEFAULT 'outbound',
    subject VARCHAR(500),
    content TEXT,
    duration INTEGER, -- en minutes pour les appels
    outcome VARCHAR(100),
    next_action VARCHAR(255),
    attachments JSONB DEFAULT '[]',
    metadata JSONB DEFAULT '{}',
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- ============================================
-- TABLE OPPORTUNITIES ÉTENDUE
-- ============================================
CREATE TABLE opportunities (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    prospect_id UUID REFERENCES prospects(id),
    company_id UUID REFERENCES companies(id),
    title VARCHAR(255) NOT NULL,
    value DECIMAL(12,2) NOT NULL DEFAULT 0,
    stage VARCHAR(50) DEFAULT 'Prospection',
    probability INTEGER CHECK (probability >= 0 AND probability <= 100) DEFAULT 0,
    close_date DATE,
    products TEXT[],
    competitor_analysis JSONB DEFAULT '{}',
    created_by UUID REFERENCES users(id),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- ============================================
-- TABLE MARKETING CAMPAIGNS ÉTENDUE
-- ============================================
CREATE TABLE marketing_campaigns (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    name VARCHAR(255) NOT NULL,
    type VARCHAR(50) DEFAULT 'Email',
    target_segment VARCHAR(100),
    template_id UUID REFERENCES email_templates(id),
    status VARCHAR(50) DEFAULT 'Draft',
    start_date TIMESTAMP WITH TIME ZONE,
    end_date TIMESTAMP WITH TIME ZONE,
    budget DECIMAL(10,2),
    stats JSONB DEFAULT '{"sent": 0, "opened": 0, "clicked": 0, "converted": 0, "bounced": 0}',
    automation_rules JSONB DEFAULT '{}',
    created_by UUID REFERENCES users(id),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- ============================================
-- INDEXES POUR OPTIMISATION
-- ============================================
CREATE INDEX idx_users_email ON users(email);
CREATE INDEX idx_users_role ON users(role);
CREATE INDEX idx_companies_status ON companies(status);
CREATE INDEX idx_companies_assigned ON companies(assigned_to);
CREATE INDEX idx_prospects_assigned ON prospects(assigned_to);
CREATE INDEX idx_prospects_status ON prospects(status);
CREATE INDEX idx_prospects_segment ON prospects(segment);
CREATE INDEX idx_tasks_assigned ON tasks(assigned_to);
CREATE INDEX idx_tasks_status ON tasks(status);
CREATE INDEX idx_tasks_due_date ON tasks(due_date);
CREATE INDEX idx_interactions_prospect ON interaction_history(prospect_id);
CREATE INDEX idx_interactions_user ON interaction_history(user_id);
CREATE INDEX idx_interactions_type ON interaction_history(type);

-- ============================================
-- FONCTIONS UTILITAIRES
-- ============================================

-- Fonction de mise à jour automatique du timestamp
CREATE OR REPLACE FUNCTION update_updated_at()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = CURRENT_TIMESTAMP;
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Triggers pour updated_at
CREATE TRIGGER update_users_updated_at BEFORE UPDATE ON users FOR EACH ROW EXECUTE FUNCTION update_updated_at();
CREATE TRIGGER update_companies_updated_at BEFORE UPDATE ON companies FOR EACH ROW EXECUTE FUNCTION update_updated_at();
CREATE TRIGGER update_prospects_updated_at BEFORE UPDATE ON prospects FOR EACH ROW EXECUTE FUNCTION update_updated_at();
CREATE TRIGGER update_tasks_updated_at BEFORE UPDATE ON tasks FOR EACH ROW EXECUTE FUNCTION update_updated_at();
CREATE TRIGGER update_workflows_updated_at BEFORE UPDATE ON workflows FOR EACH ROW EXECUTE FUNCTION update_updated_at();

-- ============================================
-- FONCTION DE SCORING AUTOMATIQUE
-- ============================================
CREATE OR REPLACE FUNCTION calculate_prospect_score(
    p_age INTEGER,
    p_segment TEXT,
    p_revenue_potential DECIMAL,
    p_company_size TEXT DEFAULT NULL
)
RETURNS INTEGER AS $$
DECLARE
    score INTEGER := 0;
BEGIN
    -- Score basé sur l'âge
    IF p_age >= 65 THEN score := score + 25;
    ELSIF p_age >= 55 THEN score := score + 15;
    ELSIF p_age >= 45 THEN score := score + 10;
    END IF;
    
    -- Score basé sur le segment
    CASE p_segment
        WHEN 'Senior' THEN score := score + 30;
        WHEN 'Premium' THEN score := score + 20;
        WHEN 'Standard' THEN score := score + 10;
    END CASE;
    
    -- Score basé sur le potentiel de revenus
    IF p_revenue_potential > 5000 THEN score := score + 20;
    ELSIF p_revenue_potential > 2500 THEN score := score + 15;
    ELSIF p_revenue_potential > 1000 THEN score := score + 10;
    END IF;
    
    -- Bonus selon la taille de l'entreprise
    IF p_company_size IS NOT NULL THEN
        CASE p_company_size
            WHEN 'Grande Entreprise' THEN score := score + 15;
            WHEN 'ETI' THEN score := score + 10;
            WHEN 'PME' THEN score := score + 5;
        END CASE;
    END IF;
    
    -- Limiter à 100
    IF score > 100 THEN score := 100; END IF;
    IF score < 0 THEN score := 0; END IF;
    
    RETURN score;
END;
$$ LANGUAGE plpgsql;

-- ============================================
-- TRIGGER POUR SCORING AUTOMATIQUE
-- ============================================
CREATE OR REPLACE FUNCTION auto_update_prospect_score()
RETURNS TRIGGER AS $$
DECLARE
    company_size TEXT;
BEGIN
    -- Récupérer la taille de l'entreprise si applicable
    IF NEW.company_id IS NOT NULL THEN
        SELECT size INTO company_size FROM companies WHERE id = NEW.company_id;
    END IF;
    
    -- Calculer le nouveau score
    NEW.score := calculate_prospect_score(
        NEW.age,
        NEW.segment,
        NEW.revenue_potential,
        company_size
    );
    
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER trigger_prospect_score_update
    BEFORE INSERT OR UPDATE ON prospects
    FOR EACH ROW EXECUTE FUNCTION auto_update_prospect_score();

-- ============================================
-- FONCTION D'AUTHENTIFICATION
-- ============================================
CREATE OR REPLACE FUNCTION authenticate_user(
    p_email TEXT,
    p_password TEXT
)
RETURNS TABLE (
    user_id UUID,
    user_name TEXT,
    user_role TEXT,
    success BOOLEAN
) AS $$
DECLARE
    stored_hash TEXT;
    user_record RECORD;
BEGIN
    -- Récupérer l'utilisateur
    SELECT id, name, role, password_hash 
    INTO user_record
    FROM users 
    WHERE email = p_email AND is_active = true;
    
    IF user_record.id IS NULL THEN
        RETURN QUERY SELECT NULL::UUID, NULL::TEXT, NULL::TEXT, FALSE;
        RETURN;
    END IF;
    
    -- Vérifier le mot de passe
    IF user_record.password_hash = crypt(p_password, user_record.password_hash) THEN
        -- Mettre à jour la dernière connexion
        UPDATE users SET last_login = CURRENT_TIMESTAMP WHERE id = user_record.id;
        
        RETURN QUERY SELECT 
            user_record.id,
            user_record.name,
            user_record.role,
            TRUE;
    ELSE
        RETURN QUERY SELECT NULL::UUID, NULL::TEXT, NULL::TEXT, FALSE;
    END IF;
END;
$$ LANGUAGE plpgsql;

-- ============================================
-- FONCTION POUR MÉTRIQUES DASHBOARD
-- ============================================
CREATE OR REPLACE FUNCTION get_dashboard_metrics(user_id UUID, user_role TEXT)
RETURNS JSONB AS $$
DECLARE
    result JSONB := '{}';
    total_prospects INTEGER;
    total_companies INTEGER;
    total_tasks INTEGER;
    conversion_rate DECIMAL;
    revenue_total DECIMAL;
BEGIN
    -- Métriques selon le rôle
    IF user_role = 'admin' THEN
        -- Admin voit tout
        SELECT COUNT(*) INTO total_prospects FROM prospects;
        SELECT COUNT(*) INTO total_companies FROM companies;
        SELECT COUNT(*) INTO total_tasks FROM tasks WHERE status != 'completed';
    ELSE
        -- Commercial/Manager voit ses données
        SELECT COUNT(*) INTO total_prospects FROM prospects WHERE assigned_to = user_id;
        SELECT COUNT(*) INTO total_companies FROM companies WHERE assigned_to = user_id;
        SELECT COUNT(*) INTO total_tasks FROM tasks WHERE assigned_to = user_id AND status != 'completed';
    END IF;
    
    -- Calcul du taux de conversion
    IF total_prospects > 0 THEN
        SELECT 
            (COUNT(CASE WHEN status = 'Converti' THEN 1 END)::DECIMAL / COUNT(*)::DECIMAL) * 100
        INTO conversion_rate
        FROM prospects
        WHERE (user_role = 'admin' OR assigned_to = user_id);
    ELSE
        conversion_rate := 0;
    END IF;
    
    -- Revenus totaux
    SELECT 
        COALESCE(SUM(CASE WHEN status = 'Converti' THEN revenue_potential ELSE 0 END), 0)
    INTO revenue_total
    FROM prospects
    WHERE (user_role = 'admin' OR assigned_to = user_id);
    
    -- Construction du résultat
    result := jsonb_build_object(
        'total_prospects', total_prospects,
        'total_companies', total_companies,
        'total_tasks', total_tasks,
        'conversion_rate', ROUND(conversion_rate, 1),
        'revenue_total', revenue_total
    );
    
    RETURN result;
END;
$$ LANGUAGE plpgsql;

-- ============================================
-- INSERTION DES DONNÉES DE DÉMONSTRATION
-- ============================================

-- Utilisateurs avec mots de passe hashés
INSERT INTO users (id, email, password_hash, name, role, objectives) VALUES
    ('11111111-1111-1111-1111-111111111111', 'admin@premunia.fr', crypt('admin123', gen_salt('bf')), 'Administrateur Premunia', 'admin', '{"monthly_target": 100000, "quarterly_target": 300000, "annual_target": 1200000}'),
    ('22222222-2222-2222-2222-222222222222', 'manager@premunia.fr', crypt('manager123', gen_salt('bf')), 'Manager Commercial', 'manager', '{"monthly_target": 80000, "quarterly_target": 240000, "annual_target": 960000}'),
    ('33333333-3333-3333-3333-333333333333', 'jean.dupont@premunia.fr', crypt('commercial123', gen_salt('bf')), 'Jean Dupont', 'commercial', '{"monthly_target": 50000, "quarterly_target": 150000, "annual_target": 600000}'),
    ('44444444-4444-4444-4444-444444444444', 'marie.martin@premunia.fr', crypt('commercial123', gen_salt('bf')), 'Marie Martin', 'commercial', '{"monthly_target": 45000, "quarterly_target": 135000, "annual_target": 540000}');

-- Entreprises de démonstration
INSERT INTO companies (id, name, sector, size, revenue, status, location, phone, email, website, created_year, assigned_to) VALUES
    ('c1111111-1111-1111-1111-111111111111', 'TechSeniors SA', 'Technologies', 'PME', 2500000, 'Client', 'Paris, France', '+33 1 23 45 67 89', 'contact@techseniors.fr', 'www.techseniors.fr', 2015, '33333333-3333-3333-3333-333333333333'),
    ('c2222222-2222-2222-2222-222222222222', 'Assurance Plus', 'Assurance', 'Grande Entreprise', 15000000, 'Prospect', 'Lyon, France', '+33 4 56 78 90 12', 'info@assuranceplus.fr', 'www.assuranceplus.fr', 2008, '44444444-4444-4444-4444-444444444444'),
    ('c3333333-3333-3333-3333-333333333333', 'Santé Senior SARL', 'Santé', 'ETI', 8000000, 'Partenaire', 'Marseille, France', '+33 4 91 23 45 67', 'contact@santesenior.fr', 'www.santesenior.fr', 2012, '33333333-3333-3333-3333-333333333333');

-- Prospects de démonstration
INSERT INTO prospects (name, email, phone, company_id, age, segment, status, assigned_to, revenue_potential, health_situation) VALUES
    ('Pierre Senior', 'pierre.senior@email.com', '0123456789', 'c1111111-1111-1111-1111-111111111111', 68, 'Senior', 'Qualifié', '33333333-3333-3333-3333-333333333333', 3500, '{"current_insurance": "Mutuelle A", "health_issues": ["Optique", "Dentaire"], "budget_range": "Premium", "urgency_level": "medium"}'),
    ('Marie Retraite', 'marie.retraite@email.com', '0123456790', 'c2222222-2222-2222-2222-222222222222', 72, 'Senior', 'En cours', '44444444-4444-4444-4444-444444444444', 4200, '{"current_insurance": "Sécu uniquement", "health_issues": ["Hospitalisation"], "budget_range": "Premium", "urgency_level": "high"}'),
    ('Jean Actif', 'jean.actif@email.com', '0123456791', 'c1111111-1111-1111-1111-111111111111', 63, 'Premium', 'Nouveau', '33333333-3333-3333-3333-333333333333', 2800, '{"current_insurance": "Mutuelle B", "health_issues": ["Optique"], "budget_range": "Standard", "urgency_level": "low"}'),
    ('Sophie Sénior', 'sophie.senior@email.com', '0123456792', 'c3333333-3333-3333-3333-333333333333', 69, 'Senior', 'Qualifié', '44444444-4444-4444-4444-444444444444', 3900, '{"current_insurance": "Mutuelle C", "health_issues": ["Dentaire", "Hospitalisation"], "budget_range": "Premium", "urgency_level": "medium"}');

-- Tâches de démonstration
INSERT INTO tasks (title, description, type, priority, status, due_date, assigned_to, created_by, prospect_id) VALUES
    ('Appel de suivi Pierre Senior', 'Présenter les nouvelles offres seniors', 'call', 'high', 'pending', CURRENT_TIMESTAMP + INTERVAL '2 hours', '33333333-3333-3333-3333-333333333333', '33333333-3333-3333-3333-333333333333', (SELECT id FROM prospects WHERE email = 'pierre.senior@email.com')),
    ('Envoyer devis Marie', 'Devis personnalisé pour mutuelle senior premium', 'email', 'urgent', 'pending', CURRENT_TIMESTAMP + INTERVAL '1 day', '44444444-4444-4444-4444-444444444444', '44444444-4444-4444-4444-444444444444', (SELECT id FROM prospects WHERE email = 'marie.retraite@email.com')),
    ('RDV Sophie Sénior', 'Rendez-vous physique pour signature', 'meeting', 'medium', 'pending', CURRENT_TIMESTAMP + INTERVAL '3 days', '44444444-4444-4444-4444-444444444444', '44444444-4444-4444-4444-444444444444', (SELECT id FROM prospects WHERE email = 'sophie.senior@email.com'));

-- Templates d'emails
INSERT INTO email_templates (name, subject, content, template_type, category, variables, created_by) VALUES
    ('Relance Senior Premium', 'Votre protection santé après 55 ans - Solutions personnalisées', 
     'Bonjour {{name}},<br><br>En tant que spécialiste des solutions santé pour les seniors, nous comprenons vos préoccupations concernant l''évolution de vos besoins de santé.<br><br>Nos mutuelles seniors offrent :<br>✓ Remboursements renforcés (optique, dentaire, audiologie)<br>✓ Tiers payant généralisé<br>✓ Assistance 24h/7j<br>✓ Tarifs préférentiels négociés<br><br>Souhaitez-vous découvrir nos solutions adaptées à votre profil ?<br><br>Cordialement,<br>{{commercial_name}}', 
     'Senior', 'Prospection', '["name", "commercial_name", "age", "budget_range"]', '11111111-1111-1111-1111-111111111111'),
    ('Suivi Devis', 'Votre devis mutuelle santé - {{company_name}}', 
     'Bonjour {{name}},<br><br>Je fais suite à notre échange concernant votre mutuelle santé.<br><br>Vous trouverez en pièce jointe votre devis personnalisé d''un montant de {{amount}}€/mois.<br><br>Ce devis inclut :<br>• {{benefits}}<br><br>N''hésitez pas à me contacter pour toute question.<br><br>Cordialement,<br>{{commercial_name}}', 
     'Standard', 'Suivi', '["name", "company_name", "amount", "benefits", "commercial_name"]', '11111111-1111-1111-1111-111111111111');

-- Workflows de démonstration
INSERT INTO workflows (id, name, description, trigger_type, trigger_conditions, created_by) VALUES
    ('w1111111-1111-1111-1111-111111111111', 'Séquence Nouveau Prospect Senior', 'Automation pour les nouveaux prospects seniors', 'prospect_created', '{"segment": "Senior", "age_min": 55}', '11111111-1111-1111-1111-111111111111'),
    ('w2222222-2222-2222-2222-222222222222', 'Relance Devis Non Signés', 'Relance automatique des devis en attente', 'opportunity_stale', '{"days_without_activity": 7, "stage": "Proposition"}', '11111111-1111-1111-1111-111111111111');

-- Étapes des workflows
INSERT INTO workflow_steps (workflow_id, step_order, step_type, step_config, delay_duration) VALUES
    ('w1111111-1111-1111-1111-111111111111', 1, 'send_email', '{"template_id": "' || (SELECT id FROM email_templates WHERE name = 'Relance Senior Premium') || '"}', 60),
    ('w1111111-1111-1111-1111-111111111111', 2, 'create_task', '{"task_type": "call", "title": "Appel de suivi nouveau prospect", "priority": "medium"}', 1440),
    ('w1111111-1111-1111-1111-111111111111', 3, 'send_email', '{"template_id": "' || (SELECT id FROM email_templates WHERE name = 'Suivi Devis') || '"}', 4320),
    ('w2222222-2222-2222-2222-222222222222', 1, 'send_email', '{"template_id": "' || (SELECT id FROM email_templates WHERE name = 'Suivi Devis') || '"}', 0),
    ('w2222222-2222-2222-2222-222222222222', 2, 'create_task', '{"task_type": "call", "title": "Relance téléphonique devis", "priority": "high"}', 1440);

-- Historique d'interactions
INSERT INTO interaction_history (prospect_id, user_id, type, direction, subject, content, duration, outcome) VALUES
    ((SELECT id FROM prospects WHERE email = 'pierre.senior@email.com'), '33333333-3333-3333-3333-333333333333', 'call', 'outbound', 'Premier contact', 'Discussion sur les besoins en mutuelle santé', 25, 'Intéressé - RDV planifié'),
    ((SELECT id FROM prospects WHERE email = 'marie.retraite@email.com'), '44444444-4444-4444-4444-444444444444', 'email', 'outbound', 'Présentation de nos services', 'Email de présentation avec brochure', NULL, 'Email ouvert'),
    ((SELECT id FROM prospects WHERE email = 'sophie.senior@email.com'), '44444444-4444-4444-4444-444444444444', 'meeting', 'outbound', 'RDV commercial', 'Présentation des offres seniors en agence', 90, 'Devis demandé');

-- Opportunités
INSERT INTO opportunities (prospect_id, company_id, title, value, stage, probability, close_date, products, created_by) VALUES
    ((SELECT id FROM prospects WHERE email = 'pierre.senior@email.com'), 'c1111111-1111-1111-1111-111111111111', 'Mutuelle Senior Premium', 1200, 'Proposition', 75, CURRENT_DATE + INTERVAL '15 days', ARRAY['Mutuelle Senior', 'Optique Renforcée'], '33333333-3333-3333-3333-333333333333'),
    ((SELECT id FROM prospects WHERE email = 'marie.retraite@email.com'), 'c2222222-2222-2222-2222-222222222222', 'Assurance Santé Senior+', 1800, 'Négociation', 60, CURRENT_DATE + INTERVAL '30 days', ARRAY['Mutuelle Premium', 'Hospitalisation'], '44444444-4444-4444-4444-444444444444'),
    ((SELECT id FROM prospects WHERE email = 'sophie.senior@email.com'), 'c3333333-3333-3333-3333-333333333333', 'Pack Santé Complet', 2100, 'Qualification', 40, CURRENT_DATE + INTERVAL '45 days', ARRAY['Mutuelle', 'Dentaire', 'Optique'], '44444444-4444-4444-4444-444444444444');

-- Campagnes marketing
INSERT INTO marketing_campaigns (name, type, target_segment, status, start_date, budget, stats, created_by) VALUES
    ('Campagne Seniors Automne 2024', 'Email', 'Senior Premium', 'Active', CURRENT_TIMESTAMP, 5000, '{"sent": 1250, "opened": 387, "clicked": 98, "converted": 23, "bounced": 15}', '11111111-1111-1111-1111-111111111111'),
    ('Relance Prospects Dormants', 'Email', 'Tous segments', 'Completed', CURRENT_TIMESTAMP - INTERVAL '30 days', 2500, '{"sent": 890, "opened": 234, "clicked": 67, "converted": 12, "bounced": 8}', '11111111-1111-1111-1111-111111111111');

-- ============================================
-- VUES POUR REPORTING
-- ============================================

-- Vue performance globale
CREATE VIEW v_performance_dashboard AS
SELECT 
    u.id as user_id,
    u.name as user_name,
    u.role,
    COUNT(DISTINCT p.id) as total_prospects,
    COUNT(DISTINCT CASE WHEN p.status = 'Converti' THEN p.id END) as conversions,
    ROUND(
        CASE 
            WHEN COUNT(DISTINCT p.id) > 0 
            THEN (COUNT(DISTINCT CASE WHEN p.status = 'Converti' THEN p.id END)::DECIMAL / COUNT(DISTINCT p.id)) * 100 
            ELSE 0 
        END, 2
    ) as conversion_rate,
    COUNT(DISTINCT c.id) as total_companies,
    COUNT(DISTINCT t.id) as pending_tasks,
    SUM(CASE WHEN p.status = 'Converti' THEN p.revenue_potential ELSE 0 END) as total_revenue
FROM users u
LEFT JOIN prospects p ON u.id = p.assigned_to
LEFT JOIN companies c ON u.id = c.assigned_to
LEFT JOIN tasks t ON u.id = t.assigned_to AND t.status IN ('pending', 'in_progress')
GROUP BY u.id, u.name, u.role;

-- Vue activité récente
CREATE VIEW v_recent_activities AS
SELECT 
    'interaction' as activity_type,
    ih.created_at,
    ih.user_id,
    u.name as user_name,
    ih.type as interaction_type,
    ih.subject,
    p.name as prospect_name,
    c.name as company_name
FROM interaction_history ih
JOIN users u ON ih.user_id = u.id
LEFT JOIN prospects p ON ih.prospect_id = p.id
LEFT JOIN companies c ON ih.company_id = c.id
UNION ALL
SELECT 
    'task' as activity_type,
    t.created_at,
    t.assigned_to as user_id,
    u.name as user_name,
    t.type as interaction_type,
    t.title as subject,
    p.name as prospect_name,
    c.name as company_name
FROM tasks t
JOIN users u ON t.assigned_to = u.id
LEFT JOIN prospects p ON t.prospect_id = p.id
LEFT JOIN companies c ON t.company_id = c.id
ORDER BY created_at DESC;

COMMENT ON DATABASE postgres IS 'Premunia CRM - Base de données complète avec authentification et tous les modules';
