import { useEffect, useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { Icon } from '../ui/Icon'
import { WhatsAppButton } from '../ui/Buttons'
import { navLinks, site } from '../../data/site'
import { telHref } from '../../lib/contact'

export function Header() {
  const [drawerOpen, setDrawerOpen] = useState(false)
  const { pathname, hash } = useLocation()

  // Close the drawer on navigation and lock the body while it is open.
  useEffect(() => setDrawerOpen(false), [pathname, hash])

  useEffect(() => {
    document.body.style.overflow = drawerOpen ? 'hidden' : ''
    return () => {
      document.body.style.overflow = ''
    }
  }, [drawerOpen])

  useEffect(() => {
    if (!drawerOpen) return
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && setDrawerOpen(false)
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [drawerOpen])

  const isActive = (href: string) =>
    href === '/' ? pathname === '/' && !hash : pathname + hash === href || pathname === href

  return (
    <>
      <header className="sticky top-0 z-40 border-b border-hairline bg-linen/90 backdrop-blur-md">
        <div className="container-page flex items-center justify-between gap-6 py-3 md:py-4">
          {/* Logo + Adjacent Nav */}
          <div className="flex items-center gap-10">
            <Link to="/" className="flex items-center transition-transform hover:scale-[1.02]" aria-label={site.nameAr}>
              <img
                src="/ittas-logo.svg"
                alt={site.nameAr}
                className="h-8 md:h-9 w-auto object-contain"
              />
            </Link>

            <nav className="hidden items-center gap-7 lg:flex">
              {navLinks.map((link) => {
                const active = isActive(link.href)
                return (
                  <Link
                    key={link.label}
                    to={link.href}
                    className={`text-sm font-semibold transition-colors ${
                      active
                        ? 'font-bold text-gold-700'
                        : 'text-neutral-700 hover:text-navy-950'
                    }`}
                  >
                    {link.label}
                  </Link>
                )
              })}
            </nav>
          </div>

          {/* Action Cluster */}
          <div className="flex items-center gap-3">
            <div className="hidden items-center gap-2 rounded-lg bg-navy-50 px-3 py-1.5 md:flex">
              <Icon name="phone_in_talk" size={16} className="text-gold-700" filled />
              <a
                href={telHref()}
                className="ltr-nums text-xs font-bold text-navy-950 hover:text-gold-700"
              >
                {site.phones[0]}
              </a>
            </div>

            <WhatsAppButton size="sm" className="hidden md:inline-flex">
              واتساب فوري
            </WhatsAppButton>

            <button
              type="button"
              aria-label="فتح القائمة"
              aria-expanded={drawerOpen}
              onClick={() => setDrawerOpen(true)}
              className="rounded-lg p-2 text-navy-950 transition-colors hover:bg-navy-100 lg:hidden"
            >
              <Icon name="menu" />
            </button>
          </div>
        </div>
      </header>

      {drawerOpen && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label="قائمة التنقل الرئيسية"
          className="fixed inset-0 z-[60] lg:hidden"
        >
          <div
            className="absolute inset-0 bg-navy-950/50 backdrop-blur-sm"
            onClick={() => setDrawerOpen(false)}
          />
          <nav
            aria-label="القائمة الرئيسية"
            className="absolute inset-y-0 right-0 flex w-80 max-w-[85vw] animate-drawer-in flex-col bg-linen shadow-modal"
          >
            <div className="flex items-center justify-between border-b border-hairline px-5 py-4">
              <span className="font-display text-h2 text-navy-950">{site.nameAr}</span>
              <button
                type="button"
                aria-label="إغلاق القائمة"
                onClick={() => setDrawerOpen(false)}
                className="rounded-full p-2 text-ink-muted hover:bg-navy-100"
              >
                <Icon name="close" />
              </button>
            </div>

            <div className="flex-1 overflow-y-auto px-3 py-4">
              {navLinks.map((link) => (
                <Link
                  key={link.label}
                  to={link.href}
                  className="flex items-center justify-between rounded-md px-3 py-3.5 text-lead font-medium text-navy-950 hover:bg-gold-100"
                >
                  {link.label}
                  <Icon name="chevron_left" size={20} className="text-gold-500" />
                </Link>
              ))}
            </div>

            <div className="space-y-3 border-t border-hairline bg-cream px-5 py-5 text-caption">
              <p className="flex items-start gap-2 text-ink-muted">
                <Icon name="location_on" size={18} className="mt-0.5 text-gold-600" />
                {site.branch.street}
              </p>
              <p className="flex items-center gap-2 text-ink-muted">
                <Icon name="verified_user" size={18} className="text-gold-600" filled />
                {site.license.label}
              </p>
              <WhatsAppButton block size="sm">
                تواصل عبر واتساب
              </WhatsAppButton>
            </div>
          </nav>
        </div>
      )}
    </>
  )
}
