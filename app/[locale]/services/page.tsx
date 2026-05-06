import { setRequestLocale, getTranslations } from 'next-intl/server';
import { useTranslations } from 'next-intl';
import { Link } from '@/i18n/routing';
import { RevealOnScroll } from '@/components/motion/RevealOnScroll';
import { CTABanner } from '@/components/sections/HomeSections';

const SERVICE_KEYS = ['branding', 'performance', 'content', 'social', 'pr', 'global', 'mso', 'martech'] as const;
const IMAGES: Record<string, string> = {
  branding: 'https://images.unsplash.com/photo-1561070791-2526d30994b8?w=800&q=80',
  performance: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&q=80',
  content: 'https://images.unsplash.com/photo-1560472354-b33ff0c44a43?w=800&q=80',
  social: 'https://images.unsplash.com/photo-1611162617474-5b21e879e113?w=800&q=80',
  pr: 'https://images.unsplash.com/photo-1556761175-5973dc0f32e7?w=800&q=80',
  global: 'https://images.unsplash.com/photo-1488646953014-85cb44e25828?w=800&q=80',
  mso: 'https://images.unsplash.com/photo-1631815589968-fdb09a223b1e?w=800&q=80',
  martech: 'https://images.unsplash.com/photo-1551434678-e076c223a692?w=800&q=80',
};

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'services' });
  return { title: `${t('headlineLine1')} ${t('headlineLine2')} ${t('headlineEm')} — BnF` };
}

