export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  public: {
    Tables: {
      campagnes: {
        Row: {
          actions: Json
          conditions: Json
          createur_id: string | null
          date_activation: string | null
          date_creation: string
          date_fin: string | null
          declencheur: Json
          description: string | null
          id: string
          nb_clics: number
          nb_contacts_cibles: number
          nb_conversions: number
          nb_emails_envoyes: number
          nb_ouvertures: number
          nom: string
          statut: string
          type_campagne: string
        }
        Insert: {
          actions?: Json
          conditions?: Json
          createur_id?: string | null
          date_activation?: string | null
          date_creation?: string
          date_fin?: string | null
          declencheur?: Json
          description?: string | null
          id?: string
          nb_clics?: number
          nb_contacts_cibles?: number
          nb_conversions?: number
          nb_emails_envoyes?: number
          nb_ouvertures?: number
          nom: string
          statut?: string
          type_campagne: string
        }
        Update: {
          actions?: Json
          conditions?: Json
          createur_id?: string | null
          date_activation?: string | null
          date_creation?: string
          date_fin?: string | null
          declencheur?: Json
          description?: string | null
          id?: string
          nb_clics?: number
          nb_contacts_cibles?: number
          nb_conversions?: number
          nb_emails_envoyes?: number
          nb_ouvertures?: number
          nom?: string
          statut?: string
          type_campagne?: string
        }
        Relationships: [
          {
            foreignKeyName: "campagnes_createur_id_fkey"
            columns: ["createur_id"]
            isOneToOne: false
            referencedRelation: "utilisateurs"
            referencedColumns: ["id"]
          },
        ]
      }
      clients: {
        Row: {
          adresse: string | null
          code_postal: string | null
          date_creation: string | null
          date_modification: string | null
          email: string
          entreprise: string | null
          id: string
          nom: string
          pays: string | null
          prenom: string
          statut: string | null
          telephone: string | null
          ville: string | null
        }
        Insert: {
          adresse?: string | null
          code_postal?: string | null
          date_creation?: string | null
          date_modification?: string | null
          email: string
          entreprise?: string | null
          id?: string
          nom: string
          pays?: string | null
          prenom: string
          statut?: string | null
          telephone?: string | null
          ville?: string | null
        }
        Update: {
          adresse?: string | null
          code_postal?: string | null
          date_creation?: string | null
          date_modification?: string | null
          email?: string
          entreprise?: string | null
          id?: string
          nom?: string
          pays?: string | null
          prenom?: string
          statut?: string | null
          telephone?: string | null
          ville?: string | null
        }
        Relationships: []
      }
      contacts: {
        Row: {
          adresse: string | null
          code_postal: string | null
          conseiller_id: string | null
          consentement_rgpd: boolean
          date_creation: string
          date_derniere_interaction: string | null
          date_modification: string
          email: string
          entreprise: string | null
          id: string
          nom: string
          notes: string | null
          pays: string
          poste: string | null
          prenom: string
          score: number
          source: string | null
          statut: string
          tags: string[] | null
          telephone: string | null
          telephone_mobile: string | null
          ville: string | null
        }
        Insert: {
          adresse?: string | null
          code_postal?: string | null
          conseiller_id?: string | null
          consentement_rgpd?: boolean
          date_creation?: string
          date_derniere_interaction?: string | null
          date_modification?: string
          email: string
          entreprise?: string | null
          id?: string
          nom: string
          notes?: string | null
          pays: string
          poste?: string | null
          prenom: string
          score?: number
          source?: string | null
          statut?: string
          tags?: string[] | null
          telephone?: string | null
          telephone_mobile?: string | null
          ville?: string | null
        }
        Update: {
          adresse?: string | null
          code_postal?: string | null
          conseiller_id?: string | null
          consentement_rgpd?: boolean
          date_creation?: string
          date_derniere_interaction?: string | null
          date_modification?: string
          email?: string
          entreprise?: string | null
          id?: string
          nom?: string
          notes?: string | null
          pays?: string
          poste?: string | null
          prenom?: string
          score?: number
          source?: string | null
          statut?: string
          tags?: string[] | null
          telephone?: string | null
          telephone_mobile?: string | null
          ville?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "contacts_conseiller_id_fkey"
            columns: ["conseiller_id"]
            isOneToOne: false
            referencedRelation: "utilisateurs"
            referencedColumns: ["id"]
          },
        ]
      }
      contrats: {
        Row: {
          conditions_generales: string | null
          conseiller_id: string | null
          contact_id: string
          date_creation: string
          date_echeance: string | null
          date_effet: string
          date_resiliation: string | null
          date_signature: string
          document_signe_url: string | null
          duree_mois: number | null
          id: string
          montant_annuel: number | null
          montant_mensuel: number | null
          numero: string
          proposition_id: string | null
          statut: string
          titre: string
          type_contrat: string
        }
        Insert: {
          conditions_generales?: string | null
          conseiller_id?: string | null
          contact_id: string
          date_creation?: string
          date_echeance?: string | null
          date_effet: string
          date_resiliation?: string | null
          date_signature: string
          document_signe_url?: string | null
          duree_mois?: number | null
          id?: string
          montant_annuel?: number | null
          montant_mensuel?: number | null
          numero: string
          proposition_id?: string | null
          statut?: string
          titre: string
          type_contrat: string
        }
        Update: {
          conditions_generales?: string | null
          conseiller_id?: string | null
          contact_id?: string
          date_creation?: string
          date_echeance?: string | null
          date_effet?: string
          date_resiliation?: string | null
          date_signature?: string
          document_signe_url?: string | null
          duree_mois?: number | null
          id?: string
          montant_annuel?: number | null
          montant_mensuel?: number | null
          numero?: string
          proposition_id?: string | null
          statut?: string
          titre?: string
          type_contrat?: string
        }
        Relationships: [
          {
            foreignKeyName: "contrats_conseiller_id_fkey"
            columns: ["conseiller_id"]
            isOneToOne: false
            referencedRelation: "utilisateurs"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "contrats_contact_id_fkey"
            columns: ["contact_id"]
            isOneToOne: false
            referencedRelation: "contacts"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "contrats_proposition_id_fkey"
            columns: ["proposition_id"]
            isOneToOne: false
            referencedRelation: "propositions"
            referencedColumns: ["id"]
          },
        ]
      }
      interactions: {
        Row: {
          client_id: string | null
          contenu: string | null
          date_interaction: string | null
          id: string
          sujet: string | null
          type: string
        }
        Insert: {
          client_id?: string | null
          contenu?: string | null
          date_interaction?: string | null
          id?: string
          sujet?: string | null
          type: string
        }
        Update: {
          client_id?: string | null
          contenu?: string | null
          date_interaction?: string | null
          id?: string
          sujet?: string | null
          type?: string
        }
        Relationships: [
          {
            foreignKeyName: "interactions_client_id_fkey"
            columns: ["client_id"]
            isOneToOne: false
            referencedRelation: "clients"
            referencedColumns: ["id"]
          },
        ]
      }
      objectifs: {
        Row: {
          date_creation: string
          description: string | null
          equipe_id: string | null
          id: string
          nom: string
          periode_debut: string
          periode_fin: string
          statut: string
          type_objectif: string
          unite: string | null
          utilisateur_id: string | null
          valeur_actuelle: number
          valeur_cible: number
        }
        Insert: {
          date_creation?: string
          description?: string | null
          equipe_id?: string | null
          id?: string
          nom: string
          periode_debut: string
          periode_fin: string
          statut?: string
          type_objectif: string
          unite?: string | null
          utilisateur_id?: string | null
          valeur_actuelle?: number
          valeur_cible: number
        }
        Update: {
          date_creation?: string
          description?: string | null
          equipe_id?: string | null
          id?: string
          nom?: string
          periode_debut?: string
          periode_fin?: string
          statut?: string
          type_objectif?: string
          unite?: string | null
          utilisateur_id?: string | null
          valeur_actuelle?: number
          valeur_cible?: number
        }
        Relationships: [
          {
            foreignKeyName: "objectifs_utilisateur_id_fkey"
            columns: ["utilisateur_id"]
            isOneToOne: false
            referencedRelation: "utilisateurs"
            referencedColumns: ["id"]
          },
        ]
      }
      opportunites: {
        Row: {
          client_id: string | null
          date_creation: string | null
          date_fermeture_prevue: string | null
          description: string | null
          etape: string | null
          id: string
          probabilite: number | null
          statut: string | null
          titre: string
          valeur: number | null
        }
        Insert: {
          client_id?: string | null
          date_creation?: string | null
          date_fermeture_prevue?: string | null
          description?: string | null
          etape?: string | null
          id?: string
          probabilite?: number | null
          statut?: string | null
          titre: string
          valeur?: number | null
        }
        Update: {
          client_id?: string | null
          date_creation?: string | null
          date_fermeture_prevue?: string | null
          description?: string | null
          etape?: string | null
          id?: string
          probabilite?: number | null
          statut?: string | null
          titre?: string
          valeur?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "opportunites_client_id_fkey"
            columns: ["client_id"]
            isOneToOne: false
            referencedRelation: "clients"
            referencedColumns: ["id"]
          },
        ]
      }
      propositions: {
        Row: {
          conditions_particulieres: string | null
          conseiller_id: string | null
          contact_id: string
          date_creation: string
          date_envoi: string | null
          date_expiration: string | null
          date_signature: string | null
          description: string | null
          document_url: string | null
          id: string
          montant_ht: number | null
          montant_ttc: number | null
          numero: string
          probabilite: number
          statut: string
          taux_tva: number
          titre: string
        }
        Insert: {
          conditions_particulieres?: string | null
          conseiller_id?: string | null
          contact_id: string
          date_creation?: string
          date_envoi?: string | null
          date_expiration?: string | null
          date_signature?: string | null
          description?: string | null
          document_url?: string | null
          id?: string
          montant_ht?: number | null
          montant_ttc?: number | null
          numero: string
          probabilite?: number
          statut?: string
          taux_tva: number
          titre: string
        }
        Update: {
          conditions_particulieres?: string | null
          conseiller_id?: string | null
          contact_id?: string
          date_creation?: string
          date_envoi?: string | null
          date_expiration?: string | null
          date_signature?: string | null
          description?: string | null
          document_url?: string | null
          id?: string
          montant_ht?: number | null
          montant_ttc?: number | null
          numero?: string
          probabilite?: number
          statut?: string
          taux_tva?: number
          titre?: string
        }
        Relationships: [
          {
            foreignKeyName: "propositions_conseiller_id_fkey"
            columns: ["conseiller_id"]
            isOneToOne: false
            referencedRelation: "utilisateurs"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "propositions_contact_id_fkey"
            columns: ["contact_id"]
            isOneToOne: false
            referencedRelation: "contacts"
            referencedColumns: ["id"]
          },
        ]
      }
      roles: {
        Row: {
          date_creation: string
          description: string | null
          id: string
          nom: string
          permissions: Json
        }
        Insert: {
          date_creation?: string
          description?: string | null
          id?: string
          nom: string
          permissions?: Json
        }
        Update: {
          date_creation?: string
          description?: string | null
          id?: string
          nom?: string
          permissions?: Json
        }
        Relationships: []
      }
      taches: {
        Row: {
          assignee_id: string | null
          contact_id: string | null
          contrat_id: string | null
          createur_id: string | null
          date_completion: string | null
          date_creation: string
          date_echeance: string | null
          description: string | null
          id: string
          priorite: string
          proposition_id: string | null
          rappel_avant_heures: number
          rappel_envoye: boolean
          statut: string
          titre: string
        }
        Insert: {
          assignee_id?: string | null
          contact_id?: string | null
          contrat_id?: string | null
          createur_id?: string | null
          date_completion?: string | null
          date_creation?: string
          date_echeance?: string | null
          description?: string | null
          id?: string
          priorite?: string
          proposition_id?: string | null
          rappel_avant_heures?: number
          rappel_envoye?: boolean
          statut?: string
          titre: string
        }
        Update: {
          assignee_id?: string | null
          contact_id?: string | null
          contrat_id?: string | null
          createur_id?: string | null
          date_completion?: string | null
          date_creation?: string
          date_echeance?: string | null
          description?: string | null
          id?: string
          priorite?: string
          proposition_id?: string | null
          rappel_avant_heures?: number
          rappel_envoye?: boolean
          statut?: string
          titre?: string
        }
        Relationships: [
          {
            foreignKeyName: "taches_assignee_id_fkey"
            columns: ["assignee_id"]
            isOneToOne: false
            referencedRelation: "utilisateurs"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "taches_contact_id_fkey"
            columns: ["contact_id"]
            isOneToOne: false
            referencedRelation: "contacts"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "taches_contrat_id_fkey"
            columns: ["contrat_id"]
            isOneToOne: false
            referencedRelation: "contrats"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "taches_createur_id_fkey"
            columns: ["createur_id"]
            isOneToOne: false
            referencedRelation: "utilisateurs"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "taches_proposition_id_fkey"
            columns: ["proposition_id"]
            isOneToOne: false
            referencedRelation: "propositions"
            referencedColumns: ["id"]
          },
        ]
      }
      tickets: {
        Row: {
          assignee_id: string | null
          canal: string
          contact_id: string
          contrat_id: string | null
          date_creation: string
          date_fermeture: string | null
          date_premiere_reponse: string | null
          date_resolution: string | null
          description: string
          id: string
          numero: string
          priorite: string
          satisfaction_client: number | null
          statut: string
          sujet: string
          type_ticket: string
        }
        Insert: {
          assignee_id?: string | null
          canal: string
          contact_id: string
          contrat_id?: string | null
          date_creation?: string
          date_fermeture?: string | null
          date_premiere_reponse?: string | null
          date_resolution?: string | null
          description: string
          id?: string
          numero: string
          priorite?: string
          satisfaction_client?: number | null
          statut?: string
          sujet: string
          type_ticket: string
        }
        Update: {
          assignee_id?: string | null
          canal?: string
          contact_id?: string
          contrat_id?: string | null
          date_creation?: string
          date_fermeture?: string | null
          date_premiere_reponse?: string | null
          date_resolution?: string | null
          description?: string
          id?: string
          numero?: string
          priorite?: string
          satisfaction_client?: number | null
          statut?: string
          sujet?: string
          type_ticket?: string
        }
        Relationships: [
          {
            foreignKeyName: "tickets_assignee_id_fkey"
            columns: ["assignee_id"]
            isOneToOne: false
            referencedRelation: "utilisateurs"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "tickets_contact_id_fkey"
            columns: ["contact_id"]
            isOneToOne: false
            referencedRelation: "contacts"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "tickets_contrat_id_fkey"
            columns: ["contrat_id"]
            isOneToOne: false
            referencedRelation: "contrats"
            referencedColumns: ["id"]
          },
        ]
      }
      utilisateurs: {
        Row: {
          avatar_url: string | null
          date_creation: string
          date_modification: string
          derniere_connexion: string | null
          email: string
          id: string
          nom: string
          objectifs: Json
          preferences: Json
          prenom: string
          role_id: string
          statut: string
          telephone: string | null
        }
        Insert: {
          avatar_url?: string | null
          date_creation?: string
          date_modification?: string
          derniere_connexion?: string | null
          email: string
          id?: string
          nom: string
          objectifs?: Json
          preferences?: Json
          prenom: string
          role_id: string
          statut?: string
          telephone?: string | null
        }
        Update: {
          avatar_url?: string | null
          date_creation?: string
          date_modification?: string
          derniere_connexion?: string | null
          email?: string
          id?: string
          nom?: string
          objectifs?: Json
          preferences?: Json
          prenom?: string
          role_id?: string
          statut?: string
          telephone?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "utilisateurs_role_id_fkey"
            columns: ["role_id"]
            isOneToOne: false
            referencedRelation: "roles"
            referencedColumns: ["id"]
          },
        ]
      }
      workflows: {
        Row: {
          conditions_sortie: Json
          createur_id: string | null
          date_activation: string | null
          date_creation: string
          declencheur: Json
          description: string | null
          etapes: Json
          id: string
          nb_contacts_actifs: number
          nb_contacts_termines: number
          nom: string
          statut: string
        }
        Insert: {
          conditions_sortie?: Json
          createur_id?: string | null
          date_activation?: string | null
          date_creation?: string
          declencheur?: Json
          description?: string | null
          etapes?: Json
          id?: string
          nb_contacts_actifs?: number
          nb_contacts_termines?: number
          nom: string
          statut?: string
        }
        Update: {
          conditions_sortie?: Json
          createur_id?: string | null
          date_activation?: string | null
          date_creation?: string
          declencheur?: Json
          description?: string | null
          etapes?: Json
          id?: string
          nb_contacts_actifs?: number
          nb_contacts_termines?: number
          nom?: string
          statut?: string
        }
        Relationships: [
          {
            foreignKeyName: "workflows_createur_id_fkey"
            columns: ["createur_id"]
            isOneToOne: false
            referencedRelation: "utilisateurs"
            referencedColumns: ["id"]
          },
        ]
      }
      wrappers_fdw_stats: {
        Row: {
          bytes_in: number | null
          bytes_out: number | null
          create_times: number | null
          created_at: string
          fdw_name: string
          metadata: Json | null
          rows_in: number | null
          rows_out: number | null
          updated_at: string
        }
        Insert: {
          bytes_in?: number | null
          bytes_out?: number | null
          create_times?: number | null
          created_at?: string
          fdw_name: string
          metadata?: Json | null
          rows_in?: number | null
          rows_out?: number | null
          updated_at?: string
        }
        Update: {
          bytes_in?: number | null
          bytes_out?: number | null
          create_times?: number | null
          created_at?: string
          fdw_name?: string
          metadata?: Json | null
          rows_in?: number | null
          rows_out?: number | null
          updated_at?: string
        }
        Relationships: []
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      airtable_fdw_handler: {
        Args: Record<PropertyKey, never>
        Returns: unknown
      }
      airtable_fdw_meta: {
        Args: Record<PropertyKey, never>
        Returns: {
          name: string
          version: string
          author: string
          website: string
        }[]
      }
      airtable_fdw_validator: {
        Args: { options: string[]; catalog: unknown }
        Returns: undefined
      }
      auth0_fdw_handler: {
        Args: Record<PropertyKey, never>
        Returns: unknown
      }
      auth0_fdw_meta: {
        Args: Record<PropertyKey, never>
        Returns: {
          name: string
          version: string
          author: string
          website: string
        }[]
      }
      auth0_fdw_validator: {
        Args: { options: string[]; catalog: unknown }
        Returns: undefined
      }
      big_query_fdw_handler: {
        Args: Record<PropertyKey, never>
        Returns: unknown
      }
      big_query_fdw_meta: {
        Args: Record<PropertyKey, never>
        Returns: {
          name: string
          version: string
          author: string
          website: string
        }[]
      }
      big_query_fdw_validator: {
        Args: { options: string[]; catalog: unknown }
        Returns: undefined
      }
      click_house_fdw_handler: {
        Args: Record<PropertyKey, never>
        Returns: unknown
      }
      click_house_fdw_meta: {
        Args: Record<PropertyKey, never>
        Returns: {
          name: string
          version: string
          author: string
          website: string
        }[]
      }
      click_house_fdw_validator: {
        Args: { options: string[]; catalog: unknown }
        Returns: undefined
      }
      cognito_fdw_handler: {
        Args: Record<PropertyKey, never>
        Returns: unknown
      }
      cognito_fdw_meta: {
        Args: Record<PropertyKey, never>
        Returns: {
          name: string
          version: string
          author: string
          website: string
        }[]
      }
      cognito_fdw_validator: {
        Args: { options: string[]; catalog: unknown }
        Returns: undefined
      }
      firebase_fdw_handler: {
        Args: Record<PropertyKey, never>
        Returns: unknown
      }
      firebase_fdw_meta: {
        Args: Record<PropertyKey, never>
        Returns: {
          name: string
          version: string
          author: string
          website: string
        }[]
      }
      firebase_fdw_validator: {
        Args: { options: string[]; catalog: unknown }
        Returns: undefined
      }
      get_user_role: {
        Args: { user_id: string }
        Returns: string
      }
      has_role: {
        Args: { required_role: string }
        Returns: boolean
      }
      hello_world_fdw_handler: {
        Args: Record<PropertyKey, never>
        Returns: unknown
      }
      hello_world_fdw_meta: {
        Args: Record<PropertyKey, never>
        Returns: {
          name: string
          version: string
          author: string
          website: string
        }[]
      }
      hello_world_fdw_validator: {
        Args: { options: string[]; catalog: unknown }
        Returns: undefined
      }
      logflare_fdw_handler: {
        Args: Record<PropertyKey, never>
        Returns: unknown
      }
      logflare_fdw_meta: {
        Args: Record<PropertyKey, never>
        Returns: {
          name: string
          version: string
          author: string
          website: string
        }[]
      }
      logflare_fdw_validator: {
        Args: { options: string[]; catalog: unknown }
        Returns: undefined
      }
      mssql_fdw_handler: {
        Args: Record<PropertyKey, never>
        Returns: unknown
      }
      mssql_fdw_meta: {
        Args: Record<PropertyKey, never>
        Returns: {
          name: string
          version: string
          author: string
          website: string
        }[]
      }
      mssql_fdw_validator: {
        Args: { options: string[]; catalog: unknown }
        Returns: undefined
      }
      redis_fdw_handler: {
        Args: Record<PropertyKey, never>
        Returns: unknown
      }
      redis_fdw_meta: {
        Args: Record<PropertyKey, never>
        Returns: {
          name: string
          version: string
          author: string
          website: string
        }[]
      }
      redis_fdw_validator: {
        Args: { options: string[]; catalog: unknown }
        Returns: undefined
      }
      s3_fdw_handler: {
        Args: Record<PropertyKey, never>
        Returns: unknown
      }
      s3_fdw_meta: {
        Args: Record<PropertyKey, never>
        Returns: {
          name: string
          version: string
          author: string
          website: string
        }[]
      }
      s3_fdw_validator: {
        Args: { options: string[]; catalog: unknown }
        Returns: undefined
      }
      stripe_fdw_handler: {
        Args: Record<PropertyKey, never>
        Returns: unknown
      }
      stripe_fdw_meta: {
        Args: Record<PropertyKey, never>
        Returns: {
          name: string
          version: string
          author: string
          website: string
        }[]
      }
      stripe_fdw_validator: {
        Args: { options: string[]; catalog: unknown }
        Returns: undefined
      }
      wasm_fdw_handler: {
        Args: Record<PropertyKey, never>
        Returns: unknown
      }
      wasm_fdw_meta: {
        Args: Record<PropertyKey, never>
        Returns: {
          name: string
          version: string
          author: string
          website: string
        }[]
      }
      wasm_fdw_validator: {
        Args: { options: string[]; catalog: unknown }
        Returns: undefined
      }
    }
    Enums: {
      activity_type: "call" | "email" | "meeting" | "note"
      customer_status: "active" | "inactive" | "prospect"
      lead_status:
        | "new"
        | "contacted"
        | "qualified"
        | "proposal"
        | "won"
        | "lost"
      task_priority: "low" | "medium" | "high"
      task_status: "pending" | "in_progress" | "completed"
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type DefaultSchema = Database[Extract<keyof Database, "public">]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof (Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        Database[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? (Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      Database[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : DefaultSchemaTableNameOrOptions extends keyof (DefaultSchema["Tables"] &
        DefaultSchema["Views"])
    ? (DefaultSchema["Tables"] &
        DefaultSchema["Views"])[DefaultSchemaTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  DefaultSchemaEnumNameOrOptions extends
    | keyof DefaultSchema["Enums"]
    | { schema: keyof Database },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = DefaultSchemaEnumNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof Database },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends { schema: keyof Database }
  ? Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  public: {
    Enums: {
      activity_type: ["call", "email", "meeting", "note"],
      customer_status: ["active", "inactive", "prospect"],
      lead_status: ["new", "contacted", "qualified", "proposal", "won", "lost"],
      task_priority: ["low", "medium", "high"],
      task_status: ["pending", "in_progress", "completed"],
    },
  },
} as const
