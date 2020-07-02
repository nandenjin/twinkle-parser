module.exports = {
  root: true,
  plugins: ['@typescript-eslint', 'jest', 'prettier'],
  parserOptions: {
    parser: '@typescript-eslint/parser',
  },
  env: {
    node: true,
    'jest/globals': true,
  },
  extends: [
    'eslint:recommended',
    'plugin:@typescript-eslint/recommended',
    'prettier',
    'prettier/@typescript-eslint',
  ],
  rules: {
    'no-console': 'off',
    '@typescript-eslint/no-unused-vars': 'error',
    '@typescript-eslint/explicit-function-return-type': 'off',
    'prettier/prettier': [
      'error',
      {
        semi: false,
        singleQuote: true,
        arrowParens: 'avoid',
      },
    ],
  },
}
