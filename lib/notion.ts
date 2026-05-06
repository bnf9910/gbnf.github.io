import { Client } from '@notionhq/client';
import { NotionToMarkdown } from 'notion-to-md';
import { cache } from 'react';
import type {
  PageObjectResponse,
  QueryDatabaseResponse,
} from '@notionhq/client/build/src/api-endpoints';

// =============================================================================
// Notion 클라이언트 초기화
// =============================================================================

if (!process.env.NOTION_TOKEN) {
  console.warn('[notion] NOTION_TOKEN is not set. Notion features will be disabled.');
}

export const notion = new Client({
  auth: process.env.NOTION_TOKEN,
});

export const n2m = new NotionToMarkdown({ notionClient: notion });

// =============================================================================
// 타입 정의
// =============================================================================

export interface Insight {
  id: string;
  title: string;
  slug: string;
  locale: string;
  category: string;
  excerpt: string;
  cover: string | null;
  author: string;
  publishedAt: string;
  seoTitle: string;
  seoDescription: string;
  keywords: string[];
  translationGroup: string;
  content?: string;
}

export interface CaseStudy {
  id: string;
  clientName: string;
  slug: string;
  industry: string;
  services: string[];
  locale: string;
  featured: boolean;
  cover: string | null;
  results: string;
  content?: string;
}

export interface TeamMember {
  id: string;
  name: string;
  role: string;
  bio: string;
  photo: string | null;
  locale: string;
}

// =============================================================================
// 헬퍼: Notion 속성 파싱
// =============================================================================

function getProperty(page: PageObjectResponse, name: string): any {
  return page.properties[name];
}

function getTitle(page: PageObjectResponse, name: string): string {
  const prop = getProperty(page, name);
  if (prop?.type === 'title') {
    return prop.title.map((t: any) => t.plain_text).join('') || '';
  }
  return '';
}

function getRichText(page: PageObjectResponse, name: string): string {
  const prop = getProperty(page, name);
  if (prop?.type === 'rich_text') {
    return prop.rich_text.map((t: any) => t.plain_text).join('') || '';
  }
  return '';
}

function getSelect(page: PageObjectResponse, name: string): string {
  const prop = getProperty(page, name);
  if (prop?.type === 'select') {
    return prop.select?.name || '';
  }
  return '';
}

function getMultiSelect(page: PageObjectResponse, name: string): string[] {
  const prop = getProperty(page, name);
  if (prop?.type === 'multi_select') {
    return prop.multi_select.map((t: any) => t.name);
  }
  return [];
}

function getDate(page: PageObjectResponse, name: string): string {
  const prop = getProperty(page, name);
  if (prop?.type === 'date') {
    return prop.date?.start || '';
  }
  return '';
}

function getCheckbox(page: PageObjectResponse, name: string): boolean {
  const prop = getProperty(page, name);
  if (prop?.type === 'checkbox') {
    return prop.checkbox || false;
  }
  return false;
}

function getFile(page: PageObjectResponse, name: string): string | null {
  const prop = getProperty(page, name);
  if (prop?.type === 'files' && prop.files.length > 0) {
    const file = prop.files[0];
    if (file.type === 'external') return file.external.url;
    if (file.type === 'file') return file.file.url;
  }
  return null;
}

// =============================================================================
// Insights (인사이트/블로그)
// =============================================================================

function parseInsight(page: PageObjectResponse): Insight {
  return {
    id: page.id,
    title: getTitle(page, 'Title'),
    slug: getRichText(page, 'Slug'),
    locale: getSelect(page, 'Locale'),
    category: getSelect(page, 'Category'),
    excerpt: getRichText(page, 'Excerpt'),
    cover: getFile(page, 'Cover'),
    author: getRichText(page, 'Author') || 'B&F Editorial',
    publishedAt: getDate(page, 'PublishedAt'),
    seoTitle: getRichText(page, 'SEO_Title'),
    seoDescription: getRichText(page, 'SEO_Description'),
    keywords: getMultiSelect(page, 'Keywords'),
    translationGroup: getRichText(page, 'TranslationGroup'),
  };
}

