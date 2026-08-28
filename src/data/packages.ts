/**
 * Package catalogue.
 *
 * Prices, hotels, flight routing and inclusions are transcribed from the
 * approved designs. Itinerary copy for the economy and Ramadan programmes is
 * derived from the same facts and is flagged `draftItinerary` so the agency can
 * confirm the wording before launch.
 */

export type Badge = {
  label: string
  tone: 'gold' | 'navy' | 'alert' | 'teal'
  /** Material Symbol name — the badge's mark, never an emoji. */
  icon?: string
}

export type ItineraryDay = {
  day: string
  title: string
  body: string
  /** Milestone days (departure / return) get a filled gold node. */
  milestone?: boolean
}

export type RoomPrice = {
  label: string
  price: number
  featured?: boolean
}

export type Package = {
  slug: string
  category: 'umrah' | 'domestic'
  title: string
  shortTitle: string
  tagline: string
  summary: string
  image: string
  imageAlt: string
  /** Overlay caption on the card image. */
  overlay: { kicker: string; icon: string; label: string }
  badges: Badge[]
  seatsLeft?: number
  duration: string
  transport: { icon: string; label: string }
  airline?: string
  distanceToHaram?: string
  fromPrice: number
  tags: string[]
  meta: { icon: string; label: string; value: string }[]
  proximityNote?: string
  rooms: RoomPrice[]
  deposit: number
  installments: string
  includes: string[]
  excludes: string[]
  itinerary: ItineraryDay[]
  draftItinerary?: boolean
  gallery: { src: string; alt: string }[]
  totalPhotos: number
}

export const requiredDocuments = [
  { icon: 'article', label: 'جواز سفر مميكن ساري لمدة لا تقل عن 6 أشهر' },
  { icon: 'vaccines', label: 'شهادة تطعيم صحية معتمدة من مكاتب الصحة' },
  { icon: 'photo_camera', label: 'عدد 2 صورة شخصية حديثة بخلفية بيضاء (4x6)' },
  { icon: 'verified', label: 'إصدار باركود بوابة العمرة المصرية الرسمي المعتمد' },
] as const

