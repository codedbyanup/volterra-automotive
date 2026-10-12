import { ScrollTrigger } from './gsap'
import { prefersReducedMotion } from './assets'

/**
 * Navigate to a section by id.
 * "technology" is the pinned car scene: on desktop we land inside the pin where the
 * callouts are visible (55% through it); elsewhere it is a normal section.
 */
export function goTo(id) {
  const behavior = prefersReducedMotion() ? 'auto' : 'smooth'

  if (id === 'technology') {
    const st = ScrollTrigger.getById('stage')
    if (st) {
      window.scrollTo({ top: st.start + (st.end - st.start) * 0.55, behavior })
      return
    }
  }
  if (id === 'top') {
    window.scrollTo({ top: 0, behavior })
    return
  }
  document.getElementById(id)?.scrollIntoView({ behavior, block: 'start' })
}
