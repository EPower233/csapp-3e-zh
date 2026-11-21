<script setup lang="ts">
import { computed, nextTick, onBeforeUnmount, onMounted, ref, watch } from 'vue'
import { useRoute, useRouter, withBase } from 'vitepress'
import Teek, { TkArticleCodeBlock } from 'vitepress-theme-teek'
import bilingualMapRaw from '../bilingual-map.json'
import { initBilingualSync } from './syncScroll'

interface BilingualMap {
  zhToEn?: Record<string, string>
  enToZh?: Record<string, string>
  zh_to_en?: Record<string, string>
  en_to_zh?: Record<string, string>
}

const bilingualMap = bilingualMapRaw as BilingualMap
const route = useRoute()
const router = useRouter()

const splitEnabled = ref(false)
const peerHtml = ref('')
const peerLoading = ref(false)
const peerError = ref('')
const peerPaneRef = ref<HTMLElement | null>(null)

let cleanupSync: (() => void) | null = null
let peerRequest: AbortController | null = null

function encodeRoute(path: string): string {
  return path.split('/').map(encodeURIComponent).join('/')
}

// Page data is relative to the source root, independent of the deployed base.
const currentArticle = computed(() =>
  '/' + route.data.relativePath.replace(/(?:(^|\/)index)?\.md$/, '$1'),
)
const isEnglish = computed(() => currentArticle.value.startsWith('/en/'))

const pairedRoute = computed<string | null>(() => {
  const cur = currentArticle.value
  const peers = isEnglish.value
    ? bilingualMap.enToZh ?? bilingualMap.en_to_zh
    : bilingualMap.zhToEn ?? bilingualMap.zh_to_en
  const peer = peers?.[cur] ?? peers?.[cur.replace(/\/$/, '')]
  if (peer === '/en' || peer === '/zh') return peer + '/'
  return peer ?? null
})

const canSplit = computed(() => Boolean(pairedRoute.value))

function goToLocale(target: 'zh' | 'en') {
  if (target === 'zh' && isEnglish.value) {
    splitEnabled.value = false
    const dest = pairedRoute.value || '/'
    router.go(withBase(encodeRoute(dest)))
  } else if (target === 'en' && !isEnglish.value) {
    splitEnabled.value = false
    const dest = pairedRoute.value || '/en/'
    router.go(withBase(encodeRoute(dest)))
  } else {
    splitEnabled.value = false
  }
}

function toggleSplit() {
  if (!canSplit.value) return
  splitEnabled.value = !splitEnabled.value
}

function rewriteRelativeUrls(container: HTMLElement, articleUrl: string) {
  const baseUrl = new URL(articleUrl, window.location.origin)
  for (const img of container.querySelectorAll<HTMLImageElement>('img[src]')) {
    const src = img.getAttribute('src')
    if (!src || /^(?:[a-z][a-z\d+.-]*:|\/)/i.test(src)) continue
    const resolved = new URL(src, baseUrl)
    img.setAttribute('src', resolved.pathname + resolved.search + resolved.hash)
  }
  for (const a of container.querySelectorAll<HTMLAnchorElement>('a[href]')) {
    const href = a.getAttribute('href')
    if (!href || /^(?:[a-z][a-z\d+.-]*:|\/)/i.test(href)) continue
    const resolved = new URL(href, baseUrl)
    a.setAttribute('href', resolved.pathname + resolved.search + resolved.hash)
  }
}

