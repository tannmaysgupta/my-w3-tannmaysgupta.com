# tannmaysgupta.com

Personal site for [Tannmay S Gupta](https://www.linkedin.com/in/tannmaysgupta/) — Co-Founder & CEO at [Vaatun](https://www.vaatun.com).

A typographic, single-page portfolio inspired by the pacing and color fields of Dropbox's brand site. A randomly selected opening thought leads into six chapters: About, Experience, Work, Education, Writing, and Contact.

## Stack

| | |
|---|---|
| Framework | Next.js 16 (App Router, RSC, typed routes) |
| Runtime | React 19, TypeScript 5.9 |
| Styling | Tailwind CSS v4, custom editorial layouts in `portfolio.css` |
| Motion | CSS entrance, hover, and scroll animations; no animation library |
| Analytics | Vercel Web Analytics via `@vercel/analytics/next` |
| Content | Typed TS in `lib/content/`, MDX essays via `next-mdx-remote/rsc` |
| Tooling | Biome, lefthook, vitest, pnpm |

The site is **fully static** — no API routes, no database, no secrets, no server dependencies.

## Commands

```bash
pnpm dev      # http://localhost:3000
pnpm build    # production build
pnpm typecheck # generate Next.js route types and check TypeScript
pnpm lint     # biome
pnpm format   # biome --write
pnpm test     # vitest
```

## Notable decisions

**An opening thought, not a waiting room.** The full opening grid draws in, the navigation and supporting text appear, then the quotation types in character by character. The grid finishes in 1.3 seconds; typing begins at 1.9 seconds. Quotes stay on screen until the visitor scrolls or chooses another; there is no blocking loader or forced reading timer. Six sourced quotations live in `lib/content/opening-quotes.ts`. Selection happens after hydration, and optional session storage prevents immediate repeats. Screen readers receive the complete quotation, and reduced-motion preferences skip the animation.

**Six colors, one person.** Forest, plum, blue, purple, moss, and sage distinguish the chapters. A central ampersand connects product, design, and insurance without introducing a logo. The color atlas links to native page anchors; scrolling is never intercepted.

**Progressive motion.** The homepage uses CSS geometry and typography, with no WebGL or animation runtime. Scroll animations enhance supporting browsers; reduced-motion preferences show the final composition immediately. Career disclosures use native `details`, and the index uses a native modal `dialog` for focus containment and Escape support.

**Book in place.** Contact includes Cal.com's official React widget for `tannmaysgupta/vaatun-product-sales`. It loads as the visitor approaches the calendar, opens to current availability instead of a hardcoded month, and always offers a direct link as a fallback. The CSP permits the official embed script and frame domains. No booking data passes through this site's server.

**A small identity.** The favicon uses cream TSG lettering outlined from Satoshi Black on the site's forest green. `app/icon.svg` is the scalable icon, `app/favicon.ico` includes 16, 32, and 48 pixel browser fallbacks, and `app/apple-icon.png` is the 180 pixel touch icon. Next.js adds the icon metadata automatically.

**Page views in production.** The root layout mounts Vercel Web Analytics in production builds, covering the homepage, writing, and résumé routes with Next.js navigation tracking. Local development does not load the analytics script. Production scripts and collection routes use the site's own origin, which the existing CSP allows. No custom events or booking-form data are sent by this integration.

**No PII.** `/resume` and the printed PDF deliberately omit home address, date of birth and phone number. Those belong on a PDF handed to an employer, not on a public page that search engines index and cannot be made to forget.

**The PDF is the page.** `/resume` has a print stylesheet and a "Save as PDF" button calling `window.print()`. There is no checked-in PDF to drift out of date, and no Playwright dependency to generate one.

## Content

Content and presentation:

- [lib/content/](lib/content/) — profile, experience, projects, education, certifications
- [content/writing/](content/writing/) — MDX essays (frontmatter: `title`, `description`, `date`, `tags`, `draft`)
- [components/portfolio/](components/portfolio/) — homepage composition, opening, and navigation
- [portfolio.css](portfolio.css) — palette, layout, responsive rules, and motion

Posts with `draft: true` are visible in development and hidden from production builds.

## Deployment

Vercel, with `www.tannmaysgupta.com` as the primary domain. DNS is managed at Porkbun.

Enable **Web Analytics** in the Vercel project's Analytics settings, then deploy the updated production branch. Visit the live site and navigate between pages to generate page views, then check the Analytics dashboard. Vercel provisions the analytics endpoints during deployment; a local production server alone cannot verify ingestion into that dashboard.
