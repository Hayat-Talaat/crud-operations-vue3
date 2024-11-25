module.exports = {
  env: {
    browser: true,
    es2021: true,
  },
  extends: [
    "eslint:recommended",
    "plugin:vue/vue3-recommended",
    "plugin:@typescript-eslint/recommended",
  ],
  parser: "vue-eslint-parser",
  parserOptions: {
    parser: "@typescript-eslint/parser",
    ecmaVersion: 2020,
    sourceType: "module",
  },
  plugins: ["vue", "@typescript-eslint"],
  rules: {
    // Add any custom rules here
    "@typescript-eslint/no-explicit-any": "off", // Disable 'any' type warnings
    "vue/multi-word-component-names": "off", // Allow single-word Vue component names
  },
};
