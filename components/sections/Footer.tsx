import { useTranslations } from 'next-intl';
import { Link } from '@/i18n/routing';
import { routing, localeLabels } from '@/i18n/routing';

export function Footer() {
  const t = useTranslations();

  return (
    <footer style={{ background: 'var(--ink)', color: 'rgba(255,255,255,.6)', padding: '64px 48px 32px', borderTop: '1px solid rgba(255,255,255,.08)' }}>
      <div style={{ maxWidth: 1200, margin: '0 auto', display: 'grid', gridTemplateColumns: '1.5fr 1fr 1fr 1fr', gap: 64 }}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 16, maxWidth: 300 }}>
          <img src="/bnf-logo-light.png" alt="BnF" style={{ width: 32, height: 32 }} />
          <div style={{ fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: 18, color: '#fff', letterSpacing: '.04em' }}>BnF</div>
          <p style={{ fontSize: 13, lineHeight: 1.6, color: 'rgba(255,255,255,.5)' }}>{t('footer.tagline')}</p>
        </div>

        <div>
          <h4 style={{ fontFamily: 'var(--font-mono)', fontSize: 11, letterSpacing: '.16em', textTransform: 'uppercase', color: 'rgba(255,255,255,.5)', marginBottom: 18, fontWeight: 500 }}>
            {t('footer.servicesTitle')}
          </h4>
          <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: 10 }}>
            {(['branding', 'performance', 'content', 'social', 'pr', 'global', 'mso', 'martech'] as const).map((s) => (
              <li key={s}>
                <Link href={`/services/${s}` as any} style={{ fontSize: 13, color: 'rgba(255,255,255,.7)' }}>
                  {(t.raw(`services.items.${s}.titleMain`) + t.raw(`services.items.${s}.titleEm`))}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h4 style={{ fontFamily: 'var(--font-mono)', fontSize: 11, letterSpacing: '.16em', textTransform: 'uppercase', color: 'rgba(255,255,255,.5)', marginBottom: 18, fontWeight: 500 }}>
            {t('footer.companyTitle')}
          </h4>
          <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: 10 }}>
            <li><Link href="/about" style={{ fontSize: 13, color: 'rgba(255,255,255,.7)' }}>{t('footer.companyLinks.about')}</Link></li>
            <li><Link href="/contact" style={{ fontSize: 13, color: 'rgba(255,255,255,.7)' }}>{t('footer.companyLinks.contact')}</Link></li>
          </ul>
        </div>

        <div>
          <h4 style={{ fontFamily: 'var(--font-mono)', fontSize: 11, letterSpacing: '.16em', textTransform: 'uppercase', color: 'rgba(255,255,255,.5)', marginBottom: 18, fontWeight: 500 }}>
            {t('footer.contactTitle')}
          </h4>
          <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: 10 }}>
            <li><a href="mailto:info@gbnf.kr" style={{ fontSize: 13, color: 'rgba(255,255,255,.7)' }}>info@gbnf.kr</a></li>
            <li><a href="tel:0225889910" style={{ fontSize: 13, color: 'rgba(255,255,255,.7)' }}>02-588-9910</a></li>
            <li style={{ fontSize: 13, color: 'rgba(255,255,255,.7)' }}>{t('contact.addressValue')}</li>
          </ul>
        </div>
      </div>

      <div style={{ maxWidth: 1200, margin: '48px auto 0', paddingTop: 28, borderTop: '1px solid rgba(255,255,255,.08)', display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontFamily: 'var(--font-mono)', fontSize: 11, letterSpacing: '.1em', color: 'rgba(255,255,255,.4)' }}>
        <span>{t('footer.copyright')}</span>
        <div style={{ display: 'flex', gap: 14 }}>
          {routing.locales.slice(0, 4).map((loc) => (
            <Link key={loc} href="/" locale={loc} style={{ color: 'rgba(255,255,255,.4)' }}>
              {localeLabels[loc]}
            </Link>
          ))}
          <span>+5</span>
        </div>
      </div>
    </footer>
  );
}
