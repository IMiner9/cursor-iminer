# Limbus Company Info Website

림버스 컴퍼니 관련 정보를 제공하는 웹사이트입니다.

## 기능

- **인격 정보**: 12명 수감자의 인격 정보와 스킬/패시브 상세
- **E.G.O 정보**: E.G.O 스킬 설명과 패시브 사용처
- **추천 티어덱**: S/A/B 티어별 덱 구성 추천
- **스테이지 공략**: 스테이지별 공략 가이드 (예정)
- **파티 메이킹**: 파티 조합 가이드 (예정)
- **다크/라이트 테마**: 사용자 선호 테마 지원
- **PWA 지원**: 모바일 앱처럼 설치 가능

## 기술 스택

- **Frontend**: Next.js 14 (App Router), Tailwind CSS, shadcn/ui
- **Backend**: Next.js Server Actions
- **Database**: Supabase (PostgreSQL)
- **Storage**: Supabase Storage
- **Deployment**: Vercel

## 설치 및 실행

### 1. 의존성 설치

```bash
npm install
```

### 2. 환경 변수 설정

`.env.local` 파일을 생성하고 다음 내용을 추가하세요:

```env
NEXT_PUBLIC_SUPABASE_URL=your_supabase_project_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
SUPABASE_SERVICE_ROLE_KEY=your_supabase_service_role_key
```

### 3. Supabase 설정

1. [Supabase](https://supabase.com)에서 새 프로젝트 생성
2. `supabase/schema.sql` 파일의 내용을 SQL 에디터에서 실행
3. 프로젝트 설정에서 URL과 API 키 복사

### 4. 개발 서버 실행

```bash
npm run dev
```

브라우저에서 [http://localhost:3000](http://localhost:3000)을 열어 확인하세요.

## 데이터 관리

- **관리자 페이지**: `/admin`에서 인격, E.G.O, 티어덱 정보 입력/수정
- **데이터 보안**: RLS(Row Level Security)로 읽기 공개, 쓰기 제한
- **이미지 관리**: Supabase Storage를 통한 이미지 업로드

## 배포

```bash
npm run build
npm run start
```

Vercel에 배포하려면 GitHub 저장소를 연결하고 환경 변수를 설정하세요.

## 라우팅 구조

- `/` → `/identities` (메인 페이지)
- `/identities` - 인격 정보
- `/egos` - E.G.O 정보
- `/tierdecks` - 추천 티어덱
- `/stages` - 스테이지 공략 (예정)
- `/party` - 파티 메이킹 (예정)
- `/admin` - 관리자 도구

## 개발 계획

### Phase 1 (MVP)
- [x] 기본 페이지 구조 및 네비게이션
- [x] 인격/E.G.O/티어덱 관리 시스템
- [x] 테마 토글 및 반응형 디자인

### Phase 2
- [ ] 패치 이력 시스템
- [ ] 소셜 메타 태그
- [ ] 성능 최적화 (ISR/캐시)
- [ ] i18n 구조 반영

### Phase 3
- [ ] 다국어 지원 (영어 등)
- [ ] 고급 필터링
- [ ] 간단 비교 기능
- [ ] PWA 완성도 향상

## 라이선스

MIT License
