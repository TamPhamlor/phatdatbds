// lib/realEstateSchema.ts
import { Listing } from "@/app/types/products";
import { FACEBOOK_LINK, ZALO_LINK } from "./config";

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL ?? "https://phatdatbatdongsan.com";

/**
 * Generate Organization schema for Phát Đạt Bất Động Sản
 */
export function generateOrganizationSchema() {
  return {
    "@type": "Organization",
    name: "Phát Đạt Bất Động Sản",
    url: BASE_URL,
    logo: `${BASE_URL}/logo_phat_dat_bat_don_san.png`,
    description: "Chuyên cung cấp dịch vụ mua bán, cho thuê bất động sản tại Nhơn Trạch, Đồng Nai. Uy tín - Chuyên nghiệp - Tận tâm.",
    sameAs: [
      FACEBOOK_LINK,
      ZALO_LINK
    ],
    contactPoint: {
      "@type": "ContactPoint",
      telephone: "+84-97-432-6036",
      contactType: "customer service",
      areaServed: "VN",
      availableLanguage: "Vietnamese"
    },
    address: {
      "@type": "PostalAddress",
      addressLocality: "Nhơn Trạch",
      addressRegion: "Đồng Nai",
      addressCountry: "VN"
    },
    foundingDate: "2014",
    numberOfEmployees: "10-50"
  };
}

/**
 * Generate RealEstateListing schema for individual property
 */
export function generateRealEstateListingSchema(listing: Listing, id: string) {
  return {
    "@context": "https://schema.org",
    "@type": "RealEstateListing",
    "@id": `${BASE_URL}/nha-dat-ban/${id}`,
    name: listing.title ?? `Tin rao #${id}`,
    description: (listing.description ?? "Tin rao bất động sản chi tiết tại Nhơn Trạch, Đồng Nai.")
      .replace(/<[^>]*>/g, '')
      .slice(0, 300),
    url: `${BASE_URL}/nha-dat-ban/${id}`,
    image: (listing.images ?? [])
      .map((img) => img.url)
      .slice(0, 10),
    
    offers: {
      "@type": "Offer",
      price: listing.price_total || "0",
      priceCurrency: "VND",
      priceSpecification: {
        "@type": "PriceSpecification",
        price: listing.price_total || "0",
        priceCurrency: "VND",
        valueAddedTaxIncluded: true
      },
      availability: "https://schema.org/InStock",
      validFrom: new Date().toISOString(),
      seller: generateOrganizationSchema()
    },

    address: {
      "@type": "PostalAddress",
      streetAddress: listing.address || listing.street || "",
      addressLocality: listing.ward?.name || "Nhơn Trạch",
      addressRegion: listing.province?.name || "Đồng Nai",
      addressCountry: "VN",
      postalCode: listing.ward?.code || ""
    },

    floorSize: listing.area_land ? {
      "@type": "QuantitativeValue",
      value: parseFloat(listing.area_land),
      unitCode: "MTK",
      unitText: "m²"
    } : undefined,

    numberOfRooms: listing.bedrooms || undefined,
    numberOfBathroomsTotal: listing.bathrooms || undefined,
    numberOfFullBathrooms: listing.bathrooms || undefined,
    numberOfFloors: listing.floors || undefined,

    ...(listing.direction && {
      additionalProperty: {
        "@type": "PropertyValue",
        name: "Hướng nhà",
        value: listing.direction
      }
    }),

    ...(listing.amenities && listing.amenities.length > 0 && {
      amenityFeature: listing.amenities.map(amenity => ({
        "@type": "LocationFeatureSpecification",
        name: amenity.name,
        value: true
      }))
    }),

    ...(listing.legal_status && {
      legalStatus: listing.legal_status.name
    }),

    breadcrumb: {
      "@type": "BreadcrumbList",
      itemListElement: [
        {
          "@type": "ListItem",
          position: 1,
          name: "Trang chủ",
          item: BASE_URL
        },
        {
          "@type": "ListItem",
          position: 2,
          name: "Nhà đất bán",
          item: `${BASE_URL}/nha-dat-ban`
        },
        {
          "@type": "ListItem",
          position: 3,
          name: listing.title || `Tin rao #${id}`,
          item: `${BASE_URL}/nha-dat-ban/${id}`
        }
      ]
    },

    provider: generateOrganizationSchema(),

    datePosted: listing.created_at || new Date().toISOString(),
    dateModified: listing.updated_at || new Date().toISOString(),

    keywords: [
      "bất động sản Nhơn Trạch",
      "nhà đất Đồng Nai", 
      "mua bán nhà đất",
      listing.property_type?.name || "bất động sản",
      listing.ward?.name || "Nhơn Trạch",
      listing.province?.name || "Đồng Nai"
    ].filter(Boolean).join(", ")
  };
}

