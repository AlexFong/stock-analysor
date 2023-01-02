module.exports = {
  root: true,
  env: {
      node: true,
  },
  extends: [
      "plugin:vue/essential",
      "eslint:recommended",
      "@vue/typescript/recommended",
      "@vue/prettier",
      "@vue/prettier/@typescript-eslint", //注意顺序
      'plugin:vue/vue3-recommended',
  ],
  parserOptions: {
      ecmaVersion: 2020,
  },
  rules: {
      "no-console": process.env.NODE_ENV === "production" ? "warn" : "off",
      "no-debugger": process.env.NODE_ENV === "production" ? "warn" : "off",
      "prettier/prettier": "off", //关闭prettier的提示
  },
}