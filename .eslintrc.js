module.exports = {
  parser: 'babel-eslint',
  extends: ['standard', 'standard-react', 'prettier', 'react-app'],
  plugins: ['prettier', 'react'],
  rules: {
    camelcase: 'off',
    'react/prop-types': 'off',
    'react/react-in-jsx-scope': 'off',
    'react/jsx-pascal-case': 'off',
    'react/jsx-fragments': 'off',
    'react/jsx-curly-newline': 'off',
    'react/jsx-closing-tag-location': 'off',
    'react/jsx-curly-brace-presence': 'off',
    'promise/param-names': 'off',
    'prefer-promise-reject-errors': 'off',
    'no-control-regex': 'off',
    'prettier/prettier': [
      'error',
      {
        endOfLine: 'lf',
        trailingComma: 'es5',
        arrowParens: 'avoid',
        tabWidth: 2,
        singleQuote: true,
        semi: true,
      },
    ],
  },
};
