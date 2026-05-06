'use client';

import { useTranslations } from 'next-intl';
import { Link } from '@/i18n/routing';

const SERVICE_KEYS = ['branding', 'performance', 'content', 'social', 'pr', 'global', 'mso', 'martech'] as const;

const SERVICE_IMAGES: Record<string, string> = {
  branding: 'https://images.unsplash.com/photo-1561070791-2526d30994b8?w=800&q=80',
  performance: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&q=80',
  content: 'https://images.unsplash.com/photo-1560472354-b33ff0c44a43?w=800&q=80',
  social: 'https://images.unsplash.com/photo-1611162617474-5b21e879e113?w=800&q=80',
  pr: 'https://images.unsplash.com/photo-1556761175-5973dc0f32e7?w=800&q=80',
  global: 'https://images.unsplash.com/photo-1488646953014-85cb44e25828?w=800&q=80',
  mso: 'https://images.unsplash.com/photo-1631815589968-fdb09a223b1e?w=800&q=80',
  martech: 'https://images.unsplash.com/photo-1551434678-e076c223a692?w=800&q=80',
};

const FEATURED_WORK = [
  { id: 'skincare-japan', img: 'https://images.unsplash.com/photo-1570172619644-dfd03ed5d881?w=1200&q=85', industry: 'SKINCARE · GLOBAL', year: '2024', title: '럭셔리 스킨케어 일본 진출', result: '<strong>론칭 6개월 매출 380% 성장</strong>, Qoo10 1위.' },
  { id: 'luxury-popup', img: 'https://images.unsplash.com/photo-1556761175-5973dc0f32e7?w=900&q=85', industry: 'LUXURY · POPUP', year: '2024', title: '명품 브랜드 청담 팝업 기획', result: '<strong>3주 방문객 24,000명</strong>, 미디어 80건 이상 보도.' },
  { id: 'clinic-mso', img: 'https://images.unsplash.com/photo-1576091160550-2173dba999ef?w=900&q=85', industry: 'CLINIC · MSO', year: '2024', title: '강남 피부과 통합 캠페인', result: '<strong>월 신규 예약 4.2배</strong>, ROAS 720%.' },
];

