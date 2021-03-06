module.exports = {
  root: true,
  env: {
    node: true
  },
  extends: [
    'standard',
    'plugin:vue/recommended'
  ],
  rules: {
    'no-console': process.env.NODE_ENV === 'production' ? 'error' : 'off',
    'no-debugger': process.env.NODE_ENV === 'production' ? 'error' : 'off',
    'semi': ['off'],
    'comma-dangle': ['off']
  },
  globals: {
    sinon: true
  },
  parserOptions: {
    parser: 'babel-eslint'
  }
}
