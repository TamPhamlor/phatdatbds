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
    <div className="relative rounded-2xl overflow-hidden bg-gradient-to-br from-emerald-500 via-emerald-600 to-teal-600 p-[2px] shadow-lg shadow-emerald-500/20 hover:shadow-xl hover:shadow-emerald-500/30 transition-all duration-300 hover:-translate-y-0.5">
      <div className="absolute inset-0 bg-gradient-to-br from-emerald-400/20 to-teal-500/20"></div>
      <div className="relative rounded-2xl bg-white/95 backdrop-blur-sm p-4">
        <div className="flex items-center gap-2 mb-3">
          <span className="flex h-2 w-2 relative">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
          </span>
          <span className="text-sm font-semibold bg-gradient-to-r from-emerald-600 to-teal-600 bg-clip-text text-transparent">Dự án nổi bật</span>
        </div>
        
        <div className="relative w-full h-40 rounded-xl overflow-hidden ring-2 ring-emerald-200/50">
          <Image
            src={imageUrl}
            alt={title}
            fill
            className="object-cover transition-transform duration-500 hover:scale-105"
            unoptimized
          />
          <div className="absolute top-2 left-2">
            <span className="px-2 py-1 text-[10px] font-bold bg-gradient-to-r from-emerald-500 to-teal-500 text-white rounded-full shadow-lg">
              HOT 🔥
            </span>
          </div>
        </div>
        
        <div className="mt-3 font-semibold text-gray-900">{title}</div>
        <div className="text-sm text-gray-500">{location}</div>
        <div className="mt-3 flex items-center justify-between">
          <div className="text-sm font-bold text-emerald-600">
            {price}
            <span className="text-gray-500 font-normal">/tháng</span>
          </div>
          <a
            href="#"
            className="rounded-full bg-gradient-to-r from-emerald-500 to-teal-500 text-white px-4 py-1.5 text-xs font-medium hover:shadow-lg hover:shadow-emerald-500/25 transition-all hover:-translate-y-0.5"
          >
            Xem chi tiết
          </a>
        </div>
      </div>
    </div>
  );
}
