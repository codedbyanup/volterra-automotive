// Headline + supporting copy. Layout on md+ is absolute (art-directed composition);
// below md it is a plain stacked flow.

function Word({ text }) {
  return (
    <span className="headline-word">
      {[...text].map((char, i) => (
        <span key={`${char}-${i}`} className="char-mask">
          <span data-char className="inline-block">
            {char}
          </span>
        </span>
      ))}
    </span>
  )
}

export default function Hero() {
  return (
    <>
      <div
        data-headline-wrap
        className="relative z-20 px-gutter pt-28 md:absolute md:inset-x-0 md:top-[13vh] md:pt-0"
      >
        <h1 className="hero-h1 stretch-wide text-[clamp(1.4rem,10vw,2.8rem)] font-extrabold uppercase leading-[1.04] tracking-[0.24em] text-ivory md:text-[clamp(2.4rem,min(6.2vw,10.4vh),7.2rem)] md:leading-[0.98]">
          <span className="sr-only">WELCOME ITZ FIZZ</span>
          <span aria-hidden="true" className="headline-line">
            <Word text="WELCOME" />
          </span>
          <span aria-hidden="true" className="headline-line">
            <Word text="ITZ" />
            <Word text="FIZZ" />
          </span>
        </h1>
      </div>

      <div
        data-copy-wrap
        className="relative z-20 mt-6 px-gutter md:absolute md:right-0 md:top-[17vh] md:mt-0 md:w-[min(24rem,30vw)] md:min-w-[14rem] md:px-0 md:pr-gutter"
      >
        <p
          data-intro="copy"
          className="max-w-[28ch] text-[1.0625rem] leading-snug text-ivory-dim md:max-w-none md:text-[clamp(1rem,1.25vw,1.25rem)]"
        >
          Volterra is a concept electric hypercar. Drawn around the air it moves through, tuned to the millisecond.
        </p>
      </div>
    </>
  )
}
