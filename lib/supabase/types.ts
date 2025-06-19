
export interface Database {
  public: {
    Tables: {
      users: {
        Row: {
          id: string
          email: string
          role: 'admin' | 'manager' | 'commercial'
          name: string
          avatar_url?: string
          created_at: string
          updated_at: string
          is_active: boolean
          objectives?: {
            monthly_target: number
            quarterly_target: number
            annual_target: number
          }
          team_id?: string
        }
        Insert: Omit<Database['public']['Tables']['users']['Row'], 'id' | 'created_at' | 'updated_at'>
        Update: Partial<Database['public']['Tables']['users']['Insert']>
      }
      prospects: {
        Row: {
          id: string
          name: string
          email: string
          phone: string
          company?: string
          age: number
          segment: 'Senior' | 'Premium' | 'Standard'
          score: number
          status: 'Nouveau' | 'Qualifié' | 'En cours' | 'Converti' | 'Perdu'
          assigned_to: string
          created_at: string
          updated_at: string
          source: 'Excel' | 'HubSpot' | 'GoogleSheets' | 'Manuel' | 'Import'
          revenue_potential: number
          last_contact?: string
          notes?: string
          health_situation?: {
            current_insurance: string
            health_issues: string[]
            budget_range: string
            urgency_level: 'low' | 'medium' | 'high'
          }
          automation_stage?: string
        }
        Insert: Omit<Database['public']['Tables']['prospects']['Row'], 'id' | 'created_at' | 'updated_at'>
        Update: Partial<Database['public']['Tables']['prospects']['Insert']>
      }
      opportunities: {
        Row: {
          id: string
          prospect_id: string
          title: string
          value: number
          stage: 'Prospection' | 'Qualification' | 'Proposition' | 'Négociation' | 'Closing' | 'Gagné' | 'Perdu'
          probability: number
          close_date: string
          created_by: string
          created_at: string
          updated_at: string
          products: string[]
          competitor_analysis?: any
        }
        Insert: Omit<Database['public']['Tables']['opportunities']['Row'], 'id' | 'created_at' | 'updated_at'>
        Update: Partial<Database['public']['Tables']['opportunities']['Insert']>
      }
      marketing_campaigns: {
        Row: {
          id: string
          name: string
          type: 'Email' | 'SMS' | 'WhatsApp' | 'Phone'
          target_segment: string
          template_content: string
          status: 'Draft' | 'Active' | 'Paused' | 'Completed'
          created_by: string
          created_at: string
          stats: {
            sent: number
            opened: number
            clicked: number
            converted: number
            bounced: number
          }
          automation_rules: any
        }
        Insert: Omit<Database['public']['Tables']['marketing_campaigns']['Row'], 'id' | 'created_at'>
        Update: Partial<Database['public']['Tables']['marketing_campaigns']['Insert']>
      }
      activities: {
        Row: {
          id: string
          prospect_id: string
          user_id: string
          type: 'call' | 'email' | 'meeting' | 'note' | 'task'
          title: string
          description: string
          status: 'pending' | 'completed' | 'cancelled'
          scheduled_at?: string
          completed_at?: string
          created_at: string
        }
        Insert: Omit<Database['public']['Tables']['activities']['Row'], 'id' | 'created_at'>
        Update: Partial<Database['public']['Tables']['activities']['Insert']>
      }
    }
  }
}

export type User = Database['public']['Tables']['users']['Row']
export type Prospect = Database['public']['Tables']['prospects']['Row']
export type Opportunity = Database['public']['Tables']['opportunities']['Row']
export type MarketingCampaign = Database['public']['Tables']['marketing_campaigns']['Row']
export type Activity = Database['public']['Tables']['activities']['Row']
