import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";

interface WaitlistEntry {
  id: string;
  customer_email: string;
  customer_name: string;
  customer_phone: string | null;
  preferred_date: string;
  preferred_time: string | null;
  preferred_therapist_id: string | null;
  massage_type: string | null;
  theme: string | null;
  duration: string | null;
  status: string;
  created_at: string;
  expires_at: string;
}

export const useWaitlist = (email?: string) => {
  const [entries, setEntries] = useState<WaitlistEntry[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  useEffect(() => {
    if (email) {
      fetchUserWaitlist(email);
    }
  }, [email]);

  const fetchUserWaitlist = async (userEmail: string) => {
    setIsLoading(true);
    try {
      const { data, error } = await supabase
        .from("booking_waitlist")
        .select("*")
        .eq("customer_email", userEmail)
        .in("status", ["waiting", "notified"])
        .order("created_at", { ascending: false });

      if (error) throw error;
      setEntries(data || []);
    } catch (error) {
      console.error("Error fetching waitlist:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const joinWaitlist = async (entry: Omit<WaitlistEntry, "id" | "status" | "created_at" | "expires_at">) => {
    try {
      const { data, error } = await supabase
        .from("booking_waitlist")
        .insert(entry)
        .select()
        .single();

      if (error) throw error;

      setEntries(prev => [data, ...prev]);
      toast({
        title: "Auf Warteliste gesetzt",
        description: "Sie werden benachrichtigt, sobald ein Platz frei wird."
      });

      return data;
    } catch (error: any) {
      console.error("Error joining waitlist:", error);
      toast({
        title: "Fehler",
        description: "Konnte nicht auf Warteliste setzen.",
        variant: "destructive"
      });
      return null;
    }
  };

  const cancelWaitlistEntry = async (entryId: string) => {
    try {
      const { error } = await supabase
        .from("booking_waitlist")
        .update({ status: "cancelled" })
        .eq("id", entryId);

      if (error) throw error;

      setEntries(prev => prev.filter(e => e.id !== entryId));
      toast({
        title: "Wartelisten-Eintrag gelöscht",
        description: "Sie wurden von der Warteliste entfernt."
      });
    } catch (error: any) {
      console.error("Error cancelling waitlist entry:", error);
      toast({
        title: "Fehler",
        description: "Konnte Eintrag nicht löschen.",
        variant: "destructive"
      });
    }
  };

  const checkSlotAvailability = async (date: string, time?: string, therapistId?: string) => {
    try {
      // Check if there are any confirmed bookings for this slot
      let query = supabase
        .from("bookings")
        .select("id")
        .eq("appointment_date", date)
        .not("status", "in", '("cancelled","rejected")');

      if (time) {
        query = query.eq("appointment_time", time);
      }

      if (therapistId) {
        query = query.eq("therapist_id", therapistId);
      }

      const { data, error } = await query;

      if (error) throw error;

      // Slot is available if no bookings found
      return (data?.length || 0) === 0;
    } catch (error) {
      console.error("Error checking availability:", error);
      return true; // Assume available on error
    }
  };

  const getWaitlistCount = async (date: string, time?: string) => {
    try {
      let query = supabase
        .from("booking_waitlist")
        .select("id", { count: "exact" })
        .eq("preferred_date", date)
        .eq("status", "waiting");

      if (time) {
        query = query.eq("preferred_time", time);
      }

      const { count, error } = await query;

      if (error) throw error;
      return count || 0;
    } catch (error) {
      console.error("Error getting waitlist count:", error);
      return 0;
    }
  };

  return {
    entries,
    isLoading,
    joinWaitlist,
    cancelWaitlistEntry,
    checkSlotAvailability,
    getWaitlistCount,
    refetch: email ? () => fetchUserWaitlist(email) : undefined
  };
};
