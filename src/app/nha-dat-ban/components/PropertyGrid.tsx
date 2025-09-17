"use client"
import { Listing } from './types';
import PropertyCard from './PropertyCard';

interface PropertyGridProps {
  listings: Listing[];
  filterOpen: boolean;
  detailOpen: boolean;
  onCardClick: (listing: Listing) => void;
}

export default function PropertyGrid({ listings, filterOpen, detailOpen, onCardClick }: PropertyGridProps) {
  let cols = 4;

  if (filterOpen && detailOpen) {
    cols = 2;
  } else if (detailOpen || filterOpen) {
    cols = 3;
  } else {
    cols = 4;
  }

  return (
    <main className="flex-1">
      <div
        className={`grid gap-4 transition-[grid-template-columns] duration-300 
        ${cols === 2 ? "grid-cols-1 sm:grid-cols-2" : ""}
        ${cols === 3 ? "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3" : ""}
        ${cols === 4 ? "grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4" : ""}`}
      >
        {listings.map((listing) => (
          <PropertyCard
            key={listing.slug}
            listing={listing}
            onClick={() => onCardClick(listing)}
          />
        ))}
      </div>
    </main>
  );
}
