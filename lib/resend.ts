import { Resend } from 'resend';

/**
 * Lazy-initialized Resend client.
 *
 * 빌드 타임(환경변수가 없는 시점)에 `new Resend()`가 즉시 호출되면
 * "Missing API key" 에러로 빌드가 실패합니다. 따라서 모듈 로드 시점이 아닌
 * 실제 호출 시점에 클라이언트를 생성합니다.
 */
let _resend: Resend | null = null;

export function getResend(): Resend {
  if (_resend) return _resend;

  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) {
    throw new Error(
      '[resend] RESEND_API_KEY is not set. Configure it in your environment to enable email features.'
    );
  }

  _resend = new Resend(apiKey);
  return _resend;
}

export const RESEND_FROM = process.env.RESEND_FROM || 'noreply@gbnf.kr';
export const RESEND_TO = process.env.RESEND_TO || 'info@gbnf.kr';
