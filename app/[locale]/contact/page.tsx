import { setRequestLocale, getTranslations } from 'next-intl/server';
import ContactClient from '@/components/sections/ContactClient';
import { RevealOnScroll } from '@/components/motion/RevealOnScroll';

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'contact' });
  return {
    title: `${t('headlineLine1')} ${t('headlineEm')}${t('headlineTail')} — BnF`,
    description: t('lede'),
  };
}

export default async function ContactPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  setRequestLocale(locale);

  const t = await getTranslations({ locale, namespace: 'contact' });
  const tCommon = await getTranslations({ locale, namespace: 'common' });

  // Flat keys directly from JSON
  const messages = {
    locale,
    headlineLine1: t('headlineLine1'),
    headlineEm: t('headlineEm'),
    headlineTail: t('headlineTail'),
    lede: t('lede'),
    home: tCommon('home'),

    infoHeadingMain: t('infoHeadingMain'),
    infoHeadingEm: t('infoHeadingEm'),
    infoSub: t('infoSub'),

    label: {
      company: t('labels.company'),
      name: t('labels.name'),
      position: t('labels.position'),
      phone: t('labels.phone'),
      email: t('labels.email'),
      type: t('labels.type'),
      budget: t('labels.budget'),
      message: t('labels.message'),
      emailL: t('labels.email_label'),
      phoneL: t('labels.phone_label'),
      locationL: t('labels.location_label'),
      hoursL: t('labels.hours_label'),
      careersL: t('labels.careers_label'),
      addressL: t('labels.address_label'),
      transitL: t('labels.transit_label'),
      parkingL: t('labels.parking_label'),
    },
    placeholder: {
      company: t('placeholders.company'),
      name: t('placeholders.name'),
      position: t('placeholders.position'),
      phone: t('placeholders.phone'),
      email: t('placeholders.email'),
      select: t('placeholders.select'),
      message: t('placeholders.message'),
    },
    typeOptions: t.raw('typeOptions') as string[],
    budgetOptions: t.raw('budgetOptions') as string[],
    submit: t('submit'),
    submitNote: t('submitNote'),
    successMessage: t('successMessage'),

    hoursValue: t('hoursValue'),
    addressValue: t('addressValue'),
    transitValue: t('transitValue'),
    parkingValue: t('parkingValue'),

    studioHeading: t('studioHeading'),
    studioHeadingEm: t('studioHeadingEm'),
    studioDesc: t('studioDesc'),

    faqLabel: t('faqLabel'),
    faqHeading: t('faqHeading'),
    faqHeadingEm: t('faqHeadingEm'),
    faqSub: t('faqSub'),
    faq: t.raw('faq') as Array<{ q: string; a: string }>,
  };

  return (
    <>
      <ContactClient m={messages} />
      <RevealOnScroll />
    </>
  );
}
