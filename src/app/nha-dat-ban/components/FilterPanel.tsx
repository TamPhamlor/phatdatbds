'use client';

import { MetaListing } from '@/app/types/products';
import { useState, useEffect, JSX } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { Listing, Filters } from './types';
import Dropdown from '@/app/components/Dropdown';


interface FilterPanelProps {
  isOpen: boolean;
  detailOpen?: boolean;
  meta?: MetaListing | null;
  listings?: Listing[];
  onFilter?: (filters: Filters) => void;
}

/** ---- ICONS (inline SVG, không cần lib) ---- */
const Icon = {
  Chevron: (props: React.SVGProps<SVGSVGElement>) => (
    <svg viewBox="0 0 20 20" fill="currentColor" aria-hidden="true" {...props}>
      <path fillRule="evenodd" d="M5.23 7.21a.75.75 0 011.06.02L10 10.17l3.71-2.94a.75.75 0 111.04 1.08l-4.24 3.36a.75.75 0 01-.94 0L5.21 8.31a.75.75 0 01.02-1.1z" clipRule="evenodd" />
    </svg>
  ),
  Location: (props: React.SVGProps<SVGSVGElement>) => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" {...props}>
      <path strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" d="M12 21s7-5.373 7-11a7 7 0 10-14 0c0 5.627 7 11 7 11z" /><circle cx="12" cy="10" r="2.5" strokeWidth="1.8" />
    </svg>
  ),
  Price: (props: React.SVGProps<SVGSVGElement>) => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" {...props}>
      <path strokeWidth="1.8" strokeLinecap="round" d="M4 7h9a4 4 0 014 4v0a4 4 0 01-4 4H8" /><path strokeWidth="1.8" strokeLinecap="round" d="M8 3v18" />
    </svg>
  ),
  Area: (props: React.SVGProps<SVGSVGElement>) => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" {...props}>
      <rect x="4" y="6" width="16" height="12" rx="2" strokeWidth="1.8" />
      <path strokeWidth="1.8" strokeLinecap="round" d="M8 6v12M4 10h16" />
    </svg>
  ),
  Bed: (props: React.SVGProps<SVGSVGElement>) => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" {...props}>
      <path strokeWidth="1.8" d="M3 17V8a1 1 0 011-1h6a3 3 0 013 3v7M3 13h18v4M6 10h4" />
    </svg>
  ),
  Bath: (props: React.SVGProps<SVGSVGElement>) => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" {...props}>
      <path strokeWidth="1.8" d="M5 11V7a3 3 0 016 0v4M3 13h18l-1 5a3 3 0 01-3 3H7a3 3 0 01-3-3l-1-5z" />
    </svg>
  ),
  Floors: (props: React.SVGProps<SVGSVGElement>) => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" {...props}>
      <path strokeWidth="1.8" d="M6 20h12M6 16h12M6 12h12M6 8h12M6 4h12" />
    </svg>
  ),
  Compass: (props: React.SVGProps<SVGSVGElement>) => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" {...props}>
      <circle cx="12" cy="12" r="9" strokeWidth="1.8" />
      <path strokeWidth="1.8" d="M14 10l-4 4 1-5 5-1z" />
    </svg>
  ),
  Home: (props: React.SVGProps<SVGSVGElement>) => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" {...props}>
      <path strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" d="M3 11l9-7 9 7v8a2 2 0 01-2 2h-4a2 2 0 01-2-2v-3H9v3a2 2 0 01-2 2H5a2 2 0 01-2-2v-8z" />
    </svg>
  ),
  Legal: (props: React.SVGProps<SVGSVGElement>) => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" {...props}>
      <path strokeWidth="1.8" d="M6 4h9l3 3v13H6z" /><path strokeWidth="1.8" d="M9 12h6M9 16h6M9 8h3" />
    </svg>
  ),
  Amenities: (props: React.SVGProps<SVGSVGElement>) => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" {...props}>
      <path strokeWidth="1.8" strokeLinecap="round" d="M5 12l2-2m-2 2l2 2M12 5l2-2m-2 2l2 2M17 17l2-2m-2 2l2 2" />
      <circle cx="12" cy="12" r="3" strokeWidth="1.8" />
    </svg>
  ),
};

