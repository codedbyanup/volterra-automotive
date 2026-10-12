export default function ScrollCue() {
  return (
    <div
      data-cue-wrap
      className="pointer-events-none absolute bottom-[5vh] right-gutter z-20 hidden md:block"
    >
      <div data-intro="cue" className="flex items-end gap-3">
        <span className="text-[0.6875rem] font-medium uppercase tracking-[0.22em] text-ivory-dim">
          Scroll to explore
        </span>
        <span aria-hidden="true" className="relative block h-12 w-px overflow-hidden bg-line">
          <span className="animate-cue absolute inset-x-0 top-0 block h-5 bg-lime" />
        </span>
      </div>
    </div>
  )
}
