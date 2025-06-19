
-- Script SQL pour créer les tables Supabase pour CRM Premunia

-- Enable Row Level Security
ALTER DATABASE postgres SET "app.jwt_secret" TO 'your-secret-key-here';

-- Create users table (extends auth.users)
CREATE TABLE IF NOT EXISTS public.users (
  id UUID REFERENCES auth.users(id) PRIMARY KEY,
  email TEXT UNIQUE NOT NULL,
  name TEXT NOT NULL,
  role TEXT NOT NULL CHECK (role IN ('admin', 'manager', 'commercial')),
  objectives JSONB DEFAULT '{}',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create prospects table
CREATE TABLE IF NOT EXISTS public.prospects (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  email TEXT UNIQUE NOT NULL,
  phone TEXT,
  company TEXT,
  segment TEXT NOT NULL CHECK (segment IN ('Senior', 'Premium', 'Standard')),
  score INTEGER DEFAULT 0 CHECK (score >= 0 AND score <= 100),
  status TEXT NOT NULL CHECK (status IN ('Nouveau', 'Qualifié', 'En cours', 'Converti')),
  assigned_to UUID REFERENCES public.users(id),
  source TEXT NOT NULL CHECK (source IN ('Excel', 'HubSpot', 'GoogleSheets', 'Manuel')),
  age INTEGER,
  revenue_potential DECIMAL(10,2) DEFAULT 0,
  last_contact TIMESTAMP WITH TIME ZONE,
  notes TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create opportunities table
CREATE TABLE IF NOT EXISTS public.opportunities (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  prospect_id UUID REFERENCES public.prospects(id) ON DELETE CASCADE,
  title TEXT NOT NULL,
  value DECIMAL(10,2) NOT NULL,
  stage TEXT NOT NULL DEFAULT 'Prospection',
  probability INTEGER DEFAULT 0 CHECK (probability >= 0 AND probability <= 100),
  close_date DATE,
  created_by UUID REFERENCES public.users(id),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create marketing campaigns table
CREATE TABLE IF NOT EXISTS public.marketing_campaigns (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  type TEXT NOT NULL CHECK (type IN ('Email', 'SMS', 'WhatsApp')),
  target_segment TEXT NOT NULL,
  template_id TEXT,
  status TEXT NOT NULL CHECK (status IN ('Draft', 'Active', 'Paused', 'Completed')),
  created_by UUID REFERENCES public.users(id),
  stats JSONB DEFAULT '{"sent": 0, "opened": 0, "clicked": 0, "converted": 0}',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create activities table for tracking actions
CREATE TABLE IF NOT EXISTS public.activities (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  prospect_id UUID REFERENCES public.prospects(id) ON DELETE CASCADE,
  user_id UUID REFERENCES public.users(id),
  type TEXT NOT NULL,
  description TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create email templates table
CREATE TABLE IF NOT EXISTS public.email_templates (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  subject TEXT NOT NULL,
  content TEXT NOT NULL,
  template_type TEXT NOT NULL CHECK (template_type IN ('Senior', 'Premium', 'Standard', 'General')),
  created_by UUID REFERENCES public.users(id),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Enable Row Level Security
ALTER TABLE public.users ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.prospects ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.opportunities ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.marketing_campaigns ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.activities ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.email_templates ENABLE ROW LEVEL SECURITY;

-- RLS Policies

-- Users policies
CREATE POLICY "Users can view all users" ON public.users
  FOR SELECT USING (true);

CREATE POLICY "Only admins can modify users" ON public.users
  FOR ALL USING (
    EXISTS (
      SELECT 1 FROM public.users 
      WHERE id = auth.uid() AND role = 'admin'
    )
  );

-- Prospects policies
CREATE POLICY "Admins and managers can view all prospects" ON public.prospects
  FOR SELECT USING (
    EXISTS (
      SELECT 1 FROM public.users 
      WHERE id = auth.uid() AND role IN ('admin', 'manager')
    )
  );

CREATE POLICY "Commercials can view their assigned prospects" ON public.prospects
  FOR SELECT USING (
    assigned_to = auth.uid() OR
    EXISTS (
      SELECT 1 FROM public.users 
      WHERE id = auth.uid() AND role IN ('admin', 'manager')
    )
  );

CREATE POLICY "Only admins can create/update/delete prospects" ON public.prospects
  FOR ALL USING (
    EXISTS (
      SELECT 1 FROM public.users 
      WHERE id = auth.uid() AND role = 'admin'
    )
  );

-- Opportunities policies
CREATE POLICY "Users can view opportunities for their prospects" ON public.opportunities
  FOR SELECT USING (
    created_by = auth.uid() OR
    EXISTS (
      SELECT 1 FROM public.users 
      WHERE id = auth.uid() AND role IN ('admin', 'manager')
    )
  );

CREATE POLICY "Users can modify their own opportunities" ON public.opportunities
  FOR ALL USING (
    created_by = auth.uid() OR
    EXISTS (
      SELECT 1 FROM public.users 
      WHERE id = auth.uid() AND role = 'admin'
    )
  );

-- Marketing campaigns policies
CREATE POLICY "Only admins can manage marketing campaigns" ON public.marketing_campaigns
  FOR ALL USING (
    EXISTS (
      SELECT 1 FROM public.users 
      WHERE id = auth.uid() AND role = 'admin'
    )
  );

-- Insert default email templates for seniors
INSERT INTO public.email_templates (name, subject, content, template_type) VALUES
  (
    'Relance Senior - Première approche',
    'Votre protection santé après 55 ans - Solutions personnalisées',
    'Bonjour {{name}},

En tant que spécialiste des solutions santé pour les seniors, nous comprenons vos préoccupations concernant l''évolution de vos besoins de santé.

Nos mutuelles seniors offrent :
✓ Remboursements renforcés (optique, dentaire, audiologie)
✓ Tiers payant généralisé
✓ Assistance 24h/7j
✓ Tarifs préférentiels négociés

Souhaitez-vous découvrir nos solutions adaptées à votre profil ?

Cordialement,
{{commercial_name}}',
    'Senior'
  ),
  (
    'Relance Senior - Suivi',
    'N''attendez pas pour votre santé - Devis gratuit en 5 minutes',
    'Bonjour {{name}},

Je fais suite à notre premier contact concernant votre mutuelle santé.

Saviez-vous qu''après 55 ans, 78% des dépenses de santé ne sont pas suffisamment couvertes par la Sécurité Sociale ?

Notre comparateur en ligne vous permet de :
• Comparer toutes les offres du marché
• Obtenir un devis immédiat
• Bénéficier de nos tarifs négociés

Cliquez ici pour votre simulation gratuite : {{comparator_link}}

Belle journée,
{{commercial_name}}',
    'Senior'
  );

-- Create indexes for better performance
CREATE INDEX idx_prospects_assigned_to ON public.prospects(assigned_to);
CREATE INDEX idx_prospects_segment ON public.prospects(segment);
CREATE INDEX idx_prospects_status ON public.prospects(status);
CREATE INDEX idx_opportunities_prospect_id ON public.opportunities(prospect_id);
CREATE INDEX idx_opportunities_created_by ON public.opportunities(created_by);
CREATE INDEX idx_activities_prospect_id ON public.activities(prospect_id);

-- Create functions for automatic scoring
CREATE OR REPLACE FUNCTION calculate_prospect_score(
  p_age INTEGER,
  p_segment TEXT,
  p_revenue_potential DECIMAL
) RETURNS INTEGER AS $$
BEGIN
  RETURN CASE 
    WHEN p_segment = 'Senior' AND p_age >= 55 THEN LEAST(90 + (p_revenue_potential / 1000)::INTEGER, 100)
    WHEN p_segment = 'Premium' THEN LEAST(70 + (p_revenue_potential / 1500)::INTEGER, 95)
    ELSE LEAST(50 + (p_revenue_potential / 2000)::INTEGER, 80)
  END;
END;
$$ LANGUAGE plpgsql;

-- Trigger to auto-calculate score on insert/update
CREATE OR REPLACE FUNCTION update_prospect_score()
RETURNS TRIGGER AS $$
BEGIN
  NEW.score := calculate_prospect_score(NEW.age, NEW.segment, NEW.revenue_potential);
  NEW.updated_at := NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER prospect_score_trigger
  BEFORE INSERT OR UPDATE ON public.prospects
  FOR EACH ROW
  EXECUTE FUNCTION update_prospect_score();
