import { useEffect } from 'react'

interface PageMeta {
  title: string
  description: string
  image?: string
  type?: string
}

const BASE_TITLE = 'NEKO STORE'
const DEFAULT_IMAGE = '/og-image.png'

function setMeta(name: string, content: string) {
  let el = document.querySelector(`meta[name="${name}"], meta[property="${name}"]`)
  if (!el) {
    el = document.createElement('meta')
    if (name.startsWith('og:')) {
      el.setAttribute('property', name)
    } else {
      el.setAttribute('name', name)
    }
    document.head.appendChild(el)
  }
  el.setAttribute('content', content)
}

function removeMeta(name: string) {
  const el = document.querySelector(`meta[name="${name}"], meta[property="${name}"]`)
  if (el) el.remove()
}

export default function usePageMeta(meta: PageMeta) {
  useEffect(() => {
    const fullTitle = `${meta.title} · ${BASE_TITLE}`
    document.title = fullTitle

    setMeta('description', meta.description)
    setMeta('og:title', fullTitle)
    setMeta('og:description', meta.description)
    setMeta('og:image', meta.image ?? DEFAULT_IMAGE)
    setMeta('og:type', meta.type ?? 'website')
    setMeta('og:url', window.location.href)

    return () => {
      document.title = BASE_TITLE
      removeMeta('description')
      removeMeta('og:title')
      removeMeta('og:description')
      removeMeta('og:image')
      removeMeta('og:type')
      removeMeta('og:url')
    }
  }, [meta.title, meta.description, meta.image, meta.type])
}
