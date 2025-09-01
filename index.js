import antfu from '@antfu/eslint-config'
import { Alphabet } from 'eslint-plugin-perfectionist/alphabet'

/**
 * @typedef {Parameters<typeof antfu>[1]} UserConfig
 * @param {...UserConfig} userConfigs - User-defined ESLint configurations to extend or override
 * @returns {ReturnType<typeof antfu>} A chainable ESLint config
 */
export default function globalbrain(...userConfigs) {
  return (
    antfu(
      {
        // `type: 'lib'` only adds [one rule](https://github.com/antfu/eslint-config/blob/0cd12cc90d2100798a5d8f5d51b34753b7be7f70/src/configs/typescript.ts#L165-L173),
        // as our projects are mostly apps, we can just use the default app config,
        // and either provide a separate config for lib projects,
        // or manually enable the rule in the projects if needed

        // TS/Vue features are auto-detected,
        // but to avoid errors being thrown from our overrides,
        // we need to explicitly enable them here.
        typescript: true,
        vue: true,

        // We are more conservative on curly braces
        // <https://github.com/antfu/eslint-config/blob/0cd12cc90d2100798a5d8f5d51b34753b7be7f70/src/configs/stylistic.ts#L54-L63>
        lessOpinionated: true
      }
    )
      .override('antfu/javascript/rules', {
        rules: {
        }
      })
      .override('antfu/stylistic/rules', {
        rules: {
          'style/arrow-parens': ['error', 'always'],
          'style/brace-style': [
            'error',
            '1tbs',
            {
              allowSingleLine: true
            }
          ],
          'style/comma-dangle': ['error', 'never'],
          // Conflicts with single-line if statements wrapped in curly braces
          'style/max-statements-per-line': 'off'
        }
      })
      .override('antfu/typescript/rules', {
        rules: {
          'ts/consistent-type-definitions': 'off',
          'ts/consistent-type-imports': [
            'error',
            {
              prefer: 'type-imports',
              disallowTypeAnnotations: false,
              fixStyle: 'inline-type-imports'
            }
          ],
          // Can't enable this rule because it conflicts with our preference of inline type imports.
          'ts/no-import-type-side-effects': 'off',
          'ts/no-unused-vars': [
            'error',
            {
              argsIgnorePattern: '^_',
              destructuredArrayIgnorePattern: '^_'
            }
          ]
        }
      })
      .override('antfu/perfectionist/setup', {
        settings: {
          perfectionist: {
            // Perfectionist uses `localeCompare` to sort characters by default,
            // which is different from the default `sort` behavior we used to have.
            // So we need to set a custom alphabet to sort characters by their char code.
            // Note: this freezes the @eslint/config-inspector page when expanding the `perfectionist` settings,
            // as it generates too many characters.
            alphabet: Alphabet.generateRecommendedAlphabet()
              .sortByCharCodeAt()
              .getCharacters()
          }
        },
        rules: {
          'perfectionist/sort-imports': [
            'error',
            {
              type: 'custom',
              ignoreCase: false,
              newlinesBetween: 'ignore',
              groups: [
                'builtin',
                'subpath',
                'unplugin-icons',
                'external',
                'internal',
                'parent',
                'sibling',
                'index'
              ],
              // The default is `['^~/.+', '^@/.+']`
              // But we want to group `~icons/** */` (unplugin-icons) before other external imports,
              // So we need to overwrite it here.
              internalPattern: ['^@/.+'],

              customGroups: [
                {
                  groupName: 'unplugin-icons',
                  elementNamePattern: '~icons/.*'
                }
              ]
            }
          ],

          'perfectionist/sort-named-imports': ['error', {
            type: 'custom',
            order: 'asc',
            ignoreCase: false
          }]
        }
      })
      .override('antfu/vue/rules', {
        rules: {
          'vue/comma-dangle': ['error', 'never'],
          'vue/component-name-in-template-casing': ['error', 'PascalCase'],
          'vue/custom-event-name-casing': ['error', 'kebab-case'],
          'vue/define-macros-order': 'off',
          'vue/html-closing-bracket-newline': 'off',
          'vue/no-useless-v-bind': ['error', { ignoreStringEscape: true }],
          'vue/singleline-html-element-content-newline': 'off'
        }
      })
      .override('antfu/node/rules', {
        rules: {
          'node/prefer-global/process': 'off'
        }
      })
      // `antfu/imports/rules` got configured twice in the antfu config,
      // Using only `.override` would not be enough, as the second one would override our changes.
      // So we use `.append` to add our rules after the antfu config.
      .append({
        name: 'globalbrain/imports/rules',
        rules: {
          'import/consistent-type-specifier-style': ['error', 'inline'],
          'import/no-duplicates': [
            'error',
            {
              'prefer-inline': true
            }
          ]
        }
      })
      .append({
        name: 'globalbrain/release-it-config',
        files: ['**/.release-it.{js,ts}'],
        rules: {
          'no-template-curly-in-string': 'off'
        }
      })
      .append({
        name: 'globalbrain/looser-stylistic-rules',
        rules: {
          // We don't actually care about these stylistic choices
          'test/consistent-test-it': 'off',
          'test/prefer-lowercase-title': 'off'
        }
      })
      .append({
        name: 'globalbrain/todo/new-rules-that-need-consensus',
        rules: {

          // https://www.totaltypescript.com/method-shorthand-syntax-considered-harmful
          // A lot of violations in our codebase
          'ts/method-signature-style': 'off'
        }
      })
      // Too many errors from the regexp plugin at the moment,
      // but I think we should enable it.
      // Most errors are auto-fixable.
      .removePlugins('regexp')
      .append(...userConfigs)
  )
}
