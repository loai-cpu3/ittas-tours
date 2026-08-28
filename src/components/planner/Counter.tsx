import { Icon } from '../ui/Icon'

export function Counter({
  label,
  hint,
  icon,
  value,
  onChange,
  min = 0,
  max = 30,
}: {
  label: string
  hint: string
  icon: string
  value: number
  onChange: (value: number) => void
  min?: number
  max?: number
}) {
  return (
    <div className="flex items-center justify-between gap-3 rounded-md border border-hairline bg-cream p-4">
      <div className="flex items-start gap-3">
        <Icon name={icon} size={22} className="mt-0.5 text-gold-600" />
        <div>
          <div className="text-caption font-bold text-navy-950">{label}</div>
          <div className="text-badge text-ink-muted">{hint}</div>
        </div>
      </div>

      <div className="flex shrink-0 items-center gap-2">
        <button
          type="button"
          aria-label={`إنقاص ${label}`}
          disabled={value <= min}
          onClick={() => onChange(Math.max(min, value - 1))}
          className="flex h-9 w-9 items-center justify-center rounded-full border border-hairline text-navy-950 transition-colors hover:bg-navy-100 disabled:opacity-40"
        >
          <Icon name="remove" size={20} />
        </button>

        <output
          aria-label={label}
          className="ltr-nums w-6 text-center font-display text-h2 text-navy-950"
        >
          {value}
        </output>

        <button
          type="button"
          aria-label={`زيادة ${label}`}
          disabled={value >= max}
          onClick={() => onChange(Math.min(max, value + 1))}
          className="flex h-9 w-9 items-center justify-center rounded-full border border-gold-500 bg-gold-100 text-gold-600 transition-colors hover:bg-gold-500/25 disabled:opacity-40"
        >
          <Icon name="add" size={20} />
        </button>
      </div>
    </div>
  )
}
