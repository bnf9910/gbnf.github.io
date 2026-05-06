'use client';

import { useState } from 'react';
import { useTranslations } from 'next-intl';
import { Link } from '@/i18n/routing';

const CASES = [
  { id: 'skincare-japan', cat: 'branding global', img: 'https://images.unsplash.com/photo-1570172619644-dfd03ed5d881?w=1200&q=85', industry: 'SKINCARE · GLOBAL', year: '2024', title: '럭셔리 스킨케어 일본 진출', result: '<strong>론칭 6개월 매출 380% 성장</strong>, Qoo10 뷰티 카테고리 1위.' },
  { id: 'luxury-popup', cat: 'popup luxury', img: 'https://images.unsplash.com/photo-1556761175-5973dc0f32e7?w=1200&q=85', industry: 'LUXURY · POPUP', year: '2024', title: '명품 브랜드 청담 팝업 기획', result: '<strong>3주 방문객 24,000명</strong>, 미디어 80건 이상 보도.' },
  { id: 'clinic-mso', cat: 'mso performance', img: 'https://images.unsplash.com/photo-1576091160550-2173dba999ef?w=1200&q=85', industry: 'CLINIC · MSO', year: '2024', title: '강남 피부과 통합 캠페인', result: '<strong>월 신규 예약 4.2배 증가</strong>, ROAS 720%.' },
  { id: 'device-launch', cat: 'branding content', img: 'https://images.unsplash.com/photo-1522338242992-e1a54906a8da?w=1200&q=85', industry: 'DEVICE · LAUNCH', year: '2023', title: '홈 뷰티디바이스 브랜드 런칭', result: '<strong>론칭 90일 매출 12억</strong>, 와디즈 펀딩 1위.' },
  { id: 'derm-ads', cat: 'performance content', img: 'https://images.unsplash.com/photo-1487412947147-5cebf100ffc2?w=1200&q=85', industry: 'DERMATOLOGY · ADS', year: '2024', title: '피부과 의료광고 캠페인', result: '<strong>심의 통과율 100%</strong>, 신규 환자 3.6배 증가.' },
  { id: 'watch-event', cat: 'popup luxury', img: 'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=1200&q=85', industry: 'LUXURY · EVENT', year: '2024', title: '하이엔드 워치 런칭 이벤트', result: '<strong>VIP 200명 초청</strong>, 매출 18억 즉석 계약.' },
  { id: 'kbeauty-china', cat: 'global', img: 'https://images.unsplash.com/photo-1542838132-92c53300491e?w=1200&q=85', industry: 'K-BEAUTY · CHINA', year: '2023', title: 'K-뷰티 브랜드 중국 진출', result: '<strong>샤오홍슈 팔로워 8만</strong>, 더우인 라이브 매출 7억.' },
  { id: 'plastic-rebrand', cat: 'mso branding', img: 'https://images.unsplash.com/photo-1631815589968-fdb09a223b1e?w=1200&q=85', industry: 'PLASTIC SURGERY', year: '2023', title: '성형외과 리브랜딩 + 경영지원', result: '<strong>객단가 35% 상승</strong>, 환자 만족도 9.2점.' },
  { id: 'cosmetic-video', cat: 'content performance', img: 'https://images.unsplash.com/photo-1607082348824-0a96f2a4b9da?w=1200&q=85', industry: 'COSMETICS · VIDEO', year: '2024', title: '화장품 브랜드 시즌 캠페인', result: '<strong>유튜브 노출 1,800만</strong>, 캠페인 ROAS 540%.' },
  { id: 'cosmetic-renew', cat: 'branding', img: 'https://images.unsplash.com/photo-1556228720-195a672e8a03?w=1200&q=85', industry: 'SKINCARE · REBRAND', year: '2024', title: '15년차 코스메틱 브랜드 리뉴얼', result: '<strong>리뉴얼 후 매출 220% 성장</strong>, 20대 신규 고객 65% 증가.' },
  { id: 'corp-conf', cat: 'popup', img: 'https://images.unsplash.com/photo-1492684223066-81342ee5ff30?w=1200&q=85', industry: 'CORPORATE · EVENT', year: '2024', title: '대기업 신년 미디어 컨퍼런스', result: '미디어 200매체 참석, <strong>온라인 라이브 동시 시청 12만</strong>.' },
  { id: 'medical-tourism', cat: 'global mso', img: 'https://images.unsplash.com/photo-1606220588913-b3aacb4d2f37?w=1200&q=85', industry: 'MEDICAL TOURISM', year: '2024', title: '의료관광 패키지 글로벌 마케팅', result: '<strong>해외 환자 2.4배 유치</strong>, 평균 체류 6.2일.' },
];

