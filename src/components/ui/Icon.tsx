type IconProps = {
  name: string
  className?: string
  /** Filled variant — used for stars, verified seals and active states. */
  filled?: boolean
  size?: number
}

/**
 * Material Symbols glyph. Decorative by default: labels next to icons carry
 * the meaning, so the glyph itself stays out of the accessibility tree.
 */
export function Icon({ name, className = '', filled = false, size }: IconProps) {
  return (
    <span
      aria-hidden="true"
      className={`material-symbols-outlined shrink-0 ${className}`}
      style={{
        fontSize: size ? `${size}px` : undefined,
        fontVariationSettings: filled ? "'FILL' 1" : undefined,
      }}
    >
      {name}
    </span>
  )
}
