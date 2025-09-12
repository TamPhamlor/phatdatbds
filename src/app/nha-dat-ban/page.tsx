import type { Metadata } from 'next';
import CategoryFilter from './components/CategoryFilter';
import ClientLayout from './components/ClientLayout';
import { Listing } from './components/types';

export const metadata: Metadata = {
  title: 'Nhà đất bán - Phát Đạt Bất Động Sản',
  description: 'Danh sách nhà đất bán tại Nhơn Trạch, Đồng Nai',
};

async function getListings(): Promise<Listing[]> {
  try {
    const res = await fetch('https://phatdatbatdongsan.com/api/v1/listings');
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
