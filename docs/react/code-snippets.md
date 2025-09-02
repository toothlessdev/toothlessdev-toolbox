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
