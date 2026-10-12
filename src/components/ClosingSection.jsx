import { useLayoutEffect, useRef } from 'react'
import { ArrowUp } from 'lucide-react'
import { gsap } from '../lib/gsap'
import { goTo } from '../lib/scrollTo'

export default function ClosingSection() {
  const root = useRef(null)

  useLayoutEffect(() => {
    const mm = gsap.matchMedia()
    mm.add('(prefers-reduced-motion: no-preference)', () => {
      const q = gsap.utils.selector(root)
      gsap
        .timeline({ scrollTrigger: { trigger: root.current, start: 'top 60%' }, defaults: { ease: 'power3.out' } })
        .from(q('[data-rise]'), { yPercent: 108, duration: 1, stagger: 0.1 })
        .from(q('[data-cta]'), { autoAlpha: 0, y: 20, duration: 0.7 }, '-=0.5')
    })
    return () => mm.revert()
  }, [])

  return (
    <section
      ref={root}
      aria-labelledby="closing-title"
      className="relative overflow-hidden px-gutter pb-[clamp(3rem,6vw,5rem)] pt-[clamp(6rem,13vw,12rem)]"
    >
      <h2
        id="closing-title"
        className="stretch-semi max-w-[13ch] text-[clamp(2.8rem,8.4vw,8.6rem)] font-bold leading-[0.92] tracking-[-0.04em]"
      >
        <span className="block overflow-hidden pb-[0.08em]"><span data-rise className="block">Built to be driven,</span></span>
        <span className="block overflow-hidden pb-[0.08em]"><span data-rise className="block">not displayed.</span></span>
      </h2>

      <div data-cta className="mt-12 flex flex-wrap items-center gap-x-8 gap-y-5 md:mt-16">
        <button
          type="button"
          onClick={() => goTo('technology')}
          className="group flex items-center gap-4 bg-lime px-7 py-4 text-[0.9375rem] font-semibold text-obsidian transition-colors hover:bg-ivory"
        >
          Explore the machine
          <ArrowUp size={18} strokeWidth={2} aria-hidden="true" className="transition-transform duration-300 group-hover:-translate-y-0.5" />
        </button>
        <p className="max-w-[30ch] text-[0.9375rem] leading-snug text-ivory-dim">
          Return to the pinned scene and ride it again from the front axle.
        </p>
      </div>

      <p
        aria-hidden="true"
        className="stretch-wide mt-[clamp(5rem,10vw,9rem)] select-none whitespace-nowrap text-center text-[12.2vw] font-extrabold leading-[0.8] tracking-[0.04em] text-ivory/[0.07]"
      >
        VOLTERRA
      </p>
    </section>
  )
}
