const {defineConfig} = require('eslint/config');
const js = require('@eslint/js');
const tseslint = require('typescript-eslint');
const jest = require('eslint-plugin-jest');
const n = require('eslint-plugin-n');
const prettier = require('eslint-config-prettier/flat');
const globals = require('globals');

module.exports = defineConfig(
  {
    ignores: ['dist/', 'lib/', 'node_modules/']
  },
  js.configs.recommended,
  tseslint.configs.recommended,
  jest.configs['flat/recommended'],
  prettier,
  {
    plugins: {n},
    languageOptions: {
      globals: globals.node
    },
    rules: {
      '@typescript-eslint/no-require-imports': 'error',
      '@typescript-eslint/no-non-null-assertion': 'off',
      '@typescript-eslint/no-explicit-any': 'off',
      '@typescript-eslint/no-empty-function': 'off',
      '@typescript-eslint/ban-ts-comment': [
        'error',
        {
          'ts-ignore': 'allow-with-description'
        }
      ],
      'no-console': 'error',
      'yoda': 'error',
      'prefer-const': [
        'error',
        {
          destructuring: 'all'
        }
      ],
      'no-control-regex': 'off',
      'no-constant-condition': ['error', {checkLoops: false}],
      'n/no-extraneous-import': 'error'
    }
  },
  {
    files: ['**/*{test,spec}.ts'],
    rules: {
      '@typescript-eslint/no-unused-vars': 'off',
      'jest/no-standalone-expect': 'off',
      'jest/no-conditional-expect': 'off',
      'no-console': 'off'
    }
  },
  {
    // This config file itself is CommonJS
    files: ['eslint.config.js'],
    rules: {
      '@typescript-eslint/no-require-imports': 'off'
    }
  }
);
