import { Icon } from '../ui/Icon'
import { site } from '../../data/site'
import { telHref, whatsappHref } from '../../lib/contact'

/**
 * The 50/50 split bar from the mobile design. Fixed below 1024px so the two
 * conversion paths are always one thumb-reach away.
 */
export function MobileContactBar({ message }: { message?: string }) {
  return (
    <nav
      aria-label="تواصل سريع"
      className="fixed inset-x-0 bottom-0 z-50 flex overflow-hidden rounded-t-xl shadow-sticky md:hidden"
      style={{ paddingBottom: 'env(safe-area-inset-bottom)' }}
    >
      <a
        href={whatsappHref(message)}
        target="_blank"
        rel="noopener noreferrer"
        className="flex flex-1 items-center justify-center gap-2 bg-whatsapp py-4 text-caption font-bold text-navy-950 active:bg-[#1FBE5C]"
      >
        <Icon name="chat" size={20} filled />
        واتساب للحجز
      </a>
      <a
        href={telHref()}
        className="flex flex-1 items-center justify-center gap-2 bg-navy-950 py-4 text-caption font-bold text-white active:brightness-125"
      >
        <Icon name="phone_in_talk" size={20} filled />
        <span className="ltr-nums font-latin tracking-wide">{site.phones[0]}</span>
      </a>
    </nav>
  )
}
