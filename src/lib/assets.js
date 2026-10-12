// Resolve a path inside /public so it works under any Vite base (local, GitHub Pages subpath).
export const asset = (path) => `${import.meta.env.BASE_URL}${path.replace(/^\//, '')}`

export const prefersReducedMotion = () =>
  typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches
