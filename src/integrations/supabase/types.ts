export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  // Allows to automatically instantiate createClient with right options
  // instead of createClient<Database, { PostgrestVersion: 'XX' }>(URL, KEY)
  __InternalSupabase: {
    PostgrestVersion: "13.0.5"
  }
  public: {
    Tables: {
      activity_logs: {
        Row: {
          action: string
          created_at: string | null
          details: Json | null
          entity_id: string | null
          entity_type: string
          id: string
          user_id: string | null
        }
        Insert: {
          action: string
          created_at?: string | null
          details?: Json | null
          entity_id?: string | null
          entity_type: string
          id?: string
          user_id?: string | null
        }
        Update: {
          action?: string
          created_at?: string | null
          details?: Json | null
          entity_id?: string | null
          entity_type?: string
          id?: string
          user_id?: string | null
        }
        Relationships: []
      }
      bookings: {
        Row: {
          additional_notes: string | null
          appointment_date: string
          appointment_time: string
          avoid_areas: string | null
          booking_number: string
          conversation_preference: string | null
          created_at: string
          customer_email: string
          customer_name: string
          customer_phone: string
          duration: string
          id: string
          intensity_preference: string | null
          intuitive: boolean | null
          is_available: boolean | null
          massage: string
          masseur: string
          music_preference: string | null
          newsletter_consent: boolean | null
          preferred_contact: string | null
          status: string | null
          theme: string
          updated_at: string
        }
        Insert: {
          additional_notes?: string | null
          appointment_date: string
          appointment_time: string
          avoid_areas?: string | null
          booking_number: string
          conversation_preference?: string | null
          created_at?: string
          customer_email: string
          customer_name: string
          customer_phone: string
          duration: string
          id?: string
          intensity_preference?: string | null
          intuitive?: boolean | null
          is_available?: boolean | null
          massage: string
          masseur: string
          music_preference?: string | null
          newsletter_consent?: boolean | null
          preferred_contact?: string | null
          status?: string | null
          theme: string
          updated_at?: string
        }
        Update: {
          additional_notes?: string | null
          appointment_date?: string
          appointment_time?: string
          avoid_areas?: string | null
          booking_number?: string
          conversation_preference?: string | null
          created_at?: string
          customer_email?: string
          customer_name?: string
          customer_phone?: string
          duration?: string
          id?: string
          intensity_preference?: string | null
          intuitive?: boolean | null
          is_available?: boolean | null
          massage?: string
          masseur?: string
          music_preference?: string | null
          newsletter_consent?: boolean | null
          preferred_contact?: string | null
          status?: string | null
          theme?: string
          updated_at?: string
        }
        Relationships: []
      }
      favorites: {
        Row: {
          created_at: string | null
          experience_id: string
          id: string
          massage_type: string | null
          user_id: string
        }
        Insert: {
          created_at?: string | null
          experience_id: string
          id?: string
          massage_type?: string | null
          user_id: string
        }
        Update: {
          created_at?: string | null
          experience_id?: string
          id?: string
          massage_type?: string | null
          user_id?: string
        }
        Relationships: []
      }
      gift_cards: {
        Row: {
          code: string
          created_at: string | null
          expires_at: string | null
          id: string
          is_redeemed: boolean | null
          message: string | null
          purchaser_email: string | null
          recipient_email: string | null
          recipient_name: string | null
          remaining_balance: number
          value: number
        }
        Insert: {
          code: string
          created_at?: string | null
          expires_at?: string | null
          id?: string
          is_redeemed?: boolean | null
          message?: string | null
          purchaser_email?: string | null
          recipient_email?: string | null
          recipient_name?: string | null
          remaining_balance: number
          value: number
        }
        Update: {
          code?: string
          created_at?: string | null
          expires_at?: string | null
          id?: string
          is_redeemed?: boolean | null
          message?: string | null
          purchaser_email?: string | null
          recipient_email?: string | null
          recipient_name?: string | null
          remaining_balance?: number
          value?: number
        }
        Relationships: []
      }
      health_questionnaires: {
        Row: {
          allergies: string | null
          booking_id: string | null
          consent_given: boolean | null
          created_at: string | null
          current_medications: string | null
          id: string
          medical_conditions: string | null
          pain_areas: string[] | null
          pregnancy_status: string | null
          sleep_quality: number | null
          stress_level: number | null
          user_id: string | null
        }
        Insert: {
          allergies?: string | null
          booking_id?: string | null
          consent_given?: boolean | null
          created_at?: string | null
          current_medications?: string | null
          id?: string
          medical_conditions?: string | null
          pain_areas?: string[] | null
          pregnancy_status?: string | null
          sleep_quality?: number | null
          stress_level?: number | null
          user_id?: string | null
        }
        Update: {
          allergies?: string | null
          booking_id?: string | null
          consent_given?: boolean | null
          created_at?: string | null
          current_medications?: string | null
          id?: string
          medical_conditions?: string | null
          pain_areas?: string[] | null
          pregnancy_status?: string | null
          sleep_quality?: number | null
          stress_level?: number | null
          user_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "health_questionnaires_booking_id_fkey"
            columns: ["booking_id"]
            isOneToOne: false
            referencedRelation: "bookings"
            referencedColumns: ["id"]
          },
        ]
      }
      profiles: {
        Row: {
          created_at: string | null
          full_name: string | null
          id: string
          loyalty_points: number | null
          member_since: string | null
          newsletter_subscribed: boolean | null
          phone: string | null
          preferred_theme: string | null
          preferred_therapist: string | null
          total_bookings: number | null
          updated_at: string | null
        }
        Insert: {
          created_at?: string | null
          full_name?: string | null
          id: string
          loyalty_points?: number | null
          member_since?: string | null
          newsletter_subscribed?: boolean | null
          phone?: string | null
          preferred_theme?: string | null
          preferred_therapist?: string | null
          total_bookings?: number | null
          updated_at?: string | null
        }
        Update: {
          created_at?: string | null
          full_name?: string | null
          id?: string
          loyalty_points?: number | null
          member_since?: string | null
          newsletter_subscribed?: boolean | null
          phone?: string | null
          preferred_theme?: string | null
          preferred_therapist?: string | null
          total_bookings?: number | null
          updated_at?: string | null
        }
        Relationships: []
      }
      referrals: {
        Row: {
          created_at: string | null
          id: string
          referral_code: string
          referred_email: string | null
          referrer_id: string
          reward_claimed: boolean | null
          status: string | null
        }
        Insert: {
          created_at?: string | null
          id?: string
          referral_code: string
          referred_email?: string | null
          referrer_id: string
          reward_claimed?: boolean | null
          status?: string | null
        }
        Update: {
          created_at?: string | null
          id?: string
          referral_code?: string
          referred_email?: string | null
          referrer_id?: string
          reward_claimed?: boolean | null
          status?: string | null
        }
        Relationships: []
      }
      session_notes: {
        Row: {
          booking_id: string | null
          created_at: string | null
          id: string
          mood_after: string | null
          mood_before: string | null
          note_date: string | null
          notes: string | null
          private_reflection: string | null
          user_id: string
        }
        Insert: {
          booking_id?: string | null
          created_at?: string | null
          id?: string
          mood_after?: string | null
          mood_before?: string | null
          note_date?: string | null
          notes?: string | null
          private_reflection?: string | null
          user_id: string
        }
        Update: {
          booking_id?: string | null
          created_at?: string | null
          id?: string
          mood_after?: string | null
          mood_before?: string | null
          note_date?: string | null
          notes?: string | null
          private_reflection?: string | null
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "session_notes_booking_id_fkey"
            columns: ["booking_id"]
            isOneToOne: false
            referencedRelation: "bookings"
            referencedColumns: ["id"]
          },
        ]
      }
      testimonial_submissions: {
        Row: {
          content: string
          id: string
          is_approved: boolean | null
          location: string | null
          name: string
          rating: number | null
          submitted_at: string | null
          theme: string | null
          user_id: string | null
        }
        Insert: {
          content: string
          id?: string
          is_approved?: boolean | null
          location?: string | null
          name: string
          rating?: number | null
          submitted_at?: string | null
          theme?: string | null
          user_id?: string | null
        }
        Update: {
          content?: string
          id?: string
          is_approved?: boolean | null
          location?: string | null
          name?: string
          rating?: number | null
          submitted_at?: string | null
          theme?: string | null
          user_id?: string | null
        }
        Relationships: []
      }
      user_roles: {
        Row: {
          created_at: string | null
          id: string
          role: Database["public"]["Enums"]["app_role"]
          user_id: string
        }
        Insert: {
          created_at?: string | null
          id?: string
          role: Database["public"]["Enums"]["app_role"]
          user_id: string
        }
        Update: {
          created_at?: string | null
          id?: string
          role?: Database["public"]["Enums"]["app_role"]
          user_id?: string
        }
        Relationships: []
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      check_gift_card_balance: {
        Args: { p_code: string }
        Returns: {
          expires_at: string
          is_redeemed: boolean
          remaining_balance: number
          valid: boolean
        }[]
      }
      has_role: {
        Args: {
          _role: Database["public"]["Enums"]["app_role"]
          _user_id: string
        }
        Returns: boolean
      }
      log_activity: {
        Args: {
          p_action: string
          p_details?: Json
          p_entity_id?: string
          p_entity_type: string
        }
        Returns: undefined
      }
      lookup_booking_by_number: {
        Args: { p_booking_number: string }
        Returns: {
          appointment_date: string
          appointment_time: string
          booking_number: string
          customer_name: string
          duration: string
          massage: string
          masseur: string
          status: string
          theme: string
        }[]
      }
    }
    Enums: {
      app_role: "admin" | "moderator" | "user"
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type DatabaseWithoutInternals = Omit<Database, "__InternalSupabase">

type DefaultSchema = DatabaseWithoutInternals[Extract<keyof Database, "public">]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
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
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
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
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
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
    | { schema: keyof DatabaseWithoutInternals },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = DefaultSchemaEnumNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof DatabaseWithoutInternals },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  public: {
    Enums: {
      app_role: ["admin", "moderator", "user"],
    },
  },
} as const
