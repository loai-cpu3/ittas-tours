import { useState } from 'react'
import { Icon } from '../ui/Icon'
import type { ItineraryDay } from '../../data/packages'

/**
 * Vertical timeline with gold milestone nodes. Each day is collapsible on
 * mobile so a 14-day programme stays scannable on a phone.
 */
export function Itinerary({ days, draft }: { days: ItineraryDay[]; draft?: boolean }) {
  const [openDay, setOpenDay] = useState<number | null>(0)

  return (
    <section id="itinerary" className="scroll-mt-24">
      <h2 className="mb-6 flex items-center gap-2 font-display text-h1 text-navy-950">
        <Icon name="route" className="text-gold-600" filled />
        خط سير الرحلة (يوماً بيوم)
      </h2>

      {draft && (
        <p className="mb-5 flex items-start gap-2 rounded-md border border-gold-500/30 bg-gold-100 px-4 py-3 text-badge font-medium text-gold-700">
          <Icon name="edit_note" size={18} />
          خط السير التفصيلي لهذا البرنامج مبدئي ويُعتمد نهائياً عند تأكيد الحجز مع مستشار السفر.
        </p>
      )}

      <ol className="relative space-y-4 border-r-2 border-hairline pb-2 pr-6">
        {days.map((day, index) => {
          const open = openDay === index
          return (
            <li key={day.day} className="relative">
              <span
                className={`absolute -right-[31px] top-4 h-4 w-4 rounded-full border-4 border-linen ${
                  day.milestone ? 'bg-gold-500 shadow-card' : 'bg-hairline'
                }`}
              />

              <div
                className={`overflow-hidden rounded-xl border bg-surface shadow-card transition-colors ${
                  open ? 'border-gold-500/40' : 'border-hairline'
                }`}
              >
                <button
                  type="button"
                  onClick={() => setOpenDay(open ? null : index)}
                  aria-expanded={open}
                  className="flex w-full items-center justify-between gap-3 p-4 text-right"
                >
                  <span>
                    <span className="mb-1 block text-badge font-bold uppercase tracking-wide text-gold-600">
                      {day.day}
                    </span>
                    <span className="block font-display text-h2 text-navy-950">{day.title}</span>
                  </span>
                  <Icon
                    name="expand_more"
                    className={`text-ink-muted transition-transform ${open ? 'rotate-180' : ''}`}
                  />
                </button>

                {open && (
                  <p className="animate-fade-up border-t border-hairline px-4 py-4 text-body leading-relaxed text-ink-muted">
                    {day.body}
                  </p>
                )}
              </div>
            </li>
          )
        })}
      </ol>
    </section>
  )
}
