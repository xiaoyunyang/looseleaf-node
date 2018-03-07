module.exports = {
    "extends": "airbnb",
    "env": {
      "browser": true,
      "node": true,
      "es6": true,
      "mocha": true
    },
    "plugins": [
        "react",
        "jsx-a11y",
        "import"
    ],
    "rules": {
      "arrow-body-style": [0, "as-needed", {
        requireReturnForObjectLiteral: false,
      }],
      "arrow-parens": 0, // Not really.
      "comma-dangle": ["error", "never"],
      "prefer-destructuring": ["error", {"object": false, "array": false}],
      "global-require": 0, // Used by React Native.
      "func-names": ["error", "never"],
      "function-paren-newline": ["error", "consistent"],
      "new-cap": [2, {"capIsNew": false, "newIsCap": true}], // For immutable Record() etc.
      "no-class-assign": 0, // Class assign is used for higher order components.
      "no-nested-ternary": 0, // It's nice for JSX.
      "no-param-reassign": 0, // We love param reassignment. Naming is hard.
      "no-shadow": 0, // Shadowing is a nice language feature. Naming is hard.
      "import/imports-first": 0, // Este sorts by atom/sort-lines natural order.
      "react/jsx-filename-extension": 0, // No, JSX belongs to .js files
      "jsx-a11y/html-has-lang": 0, // Can't recognize the Helmet.
      "jsx-a11y/no-static-element-interactions": "off",
      "no-confusing-arrow": 0, // This rule is super confusing.
      "react/forbid-prop-types": 0, // Este is going to use Flow types.
      "react/jsx-filename-extension": 0, // No, JSX belongs to .js files
      "react/no-did-mount-set-state": "off",
      "react/no-unused-prop-types": 0, // Este is going to use Flow types.
      "class-methods-use-this": 0, // Good idea, but ignores React render.
      "require-jsdoc": ["error", {
          "require": {
              "FunctionDeclaration": false,
              "MethodDefinition": false,
              "ClassDeclaration": false
          }
      }],
      "valid-jsdoc": ["error", {
        "requireReturn": true,
        "requireReturnType": true,
        "requireParamDescription": true,
        "requireReturnDescription": true
      }]
    },
    "globals": {
      "window": true,
      "document": true
    }
};
