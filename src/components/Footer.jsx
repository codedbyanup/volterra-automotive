import { goTo } from '../lib/scrollTo'
import { NAV_LINKS } from '../data/content'

export default function Footer() {
  return (
    <footer className="border-t border-line px-gutter py-10">
      <div className="grid gap-10 md:grid-cols-12">
        <div className="md:col-span-5">
          <p className="stretch-wide text-[0.9375rem] font-extrabold tracking-[0.2em]">VOLTERRA AUTOMOTIVE</p>
          <p className="mt-4 max-w-[34ch] text-[0.9375rem] leading-snug text-ivory-dim">
            Precision engineering. Uncompromising performance. Electric innovation.
          </p>
        </div>

        <nav aria-label="Footer" className="md:col-span-3">
          <ul className="space-y-2">
            {NAV_LINKS.map((link) => (
              <li key={link.id}>
                <a
                  href={`#${link.id}`}
                  onClick={(e) => {
                    e.preventDefault()
                    goTo(link.id)
                  }}
                  className="text-[0.9375rem] text-ivory-dim transition-colors hover:text-ivory"
                >
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>

        <p className="text-[0.8125rem] leading-relaxed text-ivory-dim md:col-span-4">
          Volterra Automotive is a fictional concept brand made for a front-end animation assignment. All figures are
          illustrative and describe no real vehicle.
        </p>
      </div>
      <p className="mt-10 text-[0.8125rem] text-ivory-dim">&copy; 2026 Volterra concept. Built with React, GSAP and Tailwind CSS.</p>
    </footer>
  )
}
