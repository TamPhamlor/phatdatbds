"use client";
import { Listing } from "@/app/types/products";
import Breadcrumb from "./component/Breadcrumb";
import HeroGallery from "./component/HeroGallery";
import PropertyInfo from "./component/PropertyInfo";
import MainInfoMobile from "./component/MainInfoMobile";
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
  // Scroll to top khi vào trang - fix iOS Safari
  useEffect(() => {
    if ("scrollRestoration" in history) {
      history.scrollRestoration = "manual";
    }
    window.scrollTo(0, 0);
    const timer = setTimeout(() => {
      window.scrollTo({ top: 0, left: 0, behavior: "instant" });
    }, 0);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    const jsonLd = {
      "@context": "https://schema.org",
      "@type": "Offer",
      name: listing.title,
      description: listing.description?.replace(/<[^>]*>/g, '') || '',
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
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      <Breadcrumb listing={listing} />
      <main className="container-std py-6 pb-24 lg:pb-6">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          <div className="lg:col-span-8 space-y-5">
            <HeroGallery images={listing.images} listing={listing} />
            <PropertyInfo listing={listing} />
            <MainInfoMobile listing={listing} />
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
