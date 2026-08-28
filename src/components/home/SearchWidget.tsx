import { useRef, useState } from 'react'
import { Icon } from '../ui/Icon'
import { PrimaryButton } from '../ui/Buttons'
import { whatsappHref } from '../../lib/contact'
import { site } from '../../data/site'
import {
  ANY,
  defaultFilters,
  hotelLevels,
  quickFilters,
  searchModes,
  seasons,
  tripTypes,
  type SearchMode,
  type UmrahFilters,
} from '../../lib/search'

type Field = { id: string; label: string; options: string[] }

/** Non-Umrah modes have no bookable inventory yet, so they collect the brief
 *  and hand it straight to an advisor. */
const inquiryFields: Record<Exclude<SearchMode, 'umrah'>, Field[]> = {
  domestic: [
    { id: 'destination', label: 'الوجهة', options: ['الغردقة', 'شرم الشيخ', 'دهب', 'الأقصر وأسوان'] },
    { id: 'nights', label: 'عدد الليالي', options: ['3 ليالٍ', '4 ليالٍ', '7 ليالٍ'] },
    { id: 'guests', label: 'عدد الأفراد', options: ['فردان', '3 أفراد', '4 أفراد', 'أكثر من 4'] },
  ],
  flights: [
    { id: 'route', label: 'خط السير', options: ['أسيوط ⟷ جدة', 'القاهرة ⟷ جدة', 'وجهة أخرى'] },
    { id: 'tripKind', label: 'نوع التذكرة', options: ['ذهاب وعودة', 'ذهاب فقط'] },
    { id: 'cabin', label: 'الدرجة', options: ['اقتصادية', 'رجال أعمال'] },
  ],
  visas: [
    { id: 'service', label: 'الخدمة المطلوبة', options: ['تأشيرة عمرة', 'تأشيرة زيارة', 'حجز فندقي فقط'] },
    { id: 'city', label: 'المدينة', options: ['مكة المكرمة', 'المدينة المنورة', 'جدة'] },
    { id: 'guests', label: 'عدد الأفراد', options: ['فرد', 'فردان', '3 أفراد', 'أكثر من 3'] },
  ],
}

const selectClass =
  'w-full appearance-none rounded-md border border-hairline bg-surface px-4 py-3 pl-10 text-body text-ink transition-colors hover:border-gold-500/60 focus:border-navy-800'

function SelectField({
  id,
  label,
  value,
  options,
  onChange,
}: {
  id: string
  label: string
  value: string
  options: string[]
  onChange: (value: string) => void
}) {
  return (
    <div className="relative">
      <label htmlFor={id} className="mb-2 block text-badge font-bold text-ink-muted">
        {label}
      </label>
      <select
        id={id}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className={selectClass}
      >
        {options.map((option) => (
          <option key={option} value={option}>
            {option}
          </option>
        ))}
      </select>
      <Icon
        name="expand_more"
        className="pointer-events-none absolute bottom-3 left-3 text-ink-muted"
      />
    </div>
  )
}

