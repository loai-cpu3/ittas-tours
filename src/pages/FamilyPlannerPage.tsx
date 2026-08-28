import { useMemo, useState } from 'react'
import { Icon } from '../components/ui/Icon'
import { Breadcrumb } from '../components/ui/Breadcrumb'
import { Step } from '../components/planner/Stepper'
import { Counter } from '../components/planner/Counter'
import { CallButton } from '../components/ui/Buttons'
import { MobileContactBar } from '../components/layout/MobileContactBar'
import { packages } from '../data/packages'
import { formatEGP, whatsappHref } from '../lib/contact'
import { usePageMeta } from '../lib/usePageMeta'
import { site } from '../data/site'
import {
  GROUP_DISCOUNT,
  GROUP_MIN,
  partyGroups,
  quote,
  roomStyles,
  type Party,
  type PartyKey,
  type RoomStyle,
} from '../lib/pricing'

const perks = [
  { icon: 'groups', label: 'خصم 5% للمجموعات والعائلات' },
  { icon: 'flight_takeoff', label: 'طيران مباشر من أسيوط' },
  { icon: 'accessible_forward', label: 'رعاية خاصة لكبار السن' },
  { icon: 'directions_bus', label: 'حافلات VIP خاصة' },
]

const familyDocuments = [
  {
    title: 'جوازات السفر',
    body: 'صالحة لمدة 6 أشهر على الأقل من تاريخ السفر لكل فرد من أفراد المجموعة.',
  },
  {
    title: 'شهادات الميلاد للأطفال',
    body: 'شهادة ميلاد مميكنة للأطفال والرضع، مع موافقة ولي الأمر عند السفر بدون أحد الوالدين.',
  },
  {
    title: 'التقارير الطبية لكبار السن',
    body: 'تقرير طبي حديث في حالات الأمراض المزمنة أو الحاجة إلى كرسي متحرك داخل الحرمين.',
  },
  {
    title: 'شهادات التطعيم',
    body: 'شهادة تطعيم معتمدة من مكاتب الصحة لكل مسافر ضمن المجموعة.',
  },
]

