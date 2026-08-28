import type { ReactNode } from 'react'
import { Icon } from './Icon'
import { telHref, whatsappHref } from '../../lib/contact'
import { site } from '../../data/site'

type Size = 'sm' | 'md' | 'lg'

const sizes: Record<Size, string> = {
  sm: 'px-4 py-2 text-caption',
  md: 'px-5 py-3 text-body',
  lg: 'px-6 py-4 text-lead',
}

const base =
  'inline-flex items-center justify-center gap-2 rounded-md font-semibold transition-all duration-200 disabled:opacity-60 disabled:pointer-events-none'

/**
 * The conversion primitive. Every package surface funnels into a WhatsApp
 * thread that already carries the package context.
 */
export function WhatsAppButton({
  message,
  children = 'احجز عبر واتساب',
  size = 'md',
  className = '',
  block = false,
}: {
  message?: string
  children?: ReactNode
  size?: Size
  className?: string
  block?: boolean
}) {
  return (
    <a
      href={whatsappHref(message)}
      target="_blank"
      rel="noopener noreferrer"
      className={`${base} ${sizes[size]} bg-whatsapp text-navy-950 shadow-card hover:bg-[#1FBE5C] hover:shadow-card-hover active:scale-[0.98] ${
        block ? 'w-full' : ''
      } ${className}`}
    >
      <Icon name="chat" size={20} filled />
      {children}
    </a>
  )
}

export function CallButton({
  children,
  size = 'md',
  className = '',
  block = false,
  phone = site.phones[0],
}: {
  children?: ReactNode
  size?: Size
  className?: string
  block?: boolean
  phone?: string
}) {
  return (
    <a
      href={telHref(phone)}
      className={`${base} ${sizes[size]} border-2 border-navy-950 text-navy-950 hover:bg-navy-950 hover:text-white active:scale-[0.98] ${
        block ? 'w-full' : ''
      } ${className}`}
    >
      <Icon name="call" size={20} filled />
      {children ?? (
        <>
          اتصال فوري: <span className="ltr-nums font-latin tracking-wide">{phone}</span>
        </>
      )}
    </a>
  )
}

export function PrimaryButton({
  children,
  onClick,
  type = 'button',
  size = 'md',
  className = '',
  block = false,
}: {
  children: ReactNode
  onClick?: () => void
  type?: 'button' | 'submit'
  size?: Size
  className?: string
  block?: boolean
}) {
  return (
    <button
      type={type}
      onClick={onClick}
      className={`${base} ${sizes[size]} group relative overflow-hidden bg-navy-950 text-white shadow-card hover:bg-navy-800 hover:shadow-card-hover active:scale-[0.99] ${
        block ? 'w-full' : ''
      } ${className}`}
    >
      {/* Gold sweep on hover — the "glowing focus" the design calls for. */}
      <span className="pointer-events-none absolute inset-y-0 -left-full w-2/3 bg-gradient-to-r from-transparent via-gold-500/35 to-transparent group-hover:animate-shimmer" />
      {children}
    </button>
  )
}
