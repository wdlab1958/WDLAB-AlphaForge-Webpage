# WDLAB-AlphaForge — 소개 웹페이지

> **안전한 AI 자동매매를 위한 설계 철학과 운용 종합서를** 단일 페이지로 구현한 소개 사이트.
> [WDLAB-AlphaForge 통합 가이드북 v2.0](https://github.com/wdlab1958/WDLAB-AlphaForge) (17장 + 부록 A~F)을
> 17개 섹션으로 재구성한 정적 웹사이트입니다.

🌐 **Live**: https://wdlab1958.github.io/WDLAB-AlphaForge-Webpage/

---

## 0. 한눈에 보기

| 항목 | 값 |
| --- | --- |
| 기술 스택 | Vanilla HTML / CSS / JavaScript (의존성 0) |
| 디자인 시스템 | Neumorphism — convex/concave 그림자 + LED glow |
| 색상 의미 | **Cyan(#00B8D4)**=주의 · **Pink(#FF2D95)**=위험·정지 · Amber=인프라 |
| 폰트 | Noto Sans KR · Inter · JetBrains Mono (Google Fonts) |
| 반응형 | 1480 / 1280 / 1024 / 720px 4 breakpoint |
| 접근성 | 시멘틱 HTML5 · `aria-label` · 키보드 스크롤 |
| 배포 | GitHub Pages (`main` branch root) |

---

## 1. 디자인 의사결정

### 1.1 Reference: WDLAB-LLMOps Webpage
LLMOps 프로젝트 페이지의 **뉴모피즘 디자인 시스템만** 차용했습니다 (사이드바 네비, raised/pressed 그림자, 칩, 통계 카드, 비교표, 타임라인 패턴). 컨텐츠는 모두 AlphaForge 가이드북에서 새로 작성.

### 1.2 색상 정의 — 운용 철학의 시각적 구현
가이드북 §12.1 *"색은 의미"* 약속을 그대로 따릅니다.
- **청록 (`#00B8D4`)** → 주의 · 일반 강조 · 정상 운용 신호
- **핑크 (`#FF2D95`)** → 위험 · 정지 · DENY · halt 트리거
- 일상 메트릭(평가금액, P&L 등)에는 절대 핑크를 쓰지 않습니다

이 약속에 따라:
- `RiskGuardAgent` 카드 / `Decision Token` 블록 / `Halt Panel` 섹션 → 핑크 inset glow
- `ExecutionAgent` (유일한 write 권한자) → amber inset glow (위험 + 책임 동시 표현)
- `LangGraph Supervisor` (마에스트로) → 청록 inset glow (지휘자 식별)

### 1.3 디자인 != 컨텐츠
참조 LLMOps 페이지의 컨텐츠는 일절 가져오지 않았습니다. 모든 텍스트는 AlphaForge 통합 가이드북 (1152 paragraphs, 73KB) 원문에서 발췌·요약했습니다.

---

## 2. 페이지 구조 (17 sections)

가이드북 17개 장 + 부록 A~F를 다음과 같이 매핑:

| § | 섹션 ID | 가이드북 출처 | 핵심 컴포넌트 |
| --- | --- | --- | --- |
| 1 | `#hero` | §1·§2 | 6개 핵심 통계 카운터 + 슬로건 |
| 2 | `#identity` | §1.2 / §2 | 6 identity 카드 (외부 신경계 / 환각 차단 / 화이트박스 등) |
| 3 | `#principles` | §2.2 | 6대 설계 원칙 — 절대 위반 금지 |
| 4 | `#whitebox` | §2.4 | 화이트박스 7가지 구조적 증거 |
| 5 | `#ahe` | §6.9 | AHE 5개 메타 레이어 (Schema · Audit · Policy · Determinism · Evolution) |
| 6 | `#agents` | §5 | 11명 에이전트 — Supervisor + 10 Specialist |
| 7 | `#riskguard` | §9.3 | RiskGuard 6단계 검증 + 거부 사유 코드 |
| 8 | `#token` | §10 | Decision Token (Ed25519/10s TTL) + 실제 JSON 예시 |
| 9 | `#gates` | §11 | 5단계 운용 게이트 + 자동 승급 4중 차단 |
| 10 | `#strategies` | §8.2~8.5 | 활용 전략 4종 (momentum / mean-reversion / pair / DSL) |
| 11 | `#ontology` | §7.4 / §16.7 | KFinOnto — 6 SHACL 룰 + Pre-LLM peer 주입 |
| 12 | `#architecture` | §6 + 부록 E | 7-layer 인프라 다이어그램 |
| 13 | `#kis` | §13 | KIS API 환경 고정 5단계 + MCP 카탈로그 |
| 14 | `#emergency` | §14 | 비상 운용 + AutoRecoveryPolicy |
| 15 | `#status` | §13.8 + 부록 E·F | 정직한 갭 공개 + 2026-05-03 갱신 |
| 16 | `#compare` | §15.3 | Black-box vs AlphaForge 9차원 비교 |
| 17 | `#rules` | 부록 D | 운용 3대 수칙 (안전 · 단계 · 인간) |
| 18 | `#future` | §16~§17 | 4단계 자문 플랫폼 전환 로드맵 |

---

## 3. 파일 구조

```
WDLAB-AlphaForge_Webpage/
├── index.html         # 1351 lines — 17 sections + sidebar nav
├── css/
│   └── style.css      # 1192 lines — neumorphism design system
├── js/
│   └── app.js         # 129 lines — scroll spy / counters / mobile menu
├── assets/            # (reserved)
└── README.md
```

### 3.1 `index.html`
- 시멘틱 `<aside class="sidebar">` + `<main class="content">` 2-pane 레이아웃
- 사이드바 6개 그룹: 시작 / 철학 / 에이전트 / 안전장치 / 시스템 / 패러다임
- 모바일에서는 햄버거 토글로 슬라이드 인

### 3.2 `css/style.css`
디자인 토큰 (line 9~42):

```css
--bg:        #E6E9EF;          /* base surface */
--led-cyan:  #00B8D4;          /* 주의 */
--led-pink:  #FF2D95;          /* 위험·정지 */
--led-amber: #F4A11C;          /* 인프라·KIS */
--shadow-raised:  9px 9px 22px var(--shadow-dark), -9px -9px 22px var(--shadow-light);
--shadow-pressed: inset 6px 6px 12px var(--shadow-dark), inset -6px -6px 12px var(--shadow-light);
```

핵심 컴포넌트 클래스:
- `.neu-raised` / `.neu-pressed` — 뉴모피즘 유틸리티
- `.principles` (3-col) — 6대 설계 원칙
- `.pillars` (2-col, last span 2) — AHE 5 레이어
- `.agents` (4-col, supervisor span 4) — 11 에이전트 + 권한 시각화
- `.stages` (6-col) — RiskGuard 6단계 파이프라인
- `.gates` (5-col) — 5단계 운용 게이트
- `.token-json` — JetBrains Mono + 신택스 하이라이트(`.k`/`.s`/`.n`/`.c`)
- `.compare-row` — Black-box vs AlphaForge 비교표

### 3.3 `js/app.js`
- **Smooth scroll** + 사이드바 active 동기화
- **Scroll spy** — 스크롤 위치 따라 사이드바 자동 하이라이트
- **IntersectionObserver reveal** — 카드 fade-in
- **Counter animation** — 숫자 통계 0→target 1.1s easing
- **Mobile menu** — 720px 이하에서 햄버거 토글
- **To-top button** — 600px 이상 스크롤 시 노출

---

## 4. 로컬 실행

의존성이 없으므로 어떤 정적 서버라도 됩니다.

```bash
# Python
python3 -m http.server 8765
# Node
npx serve -l 8765 .
# 브라우저
open http://localhost:8765/
```

---

## 5. 배포

GitHub Pages로 배포되어 있습니다 (`main` 브랜치 루트).

```
https://wdlab1958.github.io/WDLAB-AlphaForge-Webpage/
```

GitHub Pages는 정적 파일만 호스팅하므로 빌드 단계 없음.
변경 사항은 `main`에 푸시하면 1~2분 내 자동 반영됩니다.

---

## 6. 컨텐츠 출처 (Single Source of Truth)

본 페이지의 모든 텍스트는 다음 단일 출처에서 발췌했습니다:

```
~/ai_project/WDLAB-AlphaForge/AlphaForge-docx/WDLAB-AlphaForge_Integrated_Guidebook.docx
```

- 17개 장 (Part I~VI) + 부록 A~F
- 1152 paragraphs · 73KB
- 작성: Brian Lee · A3 Security Co., Ltd. · AITF Working Group
- 발행: 2026-05-02 (rev1.0 / 부록 E·F는 2026-05-03 갱신)

부록 E (2026-05-03 구현 업데이트) 및 부록 F (KRX-Symbols 카탈로그)의 수치가 본문 §13.8과 충돌할 경우 부록이 우선합니다 (부록 E.1 명시). 본 페이지는 그 우선 순위를 따라 39 → 69 routes, 5-channel → 8-channel gateway 등 최신 수치를 반영했습니다.

---

## 7. 라이선스 / 저작권

© WDLAB · Brian Lee · A3 Security Co., Ltd.
WDLAB Internal · Confidential. 본 사이트는 AlphaForge 프로젝트의 소개 목적으로 작성되었습니다.

---

🤖 Generated with [Claude Code](https://claude.com/claude-code)
