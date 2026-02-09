
# UI/UX 라이트 테마 전환 계획

Human Node를 어두운 AI 스타일에서 밝고 깔끔한 B2C 플랫폼 스타일로 전환합니다.

## 변경 개요

현재 사이버펑크 다크 테마(검정 배경, 네온 색상, glow 효과)를 토스/배달의민족/당근마켓 같은 친근하고 깔끔한 라이트 테마로 바꿉니다.

## 주요 변경 사항

### 1. 색상 시스템 재정의 (index.css)

| 요소 | 현재 (다크) | 변경 (라이트) |
|------|-------------|---------------|
| 배경 | 진한 네이비 (#0d1117) | 흰색/밝은 그레이 (#ffffff, #f8fafc) |
| 텍스트 | 밝은 흰색 | 진한 그레이 (#1f2937) |
| 주요 색상 | 전기 시안 | 따뜻한 주황색 (브랜드 컬러) |
| 카드 | 어두운 네이비 | 흰색 + 연한 테두리 |
| Glow 효과 | 네온 glow | 부드러운 그림자로 대체 |

### 2. 컴포넌트별 스타일 업데이트

**Header (Header.tsx)**
- 배경: 투명 다크 → 흰색 + 연한 그림자
- 로고: 사이버 스타일 → 깔끔한 라운드 로고

**Hero 섹션 (HeroSection.tsx)**
- 배경: 어두운 그라디언트 mesh → 밝은 그라디언트 또는 순백
- 배지: AI 틱한 glow → 부드러운 파스텔 배경
- "AI-first" 메시지 → "사람을 연결합니다" 강조

**카드 컴포넌트 (JobCard, WorkerCard)**
- 어두운 배경 → 흰색 배경 + 섬세한 border
- Glow hover → 부드러운 shadow elevation

**버튼 (button.tsx)**
- 네온 glow 효과 제거
- 깔끔한 solid 컬러 + 부드러운 hover 효과

**배지 (badge.tsx)**
- 네온 느낌의 반투명 → 파스텔톤 배경

### 3. 랜딩 페이지 톤 조정

**FeaturesSection, HowItWorksSection, APISection, CTASection**
- 어두운 배경 섹션 → 흰색/연회색 교차
- 그라디언트 라인 → 단순 회색 라인
- 코드 블록: 다크 배경 유지 (가독성)

**Footer**
- 어두운 배경 → 연한 그레이 배경

### 4. 유틸리티 클래스 정리 (index.css)

- `glow-ai`, `glow-human` → 제거 또는 부드러운 shadow로 대체
- `text-gradient-ai` → 단색 primary 컬러로 대체
- `bg-gradient-mesh` → 깔끔한 단색 또는 미세한 그라디언트

## 새로운 디자인 컨셉

```text
+--------------------------------------------------+
|  [Logo] Human Node     Jobs  Workers    [시작하기] |  ← 흰색 헤더
+--------------------------------------------------+
|                                                  |
|     현실 세계의 일을                              |  ← 밝은 배경
|     사람에게 연결합니다                            |
|                                                  |
|     [ Job 둘러보기 ]  [ 더 알아보기 ]              |  ← 주황색 버튼
|                                                  |
+--------------------------------------------------+
|     🧑 10,000+       ⚡ 15분        ✓ 98%        |  ← 연한 그레이 섹션
|     Workers        평균 응답       완료율         |
+--------------------------------------------------+
```

## 수정 파일 목록

1. **src/index.css** - 전체 CSS 변수 라이트 테마로 변경
2. **tailwind.config.ts** - gradient-mesh 등 배경 이미지 업데이트
3. **src/components/ui/button.tsx** - glow 효과 제거, 깔끔한 스타일
4. **src/components/ui/badge.tsx** - 파스텔톤 스타일
5. **src/components/layout/Header.tsx** - 흰색 배경, 부드러운 그림자
6. **src/components/landing/HeroSection.tsx** - 밝은 배경, 메시지 조정
7. **src/components/landing/FeaturesSection.tsx** - 라이트 스타일
8. **src/components/landing/HowItWorksSection.tsx** - 라이트 스타일
9. **src/components/landing/APISection.tsx** - 라이트 스타일 (코드는 다크 유지)
10. **src/components/landing/CTASection.tsx** - 라이트 스타일
11. **src/components/layout/Footer.tsx** - 연한 배경
12. **src/components/jobs/JobCard.tsx** - 흰색 카드, 부드러운 그림자
13. **src/components/jobs/JobDetailModal.tsx** - 라이트 스타일
14. **src/components/workers/WorkerCard.tsx** - 흰색 카드
15. **src/pages/Jobs.tsx** - 배경 스타일
16. **src/pages/Workers.tsx** - 배경 스타일

## 기술 세부사항

### 새로운 CSS 변수 (라이트 테마)

```css
:root {
  --background: 0 0% 100%;           /* 순백 */
  --foreground: 222 47% 11%;         /* 진한 그레이 */
  --card: 0 0% 100%;                 /* 흰색 카드 */
  --card-foreground: 222 47% 11%;
  --primary: 24 95% 53%;             /* 따뜻한 주황 */
  --primary-foreground: 0 0% 100%;
  --secondary: 220 14% 96%;          /* 연한 그레이 */
  --muted: 220 14% 96%;
  --muted-foreground: 220 9% 46%;
  --border: 220 13% 91%;
  --accent: 192 85% 43%;             /* 포인트 블루 */
}
```

### 그림자 스타일

```css
--shadow-card: 0 1px 3px 0 rgb(0 0 0 / 0.1);
--shadow-elevated: 0 10px 15px -3px rgb(0 0 0 / 0.1);
```

변경 후 전체 페이지를 테스트하여 일관성을 확인해야 합니다.
