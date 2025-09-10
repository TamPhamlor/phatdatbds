"use client";
import React, { useEffect, useState } from "react";
import ProjectCard from "@/app/components/ProjectCard";

interface Listing {
  id: number;
  title: string;
  description?: string;
  bedrooms: number;
  bathrooms: number;
  address: string;
  price_total: string;
  area_land: string;
  images: { url: string; is_cover: boolean; sort_order: number }[];
  author?: string;
  published_at:string;
}

export default function NhaDatBanContent() {
  const [projects, setProjects] = useState<Listing[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchListings = async () => {
      try {
        const res = await fetch("/api/v1/listings"); // Gọi API Route server
        const data = await res.json();
        setProjects(data.data || []);
        console.log(res);
        
      } catch (error) {
        console.error("Error fetching listings:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchListings();
  }, []);

  return (
    <div className="min-h-screen bg-white text-black">

      {/* Content */}
      <main className="container-std flex flex-col md:flex-row gap-6 mt-6 mb-6">
        <div className="flex-1 flex flex-col gap-4">
          {loading ? (
            <p className="text-center py-10">Đang tải dữ liệu...</p>
          ) : projects.length > 0 ? (
            projects.map((item) => (
              <ProjectCard
                key={item.id}
                title={item.title}
                price={`${Number(item.price_total).toLocaleString()} VND`}
                area={`${item.area_land} m²`}
                rooms={item.bedrooms}
                baths={item.bathrooms}
                location={item.address}
                images={item.images.map((img) => img.url)}
                author={item?.author || "Phát Đạt"}
                phone="0909xxxxxx"
                avatar="https://cdn-icons-png.flaticon.com/512/149/149071.png"
                description={item.description}
                publishedAt={item.published_at}
              />
            ))
          ) : (
            <p className="text-center py-10">Không có dữ liệu</p>
          )}
        </div>
      </main>
    </div>
  );
}
