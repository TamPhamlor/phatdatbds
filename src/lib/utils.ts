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