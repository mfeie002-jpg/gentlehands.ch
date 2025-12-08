import { useEffect } from "react";

interface PageMetaOptions {
  title: string;
  description: string;
  canonical?: string;
  ogImage?: string;
  noIndex?: boolean;
}

/**
 * Enhanced page meta hook for consistent SEO across all pages
 */
export const usePageMeta = ({
  title,
  description,
  canonical,
  ogImage = "/og-image.jpg",
  noIndex = false,
}: PageMetaOptions) => {
  useEffect(() => {
    // Update document title dynamically for better accessibility
    document.title = title;
    
    // Announce page changes to screen readers
    const announcer = document.getElementById("page-announcer");
    if (announcer) {
      announcer.textContent = `Navigiert zu: ${title.split(" – ")[0]}`;
    }
  }, [title]);

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    name: title,
    description: description,
    url: canonical || `https://gentlehands.ch${window.location.pathname}`,
    isPartOf: {
      "@type": "WebSite",
      name: "GentleHands",
      url: "https://gentlehands.ch",
    },
    provider: {
      "@type": "HealthAndBeautyBusiness",
      name: "GentleHands",
      address: {
        "@type": "PostalAddress",
        addressLocality: "Zürich",
        addressCountry: "CH",
      },
    },
  };

  return {
    title,
    description,
    canonical: canonical || `https://gentlehands.ch${window.location.pathname}`,
    ogImage,
    noIndex,
    jsonLd,
  };
};

/**
 * Create breadcrumb structured data
 */
export const createBreadcrumbJsonLd = (
  items: { name: string; url: string }[]
) => {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: item.url,
    })),
  };
};

/**
 * Create FAQ structured data
 */
export const createFAQJsonLd = (
  faqs: { question: string; answer: string }[]
) => {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((faq) => ({
      "@type": "Question",
      name: faq.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: faq.answer,
      },
    })),
  };
};
