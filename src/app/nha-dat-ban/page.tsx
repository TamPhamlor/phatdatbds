import type { Metadata } from "next";
import NhaDatBanContent from "./NhaDatBanContent";

export const metadata: Metadata = {
  title: "Nhà đất bán - Phát Đạt Bất Động Sản",
  description: "Danh sách nhà đất bán tại Nhơn Trạch, Đồng Nai",
};

export default function NhaDatBanPage() {
  return <NhaDatBanContent />;
}
