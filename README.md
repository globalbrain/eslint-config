# Global Brain: ESLint Config

This package provides the Global Brain eslint preset as an extensible shared config. It is an opinionated extension of [@antfu/eslint-config](https://github.com/antfu/eslint-config).

## Usage

### Install

```bash
pnpm add -D eslint @globalbrain/eslint-config
```

### Configuration

#### `eslint.config.js`

```js
import globalbrain from '@globalbrain/eslint-config'

export default globalbrain()
```

The default export of this package is a factory function that accepts an arbitrary number of [ESLint configuration objects](https://eslint.org/docs/latest/use/configure/configuration-files#configuration-objects), which will be merged into the final configuration. It returns a [`FlatConfigComposer` object from `eslint-flat-config-utils`](https://github.com/antfu/eslint-flat-config-utils#composer), allowing you to chain methods for even more flexible configuration composition.

#### `package.json`

```json5
{
  "scripts": {
    "lint": "eslint . --fix",
    "lint:fail": "eslint ."
  }
}
```

## License

This package is open-sourced software licensed under the [MIT license](./LICENSE).