async function loadPeerAndBind() {
  peerRequest?.abort()
  peerRequest = null
  cleanupSync?.()
  cleanupSync = null
  peerHtml.value = ''
  peerError.value = ''
  peerLoading.value = false

  const peerRoute = pairedRoute.value
  const active = splitEnabled.value && Boolean(peerRoute) && window.innerWidth >= 1280
  document.documentElement.classList.toggle('bilingual-split', active)
  document.documentElement.classList.toggle('bilingual-en-primary', active && isEnglish.value)

  if (!active || !peerRoute) return

  const request = new AbortController()
  peerRequest = request
  peerLoading.value = true
  try {
    const htmlPath = peerRoute.endsWith('/') ? peerRoute + 'index.html' : peerRoute + '.html'
    const targetUrl = withBase(encodeRoute(htmlPath))
    const res = await fetch(targetUrl, { signal: request.signal })
    if (!res.ok) throw new Error(`HTTP ${res.status}`)
    const html = await res.text()
    if (request.signal.aborted) return
    const doc = new DOMParser().parseFromString(html, 'text/html')
    const vpDoc = doc.querySelector('.vp-doc')
    if (!vpDoc) throw new Error('Paired .vp-doc not found')
    const peerArticleUrl = res.url || targetUrl
    rewriteRelativeUrls(vpDoc as HTMLElement, peerArticleUrl)
    peerHtml.value = vpDoc.innerHTML
    peerLoading.value = false
    await nextTick()
    if (request.signal.aborted) return
    const primaryPane = document.querySelector<HTMLElement>('.VPDoc .content-container .main .vp-doc')
    const peerPane = peerPaneRef.value
    if (primaryPane && peerPane) {
      const primaryUrl = withBase(encodeRoute(currentArticle.value))
      const fragment = window.location.hash
      cleanupSync = isEnglish.value
        ? initBilingualSync(peerPane, primaryPane, peerArticleUrl, primaryUrl, { side: 'right', fragment })
        : initBilingualSync(primaryPane, peerPane, primaryUrl, peerArticleUrl, { side: 'left', fragment })
    }
  } catch (err) {
    if (!request.signal.aborted) peerError.value = err instanceof Error ? err.message : String(err)
  } finally {
    if (peerRequest === request) {
      peerRequest = null
      peerLoading.value = false
    }
  }
}

watch([() => route.path, splitEnabled], () => {
  if (typeof window === 'undefined') return
  localStorage.setItem('csapp-bilingual-split', splitEnabled.value ? '1' : '0')
  loadPeerAndBind()
})

onMounted(() => {
  if (localStorage.getItem('csapp-bilingual-split') === '1' && canSplit.value && window.innerWidth >= 1280) {
    splitEnabled.value = true
  }
  loadPeerAndBind()
})

onBeforeUnmount(() => {
  peerRequest?.abort()
  cleanupSync?.()
  if (typeof document !== 'undefined') {
    document.documentElement.classList.remove('bilingual-split', 'bilingual-en-primary')
  }
})
</script>

<template>
  <Teek.Layout>
    <template #nav-bar-content-after>
      <div v-if="canSplit" class="bilingual-switcher" role="group" aria-label="Language mode">
        <button
          type="button"
          class="bilingual-btn"
          :class="{ active: !splitEnabled && !isEnglish }"
          @click="goToLocale('zh')"
        >
          中文
        </button>
        <button
          type="button"
          class="bilingual-btn"
          :class="{ active: !splitEnabled && isEnglish }"
          @click="goToLocale('en')"
        >
          English
        </button>
        <button
          type="button"
          class="bilingual-btn bilingual-btn-split"
          :class="{ active: splitEnabled }"
          @click="toggleSplit"
        >
          中英对照
        </button>
      </div>
    </template>

    <template #doc-after>
      <div
        v-if="splitEnabled && canSplit"
        ref="peerPaneRef"
        class="bilingual-peer-pane vp-doc"
        :aria-label="isEnglish ? 'Chinese Edition' : 'English Edition'"
      >
        <div v-if="peerLoading" class="bilingual-peer-status">Loading paired edition…</div>
        <div v-else-if="peerError" class="bilingual-peer-status">
          Failed to load paired edition ({{ peerError }}). Split view works best on built preview (`npm run build && npm run preview`) or deployed site.
        </div>
        <div v-else v-html="peerHtml" />
        <!-- Teek's initial document scan runs before the second article arrives. -->
        <TkArticleCodeBlock v-if="peerHtml && !peerLoading" />
      </div>
    </template>
  </Teek.Layout>
</template>
