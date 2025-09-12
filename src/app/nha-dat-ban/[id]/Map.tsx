"use client";

interface BanDoProps {
  lat: number;
  lng: number;
  title?: string;
}

export default function BanDo({ lat, lng, title }: BanDoProps) {
  const mapUrl = `https://www.google.com/maps?q=${lat},${lng}&hl=vi&z=16&output=embed`;

  return (
    <div className="w-full h-96 rounded-xl overflow-hidden mt-6">
      <iframe
        src={mapUrl}
        width="100%"
        height="100%"
        style={{ border: 0 }}
        allowFullScreen
        loading="lazy"
      ></iframe>

      {/* Hiển thị địa chỉ hoặc tên nhà đất dưới bản đồ */}
      {title && (
        <p className="mt-2 text-center text-gray-700 font-medium">
          📍 {title}
        </p>
      )}
    </div>
  );
}
