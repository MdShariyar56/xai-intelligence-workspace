# Xai — Intelligence Workspace

A high-fidelity, single-page interactive product experience built for the RacoAI Frontend Challenge. The experience visually narrates how raw data becomes structured intelligence, actionable insight, and automation — using custom motion, 3D geometry, and scroll-driven interaction.

**Live Demo:** [https://xai-intelligence-workspace-tan.vercel.app/]

**Figma Design:** [https://www.figma.com/design/c9K6VPLAHT9ueCxLN0eOG0/Untitled?node-id=0-1&t=xpmMuBolS6RoTPKz-1]

---

## Overview

Xai — Intelligence Workspace is designed to feel calm, technically confident, and unmistakably "AI product" rather than marketing fluff. The page takes the user through a single narrative arc:

> Raw data → Structured intelligence → Actionable insight → AI automation

Each section on the page represents one stage of that journey, expressed through motion and geometry rather than static illustration.

### Sections

1. **Hero — Data to Intelligence**
   A field of 1,500 particles begins in a chaotic, randomly distributed state (raw data) and morphs into a clean structured grid as the user scrolls, built with Three.js / React Three Fiber. Camera also responds to cursor movement for a subtle parallax effect.

2. **Interactive Insight Flow**
   Three stages — Ingest Data, Analyze with AI, Generate Insight — animate into view on scroll using Framer Motion, connected by a progress line that fills in sync with scroll position.

3. **Intelligence Dashboard Preview**
   A mock product UI with a sidebar, tabbed navigation (Overview / Automations / Reports), stat cards, a live-style line chart (Recharts), and a data table — each tab swaps in fully distinct content with smooth enter/exit transitions.

4. **Signature Interaction — Chaos, Resolved**
   A distorted, organic 3D core (built with React Three Fiber + drei's `MeshDistortMaterial`) gradually resolves into a smooth, structured sphere as the user scrolls, with an accompanying color shift from violet to indigo — the visual metaphor for "chaotic data becoming resolved intelligence."

---

## Tech Stack

| Purpose            | Technology                                  |
|--------------------|----------------------------------------------|
| Framework          | Next.js (App Router)                        |
| UI Library         | React                                        |
| Styling            | Tailwind CSS v4                              |
| UI Motion          | Framer Motion                                |
| 3D Rendering       | Three.js, React Three Fiber, @react-three/drei |
| Charts             | Recharts                                     |
| Icons              | lucide-react                                 |

No backend is used — all dashboard data is static/mock data as permitted by the brief.


## Running Locally

```bash
# 1. Clone the repository
git clone https://github.com/MdShariyar56/xai-intelligence-workspace
cd xai-intelligence-workspace

# 2. Install dependencies
npm install

# 3. Run the development server
npm run dev
```

Then open [http://localhost:3000](http://localhost:3000) in your browser.

---

## Key Animation & Interaction Decisions

- **Scroll progress is tracked via `useRef`, not `useState`**, in the Hero and Signature sections. This avoids re-rendering the React component tree on every scroll event — the 3D scene updates directly inside `useFrame`, which keeps the animation performant at 60fps.
- **`lerp` (linear interpolation)** is used throughout — for particle positions, rotation, scale, and color — instead of hard jumps, so every transformation feels smooth and physically grounded rather than mechanical.
- **Sticky sections** (`position: sticky` with an oversized parent height) are used to give scroll-driven 3D animations enough scroll distance to play out fully before the next section appears.
- **Framer Motion's `layoutId`** powers the tab indicator in the Dashboard Preview, letting the active-tab underline animate between positions with zero manual keyframe coding.
- **Mouse parallax** in both the Hero and Signature sections is intentionally subtle and lerped, so it reads as ambient depth rather than a distracting effect.

A full walkthrough of these decisions is available in the video linked at the top of this README.

---

## Design Philosophy

The goal throughout was restraint over spectacle — motion is used only where it clarifies the product narrative (data becoming structured, insight being generated), never as decoration. Typography, spacing, and dark-mode color choices were kept deliberately calm and professional, in line with the Stripe / Linear / Vercel-level polish referenced in the brief.