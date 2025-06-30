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
          created_at: string | null
          cree_par: string | null
          date_debut: string | null
          date_fin: string | null
          declencheur: Json | null
          description: string | null
          etapes: Json | null
          id: string
          nom: string
          statut: string | null
          type: string
          updated_at: string | null
        }
        Insert: {
          created_at?: string | null
          cree_par?: string | null
          date_debut?: string | null
          date_fin?: string | null
          declencheur?: Json | null
          description?: string | null
          etapes?: Json | null
          id?: string
          nom: string
          statut?: string | null
          type: string
          updated_at?: string | null
        }
        Update: {
          created_at?: string | null
          cree_par?: string | null
          date_debut?: string | null
          date_fin?: string | null
          declencheur?: Json | null
          description?: string | null
          etapes?: Json | null
          id?: string
          nom?: string
          statut?: string | null
          type?: string
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "campagnes_cree_par_fkey"
            columns: ["cree_par"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
        ]
      }
      contacts: {
        Row: {
          collaborateur_en_charge: string | null
          created_at: string | null
          date_dernier_statut: string | null
          date_derniere_relance: string | null
          date_naissance: string | null
          derniere_relance_envoyee: string | null
          email: string | null
          id: string
          nom: string
          notes: string | null
          prenom: string
          score: number | null
          source: string | null
          statut_lead: string | null
          tags: string[] | null
          telephone: string | null
          updated_at: string | null
        }
        Insert: {
          collaborateur_en_charge?: string | null
          created_at?: string | null
          date_dernier_statut?: string | null
          date_derniere_relance?: string | null
          date_naissance?: string | null
          derniere_relance_envoyee?: string | null
          email?: string | null
          id?: string
          nom: string
          notes?: string | null
          prenom: string
          score?: number | null
          source?: string | null
          statut_lead?: string | null
          tags?: string[] | null
          telephone?: string | null
          updated_at?: string | null
        }
        Update: {
          collaborateur_en_charge?: string | null
          created_at?: string | null
          date_dernier_statut?: string | null
          date_derniere_relance?: string | null
          date_naissance?: string | null
          derniere_relance_envoyee?: string | null
          email?: string | null
          id?: string
          nom?: string
          notes?: string | null
          prenom?: string
          score?: number | null
          source?: string | null
          statut_lead?: string | null
          tags?: string[] | null
          telephone?: string | null
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "contacts_collaborateur_en_charge_fkey"
            columns: ["collaborateur_en_charge"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
        ]
      }
      equipes: {
        Row: {
          created_at: string | null
          id: string
          manager_id: string | null
          nom: string
        }
        Insert: {
          created_at?: string | null
          id?: string
          manager_id?: string | null
          nom: string
        }
        Update: {
          created_at?: string | null
          id?: string
          manager_id?: string | null
          nom?: string
        }
        Relationships: []
      }
      roles: {
        Row: {
          created_at: string | null
          id: string
          nom: string
          permissions: Json | null
        }
        Insert: {
          created_at?: string | null
          id?: string
          nom: string
          permissions?: Json | null
        }
        Update: {
          created_at?: string | null
          id?: string
          nom?: string
          permissions?: Json | null
        }
        Relationships: []
      }
      taches: {
        Row: {
          assigne_a: string | null
          contact_id: string | null
          created_at: string | null
          cree_par: string | null
          date_completion: string | null
          date_echeance: string | null
          description: string | null
          id: string
          priorite: string | null
          statut: string | null
          titre: string
          updated_at: string | null
        }
        Insert: {
          assigne_a?: string | null
          contact_id?: string | null
          created_at?: string | null
          cree_par?: string | null
          date_completion?: string | null
          date_echeance?: string | null
          description?: string | null
          id?: string
          priorite?: string | null
          statut?: string | null
          titre: string
          updated_at?: string | null
        }
        Update: {
          assigne_a?: string | null
          contact_id?: string | null
          created_at?: string | null
          cree_par?: string | null
          date_completion?: string | null
          date_echeance?: string | null
          description?: string | null
          id?: string
          priorite?: string | null
          statut?: string | null
          titre?: string
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "taches_assigne_a_fkey"
            columns: ["assigne_a"]
            isOneToOne: false
            referencedRelation: "users"
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
            foreignKeyName: "taches_cree_par_fkey"
            columns: ["cree_par"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
        ]
      }
      users: {
        Row: {
          created_at: string | null
          email: string
          equipe_id: string | null
          id: string
          nom_complet: string
          role_id: string | null
          statut: string | null
        }
        Insert: {
          created_at?: string | null
          email: string
          equipe_id?: string | null
          id?: string
          nom_complet: string
          role_id?: string | null
          statut?: string | null
        }
        Update: {
          created_at?: string | null
          email?: string
          equipe_id?: string | null
          id?: string
          nom_complet?: string
          role_id?: string | null
          statut?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "users_equipe_id_fkey"
            columns: ["equipe_id"]
            isOneToOne: false
            referencedRelation: "equipes"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "users_role_id_fkey"
            columns: ["role_id"]
            isOneToOne: false
            referencedRelation: "roles"
            referencedColumns: ["id"]
          },
        ]
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      [_ in never]: never
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
    Enums: {},
  },
} as const
