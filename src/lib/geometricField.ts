export type GeometricFieldFade = 'none' | 'top' | 'bottom' | 'radial'

export interface GeometricFieldOptions {
  color: [number, number, number]
  opacity: number
  fade?: GeometricFieldFade
  animate?: boolean
  cellCssPx?: number
  strokeCssPx?: number
  starR?: number
  crossR?: number
}

export interface GeometricFieldController {
  destroy: () => void
}

const VS_SOURCE = `#version 300 es
in vec2 aPosition;
void main() {
  gl_Position = vec4(aPosition, 0.0, 1.0);
}
`

const FS_SOURCE = `#version 300 es
precision highp float;

uniform vec2 uResolution;
uniform float uCell;
uniform float uStarR;
uniform float uCrossR;
uniform float uStroke;
uniform float uTime;
uniform vec3 uColor;
uniform float uOpacity;
uniform int uFadeType;

out vec4 fragColor;

float box(vec2 q, float r) {
  vec2 d = abs(q) - r;
  return min(max(d.x, d.y), 0.0) + length(max(d, 0.0));
}

void main() {
  // 1. Pattern space:
  vec2 p = (gl_FragCoord.xy - 0.5 * uResolution) / uCell;

  // 2. Lattice:
  vec2 f = fract(p) - 0.5;

  // 3. Two squares, one rotated 45 degrees:
  mat2 rot45 = mat2(0.70710678, -0.70710678, 0.70710678, 0.70710678);
  float star = min(abs(box(f, uStarR)), abs(box(rot45 * f, uStarR)));

  // 4. Secondary motif on the half-offset lattice:
  vec2 g = fract(p + 0.5) - 0.5;
  float cross = abs(box(rot45 * g, uCrossR));

  // 5. Combine:
  float d = min(star, cross);

  // 6. Anti-aliased stroke (screen-space width, crisp at any DPR):
  float w = fwidth(d) * 1.2;
  float line = 1.0 - smoothstep(uStroke - w, uStroke + w, d);

  // 7. Illumination sweep:
  float phase = dot(normalize(vec2(-0.6, 1.0)), p) * 0.10 - uTime * 0.14;
  float sweep = 0.72 + 0.38 * (0.5 + 0.5 * sin(phase));

  // 8. Fade mask:
  vec2 uv = gl_FragCoord.xy / uResolution;
  float fade = 1.0;
  if (uFadeType == 1) {
    fade = smoothstep(0.0, 0.85, 1.0 - uv.y);
  } else if (uFadeType == 2) {
    fade = smoothstep(0.05, 0.85, uv.y);
  } else if (uFadeType == 3) {
    vec2 c = (uv - 0.5) * 2.0;
    fade = smoothstep(0.2, 0.95, length(c));
  }

  // 9. Output (premultiplied alpha):
  float alpha = line * uOpacity * sweep * fade;
  fragColor = vec4(uColor * alpha, alpha);
}
`

interface ProgramResources {
  program: WebGLProgram
  vs: WebGLShader
  fs: WebGLShader
  vao: WebGLVertexArrayObject
  vbo: WebGLBuffer
  uResolutionLoc: WebGLUniformLocation | null
  uCellLoc: WebGLUniformLocation | null
  uStarRLoc: WebGLUniformLocation | null
  uCrossRLoc: WebGLUniformLocation | null
  uStrokeLoc: WebGLUniformLocation | null
  uTimeLoc: WebGLUniformLocation | null
  uColorLoc: WebGLUniformLocation | null
  uOpacityLoc: WebGLUniformLocation | null
  uFadeTypeLoc: WebGLUniformLocation | null
}

function compileShader(
  gl: WebGL2RenderingContext,
  type: number,
  source: string
): WebGLShader | null {
  const shader = gl.createShader(type)
  if (!shader) return null
  gl.shaderSource(shader, source)
  gl.compileShader(shader)
  if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
    gl.deleteShader(shader)
    return null
  }
  return shader
}

