# Global Brain: ESLint Config

This package provides the Global Brain eslint preset as an extensible shared config. It is an opinionated extension of [@antfu/eslint-config](https://github.com/antfu/eslint-config).

## Usage

### Install

```bash
pnpm add -D eslint @globalbrain/eslint-config
```

### Configuration

#### `.eslintrc`

```json5
{
  "extends": "@globalbrain"
}
```

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
