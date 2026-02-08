# react-code-style-00-constitution.md

이 문서는 이 저장소의 "최상위 헌법"이다.  
항상 적용되며, 다른 모든 규칙보다 우선한다.

---

# 1. Layers (사용 레이어)

이 저장소는 Feature-Sliced Design(FSD)을 기반으로 하며, 다음 레이어만 사용한다.

- core
- pages
- features
- entities
- shared

(X) widgets, processes 레이어는 사용하지 않는다.

---

# 2. Dependency Direction (절대 규칙)

상위 레이어는 하위 레이어를 import 할 수 있다.  
하위 레이어는 상위 레이어를 import 할 수 없다.

허용 방향:
core -> pages -> features -> entities -> shared

금지:

- entities -> features/pages/core
- features -> pages/core
- pages -> core
- shared -> entities/features/pages/core

문제가 발생하면:

- 더 하위 레이어로 책임을 이동하거나
- 코드를 분리하여 의존성을 끊는다.

---

# 3. Slice Rules

slice를 가질 수 있는 레이어:

- entities
- features

slice를 가지지 않는 레이어:

- core
- shared
- pages

pages는 라우팅 단위의 "화면 컴포지션"만 담당한다.

---

# 4. Golden Rules (항상 지키는 규칙)

- pages는 가능한 얇게 유지한다. (비즈니스 로직/데이터 패칭 금지)
- 비즈니스 규칙은 features/entities로 이동한다.
- shared는 범용 코드만 둔다. (프로젝트 도메인 종속 로직 금지)
- 파일 위치가 애매하면 "File Placement Decision Tree"를 따른다.
- 테스트/모킹/전역 타입(@types)은 레이어가 아니다. (기술 인프라 디렉터리)

---
