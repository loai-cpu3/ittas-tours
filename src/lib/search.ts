import type { Package } from '../data/packages'

export type SearchMode = 'umrah' | 'domestic' | 'flights' | 'visas'

export const searchModes: { id: SearchMode; icon: string; label: string }[] = [
  { id: 'umrah', icon: 'mosque', label: 'برامج العمرة والحج' },
  { id: 'domestic', icon: 'beach_access', label: 'رحلات داخلية وشواطئ' },
  { id: 'flights', icon: 'flight', label: 'تذاكر طيران مباشر' },
  { id: 'visas', icon: 'fact_check', label: 'تأشيرات وفنادق' },
]

export type UmrahFilters = {
  tripType: string
  season: string
  hotelLevel: string
}

export const ANY = 'الكل'

export const tripTypes = [ANY, 'طيران (مباشر)', 'بري (اقتصادي)']
export const seasons = [ANY, 'عمرة رجب', 'عمرة شعبان', 'عمرة رمضان']
export const hotelLevels = [ANY, '5 نجوم (VIP)', '4 نجوم (مميز)', 'اقتصادي (توفير)']

export const defaultFilters: UmrahFilters = {
  tripType: ANY,
  season: ANY,
  hotelLevel: ANY,
}

/** Seasonal shortcuts shown under the search widget. */
export const quickFilters: {
  label: string
  tag: string | null
  icon: string
  mode?: SearchMode
}[] = [
  { label: 'عمرة المولد', tag: 'شعبان', icon: 'star' },
  { label: 'عمرة رجب', tag: 'رجب', icon: 'calendar_month' },
  { label: 'عمرة رمضان', tag: 'رمضان', icon: 'nightlight' },
  { label: 'رحلات الغردقة', tag: null, icon: 'beach_access', mode: 'domestic' },
]

const seasonTags: Record<string, string> = {
  'عمرة رجب': 'رجب',
  'عمرة شعبان': 'شعبان',
  'عمرة رمضان': 'رمضان',
}

const hotelTags: Record<string, string> = {
  '5 نجوم (VIP)': 'خمس-نجوم',
  'اقتصادي (توفير)': 'اقتصادي',
}

export function filterPackages(
  all: Package[],
  filters: UmrahFilters,
  quickTag: string | null,
): Package[] {
  return all.filter((pkg) => {
    if (quickTag && !pkg.tags.includes(quickTag)) return false

    const season = seasonTags[filters.season]
    if (season && !pkg.tags.includes(season)) return false

    const hotel = hotelTags[filters.hotelLevel]
    if (hotel && !pkg.tags.includes(hotel)) return false

    // "4 نجوم (مميز)" has no dedicated inventory yet — show everything rather
    // than an empty grid, and let the advisor qualify it over WhatsApp.
    if (filters.tripType === 'طيران (مباشر)' && !pkg.tags.includes('طيران-مباشر')) {
      return pkg.airline?.includes('مباشر') ?? false
    }

    return true
  })
}
