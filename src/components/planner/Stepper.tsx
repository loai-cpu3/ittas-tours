import type { ReactNode } from 'react'

export function Step({
  number,
  title,
  active = true,
  children,
}: {
  number: number
  title: string
  active?: boolean
  children: ReactNode
}) {
  return (
    <section
      className={`rounded-xl border border-hairline bg-surface p-5 shadow-card transition-opacity md:p-6 ${
        active ? '' : 'opacity-80 hover:opacity-100'
      }`}
    >
      <div className="mb-5 flex items-center gap-3 border-b border-hairline pb-4">
        <span
          className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-full font-display text-caption font-bold ${
            active ? 'bg-navy-950 text-white' : 'bg-cream text-ink-muted'
          }`}
        >
          <span className="ltr-nums">{number}</span>
        </span>
        <h2 className="font-display text-h2 text-navy-950">{title}</h2>
      </div>
      {children}
    </section>
  )
}
