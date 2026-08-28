import { useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { Icon } from '../components/ui/Icon'
import { Breadcrumb } from '../components/ui/Breadcrumb'
import { Itinerary } from '../components/package/Itinerary'
import { BookingPanel } from '../components/package/BookingPanel'
import { MobileContactBar } from '../components/layout/MobileContactBar'
import { WhatsAppButton } from '../components/ui/Buttons'
import { getPackage } from '../data/packages'
import { formatEGP, packageInquiry } from '../lib/contact'
import { usePageMeta } from '../lib/usePageMeta'
import { site } from '../data/site'

export function PackagePage() {
  const { slug = '' } = useParams()
  const pkg = getPackage(slug)
  const [activeImage, setActiveImage] = useState(0)

  usePageMeta({
    title: pkg
      ? `${pkg.shortTitle} | ${site.nameAr} - ${site.branch.label}`
      : `البرنامج غير متاح | ${site.nameAr}`,
    description: pkg?.tagline,
  })

  if (!pkg) {
    return (
      <div className="container-page flex flex-col items-center gap-5 py-24 text-center">
        <Icon name="travel_explore" size={56} className="text-gold-500" />
        <h1 className="font-display text-h1 text-navy-950">هذا البرنامج غير متاح حالياً</h1>
        <p className="max-w-lg text-body text-ink-muted">
          ربما تم تعديل رابط البرنامج أو انتهى موسمه. يمكنك تصفح البرامج المتاحة أو التواصل مع
          مستشار السفر بفرع أسيوط مباشرة.
        </p>
        <div className="flex flex-wrap justify-center gap-3">
          <Link
            to="/#packages"
            className="rounded-md border-2 border-navy-950 px-5 py-3 text-body font-semibold text-navy-950 transition-colors hover:bg-navy-950 hover:text-white"
          >
            عرض كل البرامج
          </Link>
          <WhatsAppButton message="السلام عليكم، أبحث عن برنامج عمرة ولم أجد الصفحة المطلوبة على الموقع.">
            تواصل مع مستشار السفر
          </WhatsAppButton>
        </div>
      </div>
    )
  }

  const gallery = pkg.gallery.length > 0 ? pkg.gallery : [{ src: pkg.image, alt: pkg.imageAlt }]

  return (
    <>
      <Breadcrumb
        items={[
          { label: 'الرئيسية', href: '/' },
          { label: 'برامج العمرة والحج', href: '/#packages' },
          { label: pkg.shortTitle },
        ]}
      />

      <div className="container-page pb-16">
        {/* Hero */}
        <section className="mb-12 grid grid-cols-1 gap-8 lg:grid-cols-12">
          <div className="order-2 flex flex-col justify-center gap-5 lg:order-1 lg:col-span-7">
            <div className="flex flex-wrap gap-2">
              <span className="flex items-center gap-1 rounded-full bg-gold-100 px-3 py-1 text-badge font-bold text-gold-700 shadow-card">
                <Icon name="star" size={16} filled />
                {pkg.overlay.kicker}
              </span>
              <span className="flex items-center gap-1 rounded-full bg-navy-100 px-3 py-1 text-badge font-bold text-navy-800 shadow-card">
                <Icon name="flight" size={16} />
                طيران مباشر: أسيوط ⟷ جدة
              </span>
              {pkg.distanceToHaram && (
                <span className="flex items-center gap-1 rounded-full bg-cream px-3 py-1 text-badge font-bold text-ink shadow-card">
                  <Icon name="mosque" size={16} />
                  {pkg.distanceToHaram}
                </span>
              )}
              <span className="flex items-center gap-1 rounded-full bg-whatsapp/15 px-3 py-1 text-badge font-bold text-[#0B6B33] shadow-card">
                <Icon name="check_circle" size={16} filled />
                متاح للحجز
              </span>
            </div>

            <h1 className="font-display text-display text-navy-950">{pkg.title}</h1>
            <p className="max-w-2xl text-lead leading-relaxed text-ink-muted">{pkg.tagline}</p>

            <div className="grid grid-cols-2 gap-4 rounded-xl border border-hairline bg-surface p-5 shadow-card md:grid-cols-4 md:p-6">
              {pkg.meta.map((item) => (
                <div key={item.label} className="flex flex-col gap-1">
                  <span className="flex items-center gap-1 text-badge text-ink-muted">
                    <Icon name={item.icon} size={16} />
                    {item.label}
                  </span>
                  <span className="text-caption font-bold text-navy-950">{item.value}</span>
                </div>
              ))}

              {pkg.proximityNote && (
                <div className="col-span-2 flex items-center gap-3 rounded-md border border-gold-500/60 bg-gold-100 p-3 md:col-span-4">
                  <Icon name="directions_walk" className="text-gold-600" filled />
                  <span className="text-caption font-bold leading-snug text-navy-950">
                    {pkg.proximityNote}
                  </span>
                </div>
              )}

              <div className="col-span-2 flex items-baseline gap-2 border-t border-hairline pt-4 md:col-span-4">
                <span className="text-badge text-ink-muted">السعر يبدأ من</span>
                <span className="ltr-nums font-display text-h1 font-bold text-gold-600">
                  {formatEGP(pkg.fromPrice)} ج.م
                </span>
                <span className="text-badge text-ink-muted">/ للفرد</span>
              </div>
            </div>
          </div>

          <div className="order-1 lg:order-2 lg:col-span-5">
            <div className="relative overflow-hidden rounded-xl shadow-card-hover">
              <img
                src={gallery[activeImage].src}
                alt={gallery[activeImage].alt}
                className="h-72 w-full object-cover md:h-[420px]"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-navy-950/60 to-transparent" />
              <span className="absolute bottom-4 right-4 flex items-center gap-1 rounded-full bg-linen/90 px-3 py-1 text-badge font-semibold text-navy-950 shadow-card backdrop-blur-sm">
                <Icon name="photo_library" size={16} />+<span className="ltr-nums">{pkg.totalPhotos}</span> صورة
              </span>
            </div>

            {gallery.length > 1 && (
              <div className="mt-3 flex gap-3">
                {gallery.map((image, index) => (
                  <button
                    key={image.src}
                    type="button"
                    onClick={() => setActiveImage(index)}
                    aria-label={`عرض الصورة ${index + 1}`}
                    aria-pressed={index === activeImage}
                    className={`h-16 w-24 overflow-hidden rounded-md border-2 transition-all ${
                      index === activeImage
                        ? 'border-gold-500'
                        : 'border-transparent opacity-70 hover:opacity-100'
                    }`}
                  >
                    <img src={image.src} alt="" className="h-full w-full object-cover" />
                  </button>
                ))}
              </div>
            )}
          </div>
        </section>

        {/* Body + sticky sidebar */}
        <div className="grid grid-cols-1 gap-10 lg:grid-cols-12">
          <div className="flex flex-col gap-12 lg:col-span-7 xl:col-span-8">
            <Itinerary days={pkg.itinerary} draft={pkg.draftItinerary} />

            <section className="grid grid-cols-1 gap-5 md:grid-cols-2">
              <div className="rounded-xl border border-hairline bg-surface p-5 shadow-card md:p-6">
                <h2 className="mb-4 flex items-center gap-2 font-display text-h2 text-navy-950">
                  <Icon name="check_circle" className="text-whatsapp" filled />
                  البرنامج يشمل
                </h2>
                <ul className="space-y-3 text-body text-ink-muted">
                  {pkg.includes.map((item) => (
                    <li key={item} className="flex items-start gap-2">
                      <Icon name="done" size={20} className="mt-0.5 text-whatsapp" />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>

              <div className="rounded-xl border border-hairline bg-surface p-5 shadow-card md:p-6">
                <h2 className="mb-4 flex items-center gap-2 font-display text-h2 text-navy-950">
                  <Icon name="cancel" className="text-alert" filled />
                  البرنامج لا يشمل
                </h2>
                <ul className="space-y-3 text-body text-ink-muted">
                  {pkg.excludes.map((item) => (
                    <li key={item} className="flex items-start gap-2">
                      <Icon name="close" size={20} className="mt-0.5 text-alert" />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            </section>
          </div>

          <aside className="lg:col-span-5 xl:col-span-4">
            <div className="lg:sticky lg:top-28">
              <BookingPanel pkg={pkg} />
            </div>
          </aside>
        </div>
      </div>

      <MobileContactBar message={packageInquiry(pkg.shortTitle)} />
    </>
  )
}
