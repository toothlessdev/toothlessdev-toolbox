# React Code Style Constitution

이 문서는 이 저장소에서 개발자가 따라야 할 **최상위 컨벤션**이다.  
여기에 정의된 규칙은 다른 모든 가이드보다 우선한다.

코드를 작성하거나 구조를 변경할 때 항상 이 문서를 기준으로 판단한다.

---

# 1. Architecture Overview

이 프로젝트는 **Feature-Sliced Design (FSD)** 구조를 기반으로 한다.

우리는 복잡도가 증가해도 유지 가능한 구조,  
역할이 명확하게 분리된 구조,  
확장 시 충돌이 적은 구조를 목표로 한다.

사용 가능한 레이어는 아래 다섯 가지뿐이다.

- `core`
- `pages`
- `features`
- `entities`
- `shared`

다음 레이어는 **사용하지 않는다.**

- `widgets`
- `processes`

새로운 레이어를 임의로 추가하는 행위 또한 금지한다.

---

# 2. Dependency Direction (의존성 방향)

레이어 간 의존성은 **단방향**이다.

상위 레이어는 하위 레이어를 import 할 수 있다.  
하지만 하위 레이어는 상위 레이어를 import 할 수 없다.

허용되는 방향:

```
core → pages → features → entities → shared
```

예를 들어:

- `pages`는 `features`를 사용할 수 있다.
- `features`는 `entities`를 사용할 수 있다.

하지만 다음은 모두 금지된다.

- `entities` → `features | pages | core`
- `features` → `pages | core`
- `pages` → `core`
- `shared` → `entities | features | pages | core`

---

## 충돌이 발생하면?

의존성이 맞지 않는다면 다음 중 하나를 수행해야 한다.

1. 더 하위 레이어로 책임을 이동한다.
2. 공통 로직을 분리하여 의존성을 제거한다.

**import를 억지로 뚫는 방식의 해결은 절대 금지한다.**

---

# 3. Slice Rules

FSD에서 slice는 도메인 또는 기능 단위의 응집된 묶음이다.

slice를 가질 수 있는 레이어는 다음뿐이다.

- `entities`
- `features`

slice를 가지지 않는 레이어:

- `core`
- `shared`
- `pages`

---

## pages의 역할

`pages`는 라우팅 기준의 **화면 구성(Composition)** 만 담당한다.

pages는:

- 여러 feature를 조합하고
- 레이아웃을 구성하며
- 화면 진입 지점 역할을 한다.

하지만 다음은 하지 않는다.

- 비즈니스 로직 작성 ❌  
- 데이터 패칭 ❌  
- 외부 API 호출 ❌

이런 책임은 반드시 `features` 또는 `entities`로 이동해야 한다.

---

# 4. Golden Rules (절대 규칙)

아래 규칙은 항상 지켜야 한다.

---

### pages는 얇게 유지한다

pages는 orchestration layer다.  
복잡해지는 순간 잘못된 구조 신호다.

---

### 비즈니스 규칙은 features / entities 로 이동한다

UI가 아니라  
**도메인 책임이 있는 위치**로 가야 한다.

---

### shared는 범용 코드만 둔다

shared에는 다음만 올 수 있다.

- UI primitives
- 공통 훅
- 유틸 함수
- 라이브러리 래퍼

도메인 의미가 들어가는 순간 shared가 아니다.

---

### 애매하면 기준을 따른다

파일 위치가 헷갈리면  
반드시 **File Placement Decision Tree** 기준으로 판단한다.

감으로 두지 않는다.

---

### 테스트 / 모킹 / 전역 타입

이것들은 FSD 레이어가 아니다.

기술 인프라 성격의 디렉터리로 취급한다.

---

### 부작용은 허용된 위치에서만

다음 작업들은 부작용이다.

- HTTP 요청
- localStorage 접근
- 쿠키 접근
- 브라우저 API 사용

이 로직은 반드시 아래 위치에서만 수행한다.

```
features/<domain>/<usecase>/services
```

---

### entities의 책임

entities는 도메인의 **형태와 규칙**을 정의한다.

우선순위:

1. type / interface
2. domain model
3. 순수 로직

entities에서 외부 I/O를 직접 수행하는 것은 금지한다.

---

# 5. Decision Principle

이 구조의 목적은 하나다.

> 변경이 생겨도, 어디를 수정해야 하는지 예측 가능하게 만든다.

예측이 어렵다면  
구조가 잘못되었을 확률이 높다.

---

이 문서는 모든 코드 리뷰와 설계 논의의 기준이 된다.
