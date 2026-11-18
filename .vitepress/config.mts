import fs from 'node:fs'
import path from 'node:path'
import { defineConfig } from 'vitepress'
import { fileURLToPath } from 'node:url'
import headingLinks from './heading-links.mts'
import footnote from 'markdown-it-footnote'
import sidebar from './book-sidebar.json'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const oneLightProMix = JSON.parse(
  fs.readFileSync(path.join(__dirname, 'themes', 'OneLight-Pro-mix.json'), 'utf-8'),
)
const oneDarkProMix = JSON.parse(
  fs.readFileSync(path.join(__dirname, 'themes', 'OneDark-Pro-mix.json'), 'utf-8'),
)

const base = process.env.PAGES_BASE_PATH || '/'

export default defineConfig({
  base,
  lang: 'zh-CN',
  title: '深入理解计算机系统',
  description: '《深入理解计算机系统（原书第3版）》分章阅读版',
  head: [
    ['link', { rel: 'stylesheet', href: `${base}fonts/jetbrains-maple-mono/regular/result.css` }],
    ['link', { rel: 'stylesheet', href: `${base}fonts/jetbrains-maple-mono/bold/result.css` }],
  ],
  markdown: {
    math: true,
    lineNumbers: true,
    theme: {
      light: oneLightProMix,
      dark: oneDarkProMix,
    },
    config: (md) => {
      md.use(footnote)
      md.use(headingLinks, fileURLToPath(new URL('..', import.meta.url)))
    },
  },
  vite: {
    ssr: { noExternal: ['vitepress-theme-teek'] },
    build: {
      assetsInlineLimit: 0,
      rollupOptions: {
        // Large MathJax-heavy Markdown modules overflow Rollup's default Windows stack during treeshake.
        treeshake: false,
      },
    },
  },
  themeConfig: {
    sidebar,
    socialLinks: [
      { icon: 'github', link: 'https://github.com/EPower233/csapp-3e-zh' },
    ],
    search: {
      provider: 'local',
      options: {
        _render(source, env, md) {
          const html = md.render(source, env)
          if (env.frontmatter?.search === false) return ''
          // VitePress's search splitter uses the first fragment link in each heading.
          return html.replace(/<h[1-6]\b[^>]*>[\s\S]*?<\/h[1-6]>/g, heading =>
            heading.replace(/<a\b([^>]*)>([\s\S]*?)<\/a>/g, (link, attrs, label) =>
              /\bclass="header-anchor"/.test(attrs) ? link : label,
            ),
          )
        },
      },
    },
  },
})

