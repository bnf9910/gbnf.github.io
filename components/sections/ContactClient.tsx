'use client';

import { useState, FormEvent } from 'react';
import { Link } from '@/i18n/routing';

interface Msg {
  locale: string;
  headlineLine1: string;
  headlineEm: string;
  headlineTail: string;
  lede: string;
  home: string;
  infoHeadingMain: string;
  infoHeadingEm: string;
  infoSub: string;
  label: {
    company: string; name: string; position: string; phone: string; email: string;
    type: string; budget: string; message: string;
    emailL: string; phoneL: string; locationL: string; hoursL: string; careersL: string;
    addressL: string; transitL: string; parkingL: string;
  };
  placeholder: {
    company: string; name: string; position: string; phone: string; email: string;
    select: string; message: string;
  };
  typeOptions: string[];
  budgetOptions: string[];
  submit: string;
  submitNote: string;
  successMessage: string;
  hoursValue: string;
  addressValue: string;
  transitValue: string;
  parkingValue: string;
  studioHeading: string;
  studioHeadingEm: string;
  studioDesc: string;
  faqLabel: string;
  faqHeading: string;
  faqHeadingEm: string;
  faqSub: string;
  faq: Array<{ q: string; a: string }>;
}

const em: React.CSSProperties = { fontStyle: 'normal', fontWeight: 700 };
const monoLabel: React.CSSProperties = {
  fontFamily: 'var(--font-mono)', fontSize: 11, letterSpacing: '0.16em',
  textTransform: 'uppercase', color: 'var(--gray-500)', fontWeight: 500,
};
const fieldInput: React.CSSProperties = {
  background: 'transparent', border: 0, borderBottom: '1px solid var(--line-strong)',
  padding: '14px 0 12px', fontSize: 15, color: 'var(--ink)', outline: 'none',
  fontFamily: 'inherit', width: '100%',
};

