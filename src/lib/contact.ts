import { site } from '../data/site'

const COUNTRY_CODE = '20'

/** 010XXXXXXXX -> 2010XXXXXXXX (wa.me expects no plus and no leading zero). */
export function toInternational(localNumber: string): string {
  if (/[a-zA-Z]/.test(localNumber)) {
    return COUNTRY_CODE + localNumber.replace(/^0/, '')
  }
  return COUNTRY_CODE + localNumber.replace(/\D/g, '').replace(/^0/, '')
}

export const primaryPhone = site.phones[0]

export function telHref(phone: string = primaryPhone): string {
  return `tel:+${toInternational(phone)}`
}

/**
 * Deep-links into WhatsApp with the package context pre-filled, so the advisor
 * opens the chat already knowing what the visitor was looking at.
 */
export function whatsappHref(message?: string, phone: string = primaryPhone): string {
  const base = `https://wa.me/${toInternational(phone)}`
  return message ? `${base}?text=${encodeURIComponent(message)}` : base
}

export function packageInquiry(packageTitle: string, extra?: string): string {
  return [
    `السلام عليكم، أرغب في الاستفسار عن "${packageTitle}" لدى ${site.nameAr} - ${site.branch.label}.`,
    extra,
    'برجاء إفادتي بالمواعيد المتاحة وتفاصيل الحجز. وشكراً.',
  ]
    .filter(Boolean)
    .join('\n')
}

/** Egyptian pounds with Latin numerals — easiest to scan on a phone. */
export function formatEGP(amount: number): string {
  return new Intl.NumberFormat('en-EG').format(amount)
}