export default function WorkPageClient() {
  const t = useTranslations('work');
  const tCommon = useTranslations('common');
  const [filter, setFilter] = useState('all');

  const filterKeys = ['all', 'branding', 'performance', 'content', 'popup', 'global', 'mso', 'luxury'];
  const visible = filter === 'all' ? CASES : CASES.filter((c) => c.cat.split(' ').includes(filter));

  return (
    <>
      <section style={{ padding: '160px 48px 80px', borderBottom: '1px solid var(--line)', background: 'var(--white)' }}>
        <div style={{ maxWidth: 1200, margin: '0 auto' }}>
          <nav style={{ fontFamily: 'var(--font-mono)', fontSize: 11, letterSpacing: '.16em', textTransform: 'uppercase', color: 'var(--gray-500)', marginBottom: 32, display: 'flex', alignItems: 'center', gap: 14 }}>
            <Link href="/" style={{ color: 'var(--gray-500)' }}>{tCommon('home')}</Link>
            <span style={{ color: 'var(--gray-400)' }}>/</span>
            <span>WORK</span>
          </nav>
          <h1 style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(48px, 6vw, 88px)', fontWeight: 600, lineHeight: 1.05, letterSpacing: '-0.03em', color: 'var(--ink)', marginBottom: 24, maxWidth: 900 }}>
            <em style={{ fontStyle: 'normal', fontWeight: 700 }}>{t('headlineEm')}</em><br />{t('headlineTail')}
          </h1>
          <p style={{ fontSize: 19, lineHeight: 1.6, color: 'var(--gray-700)', maxWidth: 680 }}>{t('lede')}</p>
        </div>
      </section>

      <div style={{ padding: '32px 48px', background: 'rgba(255,255,255,.92)', borderBottom: '1px solid var(--line)', position: 'sticky', top: 60, zIndex: 50, backdropFilter: 'blur(18px)' }}>
        <div style={{ maxWidth: 1200, margin: '0 auto', display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: 32, flexWrap: 'wrap' }}>
          <ul style={{ display: 'flex', gap: 6, listStyle: 'none', flexWrap: 'wrap' }}>
            {filterKeys.map((f) => (
              <li key={f}>
                <button
                  onClick={() => setFilter(f)}
                  style={{
                    fontFamily: 'var(--font-mono)', fontSize: 11, fontWeight: 500, letterSpacing: '.12em', textTransform: 'uppercase',
                    color: filter === f ? '#fff' : 'var(--gray-500)',
                    padding: '8px 14px',
                    border: '1px solid ' + (filter === f ? 'var(--ink)' : 'var(--line-strong)'),
                    background: filter === f ? 'var(--ink)' : 'transparent',
                    borderRadius: 2,
                  }}
                >
                  {t(`filters.${f}` as any)}
                </button>
              </li>
            ))}
          </ul>
          <span style={{ fontFamily: 'var(--font-mono)', fontSize: 11, color: 'var(--gray-500)', letterSpacing: '.1em' }}>
            {visible.length}{t('countSuffix')}
          </span>
        </div>
      </div>

      <section style={{ padding: '64px 48px 120px', background: 'var(--white)' }}>
        <div style={{ maxWidth: 1200, margin: '0 auto', display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '48px 32px' }}>
          {visible.map((c) => (
            <a key={c.id} style={{ cursor: 'pointer', display: 'block' }}>
              <div style={{ width: '100%', aspectRatio: '4/3', overflow: 'hidden', marginBottom: 20, background: 'var(--paper)' }}>
                <img src={c.img} alt="" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontFamily: 'var(--font-mono)', fontSize: 10, letterSpacing: '.14em', textTransform: 'uppercase', color: 'var(--gray-500)', marginBottom: 10 }}>
                <span style={{ color: 'var(--ink)', fontWeight: 600 }}>{c.industry}</span>
                <span>{c.year}</span>
              </div>
              <h3 style={{ fontFamily: 'var(--font-display)', fontSize: 22, fontWeight: 600, lineHeight: 1.25, letterSpacing: '-0.02em', color: 'var(--ink)', marginBottom: 8 }}>{c.title}</h3>
              <p style={{ fontSize: 14, color: 'var(--gray-700)', lineHeight: 1.55 }} dangerouslySetInnerHTML={{ __html: c.result }} />
            </a>
          ))}
        </div>
      </section>
    </>
  );
}
