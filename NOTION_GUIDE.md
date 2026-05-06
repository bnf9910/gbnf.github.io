# B&F Notion CMS 운영 가이드

이 문서는 B&F 웹사이트의 콘텐츠를 Notion에서 관리하는 비개발자(대표·마케터·콘텐츠 담당자)를 위한 가이드입니다. 한 번 세팅이 끝나면 Notion에서 글을 작성하고 발행 상태로 바꾸는 것만으로 사이트에 자동 반영됩니다.

---

## 목차

1. [개요 — 이 시스템이 어떻게 작동하는가](#1-개요)
2. [최초 1회 세팅](#2-최초-1회-세팅)
3. [4개 데이터베이스 구조](#3-4개-데이터베이스-구조)
4. [콘텐츠 작성 가이드](#4-콘텐츠-작성-가이드)
5. [다국어 콘텐츠 운영](#5-다국어-콘텐츠-운영)
6. [발행 체크리스트](#6-발행-체크리스트)
7. [자주 묻는 질문](#7-faq)

---

## 1. 개요

### 어떻게 작동하나요?

```
[Notion에서 글 작성]
       ↓
[Status를 "Published"로 변경]
       ↓
[최대 60초 안에 사이트 자동 반영]
       ↓
[https://gbnf.kr/insights/... 에 노출]
```

웹사이트는 Notion API를 통해 60초마다 한 번씩 콘텐츠를 다시 읽어옵니다 (ISR — Incremental Static Regeneration). 즉시 반영이 필요하면 Vercel 대시보드에서 수동 재배포(Redeploy)를 하거나, 추후 Notion 웹훅을 연결할 수 있습니다.

### 누가 무엇을 관리하나요?

| 역할 | 담당 |
|------|------|
| **대표 / 마케터** | Insights(블로그), Cases(포트폴리오) 작성·발행 |
| **콘텐츠 담당자** | Team(팀원 정보), Settings(공통 텍스트) 관리 |
| **개발자** | API 키, 환경변수, 배포 |

---

## 2. 최초 1회 세팅

### 2-1. Notion 워크스페이스 준비

1. Notion에 로그인 후 새 워크스페이스 또는 기존 워크스페이스를 사용합니다.
2. 워크스페이스 안에 `B&F CMS`라는 페이지를 하나 만듭니다.
3. 그 안에 4개의 데이터베이스(Insights, Cases, Team, Settings)를 만듭니다 (다음 섹션 참조).

### 2-2. Notion Integration 생성

1. https://www.notion.so/my-integrations 접속
2. **`+ New integration`** 클릭
3. 입력:
   - Name: `BnF Website`
   - Associated workspace: B&F CMS가 있는 워크스페이스
   - Type: **Internal**
4. 생성 후 표시되는 **Internal Integration Token**(`secret_xxx...`로 시작)을 복사 → 안전한 곳에 보관

### 2-3. 각 데이터베이스에 Integration 연결

1. Notion에서 첫 번째 데이터베이스(Insights) 페이지로 이동
2. 우측 상단의 `…` (점 3개) 메뉴 클릭
3. `Connections` → `BnF Website` 선택 → `Confirm`
4. **Cases, Team, Settings 데이터베이스 모두에 동일하게 진행**

> ⚠️ Connection을 추가하지 않으면 사이트가 데이터를 읽을 수 없습니다.

### 2-4. 데이터베이스 ID 추출

각 데이터베이스의 ID를 개발자에게 전달해야 합니다.

1. 데이터베이스를 **풀 페이지(Full page)**로 엽니다.
2. URL을 확인합니다:
   ```
   https://www.notion.so/yourworkspace/abc123def456...?v=xyz789
                                    └─ 이 부분이 ID ─┘
   ```
3. `?v=` 앞에 있는 32자리 문자열이 데이터베이스 ID입니다.
4. 4개 모두 추출해서 개발자에게 전달:
   - `NOTION_DB_INSIGHTS=abc123...`
   - `NOTION_DB_CASES=def456...`
   - `NOTION_DB_TEAM=ghi789...`
   - `NOTION_DB_SETTINGS=jkl012...`

---

## 3. 4개 데이터베이스 구조

각 데이터베이스를 만들 때, 아래 표대로 **속성(Properties)**을 정확히 추가해야 합니다. 속성 이름은 영문 표기 그대로 만들어야 사이트가 인식합니다.

### 3-1. Insights (블로그/인사이트)

| 속성명 | 타입 | 옵션 | 설명 |
|--------|------|------|------|
| **Title** | Title | — | 글 제목 (필수) |
| **Slug** | Text | — | URL 경로 (예: `geo-vs-seo-2026`) |
| **Status** | Select | `Draft`, `Published`, `Archived` | 발행 상태 |
| **Locale** | Select | `ko`, `en`, `ja`, `zh-CN`, `zh-TW`, `mn`, `fil`, `th`, `vi` | 언어 |
| **Category** | Select | `Marketing`, `Tech`, `Case Study`, `Industry` | 카테고리 |
| **Excerpt** | Text | — | 미리보기 요약 (160자 이내 권장) |
| **Cover** | Files & media | — | 대표 이미지 (1200x630 권장) |
| **Author** | Person | — | 작성자 |
| **PublishedAt** | Date | — | 발행일 |
| **SEO_Title** | Text | — | SEO 전용 제목 (생략 가능, 비워두면 Title 사용) |
| **SEO_Description** | Text | — | 메타 디스크립션 (150~160자) |
| **Keywords** | Multi-select | 자유 입력 | 타겟 키워드 3~5개 |
| **TranslationGroup** | Text | — | 다국어 묶음 UUID (5번 섹션 참조) |

### 3-2. Cases (포트폴리오)

| 속성명 | 타입 | 옵션 | 설명 |
|--------|------|------|------|
| **ClientName** | Title | — | 클라이언트명 (필수) |
| **Slug** | Text | — | URL 경로 |
| **Status** | Select | `Draft`, `Published`, `Archived` | 발행 상태 |
| **Industry** | Select | `Medical`, `Beauty`, `Other` | 산업군 |
| **Services** | Multi-select | `Branding`, `Automation`, `Global`, `Web` | 제공 서비스 |
| **Locale** | Select | 9개 언어 코드 | 언어 |
| **Featured** | Checkbox | — | 메인페이지 노출 여부 |
| **Cover** | Files & media | — | 썸네일 |
| **Results** | Text | — | 핵심 성과 (예: "리드 320% 증가") |
| **PublishedAt** | Date | — | 공개일 |
| **TranslationGroup** | Text | — | 다국어 묶음 UUID |

### 3-3. Team (팀원/리더십)

| 속성명 | 타입 | 옵션 | 설명 |
|--------|------|------|------|
| **Name** | Title | — | 이름 (필수) |
| **Role** | Text | — | 직책 (예: "CEO & Founder") |
| **Bio** | Text | — | 자기소개 (200자 이내) |
| **Photo** | Files & media | — | 프로필 사진 (정사각형 권장) |
| **Locale** | Select | 9개 언어 코드 | 언어 |
| **Order** | Number | — | 표시 순서 (작은 숫자가 먼저) |

### 3-4. Settings (공통 텍스트)

> 푸터, 배너 등 자주 안 바뀌지만 다국어로 관리해야 하는 키-값 텍스트 저장용

| 속성명 | 타입 | 설명 |
|--------|------|------|
| **Key** | Title | 키 이름 (예: `footer.copyright`) |
| **Value** | Text | 값 (실제 표시될 텍스트) |
| **Locale** | Select | 언어 |

---

## 4. 콘텐츠 작성 가이드

### 4-1. 새 인사이트 글 작성하기

1. **Insights 데이터베이스**에서 `+ New` 버튼 클릭
2. **Title** 입력 — 페이지 제목으로도 표시됨
3. **속성(Properties)** 채우기:
   - **Slug**: URL에 들어갈 영문 소문자+하이픈 (예: `medical-marketing-2026`)
   - **Status**: 작성 중에는 `Draft`, 완성 후 `Published`로 변경
   - **Locale**: 한국어면 `ko`, 영어면 `en`...
   - **Category**: 적절한 카테고리 선택
   - **Excerpt**: 글 요약 1~2문장
   - **Cover**: 대표 이미지 업로드
   - **PublishedAt**: 오늘 날짜 또는 미래 발행 예정일
   - **SEO_Description**: 검색 결과에 표시될 요약 (150자)
   - **Keywords**: 3~5개
4. **본문 작성** — Notion의 일반 에디터 사용:
   - 제목/소제목: `/h2`, `/h3` (절대 H1은 쓰지 마세요 — Title이 H1입니다)
   - 인용: `/quote`
   - 이미지: `/image` 후 업로드 (외부 URL은 만료되니 직접 업로드 필수)
   - 코드: `/code`
   - 리스트: `/bullet`, `/numbered`
   - 구분선: `---`

### 4-2. 슬러그(Slug) 작성 규칙

| ✅ 올바른 예 | ❌ 잘못된 예 |
|-------------|-------------|
| `medical-seo-guide` | `Medical SEO Guide` (대문자, 공백) |
| `geo-vs-seo-2026` | `GEO_vs_SEO` (언더스코어) |
| `next-js-cro-tips` | `next.js-cro-tips` (점) |
| `2025-q4-report` | `2025/Q4 Report` (슬래시) |

**규칙**: 영문 소문자 + 숫자 + 하이픈만 사용. 한글, 공백, 특수문자 모두 금지.

### 4-3. 이미지 처리

- **Cover**: 1200x630px (Open Graph 표준), 권장 용량 500KB 이하
- **본문 이미지**: 1600px 이내, WebP 또는 JPG
- **반드시 Notion에 직접 업로드**해야 합니다. 외부 URL(예: Imgur, 구글드라이브 링크)은 1시간 후 만료됩니다.

### 4-4. SEO 최적화 체크포인트

| 항목 | 권장 |
|------|------|
| Title | 50~60자, 핵심 키워드 앞쪽 배치 |
| SEO_Title | (선택) 검색결과 전용 변형, 비우면 Title 사용 |
| SEO_Description | 150~160자, 행동 유도 문구 포함 |
| Keywords | 3~5개, 연관 검색어 위주 |
| 본문 첫 문단 | 핵심 키워드 자연스럽게 1~2회 등장 |
| H2/H3 구조 | 논리적 계층, 키워드 변형 활용 |
| 내부 링크 | 다른 인사이트·서비스 페이지로 2~3개 링크 |
| 이미지 alt 텍스트 | Notion에서 이미지 클릭 → caption 입력 |

---

## 5. 다국어 콘텐츠 운영

같은 글의 한국어판/영어판/일본어판은 **별도의 페이지**로 만들고, `TranslationGroup` 속성에 동일한 UUID를 입력해서 묶습니다.

### 5-1. UUID 발급 방법

1. https://www.uuidgenerator.net/ 접속
2. 자동으로 표시된 UUID 복사 (예: `f47ac10b-58cc-4372-a567-0e02b2c3d479`)
3. 한 글의 모든 언어 버전에 같은 UUID 입력

### 5-2. 다국어 작성 예시

| Title | Slug | Locale | TranslationGroup |
|-------|------|--------|------------------|
| GEO 시대의 의료 마케팅 | `geo-medical-marketing` | ko | `f47ac10b-...` |
| Medical Marketing in the GEO Era | `geo-medical-marketing` | en | `f47ac10b-...` ← 같은 UUID |
| GEO時代の医療マーケティング | `geo-medical-marketing` | ja | `f47ac10b-...` ← 같은 UUID |

> 💡 **팁**: Slug는 모든 언어에서 같게 하는 것이 권장됩니다. URL이 `/ko/insights/geo-medical-marketing`, `/en/insights/geo-medical-marketing`처럼 일관됩니다.

### 5-3. 번역 우선순위

모든 콘텐츠를 9개 언어로 번역할 필요는 없습니다. 다음 우선순위로 진행하세요:

1. **한국어 (ko)** — 원본
2. **영어 (en)** — 글로벌 SEO 핵심
3. **중국어 간체 (zh-CN)** — 중화권 환자
4. **일본어 (ja)** — 일본 의료관광
5. **베트남어 (vi)**, **태국어 (th)** — 동남아 시장
6. **중국어 번체 (zh-TW)** — 대만/홍콩
7. **필리핀어 (fil)**, **몽골어 (mn)** — 신흥 시장

번역되지 않은 언어로 사이트 접속 시 자동으로 영어 또는 한국어 버전을 보여줍니다.

---

## 6. 발행 체크리스트

발행 전에 다음을 확인하세요:

### Insights 발행 체크리스트

- [ ] **Title** 입력 완료
- [ ] **Slug** 영문 소문자 + 하이픈으로만 작성
- [ ] **Locale** 정확히 선택
- [ ] **Category** 선택
- [ ] **Excerpt** 작성 (160자 이내)
- [ ] **Cover** 이미지 업로드 (1200x630)
- [ ] **PublishedAt** 날짜 입력
- [ ] **SEO_Description** 작성 (150~160자)
- [ ] **Keywords** 3~5개 입력
- [ ] **TranslationGroup** UUID 입력 (다국어판이 있을 경우)
- [ ] 본문에 H1 사용 안 함
- [ ] 본문 이미지가 모두 Notion 업로드 (외부 링크 X)
- [ ] **Status**를 `Published`로 변경 ← 마지막 단계!

### Cases 발행 체크리스트

- [ ] **ClientName**, **Slug**, **Industry**, **Services** 입력
- [ ] **Cover** 이미지 (썸네일)
- [ ] **Results**에 정량적 성과 (예: "전환율 240% 상승")
- [ ] **Featured** 체크 여부 결정 (메인 노출용)
- [ ] **Status** → `Published`

---

## 7. FAQ

### Q1. 글을 발행했는데 사이트에 안 보여요.

**A**: 다음을 순서대로 확인하세요:

1. **Status**가 `Published`인지 확인
2. **Locale**이 보고 있는 사이트 언어와 일치하는지 (예: `gbnf.kr/en/insights`로 보고 있다면 Locale이 `en`이어야 함)
3. 60초 정도 기다려본 후 **새로고침** (브라우저 캐시 무효화: Ctrl+Shift+R 또는 Cmd+Shift+R)
4. 그래도 안 보이면 개발자에게 Vercel 재배포 요청

### Q2. 발행했던 글을 비공개로 바꾸려면?

**A**: **Status**를 `Draft` 또는 `Archived`로 바꾸면 됩니다. 60초 안에 사이트에서 사라집니다.

### Q3. URL을 변경하고 싶어요 (Slug 변경).

**A**: Slug를 바꾸면 기존 URL은 404가 되고 SEO 점수가 떨어집니다. 가급적 발행 후에는 변경하지 마세요. 꼭 필요하면 개발자에게 301 리다이렉트 설정을 요청하세요.

### Q4. 이미지가 안 보여요.

**A**: 거의 100% 외부 URL을 사용한 경우입니다. 이미지를 Notion에 직접 업로드하세요 (드래그앤드롭 또는 `/image` 후 Upload 탭).

### Q5. 본문에 표(Table)를 만들 수 있나요?

**A**: 네, Notion의 `/table` 또는 `/database`로 만든 표는 사이트에 그대로 표시됩니다.

### Q6. 다국어판 글을 만들 때 본문도 자동 번역되나요?

**A**: **아니요.** 각 언어 버전은 별도로 작성해야 합니다. ChatGPT, DeepL, Google Translate 등 번역 도구를 사용한 후 검토·다듬어서 입력하세요. `TranslationGroup` UUID로 같은 글로 묶이게 됩니다.

### Q7. Cover 이미지의 적정 크기는?

**A**: **1200x630px** (Open Graph 표준). 페이스북, 카카오톡, 슬랙 등에 링크 공유 시 이 크기가 가장 깨끗하게 표시됩니다.

### Q8. 사이트 전체 수정(예: 푸터 문구 변경)은 어떻게 하나요?

**A**: **Settings 데이터베이스**에서 해당 키의 Value를 수정하세요. 단, 키 자체(예: `footer.copyright`)는 개발자가 사이트 코드에서 호출하는 이름이므로 절대 변경하면 안 됩니다.

### Q9. 글을 미리보기로 확인할 수 있나요?

**A**: 현재는 발행 후에만 사이트에서 확인 가능합니다. 추후 Vercel Preview 배포를 활용한 Draft 미리보기 기능을 추가할 수 있습니다 (개발자 작업 필요).

### Q10. 누가 어떤 글을 썼는지 추적하고 싶어요.

**A**: Insights의 **Author** 속성에 작성자 Notion 계정을 연결하세요. 사이트에 작성자명과 프로필 사진이 자동 표시됩니다 (Team DB와 연동).

---

## 8. 문제 발생 시 연락처

- **개발 관련**: 개발 담당자
- **콘텐츠 관련**: 마케팅 팀
- **긴급 (사이트 다운 등)**: info@gbnf.kr

---

**B&F | Hyper-automated MarTech & Brand Solutions Group**
Last updated: 2026-05-06
