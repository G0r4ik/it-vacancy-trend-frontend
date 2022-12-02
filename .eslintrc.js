module.exports = {
  extends: [
    // add more generic rulesets here, such as:
    // 'eslint:recommended',
    'plugin:vue/vue3-recommended',
    'prettier',
    // 'eslint-plugin-prettier',
  ],
  plugins: ['eslint-plugin-prettier'],
  rules: {
    'prettier/prettier': 'error',
    'vue/v-on-event-hyphenation': 0,
    'vue/require-default-prop': 0,
    // override/add rules settings here, such as:
    // 'vue/no-unused-vars': 'error'
  },
}