export const packages: Package[] = [
  {
    slug: 'umrah-vip-gold',
    category: 'umrah',
    title: 'برنامج العمرة الذهبي VIP - 5 نجوم (14 يوماً / 13 ليلة)',
    shortTitle: 'برنامج العمرة الذهبي VIP',
    tagline:
      'تجربة روحانية متكاملة بأعلى مستويات الرفاهية والراحة، انطلاقاً من مطار أسيوط الدولي مباشرة إلى الأراضي المقدسة.',
    summary: 'إقامة فاخرة، طيران مباشر، وخدمات تنقلات مميزة طوال الرحلة.',
    image: '/images/umrah-vip-hotel-view.jpg',
    imageAlt: 'غرفة فندقية فاخرة تطل مباشرة على المسجد الحرام في مكة المكرمة',
    overlay: { kicker: 'فنادق 5 نجوم مطلة', icon: 'star', label: 'أبراج البيت / دار التقوى' },
    badges: [
      { label: 'VIP', tone: 'gold', icon: 'workspace_premium' },
      { label: 'طيران مباشر', tone: 'navy', icon: 'flight' },
    ],
    seatsLeft: 4,
    duration: '14 يوماً / 13 ليلة',
    transport: { icon: 'flight', label: 'مصر للطيران' },
    airline: 'مباشر من أسيوط',
    distanceToHaram: '150م من الحرم المكي',
    fromPrice: 68500,
    tags: ['رجب', 'شعبان', 'خمس-نجوم', 'طيران-مباشر'],
    meta: [
      { icon: 'calendar_month', label: 'المدة', value: '14 يوم (8 مكة + 5 مدينة)' },
      { icon: 'airlines', label: 'الطيران', value: 'مباشر من أسيوط' },
      { icon: 'bed', label: 'الإقامة', value: 'أبراج البيت + دار التقوى' },
      { icon: 'restaurant', label: 'الإعاشة', value: 'بوفيه إفطار مفتوح يومياً' },
    ],
    proximityNote:
      '3 دقائق سيراً على الأقدام فقط من فندق أبراج الساعة إلى ساحة الحرم المكي الشريف',
    rooms: [
      { label: 'الغرفة الثنائية (شخصين)', price: 68500, featured: true },
      { label: 'الغرفة الثلاثية (3 أشخاص)', price: 59000 },
      { label: 'الغرفة الرباعية (4 أشخاص)', price: 52000 },
    ],
    deposit: 20000,
    installments: 'حتى 6 أشهر',
    includes: [
      'تذاكر الطيران ذهاب وعودة (مباشر)',
      'تأشيرة العمرة والتأمين الطبي',
      'إقامة فنادق 5 نجوم مع الإفطار',
      'انتقالات داخلية بحافلات VIP',
      'مشرفون دينيون متخصصون',
      'هدايا قيمة (حقائب، سجادة صلاة)',
    ],
    excludes: [
      'المصروفات الشخصية الإضافية',
      'الوجبات غير المذكورة (الغداء والعشاء)',
      'الوزن الزائد في الطيران',
    ],
    itinerary: [
      {
        day: 'اليوم الأول',
        title: 'الانطلاق نحو الروحانية',
        body: 'التجمع في مطار أسيوط الدولي لإنهاء إجراءات السفر والتوجه برحلة مباشرة إلى مطار الملك عبدالعزيز بجدة. الاستقبال بواسطة حافلات VIP مكيفة والتوجه إلى مكة المكرمة. استلام الغرف في فندق أبراج البيت، ثم التوجه لأداء مناسك العمرة برفقة مشرفين متخصصين.',
        milestone: true,
      },
      {
        day: 'اليوم الثاني - الرابع',
        title: 'جوار الكعبة',
        body: 'إقامة روحانية خالصة في مكة المكرمة. أداء الصلوات الخمس في المسجد الحرام، والتفرغ للعبادة والطواف، مع التمتع ببوفيه الإفطار المفتوح يومياً.',
      },
      {
        day: 'اليوم الخامس',
        title: 'المزارات المكية',
        body: 'جولة سياحية دينية لزيارة أهم المعالم في مكة (غار حراء، غار ثور، جبل عرفات، منى، ومزدلفة) للتعرف على السيرة النبوية العطرة.',
      },
      {
        day: 'اليوم الثامن',
        title: 'الانتقال إلى مدينة رسول الله',
        body: 'مغادرة مكة المكرمة والتوجه إلى المدينة المنورة (عبر قطار الحرمين السريع أو حافلات VIP). الوصول واستلام الغرف في فندق دار التقوى الراقي والمجاور للحرم النبوي.',
      },
      {
        day: 'اليوم التاسع',
        title: 'المزارات المدنية والروضة',
        body: 'زيارة الروضة الشريفة (بمواعيد مسبقة)، ثم جولة لزيارة مسجد قباء، جبل أحد، ومسجد القبلتين.',
      },
      {
        day: 'اليوم الرابع عشر',
        title: 'العودة للوطن',
        body: 'التوجه إلى المطار للعودة إلى أرض الوطن (مطار أسيوط) بسلامة الله محملين بأجمل الذكريات الروحانية.',
        milestone: true,
      },
    ],
    gallery: [
      {
        src: '/images/makkah-clock-tower.jpg',
        alt: 'أبراج البيت وبرج الساعة المطل على المسجد الحرام',
      },
      { src: '/images/umrah-vip-suite.jpg', alt: 'جناح فندقي فاخر ضمن برنامج العمرة الذهبي' },
      { src: '/images/umrah-vip-hotel-view.jpg', alt: 'إطلالة الغرفة على ساحات الحرم المكي' },
    ],
    totalPhotos: 12,
  },
  {
    slug: 'umrah-economy-plus',
    category: 'umrah',
    title: 'برنامج العمرة الاقتصادي المتميز (15 يوماً / 14 ليلة)',
    shortTitle: 'برنامج العمرة الاقتصادي المتميز',
    tagline:
      'أفضل قيمة مقابل السعر مع الحفاظ على جودة الخدمة وقرب الإقامة من الحرم المكي الشريف.',
    summary: 'أفضل قيمة مقابل سعر مع الحفاظ على جودة الخدمة والراحة.',
    image: '/images/umrah-economy-madinah.jpg',
    imageAlt: 'المسجد النبوي في المدينة المنورة بقبته الخضراء ومظلات الساحات',
    overlay: { kicker: 'فنادق اقتصادية مميزة', icon: 'location_on', label: 'شارع إبراهيم الخليل' },
    badges: [
      { label: 'الأكثر طلباً', tone: 'gold', icon: 'local_fire_department' },
      { label: 'تنقلات حديثة', tone: 'navy', icon: 'directions_bus' },
    ],
    duration: '15 يوماً / 14 ليلة',
    transport: { icon: 'directions_bus', label: 'تنقلات حديثة' },
    airline: 'مباشر من أسيوط',
    distanceToHaram: 'شارع إبراهيم الخليل',
    fromPrice: 42900,
    tags: ['رجب', 'شعبان', 'اقتصادي'],
    meta: [
      { icon: 'calendar_month', label: 'المدة', value: '15 يوم (9 مكة + 5 مدينة)' },
      { icon: 'airlines', label: 'الطيران', value: 'مباشر من أسيوط' },
      { icon: 'bed', label: 'الإقامة', value: 'فنادق شارع إبراهيم الخليل' },
      { icon: 'directions_bus', label: 'التنقلات', value: 'حافلات حديثة مكيفة' },
    ],
    proximityNote: 'إقامة على شارع إبراهيم الخليل مع تنقلات مستمرة إلى ساحات الحرم',
    rooms: [
      { label: 'الغرفة الثلاثية (3 أشخاص)', price: 42900, featured: true },
      { label: 'الغرفة الرباعية (4 أشخاص)', price: 38500 },
      { label: 'الغرفة الثنائية (شخصين)', price: 49500 },
    ],
    deposit: 15000,
    installments: 'حتى 6 أشهر',
    includes: [
      'تذاكر الطيران ذهاب وعودة (مباشر)',
      'تأشيرة العمرة والتأمين الطبي',
      'إقامة فندقية مع وجبة الإفطار',
      'انتقالات داخلية بحافلات حديثة مكيفة',
      'مشرفون دينيون متخصصون',
    ],
    excludes: [
      'المصروفات الشخصية الإضافية',
      'الوجبات غير المذكورة (الغداء والعشاء)',
      'الوزن الزائد في الطيران',
    ],
    draftItinerary: true,
    itinerary: [
      {
        day: 'اليوم الأول',
        title: 'المغادرة من مطار أسيوط',
        body: 'التجمع في مطار أسيوط الدولي وإنهاء إجراءات السفر، ثم رحلة مباشرة إلى جدة والانتقال إلى مكة المكرمة، واستلام الغرف وأداء مناسك العمرة برفقة المشرفين.',
        milestone: true,
      },
      {
        day: 'اليوم الثاني - التاسع',
        title: 'الإقامة في مكة المكرمة',
        body: 'إقامة بفنادق شارع إبراهيم الخليل مع تنقلات مستمرة إلى الحرم المكي، وتفرغ كامل للعبادة والطواف وأداء الصلوات.',
      },
      {
        day: 'اليوم العاشر',
        title: 'الانتقال إلى المدينة المنورة',
        body: 'المغادرة إلى المدينة المنورة بحافلات حديثة مكيفة، واستلام الغرف بالفنادق القريبة من المسجد النبوي.',
      },
      {
        day: 'اليوم الحادي عشر',
        title: 'زيارة المعالم النبوية',
        body: 'زيارة الروضة الشريفة بمواعيد مسبقة، وجولة تشمل مسجد قباء وجبل أحد ومسجد القبلتين.',
      },
      {
        day: 'اليوم الخامس عشر',
        title: 'العودة إلى أسيوط',
        body: 'التوجه إلى المطار والعودة إلى أرض الوطن بسلامة الله.',
        milestone: true,
      },
    ],
    gallery: [
      { src: '/images/umrah-economy-madinah.jpg', alt: 'المسجد النبوي الشريف' },
      { src: '/images/umrah-economy-hotels.jpg', alt: 'فنادق شارع إبراهيم الخليل بمكة المكرمة' },
    ],
    totalPhotos: 8,
  },
  {
    slug: 'umrah-ramadan',
    category: 'umrah',
    title: 'عمرة شهر رمضان المبارك (ختم القرآن)',
    shortTitle: 'عمرة شهر رمضان المبارك',
    tagline: 'عمرة العشر الأواخر من رمضان في أجواء روحانية لا تُنسى، مع إفطار وسحور يومي.',
    summary: 'عمرة العشر الأواخر من رمضان في أجواء روحانية لا تنسى.',
    image: '/images/umrah-ramadan-crescent.jpg',
    imageAlt: 'هلال رمضان فوق مآذن المسجد الحرام ليلاً',
    overlay: { kicker: 'عمرة الشهر الكريم', icon: 'nightlight', label: 'العشر الأواخر' },
    badges: [{ label: 'موسم رمضان', tone: 'gold', icon: 'nightlight' }],
    seatsLeft: 4,
    duration: 'شهر كامل',
    transport: { icon: 'restaurant', label: 'إفطار وسحور' },
    airline: 'مباشر من أسيوط',
    distanceToHaram: 'إقامة قريبة من الحرم',
    fromPrice: 85000,
    tags: ['رمضان', 'خمس-نجوم'],
    meta: [
      { icon: 'calendar_month', label: 'المدة', value: 'شهر كامل' },
      { icon: 'airlines', label: 'الطيران', value: 'مباشر من أسيوط' },
      { icon: 'restaurant', label: 'الإعاشة', value: 'إفطار وسحور يومي' },
      { icon: 'nightlight', label: 'التميّز', value: 'إحياء العشر الأواخر' },
    ],
    proximityNote: 'إقامة قريبة من الحرم المكي تُيسّر صلاة التراويح والقيام طوال الشهر',
    rooms: [
      { label: 'الغرفة الثنائية (شخصين)', price: 85000, featured: true },
      { label: 'الغرفة الثلاثية (3 أشخاص)', price: 76000 },
      { label: 'الغرفة الرباعية (4 أشخاص)', price: 69000 },
    ],
    deposit: 25000,
    installments: 'حتى 6 أشهر',
    includes: [
      'تذاكر الطيران ذهاب وعودة (مباشر)',
      'تأشيرة العمرة والتأمين الطبي',
      'إقامة فندقية طوال الشهر الكريم',
      'وجبتا الإفطار والسحور يومياً',
      'مشرفون دينيون متخصصون',
      'برنامج ختم القرآن وإحياء العشر الأواخر',
    ],
    excludes: ['المصروفات الشخصية الإضافية', 'وجبة الغداء', 'الوزن الزائد في الطيران'],
    draftItinerary: true,
    itinerary: [
      {
        day: 'الأسبوع الأول',
        title: 'الوصول واستقبال الشهر الكريم',
        body: 'المغادرة من مطار أسيوط والوصول إلى مكة المكرمة، استلام الغرف وأداء مناسك العمرة، ثم بدء برنامج القيام والتراويح في المسجد الحرام.',
        milestone: true,
      },
      {
        day: 'الأسبوع الثاني - الثالث',
        title: 'التفرغ للعبادة وختم القرآن',
        body: 'برنامج يومي منظم للإفطار والسحور، مع حلقات ختم القرآن الكريم ومتابعة مستمرة من المشرفين الدينيين.',
      },
      {
        day: 'العشر الأواخر',
        title: 'ليالي القدر',
        body: 'إحياء ليالي العشر الأواخر في المسجد الحرام مع تنظيم كامل لأوقات الدخول والخروج ومواعيد الوجبات.',
      },
      {
        day: 'ختام البرنامج',
        title: 'العودة إلى أسيوط',
        body: 'التوجه إلى المطار والعودة إلى أرض الوطن بعد شهر من الروحانية والطمأنينة.',
        milestone: true,
      },
    ],
    gallery: [
      { src: '/images/umrah-ramadan-crescent.jpg', alt: 'هلال رمضان فوق الحرم المكي' },
      { src: '/images/umrah-ramadan-night.jpg', alt: 'أجواء ليالي رمضان في مكة المكرمة' },
    ],
    totalPhotos: 9,
  },
]

export function getPackage(slug: string): Package | undefined {
  return packages.find((p) => p.slug === slug)
}
