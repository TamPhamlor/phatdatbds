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

const Nha_Dat_Ban = () => {
  const [projects, setProjects] = useState<Listing[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchListings = async () => {
      try {
        const res = await fetch(
          "https://api.phatdatbatdongsan.com/api/v1/listings"
        );
        const data = await res.json();
        setProjects(data.data);
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
      {/* Header */}
      <header className="sticky top-0 z-50 bg-white border-b border-gray-200">
        <div className="container-std flex items-center justify-between py-3">
          <div className="flex items-center gap-2">
            <img
              src="/logo_phat_dat_bat_don_san.png"
              alt="Phát Đạt BĐS"
              className="h-[40px]"
            />
          </div>
          <nav className="hidden md:flex items-center gap-6 text-sm text-gray-600">
            <a href="#">Nhà đất bán</a>
            <a href="#">Nhà đất cho thuê</a>
            <a href="#">Dự án</a>
            <a href="#">Tin tức</a>
          </nav>
          <div className="flex items-center gap-3">
            <button className="btn btn-dark text-sm">Đăng tin</button>
            <button className="btn btn-primary text-sm">Đăng nhập</button>
          </div>
        </div>
      </header>

      {/* Content */}
      <main className="container-std flex flex-col md:flex-row gap-6 mt-6 mb-6">
        {/* List projects */}
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

      {/* Footer */}
      <footer className="border-t border-black/10 py-8 text-sm text-mute">
        <div className="container-std flex flex-col md:flex-row items-center justify-between gap-4">
          <p>
            © {new Date().getFullYear()} Phát Đạt Bất Động Sản Nhơn Trạch. Đã
            đăng ký bản quyền.
          </p>
          <div className="flex items-center gap-4">
            <a href="#" className="hover:text-black">
              Chính sách bảo mật
            </a>
            <a href="#" className="hover:text-black">
              Điều khoản sử dụng
            </a>
            <a href="#" className="hover:text-black">
              Liên hệ
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Nha_Dat_Ban;
