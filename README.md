# Volterra Automotive: scroll-driven landing page

A cinematic, scroll-driven automotive landing page built for a front-end animation assignment.
Volterra Automotive is a **fictional concept brand**. Every figure on the page (98%, 2.8 s, 720 km, 800 V, 0.21 Cd and so on) is an illustrative design value, not a specification of a real vehicle.

The hero headline is **WELCOME ITZ FIZZ**. The same car stays on screen from the first frame to the moment it drives away, and its movement is tied directly to scroll progress.

## What is in the page

- **Hero**: staggered headline, supporting copy, three counting statistics, the car, a scroll cue. The entrance is one GSAP timeline.
- **Pinned scroll scene** (desktop and tablet): a single scrubbed `ScrollTrigger` timeline pushes in on the front axle, pans along the body to the rear, then sends the car out of frame. Callouts, captions and a progress rail respond to scroll. Scrolling up plays it in reverse.
- **Performance**, **Design** and a closing **Explore the machine** section, with restrained reveals.
- **Mobile**: no pinning, so touch scrolling stays natural. The car is nudged by scroll progress while the hero passes, and the technology notes appear as a normal list.
- **Reduced motion**: no pinning, no entrance animation, everything visible and static.

## Tech stack

React 19 + Vite, Tailwind CSS v4, GSAP 3 with ScrollTrigger, Lucide icons (menu and arrow only), Archivo variable font (self-hosted through `@fontsource-variable/archivo`).

## Run locally

```bash
npm install
npm run dev        # http://localhost:5173
```

```bash
npm run build      # production build into dist/
npm run preview    # serve the production build at http://localhost:4173
```

## Deploy to GitHub Pages

The workflow in `.github/workflows/deploy.yml` builds the site with `VITE_BASE=/<repository-name>/` and publishes `dist/`.

1. Create a new GitHub repository and push this project to its `main` branch.
2. In the repository, open **Settings > Pages** and set **Source** to **GitHub Actions**.
3. The **Deploy to GitHub Pages** workflow runs on every push to `main`. When it finishes, the site is at `https://<your-username>.github.io/<repository-name>/`.

Without `VITE_BASE`, the build uses a relative base (`./`), so `dist/` also works on any other static host.

## Project structure

```
src/
  main.jsx, App.jsx, index.css
  components/   Navbar, Hero, PerformanceStats, ScrollCue, ScrollCarScene, Callout,
                TechnologyList, EngineeringSection, DesignSection, ClosingSection, Footer
  animations/   heroIntro.js (load sequence), sceneScroll.js (pinned + mobile scroll scenes),
                callouts.js (callout reveal)
  lib/          gsap.js (plugin setup), scrollTo.js (section navigation), assets.js, refresh.js
  data/         content.js (all copy, stats and callout positions)
public/images/  car-hero-1024.webp, car-hero-2048.webp, perf-strip.webp, design-front.webp
```

### How the scroll scene works

- `ScrollCarScene` wraps everything in `gsap.matchMedia()`, so the pinned version, the mobile version and the reduced-motion version are created and reverted cleanly when the viewport or preference changes. Cleanup also runs on unmount and on hot reload.
- The car has two wrappers: `[data-car-intro]` is moved only by the load sequence, and `[data-car-scroll]` only by the scroll timeline. They never fight over a transform.
- Car positions are computed from the photo's own geometry (`focus()` in `sceneScroll.js`) and re-measured on every ScrollTrigger refresh (`invalidateOnRefresh`), never inside a per-frame callback.
- Only `x`, `y`, `scale`, rotation and opacity are animated while scrolling.

## Assets

The car photograph is the image supplied for this project (1024 x 683). It is dark studio photography, **not a transparent cut-out**, so the page is built around it: the edges are faded into the page background (`car-hero-*.webp`) and the other sections use crops of the same photo.

- `car-hero-2048.webp` and the crops are the original resampled to 2x for smoother scaling. They contain no extra detail. For a sharper result, replace them with a larger original (2400 px wide or more) using the same filenames and the same dark studio background.
- The photo shows a real manufacturer's badge, which does not match the fictional Volterra brand. Check that you have the right to use the image, and consider swapping in a photo that suits the brand before publishing.
- Add a credit for the photograph here if its licence requires one.

## Screenshots

Add your own once the site is live.

| Hero | Pinned scene | Mobile |
| --- | --- | --- |
| _screenshot_ | _screenshot_ | _screenshot_ |
