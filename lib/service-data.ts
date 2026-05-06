export const SERVICE_SLUGS = [
  'branding',
  'performance',
  'content',
  'social',
  'pr',
  'global',
  'mso',
  'martech',
] as const;

export type ServiceSlug = (typeof SERVICE_SLUGS)[number];

export const SERVICE_DATA: Record<ServiceSlug, { num: string; heroImg: string }> = {
  branding: { num: '01', heroImg: 'https://images.unsplash.com/photo-1561070791-2526d30994b8?w=1000&q=85' },
  performance: { num: '02', heroImg: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=1000&q=85' },
  content: { num: '03', heroImg: 'https://images.unsplash.com/photo-1560472354-b33ff0c44a43?w=1000&q=85' },
  social: { num: '04', heroImg: 'https://images.unsplash.com/photo-1611162617474-5b21e879e113?w=1000&q=85' },
  pr: { num: '05', heroImg: 'https://images.unsplash.com/photo-1556761175-5973dc0f32e7?w=1000&q=85' },
  global: { num: '06', heroImg: 'https://images.unsplash.com/photo-1488646953014-85cb44e25828?w=1000&q=85' },
  mso: { num: '07', heroImg: 'https://images.unsplash.com/photo-1631815589968-fdb09a223b1e?w=1000&q=85' },
  martech: { num: '08', heroImg: 'https://images.unsplash.com/photo-1551434678-e076c223a692?w=1000&q=85' },
};
