import React from "react";
import Link from "next/link";
import ProjectCard from "@/app/components/ProjectCard";
import { Listing } from "./page";

export default function NhaDatBanContent({ projects }: { projects: Listing[] }) {
  return (
    <div className="min-h-screen bg-white text-black">
      <main className="container-std flex flex-col md:flex-row gap-6 mt-6 mb-6">
        <div className="flex-1 flex flex-col gap-4">
          {projects.length > 0 ? (
            projects.map((item) => (
              <Link href={`/nha-dat-ban/${item.id}`} key={item.id}>
                <ProjectCard
                  title={item.title}
                  price={`${item.price_total_text} VND`}
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
              </Link>
            ))
          ) : (
            <p className="text-center py-10">Không có dữ liệu</p>
          )}
        </div>
      </main>
    </div>
  );
}
