import angularEslint from '@angular-eslint/eslint-plugin';
import angularTemplate from '@angular-eslint/eslint-plugin-template';
import angularParser from '@angular-eslint/template-parser';
import tseslint from '@typescript-eslint/eslint-plugin';
import tsParser from '@typescript-eslint/parser';
import eslintJs from '@eslint/js';
import prettierPlugin from 'eslint-plugin-prettier';
import simpleImportSort from 'eslint-plugin-simple-import-sort';
import importPlugin from 'eslint-plugin-import';
import prettierConfig from 'eslint-config-prettier';
import globals from 'globals';

export default [
   {
      ignores: ['dist/**/*', 'node_modules/**/*', '.angular/**/*', 'coverage/**/*']
   },
   // Konfiguracja dla plików TypeScript
   {
      files: ['**/*.ts'],
      languageOptions: {
         parser: tsParser,
         parserOptions: {
            projectService: true,
            ecmaVersion: 'latest',
            sourceType: 'module'
         },
         globals: {
            ...globals.browser,
            ...globals.es2021
         }
      },
      plugins: {
         '@typescript-eslint': tseslint,
         '@angular-eslint': angularEslint,
         'simple-import-sort': simpleImportSort,
         'import': importPlugin,
         'prettier': prettierPlugin
      },
      rules: {
         ...eslintJs.configs.recommended.rules,
         ...tseslint.configs.recommended.rules,
         ...prettierConfig.rules,
         ...angularEslint.configs.recommended.rules,
         'simple-import-sort/imports': 'error',
         'simple-import-sort/exports': 'error',
         'import/first': 'error',
         'import/newline-after-import': 'error',
         'import/no-duplicates': 'error',
         '@typescript-eslint/explicit-function-return-type': 'warn',
         '@typescript-eslint/no-explicit-any': 'warn',
         '@typescript-eslint/no-unused-vars': ['error', { 'argsIgnorePattern': '^_' }],
         '@angular-eslint/directive-selector': [
            'error',
            {
               'type': 'attribute',
               'prefix': 'app',
               'style': 'camelCase'
            }
         ],
         '@angular-eslint/component-selector': [
            'error',
            {
               'type': 'element',
               'prefix': 'app',
               'style': 'kebab-case'
            }
         ],
         '@angular-eslint/use-lifecycle-interface': 'error',
         '@angular-eslint/use-pipe-transform-interface': 'error',
         '@angular-eslint/no-empty-lifecycle-method': 'warn',
         'prettier/prettier': ['error', {
            'endOfLine': 'auto'
         }],
         'no-undef': 'error',
         'no-console': ['warn', { allow: ['warn', 'error'] }],
         'eqeqeq': ['error', 'always'],
         'curly': 'error'
      }
   },
   // Konfiguracja dla plików testowych
   {
      files: ['**/*.spec.ts'],
      languageOptions: {
         globals: {
            ...globals.browser,
            ...globals.jasmine,
            ...globals.jest
         }
      },
      rules: {
         '@typescript-eslint/no-explicit-any': 'off',
         'no-console': 'off'
      }
   },
   // Konfiguracja dla szablonów HTML
   {
      files: ['**/*.html'],
      plugins: {
         '@angular-eslint/template': angularTemplate,
         'prettier': prettierPlugin
      },
      languageOptions: {
         parser: angularParser
      },
      rules: {
         'prettier/prettier': ['error', {
            'parser': 'angular',
            'endOfLine': 'auto'
         }]
      }
   }
];
