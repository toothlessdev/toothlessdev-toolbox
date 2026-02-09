# React Code Style – Structure & Globs  
(Next.js App Router)

이 문서는 프로젝트의 **폴더 구조**,  
레이어 내부의 **segment 규칙**,  
자동화/검색을 위한 **glob 패턴**,  
그리고 **파일 네이밍 규칙**을 정의한다.

목표는 다음이다.

- 경로만 보고 파일의 책임을 이해할 수 있게 한다.
- 코드 생성, lint, 테스트 도구가 동일한 기준을 사용하도록 만든다.
- 사람이든 도구든 같은 위치에 파일을 두게 만든다.

---

# 1. Segment Rules

segment는 slice 내부에서 **책임에 따라 나누는 하위 디렉터리 규칙**이다.

레이어마다 구조가 다르며,  
정해진 이름 외의 디렉터리를 임의로 만들지 않는다.

---

## 1.1 entities

entities는 도메인 모델 중심 레이어다.

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

- **components** → 표현 UI
- **containers** → 상태/로직 연결
- **contexts** → React Context
- **model** → 타입, 도메인 규칙
- **hooks** → 엔티티 전용 훅
- **lib / utils** → 내부 보조 로직
- **store** → 상태 관리

---

---

## 1.2 features

features는 사용자 행동(usecase) 중심 레이어다.

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

- **components** → UI
- **containers** → orchestration
- **contexts** → 기능 범위 context
- **hooks** → 기능 단위 훅
- **lib / utils** → 내부 로직
- **schemas** → 사용자 입력 검증
- **services** → API / side-effect
- **store** → 상태 관리

---

---

# 2. Glob Patterns

glob은 자동 import, lint, 코드 생성,  
AI 동작의 기준이 된다.

**위치가 다르면 시스템이 인식하지 못한다.**

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

## App (Next.js 화면 컴포지션)

Next.js App Router를 사용하므로  
라우트 엔트리는 `app/`에 존재한다.

---

### 페이지 컴포넌트

```
app/*/page.tsx
app/**/page.tsx
```

---

### 레이아웃

```
app/layout.tsx
app/**/layout.tsx
```

---

### 로딩 / 에러 / not-found 등

```
app/**/loading.tsx
app/**/error.tsx
app/**/not-found.tsx
```

---

> 중요  
> 이 파일들은 Next.js 규칙에 따른 **엔트리 파일**이다.  
> 실제 UI 조합 책임은 여전히 app 레이어 내부 컴포지션에 있다.

---

---

# 3. Naming Conventions

파일 이름만 보고 역할을 추론 가능해야 한다.

우리는 **Suffix 기반 네이밍**을 사용한다.

---

## 규칙

- Model → `*Model.ts`
- Schema → `*Schema.ts`
- Container → `*Container.tsx`

---

## Next.js 엔트리 파일 (예외)

Next가 파일명을 강제한다.

- `page.tsx`
- `layout.tsx`
- `loading.tsx`
- `error.tsx`
- `not-found.tsx`

이 파일명은 바꾸지 않는다.

---

---

## 예시

```
entities/product/model/ProductModel.ts
features/cart/add-item/schemas/AddToCartFormSchema.ts
features/cart/add-item/services/addToCart.ts
features/cart/add-item/containers/AddItemContainer.tsx

app/product/[id]/page.tsx
app/layout.tsx
```

---

---

# 4. 왜 이렇게까지 정하나?

이 규칙 덕분에 우리는:

- 경로만 보고 책임을 이해
- 빠른 grep 검색
- 코드 생성 자동화
- 리뷰 시 위치 검증
- 신규 인원 온보딩 단축

이 가능해진다.

---

# 5. Final Principle

폴더 구조는 취향이 아니다.  
**시스템이다.**

정해진 위치에  
정해진 이름으로 둔다.

그게 협업을 빠르게 만드는 가장 확실한 방법이다.
