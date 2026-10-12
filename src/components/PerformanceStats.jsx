import { STATS } from '../data/content'

// The final value is rendered in the markup (readable without JS). The intro timeline
// resets the number to 0 and counts it up as each stat enters.
export default function PerformanceStats() {
  return (
    <div
      data-stats-wrap
      className="relative z-20 mt-auto px-gutter pb-6 pt-8 md:absolute md:inset-x-0 md:bottom-[5vh] md:mt-0 md:pb-0 md:pt-0"
    >
      <dl className="grid grid-cols-3 border-t border-line md:max-w-[44rem]">
        {STATS.map((stat) => (
          <div
            key={stat.label}
            data-stat
            className="flex flex-col-reverse justify-end gap-2 border-line pr-3 pt-4 md:gap-3 md:pr-6 md:pt-5 [&:not(:first-child)]:border-l [&:not(:first-child)]:pl-4 md:[&:not(:first-child)]:pl-6"
          >
            <dt className="text-[0.8125rem] leading-tight text-ivory-dim md:text-[0.9375rem]">{stat.label}</dt>
            <dd className="stretch-semi flex items-baseline text-[clamp(1.55rem,7vw,2.2rem)] font-bold leading-none tracking-tight tabular-nums md:text-[clamp(2.1rem,3.7vw,3.6rem)]">
              <span data-count data-to={stat.value} data-decimals={stat.decimals}>
                {stat.value.toFixed(stat.decimals)}
              </span>
              <span className="ml-[0.1em] text-[0.5em] font-semibold text-lime">{stat.suffix.trim()}</span>
            </dd>
          </div>
        ))}
      </dl>
      <p data-intro="note" className="mt-3 text-xs text-ivory-dim md:mt-4">
        Concept figures for a fictional brand. Illustrative, not specifications.
      </p>
    </div>
  )
}
