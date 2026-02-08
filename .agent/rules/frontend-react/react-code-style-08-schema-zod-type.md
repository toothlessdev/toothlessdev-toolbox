---
trigger: always_on
---

# react-code-style-08-schema-zod-type.md

이 문서는 React 코드, TypeScript, Schema 작성 시 코드 작성 규칙을 정의한다.  
(타입 import 규칙, Schema 파일 구성 규칙, Zod 사용 범위 포함)

---

# Glob Pattern

```text
**/*.{ts,tsx}
```

---

# Model Decision

```text
Use this rule when implementing or editing React components and related TS/TSX code.
Apply it when:
- writing/editing components, containers, hooks, utils
- touching any import statements (especially types)
- defining/using zod schemas and schema-derived types
Focus:
- type-only import discipline for verbatimModuleSyntax
- schema file: one schema per file
- zod is used for user input validation only
```

---

# 1. Type-only Import Rule (verbatimModuleSyntax 대응)

TypeScript에서 `"verbatimModuleSyntax": true` 가 켜져 있을 때,  
타입은 반드시 `import type` 으로 가져온다.

---

## 1.1 MUST

- 타입만 가져오는 import는 반드시 `import type` 사용

```ts
import type { Product } from "@/entities/product/schemas/ProductSchema";
```

- 값(runtime)과 타입을 동시에 사용하는 경우:
    - import를 분리하거나
    - 하나의 import에서 `type`을 명시한다

```ts
// (권장) 분리
import { formatPrice } from "@/shared/lib/formatPrice";
import type { Product } from "@/entities/product/schemas/ProductSchema";

// (허용) 한 줄에서 type 명시
import { formatPrice, type Money } from "@/shared/lib/money";
```

---

## 1.2 MUST NOT

- 타입만 사용하면서 일반 import로 가져오기 (컴파일 에러 원인)

```ts
// 금지
import { Product } from "@/entities/product/schemas/ProductSchema";
```

---

## 1.3 Quick Fix Guide

아래 오류가 보이면:

```text
'Product' is a type and must be imported using a type-only import when 'verbatimModuleSyntax' is enabled.
```

해당 import를 `import type` 으로 변경한다.

---

# 2. Zod Schema 파일 구성 규칙 (1 File = 1 Schema)

Zod 스키마 파일(`*Schema.ts`)은 **하나의 스키마만** 정의한다.  
CartSchema.ts 같은 파일에 CartItem, Cart, Coupon 등 여러 스키마를 섞지 않는다.

---

## 2.1 MUST

- 파일명: `<Domain><Name>Schema.ts`
- export 형식은 아래 구조로 고정한다

```ts
export const CartItemSchema = z.object({
    // ...
});

export type CartItemSchemaType = z.infer<typeof CartItemSchema>;
```

- 서로 다른 개념의 스키마는 반드시 파일을 분리한다

```text
features/cart/add-item/schema/
  AddToCartFormSchema.ts
```

---

## 2.2 SHOULD

- 스키마 타입 이름은 `*SchemaType` 으로 통일한다
- 스키마 간 의존은 같은 slice 내부에서만 유지한다

---

## 2.3 MUST NOT

- 한 파일에 여러 스키마를 export 하는 “모음집” 구조
- Schema 파일에서 도메인 타입(DB/Model)을 정의하는 패턴

```ts
// 금지
export type CartItem = {
    // ...
};
```

Schema 파일의 책임은 다음으로 한정한다:

- 사용자 입력 검증
- 입력에서 파생된 타입 (`z.infer`)

---

# 3. Zod 사용 범위 정책 (중요)

Zod Schema는 **사용자 입력(Form)** 검증에만 사용한다.  
도메인 모델(DB Table / Aggregate Root)은 **TypeScript type-only** 로 관리한다.

---

## 3.1 Zod를 MUST로 사용하는 대상

다음 입력은 반드시 Zod Schema로 검증한다.

- 사용자 Form 입력
- react-hook-form submit payload
- URLSearchParams, query params
- localStorage / sessionStorage에서 읽은 값

배치 규칙:

- `features/<domain>/<usecase>/schema/*Schema.ts`

---

## 3.2 Zod를 사용하지 않는 대상

다음은 Zod Schema를 정의하지 않는다.

- 서버 API Response
- DB table 기반 타입
- Aggregate Root 모델

배치 예시:

```text
entities/post/model/PostModel.ts
entities/cart/model/CartModel.ts
```

---

# 4. Form Validation 책임 분리 규칙 (react-hook-form)

Form 입력 검증은 **react-hook-form 레이어**에서만 수행한다.  
service 레이어에서는 입력을 다시 검증하지 않는다.

---

## 4.1 MUST

- Form 입력은 react-hook-form + zodResolver로 검증한다
- service 함수는 **이미 검증된 타입**을 인자로 받는다

```ts
export async function createPost(request: CreatePostFormSchemaType): Promise<PostModel> {
    return api.post("/api/posts", {
        body: JSON.stringify(request),
    }) as PostModel;
}
```

---

## 4.2 MUST NOT

- service 레이어에서 `Schema.parse`, `safeParse` 호출
- Form / Service 이중 검증

```ts
// 금지
CreatePostFormSchema.parse(input);
```

---

# 5. 컴포넌트 구현 시 Import 정리 규칙

---

## 5.1 MUST

- 타입 import와 값 import를 명확히 구분한다
- 사용하지 않는 import는 즉시 제거한다
- `import type`는:
    - 값 import와 분리해도 되고 (권장)
    - 같은 줄에서 `type` 키워드를 써도 된다 (허용)

---

# 6. PR / 리뷰 체크리스트

이 규칙이 적용되는 변경에서는 아래 항목을 확인한다.

- [ ] 타입 import가 `import type`로 되어 있는가?
- [ ] Schema 파일이 입력(Form) 전용으로 사용되고 있는가?
- [ ] service에서 Zod parse를 호출하지 않는가?
- [ ] entities에는 type-only model만 존재하는가?
- [ ] Schema 간 참조가 slice 경계를 침범하지 않는가?
