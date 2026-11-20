export interface AnchorPair {
  yL: number
  yR: number
}

const ANCHOR_SELECTOR = 'h1, h2, h3, h4, h5, h6, li, .github-alert'
const READING_INSET = 12
const NAMED_ANCHORS = new Map<string, string>([
  ['读者应具备的背景知识', 'reader-background'],
  ["assumptions about the reader's background", 'reader-background'],
  ['如何阅读此书', 'reading-the-book'],
  ['how to read the book', 'reading-the-book'],
  ['hello 程序示例', 'hello-example'],
  ['sample hello program', 'hello-example'],
  ['本书的附加说明', 'aside-about-asides'],
  ['what is an aside?', 'aside-about-asides'],
  ['给 c 语言初学者', 'advice-on-c'],
  ['new to c? advice on the c programming language', 'advice-on-c'],
  ['本书概述', 'book-overview'],
  ['book overview', 'book-overview'],
  ['本版新增内容', 'edition-changes'],
  ['new to this edition', 'edition-changes'],
  ['本书的起源', 'book-origins'],
  ['origins of the book', 'book-origins'],
  ['课程设置', 'course-design'],
  ['for instructors: courses based on the book', 'course-design'],
  ['课程覆盖表', 'course-coverage'],
  ['course coverage', 'course-coverage'],
  ['实验练习', 'labs'],
  ['for instructors: classroom-tested laboratory exercises', 'labs'],
])

function anchorKey(el: HTMLElement): string | null {
  let label: Element | null = el
  if (el.tagName === 'LI') {
    label = el.querySelector(':scope > a:first-child, :scope > strong:first-child, :scope > p:first-child > a:first-child, :scope > p:first-child > strong:first-child')
    const text = label?.textContent?.trim() ?? ''
    const chapter = text.match(/^(?:第\s*(\d+)\s*章|Chapter\s+(\d+)\b)/i)
    if (chapter) return `chapter-item:${chapter[1] ?? chapter[2]}`
    const course = text.match(/^(ORG\+?|ICS\+?|SP)[.：:]$/i)
    return course ? `course-item:${course[1].toUpperCase()}` : null
  }
  if (el.classList.contains('github-alert')) label = el.querySelector(':scope > .custom-block-title')
  const text = (label?.textContent ?? '').replace(/\u200b/g, '').replace(/\s+/g, ' ').trim()
  if (el.tagName === 'H1') return 'h1'
  const named = NAMED_ANCHORS.get(text.toLowerCase())
  if (named) return `named:${named}`
  let m = text.match(/^(?:图|Figure)\s*(\d+)\s*[.\-–]\s*(\d+)([a-z])?/i)
  if (m) return `fig:${m[1]}-${m[2]}${(m[3] || '').toLowerCase()}`
  m = text.match(/^(?:表|Table)\s*(\d+)\s*[.\-–]\s*(\d+)/i)
  if (m) return `tab:${m[1]}-${m[2]}`
  m = text.match(/^(?:练习题|Practice Problem)\s*(\d+\.\d+)/i)
  if (m) return `ex:${m[1]}`
  m = text.match(/^(?:家庭作业|作业|Homework(?:\s+Problem)?)\s*(\d+\.\d+)/i)
  if (m) return `hw:${m[1]}`
  m = text.match(/^(?:答案|Solution|Answer)\s*(\d+\.\d+)/i)
  if (m) return `solution:${m[1]}`
  m = text.match(/^(?:文献|Reference)\s*(\d+)\b/i)
  if (m) return `reference:${m[1]}`
  m = text.match(/^(?:代码清单|(?:Code )?Listing)\s+([\w.-]+)/i)
  if (m) return `listing:${m[1].toLowerCase()}`
  m = text.match(/^(\d+)\.\s+/)
  if (m) return `item:${m[1]}`
  m = text.match(/^(?:情况|Case)\s*(\d+)\s*[:：]/i)
  if (m) return `case:${m[1]}`
  m = text.match(/^(?:附录\s*)?([A-Z]?\d*(?:\.\d+)+)(?=\s|$|[^\d.])/)
  if (m) return `sec:${m[1]}`
  return null
}

