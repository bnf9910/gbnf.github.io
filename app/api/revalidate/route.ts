import { NextRequest, NextResponse } from 'next/server';
import { revalidatePath, revalidateTag } from 'next/cache';

/**
 * Notion에서 글 업데이트 시 Make/Zapier로 이 엔드포인트 호출
 * → 즉시 사이트 캐시 무효화하여 최신 콘텐츠 반영
 *
 * POST /api/revalidate
 * Header: Authorization: Bearer {REVALIDATE_SECRET}
 * Body: { path?: string, tag?: string }
 */
export async function POST(req: NextRequest) {
  const authHeader = req.headers.get('authorization');
  const secret = process.env.REVALIDATE_SECRET;

  if (!secret) {
    return NextResponse.json(
      { error: 'Revalidate secret not configured' },
      { status: 500 }
    );
  }

  if (authHeader !== `Bearer ${secret}`) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    const body = await req.json().catch(() => ({}));
    const { path, tag } = body;

    if (path) {
      revalidatePath(path);
    } else if (tag) {
      revalidateTag(tag);
    } else {
      // 기본: 인사이트 전체 재검증
      revalidatePath('/[locale]/insights', 'page');
      revalidatePath('/[locale]/work', 'page');
    }

    return NextResponse.json({
      revalidated: true,
      now: Date.now(),
      path,
      tag,
    });
  } catch (error) {
    console.error('[revalidate] error:', error);
    return NextResponse.json({ error: 'Revalidation failed' }, { status: 500 });
  }
}
