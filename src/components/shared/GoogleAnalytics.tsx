import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

// Replace with your GA4 Measurement ID (G-XXXXXXXXXX)
const GA_MEASUREMENT_ID = import.meta.env.VITE_GA4_MEASUREMENT_ID || '';

export const GoogleAnalytics = () => {
  const location = useLocation();

  useEffect(() => {
    // Only initialize if measurement ID is configured
    if (!GA_MEASUREMENT_ID) {
      console.log('GA4: No measurement ID configured. Set VITE_GA4_MEASUREMENT_ID in .env');
      return;
    }

    // Load gtag script if not already loaded
    if (!document.getElementById('ga-script')) {
      const script = document.createElement('script');
      script.id = 'ga-script';
      script.async = true;
      script.src = `https://www.googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID}`;
      document.head.appendChild(script);

      window.dataLayer = window.dataLayer || [];
      window.gtag = function gtag(...args: unknown[]) {
        window.dataLayer.push(args);
      };
      window.gtag('js', new Date());
      window.gtag('config', GA_MEASUREMENT_ID, {
        send_page_view: false, // We'll handle page views manually
      });
    }
  }, []);

  // Track page views on route change
  useEffect(() => {
    if (GA_MEASUREMENT_ID && window.gtag) {
      window.gtag('event', 'page_view', {
        page_path: location.pathname + location.search,
        page_title: document.title,
      });
    }
  }, [location]);

  return null;
};
