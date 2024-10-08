module.exports = {
  extends: '@antfu',
  rules: {
    'arrow-parens': ['error', 'always'],
    'curly': ['error', 'all'],
    'max-statements-per-line': 'off',
    'no-cond-assign': 'off',

    'import/consistent-type-specifier-style': ['error', 'prefer-inline'],
    'import/no-duplicates': ['error', {
      'prefer-inline': true
    }],
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
          pattern: '#*',
          group: 'external'
        },
        {
          pattern: '~*/**',
          group: 'external',
          position: 'before'
        },
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
    'n/prefer-global/process': 'off',

    '@typescript-eslint/brace-style': ['error', '1tbs', {
      allowSingleLine: true
    }],
    '@typescript-eslint/comma-dangle': ['error', 'never'],
    '@typescript-eslint/consistent-type-definitions': 'off',
    '@typescript-eslint/consistent-type-imports': ['error', {
      prefer: 'type-imports',
      disallowTypeAnnotations: false,
      fixStyle: 'inline-type-imports'
    }],
    '@typescript-eslint/no-empty-interface': 'off',
    '@typescript-eslint/no-unused-vars': ['error', {
      argsIgnorePattern: '^_',
      destructuredArrayIgnorePattern: '^_'
    }],
    '@typescript-eslint/no-use-before-define': 'off',

    'vue/attributes-order': 'off',
    'vue/comma-dangle': ['error', 'never'],
    'vue/component-name-in-template-casing': ['warn', 'PascalCase'],
    'vue/custom-event-name-casing': ['error', 'kebab-case'],
    'vue/define-macros-order': 'off',
    'vue/html-closing-bracket-newline': 'off',
    'vue/no-extra-parens': 'off',
    'vue/no-useless-v-bind': ['error', { ignoreStringEscape: true }],
    'vue/no-v-text-v-html-on-component': 'off',
    'vue/singleline-html-element-content-newline': 'off'
  }
}
