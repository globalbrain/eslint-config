module.exports = {
  extends: '@antfu',
  rules: {
    'curly': ['error', 'all'],
    'import/order': ['error', {
      groups: [
        'builtin',
        'external',
        'internal',
        'parent',
        'sibling',
        'index'
      ],
      pathGroups: [
        {
          pattern: '@/composables/**',
          group: 'parent',
          position: 'before'
        },
        {
          pattern: '@/components/**',
          group: 'parent',
          position: 'before'
        },
        {
          pattern: '@/**',
          group: 'internal',
          position: 'after'
        }
      ],
      alphabetize: {
        order: 'asc',
        caseInsensitive: false
      }
    }],
    'new-cap': ['error', {
      newIsCap: false,
      capIsNew: false,
      properties: true
    }],
    'no-cond-assign': 'off',

    '@typescript-eslint/comma-dangle': ['error', 'never'],
    '@typescript-eslint/consistent-type-imports': ['error', {
      prefer: 'no-type-imports'
    }],
    '@typescript-eslint/no-empty-interface': 'off',
    '@typescript-eslint/no-use-before-define': 'off',

    'vue/attributes-order': 'off',
    'vue/comma-dangle': ['error', 'never'],
    'vue/component-name-in-template-casing': ['warn', 'PascalCase'],
    'vue/custom-event-name-casing': ['error', 'kebab-case'],
    'vue/define-macros-order': 'off',
    'vue/html-closing-bracket-newline': 'off',
    'vue/no-v-text-v-html-on-component': 'off',
    'vue/singleline-html-element-content-newline': 'off'
  }
}
