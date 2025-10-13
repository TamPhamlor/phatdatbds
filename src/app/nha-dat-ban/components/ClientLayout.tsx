'use client';

import { Suspense, useEffect, useState } from 'react';
import { Listing, FilterState } from './types';
import PropertyGrid from './PropertyGrid';
import DetailPanel from './DetailPanel';
import MobileFilterDrawer from './MobileFilterDrawer';
import MobileDetailDrawer from './MobileDetailDrawer';
import FilterPanel from './FilterPanel';
import { MetaListing } from '@/app/types/products';

interface ClientLayoutProps {
  projects: Listing[];
  meta?: MetaListing | null;
}

export default function ClientLayout({ projects, meta }: ClientLayoutProps) {
  const [state, setState] = useState<FilterState>({ filterOpen: true, detailOpen: false });
  const [selectedListing, setSelectedListing] = useState<Listing | null>(null);
  const [mobileFilterOpen, setMobileFilterOpen] = useState(false);
  const [mobileDetailOpen, setMobileDetailOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 1024);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const handleToggleFilter = () => {
    if (typeof window !== 'undefined' && window.innerWidth < 1024) {
      setMobileFilterOpen(!mobileFilterOpen);
    } else {
      setState((prev) => ({ ...prev, filterOpen: !prev.filterOpen }));
    }
  };

  const handleCardClick = (listing: Listing) => {
    setSelectedListing(listing);
    if (typeof window !== 'undefined' && window.innerWidth < 1024) {
      setMobileDetailOpen(true);
    } else {
      setState((prev) => ({ ...prev, detailOpen: true }));
    }
  };

  const closeMobileFilter = () => setMobileFilterOpen(false);
  const closeMobileDetail = () => setMobileDetailOpen(false);

  return (
    <>
      <div className="sticky z-40 bg-white/80 backdrop-blur border-b"
        style={{
          top: "var(--header-h)",          // né đúng theo trạng thái header
          transition: "top 350ms ease",    // 👈 animate khi header ẩn/hiện
        }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-14 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <button
              onClick={handleToggleFilter}
              className="inline-flex items-center gap-2 rounded-full border border-gray-200 bg-white px-4 py-2 text-sm text-gray-700 hover:bg-gray-50"
            >
              <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
                <path d="M3 5h18l-7 8v5l-4 2v-7L3 5z" />
              </svg>
              <span className='md:hidden'>Hiện bộ lọc</span>
              <span className='hidden md:inline'>{state.filterOpen ? 'Ẩn bộ lọc' : 'Hiện bộ lọc'}</span>
            </button>
          </div>
        </div>
      </div>
      <div className="relative max-w-7xl mx-auto px-2 sm:px-6 lg:px-8 py-4">
        <div className="flex items-start gap-4">
          {!isMobile &&
            <Suspense fallback={null}>
              <FilterPanel isOpen={state.filterOpen} meta={meta} />
            </Suspense>
          }
          <PropertyGrid
            listings={projects}
            filterOpen={state.filterOpen}
            detailOpen={state.detailOpen}
            onCardClick={handleCardClick}
          />
          <DetailPanel
            listing={selectedListing}
            isOpen={state.detailOpen}
            onClose={() => setState((prev) => ({ ...prev, detailOpen: false }))}
          />

        </div>
      </div>
      <MobileFilterDrawer isOpen={mobileFilterOpen} onClose={closeMobileFilter} meta={meta} />
      <MobileDetailDrawer
        isOpen={mobileDetailOpen}
        onClose={closeMobileDetail}
        listing={selectedListing}
      />
    </>
  );
}