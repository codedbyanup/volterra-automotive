import { useLayoutEffect, useRef } from 'react'
import { gsap } from '../lib/gsap'
import { asset } from '../lib/assets'
import { refreshSoon } from '../lib/refresh'
import { CALLOUTS, PHASES } from '../data/content'
import { buildIntro } from '../animations/heroIntro'
import { buildPinnedScene, buildCompactScene } from '../animations/sceneScroll'
import Hero from './Hero'
import PerformanceStats from './PerformanceStats'
import ScrollCue from './ScrollCue'
import Callout from './Callout'

const CAR_ALT =
  'Low three-quarter view of a black electric hypercar in a dark studio, showing the long bonnet, mesh front intakes and silver multi-spoke wheels.'

function Caption({ name, side }) {
  const phase = PHASES[name]
  return (
    <div
      data-caption={name}
      className={`pointer-events-none absolute top-[14vh] z-20 hidden w-[min(25rem,32vw)] md:motion-safe:block ${
        side === 'left' ? 'left-gutter' : 'right-gutter'
      }`}
    >
      <h2 className="stretch-semi text-[clamp(1.8rem,3.4vw,3.4rem)] font-bold leading-none tracking-tight">
        {phase.title}
      </h2>
      <p className="mt-4 text-[clamp(0.9375rem,1.1vw,1.125rem)] leading-snug text-ivory-dim">{phase.text}</p>
    </div>
  )
}

/**
 * The hero and the scroll scene are one continuous stage: the same car is on screen
 * from the first frame to the moment it drives away, so the scroll animation reads as
 * a camera move rather than a slideshow.
 *
 * Layers (each animated by exactly one timeline so transforms never collide):
 *   [data-car-intro]  -> page-load entrance        (heroIntro.js)
 *   [data-car-scroll] -> scrubbed scroll movement  (sceneScroll.js)
 */
export default function ScrollCarScene() {
  const root = useRef(null)

  useLayoutEffect(() => {
    const q = gsap.utils.selector(root)
    const mm = gsap.matchMedia()

    mm.add(
      {
        full: '(min-width: 768px) and (prefers-reduced-motion: no-preference)',
        compact: '(max-width: 767.98px) and (prefers-reduced-motion: no-preference)',
      },
      (context) => {
        const { full } = context.conditions
        const restoreStats = buildIntro(q, { compact: !full })
        if (full) buildPinnedScene(root.current, q)
        else buildCompactScene(root.current, q)
        return restoreStats
      },
    )

    // Reverts every tween and ScrollTrigger created above (also on hot reload / StrictMode).
    return () => mm.revert()
  }, [])

  return (
    <section ref={root} aria-label="Volterra Automotive hero" className="relative">
      <div
        data-stage-pin
        className="relative flex min-h-svh flex-col overflow-hidden bg-obsidian md:block md:h-svh md:min-h-[640px]"
      >
        {/* Backdrop: hairline grid + a vignette that closes in as the car pushes forward. */}
        <div data-intro="backdrop" aria-hidden="true" className="pointer-events-none absolute inset-0 z-0">
          <div className="absolute inset-y-0 left-gutter w-px bg-line opacity-60" />
          <div className="absolute inset-y-0 right-gutter w-px bg-line opacity-60" />
          <div
            data-vignette
            className="absolute inset-0 opacity-0"
            style={{ background: 'radial-gradient(ellipse at 52% 58%, transparent 38%, rgb(6 6 7 / 0.92) 100%)' }}
          />
        </div>

        <Hero />

        <div
          data-car-intro
          className="car-box relative z-10 -ml-[10vw] mt-2 w-[120vw] md:absolute md:inset-x-0 md:bottom-[-1.5vh] md:mx-auto md:mt-0 md:w-[min(88vw,128vh)]"
        >
          <div data-car-scroll className="relative">
            <img
              src={asset('images/car-hero-1024.webp')}
              srcSet={`${asset('images/car-hero-1024.webp')} 1024w, ${asset('images/car-hero-2048.webp')} 2048w`}
              sizes="(min-width: 768px) 88vw, 120vw"
              width="2048"
              height="1366"
              alt={CAR_ALT}
              fetchPriority="high"
              decoding="async"
              draggable={false}
              onLoad={refreshSoon}
              className="h-auto w-full select-none"
            />
            {/* Desktop-only callouts, positioned in % of the photo so they travel with it. */}
            <div className="hidden md:motion-safe:block" aria-hidden="true">
              {CALLOUTS.map(({ id, phase, ...callout }) => (
                <Callout key={id} data-phase={phase} {...callout} />
              ))}
            </div>
          </div>
        </div>

        <PerformanceStats />
        <ScrollCue />

        <Caption name="front" side="left" />
        <Caption name="rear" side="right" />

        {/* Progress rail (desktop scene only). */}
        <div
          data-rail
          aria-hidden="true"
          className="pointer-events-none absolute inset-x-gutter bottom-[4.5vh] z-20 hidden items-center gap-5 md:motion-safe:flex"
        >
          <span className="text-[0.8125rem] font-medium text-ivory">Technology</span>
          <span className="relative block h-px flex-1 bg-line">
            <span data-rail-fill className="absolute inset-0 block bg-lime" />
          </span>
          <span data-rail-readout className="w-9 text-right text-[0.8125rem] tabular-nums text-ivory-dim">
            000
          </span>
        </div>
      </div>
    </section>
  )
}
