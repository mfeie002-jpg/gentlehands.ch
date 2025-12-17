import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";

export interface Therapist {
  id: string;
  user_id: string | null;
  name: string;
  email: string;
  phone: string | null;
  photo_url: string | null;
  specialty: string[] | null;
  qualifications: string[] | null;
  bio: string | null;
  experience_years: number;
  available_days: string[] | null;
  working_hours_start: string | null;
  working_hours_end: string | null;
  status: 'pending' | 'approved' | 'rejected' | 'suspended';
  approved_at: string | null;
  display_order: number;
  is_featured: boolean;
  color: string | null;
  total_bookings: number;
  average_rating: number;
  hourly_rate: number | null;
  created_at: string;
}

export interface ExperienceTheme {
  id: string;
  name: string;
  description: string | null;
  short_description: string | null;
  image_url: string | null;
  background_gradient: string | null;
  icon: string | null;
  color: string | null;
  atmosphere_tags: string[] | null;
  music_style: string | null;
  scent_profile: string | null;
  display_order: number;
  is_active: boolean;
  is_featured: boolean;
}

export interface MassageType {
  id: string;
  name: string;
  description: string | null;
  short_description: string | null;
  durations: { duration: string; price: number }[];
  base_price: number | null;
  benefits: string[] | null;
  techniques: string[] | null;
  ideal_for: string | null;
  image_url: string | null;
  icon: string | null;
  display_order: number;
  is_active: boolean;
  is_featured: boolean;
  requires_specialty: string | null;
}

// Fetch approved therapists for booking
export const useApprovedTherapists = () => {
  const [therapists, setTherapists] = useState<Therapist[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchTherapists = async () => {
      try {
        const { data, error: fetchError } = await supabase
          .from('therapists')
          .select('*')
          .eq('status', 'approved')
          .order('display_order', { ascending: true });

        if (fetchError) throw fetchError;
        setTherapists(data || []);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to fetch therapists');
      } finally {
        setIsLoading(false);
      }
    };

    fetchTherapists();

    // Subscribe to realtime updates
    const channel = supabase
      .channel('therapists-changes')
      .on(
        'postgres_changes',
        { event: '*', schema: 'public', table: 'therapists' },
        () => fetchTherapists()
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, []);

  return { therapists, isLoading, error };
};

// Fetch experience themes
export const useExperienceThemes = () => {
  const [themes, setThemes] = useState<ExperienceTheme[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchThemes = async () => {
      try {
        const { data, error: fetchError } = await supabase
          .from('experience_themes')
          .select('*')
          .eq('is_active', true)
          .order('display_order', { ascending: true });

        if (fetchError) throw fetchError;
        setThemes(data || []);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to fetch themes');
      } finally {
        setIsLoading(false);
      }
    };

    fetchThemes();
  }, []);

  return { themes, isLoading, error };
};

// Fetch massage types
export const useMassageTypes = () => {
  const [massageTypes, setMassageTypes] = useState<MassageType[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchMassageTypes = async () => {
      try {
        const { data, error: fetchError } = await supabase
          .from('massage_types')
          .select('*')
          .eq('is_active', true)
          .order('display_order', { ascending: true });

        if (fetchError) throw fetchError;
        
        // Parse durations JSON
        const parsed = (data || []).map(m => ({
          ...m,
          durations: typeof m.durations === 'string' 
            ? JSON.parse(m.durations) 
            : m.durations || []
        }));
        
        setMassageTypes(parsed);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to fetch massage types');
      } finally {
        setIsLoading(false);
      }
    };

    fetchMassageTypes();
  }, []);

  return { massageTypes, isLoading, error };
};

// Check therapist availability
export const useTherapistAvailability = (
  therapistId: string | null,
  date: Date | null
) => {
  const [bookedSlots, setBookedSlots] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (!therapistId || !date) {
      setBookedSlots([]);
      return;
    }

    const fetchAvailability = async () => {
      setIsLoading(true);
      try {
        const dateStr = date.toISOString().split('T')[0];
        
        const { data, error } = await supabase
          .from('bookings')
          .select('appointment_time')
          .eq('therapist_id', therapistId)
          .eq('appointment_date', dateStr)
          .not('status', 'in', '("cancelled","rejected")');

        if (error) throw error;
        setBookedSlots(data?.map(b => b.appointment_time) || []);
      } catch (err) {
        console.error('Failed to fetch availability:', err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchAvailability();
  }, [therapistId, date]);

  return { bookedSlots, isLoading };
};

// Auto-assign therapist
export const autoAssignTherapist = async (
  massageType: string,
  appointmentDate: string,
  appointmentTime: string
): Promise<string | null> => {
  try {
    const { data, error } = await supabase
      .rpc('auto_assign_therapist', {
        p_massage_type: massageType,
        p_appointment_date: appointmentDate,
        p_appointment_time: appointmentTime
      });

    if (error) throw error;
    return data;
  } catch (err) {
    console.error('Auto-assign failed:', err);
    return null;
  }
};

// Therapist's own dashboard data
export const useTherapistDashboard = () => {
  const [therapist, setTherapist] = useState<Therapist | null>(null);
  const [bookings, setBookings] = useState<any[]>([]);
  const [earnings, setEarnings] = useState<any[]>([]);
  const [feedback, setFeedback] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        const { data: { user } } = await supabase.auth.getUser();
        if (!user) return;

        // Get therapist profile
        const { data: therapistData } = await supabase
          .from('therapists')
          .select('*')
          .eq('user_id', user.id)
          .single();

        if (!therapistData) return;
        setTherapist(therapistData);

        // Get bookings
        const { data: bookingsData } = await supabase
          .from('bookings')
          .select('*')
          .eq('therapist_id', therapistData.id)
          .order('appointment_date', { ascending: true });

        setBookings(bookingsData || []);

        // Get earnings
        const { data: earningsData } = await supabase
          .from('therapist_earnings')
          .select('*')
          .eq('therapist_id', therapistData.id)
          .order('created_at', { ascending: false });

        setEarnings(earningsData || []);

        // Get feedback
        const { data: feedbackData } = await supabase
          .from('booking_feedback')
          .select('*')
          .eq('therapist_id', therapistData.id)
          .order('submitted_at', { ascending: false });

        setFeedback(feedbackData || []);
      } catch (err) {
        console.error('Failed to fetch dashboard data:', err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchDashboardData();
  }, []);

  return { therapist, bookings, earnings, feedback, isLoading };
};
