import { setRequestLocale } from 'next-intl/server';
import { Hero } from '@/components/sections/Hero';
import { IntroSection, ServicesGrid, WorkPreview, CTABanner } from '@/components/sections/HomeSections';
import { RevealOnScroll } from '@/components/motion/RevealOnScroll';

export default async function HomePage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  setRequestLocale(locale);

  return (
    <>
      <RevealOnScroll />
      <Hero />
      <IntroSection />
      <ServicesGrid />
      <WorkPreview />
      <CTABanner />
    </>
  );
}
