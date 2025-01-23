import js from "@eslint/js";
import globals from "globals";
import reactHooks from "eslint-plugin-react-hooks";
import reactRefresh from "eslint-plugin-react-refresh";
import tseslint from "typescript-eslint";

export default tseslint.config(
  { ignores: ["dist"] },
  {
    extends: [js.configs.recommended, ...tseslint.configs.recommended],
    files: ["**/*.{ts,tsx}"],
    languageOptions: {
      ecmaVersion: 2020,
      globals: globals.browser,
    },
    plugins: {
      "react-hooks": reactHooks,
      "react-refresh": reactRefresh,
    },
    rules: {
      ...reactHooks.configs.recommended.rules,
      "react-refresh/only-export-components": [
        "warn",
        { allowConstantExport: true },
      ],
      "@typescript-eslint/no-unused-vars": "off",
    },
  }
);

<!-- Update 2024-11-26T15:15:18+05:30 -->
<!-- Update 2025-04-23T09:34:50+05:30 -->
<!-- Update 2025-09-26T06:03:20+05:30 -->
<!-- Update 2024-11-16T11:40:14+05:30 -->
<!-- Update 2024-12-14T08:56:23+05:30 -->
<!-- Update 2024-12-25T12:00:36+05:30 -->
<!-- Update 2025-01-23T09:39:54+05:30 -->