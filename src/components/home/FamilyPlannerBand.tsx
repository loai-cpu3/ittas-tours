import { Link } from 'react-router-dom'
import { Icon } from '../ui/Icon'
import { GROUP_MIN } from '../../lib/pricing'

const perks = [
  { icon: 'groups', label: 'خصم 5% للمجموعات والعائلات' },
  { icon: 'flight_takeoff', label: 'طيران مباشر من أسيوط' },
  { icon: 'accessible_forward', label: 'رعاية خاصة لكبار السن' },
  { icon: 'directions_bus', label: 'حافلات VIP خاصة' },
]

/** Entry point to the group configurator: one midnight band, framed in gold
 *  like a sealed document, so it reads as a service rather than a fourth card. */
export function FamilyPlannerBand() {
  return (
    <section className="bg-cream py-14 md:py-16">
      <div className="container-page">
        <div className="relative overflow-hidden rounded-2xl bg-navy-950 p-7 text-white md:p-10">
          <span className="absolute inset-x-0 top-0 h-px bg-gradient-to-l from-transparent via-gold-500 to-transparent" />
          <span className="absolute right-0 top-0 h-20 w-px bg-gradient-to-b from-gold-500 to-transparent" />
          <span className="absolute left-0 top-0 h-20 w-px bg-gradient-to-b from-gold-500 to-transparent" />

          <div className="flex flex-col gap-8 lg:flex-row lg:items-center lg:justify-between">
            <div className="max-w-2xl">
              <h2 className="mb-3 font-display text-h1 text-white">
                خطط لرحلة عمرة عائلتك أو مجموعتك من مكان واحد
              </h2>
              <p className="mb-6 text-body leading-relaxed text-white/80">
                برامج مخصصة للعائلات والمجموعات من أسيوط برعاية كاملة، أجنحة فندقية متصلة، وخصومات
                خاصة تبدأ من <span className="ltr-nums">{GROUP_MIN}</span> أفراد — احسب التكلفة
                التقديرية بنفسك قبل التواصل.
              </p>
              <ul className="flex flex-wrap gap-x-6 gap-y-3">
                {perks.map((perk) => (
                  <li key={perk.label} className="flex items-center gap-2 text-caption text-white/85">
                    <Icon name={perk.icon} size={18} className="text-gold-500" filled />
                    {perk.label}
                  </li>
                ))}
              </ul>
            </div>

            <Link
              to="/family-planner"
              className="group inline-flex shrink-0 items-center justify-center gap-2 rounded-md bg-gold-500 px-6 py-4 text-lead font-bold text-navy-950 transition-colors hover:bg-gold-300"
            >
              ابدأ تخطيط رحلة العائلة
              <Icon
                name="arrow_back"
                size={20}
                className="transition-transform duration-300 group-hover:-translate-x-1"
              />
            </Link>
          </div>
        </div>
      </div>
    </section>
  )
}
