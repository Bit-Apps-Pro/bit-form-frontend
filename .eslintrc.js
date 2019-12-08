module.exports = {
  env: {
    browser: true,
    es6: true,
  },
  parser: "babel-eslint",
  extends: [
    'airbnb',
  ],
  globals: {
    Atomics: 'readonly',
    SharedArrayBuffer: 'readonly',
  },
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
    ecmaVersion: 2018,
    sourceType: 'module',
  },
  plugins: [
    'react',
  ],
  rules: {
    "semi": 0,
    "react/destructuring-assignment": 0,
    "arrow-parens": 0,
    "react/prop-types": 0,
  },
};
