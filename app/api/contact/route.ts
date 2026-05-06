import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';
import { getResend, RESEND_FROM, RESEND_TO } from '@/lib/resend';
import ContactNotification from '@/emails/ContactNotification';
import ContactAutoReply from '@/emails/ContactAutoReply';

// 빌드 타임 정적 분석을 비활성화 — 이 라우트는 항상 동적으로 실행됨
export const dynamic = 'force-dynamic';
export const runtime = 'nodejs';

// =============================================================================
// 스키마 검증
// =============================================================================

const ContactSchema = z.object({
  company: z.string().min(1, 'Company is required').max(100),
  name: z.string().min(1, 'Name is required').max(50),
  position: z.string().max(50).optional().default(''),
  phone: z.string().min(1, 'Phone is required').max(30),
  email: z.string().email('Invalid email'),
  services: z.array(z.string()).optional(),
  budget: z.string().optional(),
  message: z.string().min(10, 'Message too short').max(3000),
  locale: z.string().default('ko'),
  turnstileToken: z.string().optional(),
  // 허니팟 (봇 차단)
  website: z.string().optional(),
});

// =============================================================================
// Cloudflare Turnstile 검증
// =============================================================================

async function verifyTurnstile(token: string, ip: string): Promise<boolean> {
  if (!process.env.TURNSTILE_SECRET_KEY) {
    console.warn('[turnstile] Secret key not set, skipping verification');
    return true;
  }

  try {
    const res = await fetch(
      'https://challenges.cloudflare.com/turnstile/v0/siteverify',
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          secret: process.env.TURNSTILE_SECRET_KEY,
          response: token,
          remoteip: ip,
        }),
      }
    );
    const data = await res.json();
    return data.success === true;
  } catch (error) {
    console.error('[turnstile] verification failed:', error);
    return false;
  }
}

// =============================================================================
// 간단한 인메모리 레이트 리미터 (프로덕션은 Upstash Redis 권장)
// =============================================================================

const rateLimitMap = new Map<string, { count: number; resetAt: number }>();
const RATE_LIMIT = 5; // 1시간당 5회
const RATE_WINDOW = 60 * 60 * 1000;

function checkRateLimit(ip: string): boolean {
  const now = Date.now();
  const entry = rateLimitMap.get(ip);

  if (!entry || now > entry.resetAt) {
    rateLimitMap.set(ip, { count: 1, resetAt: now + RATE_WINDOW });
    return true;
  }

  if (entry.count >= RATE_LIMIT) return false;
  entry.count++;
  return true;
}

// =============================================================================
// POST /api/contact
// =============================================================================

export async function POST(req: NextRequest) {
  const ip =
    req.headers.get('x-forwarded-for')?.split(',')[0] ||
    req.headers.get('x-real-ip') ||
    'unknown';

  // 레이트 리미트
  if (!checkRateLimit(ip)) {
    return NextResponse.json(
      { error: 'Too many requests. Please try again later.' },
      { status: 429 }
    );
  }

  try {
    const body = await req.json();
    const data = ContactSchema.parse(body);

    // 허니팟: 봇이 채운 경우 성공한 것처럼 응답하되 메일은 보내지 않음
    if (data.website) {
      console.warn('[contact] honeypot triggered from', ip);
      return NextResponse.json({ ok: true });
    }

    // Turnstile 검증
    if (data.turnstileToken) {
      const valid = await verifyTurnstile(data.turnstileToken, ip);
      if (!valid) {
        return NextResponse.json(
          { error: 'Verification failed. Please try again.' },
          { status: 400 }
        );
      }
    }

    if (!process.env.RESEND_API_KEY) {
      console.error('[contact] RESEND_API_KEY not configured');
      return NextResponse.json(
        { error: 'Email service not configured' },
        { status: 500 }
      );
    }

    // 1. 회사로 알림 메일 발송
    const resend = getResend();
    const notificationRes = await resend.emails.send({
      from: `B&F Website <${RESEND_FROM}>`,
      to: RESEND_TO,
      replyTo: data.email,
      subject: `[B&F Inquiry] ${data.company} — ${data.name}`,
      react: ContactNotification(data),
    });

    if (notificationRes.error) {
      console.error('[contact] notification failed:', notificationRes.error);
      throw new Error('Failed to send notification');
    }

    // 2. 사용자 자동 응답 메일 발송
    const autoReplySubject = getAutoReplySubject(data.locale);
    await resend.emails.send({
      from: `B&F <${RESEND_FROM}>`,
      to: data.email,
      subject: autoReplySubject,
      react: ContactAutoReply({ name: data.name, locale: data.locale }),
    });

    return NextResponse.json({ ok: true });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { error: 'Validation failed', issues: error.issues },
        { status: 400 }
      );
    }

    console.error('[contact] error:', error);
    return NextResponse.json(
      { error: 'Server error. Please try again.' },
      { status: 500 }
    );
  }
}

function getAutoReplySubject(locale: string): string {
  const map: Record<string, string> = {
    ko: '[B&F] 문의가 정상 접수되었습니다',
    en: '[B&F] We received your inquiry',
    ja: '[B&F] お問い合わせを受け付けました',
    'zh-CN': '[B&F] 我们已收到您的咨询',
    'zh-TW': '[B&F] 我們已收到您的諮詢',
    mn: '[B&F] Таны хүсэлтийг хүлээн авлаа',
    fil: '[B&F] Natanggap namin ang inyong inquiry',
    th: '[B&F] เราได้รับคำถามของคุณแล้ว',
    vi: '[B&F] Chúng tôi đã nhận được yêu cầu của bạn',
  };
  return map[locale] || map.en;
}
