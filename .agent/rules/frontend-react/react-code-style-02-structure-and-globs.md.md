---
trigger: glob
globs: **/*
---

# react-code-style-02-structure-and-globs.md

이 문서는 폴더 구조, segment, glob 패턴, 파일 네이밍을 정의한다.

---

# 1. Segment Rules

Segment 패턴은 layer별로 다르게 적용된다.

## 1.1 entities

- entities/<entity>/components/
- entities/<entity>/containers/
- entities/<entity>/contexts/
- entities/<entity>/model/
- entities/<entity>/hooks/
- entities/<entity>/lib/
- entities/<entity>/utils/
- entities/<entity>/store/

## 1.2 features

- features/<domain>/<usecase>/components/
- features/<domain>/<usecase>/containers/
- features/<domain>/<usecase>/contexts/
- features/<domain>/<usecase>/hooks/
- features/<domain>/<usecase>/lib/
- features/<domain>/<usecase>/utils/
- features/<domain>/<usecase>/schemas/
- features/<domain>/<usecase>/services/
- features/<domain>/<usecase>/store/

---

# 2. Glob Patterns

- Entities Models: `entities/*/model/*Model.ts`
- Entities Containers: `entities/*/containers/*Container.tsx`
- Entities Components: `entities/*/components/*.tsx`

- Features Slice Root: `features/*/*/`
- Features Schemas: `features/*/*/schema/*Schema.ts`
- Features Services: `features/*/*/services/*.ts`
- Features Query Keys: `features/*/*/services/_keys.ts`
- Features Containers: `features/*/*/containers/*Container.tsx`
- Features Components: `features/*/*/components/*.tsx`

- Pages: `pages/*/*Page.tsx`
- Layouts: `pages/**/_*Layout.tsx`

---

# 3. Naming Conventions

- Model: `*Model.ts`
- Schema: `*Schema.ts`
- Container: `*Container.tsx`
- Page: `*Page.tsx`
- Layout: `_*Layout.tsx`

예:

- `entities/product/model/ProductModel.ts`
- `features/cart/add-item/schema/AddToCartFormSchema.ts`
- `features/cart/add-item/services/addToCart.ts`
- `features/cart/add-item/containers/AddItemContainer.tsx`
- `pages/product/ProductDetailPage.tsx`
- `pages/_RootLayout.tsx`
- `pages/auth/_AuthLayout.tsx`
