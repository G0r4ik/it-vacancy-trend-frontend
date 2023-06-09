module.exports = {
  env: { browser: true, es2021: true },
  extends: [
    'eslint:all',
    'eslint:recommended',
    'airbnb',
    'standard',
    'plugin:vue/vue3-recommended',
    'plugin:promise/recommended',
    'plugin:n/recommended',
    'plugin:unicorn/all',
    'prettier',
  ],
  parserOptions: { ecmaVersion: 'latest', sourceType: 'module' },
  plugins: ['promise', 'unicorn'],
  rules: {
    camelcase: 'off',
    'no-console': 'off',
    'no-plusplus': 'off',
    'unicorn/no-null': 'off',
    'import/extensions': 'off',
    'consistent-return': 'off',
    'no-param-reassign': 'off',
    'n/no-missing-import': 'off',
    'import/no-unresolved': 'off',
    'no-restricted-syntax': 'off',
    'unicorn/filename-case': 'off',
    'class-methods-use-this': 'off', // !
    'n/no-unpublished-import': 'off',
    'n/no-unpublished-require': 'off',
    'unicorn/no-keyword-prefix': 'off',
    'import/prefer-default-export': 'off',
    'import/no-extraneous-dependencies': 'off',
    'n/no-unsupported-features/es-syntax': 'off',
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
