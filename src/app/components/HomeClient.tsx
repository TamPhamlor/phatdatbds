// app/components/HomeClient.tsx
"use client";

import React, { useState, useRef } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, A11y, Autoplay } from "swiper/modules";
import type { Swiper as SwiperType } from "swiper";
import "swiper/css";
import Image from "next/image";
import dynamic from "next/dynamic";

// Nhận type Listing từ page (hoặc tách ra /app/types)
import type { Listing } from "@/app/page";
import Link from "next/link";

// Reusable components (assumed to be defined elsewhere)
const SlideCard = dynamic(() => import("@/app/components/SlideCard"), { ssr: false });
const ResourceCard = dynamic(() => import("@/app/components/ResourceCard"), { ssr: false });
const Dropdown = dynamic(() => import("@/app/components/Dropdown"), { ssr: false });
const ScrollReveal = dynamic(() => import("@/app/components/ScrollReveal"), { ssr: false });

// =================== Types (UI state) ===================
interface FilterState {
    location: string;
    type: string;
    price: string;
}
interface SupportFormState {
    name: string;
    email: string;
    need: string;
    message: string;
    query: string;
    subscribe: boolean;
}

// =================== Mock/UI options ===================
const locations: string[] = ["Vị trí hiện tại", "Nhơn Trạch", "Long Thành"];
const types: string[] = ["Tất cả", "Đất nền", "Nhà phố", "Biệt thự"];
const prices: string[] = ["Tất cả", "Dưới 1 tỷ", "1-2 tỷ", "Trên 2 tỷ"];
const needs = ["Mua", "Thuê", "Đầu tư"];

// =================== Component ===================
type Props = {
    listings: Listing[];
    loadErr?: string | null;
};

