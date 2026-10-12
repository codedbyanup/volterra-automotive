import { gsap, ScrollTrigger } from './gsap'

// Debounced ScrollTrigger.refresh() for when late-loading assets (fonts, images)
// could have moved things. Many calls inside 150 ms collapse into one refresh.
let call
export function refreshSoon() {
  call?.kill()
  call = gsap.delayedCall(0.15, () => ScrollTrigger.refresh())
}
