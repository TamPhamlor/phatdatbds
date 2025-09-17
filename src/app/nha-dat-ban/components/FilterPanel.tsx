'use client';

import { LegalStatus, MetaListing, Ward } from '@/app/types/products';
import { useState, useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { Listing, Filters } from './types';

interface FilterPanelProps {
  isOpen: boolean;
  detailOpen?: boolean;
  meta?: MetaListing | null;
  listings?: Listing[];
  onFilter?: (filters: Filters) => void;
}

export default function FilterPanel({ isOpen, detailOpen = false, meta, onFilter }: FilterPanelProps) {
  const router = useRouter();
  const searchParams = useSearchParams();

  const [filters, setFilters] = useState<Filters>({});
  const [tempPriceRange, setTempPriceRange] = useState<[number, number]>([1000000, 10000000000]);

  useEffect(() => {
    const newFilters: Filters = {
      price_total_min: searchParams.get('price_total_min') ? parseInt(searchParams.get('price_total_min')!) : undefined,
      price_total_max: searchParams.get('price_total_max') ? parseInt(searchParams.get('price_total_max')!) : undefined,
      area_land_min: searchParams.get('area_land_min') ? parseInt(searchParams.get('area_land_min')!) : undefined,
      area_land_max: searchParams.get('area_land_max') ? parseInt(searchParams.get('area_land_max')!) : undefined,
      bedrooms: searchParams.get('bedrooms') ? parseInt(searchParams.get('bedrooms')!) : undefined,
      bathrooms: searchParams.get('bathrooms') ? parseInt(searchParams.get('bathrooms')!) : undefined,
      floors: searchParams.get('floors') ? parseInt(searchParams.get('floors')!) : undefined,
      direction: searchParams.get('direction') || undefined,
      amenities: searchParams.get('amenities')?.split(',') || undefined,
      property_type_id: searchParams.get('property_type_id') ? parseInt(searchParams.get('property_type_id')!) : undefined,
      province_id: searchParams.get('province_id') ? parseInt(searchParams.get('province_id')!) : undefined,
      ward_id: searchParams.get('ward_id') ? parseInt(searchParams.get('ward_id')!) : undefined,
      legal_status_id: searchParams.get('legal_status_id') ? parseInt(searchParams.get('legal_status_id')!) : undefined,
    };
    setFilters(newFilters);
    setTempPriceRange([
      newFilters.price_total_min || 1000000,
      newFilters.price_total_max || 10000000000,
    ]);
  }, [searchParams]);

  const priceRanges: { label: string; min: number; max: number }[] = [
    { label: '100 – 10 triệu', min: 100, max: 10000000 },
    { label: '10 triệu – 100 triệu', min: 10000000, max: 100000000 },
    { label: '100 triệu – 1 tỷ', min: 100000000, max: 1000000000 },
    { label: '1 tỷ – 10 tỷ', min: 1000000000, max: 10000000000 },
    { label: '10 tỷ trở lên', min: 10000000000, max: Number.MAX_SAFE_INTEGER },
  ];

  const handleFilterChange = <K extends keyof Filters>(key: K, value: Filters[K]) => {
    setFilters((prev) => ({
      ...prev,
      [key]: value,
    }));
  };

  const applyFilter = () => {
    const updatedFilters: Filters = {
      ...filters,
      price_total_min: tempPriceRange[0],
      price_total_max: tempPriceRange[1],
    };

    const params = new URLSearchParams();
    Object.entries(updatedFilters).forEach(([key, value]) => {
      if (value !== undefined) {
        params.set(key, Array.isArray(value) ? value.join(',') : value.toString());
      }
    });

    router.push(`?${params.toString()}`);
    setFilters(updatedFilters);
    onFilter?.(updatedFilters);
  };

  const handleRadioSelect = (min: number, max: number) => {
    setTempPriceRange([min, max]);
  };

  return (
    <aside
      className={`
        w-80 shrink-0
        transition-all duration-300
        ${isOpen ? 'ml-0 opacity-100 pointer-events-auto' : '-ml-80 opacity-0 pointer-events-none'}
      `}
      style={{ willChange: 'margin-left, opacity' }}
    >
      <div className="rounded-2xl border border-gray-200 bg-white shadow-sm p-4">
        <div className="mb-3 font-semibold text-gray-900">Bộ lọc khách hàng</div>

        {/* Giá bất động sản */}
        <details open={detailOpen} className="group rounded-xl border border-gray-200 p-3 mb-3">
          <summary className="flex cursor-pointer list-none items-center justify-between text-sm font-medium text-gray-800">
            Giá bất động sản
          </summary>
          <div className="mt-3 space-y-2 text-sm">
            {priceRanges.map((range, index) => (
              <label key={`price-range-${index}`} className="flex items-center gap-2">
                <input
                  type="radio"
                  name="price_range"
                  className="radio-custom"
                  checked={tempPriceRange[0] === range.min && tempPriceRange[1] === range.max}
                  onChange={() => handleRadioSelect(range.min, range.max)}
                />
                {range.label}
              </label>
            ))}
            <div className="mt-3">
              <div className="flex justify-between text-gray-600 mb-1 text-sm">
                <span>
                  {tempPriceRange[0] >= 1000000000
                    ? `${(tempPriceRange[0] / 1000000000).toFixed(1)} tỷ`
                    : `${Math.round(tempPriceRange[0] / 1000000)} triệu`}
                </span>
                <span>
                  {tempPriceRange[1] >= 10000000000
                    ? `${(tempPriceRange[1] / 1000000000).toFixed(1)} tỷ`
                    : `${Math.round(tempPriceRange[1] / 1000000)} triệu`}
                </span>
              </div>
              <input
                type="range"
                min={1000000}
                max={100000000000}
                step={50000000}
                value={tempPriceRange[0]}
                onChange={(e) => setTempPriceRange([+e.target.value, tempPriceRange[1]])}
                className="w-full accent-indigo-600"
              />
              <input
                type="range"
                min={100000000}
                max={100000000000}
                step={50000000}
                value={tempPriceRange[1]}
                onChange={(e) => setTempPriceRange([tempPriceRange[0], +e.target.value])}
                className="w-full accent-indigo-600"
              />
            </div>
            <button
              className="mt-2 w-full bg-indigo-600 text-white rounded-xl py-2 text-sm font-medium hover:bg-indigo-700"
              onClick={applyFilter}
            >
              Áp dụng lọc
            </button>
          </div>
        </details>

        {/* Diện tích */}
        <details open={detailOpen} className="group rounded-xl border border-gray-200 p-3 mb-3">
          <summary className="flex cursor-pointer list-none items-center justify-between text-sm font-medium text-gray-800">
            Diện tích
          </summary>
          <div className="mt-3 space-y-2 text-sm">
            <input
              type="number"
              placeholder="Diện tích tối thiểu (m²)"
              value={filters.area_land_min ?? ''}
              onChange={(e) => handleFilterChange('area_land_min', e.target.value ? parseInt(e.target.value) : undefined)}
              className="w-full border-gray-300 rounded-md p-2"
            />
            <input
              type="number"
              placeholder="Diện tích tối đa (m²)"
              value={filters.area_land_max ?? ''}
              onChange={(e) => handleFilterChange('area_land_max', e.target.value ? parseInt(e.target.value) : undefined)}
              className="w-full border-gray-300 rounded-md p-2"
            />
          </div>
        </details>

        {/* Số phòng ngủ */}
        <details open={detailOpen} className="group rounded-xl border border-gray-200 p-3 mb-3">
          <summary className="flex cursor-pointer list-none items-center justify-between text-sm font-medium text-gray-800">
            Số phòng ngủ
          </summary>
          <div className="mt-3 space-y-2 text-sm">
            {[1, 2, 3, 4, 5,].map((num) => (
              <label key={`bedrooms-${num}`} className="flex items-center gap-2">
                <input
                  type="radio"
                  name="bedrooms_filter"
                  className="radio-custom"
                  checked={filters.bedrooms === num}
                  onChange={() => handleFilterChange('bedrooms', num)}
                />
                {num} phòng
              </label>
            ))}
            <label key="bedrooms-any" className="flex items-center gap-2">
              <input
                type="radio"
                name="bedrooms_filter"
                className="radio-custom"
                checked={filters.bedrooms === undefined}
                onChange={() => handleFilterChange('bedrooms', undefined)}
              />
              Bất kỳ
            </label>
          </div>
        </details>

        {/* Số phòng tắm */}
        <details open={detailOpen} className="group rounded-xl border border-gray-200 p-3 mb-3">
          <summary className="flex cursor-pointer list-none items-center justify-between text-sm font-medium text-gray-800">
            Số phòng tắm
          </summary>
          <div className="mt-3 space-y-2 text-sm">
            {[1, 2, 3, 4].map((num) => (
              <label key={`bathrooms-${num}`} className="flex items-center gap-2">
                <input
                  type="radio"
                  name="bathrooms_filter"
                  className="radio-custom"
                  checked={filters.bathrooms === num}
                  onChange={() => handleFilterChange('bathrooms', num)}
                />
                {num} phòng
              </label>
            ))}
            <label key="bathrooms-any" className="flex items-center gap-2">
              <input
                type="radio"
                name="bathrooms_filter"
                className="radio-custom"
                checked={filters.bathrooms === undefined}
                onChange={() => handleFilterChange('bathrooms', undefined)}
              />
              Bất kỳ
            </label>
          </div>
        </details>

        {/* Số tầng */}
        <details open={detailOpen} className="group rounded-xl border border-gray-200 p-3 mb-3">
          <summary className="flex cursor-pointer list-none items-center justify-between text-sm font-medium text-gray-800">
            Số tầng
          </summary>
          <div className="mt-3 space-y-2 text-sm">
            {[1, 2, 3, 4, 5].map((num) => (
              <label key={`floors-${num}`} className="flex items-center gap-2">
                <input
                  type="radio"
                  name="floors_filter"
                  className="radio-custom"
                  checked={filters.floors === num}
                  onChange={() => handleFilterChange('floors', num)}
                />
                {num} tầng
              </label>
            ))}
            <label key="floors-any" className="flex items-center gap-2">
              <input
                type="radio"
                name="floors_filter"
                className="radio-custom"
                checked={filters.floors === undefined}
                onChange={() => handleFilterChange('floors', undefined)}
              />
              Bất kỳ
            </label>
          </div>
        </details>

        {/* Hướng nhà */}
        <details open={detailOpen} className="group rounded-xl border border-gray-200 p-3 mb-3">
          <summary className="flex cursor-pointer list-none items-center justify-between text-sm font-medium text-gray-800">
            Hướng nhà
          </summary>
          <div className="mt-3 space-y-2 text-sm">
            {['Đông', 'Tây', 'Nam', 'Bắc', 'Đông Bắc', 'Đông Nam', 'Tây Nam', 'Tây Bắc'].map((direction) => (
              <label key={`direction-${direction}`} className="flex items-center gap-2">
                <input
                  type="radio"
                  name="direction_filter"
                  className="radio-custom"
                  checked={filters.direction === direction}
                  onChange={() => handleFilterChange('direction', direction)}
                />
                {direction}
              </label>
            ))}
            <label key="direction-any" className="flex items-center gap-2">
              <input
                type="radio"
                name="direction_filter"
                className="radio-custom"
                checked={filters.direction === undefined}
                onChange={() => handleFilterChange('direction', undefined)}
              />
              Bất kỳ
            </label>
          </div>
        </details>

        {/* Loại bất động sản */}
        <details open={detailOpen} className="group rounded-xl border border-gray-200 p-3 mb-3">
          <summary className="flex cursor-pointer list-none items-center justify-between text-sm font-medium text-gray-800">
            Loại bất động sản
          </summary>
          <div className="mt-3 space-y-2 text-sm">
            {meta?.property_types
              ? Object.values(meta.property_types).map((pt) => (
                  <label key={`property-type-${pt.id}`} className="flex items-center gap-2">
                    <input
                      type="radio"
                      name="property_type_filter"
                      className="radio-custom"
                      checked={filters.property_type_id === pt.id}
                      onChange={() => handleFilterChange('property_type_id', pt.id)}
                    />
                    {pt.name}
                  </label>
                ))
              : (
                <>
                  <label key="property-type-1" className="flex items-center gap-2">
                    <input
                      type="radio"
                      name="property_type_filter"
                      className="radio-custom"
                      checked={filters.property_type_id === 1}
                      onChange={() => handleFilterChange('property_type_id', 1)}
                    />
                    Căn hộ
                  </label>
                  <label key="property-type-2" className="flex items-center gap-2">
                    <input
                      type="radio"
                      name="property_type_filter"
                      className="radio-custom"
                      checked={filters.property_type_id === 2}
                      onChange={() => handleFilterChange('property_type_id', 2)}
                    />
                    Nhà đơn lập
                  </label>
                  <label key="property-type-3" className="flex items-center gap-2">
                    <input
                      type="radio"
                      name="property_type_filter"
                      className="radio-custom"
                      checked={filters.property_type_id === 3}
                      onChange={() => handleFilterChange('property_type_id', 3)}
                    />
                    Nhà trệt
                  </label>
                  <label key="property-type-4" className="flex items-center gap-2">
                    <input
                      type="radio"
                      name="property_type_filter"
                      className="radio-custom"
                      checked={filters.property_type_id === 4}
                      onChange={() => handleFilterChange('property_type_id', 4)}
                    />
                    Chung cư / Nhà phố
                  </label>
                  <label key="property-type-any" className="flex items-center gap-2">
                    <input
                      type="radio"
                      name="property_type_filter"
                      className="radio-custom"
                      checked={filters.property_type_id === undefined}
                      onChange={() => handleFilterChange('property_type_id', undefined)}
                    />
                    Bất kỳ
                  </label>
                </>
              )}
          </div>
        </details>

        {/* Tỉnh / Thành phố */}
        <details open={detailOpen} className="group rounded-xl border border-gray-200 p-3 mb-3">
          <summary className="flex cursor-pointer list-none items-center justify-between text-sm font-medium text-gray-800">
            Tỉnh / Thành phố
          </summary>
          <div className="mt-3 space-y-2 text-sm">
            {meta?.provinces?.map((province) => (
              <label key={`province-${province.code}`} className="flex items-center gap-2">
                <input
                  type="radio"
                  name="province_filter"
                  className="radio-custom"
                  checked={filters.province_id === parseInt(province.code)}
                  onChange={() => handleFilterChange('province_id', parseInt(province.code))}
                />
                {province.name}
              </label>
            )) || <div>Chưa có dữ liệu</div>}
            <label key="province-any" className="flex items-center gap-2">
              <input
                type="radio"
                name="province_filter"
                className="radio-custom"
                checked={filters.province_id === undefined}
                onChange={() => handleFilterChange('province_id', undefined)}
              />
              Bất kỳ
            </label>
          </div>
        </details>

        {/* Phường / Xã */}
        <details open={detailOpen} className="group rounded-xl border border-gray-200 p-3 mb-3">
          <summary className="flex cursor-pointer list-none items-center justify-between text-sm font-medium text-gray-800">
            Phường / Xã
          </summary>
          <div className="mt-3 space-y-2 text-sm">
            {filters.province_id
              ? (meta?.wards?.[filters.province_id] || []).map((ward: Ward) => (
                  <label key={`ward-${ward.code}`} className="flex items-center gap-2">
                    <input
                      type="radio"
                      name="ward_filter"
                      className="radio-custom"
                      checked={filters.ward_id === parseInt(ward.code)}
                      onChange={() => handleFilterChange('ward_id', parseInt(ward.code))}
                    />
                    {ward.name}
                  </label>
                ))
              : <div>Chọn tỉnh/thành phố trước</div>}
            <label key="ward-any" className="flex items-center gap-2">
              <input
                type="radio"
                name="ward_filter"
                className="radio-custom"
                checked={filters.ward_id === undefined}
                onChange={() => handleFilterChange('ward_id', undefined)}
              />
              Bất kỳ
            </label>
          </div>
        </details>

        {/* Tình trạng pháp lý */}
        <details open={detailOpen} className="group rounded-xl border border-gray-200 p-3 mb-3">
          <summary className="flex cursor-pointer list-none items-center justify-between text-sm font-medium text-gray-800">
            Tình trạng pháp lý
          </summary>
          <div className="mt-3 space-y-2 text-sm">
            {meta?.legal_statuses
              ? Object.values(meta.legal_statuses).map((ls: LegalStatus) => (
                  <label key={`legal-status-${ls.id}`} className="flex items-center gap-2">
                    <input
                      type="radio"
                      name="legal_status_filter"
                      className="radio-custom"
                      checked={filters.legal_status_id === ls.id}
                      onChange={() => handleFilterChange('legal_status_id', ls.id)}
                    />
                    {ls.name}
                  </label>
                ))
              : (
                <>
                  <label key="legal-status-1" className="flex items-center gap-2">
                    <input
                      type="radio"
                      name="legal_status_filter"
                      className="radio-custom"
                      checked={filters.legal_status_id === 1}
                      onChange={() => handleFilterChange('legal_status_id', 1)}
                    />
                    Sổ đỏ
                  </label>
                  <label key="legal-status-2" className="flex items-center gap-2">
                    <input
                      type="radio"
                      name="legal_status_filter"
                      className="radio-custom"
                      checked={filters.legal_status_id === 2}
                      onChange={() => handleFilterChange('legal_status_id', 2)}
                    />
                    Hợp đồng mua bán
                  </label>
                  <label key="legal-status-any" className="flex items-center gap-2">
                    <input
                      type="radio"
                      name="legal_status_filter"
                      className="radio-custom"
                      checked={filters.legal_status_id === undefined}
                      onChange={() => handleFilterChange('legal_status_id', undefined)}
                    />
                    Bất kỳ
                  </label>
                </>
              )}
          </div>
        </details>

        {/* Tiện ích */}
        <details open={detailOpen} className="group rounded-xl border border-gray-200 p-3 mb-3">
          <summary className="flex cursor-pointer list-none items-center justify-between text-sm font-medium text-gray-800">
            Tiện ích
          </summary>
          <div className="mt-3 space-y-2 text-sm">
            {meta?.amenities?.map((amenity) => (
              <label key={`amenity-${amenity.id}`} className="flex items-center gap-2">
                <input
                  type="checkbox"
                  name={`amenity_filter_${amenity.id}`}
                  className="radio-custom"
                  checked={filters.amenities?.includes(amenity.id.toString()) ?? false}
                  onChange={() => {
                    const newAmenities = filters.amenities?.includes(amenity.id.toString())
                      ? filters.amenities.filter((id) => id !== amenity.id.toString())
                      : [...(filters.amenities ?? []), amenity.id.toString()];
                    handleFilterChange('amenities', newAmenities.length ? newAmenities : undefined);
                  }}
                />
                {amenity.name}
              </label>
            )) || (
              <>
                <label key="amenity-14" className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    name="amenity_filter_14"
                    className="radio-custom"
                    checked={filters.amenities?.includes('14') ?? false}
                    onChange={() => {
                      const newAmenities = filters.amenities?.includes('14')
                        ? filters.amenities.filter((id) => id !== '14')
                        : [...(filters.amenities ?? []), '14'];
                      handleFilterChange('amenities', newAmenities.length ? newAmenities : undefined);
                    }}
                  />
                  Hồ bơi
                </label>
                <label key="amenity-8" className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    name="amenity_filter_8"
                    className="radio-custom"
                    checked={filters.amenities?.includes('8') ?? false}
                    onChange={() => {
                      const newAmenities = filters.amenities?.includes('8')
                        ? filters.amenities.filter((id) => id !== '8')
                        : [...(filters.amenities ?? []), '8'];
                      handleFilterChange('amenities', newAmenities.length ? newAmenities : undefined);
                    }}
                  />
                  Máy lạnh
                </label>
                <label key="amenity-1" className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    name="amenity_filter_1"
                    className="radio-custom"
                    checked={filters.amenities?.includes('1') ?? false}
                    onChange={() => {
                      const newAmenities = filters.amenities?.includes('1')
                        ? filters.amenities.filter((id) => id !== '1')
                        : [...(filters.amenities ?? []), '1'];
                      handleFilterChange('amenities', newAmenities.length ? newAmenities : undefined);
                    }}
                  />
                  Chỗ để xe hơi
                </label>
              </>
            )}
          </div>
        </details>

        {/* Reset Button */}
        <button
          className="mt-2 w-full bg-gray-600 text-white rounded-xl py-2 text-sm font-medium hover:bg-gray-700"
          onClick={() => {
            setFilters({});
            setTempPriceRange([1000000, 10000000000]);
            router.push('/nha-dat-ban');
            onFilter?.({});
          }}
        >
          Xóa bộ lọc
        </button>
      </div>
    </aside>
  );
}