function collectAnchors(container: HTMLElement): Map<string, number> {
  const rootRect = container.getBoundingClientRect()
  const scrollTop = container.scrollTop
  const seen = new Map<string, number>()
  const out = new Map<string, number>()
  let section = ''
  for (const el of container.querySelectorAll<HTMLElement>(ANCHOR_SELECTOR)) {
    let base = anchorKey(el)
    if (!base) continue
    if (base.startsWith('sec:')) section = base
    if (base.startsWith('case:')) base = `${section}/${base}`
    const n = (seen.get(base) || 0) + 1
    seen.set(base, n)
    out.set(`${base}#${n}`, el.getBoundingClientRect().top - rootRect.top + scrollTop)
  }
  return out
}

function buildAnchorPairs(leftEl: HTMLElement, rightEl: HTMLElement): AnchorPair[] {
  const left = collectAnchors(leftEl)
  const right = collectAnchors(rightEl)
  const maxL = Math.max(0, leftEl.scrollHeight - leftEl.clientHeight)
  const maxR = Math.max(0, rightEl.scrollHeight - rightEl.clientHeight)

  const pairs: AnchorPair[] = [{ yL: 0, yR: 0 }]
  // Walk the left anchors in document order; keep only shared keys that are
  // monotonic in both panes.
  const ordered = [...left.entries()].sort((a, b) => a[1] - b[1])
  for (const [key, rawL] of ordered) {
    const rawR = right.get(key)
    if (rawR === undefined) continue
    const yL = Math.max(0, Math.min(rawL - READING_INSET, maxL))
    const yR = Math.max(0, Math.min(rawR - READING_INSET, maxR))
    const prev = pairs[pairs.length - 1]
    if (yL > prev.yL + 1 && yR > prev.yR + 1) {
      pairs.push({ yL, yR })
    }
  }
  const prev = pairs[pairs.length - 1]
  if (maxL > prev.yL || maxR > prev.yR) {
    pairs.push({ yL: maxL, yR: maxR })
  }
  return pairs
}

function interpolate(y: number, pairs: AnchorPair[], fromLeft: boolean): number {
  if (pairs.length <= 1) return y
  for (let i = 0; i < pairs.length - 1; i++) {
    const a = pairs[i]
    const b = pairs[i + 1]
    const s0 = fromLeft ? a.yL : a.yR
    const s1 = fromLeft ? b.yL : b.yR
    const t0 = fromLeft ? a.yR : a.yL
    const t1 = fromLeft ? b.yR : b.yL
    if (y >= s0 && y <= s1) {
      const span = s1 - s0
      const ratio = span > 0 ? (y - s0) / span : 0
      return t0 + ratio * (t1 - t0)
    }
  }
  const last = pairs[pairs.length - 1]
  return fromLeft ? last.yR : last.yL
}

function fragmentTarget(container: HTMLElement, fragment: string): HTMLElement | null {
  if (!fragment) return null
  try {
    return container.querySelector<HTMLElement>('#' + CSS.escape(decodeURIComponent(fragment.slice(1))))
  } catch {
    return null
  }
}

