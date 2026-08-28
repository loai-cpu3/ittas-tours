import type { ReactNode } from 'react'
import { Icon } from '../ui/Icon'
import { yearsOfExperience } from '../../data/site'

export function Hero({ children }: { children: ReactNode }) {
  return (
    <section className="relative isolate bg-navy-950">
      <div className="absolute inset-0 -z-10">
        <picture>
          <source media="(max-width: 767px)" srcSet="/images/hero-dawn-mobile.jpg" />
          <img
            src="/images/hero-makkah-twilight.jpg"
            alt="المسجد الحرام في مكة المكرمة تحت أضواء الغروب الذهبية"
            className="h-full w-full object-cover opacity-70"
            fetchPriority="high"
            decoding="async"
          />
        </picture>
        <div className="absolute inset-0 hero-scrim" />
        {/* Text column ground: the photograph alone leaves the gold headline at
            1.6:1, so the copy side carries its own falloff. */}
        <div className="absolute inset-0 hero-text-scrim" />
      </div>

      <div className="container-page pb-8 pt-16 text-center md:pb-16 md:pt-28 md:text-right">
        <div className="md:max-w-3xl">
          <p className="mb-5 inline-flex items-center gap-2 rounded-full border border-gold-500/50 bg-navy-950/70 px-4 py-2 text-badge font-bold text-gold-300">
            <Icon name="workspace_premium" size={16} filled />
            خبرة <span className="ltr-nums">{yearsOfExperience}</span> عاماً في خدمة ضيوف الرحمن
          </p>

          <h1 className="mb-5 font-display text-display leading-tight text-white">
            رحلتك المباركة تبدأ من أسيوط..
            <br />
            <span className="gold-halo text-gold-300">ثقة وأمان وعناية</span>
          </h1>

          <p className="mx-auto max-w-2xl text-lead font-normal leading-relaxed text-white/90 md:mx-0">
            برامج عمرة وحج فاخرة واقتصادية بأعلى معايير الرعاية والإشراف، مع رحلات طيران مباشرة
            وفنادق مطلة على الحرمين الشريفين.
          </p>

          <div className="mt-6 h-1 w-16 rounded-full bg-gold-500 md:hidden" />
        </div>
      </div>

      {/* The widget overlaps the next section on desktop, with generous breathing space. */}
      <div className="container-page relative z-20 pb-20 md:-mb-14 md:pb-10">{children}</div>
    </section>
  )
}
