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
      "@typescript-eslint/ban-ts-comment": "off",
      "@typescript-eslint/no-empty-object-type": "off",
      "@typescript-eslint/no-explicit-any": "off",
      "@typescript-eslint/no-unused-vars": "off",
      "@typescript-eslint/no-unused-expressions": [
        "error",
        {
          allowShortCircuit: true,
          allowTernary: true,
          allowTaggedTemplates: true,
        },
      ],
      "@typescript-eslint/no-require-imports": "off",
      "no-restricted-syntax": [
        "warn",
        {
          selector: "Literal[value=/#[0-9A-Fa-f]{3,8}/]",
          message:
            "Use the shared design tokens or Tailwind semantic classes instead of hard-coded hex colors.",
        },
        {
          selector: "Literal[value=/rgb[a]?\\(/]",
          message:
            "Use the shared design tokens or Tailwind semantic classes instead of raw rgb/rgba colors.",
        },
        {
          selector:
            "Literal[value=/\\b(?:bg|text|border|from|via|to)-(?:red|blue|green|yellow|purple|pink|orange|amber|emerald|indigo|violet|sky|slate|stone|zinc|neutral|gray)-(?:[1-9]00)\\b/]",
          message:
            "Use the semantic Tailwind classes (primary, success, warning, etc.) or shared color helpers instead of raw palette utility classes.",
        },
      ],
    },
  }
);
