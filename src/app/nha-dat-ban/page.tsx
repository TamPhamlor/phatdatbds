import type { Metadata } from 'next';
import CategoryFilter from './components/CategoryFilter';
import ClientLayout from './components/ClientLayout';
import { Listing } from './components/types';

export const metadata: Metadata = {
  title: 'Nhà đất bán - Phát Đạt Bất Động Sản',
  description: 'Danh sách nhà đất bán tại Nhơn Trạch, Đồng Nai',
};

// Buộc page này SSR, không prerender static
export const dynamic = 'force-dynamic';

async function getListings(): Promise<Listing[]> {
  try {
    const res = await fetch('https://phatdatbatdongsan.com/api/v1/listings', {
      cache: 'no-store', // luôn fetch dữ liệu mới
    });
    const data = await res.json();
    return data.data || [];
  } catch (error) {
    console.error('Error fetching listings:', error);
    return [];
  }
}

export default async function NhaDatBanPage() {
  const projects = await getListings();

  return (
    <>
      <CategoryFilter />
      <ClientLayout projects={projects} />
    </>
  );
}
