import { Link } from 'react-router-dom'
import { Icon } from './Icon'
import { site } from '../../data/site'

export type Crumb = { label: string; href?: string }

export function Breadcrumb({ items }: { items: Crumb[] }) {
  return (
    <div className="container-page flex flex-col items-start justify-between gap-3 py-4 md:flex-row md:items-center">
      <nav aria-label="مسار التصفح">
        <ol className="flex flex-wrap items-center gap-1 text-caption text-ink-muted">
          {items.map((item, index) => (
            <li key={item.label} className="flex items-center gap-1">
              {index > 0 && <Icon name="chevron_left" size={16} className="text-ink-faint" />}
              {item.href ? (
                <Link to={item.href} className="transition-colors hover:text-gold-700">
                  {item.label}
                </Link>
              ) : (
                <span aria-current="page" className="font-semibold text-navy-950">
                  {item.label}
                </span>
              )}
            </li>
          ))}
        </ol>
      </nav>

      <span className="flex items-center gap-2 rounded-full border border-hairline bg-surface px-3 py-1 text-badge text-ink-muted shadow-card">
        <Icon name="verified" size={16} className="text-gold-600" filled />
        {site.license.label}
      </span>
    </div>
  )
}
