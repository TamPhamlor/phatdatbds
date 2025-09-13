import Image from 'next/image';

export function ProjectAd({
  title,
  location,
  price,
  imageUrl,
}: {
  title: string;
  location: string;
  price: string;
  imageUrl: string;
}) {
  return (
    <div className="rounded-2xl border border-gray-200 bg-white shadow-sm p-4">
      <div className="text-sm font-semibold mb-3">Dự án nổi bật</div>
      
      <div className="relative w-full h-40 rounded-xl overflow-hidden">
        <Image
          src={imageUrl} // URL ảnh từ Unsplash hoặc domain ngoài
          alt={title}
          fill
          className="object-cover"
          unoptimized // bỏ qua tối ưu hóa để dùng domain ngoài mà không cần cấu hình
        />
      </div>
      
      <div className="mt-3 font-semibold">{title}</div>
      <div className="text-sm text-gray-500">{location}</div>
      <div className="mt-2 flex items-center justify-between">
        <div className="text-sm font-bold">
          {price}
          <span className="text-gray-500 font-normal">/month</span>
        </div>
        <a
          href="#"
          className="rounded-full bg-indigo-600 text-white px-3 py-1 text-xs hover:bg-indigo-700"
        >
          Xem chi tiết
        </a>
      </div>
    </div>
  );
}
