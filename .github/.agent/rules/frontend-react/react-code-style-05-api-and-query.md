# react-code-style-40-api-and-query.md

이 문서는 API 파일 배치, 네이밍, React Query 규칙을 정의한다.

---

# 1. Query Keys

경로:

- entities/<entity>/api/\_keys.ts
- features/<domain>/<usecase>/api/\_keys.ts

규칙:

- 모든 키는 화살표 함수로 통일한다
- 단일 readonly string[] 을 반환하는 경우에도 화살표 함수로 통일한다
- 쿼리키 오브젝트는 UPPER_SNAKE_CASE 를 사용한다

예시:

```ts
declare type QueryKey = Record<string, (...args: any[]) => readonly unknown[]>;

export const ITEM_QUERY_KEY = {
    ALL: () => ["items"],
    DETAIL: (id: number) => ["items", id],
} satisfies QueryKey;
```

---

# 2. API Files (Request/Response + Hook Co-location)

경로:

- entities/<entity>/api/\*.ts
- features/<domain>/<usecase>/api/\*.ts

규칙:

- RequestDto, ResponseDto, api 호출 함수, use\*Query 호출 훅을 하나의 파일에 둔다
- 관련 타입과 호출 로직을 co-location 하여 응집도를 높인다

예시:

```ts
export type GetOrderByIdRequest = Pick<OrderSchema, "orderId">;
export type GetOrderByIdResponse = OrderSchema;

export async function getOrderById(request: GetOrderByIdRequest) {
    return api.get<GetOrderByIdResponse>(`/api/orders/${request.orderId}`);
}

export const useGetOrderByIdQuery = (orderId: number) => {
    return useSuspenseQuery({
        queryKey: ORDER_QUERY_KEY.DETAIL(orderId),
        queryFn: () => getOrderById({ orderId }),
    });
};
```

---

# 3. API Naming Convention

규칙:

- 네이밍은 http method 기반 이름보다 의미 기반을 사용한다

좋은 예시:

- get
- create
- edit
- delete

나쁜 예시:

- fetch
- post
- put
- patch

예시:

- createOrder
- editProfile
- getProducts
- getProductsById

---
