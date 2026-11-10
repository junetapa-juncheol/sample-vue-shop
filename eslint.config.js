const js = require('@eslint/js');
const globals = require('globals');
const vue = require('eslint-plugin-vue');
const prettier = require('eslint-config-prettier');

module.exports = [
  { ignores: ['docs/**', 'node_modules/**', 'cypress/screenshots/**'] },
  js.configs.recommended,
  ...vue.configs['flat/recommended'],
  { languageOptions: { globals: { ...globals.browser, ...globals.node } } },
  {
    files: ['cypress/**/*.js'],
    languageOptions: {
      globals: {
        cy: 'readonly',
        Cypress: 'readonly',
        describe: 'readonly',
        it: 'readonly',
        beforeEach: 'readonly',
        expect: 'readonly',
      },
    },
  },
  { rules: { 'vue/multi-word-component-names': 'off' } },
  prettier,
];
