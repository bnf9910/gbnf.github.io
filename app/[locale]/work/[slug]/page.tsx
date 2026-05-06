import { setRequestLocale, getTranslations } from 'next-intl/server';
import { notFound } from 'next/navigation';
import { Link } from '@/i18n/routing';
import { CTABanner } from '@/components/sections/HomeSections';

interface PageProps {
  params: Promise<{ locale: string; slug: string }>;
}

const PLACEHOLDER_CASES: Record<string, {
  industry: string;
  title: string;
  result: string;
  cover: string;
  body: string;
}> = {
  'luxury-skincare-japan': {
    industry: 'SKINCARE · GLOBAL',
    title: '럭셔리 스킨케어 일본 진출',
    result: '론칭 6개월 매출 380% 성장, Qoo10 뷰티 카테고리 1위.',
    cover: 'https://images.unsplash.com/photo-1570172619644-dfd03ed5d881?w=1600&q=85',
    body: '10년차 한국 스킨케어 브랜드의 일본 진출을 위한 풀 리브랜딩. 네이밍부터 패키지·매장 디자인·런칭 캠페인까지 BnF가 통합 설계.',
  },
  'luxury-cheongdam-popup': {
    industry: 'LUXURY · POPUP',
    title: '명품 브랜드 청담 팝업 기획',
    result: '3주 방문객 24,000명, 미디어 80건 이상 보도.',
    cover: 'https://images.unsplash.com/photo-1556761175-5973dc0f32e7?w=1600&q=85',
    body: '글로벌 명품 브랜드의 한국 시장 재런칭 팝업. 청담동 단독 빌딩 3주 운영. VIP 인비테이션 + 미디어데이 + 일반 오픈 3단계.',
  },
  'gangnam-derma-mso': {
    industry: 'CLINIC · MSO',
    title: '강남 피부과 통합 캠페인',
    result: '월 신규 예약 4.2배 증가, ROAS 720%.',
    cover: 'https://images.unsplash.com/photo-1576091160550-2173dba999ef?w=1600&q=85',
    body: '연 매출 50억 규모의 강남 피부과. 월 광고비 8천만원의 운영 위탁. 구글·메타·네이버 통합 운영으로 신규 환자 창출에 집중.',
  },
};

export async function generateStaticParams() {
  return Object.keys(PLACEHOLDER_CASES).map((slug) => ({ slug }));
}

export default async function WorkDetailPage({ params }: PageProps) {
  const { locale, slug } = await params;
  setRequestLocale(locale);

  const data = PLACEHOLDER_CASES[slug];
  if (!data) notFound();

  const tCommon = await getTranslations({ locale, namespace: 'common' });

  const monoLabel: React.CSSProperties = {
    fontFamily: 'var(--font-mono)', fontSize: 11, letterSpacing: '0.16em',
    textTransform: 'uppercase', color: 'var(--gray-500)', fontWeight: 500,
  };

  return (
    <>
      <section style={{ padding: '160px 48px 80px', borderBottom: '1px solid var(--line)', background: 'var(--white)' }}>
        <div style={{ maxWidth: 1200, margin: '0 auto' }}>
          <nav style={{ ...monoLabel, marginBottom: 32, display: 'flex', alignItems: 'center', gap: 14 }}>
            <Link href="/" style={{ color: 'var(--gray-500)' }}>{tCommon('home')}</Link>
            <span style={{ color: 'var(--gray-400)' }}>/</span>
            <Link href="/work" style={{ color: 'var(--gray-500)' }}>WORK</Link>
            <span style={{ color: 'var(--gray-400)' }}>/</span>
            <span>{data.industry}</span>
          </nav>
          <div style={{ ...monoLabel, marginBottom: 24 }}>{data.industry}</div>
          <h1 style={{
            fontFamily: 'var(--font-display)', fontSize: 'clamp(40px, 5vw, 72px)',
            fontWeight: 600, lineHeight: 1.05, letterSpacing: '-0.03em',
            color: 'var(--ink)', marginBottom: 24, maxWidth: 900,
          }}>
            {data.title}
          </h1>
          <p style={{ fontSize: 19, lineHeight: 1.6, color: 'var(--gray-700)', maxWidth: 680 }}>
            {data.body}
          </p>
        </div>
      </section>

      <section style={{ background: 'var(--white)' }}>
        <div style={{
          width: '100%', aspectRatio: '16 / 9',
          backgroundImage: `url('${data.cover}')`,
          backgroundSize: 'cover', backgroundPosition: 'center',
        }} />
      </section>

      <section style={{ padding: '120px 48px', background: 'var(--bg)' }}>
        <div style={{ maxWidth: 800, margin: '0 auto' }}>
          <div style={{ ...monoLabel, marginBottom: 24 }}>RESULTS</div>
          <p style={{
            fontFamily: 'var(--font-display)', fontSize: 32, fontWeight: 600,
            lineHeight: 1.3, letterSpacing: '-0.025em', color: 'var(--ink)',
          }}>
            {data.result}
          </p>
        </div>
      </section>

      <section style={{ padding: '80px 48px', background: 'var(--white)', borderTop: '1px solid var(--line)', textAlign: 'center' }}>
        <Link href="/work" style={{
          fontFamily: 'var(--font-mono)', fontSize: 12, letterSpacing: '0.16em',
          textTransform: 'uppercase', color: 'var(--ink)', textDecoration: 'none',
          border: '1px solid var(--ink)', padding: '16px 28px',
          display: 'inline-flex', alignItems: 'center', gap: 8,
        }}>
          ← View All Work
        </Link>
      </section>

      <CTABanner />
    </>
  );
}
