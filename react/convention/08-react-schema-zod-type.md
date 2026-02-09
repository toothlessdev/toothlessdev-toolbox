# React Code Style – Schema, Zod & Type Discipline

이 문서는 React + TypeScript 환경에서  
타입 import 방식과 Zod 스키마 사용 범위를 정의한다.

특히 다음을 강하게 통제한다.

- `verbatimModuleSyntax` 환경에서의 타입 import 규율
- 스키마 파일 구조
- Zod의 사용 목적
- Form ↔ Service 책임 분리

---

# Glob Pattern

```
**/*.{ts,tsx}
```

---

# 언제 이 규칙을 적용하는가

다음 작업을 할 때 항상 적용한다.

- 컴포넌트 / 컨테이너 / 훅 / 유틸 작성
- import 수정
- zod schema 작성 또는 사용

---

# 핵심 목표

1. runtime import 오염 방지  
2. schema 책임 범위 명확화  
3. 타입 시스템을 도메인과 분리  
4. 이중 검증 제거  

---

---

# 1. Type-only Import Rule  
(verbatimModuleSyntax 대응)

`"verbatimModuleSyntax": true` 환경에서는  
타입을 잘못 import 하면 **컴파일 에러**가 발생한다.

그래서 타입은 반드시 명확히 구분한다.

---

## 1.1 MUST

타입만 사용한다면 반드시 `import type`.

```ts
import type { Product } from "@/entities/product/model/ProductModel";
```

---

값과 타입을 동시에 쓰면 두 가지 방법이 있다.

### 권장 – 분리

```ts
import { formatPrice } from "@/shared/lib/formatPrice";
import type { Product } from "@/entities/product/model/ProductModel";
```

### 허용 – 한 줄

```ts
import { formatPrice, type Money } from "@/shared/lib/money";
```

---

---

## 1.2 MUST NOT

타입만 쓰는데 일반 import 사용 ❌

```ts
// 금지
import { Product } from "@/entities/product/model/ProductModel";
```

---

---

## 1.3 에러가 나오면 이렇게 고친다

에러 메시지:

```
'Product' is a type and must be imported using a type-only import
```

→ 그냥 `import type`로 바꾸면 끝.

---

---

# 2. Zod Schema 파일 구성 규칙  
(1 File = 1 Schema)

스키마 파일은 **한 가지 개념만** 표현한다.

여러 개를 묶는 "모음집 패턴"은 금지한다.

---

## 2.1 MUST

파일명:

```
<Domain><Name>Schema.ts
```

export 형식은 아래로 고정한다.

```ts
export const CartItemSchema = z.object({
  // ...
});

export type CartItemSchemaType = z.infer<typeof CartItemSchema>;
```

---

다른 개념이면 파일을 분리한다.

```
features/cart/add-item/schemas/AddToCartFormSchema.ts
```

---

---

## 2.2 SHOULD

- 타입 이름은 `*SchemaType`으로 통일
- 스키마 간 참조는 같은 slice 내부에서만 유지

---

---

## 2.3 MUST NOT

### 여러 스키마 모아두기 ❌

### DB / 도메인 타입 정의 ❌

```ts
// 금지
export type CartItem = { ... };
```

---

Schema 파일의 책임은 오직 두 가지다.

- 사용자 입력 검증
- infer 타입 제공

---

---

# 3. Zod 사용 범위 정책 (매우 중요)

Zod는 **입력 검증 도구**다.

도메인 모델링 도구가 아니다.

---

---

## 3.1 반드시 Zod를 쓰는 대상

- 사용자 Form 입력
- react-hook-form submit payload
- URL / query params
- localStorage / sessionStorage에서 읽은 값

---

## 배치 위치

```
features/<domain>/<usecase>/schemas/*Schema.ts
```

---

---

## 3.2 Zod를 사용하지 않는 대상

다음은 타입으로만 관리한다.

- 서버 API Response
- DB table 구조
- Aggregate Root

---

## 위치 예시

```
entities/post/model/PostModel.ts
entities/cart/model/CartModel.ts
```

---

---

# 4. Form Validation 책임 분리  
(react-hook-form)

검증은 **Form 레이어에서 끝낸다.**

service는 검증된 결과만 받는다.

---

---

## 4.1 MUST

```ts
export async function createPost(
  request: CreatePostFormSchemaType,
): Promise<PostModel> {
  return api.post("/api/posts", {
    body: JSON.stringify(request),
  }) as PostModel;
}
```

---

service는 타입을 신뢰한다.

---

---

## 4.2 MUST NOT

service에서 다시 검증 ❌

```ts
// 금지
CreatePostFormSchema.parse(input);
```

---

이중 검증은 유지보수 지옥을 만든다.

---

---

# 5. 컴포넌트 구현 시 Import 정리 규칙

---

## MUST

- 타입 import / 값 import를 구분한다.
- 안 쓰는 import 즉시 제거.
- `import type` 분리 권장.
- 한 줄에 `type` 명시 허용.

---

---

# 6. PR / 리뷰 체크리스트

이 문서가 적용되는 변경이라면 반드시 확인한다.

- [ ] 타입 import가 `import type`인가?
- [ ] Schema가 입력 전용으로만 쓰였는가?
- [ ] service에서 parse 호출 안 했는가?
- [ ] entities는 type-only 모델인가?
- [ ] schema 참조가 slice 경계를 넘지 않는가?

---

---

# 7. Final Principle

Zod는 사용자와 만나는 경계에서만 쓴다.  
도메인은 TypeScript 타입으로 지킨다.

이 선을 넘는 순간  
아키텍처는 급격히 무너진다.
