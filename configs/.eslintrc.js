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
    'react/jsx-uses-react': 'error',
    'react/jsx-uses-vars': 'error'
  }
}
