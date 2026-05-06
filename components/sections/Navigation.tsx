'use client';

import { useEffect, useState } from 'react';
import { useTranslations, useLocale } from 'next-intl';
import { Link, usePathname } from '@/i18n/routing';
import { routing, localeLabels, type Locale } from '@/i18n/routing';

export function Navigation() {
  const t = useTranslations('nav');
  const locale = useLocale() as Locale;
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [showLocaleMenu, setShowLocaleMenu] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 30);
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const isActive = (path: string) => pathname.startsWith(path);

  return (
    <nav
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        zIndex: 100,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: scrolled ? '14px 48px' : '20px 48px',
        background: 'rgba(255,255,255,.92)',
        backdropFilter: 'saturate(180%) blur(18px)',
        WebkitBackdropFilter: 'saturate(180%) blur(18px)',
        borderBottom: scrolled ? '1px solid var(--line)' : '1px solid transparent',
        transition: 'padding .3s ease, border-color .3s ease',
      }}
    >
      <Link href="/" style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
        <img src="/bnf-logo-dark.png" alt="BnF" style={{ width: 32, height: 32, objectFit: 'contain' }} />
        <span style={{ fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: 18, letterSpacing: '.04em', color: 'var(--ink)' }}>
          BnF
        </span>
      </Link>

      <ul className="hidden md:flex" style={{ gap: 42, listStyle: 'none' }}>
        {[
          { href: '/work', label: t('work') },
          { href: '/services', label: t('services') },
          { href: '/about', label: t('about') },
          { href: '/contact', label: t('contact') },
        ].map((item) => (
          <li key={item.href}>
            <Link
              href={item.href}
              style={{
                fontSize: 13,
                fontWeight: 500,
                letterSpacing: '.12em',
                textTransform: 'uppercase',
                color: 'var(--ink)',
                position: 'relative',
                padding: '6px 0',
                borderBottom: isActive(item.href) ? '1px solid var(--ink)' : '1px solid transparent',
              }}
            >
              {item.label}
            </Link>
          </li>
        ))}
      </ul>

      <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
        {/* Locale switcher */}
        <div style={{ position: 'relative' }}>
          <button
            onClick={() => setShowLocaleMenu((v) => !v)}
            style={{
              fontFamily: 'var(--font-mono)',
              fontSize: 11,
              fontWeight: 500,
              letterSpacing: '.14em',
              color: 'var(--gray-500)',
              padding: '8px 12px',
              border: '1px solid var(--line-strong)',
              borderRadius: 2,
            }}
          >
            {localeLabels[locale]} ▾
          </button>
          {showLocaleMenu && (
            <ul
              style={{
                position: 'absolute',
                right: 0,
                top: '100%',
                marginTop: 4,
                listStyle: 'none',
                background: '#fff',
                border: '1px solid var(--line-strong)',
                minWidth: 120,
                boxShadow: '0 4px 12px rgba(0,0,0,.08)',
              }}
            >
              {routing.locales.map((loc) => (
                <li key={loc}>
                  <Link
                    href={pathname}
                    locale={loc}
                    onClick={() => setShowLocaleMenu(false)}
                    style={{
                      display: 'block',
                      padding: '10px 14px',
                      fontFamily: 'var(--font-mono)',
                      fontSize: 11,
                      letterSpacing: '.14em',
                      color: loc === locale ? 'var(--ink)' : 'var(--gray-500)',
                      fontWeight: loc === locale ? 600 : 400,
                    }}
                  >
                    {localeLabels[loc]}
                  </Link>
                </li>
              ))}
            </ul>
          )}
        </div>

        <Link
          href="/contact"
          style={{
            fontSize: 12,
            fontWeight: 600,
            letterSpacing: '.16em',
            textTransform: 'uppercase',
            color: '#fff',
            background: 'var(--ink)',
            padding: '12px 22px',
          }}
        >
          {t('cta')}
        </Link>
      </div>
    </nav>
  );
}