export const getInsights = cache(async (locale: string): Promise<Insight[]> => {
  if (!process.env.NOTION_DB_INSIGHTS) return [];

  try {
    const res = await notion.databases.query({
      database_id: process.env.NOTION_DB_INSIGHTS,
      filter: {
        and: [
          { property: 'Status', select: { equals: 'Published' } },
          { property: 'Locale', select: { equals: locale } },
        ],
      },
      sorts: [{ property: 'PublishedAt', direction: 'descending' }],
    });

    return (res.results as PageObjectResponse[]).map(parseInsight);
  } catch (error) {
    console.error('[notion] getInsights failed:', error);
    return [];
  }
});

export const getInsightBySlug = cache(
  async (slug: string, locale: string): Promise<Insight | null> => {
    if (!process.env.NOTION_DB_INSIGHTS) return null;

    try {
      const res = await notion.databases.query({
        database_id: process.env.NOTION_DB_INSIGHTS,
        filter: {
          and: [
            { property: 'Slug', rich_text: { equals: slug } },
            { property: 'Locale', select: { equals: locale } },
            { property: 'Status', select: { equals: 'Published' } },
          ],
        },
      });

      if (!res.results[0]) return null;

      const page = res.results[0] as PageObjectResponse;
      const mdblocks = await n2m.pageToMarkdown(page.id);
      const markdown = n2m.toMarkdownString(mdblocks).parent;

      return { ...parseInsight(page), content: markdown };
    } catch (error) {
      console.error('[notion] getInsightBySlug failed:', error);
      return null;
    }
  }
);

// =============================================================================
// Cases (포트폴리오)
// =============================================================================

function parseCase(page: PageObjectResponse): CaseStudy {
  return {
    id: page.id,
    clientName: getTitle(page, 'ClientName'),
    slug: getRichText(page, 'Slug'),
    industry: getSelect(page, 'Industry'),
    services: getMultiSelect(page, 'Services'),
    locale: getSelect(page, 'Locale'),
    featured: getCheckbox(page, 'Featured'),
    cover: getFile(page, 'Cover'),
    results: getRichText(page, 'Results'),
  };
}

export const getCases = cache(async (locale: string): Promise<CaseStudy[]> => {
  if (!process.env.NOTION_DB_CASES) return [];

  try {
    const res = await notion.databases.query({
      database_id: process.env.NOTION_DB_CASES,
      filter: {
        property: 'Locale',
        select: { equals: locale },
      },
    });

    return (res.results as PageObjectResponse[]).map(parseCase);
  } catch (error) {
    console.error('[notion] getCases failed:', error);
    return [];
  }
});

export const getFeaturedCases = cache(
  async (locale: string): Promise<CaseStudy[]> => {
    const cases = await getCases(locale);
    return cases.filter((c) => c.featured);
  }
);

// =============================================================================
// Team
// =============================================================================

function parseTeamMember(page: PageObjectResponse): TeamMember {
  return {
    id: page.id,
    name: getTitle(page, 'Name'),
    role: getRichText(page, 'Role'),
    bio: getRichText(page, 'Bio'),
    photo: getFile(page, 'Photo'),
    locale: getSelect(page, 'Locale'),
  };
}

export const getTeam = cache(async (locale: string): Promise<TeamMember[]> => {
  if (!process.env.NOTION_DB_TEAM) return [];

  try {
    const res = await notion.databases.query({
      database_id: process.env.NOTION_DB_TEAM,
      filter: {
        property: 'Locale',
        select: { equals: locale },
      },
    });

    return (res.results as PageObjectResponse[]).map(parseTeamMember);
  } catch (error) {
    console.error('[notion] getTeam failed:', error);
    return [];
  }
});

// =============================================================================
// hreflang 헬퍼
// =============================================================================

export const getTranslations = cache(
  async (translationGroup: string): Promise<Record<string, string>> => {
    if (!process.env.NOTION_DB_INSIGHTS || !translationGroup) return {};

    try {
      const res = await notion.databases.query({
        database_id: process.env.NOTION_DB_INSIGHTS,
        filter: {
          and: [
            {
              property: 'TranslationGroup',
              rich_text: { equals: translationGroup },
            },
            { property: 'Status', select: { equals: 'Published' } },
          ],
        },
      });

      const translations: Record<string, string> = {};
      for (const page of res.results as PageObjectResponse[]) {
        const locale = getSelect(page, 'Locale');
        const slug = getRichText(page, 'Slug');
        if (locale && slug) translations[locale] = slug;
      }
      return translations;
    } catch (error) {
      console.error('[notion] getTranslations failed:', error);
      return {};
    }
  }
);
