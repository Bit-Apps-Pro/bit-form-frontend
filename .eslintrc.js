module.exports = {
  env: {
    browser: true,
    es6: true,
    commonjs: true,
  },
  extends: [
    'airbnb',
    'react-app',
  ],
  globals: {
    Atomics: 'readonly',
    SharedArrayBuffer: 'readonly',
  },
  parser: 'babel-eslint',
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
    ecmaVersion: 2020,
    sourceType: 'module',
  },
  plugins: [
    'react',
    'react-hooks',
    'jsx-a11y',
  ],
  rules: {
    'template-curly-spacing': 'off',
    indent: 'off',
    'react/jsx-filename-extension': [1, { extensions: ['.js', '.jsx'] }],
    semi: 0,
    'react/destructuring-assignment': 0,
    'arrow-parens': 0,
    'react/prop-types': 0,
    'object-curly-newline': 0,
    'max-len': ['error', { code: 350 }],
    'linebreak-style': ['error', 'unix'],
    'react-hooks/exhaustive-deps': 'warn',
    'react/jsx-uses-react': 'off',
    'react/react-in-jsx-scope': 'off',
    allowImplicit: false
  },
};
