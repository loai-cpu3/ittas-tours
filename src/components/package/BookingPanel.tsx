import { useState } from 'react'
import { Icon } from '../ui/Icon'
import { CallButton } from '../ui/Buttons'
import { formatEGP, whatsappHref } from '../../lib/contact'
import { requiredDocuments, type Package } from '../../data/packages'
import { site } from '../../data/site'

const inputClass =
  'peer block w-full rounded-md border-2 border-hairline bg-surface px-4 pb-2 pt-6 text-body text-ink transition-colors placeholder-transparent focus:border-navy-950 focus:outline-none focus:ring-1 focus:ring-navy-950'

const labelClass =
  'pointer-events-none absolute right-4 top-4 text-caption font-bold text-ink-muted transition-all duration-200 peer-focus:top-1.5 peer-focus:text-badge peer-focus:text-navy-950 peer-[:not(:placeholder-shown)]:top-1.5 peer-[:not(:placeholder-shown)]:text-badge'

export function BookingPanel({ pkg }: { pkg: Package }) {
  const [room, setRoom] = useState(pkg.rooms.find((r) => r.featured) ?? pkg.rooms[0])
  const [name, setName] = useState('')
  const [phone, setPhone] = useState('')
  const [travelers, setTravelers] = useState('2')
  const [date, setDate] = useState('')
  const [touched, setTouched] = useState(false)

  const phoneValid = /^0?1[0125]\d{8}$/.test(phone.replace(/\s/g, ''))
  const nameValid = name.trim().length >= 3
  const ready = nameValid && phoneValid

  const message = [
    `السلام عليكم، أرغب في حجز "${pkg.shortTitle}" لدى ${site.nameAr} - ${site.branch.label}.`,
    `الاسم: ${name.trim()}`,
    `رقم الهاتف (واتساب): ${phone.trim()}`,
    `نوع الغرفة: ${room.label} — ${formatEGP(room.price)} ج.م للفرد`,
    `عدد الأفراد: ${travelers}`,
    date ? `تاريخ السفر المفضل: ${date}` : null,
    `الإجمالي التقديري: ${formatEGP(room.price * Number(travelers))} ج.م`,
    'برجاء تأكيد توافر المقاعد وخطوات إتمام الحجز. وشكراً.',
  ]
    .filter(Boolean)
    .join('\n')

  return (
    <div className="rounded-xl border border-hairline bg-surface p-5 shadow-card-hover md:p-6">
      <div className="border-b border-hairline pb-6">
        <h2 className="mb-4 font-display text-caption font-bold text-navy-950">
          أسعار البرنامج حسب نوع الغرفة
        </h2>

        <div className="grid gap-2.5" role="radiogroup" aria-label="نوع الغرفة">
          {pkg.rooms.map((option) => {
            const selected = option.label === room.label
            return (
              <button
                key={option.label}
                type="button"
                role="radio"
                aria-checked={selected}
                onClick={() => setRoom(option)}
                className={`flex items-center justify-between rounded-xl border p-3 text-right transition-all ${
                  selected
                    ? 'border-2 border-gold-500 bg-gold-100 shadow-card'
                    : 'border-hairline bg-surface hover:border-gold-500/50'
                }`}
              >
                <span className="flex items-center gap-2 text-caption font-bold text-navy-950">
                  <Icon
                    name={selected ? 'radio_button_checked' : 'radio_button_unchecked'}
                    size={18}
                    className={selected ? 'text-gold-600' : 'text-ink-faint'}
                  />
                  {option.label}
                </span>
                <span className="ltr-nums font-display text-caption font-bold text-gold-600">
                  {formatEGP(option.price)} ج.م
                </span>
              </button>
            )
          })}
        </div>

        <p className="mt-3 text-badge text-ink-muted">شامل التأشيرة، الطيران، والتأمين</p>

        <div className="mt-4 space-y-1.5 rounded-md border border-hairline bg-cream p-3 text-caption">
          <div className="flex items-center justify-between">
            <span className="text-ink-muted">مقدم الحجز</span>
            <span className="ltr-nums font-bold text-navy-950">
              {formatEGP(pkg.deposit)} ج.م
            </span>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-ink-muted">تسهيلات سداد متاحة</span>
            <span className="font-bold text-gold-600">{pkg.installments}</span>
          </div>
        </div>
      </div>

      {/* Documents up front — the critique flagged this as the missing P1. */}
      <div className="border-b border-hairline py-6">
        <h2 className="mb-3 flex items-center gap-2 font-display text-caption font-bold text-navy-950">
          <Icon name="description" size={20} className="text-gold-600" filled />
          المستندات المطلوبة للحجز
        </h2>
        <ul className="grid gap-2">
          {requiredDocuments.map((doc) => (
            <li
              key={doc.label}
              className="flex items-center gap-3 rounded-md border border-hairline bg-cream p-3 shadow-card"
            >
              <Icon name={doc.icon} size={18} className="text-gold-600" />
              <span className="text-badge font-bold leading-snug text-navy-950">{doc.label}</span>
            </li>
          ))}
        </ul>
      </div>

      <form className="space-y-4 py-6" onSubmit={(e) => e.preventDefault()}>
        <h2 className="font-display text-caption font-bold text-navy-950">احجز مقعدك الآن</h2>

        <div className="relative">
          <input
            id="booking-name"
            type="text"
            placeholder="الاسم الثلاثي"
            value={name}
            onChange={(e) => setName(e.target.value)}
            onBlur={() => setTouched(true)}
            aria-invalid={touched && !nameValid}
            className={inputClass}
            autoComplete="name"
          />
          <label htmlFor="booking-name" className={labelClass}>
            الاسم الثلاثي
          </label>
        </div>

        <div className="relative">
          <input
            id="booking-phone"
            type="tel"
            inputMode="tel"
            placeholder="رقم الهاتف (واتساب)"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            onBlur={() => setTouched(true)}
            aria-invalid={touched && !phoneValid}
            className={`${inputClass} ltr-nums text-right`}
            autoComplete="tel"
          />
          <label htmlFor="booking-phone" className={labelClass}>
            رقم الهاتف (واتساب)
          </label>
        </div>

        <div className="grid grid-cols-2 gap-3">
          <div className="relative">
            <label
              htmlFor="booking-travelers"
              className="mb-1.5 block text-badge font-bold text-ink-muted"
            >
              عدد الأفراد
            </label>
            <select
              id="booking-travelers"
              value={travelers}
              onChange={(e) => setTravelers(e.target.value)}
              className="w-full appearance-none rounded-md border-2 border-hairline bg-surface px-4 py-3 pl-9 text-body font-bold text-ink focus:border-navy-950 focus:outline-none"
            >
              {['1', '2', '3', '4', '5', '6'].map((n) => (
                <option key={n} value={n}>
                  {n}
                </option>
              ))}
            </select>
            <Icon
              name="expand_more"
              size={20}
              className="pointer-events-none absolute bottom-3.5 left-3 text-ink-faint"
            />
          </div>

          <div>
            <label
              htmlFor="booking-date"
              className="mb-1.5 block text-badge font-bold text-ink-muted"
            >
              تاريخ السفر المفضل
            </label>
            <input
              id="booking-date"
              type="date"
              value={date}
              min={new Date().toISOString().slice(0, 10)}
              onChange={(e) => setDate(e.target.value)}
              className="w-full rounded-md border-2 border-hairline bg-surface px-3 py-3 text-caption font-bold text-ink focus:border-navy-950 focus:outline-none"
            />
          </div>
        </div>

        <div className="flex items-center justify-between rounded-md bg-navy-100 px-4 py-3">
          <span className="text-caption font-medium text-navy-950">الإجمالي التقديري</span>
          <span className="ltr-nums font-display text-h2 font-bold text-navy-950">
            {formatEGP(room.price * Number(travelers))} ج.م
          </span>
        </div>

        {touched && !ready && (
          <p
            role="alert"
            aria-live="polite"
            className="flex items-start gap-2 rounded-md border border-alert/30 bg-alert/5 px-3 py-2 text-badge font-medium text-alert"
          >
            <Icon name="info" size={16} filled />
            {!nameValid
              ? 'برجاء كتابة الاسم الثلاثي كما في جواز السفر.'
              : 'برجاء كتابة رقم موبايل مصري صحيح (11 رقماً) للتواصل عبر واتساب.'}
          </p>
        )}
      </form>

      <div className="flex flex-col gap-3">
        <a
          href={ready ? whatsappHref(message) : undefined}
          target="_blank"
          rel="noopener noreferrer"
          aria-disabled={!ready}
          onClick={(e) => {
            if (!ready) {
              e.preventDefault()
              setTouched(true)
            }
          }}
          className={`inline-flex w-full items-center justify-center gap-2 rounded-md px-5 py-3.5 text-body font-bold text-navy-950 shadow-card transition-all ${
            ready
              ? 'bg-whatsapp hover:bg-[#1FBE5C] hover:shadow-card-hover active:scale-[0.98]'
              : 'cursor-not-allowed bg-whatsapp/40 text-navy-950/50'
          }`}
        >
          <Icon name="chat" size={20} filled />
          حجز فوري وتأكيد عبر واتساب
        </a>

        <CallButton block />
      </div>

      <p className="mt-5 flex items-center justify-center gap-2 rounded-md border border-hairline bg-cream px-3 py-2 text-badge text-ink-muted">
        <Icon name="verified_user" size={16} className="text-gold-600" filled />
        {site.nameAr} - {site.license.label}
      </p>
    </div>
  )
}
