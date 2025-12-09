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
  // Start with mounted = false to match SSR
  const [mounted, setMounted] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [state, setState] = useState<FilterState>({
    filterOpen: false, // Start closed to match SSR
    detailOpen: false
  });
  
  const [selectedListing, setSelectedListing] = useState<Listing | null>(null);
  const [mobileFilterOpen, setMobileFilterOpen] = useState(false);
  const [mobileDetailOpen, setMobileDetailOpen] = useState(false);

  // Detect screen size after mount
  useEffect(() => {
    setMounted(true);
    const checkMobile = () => {
      const mobile = window.innerWidth < 1024;
      setIsMobile(mobile);
      // Không auto mở filter nữa
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // Don't render filter until mounted to avoid hydration mismatch
  const showFilter = mounted && !isMobile && state.filterOpen;

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
      <div className="sticky z-40 bg-gradient-to-r from-emerald-50/90 via-white/90 to-emerald-50/90 backdrop-blur-lg border-b border-emerald-100/50 shadow-sm"
        style={{
          top: "var(--header-h)",
          transition: "top 350ms ease",
        }}>
        <div className="container-std h-14 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <button
              onClick={handleToggleFilter}
              className={`inline-flex items-center gap-2 rounded-full px-4 py-2 text-sm font-medium transition-all shadow-sm ${
                state.filterOpen
                  ? 'border border-emerald-200 bg-white/80 backdrop-blur text-gray-700 hover:bg-emerald-50 hover:border-emerald-300'
                  : 'bg-gradient-to-r from-emerald-500 to-emerald-600 text-white animate-pulse-ring shadow-lg shadow-emerald-200/50 hover:from-emerald-600 hover:to-emerald-700'
              }`}
            >
              <svg className={`w-4 h-4 ${state.filterOpen ? 'text-emerald-600' : 'text-white'}`} viewBox="0 0 24 24" fill="currentColor">
                <path d="M3 5h18l-7 8v5l-4 2v-7L3 5z" />
              </svg>
              <span className='md:hidden'>Bộ lọc</span>
              <span className='hidden md:inline'>{state.filterOpen ? 'Ẩn bộ lọc' : 'Hiện bộ lọc'}</span>
            </button>
            
            {/* Result count */}
            <div className="hidden sm:flex items-center gap-2 text-sm">
              <span className="text-gray-600">Hiển thị</span>
              <span className="font-semibold text-emerald-600">{projects.length}</span>
              <span className="text-gray-600">kết quả</span>
              {meta?.total && meta.total > projects.length && (
                <span className="text-gray-500">
                  / {meta.total} tổng
                </span>
              )}
            </div>
          </div>
          
          {/* Mobile result count */}
          <div className="sm:hidden flex items-center gap-1.5 text-xs">
            <span className="font-bold text-emerald-600 text-sm">{projects.length}</span>
            <span className="text-gray-600">bất động sản</span>
          </div>
        </div>
      </div>
      <div className="relative py-4">
        {/* Filter Panel - Fixed positioning */}
        {showFilter && (
          <Suspense fallback={null}>
            <div 
              className="fixed z-50 flex flex-col"
              style={{
                left: 'max(1rem, calc((100vw - 1152px) / 2))', // responsive left position
                top: 'calc(var(--header-h) + 60px)',
                width: '380px',
                height: 'calc(100vh - var(--header-h) - 80px)'
              }}
            >
              {/* Close button at top right */}
              <button
                onClick={handleToggleFilter}
                className="absolute -top-3 -right-3 z-10 w-9 h-9 rounded-full bg-white border-2 border-emerald-500 text-emerald-600 shadow-lg hover:bg-emerald-50 hover:border-emerald-600 hover:scale-110 transition-all flex items-center justify-center"
                aria-label="Đóng bộ lọc"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
              <FilterPanel isOpen={state.filterOpen} meta={meta} />
            </div>
          </Suspense>
        )}

        <div className="container-std">
          <div className="flex items-start gap-4">
            {/* Main content area */}
            <div className="flex-1 min-w-0">
              <PropertyGrid
                listings={projects}
                filterOpen={state.filterOpen}
                detailOpen={state.detailOpen}
                onCardClick={handleCardClick}
              />
            </div>
            
            {/* Detail Panel - sticky sidebar */}
            {state.detailOpen && selectedListing && (
              <div className="hidden lg:block w-[380px] shrink-0">
                <div className="sticky" style={{ top: 'calc(var(--header-h) + 76px)' }}>
                  <DetailPanel
                    listing={selectedListing}
                    isOpen={state.detailOpen}
                    onClose={() => setState((prev) => ({ ...prev, detailOpen: false }))}
                  />
                </div>
              </div>
            )}
          </div>
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