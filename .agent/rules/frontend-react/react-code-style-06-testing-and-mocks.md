---
trigger: glob
globs: **/__tests__/**/*,**/__mocks__/**/*,entities/**/__tests__/**, entities/**/__mocks__/**, features/**/__tests__/**, features/**/__mocks__/**, tests/**, e2e/**
---

# react-code-style-06-testing-and-mocks.md

이 문서는 테스트/모킹/픽스처 위치 및 정책을 정의한다.

---

# 1. tests & mocks are NOT layers

`__tests__`, `__mocks__`는 레이어가 아니다.  
"해당 slice의 일부"로 취급하는 보조 디렉터리다.

---

# 2. Placement Rules

규칙:

- 테스트/모킹은 항상 "대상 코드와 같은 slice 내부"에 둔다
- `__tests__`, `__mocks__`는 segment가 아니라 "slice 보조 디렉터리"다
- 이 디렉터리 때문에 slice 경계가 바뀌지 않는다 (import 규칙 동일 적용)
- `features/<domain>` 같은 "그룹 폴더" 아래에는 `__tests__`, `__mocks__`를 두지 않는다

허용 경로:

- entities/<entity>/**tests**/\*
- entities/<entity>/**mocks**/\*
- features/<domain>/<usecase>/**tests**/\*
- features/<domain>/<usecase>/**mocks**/\*

통합 테스트(라우팅/페이지 조합 등) 권장 위치:

- tests/\*
- e2e/\*

---

# 3. Fixtures (선택)

fixture를 별도로 둘 경우:

- 동일 slice 내부 `__fixtures__` 사용 가능
- 또는 tests/fixtures 로 통합 관리

권장:

- features/<domain>/<usecase>/**fixtures**/\*
- entities/<entity>/**fixtures**/\*

---
