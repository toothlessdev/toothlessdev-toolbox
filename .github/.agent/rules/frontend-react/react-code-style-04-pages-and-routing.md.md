# react-code-style-30-pages-and-routing.md

이 문서는 pages 레이어 분리 규칙과 react-router-dom 라우팅 구성 규칙을 정의한다.

---

# 1. Pages Rules

pages 레이어는 라우팅 단위의 "화면 컴포지션"을 담당한다.

규칙:

- pages에는 "라우팅 경로" 기준으로 폴더를 만든다 (URL segment 기반)
- pages는 가능한 한 얇게 유지한다 (컴포지션만)
- pages 내부에서 재사용되는 로직/컴포넌트가 생기면 features/entities/shared로 이동한다
- pages에서 데이터 패칭/비즈니스 로직 금지 (필요하면 features container 조합)

---

# 2. Pages Structure (URL segment 기준)

정적 라우트는 URL segment 별 폴더를 만든다.

예시:

- "/cart" -> pages/cart/CartPage.tsx
- "/checkout" -> pages/checkout/CheckoutPage.tsx
- "/mypage" -> pages/mypage/MyPage.tsx

---

# 3. Dynamic Route Rule (중요)

동적 경로가 들어가는 라우트는 "별도의 세그먼트 폴더"를 만들지 않는다.

예: "/product/:id"

- (O) pages/product/ProductListPage.tsx -> "/product"
- (O) pages/product/ProductDetailPage.tsx -> "/product/:id"
- (X) pages/product/[id]/ProductDetailPage.tsx
- (X) pages/product/detail/ProductDetailPage.tsx

---

# 4. Layout Rules (pages/\_\*Layout.tsx)

layout은 pages 레이어에서 관리한다.

규칙:

- Layout 컴포넌트는 pages 내부에서만 정의한다
- 파일명은 `_` prefix를 사용하여 `_RootLayout.tsx` 형태로 통일한다
- Layout은 "라우팅 구조(Outlet) + UI shell"만 담당한다
- Layout에서 데이터 패칭/비즈니스 로직 금지

권장:

- pages/\_RootLayout.tsx
- pages/auth/\_AuthLayout.tsx

---

# 5. React Router DOM Routing Composition

react-router-dom을 사용하는 경우, 라우팅 컴포지션은 core에서 관리한다.

## 5.1 Router Definition

경로:

- core/router/index.ts

규칙:

- 모든 Route 정의는 core/router/index.ts 에서만 한다
- Route element로는 pages 레이어의 *Page.tsx 또는 pages 레이어의 \_*Layout.tsx 만 사용한다
- guard는 features에 정의하고, core/router에서 조합한다

예시:

```ts
import { createBrowserRouter, createRoutesFromElements, Route } from "react-router-dom";

import RootLayout from "@/pages/_RootLayout";

import HomePage from "@/pages/home/HomePage";
import MyPage from "@/pages/mypage/MyPage";
import NotFoundPage from "@/pages/not-found/NotFoundPage";

import AuthLayout from "@/pages/auth/_AuthLayout";
import SignInPage from "@/pages/auth/SignInPage";

import OrderPage from "@/pages/order/OrderPage";

const routes = createRoutesFromElements(
  <Route path="/" element={<RootLayout />}>
    <Route index element={<HomePage />} />
    <Route path="auth" element={<AuthLayout />}>
      <Route path="signin" element={<SignInPage />} />
    </Route>
    <Route path="my" element={<MyPage />} />
    <Route path="order/:id" element={<OrderPage />} />
    <Route path="*" element={<NotFoundPage />} />
  </Route>,
);

export const browserRouter = createBrowserRouter(routes);
```

## 5.2 Router Provider Mounting

경로:

- core/App.tsx

규칙:

- RouterProvider는 core/App.tsx 에서 mount 한다
- 전역 Provider는 core/App.tsx 에서 조합한다

---
