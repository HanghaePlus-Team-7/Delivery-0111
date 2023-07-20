module.exports = {
  parser: "@typescript-eslint/parser",
  parserOptions: {
    project: "tsconfig.json",
    tsconfigRootDir: __dirname,
    sourceType: "module",
  },
  plugins: ["@typescript-eslint/eslint-plugin", "unused-imports"],
  extends: ["plugin:@typescript-eslint/recommended", "plugin:prettier/recommended", "plugin:import/recommended"],
  root: true,
  env: {
    node: true,
    jest: true,
  },
  ignorePatterns: [".eslintrc.js"],
  rules: {
    "@typescript-eslint/interface-name-prefix": "off",
    "@typescript-eslint/explicit-function-return-type": "off",
    "@typescript-eslint/explicit-module-boundary-types": "off",
    "@typescript-eslint/no-explicit-any": "off",
    "@typescript-eslint/no-empty-function": "off",
    "@typescript-eslint/no-unused-vars": "off",
    "unused-imports/no-unused-imports": "error",
    "import/no-unresolved": "off",
    "import/order": [
      "error",
      {
        groups: ["type", "builtin", "external", "internal", "parent", "sibling", "index", "unknown"],
        pathGroups: [
          {
            pattern: "@nestjs/*",
            group: "external",
            position: "before",
          },
          {
            pattern: "@root/**",
            group: "internal",
            position: "after",
          },
          {
            pattern: "@cart/**",
            group: "internal",
            position: "after",
          },
          {
            pattern: "@order/**",
            group: "internal",
            position: "after",
          },
          {
            pattern: "@product/**",
            group: "internal",
            position: "after",
          },
          {
            pattern: "@review/**",
            group: "internal",
            position: "after",
          },
          {
            pattern: "@store/**",
            group: "internal",
            position: "after",
          },
          {
            pattern: "@user/**",
            group: "internal",
            position: "after",
          },
          {
            pattern: "@auth/**",
            group: "internal",
            position: "after",
          },
          {
            pattern: "@notification/**",
            group: "internal",
            position: "after",
          },
        ],
        pathGroupsExcludedImportTypes: [],
        alphabetize: {
          order: "asc",
          caseInsensitive: true,
        },
        "newlines-between": "always",
      },
    ],
    "@typescript-eslint/member-ordering": ["error", { classes: ["field", "constructor", "method"] }],
  },
};
