// eslint.config.js
import js from '@eslint/js'
import prettierConfig from 'eslint-config-prettier'
import prettier from 'eslint-plugin-prettier'
import vue from 'eslint-plugin-vue'
import * as tseslint from 'typescript-eslint'
import vueParser from 'vue-eslint-parser'

export default [
  js.configs.recommended,
  // TypeScript files in src directory with type checking
  ...tseslint.configs.recommendedTypeChecked.map(config => ({
    ...config,
    files: ['src/**/*.ts', 'src/**/*.tsx'],
  })),
  {
    files: ['src/**/*.ts', 'src/**/*.tsx'],
    languageOptions: {
      parserOptions: {
        project: ['./tsconfig.app.json'],
        tsconfigRootDir: import.meta.dirname,
      },
    },
    plugins: {
      prettier,
    },
    rules: {
      'prettier/prettier': 'error',
      '@typescript-eslint/no-explicit-any': 'warn',
      '@typescript-eslint/no-unsafe-assignment': 'warn',
      '@typescript-eslint/no-unsafe-member-access': 'warn',
      '@typescript-eslint/no-unsafe-call': 'warn',
      '@typescript-eslint/no-unsafe-return': 'warn',
      '@typescript-eslint/no-unsafe-argument': 'warn',
    },
  },
  // Vue files without strict type checking
  {
    files: ['src/**/*.vue'],
    languageOptions: {
      parser: vueParser,
      parserOptions: {
        parser: tseslint.parser,
        ecmaVersion: 'latest',
        sourceType: 'module',
      },
    },
    plugins: {
      vue,
      prettier,
    },
    rules: {
      ...vue.configs.base.rules,
      ...vue.configs.essential.rules,
      ...vue.configs['strongly-recommended'].rules,
      ...vue.configs.recommended.rules,
      'prettier/prettier': 'error',
      'vue/multi-word-component-names': 'off',
      'vue/comment-directive': 'off',
      'no-unused-vars': 'warn',
    },
  },
  // Config files without type checking
  ...tseslint.configs.recommended.map(config => ({
    ...config,
    files: ['*.js', '*.ts', '*.mjs', '*.cjs', '*.config.*'],
  })),
  {
    files: ['*.js', '*.ts', '*.mjs', '*.cjs', '*.config.*'],
    languageOptions: {
      parserOptions: {
        ecmaVersion: 'latest',
        sourceType: 'module',
      },
    },
    plugins: {
      prettier,
    },
    rules: {
      'prettier/prettier': 'error',
    },
  },
  {
    rules: {
      ...prettierConfig.rules,
    },
  },
]
