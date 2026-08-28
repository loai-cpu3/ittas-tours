import { Link } from 'react-router-dom'
import { Icon } from '../ui/Icon'
import { formatEGP, packageInquiry, whatsappHref } from '../../lib/contact'
import type { Badge, Package } from '../../data/packages'

const badgeTones: Record<Badge['tone'], string> = {
  gold: 'bg-gold-500 text-navy-950',
  navy: 'bg-navy-950 text-white',
  alert: 'bg-alert text-white',
  teal: 'bg-teal-600 text-white',
}

export function PackageCard({ pkg, featured = false }: { pkg: Package; featured?: boolean }) {
  const message = packageInquiry(pkg.shortTitle, `السعر المعروض: ${formatEGP(pkg.fromPrice)} ج.م`)

  return (
    <article
      className={`group relative flex flex-col overflow-hidden rounded-xl bg-surface shadow-card transition-[box-shadow,transform] duration-300 hover:-translate-y-1 hover:shadow-card-hover ${
        featured ? 'ring-2 ring-gold-500' : ''
      }`}
    >
      <div className="absolute right-4 top-4 z-10 flex flex-col items-start gap-2">
        <div className="flex flex-wrap gap-2">
          {pkg.badges.map((badge) => (
            <span
              key={badge.label}
              className={`inline-flex items-center gap-1 rounded-sm px-2.5 py-1 text-badge font-bold tracking-wide ${badgeTones[badge.tone]}`}
            >
              {badge.icon && <Icon name={badge.icon} size={14} filled />}
              {badge.label}
            </span>
          ))}
        </div>
        {pkg.seatsLeft !== undefined && (
          <span className="inline-flex items-center gap-1 rounded-sm bg-alert px-2.5 py-1 text-badge font-bold text-white">
            <Icon name="event_busy" size={14} filled />
            متبقي <span className="ltr-nums">{pkg.seatsLeft}</span> مقاعد فقط
          </span>
        )}
      </div>

      <div className="relative aspect-[16/9] overflow-hidden bg-navy-900">
        <img
          src={pkg.image}
          alt={pkg.imageAlt}
          loading="lazy"
          decoding="async"
          className="h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.04]"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-navy-950/85 via-navy-950/25 to-transparent" />
        <div className="absolute bottom-4 right-4 text-white">
          <div className="mb-0.5 text-badge font-medium text-white/80">{pkg.overlay.kicker}</div>
          <div className="flex items-center gap-1.5 text-caption font-bold">
            <Icon name={pkg.overlay.icon} size={18} className="text-gold-500" filled />
            {pkg.overlay.label}
          </div>
        </div>
      </div>

      <div className="flex flex-grow flex-col p-5 md:p-6">
        <h3 className="mb-3 font-display text-h2 text-navy-950">
          <Link
            to={`/package/${pkg.slug}`}
            aria-label={`عرض تفاصيل برنامج ${pkg.title} - السعر يبدأ من ${formatEGP(pkg.fromPrice)} جنيه مصري`}
            className="inline-flex items-center gap-1.5 transition-colors after:absolute after:inset-0 after:content-[''] hover:text-gold-700"
          >
            {pkg.shortTitle}
            <Icon
              name="arrow_back"
              size={18}
              className="text-gold-600 transition-transform duration-300 group-hover:-translate-x-1"
            />
          </Link>
        </h3>

        <p className="mb-4 text-caption leading-relaxed text-ink-muted">{pkg.summary}</p>

        <ul className="mb-5 flex flex-wrap items-center gap-x-5 gap-y-2 text-caption font-medium text-ink-muted">
          <li className="flex items-center gap-1.5">
            <Icon name="calendar_month" size={20} className="text-gold-600" />
            {pkg.duration}
          </li>
          <li className="flex items-center gap-1.5">
            <Icon name={pkg.transport.icon} size={20} className="text-gold-600" />
            {pkg.transport.label}
          </li>
          {pkg.distanceToHaram && (
            <li className="flex items-center gap-1.5">
              <Icon name="mosque" size={20} className="text-gold-600" />
              {pkg.distanceToHaram}
            </li>
          )}
        </ul>

        <div className="mt-auto flex items-end justify-between gap-3 border-t border-hairline pt-5">
          <p className="leading-none">
            <span className="mb-1.5 block text-badge font-medium text-ink-muted">يبدأ من</span>
            <span className="font-display text-[28px] font-bold text-navy-950">
              <span className="ltr-nums">{formatEGP(pkg.fromPrice)}</span>
            </span>
            <span className="mr-1 text-caption font-normal text-ink-muted">ج.م</span>
          </p>

          {/* Sits above the card-wide title link so the tap target stays its own. */}
          <a
            href={whatsappHref(message)}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={`حجز برنامج ${pkg.shortTitle} عبر واتساب`}
            className="relative z-10 inline-flex items-center gap-2 rounded-md bg-whatsapp px-4 py-3 text-caption font-bold text-navy-950 shadow-card transition-all hover:bg-[#1FBE5C] hover:shadow-card-hover active:scale-[0.98]"
          >
            <Icon name="chat" size={18} filled />
            احجز عبر واتساب
          </a>
        </div>
      </div>
    </article>
  )
}
