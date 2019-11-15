module.exports = {
  root: true,
  plugins: ['@typescript-eslint'],
  parserOptions: {
    parser: '@typescript-eslint/parser'
  },
  extends: [
    '@nuxtjs'
  ],
  rules: {
    'no-console': 0,
    '@typescript-eslint/no-unused-vars': 'error'
  }
}
