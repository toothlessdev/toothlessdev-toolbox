# ✍️ VSCode Code Snippets

## 적용방법

1. `.vscode/*.code-snippets` 파일을 만들어요
2. 아래에서 사용할 코드 스니펫을 붙여넣어요
3. 협업할때는 `.gitignore` 에서 `.vscode` 관련 규칙을 제거해요

### Storybook Template

```json
{
    "StoryBook": {
        "prefix": ["!sb", "!storybook"],
        "body": [
            "import type { Meta, StoryObj } from '@storybook/react-vite';\n",

            "const meta: Meta<typeof ${1:Component}> = {",
            "    component: ${1:Component},",
            "};\n",

            "export default meta;",
            "type Story = StoryObj<typeof ${1:Component}>;\n",

            "export const ${2:Default}: Story = {",
            "   args: {",
            "   },",
            "};"
        ]
    }
}
```

### Vitest Template

````json
    "Import Vitest": {
        "prefix": "!test",
        "body": [
            "import { describe, test , expect } from 'vitest';\n",
            "describe('${1:Test Suite}', () => {",
            "    test('${2:Test Case}', () => {",
            "        ${3:// TODO: Implement test}",
            "    });",
            "});",
        ],
    },
    ```
````
