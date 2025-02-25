import js from "@eslint/js";
import react from "eslint-plugin-react";
import reactHooks from "eslint-plugin-react-hooks";
import prettier from "eslint-plugin-prettier";
import importPlugin from "eslint-plugin-import";

export default [
    {
        files: ["resources/js/**/*.jsx", "resources/js/**/*.js"], //this makes ESlint apply rules to files
        plugins: {
            react,
        },
        settings: {
            react: {
                version: "detect",
            },
        },
        rules: {
            ...react.configs.recommended.rules,
            "react/react-in-jsx-scope": "off",
            "react/prop-types": "off",
            "react/display-name": "off",
            "react/jsx-uses-react": "error",
            "react/jsx-no-undef": "error",
            "react/button-has-type": "error",
            "react/require-default-props": "error",
            "react/no-children-prop": "off",
            "react/jsx-no-bind": [
                "error",
                {
                    allowArrowFunctions: true,
                    allowFunctions: true,
                },
            ],
            "react/no-array-index-key": "warn",
            "react/default-props-match-prop-types": "error",
        },
    },
    {
        plugins: {
            "react-hooks": reactHooks,
        },
        rules: {
            "react-hooks/rules-of-hooks": "error",
            "react-hooks/exhaustive-deps": ["off"],
        },
    },
    {
        plugins: {
            prettier: prettier,
        },
        rules: {
            "prettier/prettier": ["error", {}, { usePrettierrc: true }],
        },
    },
    {
        plugins: {
            import: importPlugin,
        },
        rules: {
            "no-useless-escape": "off",
            "import/newline-after-import": ["error", { count: 1 }],
            "import/no-unresolved": "error",
        },
        settings: {
            "import/resolver": {
                node: {
                    extensions: [".js", ".jsx", ".ts", ".tsx"], // Allow omitting these extensions
                },
                alias: {
                    map: [["@", "./resources/js"]],
                    extensions: [".js", ".jsx", ".ts", ".tsx"],
                },
            },
        },
    },
    {
        languageOptions: {
            ecmaVersion: "latest",
            sourceType: "module",
            parserOptions: {
                ecmaFeatures: { jsx: true },
            },
        },
    },
];
