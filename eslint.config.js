import eslint from '@eslint/js';
import { defineConfig } from 'eslint/config';
import tseslint from '@typescript-eslint/eslint-plugin';
import tsParser from '@typescript-eslint/parser';
import reactPlugin from 'eslint-plugin-react';
import reactHooksPlugin from 'eslint-plugin-react-hooks';
import { default as eslintPluginPrettierRecommended } from 'eslint-plugin-prettier/recommended';

export default defineConfig([
  // Global configuration
  {
    ignores: ['node_modules/', 'build/', 'dist/', '.git/', 'tsconfig.json'],
  },
  // Base config for all files
  {
    files: ['**/*.js', '**/*.jsx', '**/*.ts', '**/*.tsx'],
    languageOptions: {
      ecmaVersion: 'latest',
      sourceType: 'module',
      globals: {
        ...eslint.configs.recommended.globals,
      },
      parserOptions: {
        ecmaFeatures: {
          jsx: true,
        },
      },
    },
    rules: {
      'no-prototype-builtins': 0,
      'quotes': [2, 'single', 'avoid-escape'],
    },
    plugins: {
      'react': reactPlugin,
      'react-hooks': reactHooksPlugin,
      eslintPluginPrettierRecommended,
    },
    settings: {
      react: {
        version: 'detect', // 自动检测已安装的 React 版本
      },
    },
  },
  // React specific rules
  {
    files: ['**/*.jsx', '**/*.tsx'],
    rules: {
      'react/react-in-jsx-scope': 0,
      'react/no-unknown-property': [
        2,
        {
          ignore: ['css'],
        },
      ],
    },
  },
  // TypeScript specific rules
  {
    files: ['**/*.ts', '**/*.tsx'],
    languageOptions: {
      parser: tsParser,
      parserOptions: {
        project: true,
      },
    },
    plugins: {
      '@typescript-eslint': tseslint,
    },
    rules: {
      'react/display-name': 0,
      '@typescript-eslint/ban-ts-comment': 0,
      '@typescript-eslint/no-explicit-any': 0,
      '@typescript-eslint/no-unsafe-argument': 0,
      '@typescript-eslint/no-unsafe-assignment': 0,
      '@typescript-eslint/no-unsafe-call': 0,
      '@typescript-eslint/no-unsafe-member-access': 0,
      '@typescript-eslint/no-unsafe-return': 0,
      '@typescript-eslint/restrict-plus-operands': 0,
      '@typescript-eslint/restrict-template-expressions': 0,
      '@typescript-eslint/no-misused-promises': [
        'error',
        {
          checksVoidReturn: false,
        },
      ],
    },
  },
]);
