import { Listing } from './types';
import PropertyCard from './PropertyCard';
import NoResults from '@/app/components/NoResults';

interface PropertyGridProps {
  listings: Listing[];
  filterOpen: boolean;
  detailOpen: boolean;
  onCardClick: (listing: Listing) => void;
}

export default function PropertyGrid({
  listings,
  filterOpen,
  detailOpen,
  onCardClick,
}: PropertyGridProps) {
  // Số cột tùy theo trạng thái panel (giữ nguyên logic cũ của bạn nếu có)
  let cols = 4;
  if (filterOpen && detailOpen) cols = 2;
  else if (filterOpen || detailOpen) cols = 3;

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
  return (
    <main className="w-full">
      <div
        className={`
          grid gap-4
          ${cols === 4 ? 'grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4' : ''}
          ${cols === 3 ? 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3' : ''}
          ${cols === 2 ? 'grid-cols-1 md:grid-cols-2' : ''}
        `}
      >
        {listings.map((listing) => (
          <PropertyCard key={listing.id} listing={listing} onClick={() => onCardClick(listing)} />
        ))}
      </div>
    </main>
  );
}
