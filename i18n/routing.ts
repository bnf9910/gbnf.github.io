import { defineRouting } from 'next-intl/routing';
import { createNavigation } from 'next-intl/navigation';

export const routing = defineRouting({
  locales: ['ko', 'en', 'ja', 'zh-CN', 'zh-TW', 'mn', 'fil', 'th', 'vi'],
  defaultLocale: 'ko',
  localePrefix: 'as-needed',
});

export type Locale = (typeof routing.locales)[number];

export const localeNames: Record<Locale, string> = {
  ko: '한국어',
  en: 'English',
  ja: '日本語',
  'zh-CN': '简体中文',
  'zh-TW': '繁體中文',
  mn: 'Монгол',
  fil: 'Filipino',
  th: 'ไทย',
  vi: 'Tiếng Việt',
};

export const localeLabels: Record<Locale, string> = {
  ko: 'KOR',
  en: 'ENG',
  ja: 'JPN',
  'zh-CN': 'CHS',
  'zh-TW': 'CHT',
  mn: 'MON',
  fil: 'FIL',
  th: 'THA',
  vi: 'VIE',
};

export const { Link, redirect, usePathname, useRouter, getPathname } =
  createNavigation(routing);