export default function ContactClient({ m }: { m: Msg }) {
  const [submitting, setSubmitting] = useState(false);
  const [status, setStatus] = useState<'idle' | 'success' | 'error'>('idle');
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setSubmitting(true);
    setStatus('idle');
    const fd = new FormData(e.currentTarget);
    const body = {
      company: String(fd.get('company') || ''),
      name: String(fd.get('name') || ''),
      position: String(fd.get('position') || ''),
      phone: String(fd.get('phone') || ''),
      email: String(fd.get('email') || ''),
      services: fd.get('type') ? [String(fd.get('type'))] : [],
      budget: String(fd.get('budget') || ''),
      message: String(fd.get('message') || ''),
      locale: m.locale,
      website: String(fd.get('website') || ''),
    };
    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body),
      });
      if (!res.ok) throw new Error('Failed');
      setStatus('success');
      (e.target as HTMLFormElement).reset();
    } catch {
      setStatus('error');
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <>
      {/* PAGE HERO */}
      <section style={{ padding: '160px 48px 80px', borderBottom: '1px solid var(--line)', background: 'var(--white)' }}>
        <div style={{ maxWidth: 1200, margin: '0 auto' }}>
          <nav style={{ ...monoLabel, marginBottom: 32, display: 'flex', alignItems: 'center', gap: 14 }}>
            <Link href="/" style={{ color: 'var(--gray-500)' }}>{m.home}</Link>
            <span style={{ color: 'var(--gray-400)' }}>/</span>
            <span>CONTACT</span>
          </nav>
          <h1 style={{
            fontFamily: 'var(--font-display)', fontSize: 'clamp(48px, 6vw, 88px)',
            fontWeight: 600, lineHeight: 1.05, letterSpacing: '-0.03em',
            color: 'var(--ink)', marginBottom: 24, maxWidth: 900,
          }}>
            {m.headlineLine1}<em style={em}>{m.headlineEm}</em>{m.headlineTail}
          </h1>
          <p style={{ fontSize: 19, lineHeight: 1.6, color: 'var(--gray-700)', maxWidth: 680 }}>
            {m.lede}
          </p>
        </div>
      </section>

      {/* CONTACT FORM + INFO */}
      <section style={{ padding: '120px 48px', background: 'var(--white)' }}>
        <div style={{
          maxWidth: 1200, margin: '0 auto',
          display: 'grid', gridTemplateColumns: '1fr 1.4fr', gap: 96, alignItems: 'start',
        }}>
          {/* LEFT: INFO */}
          <div className="reveal">
            <h2 style={{
              fontFamily: 'var(--font-display)', fontSize: 38, fontWeight: 600,
              lineHeight: 1.25, letterSpacing: '-0.025em', color: 'var(--ink)', marginBottom: 24,
            }}>
              {m.infoHeadingMain}<em style={em}>{m.infoHeadingEm}</em>
            </h2>
            <p style={{ fontSize: 16, lineHeight: 1.6, color: 'var(--gray-700)', marginBottom: 48, maxWidth: 380 }}>
              {m.infoSub}
            </p>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 28, paddingTop: 32, borderTop: '1px solid var(--line)' }}>
              <InfoRow label={m.label.emailL} value="info@gbnf.kr" href="mailto:info@gbnf.kr" />
              <InfoRow label={m.label.phoneL} value="02-588-9910" href="tel:0225889910" />
              <InfoRow label={m.label.locationL} value={m.addressValue} />
              <InfoRow label={m.label.hoursL} value={m.hoursValue} />
              <InfoRow label={m.label.careersL} value="careers@gbnf.kr" href="mailto:careers@gbnf.kr" />
            </div>
          </div>

          {/* RIGHT: FORM */}
          <form className="reveal" onSubmit={handleSubmit} style={{
            display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 24,
          }}>
            <Field label={m.label.company} name="company" required ph={m.placeholder.company} />
            <Field label={m.label.name} name="name" required ph={m.placeholder.name} />
            <Field label={m.label.position} name="position" ph={m.placeholder.position} />
            <Field label={m.label.phone} name="phone" type="tel" required ph={m.placeholder.phone} />
            <Field label={m.label.email} name="email" type="email" required ph={m.placeholder.email} full />
            <Select label={m.label.type} name="type" required ph={m.placeholder.select} options={m.typeOptions} />
            <Select label={m.label.budget} name="budget" ph={m.placeholder.select} options={m.budgetOptions} />
            <TextArea label={m.label.message} name="message" required ph={m.placeholder.message} />

            {/* Honeypot */}
            <input
              type="text" name="website" tabIndex={-1} autoComplete="off"
              aria-hidden="true"
              style={{ position: 'absolute', left: -9999, top: -9999, opacity: 0 }}
            />

            {status === 'success' && (
              <div style={{ gridColumn: '1 / -1', fontSize: 14, color: '#15803d', padding: '12px 0' }}>
                {m.successMessage}
              </div>
            )}
            {status === 'error' && (
              <div style={{ gridColumn: '1 / -1', fontSize: 14, color: '#dc2626', padding: '12px 0' }}>
                ERROR — please try again later.
              </div>
            )}

            <div style={{
              gridColumn: '1 / -1',
              display: 'flex', justifyContent: 'space-between', alignItems: 'center',
              gap: 24, paddingTop: 32, borderTop: '1px solid var(--line)', marginTop: 16,
              flexWrap: 'wrap',
            }}>
              <p style={{ ...monoLabel, fontSize: 11, maxWidth: 320, lineHeight: 1.6, textTransform: 'none' }}>
                {m.submitNote}
              </p>
              <button type="submit" disabled={submitting} style={{
                fontFamily: 'var(--font-mono)', fontSize: 12, fontWeight: 600,
                letterSpacing: '0.16em', textTransform: 'uppercase',
                padding: '18px 36px', color: 'var(--white)', background: 'var(--ink)',
                border: 0, cursor: submitting ? 'not-allowed' : 'pointer',
                display: 'inline-flex', alignItems: 'center', gap: 10,
                opacity: submitting ? 0.5 : 1,
              }}>
                {submitting ? '…' : m.submit} →
              </button>
            </div>
          </form>
        </div>
      </section>

      {/* LOCATION */}
      <section style={{ padding: '0 48px 120px', background: 'var(--white)' }}>
        <div style={{ maxWidth: 1200, margin: '0 auto' }}>
          <div style={{
            display: 'grid', gridTemplateColumns: '1.4fr 1fr', gap: 64, alignItems: 'start',
            paddingTop: 80, borderTop: '1px solid var(--line)',
          }}>
            <div className="reveal" style={{
              aspectRatio: '5 / 3', backgroundSize: 'cover', backgroundPosition: 'center',
              backgroundImage: "url('https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=1400&q=85')",
              border: '1px solid var(--line)',
            }} />
            <div className="reveal">
              <h3 style={{
                fontFamily: 'var(--font-display)', fontSize: 32, fontWeight: 600,
                lineHeight: 1.25, letterSpacing: '-0.025em', color: 'var(--ink)', marginBottom: 24,
              }}>
                {m.studioHeading}<em style={em}>{m.studioHeadingEm}</em>
              </h3>
              <p style={{ fontSize: 16, lineHeight: 1.6, color: 'var(--gray-700)', marginBottom: 24 }}>
                {m.studioDesc}
              </p>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 18, paddingTop: 24, borderTop: '1px solid var(--line)' }}>
                <Meta label={m.label.addressL} value={m.addressValue} />
                <Meta label={m.label.transitL} value={m.transitValue} />
                <Meta label={m.label.parkingL} value={m.parkingValue} />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section style={{ padding: '120px 48px', background: 'var(--bg)' }}>
        <div style={{ maxWidth: 900, margin: '0 auto' }}>
          <div className="reveal" style={{ marginBottom: 48, textAlign: 'center' }}>
            <div style={{ ...monoLabel, marginBottom: 16 }}>{m.faqLabel}</div>
            <h2 style={{
              fontFamily: 'var(--font-display)', fontSize: 38, fontWeight: 600,
              lineHeight: 1.2, letterSpacing: '-0.025em', color: 'var(--ink)', marginBottom: 16,
            }}>
              {m.faqHeading}<em style={em}>{m.faqHeadingEm}</em>
            </h2>
            <p style={{ fontSize: 16, color: 'var(--gray-700)' }}>{m.faqSub}</p>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', borderTop: '1px solid var(--line)' }}>
            {m.faq.map((item, i) => (
              <div
                key={i}
                onClick={() => setOpenFaq(openFaq === i ? null : i)}
                style={{ borderBottom: '1px solid var(--line)', padding: '24px 0', cursor: 'pointer' }}
              >
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: 24 }}>
                  <h3 style={{
                    fontFamily: 'var(--font-display)', fontSize: 18, fontWeight: 600,
                    color: 'var(--ink)', lineHeight: 1.4, letterSpacing: '-0.01em', margin: 0,
                  }}>{item.q}</h3>
                  <span style={{
                    fontFamily: 'var(--font-mono)', fontSize: 18, color: 'var(--gray-500)',
                    lineHeight: 1, transform: openFaq === i ? 'rotate(45deg)' : 'rotate(0)',
                    transition: 'transform 200ms ease', flexShrink: 0,
                  }}>+</span>
                </div>
                {openFaq === i && (
                  <p style={{ fontSize: 15, lineHeight: 1.7, color: 'var(--gray-700)', marginTop: 16, marginBottom: 0 }}>
                    {item.a}
                  </p>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}

function InfoRow({ label, value, href }: { label: string; value: string; href?: string }) {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
      <span style={{ ...monoLabel, fontSize: 10, letterSpacing: '0.16em' }}>{label}</span>
      {href ? (
        <a href={href} style={{ fontSize: 16, color: 'var(--ink)', fontWeight: 500, textDecoration: 'none' }}>{value}</a>
      ) : (
        <span style={{ fontSize: 16, color: 'var(--ink)', fontWeight: 500 }}>{value}</span>
      )}
    </div>
  );
}

function Meta({ label, value }: { label: string; value: string }) {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
      <span style={{ ...monoLabel, fontSize: 10 }}>{label}</span>
      <span style={{ fontSize: 14, color: 'var(--ink)' }}>{value}</span>
    </div>
  );
}

