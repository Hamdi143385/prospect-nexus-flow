
// Shared types for all API modules
export interface User {
  id: string
  email: string
  name: string
  role: 'admin' | 'manager' | 'commercial'
  avatar_url?: string
  is_active: boolean
  objectives?: any
  team_id?: string
  last_login?: string
  created_at: string
  updated_at: string
}

export interface Company {
  id: string
  name: string
  sector?: string
  size?: 'Startup' | 'PME' | 'ETI' | 'Grande Entreprise'
  revenue?: number
  contacts_count: number
  status: 'Prospect' | 'Client' | 'Partenaire' | 'Inactif'
  location?: string
  phone?: string
  email?: string
  website?: string
  created_year?: number
  siret?: string
  notes?: string
  assigned_to?: string
  created_at: string
  updated_at: string
}

export interface Task {
  id: string
  title: string
  description?: string
  type: 'call' | 'email' | 'meeting' | 'demo' | 'follow_up' | 'admin'
  priority: 'low' | 'medium' | 'high' | 'urgent'
  status: 'pending' | 'in_progress' | 'completed' | 'cancelled'
  due_date?: string
  estimated_duration?: number
  actual_duration?: number
  assigned_to?: string
  created_by?: string
  prospect_id?: string
  company_id?: string
  tags?: string[]
  completed_at?: string
  created_at: string
  updated_at: string
}

export interface EmailTemplate {
  id: string
  name: string
  subject: string
  content: string
  template_type: string
  category?: string
  variables?: string[]
  is_active: boolean
  usage_count: number
  created_by?: string
  created_at: string
  updated_at: string
}

export interface Workflow {
  id: string
  name: string
  description?: string
  trigger_type: string
  trigger_conditions?: any
  is_active: boolean
  execution_count: number
  success_rate?: number
  created_by?: string
  created_at: string
  updated_at: string
}

export interface InteractionHistory {
  id: string
  prospect_id?: string
  company_id?: string
  user_id?: string
  type: 'call' | 'email' | 'meeting' | 'sms' | 'whatsapp' | 'note'
  direction: 'inbound' | 'outbound'
  subject?: string
  content?: string
  duration?: number
  outcome?: string
  next_action?: string
  attachments?: any[]
  metadata?: any
  created_at: string
}
