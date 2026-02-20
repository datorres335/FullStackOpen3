const { FlatCompat } = require("@eslint/eslintrc");
const js = require("@eslint/js");
//const path = require("path");

const compat = new FlatCompat({
  baseDirectory: __dirname,
  recommendedConfig: js.configs.recommended,
});

module.exports = [
  ...compat.config({
    plugins: ["react", "react-native"],
    settings: {
      react: {
        version: "detect",
      },
    },
    extends: ["eslint:recommended", "plugin:react/recommended"],
    parser: "@babel/eslint-parser",
    parserOptions: {
      requireConfigFile: false,
      babelOptions: {
        babelrc: false,
        configFile: false,
        presets: ["babel-preset-expo"],
      },
    },
    env: {
      "react-native/react-native": true,
    },
    rules: {
      "react/prop-types": "off",
      "react/react-in-jsx-scope": "off",
    },
  }),
];