export default function FilterPanel({ isOpen, detailOpen = false, meta, onFilter }: FilterPanelProps) {
  const router = useRouter();
  const searchParams = useSearchParams();

  const [filters, setFilters] = useState<Filters>({});
  const [tempPriceRange, setTempPriceRange] = useState<[number, number]>([1_000_000, 10_000_000_000]);

  const buildQueryFromFilters = (f: Filters) => {
    const params = new URLSearchParams();
    Object.entries(f).forEach(([key, value]) => {
      if (value !== undefined) {
        params.set(key, Array.isArray(value) ? value.join(',') : value.toString());
      }
    });
    return `?${params.toString()}`;
  };
  const pushFilters = (f: Filters) => { router.push(buildQueryFromFilters(f)); setFilters(f); onFilter?.(f); };

  // Clear per-section
  const clearLocation = () => pushFilters({ ...filters, province_id: undefined, ward_id: undefined });
  const clearPrice = () => { setTempPriceRange([1_000_000, 10_000_000_000]); pushFilters({ ...filters, price_total_min: undefined, price_total_max: undefined }); };
  const clearArea = () => pushFilters({ ...filters, area_land_min: undefined, area_land_max: undefined });
  const clearBedrooms = () => pushFilters({ ...filters, bedrooms: undefined });
  const clearBathrooms = () => pushFilters({ ...filters, bathrooms: undefined });
  const clearFloors = () => pushFilters({ ...filters, floors: undefined });
  const clearDirection = () => pushFilters({ ...filters, direction: undefined });
  const clearPropertyType = () => pushFilters({ ...filters, property_type_id: undefined });
  const clearLegal = () => pushFilters({ ...filters, legal_status_id: undefined });
  const clearAmenities = () => pushFilters({ ...filters, amenities: undefined });

  // Apply per-section
  const applyLocation = () => pushFilters({ ...filters });
  const applyPrice = () => pushFilters({ ...filters, price_total_min: tempPriceRange[0], price_total_max: tempPriceRange[1] });
  const applyArea = () => pushFilters({ ...filters });
  const applyBedrooms = () => pushFilters({ ...filters });
  const applyBathrooms = () => pushFilters({ ...filters });
  const applyFloors = () => pushFilters({ ...filters });
  const applyDirection = () => pushFilters({ ...filters });
  const applyPropertyType = () => pushFilters({ ...filters });
  const applyLegal = () => pushFilters({ ...filters });
  const applyAmenities = () => pushFilters({ ...filters });

  // Sync từ URL → state
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

      // GIỮ number như hiện tại
      province_id: searchParams.get('province_id') ? parseInt(searchParams.get('province_id')!) : undefined,
      ward_id: searchParams.get('ward_id') ? parseInt(searchParams.get('ward_id')!) : undefined,

      legal_status_id: searchParams.get('legal_status_id') ? parseInt(searchParams.get('legal_status_id')!) : undefined,
    };
    setFilters(newFilters);
    setTempPriceRange([
      newFilters.price_total_min ?? 1_000_000,
      newFilters.price_total_max ?? 10_000_000_000,
    ]);
  }, [searchParams]);

  const priceRanges = [
    { label: '100 – 10 triệu', min: 100, max: 10_000_000 },
    { label: '10 triệu – 100 triệu', min: 10_000_000, max: 100_000_000 },
    { label: '100 triệu – 1 tỷ', min: 100_000_000, max: 1_000_000_000 },
    { label: '1 tỷ – 10 tỷ', min: 1_000_000_000, max: 10_000_000_000 },
    { label: '10 tỷ trở lên', min: 10_000_000_000, max: Number.MAX_SAFE_INTEGER },
  ] as const;

  const handleFilterChange = <K extends keyof Filters>(key: K, value: Filters[K]) =>
    setFilters((prev) => ({ ...prev, [key]: value }));
  const handleRadioSelect = (min: number, max: number) => setTempPriceRange([min, max]);

  const BodyButtons = ({ onClear, onApply }: { onClear: () => void; onApply: () => void }) => (
    <div className="grid grid-cols-2 gap-2 mt-3">
      <button type="button" onClick={onClear}
        className="w-full rounded-lg border border-gray-300 bg-white px-3 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50">
        Xoá
      </button>
      <button type="button" onClick={onApply}
        className="w-full rounded-lg bg-indigo-600 px-3 py-2 text-sm font-semibold text-white hover:bg-indigo-700">
        Lọc
      </button>
    </div>
  );

  // Header với icon + tiêu đề + chevron
  const SectionHeader = ({ icon, title }: { icon: JSX.Element; title: string }) => (
    <summary className="flex cursor-pointer list-none items-center justify-between text-sm font-medium text-gray-800">
      <span className="flex items-center gap-2">
        {icon}
        <span>{title}</span>
      </span>
      <Icon.Chevron className="h-4 w-4 text-gray-500 transition-transform duration-200 group-open:-rotate-180" />
    </summary>
  );

  const iconCls = "h-4 w-4 text-indigo-600";

  /** ==================== CỤC VỊ TRÍ: Dropdown + map tên ⇄ code (number) ==================== */

  // Lấy tên tỉnh từ id number hiện có
  const provinceNameFromId = (id?: number) => {
    if (id == null) return undefined;
    return meta?.provinces?.find(p => Number(p.code) === id)?.name;
  };

  // Lấy tên phường từ province_id & ward_id (đều number)
  const wardNameFromIds = (provinceId?: number, wardId?: number) => {
    if (provinceId == null || wardId == null) return undefined;
    // meta.wards index theo string key
    const wardList = meta?.wards?.[String(provinceId)] || [];
    return wardList.find(w => Number(w.code) === wardId)?.name;
  };

  // Options hiển thị
  const provinceOptions: string[] = [
    'Bất kỳ',
    ...(meta?.provinces?.map(p => p.name) ?? []),
  ];

  const wardOptions: string[] = [
    'Bất kỳ',
    ...(filters.province_id
      ? ((meta?.wards?.[String(filters.province_id)] ?? []).map(w => w.name))
      : []),
  ];

  // Label đang hiển thị
  const provinceLabel = provinceNameFromId(filters.province_id) ?? 'Bất kỳ';
  const wardLabel = wardNameFromIds(filters.province_id, filters.ward_id) ?? 'Bất kỳ';
  const numberOptions = ["Bất kỳ", ...Array.from({ length: 10 }, (_, i) => (i + 1).toString())];
  const propertyTypeOptions = ["Bất kỳ", ...(meta?.property_types ? Object.values(meta.property_types).map(pt => pt.name) : [])];
  const legalOptions = ["Bất kỳ", ...(meta?.legal_statuses ? Object.values(meta.legal_statuses).map(ls => ls.name) : [])];
  const directions = meta?.directions ?? ['Đông', 'Tây', 'Nam', 'Bắc', 'Đông Bắc', 'Đông Nam', 'Tây Nam', 'Tây Bắc'];
  const directionOptions = ["Bất kỳ", ...directions];
  return (
    <aside
      className={`w-80 shrink-0 transition-all duration-300 ${isOpen ? 'ml-0 opacity-100 pointer-events-auto' : '-ml-80 opacity-0 pointer-events-none'}`}
      style={{ willChange: 'margin-left, opacity' }}
    >
      <div className="rounded-2xl border border-gray-200 bg-white shadow-sm p-4 z-1000">
        <div className="mb-3 font-semibold text-gray-900">Bộ lọc khách hàng</div>

        {/* ========== VỊ TRÍ (Dropdown) ========== */}
        <details open={detailOpen} className="group rounded-xl border border-gray-200 p-3 mb-3">
          <SectionHeader icon={<Icon.Location className={iconCls} />} title="Vị trí" />
          <div className="mt-3 space-y-3 text-sm">
            <Dropdown
              label="Tỉnh / Thành phố"
              options={provinceOptions}
              value={provinceLabel}
              searchable // 👈 bật tìm kiếm
              onChange={(name) => {
                if (name === 'Bất kỳ') {
                  handleFilterChange('province_id', undefined);
                  handleFilterChange('ward_id', undefined);
                  return;
                }
                const selected = meta?.provinces?.find(p => p.name === name);
                const nextProvinceId = selected?.code != null ? Number(selected.code) : undefined;
                handleFilterChange('province_id', nextProvinceId);
                handleFilterChange('ward_id', undefined);
              }}
            />

            <Dropdown
              label="Phường / Xã"
              options={wardOptions}
              value={wardLabel}
              disabled={!filters.province_id}
              searchable // 👈 bật tìm kiếm
              onChange={(name) => {
                if (name === 'Bất kỳ') {
                  handleFilterChange('ward_id', undefined);
                  return;
                }
                if (!filters.province_id) return;
                const wardList = meta?.wards?.[String(filters.province_id)] ?? [];
                const selected = wardList.find(w => w.name === name);
                const nextWardId = selected?.code != null ? Number(selected.code) : undefined;
                handleFilterChange('ward_id', nextWardId);
              }}
            />


            <BodyButtons onClear={clearLocation} onApply={applyLocation} />
          </div>
        </details>

        {/* ========== GIÁ ========== */}
        <details open={detailOpen} className="group rounded-xl border border-gray-200 p-3 mb-3">
          <SectionHeader icon={<Icon.Price className={iconCls} />} title="Giá bất động sản" />
          <div className="mt-3 space-y-2 text-sm">
            {priceRanges.map((r, i) => (
              <label key={i} className="flex items-center gap-2">
                <input type="radio" name="price_range"
                  checked={tempPriceRange[0] === r.min && tempPriceRange[1] === r.max}
                  onChange={() => handleRadioSelect(r.min, r.max)} className="radio-custom" />
                {r.label}
              </label>
            ))}
            <div className="mt-3">
              <div className="flex justify-between text-gray-600 mb-1 text-sm">
                <span>{tempPriceRange[0] >= 1_000_000_000 ? `${(tempPriceRange[0] / 1_000_000_000).toFixed(1)} tỷ` : `${Math.round(tempPriceRange[0] / 1_000_000)} triệu`}</span>
                <span>{tempPriceRange[1] >= 1_000_000_000 ? `${(tempPriceRange[1] / 1_000_000_000).toFixed(1)} tỷ` : `${Math.round(tempPriceRange[1] / 1_000_000)} triệu`}</span>
              </div>
              <input type="range" min={1_000_000} max={100_000_000_000} step={50_000_000}
                value={tempPriceRange[0]}
                onChange={(e) => setTempPriceRange([+e.target.value, tempPriceRange[1]])}
                className="w-full accent-indigo-600" />
              <input type="range" min={100_000_000} max={100_000_000_000} step={50_000_000}
                value={tempPriceRange[1]}
                onChange={(e) => setTempPriceRange([tempPriceRange[0], +e.target.value])}
                className="w-full accent-indigo-600" />
            </div>
            <BodyButtons onClear={clearPrice} onApply={applyPrice} />
          </div>
        </details>

        {/* ========== DIỆN TÍCH ========== */}
        <details open={detailOpen} className="group rounded-xl border border-gray-200 p-3 mb-3">
          <SectionHeader icon={<Icon.Area className={iconCls} />} title="Diện tích" />
          <div className="mt-3 space-y-2 text-sm">
            <input type="number" placeholder="Diện tích tối thiểu (m²)" value={filters.area_land_min ?? ''}
              onChange={(e) => handleFilterChange('area_land_min', e.target.value ? parseInt(e.target.value) : undefined)}
              className="w-full border-gray-300 rounded-md p-2" />
            <input type="number" placeholder="Diện tích tối đa (m²)" value={filters.area_land_max ?? ''}
              onChange={(e) => handleFilterChange('area_land_max', e.target.value ? parseInt(e.target.value) : undefined)}
              className="w-full border-gray-300 rounded-md p-2" />
            <BodyButtons onClear={clearArea} onApply={applyArea} />
          </div>
        </details>

        {/* ========== PHÒNG NGỦ ========== */}
        <details open={detailOpen} className="group rounded-xl border border-gray-200 p-3 mb-3">
          <SectionHeader icon={<Icon.Bed className={iconCls} />} title="Số phòng ngủ" />
          <div className="mt-3 space-y-2 text-sm">
            <Dropdown
              label="Số phòng ngủ"
              options={numberOptions}
              value={filters.bedrooms ? filters.bedrooms.toString() : "Bất kỳ"}
              onChange={(val) => {
                handleFilterChange("bedrooms", val === "Bất kỳ" ? undefined : parseInt(val));
              }}
            />
            <BodyButtons onClear={clearBedrooms} onApply={applyBedrooms} />
          </div>
        </details>


        {/* ========== PHÒNG TẮM ========== */}
        <details open={detailOpen} className="group rounded-xl border border-gray-200 p-3 mb-3">
          <SectionHeader icon={<Icon.Bath className={iconCls} />} title="Số phòng tắm" />
          <div className="mt-3 space-y-2 text-sm">
            <Dropdown
              label="Số phòng tắm"
              options={numberOptions}
              value={filters.bathrooms ? filters.bathrooms.toString() : "Bất kỳ"}
              onChange={(val) => {
                handleFilterChange("bathrooms", val === "Bất kỳ" ? undefined : parseInt(val));
              }}
            />
            <BodyButtons onClear={clearBathrooms} onApply={applyBathrooms} />
          </div>
        </details>


        {/* ========== SỐ TẦNG ========== */}
        <details open={detailOpen} className="group rounded-xl border border-gray-200 p-3 mb-3">
          <SectionHeader icon={<Icon.Floors className={iconCls} />} title="Số tầng" />
          <div className="mt-3 space-y-2 text-sm">
            <Dropdown
              label="Số tầng"
              options={numberOptions}
              value={filters.floors ? filters.floors.toString() : "Bất kỳ"}
              onChange={(val) => {
                handleFilterChange("floors", val === "Bất kỳ" ? undefined : parseInt(val));
              }}
            />
            <BodyButtons onClear={clearFloors} onApply={applyFloors} />
          </div>
        </details>


        {/* ========== HƯỚNG NHÀ ========== */}
        <details open={detailOpen} className="group rounded-xl border border-gray-200 p-3 mb-3">
          <SectionHeader icon={<Icon.Compass className={iconCls} />} title="Hướng nhà" />
          <div className="mt-3 space-y-2 text-sm">
            <Dropdown
              label="Hướng"
              options={directionOptions}
              value={filters.direction ?? "Bất kỳ"}
              onChange={(name) => handleFilterChange('direction', name === "Bất kỳ" ? undefined : name)}
            />
            <BodyButtons onClear={clearDirection} onApply={applyDirection} />
          </div>
        </details>

        {/* ========== LOẠI BĐS ========== */}
        <details open={detailOpen} className="group rounded-xl border border-gray-200 p-3 mb-3">
          <SectionHeader icon={<Icon.Home className={iconCls} />} title="Loại bất động sản" />
          <div className="mt-3 space-y-2 text-sm">
            <Dropdown
              label="Loại BĐS"
              options={propertyTypeOptions}
              value={
                filters.property_type_id
                  ? (meta?.property_types
                    ? Object.values(meta.property_types).find(pt => pt.id === filters.property_type_id)?.name ?? "Bất kỳ"
                    : "Bất kỳ")
                  : "Bất kỳ"
              }
              onChange={(name) => {
                if (name === "Bất kỳ") return handleFilterChange('property_type_id', undefined);
                const picked = meta?.property_types ? Object.values(meta.property_types).find(pt => pt.name === name) : undefined;
                handleFilterChange('property_type_id', picked?.id);
              }}
            />
            <BodyButtons onClear={clearPropertyType} onApply={applyPropertyType} />
          </div>
        </details>

        {/* ========== PHÁP LÝ ========== */}
        <details open={detailOpen} className="group rounded-xl border border-gray-200 p-3 mb-3">
          <SectionHeader icon={<Icon.Legal className={iconCls} />} title="Tình trạng pháp lý" />
          <div className="mt-3 space-y-2 text-sm">
            <Dropdown
              label="Pháp lý"
              options={legalOptions}
              value={
                filters.legal_status_id
                  ? (meta?.legal_statuses
                    ? Object.values(meta.legal_statuses).find(ls => ls.id === filters.legal_status_id)?.name ?? "Bất kỳ"
                    : "Bất kỳ")
                  : "Bất kỳ"
              }
              onChange={(name) => {
                if (name === "Bất kỳ") return handleFilterChange('legal_status_id', undefined);
                const picked = meta?.legal_statuses ? Object.values(meta.legal_statuses).find(ls => ls.name === name) : undefined;
                handleFilterChange('legal_status_id', picked?.id);
              }}
            />
            <BodyButtons onClear={clearLegal} onApply={applyLegal} />
          </div>
        </details>

        {/* ========== TIỆN ÍCH ========== */}
        <details open={detailOpen} className="group rounded-xl border border-gray-200 p-3 mb-3">
          <SectionHeader icon={<Icon.Amenities className={iconCls} />} title="Tiện ích" />
          <div className="mt-3 flex flex-wrap gap-3 text-sm">
            {meta?.amenities?.map((a) => (
              <label key={a.id} className="flex items-center gap-1">
                <input type="checkbox"
                  checked={filters.amenities?.includes(a.id.toString()) ?? false}
                  onChange={() => {
                    const exists = filters.amenities?.includes(a.id.toString());
                    const next = exists
                      ? (filters.amenities ?? []).filter((id) => id !== a.id.toString())
                      : [...(filters.amenities ?? []), a.id.toString()];
                    handleFilterChange('amenities', next.length ? next : undefined);
                  }}
                />
                {a.name}
              </label>
            ))}
            {!meta?.amenities?.length && <div>Chưa có tiện ích</div>}
          </div>
          <BodyButtons onClear={clearAmenities} onApply={applyAmenities} />
        </details>

        {/* Reset toàn bộ */}
        <button
          className="mt-2 w-full bg-gray-600 text-white rounded-xl py-2 text-sm font-medium hover:bg-gray-700"
          onClick={() => { setFilters({}); setTempPriceRange([1_000_000, 10_000_000_000]); router.push('/nha-dat-ban'); onFilter?.({}); }}
        >
          Xóa toàn bộ bộ lọc
        </button>
      </div>
    </aside>
  );
}
