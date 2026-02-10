# TrueAdvertize Landing Page

Landing page for TrueAdvertize — we build custom allbound GTM systems for B2B SaaS founders (50-300 customers) who need systematic pipeline generation.

## Project Structure

```
trueadvertize-landing/
├── index.html                          HTML (no inline CSS/JS)
├── css/
│   └── styles.css                      All styles (~2,130 lines)
├── js/
│   └── main.js                         All scripts (~200 lines)
├── assets/
│   ├── logo.png
│   ├── samuel-profile.jpg
│   ├── david-menjura.jpg
│   ├── clay-logo.jpg
│   └── claude-code-logo.png
├── build.js                            Production build script (minify + hash)
├── robots.txt                          Search engine crawl directives
├── sitemap.xml                         XML sitemap for SEO
├── 404.html                            Custom 404 error page
├── package.json                        npm scripts for dev/build
├── IMPROVEMENT_RECOMMENDATIONS.md      19 recommendations across 9 categories
├── TRUEADVERTIZE_SERVICES_BREAKDOWN.md Service catalog (28 services, 9 categories)
└── README.md                           This file
```

## Getting Started

### Run Locally

```bash
npm start
```

Opens a local dev server at `http://localhost:3000` with live reload.

### Build for Production

```bash
npm run build
```

Outputs minified HTML/CSS/JS to the `dist/` folder.

### Preview Production Build

```bash
npm run preview
```

Serves the `dist/` folder at `http://localhost:3001`.

## Improvement Recommendations

See [IMPROVEMENT_RECOMMENDATIONS.md](./IMPROVEMENT_RECOMMENDATIONS.md) for 19 detailed recommendations across:

1. **Performance & Technical** — image optimization, font loading, animation fixes
2. **SEO & Discoverability** — meta tags, JSON-LD, sitemap, robots.txt
3. **Accessibility** — ARIA labels, contrast, reduced motion, keyboard nav
4. **Content & Conversion** — broken CTAs, missing content, LinkedIn insights
5. **Design & UX** — mobile hero, hamburger menu, FAQ accordion, micro-interactions
6. **Code Architecture** — CSS modularization, build pipeline
7. **Analytics & Tracking** — GA4, Microsoft Clarity
8. **Mobile Experience** — touch targets, CTA behavior, bento grid
9. **Security & Best Practices** — link attributes, error handling, legal pages

Each recommendation includes: what to fix, why it matters, priority level, code examples, and agent team setup for implementation.

## Services Breakdown

See [TRUEADVERTIZE_SERVICES_BREAKDOWN.md](./TRUEADVERTIZE_SERVICES_BREAKDOWN.md) for the full catalog of 28 services across 9 categories with gap analysis.
