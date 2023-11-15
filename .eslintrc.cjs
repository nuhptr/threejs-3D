module.exports = {
   root: true,
   env: { browser: true, es2020: true },
   extends: [
      "eslint:recommended",
      "plugin:react/recommended",
      "plugin:react/jsx-runtime",
      "plugin:react-hooks/recommended",
   ],
   //? add src to ignorePatterns to ignore all warning files in src folder
   ignorePatterns: ["dist", ".eslintrc.cjs", "src"],
   parserOptions: { ecmaVersion: "latest", sourceType: "module" },
   settings: { react: { version: "18.2" } },
   plugins: ["react-refresh"],
   rules: {
      "react-refresh/only-export-components": ["warn", { allowConstantExport: true }],
   },
}
