import { Link } from 'react-router-dom'
import { Icon } from '../ui/Icon'
import { PackageCard } from './PackageCard'
import { WhatsAppButton } from '../ui/Buttons'
import { GeometricField } from '../ui/GeometricField'
import type { Package } from '../../data/packages'

export function PackagesSection({
  visible,
  total,
  onReset,
}: {
  visible: Package[]
  total: number
  onReset: () => void
}) {
  const filtered = visible.length !== total

  return (
    <section id="packages" className="relative scroll-mt-24 overflow-hidden bg-linen py-14 md:py-20">
      <GeometricField tone="gold-on-linen" fade="radial" animate={false} />
      <div className="container-page relative z-10">
        <div className="mb-10 flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
          <div>
            <h2 className="mb-3 font-display text-h1 text-navy-950">برامج العمرة المختارة</h2>
            <p className="max-w-2xl text-body leading-relaxed text-ink-muted">
              اختر البرنامج الأنسب لك واستمتع برحلة روحانية متكاملة مع إيتاس للسياحة. كافة البرامج
              تشمل الطيران والتأشيرة والإقامة.
            </p>
          </div>

          {filtered ? (
            <button
              type="button"
              onClick={onReset}
              className="flex items-center gap-2 self-start py-1.5 text-caption font-bold text-gold-700 hover:text-gold-600"
            >
              <Icon name="restart_alt" size={18} />
              عرض كل البرامج (<span className="ltr-nums">{total}</span>)
            </button>
          ) : (
            <Link
              to="/family-planner"
              className="group flex items-center gap-2 self-start py-1.5 text-caption font-bold text-gold-700 hover:text-gold-600"
            >
              خطط لرحلة عائلتك أو مجموعتك
              <Icon
                name="arrow_back"
                size={18}
                className="transition-transform group-hover:-translate-x-1"
              />
            </Link>
          )}
        </div>

        {filtered && (
          <p className="mb-6 flex items-center gap-2 rounded-md border border-gold-500/30 bg-gold-100 px-4 py-3 text-caption font-medium text-gold-700">
            <Icon name="filter_alt" size={18} filled />
            عرض <span className="ltr-nums font-bold">{visible.length}</span> من{' '}
            <span className="ltr-nums font-bold">{total}</span> برامج حسب اختيارك.
          </p>
        )}

        {visible.length > 0 ? (
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3 lg:gap-8">
            {visible.map((pkg) => (
              <PackageCard
                key={pkg.slug}
                pkg={pkg}
                featured={pkg.badges.some((b) => b.label.includes('الأكثر طلباً'))}
              />
            ))}
          </div>
        ) : (
          <div className="rounded-2xl border border-dashed border-gold-500/40 bg-cream px-6 py-14 text-center">
            <Icon name="travel_explore" size={44} className="mb-3 text-gold-500" />
            <h3 className="mb-2 font-display text-h2 text-navy-950">
              لا يوجد برنامج مطابق لاختيارك حالياً
            </h3>
            <p className="mx-auto mb-6 max-w-lg text-body text-ink-muted">
              نُجهّز برامج إضافية كل موسم، ويمكن لمستشار السفر بفرع أسيوط ترتيب برنامج مخصص حسب
              الموعد والميزانية التي تناسبك.
            </p>
            <div className="flex flex-wrap items-center justify-center gap-3">
              <button
                type="button"
                onClick={onReset}
                className="rounded-md border-2 border-navy-950 px-5 py-3 text-body font-semibold text-navy-950 transition-colors hover:bg-navy-950 hover:text-white"
              >
                عرض كل البرامج
              </button>
              <WhatsAppButton message="السلام عليكم، لم أجد برنامجاً مطابقاً لاختياري على الموقع. أرغب في برنامج عمرة مخصص، برجاء إفادتي بالمتاح.">
                اطلب برنامجاً مخصصاً
              </WhatsAppButton>
            </div>
          </div>
        )}
      </div>
    </section>
  )
}
