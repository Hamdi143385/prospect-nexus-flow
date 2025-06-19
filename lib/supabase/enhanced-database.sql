
-- ============================================
-- PREMUNIA CRM - SCHEMA COMPLET SUPABASE
-- CRM spécialisé mutuelle santé seniors
-- ============================================

-- Suppression des tables existantes (dans l'ordre des dépendances)
DROP TABLE IF EXISTS activities CASCADE;
DROP TABLE IF EXISTS marketing_campaigns CASCADE;
DROP TABLE IF EXISTS opportunities CASCADE;
DROP TABLE IF EXISTS prospects CASCADE;
DROP TABLE IF EXISTS users CASCADE;

-- Extension pour UUID
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- ============================================
-- TABLE USERS - Gestion multi-rôles
-- ============================================
CREATE TABLE users (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    email VARCHAR(255) UNIQUE NOT NULL,
    name VARCHAR(255) NOT NULL,
    role VARCHAR(20) CHECK (role IN ('admin', 'manager', 'commercial')) NOT NULL DEFAULT 'commercial',
    avatar_url VARCHAR(500),
    is_active BOOLEAN DEFAULT true,
    objectives JSONB DEFAULT '{"monthly_target": 50000, "quarterly_target": 150000, "annual_target": 600000}',
    team_id UUID,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Index pour optimiser les requêtes
CREATE INDEX idx_users_role ON users(role);
CREATE INDEX idx_users_team ON users(team_id);

-- ============================================
-- TABLE PROSPECTS - Spécialisé seniors
-- ============================================
CREATE TABLE prospects (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    name VARCHAR(255) NOT NULL,
    email VARCHAR(255) UNIQUE NOT NULL,
    phone VARCHAR(50),
    company VARCHAR(255),
    age INTEGER CHECK (age >= 0 AND age <= 120),
    segment VARCHAR(20) CHECK (segment IN ('Senior', 'Premium', 'Standard')) DEFAULT 'Standard',
    score INTEGER CHECK (score >= 0 AND score <= 100) DEFAULT 0,
    status VARCHAR(20) CHECK (status IN ('Nouveau', 'Qualifié', 'En cours', 'Converti', 'Perdu')) DEFAULT 'Nouveau',
    assigned_to UUID REFERENCES users(id) ON DELETE SET NULL,
    source VARCHAR(20) CHECK (source IN ('Excel', 'HubSpot', 'GoogleSheets', 'Manuel', 'Import')) DEFAULT 'Manuel',
    revenue_potential DECIMAL(10,2) DEFAULT 0,
    last_contact TIMESTAMP WITH TIME ZONE,
    notes TEXT,
    health_situation JSONB DEFAULT '{"current_insurance": "", "health_issues": [], "budget_range": "", "urgency_level": "low"}',
    automation_stage VARCHAR(50),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Index pour optimiser les requêtes prospects
CREATE INDEX idx_prospects_assigned TO users(assigned_to);
CREATE INDEX idx_prospects_status ON prospects(status);
CREATE INDEX idx_prospects_segment ON prospects(segment);
CREATE INDEX idx_prospects_age ON prospects(age);
CREATE INDEX idx_prospects_score ON prospects(score);

-- ============================================
-- TABLE OPPORTUNITIES - Gestion pipeline
-- ============================================
CREATE TABLE opportunities (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    prospect_id UUID REFERENCES prospects(id) ON DELETE CASCADE,
    title VARCHAR(255) NOT NULL,
    value DECIMAL(10,2) NOT NULL DEFAULT 0,
    stage VARCHAR(20) CHECK (stage IN ('Prospection', 'Qualification', 'Proposition', 'Négociation', 'Closing', 'Gagné', 'Perdu')) DEFAULT 'Prospection',
    probability INTEGER CHECK (probability >= 0 AND probability <= 100) DEFAULT 0,
    close_date DATE,
    created_by UUID REFERENCES users(id) ON DELETE SET NULL,
    products TEXT[],
    competitor_analysis JSONB,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Index pour optimiser les requêtes opportunités
CREATE INDEX idx_opportunities_prospect ON opportunities(prospect_id);
CREATE INDEX idx_opportunities_stage ON opportunities(stage);
CREATE INDEX idx_opportunities_created_by ON opportunities(created_by);
CREATE INDEX idx_opportunities_close_date ON opportunities(close_date);

-- ============================================
-- TABLE MARKETING CAMPAIGNS - Automation seniors
-- ============================================
CREATE TABLE marketing_campaigns (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    name VARCHAR(255) NOT NULL,
    type VARCHAR(20) CHECK (type IN ('Email', 'SMS', 'WhatsApp', 'Phone')) DEFAULT 'Email',
    target_segment VARCHAR(50) NOT NULL,
    template_content TEXT,
    status VARCHAR(20) CHECK (status IN ('Draft', 'Active', 'Paused', 'Completed')) DEFAULT 'Draft',
    created_by UUID REFERENCES users(id) ON DELETE SET NULL,
    stats JSONB DEFAULT '{"sent": 0, "opened": 0, "clicked": 0, "converted": 0, "bounced": 0}',
    automation_rules JSONB DEFAULT '{}',
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Index pour les campagnes
CREATE INDEX idx_campaigns_status ON marketing_campaigns(status);
CREATE INDEX idx_campaigns_type ON marketing_campaigns(type);
CREATE INDEX idx_campaigns_created_by ON marketing_campaigns(created_by);

-- ============================================
-- TABLE ACTIVITIES - Suivi activités commerciales
-- ============================================
CREATE TABLE activities (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    prospect_id UUID REFERENCES prospects(id) ON DELETE CASCADE,
    user_id UUID REFERENCES users(id) ON DELETE CASCADE,
    type VARCHAR(20) CHECK (type IN ('call', 'email', 'meeting', 'note', 'task')) NOT NULL,
    title VARCHAR(255) NOT NULL,
    description TEXT,
    status VARCHAR(20) CHECK (status IN ('pending', 'completed', 'cancelled')) DEFAULT 'pending',
    scheduled_at TIMESTAMP WITH TIME ZONE,
    completed_at TIMESTAMP WITH TIME ZONE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Index pour les activités
CREATE INDEX idx_activities_prospect ON activities(prospect_id);
CREATE INDEX idx_activities_user ON activities(user_id);
CREATE INDEX idx_activities_type ON activities(type);
CREATE INDEX idx_activities_status ON activities(status);
CREATE INDEX idx_activities_scheduled ON activities(scheduled_at);

-- ============================================
-- FONCTIONS UTILITAIRES
-- ============================================

-- Fonction pour mise à jour automatique du updated_at
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = CURRENT_TIMESTAMP;
    RETURN NEW;
END;
$$ language 'plpgsql';

-- Triggers pour updated_at
CREATE TRIGGER update_users_updated_at BEFORE UPDATE ON users
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_prospects_updated_at BEFORE UPDATE ON prospects
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_opportunities_updated_at BEFORE UPDATE ON opportunities
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- ============================================
-- FONCTION SCORING AUTOMATIQUE PROSPECTS SENIORS
-- ============================================
CREATE OR REPLACE FUNCTION calculate_senior_score(
    p_age INTEGER,
    p_budget_range TEXT,
    p_health_issues TEXT[],
    p_urgency_level TEXT
)
RETURNS INTEGER AS $$
DECLARE
    score INTEGER := 0;
BEGIN
    -- Score basé sur l'âge (segment senior)
    IF p_age >= 65 THEN
        score := score + 30;
    ELSIF p_age >= 60 THEN
        score := score + 20;
    ELSIF p_age >= 55 THEN
        score := score + 10;
    END IF;
    
    -- Score basé sur le budget
    CASE p_budget_range
        WHEN 'Premium (>100€)' THEN score := score + 25;
        WHEN 'Standard (50-100€)' THEN score := score + 15;
        WHEN 'Économique (<50€)' THEN score := score + 5;
        ELSE score := score + 0;
    END CASE;
    
    -- Score basé sur l'urgence
    CASE p_urgency_level
        WHEN 'high' THEN score := score + 20;
        WHEN 'medium' THEN score := score + 10;
        WHEN 'low' THEN score := score + 5;
        ELSE score := score + 0;
    END CASE;
    
    -- Bonus/malus selon les problèmes de santé
    IF array_length(p_health_issues, 1) > 0 THEN
        score := score + 15; -- Plus de besoins = plus de potentiel
    END IF;
    
    -- Score maximum de 100
    IF score > 100 THEN
        score := 100;
    END IF;
    
    RETURN score;
END;
$$ LANGUAGE plpgsql;

-- ============================================
-- TRIGGER AUTOMATIQUE POUR SCORING
-- ============================================
CREATE OR REPLACE FUNCTION auto_score_prospect()
RETURNS TRIGGER AS $$
BEGIN
    -- Calcul automatique du score pour les nouveaux prospects
    IF NEW.age IS NOT NULL THEN
        NEW.score := calculate_senior_score(
            NEW.age,
            (NEW.health_situation->>'budget_range')::TEXT,
            ARRAY(SELECT jsonb_array_elements_text(NEW.health_situation->'health_issues')),
            (NEW.health_situation->>'urgency_level')::TEXT
        );
    END IF;
    
    -- Attribution du segment selon l'âge et le score
    IF NEW.age >= 60 AND NEW.score >= 75 THEN
        NEW.segment := 'Senior';
    ELSIF NEW.score >= 60 THEN
        NEW.segment := 'Premium';
    ELSE
        NEW.segment := 'Standard';
    END IF;
    
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Trigger pour le scoring automatique
CREATE TRIGGER trigger_auto_score_prospect 
    BEFORE INSERT OR UPDATE ON prospects
    FOR EACH ROW EXECUTE FUNCTION auto_score_prospect();

-- ============================================
-- VUES POUR REPORTING
-- ============================================

-- Vue performance commerciale
CREATE VIEW v_commercial_performance AS
SELECT 
    u.id,
    u.name,
    u.role,
    COUNT(p.id) as total_prospects,
    COUNT(CASE WHEN p.status = 'Converti' THEN 1 END) as conversions,
    ROUND(
        CASE 
            WHEN COUNT(p.id) > 0 THEN 
                (COUNT(CASE WHEN p.status = 'Converti' THEN 1 END)::DECIMAL / COUNT(p.id)) * 100 
            ELSE 0 
        END, 2
    ) as conversion_rate,
    SUM(CASE WHEN p.status = 'Converti' THEN p.revenue_potential ELSE 0 END) as total_revenue,
    COUNT(CASE WHEN p.age >= 60 THEN 1 END) as senior_prospects,
    ROUND(AVG(p.score), 1) as avg_score
FROM users u
LEFT JOIN prospects p ON u.id = p.assigned_to
WHERE u.role IN ('commercial', 'manager')
GROUP BY u.id, u.name, u.role;

-- Vue segments seniors
CREATE VIEW v_senior_segments AS
SELECT 
    segment,
    COUNT(*) as total_prospects,
    COUNT(CASE WHEN status = 'Converti' THEN 1 END) as conversions,
    ROUND(AVG(age), 1) as avg_age,
    ROUND(AVG(score), 1) as avg_score,
    SUM(CASE WHEN status = 'Converti' THEN revenue_potential ELSE 0 END) as total_revenue
FROM prospects 
WHERE age >= 55
GROUP BY segment;

-- ============================================
-- RLS (Row Level Security) POLICIES
-- ============================================

-- Activation RLS
ALTER TABLE users ENABLE ROW LEVEL SECURITY;
ALTER TABLE prospects ENABLE ROW LEVEL SECURITY;
ALTER TABLE opportunities ENABLE ROW LEVEL SECURITY;
ALTER TABLE marketing_campaigns ENABLE ROW LEVEL SECURITY;
ALTER TABLE activities ENABLE ROW LEVEL SECURITY;

-- Policies pour users
CREATE POLICY "Users can view their own data" ON users
    FOR ALL USING (auth.uid()::text = id::text);

CREATE POLICY "Admins can view all users" ON users
    FOR ALL USING (
        EXISTS (
            SELECT 1 FROM users 
            WHERE id::text = auth.uid()::text 
            AND role = 'admin'
        )
    );

-- Policies pour prospects
CREATE POLICY "Commercials can view assigned prospects" ON prospects
    FOR ALL USING (
        assigned_to::text = auth.uid()::text OR
        EXISTS (
            SELECT 1 FROM users 
            WHERE id::text = auth.uid()::text 
            AND role IN ('admin', 'manager')
        )
    );

-- Policies pour opportunities
CREATE POLICY "Users can view related opportunities" ON opportunities
    FOR ALL USING (
        created_by::text = auth.uid()::text OR
        EXISTS (
            SELECT 1 FROM prospects 
            WHERE id = prospect_id 
            AND assigned_to::text = auth.uid()::text
        ) OR
        EXISTS (
            SELECT 1 FROM users 
            WHERE id::text = auth.uid()::text 
            AND role IN ('admin', 'manager')
        )
    );

-- Policies pour marketing campaigns
CREATE POLICY "Managers can view campaigns" ON marketing_campaigns
    FOR ALL USING (
        EXISTS (
            SELECT 1 FROM users 
            WHERE id::text = auth.uid()::text 
            AND role IN ('admin', 'manager')
        )
    );

-- Policies pour activities
CREATE POLICY "Users can view their activities" ON activities
    FOR ALL USING (
        user_id::text = auth.uid()::text OR
        EXISTS (
            SELECT 1 FROM users 
            WHERE id::text = auth.uid()::text 
            AND role IN ('admin', 'manager')
        )
    );

-- ============================================
-- DONNÉES DE DÉMONSTRATION
-- ============================================

-- Utilisateurs de démonstration
INSERT INTO users (id, email, name, role, objectives) VALUES
    ('11111111-1111-1111-1111-111111111111', 'admin@premunia.fr', 'Admin Premunia', 'admin', '{"monthly_target": 100000, "quarterly_target": 300000, "annual_target": 1200000}'),
    ('22222222-2222-2222-2222-222222222222', 'manager@premunia.fr', 'Manager Commercial', 'manager', '{"monthly_target": 80000, "quarterly_target": 240000, "annual_target": 960000}'),
    ('33333333-3333-3333-3333-333333333333', 'jean.dupont@premunia.fr', 'Jean Dupont', 'commercial', '{"monthly_target": 50000, "quarterly_target": 150000, "annual_target": 600000}'),
    ('44444444-4444-4444-4444-444444444444', 'marie.martin@premunia.fr', 'Marie Martin', 'commercial', '{"monthly_target": 45000, "quarterly_target": 135000, "annual_target": 540000}');

-- Prospects seniors de démonstration
INSERT INTO prospects (name, email, phone, age, segment, score, status, assigned_to, revenue_potential, health_situation) VALUES
    ('Pierre Senior', 'pierre.senior@email.com', '0123456789', 68, 'Senior', 85, 'Qualifié', '33333333-3333-3333-3333-333333333333', 3500, '{"current_insurance": "Mutuelle A", "health_issues": ["Optique", "Dentaire"], "budget_range": "Premium (>100€)", "urgency_level": "medium"}'),
    ('Marie Retraite', 'marie.retraite@email.com', '0123456790', 72, 'Senior', 92, 'En cours', '44444444-4444-4444-4444-444444444444', 4200, '{"current_insurance": "Sécu uniquement", "health_issues": ["Hospitalisation", "Médecines douces"], "budget_range": "Premium (>100€)", "urgency_level": "high"}'),
    ('Jean Actif', 'jean.actif@email.com', '0123456791', 63, 'Premium', 75, 'Nouveau', '33333333-3333-3333-3333-333333333333', 2800, '{"current_insurance": "Mutuelle B", "health_issues": ["Optique"], "budget_range": "Standard (50-100€)", "urgency_level": "low"}'),
    ('Sophie Sénior', 'sophie.senior@email.com', '0123456792', 69, 'Senior', 88, 'Qualifié', '44444444-4444-4444-4444-444444444444', 3900, '{"current_insurance": "Mutuelle C", "health_issues": ["Dentaire", "Hospitalisation"], "budget_range": "Premium (>100€)", "urgency_level": "medium"}');

-- Campagnes marketing de démonstration
INSERT INTO marketing_campaigns (name, type, target_segment, status, created_by, stats) VALUES
    ('Séquence Senior Premium', 'Email', 'Senior Premium', 'Active', '11111111-1111-1111-1111-111111111111', '{"sent": 456, "opened": 147, "clicked": 58, "converted": 23, "bounced": 12}'),
    ('Nurturing Santé Senior', 'Email', 'Senior Standard', 'Active', '11111111-1111-1111-1111-111111111111', '{"sent": 789, "opened": 196, "clicked": 67, "converted": 18, "bounced": 23}');

-- ============================================
-- FONCTIONS POUR API
-- ============================================

-- Fonction pour obtenir les métriques commerciales
CREATE OR REPLACE FUNCTION get_commercial_metrics(user_id UUID, period_days INTEGER DEFAULT 30)
RETURNS TABLE (
    total_prospects BIGINT,
    conversions BIGINT,
    conversion_rate DECIMAL,
    total_revenue DECIMAL,
    avg_score DECIMAL,
    senior_prospects BIGINT
) AS $$
BEGIN
    RETURN QUERY
    SELECT 
        COUNT(p.id) as total_prospects,
        COUNT(CASE WHEN p.status = 'Converti' THEN 1 END) as conversions,
        ROUND(
            CASE 
                WHEN COUNT(p.id) > 0 THEN 
                    (COUNT(CASE WHEN p.status = 'Converti' THEN 1 END)::DECIMAL / COUNT(p.id)) * 100 
                ELSE 0 
            END, 2
        ) as conversion_rate,
        SUM(CASE WHEN p.status = 'Converti' THEN p.revenue_potential ELSE 0 END) as total_revenue,
        ROUND(AVG(p.score), 1) as avg_score,
        COUNT(CASE WHEN p.age >= 60 THEN 1 END) as senior_prospects
    FROM prospects p
    WHERE p.assigned_to = user_id
    AND p.created_at >= CURRENT_DATE - INTERVAL '1 day' * period_days;
END;
$$ LANGUAGE plpgsql;

COMMENT ON DATABASE postgres IS 'Premunia CRM - Base de données complète pour CRM spécialisé mutuelle santé seniors avec intégration Oggo Data';
