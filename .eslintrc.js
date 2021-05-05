module.exports = {
    "extends": ["eslint:recommended", "plugin:react/recommended"],
    "rules": {
      "indent": 'off',
      "consistent-return": 2,
      "semi": [2, "always"],
      "no-mixed-spaces-and-tabs": 0,
      "react/prop-types": "off"
    },
    "plugins": ['react'],
    "parser": "@typescript-eslint/parser",
    "parserOptions": {
      "ecmaVersion": 9,
      "ecmaFeatures": {
        "jsx": true
      },
      "sourceType": "module"
    },
    "settings": {
      "react": {
        "createClass": "createReactClass",
        "pragma": "React",
        "fragment": "Fragment",
        "version": "detect",
        "flowVersion": "0.53"
      },
    },
    "env": {
      "browser": true,
      "es6": true,
      "jest": true, // test is not defined
      "node": true // module is not defined
    },
  };