# Global Brain: ESLint Config

Global Brain's shared ESLint configuration, built on top of [`@antfu/eslint-config`](https://github.com/antfu/eslint-config). It provides opinionated defaults with the flexibility to customize them for your project.

## Usage

### Installation

Install ESLint and the shared configuration as development dependencies:

```bash
pnpm add -D eslint @globalbrain/eslint-config
```

### Configuration

Create an [`eslint.config.js`](https://eslint.org/docs/latest/use/configure/configuration-files) file in your project root:

```js
import globalbrain from '@globalbrain/eslint-config'

export default globalbrain()
```

### Lint scripts

Add the following scripts to your `package.json`:

```json
{
  "scripts": {
    "lint": "eslint . --fix",
    "lint:fail": "eslint ."
  }
}
```

Run `pnpm lint` to lint your project and apply automatic fixes. Use `pnpm lint:fail` to check for lint errors without modifying files, for example in CI.

## Customization

The `globalbrain()` factory accepts:

- An optional first argument containing options for `@antfu/eslint-config`.
- Any number of additional [ESLint configuration objects](https://eslint.org/docs/latest/use/configure/configuration-files#configuration-objects), appended after the preset to extend or override its rules.

For example, enable Markdown formatting and add a rule for JavaScript and TypeScript files:

```js
import globalbrain from '@globalbrain/eslint-config'

export default globalbrain(
  { formatters: { markdown: true } },
  {
    files: ['**/*.{js,ts}'],
    rules: {
      'no-console': 'warn'
    }
  }
)
```

Enabling formatters requires installing [`eslint-plugin-format`](https://github.com/antfu/eslint-plugin-format) as a development dependency:

```bash
pnpm add -D eslint-plugin-format
```

See the [`formatters`' documentation](https://github.com/antfu/eslint-config#formatters) for more options.

The factory returns a [`FlatConfigComposer` from `eslint-flat-config-utils`](https://github.com/antfu/eslint-flat-config-utils#composer), so you can also chain methods to further customize the configuration.

## License

Licensed under the [MIT license](./LICENSE).
