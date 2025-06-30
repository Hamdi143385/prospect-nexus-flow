
export interface User {
  id: string
  email: string
  nom_complet: string
  role_id: string
  equipe_id?: string
  statut: 'actif' | 'inactif'
  created_at: string
  // Propriétés calculées depuis les relations
  role?: string
  role_nom?: string
}

export interface Role {
  id: string
  nom: string
  permissions: any
  created_at: string
}

export interface Contact {
  id: string
  nom: string
  prenom: string
  email?: string
  telephone?: string
  date_naissance?: string
  statut_lead: 'Nouveau' | 'Qualifié' | 'En cours' | 'Converti' | 'Perdu'
  score: number
  source?: string
  collaborateur_en_charge?: string
  notes?: string
  tags?: string[]
  derniere_relance_envoyee?: string
  date_derniere_relance?: string
  date_dernier_statut?: string
  created_at: string
  updated_at: string
}

export interface Campagne {
  id: string
  nom: string
  description?: string
  type: string
  statut: 'brouillon' | 'actif' | 'pause' | 'termine'
  declencheur: any
  etapes: any[]
  date_debut?: string
  date_fin?: string
  cree_par: string
  created_at: string
  updated_at: string
}

export interface Tache {
  id: string
  titre: string
  description?: string
  statut: 'a_faire' | 'en_cours' | 'termine' | 'annule'
  priorite: 'basse' | 'normale' | 'haute' | 'urgente'
  date_echeance?: string
  date_completion?: string
  assigne_a?: string
  cree_par?: string
  contact_id?: string
  created_at: string
  updated_at: string
}
