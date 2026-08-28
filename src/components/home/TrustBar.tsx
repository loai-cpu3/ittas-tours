import { Icon } from '../ui/Icon'
import { site, trustStats } from '../../data/site'

/**
 * The credentials, set as one ruled ledger rather than four floating cards —
 * a single continuous record reads as an institution's register, which is the
 * claim the section is actually making. Hairlines come from a 1px grid gap so
 * they land correctly in RTL at every column count.
 */
export function TrustBar() {
  return (

    <section id="trust" className="ledger-rules scroll-mt-24 bg-cream pb-16 pt-24 md:pb-20 md:pt-56">
      <div className="container-page">
        <div className="overflow-hidden rounded-xl border border-gold-500/35 bg-hairline">
          <dl className="grid grid-cols-2 gap-px md:grid-cols-4">
            {trustStats.map((stat) => (
              <div
                key={stat.label}
                className="flex flex-col items-center justify-center gap-2.5 bg-surface px-4 py-7 text-center md:px-6 md:py-9"
              >
                <Icon name={stat.icon} size={26} className="text-gold-600" filled />
                <dt className="sr-only">{stat.label}</dt>
                <dd className="ltr-nums font-display text-h2 font-bold text-navy-950">{stat.value}</dd>
                <p className="text-caption text-ink-muted">{stat.label}</p>
              </div>
            ))}
          </dl>

          {/* The physical branch closes the record — the last thing a pilgrim
              checks before picking up the phone. */}
          <div className="mt-px flex flex-col items-center gap-1.5 bg-gold-100 px-5 py-4 text-center md:flex-row md:justify-center md:gap-3 md:text-right">
            <span className="flex items-center gap-2 font-display text-caption font-bold text-navy-950">
              <Icon name="storefront" size={20} className="text-gold-600" filled />
              {site.branch.label}
            </span>
            <span className="hidden h-4 w-px bg-gold-500/40 md:block" />
            <span className="text-caption text-ink-muted">
              {site.branch.street} {site.branch.landmark}
            </span>
          </div>
        </div>
      </div>
    </section>

  )
}