function ServicesPageContent() {
  const t = useTranslations();
  const tIMC = useTranslations('services.imcExplainer');
  const tSvc = useTranslations('services');
  const tCommon = useTranslations('common');

  return (
    <>
      <section style={{ padding: '160px 48px 80px', borderBottom: '1px solid var(--line)', background: 'var(--white)' }}>
        <div style={{ maxWidth: 1200, margin: '0 auto' }}>
          <nav style={{ fontFamily: 'var(--font-mono)', fontSize: 11, letterSpacing: '.16em', textTransform: 'uppercase', color: 'var(--gray-500)', marginBottom: 32, display: 'flex', alignItems: 'center', gap: 14 }}>
            <Link href="/" style={{ color: 'var(--gray-500)' }}>{tCommon('home')}</Link>
            <span style={{ color: 'var(--gray-400)' }}>/</span>
            <span>SERVICES</span>
          </nav>
          <h1 style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(48px, 6vw, 88px)', fontWeight: 600, lineHeight: 1.05, letterSpacing: '-0.03em', color: 'var(--ink)', marginBottom: 24, maxWidth: 900 }}>
            {tSvc('headlineLine1')}<br /><em style={{ fontStyle: 'normal', fontWeight: 700 }}>{tSvc('headlineEm')}</em>{tSvc('headlineTail')}
          </h1>
          <p style={{ fontSize: 19, lineHeight: 1.6, color: 'var(--gray-700)', maxWidth: 680 }}>{tSvc('desc')}</p>
        </div>
      </section>

      {/* IMC Explainer */}
      <section style={{ padding: '120px 48px', background: 'var(--white)', borderBottom: '1px solid var(--line)' }}>
        <div style={{ maxWidth: 1200, margin: '0 auto', display: 'grid', gridTemplateColumns: '1fr 1.4fr', gap: 96, alignItems: 'start' }}>
          <h2 className="reveal" style={{ fontFamily: 'var(--font-display)', fontSize: 38, fontWeight: 600, lineHeight: 1.25, letterSpacing: '-0.025em', color: 'var(--ink)', position: 'sticky', top: 120 }}>
            {tIMC('headingLine1')}<br /><em style={{ fontStyle: 'normal', fontWeight: 700 }}>{tIMC('headingEm')}</em>{tIMC('headingTail')}
          </h2>
          <div className="reveal">
            <p style={{ fontSize: 19, color: 'var(--ink)', fontWeight: 500, lineHeight: 1.55, marginBottom: 20 }}>
              {tIMC('p1Pre')}<strong style={{ fontWeight: 600 }}>{tIMC('p1Strong')}</strong>{tIMC('p1Tail')}
            </p>
            <p style={{ fontSize: 17, lineHeight: 1.7, color: 'var(--gray-700)', marginBottom: 20 }}>{tIMC('p2')}</p>
            <p style={{ fontSize: 17, lineHeight: 1.7, color: 'var(--gray-700)', marginBottom: 20 }}>
              {tIMC('p3Pre')}<strong style={{ color: 'var(--ink)', fontWeight: 600 }}>{tIMC('p3Strong')}</strong>{tIMC('p3Tail')}
            </p>
            <div style={{ marginTop: 48, paddingTop: 32, borderTop: '1px solid var(--line)' }}>
              <div style={{ fontFamily: 'var(--font-mono)', fontSize: 11, fontWeight: 500, letterSpacing: '.16em', textTransform: 'uppercase', color: 'var(--gray-500)', marginBottom: 24 }}>
                {tIMC('flowTitle')}
              </div>
              <ul style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
                {['01 BRAND', '02 PERFORMANCE', '03 CONTENT', '04 SOCIAL', '05 PR · EVENT', '06 GLOBAL', '07 MSO', '08 MARTECH'].map((flow) => (
                  <li key={flow} style={{ fontFamily: 'var(--font-mono)', fontSize: 11, fontWeight: 500, letterSpacing: '.06em', color: 'var(--ink)', padding: '8px 14px', border: '1px solid var(--line-strong)', borderRadius: 2, listStyle: 'none' }}>
                    {flow}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* All Services List */}
      <section style={{ padding: '120px 48px', background: 'var(--bg)' }}>
        <div style={{ maxWidth: 1200, margin: '0 auto 56px' }}>
          <h2 className="reveal" style={{ fontFamily: 'var(--font-display)', fontSize: 38, fontWeight: 600, lineHeight: 1.25, letterSpacing: '-0.025em', color: 'var(--ink)' }}>
            <em style={{ fontStyle: 'normal', fontWeight: 700 }}>{tSvc('viewAll')}</em>
          </h2>
        </div>

        <div style={{ maxWidth: 1200, margin: '0 auto', display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: 1, background: 'var(--line)' }}>
          {SERVICE_KEYS.map((key, i) => (
            <Link
              key={key}
              href={`/services/${key}` as any}
              className="reveal"
              style={{ background: 'var(--white)', padding: '48px 40px', display: 'grid', gridTemplateColumns: 'auto 1fr', gap: 40, minHeight: 280 }}
            >
              <div style={{ width: 200, height: 200, backgroundImage: `url(${IMAGES[key]})`, backgroundSize: 'cover', backgroundPosition: 'center', flexShrink: 0 }} />
              <div style={{ display: 'flex', flexDirection: 'column' }}>
                <div style={{ fontFamily: 'var(--font-mono)', fontSize: 11, letterSpacing: '.18em', color: 'var(--gray-500)', marginBottom: 10, fontWeight: 500 }}>{String(i + 1).padStart(2, '0')}</div>
                <div style={{ fontFamily: 'var(--font-mono)', fontSize: 10, letterSpacing: '.14em', textTransform: 'uppercase', color: 'var(--gray-500)', marginBottom: 14 }}>{tSvc(`items.${key}.cat`)}</div>
                <h3 style={{ fontFamily: 'var(--font-display)', fontSize: 26, fontWeight: 600, lineHeight: 1.2, letterSpacing: '-0.02em', color: 'var(--ink)', marginBottom: 14 }}>
                  {tSvc(`items.${key}.titleMain`)}<em style={{ fontStyle: 'normal', fontWeight: 700 }}>{tSvc(`items.${key}.titleEm`)}</em>
                </h3>
                <p style={{ fontSize: 14, lineHeight: 1.6, color: 'var(--gray-700)', marginBottom: 18, flex: 1 }}>{tSvc(`items.${key}.desc`)}</p>
                <ul style={{ listStyle: 'none', display: 'flex', flexWrap: 'wrap', gap: 6, marginBottom: 20 }}>
                  {(tSvc.raw(`items.${key}.tags`) as string[]).map((tag) => (
                    <li key={tag} style={{ fontFamily: 'var(--font-mono)', fontSize: 10, fontWeight: 500, letterSpacing: '.06em', color: 'var(--gray-500)', padding: '3px 8px', border: '1px solid var(--gray-300)', borderRadius: 2 }}>{tag}</li>
                  ))}
                </ul>
                <span style={{ fontFamily: 'var(--font-mono)', fontSize: 11, fontWeight: 500, letterSpacing: '.12em', color: 'var(--ink)', display: 'flex', alignItems: 'center', gap: 8, marginTop: 'auto' }}>
                  {tSvc('viewMore')}
                </span>
              </div>
            </Link>
          ))}
        </div>
      </section>
    </>
  );
}

export default async function ServicesPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  setRequestLocale(locale);
  return (
    <>
      <RevealOnScroll />
      <ServicesPageContent />
      <CTABanner />
    </>
  );
}
