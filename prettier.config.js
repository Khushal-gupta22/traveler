/** @type {import('prettier').Config & import('prettier-plugin-tailwindcss').PluginOptions} */
const config = {
  plugins: ["prettier-plugin-tailwindcss"],
  semi: false,
  trailingComma: "es5",
  singleQuote: true,
  printWidth: 100,
  //  tabWidth: 1,
  bracketSameLine: false,
  arrowParens: "avoid",
  endOfLine: "lf",
}

export default config
