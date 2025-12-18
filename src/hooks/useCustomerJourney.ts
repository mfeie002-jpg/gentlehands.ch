import { useEffect, useRef, useCallback } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useLocation } from 'react-router-dom';

interface JourneyEvent {
  type: string;
  page?: string;
  element?: string;
  timestamp: string;
  metadata?: Record<string, any>;
}

const getSessionId = (): string => {
  let sessionId = sessionStorage.getItem('journey_session_id');
  if (!sessionId) {
    sessionId = `session_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
    sessionStorage.setItem('journey_session_id', sessionId);
  }
  return sessionId;
};

const getDeviceType = (): string => {
  const width = window.innerWidth;
  if (width < 768) return 'mobile';
  if (width < 1024) return 'tablet';
  return 'desktop';
};

const getUTMParams = () => {
  const params = new URLSearchParams(window.location.search);
  return {
    utm_source: params.get('utm_source') || undefined,
    utm_medium: params.get('utm_medium') || undefined,
    utm_campaign: params.get('utm_campaign') || undefined,
  };
};

export const useCustomerJourney = () => {
  const location = useLocation();
  const sessionId = useRef(getSessionId());
  const journeyId = useRef<string | null>(null);
  const events = useRef<JourneyEvent[]>([]);
  const initialized = useRef(false);

  // Initialize journey on first load
  const initJourney = useCallback(async () => {
    if (initialized.current) return;
    initialized.current = true;

    const utmParams = getUTMParams();
    
    try {
      const { data, error } = await supabase
        .from('customer_journeys')
        .insert({
          session_id: sessionId.current,
          events: [],
          source: document.referrer || 'direct',
          device_type: getDeviceType(),
          ...utmParams,
        })
        .select('id')
        .single();

      if (error) {
        console.error('Failed to init journey:', error);
        return;
      }

      journeyId.current = data.id;
      console.log('🚀 Journey started:', journeyId.current);
    } catch (err) {
      console.error('Journey init error:', err);
    }
  }, []);

  // Track an event
  const trackEvent = useCallback(async (
    type: string, 
    metadata?: Record<string, any>
  ) => {
    const event: JourneyEvent = {
      type,
      page: location.pathname,
      timestamp: new Date().toISOString(),
      metadata,
    };

    events.current.push(event);

    // Update journey in database
    if (journeyId.current) {
      try {
        await supabase
          .from('customer_journeys')
          .update({ 
            events: JSON.parse(JSON.stringify(events.current)),
            updated_at: new Date().toISOString()
          })
          .eq('id', journeyId.current);
      } catch (err) {
        console.error('Failed to track event:', err);
      }
    }

    console.log('📍 Journey event:', type, metadata);
  }, [location.pathname]);

  // Track page view on route change
  useEffect(() => {
    if (initialized.current) {
      trackEvent('page_view', { path: location.pathname });
    }
  }, [location.pathname, trackEvent]);

  // Specific tracking methods
  const trackBookingStart = useCallback(() => {
    trackEvent('booking_start');
  }, [trackEvent]);

  const trackBookingStep = useCallback((step: number, stepName: string) => {
    trackEvent('booking_step', { step, stepName });
  }, [trackEvent]);

  const trackBookingComplete = useCallback(async (bookingNumber: string, value?: number) => {
    await trackEvent('booking_complete', { bookingNumber, value });
    
    // Mark journey as completed
    if (journeyId.current) {
      await supabase
        .from('customer_journeys')
        .update({ 
          completed_at: new Date().toISOString(),
          conversion_type: 'booking'
        })
        .eq('id', journeyId.current);
    }
  }, [trackEvent]);

  const trackCTAClick = useCallback((ctaName: string, ctaLocation: string) => {
    trackEvent('cta_click', { ctaName, ctaLocation });
  }, [trackEvent]);

  const trackFormInteraction = useCallback((formName: string, field: string) => {
    trackEvent('form_interaction', { formName, field });
  }, [trackEvent]);

  const trackTherapistView = useCallback((therapistName: string) => {
    trackEvent('therapist_view', { therapistName });
  }, [trackEvent]);

  const trackExperienceView = useCallback((experienceName: string) => {
    trackEvent('experience_view', { experienceName });
  }, [trackEvent]);

  const trackVideoPlay = useCallback((videoId: string) => {
    trackEvent('video_play', { videoId });
  }, [trackEvent]);

  const trackScroll = useCallback((depth: number) => {
    trackEvent('scroll_depth', { depth });
  }, [trackEvent]);

  // Initialize on mount
  useEffect(() => {
    initJourney();
  }, [initJourney]);

  return {
    sessionId: sessionId.current,
    journeyId: journeyId.current,
    trackEvent,
    trackBookingStart,
    trackBookingStep,
    trackBookingComplete,
    trackCTAClick,
    trackFormInteraction,
    trackTherapistView,
    trackExperienceView,
    trackVideoPlay,
    trackScroll,
  };
};
