import fs from 'node:fs'
import path from 'node:path'
import { defineConfig } from 'vitepress'
import { fileURLToPath } from 'node:url'
import headingLinks from './heading-links.mts'
import htmlTableInline from './html-table-inline.mts'
import footnote from 'markdown-it-footnote'
import sidebarZh from './book-sidebar.json'
import sidebarEn from './book-sidebar.en.json'

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
  buildConcurrency: 8,
  title: '深入理解计算机系统',
  head: [
    ['link', { rel: 'stylesheet', href: `${base}fonts/jetbrains-maple-mono/regular/result.css` }],
    ['link', { rel: 'stylesheet', href: `${base}fonts/jetbrains-maple-mono/bold/result.css` }],
  ],
  locales: {
    root: {
      label: '简体中文',
      lang: 'zh-CN',
      title: '深入理解计算机系统',
      description: '《深入理解计算机系统（原书第3版）》分章阅读版',
      themeConfig: {
        sidebar: sidebarZh,
      },
    },
    en: {
      label: 'English',
      lang: 'en-US',
      link: '/en/',
      title: "Computer Systems: A Programmer's Perspective",
      description: '3rd Edition — Chapter-by-Chapter Web Edition',
      themeConfig: {
        sidebar: sidebarEn,
      },
    },
  },
  markdown: {
    math: true,
    lineNumbers: true,
    theme: {
      light: oneLightProMix,
      dark: oneDarkProMix,
    },
    config: (md) => {
      md.use(footnote)
      md.use(htmlTableInline)
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
    // The built-in translations menu is hidden (BilingualLayout's switcher uses
    // bilingual-map.json); disable path-mirroring so it never emits /en/<中文路径> links.
    i18nRouting: false,
    socialLinks: [
      { icon: 'github', link: 'https://github.com/EPower233/csapp-3e-zh' },
    ],
    search: {
      provider: 'local',
      options: {
        _render(source, env, md) {
          const html = md.render(source, env)
          if (env.frontmatter?.search === false) return ''
          // Strip MathJax SVG payloads from local search indexing (not searchable text, reduces memory/bundle size).
          const cleaned = html.replace(/<mjx-container\b[\s\S]*?<\/mjx-container>/g, ' ')
          // VitePress's search splitter uses the first fragment link in each heading.
          return cleaned.replace(/<h[1-6]\b[^>]*>[\s\S]*?<\/h[1-6]>/g, heading =>
            heading.replace(/<a\b([^>]*)>([\s\S]*?)<\/a>/g, (link, attrs, label) =>
              /\bclass="header-anchor"/.test(attrs) ? link : label,
            ),
          )
        },
      },
    },
  },
})
