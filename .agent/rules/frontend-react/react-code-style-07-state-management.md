---
trigger: glob
globs: **/store/**/*,core/store/**/*,**/*slice*.ts,**/*reducer*.ts
---

# react-code-style-07-state-management.md

이 문서는 전역 상태/스토어 배치 규칙을 정의한다.

---**/store/**/_,core/store/\*\*/_,**/_slice_.ts,**/_reducer_.ts

# 1. Principle

상태는 가능한 "가까운 곳"에 둔다.

- 컴포넌트 로컬 state -> component/container 내부
- slice 단위 state -> slice 내부 store
- 앱 전역 설정/프로바이더 -> core

---

# 2. Slice Store

경로:

- features/<domain>/<usecase>/store/\*
- entities/<entity>/store/\*

규칙:

- store는 자신과 하위 레이어만 import 한다 (상위 레이어 import 금지)
- 다른 usecase의 store를 직접 import 하지 않는다

---

# 3. Redux/Zustand Guidance

- Zustand: slice 내부에서 store 생성/사용 가능
- Redux: configureStore가 필요한 경우에도 "도메인 slice는 features/entities 내부"에 둔다

권장 패턴(예):

- features/_/_/store/slice.ts (각 slice reducer)
- core/store/index.ts (configureStore + combineReducers + provider mount)

core/store/index.ts 규칙:

- core는 features/entities의 reducer를 "수집"만 한다
- core/store는 비즈니스 로직을 가지지 않는다 (등록/조합만 담당)

---
