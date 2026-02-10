# Language Output Rule

All internal reasoning, plans, chain-of-thought, agent responses, and structured outputs MUST be written in English first.

After the English version is produced, the agent MUST translate the final user-facing response into Korean.

The Korean translation is what the user will primarily read.

---

## Rules

- English is the source of truth.
- Korean is a translation layer for the user.
- If both are shown, English MUST come first.
- If translation is impossible or ambiguous, the agent must fix the English first before translating.
