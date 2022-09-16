module.exports = {
  semi: false,
  singleQuote: true,
  tabWidth: 2,
  useTabs: false,
  plugins: [
    require('prettier-plugin-tailwindcss'),
    require('prettier-plugin-astro'),
  ],
  overrides: [
    {
      files: '**/*astro',
      options: {
        parser: 'astro',
      },
    },
  ],
}