export function IntroSection() {
  const t = useTranslations('intro');
  return (
    <section style={{ padding: '140px 48px', background: 'var(--white)', borderTop: '1px solid var(--line)' }}>
      <div style={{ maxWidth: 1200, margin: '0 auto', display: 'grid', gridTemplateColumns: '1fr 1.4fr', gap: 96, alignItems: 'start' }}>
        <div>
          <div className="section-label" style={{ marginBottom: 24 }}>{t('label')}</div>
          <h2 className="reveal" style={{ fontFamily: 'var(--font-display)', fontSize: 38, fontWeight: 600, lineHeight: 1.25, letterSpacing: '-0.025em', color: 'var(--ink)', position: 'sticky', top: 120 }}>
            {t('headingLine1')}<br />
            {t('headingLine2')}<br />
            <em style={{ fontStyle: 'normal', fontWeight: 700 }}>{t('headingEm')}</em>{t('headingTail')}
          </h2>
        </div>
        <div className="reveal">
          <p style={{ fontSize: 19, color: 'var(--ink)', fontWeight: 500, lineHeight: 1.55, marginBottom: 20 }}>
            {t('p1Pre')}<strong style={{ color: 'var(--ink)', fontWeight: 600 }}>{t('p1Strong')}</strong>{t('p1Tail')}
          </p>
          <p style={{ fontSize: 17, lineHeight: 1.7, color: 'var(--gray-700)', marginBottom: 20 }}>{t('p2')}</p>
          <div style={{ marginTop: 48, paddingTop: 32, borderTop: '1px solid var(--line)', display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 32 }}>
            {[1, 2, 3].map((i) => (
              <div key={i} style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
                <div style={{ fontFamily: 'var(--font-display)', fontSize: 34, fontWeight: 600, letterSpacing: '-0.025em', color: 'var(--ink)', lineHeight: 1 }}>
                  {t(`stat${i}Num` as any)}<em style={{ color: 'var(--gold)', fontStyle: 'normal' }}>{t(`stat${i}Em` as any)}</em>
                </div>
                <div style={{ fontSize: 12, color: 'var(--gray-500)', fontWeight: 500 }}>{t(`stat${i}Label` as any)}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

export function ServicesGrid() {
  const t = useTranslations('services');
  return (
    <section id="services" style={{ padding: '140px 48px', background: 'var(--bg)' }}>
      <div style={{ maxWidth: 1200, margin: '0 auto 56px', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 64, alignItems: 'end' }}>
        <h2 className="reveal" style={{ fontFamily: 'var(--font-display)', fontSize: 38, fontWeight: 600, lineHeight: 1.25, letterSpacing: '-0.025em', color: 'var(--ink)' }}>
          {t('headlineLine1')}<br />
          {t('headlineLine2')} <em style={{ fontStyle: 'normal', fontWeight: 700 }}>{t('headlineEm')}</em>{t('headlineTail')}
        </h2>
        <p className="reveal" style={{ fontSize: 15, lineHeight: 1.65, color: 'var(--gray-700)', maxWidth: 420 }}>{t('desc')}</p>
      </div>

      <div style={{ maxWidth: 1200, margin: '0 auto', display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 1, background: 'var(--line)' }}>
        {SERVICE_KEYS.map((key, i) => (
          <Link
            key={key}
            href={`/services/${key}` as any}
            className="reveal"
            style={{ background: 'var(--white)', padding: '32px 24px 28px', display: 'flex', flexDirection: 'column', cursor: 'pointer', position: 'relative', overflow: 'hidden', minHeight: 400 }}
          >
            <div style={{ width: 'calc(100% + 48px)', margin: '-32px -24px 20px', height: 170, backgroundImage: `url(${SERVICE_IMAGES[key]})`, backgroundSize: 'cover', backgroundPosition: 'center' }} />
            <div style={{ fontFamily: 'var(--font-mono)', fontSize: 11, letterSpacing: '.18em', color: 'var(--gray-500)', marginBottom: 10, fontWeight: 500 }}>{String(i + 1).padStart(2, '0')}</div>
            <div style={{ fontFamily: 'var(--font-mono)', fontSize: 10, letterSpacing: '.14em', textTransform: 'uppercase', color: 'var(--gray-500)', marginBottom: 12 }}>{t(`items.${key}.cat`)}</div>
            <h3 style={{ fontFamily: 'var(--font-display)', fontSize: 19, fontWeight: 600, lineHeight: 1.3, letterSpacing: '-0.015em', color: 'var(--ink)', marginBottom: 12 }}>
              {t(`items.${key}.titleMain`)}<em style={{ fontStyle: 'normal', fontWeight: 700 }}>{t(`items.${key}.titleEm`)}</em>
            </h3>
            <p style={{ fontSize: 13, lineHeight: 1.55, color: 'var(--gray-700)', marginBottom: 16, flex: 1 }}>{t(`items.${key}.desc`)}</p>
            <ul style={{ listStyle: 'none', display: 'flex', flexWrap: 'wrap', gap: 6, marginBottom: 16 }}>
              {(t.raw(`items.${key}.tags`) as string[]).map((tag) => (
                <li key={tag} style={{ fontFamily: 'var(--font-mono)', fontSize: 10, fontWeight: 500, letterSpacing: '.06em', color: 'var(--gray-500)', padding: '3px 8px', border: '1px solid var(--gray-300)', borderRadius: 2 }}>{tag}</li>
              ))}
            </ul>
            <span style={{ fontFamily: 'var(--font-mono)', fontSize: 11, fontWeight: 500, letterSpacing: '.12em', color: 'var(--ink)', display: 'flex', alignItems: 'center', gap: 8, marginTop: 'auto' }}>
              {t('viewMore')}
            </span>
          </Link>
        ))}
      </div>
    </section>
  );
}

export function WorkPreview() {
  const t = useTranslations('work');
  return (
    <section id="work" style={{ padding: '140px 48px', background: 'var(--white)' }}>
      <div style={{ maxWidth: 1200, margin: '0 auto 56px', display: 'flex', justifyContent: 'space-between', alignItems: 'end', gap: 48 }}>
        <h2 className="reveal" style={{ fontFamily: 'var(--font-display)', fontSize: 38, fontWeight: 600, lineHeight: 1.25, letterSpacing: '-0.025em' }}>
          <em style={{ fontStyle: 'normal', fontWeight: 700 }}>{t('headlineEm')}</em><br />
          {t('headlineTail')}
        </h2>
        <Link href="/work" style={{ fontFamily: 'var(--font-mono)', fontSize: 12, fontWeight: 500, letterSpacing: '.14em', textTransform: 'uppercase', color: 'var(--ink)', padding: '12px 0', borderBottom: '1px solid var(--ink)' }}>
          {t('viewAll')}
        </Link>
      </div>
      <div style={{ maxWidth: 1200, margin: '0 auto', display: 'grid', gridTemplateColumns: '1.3fr 1fr', gap: 40 }}>
        {FEATURED_WORK.map((w, i) => (
          <div key={w.id} className="reveal" style={i === 0 ? { gridRow: 'span 2' } : {}}>
            <div style={{ width: '100%', aspectRatio: i === 0 ? '4/5' : '5/4', overflow: 'hidden', marginBottom: 18 }}>
              <img src={w.img} alt="" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', fontFamily: 'var(--font-mono)', fontSize: 10, letterSpacing: '.14em', textTransform: 'uppercase', color: 'var(--gray-500)', marginBottom: 8 }}>
              <span style={{ color: 'var(--ink)', fontWeight: 600 }}>{w.industry}</span>
              <span>{w.year}</span>
            </div>
            <h3 style={{ fontFamily: 'var(--font-display)', fontSize: 19, fontWeight: 600, lineHeight: 1.3, letterSpacing: '-0.015em', color: 'var(--ink)' }}>{w.title}</h3>
            <p style={{ fontSize: 13, color: 'var(--gray-700)', marginTop: 6, lineHeight: 1.55 }} dangerouslySetInnerHTML={{ __html: w.result }} />
          </div>
        ))}
      </div>
    </section>
  );
}

export function CTABanner() {
  const t = useTranslations('cta');
  return (
    <section style={{ background: 'var(--ink)', color: '#fff', padding: '120px 48px 80px', position: 'relative', overflow: 'hidden' }}>
      <div style={{ maxWidth: 1200, margin: '0 auto', textAlign: 'left', position: 'relative', zIndex: 2 }}>
        <div style={{ fontFamily: 'var(--font-mono)', fontSize: 11, fontWeight: 500, letterSpacing: '.18em', textTransform: 'uppercase', color: 'rgba(255,255,255,.5)', marginBottom: 24, display: 'flex', alignItems: 'center', gap: 14 }}>
          <span style={{ width: 24, height: 1, background: 'rgba(255,255,255,.3)', display: 'block' }} />
          {t('eyebrow')}
        </div>
        <h2 style={{ fontFamily: 'var(--font-display)', fontSize: 48, fontWeight: 600, lineHeight: 1.2, letterSpacing: '-0.025em', marginBottom: 48 }}>
          {t('headlineLine1Pre')}<em style={{ fontStyle: 'normal', fontWeight: 700 }}>{t('headlineEm')}</em>{t('headlineLine1Tail')}<br />{t('headlineLine2')}
        </h2>
        <div style={{ display: 'flex', gap: 24, flexWrap: 'wrap', alignItems: 'center', paddingTop: 32, borderTop: '1px solid rgba(255,255,255,.1)' }}>
          <Link href="/contact" style={{ fontFamily: 'var(--font-mono)', fontSize: 12, fontWeight: 600, letterSpacing: '.16em', textTransform: 'uppercase', padding: '16px 28px', color: 'var(--ink)', background: '#fff', display: 'inline-flex', alignItems: 'center', gap: 10 }}>
            {t('btn')}
          </Link>
        </div>
      </div>
    </section>
  );
}
