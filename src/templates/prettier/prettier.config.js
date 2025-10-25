/** Prettier configuration and options. */
var prettierConfig = {
  $schema: "https://json.schemastore.org/prettierrc",
  plugins: ["@trivago/prettier-plugin-sort-imports"],
  importOrderParserPlugins: ["typescript", "decorators-legacy"],

  // Core formatting
  arrowParens: "always",
  bracketSameLine: false,
  bracketSpacing: true,
  embeddedLanguageFormatting: "auto",
  endOfLine: "lf",
  printWidth: 100,
  proseWrap: "preserve",
  quoteProps: "as-needed",
  semi: true,
  singleAttributePerLine: false,
  singleQuote: true,
  tabWidth: 2,
  trailingComma: "all",
  useTabs: false,

  // Import ordering: Angular, RxJS, 3rd-party, app, relative
  importOrder: [
    "^@angular/(.*)$",
    "^rxjs(.*)$",
    "^@?(?!src)([a-zA-Z0-9-_.]+)(/.*)?$",
    "^src/(.*)$",
    "^[./]",
  ],
  importOrderSeparation: true,
  importOrderSortSpecifiers: true,
};

module.exports = prettierConfig;
