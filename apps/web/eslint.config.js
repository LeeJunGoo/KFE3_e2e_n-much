import { nextJsConfig } from '@repo/eslint-config/next-js';

export default defineConfig({
  ...nextJsConfig,
  rules: {
    ...nextJsConfig.rules,

    'func-style': ['error', 'expression'],
    'prefer-const': 'warn',
    'no-var': 'error',
    'object-shorthand': ['error', 'always'],

    'no-unused-vars': ['error', { argsIgnorePattern: '^_', varsIgnorePattern: '^_' }],
    'no-empty-function': 'error',
    'no-console': ['error', { allow: ['warn', 'error'] }],

    eqeqeq: ['error', 'always'],

    // ✅ import 정리 (선택사항: `eslint-plugin-import` 필요)
    // 'import/order': [
    //   'error',
    //   {
    //     groups: ['builtin', 'external', 'internal', 'parent', 'sibling', 'index'],
    //     'newlines-between': 'always',
    //     alphabetize: { order: 'asc', caseInsensitive: true },
    //   },
    // ],

    // ✅ 기타 협업용
    'no-magic-numbers': ['warn', { ignore: [0, 1], ignoreArrayIndexes: true, enforceConst: true }],
    'consistent-return': 'error'
  }
});
