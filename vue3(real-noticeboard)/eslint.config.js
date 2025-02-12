/* eslint-env node */
import '@rushstack/eslint-patch/modern-module-resolution.js'

module.exports = {
  root: true,
  extends: ['plugin:vue/vue3-essential', 'eslint:recommended', '@vue/eslint-config-prettier'],
  env: {
    'vue/setup-compiler-macros': false,
  },
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module',
  },
  rules: {
    'prettier/prettier': [
      'error',
      {
        singleQuote: false,
        semi: false,
        tabWidth: 2,
        trailingComma: 'all',
        printWidth: 80,
        bracketSpacing: false,
        arrowParens: 'avoid',
        endOfLine: 'auto', // 한줄 추가
      },
    ],
  },
}
