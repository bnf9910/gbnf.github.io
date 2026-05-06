import { setRequestLocale, getTranslations } from 'next-intl/server';
import { useTranslations } from 'next-intl';
import { Link } from '@/i18n/routing';
import { notFound } from 'next/navigation';
import { RevealOnScroll } from '@/components/motion/RevealOnScroll';
import { CTABanner } from '@/components/sections/HomeSections';
import { SERVICE_DATA, SERVICE_SLUGS, type ServiceSlug } from '@/lib/service-data';

export function generateStaticParams() {
  return SERVICE_SLUGS.map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ locale: string; slug: string }> }) {
  const { locale, slug } = await params;
  const t = await getTranslations({ locale, namespace: `services.items.${slug}` });
  return { title: `${t('titleMain')}${t('titleEm')} — Services — BnF` };
}

function DetailContent({ slug }: { slug: ServiceSlug }) {
  const data = SERVICE_DATA[slug];
  const t = useTranslations();
  const tSvc = useTranslations(`services.items.${slug}`);
  const tCommon = useTranslations('common');

  return (
    <>
      {/* Detail Hero */}
      <section style={{ padding: '160px 48px 80px', borderBottom: '1px solid var(--line)', background: 'var(--white)' }}>
        <div style={{ maxWidth: 1200, margin: '0 auto', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 80, alignItems: 'end' }}>
          <div>
            <nav style={{ fontFamily: 'var(--font-mono)', fontSize: 11, letterSpacing: '.16em', textTransform: 'uppercase', color: 'var(--gray-500)', marginBottom: 32, display: 'flex', alignItems: 'center', gap: 14 }}>
              <Link href="/" style={{ color: 'var(--gray-500)' }}>{tCommon('home')}</Link>
              <span style={{ color: 'var(--gray-400)' }}>/</span>
              <Link href="/services" style={{ color: 'var(--gray-500)' }}>SERVICES</Link>
              <span style={{ color: 'var(--gray-400)' }}>/</span>
              <span>{tSvc('cat').toUpperCase()}</span>
            </nav>
            <div style={{ fontFamily: 'var(--font-mono)', fontSize: 13, fontWeight: 500, letterSpacing: '.18em', color: 'var(--gray-500)', marginBottom: 24, display: 'flex', alignItems: 'center', gap: 14 }}>
              <span style={{ width: 24, height: 1, background: 'var(--gray-400)', display: 'block' }} />
              <span>{data.num}</span>
              <span style={{ color: 'var(--ink)' }}>{tSvc('cat')}</span>
            </div>
            <h1 style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(48px, 6vw, 88px)', fontWeight: 600, lineHeight: 1.05, letterSpacing: '-0.03em', color: 'var(--ink)', marginBottom: 28 }}>
              {tSvc('titleMain')}<em style={{ fontStyle: 'normal', fontWeight: 700 }}>{tSvc('titleEm')}</em>
            </h1>
            <p style={{ fontSize: 19, lineHeight: 1.6, color: 'var(--gray-700)', maxWidth: 540 }}>{tSvc('desc')}</p>
          </div>
          <div style={{ aspectRatio: '4/5', backgroundImage: `url(${data.heroImg})`, backgroundSize: 'cover', backgroundPosition: 'center' }} />
        </div>
      </section>

      {/* Other Services Nav */}
      <section style={{ padding: '120px 48px', background: 'var(--white)', borderTop: '1px solid var(--line)' }}>
        <div style={{ maxWidth: 1200, margin: '0 auto' }}>
          <h3 style={{ fontFamily: 'var(--font-display)', fontSize: 32, fontWeight: 600, lineHeight: 1.25, letterSpacing: '-0.025em', color: 'var(--ink)', marginBottom: 48 }}>
            <em style={{ fontStyle: 'normal', fontWeight: 700 }}>Other</em> services.
          </h3>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 1, background: 'var(--line)', border: '1px solid var(--line)' }}>
            {SERVICE_SLUGS.filter((s) => s !== slug).map((s, i) => (
              <Link key={s} href={`/services/${s}` as any} style={{ background: 'var(--white)', padding: '24px 20px', display: 'flex', flexDirection: 'column', gap: 8 }}>
                <div style={{ fontFamily: 'var(--font-mono)', fontSize: 10, letterSpacing: '.16em', color: 'var(--gray-500)', fontWeight: 500 }}>{SERVICE_DATA[s].num}</div>
                <div style={{ fontFamily: 'var(--font-display)', fontSize: 15, fontWeight: 600, color: 'var(--ink)' }}>
                  {t(`services.items.${s}.titleMain` as any)}{t(`services.items.${s}.titleEm` as any)}
                </div>
              </Link>
            ))}
            <Link href="/services" style={{ background: 'var(--white)', padding: '24px 20px', display: 'flex', flexDirection: 'column', gap: 8 }}>
              <div style={{ fontFamily: 'var(--font-mono)', fontSize: 10, letterSpacing: '.16em', color: 'var(--gray-500)', fontWeight: 500 }}>→</div>
              <div style={{ fontFamily: 'var(--font-display)', fontSize: 15, fontWeight: 600, color: 'var(--ink)' }}>{t('services.viewAll')}</div>
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}

export default async function ServiceDetailPage({ params }: { params: Promise<{ locale: string; slug: string }> }) {
  const { locale, slug } = await params;
  setRequestLocale(locale);
  if (!SERVICE_SLUGS.includes(slug as ServiceSlug)) notFound();

  return (
    <>
      <RevealOnScroll />
      <DetailContent slug={slug as ServiceSlug} />
      <CTABanner />
    </>
  );
}
