import { type Rule } from 'eslint'
import { type Literal } from 'estree'

type Mapping = { from: string; to: string }
type Options = [{ paths: Mapping[] }]

function isStringLiteral(node: unknown): node is Literal & { value: string } {
  return !!node && typeof node === 'object' && 'value' in node && typeof node.value === 'string'
}

function quoteFromRaw(raw: string): '"' | '\'' {
  return raw.startsWith('"') ? '"' : '\''
}

const ruleRewriteImports: Rule.RuleModule = {
  meta: {
    type: 'problem',
    docs: {
      description: 'Rewrite import/export specifiers based on configured prefix mappings',
      recommended: false
    },
    fixable: 'code',
    schema: [
      {
        type: 'object',
        additionalProperties: false,
        required: ['paths'],
        properties: {
          paths: {
            type: 'array',
            minItems: 1,
            items: {
              type: 'object',
              additionalProperties: false,
              required: ['from', 'to'],
              properties: {
                from: { type: 'string' },
                to: { type: 'string' }
              }
            }
          }
        }
      }
    ],
    messages: {
      rewrite: 'Import specifier \'{{from}}\' is not allowed. Use \'{{to}}\' instead.'
    }
  },

  create(context) {
    const sourceCode = context.sourceCode ?? context.getSourceCode()
    const opt = (context.options?.[0] ?? {}) as Partial<Options[0]>
    const mappings: Mapping[] = Array.isArray(opt.paths) ? opt.paths : []

    if (mappings.length === 0) {
      return {}
    }

    const findRewrite = (value: string): string | null => {
      for (const { from, to } of mappings) {
        if (value.startsWith(from)) {
          return to + value.slice(from.length)
        }
      }
      return null
    }

    const reportAndFix = (sourceNode: unknown) => {
      if (!isStringLiteral(sourceNode)) {
        return
      }

      const current = sourceNode.value
      const next = findRewrite(current)
      if (!next || next === current) {
        return
      }

      context.report({
        node: sourceNode,
        messageId: 'rewrite',
        data: { from: current, to: next },
        fix(fixer) {
          const raw = sourceCode.getText(sourceNode)
          const q = quoteFromRaw(raw)
          return fixer.replaceText(sourceNode, `${q}${next}${q}`)
        }
      })
    }

    return {
      ImportDeclaration(node: any) {
        reportAndFix(node.source)
      },
      ExportNamedDeclaration(node: any) {
        if (node.source) {
          reportAndFix(node.source)
        }
      },
      ExportAllDeclaration(node: any) {
        reportAndFix(node.source)
      }
    }
  }
}

const plugin: { rules: Record<string, Rule.RuleModule> } = {
  rules: {
    'rewrite-imports': ruleRewriteImports
  }
}

export default plugin
