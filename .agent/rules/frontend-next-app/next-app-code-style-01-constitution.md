# react-code-style-01-constitution.md  
(Next.js App Router / Agent Readable)

이 문서는 이 저장소의 **최상위 헌법**이다.  
항상 적용되며, 다른 모든 규칙보다 우선한다.

AI 에이전트는 코드를 생성/수정/이동할 때  
반드시 이 규칙을 먼저 만족해야 한다.

---

# 1. Layers (사용 레이어)

이 저장소는 Feature-Sliced Design(FSD)을 기반으로 하며,  
다음 레이어만 사용한다.

- core
- app
- features
- entities
- shared

금지:

- widgets
- processes
- 기타 임의의 신규 레이어 생성

---

## 해석 규칙 (중요)

Next.js App Router를 사용한다.

하지만 여기서의 `app`은  
단순한 Next 폴더가 아니라 **FSD의 pages 역할(화면 컴포지션)** 을 의미한다.

즉,

```
app = route entry + screen composition
```

---

---

# 2. Dependency Direction (절대 규칙)

레이어 의존성은 단방향이다.

상위 → 하위 만 가능하다.

```
core → app → features → entities → shared
```

---

## 금지

- entities → features/app/core
- features → app/core
- app → core
- shared → entities/features/app/core

---

## 만약 필요해 보이면

AI는 다음 중 하나를 선택해야 한다.

1. 책임을 더 하위 레이어로 이동  
2. 공통 로직을 shared로 승격  
3. app에서 조합하도록 구조 변경  

import 우회 / alias 꼼수 / barrel 뚫기 → 금지.

---

---

# 3. Slice Rules

slice는 도메인 또는 유스케이스 단위의 응집된 구조다.

---

## slice 허용 레이어

- entities
- features

---

## slice 금지 레이어

- core
- shared
- app

---

---

# 4. app 레이어 정의 (Next.js)

app은 **라우팅 단위 화면 조합 레이어**다.

---

## app이 해야 할 일

- feature 조합
- layout 조립
- route entry
- next metadata 설정

---

## app이 하면 안 되는 일

- 비즈니스 로직 ❌
- API 호출 ❌
- 상태 관리 ❌
- 데이터 변환 ❌

필요하면 features/entities로 이동시킨다.

---

---

# 5. Golden Rules (항상 적용)

AI는 코드 작성 시 아래를 자동 검증해야 한다.

---

### app은 얇아야 한다

조합만 한다.  
두꺼워지면 구조 위반이다.

---

### 비즈니스 로직은 features / entities

UI 파일 안에 규칙을 넣지 않는다.

---

### shared는 범용

도메인 의미가 들어가면 shared 사용 금지.

---

### 애매하면 아래로 내린다

판단이 어려우면  
features → entities → shared 순으로 내려본다.

---

### 테스트 / mocks / @types

레이어가 아니다.  
인프라 디렉터리다.

의존성 규칙은 그대로 유지한다.

---

### Side Effect 제한

다음 작업은 반드시 여기서만 수행한다.

```
features/<domain>/<usecase>/services
```

- HTTP
- localStorage
- cookie
- browser API

---

### entities 규칙

entities는 다음만 가진다.

- type
- domain model
- 순수 로직

외부 I/O 금지.

---

---

# 6. Agent Decision Rule (중요)

AI가 파일을 생성하거나 이동할 때  
다음 질문에 답해야 한다.

```
이 책임은 어디 레이어에 가장 자연스러운가?
```

만약 한 번에 답이 안 나오면  
현재 구조가 잘못되었을 가능성이 높다.

---

---

# 7. Failure Handling

이 규칙을 만족하지 못하면:

- 코드를 생성하지 말고
- 더 적절한 레이어 구조를 제안해야 한다.

---

이 문서는 모든 자동 코드 생성, 리팩터링, 리뷰 판단의  
최상위 기준이다.
