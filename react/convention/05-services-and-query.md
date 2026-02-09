# React Code Style – Services & Query

이 문서는 **API 호출 위치**,  
Service 파일의 책임과 구성 방식,  
React Query 사용 규칙을 정의한다.

목표는 다음과 같다.

- 네트워크 접근 지점을 명확히 통제한다.
- 타입과 호출 흐름을 한눈에 보이게 만든다.
- 어디서 side-effect가 발생하는지 즉시 알 수 있게 한다.

---

# 1. Query Keys

Query Key는 React Query 캐싱 전략의 핵심이다.  
그래서 규칙을 강하게 통일한다.

---

## 위치

```
features/<domain>/<usecase>/services/_keys.ts
```

---

## 규칙

- 모든 키는 **화살표 함수**로 작성한다.
- 단일 `readonly string[]`을 반환하는 경우에도 함수로 작성한다.
- 키 오브젝트 이름은 **UPPER_SNAKE_CASE**를 사용한다.

---

## 왜 함수로 통일하나?

- 인자 추가가 쉬워진다.
- 타입 추론이 안정적이다.
- key 생성 패턴이 일관된다.

---

## 예시

```ts
declare type QueryKey = Record<string, (...args: any[]) => readonly unknown[]>;

export const ITEM_QUERY_KEY = {
  ALL: () => ["items"],
  DETAIL: (id: number) => ["items", id],
} satisfies QueryKey;
```

---

---

# 2. Service Files  
(Params / Response Type + Hook Co-location)

Service는 **외부 I/O가 발생하는 진입점**이다.

HTTP 요청, localStorage, 쿠키 접근 등  
side-effect는 여기에서만 수행한다.

---

## 위치

```
features/<domain>/<usecase>/services/*.ts
```

---

## 파일 내부 구성

하나의 파일 안에 다음을 함께 둘 수 있다.

- 요청 파라미터 타입
- 응답 타입
- HTTP 호출 함수
- useQuery / useMutation 훅

이를 통해 해당 유스케이스의 네트워크 흐름을 한 곳에서 파악할 수 있다.

---

---

## 함수 작성 규칙

API 호출 함수는 반드시 **함수 선언문**을 사용한다.

```ts
export async function getSomething() {}
```

이유:

- `async`가 앞에 보여  
  비동기 함수임을 즉시 인지할 수 있다.

---

---

## 파일 이름 규칙

파일명은 **API 함수 이름을 따른다.**

예:

```
getOrderById.ts
createOrder.ts
editProfile.ts
```

---

---

## Zod 사용 관련 매우 중요 ⚠️

### 하지 않는다

- service에서 `Schema.parse`
- service에서 `safeParse`
- 서버 Response 검증

서버 응답은 **타입으로만 취급**한다.

---

### 어디서 검증하나?

Form 입력 검증은  
→ react-hook-form 레이어에서 수행한다.  
(해당 규칙은 별도 문서에서 정의)

---

---

## 예시

```ts
export type GetOrderByIdParams = {
  orderId: number;
};

export type GetOrderByIdResponse = OrderSchema;

export async function getOrderById(params: GetOrderByIdParams) {
  return api.get<GetOrderByIdResponse>(`/api/orders/${params.orderId}`);
}

export const useGetOrderByIdQuery = (orderId: number) => {
  return useSuspenseQuery({
    queryKey: ORDER_QUERY_KEY.DETAIL(orderId),
    queryFn: () => getOrderById({ orderId }),
  });
};
```

---

---

# 3. Service Function Naming Convention

이름은 HTTP method가 아니라  
**의미 중심**으로 작성한다.

우리는 "어떤 동작을 하는지"를 표현한다.

---

## 좋은 예시

- `get`
- `create`
- `edit`
- `delete`

예:

- `createOrder`
- `editProfile`
- `getProducts`
- `getProductsById`

---

## 나쁜 예시

- `fetch`
- `post`
- `put`
- `patch`

이름에서 HTTP 구현 디테일이 드러나지 않게 한다.

---

---

# 4. Responsibility Summary

service는 다음을 담당한다.

- 외부 시스템과 통신
- 요청/응답 타입 정의
- React Query와 연결
- 캐시 키 사용

---

그리고 담당하지 않는 것:

- UI 검증 ❌
- 데이터 가공 로직 ❌
- 도메인 규칙 ❌

그것들은 더 적절한 레이어에 있어야 한다.

---

---

# 5. Final Principle

API 호출은 시스템의 **출입문**이다.

출입문이 명확하면  
디버깅, 추적, 리팩터링이 쉬워진다.
