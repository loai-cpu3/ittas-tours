import { useMemo, useState } from 'react'
import { Hero } from '../components/home/Hero'
import { SearchWidget } from '../components/home/SearchWidget'
import { TrustBar } from '../components/home/TrustBar'
import { PackagesSection } from '../components/home/PackagesSection'
import { FamilyPlannerBand } from '../components/home/FamilyPlannerBand'
import { MobileContactBar } from '../components/layout/MobileContactBar'
import { packages } from '../data/packages'
import { defaultFilters, filterPackages, type UmrahFilters } from '../lib/search'
import { usePageMeta } from '../lib/usePageMeta'
import { site } from '../data/site'

export function HomePage() {
  const [filters, setFilters] = useState<UmrahFilters>(defaultFilters)
  const [quickTag, setQuickTag] = useState<string | null>(null)

  usePageMeta({
    title: `${site.nameAr} - ${site.branch.label} | برامج العمرة والحج والرحلات`,
    description:
      'برامج عمرة وحج بطيران مباشر من مطار أسيوط، فنادق قريبة من الحرمين، وحجز فوري عبر واتساب. ترخيص وزارة السياحة فئة (أ) رقم 167 لسنة 1976.',
  })

  const visible = useMemo(
    () => filterPackages(packages, filters, quickTag),
    [filters, quickTag],
  )

  const scrollToPackages = () => {
    document.getElementById('packages')?.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }

  const reset = () => {
    setFilters(defaultFilters)
    setQuickTag(null)
  }

  return (
    <>
      <Hero>
        <SearchWidget
          filters={filters}
          onFiltersChange={setFilters}
          quickTag={quickTag}
          onQuickTagChange={setQuickTag}
          onSearch={scrollToPackages}
        />
      </Hero>

      <TrustBar />
      <PackagesSection visible={visible} total={packages.length} onReset={reset} />
      <FamilyPlannerBand />

      <MobileContactBar message="السلام عليكم، أرغب في الاستفسار عن برامج العمرة المتاحة لدى إيتاس للسياحة - فرع أسيوط." />
    </>
  )
}
