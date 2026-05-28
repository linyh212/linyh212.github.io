import { defineConfig } from 'astro/config'
import githubPages from '@astrojs/github-pages'

export default defineConfig({
  site: 'https://linyh212.github.io',
  base: '/linyh212.github.io',
  integrations: [githubPages()]
})