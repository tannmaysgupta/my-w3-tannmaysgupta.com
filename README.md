# tannmaysgupta.com

Personal site for [Tannmay S Gupta](https://www.linkedin.com/in/tannmaysgupta/) — Co-Founder & CEO at [Vaatun](https://www.vaatun.com).

Resume-led and deliberately simple: an impactful hero, a timeline, and a bento grid that links out to work already published elsewhere.

## Stack

| | |
|---|---|
| Framework | Next.js 16 (App Router, RSC, typed routes) |
| Runtime | React 19, TypeScript 5.9 |
| Styling | Tailwind CSS v4 (CSS-first `@theme`), shadcn/ui, Aceternity |
| Shader | `@paper-design/shaders-react` |
| Content | Typed TS in `lib/content/`, MDX essays via `next-mdx-remote/rsc` |
| Tooling | Biome, lefthook, vitest, pnpm |

The site is **fully static** — no API routes, no database, no secrets, no server dependencies.

## Commands

```bash
pnpm dev      # http://localhost:3000
pnpm build    # production build
pnpm lint     # biome
pnpm format   # biome --write
pnpm test     # vitest
```

## Notable decisions

**No animation library.** Every scroll reveal, the timeline beam and the hero highlight are CSS scroll-driven animations (`animation-timeline: view()`). Dropping `motion` cut homepage JS from 247KB to 160KB gzipped. Where `animation-timeline` is unsupported, or the visitor prefers reduced motion, elements render in their final state — nothing is hidden behind an animation that might not run.

**One WebGL canvas, four fallbacks.** The hero mesh gradient ([shader-backdrop.tsx](components/hero/shader-backdrop.tsx)) is dynamically imported with `ssr: false`, mounts only when in viewport, freezes at `speed={0}` under reduced motion, and is skipped entirely on Save-Data, 2G, or without WebGL. A CSS gradient is always painted underneath, so every one of those paths still looks finished.

**Two Aceternity components were rewritten.** `card-spotlight` pulled in three.js and react-three-fiber (~600KB) for a hover glow — replaced by [spotlight-card.tsx](components/ui/spotlight-card.tsx), which does the visible part with two CSS custom properties. `timeline` and `pointer-highlight` were rebuilt without `motion`, which also let them become server components and fixed a `<div>` nested inside an `<h1>`.

**No PII.** `/resume` and the printed PDF deliberately omit home address, date of birth and phone number. Those belong on a PDF handed to an employer, not on a public page that search engines index and cannot be made to forget.

**The PDF is the page.** `/resume` has a print stylesheet and a "Save as PDF" button calling `window.print()`. There is no checked-in PDF to drift out of date, and no Playwright dependency to generate one.

## Content

Everything editable lives in two places:

- [lib/content/](lib/content/) — profile, experience, projects, education, certifications
- [content/writing/](content/writing/) — MDX essays (frontmatter: `title`, `description`, `date`, `tags`, `draft`)

Posts with `draft: true` are visible in development and hidden from production builds.

## Deployment

Vercel, with `www.tannmaysgupta.com` as the primary domain. DNS is managed at Porkbun.
