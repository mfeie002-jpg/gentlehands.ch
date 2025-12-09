// Google Analytics 4 tracking hook for conversion funnel analytics

declare global {
  interface Window {
    gtag: (...args: unknown[]) => void;
    dataLayer: unknown[];
  }
}

type EventParams = Record<string, string | number | boolean | undefined>;

export const useAnalytics = () => {
  const trackEvent = (eventName: string, params?: EventParams) => {
    if (typeof window !== 'undefined' && window.gtag) {
      window.gtag('event', eventName, params);
    }
  };

  // Booking Funnel Events
  const trackBookingStart = () => trackEvent('begin_checkout', { funnel: 'booking' });
  const trackBookingStep = (step: number, stepName: string) => 
    trackEvent('checkout_progress', { checkout_step: step, step_name: stepName });
  const trackBookingComplete = (bookingNumber: string) => 
    trackEvent('purchase', { transaction_id: bookingNumber, funnel: 'booking' });

  // Gift Card Events
  const trackGiftCardView = () => trackEvent('view_item', { item_category: 'gift_card' });
  const trackGiftCardPurchase = (value: number) => 
    trackEvent('purchase', { value, currency: 'CHF', item_category: 'gift_card' });

  // Lead Generation Events
  const trackWaitlistSignup = () => trackEvent('generate_lead', { funnel: 'waitlist' });
  const trackContactSubmit = () => trackEvent('generate_lead', { funnel: 'contact' });
  const trackNewsletterSignup = () => trackEvent('generate_lead', { funnel: 'newsletter' });
  const trackB2BInquiry = () => trackEvent('generate_lead', { funnel: 'b2b' });

  // Quiz & Personalization
  const trackQuizStart = () => trackEvent('tutorial_begin', { funnel: 'quiz' });
  const trackQuizComplete = () => trackEvent('tutorial_complete', { funnel: 'quiz' });

  // Membership Events
  const trackMembershipView = (tier: string) => 
    trackEvent('view_item', { item_category: 'membership', item_name: tier });
  const trackMembershipSignup = (tier: string) => 
    trackEvent('sign_up', { method: 'membership', tier });

  // Engagement Events
  const trackPageView = (pagePath: string, pageTitle: string) => 
    trackEvent('page_view', { page_path: pagePath, page_title: pageTitle });
  const trackExperienceView = (themeName: string) => 
    trackEvent('view_item', { item_category: 'experience', item_name: themeName });
  const trackMassageView = (massageName: string) => 
    trackEvent('view_item', { item_category: 'massage', item_name: massageName });
  const trackTeamMemberView = (therapistName: string) => 
    trackEvent('view_item', { item_category: 'therapist', item_name: therapistName });

  // Referral Events
  const trackReferralShare = () => trackEvent('share', { method: 'referral' });

  return {
    trackEvent,
    trackBookingStart,
    trackBookingStep,
    trackBookingComplete,
    trackGiftCardView,
    trackGiftCardPurchase,
    trackWaitlistSignup,
    trackContactSubmit,
    trackNewsletterSignup,
    trackB2BInquiry,
    trackQuizStart,
    trackQuizComplete,
    trackMembershipView,
    trackMembershipSignup,
    trackPageView,
    trackExperienceView,
    trackMassageView,
    trackTeamMemberView,
    trackReferralShare,
  };
};
