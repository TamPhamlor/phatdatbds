export function normalize(s: string): string {
  return (s || '')
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/đ/g, 'd')
    .replace(/Đ/g, 'd');
}

export function timeToRead(html: string): number {
  return Math.max(
    1,
    Math.round(
      html
        .replace(/<[^>]*>/g, ' ')
        .trim()
        .split(/\s+/).length / 220
    )
  );
}

export function formatPricePerM2(value: string | number | null | undefined): string {
  if (!value) return '';
  const num = typeof value === 'string' ? parseFloat(value) : value;
  if (!Number.isFinite(num) || num <= 0) return '';
  
  if (num >= 1_000_000_000) {
    return `${(num / 1_000_000_000).toFixed(1).replace(/\.0$/, '')} tỷ`;
  }
  if (num >= 1_000_000) {
    return `${(num / 1_000_000).toFixed(1).replace(/\.0$/, '')} triệu`;
  }
  return num.toLocaleString('vi-VN');
}