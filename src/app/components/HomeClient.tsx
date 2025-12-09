// app/components/HomeClient.tsx
"use client";

import React, { useMemo, useRef, useState, useEffect } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, A11y, Autoplay } from "swiper/modules";
import type { Swiper as SwiperType } from "swiper";
import "swiper/css";
import Image from "next/image";
import dynamic from "next/dynamic";
import type { Listing } from "@/app/page";
import Link from "next/link";
import { useRouter } from "next/navigation";
import type { MetaListing, Ward } from "@/lib/meta"; // ✨ lấy type chung từ server-only helper

/** ========= Types cho UI state ========= */
interface FilterState {
  location: string; // giữ lại để không vỡ type cũ
  type: string;
  price: string;
  // theo FilterPanel
  province_id?: number;
  ward_id?: number;
}
interface SupportFormState {
  name: string;
  email: string;
  need: string;
  message: string;
  query: string;
  subscribe: boolean;
}
/** ====================================== */

// Reusable components
const SlideCard = dynamic(() => import("@/app/components/SlideCard"), { ssr: false });
const ResourceCard = dynamic(() => import("@/app/components/ResourceCard"), { ssr: false });
const Dropdown = dynamic(() => import("@/app/components/Dropdown"), { ssr: false });
const ScrollReveal = dynamic(() => import("@/app/components/ScrollReveal"), { ssr: false });

// =================== Mock/UI options ===================
const types: string[] = ["Tất cả", "Đất nền", "Nhà phố", "Biệt thự"];
const prices: string[] = ["Tất cả", "Dưới 1 tỷ", "1-2 tỷ", "Trên 2 tỷ"];
const needs = ["Mua", "Thuê", "Đầu tư"];

// =================== Component ===================
type Props = {
  listings: Listing[];
  loadErr?: string | null;
  meta: MetaListing | null; // ✨ nhận từ server
};

