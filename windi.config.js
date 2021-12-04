import { defineConfig } from 'windicss/helpers'

export default defineConfig({
    extract: {
        include: ['**/*.{jsx,tsx,css}'],
        exclude: ['node_modules', '.git', '.next'],
    },
    theme: {
        extend: {
            fontFamily: {
                sans: ['Overpass'],
            }
        },
    },
    attributify: true,
})