const HomeClient: React.FC<Props> = ({ listings, loadErr }) => {
    // ---- Filters (hero search) ----
    const [filters, setFilters] = useState<FilterState>({
        location: locations[0],
        type: types[0],
        price: prices[0],
    });

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

    return (
        <div className="min-h-screen bg-ink text-black">
            {/* Hero */}
            <section className="relative">
                <div
                    className="
            relative container-std py-12 md:py-16
            bg-[linear-gradient(rgba(255,255,255,0.5),rgba(255,255,255,0.9)),url('https://image3.luatvietnam.vn/uploaded/images/original/2025/07/22/de-xuat-tinh-thue-20-tren-lai-chuyen-nhuong-bat-dong-san_2207150058.jpg')]
            bg-center bg-cover bg-no-repeat
            md:bg-none
          "
                >
                    <div className="grid md:grid-cols-2 gap-8 items-center">
                        <div>
                            <ScrollReveal initialClass="opacity-0 translate-y-10" enterClass="opacity-100 translate-y-0">
                                <p className="tag mb-4">
                                    Tìm kiếm <span className="ml-1 font-bold">Bất động sản Nhơn Trạch</span>
                                </p>
                                <h1 className="text-2xl md:text-3xl leading-tight">
                                    Phát Đạt - Kết nối khách hàng với hàng trăm sản phẩm đất nền, nhà phố, biệt thự tại Nhơn Trạch, Đồng Nai.
                                </h1>

                                {/* Search Bar */}
                                <div className="mt-6 card p-4 md:p-5 ">
                                    <div className="grid md:grid-cols-3 gap-3 items-end ">
                                        <Dropdown
                                            label="Vị trí"
                                            options={locations}
                                            value={filters.location}
                                            onChange={(value: string) => setFilters((prev) => ({ ...prev, location: value }))}
                                        />
                                        <Dropdown
                                            label="Mức giá"
                                            options={prices}
                                            value={filters.price}
                                            onChange={(value: string) => setFilters((prev) => ({ ...prev, price: value }))}
                                        />
                                        <button className="btn btn-primary h-12 self-end text-[14px] px-5">Tìm kiếm</button>
                                    </div>
                                </div>
                            </ScrollReveal>

                            <ScrollReveal initialClass="opacity-0 translate-y-10" enterClass="opacity-100 translate-y-0">
                                {/* Metrics */}
                                <dl className="mt-6 grid grid-cols-3 gap-4 text-center">
                                    <div>
                                        <dt className="text-2xl md:text-3xl font-bold">10+</dt>
                                        <dd className="text-xs text-mute">Năm kinh nghiệm</dd>
                                    </div>
                                    <div>
                                        <dt className="text-2xl md:text-3xl font-bold">500+</dt>
                                        <dd className="text-xs text-mute">Sản phẩm đã giao dịch</dd>
                                    </div>
                                    <div>
                                        <dt className="text-2xl md:text-3xl font-bold">1000+</dt>
                                        <dd className="text-xs text-mute">Khách hàng hài lòng</dd>
                                    </div>
                                </dl>
                            </ScrollReveal>
                        </div>

                        <ScrollReveal initialClass="opacity-0 -translate-x-10" enterClass="opacity-100 translate-x-0">
                            <div className="hidden md:block ">
                                <Image
                                    src="/1-15651645335071869680987.jpg"
                                    alt="Bất động sản Nhơn Trạch"
                                    width={600}
                                    height={400}
                                    unoptimized
                                    className="shadow-soft border border-black/10"
                                    style={{ borderRadius: "20px" }}
                                />
                            </div>
                        </ScrollReveal>
                    </div>
                </div>
            </section>

            {/* Explore Rentals Carousel (data từ props) */}
            <section id="explore" className="py-10 md:py-5">
                <div className="container-std">
                    <div className="flex items-end justify-between mb-6">
                        <div>
                            <h2 className="text-2xl md:text-3xl">Khám phá bất động sản nổi bật tại Nhơn Trạch</h2>
                            <p className="text-mute text-sm mt-1">Danh sách sản phẩm được chọn lọc dành riêng cho bạn</p>
                        </div>
                        <div className="hidden md:flex items-center gap-2">
                            <button
                                onClick={() => prev("explore")}
                                className="rounded-full border border-black/10 hover:bg-white/10 py-[4px] px-[16px]"
                                aria-label="Prev"
                            >
                                ←
                            </button>
                            <button
                                onClick={() => next("explore")}
                                className="rounded-full border border-black/10 hover:bg-white/10 py-[4px] px-[16px]"
                                aria-label="Next"
                            >
                                →
                            </button>
                        </div>
                    </div>

                    {loadErr && <div className="text-sm text-red-600">Lỗi: {loadErr}</div>}
                    {!loadErr && listings.length === 0 && (
                        <div className="text-sm text-mute">Chưa có tin đăng.</div>
                    )}
                    {!loadErr && listings.length > 0 && (
                        <Swiper
                            modules={[Navigation, A11y, Autoplay]}
                            slidesPerView={1.1}
                            breakpoints={{ 640: { slidesPerView: 2 }, 1024: { slidesPerView: 3.2 } }}
                            spaceBetween={16}
                            onSwiper={(swiper: SwiperType) => setRef("explore", swiper)}
                        >
                            {listings.map((item) => (
                                <SwiperSlide key={item.id}>
                                    <Link
                                        href={item.slug ? `/nha-dat-ban/${item.slug}` : "#"}
                                        aria-label={`Xem chi tiết: ${item.title}`}
                                        className="block"
                                    >
                                        <SlideCard item={item} />
                                    </Link>
                                </SwiperSlide>
                            ))}
                        </Swiper>
                    )}

                    <div className="flex md:hidden justify-center pt-4">
                        <div className="flex items-center gap-4">
                            <button
                                onClick={() => prev("explore")}
                                className="rounded-full border border-black/10 hover:bg-white/10 px-[20px] py-[10px]"
                                aria-label="Prev"
                            >
                                ←
                            </button>
                            <button
                                onClick={() => next("explore")}
                                className="rounded-full border border-black/10 hover:bg-white/10 px-[20px] py-[10px]"
                                aria-label="Next"
                            >
                                →
                            </button>
                        </div>
                    </div>
                </div>
            </section>

            {/* Most Rental Listings CTA banner */}
            <section id="rent" className="py-10 md:5">
                <div className="container-std">
                    <h3 className="text-center text-2xl md:text-3xl">Nhiều lựa chọn cho thuê nhất Nhơn Trạch</h3>
                    <p className="text-center text-mute text-sm mt-1">
                        Chọn từ hàng trăm sản phẩm đất nền, nhà phố, biệt thự cho thuê tại Nhơn Trạch, Đồng Nai.
                    </p>
                    <div className="mt-6 card overflow-hidden">
                        <div className="relative h-64 md:h-80 bg-black">
                            <Image
                                src="/1-15651645335071869680987.jpg"
                                alt="Cho thuê"
                                fill
                                unoptimized
                                className="absolute inset-0 object-cover opacity-40"
                            />
                            <div className="absolute inset-0 bg-gradient-to-tr from-ink/60 to-transparent"></div>
                            <div className="relative p-6 md:p-8 h-full flex items-end">
                                <div>
                                    <h4 className="text-xl md:text-2xl text-white">Thuê nhà dễ dàng</h4>
                                    <p className="text-mute text-mb mt-1 max-w-xl text-white">
                                        Duyệt tin đăng chất lượng, liên hệ trực tiếp, ký hợp đồng nhanh chóng và an toàn với Phát Đạt.
                                    </p>
                                    <button className="btn btn-primary mt-4">Xem thêm</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Homeownership + Explore Options */}
            <section id="own" className="py-10 md:py-5 bg-white/5">
                <div className="container-std grid md:grid-cols-2 gap-6 items-start">
                    <div>
                        <h3 className="text-2xl md:text-3xl fw-bold">Tìm kiếm cơ hội sở hữu nhà đất tại Nhơn Trạch</h3>
                        <p className="text-mute mt-2">
                            Bạn đang cân nhắc mua đất nền, nhà phố hoặc biệt thự? Phát Đạt sẽ giúp bạn tìm được sản phẩm phù hợp nhất
                            với nhu cầu và tài chính.
                        </p>
                        <div className="mt-4">
                            <button className="btn btn-dark">Bắt đầu ngay</button>
                        </div>
                    </div>
                    <div className="card overflow-hidden">
                        <Image src="/1-15651645335071869680987.jpg" alt="Sở hữu" width={600} height={320} className="w-full h-64 md:h-80 object-cover" />
                    </div>
                </div>

                <div className="container-std mt-8">
                    <div className="card overflow-hidden">
                        <div className="grid md:grid-cols-2 gap-0">
                            <Image src="/1-15651645335071869680987.jpg" alt="Lựa chọn" width={600} height={320} className="w-full h-60 md:h-80 object-cover" />
                            <div className="p-6 md:p-8">
                                <h4 className="text-xl md:text-2xl">Khám phá đa dạng sản phẩm</h4>
                                <p className="text-mute text-sm mt-2">
                                    Từ đất nền, nhà phố đến biệt thự cao cấp, Phát Đạt luôn có giải pháp phù hợp cho bạn tại Nhơn Trạch, Đồng Nai.
                                </p>
                                <button className="btn btn-primary mt-4 w-max">Khám phá ngay</button>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Manage Property */}
            <section id="manage" className="py-10 md:py-5">
                <div className="container-std">
                    <div className="grid md:grid-cols-2 gap-6 items-center">
                        <div>
                            <h3 className="text-2xl md:text-3xl">Quản lý bất động sản hiệu quả cùng Phát Đạt</h3>
                            <p className="text-mute mt-2">Hỗ trợ đăng tin, tư vấn pháp lý, ký gửi và quản lý sản phẩm chuyên nghiệp.</p>
                        </div>
                        <div className="card overflow-hidden">
                            <Image src="/1-15651645335071869680987.jpg" alt="Quản lý" width={600} height={288} className="w-full h-56 md:h-72 object-cover" unoptimized />
                        </div>
                    </div>

                    <div className="mt-6 grid md:grid-cols-2 gap-6">
                        <div className="card p-6 text-center">
                            <h4 className="text-lg">Đăng tin bán/cho thuê</h4>
                            <p className="text-mute text-sm mt-1">Tiếp cận hàng ngàn khách hàng tiềm năng tại Nhơn Trạch, Đồng Nai.</p>
                            <button className="btn btn-primary mt-4 w-max mx-auto">Đăng tin ngay</button>
                        </div>
                        <div className="card p-6 text-center bg-white/5">
                            <h4 className="text-lg">Hỗ trợ pháp lý, ký gửi</h4>
                            <p className="text-mute text-sm mt-1">Tư vấn, hỗ trợ thủ tục pháp lý, ký gửi sản phẩm nhanh chóng, an toàn.</p>
                            <button className="btn btn-dark mt-4 w-max mx-auto">Tìm hiểu thêm</button>
                        </div>
                    </div>
                </div>
            </section>

            {/* Resources */}
            <section id="resources" className="py-10 md:py-5 bg-white/5">
                <div className="container-std">
                    <h3 className="text-2xl md:text-3xl text-center">Hỗ trợ khách hàng & chủ đầu tư</h3>
                    <p className="text-mute text-sm text-center mt-1">Bài viết, hướng dẫn, video giúp bạn giao dịch bất động sản an toàn và hiệu quả.</p>

                    <div className="mt-8 grid md:grid-cols-3 gap-6">
                        <ResourceCard
                            title="Kinh nghiệm mua bán"
                            text="Chia sẻ kinh nghiệm, thủ tục, lưu ý khi giao dịch bất động sản Nhơn Trạch."
                            cta="Xem bài viết"
                            image="/1-15651645335071869680987.jpg"
                        />
                        <ResourceCard
                            title="Hỗ trợ chủ đầu tư"
                            text="Tư vấn pháp lý, hỗ trợ đăng tin, ký gửi sản phẩm nhanh chóng."
                            cta="Tìm hiểu thêm"
                            image="/1-15651645335071869680987.jpg"
                        />
                        <ResourceCard
                            title="Ứng dụng di động"
                            text="Cập nhật thông tin bất động sản mọi lúc, mọi nơi với ứng dụng của Phát Đạt."
                            cta="Tải ứng dụng"
                            image="/1-15651645335071869680987.jpg"
                        />
                    </div>
                </div>
            </section>

            {/* Support CTA */}
            <section id="cta-support" className="py-10 md:py-5">
                <div className="container-std">
                    <div className="card p-4 md:p-6">
                        <div className="grid lg:grid-cols-2 gap-8 items-start">
                            <div>
                                <h4 className="text-2xl md:text-3xl font-semibold">Cần gợi ý sản phẩm phù hợp tại Nhơn Trạch?</h4>
                                <p className="text-mute mt-2">
                                    Để lại email, chúng tôi sẽ gửi danh sách đề xuất theo <span className="font-medium">ngân sách</span> và{" "}
                                    <span className="font-medium">nhu cầu</span> của bạn trong 24h.
                                </p>

                                <div className="mt-4 flex flex-wrap gap-2">
                                    {["Đất nền", "Nhà phố", "Shophouse", "Biệt thự"].map((kw) => (
                                        <button
                                            key={kw}
                                            type="button"
                                            onClick={() => setPreset(kw)}
                                            className="inline-flex items-center rounded-full border border-black/10 bg-white px-3 py-1 text-sm hover:bg-black/5"
                                        >
                                            {kw}
                                        </button>
                                    ))}
                                </div>

                                <div className="mt-4 grid grid-cols-1 gap-3">
                                    <label className="block">
                                        <span className="sr-only">Từ Khóa</span>
                                        <input
                                            value={supportForm.query}
                                            onChange={(e) => setSupportForm((prev) => ({ ...prev, query: e.target.value }))}
                                            type="text"
                                            placeholder="Nhập từ khóa (ví dụ: đất nền, nhà phố...)"
                                            className="w-full rounded-[var(--radius-xl2)] bg-white border border-black/10 px-4 py-3 focus:outline-none focus:ring-2 focus:ring-[var(--color-accent)] focus:ring-opacity-40"
                                        />
                                    </label>
                                    <div className="text-xs text-mute">Mẹo: chọn nhanh bằng các thẻ ở trên để điền từ khóa.</div>
                                </div>
                            </div>

                            <form
                                onSubmit={submitSupport}
                                className="bg-[var(--color-ink)] rounded-[var(--radius-xl2)] p-4 md:p-5 border border-black/10 shadow-sm w-full"
                            >
                                <div className="grid sm:grid-cols-2 gap-3">
                                    <label className="block">
                                        <span className="block text-xs text-[var(--color-mute)] mb-1">Họ và tên</span>
                                        <input
                                            value={supportForm.name}
                                            onChange={(e) => setSupportForm((prev) => ({ ...prev, name: e.target.value }))}
                                            required
                                            type="text"
                                            className="h-12 w-full rounded-[var(--radius-xl2)] bg-[var(--color-ink)] border border-black/10 px-4 focus:outline-none focus:ring-2 focus:ring-[var(--color-accent)] focus:ring-opacity-40"
                                            placeholder="Họ và tên"
                                        />
                                    </label>

                                    <label className="block">
                                        <span className="block text-xs text-[var(--color-mute)] mb-1">Email</span>
                                        <input
                                            value={supportForm.email}
                                            onChange={(e) => setSupportForm((prev) => ({ ...prev, email: e.target.value }))}
                                            required
                                            type="email"
                                            className="h-12 w-full rounded-[var(--radius-xl2)] bg-[var(--color-ink)] border border-black/10 px-4 focus:outline-none focus:ring-2 focus:ring-[var(--color-accent)] focus:ring-opacity-40"
                                            placeholder="Email"
                                        />
                                    </label>

                                    <label className="block sm:col-span-2">
                                        <span className="block text-xs text-[var(--color-mute)] mb-1">Nhu cầu</span>
                                        <Dropdown options={needs} value={supportForm.need} onChange={(value: string) => setSupportForm((prev) => ({ ...prev, need: value }))} />
                                    </label>

                                    <label className="block sm:col-span-2">
                                        <span className="block text-xs text-[var(--color-mute)] mb-1">Ghi chú (tuỳ chọn)</span>
                                        <textarea
                                            value={supportForm.message}
                                            onChange={(e) => setSupportForm((prev) => ({ ...prev, message: e.target.value }))}
                                            rows={3}
                                            className="w-full rounded-[var(--radius-xl2)] bg-[var(--color-ink)] border border-black/10 px-4 py-3 focus:outline-none focus:ring-2 focus:ring-[var(--color-accent)] focus:ring-opacity-40"
                                            placeholder="Ngân sách, vị trí ưa thích, thời gian dự kiến..."
                                        />
                                    </label>
                                </div>

                                <div className="mt-3 flex flex-col sm:flex-row sm:items-center gap-3 sm:justify-between">
                                    <label className="inline-flex items-center gap-2 text-xs text-[var(--color-mute)]">
                                        <input
                                            checked={supportForm.subscribe}
                                            onChange={(e) => setSupportForm((prev) => ({ ...prev, subscribe: e.target.checked }))}
                                            type="checkbox"
                                            className="rounded border-black/20"
                                        />
                                        Nhận email về dự án mới & ưu đãi
                                    </label>
                                    <button disabled={supportLoading} className="btn btn-primary h-12 w-full sm:w-auto">
                                        {supportLoading ? (
                                            <span className="inline-flex items-center gap-2">
                                                <svg className="animate-spin" width="16" height="16" viewBox="0 0 24 24">
                                                    <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" opacity=".25" />
                                                    <path d="M22 12a10 10 0 0 1-10 10" fill="none" stroke="currentColor" strokeWidth="4" />
                                                </svg>
                                                Đang gửi...
                                            </span>
                                        ) : (
                                            "Nhận tư vấn miễn phí"
                                        )}
                                    </button>
                                </div>

                                {supportSuccess && <p className="mt-3 text-green-600 text-sm">Cảm ơn bạn! Chúng tôi sẽ liên hệ trong thời gian sớm nhất.</p>}
                                {supportError && <p className="mt-3 text-red-600 text-sm">Có lỗi khi gửi thông tin. Vui lòng thử lại.</p>}
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
  :root {
    color-scheme: dark;
  }
`;

if (typeof document !== "undefined") {
    const styleSheet = document.createElement("style");
    styleSheet.textContent = styles;
    document.head.appendChild(styleSheet);
}
