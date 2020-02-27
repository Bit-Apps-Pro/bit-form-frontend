module.exports = {
  env: {
    browser: true,
    es6: true,
  },
  extends: [
    'airbnb',
  ],
  globals: {
    Atomics: 'readonly',
    SharedArrayBuffer: 'readonly',
  },
  parser: "babel-eslint",
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
    ecmaVersion: 2018,
    sourceType: 'module',
  },
  plugins: [
    'react',
    'react-hooks',
  ],
  rules: {
    "semi": 0,
    "react/destructuring-assignment": 0,
    "arrow-parens": 0,
    "react/prop-types": 0,
    "object-curly-newline": 0,
    "max-len": ["error", { "code": 350 }],
    "linebreak-style": ["error", "unix"],
  },
};
