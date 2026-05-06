import { setRequestLocale, getTranslations } from 'next-intl/server';
import { useTranslations } from 'next-intl';
import { Link } from '@/i18n/routing';
import { RevealOnScroll } from '@/components/motion/RevealOnScroll';
import { CTABanner } from '@/components/sections/HomeSections';

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'about' });
  return { title: `${t('label')} — BnF` };
}

function AboutContent() {
  const t = useTranslations('about');
  const tIntro = useTranslations('intro');
  const tCommon = useTranslations('common');

  const timeline = t.raw('timeline') as Array<{ year: string; title: string; desc: string }>;
  const bfBackList = t.raw('bfBackList') as string[];
  const bfFrontList = t.raw('bfFrontList') as string[];

  return (
    <>
      {/* Page Hero */}
      <section style={{ padding: '160px 48px 80px', borderBottom: '1px solid var(--line)', background: 'var(--white)' }}>
        <div style={{ maxWidth: 1200, margin: '0 auto' }}>
          <nav style={{ fontFamily: 'var(--font-mono)', fontSize: 11, letterSpacing: '.16em', textTransform: 'uppercase', color: 'var(--gray-500)', marginBottom: 32, display: 'flex', alignItems: 'center', gap: 14 }}>
            <Link href="/" style={{ color: 'var(--gray-500)' }}>{tCommon('home')}</Link>
            <span style={{ color: 'var(--gray-400)' }}>/</span>
            <span>ABOUT US</span>
          </nav>
          <h1 style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(48px, 6vw, 88px)', fontWeight: 600, lineHeight: 1.05, letterSpacing: '-0.03em', color: 'var(--ink)', marginBottom: 24, maxWidth: 900 }}>
            {t('pageTitleLine1')}<br />
            <em style={{ fontStyle: 'normal', fontWeight: 700 }}>{t('pageTitleLine2Em')}</em>{t('pageTitleLine2Tail')}
          </h1>
          <p style={{ fontSize: 19, lineHeight: 1.6, color: 'var(--gray-700)', maxWidth: 680 }}>{t('lede')}</p>
        </div>
      </section>

      {/* Manifesto */}
      <section style={{ padding: '140px 48px', background: 'var(--white)', borderBottom: '1px solid var(--line)' }}>
        <div style={{ maxWidth: 1100, margin: '0 auto' }}>
          <div className="reveal" style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(28px, 3.2vw, 42px)', fontWeight: 600, lineHeight: 1.4, letterSpacing: '-0.02em', color: 'var(--ink)' }}>
            <p style={{ marginBottom: 28 }}>
              {t('manifestoMainLine1')}<br />
              <em style={{ fontStyle: 'normal', fontWeight: 700 }}>{t('manifestoMainLine2Em')}</em>{t('manifestoMainLine2Tail')}
            </p>
            <p style={{ marginBottom: 28, color: 'var(--gray-400)' }}>{t('manifestoQuiet')}</p>
          </div>
        </div>
      </section>

      {/* B&F Meaning */}
      <section style={{ padding: '120px 48px', background: 'var(--paper)', borderBottom: '1px solid var(--line)' }}>
        <div style={{ maxWidth: 1200, margin: '0 auto' }}>
          <div className="reveal" style={{ marginBottom: 64, textAlign: 'center' }}>
            <h2 style={{ fontFamily: 'var(--font-display)', fontSize: 38, fontWeight: 600, letterSpacing: '-0.025em', color: 'var(--ink)', marginBottom: 16 }}>
              {t('bfMeaningHeading')}<em style={{ fontStyle: 'normal', fontWeight: 700 }}>{t('bfMeaningHeadingEm')}</em>{t('bfMeaningTail')}
            </h2>
            <p style={{ fontSize: 16, color: 'var(--gray-700)', maxWidth: 520, margin: '0 auto' }}>{t('bfMeaningSub')}</p>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 80, alignItems: 'start' }}>
            {[
              { letter: 'B', title: t('bfBackTitle'), sub1: t('bfBackSubLine1'), subEm: t('bfBackSubLine2Em'), subTail: t('bfBackSubLine2Tail'), text: t('bfBackText'), list: bfBackList },
              { letter: 'F', title: t('bfFrontTitle'), sub1: t('bfFrontSubLine1'), subEm: t('bfFrontSubLine2Em'), subTail: t('bfFrontSubLine2Tail'), text: t('bfFrontText'), list: bfFrontList },
            ].map((side) => (
              <div key={side.letter} className="reveal" style={{ padding: 48, background: 'var(--white)', position: 'relative' }}>
                <div style={{ position: 'absolute', top: 32, right: 48, fontFamily: 'var(--font-display)', fontSize: 120, fontWeight: 300, lineHeight: 1, color: 'var(--ink)', opacity: 0.06 }}>
                  {side.letter}
                </div>
                <h3 style={{ fontFamily: 'var(--font-mono)', fontSize: 13, fontWeight: 600, letterSpacing: '.18em', textTransform: 'uppercase', color: 'var(--ink)', marginBottom: 12 }}>
                  <span style={{ display: 'inline-block', width: 24, height: 24, lineHeight: '24px', textAlign: 'center', background: 'var(--ink)', color: '#fff', marginRight: 10, fontWeight: 600, fontSize: 12 }}>
                    {side.letter}
                  </span>
                  {side.title}
                </h3>
                <div style={{ fontFamily: 'var(--font-display)', fontSize: 24, fontWeight: 600, letterSpacing: '-0.02em', color: 'var(--ink)', marginBottom: 20, lineHeight: 1.3 }}>
                  {side.sub1}<br /><em style={{ fontStyle: 'normal', fontWeight: 700 }}>{side.subEm}</em> {side.subTail}
                </div>
                <p style={{ fontSize: 15, lineHeight: 1.7, color: 'var(--gray-700)', marginBottom: 16 }}>{side.text}</p>
                <ul style={{ listStyle: 'none', marginTop: 24 }}>
                  {side.list.map((item, i) => (
                    <li key={i} style={{ padding: '8px 0', borderTop: '1px solid var(--line)', fontSize: 13, color: 'var(--gray-700)', display: 'flex', alignItems: 'center', gap: 10 }}>
                      <span style={{ width: 4, height: 4, background: 'var(--ink)', borderRadius: '50%', flexShrink: 0, display: 'block' }} />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 4 Pillars */}
      <section style={{ padding: '120px 48px', background: 'var(--white)' }}>
        <div style={{ maxWidth: 1200, margin: '0 auto' }}>
          <div className="reveal" style={{ marginBottom: 64, maxWidth: 760 }}>
            <div className="section-label" style={{ marginBottom: 24 }}>{t('pillarsLabel')}</div>
            <h2 style={{ fontFamily: 'var(--font-display)', fontSize: 38, fontWeight: 600, lineHeight: 1.25, letterSpacing: '-0.025em', color: 'var(--ink)', marginBottom: 24 }}>
              {t('pillarsHeadingMain')}<em style={{ fontStyle: 'normal', fontWeight: 700 }}>{t('pillarsHeadingEm')}</em>{t('pillarsHeadingTail')}
            </h2>
            <p style={{ fontSize: 17, lineHeight: 1.7, color: 'var(--gray-700)' }}>{t('pillarsSub')}</p>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: 1, background: 'var(--line)' }}>
            {[1, 2, 3, 4].map((i) => (
              <div key={i} className="reveal" style={{ background: 'var(--white)', padding: '48px 40px', display: 'flex', flexDirection: 'column', gap: 16, minHeight: 280 }}>
                <div style={{ fontFamily: 'var(--font-mono)', fontSize: 11, letterSpacing: '.18em', color: 'var(--gray-500)', fontWeight: 500 }}>0{i}</div>
                <h3 style={{ fontFamily: 'var(--font-display)', fontSize: 24, fontWeight: 600, lineHeight: 1.25, letterSpacing: '-0.02em', color: 'var(--ink)' }}>
                  {t(`pillar${i}TitleMain` as any)}<em style={{ fontStyle: 'normal', fontWeight: 700 }}>{t(`pillar${i}TitleEm` as any)}</em>
                  {(() => { try { return t(`pillar${i}TitleTail` as any); } catch { return ''; } })()}
                </h3>
                <p style={{ fontSize: 15, lineHeight: 1.65, color: 'var(--gray-700)', flex: 1 }}>{t(`pillar${i}Desc` as any)}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* History / Timeline */}
      <section style={{ padding: '120px 48px', background: 'var(--bg)' }}>
        <div style={{ maxWidth: 1200, margin: '0 auto' }}>
          <div className="reveal" style={{ marginBottom: 64, display: 'grid', gridTemplateColumns: '1fr 1.4fr', gap: 80 }}>
            <h2 style={{ fontFamily: 'var(--font-display)', fontSize: 38, fontWeight: 600, lineHeight: 1.25, letterSpacing: '-0.025em', color: 'var(--ink)' }}>
              {t('historyHeadingMain')}<em style={{ fontStyle: 'normal', fontWeight: 700 }}>{t('historyHeadingEm')}</em>{t('historyHeadingTail')}
            </h2>
            <p style={{ fontSize: 17, lineHeight: 1.7, color: 'var(--gray-700)', alignSelf: 'end' }}>{t('historySub')}</p>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: 0 }}>
            {timeline.map((item, i) => (
              <div key={i} className="reveal" style={{ display: 'grid', gridTemplateColumns: '140px 1fr', gap: 48, padding: '32px 0', borderTop: '1px solid var(--line)', borderBottom: i === timeline.length - 1 ? '1px solid var(--line)' : 'none', alignItems: 'start' }}>
                <div style={{ fontFamily: 'var(--font-display)', fontSize: 32, fontWeight: 600, letterSpacing: '-0.02em', color: 'var(--ink)', lineHeight: 1 }}>{item.year}</div>
                <div>
                  <h3 style={{ fontFamily: 'var(--font-display)', fontSize: 20, fontWeight: 600, color: 'var(--ink)', marginBottom: 10, letterSpacing: '-0.015em' }}>{item.title}</h3>
                  <p style={{ fontSize: 15, lineHeight: 1.65, color: 'var(--gray-700)' }}>{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Stats */}
      <section style={{ padding: '120px 48px', background: 'var(--white)' }}>
        <div style={{ maxWidth: 1200, margin: '0 auto', display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 1, background: 'var(--line)', border: '1px solid var(--line)' }}>
          {[1, 2, 3].map((i) => (
            <div key={i} style={{ background: 'var(--white)', padding: '40px 32px', display: 'flex', flexDirection: 'column', gap: 8 }}>
              <div style={{ fontFamily: 'var(--font-display)', fontSize: 48, fontWeight: 600, letterSpacing: '-0.025em', color: 'var(--ink)', lineHeight: 1 }}>
                {tIntro(`stat${i}Num` as any)}<em style={{ color: 'var(--gold)', fontStyle: 'normal' }}>{tIntro(`stat${i}Em` as any)}</em>
              </div>
              <div style={{ fontSize: 13, color: 'var(--gray-500)', fontWeight: 500 }}>{tIntro(`stat${i}Label` as any)}</div>
            </div>
          ))}
          <div style={{ background: 'var(--white)', padding: '40px 32px', display: 'flex', flexDirection: 'column', gap: 8 }}>
            <div style={{ fontFamily: 'var(--font-display)', fontSize: 48, fontWeight: 600, letterSpacing: '-0.025em', color: 'var(--ink)', lineHeight: 1 }}>
              {t('stat4Num')}<em style={{ color: 'var(--gold)', fontStyle: 'normal' }}>{t('stat4Em')}</em>
            </div>
            <div style={{ fontSize: 13, color: 'var(--gray-500)', fontWeight: 500 }}>{t('stat4Label')}</div>
          </div>
        </div>
      </section>
    </>
  );
}

export default async function AboutPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  setRequestLocale(locale);
  return (
    <>
      <RevealOnScroll />
      <AboutContent />
      <CTABanner />
    </>
  );
}