function Field({
  label, name, type = 'text', required, ph, full,
}: { label: string; name: string; type?: string; required?: boolean; ph?: string; full?: boolean }) {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 8, ...(full ? { gridColumn: '1 / -1' } : {}) }}>
      <label style={{ ...monoLabel, fontSize: 10, letterSpacing: '0.14em' }}>
        {label} {required && <span style={{ color: 'var(--gold)', marginLeft: 4 }}>*</span>}
      </label>
      <input type={type} name={name} required={required} placeholder={ph} style={fieldInput} />
    </div>
  );
}

function Select({
  label, name, required, ph, options,
}: { label: string; name: string; required?: boolean; ph?: string; options: string[] }) {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
      <label style={{ ...monoLabel, fontSize: 10, letterSpacing: '0.14em' }}>
        {label} {required && <span style={{ color: 'var(--gold)', marginLeft: 4 }}>*</span>}
      </label>
      <select name={name} required={required} defaultValue="" style={{
        ...fieldInput, appearance: 'none', cursor: 'pointer', paddingRight: 24,
        backgroundImage: `url("data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='12' height='8' viewBox='0 0 12 8'><path fill='none' stroke='%23737373' stroke-width='1.5' d='M1 1l5 5 5-5'/></svg>")`,
        backgroundRepeat: 'no-repeat', backgroundPosition: 'right 4px center',
      }}>
        <option value="">{ph}</option>
        {options.map((o) => (<option key={o} value={o}>{o}</option>))}
      </select>
    </div>
  );
}

function TextArea({ label, name, required, ph }: { label: string; name: string; required?: boolean; ph?: string }) {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 8, gridColumn: '1 / -1' }}>
      <label style={{ ...monoLabel, fontSize: 10, letterSpacing: '0.14em' }}>
        {label} {required && <span style={{ color: 'var(--gold)', marginLeft: 4 }}>*</span>}
      </label>
      <textarea name={name} required={required} placeholder={ph} rows={6} style={{
        ...fieldInput, resize: 'vertical', lineHeight: 1.6, fontFamily: 'var(--font-sans)',
      }} />
    </div>
  );
}
