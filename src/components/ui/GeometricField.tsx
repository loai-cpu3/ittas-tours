import { useEffect, useRef } from 'react'
import {
  createGeometricField,
  type GeometricFieldFade,
  type GeometricFieldOptions,
} from '../../lib/geometricField'

const GOLD_500: [number, number, number] = [200 / 255, 155 / 255, 56 / 255] // #C89B38
const GOLD_600: [number, number, number] = [179 / 255, 128 / 255, 18 / 255] // #B38012

export type GeometricFieldTone = 'gold-on-navy' | 'gold-on-linen'

export interface GeometricFieldProps {
  tone?: GeometricFieldTone
  fade?: GeometricFieldFade
  animate?: boolean
  opacity?: number
  className?: string
}

export function GeometricField({
  tone = 'gold-on-navy',
  fade = 'none',
  animate = true,
  opacity,
  className,
}: GeometricFieldProps) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null)

  const isLinen = tone === 'gold-on-linen'
  const resolvedColor = isLinen ? GOLD_600 : GOLD_500
  const maxOpacity = isLinen ? 0.05 : 0.08
  const defaultOpacity = isLinen ? 0.035 : 0.06
  const resolvedOpacity = Math.min(opacity ?? defaultOpacity, maxOpacity)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const options: GeometricFieldOptions = {
      color: resolvedColor,
      opacity: resolvedOpacity,
      fade,
      animate,
    }

    const controller = createGeometricField(canvas, options)
    return () => {
      controller?.destroy()
    }
  }, [resolvedColor, resolvedOpacity, fade, animate])

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      tabIndex={-1}
      className={`pointer-events-none absolute inset-0 h-full w-full ${className ?? ''}`}
    />
  )
}
