# react-code-style-10-structure-and-globs.md

이 문서는 폴더 구조, segment, glob 패턴, 파일 네이밍을 정의한다.

---

# 1. Segment Rules

Segment 패턴은 layer별로 다르게 적용된다.

## 1.1 entities

- entities/<entity>/api/
- entities/<entity>/components/
- entities/<entity>/containers/
- entities/<entity>/contexts/
- entities/<entity>/schemas/
- entities/<entity>/hooks/
- entities/<entity>/lib/
- entities/<entity>/utils/
- entities/<entity>/store/

## 1.2 features

- features/<domain>/<usecase>/api/
- features/<domain>/<usecase>/components/
- features/<domain>/<usecase>/containers/
- features/<domain>/<usecase>/contexts/
- features/<domain>/<usecase>/hooks/
- features/<domain>/<usecase>/lib/
- features/<domain>/<usecase>/utils/
- features/<domain>/<usecase>/store/

주의:

- features/<domain>은 탐색용 그룹 폴더이며 slice가 아니다.
- features/<domain>에는 비즈니스 코드를 두지 않는다.

## 1.3 pages

- pages/<url-segment>/
    - \*Page.tsx
    - \_\*Layout.tsx

pages는 slice가 아니다.

---

# 2. Glob Patterns

- Entities Schemas: `entities/*/schemas/*Schema.ts`
- Entities Containers: `entities/*/containers/*Container.tsx`
- Entities Components: `entities/*/components/*.tsx`

- Features Slice Root: `features/*/*/`
- Features APIs: `features/*/*/api/*.ts`
- Features Query Keys: `features/*/*/api/_keys.ts`
- Features Containers: `features/*/*/containers/*Container.tsx`
- Features Components: `features/*/*/components/*.tsx`

- Pages: `pages/*/*Page.tsx`
- Layouts: `pages/**/_*Layout.tsx`

---

# 3. Naming Conventions

- Schema: `*Schema.ts`
- Container: `*Container.tsx`
- Page: `*Page.tsx`
- Layout: `_*Layout.tsx`

예:

- `entities/product/schemas/ProductSchema.ts`
- `features/cart/add-item/containers/AddItemContainer.tsx`
- `pages/product/ProductDetailPage.tsx`
- `pages/_RootLayout.tsx`
- `pages/auth/_AuthLayout.tsx`

---
