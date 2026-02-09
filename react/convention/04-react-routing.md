# React Code Style – Pages & Routing

이 문서는 `pages` 레이어의 역할과  
`react-router-dom` 기반 라우팅 구성을 정의한다.

여기서 가장 중요한 원칙은 다음이다.

> **pages는 화면 조합만 담당한다.**  
> 로직은 아래로, 라우팅 정의는 위(core)로.

---

# 1. Pages Rules

pages 레이어는 **라우팅 단위의 화면 컴포지션**을 담당한다.

---

## pages에서 해야 하는 일

- feature들을 조합한다.
- 레이아웃을 배치한다.
- URL 진입점 역할을 한다.

---

## pages에서 하면 안 되는 일

- 데이터 패칭 ❌
- 비즈니스 로직 ❌
- 서버 요청 ❌
- 복잡한 상태 처리 ❌

필요하다면 `features` 또는 `entities`의 container를 사용한다.

---

## 재사용 코드가 생기면?

pages에 두지 않는다.

→ features / entities / shared 로 이동한다.

pages는 재사용을 위한 장소가 아니다.

---

---

# 2. Pages Structure (URL segment 기준)

폴더 구조는 URL을 기준으로 만든다.

즉, **경로를 보면 폴더 위치가 바로 떠올라야 한다.**

---

## 예시

```
/cart        → pages/cart/CartPage.tsx
/checkout    → pages/checkout/CheckoutPage.tsx
/mypage      → pages/mypage/MyPage.tsx
```

---

파일 이름은 항상 `*Page.tsx`를 사용한다.

---

---

# 3. Dynamic Route Rule (중요)

동적 파라미터가 들어가더라도  
**추가 폴더를 만들지 않는다.**

---

예시: `/product/:id`

올바른 구조:

```
pages/product/ProductListPage.tsx   → /product
pages/product/ProductDetailPage.tsx → /product/:id
```

---

잘못된 구조:

```
pages/product/[id]/ProductDetailPage.tsx ❌
pages/product/detail/ProductDetailPage.tsx ❌
```

---

이 규칙을 지키면:

- 경로 예측이 쉬워지고
- import가 단순해지며
- 탐색 비용이 줄어든다.

---

---

# 4. Layout Rules (`pages/_*Layout.tsx`)

layout은 pages 레이어에 위치한다.

---

## 규칙

- Layout은 pages 내부에서만 정의한다.
- 파일명은 `_` prefix를 사용한다.
- Layout은 **라우팅 구조 + UI shell**만 담당한다.
- 데이터 패칭 / 비즈니스 로직 금지.

---

## 권장 예시

```
pages/_RootLayout.tsx
pages/auth/_AuthLayout.tsx
```

---

Layout이 무거워지면 구조가 잘못된 것이다.

---

---

# 5. React Router DOM Routing Composition

pages는 화면이고,  
**라우팅을 실제로 조립하는 위치는 core다.**

---

---

## 5.1 Router Definition

경로:

```
core/router/index.ts
```

---

## 규칙

- 모든 Route 정의는 이 파일에서만 한다.
- Route element로는  
  → `pages` 레이어의 `*Page.tsx` 또는 `_Layout.tsx`만 사용한다.
- Guard 로직은 features에 정의하고  
  → 여기(core)에서 조합한다.

---

## 예시

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

---

---

## 5.2 Router Provider Mounting

RouterProvider와 전역 Provider 조합은 다음 위치에서 한다.

```
core/App.tsx
```

---

## 규칙

- RouterProvider는 여기서 mount 한다.
- QueryClient, Theme, Auth 등  
  전역 Provider 역시 여기서 구성한다.

---

---

# 6. Responsibility Summary

정리하면 다음과 같다.

- **pages** → 화면 구성
- **features** → 기능/유즈케이스
- **entities** → 도메인
- **shared** → 범용
- **core** → 앱 조립

---

# 7. Final Principle

URL이 바뀌면 pages를 수정한다.  
기능이 바뀌면 features를 수정한다.  
도메인이 바뀌면 entities를 수정한다.

이 예측 가능성이  
좋은 아키텍처다.
