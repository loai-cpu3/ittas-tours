/**
 * Single source of truth for the agency's identity, licensing and contact
 * details. Everything the visitor uses to verify legitimacy lives here so the
 * trust surfaces (top bar, footer, badges) can never drift apart.
 */

export const site = {
  nameAr: 'إيتاس للسياحة',
  nameArFull: 'إيتاس للسياحة والسفر - فرع أسيوط',
  nameEn: 'Ittas Tours & Travel',
  foundedYear: 1976,
  license: {
    number: '167',
    year: 1976,
    category: 'أ',
    label: 'ترخيص وزارة السياحة فئة (أ) رقم 167 لسنة 1976',
    short: 'فئة (أ) 167',
  },
  branch: {
    city: 'أسيوط',
    label: 'فرع أسيوط',
    street: 'شارع الجمهورية - خلف بنك القاهرة',
    landmark: 'بجوار صيدلية الخليل',
    full: 'شارع الجمهورية - خلف بنك القاهرة (بجوار صيدلية الخليل) - أسيوط، جمهورية مصر العربية',
  },
  headquarters: {
    label: 'الإدارة العامة - القاهرة',
    full: '74 شارع جامعة الدول العربية - المهندسين، الجيزة',
  },
  email: 'assiut@ittas-tours.com',
  facebook: 'https://www.facebook.com/profile.php?id=61591511407152',
  /** First entry is the primary hotline used by every one-tap CTA. */
  phones: ['01002258319', '01006174063', '01044976048', '01092032392'],
} as const

/** Years of operation, so the "48 عاماً" claim never goes stale. */
export const yearsOfExperience = new Date().getFullYear() - site.foundedYear

export type NavLink = { label: string; href: string }

export const navLinks: NavLink[] = [
  { label: 'الرئيسية', href: '/' },
  { label: 'العمرة والحج', href: '/#packages' },
  { label: 'رحلات العائلات', href: '/family-planner' },
  { label: 'السياحة الداخلية', href: '/#search' },
  { label: 'الطيران', href: '/#search' },
  { label: 'عن الشركة', href: '/#trust' },
]

export const trustStats = [
  { icon: 'history_edu', value: `${yearsOfExperience}+ عاماً`, label: 'خبرة في السياحة' },
  { icon: 'verified_user', value: 'فئة (أ) 167', label: 'ترخيص سياحي معتمد' },
  { icon: 'groups', value: '50,000+', label: 'عميل يثق بنا' },
  { icon: 'flight_takeoff', value: 'طيران مباشر', label: 'من مطار أسيوط' },
] as const
