# React Code Style – Import Boundaries

이 문서는 **레이어 간**, 그리고 **slice 간**의 import 규칙을 정의한다.

목표는 단 하나다.

> 의존성을 예측 가능하게 만들고  
> 변경이 전파되는 범위를 통제한다.

import 규칙이 무너지면  
FSD 구조는 즉시 붕괴한다.

---

# 1. Layer Import Rules (절대 규칙)

레이어 간 의존성은 단방향이다.

허용:

```
core → pages → features → entities → shared
```

상위는 하위를 사용할 수 있다.  
하지만 하위는 상위를 절대 사용할 수 없다.

---

## 금지되는 경우

다음은 모두 위반이다.

- 하위 레이어가 상위 레이어 import
- `shared`가 `entities`, `features`, `pages`, `core` import

이 규칙은 예외가 없다.

---

## 만약 필요해 보인다면?

구조가 잘못되었을 가능성이 높다.

해결 방법:

- 책임을 더 아래 레이어로 이동
- 공통 모듈을 shared로 승격
- pages에서 조합하도록 변경

**import 경로를 우회하는 방식으로 해결하지 않는다.**

---

---

# 2. Slice Boundary Rules (권장 규칙)

레이어 내부에서도 slice 간 결합을 최소화해야 한다.

---

## 2.1 entities

원칙:

- `entities/<entity>` 내부 코드는  
  → 자기 자신 또는 `shared`만 사용한다.

---

### 다른 entity 참조는?

가능하지만 매우 신중해야 한다.

왜냐하면:

- 도메인 결합이 강해지고
- 수정 영향 범위가 커지며
- 재사용성이 떨어진다.

---

### 더 좋은 해결 방법

필요하다면 다음 중 하나를 선택한다.

1. 공통 타입/로직을 `shared`로 승격
2. 상위 레이어(`features` / `pages`)에서 조합

---

---

## 2.2 features

원칙:

- `features/<domain>/<usecase>`는  
  → `entities`, `shared`를 import 할 수 있다.

---

### 다른 usecase를 import 해도 될까?

원칙적으로 금지한다.

이유:

- 기능 간 강한 결합 발생
- 독립적인 수정이 어려워짐
- 테스트 범위가 비정상적으로 확대됨

---

### 공통 로직이 필요하다면

다음 중 하나를 수행한다.

1. entities로 내린다 (도메인 개념이면)
2. shared로 올린다 (범용이면)
3. pages에서 orchestration 한다

---

---

# 3. Pages Import Rules

pages는 **조합 레이어**다.

허용:

- features
- entities
- shared

금지:

- core

core는 pages를 사용하는 위치이기 때문이다.

---

## pages의 책임

pages는 다음만 한다.

- feature 조합
- layout 배치
- 라우팅 진입점 역할

---

## pages가 하면 안 되는 것

- API 호출 ❌
- 상태 로직 ❌
- 비즈니스 규칙 ❌

이런 책임은 features / entities로 내려보낸다.

---

---

# 4. Shared Import Rules

shared는 가장 아래 레이어다.

그래서 다음 원칙을 가진다.

> shared는 오직 shared 내부만 import 한다.

---

### 왜 이렇게 강하게 제한하나?

shared는 범용 모듈이어야 한다.

도메인 의존이 생기는 순간:

- 재사용성 붕괴
- 테스트 독립성 붕괴
- 계층 구조 붕괴

즉, shared가 위를 바라보는 순간 모든 것이 무너진다.

---

---

# 5. 현실적인 판단 기준

import 하려는 순간 이렇게 생각하면 된다.

> 이 코드는 도메인에 묶여 있는가?  
> 아니면 어디서든 사용할 수 있는가?

도메인에 묶여 있다면 shared가 아니다.

---

---

# 6. Final Principle

import는 단순한 문법이 아니다.

**아키텍처를 만드는 행위다.**

한 줄의 import가  
수십 개 파일의 운명을 결정한다.
