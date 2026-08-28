import { Link } from 'react-router-dom'
import { Icon } from '../components/ui/Icon'
import { WhatsAppButton } from '../components/ui/Buttons'
import { usePageMeta } from '../lib/usePageMeta'
import { site } from '../data/site'

export function NotFoundPage() {
  usePageMeta({ title: `الصفحة غير موجودة | ${site.nameAr}` })

  return (
    <div className="container-page flex flex-col items-center gap-5 py-24 text-center">
      <Icon name="explore_off" size={56} className="text-gold-500" />
      <h1 className="font-display text-h1 text-navy-950">الصفحة المطلوبة غير موجودة</h1>
      <p className="max-w-lg text-body text-ink-muted">
        ربما تغيّر الرابط أو انتهى موسم البرنامج. يمكنك العودة للصفحة الرئيسية أو التواصل مباشرة مع
        مستشار السفر بفرع أسيوط.
      </p>
      <div className="flex flex-wrap justify-center gap-3">
        <Link
          to="/"
          className="rounded-md border-2 border-navy-950 px-5 py-3 text-body font-semibold text-navy-950 transition-colors hover:bg-navy-950 hover:text-white"
        >
          العودة للرئيسية
        </Link>
        <WhatsAppButton message="السلام عليكم، أرغب في الاستفسار عن برامج إيتاس للسياحة - فرع أسيوط.">
          تواصل معنا
        </WhatsAppButton>
      </div>
    </div>
  )
}
