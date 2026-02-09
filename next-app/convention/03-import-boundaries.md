# react-code-style-03-import-boundaries.md

이 문서는 레이어/슬라이스 경계에서의 import 규칙을 정의한다.

---

# 1. Layer Import Rules (절대 규칙)

허용:

core -> app -> features -> entities -> shared

금지:

- 하위 레이어가 상위 레이어를 import
- shared가 entities/features/app/core import

---

# 2. Slice Boundary Rules (권장)

## 2.1 entities

- entities/<entity> 내부 코드는 자신 또는 더 하위(shared)만 import 가능
- entities/<entity>가 다른 entity slice를 직접 참조하는 것은 신중히 한다
    - 필요 시 shared로 공통 타입/유틸을 승격하거나
    - 더 상위(features/app)에서 조합한다

entities 내부의 데이터 표현 단위는 **models 대신 schemas** 로 통일한다.

---

## 2.2 features

- features/<domain>/<usecase>는 entities/shared를 import 가능
- 다른 usecase를 import 하는 것은 원칙적으로 금지(결합 증가)
    - 공통이 필요하면:
        1. entities로 내리거나
        2. shared로 승격하거나
        3. 상위(app)에서 조합한다

---

# 3. app import rules

app은 features/entities/shared를 import 가능  
app은 core를 import 하지 않는다 (core가 app을 조합하는 위치)

app은 "조합만" 한다.

- 데이터 패칭/비즈니스 로직은 features/entities로 내려보낸다

---

# 4. shared import rules

shared는 오직 shared 내부만 import 한다.  
(shared는 범용 레이어이므로, 도메인 의존을 가지면 안 된다)

---
