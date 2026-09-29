// @ts-check

import globalbrain from '@globalbrain/eslint-config'

export default globalbrain({
  formatters: { markdown: true },
  ignores: ['!CHANGELOG.md']
})
