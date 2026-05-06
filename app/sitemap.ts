import type { MetadataRoute } from 'next';
import { routing } from '@/i18n/routing';
import { getInsights, getCases } from '@/lib/notion';
import { SITE_CONFIG } from '@/lib/seo';

const SITE = SITE_CONFIG.url;

const STATIC_PATHS = [
  '',
  '/about',
  '/expertise',
  '/expertise/branding',
  '/expertise/automation',
  '/expertise/global',
  '/expertise/web',
  '/work',
  '/insights',
  '/contact',
];

function buildLocaleUrl(locale: string, path: string): string {
  if (locale === routing.defaultLocale) return `${SITE}${path}`;
  return `${SITE}/${locale}${path}`;
}

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const entries: MetadataRoute.Sitemap = [];

  // 정적 페이지 × 9개 언어
  for (const path of STATIC_PATHS) {
    const languages: Record<string, string> = {};
    for (const l of routing.locales) {
      languages[l] = buildLocaleUrl(l, path);
    }
    languages['x-default'] = buildLocaleUrl('en', path);

    for (const locale of routing.locales) {
      entries.push({
        url: buildLocaleUrl(locale, path),
        lastModified: new Date(),
        changeFrequency: 'weekly',
        priority: path === '' ? 1.0 : 0.8,
        alternates: { languages },
      });
    }
  }

  // Notion: Insights 동적 추가
  for (const locale of routing.locales) {
    try {
      const insights = await getInsights(locale);
      for (const post of insights) {
        if (!post.slug) continue;
        entries.push({
          url: buildLocaleUrl(locale, `/insights/${post.slug}`),
          lastModified: post.publishedAt
            ? new Date(post.publishedAt)
            : new Date(),
          changeFrequency: 'monthly',
          priority: 0.7,
        });
      }
    } catch (e) {
      console.error(`[sitemap] insights/${locale} failed:`, e);
    }
  }

  // Notion: Cases 동적 추가
  for (const locale of routing.locales) {
    try {
      const cases = await getCases(locale);
      for (const c of cases) {
        if (!c.slug) continue;
        entries.push({
          url: buildLocaleUrl(locale, `/work/${c.slug}`),
          lastModified: new Date(),
          changeFrequency: 'monthly',
          priority: 0.7,
        });
      }
    } catch (e) {
      console.error(`[sitemap] cases/${locale} failed:`, e);
    }
  }

  return entries;
}
