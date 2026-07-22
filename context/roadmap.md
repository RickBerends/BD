# BerendsDuiven — Master Roadmap (exhaustive, consolidated)

## Context

This document supersedes and consolidates all prior plans (the original build plan and vision brief, both since removed as fully superseded/operationalized). It is the single exhaustive list of everything still to implement, from tomorrow's quick wins to the full end-state vision — a digital heritage platform with the craftsmanship of a Rolex Museum, the presentation of Sotheby's, the knowledge structure of Wikipedia, and the personal feel of one's own digital loft.

**What is already live** (deployed to GitHub Pages from `master`):
Astro site with warm heritage design system (Fraunces/Inter, wood/brass/parchment, dark mode, reduced-motion support); all real content migrated and rewritten (familie, kennis articles, verhalen, prestaties, fanciers); images compressed and optimized; legacy site archived under `legacy-site/` with 301 redirects and a real 404; Pagefind search; working contact form (mailto-based); breadcrumbs; paper-texture dividers, museum-placard photo framing, scroll-reveal, pull-quotes, drop caps; `RelatedEntries` cross-link scaffold; GitHub Actions deploy pipeline; **Decap CMS live at `/admin/`** — Henk and Rick edit all content collections through a Dutch-language form UI (searchable relation pickers instead of typed filenames, drag-and-drop photo upload), publishing directly to `master`; GitHub login proxied through a Cloudflare Worker (`sveltia-cms-auth`); access controlled via repo collaborator permissions, not the OAuth app itself. Cloudflare Web Analytics is live via automatic RUM injection (see Phase C4).

**Phase A (content acquisition) has substantially landed**, via incorporating Henk's Facebook archive (four years of training logs, race results, and bird stories): `/duiven/` (9 profiles), `/bloedlijnen/` (3), `/media/` (27 captioned photos), `kennis`, `verhalen`, and `prestaties` are all real and populated — the placeholder era is over for these sections. What remains from Phase A is a short, genuinely-outstanding tail:

- **A1. Real ring numbers** — every `duiven/*.md` entry currently carries the placeholder `ringnummer: "onbekend – bij Henk navragen"`; ask Henk for the real numbers and fill them in (via `/admin/` or directly).
- **A2. Veiling copy + `teKoop` flip** — the Facebook captions include real "young bird for sale" mentions, but no duif currently has `teKoop: true` and `/veiling/` still shows a permanent "coming soon" placeholder instead of a real catalog teaser. Flip the flag on the relevant birds and swap in real copy.
- **A3. Loft/automation photography** — exterior/interior shots of the automated systems (belts, feeders, camera, timed flap) to illustrate `kennis/automatisering.md` and pair with the H5 hok-tour idea.
- **A4. Archive digitization** — Winning/NPO clippings, trophies, diplomas, and photos of Henk sr., if they still exist.
- **A5. The training article's sequel** — it ends with "volgende keer zal ik verder ingaan"; ask Henk for the follow-up or an epilogue note.
- **A6. Resultaten 2010–2015** — never recovered from the old site; ask if NPO archive records exist, add as `prestatie` entries if so.
- **A7. Wider cast for `/familie`** — mentors, combinatie-era stories, "internationale verspreiding" of the bloodline, as new `fanciers` entries.

**The ordering principle:** content was the critical path and is now largely cleared — Phases B–G are sequenced by dependency and impact, but many items are independent and can be picked à la carte.

## Phase B — Duivenarchief & Bloedlijnen come alive (code; content has landed, can start now)

- **B1. Duif profile page upgrade** (`src/pages/duiven/[slug].astro`): museum-placard layout — framed portrait (reuse `.portrait-frame` from `src/pages/index.astro`), specs as engraved plaque, story as wall text; per-duif prestaties (add `duif`-reference field to `prestaties` schema in `src/content.config.ts`); **automatic nakomelingen** via reverse lookup (query all duiven whose `vader`/`moeder` = this id — the "elke nieuwe duif voegt een hoofdstuk toe" mechanic from the brief, zero manual work).
- **B2. Gallery filters** (`src/pages/duiven/index.astro`): filter by geslacht / kweek-vlieg / bloedlijn / te-koop. Static-friendly: small client-side script or pre-rendered filter routes; photo-card grid replacing text cards.
- **B3. Pedigree view v1** — 3-generation stamboom on each duif profile as pure HTML/CSS grid (no heavy library), built from `vader`/`moeder` references; each ancestor clickable if profiled, plain text if not.
- **B4. Bloedlijn detail pages** (`/bloedlijnen/[slug]`): story of the line + auto-listed member duiven + founding pair pedigree.
- **B5. Interactive stamboom v2** (once ≥15–20 linked birds): zoomable/pannable family tree of the whole stam — the brief's "interactieve stamboom." Evaluate d3-hierarchy vs. hand-rolled SVG; keep it an Astro island so the rest stays static.
- **B6. Prestaties-tijdlijn upgrade**: true vertical timeline component — brass spine, year markers, entries linking to the duif that flew them.
- ~~**B7. "Hoe voeg ik een duif toe"-instructie** for Henk~~ — **Superseded by D1**: `context/hoe-voeg-ik-content-toe.md` now documents the Decap CMS flow as the primary path, with the old GitHub web-editor instructions kept as a documented fallback appendix.

