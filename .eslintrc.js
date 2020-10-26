module.exports = {
  root: true,
  env: {
    node: true,
    es6: true,
    "jest/globals": true
  },
  parser: '@typescript-eslint/parser',
   parserOptions: {
     project: './tsconfig.json',
  },
  plugins: [
    '@typescript-eslint',
  ],
  extends: [
    'airbnb-typescript'
  ],
};