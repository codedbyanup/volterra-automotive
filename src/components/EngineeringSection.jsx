import { useLayoutEffect, useRef } from 'react'
import { gsap, ScrollTrigger } from '../lib/gsap'
import { asset } from '../lib/assets'
import { refreshSoon } from '../lib/refresh'
import { HIGHLIGHTS } from '../data/content'

function Line({ children }) {
  // The wrapper clips; the inner span rises into view.
  return (
    <span className="block overflow-hidden pb-[0.08em]">
      <span data-rise className="block">{children}</span>
    </span>
  )
}

export default function EngineeringSection() {
  const root = useRef(null)

  useLayoutEffect(() => {
    const mm = gsap.matchMedia()
    mm.add('(prefers-reduced-motion: no-preference)', () => {
      const q = gsap.utils.selector(root)
      const figure = q('[data-wipe]')[0]

      // Heading lines rise once, when the section comes into view.
      gsap.from(q('[data-rise]'), {
        yPercent: 108,
        duration: 1,
        ease: 'power3.out',
        stagger: 0.1,
        scrollTrigger: { trigger: root.current, start: 'top 65%' },
      })

      // The photo wipes in from the left like the car arriving, then pans slowly inside its frame.
      gsap.fromTo(
        figure,
        { clipPath: 'inset(0% 100% 0% 0%)' },
        {
          clipPath: 'inset(0% 0% 0% 0%)',
          ease: 'none',
          scrollTrigger: { trigger: figure, start: 'top 88%', end: 'top 35%', scrub: 0.6 },
        },
      )
      gsap.fromTo(
        q('[data-pan]'),
        { xPercent: -7, scale: 1.14 },
        {
          xPercent: 0,
          scale: 1.02,
          ease: 'none',
          scrollTrigger: { trigger: figure, start: 'top bottom', end: 'bottom top', scrub: 0.6 },
        },
      )

      const items = q('[data-highlight]')
      gsap.set(items, { autoAlpha: 0, y: 28 })
      ScrollTrigger.batch(items, {
        start: 'top 90%',
        once: true,
        onEnter: (batch) => gsap.to(batch, { autoAlpha: 1, y: 0, duration: 0.8, stagger: 0.12, ease: 'power2.out' }),
      })
    })
    return () => mm.revert()
  }, [])

  return (
    <section
      ref={root}
      id="performance"
      aria-labelledby="performance-title"
      className="relative px-gutter py-[clamp(5rem,11vw,10rem)]"
    >
      <div className="flex items-baseline justify-between border-t border-line pt-4 text-[0.9375rem] text-ivory-dim">
        <span className="font-medium text-ivory">Performance</span>
        <span>Concept specification</span>
      </div>

      <h2
        id="performance-title"
        className="stretch-semi mt-10 max-w-[16ch] text-[clamp(2.6rem,7.4vw,7.6rem)] font-bold leading-[0.94] tracking-[-0.035em] md:mt-14"
      >
        <Line>Power that arrives</Line>
        <Line>before you ask.</Line>
      </h2>

      <figure
        data-wipe
        className="relative -mx-gutter mt-12 aspect-[4/3] overflow-hidden md:mt-20 md:aspect-[2.1/1]"
      >
        <img
          data-pan
          src={asset('images/perf-strip.webp')}
          width="1434"
          height="683"
          loading="lazy"
          decoding="async"
          onLoad={refreshSoon}
          alt="Close view of the front wheel, brake caliper and flank of a black electric hypercar in a dark studio."
          className="h-full w-full select-none object-cover object-[34%_50%]"
        />
      </figure>

      <dl className="mt-12 grid gap-10 border-t border-line pt-8 md:mt-16 md:grid-cols-3 md:gap-12">
        {HIGHLIGHTS.map((item) => (
          <div key={item.unit} data-highlight className="flex flex-col-reverse justify-end gap-4">
            <dd className="max-w-[34ch] text-[1.0625rem] leading-snug text-ivory-dim">{item.text}</dd>
            <dt className="stretch-semi flex items-baseline gap-2 text-[clamp(3.25rem,6vw,5.5rem)] font-bold leading-none tracking-[-0.03em] tabular-nums">
              {item.figure}
              <span className="text-[0.38em] font-semibold tracking-normal text-lime">{item.unit}</span>
            </dt>
          </div>
        ))}
      </dl>
      <p className="mt-10 text-xs text-ivory-dim">Concept values for a fictional brand.</p>
    </section>
  )
}
