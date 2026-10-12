import { gsap } from '../lib/gsap'
import { calloutIn } from './callouts'

/**
 * Desktop / tablet: the hero stage is pinned and a single scrubbed timeline drives it.
 *
 *  0 - 3.2   hero text leaves, car pushes in on the front axle      (phase "front")
 *  4.6 - 7   camera pans along the body to the rear haunch          (phase "rear")
 *  8.8 - 10.6 car accelerates out of frame to the right, pin releases
 *
 * Everything is scrubbed, so scrolling back up plays the same motion in reverse.
 * Only x / y / scale / rotation / opacity are animated (no layout properties).
 */
export function buildPinnedScene(root, q) {
  const stage = q('[data-stage-pin]')[0]
  const introBox = q('[data-car-intro]')[0] // un-transformed layout box of the car
  const car = q('[data-car-scroll]')[0] //     the element the scroll timeline moves

  // Geometry is read lazily and re-read on every ScrollTrigger refresh (invalidateOnRefresh),
  // never inside a per-frame callback.
  const geo = () => ({
    w: introBox.offsetWidth,
    h: introBox.offsetHeight,
    cx: introBox.offsetLeft + introBox.offsetWidth / 2,
    cy: introBox.offsetTop + introBox.offsetHeight / 2,
    sw: stage.clientWidth,
    sh: stage.clientHeight,
  })

  /**
   * Put the point (px, py) of the photo (0-1 from its top-left) at screen position
   * (tx, ty) (0-1 of the stage) after scaling the photo to `scale` about its centre.
   */
  const focus = (px, py, scale, tx, ty) => ({
    scale,
    x: () => {
      const g = geo()
      return tx * g.sw - g.cx - (px - 0.5) * g.w * scale
    },
    y: () => {
      const g = geo()
      return ty * g.sh - g.cy - (py - 0.5) * g.h * scale
    },
  })

  const headline = q('[data-headline-wrap]')
  const copy = q('[data-copy-wrap]')
  const stats = q('[data-stats-wrap]')
  const cue = q('[data-cue-wrap]')
  const vignette = q('[data-vignette]')
  const rail = q('[data-rail]')
  const railFill = q('[data-rail-fill]')
  const readout = q('[data-rail-readout]')[0]
  const caption = (name) => q(`[data-caption="${name}"]`)
  const callouts = (phase) => q(`[data-callout][data-phase="${phase}"]`)

  gsap.set([...caption('front'), ...caption('rear'), ...rail, ...q('[data-callout]')], { autoAlpha: 0 })
  gsap.set(railFill, { scaleX: 0, transformOrigin: '0% 50%' })
  gsap.set(car, { transformPerspective: 1800 })

  const tl = gsap.timeline({
    defaults: { ease: 'none' },
    scrollTrigger: {
      id: 'stage',
      trigger: root,
      start: 'top top',
      end: () => `+=${Math.round(window.innerHeight * 4)}`,
      pin: stage,
      scrub: 0.6, // small smoothing: the car trails the scroll a hair, never lags
      anticipatePin: 1,
      invalidateOnRefresh: true,
    },
  })

  // ---- Phase 0: hero text exits, background closes in -----------------------------
  tl.to(headline, { y: -110, autoAlpha: 0, duration: 1.6, ease: 'power1.in' }, 0)
    .to(copy, { y: -60, autoAlpha: 0, duration: 1.5, ease: 'power1.in' }, 0)
    .to(stats, { y: 40, autoAlpha: 0, duration: 1.4, ease: 'power1.in' }, 0)
    .to(cue, { autoAlpha: 0, duration: 0.5 }, 0)
    .to(vignette, { opacity: 0.85, duration: 3 }, 0)

  // ---- Phase A: push in on the front axle -----------------------------------------
  tl.to(
    car,
    { ...focus(0.41, 0.55, 1.6, 0.56, 0.58), rotation: -1.4, rotationY: 4, duration: 3.2, ease: 'power2.inOut' },
    0,
  )
    .to(rail, { autoAlpha: 1, duration: 0.8 }, 1.4)
    .fromTo(caption('front'), { autoAlpha: 0, y: 30 }, { autoAlpha: 1, y: 0, duration: 0.8, ease: 'power2.out' }, 2.2)

  callouts('front').forEach((c, i) => tl.add(calloutIn(c), 2.9 + i * 0.25))
  tl.set(callouts('front'), { autoAlpha: 1 }, 2.9)

  // ---- Phase B: pan along the body to the rear -------------------------------------
  tl.to(callouts('front'), { autoAlpha: 0, duration: 0.5 }, 4.3)
    .to(caption('front'), { autoAlpha: 0, y: -24, duration: 0.6, ease: 'power2.in' }, 4.3)
    .to(
      car,
      { ...focus(0.8, 0.45, 1.62, 0.62, 0.58), rotation: 0.9, rotationY: -4, duration: 2.6, ease: 'power2.inOut' },
      4.6,
    )
    .fromTo(caption('rear'), { autoAlpha: 0, y: 30 }, { autoAlpha: 1, y: 0, duration: 0.8, ease: 'power2.out' }, 6.3)

  callouts('rear').forEach((c, i) => tl.add(calloutIn(c), 6.9 + i * 0.25))
  tl.set(callouts('rear'), { autoAlpha: 1 }, 6.9)

  // ---- Exit: the car drives out to the right, the pin releases ------------------------
  tl.to(callouts('rear'), { autoAlpha: 0, duration: 0.5 }, 8.4)
    .to(caption('rear'), { autoAlpha: 0, y: -24, duration: 0.6, ease: 'power2.in' }, 8.4)
    .to(rail, { autoAlpha: 0, duration: 0.6 }, 9.3)
    .to(car, { ...focus(0.8, 0.45, 1.15, 1.85, 0.58), rotation: 0, rotationY: 0, duration: 1.8, ease: 'power2.in' }, 8.8)
    .to(vignette, { opacity: 0, duration: 1.2 }, 9.4)

  // Progress rail: fill and readout are tied to the whole timeline. The readout
  // only writes to the DOM when the displayed number actually changes.
  const progress = { v: 0 }
  let shown = -1
  tl.to(railFill, { scaleX: 1, duration: 10.6 }, 0).to(
    progress,
    {
      v: 100,
      duration: 10.6,
      onUpdate: () => {
        const n = Math.round(progress.v)
        if (n !== shown && readout) {
          shown = n
          readout.textContent = String(n).padStart(3, '0')
        }
      },
    },
    0,
  )
}

/**
 * Mobile: no pinning. The car keeps normal touch scrolling and is nudged
 * by scroll progress while the hero passes through the viewport.
 */
export function buildCompactScene(root, q) {
  const car = q('[data-car-scroll]')
  const headline = q('[data-headline-wrap]')

  gsap
    .timeline({
      defaults: { ease: 'none' },
      scrollTrigger: { trigger: root, start: 'top top', end: 'bottom top', scrub: 0.5, invalidateOnRefresh: true },
    })
    .to(car, { scale: 1.16, xPercent: -6, rotation: -1.2, transformOrigin: '60% 55%' }, 0)
    .to(headline, { y: -36 }, 0)
}
