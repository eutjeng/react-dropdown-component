module.exports = {
  env: {
    browser: true,
    es2021: true,
    node: true,
  },
  extends: [
    'eslint:recommended',
    'plugin:@typescript-eslint/recommended',
    'plugin:react/recommended',
    'plugin:react-hooks/recommended',
    'plugin:prettier/recommended', // Make sure Prettier is the last extension
  ],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
    ecmaVersion: 'latest', // Instead of 12, use 'latest' for the newest version
    sourceType: 'module',
    project: ['./tsconfig.json'], // Use an array to potentially include multiple tsconfig files
  },
  plugins: ['react', '@typescript-eslint', 'react-hooks'],
  rules: {
    'react/react-in-jsx-scope': 'off', // Not required for React 17+
    'react/prop-types': 'off', // TypeScript interfaces can be used instead
    '@typescript-eslint/explicit-module-boundary-types': 'off',
    '@typescript-eslint/no-unused-vars': ['warn', { argsIgnorePattern: '^_' }],
    'no-console': 'warn', // Customizable depending on project needs
  },
  settings: {
    react: {
      version: 'detect',
    },
  },
  ignorePatterns: ['node_modules/', 'build/', '*.config.*', 'dist/'], // Ignoring config files can prevent some ESLint errors
};
