"use client";
import { Listing } from "@/app/types/products";
import Breadcrumb from "./component/Breadcrumb";
import HeroGallery from "./component/HeroGallery";
import PropertyInfo from "./component/PropertyInfo";
import Tabs from "./component/Tabs";
import PhotoGallery from "./component/PhotoGallery";
import AgentSchedule from "./component/AgentSchedule";
import Sidebar from "./component/Sidebar";
import MobileActionBar from "./component/MobileActionBar";
import { useEffect } from "react";

interface ListingDetailProps {
  listing: Listing;
}

const ListingDetail: React.FC<ListingDetailProps> = ({ listing }) => {
  useEffect(() => {
    const jsonLd = {
      "@context": "https://schema.org",
      "@type": "Offer",
      name: listing.title,
      description: listing.description,
      price: listing.price_total,
      priceCurrency: "VND",
      availability: "https://schema.org/InStock",
      url: `https://phatdatbatdongsan.com/listings/${listing.id}`,
      image: listing.images,
      seller: {
        "@type": "RealEstateAgent",
        name: "Phát Đạt Bất Động Sản",
      },
    };

    const script = document.createElement("script");
    script.type = "application/ld+json";
    script.text = JSON.stringify(jsonLd);
    document.head.appendChild(script);

    return () => {
      document.head.removeChild(script);
    };
  }, [listing]);

  return (
    <div className="bg-gray-50">
      <Breadcrumb listing={listing} />
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-4 pb-5">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          <div className="lg:col-span-8 space-y-6">
            <HeroGallery images={listing.images} />
            <PropertyInfo listing={listing} />
            <Tabs listing={listing} />
            <PhotoGallery images={listing.images} />
            <AgentSchedule />
          </div>
          <Sidebar listing={listing} />
        </div>
      </main>
      <MobileActionBar listing={listing} />
    </div>
  );
};

export default ListingDetail;
