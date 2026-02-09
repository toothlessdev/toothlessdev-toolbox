# React Code Style – Testing & Mocks

이 문서는 테스트 코드와 모킹, 픽스처의 **위치와 취급 방식**을 정의한다.

목표는 다음이다.

- 테스트가 구조를 망가뜨리지 않게 한다.
- 대상 코드와 테스트의 연결성을 유지한다.
- 의존성 규칙을 그대로 적용한다.

---

# 1. tests & mocks are NOT layers

`__tests__`, `__mocks__`는  
FSD의 레이어가 아니다.

이들은 **slice를 보조하는 디렉터리**다.

즉,

> 테스트는 아키텍처 위에 존재하는 것이 아니라  
> 그 일부로 포함된다.

---

따라서:

- import 규칙은 동일하게 적용된다.
- 레이어 경계가 완화되지 않는다.
- 어디든 자유롭게 참조해도 되는 특권이 없다.

---

---

# 2. Placement Rules

테스트와 모킹은 항상  
**검증 대상과 가장 가까운 곳**에 둔다.

멀리 떨어뜨리지 않는다.

---

## 핵심 규칙

- 테스트/모킹은 **같은 slice 내부**에 둔다.
- `__tests__`, `__mocks__`는 segment가 아니다.
- 이 디렉터리가 생긴다고 slice 경계가 바뀌지 않는다.
- 그룹 폴더에는 두지 않는다.

---

---

## 금지되는 위치 예시

```
features/cart/__tests__ ❌
features/cart/__mocks__ ❌
```

`cart`는 domain grouping일 뿐  
usecase slice가 아니다.

---

---

## 허용되는 위치

### entities

```
entities/<entity>/__tests__/*
entities/<entity>/__mocks__/*
```

---

### features

```
features/<domain>/<usecase>/__tests__/*
features/<domain>/<usecase>/__mocks__/*
```

---

이렇게 두면 테스트가  
**어떤 기능에 속하는지 즉시 알 수 있다.**

---

---

# 3. Integration / App Level Tests

라우팅, 여러 feature 조합,  
앱 단위 시나리오는 별도의 루트 영역을 사용한다.

---

## 권장 위치

```
tests/*
e2e/*
```

---

여기는 slice 단위가 아닌  
**애플리케이션 단위 검증**이다.

---

---

# 4. Fixtures (선택 규칙)

테스트용 데이터 묶음을 따로 관리하고 싶다면  
fixture 디렉터리를 둘 수 있다.

---

## 방법 1 – slice 내부

가장 권장되는 방식.

```
features/<domain>/<usecase>/__fixtures__/*
entities/<entity>/__fixtures__/*
```

테스트와 매우 가까워 유지보수가 쉽다.

---

---

## 방법 2 – 통합 관리

```
tests/fixtures/*
```

공통으로 쓰이는 경우 사용한다.

---

---

# 5. 왜 이렇게 강하게 제한하나?

테스트가 멀어질수록 다음 문제가 발생한다.

- 어떤 기능을 검증하는지 찾기 어려워진다.
- 리팩터링 시 같이 수정되지 않는다.
- 고아 테스트가 생긴다.

그래서 우리는 항상  
**대상 코드 옆에 둔다.**

---

---

# 6. Final Principle

테스트는 문서다.

그리고 문서는  
**가장 가까운 곳에 있어야 읽힌다.**
