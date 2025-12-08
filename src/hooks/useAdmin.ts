import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';

export interface Booking {
  id: string;
  booking_number: string;
  customer_name: string;
  customer_email: string;
  customer_phone: string;
  massage: string;
  theme: string;
  masseur: string;
  duration: string;
  appointment_date: string;
  appointment_time: string;
  status: string | null;
  created_at: string;
  additional_notes: string | null;
}

export interface Testimonial {
  id: string;
  name: string;
  content: string;
  rating: number | null;
  location: string | null;
  theme: string | null;
  is_approved: boolean | null;
  submitted_at: string | null;
}

export interface GiftCard {
  id: string;
  code: string;
  value: number;
  remaining_balance: number;
  recipient_name: string | null;
  recipient_email: string | null;
  purchaser_email: string | null;
  message: string | null;
  is_redeemed: boolean | null;
  expires_at: string | null;
  created_at: string | null;
}

export interface ActivityLog {
  id: string;
  user_id: string | null;
  action: string;
  entity_type: string;
  entity_id: string | null;
  details: unknown;
  created_at: string;
}

export const useAdminAuth = () => {
  const [isAdmin, setIsAdmin] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [user, setUser] = useState<any>(null);

  useEffect(() => {
    const checkAdmin = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      
      if (session?.user) {
        setUser(session.user);
        const { data } = await supabase
          .from('user_roles')
          .select('role')
          .eq('user_id', session.user.id)
          .eq('role', 'admin')
          .maybeSingle();
        
        setIsAdmin(!!data);
      }
      setIsLoading(false);
    };

    checkAdmin();

    const { data: { subscription } } = supabase.auth.onAuthStateChange(async (event, session) => {
      if (session?.user) {
        setUser(session.user);
        const { data } = await supabase
          .from('user_roles')
          .select('role')
          .eq('user_id', session.user.id)
          .eq('role', 'admin')
          .maybeSingle();
        
        setIsAdmin(!!data);
      } else {
        setUser(null);
        setIsAdmin(false);
      }
      setIsLoading(false);
    });

    return () => subscription.unsubscribe();
  }, []);

  return { isAdmin, isLoading, user };
};

export const useBookings = () => {
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const { toast } = useToast();

  const fetchBookings = async () => {
    const { data, error } = await supabase
      .from('bookings')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) {
      toast({ title: 'Fehler', description: error.message, variant: 'destructive' });
    } else {
      setBookings(data || []);
    }
    setIsLoading(false);
  };

  useEffect(() => {
    fetchBookings();

    const channel = supabase
      .channel('bookings-changes')
      .on('postgres_changes', { event: '*', schema: 'public', table: 'bookings' }, () => {
        fetchBookings();
      })
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, []);

  const updateBookingStatus = async (id: string, status: string) => {
    const { error } = await supabase
      .from('bookings')
      .update({ status })
      .eq('id', id);

    if (error) {
      toast({ title: 'Fehler', description: error.message, variant: 'destructive' });
      return false;
    }
    
    await logActivity('update', 'booking', id, { status });
    toast({ title: 'Erfolg', description: 'Status aktualisiert' });
    return true;
  };

  const deleteBooking = async (id: string) => {
    const { error } = await supabase
      .from('bookings')
      .delete()
      .eq('id', id);

    if (error) {
      toast({ title: 'Fehler', description: error.message, variant: 'destructive' });
      return false;
    }
    
    await logActivity('delete', 'booking', id);
    toast({ title: 'Erfolg', description: 'Buchung gelöscht' });
    return true;
  };

  return { bookings, isLoading, updateBookingStatus, deleteBooking, refetch: fetchBookings };
};

