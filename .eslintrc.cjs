module.exports = {
  root: true,
  env: { browser: true, es2021: true },
  extends: [
    'eslint:recommended',
    'plugin:n/recommended',
    'plugin:unicorn/all',
    'plugin:promise/recommended',
    'standard',
    'plugin:vue/vue3-recommended',
    'prettier',
  ],
  parserOptions: { ecmaVersion: 'latest', sourceType: 'module' },
  plugins: ['promise', 'unicorn', 'prettier', 'vue'],

  rules: {
    'unicorn/no-null': 'off',
    'n/no-missing-import': 'off',
    'unicorn/filename-case': 'off', // Можно ли настроить более точно?
    'unicorn/no-keyword-prefix': 'off', // Можно ли настроить более точно?
    'unicorn/prevent-abbreviations': [
      'error',
      {
        allowList: {
          getInitialProps: true,
          i: true,
          req: true,
          res: true,
        },
      },
    ],
  },
}