function initResources(gl: WebGL2RenderingContext): ProgramResources | null {
  const vs = compileShader(gl, gl.VERTEX_SHADER, VS_SOURCE)
  if (!vs) return null

  const fs = compileShader(gl, gl.FRAGMENT_SHADER, FS_SOURCE)
  if (!fs) {
    gl.deleteShader(vs)
    return null
  }

  const program = gl.createProgram()
  if (!program) {
    gl.deleteShader(vs)
    gl.deleteShader(fs)
    return null
  }

  gl.attachShader(program, vs)
  gl.attachShader(program, fs)
  gl.linkProgram(program)

  if (!gl.getProgramParameter(program, gl.LINK_STATUS)) {
    gl.deleteProgram(program)
    gl.deleteShader(vs)
    gl.deleteShader(fs)
    return null
  }

  const vao = gl.createVertexArray()
  const vbo = gl.createBuffer()
  if (!vao || !vbo) {
    if (vao) gl.deleteVertexArray(vao)
    if (vbo) gl.deleteBuffer(vbo)
    gl.deleteProgram(program)
    gl.deleteShader(vs)
    gl.deleteShader(fs)
    return null
  }

  gl.bindVertexArray(vao)
  gl.bindBuffer(gl.ARRAY_BUFFER, vbo)
  const triangleVertices = new Float32Array([-1.0, -1.0, 3.0, -1.0, -1.0, 3.0])
  gl.bufferData(gl.ARRAY_BUFFER, triangleVertices, gl.STATIC_DRAW)

  const aPositionLoc = gl.getAttribLocation(program, 'aPosition')
  if (aPositionLoc !== -1) {
    gl.enableVertexAttribArray(aPositionLoc)
    gl.vertexAttribPointer(aPositionLoc, 2, gl.FLOAT, false, 0, 0)
  }

  gl.bindVertexArray(null)
  gl.bindBuffer(gl.ARRAY_BUFFER, null)

  return {
    program,
    vs,
    fs,
    vao,
    vbo,
    uResolutionLoc: gl.getUniformLocation(program, 'uResolution'),
    uCellLoc: gl.getUniformLocation(program, 'uCell'),
    uStarRLoc: gl.getUniformLocation(program, 'uStarR'),
    uCrossRLoc: gl.getUniformLocation(program, 'uCrossR'),
    uStrokeLoc: gl.getUniformLocation(program, 'uStroke'),
    uTimeLoc: gl.getUniformLocation(program, 'uTime'),
    uColorLoc: gl.getUniformLocation(program, 'uColor'),
    uOpacityLoc: gl.getUniformLocation(program, 'uOpacity'),
    uFadeTypeLoc: gl.getUniformLocation(program, 'uFadeType'),
  }
}

