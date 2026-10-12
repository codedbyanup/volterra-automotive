import { useLayoutEffect, useRef } from 'react'
import { gsap, ScrollTrigger } from '../lib/gsap'
import { CALLOUTS, PHASES } from '../data/content'

/**
 * The same technology story as the pinned scene, as a normal-flow section.
 * Shown on small screens and for people who prefer reduced motion; hidden when the
 * pinned scene is running (it would repeat the same information).
 */
export default function TechnologyList() {
  const root = useRef(null)

  useLayoutEffect(() => {
    const mm = gsap.matchMedia()
    mm.add('(max-width: 767.98px) and (prefers-reduced-motion: no-preference)', () => {
      const items = gsap.utils.toArray('[data-tech-item]', root.current)
      gsap.set(items, { autoAlpha: 0, y: 24 })
      ScrollTrigger.batch(items, {
        start: 'top 90%',
        once: true,
        onEnter: (batch) => gsap.to(batch, { autoAlpha: 1, y: 0, duration: 0.7, stagger: 0.1, ease: 'power2.out' }),
      })
    })
    return () => mm.revert()
  }, [])

  return (
    <section
      ref={root}
      id="technology"
      aria-labelledby="technology-title"
      className="block border-t border-line px-gutter py-16 md:motion-safe:hidden"
    >
      <h2 id="technology-title" data-tech-item className="stretch-semi text-[2.25rem] font-bold leading-none tracking-tight">
        Technology
      </h2>

      {Object.entries(PHASES).map(([key, phase]) => (
        <div key={key} className="mt-10">
          <h3 data-tech-item className="text-[1.375rem] font-semibold">{phase.title}</h3>
          <p data-tech-item className="mt-2 max-w-[34ch] text-ivory-dim">{phase.text}</p>
          <ul className="mt-5 border-t border-line">
            {CALLOUTS.filter((c) => c.phase === key).map((c) => (
              <li key={c.id} data-tech-item className="border-b border-line py-4">
                <p className="font-semibold">{c.title}</p>
                <p className="mt-1 text-[0.9375rem] text-ivory-dim">{c.text}</p>
              </li>
            ))}
          </ul>
        </div>
      ))}
    </section>
  )
}
