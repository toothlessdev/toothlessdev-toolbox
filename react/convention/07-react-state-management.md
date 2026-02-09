# React Code Style – State Management

이 문서는 전역 상태 및 스토어의 **배치 원칙**과  
레이어별 책임을 정의한다.

목표는 단순하다.

> 상태는 필요한 범위에 가장 가깝게 둔다.

멀리 보낼수록 결합이 증가하고  
이해 비용이 올라간다.

---

# 1. Principle

상태의 범위에 따라 위치를 결정한다.

---

## 컴포넌트 로컬 상태

→ component / container 내부에 둔다.

예:

- UI 토글
- 입력값
- 일시적인 interaction 상태

굳이 전역으로 올리지 않는다.

---

---

## slice 단위 상태

→ 해당 slice 내부의 `store` 디렉터리에 둔다.

기능 또는 엔티티 범위에서 공유된다면  
거기가 가장 자연스러운 위치다.

---

---

## 앱 전역 설정 / Provider 수준

→ `core`에 둔다.

예:

- Redux store 생성
- 전역 Provider
- middleware 연결
- devtools 설정

---

---

# 2. Slice Store

---

## 위치

```
features/<domain>/<usecase>/store/*
entities/<entity>/store/*
```

---

## 규칙

- store는 **자기 레이어 + 하위 레이어만 import 가능**하다.
- 상위 레이어 import는 금지한다.
- 다른 usecase의 store를 직접 참조하지 않는다.

---

## 왜?

store는 상태 결합을 만들어낸다.

잘못 연결되면  
의존성 그래프가 즉시 꼬인다.

---

---

# 3. Zustand / Redux 가이드

우리는 특정 라이브러리를 강제하지 않는다.  
하지만 구조 규칙은 동일하게 적용된다.

---

---

## Zustand

- slice 내부에서 생성하고 사용한다.
- 해당 기능 범위를 벗어나지 않는다.

즉, 필요하면 가져다 쓰는 것이 아니라  
**그 slice에 속한 상태**여야 한다.

---

---

## Redux

Redux는 전역 store가 필요하기 때문에  
두 단계로 나눈다.

---

### 1️⃣ 도메인 reducer는 slice 내부

```
features/<domain>/<usecase>/store/slice.ts
entities/<entity>/store/slice.ts
```

여기에 비즈니스 상태 로직이 존재한다.

---

---

### 2️⃣ core는 수집과 조합만

```
core/store/index.ts
```

core는 다음 역할만 수행한다.

- reducer import
- combine
- configureStore
- Provider 연결

---

## core/store에서 하면 안 되는 것

- 비즈니스 로직 추가 ❌
- 상태 가공 ❌
- 도메인 규칙 작성 ❌

core는 조립자다.  
창조자가 아니다.

---

---

# 4. 권장 구조 예시

```
features/cart/add-item/store/slice.ts
entities/user/store/slice.ts

core/store/index.ts
```

---

---

# 5. 흔한 실수

### ❌ 전역 store에 모든 걸 넣기  
→ 변경 범위 폭발

### ❌ 다른 slice store 직접 참조  
→ 순환 의존 시작

### ❌ shared에 store 만들기  
→ 도메인 책임 붕괴

---

---

# 6. Final Principle

상태가 어디에 있어야 자연스러운가?

그 질문의 답이  
**파일 위치**다.

가깝게 둘수록 좋다.  
멀수록 구조는 망가진다.
