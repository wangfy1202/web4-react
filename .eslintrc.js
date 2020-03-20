module.exports = {
  parser: "babel-eslint",
  env: {
    browser: true,
    es6: true
  },
  extends: ["eslint:recommended", "plugin:react/recommended"],
  settings: {
    react: {
      version: "detect"
    }
  },
  parserOptions: {
    ecmaFeatures: {
      jsx: true
    },
    ecmaVersion: 2018,
    sourceType: "module"
  },
  plugins: ["react", "react-hooks"],
  rules: {
    semi: 2,
    "react/prop-types": 0,
    "no-console": "off",
    "no-undef": "off",
    "react-hooks/rules-of-hooks": "error",
    "react-hooks/exhaustive-deps": 0,
    "react/jsx-handler-names": [
      1,
      {
        eventHandlerPrefix: "fn",
        eventHandlerPropPrefix: "on"
      }
    ],
    "react/jsx-no-bind": [
      1,
      {
        ignoreDOMComponents: false,
        ignoreRefs: true,
        allowArrowFunctions: true,
        allowFunctions: false,
        allowBind: false
      }
    ],
    "react/sort-comp": [
      "error",
      {
        order: [
          "static-methods",
          "lifecycle",
          "/^on.+$/",
          "everything-else",
          "render"
        ],
        groups: {
          lifecycle: [
            "displayName",
            "propTypes",
            "contextTypes",
            "childContextTypes",
            "mixins",
            "statics",
            "defaultProps",
            "constructor",
            "getDefaultProps",
            "state",
            "getInitialState",
            "getChildContext",
            "getDerivedStateFromProps",
            "componentWillMount",
            "UNSAFE_componentWillMount",
            "componentDidMount",
            "componentWillReceiveProps",
            "UNSAFE_componentWillReceiveProps",
            "shouldComponentUpdate",
            "componentWillUpdate",
            "UNSAFE_componentWillUpdate",
            "getSnapshotBeforeUpdate",
            "componentDidUpdate",
            "componentDidCatch",
            "componentWillUnmount"
          ]
        }
      }
    ]
  }
};