export function initBilingualSync(
  leftEl: HTMLElement,
  rightEl: HTMLElement,
  leftUrl: string,
  rightUrl: string,
  initial?: { side: 'left' | 'right'; fragment: string },
): () => void {
  let pairs = buildAnchorPairs(leftEl, rightEl)
  let activePane: 'left' | 'right' | null = null
  let syncing = false
  let rafId = 0

  const refresh = () => {
    pairs = buildAnchorPairs(leftEl, rightEl)
  }

  const syncFrom = (source: 'left' | 'right') => {
    if (syncing || activePane !== source) return
    syncing = true
    cancelAnimationFrame(rafId)
    rafId = requestAnimationFrame(() => {
      if (source === 'left') {
        rightEl.scrollTop = interpolate(leftEl.scrollTop, pairs, true)
      } else {
        leftEl.scrollTop = interpolate(rightEl.scrollTop, pairs, false)
      }
      requestAnimationFrame(() => {
        syncing = false
      })
    })
  }

  const setLeftActive = () => { activePane = 'left' }
  const setRightActive = () => { activePane = 'right' }
  const onLeftScroll = () => syncFrom('left')
  const onRightScroll = () => syncFrom('right')

  const revealTarget = (container: HTMLElement, target: HTMLElement, side: 'left' | 'right') => {
    activePane = side
    container.scrollTop += target.getBoundingClientRect().top - container.getBoundingClientRect().top - READING_INSET
    syncFrom(side)
  }

  const scrollToArticleFragment = (container: HTMLElement, article: string, side: 'left' | 'right') => {
    const articleUrl = new URL(article, location.origin)
    const pathKey = (pathname: string) => pathname.replace(/(?:^|\/)index\.html$/, '/').replace(/\.html$/, '')
    const handled = new Map<HTMLAnchorElement, HTMLElement>()
    for (const link of container.querySelectorAll<HTMLAnchorElement>('a[href]')) {
      if (link.classList.contains('vp-raw') || link.hasAttribute('target') || link.hasAttribute('download')) continue
      const url = new URL(link.href)
      if (url.origin !== articleUrl.origin || pathKey(url.pathname) !== pathKey(articleUrl.pathname) || !url.hash) continue
      const target = fragmentTarget(container, url.hash)
      if (!target) continue
      handled.set(link, target)
      // VitePress's normal hash jump scrolls the window. In split view each article scrolls independently.
      link.classList.add('vp-raw')
    }
    const onClick = (event: MouseEvent) => {
      if (event.button !== 0 || event.ctrlKey || event.metaKey || event.shiftKey || event.altKey) return
      if (!(event.target instanceof Element)) return
      const link = event.target.closest('a')
      const target = link ? handled.get(link) : undefined
      if (!target) return
      event.preventDefault()
      revealTarget(container, target, side)
    }
    container.addEventListener('click', onClick)
    return () => {
      container.removeEventListener('click', onClick)
      for (const link of handled.keys()) link.classList.remove('vp-raw')
    }
  }
  const cleanLeftLinks = scrollToArticleFragment(leftEl, leftUrl, 'left')
  const cleanRightLinks = scrollToArticleFragment(rightEl, rightUrl, 'right')

  leftEl.addEventListener('pointerenter', setLeftActive, { passive: true })
  leftEl.addEventListener('wheel', setLeftActive, { passive: true })
  leftEl.addEventListener('touchstart', setLeftActive, { passive: true })
  leftEl.addEventListener('scroll', onLeftScroll, { passive: true })

  rightEl.addEventListener('pointerenter', setRightActive, { passive: true })
  rightEl.addEventListener('wheel', setRightActive, { passive: true })
  rightEl.addEventListener('touchstart', setRightActive, { passive: true })
  rightEl.addEventListener('scroll', onRightScroll, { passive: true })

  const ro = new ResizeObserver(refresh)
  ro.observe(leftEl)
  ro.observe(rightEl)
  // Scroll containers keep a fixed size; watch their content so late layout
  // (MathJax, fonts, the fetched peer document) refreshes the anchor map.
  for (const el of [leftEl, rightEl]) {
    for (const child of Array.from(el.children)) ro.observe(child)
  }

  const imgs = [
    ...Array.from(leftEl.querySelectorAll('img')),
    ...Array.from(rightEl.querySelectorAll('img')),
  ]
  for (const img of imgs) {
    if (!img.complete) img.addEventListener('load', refresh, { once: true })
  }

  if (initial?.fragment) {
    const container = initial.side === 'left' ? leftEl : rightEl
    const target = fragmentTarget(container, initial.fragment)
    if (target) {
      window.scrollTo(0, 0)
      revealTarget(container, target, initial.side)
    }
  }

  return () => {
    cancelAnimationFrame(rafId)
    ro.disconnect()
    cleanLeftLinks()
    cleanRightLinks()
    leftEl.removeEventListener('pointerenter', setLeftActive)
    leftEl.removeEventListener('wheel', setLeftActive)
    leftEl.removeEventListener('touchstart', setLeftActive)
    leftEl.removeEventListener('scroll', onLeftScroll)
    rightEl.removeEventListener('pointerenter', setRightActive)
    rightEl.removeEventListener('wheel', setRightActive)
    rightEl.removeEventListener('touchstart', setRightActive)
    rightEl.removeEventListener('scroll', onRightScroll)
  }
}
