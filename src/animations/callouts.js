import { gsap } from '../lib/gsap'

const ORIGIN = { right: '0% 50%', left: '100% 50%', up: '50% 100%', down: '50% 0%' }

/**
 * Build the reveal for one callout: dot pops in, the leader line draws out from the dot,
 * then the label slides a few pixels into place. Returns a paused-friendly timeline
 * that can be dropped into a scrubbed master timeline or played on enter.
 */
export function calloutIn(callout) {
  const dot = callout.querySelector('[data-dot]')
  const line = callout.querySelector('[data-line]')
  const label = callout.querySelector('[data-label]')
  const dir = line.dataset.dir
  const horizontal = dir === 'left' || dir === 'right'
  const shift = { right: { x: -10 }, left: { x: 10 }, up: { y: 10 }, down: { y: -10 } }[dir]

  gsap.set(line, { transformOrigin: ORIGIN[dir] })

  return gsap
    .timeline()
    .fromTo(dot, { scale: 0, autoAlpha: 0 }, { scale: 1, autoAlpha: 1, duration: 0.3, ease: 'power2.out' })
    .fromTo(
      line,
      horizontal ? { scaleX: 0 } : { scaleY: 0 },
      horizontal ? { scaleX: 1, duration: 0.5, ease: 'power2.out' } : { scaleY: 1, duration: 0.5, ease: 'power2.out' },
      0.12,
    )
    .fromTo(label, { autoAlpha: 0, ...shift }, { autoAlpha: 1, x: 0, y: 0, duration: 0.5, ease: 'power2.out' }, 0.38)
}
