import { gsap } from '../lib/gsap'

/**
 * Page-load entrance. One timeline, in the order the brief asks for:
 * background + nav -> headline characters -> copy -> stats (counting up) -> car -> scroll cue.
 *
 * It only touches the "intro" layer of each element. The scroll scene animates a
 * different wrapper, so the two never fight over the same transform.
 *
 * Returns a cleanup that restores the real stat numbers if the effect is reverted.
 */
export function buildIntro(q, { compact }) {
  const nav = document.querySelector('[data-intro="nav"]')
  const backdrop = q('[data-intro="backdrop"]')
  const chars = q('[data-char]')
  const copy = q('[data-intro="copy"]')
  const stats = q('[data-stat]')
  const note = q('[data-intro="note"]')
  const counters = q('[data-count]')
  const car = q('[data-car-intro]')
  const cue = q('[data-intro="cue"]')

  const rise = compact ? 14 : 24

  // Hidden start states are applied here (not in CSS) so the page is fully usable
  // if JavaScript animation never runs or motion is reduced.
  gsap.set([nav, backdrop, copy, stats, note, car, cue], { autoAlpha: 0 })
  gsap.set(chars, { yPercent: 105, autoAlpha: 0 })
  gsap.set(nav, { y: -12 })
  gsap.set([copy, stats, note], { y: rise })
  gsap.set(car, { y: compact ? 30 : 56, scale: 0.94 })
  counters.forEach((el) => {
    el.textContent = (0).toFixed(Number(el.dataset.decimals))
  })

  const tl = gsap.timeline({ defaults: { ease: 'power3.out' } })

  tl.to(backdrop, { autoAlpha: 1, duration: 0.6, ease: 'power1.out' }, 0)
    .to(nav, { autoAlpha: 1, y: 0, duration: 0.7 }, 0.1)
    .to(chars, { yPercent: 0, autoAlpha: 1, duration: 0.95, stagger: { each: 0.035 } }, 0.3)
    .to(copy, { autoAlpha: 1, y: 0, duration: 0.8 }, 1.05)
    .to(stats, { autoAlpha: 1, y: 0, duration: 0.7, stagger: 0.14 }, 1.25)
    .to(note, { autoAlpha: 1, y: 0, duration: 0.6 }, 1.75)
    .to(car, { autoAlpha: 1, y: 0, scale: 1, duration: 1.5 }, 1.45)
    .to(cue, { autoAlpha: 1, duration: 0.7, ease: 'power2.out' }, 2.7)

  // Numbers count up as each stat arrives.
  counters.forEach((el, i) => {
    const counter = { v: 0 }
    const decimals = Number(el.dataset.decimals)
    tl.to(
      counter,
      {
        v: Number(el.dataset.to),
        duration: 1.1,
        ease: 'power2.out',
        onUpdate: () => {
          el.textContent = counter.v.toFixed(decimals)
        },
      },
      1.25 + i * 0.14,
    )
  })

  return () => {
    counters.forEach((el) => {
      el.textContent = Number(el.dataset.to).toFixed(Number(el.dataset.decimals))
    })
  }
}
