import { setRequestLocale, getTranslations } from 'next-intl/server';
import WorkPageClient from '@/components/sections/WorkClient';
import { RevealOnScroll } from '@/components/motion/RevealOnScroll';
import { CTABanner } from '@/components/sections/HomeSections';

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'work' });
  return { title: `${t('headlineEm')} ${t('headlineTail')} — BnF` };
}

export default async function WorkPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  setRequestLocale(locale);

  return (
    <>
      <RevealOnScroll />
      <WorkPageClient />
      <CTABanner />
    </>
  );
}
