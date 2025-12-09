import { Listing } from './types';
import PropertyCard from './PropertyCard';
import NoResults from '@/app/components/NoResults';

interface PropertyGridProps {
  listings: Listing[];
  detailOpen: boolean;
  onCardClick: (listing: Listing) => void;
}

export default function PropertyGrid({
  listings,
  detailOpen,
  onCardClick,
}: PropertyGridProps) {
  const handleClearFilters = () => {
    // Xóa toàn bộ query string filter đang có và reload
    const url = new URL(window.location.href);
    url.search = '';
    window.history.replaceState({}, '', url.toString());
    window.location.reload();
  };

  // ======= HIỂN THỊ KHÔNG CÓ KẾT QUẢ =======
  if (!listings || listings.length === 0) {
    return (
      <main className="w-full">
        <div className="w-full">
          <NoResults
            title="Không có bất động sản phù hợp"
            description="Hãy thử nới lỏng hoặc xoá bớt bộ lọc để xem thêm kết quả."
            actionText="Xoá bộ lọc"
            onAction={handleClearFilters}
          />
        </div>
      </main>
    );
  }

  // ======= DANH SÁCH BÌNH THƯỜNG =======
  // Grid responsive: giảm số cột khi detail panel mở
  const gridCols = detailOpen 
    ? "grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3"
    : "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4";

  return (
    <main className="w-full">
      <div className={`grid gap-4 ${gridCols}`}>
        {listings.map((listing) => (
          <PropertyCard key={listing.id} listing={listing} onClick={() => onCardClick(listing)} />
        ))}
      </div>
    </main>
  );
}
