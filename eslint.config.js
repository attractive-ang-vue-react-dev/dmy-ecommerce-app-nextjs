import globals from "globals";
import js from "@eslint/js";
import tsPlugin from "@typescript-eslint/eslint-plugin";
import tsParser from "@typescript-eslint/parser";
import react from "eslint-plugin-react";
import prettierConfig from "eslint-config-prettier";
import prettierPlugin from "eslint-plugin-prettier";

export default [
  {
    ignores: [
      ".next/**",
      "node_modules/**",
      "public/**",
      "__mocks__/**",
      "jest.config.js",
      "jest.config.json",
      "jest.setup.ts",
      "babel.config.json",
      "postcss.config.mjs",
      "next.config.ts",
      "package-lock.json",
      "package.json",
      "README.md",
      "DEMO.md",
      ".gitignore",
    ],
  },
  {
    files: ["**/*.{js,jsx,ts,tsx}"],
    languageOptions: {
      parser: tsParser,
      parserOptions: {
        ecmaVersion: 2021,
        sourceType: "module",
        project: ["./tsconfig.json"],
      },
      globals: {
        ...globals.browser,
        ...globals.node,
        ...globals.jest, // Add Jest globals
      },
    },
    plugins: {
      "@typescript-eslint": tsPlugin,
      prettier: prettierPlugin,
      react: react,
    },
    settings: {
      react: {
        version: "detect", // Detect React version automatically
      },
    },
    rules: {
      ...js.configs.recommended.rules,
      ...react.configs.recommended.rules,
      ...prettierConfig.rules,
      "no-unused-vars": "off",
      "prettier/prettier": ["error"],
      "@typescript-eslint/no-unused-vars": ["off"],
      "react/react-in-jsx-scope": "off",
    },
  },
];
