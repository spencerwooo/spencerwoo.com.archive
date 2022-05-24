module.exports = {
  "printWidth": 80,
  "tabWidth": 2,
  "trailingComma": "es5",
  "singleQuote": true,
  "semi": false,
  "plugins": [require("@trivago/prettier-plugin-sort-imports")],
  "importOrder": ["^react/(.*)$", "^next/(.*)$", "^[./]"],
  "importOrderSeparation": true,
  "importOrderSortSpecifiers": true
}
