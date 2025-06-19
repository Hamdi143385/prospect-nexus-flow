
import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!

export const supabase = createClient(supabaseUrl, supabaseAnonKey)

// Types pour la base de données
export interface User {
  id: string
  email: string
  role: 'admin' | 'manager' | 'commercial'
  name: string
  created_at: string
  objectives?: {
    monthly_target: number
    quarterly_target: number
  }
}

export interface Prospect {
  id: string
  name: string
  email: string
  phone: string
  company: string
  segment: 'Senior' | 'Premium' | 'Standard'
  score: number
  status: 'Nouveau' | 'Qualifié' | 'En cours' | 'Converti'
  assigned_to: string
  created_at: string
  updated_at: string
  source: 'Excel' | 'HubSpot' | 'GoogleSheets' | 'Manuel'
  age?: number
  revenue_potential: number
  last_contact?: string
  notes?: string
}

export interface Opportunity {
  id: string
  prospect_id: string
  title: string
  value: number
  stage: string
  probability: number
  close_date: string
  created_by: string
  created_at: string
  updated_at: string
}

export interface MarketingCampaign {
  id: string
  name: string
  type: 'Email' | 'SMS' | 'WhatsApp'
  target_segment: string
  template_id: string
  status: 'Draft' | 'Active' | 'Paused' | 'Completed'
  created_by: string
  created_at: string
  stats: {
    sent: number
    opened: number
    clicked: number
    converted: number
  }
}
