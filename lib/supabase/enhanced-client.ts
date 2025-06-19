
import { createClient } from '@supabase/supabase-js'
import { Database } from './types'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!

export const supabase = createClient<Database>(supabaseUrl, supabaseAnonKey)

// Enhanced API pour le marketing automation
export const marketingAPI = {
  async createAutomationSequence(campaignData: {
    name: string
    target_segment: string
    template_content: string
    automation_rules: any
  }) {
    const { data, error } = await supabase
      .from('marketing_campaigns')
      .insert([{
        ...campaignData,
        type: 'Email',
        status: 'Draft',
        created_by: 'current-user-id', // À remplacer par l'ID utilisateur actuel
        stats: { sent: 0, opened: 0, clicked: 0, converted: 0, bounced: 0 }
      }])
      .select()
      .single()
    
    if (error) throw error
    return data
  },

  async getActiveSequences() {
    const { data, error } = await supabase
      .from('marketing_campaigns')
      .select('*')
      .eq('status', 'Active')
      .order('created_at', { ascending: false })
    
    if (error) throw error
    return data
  },

  async updateCampaignStats(campaignId: string, stats: any) {
    const { data, error } = await supabase
      .from('marketing_campaigns')
      .update({ stats })
      .eq('id', campaignId)
      .select()
      .single()
    
    if (error) throw error
    return data
  }
}

// API pour la gestion des performances
export const performanceAPI = {
  async getCommercialMetrics(userId: string, period: 'week' | 'month' | 'quarter' | 'year') {
    // Calcul des métriques par période
    const { data: prospects, error: prospectsError } = await supabase
      .from('prospects')
      .select('*, opportunities(*)')
      .eq('assigned_to', userId)
    
    if (prospectsError) throw prospectsError

    const { data: activities, error: activitiesError } = await supabase
      .from('activities')
      .select('*')
      .eq('user_id', userId)
    
    if (activitiesError) throw activitiesError

    // Calculs des KPIs
    const totalProspects = prospects?.length || 0
    const convertedProspects = prospects?.filter(p => p.status === 'Converti').length || 0
    const conversionRate = totalProspects > 0 ? (convertedProspects / totalProspects) * 100 : 0
    const totalRevenue = prospects?.reduce((sum, p) => sum + (p.revenue_potential || 0), 0) || 0
    
    return {
      totalProspects,
      convertedProspects,
      conversionRate,
      totalRevenue,
      activitiesCount: activities?.length || 0,
      averageScore: prospects?.reduce((sum, p) => sum + p.score, 0) / totalProspects || 0
    }
  },

  async getTeamPerformance() {
    const { data: users, error } = await supabase
      .from('users')
      .select(`
        *,
        prospects!prospects_assigned_to_fkey(*)
      `)
      .eq('role', 'commercial')
    
    if (error) throw error
    return users
  }
}

// API pour l'intégration Oggo
export const oggoAPI = {
  async getComparatorData(prospectAge: number, healthSituation: any) {
    // Simulation de l'appel API Oggo
    return {
      offers: [
        {
          id: 1,
          provider: 'Mutuelle A',
          monthlyPrice: 89,
          coverage: 'Premium',
          advantages: ['Optique incluse', 'Dentaire 300%', 'Hospitalisation']
        },
        {
          id: 2,
          provider: 'Mutuelle B',
          monthlyPrice: 76,
          coverage: 'Standard',
          advantages: ['Optique 150%', 'Dentaire 200%', 'Médecine douce']
        }
      ],
      recommendations: [
        'Compte tenu de l\'âge et des besoins, nous recommandons une couverture premium',
        'Les garanties optiques sont particulièrement importantes pour cette tranche d\'âge'
      ]
    }
  }
}
