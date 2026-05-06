# B&F (gbnf.kr) — Multilingual IMC Marketing Website (v9)

의료·뷰티 산업 IMC 마케팅 그룹 **BnF**의 다국어 PR 웹사이트. 9개 언어 지원, Notion CMS 연동, Resend 메일 통합, Vercel 배포 최적화.

## 프로젝트 구조

```
gbnf-final/
├── app/
│   ├── [locale]/          # 다국어 라우트 (ko 기본 + 8개 언어)
│   │   ├── page.tsx       # 메인
│   │   ├── about/         # ABOUT US
│   │   ├── services/      # SERVICES (인덱스 + 8개 상세 [slug])
│   │   ├── work/          # WORK (인덱스 + 케이스 [slug])
│   │   ├── contact/       # CONTACT
│   │   └── layout.tsx
│   ├── api/
│   │   ├── contact/       # POST /api/contact (Resend + Turnstile)
│   │   └── revalidate/    # POST /api/revalidate (Notion 웹훅)
│   ├── globals.css
│   ├── robots.ts
│   └── sitemap.ts
├── components/
│   ├── motion/            # 애니메이션 컴포넌트
│   ├── sections/          # Hero, Navigation, Footer, ContactClient, WorkClient, HomeSections
│   └── ui/
├── emails/                # ContactNotification, ContactAutoReply
├── i18n/
│   ├── messages/          # 9개 언어 번역 JSON
│   ├── routing.ts         # next-intl 라우팅
│   └── request.ts
├── lib/
│   ├── notion.ts          # Notion 클라이언트 + 타입
│   ├── resend.ts          # Resend lazy init
│   ├── service-data.ts
│   └── utils.ts
├── public/
│   ├── bnf-logo-dark.png
│   ├── bnf-logo-light.png
│   ├── bnf-logo-mark.png
│   ├── favicon.svg, og-default.svg, llms.txt
├── middleware.ts
├── next.config.mjs
├── tailwind.config.ts
└── package.json
```

## 빠른 시작

```bash
# 1. 의존성 설치
npm install

# 2. 환경 변수 (.env.local)
cp .env.example .env.local
# 채울 키:
#   RESEND_API_KEY        - Resend (트랜잭션 이메일)
#   RESEND_FROM           - 발송 주소 (info@gbnf.kr 등)
#   RESEND_TO             - 알림 수신 주소 (info@gbnf.kr)
#   NOTION_TOKEN          - Notion (선택, 없으면 placeholder 사용)
#   NOTION_*_DATABASE_ID  - DB ID (가이드 참조)
#   TURNSTILE_SECRET_KEY  - Cloudflare Turnstile (선택)

# 3. 개발 서버
npm run dev               # http://localhost:3000

# 4. 프로덕션 빌드
npm run build && npm start
```

## 9개 언어

| Locale | Path | Currency |
|---|---|---|
| `ko` | `/` (default) | 3,000만원 |
| `en` | `/en` | $25K |
| `ja` | `/ja` | 300万円 |
| `zh-CN` | `/zh-CN` | 15万元 |
| `zh-TW` | `/zh-TW` | 15萬元 |
| `mn` | `/mn` | 80M MNT |
| `fil` | `/fil` | ₱1.4M |
| `th` | `/th` | 800,000 บาท |
| `vi` | `/vi` | 600 triệu VND |

번역 파일: `i18n/messages/{locale}.json` (9개 파일, 291 leaf keys 동일).

## 8개 SERVICES 상세

`/services/[slug]`:

1. `branding` - 브랜드 전략·정체성
2. `performance` - 퍼포먼스 광고
3. `content` - 영상·이미지 콘텐츠
4. `social` - 소셜·인플루언서
5. `pr` - PR·이벤트·팝업
6. `global` - 글로벌 진출
7. `mso` - MSO·병원 경영지원
8. `martech` - 마테크·자동화

## 빌드 검증 (v9)

```
✓ Compiled successfully
✓ Linting and checking validity of types
✓ Generating static pages (150/150)
```

150 페이지 정적 prerender:
- 9 locale x 5 메인 페이지 = 45
- 9 locale x 8 SERVICES 상세 = 72
- 9 locale x 3 WORK 케이스 = 27
- + sitemap, robots, API routes

## 다음 단계

1. **Notion CMS 세팅** - `NOTION_GUIDE.md` 참조 (인사이트, 케이스, 팀 DB 3개).
2. **로고/이미지 교체** - `public/bnf-logo-*.png`, Unsplash 이미지를 자체 자산으로.
3. **가짜 데이터 교체** - Work 케이스 결과, 통계(200+, 98%, 9개국, 1500+), 타임라인.
4. **Vercel 배포** - `vercel --prod`. 환경변수는 대시보드에서.
5. **Turnstile 활성화** - 폼 봇 방지 (선택).
6. **도메인 연결** - `gbnf.kr` -> Vercel.

## 핵심 기술

- **Next.js 15** App Router, TypeScript
- **next-intl 3.x** - 9개 언어 서브패스 라우팅
- **Tailwind CSS** + CSS variables
- **Framer Motion** - 스크롤 인터랙션
- **Notion API** + ISR 60s
- **Resend** - 트랜잭션 이메일
- **Cloudflare Turnstile** - 봇 방지
- **Vercel** - 배포·엣지

---

## v9 업데이트 사항

- 8개 SERVICES 상세 페이지 (브랜딩/퍼포먼스/콘텐츠/소셜/PR/글로벌/MSO/마테크)
- 9개 언어 번역 풀세트 (총 2,619개 번역값)
- About 페이지 - B&F 의미(Back & Front), 4원칙, 7항목 타임라인(2019~NOW)
- Contact 페이지 - 폼 + 위치 + FAQ 6개
- Work 케이스 상세 페이지 (placeholder 3개, Notion 연동 시 자동 확장)
- 디자인 컬러 토큰: 화이트 베이스 + 블랙 + 그레이, 골드 액센트는 최소

© 2026 B&F Inc. All rights reserved.
