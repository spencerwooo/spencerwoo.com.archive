import { defineConfig } from 'astro/config'
import mdx from '@astrojs/mdx'
import tailwind from '@astrojs/tailwind'
import image from '@astrojs/image'
import sitemap from '@astrojs/sitemap'
import vercel from '@astrojs/vercel/static'
import partytown from '@astrojs/partytown'

// https://astro.build/config
export default defineConfig({
  markdown: {
    shikiConfig: {
      theme: 'nord',
      wrap: true,
    },
  },
  site: 'https://spencerwoo.com',
  integrations: [
    mdx({}),
    tailwind({ config: { applyBaseStyles: false } }),
    image(),
    sitemap(),
    partytown({ config: { forward: ['dataLayer.push'] } }),
  ],
  output: 'static',
  adapter: vercel(),
})