export function FamilyPlannerPage() {
  const [party, setParty] = useState<Party>({ adults: 2, seniors: 1, children: 0, infants: 0 })
  const [roomStyle, setRoomStyle] = useState<RoomStyle>('suite')
  const [programme, setProgramme] = useState(packages[0].slug)
  const [openDoc, setOpenDoc] = useState<number | null>(0)

  usePageMeta({
    title: `حجز رحلات العائلات والمجموعات | ${site.nameAr} - ${site.branch.label}`,
    description:
      'خطط لرحلة عمرة عائلتك أو مجموعتك من أسيوط: توزيع الغرف، رعاية كبار السن، خصم المجموعات، وتقدير فوري للتكلفة قبل التواصل مع مستشار السفر.',
  })

  const pkg = packages.find((p) => p.slug === programme) ?? packages[0]
  const estimate = useMemo(() => quote(pkg, party, roomStyle), [pkg, party, roomStyle])

  const setCount = (key: PartyKey) => (value: number) =>
    setParty((prev) => ({ ...prev, [key]: value }))

  const noTravellers = estimate.travellers === 0
  const roomLabel = roomStyles.find((r) => r.id === roomStyle)?.label ?? ''

  const message = [
    `السلام عليكم، أرغب في تسعير رحلة عمرة لعائلة/مجموعة لدى ${site.nameAr} - ${site.branch.label}.`,
    `البرنامج: ${pkg.shortTitle}`,
    `عدد الأفراد: ${estimate.travellers}`,
    `بالغين: ${party.adults} | كبار السن: ${party.seniors} | أطفال: ${party.children} | رضع: ${party.infants}`,
    `توزيع الغرف: ${roomLabel}`,
    `التكلفة التقديرية من الموقع: ${formatEGP(estimate.total)} ج.م`,
    'برجاء إفادتي بعرض السعر النهائي والمواعيد المتاحة. وشكراً.',
  ].join('\n')

  return (
    <>
      <Breadcrumb
        items={[
          { label: 'الرئيسية', href: '/' },
          { label: 'برامج العمرة والحج', href: '/#packages' },
          { label: 'حجز رحلات العائلات والمجموعات' },
        ]}
      />

      <div className="container-page pb-16">
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-12">
          <div className="space-y-6 lg:col-span-7 xl:col-span-8">
            <section className="relative overflow-hidden rounded-xl border border-hairline bg-surface p-6 shadow-card md:p-8">
              <div className="pointer-events-none absolute -left-10 -top-10 h-32 w-32 rounded-bl-full bg-gold-500/10" />
              <h1 className="mb-4 font-display text-display text-navy-950">
                خطط لرحلة عمرة عائلتك أو مجموعتك بكل سهولة ومن مكان واحد
              </h1>
              <p className="mb-6 max-w-2xl text-lead leading-relaxed text-ink-muted">
                برامج مخصصة للعائلات والمجموعات من أسيوط برعاية كاملة، طيران مباشر من مطار أسيوط
                الدولي، أجنحة فندقية متصلة، وخصومات خاصة للمجموعات ابتداءً من{' '}
                <span className="ltr-nums">{GROUP_MIN}</span> أفراد.
              </p>
              <ul className="flex flex-wrap gap-2">
                {perks.map((perk) => (
                  <li
                    key={perk.label}
                    className="inline-flex items-center gap-1.5 rounded-full border border-gold-500/25 bg-gold-100 px-3 py-1.5 text-badge font-semibold text-gold-700"
                  >
                    <Icon name={perk.icon} size={16} />
                    {perk.label}
                  </li>
                ))}
              </ul>
            </section>

            <Step number={1} title="تشكيل أفراد العائلة">
              <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                {partyGroups.map((group) => (
                  <Counter
                    key={group.key}
                    label={group.label}
                    hint={group.hint}
                    icon={group.icon}
                    value={party[group.key]}
                    onChange={setCount(group.key)}
                  />
                ))}
              </div>

              {noTravellers && (
                <p className="mt-4 flex items-center gap-2 rounded-md border border-alert/30 bg-alert/5 px-3 py-2 text-badge font-medium text-alert">
                  <Icon name="info" size={16} filled />
                  أضف فرداً واحداً على الأقل لحساب التكلفة التقديرية.
                </p>
              )}
            </Step>

            <Step number={2} title="توزيع الغرف والأجنحة" active={!noTravellers}>
              <div
                role="radiogroup"
                aria-label="توزيع الغرف"
                className="grid grid-cols-1 gap-4 md:grid-cols-3"
              >
                {roomStyles.map((style) => {
                  const selected = roomStyle === style.id
                  return (
                    <button
                      key={style.id}
                      type="button"
                      role="radio"
                      aria-checked={selected}
                      onClick={() => setRoomStyle(style.id)}
                      className={`rounded-md border-2 p-4 text-center transition-all ${
                        selected
                          ? 'border-gold-500 bg-gold-100'
                          : 'border-hairline bg-surface hover:border-gold-500/50'
                      }`}
                    >
                      <Icon
                        name={style.icon}
                        size={32}
                        className={`mb-2 ${selected ? 'text-gold-600' : 'text-ink-muted'}`}
                        filled={selected}
                      />
                      <div className="text-caption font-bold text-navy-950">{style.label}</div>
                      <div className="mt-1 text-badge text-ink-muted">{style.hint}</div>
                    </button>
                  )
                })}
              </div>
            </Step>

            <Step number={3} title="اختيار البرنامج والموسم" active={!noTravellers}>
              <div className="grid gap-3">
                {packages.map((option) => {
                  const selected = option.slug === programme
                  return (
                    <button
                      key={option.slug}
                      type="button"
                      role="radio"
                      aria-checked={selected}
                      onClick={() => setProgramme(option.slug)}
                      className={`flex items-center gap-4 rounded-md border-2 p-3 text-right transition-all ${
                        selected
                          ? 'border-gold-500 bg-gold-100'
                          : 'border-hairline bg-surface hover:border-gold-500/50'
                      }`}
                    >
                      <img
                        src={option.image}
                        alt=""
                        className="h-16 w-20 shrink-0 rounded-sm object-cover"
                        loading="lazy"
                      />
                      <span className="flex-1">
                        <span className="block text-caption font-bold text-navy-950">
                          {option.shortTitle}
                        </span>
                        <span className="block text-badge text-ink-muted">
                          {option.duration} · {option.transport.label}
                        </span>
                      </span>
                      <span className="ltr-nums shrink-0 font-display text-caption font-bold text-gold-600">
                        {formatEGP(option.fromPrice)} ج.م
                      </span>
                    </button>
                  )
                })}
              </div>
            </Step>

            <Step number={4} title="المستندات المطلوبة للعائلة" active={!noTravellers}>
              <div className="space-y-3">
                {familyDocuments.map((doc, index) => {
                  const open = openDoc === index
                  return (
                    <div
                      key={doc.title}
                      className={`overflow-hidden rounded-md border bg-cream transition-colors ${
                        open ? 'border-gold-500/50' : 'border-hairline'
                      }`}
                    >
                      <button
                        type="button"
                        onClick={() => setOpenDoc(open ? null : index)}
                        aria-expanded={open}
                        className="flex w-full items-center justify-between gap-3 p-3.5 text-right"
                      >
                        <span className="flex items-center gap-3">
                          <Icon name="check_circle" size={20} className="text-gold-600" filled />
                          <span className="text-caption font-bold text-navy-950">{doc.title}</span>
                        </span>
                        <Icon
                          name="expand_more"
                          size={20}
                          className={`text-ink-muted transition-transform ${open ? 'rotate-180' : ''}`}
                        />
                      </button>
                      {open && (
                        <p className="animate-fade-up border-t border-hairline bg-surface px-4 py-3 text-caption leading-relaxed text-ink-muted">
                          {doc.body}
                        </p>
                      )}
                    </div>
                  )
                })}
              </div>
            </Step>
          </div>

          <aside className="lg:col-span-5 xl:col-span-4">
            <div className="relative overflow-hidden rounded-xl border border-gold-500/25 bg-surface p-5 shadow-card-hover lg:sticky lg:top-28 md:p-6">
              <span className="absolute inset-x-0 top-0 h-1 bg-gold-500" />

              <h2 className="mb-1 text-caption font-semibold text-ink-muted">
                إجمالي تكلفة الرحلة التقديرية
              </h2>
              <div className="mb-1 flex items-baseline gap-1 font-display text-display font-bold text-navy-950">
                <span className="ltr-nums">{formatEGP(estimate.total)}</span>
                <span className="text-lead font-normal text-ink-muted">ج.م</span>
              </div>
              <p className="mb-5 text-badge text-ink-muted">
                {pkg.shortTitle} · {roomLabel}
              </p>

              <dl className="mb-5 space-y-2 rounded-md border border-hairline bg-cream p-4 text-caption">
                <div className="flex items-center justify-between">
                  <dt className="text-ink-muted">عدد المسافرين</dt>
                  <dd className="ltr-nums font-bold text-navy-950">{estimate.travellers}</dd>
                </div>
                <div className="flex items-center justify-between">
                  <dt className="text-ink-muted">سعر الفرد ({roomLabel})</dt>
                  <dd className="ltr-nums font-bold text-navy-950">
                    {formatEGP(estimate.baseRate)} ج.م
                  </dd>
                </div>
                <div className="flex items-center justify-between">
                  <dt className="text-ink-muted">الإجمالي قبل الخصم</dt>
                  <dd className="ltr-nums font-bold text-navy-950">
                    {formatEGP(estimate.subtotal)} ج.م
                  </dd>
                </div>
                <div className="flex items-center justify-between border-t border-hairline pt-2">
                  <dt className={estimate.discount ? 'font-bold text-gold-700' : 'text-ink-muted'}>
                    خصم المجموعات (<span className="ltr-nums">{GROUP_DISCOUNT * 100}%</span>)
                  </dt>
                  <dd
                    className={`ltr-nums font-bold ${estimate.discount ? 'text-gold-700' : 'text-ink-faint'}`}
                  >
                    {estimate.discount ? `- ${formatEGP(estimate.discount)} ج.م` : '—'}
                  </dd>
                </div>
              </dl>

              {!estimate.qualifiesForDiscount && !noTravellers && (
                <p className="mb-5 flex items-start gap-2 rounded-md border border-gold-500/30 bg-gold-100 px-3 py-2 text-badge font-medium text-gold-700">
                  <Icon name="savings" size={16} filled />
                  أضف <span className="ltr-nums">{GROUP_MIN - estimate.travellers}</span> فرداً
                  للحصول على خصم المجموعات.
                </p>
              )}

              <div className="mb-5 rounded-md border border-hairline bg-cream p-4">
                <div className="mb-1 flex items-center justify-between text-caption">
                  <span className="font-semibold text-navy-950">مقدم الحجز (30%)</span>
                  <span className="ltr-nums font-bold text-navy-950">
                    {formatEGP(estimate.deposit)} ج.م
                  </span>
                </div>
                <p className="text-badge text-ink-muted">
                  الباقي يُسدد قبل السفر بـ <span className="ltr-nums">15</span> يوماً. إمكانية
                  التقسيط متاحة.
                </p>
              </div>

              <div className="space-y-3">
                <a
                  href={noTravellers ? undefined : whatsappHref(message)}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-disabled={noTravellers}
                  onClick={(e) => noTravellers && e.preventDefault()}
                  className={`inline-flex w-full items-center justify-center gap-2 rounded-md px-5 py-3.5 text-body font-bold text-navy-950 shadow-card transition-all ${
                    noTravellers
                      ? 'cursor-not-allowed bg-whatsapp/40 text-navy-950/50'
                      : 'bg-whatsapp hover:bg-[#1FBE5C] hover:shadow-card-hover active:scale-[0.98]'
                  }`}
                >
                  <Icon name="chat" size={20} filled />
                  تأكيد طلب التسعير عبر واتساب
                </a>

                <CallButton block>اتصال بمستشار المجموعات</CallButton>
              </div>

              <p className="mt-5 flex items-start gap-2 border-t border-hairline pt-4 text-badge leading-relaxed text-ink-muted">
                <Icon name="verified_user" size={16} className="mt-0.5 text-gold-600" filled />
                الأسعار تقديرية لأغراض التخطيط ويُعتمد السعر النهائي في التعاقد الرسمي الموثق
                بترخيص وزارة السياحة فئة (أ) رقم <span className="ltr-nums">167</span>.
              </p>
            </div>
          </aside>
        </div>
      </div>

      <MobileContactBar message={message} />
    </>
  )
}
