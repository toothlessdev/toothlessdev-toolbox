---
trigger: glob
globs: **/*.{tsx,jsx}
---

# react-code-style-09-markup.md

이 문서는 React 컴포넌트 분리 기준, 마크업 구조화, 그리고 상태 제어권 설계에 대한 규칙을 정의한다.

---

# Glob Pattern

```text
**/*.{tsx,jsx}
```

---

# Model Decision

```text
Use this rule when:
- Creating or refactoring React components.
- Deciding whether to split a component into smaller pieces.
- Determining where to locate state (Parent vs Child).
- Moving logic to Custom Hooks.
Focus:
- Reusability & Semantic grouping.
- Control delegation (State ownership).
- Separation of concerns (UI vs Logic vs Side Effects).
```

---

# 1. 컴포넌트 분리 기본 기준 (Three Pillars)

컴포넌트 분리는 단순한 코드 길이 줄이기가 아닌, 아래 세 가지 기준에 근거하여 결정한다.

## 1.1 재사용성 (Reusability)

- **MUST:** 프로젝트 내에서 2회 이상 반복되는 UI 패턴(Button, Input, Card 등)은 반드시 분리한다.
- **MUST:** 재사용 컴포넌트는 비즈니스 로직을 포함하지 않는 **Presentational Component**로 작성한다.

## 1.2 의미 단위 분리 (Semantic Grouping)

- **MUST:** 하나의 컴포넌트가 여러 도메인 맥락을 포함하거나 마크업이 비대해질 경우, 의미 있는 단위로 쪼갠다.
- **SHOULD:** `UserProfile` 내에서 `UserInfo`, `UserActivity` 등으로 분리하여 가독성을 확보한다.

## 1.3 제어권 기반 분리 (Control Management)

- **MUST:** 상태가 여러 하위 컴포넌트에서 공유되어야 한다면 제어권을 **상위(Parent)**에 둔다.
- **SHOULD:** 드롭다운의 열림/닫힘과 같이 해당 컴포넌트 내부에서만 완결되는 UI 상태는 제어권을 **하위(Child)**로 이동시켜 캡슐화한다.

---

# 2. 제어권 설계 규칙 (State Ownership)

상태 제어권의 위치에 따라 컴포넌트의 성격을 명확히 규정한다.

## 2.1 상위 집중 제어 (Controlled)

- **대상:** 데이터 일관성이 중요한 폼 입력, 전역 공유 데이터.
- **구조:** 부모가 `state`를 소유하고 자식에게 `props`와 `onChange` 콜백을 전달.
- **장점:** 데이터 흐름 추적이 명확하고 디버깅이 용이함.

## 2.2 하위 분산 제어 (Uncontrolled/Self-Contained)

- **대상:** 컴포넌트 내부 UI 상호작용 (Modal open, Tab active 등).
- **구조:** 자식 컴포넌트가 `useState`를 내부에 선언하여 자급자족.
- **장점:** 상위 컴포넌트의 리렌더링을 방지하고 로직을 단순화함.

---

# 3. 변경 빈도 기반 분리 (Volatility Isolation)

## 3.1 MUST

- **자주 변하는 로직**과 **안정적인 UI**를 분리한다.
- 비즈니스 규칙이 자주 바뀌는 영역은 별도의 컴포넌트나 Hook으로 격리하여, 안정적인 UI Shell에 영향을 주지 않도록 한다.

---

# 4. 로직 및 부수 효과 분리 (Modern Hook Pattern)

컴포넌트의 책임에서 '렌더링'과 '비즈니스 로직'을 분리한다.

## 4.1 MUST

- **Side Effect 분리:** Data fetching, Subscription 등은 반드시 **Custom Hook**으로 추출한다.
- **비즈니스 로직 분리:** 복잡한 계산이나 상태 조작 로직은 컴포넌트 내부가 아닌 Hook에서 관리한다.

```tsx
// 권장 예시: UI와 로직의 분리
const { data, isLoading } = useUserFetch(userId); // Logic & Side Effect
if (isLoading) return <Spinner />;
return <UserDetail data={data} />; // Pure UI
```

## 4.2 MUST NOT

- 하나의 컴포넌트 파일 안에 API 호출 로직과 대규모 마크업을 동시에 작성하지 않는다.

---

# 5. 구현 체크리스트

컴포넌트를 작성하기 전 다음을 자문한다:

1. **재사용:** 이 UI가 다른 곳에서도 쓰일 수 있는가?
2. **단일 책임:** 이 컴포넌트가 너무 많은 일을 하고 있지는 않은가?
3. **제어권:** 이 상태를 부모가 알아야 하는가, 아니면 여기서 끝내도 되는가?
4. **성능:** 하위 상태 변경이 부모 전체를 리렌더링하고 있지는 않은가?
