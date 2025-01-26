/** @type {import("prettier").Config} */
const config = {
  plugins: [
    "@trivago/prettier-plugin-sort-imports",
    "prettier-plugin-tailwindcss",
  ],
  importOrder: [
    "<THIRD_PARTY_MODULES>",
    "^@/(.*)$",
    "^[./](?!.*\\.css$)",
    "^.+\\.css$",
  ],
  importOrderSeparation: true,
  importOrderSortSpecifiers: true,
  tailwindStylesheet: "./src/app/globals.css",
  tailwindFunctions: ["clsx"],
};

export default config;
