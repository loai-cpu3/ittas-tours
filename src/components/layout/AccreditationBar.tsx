import { Icon } from '../ui/Icon'
import { site } from '../../data/site'
import { telHref } from '../../lib/contact'

/**
 * Trust surface #1. The licence number is the first thing a pilgrim looks for,
 * so it sits above everything else — never behind a scroll or a tab.
 */
export function AccreditationBar() {
  return (
    <div className="relative z-50 border-b border-gold-500/20 bg-navy-950 py-2 text-white">
      <div className="container-page flex flex-col items-center gap-2 text-center md:flex-row md:justify-between md:gap-6 md:text-right">
        <p className="flex items-center gap-2 text-caption font-semibold">
          <Icon name="workspace_premium" size={20} className="text-gold-500" filled />
          {site.license.label}
        </p>

        <div className="flex flex-col items-center gap-2 text-caption text-white/85 md:flex-row md:gap-4">
          <span className="flex items-center gap-1.5">
            <Icon name="location_on" size={16} className="text-gold-500" />
            {site.branch.label}: {site.branch.street}
          </span>

          <span className="hidden h-4 w-px bg-gold-500/30 md:block" />

          <span className="flex items-center gap-1.5">
            <Icon name="support_agent" size={16} className="text-gold-500" />
            <a
              href={telHref(site.phones[0])}
              className="ltr-nums inline-block py-1 font-latin font-semibold tracking-wide hover:text-gold-300"
            >
              {site.phones[0]}
            </a>
            <span className="text-white/40">/</span>
            <a
              href={telHref(site.phones[1])}
              className="ltr-nums inline-block py-1 font-latin font-semibold tracking-wide hover:text-gold-300"
            >
              {site.phones[1]}
            </a>
          </span>
        </div>
      </div>
    </div>
  )
}
