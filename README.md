# Volterra Automotive — Cinematic Concept EV Experience

[![Live Demo](https://img.shields.io/badge/Live%20Demo-volterra--automotive.vercel.app-10b981?style=for-the-badge&logo=vercel&logoColor=white)](https://volterra-automotive.vercel.app/)
[![React](https://img.shields.io/badge/React-19-61DAFB?style=for-the-badge&logo=react&logoColor=black)](https://react.dev/)
[![Vite](https://img.shields.io/badge/Vite-8-646CFF?style=for-the-badge&logo=vite&logoColor=white)](https://vitejs.dev/)
[![GSAP](https://img.shields.io/badge/GSAP-3.15-88CE02?style=for-the-badge&logo=greensock&logoColor=white)](https://greensock.com/gsap/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-v4-38B2AC?style=for-the-badge&logo=tailwindcss&logoColor=white)](https://tailwindcss.com/)

A cinematic, interactive landing page for **Volterra Automotive**, a luxury electric concept vehicle brand. Built with React 19, GSAP ScrollTrigger, and Tailwind CSS v4, the project delivers a seamless, scrubbed narrative experience where every chassis camera movement, dynamic statistic, and design callout is tied directly to scroll progress.

🌐 **Experience the Live Application:** [https://volterra-automotive.vercel.app/](https://volterra-automotive.vercel.app/)

---

## ✨ Highlights & Architecture

- **Cinematic Pinned Scroll Sequence**: A single continuous scrubbed `ScrollTrigger` timeline controls camera focus across the vehicle — pushing into the front axle, sweeping across the body contour, and smoothly transitioning toward the exit frame.
- **Adaptive Viewport Orchestration (`gsap.matchMedia`)**: 
  - **Desktop & Tablet:** Full pinning and 3D camera pan simulation with real-time progress indicators and interactive telemetry callouts.
  - **Mobile:** Unpinned native touch scrolling with fluid scroll-offset micro-movements to preserve tactile responsiveness.
  - **Accessibility (Reduced Motion):** Automatically disables pinning and scroll transforms for users with `prefers-reduced-motion: reduce`, presenting clean, static layouts.
- **Independent Animation Layers**: Separate intro timeline (`[data-car-intro]`) and scroll-driven timeline (`[data-car-scroll]`) guarantee that initial entrance states never conflict with scrubbed scroll transformations.
- **Hardware-Accelerated Performance**: All animations operate strictly on GPU-composited properties (`transform: translate3d/scale/rotate`, `opacity`) with geometry cached on refresh cycles (`invalidateOnRefresh`) rather than expensive per-frame recalculations.
- **Curated Dark Aesthetic**: Bespoke obsidian, dark titanium, and high-voltage lime accents paired with self-hosted variable typography (`Archivo`).

---

## 🛠️ Tech Stack

| Layer | Technology | Description |
| :--- | :--- | :--- |
| **Framework** | [React 19](https://react.dev/) | Component architecture & dynamic state hooks |
| **Bundler & Tooling** | [Vite 8](https://vitejs.dev/) | Next-generation frontend build tooling |
| **Animation Engine** | [GSAP 3](https://greensock.com/) + ScrollTrigger | Scrubbed cinematic timelines & scroll pinning |
| **Styling** | [Tailwind CSS v4](https://tailwindcss.com/) | Modern utility-first styling engine |
| **Typography** | `@fontsource-variable/archivo` | High-performance self-hosted variable font |
| **Icons** | [Lucide React](https://lucide.dev/) | Clean, minimalist SVG iconography |
| **Hosting** | [Vercel](https://vercel.com/) | Edge-optimized continuous deployment |

---

## 📂 Project Structure

```bash
volterra-automotive/
├── public/
│   ├── favicon.svg
│   └── images/              # High-density automotive studio photography (WebP)
├── src/
│   ├── animations/
│   │   ├── callouts.js      # Callout fade & coordinate triggers
│   │   ├── heroIntro.js     # Initial hero timeline & stat count-up
│   │   └── sceneScroll.js   # Pinned scrub & mobile scroll timelines
│   ├── components/
│   │   ├── Callout.jsx            # Interactive technical callout markers
│   │   ├── ClosingSection.jsx     # Final explore & call-to-action block
│   │   ├── DesignSection.jsx      # Aerodynamic styling narrative
│   │   ├── EngineeringSection.jsx # Powertrain & chassis breakdown
│   │   ├── Footer.jsx             # Brand footer & social navigation
│   │   ├── Hero.jsx               # Staggered typography & counting metrics
│   │   ├── Navbar.jsx             # Glassmorphism navigation bar
│   │   ├── PerformanceStats.jsx   # Telemetry & specifications strip
│   │   ├── ScrollCarScene.jsx     # Master scroll container & pinned canvas
│   │   ├── ScrollCue.jsx          # Animated scroll progress cue
│   │   └── TechnologyList.jsx     # Mobile-optimized architecture list
│   ├── data/
│   │   └── content.js       # Centralized automotive specs, copy & coordinates
│   ├── lib/
│   │   ├── gsap.js          # Plugin registration & custom defaults
│   │   └── scrollTo.js      # Smooth programmatic jump navigation
│   ├── App.jsx              # Application root & font-metric refresh listener
│   ├── index.css            # Global tokens, color scales & typography rules
│   └── main.jsx             # React DOM entry point
└── vite.config.js           # Vite configuration with Tailwind CSS plugin
```

---

## 🚀 Getting Started

### Prerequisites
- Node.js `18.0` or higher
- npm, pnpm, or yarn

### Installation & Local Development

1. **Clone the repository:**
   ```bash
   git clone https://github.com/codedbyanup/volterra-automotive.git
   cd volterra-automotive
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Start the local development server:**
   ```bash
   npm run dev
   ```
   Open [http://localhost:5173](http://localhost:5173) in your browser.

4. **Create a production build:**
   ```bash
   npm run build
   npm run preview
   ```

---

## 🌐 Deployment

### Vercel (Current Production)
The application is deployed on Vercel with automatic CI/CD integration:
- **Production URL:** [https://volterra-automotive.vercel.app/](https://volterra-automotive.vercel.app/)

### GitHub Pages (Optional)
The project includes a ready-to-use GitHub Actions workflow in `.github/workflows/deploy.yml`. When enabled under **Settings > Pages > GitHub Actions**, every push to `main` will build and publish the application.

---

## 📄 License & Attribution

Designed and engineered as a showcase concept experience. Developed by [@codedbyanup](https://github.com/codedbyanup).
