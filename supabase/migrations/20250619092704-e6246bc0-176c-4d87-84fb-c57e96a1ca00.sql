
-- Activer RLS sur toutes les tables principales
ALTER TABLE public.utilisateurs ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.contacts ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.propositions ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.contrats ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.taches ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.tickets ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.campagnes ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.workflows ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.objectifs ENABLE ROW LEVEL SECURITY;

-- Fonction pour récupérer le rôle de l'utilisateur connecté
CREATE OR REPLACE FUNCTION public.get_user_role(user_id UUID)
RETURNS TEXT
LANGUAGE SQL
SECURITY DEFINER
STABLE
AS $$
  SELECT r.nom
  FROM public.utilisateurs u
  JOIN public.roles r ON u.role_id = r.id
  WHERE u.id = user_id;
$$;

-- Fonction pour vérifier si l'utilisateur a un rôle spécifique
CREATE OR REPLACE FUNCTION public.has_role(required_role TEXT)
RETURNS BOOLEAN
LANGUAGE SQL
SECURITY DEFINER
STABLE
AS $$
  SELECT public.get_user_role(auth.uid()) = required_role;
$$;

-- Politiques pour la table utilisateurs
CREATE POLICY "Admins peuvent voir tous les utilisateurs"
ON public.utilisateurs FOR SELECT
USING (public.has_role('admin'));

CREATE POLICY "Gestionnaires peuvent voir leur équipe"
ON public.utilisateurs FOR SELECT
USING (
  public.has_role('gestionnaire') OR 
  public.has_role('admin') OR 
  id = auth.uid()
);

CREATE POLICY "Utilisateurs peuvent voir leur propre profil"
ON public.utilisateurs FOR SELECT
USING (id = auth.uid());

-- Politiques pour la table contacts
CREATE POLICY "Admins peuvent voir tous les contacts"
ON public.contacts FOR ALL
USING (public.has_role('admin'));

CREATE POLICY "Conseillers peuvent voir leurs contacts assignés"
ON public.contacts FOR ALL
USING (conseiller_id = auth.uid() OR public.has_role('admin'));

CREATE POLICY "Gestionnaires peuvent voir les contacts de leur équipe"
ON public.contacts FOR ALL
USING (
  public.has_role('admin') OR
  conseiller_id = auth.uid() OR
  conseiller_id IN (
    SELECT id FROM public.utilisateurs 
    WHERE id != auth.uid() AND public.has_role('gestionnaire')
  )
);

-- Politiques pour les propositions
CREATE POLICY "Accès propositions selon rôle"
ON public.propositions FOR ALL
USING (
  public.has_role('admin') OR
  conseiller_id = auth.uid() OR
  (public.has_role('gestionnaire') AND conseiller_id IN (
    SELECT id FROM public.utilisateurs WHERE id != auth.uid()
  ))
);

-- Politiques pour les contrats
CREATE POLICY "Accès contrats selon rôle"
ON public.contrats FOR ALL
USING (
  public.has_role('admin') OR
  conseiller_id = auth.uid() OR
  (public.has_role('gestionnaire') AND conseiller_id IN (
    SELECT id FROM public.utilisateurs WHERE id != auth.uid()
  ))
);

-- Politiques pour les tâches
CREATE POLICY "Accès tâches selon assignation et rôle"
ON public.taches FOR ALL
USING (
  public.has_role('admin') OR
  assignee_id = auth.uid() OR
  createur_id = auth.uid() OR
  (public.has_role('gestionnaire') AND (
    assignee_id IN (SELECT id FROM public.utilisateurs WHERE id != auth.uid()) OR
    createur_id IN (SELECT id FROM public.utilisateurs WHERE id != auth.uid())
  ))
);

-- Politiques pour les tickets
CREATE POLICY "Accès tickets selon rôle"
ON public.tickets FOR ALL
USING (
  public.has_role('admin') OR
  assignee_id = auth.uid() OR
  (public.has_role('gestionnaire') AND assignee_id IN (
    SELECT id FROM public.utilisateurs WHERE id != auth.uid()
  ))
);

-- Politiques pour les campagnes (Admin seulement)
CREATE POLICY "Seuls les admins peuvent gérer les campagnes"
ON public.campagnes FOR ALL
USING (public.has_role('admin'));

-- Politiques pour les workflows (Admin seulement)
CREATE POLICY "Seuls les admins peuvent gérer les workflows"
ON public.workflows FOR ALL
USING (public.has_role('admin'));

-- Politiques pour les objectifs
CREATE POLICY "Accès objectifs selon rôle"
ON public.objectifs FOR ALL
USING (
  public.has_role('admin') OR
  utilisateur_id = auth.uid() OR
  (public.has_role('gestionnaire') AND utilisateur_id IN (
    SELECT id FROM public.utilisateurs WHERE id != auth.uid()
  ))
);

-- Politique en lecture seule pour la table roles
ALTER TABLE public.roles ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Tous peuvent lire les rôles"
ON public.roles FOR SELECT
USING (true);
