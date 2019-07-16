module.exports = {
  'env': {
    'browser': true,
    'es6': true,
    'node': true
  },
  'extends': [
    'standard'
  ],
  'globals': {
    'Atomics': 'readonly',
    'SharedArrayBuffer': 'readonly'
  },
  "parser": "babel-eslint",
  'parserOptions': {
    'ecmaFeatures': {
      "experimentalObjectRestSpread": true,
      'jsx': true
    },
    'ecmaVersion': 2018,
    'sourceType': 'module'
  },
  'plugins': [
    'react'
  ],
  'rules': {
    "indent": ["error", 2, {'ignoredNodes': ['JSXElement', 'JSXAttribute']}],
    'react/jsx-uses-react': 'error',
    'react/jsx-uses-vars': 'error',
    'react/jsx-indent-props': ['error', 2],
    'react/jsx-first-prop-new-line': ['error', 'multiline']
  }
}
