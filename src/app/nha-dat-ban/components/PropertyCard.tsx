import Image from 'next/image';
import { Listing } from './types';

interface PropertyCardProps {
  listing: Listing;
  onClick: () => void;
}

export default function PropertyCard({ listing, onClick }: PropertyCardProps) {
  const coverImage = listing.images.find((img) => img.is_cover)?.url || 'https://images.unsplash.com/photo-1600585154526-990dced4db0d?q=80&w=800';

  return (
    <div
      className="group rounded-2xl overflow-hidden bg-white border border-gray-200 shadow-sm cursor-pointer"
      onClick={onClick}
    >
      <Image
        src={coverImage}
        alt={listing.title}
        width={400} // đặt chiều rộng mong muốn
        height={160} // đặt chiều cao mong muốn
        unoptimized
        className="h-40 w-full object-cover"
      />
      <div className="p-3">
        <div className="text-xs text-indigo-600 font-medium">Home</div>
        <div className="font-semibold text-gray-900 line-clamp-2">{listing.title}</div>
        <div className="text-sm text-gray-500 flex items-center gap-1">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-4 w-4 text-indigo-400"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M12 11.5a2.5 2.5 0 1 0 0-5 2.5 2.5 0 0 0 0 5zm0 8.5c-4.418 0-8-4.03-8-9a8 8 0 1 1 16 0c0 4.97-3.582 9-8 9z"
            />
          </svg>
          {listing.address}
        </div>
        <div className="text-sm text-gray-500 line-clamp-2">{listing.description}</div>
        <div className="mt-2 flex items-center justify-between">
          <div className="text-sm font-semibold">
            {listing.price_total_text}
            <span className="text-gray-500 font-normal">/month</span>
          </div>
          <div className="text-xs text-amber-500">★ 4.9/5</div>
        </div>
      </div>
    </div>
  );
}