export function SearchWidget({
  filters,
  onFiltersChange,
  quickTag,
  onQuickTagChange,
  onSearch,
}: {
  filters: UmrahFilters
  onFiltersChange: (filters: UmrahFilters) => void
  quickTag: string | null
  onQuickTagChange: (tag: string | null) => void
  onSearch: () => void
}) {
  const [mode, setMode] = useState<SearchMode>('umrah')
  const [inquiry, setInquiry] = useState<Record<string, string>>({})
  const tabRefs = useRef<Record<string, HTMLButtonElement | null>>({})

  const set = (key: keyof UmrahFilters) => (value: string) =>
    onFiltersChange({ ...filters, [key]: value })

  const fields = mode === 'umrah' ? null : inquiryFields[mode]
  const filtersActive =
    quickTag !== null ||
    filters.season !== ANY ||
    filters.hotelLevel !== ANY ||
    filters.tripType !== ANY

  /** Roving focus: in RTL the visual arrows are mirrored. */
  const onTabKeyDown = (event: React.KeyboardEvent) => {
    const keys = ['ArrowRight', 'ArrowLeft', 'Home', 'End']
    if (!keys.includes(event.key)) return
    event.preventDefault()

    const index = searchModes.findIndex((m) => m.id === mode)
    const step = event.key === 'ArrowLeft' ? 1 : event.key === 'ArrowRight' ? -1 : 0
    const next =
      event.key === 'Home'
        ? 0
        : event.key === 'End'
          ? searchModes.length - 1
          : (index + step + searchModes.length) % searchModes.length

    setMode(searchModes[next].id)
    tabRefs.current[searchModes[next].id]?.focus()
  }

  const inquiryMessage = () => {
    const modeLabel = searchModes.find((m) => m.id === mode)?.label ?? ''
    const answers = (fields ?? [])
      .map((field) => `${field.label}: ${inquiry[field.id] ?? field.options[0]}`)
      .join('\n')
    return `السلام عليكم، أرغب في الاستفسار عن ${modeLabel} لدى ${site.nameAr} - ${site.branch.label}.\n${answers}\nبرجاء إفادتي بالعروض المتاحة. وشكراً.`
  }

  return (

    <div
      id="search"
      className="scroll-mt-28 rounded-2xl bg-linen p-5 shadow-modal md:p-8"
    >
      <div
        role="tablist"
        aria-label="أنواع الرحلات"
        onKeyDown={onTabKeyDown}
        className="no-scrollbar mb-6 flex gap-1 overflow-x-auto border-b border-hairline"
      >
        {searchModes.map((item) => {
          const active = mode === item.id
          return (
            <button
              key={item.id}
              ref={(node) => {
                tabRefs.current[item.id] = node
              }}
              role="tab"
              id={`search-tab-${item.id}`}
              aria-selected={active}
              aria-controls={`search-panel-${item.id}`}
              tabIndex={active ? 0 : -1}
              type="button"
              onClick={() => setMode(item.id)}
              className={`-mb-px flex shrink-0 items-center gap-2 whitespace-nowrap border-b-2 px-3 pb-4 pt-1 text-caption font-bold transition-colors ${
                active
                  ? 'border-gold-500 text-navy-950'
                  : 'border-transparent text-ink-muted hover:border-gold-500/40 hover:text-gold-700'
              }`}
            >
              <Icon name={item.icon} size={20} filled={active} />
              {item.label}
            </button>
          )
        })}
      </div>

      <div
        role="tabpanel"
        id={`search-panel-${mode}`}
        aria-labelledby={`search-tab-${mode}`}
        tabIndex={-1}
      >
        {mode === 'umrah' ? (
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
            <SelectField
              id="trip-type"
              label="نوع الرحلة"
              value={filters.tripType}
              options={tripTypes}
              onChange={set('tripType')}
            />
            <SelectField
              id="season"
              label="الموسم / الموعد"
              value={filters.season}
              options={seasons}
              onChange={set('season')}
            />
            <SelectField
              id="hotel-level"
              label="مستوى الفندق"
              value={filters.hotelLevel}
              options={hotelLevels}
              onChange={set('hotelLevel')}
            />
            <div className="flex items-end">
              <PrimaryButton block onClick={onSearch} className="py-3">
                <Icon name="search" size={20} />
                استعراض البرامج المتاحة
              </PrimaryButton>
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {fields!.map((field) => (
              <SelectField
                key={field.id}
                id={field.id}
                label={field.label}
                value={inquiry[field.id] ?? field.options[0]}
                options={field.options}
                onChange={(value) => setInquiry((prev) => ({ ...prev, [field.id]: value }))}
              />
            ))}
            <div className="flex items-end">
              <a
                href={whatsappHref(inquiryMessage())}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex w-full items-center justify-center gap-2 rounded-md bg-whatsapp px-5 py-3 text-body font-bold text-navy-950 shadow-card transition-all hover:bg-[#1FBE5C] hover:shadow-card-hover active:scale-[0.98]"
              >
                <Icon name="chat" size={20} filled />
                اطلب عرض سعر فوري
              </a>
            </div>
          </div>
        )}
      </div>

      <div className="mt-6 flex items-center gap-3">
        <span className="hidden shrink-0 text-badge font-bold text-ink-muted sm:block">
          بحث سريع:
        </span>

        <div className="no-scrollbar -mx-1 flex flex-1 snap-x snap-mandatory gap-2 overflow-x-auto px-1 py-0.5">
          {quickFilters.map((item) => {
            const active = item.tag !== null && quickTag === item.tag
            return (
              <button
                key={item.label}
                type="button"
                onClick={() => {
                  if (item.mode) {
                    setMode(item.mode)
                    onQuickTagChange(null)
                    return
                  }
                  onQuickTagChange(active ? null : item.tag)
                  onSearch()
                }}
                aria-pressed={active}
                className={`flex min-h-[44px] shrink-0 snap-start items-center gap-1.5 whitespace-nowrap rounded-sm px-4 text-badge font-semibold transition-colors ${
                  active
                    ? 'bg-navy-950 text-white'
                    : 'bg-gold-100 text-gold-700 hover:bg-gold-500/25'
                }`}
              >
                <Icon name={item.icon} size={16} filled={active} />
                {item.label}
              </button>
            )
          })}

          {filtersActive && (
            <button
              type="button"
              onClick={() => {
                onQuickTagChange(null)
                onFiltersChange(defaultFilters)
              }}
              className="flex min-h-[44px] shrink-0 items-center gap-1 whitespace-nowrap rounded-sm px-3 text-badge font-semibold text-ink-muted hover:text-navy-950"
            >
              <Icon name="restart_alt" size={16} />
              مسح التصفية
            </button>
          )}
        </div>
      </div>
    </div>
  )
}
