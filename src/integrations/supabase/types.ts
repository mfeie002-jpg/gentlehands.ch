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
      ab_test_results: {
        Row: {
          conversion_type: string | null
          conversion_value: number | null
          converted: boolean
          created_at: string
          id: string
          metadata: Json | null
          session_id: string
          test_id: string
          user_id: string | null
          variant_id: string
        }
        Insert: {
          conversion_type?: string | null
          conversion_value?: number | null
          converted?: boolean
          created_at?: string
          id?: string
          metadata?: Json | null
          session_id: string
          test_id: string
          user_id?: string | null
          variant_id: string
        }
        Update: {
          conversion_type?: string | null
          conversion_value?: number | null
          converted?: boolean
          created_at?: string
          id?: string
          metadata?: Json | null
          session_id?: string
          test_id?: string
          user_id?: string | null
          variant_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "ab_test_results_test_id_fkey"
            columns: ["test_id"]
            isOneToOne: false
            referencedRelation: "ab_tests"
            referencedColumns: ["id"]
          },
        ]
      }
      ab_tests: {
        Row: {
          created_at: string
          description: string | null
          end_date: string | null
          id: string
          is_active: boolean
          name: string
          start_date: string
          test_type: string
          updated_at: string
          variants: Json
        }
        Insert: {
          created_at?: string
          description?: string | null
          end_date?: string | null
          id?: string
          is_active?: boolean
          name: string
          start_date?: string
          test_type?: string
          updated_at?: string
          variants?: Json
        }
        Update: {
          created_at?: string
          description?: string | null
          end_date?: string | null
          id?: string
          is_active?: boolean
          name?: string
          start_date?: string
          test_type?: string
          updated_at?: string
          variants?: Json
        }
        Relationships: []
      }
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
      booking_feedback: {
        Row: {
          allow_public_display: boolean | null
          atmosphere_rating: number | null
          booking_id: string
          comment: string | null
          feedback_token: string | null
          id: string
          is_approved_for_display: boolean | null
          overall_rating: number | null
          submitted_at: string | null
          therapist_id: string | null
          therapist_rating: number | null
          would_recommend: boolean | null
        }
        Insert: {
          allow_public_display?: boolean | null
          atmosphere_rating?: number | null
          booking_id: string
          comment?: string | null
          feedback_token?: string | null
          id?: string
          is_approved_for_display?: boolean | null
          overall_rating?: number | null
          submitted_at?: string | null
          therapist_id?: string | null
          therapist_rating?: number | null
          would_recommend?: boolean | null
        }
        Update: {
          allow_public_display?: boolean | null
          atmosphere_rating?: number | null
          booking_id?: string
          comment?: string | null
          feedback_token?: string | null
          id?: string
          is_approved_for_display?: boolean | null
          overall_rating?: number | null
          submitted_at?: string | null
          therapist_id?: string | null
          therapist_rating?: number | null
          would_recommend?: boolean | null
        }
        Relationships: [
          {
            foreignKeyName: "booking_feedback_booking_id_fkey"
            columns: ["booking_id"]
            isOneToOne: true
            referencedRelation: "bookings"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "booking_feedback_therapist_id_fkey"
            columns: ["therapist_id"]
            isOneToOne: false
            referencedRelation: "therapists"
            referencedColumns: ["id"]
          },
        ]
      }
      booking_waitlist: {
        Row: {
          created_at: string | null
          customer_email: string
          customer_name: string
          customer_phone: string | null
          duration: string | null
          expires_at: string | null
          id: string
          massage_type: string | null
          notification_sent_at: string | null
          preferred_date: string
          preferred_therapist_id: string | null
          preferred_time: string | null
          status: string
          theme: string | null
          updated_at: string | null
        }
        Insert: {
          created_at?: string | null
          customer_email: string
          customer_name: string
          customer_phone?: string | null
          duration?: string | null
          expires_at?: string | null
          id?: string
          massage_type?: string | null
          notification_sent_at?: string | null
          preferred_date: string
          preferred_therapist_id?: string | null
          preferred_time?: string | null
          status?: string
          theme?: string | null
          updated_at?: string | null
        }
        Update: {
          created_at?: string | null
          customer_email?: string
          customer_name?: string
          customer_phone?: string | null
          duration?: string | null
          expires_at?: string | null
          id?: string
          massage_type?: string | null
          notification_sent_at?: string | null
          preferred_date?: string
          preferred_therapist_id?: string | null
          preferred_time?: string | null
          status?: string
          theme?: string | null
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "booking_waitlist_preferred_therapist_id_fkey"
            columns: ["preferred_therapist_id"]
            isOneToOne: false
            referencedRelation: "therapists"
            referencedColumns: ["id"]
          },
        ]
      }
      bookings: {
        Row: {
          additional_notes: string | null
          amount_paid: number | null
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
          feedback_requested_at: string | null
          id: string
          intensity_preference: string | null
          intuitive: boolean | null
          is_available: boolean | null
          is_verified: boolean | null
          massage: string
          masseur: string
          music_preference: string | null
          newsletter_consent: boolean | null
          payment_intent_id: string | null
          payment_method: string | null
          payment_status: string | null
          preferred_contact: string | null
          reminder_sent_at: string | null
          status: string | null
          theme: string
          therapist_id: string | null
          updated_at: string
          verification_sent_at: string | null
          verification_token: string | null
        }
        Insert: {
          additional_notes?: string | null
          amount_paid?: number | null
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
          feedback_requested_at?: string | null
          id?: string
          intensity_preference?: string | null
          intuitive?: boolean | null
          is_available?: boolean | null
          is_verified?: boolean | null
          massage: string
          masseur: string
          music_preference?: string | null
          newsletter_consent?: boolean | null
          payment_intent_id?: string | null
          payment_method?: string | null
          payment_status?: string | null
          preferred_contact?: string | null
          reminder_sent_at?: string | null
          status?: string | null
          theme: string
          therapist_id?: string | null
          updated_at?: string
          verification_sent_at?: string | null
          verification_token?: string | null
        }
        Update: {
          additional_notes?: string | null
          amount_paid?: number | null
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
          feedback_requested_at?: string | null
          id?: string
          intensity_preference?: string | null
          intuitive?: boolean | null
          is_available?: boolean | null
          is_verified?: boolean | null
          massage?: string
          masseur?: string
          music_preference?: string | null
          newsletter_consent?: boolean | null
          payment_intent_id?: string | null
          payment_method?: string | null
          payment_status?: string | null
          preferred_contact?: string | null
          reminder_sent_at?: string | null
          status?: string | null
          theme?: string
          therapist_id?: string | null
          updated_at?: string
          verification_sent_at?: string | null
          verification_token?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "bookings_therapist_id_fkey"
            columns: ["therapist_id"]
            isOneToOne: false
            referencedRelation: "therapists"
            referencedColumns: ["id"]
          },
        ]
      }
      conversion_goals: {
        Row: {
          alert_threshold: number | null
          created_at: string
          current_value: number
          description: string | null
          goal_type: string
          id: string
          is_active: boolean | null
          name: string
          period: string
          target_value: number
          updated_at: string
        }
        Insert: {
          alert_threshold?: number | null
          created_at?: string
          current_value?: number
          description?: string | null
          goal_type?: string
          id?: string
          is_active?: boolean | null
          name: string
          period?: string
          target_value?: number
          updated_at?: string
        }
        Update: {
          alert_threshold?: number | null
          created_at?: string
          current_value?: number
          description?: string | null
          goal_type?: string
          id?: string
          is_active?: boolean | null
          name?: string
          period?: string
          target_value?: number
          updated_at?: string
        }
        Relationships: []
      }
      customer_journeys: {
        Row: {
          completed_at: string | null
          conversion_type: string | null
          created_at: string
          device_type: string | null
          events: Json
          id: string
          session_id: string
          source: string | null
          started_at: string
          updated_at: string
          user_id: string | null
          utm_campaign: string | null
          utm_medium: string | null
          utm_source: string | null
        }
        Insert: {
          completed_at?: string | null
          conversion_type?: string | null
          created_at?: string
          device_type?: string | null
          events?: Json
          id?: string
          session_id: string
          source?: string | null
          started_at?: string
          updated_at?: string
          user_id?: string | null
          utm_campaign?: string | null
          utm_medium?: string | null
          utm_source?: string | null
        }
        Update: {
          completed_at?: string | null
          conversion_type?: string | null
          created_at?: string
          device_type?: string | null
          events?: Json
          id?: string
          session_id?: string
          source?: string | null
          started_at?: string
          updated_at?: string
          user_id?: string | null
          utm_campaign?: string | null
          utm_medium?: string | null
          utm_source?: string | null
        }
        Relationships: []
      }
      experience_themes: {
        Row: {
          atmosphere_tags: string[] | null
          background_gradient: string | null
          color: string | null
          created_at: string | null
          description: string | null
          display_order: number | null
          icon: string | null
          id: string
          image_url: string | null
          is_active: boolean | null
          is_featured: boolean | null
          music_style: string | null
          name: string
          scent_profile: string | null
          short_description: string | null
          updated_at: string | null
        }
        Insert: {
          atmosphere_tags?: string[] | null
          background_gradient?: string | null
          color?: string | null
          created_at?: string | null
          description?: string | null
          display_order?: number | null
          icon?: string | null
          id?: string
          image_url?: string | null
          is_active?: boolean | null
          is_featured?: boolean | null
          music_style?: string | null
          name: string
          scent_profile?: string | null
          short_description?: string | null
          updated_at?: string | null
        }
        Update: {
          atmosphere_tags?: string[] | null
          background_gradient?: string | null
          color?: string | null
          created_at?: string | null
          description?: string | null
          display_order?: number | null
          icon?: string | null
          id?: string
          image_url?: string | null
          is_active?: boolean | null
          is_featured?: boolean | null
          music_style?: string | null
          name?: string
          scent_profile?: string | null
          short_description?: string | null
          updated_at?: string | null
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
      goal_alerts: {
        Row: {
          alert_type: string
          created_at: string
          goal_id: string
          id: string
          is_read: boolean | null
          message: string
        }
        Insert: {
          alert_type?: string
          created_at?: string
          goal_id: string
          id?: string
          is_read?: boolean | null
          message: string
        }
        Update: {
          alert_type?: string
          created_at?: string
          goal_id?: string
          id?: string
          is_read?: boolean | null
          message?: string
        }
        Relationships: [
          {
            foreignKeyName: "goal_alerts_goal_id_fkey"
            columns: ["goal_id"]
            isOneToOne: false
            referencedRelation: "conversion_goals"
            referencedColumns: ["id"]
          },
        ]
      }
      goal_history: {
        Row: {
          achieved_value: number
          created_at: string
          goal_id: string
          id: string
          percentage_achieved: number | null
          period_end: string
          period_start: string
          target_value: number
        }
        Insert: {
          achieved_value?: number
          created_at?: string
          goal_id: string
          id?: string
          percentage_achieved?: number | null
          period_end: string
          period_start: string
          target_value: number
        }
        Update: {
          achieved_value?: number
          created_at?: string
          goal_id?: string
          id?: string
          percentage_achieved?: number | null
          period_end?: string
          period_start?: string
          target_value?: number
        }
        Relationships: [
          {
            foreignKeyName: "goal_history_goal_id_fkey"
            columns: ["goal_id"]
            isOneToOne: false
            referencedRelation: "conversion_goals"
            referencedColumns: ["id"]
          },
        ]
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
      massage_trainings: {
        Row: {
          content: string
          created_at: string | null
          description: string | null
          display_order: number | null
          duration_minutes: number | null
          id: string
          is_active: boolean | null
          massage_type_id: string | null
          step_by_step_guide: Json | null
          title: string
          updated_at: string | null
          video_url: string | null
        }
        Insert: {
          content: string
          created_at?: string | null
          description?: string | null
          display_order?: number | null
          duration_minutes?: number | null
          id?: string
          is_active?: boolean | null
          massage_type_id?: string | null
          step_by_step_guide?: Json | null
          title: string
          updated_at?: string | null
          video_url?: string | null
        }
        Update: {
          content?: string
          created_at?: string | null
          description?: string | null
          display_order?: number | null
          duration_minutes?: number | null
          id?: string
          is_active?: boolean | null
          massage_type_id?: string | null
          step_by_step_guide?: Json | null
          title?: string
          updated_at?: string | null
          video_url?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "massage_trainings_massage_type_id_fkey"
            columns: ["massage_type_id"]
            isOneToOne: false
            referencedRelation: "massage_types"
            referencedColumns: ["id"]
          },
        ]
      }
      massage_types: {
        Row: {
          base_price: number | null
          benefits: string[] | null
          created_at: string | null
          description: string | null
          display_order: number | null
          durations: Json | null
          icon: string | null
          id: string
          ideal_for: string | null
          image_url: string | null
          is_active: boolean | null
          is_featured: boolean | null
          name: string
          requires_specialty: string | null
          short_description: string | null
          techniques: string[] | null
          updated_at: string | null
        }
        Insert: {
          base_price?: number | null
          benefits?: string[] | null
          created_at?: string | null
          description?: string | null
          display_order?: number | null
          durations?: Json | null
          icon?: string | null
          id?: string
          ideal_for?: string | null
          image_url?: string | null
          is_active?: boolean | null
          is_featured?: boolean | null
          name: string
          requires_specialty?: string | null
          short_description?: string | null
          techniques?: string[] | null
          updated_at?: string | null
        }
        Update: {
          base_price?: number | null
          benefits?: string[] | null
          created_at?: string | null
          description?: string | null
          display_order?: number | null
          durations?: Json | null
          icon?: string | null
          id?: string
          ideal_for?: string | null
          image_url?: string | null
          is_active?: boolean | null
          is_featured?: boolean | null
          name?: string
          requires_specialty?: string | null
          short_description?: string | null
          techniques?: string[] | null
          updated_at?: string | null
        }
        Relationships: []
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
      therapist_certifications: {
        Row: {
          attempts: number | null
          certified_at: string | null
          created_at: string | null
          id: string
          massage_type_id: string
          passed: boolean | null
          quiz_score: number | null
          therapist_id: string
          training_id: string | null
          updated_at: string | null
        }
        Insert: {
          attempts?: number | null
          certified_at?: string | null
          created_at?: string | null
          id?: string
          massage_type_id: string
          passed?: boolean | null
          quiz_score?: number | null
          therapist_id: string
          training_id?: string | null
          updated_at?: string | null
        }
        Update: {
          attempts?: number | null
          certified_at?: string | null
          created_at?: string | null
          id?: string
          massage_type_id?: string
          passed?: boolean | null
          quiz_score?: number | null
          therapist_id?: string
          training_id?: string | null
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "therapist_certifications_massage_type_id_fkey"
            columns: ["massage_type_id"]
            isOneToOne: false
            referencedRelation: "massage_types"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "therapist_certifications_therapist_id_fkey"
            columns: ["therapist_id"]
            isOneToOne: false
            referencedRelation: "therapists"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "therapist_certifications_training_id_fkey"
            columns: ["training_id"]
            isOneToOne: false
            referencedRelation: "massage_trainings"
            referencedColumns: ["id"]
          },
        ]
      }
      therapist_earnings: {
        Row: {
          amount: number
          booking_id: string | null
          commission_rate: number | null
          created_at: string | null
          id: string
          net_amount: number
          paid_at: string | null
          status: string | null
          therapist_id: string
        }
        Insert: {
          amount: number
          booking_id?: string | null
          commission_rate?: number | null
          created_at?: string | null
          id?: string
          net_amount: number
          paid_at?: string | null
          status?: string | null
          therapist_id: string
        }
        Update: {
          amount?: number
          booking_id?: string | null
          commission_rate?: number | null
          created_at?: string | null
          id?: string
          net_amount?: number
          paid_at?: string | null
          status?: string | null
          therapist_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "therapist_earnings_booking_id_fkey"
            columns: ["booking_id"]
            isOneToOne: false
            referencedRelation: "bookings"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "therapist_earnings_therapist_id_fkey"
            columns: ["therapist_id"]
            isOneToOne: false
            referencedRelation: "therapists"
            referencedColumns: ["id"]
          },
        ]
      }
      therapists: {
        Row: {
          approved_at: string | null
          approved_by: string | null
          available_days: string[] | null
          average_rating: number | null
          bio: string | null
          color: string | null
          created_at: string | null
          display_order: number | null
          email: string
          experience_years: number | null
          hourly_rate: number | null
          id: string
          is_featured: boolean | null
          name: string
          phone: string | null
          photo_url: string | null
          qualifications: string[] | null
          rejection_reason: string | null
          specialty: string[] | null
          status: Database["public"]["Enums"]["therapist_status"] | null
          total_bookings: number | null
          updated_at: string | null
          user_id: string | null
          video_url: string | null
          working_hours_end: string | null
          working_hours_start: string | null
        }
        Insert: {
          approved_at?: string | null
          approved_by?: string | null
          available_days?: string[] | null
          average_rating?: number | null
          bio?: string | null
          color?: string | null
          created_at?: string | null
          display_order?: number | null
          email: string
          experience_years?: number | null
          hourly_rate?: number | null
          id?: string
          is_featured?: boolean | null
          name: string
          phone?: string | null
          photo_url?: string | null
          qualifications?: string[] | null
          rejection_reason?: string | null
          specialty?: string[] | null
          status?: Database["public"]["Enums"]["therapist_status"] | null
          total_bookings?: number | null
          updated_at?: string | null
          user_id?: string | null
          video_url?: string | null
          working_hours_end?: string | null
          working_hours_start?: string | null
        }
        Update: {
          approved_at?: string | null
          approved_by?: string | null
          available_days?: string[] | null
          average_rating?: number | null
          bio?: string | null
          color?: string | null
          created_at?: string | null
          display_order?: number | null
          email?: string
          experience_years?: number | null
          hourly_rate?: number | null
          id?: string
          is_featured?: boolean | null
          name?: string
          phone?: string | null
          photo_url?: string | null
          qualifications?: string[] | null
          rejection_reason?: string | null
          specialty?: string[] | null
          status?: Database["public"]["Enums"]["therapist_status"] | null
          total_bookings?: number | null
          updated_at?: string | null
          user_id?: string | null
          video_url?: string | null
          working_hours_end?: string | null
          working_hours_start?: string | null
        }
        Relationships: []
      }
      training_quizzes: {
        Row: {
          correct_answer: number
          created_at: string | null
          display_order: number | null
          explanation: string | null
          id: string
          options: Json
          question: string
          training_id: string
        }
        Insert: {
          correct_answer: number
          created_at?: string | null
          display_order?: number | null
          explanation?: string | null
          id?: string
          options: Json
          question: string
          training_id: string
        }
        Update: {
          correct_answer?: number
          created_at?: string | null
          display_order?: number | null
          explanation?: string | null
          id?: string
          options?: Json
          question?: string
          training_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "training_quizzes_training_id_fkey"
            columns: ["training_id"]
            isOneToOne: false
            referencedRelation: "massage_trainings"
            referencedColumns: ["id"]
          },
        ]
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
      auto_assign_therapist: {
        Args: {
          p_appointment_date: string
          p_appointment_time: string
          p_massage_type: string
        }
        Returns: string
      }
      check_gift_card_balance: {
        Args: { p_code: string }
        Returns: {
          expires_at: string
          is_redeemed: boolean
          remaining_balance: number
          valid: boolean
        }[]
      }
      get_all_availability: {
        Args: { p_end_date: string; p_start_date: string }
        Returns: {
          date: string
          is_available: boolean
          therapist_id: string
          therapist_name: string
          time_slot: string
        }[]
      }
      get_booking_recommendations: {
        Args: { p_user_id?: string }
        Returns: {
          item_id: string
          item_name: string
          reason: string
          recommendation_type: string
          score: number
        }[]
      }
      get_therapist_availability: {
        Args: { p_date: string; p_therapist_id: string }
        Returns: {
          is_available: boolean
          time_slot: string
        }[]
      }
      get_waitlist_for_slot: {
        Args: { p_date: string; p_therapist_id?: string; p_time?: string }
        Returns: {
          created_at: string
          customer_email: string
          customer_name: string
          customer_phone: string
          id: string
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
      redeem_gift_card: {
        Args: { p_amount: number; p_booking_id?: string; p_code: string }
        Returns: {
          message: string
          new_balance: number
          success: boolean
        }[]
      }
    }
    Enums: {
      app_role: "admin" | "moderator" | "user"
      therapist_status: "pending" | "approved" | "rejected" | "suspended"
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
      therapist_status: ["pending", "approved", "rejected", "suspended"],
    },
  },
} as const
