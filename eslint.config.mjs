import eslintPluginPrettier from 'eslint-plugin-prettier';
import eslintPluginTs from '@typescript-eslint/eslint-plugin';
import parserTs from '@typescript-eslint/parser';
import eslintPluginImport from 'eslint-plugin-import';

export default [
  {
    ignores: ['node_modules', 'dist'],
  },
  {
    files: ['**/*.ts', '**/*.tsx'],
    languageOptions: {
      parser: parserTs,
      parserOptions: {
        ecmaVersion: 2022,
        sourceType: 'module',
        project: './tsconfig.json',
      },
      globals: {
        require: 'readonly',
        module: 'readonly',
        __dirname: 'readonly',
      },
    },
    plugins: {
      '@typescript-eslint': eslintPluginTs,
      prettier: eslintPluginPrettier,
      import: eslintPluginImport,
    },
    rules: {
      'no-var': 'error',
      semi: 'warn',
      indent: ['error', 2, { SwitchCase: 1 }],
      'no-multi-spaces': 'warn',
      'space-in-parens': 'warn',
      'no-multiple-empty-lines': 'warn',
      'prefer-const': 'warn',
      '@typescript-eslint/no-unused-vars': 'warn',
      // '@typescript-eslint/typedef': [
      //   'warn',
      //   {
      //     variableDeclaration: true,
      //   },
      // ],
      '@typescript-eslint/no-inferrable-types': 'off',

      'import/order': [
        'warn',
        {
          groups: [
            'builtin', // Node built-ins like fs, path
            'external', // npm modules like express, react
            'internal', // your app’s modules
            ['parent', 'sibling', 'index'], // relative imports
            'object', // for `import * as foo from 'foo'`
            'type', // for TypeScript types
          ],
          alphabetize: {
            order: 'desc', // a → z
            caseInsensitive: true,
          },
          pathGroups: [
            {
              pattern: '@/**',
              group: 'internal',
            },
          ],
          pathGroupsExcludedImportTypes: ['builtin'],
          'newlines-between': 'always',
          warnOnUnassignedImports: true,
        },
      ],

      // 'import/no-unresolved': 'error',
      'import/no-duplicates': 'error',
    },
  },
];