/**
 * Generate CollectionPage schema for listing page
 */
export function generateListingPageSchema(listings: Listing[], totalCount?: number) {
  return {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    name: "Nhà đất bán tại Nhơn Trạch, Đồng Nai",
    description: "Danh sách nhà đất bán tại Nhơn Trạch, Đồng Nai với pháp lý rõ ràng, giá tốt nhất thị trường",
    url: `${BASE_URL}/nha-dat-ban`,
    
    mainEntity: {
      "@type": "ItemList",
      numberOfItems: totalCount || listings.length,
      itemListElement: listings.slice(0, 10).map((listing, index) => ({
        "@type": "ListItem",
        position: index + 1,
        item: {
          "@type": "RealEstateListing",
          "@id": `${BASE_URL}/nha-dat-ban/${listing.id}`,
          name: listing.title,
          description: listing.description?.replace(/<[^>]*>/g, '').slice(0, 160) || "Bất động sản tại Nhơn Trạch",
          url: `${BASE_URL}/nha-dat-ban/${listing.id}`,
          image: listing.images?.find(img => img.is_cover)?.url || listing.images?.[0]?.url,
          offers: {
            "@type": "Offer",
            price: listing.price_total || "0",
            priceCurrency: "VND",
            availability: "https://schema.org/InStock",
            seller: {
              "@type": "Organization",
              name: "Phát Đạt Bất Động Sản"
            }
          },
          floorSize: listing.area_land ? {
            "@type": "QuantitativeValue",
            value: parseFloat(listing.area_land),
            unitCode: "MTK"
          } : undefined,
          address: {
            "@type": "PostalAddress",
            addressLocality: listing.ward?.name || "Nhơn Trạch",
            addressRegion: listing.province?.name || "Đồng Nai",
            addressCountry: "VN",
            streetAddress: listing.address || ""
          }
        }
      }))
    },

    provider: generateOrganizationSchema(),

    breadcrumb: {
      "@type": "BreadcrumbList",
      itemListElement: [
        {
          "@type": "ListItem",
          position: 1,
          name: "Trang chủ",
          item: BASE_URL
        },
        {
          "@type": "ListItem",
          position: 2,
          name: "Nhà đất bán",
          item: `${BASE_URL}/nha-dat-ban`
        }
      ]
    }
  };
}

/**
 * Generate LocalBusiness schema for real estate agency
 */
export function generateLocalBusinessSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "RealEstateAgent",
    name: "Phát Đạt Bất Động Sản",
    description: "Chuyên cung cấp dịch vụ mua bán, cho thuê bất động sản tại Nhơn Trạch, Đồng Nai",
    url: BASE_URL,
    logo: `${BASE_URL}/logo_phat_dat_bat_don_san.png`,
    image: `${BASE_URL}/phatdat_avatar.jpg`,
    
    address: {
      "@type": "PostalAddress",
      addressLocality: "Nhơn Trạch",
      addressRegion: "Đồng Nai",
      addressCountry: "VN"
    },
    
    contactPoint: {
      "@type": "ContactPoint",
      telephone: "+84-97-432-6036",
      contactType: "customer service",
      areaServed: "VN",
      availableLanguage: "Vietnamese"
    },
    
    sameAs: [
      FACEBOOK_LINK,
      ZALO_LINK
    ],
    
    openingHours: "Mo-Su 08:00-20:00",
    
    priceRange: "$$",
    
    areaServed: {
      "@type": "Place",
      name: "Nhơn Trạch, Đồng Nai"
    },
    
    serviceArea: {
      "@type": "GeoCircle",
      geoMidpoint: {
        "@type": "GeoCoordinates",
        latitude: 10.8231,
        longitude: 106.8025
      },
      geoRadius: "50000"
    }
  };
}