export function createGeometricField(
  canvas: HTMLCanvasElement,
  initialOptions: GeometricFieldOptions
): GeometricFieldController | null {
  if (typeof window === 'undefined') return null

  const gl = canvas.getContext('webgl2', {
    alpha: true,
    antialias: false,
    depth: false,
    stencil: false,
    preserveDrawingBuffer: false,
    powerPreference: 'low-power',
  })

  if (!gl || gl.isContextLost()) {
    return null
  }

  const options: GeometricFieldOptions = {
    cellCssPx: 72,
    strokeCssPx: 1.2,
    starR: 0.34,
    crossR: 0.16,
    fade: 'none',
    animate: true,
    ...initialOptions,
  }

  let resources = initResources(gl!)
  if (!resources) return null

  let isDestroyed = false
  let isContextLost = false
  let isIntersecting = false
  let isTabVisible = !document.hidden
  let isRunning = false
  let rafId: number | null = null

  const motionQuery = window.matchMedia('(prefers-reduced-motion: reduce)')
  let isReducedMotion = motionQuery.matches

  const TARGET_FPS = 30
  const FRAME_DURATION = 1000 / TARGET_FPS

  let lastFrameTime = performance.now()
  let frameAccumulator = 0
  let simulatedTime = 0

  let backingWidth = 0
  let backingHeight = 0

  function resize(): boolean {
    if (!gl || isContextLost || isDestroyed) return false
    const rect = canvas.getBoundingClientRect()
    const dpr = Math.min(window.devicePixelRatio || 1, 1.5)
    const displayWidth = Math.max(1, Math.round(rect.width * dpr))
    const displayHeight = Math.max(1, Math.round(rect.height * dpr))

    if (canvas.width !== displayWidth || canvas.height !== displayHeight) {
      canvas.width = displayWidth
      canvas.height = displayHeight
      backingWidth = displayWidth
      backingHeight = displayHeight
      gl.viewport(0, 0, displayWidth, displayHeight)
      return true
    }
    return false
  }

  function render(timeSeconds: number) {
    if (!gl || isContextLost || isDestroyed || !resources) return
    if (backingWidth <= 0 || backingHeight <= 0) return

    gl.useProgram(resources.program)
    gl.bindVertexArray(resources.vao)

    const dpr = Math.min(window.devicePixelRatio || 1, 1.5)
    const cellCss = options.cellCssPx ?? 72
    const strokeCss = options.strokeCssPx ?? 1.2
    const cellDevicePx = cellCss * dpr
    const strokePattern = (strokeCss * dpr) / (2.0 * cellDevicePx)

    gl.uniform2f(resources.uResolutionLoc, backingWidth, backingHeight)
    gl.uniform1f(resources.uCellLoc, cellDevicePx)
    gl.uniform1f(resources.uStarRLoc, options.starR ?? 0.34)
    gl.uniform1f(resources.uCrossRLoc, options.crossR ?? 0.16)
    gl.uniform1f(resources.uStrokeLoc, strokePattern)
    gl.uniform1f(resources.uTimeLoc, timeSeconds)
    gl.uniform3f(
      resources.uColorLoc,
      options.color[0],
      options.color[1],
      options.color[2]
    )
    gl.uniform1f(resources.uOpacityLoc, options.opacity)

    let fadeInt = 0
    if (options.fade === 'top') fadeInt = 1
    else if (options.fade === 'bottom') fadeInt = 2
    else if (options.fade === 'radial') fadeInt = 3
    gl.uniform1i(resources.uFadeTypeLoc, fadeInt)

    gl.drawArrays(gl.TRIANGLES, 0, 3)
    gl.bindVertexArray(null)
  }

  function stopLoop() {
    if (rafId !== null) {
      cancelAnimationFrame(rafId)
      rafId = null
    }
    isRunning = false
  }

  function canAnimate(): boolean {
    return (
      !isDestroyed &&
      !isContextLost &&
      options.animate !== false &&
      !isReducedMotion &&
      isIntersecting &&
      isTabVisible
    )
  }

  function loop(now: number) {
    if (!isRunning) return

    const delta = Math.min(now - lastFrameTime, 100)
    lastFrameTime = now
    frameAccumulator += delta

    if (frameAccumulator >= FRAME_DURATION) {
      const elapsedFrames = Math.floor(frameAccumulator / FRAME_DURATION)
      frameAccumulator -= elapsedFrames * FRAME_DURATION
      simulatedTime += elapsedFrames * (FRAME_DURATION / 1000)

      render(simulatedTime)
    }

    rafId = requestAnimationFrame(loop)
  }

  function updateRunningState() {
    if (canAnimate()) {
      if (!isRunning) {
        isRunning = true
        lastFrameTime = performance.now()
        frameAccumulator = 0
        rafId = requestAnimationFrame(loop)
      }
    } else {
      stopLoop()
      if (!isDestroyed && !isContextLost && isIntersecting && isTabVisible) {
        render(isReducedMotion || options.animate === false ? 0 : simulatedTime)
      }
    }
  }

  const resizeObserver = new ResizeObserver(() => {
    const resized = resize()
    if (resized && !isRunning) {
      render(isReducedMotion || options.animate === false ? 0 : simulatedTime)
    }
  })
  resizeObserver.observe(canvas)

  const intersectionObserver = new IntersectionObserver(
    (entries) => {
      for (const entry of entries) {
        isIntersecting = entry.isIntersecting
      }
      updateRunningState()
    },
    { threshold: 0 }
  )
  intersectionObserver.observe(canvas)

  function onVisibilityChange() {
    isTabVisible = !document.hidden
    updateRunningState()
  }
  document.addEventListener('visibilitychange', onVisibilityChange)

  function onMotionChange(e: MediaQueryListEvent) {
    isReducedMotion = e.matches
    if (isReducedMotion) {
      simulatedTime = 0
    }
    updateRunningState()
  }
  motionQuery.addEventListener('change', onMotionChange)

  function onContextLost(e: Event) {
    e.preventDefault()
    isContextLost = true
    stopLoop()
  }

  function onContextRestored() {
    isContextLost = false
    resources = initResources(gl!)
    resize()
    updateRunningState()
  }

  canvas.addEventListener('webglcontextlost', onContextLost)
  canvas.addEventListener('webglcontextrestored', onContextRestored)

  resize()
  updateRunningState()

  function cleanUpResources() {
    if (resources && gl) {
      gl.deleteVertexArray(resources.vao)
      gl.deleteBuffer(resources.vbo)
      gl.deleteProgram(resources.program)
      gl.deleteShader(resources.vs)
      gl.deleteShader(resources.fs)
      resources = null
    }
  }

  return {
    destroy() {
      if (isDestroyed) return
      isDestroyed = true
      stopLoop()

      resizeObserver.disconnect()
      intersectionObserver.disconnect()
      document.removeEventListener('visibilitychange', onVisibilityChange)
      motionQuery.removeEventListener('change', onMotionChange)
      canvas.removeEventListener('webglcontextlost', onContextLost)
      canvas.removeEventListener('webglcontextrestored', onContextRestored)

      cleanUpResources()
    },
  }
}
