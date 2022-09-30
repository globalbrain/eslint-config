# Global Brain: ESLint Config

This package provides the Global Brain eslint preset as an extensible shared config. It is an opinionated extension of [@antfu/eslint-config](https://github.com/antfu/eslint-config).

## Usage

### Install

```bash
pnpm add -D eslint @globalbrain/eslint-config
```

### Configure `.eslintrc.json`

```json5
{
  "extends": "@globalbrain",

  "rules": {
    // overrides
  }
}
```

### Configure `package.json`

```json5
{
  "scripts": {
    "lint": "eslint . --fix",
    "lint:fail": "eslint ."
  }
}
```

> `--ignore-path` is not required as it is configured extensively by [ignorePattern](https://github.com/antfu/eslint-config/blob/main/packages/basic/index.js#L16).

## License

This package is open-sourced software licensed under the [MIT license](LICENSE.md).
