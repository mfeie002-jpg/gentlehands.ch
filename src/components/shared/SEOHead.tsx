import { Helmet } from "react-helmet-async";
import { memo } from "react";

interface SEOHeadProps {
  title: string;
  description: string;
  canonical?: string;
  image?: string;
  type?: "website" | "article" | "product";
  noIndex?: boolean;
  schema?: Record<string, unknown>;
  jsonLd?: Record<string, unknown>;
  keywords?: string[];
  author?: string;
  publishedTime?: string;
  modifiedTime?: string;
}

/**
 * Reusable SEO component for consistent meta tags across pages
 * Includes Open Graph, Twitter Cards, and JSON-LD schema
 */
export const SEOHead = memo(({
  title,
  description,
  canonical,
  image = "https://gentlehands.ch/og-image.jpg",
  type = "website",
  noIndex = false,
  schema,
  jsonLd,
  keywords = [],
  author = "GentleHands",
  publishedTime,
  modifiedTime,
}: SEOHeadProps) => {
  const fullTitle = title.includes("GentleHands") 
    ? title 
    : `${title} | GentleHands`;
  
  const baseUrl = "https://gentlehands.ch";
  const fullCanonical = canonical 
    ? canonical.startsWith("http") 
      ? canonical 
      : `${baseUrl}${canonical}`
    : undefined;

  const defaultSchema = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    name: title,
    description,
    url: fullCanonical,
    image,
    publisher: {
      "@type": "Organization",
      name: "GentleHands",
      logo: {
        "@type": "ImageObject",
        url: `${baseUrl}/pwa-512x512.png`,
      },
    },
  };

  const finalSchema = jsonLd || schema || defaultSchema;

  return (
    <Helmet>
      {/* Primary Meta Tags */}
      <title>{fullTitle}</title>
      <meta name="title" content={fullTitle} />
      <meta name="description" content={description} />
      {keywords.length > 0 && (
        <meta name="keywords" content={keywords.join(", ")} />
      )}
      <meta name="author" content={author} />
      
      {/* Canonical */}
      {fullCanonical && <link rel="canonical" href={fullCanonical} />}
      
      {/* Robots */}
      {noIndex ? (
        <meta name="robots" content="noindex, nofollow" />
      ) : (
        <meta name="robots" content="index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1" />
      )}
      
      {/* Open Graph / Facebook */}
      <meta property="og:type" content={type} />
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={description} />
      {fullCanonical && <meta property="og:url" content={fullCanonical} />}
      <meta property="og:image" content={image} />
      <meta property="og:image:alt" content={title} />
      <meta property="og:site_name" content="GentleHands" />
      <meta property="og:locale" content="de_CH" />
      
      {/* Article specific */}
      {type === "article" && publishedTime && (
        <meta property="article:published_time" content={publishedTime} />
      )}
      {type === "article" && modifiedTime && (
        <meta property="article:modified_time" content={modifiedTime} />
      )}
      
      {/* Twitter */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={fullTitle} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={image} />
      <meta name="twitter:image:alt" content={title} />
      
      {/* JSON-LD Schema */}
      <script type="application/ld+json">
        {JSON.stringify(finalSchema)}
      </script>
    </Helmet>
  );
});

SEOHead.displayName = "SEOHead";

/**
 * Breadcrumb schema generator for structured data
 */
export const generateBreadcrumbSchema = (
  items: Array<{ name: string; url: string }>
) => {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: item.url.startsWith("http") 
        ? item.url 
        : `https://gentlehands.ch${item.url}`,
    })),
  };
};

/**
 * FAQ schema generator for structured data
 */
export const generateFAQSchema = (
  faqs: Array<{ question: string; answer: string }>
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

/**
 * Service schema generator for massage services
 */
export const generateServiceSchema = (service: {
  name: string;
  description: string;
  price?: string;
  duration?: string;
  image?: string;
}) => {
  return {
    "@context": "https://schema.org",
    "@type": "Service",
    name: service.name,
    description: service.description,
    provider: {
      "@type": "HealthAndBeautyBusiness",
      name: "GentleHands",
      address: {
        "@type": "PostalAddress",
        addressLocality: "Zürich",
        addressCountry: "CH",
      },
    },
    ...(service.price && {
      offers: {
        "@type": "Offer",
        price: service.price,
        priceCurrency: "CHF",
      },
    }),
    ...(service.image && { image: service.image }),
  };
};