export const useTestimonials = () => {
  const [testimonials, setTestimonials] = useState<Testimonial[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const { toast } = useToast();

  const fetchTestimonials = async () => {
    const { data, error } = await supabase
      .from('testimonial_submissions')
      .select('*')
      .order('submitted_at', { ascending: false });

    if (error) {
      toast({ title: 'Fehler', description: error.message, variant: 'destructive' });
    } else {
      setTestimonials(data || []);
    }
    setIsLoading(false);
  };

  useEffect(() => {
    fetchTestimonials();

    const channel = supabase
      .channel('testimonials-changes')
      .on('postgres_changes', { event: '*', schema: 'public', table: 'testimonial_submissions' }, () => {
        fetchTestimonials();
      })
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, []);

  const approveTestimonial = async (id: string, approved: boolean) => {
    const { error } = await supabase
      .from('testimonial_submissions')
      .update({ is_approved: approved })
      .eq('id', id);

    if (error) {
      toast({ title: 'Fehler', description: error.message, variant: 'destructive' });
      return false;
    }
    
    await logActivity(approved ? 'approve' : 'reject', 'testimonial', id);
    toast({ title: 'Erfolg', description: approved ? 'Testimonial genehmigt' : 'Testimonial abgelehnt' });
    return true;
  };

  const deleteTestimonial = async (id: string) => {
    const { error } = await supabase
      .from('testimonial_submissions')
      .delete()
      .eq('id', id);

    if (error) {
      toast({ title: 'Fehler', description: error.message, variant: 'destructive' });
      return false;
    }
    
    await logActivity('delete', 'testimonial', id);
    toast({ title: 'Erfolg', description: 'Testimonial gelöscht' });
    return true;
  };

  return { testimonials, isLoading, approveTestimonial, deleteTestimonial, refetch: fetchTestimonials };
};

export const useGiftCards = () => {
  const [giftCards, setGiftCards] = useState<GiftCard[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const { toast } = useToast();

  const fetchGiftCards = async () => {
    const { data, error } = await supabase
      .from('gift_cards')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) {
      toast({ title: 'Fehler', description: error.message, variant: 'destructive' });
    } else {
      setGiftCards(data || []);
    }
    setIsLoading(false);
  };

  useEffect(() => {
    fetchGiftCards();

    const channel = supabase
      .channel('giftcards-changes')
      .on('postgres_changes', { event: '*', schema: 'public', table: 'gift_cards' }, () => {
        fetchGiftCards();
      })
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, []);

  const createGiftCard = async (data: Partial<GiftCard>) => {
    const code = `GH-${Date.now().toString(36).toUpperCase()}-${Math.random().toString(36).substring(2, 6).toUpperCase()}`;
    
    const { error } = await supabase
      .from('gift_cards')
      .insert({
        code,
        value: data.value || 100,
        remaining_balance: data.value || 100,
        recipient_name: data.recipient_name,
        recipient_email: data.recipient_email,
        purchaser_email: data.purchaser_email,
        message: data.message,
        expires_at: new Date(Date.now() + 365 * 24 * 60 * 60 * 1000).toISOString()
      });

    if (error) {
      toast({ title: 'Fehler', description: error.message, variant: 'destructive' });
      return false;
    }
    
    await logActivity('create', 'gift_card', undefined, { code, value: data.value });
    toast({ title: 'Erfolg', description: `Gutschein ${code} erstellt` });
    return true;
  };

  const updateGiftCardBalance = async (id: string, newBalance: number) => {
    const { error } = await supabase
      .from('gift_cards')
      .update({ remaining_balance: newBalance, is_redeemed: newBalance <= 0 })
      .eq('id', id);

    if (error) {
      toast({ title: 'Fehler', description: error.message, variant: 'destructive' });
      return false;
    }
    
    await logActivity('update', 'gift_card', id, { new_balance: newBalance });
    toast({ title: 'Erfolg', description: 'Guthaben aktualisiert' });
    return true;
  };

  return { giftCards, isLoading, createGiftCard, updateGiftCardBalance, refetch: fetchGiftCards };
};

export const useActivityLogs = () => {
  const [logs, setLogs] = useState<ActivityLog[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchLogs = async () => {
      const { data } = await supabase
        .from('activity_logs')
        .select('*')
        .order('created_at', { ascending: false })
        .limit(50);

      setLogs(data || []);
      setIsLoading(false);
    };

    fetchLogs();

    const channel = supabase
      .channel('activity-changes')
      .on('postgres_changes', { event: 'INSERT', schema: 'public', table: 'activity_logs' }, (payload) => {
        setLogs(prev => [payload.new as ActivityLog, ...prev].slice(0, 50));
      })
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, []);

  return { logs, isLoading };
};

const logActivity = async (action: string, entityType: string, entityId?: string, details?: Record<string, unknown>) => {
  // Use secure RPC function instead of direct insert
  await supabase.rpc('log_activity', {
    p_action: action,
    p_entity_type: entityType,
    p_entity_id: entityId || null,
    p_details: details ? JSON.parse(JSON.stringify(details)) : null
  });
};

export const useAdminStats = () => {
  const [stats, setStats] = useState({
    totalBookings: 0,
    pendingBookings: 0,
    confirmedBookings: 0,
    totalRevenue: 0,
    totalTestimonials: 0,
    pendingTestimonials: 0,
    totalGiftCards: 0,
    giftCardValue: 0,
    todayBookings: 0,
    weekBookings: 0,
    monthBookings: 0
  });
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchStats = async () => {
      const today = new Date().toISOString().split('T')[0];
      const weekAgo = new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString().split('T')[0];
      const monthAgo = new Date(Date.now() - 30 * 24 * 60 * 60 * 1000).toISOString().split('T')[0];

      const [bookingsRes, testimonialsRes, giftCardsRes] = await Promise.all([
        supabase.from('bookings').select('*'),
        supabase.from('testimonial_submissions').select('*'),
        supabase.from('gift_cards').select('*')
      ]);

      const bookings = bookingsRes.data || [];
      const testimonials = testimonialsRes.data || [];
      const giftCards = giftCardsRes.data || [];

      const priceMap: Record<string, number> = {
        '60': 180,
        '90': 260,
        '120': 340
      };

      setStats({
        totalBookings: bookings.length,
        pendingBookings: bookings.filter(b => b.status === 'pending').length,
        confirmedBookings: bookings.filter(b => b.status === 'confirmed').length,
        totalRevenue: bookings.filter(b => b.status === 'confirmed').reduce((sum, b) => sum + (priceMap[b.duration] || 0), 0),
        totalTestimonials: testimonials.length,
        pendingTestimonials: testimonials.filter(t => !t.is_approved).length,
        totalGiftCards: giftCards.length,
        giftCardValue: giftCards.reduce((sum, g) => sum + g.remaining_balance, 0),
        todayBookings: bookings.filter(b => b.appointment_date === today).length,
        weekBookings: bookings.filter(b => b.appointment_date >= weekAgo).length,
        monthBookings: bookings.filter(b => b.appointment_date >= monthAgo).length
      });
      setIsLoading(false);
    };

    fetchStats();
  }, []);

  return { stats, isLoading };
};
