import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

// Register once, in one place, so hot reloads never double-register.
gsap.registerPlugin(ScrollTrigger)

// Mobile browsers resize the viewport when the URL bar collapses. Ignoring those
// resizes stops the pinned scene from recalculating (and jumping) mid-scroll.
ScrollTrigger.config({ ignoreMobileResize: true })

// Always start a page load at the top so the entrance sequence and the pinned
// scene begin from a known state.
if (typeof window !== 'undefined' && 'scrollRestoration' in window.history) {
  window.history.scrollRestoration = 'manual'
}

export { gsap, ScrollTrigger }
