'use client';


import { PostSearch } from "./PostSearch";
import { ProjectAd } from "./ProjectAd";
import { TagCloud } from "./TagCloud";


export function Sidebar() {
  return (
    <aside className="lg:col-span-4">
      <div className="lg:sticky lg:top-20 space-y-4">
        <PostSearch />
        <TagCloud />
        <ProjectAd
          title="Williamsburg Inn-Castilling"
          location="Evergreen 10, Jakarta"
          price="$345.00"
          imageUrl="https://images.unsplash.com/photo-1600585154526-990dced4db0d?q=80&w=1200"
        />
        <ProjectAd
          title="Sunshine Riverside"
          location="Hà Nội, Việt Nam"
          price="$420.00"
          imageUrl="https://images.unsplash.com/photo-1515378791036-0648a3ef77b2?q=80&w=1200"
        />
        <ProjectAd
          title="Vinhomes Grand Park"
          location="Quận 9, TP Hồ Chí Minh"
          price="$390.00"
          imageUrl="https://images.unsplash.com/photo-1549187774-b4e9b0445b41?q=80&w=1200"
        />
      </div>
    </aside>
  );
}