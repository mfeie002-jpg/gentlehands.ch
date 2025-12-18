import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { format, addDays, isToday, isTomorrow } from "date-fns";
import { de } from "date-fns/locale";

interface AvailabilitySlot {
  time_slot: string;
  is_available: boolean;
}

interface TherapistAvailabilityInfo {
  therapistId: string;
  hasAvailableToday: boolean;
  availableTodayCount: number;
  nextAvailableSlot: {
    date: Date;
    time: string;
    displayDate: string;
  } | null;
}

export const useTherapistsLiveAvailability = (therapistIds: string[]) => {
  const [availability, setAvailability] = useState<Map<string, TherapistAvailabilityInfo>>(new Map());
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (therapistIds.length === 0) {
      setIsLoading(false);
      return;
    }

    const fetchAllAvailability = async () => {
      setIsLoading(true);
      const availabilityMap = new Map<string, TherapistAvailabilityInfo>();
      const today = new Date();

      for (const therapistId of therapistIds) {
        let nextSlot: TherapistAvailabilityInfo['nextAvailableSlot'] = null;
        let todayAvailableCount = 0;
        let hasAvailableToday = false;

        // Check next 7 days for availability
        for (let dayOffset = 0; dayOffset < 7 && !nextSlot; dayOffset++) {
          const checkDate = addDays(today, dayOffset);
          const dateStr = format(checkDate, 'yyyy-MM-dd');

          try {
            const { data, error } = await supabase.rpc('get_therapist_availability', {
              p_therapist_id: therapistId,
              p_date: dateStr
            });

            if (error) {
              console.error('Error fetching availability:', error);
              continue;
            }

            const slots = data as AvailabilitySlot[] || [];
            const availableSlots = slots.filter(s => s.is_available);

            // For today, only count future slots
            if (dayOffset === 0) {
              const nowTime = format(today, 'HH:mm');
              const futureSlots = availableSlots.filter(s => s.time_slot > nowTime);
              todayAvailableCount = futureSlots.length;
              hasAvailableToday = futureSlots.length > 0;

              if (futureSlots.length > 0 && !nextSlot) {
                nextSlot = {
                  date: checkDate,
                  time: futureSlots[0].time_slot,
                  displayDate: 'Heute'
                };
              }
            } else if (availableSlots.length > 0 && !nextSlot) {
              nextSlot = {
                date: checkDate,
                time: availableSlots[0].time_slot,
                displayDate: isTomorrow(checkDate) 
                  ? 'Morgen' 
                  : format(checkDate, 'EEEE, d. MMM', { locale: de })
              };
            }
          } catch (err) {
            console.error('Failed to fetch availability for therapist:', therapistId, err);
          }
        }

        availabilityMap.set(therapistId, {
          therapistId,
          hasAvailableToday,
          availableTodayCount: todayAvailableCount,
          nextAvailableSlot: nextSlot
        });
      }

      setAvailability(availabilityMap);
      setIsLoading(false);
    };

    fetchAllAvailability();

    // Refresh every 5 minutes
    const interval = setInterval(fetchAllAvailability, 5 * 60 * 1000);
    return () => clearInterval(interval);
  }, [therapistIds.join(',')]);

  return { availability, isLoading };
};
