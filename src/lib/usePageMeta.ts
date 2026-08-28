import { useEffect } from 'react'

/** Keeps the document title and meta description in sync per route. */
export function usePageMeta({ title, description }: { title: string; description?: string }) {
  useEffect(() => {
    document.title = title

    if (!description) return
    const tag = document.querySelector<HTMLMetaElement>('meta[name="description"]')
    const previous = tag?.content
    if (tag) tag.content = description

    return () => {
      if (tag && previous !== undefined) tag.content = previous
    }
  }, [title, description])
}
