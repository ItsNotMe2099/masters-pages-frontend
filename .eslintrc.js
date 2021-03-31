module.exports = {
    root: true,
    env: {
      browser: true,
      node: true,
      es6: true,
    },
    parserOptions: { ecmaVersion: 2021 }, // to enable features such as logical assignment and numeric separators
    ignorePatterns: ['.next/*', 'out/*', 'docker/*', 'enviroments/*', 'node_modules/*'],
    extends: ['eslint:recommended'],
    overrides: [
      {
        files: ['**/*.ts', '**/*.tsx'],
        parser: '@typescript-eslint/parser',
        settings: { react: { version: 'detect' } },
        env: {
          browser: true,
          node: true,
          es6: true,
        },
        extends: [
          'eslint:recommended',
          'plugin:@typescript-eslint/recommended',
          'plugin:react/recommended',
          'plugin:react-hooks/recommended', 
          'plugin:jsx-a11y/recommended',
        ],
        rules: {
          'no-empty': [2],
          'max-len': [0, 120],
          'no-regex-spaces': [2],
          'no-console': [2],
          'no-alert': [2],
          'no-eval': [2],
          'no-debugger': [2],
          'key-spacing': [1, {
            "beforeColon": false,
            "afterColon": true
          }],
          'no-extra-boolean-cast': [2],
          'react/prop-types': 'off',
          'react/react-in-jsx-scope': 'off',
          '@typescript-eslint/no-unused-vars': ['error'],
          '@typescript-eslint/explicit-function-return-type': [
            'warn',
            {
              allowExpressions: true,
              allowConciseArrowFunctionExpressionsStartingWithVoid: true,
            },
          ],
        },
      },
    ],
  }