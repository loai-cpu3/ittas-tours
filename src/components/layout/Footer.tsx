import { Link } from 'react-router-dom'
import { Icon } from '../ui/Icon'
import { site, yearsOfExperience } from '../../data/site'
import { telHref } from '../../lib/contact'

const quickLinks = [
  { label: 'الرئيسية', href: '/' },
  { label: 'برامج العمرة', href: '/#packages' },
  { label: 'رحلات العائلات والمجموعات', href: '/family-planner' },
  { label: 'حجز طيران', href: '/#search' },
  { label: 'عن الشركة', href: '/#trust' },
]

const infoLinks = [
  { label: 'الشروط والأحكام', href: '/#trust' },
  { label: 'سياسة الخصوصية', href: '/#trust' },
  { label: 'أسئلة شائعة (عمرة)', href: '/#trust' },
  { label: 'تراخيص الشركة', href: '/#trust' },
]

export function Footer() {
  return (
    <footer className="mt-auto border-t border-gold-500/15 bg-navy-950 pb-24 pt-16 text-white/85 md:pb-8">
      <div className="container-page">
        <div className="grid grid-cols-1 gap-10 md:grid-cols-2 lg:grid-cols-4">
          <div>
            <div className="mb-5 flex items-center gap-3">
              <img
                src="/ittas-logo-white.svg"
                alt={site.nameAr}
                className="h-8 md:h-9 w-auto object-contain"
              />
              <span className="font-display text-h2 text-gold-400">{site.nameAr}</span>
            </div>
            <p className="mb-6 text-caption leading-relaxed text-white/70">
              شركة سياحة مصرية تأسست عام <span className="ltr-nums">{site.foundedYear}</span>، رائدة
              في خدمات السياحة الدينية (الحج والعمرة) والسياحة الداخلية وحجز تذاكر الطيران، بثقة
              تمتد لأكثر من <span className="ltr-nums">{yearsOfExperience}</span> عاماً.
            </p>
            <a
              href={site.facebook}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-white/10 transition-colors hover:bg-gold-500 hover:text-navy-950"
              aria-label="صفحة إيتاس للسياحة على فيسبوك"
            >
              <Icon name="thumb_up" size={20} filled />
            </a>
          </div>

          <div>
            <h4 className="mb-5 font-display text-caption font-bold uppercase tracking-wider text-white">
              روابط سريعة
            </h4>
            <ul className="space-y-3 text-caption">
              {quickLinks.map((link) => (
                <li key={link.label}>
                  <Link
                    to={link.href}
                    className="inline-block py-1 text-white/75 transition-colors hover:text-gold-500"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="mb-5 font-display text-caption font-bold uppercase tracking-wider text-white">
              معلومات تهمك
            </h4>
            <ul className="space-y-3 text-caption">
              {infoLinks.map((link) => (
                <li key={link.label}>
                  <Link
                    to={link.href}
                    className="inline-block py-1 text-white/75 transition-colors hover:text-gold-500"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="mb-5 font-display text-caption font-bold uppercase tracking-wider text-white">
              تواصل مع {site.branch.label}
            </h4>
            <ul className="space-y-5 text-caption">
              <li className="flex items-start gap-3">
                <Icon name="location_on" size={20} className="mt-0.5 text-gold-500" />
                <span className="leading-relaxed text-white/75">
                  {site.branch.street}
                  <br />
                  {site.branch.landmark}
                  <br />
                  أسيوط، جمهورية مصر العربية
                </span>
              </li>
              <li className="flex items-start gap-3">
                <Icon name="phone_iphone" size={20} className="mt-0.5 text-gold-500" />
                <span className="flex flex-col gap-1">
                  {site.phones.map((phone) => (
                    <a
                      key={phone}
                      href={telHref(phone)}
                      className="ltr-nums inline-block py-1 font-latin tracking-wide text-white/75 hover:text-gold-500"
                    >
                      {phone}
                    </a>
                  ))}
                </span>
              </li>
              <li className="flex items-center gap-3">
                <Icon name="mail" size={20} className="text-gold-500" />
                <a
                  href={`mailto:${site.email}`}
                  className="ltr-nums inline-block py-1 font-latin text-white/75 hover:text-gold-500"
                >
                  {site.email}
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-12 flex flex-col-reverse items-center justify-between gap-4 border-t border-white/10 pt-8 text-center md:flex-row md:text-right">
          <p className="text-badge text-white/55">
            © <span className="ltr-nums">{site.foundedYear}</span> -{' '}
            <span className="ltr-nums">{new Date().getFullYear()}</span> {site.nameArFull}. جميع
            الحقوق محفوظة.
          </p>
          <p className="flex items-center gap-2 text-badge text-white/70">
            <Icon name="workspace_premium" size={18} className="text-gold-500" filled />
            {site.license.label}
          </p>
        </div>
      </div>
    </footer>
  )
}
