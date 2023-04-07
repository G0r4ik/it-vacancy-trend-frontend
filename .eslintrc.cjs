module.exports = {
  env: { browser: true, es2021: true },

  extends: [
    'plugin:vue/vue3-recommended',
    'plugin:promise/recommended',
    'standard', // 11
    // 'eslint:recommended', 0
    'plugin:n/recommended',
    'plugin:unicorn/all',
    // 'airbnb', // 69
    // 'eslint:all',
    'prettier',
  ],
  parserOptions: { ecmaVersion: 'latest', sourceType: 'module' },
  plugins: ['promise', 'unicorn'],
  rules: {
    'class-methods-use-this': 'off', // ну не знаю
    // Только для node js
    'n/no-unsupported-features/es-syntax': 'off',
    'n/no-missing-import': 'off', // не работает с alias
    'n/no-unpublished-require': 'off', // Что то ему не нравится
    //
    'no-console': 'off',
    'no-plusplus': 'off',
    //
    'unicorn/filename-case': 'off', // глобально не подходит, а так можно юзать
    'unicorn/no-keyword-prefix': 'off', // не совсем понимаю зачем
    'unicorn/prefer-module': 'off', // Если есть два типа модулей не подходит
    'unicorn/no-null': 'off', // Это разные вещи
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
    //
    // 'sort-keys': 'off',
    // 'require-unicode-regexp': 'off',
    // 'require-await': 'off',
    // 'prefer-named-capture-group': 'off',
    // 'one-var': 'off',
    // 'no-undef': 'off',
    // 'no-throw-literal': 'off',
    // 'no-ternary': 'off',
    // 'no-return-assign': 'off',
    // 'no-restricted-syntax': 'off',
    // 'no-param-reassign': 'off',
    // 'no-new': 'off',
    // 'no-magic-numbers': 'off',
    // 'no-inline-comments': 'off',
    // 'no-implicit-coercion': 'off',
    // 'no-continue': 'off',
    // 'no-await-in-loop': 'off',
    // 'multiline-comment-style': 'off',
    // 'max-statements': 'off',
    // 'max-params': 'off',
    // 'line-comment-position': 'off',
    // 'import/prefer-default-export': 'off',
    // 'import/no-webpack-loader-syntax': 'off',
    // 'import/no-unresolved': 'off',
    // 'import/no-extraneous-dependencies': 'off',
    // 'import/extensions': 'off',
    // 'id-length': 'off',
    // 'global-require': 'off',
    // 'func-style': 'off',
    // 'func-names': 'off',
    // 'consistent-return': 'off',
    // 'capitalized-comments': 'off',
    //

    // 'import/no-unresolved': [2, { caseSensitive: false }],
    'vue/v-on-event-hyphenation': 0,
    'vue/require-default-prop': 0,
    // override/add rules settings here, such as:
    // 'vue/no-unused-vars': 'error'
    'comma-dangle': 'off',
    'vue/max-attributes-per-line': 'off',
    'arrow-body-style': 'off',
    'prefer-arrow-callback': 'off',
    'vue/singleline-html-element-content-newline': 'off',
    'vue/multiline-html-element-content-newline': 'off',
    'space-before-function-paren': 'off',
    'vue/no-unused-vars': 'error',
    'vue/html-closing-bracket-newline': [
      'error',
      { singleline: 'never', multiline: 'never' },
    ],
    // 'vue/html-self-closing': [
    //   'error',
    //   {
    //     html: { void: 'always', normal: 'always', component: 'always' },
    //   },
    // ],
  },
}
