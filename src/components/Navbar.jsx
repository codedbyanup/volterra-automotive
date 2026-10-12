import { useEffect, useRef, useState } from 'react'
import { Menu, X } from 'lucide-react'
import { gsap } from '../lib/gsap'
import { prefersReducedMotion } from '../lib/assets'
import { goTo } from '../lib/scrollTo'
import { NAV_LINKS } from '../data/content'

const MENU_LINKS = [...NAV_LINKS, { label: 'Explore the machine', id: 'explore' }]

export default function Navbar() {
  const [open, setOpen] = useState(false)
  const panel = useRef(null)
  const button = useRef(null)
  const wasOpen = useRef(false)

  // Open / close animation for the full-screen menu (user-triggered motion).
  useEffect(() => {
    const el = panel.current
    if (!el) return
    const links = el.querySelectorAll('[data-menu-link]')
    const reduce = prefersReducedMotion()

    if (open) {
      wasOpen.current = true
      el.style.visibility = 'visible'
      if (reduce) {
        gsap.set(el, { clipPath: 'inset(0% 0% 0% 0%)' })
        gsap.set(links, { yPercent: 0, opacity: 1 })
      } else {
        gsap.fromTo(el, { clipPath: 'inset(0% 0% 100% 0%)' }, { clipPath: 'inset(0% 0% 0% 0%)', duration: 0.7, ease: 'power3.inOut' })
        gsap.fromTo(
          links,
          { yPercent: 110, opacity: 0 },
          { yPercent: 0, opacity: 1, duration: 0.8, ease: 'power3.out', stagger: 0.07, delay: 0.3 },
        )
      }
      links[0]?.focus({ preventScroll: true })
    } else if (wasOpen.current) {
      const hide = () => {
        el.style.visibility = 'hidden'
      }
      if (reduce) {
        gsap.set(el, { clipPath: 'inset(0% 0% 100% 0%)' })
        hide()
      } else {
        gsap.to(el, { clipPath: 'inset(0% 0% 100% 0%)', duration: 0.55, ease: 'power3.inOut', onComplete: hide })
      }
      button.current?.focus({ preventScroll: true })
    }
  }, [open])

  // While the menu is open: Escape closes it, Tab stays inside it, and the page behind it
  // does not scroll (the wheel / touch listeners must be non-passive to preventDefault).
  useEffect(() => {
    if (!open) return undefined
    const el = panel.current
    const stop = (e) => e.preventDefault()
    const onKey = (e) => {
      if (e.key === 'Escape') setOpen(false)
      if (e.key !== 'Tab') return
      const focusable = [...el.querySelectorAll('a, button')].concat(button.current)
      const first = focusable[0]
      const last = focusable[focusable.length - 1]
      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault()
        last.focus()
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault()
        first.focus()
      }
    }
    el.addEventListener('wheel', stop, { passive: false })
    el.addEventListener('touchmove', stop, { passive: false })
    document.addEventListener('keydown', onKey)
    return () => {
      el.removeEventListener('wheel', stop)
      el.removeEventListener('touchmove', stop)
      document.removeEventListener('keydown', onKey)
    }
  }, [open])

  const go = (id) => (e) => {
    e.preventDefault()
    setOpen(false)
    goTo(id === 'explore' ? 'technology' : id)
  }

  return (
    <>
      <header
        data-intro="nav"
        className="fixed inset-x-0 top-0 z-[70] bg-gradient-to-b from-obsidian from-35% via-obsidian/75 to-transparent px-gutter pb-8 pt-5"
      >
        <nav aria-label="Primary" className="flex items-center justify-between gap-6">
          <a
            href="#top"
            onClick={go('top')}
            className="stretch-wide text-[0.9375rem] font-extrabold tracking-[0.2em] text-ivory"
          >
            VOLTERRA
          </a>

          <ul className="hidden items-center gap-10 md:flex">
            {NAV_LINKS.map((link) => (
              <li key={link.id}>
                <a
                  href={`#${link.id}`}
                  onClick={go(link.id)}
                  className="group relative py-2 text-[0.75rem] font-medium uppercase tracking-[0.2em] text-ivory-dim transition-colors hover:text-ivory"
                >
                  {link.label}
                  <span className="absolute inset-x-0 bottom-0 h-px origin-left scale-x-0 bg-lime transition-transform duration-300 group-hover:scale-x-100 group-focus-visible:scale-x-100" />
                </a>
              </li>
            ))}
          </ul>

          <button
            ref={button}
            type="button"
            aria-expanded={open}
            aria-controls="site-menu"
            onClick={() => setOpen((v) => !v)}
            className="flex items-center gap-3 border border-lime px-4 py-2.5 text-[0.75rem] font-semibold uppercase tracking-[0.2em] text-lime transition-colors hover:bg-lime hover:text-obsidian"
          >
            {open ? 'Close' : 'Explore'}
            {open ? <X size={16} strokeWidth={1.75} aria-hidden="true" /> : <Menu size={16} strokeWidth={1.75} aria-hidden="true" />}
          </button>
        </nav>
      </header>

      <div
        ref={panel}
        id="site-menu"
        role="dialog"
        aria-modal="true"
        aria-label="Site menu"
        inert={!open}
        style={{ visibility: 'hidden', clipPath: 'inset(0% 0% 100% 0%)' }}
        className="fixed inset-0 z-[60] flex flex-col justify-center bg-obsidian px-gutter"
      >
        <ul className="border-t border-line">
          {MENU_LINKS.map((link) => (
            <li key={link.id} className="overflow-hidden border-b border-line">
              <a
                data-menu-link
                href={`#${link.id === 'explore' ? 'technology' : link.id}`}
                onClick={go(link.id)}
                className="stretch-semi block py-4 text-[clamp(2rem,7vw,5rem)] font-bold leading-none tracking-[-0.03em] text-ivory transition-colors hover:text-lime"
              >
                {link.label}
              </a>
            </li>
          ))}
        </ul>
        <p className="mt-8 text-sm text-ivory-dim">Volterra Automotive. A fictional concept brand.</p>
      </div>
    </>
  )
}
