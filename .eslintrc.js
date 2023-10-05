module.exports = {
  // OFF = 0, WARN = 1, ERROR = 2;
  "root": true,
  "env": {
       "browser": true,
       "es2021": true,
       "jest": true
  },
  "extends": [
       "plugin:react/recommended",
       "standard",
       "eslint:recommended",
       "plugin:prettier/recommended",
       "plugin:jsdoc/recommended"
  ],
  "parser": "@typescript-eslint/parser",
  "parserOptions": {
       "ecmaFeatures": {
            "jsx": true
       },
       "ecmaVersion": "latest",
       "sourceType": "module",
       "project": "./tsconfig.json"
  },
  "plugins": [
       "react",
       "@typescript-eslint",
       "jsdoc"
  ],
  "rules": {
       "react/react-in-jsx-scope": "off",
       "no-console": 1,
       "no-unexpected-multiline": 2,
       // "jsdoc/require-example": [
       //      // The Error level should be `error`, `warn`, or `off` (or 2, 1, or 0)
       //      "error",
       //      // The options vary by rule, but are added to an options object:
       //      {
       //           "FunctionExpression": true,
       //                     "ArrowFunctionExpression": true,
       //                     "FunctionDeclaration": true,
       //                     "MethodDefinition": true
       //      }
       //  ],
       "require-jsdoc": [
            2,
            {
                 "require": {
                      "FunctionDeclaration": true,
                      "MethodDefinition": true,
                      "ClassDeclaration": true,
                      "ArrowFunctionExpression": true
                 }
            }
       ],
       // // All JSDoc comments must be valid
       // "valid-jsdoc": [
       //      2,
       //      {
       //           "requireReturn": false,
       //           "requireReturnDescription": false,
       //           "requireParamDescription": true,
       //           "prefer": {
       //                "return": "returns"
       //           }
       //      }
       // ],
       // Best Practices
       // Allowed a getter without setter, but all setters require getters
       "accessor-pairs": [
            2,
            {
                 "getWithoutSet": false,
                 "setWithoutGet": true
            }
       ],
       "block-scoped-var": 1,
       "consistent-return": 2,
       "curly": 2,
       "default-case": 1,
       // the dot goes with the property when doing multiline
       "dot-location": [
            1,
            "property"
       ],
       "dot-notation": 1,
       "eqeqeq": [
            2,
            "smart"
       ],
       "guard-for-in": 1,
       "no-alert": 2,
       "no-caller": 2,
       "no-case-declarations": 1,
       "no-div-regex": 1,
       "no-else-return": 1,
       "no-empty-pattern": 1,
       "no-eq-null": 1,
       "no-eval": 2,
       "no-extend-native": 2,
       "no-extra-bind": 1,
       "no-floating-decimal": 1,
       "no-implicit-coercion": [
            1,
            {
                 "boolean": true,
                 "number": true,
                 "string": true
            }
       ],
       "no-implied-eval": 2,
       "no-invalid-this": 2,
       "no-iterator": 2,
       "no-labels": 1,
       "no-lone-blocks": 1,
       "no-loop-func": 2,
       "no-magic-numbers": 1,
       "no-multi-spaces": 2,
       "no-multi-str": 1,
       "no-native-reassign": 2,
       "no-new-func": 2,
       "no-new-wrappers": 2,
       "no-new": 2,
       "no-octal-escape": 2,
       "no-param-reassign": 2,
       "no-process-env": 1,
       "no-proto": 2,
       "no-redeclare": 2,
       "no-return-assign": 2,
       "no-script-url": 2,
       "no-self-compare": 2,
       "no-throw-literal": 2,
       "no-unused-expressions": 2,
       "no-useless-call": 2,
       "no-useless-concat": 2,
       "no-with": 1,
       "radix": 1,
       "vars-on-top": 2,
       // Enforces the style of wrapped functions
       "wrap-iife": [
            2,
            "outside"
       ],
       "yoda": 2,
       // Strict Mode - for ES6, never use strict.
       "strict": [
            2,
            "never"
       ],
       // Variables
       "init-declarations": [
            2,
            "always"
       ],
       "no-catch-shadow": 1,
       "no-delete-var": 2,
       "no-label-var": 2,
       "no-shadow-restricted-names": 2,
       "no-shadow": 1,
       // We require all vars to be initialized (see init-declarations)
       // If we NEED a var to be initialized to undefined, it needs to be explicit
       "no-undef-init": 0,
       "no-undef": 2,
       "no-undefined": 0,
       "no-unused-vars": 2,
       // Disallow hoisting - let & const don't allow hoisting anyhow
       "no-use-before-define": 2,
       // Node.js and CommonJS
       "callback-return": [
            1,
            [
                 "callback",
                 "next"
            ]
       ],
       "global-require": 2,
       "handle-callback-err": 1,
       "no-mixed-requires": 1,
       "no-new-require": 2,
       // Use path.concat instead
       "no-path-concat": 2,
       "no-process-exit": 2,
       "no-restricted-modules": 0,
       "no-sync": 1,
       // ECMAScript 6 support
       "arrow-body-style": [
            2,
            "always"
       ],
       "arrow-parens": [
            2,
            "always"
       ],
       "arrow-spacing": [
            2,
            {
                 "before": true,
                 "after": true
            }
       ],
       "constructor-super": 2,
       "generator-star-spacing": [
            2,
            "before"
       ],
       "no-confusing-arrow": 2,
       "no-class-assign": 2,
       "no-const-assign": 2,
       "no-dupe-class-members": 2,
       "no-this-before-super": 2,
       "no-var": 1,
       "object-shorthand": [
            1,
            "never"
       ],
       "prefer-arrow-callback": 1,
       "prefer-spread": 1,
       "prefer-template": 1,
       "require-yield": 2
  }
}