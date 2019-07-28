module.exports = {
  root: true,
  parserOptions: {
    parser: 'babel-eslint'
  },
  env: {
    browser: true
  },
  globals: {
    _hmt: true
  },
  extends: [
    'plugin:vue/strongly-recommended',
    'standard',
    'plugin:prettier/recommended',
    'prettier/vue',
    'prettier/standard'
  ],
  rules: {
    'prettier/prettier': 'off',
    'no-unused-vars': 'error',
    'no-debugger': 'error',
    'no-return-await': 'off',
    'no-return-assign': 'off',
    'no-trailing-spaces': 'off',
    'padded-blocks': 'off',
    'vue/max-attributes-per-line': 'off',
    'vue/html-self-closing': [
      'error',
      {
        html: {
          void: 'any',
          normal: 'never'
        }
      }
    ]
  }
};
