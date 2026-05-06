import type { Metadata } from 'next';
import { routing, type Locale } from '@/i18n/routing';

const SITE = process.env.NEXT_PUBLIC_SITE_URL || 'https://gbnf.kr';

export const SITE_CONFIG = {
  name: 'B&F',
  fullName: 'BnF — Hyper-automated MarTech & Brand Solutions Group',
  url: SITE,
  email: 'info@gbnf.kr',
  phone: '+82-2-588-9910',
  address: {
    street: '25, Nonhyeon-ro 160-gil',
    locality: 'Gangnam-gu',
    region: 'Seoul',
    country: 'KR',
  },
};

interface BuildMetadataOptions {
  title: string;
  description: string;
  locale: Locale;
  path?: string;
  image?: string;
  type?: 'website' | 'article';
  publishedAt?: string;
  keywords?: string[];
}

/**
 * 다국어 메타데이터 생성기
 * - hreflang alternates 자동 생성
 * - canonical URL 설정
 * - Open Graph + Twitter Card
 */
export function buildMetadata({
  title,
  description,
  locale,
  path = '',
  image,
  type = 'website',
  publishedAt,
  keywords,
}: BuildMetadataOptions): Metadata {
  const fullTitle = title === SITE_CONFIG.name ? title : `${title} | ${SITE_CONFIG.name}`;

  // 현재 페이지 URL
  const currentPath =
    locale === routing.defaultLocale ? path : `/${locale}${path}`;
  const canonical = `${SITE}${currentPath}`;

  // hreflang alternates
  const languages: Record<string, string> = {};
  for (const l of routing.locales) {
    const localePath = l === routing.defaultLocale ? path : `/${l}${path}`;
    languages[l] = `${SITE}${localePath}`;
  }
  // x-default는 영어로
  languages['x-default'] = `${SITE}/en${path}`;

  const ogImage = image || `${SITE}/og-default.jpg`;

  return {
    title: fullTitle,
    description,
    keywords: keywords?.join(', '),
    alternates: {
      canonical,
      languages,
    },
    openGraph: {
      title: fullTitle,
      description,
      url: canonical,
      siteName: SITE_CONFIG.fullName,
      locale: locale.replace('-', '_'),
      type,
      images: [{ url: ogImage, width: 1200, height: 630, alt: title }],
      ...(publishedAt && { publishedTime: publishedAt }),
    },
    twitter: {
      card: 'summary_large_image',
      title: fullTitle,
      description,
      images: [ogImage],
    },
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        'max-image-preview': 'large',
        'max-snippet': -1,
        'max-video-preview': -1,
      },
    },
  };
}

/**
 * Organization JSON-LD (회사 스키마)
 */
export function getOrganizationSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: SITE_CONFIG.fullName,
    alternateName: 'B&F',
    url: SITE,
    logo: `${SITE}/logo.svg`,
    email: SITE_CONFIG.email,
    telephone: SITE_CONFIG.phone,
    address: {
      '@type': 'PostalAddress',
      streetAddress: SITE_CONFIG.address.street,
      addressLocality: SITE_CONFIG.address.locality,
      addressRegion: SITE_CONFIG.address.region,
      addressCountry: SITE_CONFIG.address.country,
    },
    founder: {
      '@type': 'Person',
      name: 'JU HYUN PAIK',
      jobTitle: 'Chief Executive Officer',
    },
    sameAs: [
      // 향후 SNS 링크 추가
    ],
  };
}

/**
 * LocalBusiness JSON-LD
 */
export function getLocalBusinessSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'ProfessionalService',
    name: SITE_CONFIG.fullName,
    image: `${SITE}/og-default.jpg`,
    '@id': SITE,
    url: SITE,
    telephone: SITE_CONFIG.phone,
    address: {
      '@type': 'PostalAddress',
      streetAddress: SITE_CONFIG.address.street,
      addressLocality: SITE_CONFIG.address.locality,
      addressRegion: SITE_CONFIG.address.region,
      addressCountry: SITE_CONFIG.address.country,
    },
    priceRange: '$$$$',
  };
}

/**
 * Article JSON-LD (블로그 글용)
 */
export function getArticleSchema({
  title,
  description,
  image,
  publishedAt,
  author,
  url,
}: {
  title: string;
  description: string;
  image?: string;
  publishedAt: string;
  author: string;
  url: string;
}) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: title,
    description,
    image: image || `${SITE}/og-default.jpg`,
    datePublished: publishedAt,
    dateModified: publishedAt,
    author: {
      '@type': 'Person',
      name: author,
    },
    publisher: {
      '@type': 'Organization',
      name: SITE_CONFIG.fullName,
      logo: { '@type': 'ImageObject', url: `${SITE}/logo.svg` },
    },
    mainEntityOfPage: { '@type': 'WebPage', '@id': url },
  };
}
