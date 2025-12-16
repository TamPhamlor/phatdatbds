// lib/seo.ts - SEO configuration and JSON-LD schemas

export const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL || "https://phatdatbatdongsan.com";
export const SITE_NAME = "Phát Đạt Bất Động Sản Nhơn Trạch";
export const SITE_DESCRIPTION =
  "Mua bán nhà đất Nhơn Trạch, Đồng Nai: đất nền, nhà phố, sổ riêng, pháp lý rõ ràng. Uy tín - Chuyên nghiệp - Tận tâm.";
export const PHONE_NUMBER = process.env.NEXT_PUBLIC_PHONE_CONTACT || "0974326036";

// Organization Schema
export const organizationSchema = {
  "@context": "https://schema.org",
  "@type": "RealEstateAgent",
  "@id": `${SITE_URL}/#organization`,
  name: SITE_NAME,
  alternateName: "Phát Đạt Bất Động Sản",
  url: SITE_URL,
  logo: {
    "@type": "ImageObject",
    url: `${SITE_URL}/logo_phat_dat_bat_don_san.png`,
    width: 200,
    height: 200,
  },
  image: `${SITE_URL}/logo_phat_dat_bat_don_san.png`,
  description: SITE_DESCRIPTION,
  telephone: PHONE_NUMBER,
  email: "phatdatbatdongsan.com@gmail.com",
  address: {
    "@type": "PostalAddress",
    addressLocality: "Nhơn Trạch",
    addressRegion: "Đồng Nai",
    addressCountry: "VN",
  },
  geo: {
    "@type": "GeoCoordinates",
    latitude: 10.6833,
    longitude: 106.9167,
  },
  areaServed: {
    "@type": "GeoCircle",
    geoMidpoint: {
      "@type": "GeoCoordinates",
      latitude: 10.6833,
      longitude: 106.9167,
    },
    geoRadius: "50000",
  },
  priceRange: "$$",
  openingHoursSpecification: {
    "@type": "OpeningHoursSpecification",
    dayOfWeek: [
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thursday",
      "Friday",
      "Saturday",
      "Sunday",
    ],
    opens: "08:00",
    closes: "18:00",
  },
  sameAs: [
    "https://www.facebook.com/share/1AmffpNi2h/?mibextid=wwXIfr",
    "https://zalo.me/+84974326036",
  ],
  contactPoint: {
    "@type": "ContactPoint",
    telephone: PHONE_NUMBER,
    contactType: "sales",
    availableLanguage: ["Vietnamese"],
    areaServed: "VN",
  },
};

// Website Schema
export const websiteSchema = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  "@id": `${SITE_URL}/#website`,
  url: SITE_URL,
  name: SITE_NAME,
  description: SITE_DESCRIPTION,
  publisher: {
    "@id": `${SITE_URL}/#organization`,
  },
  potentialAction: {
    "@type": "SearchAction",
    target: {
      "@type": "EntryPoint",
      urlTemplate: `${SITE_URL}/nha-dat-ban?q={search_term_string}`,
    },
    "query-input": "required name=search_term_string",
  },
  inLanguage: "vi-VN",
};

// Local Business Schema
export const localBusinessSchema = {
  "@context": "https://schema.org",
  "@type": "LocalBusiness",
  "@id": `${SITE_URL}/#localbusiness`,
  name: SITE_NAME,
  image: `${SITE_URL}/logo_phat_dat_bat_don_san.png`,
  telephone: PHONE_NUMBER,
  address: {
    "@type": "PostalAddress",
    streetAddress: "Nhơn Trạch",
    addressLocality: "Nhơn Trạch",
    addressRegion: "Đồng Nai",
    postalCode: "810000",
    addressCountry: "VN",
  },
  geo: {
    "@type": "GeoCoordinates",
    latitude: 10.6833,
    longitude: 106.9167,
  },
  url: SITE_URL,
  openingHoursSpecification: [
    {
      "@type": "OpeningHoursSpecification",
      dayOfWeek: [
        "Monday",
        "Tuesday",
        "Wednesday",
        "Thursday",
        "Friday",
        "Saturday",
        "Sunday",
      ],
      opens: "08:00",
      closes: "18:00",
    },
  ],
  priceRange: "$$",
};

// Breadcrumb Schema Generator
export const generateBreadcrumbSchema = (
  items: { name: string; url: string }[]
) => ({
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: items.map((item, index) => ({
    "@type": "ListItem",
    position: index + 1,
    name: item.name,
    item: item.url,
  })),
});

// FAQ Schema Generator
export const generateFAQSchema = (
  faqs: { question: string; answer: string }[]
) => ({
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
});

// Article Schema Generator
export const generateArticleSchema = (article: {
  title: string;
  description: string;
  url: string;
  image: string;
  datePublished: string;
  dateModified?: string;
  authorName: string;
}) => ({
  "@context": "https://schema.org",
  "@type": "Article",
  headline: article.title,
  description: article.description,
  image: article.image,
  datePublished: article.datePublished,
  dateModified: article.dateModified || article.datePublished,
  author: {
    "@type": "Person",
    name: article.authorName,
  },
  publisher: {
    "@type": "Organization",
    name: SITE_NAME,
    logo: {
      "@type": "ImageObject",
      url: `${SITE_URL}/logo_phat_dat_bat_don_san.png`,
    },
  },
  mainEntityOfPage: {
    "@type": "WebPage",
    "@id": article.url,
  },
});

// Real Estate Listing Schema Generator
export const generateListingSchema = (listing: {
  id: number;
  title: string;
  description: string;
  price: string;
  images: string[];
  address: string;
  area?: string;
  bedrooms?: number;
  bathrooms?: number;
}) => ({
  "@context": "https://schema.org",
  "@type": "RealEstateListing",
  name: listing.title,
  description: listing.description,
  url: `${SITE_URL}/nha-dat-ban/${listing.id}`,
  image: listing.images,
  address: {
    "@type": "PostalAddress",
    streetAddress: listing.address,
    addressLocality: "Nhơn Trạch",
    addressRegion: "Đồng Nai",
    addressCountry: "VN",
  },
  offers: {
    "@type": "Offer",
    price: listing.price,
    priceCurrency: "VND",
    availability: "https://schema.org/InStock",
  },
  ...(listing.area && {
    floorSize: {
      "@type": "QuantitativeValue",
      value: parseFloat(listing.area),
      unitCode: "MTK",
    },
  }),
  ...(listing.bedrooms && { numberOfRooms: listing.bedrooms }),
  ...(listing.bathrooms && { numberOfBathroomsTotal: listing.bathrooms }),
});
