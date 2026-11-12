import {
  useCallback,
  useEffect,
  useRef,
  useState,
  type KeyboardEvent,
  type MouseEvent,
  type PointerEvent,
  type WheelEvent,
} from 'react'

type Options = {
  count: number
  autoplay?: number // ms, 0 = off
  duration?: number // slide animation in ms (same as --swiper-speed in swiper.css)
}

const mod = (a: number, n: number) => ((a % n) + n) % n
const RADIUS = 2 // extra slides rendered on each side

// transform-based infinite swiper.
// `pos` is an unbounded virtual index (… -1, 0, 1, 2 …) that never wraps,
// so there is no clone "teleport" and nothing ever jumps. real item = pos mod count.
// dragging works the same with mouse, pen and touch (pointer events).
export function useSwiper({ count, autoplay = 0, duration = 450 }: Options) {
  // lo..hi = virtual range that must stay rendered while an animation runs
  const [state, setState] = useState({ pos: 0, lo: 0, hi: 0 })
  const [paused, setPaused] = useState(false)
  const rootRef = useRef<HTMLDivElement>(null)
  const drag = useRef({ id: -1, x: 0, y: 0, t: 0, dx: 0, w: 1, moved: false })
  const wheel = useRef({ sum: 0, lock: 0 })
  const { pos, lo, hi } = state

  const moveBy = useCallback((steps: number) => {
    if (!steps) return
    setState((s) => {
      const p = s.pos + steps
      return { pos: p, lo: Math.min(s.lo, p), hi: Math.max(s.hi, p) }
    })
  }, [])

  const next = useCallback(() => moveBy(1), [moveBy])
  const prev = useCallback(() => moveBy(-1), [moveBy])

  // go to a real item, the shortest way round
  const goTo = useCallback(
    (i: number) => {
      let d = mod(i - mod(pos, count), count)
      if (d > count / 2) d -= count
      moveBy(d)
    },
    [pos, count, moveBy],
  )

  // once the animation is over, stop rendering the slides we flew past
  useEffect(() => {
    if (lo === pos && hi === pos) return
    const t = setTimeout(() => setState((s) => ({ pos: s.pos, lo: s.pos, hi: s.pos })), duration + 80)
    return () => clearTimeout(t)
  }, [lo, hi, pos, duration])

  useEffect(() => {
    if (!autoplay || paused || count < 2) return
    if (matchMedia('(prefers-reduced-motion: reduce)').matches) return
    const t = setTimeout(() => !document.hidden && next(), autoplay)
    return () => clearTimeout(t)
  }, [autoplay, paused, pos, count, next])

  // ---------- drag ----------
  // the offset lives in a css variable (--dx), so dragging never re-renders react

  const setDx = (dx: number) => rootRef.current?.style.setProperty('--dx', `${dx}px`)
  const setDragging = (on: boolean) => rootRef.current?.classList.toggle('is-dragging', on)

  const onPointerDown = (e: PointerEvent<HTMLElement>) => {
    if (count < 2 || (e.pointerType === 'mouse' && e.button !== 0)) return
    if ((e.target as HTMLElement).closest('.swiper-arrow, .swiper-dots')) return
    if (e.pointerType === 'mouse') e.preventDefault() // no text selection / native image drag
    const slide = rootRef.current?.querySelector<HTMLElement>('.swiper-slide')
    drag.current = {
      id: e.pointerId,
      x: e.clientX,
      y: e.clientY,
      t: performance.now(),
      dx: 0,
      w: slide?.offsetWidth || 300,
      moved: false,
    }
  }

  const onPointerMove = (e: PointerEvent<HTMLElement>) => {
    const d = drag.current
    if (d.id !== e.pointerId) return
    const dx = e.clientX - d.x
    const dy = e.clientY - d.y

    if (!d.moved) {
      if (Math.abs(dx) < 6 && Math.abs(dy) < 6) return
      // mostly vertical: it's a page scroll, not a swipe
      if (Math.abs(dy) > Math.abs(dx)) return void (d.id = -1)
      d.moved = true
      d.t = performance.now()
      setPaused(true)
      setDragging(true)
      e.currentTarget.setPointerCapture(e.pointerId)
    }

    d.dx = dx
    setDx(dx)
  }

  const onPointerUp = (e: PointerEvent<HTMLElement>) => {
    const d = drag.current
    if (d.id !== e.pointerId) return
    d.id = -1
    if (!d.moved) return

    const velocity = d.dx / Math.max(1, performance.now() - d.t) // px/ms
    let steps = -Math.round(d.dx / d.w)
    if (!steps && (Math.abs(d.dx) > d.w * 0.12 || Math.abs(velocity) > 0.3)) steps = d.dx < 0 ? 1 : -1

    // release: the transition takes over from the dragged position, so it glides into place
    setDragging(false)
    setDx(0)
    moveBy(steps)
    if (e.pointerType !== 'mouse') setPaused(false)
  }

  // a drag must not count as a click on the slide under the pointer
  const onClickCapture = (e: MouseEvent) => {
    if (!drag.current.moved) return
    e.preventDefault()
    e.stopPropagation()
    drag.current.moved = false
  }

  // two-finger swipe on trackpads
  const onWheel = (e: WheelEvent) => {
    if (count < 2 || Math.abs(e.deltaX) <= Math.abs(e.deltaY)) return
    const w = wheel.current
    const now = performance.now()
    if (now < w.lock) return
    w.sum += e.deltaX
    if (Math.abs(w.sum) > 40) {
      moveBy(w.sum > 0 ? 1 : -1)
      w.sum = 0
      w.lock = now + duration
    }
  }

  const onKeyDown = (e: KeyboardEvent) => {
    if (e.key === 'ArrowRight') next()
    else if (e.key === 'ArrowLeft') prev()
    else return
    e.preventDefault()
  }

  const from = lo - RADIUS
  const visible =
    count < 2 ? (count ? [pos] : []) : Array.from({ length: hi - lo + 2 * RADIUS + 1 }, (_, i) => from + i)

  return {
    pos,
    active: count ? mod(pos, count) : 0,
    visible, // virtual indexes to render
    itemAt: (k: number) => mod(k, count),
    next,
    prev,
    goTo,
    moveBy,
    setPaused,
    rootProps: {
      ref: rootRef,
      tabIndex: 0,
      onPointerDown,
      onPointerMove,
      onPointerUp,
      onPointerCancel: onPointerUp,
      onClickCapture,
      onWheel,
      onKeyDown,
      onMouseEnter: () => setPaused(true),
      onMouseLeave: () => setPaused(false),
    },
  }
}
