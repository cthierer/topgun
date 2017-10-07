
module.exports = {
  extends: ['airbnb'],
  rules : {
    'no-underscore-dangle': 'off',
    semi: [2, 'never'],
    'no-unused-vars': [2, {'args': 'after-used', 'argsIgnorePattern': '^_'}],
    'no-unused-expressions': [2, { allowShortCircuit: true, allowTernary: true }],
    'no-param-reassign': [2, {'props': false}]
  },
  globals: {
    require: true
  },
  plugins : []
}
