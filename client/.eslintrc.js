module.exports = {
  root: true,
  env: {
    browser: true,
    node: true
  },
  parserOptions: {
    parser: '@babel/eslint-parser',
    requireConfigFile: false
  },
  extends: [
    '@nuxtjs',
    'plugin:nuxt/recommended'
  ],
  plugins: [
  ],
  // add your custom rules here
  rules: {
    'no-var': 'warn',
    'no-unused-vars': 'error',
    'no-async-promise-executor': 'off',
    'no-useless-escape': 'off',
    'no-multi-assign': 0,
    'global-require': 0,
    camelcase: 'off',
    'max-len': 0,
    'no-console': 0,
    'linebreak-style': 0,
    'comma-dangle': 0,
  }
}