const HomeClient: React.FC<Props> = ({ listings, loadErr, meta }) => {
  const router = useRouter();

  // ---- Typing Animation ----
  const propertyTypes = ["đất nền", "nhà phố", "biệt thự"];
  const [currentTypeIndex, setCurrentTypeIndex] = useState(0);
  const [displayText, setDisplayText] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    const currentWord = propertyTypes[currentTypeIndex];
    const typingSpeed = isDeleting ? 50 : 100;
    const pauseTime = isDeleting ? 500 : 2000;

    if (!isDeleting && displayText === currentWord) {
      setTimeout(() => setIsDeleting(true), pauseTime);
      return;
    }

    if (isDeleting && displayText === "") {
      setIsDeleting(false);
      setCurrentTypeIndex((prev) => (prev + 1) % propertyTypes.length);
      return;
    }

    const timeout = setTimeout(() => {
      setDisplayText(
        isDeleting
          ? currentWord.substring(0, displayText.length - 1)
          : currentWord.substring(0, displayText.length + 1)
      );
    }, typingSpeed);

    return () => clearTimeout(timeout);
  }, [displayText, isDeleting, currentTypeIndex, propertyTypes]);

  // ---- Filters (hero search) ----
  const [filters, setFilters] = useState<FilterState>({
    location: "",
    type: types[0],
    price: prices[0],
  });

  // Build options từ meta (đã có từ server)
  const provinceOptions = useMemo(
    () => (meta?.provinces ?? []).map((p) => p.name),
    [meta]
  );

  const wardOptions = useMemo(() => {
    const pid = filters.province_id;
    if (!pid) return [];
    const wards = meta?.wards?.[pid] ?? meta?.wards?.[String(pid)] ?? [];
    return (wards as Ward[]).map((w) => w.full_name || w.name);
  }, [meta, filters.province_id]);

  // Helpers hiển thị tên đã chọn
  const selectedProvinceName =
    filters.province_id
      ? meta?.provinces.find((p) => parseInt(p.code, 10) === filters.province_id)?.name ?? ""
      : "";

  const selectedWardName =
    filters.ward_id && filters.province_id
      ? (
          meta?.wards?.[filters.province_id] ??
          meta?.wards?.[String(filters.province_id)] ??
          []
        ).find((w: Ward) => parseInt(w.code, 10) === filters.ward_id)?.full_name ||
        (
          meta?.wards?.[filters.province_id] ??
          meta?.wards?.[String(filters.province_id)] ??
          []
        ).find((w: Ward) => parseInt(w.code, 10) === filters.ward_id)?.name ||
        ""
      : "";

  // Handlers cho dropdown vị trí
  const handleProvinceChange = (value: string) => {
    const found = meta?.provinces.find((p) => p.name === value);
    setFilters((prev) => ({
      ...prev,
      province_id: found ? parseInt(found.code, 10) : undefined,
      ward_id: undefined, // reset khi đổi tỉnh
    }));
  };

  const handleWardChange = (value: string) => {
    if (!filters.province_id) return;
    const wards = meta?.wards?.[filters.province_id] ?? meta?.wards?.[String(filters.province_id)] ?? [];
    const found = (wards as Ward[]).find((w) => (w.full_name || w.name) === value);
    setFilters((prev) => ({
      ...prev,
      ward_id: found ? parseInt(found.code, 10) : undefined,
    }));
  };

  // ---- Support form ----
  const [supportForm, setSupportForm] = useState<SupportFormState>({
    name: "",
    email: "",
    need: "Mua",
    message: "",
    query: "",
    subscribe: true,
  });
  const [supportLoading, setSupportLoading] = useState<boolean>(false);
  const [supportSuccess, setSupportSuccess] = useState<boolean>(false);
  const [supportError, setSupportError] = useState<boolean>(false);

  const setPreset = (kw: string): void => {
    setSupportForm((prev) => ({ ...prev, query: kw }));
  };

  const submitSupport = async (e: React.FormEvent): Promise<void> => {
    e.preventDefault();
    setSupportError(false);
    setSupportSuccess(false);

    const email = supportForm.email.trim();
    if (!email || !email.includes("@")) {
      setSupportError(true);
      return;
    }

    setSupportLoading(true);
    try {
      // Mock API call
      await new Promise((resolve) => setTimeout(resolve, 800));
      setSupportSuccess(true);

      setSupportForm((prev) => ({
        ...prev,
        name: "",
        email: "",
        message: "",
      }));
    } catch {
      setSupportError(true);
    } finally {
      setSupportLoading(false);
    }
  };

  // ---- Swiper refs (typed) ----
  const swipers = useRef<Record<string, SwiperType | null>>({});
  const setRef = (name: string, instance: SwiperType | null): void => {
    swipers.current[name] = instance;
  };
  const next = (name: string): void => {
    swipers.current[name]?.slideNext();
  };
  const prev = (name: string): void => {
    swipers.current[name]?.slidePrev();
  };

  // ---- Điều hướng khi bấm Tìm kiếm ----
  const goSearch = () => {
    const params = new URLSearchParams();
    if (filters.province_id) params.set("province_id", String(filters.province_id));
    if (filters.ward_id) params.set("ward_id", String(filters.ward_id));
    // Nếu bạn muốn kèm cả price/type thì set thêm ở đây

    const url = params.toString()
      ? `/nha-dat-ban?${params.toString()}`
      : `/nha-dat-ban`;
    router.push(url);
  };

  return (
    <div className="min-h-screen bg-ink text-black">
      {/* Hero */}
      <section 
        className="
          relative -mt-[120px] pt-[140px] md:mt-0 md:pt-0
          bg-[linear-gradient(rgba(255,255,255,0.5),rgba(255,255,255,0.9)),url('https://image3.luatvietnam.vn/uploaded/images/original/2025/07/22/de-xuat-tinh-thue-20-tren-lai-chuyen-nhuong-bat-dong-san_2207150058.jpg')]
          bg-top bg-cover bg-no-repeat
          md:bg-none
        "
      >
        <div className="relative container-std pb-8 md:py-16">
          <div className="grid md:grid-cols-2 gap-8 items-center">
            <div>
              <ScrollReveal initialClass="opacity-0 translate-y-10" enterClass="opacity-100 translate-y-0">
                <p className="tag mb-6 btn-pulse">
                  <svg className="w-4 h-4 inline mr-1.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                  <span className="font-bold">Bất động sản Nhơn Trạch</span>
                </p>
                <div className="mb-4">
                  <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold leading-tight mb-3 text-shadow-sharp">
                    Tìm kiếm{" "}
                    <span className="text-gradient-emerald inline-block min-w-[160px] md:min-w-[200px]">
                      {displayText}
                      <span className="inline-block w-0.5 h-8 md:h-10 bg-emerald-500 ml-1 animate-pulse align-middle"></span>
                    </span>
                  </h1>
                  <p className="text-2xl md:text-3xl lg:text-4xl font-bold text-gray-900 text-shadow-sharp">
                    tại Nhơn Trạch, Đồng Nai
                  </p>
                </div>
                <p className="text-lg text-gray-900 font-medium leading-relaxed max-w-xl text-shadow-sharp">
                  <span className="text-gradient-emerald font-bold">Phát Đạt</span> kết nối bạn với hàng trăm sản phẩm bất động sản uy tín, pháp lý rõ ràng.
                </p>

                {/* Search Bar */}
                <div className="mt-6 card p-4 md:p-5 relative z-50">
                  <div className="grid md:grid-cols-3 gap-3 items-end">
                    {/* Tỉnh / Thành */}
                    <Dropdown
                      label="Tỉnh / Thành"
                      options={
                        meta === null
                          ? ["(Không tải được dữ liệu)"]
                          : provinceOptions.length
                            ? provinceOptions
                            : ["(Không có dữ liệu)"]
                      }
                      value={selectedProvinceName}
                      onChange={handleProvinceChange}
                      searchable
                      searchPlaceholder="Tìm tỉnh/thành..."
                      className="dd-tall"
                    />

                    {/* Phường / Xã (phụ thuộc tỉnh đã chọn) */}
                    <Dropdown
                      label="Phường / Xã"
                      options={
                        !filters.province_id
                          ? ["(Chọn tỉnh trước)"]
                          : wardOptions.length
                            ? wardOptions
                            : ["(Không có dữ liệu phường/xã)"]
                      }
                      value={selectedWardName}
                      onChange={handleWardChange}
                      disabled={!filters.province_id || meta === null}
                      searchable
                      searchPlaceholder="Tìm phường/xã..."
                      className="dd-tall"
                    />

                    {/* Mức giá */}
                    <Dropdown
                      label="Mức giá"
                      options={prices}
                      value={filters.price ?? ""}
                      onChange={(v: string) => setFilters((prev) => ({ ...prev, price: v }))}
                      className="dd-tall"
                    />

                    <button
                      className="btn btn-primary h-12 self-end text-[14px] px-5 md:col-span-3 relative z-10"
                      onClick={goSearch}
                      disabled={meta === null}
                    >
                      Tìm kiếm
                    </button>
                  </div>
                </div>
              </ScrollReveal>

              <ScrollReveal initialClass="opacity-0 translate-y-10" enterClass="opacity-100 translate-y-0">
                {/* Metrics */}
                <dl className="mt-6 grid grid-cols-3 gap-3 text-center">
                  <div className="bg-gradient-to-br from-emerald-50 to-white p-4 rounded-2xl border border-emerald-100">
                    <dt className="text-2xl md:text-3xl font-bold text-gradient-emerald">10+</dt>
                    <dd className="text-xs text-gray-600 mt-1">Năm kinh nghiệm</dd>
                  </div>
                  <div className="bg-gradient-to-br from-emerald-50 to-white p-4 rounded-2xl border border-emerald-100">
                    <dt className="text-2xl md:text-3xl font-bold text-gradient-emerald">500+</dt>
                    <dd className="text-xs text-gray-600 mt-1">Sản phẩm đã giao dịch</dd>
                  </div>
                  <div className="bg-gradient-to-br from-emerald-50 to-white p-4 rounded-2xl border border-emerald-100">
                    <dt className="text-2xl md:text-3xl font-bold text-gradient-emerald">1000+</dt>
                    <dd className="text-xs text-gray-600 mt-1">Khách hàng hài lòng</dd>
                  </div>
                </dl>
              </ScrollReveal>
            </div>

            <ScrollReveal initialClass="opacity-0 -translate-x-10" enterClass="opacity-100 translate-x-0">
              <div className="hidden md:block relative">
                <Swiper
                  modules={[Navigation, A11y, Autoplay]}
                  slidesPerView={1}
                  spaceBetween={0}
                  autoplay={{ delay: 4000, disableOnInteraction: false }}
                  loop={true}
                  navigation={{
                    nextEl: '.hero-swiper-next',
                    prevEl: '.hero-swiper-prev',
                  }}
                  className="rounded-3xl overflow-hidden shadow-2xl"
                >
                  <SwiperSlide>
                    <div className="relative h-[400px] md:h-[500px]">
                      <Image
                        src="https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=800&q=80"
                        alt="Nhà phố hiện đại tại Nhơn Trạch"
                        fill
                        unoptimized
                        className="object-cover"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent"></div>
                      <div className="absolute bottom-6 left-6 text-white">
                        <p className="text-sm font-medium mb-1">Nhà phố</p>
                        <h3 className="text-xl font-bold">Thiết kế hiện đại</h3>
                      </div>
                    </div>
                  </SwiperSlide>
                  <SwiperSlide>
                    <div className="relative h-[400px] md:h-[500px]">
                      <Image
                        src="https://images.unsplash.com/photo-1580587771525-78b9dba3b914?w=800&q=80"
                        alt="Đất nền sổ đỏ tại Nhơn Trạch"
                        fill
                        unoptimized
                        className="object-cover"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent"></div>
                      <div className="absolute bottom-6 left-6 text-white">
                        <p className="text-sm font-medium mb-1">Đất nền</p>
                        <h3 className="text-xl font-bold">Sổ đỏ pháp lý rõ ràng</h3>
                      </div>
                    </div>
                  </SwiperSlide>
                  <SwiperSlide>
                    <div className="relative h-[400px] md:h-[500px]">
                      <Image
                        src="https://images.unsplash.com/photo-1613490493576-7fde63acd811?w=800&q=80"
                        alt="Biệt thự cao cấp tại Nhơn Trạch"
                        fill
                        unoptimized
                        className="object-cover"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent"></div>
                      <div className="absolute bottom-6 left-6 text-white">
                        <p className="text-sm font-medium mb-1">Biệt thự</p>
                        <h3 className="text-xl font-bold">Không gian sang trọng</h3>
                      </div>
                    </div>
                  </SwiperSlide>
                </Swiper>
                
                {/* Navigation buttons */}
                <button className="hero-swiper-prev absolute left-4 top-1/2 -translate-y-1/2 z-10 w-12 h-12 rounded-full bg-white/90 backdrop-blur-sm hover:bg-white shadow-lg flex items-center justify-center transition-all hover:scale-110">
                  <svg className="w-6 h-6 text-gray-800" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M15 19l-7-7 7-7" />
                  </svg>
                </button>
                <button className="hero-swiper-next absolute right-4 top-1/2 -translate-y-1/2 z-10 w-12 h-12 rounded-full bg-white/90 backdrop-blur-sm hover:bg-white shadow-lg flex items-center justify-center transition-all hover:scale-110">
                  <svg className="w-6 h-6 text-gray-800" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M9 5l7 7-7 7" />
                  </svg>
                </button>
              </div>
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* Explore Rentals Carousel (data từ props) */}
      <section id="explore" className="py-16 md:py-20">
        <div className="container-std">
          <div className="flex items-end justify-between mb-8">
            <div className="max-w-3xl">
              <h2 className="text-3xl md:text-4xl font-bold tracking-tight">
                Khám phá <span className="text-gradient-emerald">bất động sản nổi bật</span> tại Nhơn Trạch
              </h2>
              <p className="text-mute text-base mt-3">Danh sách sản phẩm được chọn lọc dành riêng cho bạn</p>
            </div>
            <div className="hidden md:flex items-center gap-2 bg-emerald-50 rounded-full p-1.5">
              <button
                onClick={() => prev("explore")}
                className="w-10 h-10 rounded-full bg-white hover:bg-emerald-500 hover:text-white transition-all flex items-center justify-center shadow-sm"
                aria-label="Prev"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M15 19l-7-7 7-7" />
                </svg>
              </button>
              <button
                onClick={() => next("explore")}
                className="w-10 h-10 rounded-full bg-white hover:bg-emerald-500 hover:text-white transition-all flex items-center justify-center shadow-sm"
                aria-label="Next"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M9 5l7 7-7 7" />
                </svg>
              </button>
            </div>
          </div>

          {loadErr && <div className="text-sm text-red-600">Lỗi: {loadErr}</div>}
          {!loadErr && listings.length === 0 && (
            <div className="text-sm text-mute">Chưa có tin đăng.</div>
          )}
          {!loadErr && listings.length > 0 && (
            <div className="swiper-shadow-container">
              <Swiper
                modules={[Navigation, A11y, Autoplay]}
                slidesPerView={1.2}
                breakpoints={{ 
                  480: { slidesPerView: 1.5 },
                  640: { slidesPerView: 2 }, 
                  768: { slidesPerView: 2.5 },
                  1024: { slidesPerView: 3 },
                  1280: { slidesPerView: 4 }
                }}
                spaceBetween={16}
                onSwiper={(swiper: SwiperType) => setRef("explore", swiper)}
              >
              {listings.map((item) => (
                <SwiperSlide key={item.id} className="h-auto">
                  <Link
                    href={item.slug ? `/nha-dat-ban/${item.slug}` : "#"}
                    aria-label={`Xem chi tiết: ${item.title}`}
                    className="block h-full"
                  >
                    <SlideCard item={item} />
                  </Link>
                </SwiperSlide>
              ))}
              </Swiper>
            </div>
          )}

          <div className="flex md:hidden justify-center pt-6">
            <div className="flex items-center gap-2 bg-emerald-50 rounded-full p-1.5">
              <button
                onClick={() => prev("explore")}
                className="w-12 h-12 rounded-full bg-white hover:bg-emerald-500 hover:text-white transition-all flex items-center justify-center shadow-sm"
                aria-label="Prev"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M15 19l-7-7 7-7" />
                </svg>
              </button>
              <button
                onClick={() => next("explore")}
                className="w-12 h-12 rounded-full bg-white hover:bg-emerald-500 hover:text-white transition-all flex items-center justify-center shadow-sm"
                aria-label="Next"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M9 5l7 7-7 7" />
                </svg>
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Manage Property */}
      <section id="manage" className="py-16 md:py-20">
        <div className="container-std">
          <div className="text-center max-w-3xl mx-auto mb-12">
            <h3 className="text-3xl md:text-4xl font-bold tracking-tight">
              <span className="text-gradient-emerald">Quản lý bất động sản</span> hiệu quả cùng Phát Đạt
            </h3>
            <p className="text-mute text-lg mt-4 leading-relaxed">
              Hỗ trợ đăng tin, tư vấn pháp lý, ký gửi và quản lý sản phẩm chuyên nghiệp.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            <div className="group relative overflow-hidden rounded-3xl bg-gradient-to-br from-emerald-500 to-emerald-600 p-8 text-white hover:shadow-2xl transition-all duration-300 hover:scale-[1.02]">
              <div className="absolute top-0 right-0 w-40 h-40 bg-white/10 rounded-full -mr-20 -mt-20"></div>
              <div className="absolute bottom-0 left-0 w-32 h-32 bg-white/10 rounded-full -ml-16 -mb-16"></div>
              <div className="relative space-y-6">
                <div className="w-16 h-16 rounded-2xl bg-white/20 backdrop-blur-sm flex items-center justify-center">
                  <svg className="w-9 h-9 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                  </svg>
                </div>
                <h4 className="text-2xl font-bold">Đăng tin bán/cho thuê</h4>
                <p className="text-emerald-50 text-base leading-relaxed">
                  Đăng tin miễn phí, tiếp cận hàng ngàn khách hàng tiềm năng tại Nhơn Trạch. Hỗ trợ chụp ảnh chuyên nghiệp, viết mô tả hấp dẫn, đẩy tin lên top để bán nhanh hơn.
                </p>
                <ul className="space-y-2 text-emerald-50 text-sm">
                  <li className="flex items-center gap-2">
                    <svg className="w-5 h-5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                    <span>Đăng tin không giới hạn</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <svg className="w-5 h-5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                    <span>Hỗ trợ chụp ảnh miễn phí</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <svg className="w-5 h-5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                    <span>Đẩy tin lên top nhanh chóng</span>
                  </li>
                </ul>
                <button className="btn bg-white text-emerald-600 hover:bg-emerald-50 border-0 w-full font-semibold shadow-lg">
                  Đăng tin ngay
                </button>
              </div>
            </div>

            <div className="group relative overflow-hidden rounded-3xl bg-white border-2 border-emerald-100 p-8 hover:shadow-2xl transition-all duration-300 hover:scale-[1.02] hover:border-emerald-300">
              <div className="absolute top-0 right-0 w-40 h-40 bg-emerald-50 rounded-full -mr-20 -mt-20"></div>
              <div className="absolute bottom-0 left-0 w-32 h-32 bg-emerald-50 rounded-full -ml-16 -mb-16"></div>
              <div className="relative space-y-6">
                <div className="w-16 h-16 rounded-2xl bg-gradient-emerald flex items-center justify-center">
                  <svg className="w-9 h-9 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                  </svg>
                </div>
                <h4 className="text-2xl font-bold text-gray-900">Hỗ trợ pháp lý & ký gửi</h4>
                <p className="text-mute text-base leading-relaxed">
                  Đội ngũ chuyên viên pháp lý giàu kinh nghiệm hỗ trợ kiểm tra giấy tờ, soạn thảo hợp đồng, làm sổ đỏ. Dịch vụ ký gửi uy tín, bán nhanh trong 30 ngày.
                </p>
                <ul className="space-y-2 text-gray-600 text-sm">
                  <li className="flex items-center gap-2">
                    <svg className="w-5 h-5 text-emerald-600 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                    <span>Kiểm tra pháp lý miễn phí</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <svg className="w-5 h-5 text-emerald-600 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                    <span>Hỗ trợ làm sổ đỏ, sang tên</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <svg className="w-5 h-5 text-emerald-600 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                    <span>Cam kết bán trong 30 ngày</span>
                  </li>
                </ul>
                <button className="btn btn-dark w-full font-semibold">
                  Tìm hiểu thêm
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Find Land Easily */}
      <section id="rent" className="py-16 md:py-20">
        <div className="container-std">
          <div className="text-center max-w-3xl mx-auto mb-12">
            <h3 className="text-3xl md:text-4xl font-bold tracking-tight">
              Tìm đất <span className="text-gradient-emerald">dễ dàng</span> tại Nhơn Trạch
            </h3>
            <p className="text-mute text-lg mt-4 leading-relaxed">
              Hệ thống tìm kiếm thông minh giúp bạn nhanh chóng tìm được mảnh đất phù hợp với nhu cầu và ngân sách.
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 gap-8 items-center">
            <div className="card overflow-hidden order-2 md:order-1 group">
              <div className="relative h-96 bg-black overflow-hidden">
                <Image
                  src="https://images.unsplash.com/photo-1500382017468-9049fed747ef?w=1200&q=80"
                  alt="Đất nền Nhơn Trạch"
                  fill
                  unoptimized
                  className="absolute inset-0 object-cover group-hover:scale-110 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"></div>
                <div className="absolute bottom-6 left-6 right-6">
                  <div className="flex items-center gap-2 text-white/90 text-sm mb-2">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                    <span>Nhơn Trạch, Đồng Nai</span>
                  </div>
                  <p className="text-white font-medium">Đất nền sổ đỏ, pháp lý rõ ràng, vị trí đẹp</p>
                </div>
              </div>
            </div>
            
            <div className="order-1 md:order-2 space-y-6">
              <div className="space-y-4">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-xl bg-gradient-emerald flex items-center justify-center flex-shrink-0">
                    <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                    </svg>
                  </div>
                  <div>
                    <h5 className="font-bold text-lg mb-1">Tìm kiếm thông minh</h5>
                    <p className="text-mute text-sm">Lọc theo vị trí, diện tích, giá cả và nhiều tiêu chí khác</p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-xl bg-gradient-emerald flex items-center justify-center flex-shrink-0">
                    <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                    </svg>
                  </div>
                  <div>
                    <h5 className="font-bold text-lg mb-1">Pháp lý minh bạch</h5>
                    <p className="text-mute text-sm">100% sản phẩm có sổ đỏ, giấy tờ đầy đủ, an tâm giao dịch</p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-xl bg-gradient-emerald flex items-center justify-center flex-shrink-0">
                    <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18.364 5.636l-3.536 3.536m0 5.656l3.536 3.536M9.172 9.172L5.636 5.636m3.536 9.192l-3.536 3.536M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-5 0a4 4 0 11-8 0 4 4 0 018 0z" />
                    </svg>
                  </div>
                  <div>
                    <h5 className="font-bold text-lg mb-1">Hỗ trợ 24/7</h5>
                    <p className="text-mute text-sm">Đội ngũ tư vấn chuyên nghiệp, hỗ trợ khách hàng mọi lúc</p>
                  </div>
                </div>
              </div>
              
              <div className="grid grid-cols-2 gap-4 pt-4">
                <div className="bg-gradient-to-br from-emerald-50 to-emerald-100 p-5 rounded-2xl border border-emerald-200">
                  <div className="text-3xl font-bold text-gradient-emerald">800+</div>
                  <div className="text-sm text-emerald-700 mt-1 font-medium">Mảnh đất</div>
                </div>
                <div className="bg-gradient-to-br from-emerald-50 to-emerald-100 p-5 rounded-2xl border border-emerald-200">
                  <div className="text-3xl font-bold text-gradient-emerald">100%</div>
                  <div className="text-sm text-emerald-700 mt-1 font-medium">Sổ đỏ</div>
                </div>
              </div>
              
              <button className="btn btn-primary w-full md:w-auto">
                Tìm đất ngay
                <svg className="w-5 h-5 ml-2 inline" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                </svg>
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Homeownership + Explore Options */}
      <section id="own" className="py-16 md:py-20">
        <div className="container-std grid md:grid-cols-2 gap-8 items-center">
          <div className="space-y-6">
            <h3 className="text-3xl md:text-4xl font-bold tracking-tight">
              Tìm kiếm cơ hội <span className="text-gradient-emerald">sở hữu nhà đất</span> tại Nhơn Trạch
            </h3>
            <p className="text-mute text-base leading-relaxed">
              Bạn đang cân nhắc mua đất nền, nhà phố hoặc biệt thự? <span className="text-gradient-emerald font-semibold">Phát Đạt</span> sẽ giúp bạn tìm được sản phẩm phù hợp nhất
              với nhu cầu và tài chính.
            </p>
            <div className="flex gap-3">
              <button className="btn btn-primary">Bắt đầu ngay</button>
              <button className="btn btn-dark">Tìm hiểu thêm</button>
            </div>
          </div>
          <div className="card overflow-hidden">
            <Image 
              src="https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=800&q=80" 
              alt="Sở hữu nhà đất" 
              width={600} 
              height={320} 
              unoptimized
              className="w-full h-64 md:h-96 object-cover" 
            />
          </div>
        </div>

        <div className="container-std mt-16">
          <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-emerald-500 to-emerald-700 shadow-2xl">
            <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiNmZmYiIGZpbGwtb3BhY2l0eT0iMC4wNSI+PHBhdGggZD0iTTM2IDE0YzMuMzEgMCA2IDIuNjkgNiA2cy0yLjY5IDYtNiA2LTYtMi42OS02LTYgMi42OS02IDYtNnpNNiAzNGMzLjMxIDAgNiAyLjY5IDYgNnMtMi42OSA2LTYgNi02LTIuNjktNi02IDIuNjktNiA2LTZ6Ii8+PC9nPjwvZz48L3N2Zz4=')] opacity-30"></div>
            <div className="grid md:grid-cols-2 gap-0 relative">
              <div className="p-10 md:p-14 flex flex-col justify-center space-y-6 text-white">
                <h4 className="text-3xl md:text-4xl font-bold">
                  Khám phá <span className="text-white drop-shadow-lg">đa dạng sản phẩm</span>
                </h4>
                <p className="text-emerald-50 text-lg leading-relaxed">
                  Từ đất nền, nhà phố đến biệt thự cao cấp, Phát Đạt luôn có giải pháp phù hợp cho bạn tại Nhơn Trạch, Đồng Nai.
                </p>
                <button className="btn bg-white text-emerald-600 hover:bg-emerald-50 border-0 w-max font-semibold shadow-lg">
                  Khám phá ngay →
                </button>
              </div>
              <div className="relative h-80 md:h-auto">
                <Image 
                  src="https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800&q=80" 
                  alt="Đa dạng lựa chọn bất động sản" 
                  fill
                  unoptimized
                  className="object-cover" 
                />
              </div>
            </div>
          </div>
        </div>
      </section>



      {/* Resources */}
      <section id="resources" className="py-16 md:py-20">
        <div className="container-std">
          <div className="text-center max-w-3xl mx-auto mb-10">
            <h3 className="text-3xl md:text-4xl font-bold tracking-tight">
              Hỗ trợ <span className="text-gradient-emerald">khách hàng</span> & chủ đầu tư
            </h3>
            <p className="text-mute text-base mt-3">Tin tức, hướng dẫn, video giúp bạn giao dịch bất động sản an toàn và hiệu quả.</p>
          </div>

          <div className="mt-8 grid md:grid-cols-3 gap-6">
            <ResourceCard
              title="Kinh nghiệm mua bán"
              text="Hướng dẫn chi tiết về thủ tục, giấy tờ cần thiết, quy trình mua bán đất nền và nhà phố tại Nhơn Trạch."
              cta="Xem tin tức"
              image="https://images.unsplash.com/photo-1450101499163-c8848c66ca85?w=600&q=80"
            />
            <ResourceCard
              title="Tư vấn pháp lý miễn phí"
              text="Đội ngũ luật sư giàu kinh nghiệm hỗ trợ kiểm tra sổ đỏ, hợp đồng, giải quyết tranh chấp bất động sản."
              cta="Tư vấn ngay"
              image="https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=600&q=80"
            />
            <ResourceCard
              title="Định giá bất động sản"
              text="Dịch vụ định giá chuyên nghiệp, chính xác giúp bạn mua bán đúng giá thị trường tại Nhơn Trạch."
              cta="Định giá ngay"
              image="https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=600&q=80"
            />
          </div>
        </div>
      </section>

      {/* Support CTA */}
      <section id="cta-support" className="py-16 md:py-20">
        <div className="container-std">
          <div className="relative overflow-hidden rounded-3xl bg-white shadow-2xl border border-emerald-100">
            <div className="absolute top-0 right-0 w-96 h-96 bg-gradient-to-br from-emerald-100 to-transparent rounded-full -mr-48 -mt-48 opacity-50"></div>
            <div className="absolute bottom-0 left-0 w-80 h-80 bg-gradient-to-tr from-emerald-50 to-transparent rounded-full -ml-40 -mb-40 opacity-50"></div>
            
            <div className="relative grid lg:grid-cols-2 gap-6 lg:gap-10 p-4 md:p-8 lg:p-12">
              <div className="space-y-6 px-4 md:px-0">
                <h4 className="text-3xl md:text-4xl font-bold leading-tight">
                  Cần gợi ý <span className="text-gradient-emerald">sản phẩm phù hợp</span> tại Nhơn Trạch?
                </h4>
                <p className="text-mute text-lg leading-relaxed">
                  Để lại thông tin, chúng tôi sẽ gửi danh sách đề xuất theo <span className="text-gradient-emerald font-semibold">ngân sách</span> và{" "}
                  <span className="text-gradient-emerald font-semibold">nhu cầu</span> của bạn trong 24h.
                </p>

                <div className="space-y-4">
                  <div className="flex items-start gap-3">
                    <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-emerald-400 to-emerald-600 flex items-center justify-center flex-shrink-0">
                      <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                    </div>
                    <div>
                      <h5 className="font-semibold text-gray-900 mb-1">Tư vấn miễn phí 100%</h5>
                      <p className="text-sm text-gray-600">Đội ngũ chuyên viên giàu kinh nghiệm tư vấn tận tình</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-emerald-400 to-emerald-600 flex items-center justify-center flex-shrink-0">
                      <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                    </div>
                    <div>
                      <h5 className="font-semibold text-gray-900 mb-1">Phản hồi nhanh trong 24h</h5>
                      <p className="text-sm text-gray-600">Nhận danh sách sản phẩm phù hợp ngay trong ngày</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-emerald-400 to-emerald-600 flex items-center justify-center flex-shrink-0">
                      <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                      </svg>
                    </div>
                    <div>
                      <h5 className="font-semibold text-gray-900 mb-1">Bảo mật thông tin tuyệt đối</h5>
                      <p className="text-sm text-gray-600">Cam kết không chia sẻ thông tin cho bên thứ ba</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-emerald-400 to-emerald-600 flex items-center justify-center flex-shrink-0">
                      <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                      </svg>
                    </div>
                    <div>
                      <h5 className="font-semibold text-gray-900 mb-1">Hơn 1000+ khách hàng tin tưởng</h5>
                      <p className="text-sm text-gray-600">Đã hỗ trợ thành công hàng ngàn giao dịch</p>
                    </div>
                  </div>
                </div>
              </div>

              <form
                onSubmit={submitSupport}
                className="bg-white rounded-2xl p-4 md:p-8 border border-gray-200 shadow-lg space-y-5"
              >
                <div className="space-y-4">
                  <label className="block">
                    <span className="block text-sm font-medium text-gray-700 mb-2">Họ và tên</span>
                    <input
                      value={supportForm.name}
                      onChange={(e) => setSupportForm((prev) => ({ ...prev, name: e.target.value }))}
                      required
                      type="text"
                      className="h-12 w-full rounded-xl bg-gray-50 border border-gray-200 px-4 text-base focus:outline-none focus:ring-2 focus:ring-emerald-400/30 focus:border-emerald-500 focus:bg-white transition-all"
                      placeholder="Nhập họ tên"
                    />
                  </label>

                  <label className="block">
                    <span className="block text-sm font-medium text-gray-700 mb-2">Số điện thoại</span>
                    <div className="relative">
                      <div className="absolute left-4 top-1/2 -translate-y-1/2 flex items-center gap-2 pointer-events-none">
                        <Image
                          src="/flag_vietnam.png"
                          alt="Vietnam"
                          width={24}
                          height={16}
                          className="rounded-sm"
                          unoptimized
                        />
                        <span className="text-gray-600 text-base font-medium">+84</span>
                        <span className="text-gray-300">|</span>
                      </div>
                      <input
                        value={supportForm.email}
                        onChange={(e) => setSupportForm((prev) => ({ ...prev, email: e.target.value }))}
                        required
                        type="tel"
                        className="h-12 w-full rounded-xl bg-gray-50 border border-gray-200 pl-24 pr-4 text-base focus:outline-none focus:ring-2 focus:ring-emerald-400/30 focus:border-emerald-500 focus:bg-white transition-all"
                        placeholder="365 614 778"
                      />
                    </div>
                  </label>

                  <label className="block">
                    <span className="block text-sm font-medium text-gray-700 mb-2">Email</span>
                    <input
                      value={supportForm.email}
                      onChange={(e) => setSupportForm((prev) => ({ ...prev, email: e.target.value }))}
                      required
                      type="email"
                      className="h-12 w-full rounded-xl bg-gray-50 border border-gray-200 px-4 text-base focus:outline-none focus:ring-2 focus:ring-emerald-400/30 focus:border-emerald-500 focus:bg-white transition-all"
                      placeholder="email@example.com"
                    />
                  </label>

                  <label className="block sm:col-span-2">
                    <span className="block text-sm font-medium text-gray-700 mb-2">Nhu cầu</span>
                    <Dropdown options={needs} value={supportForm.need} onChange={(value: string) => setSupportForm((prev) => ({ ...prev, need: value }))} />
                  </label>

                  <label className="block sm:col-span-2">
                    <span className="block text-sm font-medium text-gray-700 mb-2">Ghi chú (tuỳ chọn)</span>
                    <textarea
                      value={supportForm.message}
                      onChange={(e) => setSupportForm((prev) => ({ ...prev, message: e.target.value }))}
                      rows={4}
                      className="w-full rounded-xl bg-gray-50 border border-gray-200 px-4 py-3 text-base focus:outline-none focus:ring-2 focus:ring-emerald-400/30 focus:border-emerald-500 focus:bg-white transition-all resize-none"
                      placeholder="Ngân sách, vị trí ưa thích, thời gian dự kiến..."
                    />
                  </label>
                </div>

                <label className="flex items-center gap-3 cursor-pointer group">
                  <input
                    checked={supportForm.subscribe}
                    onChange={(e) => setSupportForm((prev) => ({ ...prev, subscribe: e.target.checked }))}
                    type="checkbox"
                    className="w-5 h-5 rounded border-2 border-gray-300 text-emerald-500 focus:ring-2 focus:ring-emerald-400/30 cursor-pointer transition-all flex-shrink-0"
                  />
                  <p className={`text-sm font-medium leading-relaxed transition-colors ${supportForm.subscribe ? 'text-emerald-600' : 'text-gray-700'}`}>
                    Nhận email về dự án mới & ưu đãi đặc biệt tại Nhơn Trạch
                  </p>
                </label>

                <button disabled={supportLoading} className="btn btn-primary h-14 w-full text-base font-semibold shadow-lg hover:shadow-xl transition-all">
                  {supportLoading ? (
                    <span className="inline-flex items-center gap-2">
                      <svg className="animate-spin" width="20" height="20" viewBox="0 0 24 24">
                        <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" opacity=".25" />
                        <path d="M22 12a10 10 0 0 1-10 10" fill="none" stroke="currentColor" strokeWidth="4" />
                      </svg>
                      Đang gửi...
                    </span>
                  ) : (
                    <span className="inline-flex items-center gap-2">
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
                      </svg>
                      Nhận tư vấn miễn phí ngay
                    </span>
                  )}
                </button>

                {supportSuccess && (
                  <div className="bg-green-50 border-2 border-green-200 rounded-xl p-4 text-center">
                    <p className="text-green-700 font-medium">✅ Cảm ơn bạn! Chúng tôi sẽ liên hệ trong thời gian sớm nhất.</p>
                  </div>
                )}
                {supportError && (
                  <div className="bg-red-50 border-2 border-red-200 rounded-xl p-4 text-center">
                    <p className="text-red-700 font-medium">❌ Có lỗi khi gửi thông tin. Vui lòng thử lại.</p>
                  </div>
                )}
              </form>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default HomeClient;

// CSS for scroll reveal animation (chạy ở client)
const styles = `
  .animate-scroll-reveal {
    animation: reveal 0.5s ease-out forwards;
  }
  @keyframes reveal {
    from { opacity: 0; transform: translateY(10px) translateX(-10px); }
    to { opacity: 1; transform: translateY(0) translateX(0); }
  }
  :root { color-scheme: dark; }
`;

if (typeof document !== "undefined") {
  const styleSheet = document.createElement("style");
  styleSheet.textContent = styles;
  document.head.appendChild(styleSheet);
}
