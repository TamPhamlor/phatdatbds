import Image from 'next/image';
import Link from 'next/link';

export const metadata = {
    title: 'Giới thiệu - Phát Đạt Bất Động Sản',
    description: 'Tìm hiểu về Phát Đạt - Công ty bất động sản uy tín tại Nhơn Trạch, Đồng Nai với hơn 10 năm kinh nghiệm.',
};

export default function AboutPage() {
    return (
        <main className="min-h-screen">
            {/* Hero Section */}
            <section className="relative py-16 md:py-24 overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-br from-emerald-50 via-white to-emerald-50"></div>
                <div className="absolute top-0 right-0 w-96 h-96 bg-emerald-100 rounded-full -mr-48 -mt-48 opacity-50"></div>
                <div className="absolute bottom-0 left-0 w-80 h-80 bg-emerald-100 rounded-full -ml-40 -mb-40 opacity-50"></div>

                <div className="container-std relative">
                    <div className="text-center max-w-4xl mx-auto">
                        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-emerald-100 text-emerald-700 text-sm font-medium mb-6">
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                            </svg>
                            Về chúng tôi
                        </div>
                        <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 mb-6">
                            <span className="text-gradient-emerald">Phát Đạt</span> Bất Động Sản
                        </h1>
                        <p className="text-lg md:text-xl text-gray-600 leading-relaxed mb-8">
                            Với hơn <span className="font-semibold text-emerald-600">10 năm kinh nghiệm</span> trong lĩnh vực bất động sản,
                            Phát Đạt tự hào là đơn vị uy tín hàng đầu tại Nhơn Trạch, Đồng Nai.
                            Chúng tôi cam kết mang đến cho khách hàng những sản phẩm chất lượng và dịch vụ tận tâm nhất.
                        </p>
                    </div>
                </div>
            </section>

            {/* Stats Section */}
            <section className="py-12 md:py-16 bg-white">
                <div className="container-std">
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                        <div className="text-center p-6 rounded-2xl bg-gradient-to-br from-emerald-50 to-white border border-emerald-100">
                            <div className="text-3xl md:text-4xl font-bold text-gradient-emerald mb-2">10+</div>
                            <div className="text-sm text-gray-600">Năm kinh nghiệm</div>
                        </div>
                        <div className="text-center p-6 rounded-2xl bg-gradient-to-br from-emerald-50 to-white border border-emerald-100">
                            <div className="text-3xl md:text-4xl font-bold text-gradient-emerald mb-2">500+</div>
                            <div className="text-sm text-gray-600">Sản phẩm đã giao dịch</div>
                        </div>
                        <div className="text-center p-6 rounded-2xl bg-gradient-to-br from-emerald-50 to-white border border-emerald-100">
                            <div className="text-3xl md:text-4xl font-bold text-gradient-emerald mb-2">1000+</div>
                            <div className="text-sm text-gray-600">Khách hàng hài lòng</div>
                        </div>
                        <div className="text-center p-6 rounded-2xl bg-gradient-to-br from-emerald-50 to-white border border-emerald-100">
                            <div className="text-3xl md:text-4xl font-bold text-gradient-emerald mb-2">100%</div>
                            <div className="text-sm text-gray-600">Pháp lý rõ ràng</div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Vision & Mission */}
            <section className="py-16 md:py-20">
                <div className="container-std">
                    <div className="grid md:grid-cols-2 gap-8">
                        {/* Vision */}
                        <div className="group relative overflow-hidden rounded-3xl bg-gradient-to-br from-emerald-500 to-emerald-600 p-8 md:p-10 text-white hover:shadow-2xl transition-all duration-300">
                            <div className="absolute top-0 right-0 w-40 h-40 bg-white/10 rounded-full -mr-20 -mt-20"></div>
                            <div className="absolute bottom-0 left-0 w-32 h-32 bg-white/10 rounded-full -ml-16 -mb-16"></div>
                            <div className="relative space-y-4">
                                <div className="w-16 h-16 rounded-2xl bg-white/20 backdrop-blur-sm flex items-center justify-center">
                                    <svg className="w-9 h-9 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                                    </svg>
                                </div>
                                <h3 className="text-2xl md:text-3xl font-bold">Tầm nhìn</h3>
                                <p className="text-emerald-50 text-base leading-relaxed">
                                    Trở thành đơn vị bất động sản hàng đầu tại Nhơn Trạch và khu vực Đồng Nai,
                                    góp phần kiến tạo những không gian sống chất lượng cho cộng đồng.
                                </p>
                            </div>
                        </div>

                        {/* Mission */}
                        <div className="group relative overflow-hidden rounded-3xl bg-white border-2 border-emerald-100 p-8 md:p-10 hover:shadow-2xl transition-all duration-300 hover:border-emerald-300">
                            <div className="absolute top-0 right-0 w-40 h-40 bg-emerald-50 rounded-full -mr-20 -mt-20"></div>
                            <div className="absolute bottom-0 left-0 w-32 h-32 bg-emerald-50 rounded-full -ml-16 -mb-16"></div>
                            <div className="relative space-y-4">
                                <div className="w-16 h-16 rounded-2xl bg-gradient-emerald flex items-center justify-center">
                                    <svg className="w-9 h-9 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                                    </svg>
                                </div>
                                <h3 className="text-2xl md:text-3xl font-bold text-gray-900">Sứ mệnh</h3>
                                <p className="text-gray-600 text-base leading-relaxed">
                                    Mang đến cho khách hàng những sản phẩm bất động sản chất lượng,
                                    pháp lý minh bạch cùng dịch vụ tư vấn chuyên nghiệp, tận tâm.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Core Values */}
            <section className="py-16 md:py-20 bg-gradient-to-br from-emerald-50/50 to-white">
                <div className="container-std">
                    <div className="text-center max-w-3xl mx-auto mb-12">
                        <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-gray-900 mb-4">
                            Giá trị <span className="text-gradient-emerald">cốt lõi</span>
                        </h2>
                        <p className="text-gray-600">
                            Những giá trị định hướng mọi hoạt động của Phát Đạt
                        </p>
                    </div>

                    <div className="grid md:grid-cols-3 gap-6">
                        <div className="bg-white rounded-2xl p-6 border border-emerald-100 hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
                            <div className="w-14 h-14 rounded-xl bg-gradient-emerald flex items-center justify-center mb-4">
                                <svg className="w-7 h-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                                </svg>
                            </div>
                            <h4 className="text-xl font-bold text-gray-900 mb-2">Uy tín</h4>
                            <p className="text-gray-600 text-sm leading-relaxed">
                                Cam kết thông tin chính xác, minh bạch trong mọi giao dịch.
                                Uy tín là tài sản quý giá nhất mà chúng tôi luôn gìn giữ.
                            </p>
                        </div>

                        <div className="bg-white rounded-2xl p-6 border border-emerald-100 hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
                            <div className="w-14 h-14 rounded-xl bg-gradient-emerald flex items-center justify-center mb-4">
                                <svg className="w-7 h-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                                </svg>
                            </div>
                            <h4 className="text-xl font-bold text-gray-900 mb-2">Tận tâm</h4>
                            <p className="text-gray-600 text-sm leading-relaxed">
                                Đặt lợi ích khách hàng lên hàng đầu, đồng hành và hỗ trợ trong suốt quá trình giao dịch.
                            </p>
                        </div>

                        <div className="bg-white rounded-2xl p-6 border border-emerald-100 hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
                            <div className="w-14 h-14 rounded-xl bg-gradient-emerald flex items-center justify-center mb-4">
                                <svg className="w-7 h-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
                                </svg>
                            </div>
                            <h4 className="text-xl font-bold text-gray-900 mb-2">Chuyên nghiệp</h4>
                            <p className="text-gray-600 text-sm leading-relaxed">
                                Đội ngũ nhân sự được đào tạo bài bản, quy trình làm việc chuẩn mực và hiệu quả.
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            {/* Services */}
            <section className="py-16 md:py-20">
                <div className="container-std">
                    <div className="text-center max-w-3xl mx-auto mb-12">
                        <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-gray-900 mb-4">
                            Dịch vụ <span className="text-gradient-emerald">của chúng tôi</span>
                        </h2>
                        <p className="text-gray-600">
                            Phát Đạt cung cấp đầy đủ các dịch vụ bất động sản chuyên nghiệp
                        </p>
                    </div>

                    <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                        <div className="text-center p-6">
                            <div className="w-16 h-16 rounded-2xl bg-emerald-100 flex items-center justify-center mx-auto mb-4">
                                <svg className="w-8 h-8 text-emerald-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                                </svg>
                            </div>
                            <h4 className="font-bold text-gray-900 mb-2">Mua bán nhà đất</h4>
                            <p className="text-sm text-gray-600">Tư vấn và hỗ trợ mua bán các loại bất động sản</p>
                        </div>

                        <div className="text-center p-6">
                            <div className="w-16 h-16 rounded-2xl bg-emerald-100 flex items-center justify-center mx-auto mb-4">
                                <svg className="w-8 h-8 text-emerald-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                                </svg>
                            </div>
                            <h4 className="font-bold text-gray-900 mb-2">Tư vấn pháp lý</h4>
                            <p className="text-sm text-gray-600">Kiểm tra và hỗ trợ các thủ tục pháp lý</p>
                        </div>

                        <div className="text-center p-6">
                            <div className="w-16 h-16 rounded-2xl bg-emerald-100 flex items-center justify-center mx-auto mb-4">
                                <svg className="w-8 h-8 text-emerald-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                                </svg>
                            </div>
                            <h4 className="font-bold text-gray-900 mb-2">Định giá BĐS</h4>
                            <p className="text-sm text-gray-600">Định giá chính xác theo thị trường</p>
                        </div>

                        <div className="text-center p-6">
                            <div className="w-16 h-16 rounded-2xl bg-emerald-100 flex items-center justify-center mx-auto mb-4">
                                <svg className="w-8 h-8 text-emerald-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4" />
                                </svg>
                            </div>
                            <h4 className="font-bold text-gray-900 mb-2">Ký gửi BĐS</h4>
                            <p className="text-sm text-gray-600">Dịch vụ ký gửi bán nhanh trong 30 ngày</p>
                        </div>
                    </div>
                </div>
            </section>

            {/* CTA Section */}
            <section className="py-16 md:py-20">
                <div className="container-std">
                    <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-emerald-500 to-emerald-700 p-8 md:p-12 text-center text-white">
                        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiNmZmYiIGZpbGwtb3BhY2l0eT0iMC4wNSI+PHBhdGggZD0iTTM2IDE0YzMuMzEgMCA2IDIuNjkgNiA2cy0yLjY5IDYtNiA2LTYtMi42OS02LTYgMi42OS02IDYtNnpNNiAzNGMzLjMxIDAgNiAyLjY5IDYgNnMtMi42OSA2LTYgNi02LTIuNjktNi02IDIuNjktNiA2LTZ6Ii8+PC9nPjwvZz48L3N2Zz4=')] opacity-30"></div>
                        <div className="relative max-w-2xl mx-auto">
                            <h2 className="text-3xl md:text-4xl font-bold mb-4">
                                Bạn cần tư vấn bất động sản?
                            </h2>
                            <p className="text-emerald-50 text-lg mb-8">
                                Liên hệ ngay với Phát Đạt để được hỗ trợ miễn phí 24/7
                            </p>
                            <div className="flex flex-col sm:flex-row gap-4 justify-center">
                                <Link
                                    href="/lien-he"
                                    className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-xl bg-white text-emerald-600 font-semibold hover:bg-emerald-50 transition-all shadow-lg"
                                >
                                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                                    </svg>
                                    Liên hệ tư vấn
                                </Link>
                                <a
                                    href="tel:0365614778"
                                    className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-xl bg-emerald-600 text-white font-semibold hover:bg-emerald-700 transition-all border-2 border-white/30"
                                >
                                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                                    </svg>
                                    0365 614 778
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </main>
    );
}
