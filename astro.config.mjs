import { defineConfig } from 'astro/config'
import { unified } from '@astrojs/markdown-remark'
import rehypeKatex from 'rehype-katex'
import remarkMath from 'remark-math'

export default defineConfig({
  site: 'https://linyh212.github.io',
  markdown: {
    processor: unified({
      remarkPlugins: [remarkMath],
      rehypePlugins: [rehypeKatex],
    }),
  },
  integrations: [],
  redirects: {
    '/project/Algorithm/Algorithm': '/project/Algorithm/',
  },
})
