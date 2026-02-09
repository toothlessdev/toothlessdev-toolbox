# React Code Style Constitution  
(Next.js App Router)

이 문서는 이 저장소에서 개발자가 따라야 할 **최상위 아키텍처 규칙**이다.  
모든 구현, 리뷰, 리팩터링 판단은 이 문서를 기준으로 한다.

우리가 추구하는 목표는 하나다.

> 규모가 커져도 어디를 수정해야 하는지 **예측 가능한 구조**를 유지한다.

---

# 1. Layers (사용 레이어)

이 프로젝트는 **Feature-Sliced Design(FSD)** 구조를 따른다.  
다음 다섯 개 레이어만 사용한다.

- `core`
- `app`
- `features`
- `entities`
- `shared`

---

## 사용하지 않는 레이어

- `widgets`
- `processes`

또한 필요하다고 느껴지더라도  
**새로운 레이어를 임의로 만들지 않는다.**

---

## app 레이어에 대한 이해 (중요)

Next.js App Router를 사용한다.

여기서 `app`은 단순한 Next의 라우팅 폴더가 아니라,  
**기존 FSD에서 pages가 담당하던 "화면 컴포지션 레이어" 역할**을 수행한다.

즉,

```
app = route entry + screen composition
```

---

---

# 2. Dependency Direction (의존성 방향)

레이어 의존성은 **단방향**이다.

상위는 하위를 사용할 수 있지만,  
하위는 상위를 사용할 수 없다.

```
core → app → features → entities → shared
```

---

## 금지되는 의존

다음은 모두 위반이다.

- `entities` → `features | app | core`
- `features` → `app | core`
- `app` → `core`
- `shared` → `entities | features | app | core`

---

## 만약 필요해 보인다면?

구조가 잘못되었을 가능성이 높다.

다음 방법 중 하나로 해결한다.

1. 책임을 더 아래 레이어로 이동  
2. 공통 모듈을 `shared`로 승격  
3. `app`에서 조합하도록 변경  

**import를 억지로 우회하는 해결은 하지 않는다.**

---

---

# 3. Slice Rules

slice는 도메인 또는 유스케이스 단위의 응집된 구조다.

---

## slice를 가질 수 있는 레이어

- `entities`
- `features`

---

## slice를 가지지 않는 레이어

- `core`
- `shared`
- `app`

---

---

# 4. app 레이어의 역할

app은 **라우팅 단위의 화면 조합 위치**다.

---

## app에서 해야 할 일

- feature들을 조합한다.
- layout을 배치한다.
- 라우트 진입점을 제공한다.
- Next.js metadata 등을 정의한다.

---

## app에서 하면 안 되는 일

- 비즈니스 로직 작성 ❌  
- API 호출 ❌  
- 상태 관리 ❌  
- 데이터 변환 ❌  

이런 책임은 반드시 `features` 또는 `entities`로 이동해야 한다.

---

---

# 5. Golden Rules (항상 지키는 규칙)

---

### app은 얇게 유지한다

여기는 orchestration layer다.  
복잡해지는 순간 책임 배치가 잘못된 것이다.

---

### 비즈니스 규칙은 features / entities

UI 조합과 도메인 로직을 섞지 않는다.

---

### shared는 범용 코드만 둔다

shared에 들어갈 수 있는 것:

- UI primitives
- 공통 훅
- 유틸 함수
- 라이브러리 래퍼

도메인 의미가 들어가는 순간 shared가 아니다.

---

### 애매하면 아래로 내린다

판단이 어려우면  
`features → entities → shared` 순으로 내려보는 것이 일반적으로 맞다.

---

### 테스트 / mocks / 전역 타입

레이어가 아니다.  
기술 인프라 디렉터리로 취급한다.

하지만 **의존성 규칙은 그대로 적용**된다.

---

### 부작용은 허용된 위치에서만

다음 작업은 side-effect다.

- HTTP 요청
- localStorage 접근
- cookie 접근
- 브라우저 API 사용

이 로직은 반드시:

```
features/<domain>/<usecase>/services
```

여기에서만 수행한다.

---

### entities의 책임

entities는 도메인의 **형태와 규칙**을 정의한다.

포함되는 것:

1. type / interface  
2. domain model  
3. 순수 함수  

포함되지 않는 것:

- 외부 I/O ❌

---

---

# 6. Decision Principle

구조가 좋은지 판단하는 가장 쉬운 방법은 이것이다.

> 변경 사항이 생겼을 때  
> 어느 레이어를 수정해야 할지 바로 떠오르는가?

그렇지 않다면  
책임 분리가 잘못되었을 확률이 높다.

---

---

# 7. 마지막 원칙

아키텍처는 취향이 아니다.  
팀이 함께 예측 가능하게 일하기 위한 **약속**이다.

이 문서는 그 약속의 기준점이다.
