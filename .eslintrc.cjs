/* ESLint configuration for Al Karim Next.js project */
module.exports = {
  root: true,
  parser: "@typescript-eslint/parser",
  plugins: [
    "@typescript-eslint",
    "unused-imports",
    "import",
    "react-hooks"
  ],
  extends: [
    "next/core-web-vitals",
    "eslint:recommended",
    "plugin:@typescript-eslint/recommended"
  ],
  settings: {
    next: {
      rootDir: ["app/*/", "."],
    },
    "import/resolver": {
      typescript: {},
      node: { extensions: [".js", ".jsx", ".ts", ".tsx"] }
    }
  },
  rules: {
    // Unused imports/vars
    "unused-imports/no-unused-imports": "warn",
    "unused-imports/no-unused-vars": [
      "warn",
      { vars: "all", varsIgnorePattern: "^_", args: "after-used", argsIgnorePattern: "^_" }
    ],

    // TypeScript best practices
    "@typescript-eslint/no-explicit-any": "warn",
    "@typescript-eslint/explicit-function-return-type": ["warn", { allowExpressions: true }],
    "@typescript-eslint/consistent-type-imports": ["warn", { prefer: "type-imports" }],

    // Import hygiene
    "import/order": [
      "warn",
      {
        "groups": [["builtin", "external"], ["internal"], ["parent", "sibling", "index"]],
        "pathGroups": [
          { pattern: "react", group: "external", position: "before" },
          { pattern: "next/**", group: "external", position: "before" },
          { pattern: "@/**", group: "internal", position: "after" }
        ],
        "pathGroupsExcludedImportTypes": ["react"],
        "newlines-between": "always",
        "alphabetize": { order: "asc", caseInsensitive: true }
      }
    ],

    // React hooks
    "react-hooks/rules-of-hooks": "error",
    "react-hooks/exhaustive-deps": "warn",

    // Code style
    "no-console": ["warn", { allow: ["warn", "error"] }],
    "no-multi-assign": "warn",
    "no-shadow": "off",

    // Prefer early returns and short functions (enforced by linting hints)
    complexity: ["warn", { max: 10 }],
    "max-lines-per-function": ["warn", { max: 80, skipComments: true, skipBlankLines: true }],
  },
  overrides: [
    {
      files: ["**/*.tsx", "**/*.ts"],
      rules: {
        // Next.js image rule already warned elsewhere, keep default
      }
    }
  ]
};
