# Rule Files

1. react-code-style-01-constitution.md

- Glob Pattern

```text
**/*
```

- Model Decision

```text
Use this rule as the highest-priority "constitution" for the repository.
Apply it for all tasks: creating files, refactoring, answering questions, or proposing architecture.
Use it to resolve conflicts: if any other rule contradicts this file, this file wins.
Focus: layer list, dependency direction, and non-negotiable constraints.
```

---

2. react-code-style-02-structure-and-globs.md

- Glob Pattern

```text
**/*
```

- Model Decision

```text
Use this rule when deciding where files/folders should live and how they should be named.
Apply it when:
- creating new folders/files
- moving/renaming files
- suggesting project structure
Focus: segment directories, glob conventions, and naming conventions (Schema/Container/Page/Layout).
```

---

3. react-code-style-03-import-boundaries.md

- Glob Pattern

```text
**/*.(ts|tsx|js|jsx)
```

- Model Decision

```text
Use this rule when writing or reviewing imports, or when splitting responsibilities across layers.
Apply it when:
- adding/modifying import statements
- proposing refactors that change dependencies
- designing shared utilities or extracting modules
Focus: allowed import directions (core -> pages -> features -> entities -> shared) and slice boundary guidance.
```

---

4. react-code-style-04-pages-and-routing.md

- Glob Pattern

```text
pages/**/*,core/router/**/*,core/App.tsx
```

- Model Decision

```text
Use this rule when working on routing and page-level composition.
Apply it when:
- creating/modifying page components (*Page.tsx)
- creating/modifying layouts (_*Layout.tsx)
- editing router composition (core/router/index.ts)
- mounting RouterProvider and global providers (core/App.tsx)
Focus: URL segment foldering, dynamic route rule, layout naming, and "pages are thin" composition-only policy.
```

---

5. react-code-style-05-api-and-query.md

- Glob Pattern

```text
**/api/**/*,@types/**/*,*@types*/**/*,entities/**/api/**,features/**/api/**
```

- Model Decision

```text
Use this rule when creating or editing API wrappers and React Query usage.
Apply it when:
- adding query keys (_keys.ts)
- writing API request/response types and API functions
- implementing use*Query hooks
Focus: query key factory consistency, naming conventions (meaning-based verbs), and co-location of request/response/hook.
```

---

6. react-code-style-06-testing-and-mocks.md

- Glob Pattern

```text
**/__tests__/**/*,**/__mocks__/**/*,entities/**/__tests__/**, entities/**/__mocks__/**, features/**/__tests__/**, features/**/__mocks__/**, tests/**, e2e/**
```

- Model Decision

```text
Use this rule when writing or organizing tests and mocks.
Apply it when:
- adding unit/integration tests inside a slice
- creating fixtures, mocks, test helpers
Focus: tests/mocks are part of the slice (not a layer), correct placement under entities/<entity> or features/<domain>/<usecase>,
and avoiding domain-group folders (features/<domain>) for tests/mocks.
```

---

7. react-code-style-07-state-management.md

- Glob Pattern

```text
**/store/**/*,core/store/**/*,**/*slice*.ts,**/*reducer*.ts
```

- Model Decision

```text
Use this rule when implementing or wiring state management (Redux/Zustand).
Apply it when:
- creating slice-level stores in features/entities
- registering reducers / configuring store in core (if using Redux)
- discussing selector placement or state boundaries
Focus: keep state close to usage, slice-level stores live in slice, core only composes/configures (no business logic).
```