## Phase C — Trust, reach & robustness (code-only; no content dependency; can start now)

- **C1. SEO foundation**: `@astrojs/sitemap`, `robots.txt`, canonical URLs, JSON-LD structured data (Organization, Article for verhalen/kennis, BreadcrumbList — breadcrumbs already exist visually), per-page `og:image` (generate branded social cards at build time with sharp, already a devDependency).
- **C2. RSS feed** for verhalen (`@astrojs/rss`) — the pigeon community follows blogs; cheap and fitting.
- **C3. Real contact form backend**: replace mailto handoff with a serverless submission (Resend per original plan, or a static-friendly service like Formspree since GitHub Pages has no server runtime — decision point; Resend requires moving to Vercel or adding a function host). Include honeypot spam protection.
- ~~**C4. Analytics**~~ — **Decided & shipped: Cloudflare Web Analytics** (free, cookieless, no banner — reuses the Cloudflare account already used for DNS/CDN instead of adding a new vendor). Enabled via Cloudflare's **Automatic RUM injection** (dashboard → Analytics & Logs → Web Analytics), not a hardcoded beacon script — no token lives in the source.
- **C5. Custom domain**: buy domain (user: "deal with later" — slot is here when ready), configure GitHub Pages custom domain + HTTPS, drop the `/BD` base path (`astro.config.mjs` change), keep redirects.
- **C6. Accessibility hardening for the 50–70+ audience**: font-size toggle control (A/A+/A++ persisted in localStorage), full keyboard-nav audit, focus-visible styles, WCAG AA contrast verification in both themes, manual dark-mode toggle (currently system-only).
- **C7. Print stylesheet** — this audience prints articles and pedigrees; clean `@media print` for verhalen, kennis, and (later) duif profiles/pedigrees.
- **C8. Performance & polish**: subset the variable fonts (Latin only), `preload` critical font files, `loading="lazy"` audit, Lighthouse CI budget in the deploy workflow.
- **C9. CI quality gates** in `.github/workflows/deploy.yml`: broken-link checker (lychee), HTML validation, build-fails-on-error for content schema violations (already implicit via zod — surface it clearly for Henk's future edits).
- **C10. Proper favicon set**: replace inline SVG data-URI with real favicon.svg + apple-touch-icon + manifest.
- **C11. Zoeken upgrade**: migrate from Pagefind Default UI to the newer Component UI (build currently prints a deprecation-style notice); Dutch-language result snippets.
- **C12. Gastenboek (guestbook)** — deeply fitting for the older duivensport community's culture; static-friendly via giscus (GitHub Discussions) or a moderated form. Decision point on moderation appetite.

## Phase D — Content management & platform maturity

- ~~**D1. CMS decision & migration**~~ — **Decided & shipped: Decap CMS** (git-based, edits the existing markdown in-place, no data migration, works with GitHub Pages, publishes direct to `master`). Sanity was the original plan but rejected in favor of zero-migration; Keystatic was considered but rejected because its GitHub-auth mode needs a live server route, which GitHub Pages can't host.
- **D2. Hosting decision**: stay on GitHub Pages (free, working) vs. move to Vercel (original plan; unlocks serverless functions for C3/E-phase, preview deploys per PR). Move when the first server-side need actually materializes — likely with the contact form (C3) or veiling (F). Not needed for D1 — Decap's admin is fully static.
- ~~**D3. Image pipeline for Henk**~~ — **Resolved by D1**: Decap's drag-and-drop image widget writes directly into `src/assets/duiven/`/`src/assets/media/`; Astro's existing build-time image optimization handles compression/output, same as hand-authored content.
- ~~**D4. Editorial workflow**~~ — **Rejected, not merely pending.** A PR-preview review step was considered and explicitly declined in favor of direct-to-`master` publishing (matches how content already worked, keeps Henk's flow to a single "Publish" click). Do not re-introduce this without a fresh decision — it would contradict the D1 publish-mode choice.

## Phase E — De Veiling (the brief's Sotheby's pillar; A-content has landed, needs A2's `teKoop` flip + D2)

- **E1. Veiling v1 — catalogus & interesse**: auction listing page per duif (`teKoop: true` birds auto-appear), presented as provenance stories — framed portrait, pedigree, prestaties, "welke toekomst kan deze duif betekenen voor uw hok" — never "product X, prijs Y". Interest registration form (no bidding); Henk follows up personally. Fully static-capable.
- **E2. Veiling v2 — gestructureerd bieden**: timed auctions with bid registry. Supabase (Postgres + realtime, free tier) as transactional layer beside the content layer, per original plan §Fase 3. Explicitly **no integrated payment processing** — bids are commitments settled personally (avoids escrow/compliance for what remain physical handovers). Email notifications on outbid/close via Resend.
- **E3. Auction archive**: past sales as permanent provenance pages — "deze duif ging in 2027 naar een hok in Duitsland" — which feeds the heritage narrative and future buyers' trust.
- **E4. Print/PDF pedigree certificates** for auction birds — generated from the pedigree data, styled like the site; a tangible artifact buyers in this community genuinely value.

## Phase F — Het eigen digitale hok (personalization; brief pillar 4; deferred per user decision)

- **F1. Accounts** (Supabase Auth, magic-link email login — no passwords for the 50–70+ audience).
- **F2. Favorites/collecting**: save duiven, bloedlijnen, verhalen to "mijn hok"; a personal collection page.
- **F3. Volg-notificaties**: follow a bloedlijn or the veiling; email digest when new descendants, results, or auctions appear.
- **F4. Nieuwsbrief**: simple double-opt-in list (Buttondown or Resend broadcasts) — "de geschiedenis gaat verder" as a periodic letter from the loft.

## Phase G — Meertaligheid & reach (brief: international duivensport community)

- **G1. i18n architecture**: Astro's built-in i18n routing (`/en/`, `/de/`, `/fr/` — languages to confirm with Henk); translated UI chrome first.
- **G2. Content translation**: start with the money pages (home, familie, duiven profiles, veiling); kennis/verhalen can stay NL with a notice, translated on demand.
- **G3. hreflang + localized SEO.**

## Phase H — Delight backlog (no dependencies; sprinkle between phases)

- **H1.** Lightbox gallery on `/media` (and duif photo sets) — Astro island, keyboard/touch friendly.
- **H2.** "Duif van de maand" spotlight slot on home, rotating from the archive.
- **H3.** Historische kaart: the Marathon routes (St. Vincent 1000km, Bordeaux…) drawn on a quiet map — distances are the sport's romance.
- **H4.** Weerbericht-vluchtdag verhalen template: structured wedvlucht-verslag format (lossing, weer, aankomsttijden) making future race reports easy and consistent.
- **H5.** Interactive hok-tour: annotated loft photo with hotspots explaining the automation (pairs with A1 photos + the automatisering article).
- **H6.** Sound of the loft: a short ambient audio clip on /familie, opt-in click-to-play — memory-trigger for old fanciers. (Taste-check with Rick/Henk first.)
- **H7.** Jaaroverzicht pages: season recaps combining prestaties + verhalen + photos, replacing what 5.20XX.html never became.
- **H8.** QR-code op de hokkaart: physical cards at the loft linking to duif profiles — bridges the physical visits this community makes to the digital archive.

---

## Explicit decision points (need Rick's call, none blocking Phase A/B/C starts)

| # | Decision | Options (lean) |
|---|---|---|
| 1 | CMS | **Decided: Decap CMS** (git-based, direct-to-`master` publish) |
| 2 | Hosting | Stay GitHub Pages vs. **Vercel when C3/E1 needs functions** |
| 3 | Contact backend | **Formspree now (works on Pages)** vs. Resend (needs functions) |
| 4 | Analytics | **Decided: Cloudflare Web Analytics** (free, cookieless, no new vendor) |
| 5 | Domain name | Which name + when (user: later) |
| 6 | Guestbook | giscus vs. moderated form vs. skip |
| 7 | Talen (Phase G) | EN certain; DE/FR confirm with Henk |

## Suggested execution order (if executed autonomously, top to bottom)

1. **C1, C2, C8, C10, C11** — SEO/RSS/perf/favicon/search: pure code, immediate, invisible-but-compounding. (~1 session)
2. **C6, C7** — accessibility toggle, print styles: highest-fit for the audience. (~1 session)
3. **C9** — CI gates so Henk's future content edits can't break the site. (small)
4. **B1–B4, B6, B7** — build the full duivenarchief experience against the now-real content (9 duiven, 3 bloedlijnen). (~2 sessions)
5. ~~**D1**~~ — done: Decap CMS live, family can enter/edit content directly through `/admin/`.
6. ~~**C4**~~ — done (Cloudflare Web Analytics). **C3** — real contact form backend still open.
7. **A2 (`teKoop` flip + veiling copy)** → then **E1** veiling v1.
8. **B5, E2–E4, F, G, H** as content, needs, and appetite grow.

## Verification (applies per phase)

- Every phase: `npm run build` clean; click-through of affected routes at desktop + 390px mobile; light + dark scheme; `prefers-reduced-motion` check for anything animated.
- B-phase: seed one temp duif/bloedlijn entry (pattern proven earlier with `test-placeholder`), verify gallery/filters/pedigree/nakomelingen reverse-lookup render, remove seed.
- C1: validate JSON-LD with Google Rich Results test; sitemap reachable; lychee link check green in CI.
- C3: send a real test submission end-to-end to `HenkBerends@ziggo.nl`.
- E-phase: full dry-run auction with a test bird before any real listing.
- The standing gut check: would Henk send this link to another duivenliefhebber unprompted?
