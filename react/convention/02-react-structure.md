# React Code Style – Structure & Globs

이 문서는 프로젝트에서 사용하는 **폴더 구조**,  
레이어별 **segment 규칙**,  
파일을 식별하기 위한 **glob 패턴**,  
그리고 **파일 네이밍 규칙**을 정의한다.

목표는 다음과 같다.

- 어디에 어떤 파일이 있어야 하는지 즉시 예측 가능하게 만들기
- 검색 / 자동화 / 코드 리뷰 비용 줄이기
- 구조를 사람과 도구가 동일하게 이해하도록 만들기

---

# 1. Segment Rules

segment는 slice 내부에서 **책임에 따라 나누는 하위 디렉터리 규칙**이다.

레이어마다 구조가 다르며,  
정해진 이름 외의 디렉터리를 임의로 만들지 않는다.

---

## 1.1 entities

entities는 도메인 모델 중심 레이어다.  
UI, 상태, 훅이 존재할 수 있지만 **항상 엔티티에 종속**된다.

구조:

```
entities/<entity>/
  components/
  containers/
  contexts/
  model/
  hooks/
  lib/
  utils/
  store/
```

### 설명

- **components** → 순수 UI
- **containers** → 상태/비즈니스 연결
- **contexts** → React Context
- **model** → 타입, 도메인 규칙
- **hooks** → 전용 훅
- **lib / utils** → 내부 보조 로직
- **store** → 상태 관리

---

---

## 1.2 features

features는 "사용자 행동 단위(usecase)" 중심 레이어다.

그래서 구조가

```
features/<domain>/<usecase>/
```

형태로 들어간다.

---

구조:

```
features/<domain>/<usecase>/
  components/
  containers/
  contexts/
  hooks/
  lib/
  utils/
  schemas/
  services/
  store/
```

---

### 설명

- **components** → 표현 UI
- **containers** → orchestration
- **contexts** → 기능 범위 context
- **hooks** → 기능 단위 훅
- **lib / utils** → 내부 로직
- **schemas** → validation / form / request schema
- **services** → API, localStorage, side-effect
- **store** → 상태 관리

---

---

# 2. Glob Patterns

glob은 코드 검색, 린트, 자동화, 코드 생성, 에이전트 동작 등에 사용된다.

즉, **파일이 이 위치에 있어야 시스템이 인식한다.**

위치가 다르면 누락된다.

---

## Entities

- Models  
  `entities/*/model/*Model.ts`

- Containers  
  `entities/*/containers/*Container.tsx`

- Components  
  `entities/*/components/*.tsx`

---

## Features

- Slice Root  
  `features/*/*/`

- Schemas  
  `features/*/*/schemas/*Schema.ts`

- Services  
  `features/*/*/services/*.ts`

- Query Keys  
  `features/*/*/services/_keys.ts`

- Containers  
  `features/*/*/containers/*Container.tsx`

- Components  
  `features/*/*/components/*.tsx`

---

## Pages

- Pages  
  `pages/*/*Page.tsx`

- Layouts  
  `pages/**/_*Layout.tsx`

---

---

# 3. Naming Conventions

파일 이름만 보고 역할을 추론할 수 있어야 한다.

그래서 **Suffix 기반 네이밍**을 사용한다.

---

## 규칙

- Model → `*Model.ts`
- Schema → `*Schema.ts`
- Container → `*Container.tsx`
- Page → `*Page.tsx`
- Layout → `_*Layout.tsx`

---

## 예시

```
entities/product/model/ProductModel.ts
features/cart/add-item/schemas/AddToCartFormSchema.ts
features/cart/add-item/services/addToCart.ts
features/cart/add-item/containers/AddItemContainer.tsx
pages/product/ProductDetailPage.tsx
pages/_RootLayout.tsx
pages/auth/_AuthLayout.tsx
```

---

---

# 4. Why This Matters

이 규칙 덕분에 우리는 다음이 가능해진다.

- 경로만 보고 책임을 이해
- grep / glob 검색 단순화
- 자동 import 규칙 생성
- 코드 생성 자동화
- 리뷰 시 위치 검증
- 신규 인원의 러닝커브 단축

---

# 5. Final Principle

**폴더 구조는 취향이 아니라 시스템이다.**

정해진 위치에 정해진 이름으로 둔다.  
그게 협업 비용을 줄이는 가장 빠른 방법이다.
