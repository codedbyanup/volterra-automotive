import { useLayoutEffect, useRef } from 'react'
import { gsap, ScrollTrigger } from '../lib/gsap'
import { asset } from '../lib/assets'
import { refreshSoon } from '../lib/refresh'
import { DESIGN_NOTES } from '../data/content'
import { calloutIn } from '../animations/callouts'
import Callout from './Callout'

const DETAILS = [
  { term: 'Panel gaps', value: 'Under 1 mm' },
  { term: 'Paint', value: 'Seven hand-polished layers' },
  { term: 'Bodywork', value: 'Carbon monocoque shell' },
]

export default function DesignSection() {
  const root = useRef(null)

  useLayoutEffect(() => {
    const mm = gsap.matchMedia()
    mm.add('(prefers-reduced-motion: no-preference)', () => {
      const q = gsap.utils.selector(root)
      const image = q('[data-wipe-up]')[0]

      gsap.from(q('[data-rise]'), {
        yPercent: 108,
        duration: 1,
        ease: 'power3.out',
        stagger: 0.1,
        scrollTrigger: { trigger: root.current, start: 'top 60%' },
      })

      // The photo is revealed bottom-to-top as it scrolls in...
      gsap.fromTo(
        image,
        { clipPath: 'inset(100% 0% 0% 0%)' },
        {
          clipPath: 'inset(0% 0% 0% 0%)',
          ease: 'none',
          scrollTrigger: { trigger: image, start: 'top 90%', end: 'top 40%', scrub: 0.6 },
        },
      )

      // ...then the annotations draw in one after another, once.
      const sequence = gsap.timeline({ paused: true })
      q('[data-callout]').forEach((c, i) => sequence.add(calloutIn(c), i * 0.28))
      ScrollTrigger.create({
        trigger: image,
        start: 'top 45%',
        once: true,
        onEnter: () => sequence.play(),
      })
    })
    return () => mm.revert()
  }, [])

  return (
    <section
      ref={root}
      id="design"
      aria-labelledby="design-title"
      className="relative bg-graphite px-gutter py-[clamp(5rem,11vw,10rem)]"
    >
      <div className="flex items-baseline justify-between border-t border-line pt-4 text-[0.9375rem] text-ivory-dim">
        <span className="font-medium text-ivory">Design</span>
        <span>Craftsmanship</span>
      </div>

      <div className="mt-12 grid gap-14 md:mt-16 md:grid-cols-12 md:gap-x-[clamp(2rem,5vw,5rem)]">
        <figure className="relative md:col-span-7">
          <div data-wipe-up className="overflow-hidden">
            <img
              src={asset('images/design-front.webp')}
              width="1229"
              height="861"
              loading="lazy"
              decoding="async"
              onLoad={refreshSoon}
              alt="Front of a black electric hypercar: louvred bonnet, slim light signature, mesh lower intake and a forged wheel."
              className="h-auto w-full select-none"
            />
          </div>
          <div aria-hidden="true" className="hidden sm:block">
            {DESIGN_NOTES.map(({ id, ...note }) => (
              <Callout key={id} size="design" {...note} />
            ))}
          </div>
          <figcaption className="mt-5 text-[0.9375rem] text-ivory-dim sm:hidden">
            Louvred bonnet, one-piece light signature and a mesh lower intake.
          </figcaption>
        </figure>

        <div className="md:col-span-5 md:pt-6">
          <h2
            id="design-title"
            className="stretch-semi text-[clamp(2.2rem,3.9vw,4.4rem)] font-bold leading-[0.98] tracking-[-0.03em]"
          >
            <span className="block overflow-hidden pb-[0.08em]"><span data-rise className="block">Shaped by wind.</span></span>
            <span className="block overflow-hidden pb-[0.08em]"><span data-rise className="block">Finished by hand.</span></span>
          </h2>
          <p className="mt-6 max-w-[38ch] text-[1.0625rem] leading-relaxed text-ivory-dim md:mt-8">
            Every surface is drawn around the airflow it has to move. Then it is hand-finished, panel by panel, until the
            light runs across the car without a break.
          </p>
          <dl className="mt-10 border-t border-line">
            {DETAILS.map((d) => (
              <div key={d.term} className="flex items-baseline justify-between gap-6 border-b border-line py-4">
                <dt className="text-ivory-dim">{d.term}</dt>
                <dd className="text-right font-medium">{d.value}</dd>
              </div>
            ))}
          </dl>
        </div>
      </div>
    </section>
  )
}
