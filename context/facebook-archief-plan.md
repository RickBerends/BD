# Plan: Incorporating the Facebook archive into BerendsDuiven

## Context

`context/roadmap.md` names content acquisition as the site's critical path (Phase A): the `duiven`, `bloedlijnen`, and `media` sections are fully built in code but empty, showing `InOpbouw` placeholders. Rick has now secured a real archive — a Facebook export — that directly supplies this missing content.

**What's in the archive:** 53 dated subfolders (Oct 2022 through the current 2026 season) plus three `_overig` (misc) catch-alls, each holding 0–4 JPEGs and a caption `.txt` (Henk's own Facebook post text, in Dutch). Total: 67 photos (~19MB, mostly already small/compressed), 54 caption files, and one `reactions.txt` (Facebook comments from other named fanciers on a single post). This is four years of Henk's own diary: training logs, race results, equipment/technique notes, individual-bird stories, family history, and sales mentions — exactly the raw material the roadmap's Phase A (photography, duif profiles, bloedlijnen, media captions, missing kennis articles) and Phase H (wedvlucht-verslag template, jaaroverzicht, gallery) are waiting on.

**Decisions made with Rick before writing this plan:**
- Birds without a known ring number get a working slug + a clearly-marked placeholder (`ringnummer: "onbekend – bij Henk navragen"`) rather than blocking on that data — consistent with the site's existing "honest empty state" pattern (`InOpbouw`).
- The one `reactions.txt` (named comments from other fanciers) is used only as anonymized aggregate flavor text ("tientallen felicitaties uit de duivensportgemeenschap"), never with real names attached — privacy, not a structural feature.

**Intended outcome:** `/duiven/`, `/bloedlijnen/`, and `/media/` flip from placeholder to real, populated sections; `kennis` and `prestaties` gain substantial new depth; `verhalen` gets its first wedvlucht-verslag/training entries since the 2015 migration; `/familie` gets a richer Henk sr. story. The site goes from "beautifully built, mostly empty" to "beautifully built, genuinely lived-in."

---

## Content-type → collection mapping

| Facebook material | Target | Notes |
|---|---|---|
| Named/identifiable birds with lineage or results (Oil Sheik, the injured 2024 St. Vincent doffer, the red Barcelona doffer, "Stitch" 's daughter, the 2025/2026 Barcelona pair, the 2023 bred pair from the 1e/3e nat. Dax sire) | **`duiven/`** (new entries) | ~8–10 profiles — matches A2's target exactly. Photos come from the matching dated folder where available. |
| "Jellema x eigen soort" (explicitly named as the main kweeklijn), the incoming "Stitch" line via Jan van Gils, the Giesbeek foundation stock | **`bloedlijnen/`** (new entries) | 2–3 entries — matches A3. |
| Every race mention with a placement (St. Vincent 7e nat. S1a, Pau 12e/19e van 123, Agen 13e/577, Barcelona 44e/208, teletekst x4, 3e/1e nat. Dax, 56e nat. Barcelona 2019, historic Olympiade top-10 x3, 2x auto gewonnen) | **`prestaties/`** (new entries, some `duif`-linked) | 15–20 entries — real depth, and covers the "recent seasons never logged" gap the roadmap flags for 2010–2015. |
| Equipment/technique notes: spoetnik + LED flap light, mouse-proof feeders, heated winter drinker, roof/ventilation (kap) redesign, drone-assisted training, dust removal before marathon season | **`kennis/automatisering.md`** (new — closes the A5 gap) | This single Facebook thread is *exactly* the interview material the roadmap says is missing. |
| Health regimen: allicine/knoflook instead of antibiotics, oil-contamination cleanup protocol, no-cure-mid-season philosophy | **`kennis/gezondheid.md`** (new) | New kennis category. |
| Verduistering (light deprivation) protocol + timing, loft climate/dust management | **`kennis/hok-en-klimaat.md`** (new) | New kennis category. |
| Three feed types (zuiveren/vlieg/opvoeren) with real ingredients (perilla, mariadistel, pinda's, roosvicee ferro, biergist) | **`kennis/voeding.md`** (extend existing) | Closes A6 — the "voerschema" table that never existed, now buildable as a real accessible HTML table. |
| Progressive training-distance program with real dates/locations (25km → Hank communal 200–370km baskets) | **`kennis/africhten.md`** (extend existing) | |
| "Hard werken als trainer" / motivating reluctant nestduiven / the drone experiment | **`kennis/motivatie.md`** (extend existing) | |
| Standout narratives: the 2026 St. Vincent/Bordeaux inkorven-to-thuiskomst weekend; the 2025→2026 Barcelona pair's progress; father's Giesbeek loft, two car wins, what-would-have-been-90th-birthday reflection | **`verhalen/`** (new entries) | ~5–7 curated entries, not a 1:1 dump of all 54 captions — picked for narrative weight. Categories `wedvlucht-verslag`/`training`/`geschiedenis` already exist and fit directly. |
| 2025 season recap post (St. Vincent/Pau/Agen/Barcelona/Bressols results in one post) | **`verhalen/`**, new `jaaroverzicht` category | Small schema extension: add `'jaaroverzicht'` to the `category` enum in `src/content.config.ts`. Realizes roadmap H7 without a new page template — reuses `/verhalen/[slug]`. |
| Father's Giesbeek story, two-car-wins detail | **`fanciers/henk-berends-sr.md`** (extend body) | Enriches an existing entry rather than creating a new one. |
| All 67 photos with real captions | **New `media/` content collection**, replacing the hardcoded 2-image page | Closes A4 and builds H1 (lightbox gallery) in one pass — the current hardcoded page can't scale to real volume. |
| `reactions.txt` | One anonymized aggregate line inside the corresponding verhaal/prestatie only | No structural change. |

---

## Implementation approach

### 1. New `media` collection (prerequisite — everything else references its photos)
- Add a `media` collection to `src/content.config.ts`: glob loader, schema `{ caption: string, datum: date, gerelateerdeDuif?: string, gerelateerdeBloedlijn?: string, gerelateerdePrestatie?: string, foto: image() }`.
- Rewrite `src/pages/media/index.astro` to render from the collection instead of two hardcoded imports; add a lightweight lightbox (Astro island, keyboard/touch-friendly per roadmap H1).
- Extend `scripts/compress-images.mjs` (currently a hardcoded 4-file job) into a generic bulk converter, or add a new `scripts/import-facebook-media.mjs`: walks the source folders, converts JPEGs to `.webp` via `sharp` at sane widths/quality, writes into `src/assets/media/<date>-n.webp`. **The raw Facebook export itself is not committed to the repo** — only the curated, compressed derivatives that end up referenced by content files. Skip near-duplicate/low-value shots (e.g. repetitive interior loft photos) during curation rather than importing all 67 indiscriminately.

### 2. `duiven/` — first real profiles
- For each of the ~8–10 identifiable birds, create `src/content/duiven/<working-slug>.md` (e.g. `oil-sheik.md`) using the existing `context/content-template-duif.md` pattern.
- `ringnummer` gets the placeholder convention agreed above until Henk supplies real numbers.
- Link `vader`/`moeder` by slug where the sire/dam is itself identifiable (e.g. the 2023 bred pair) — this is what lights up the automatic `nakomelingen` reverse-lookup and the pedigree component for free.
- Attach `foto` from the matching `media`/`src/assets` photo.

### 3. `bloedlijnen/` — 2–3 entries
- `jellema-eigen-soort.md` (primary line, explicitly named by Henk), plus the Van Gils "Stitch" exchange line and/or the Giesbeek foundation stock, using `context/content-template-bloedlijn.md`. Link member `duiven` via the `bloedlijn` field.

### 4. `prestaties/` — bulk structured results
- One entry per concrete placement found in the captions (`jaar`, `titel`, `niveau`, `volgorde`, `duif` link where the bird is known). Includes both the 2022–2026 season results and the historic Olympiade/auto-win mentions attributable to Henk sr.'s era.

### 5. `kennis/` — one new file, three extended
- New: `automatisering.md` (order 5, per roadmap A5), `gezondheid.md`, `hok-en-klimaat.md`.
- Extend `voeding.md` with the real 3-type feed schedule as an accessible HTML table (closes A6), `africhten.md` with the real progressive-distance program, `motivatie.md` with the training-psychology anecdotes.

### 6. `verhalen/` — curated long-form entries
- ~5–7 entries, each drawing on multiple related dated captions rather than one straight import per folder (e.g. the full 2026 St. Vincent/Bordeaux weekend becomes one `wedvlucht-verslag`, not four thin posts).
- One `jaaroverzicht`-category entry for the 2025 season recap (requires the small enum extension noted above).
- `gerelateerdeDuiven`/`gerelateerdeBloedlijn` filled in wherever the story touches a profiled bird — activates the existing `RelatedEntries` component.

### 7. `fanciers/henk-berends-sr.md` — enrich existing body
- Add the Giesbeek loft, the two car wins, and the reflective framing from the birthday post as new body paragraphs; no schema change needed.

### 8. `veiling/` — light touch, no new infra
- The captions include real "young bird for sale" mentions with contact instructions. Use these to replace the placeholder `/veiling/` copy with real, current context and flip `teKoop: true` on the relevant new `duiven` entries — well short of the roadmap's later Phase E bidding system, just making the existing static page true instead of aspirational.

---

## Files touched (representative, not exhaustive)

- `src/content.config.ts` — add `media` collection, extend `verhalen` category enum
- `src/content/duiven/*.md` (new, ~8–10 files) + matching `src/assets/duiven/*.webp`
- `src/content/bloedlijnen/*.md` (new, 2–3 files)
- `src/content/prestaties/*.md` (new, ~15–20 files)
- `src/content/kennis/automatisering.md`, `gezondheid.md`, `hok-en-klimaat.md` (new); `voeding.md`, `africhten.md`, `motivatie.md` (extended)
- `src/content/verhalen/*.md` (new, ~5–7 files)
- `src/content/fanciers/henk-berends-sr.md` (extended)
- `src/content/media/*.md` (new, one per curated photo/photo-set) + `src/assets/media/*.webp`
- `src/pages/media/index.astro` (rewritten to be collection-driven + lightbox)
- `scripts/import-facebook-media.mjs` (new) or extended `scripts/compress-images.mjs`
- `src/pages/veiling/index.astro` (copy update)

## Verification (for the execution session)

- `npm run build` clean after each collection addition (zod schema catches malformed frontmatter immediately, per the site's existing safety net).
- Click through `/duiven/`, `/duiven/[slug]`, `/bloedlijnen/`, `/bloedlijnen/[slug]`, `/media/`, `/verhalen/`, `/kennis/` at desktop + 390px, light + dark scheme — confirm the `InOpbouw` placeholders are gone and the nav "in wording" dots clear per the existing mechanic.
- Verify pedigree/`nakomelingen` reverse-lookup renders correctly for at least one linked parent/child pair.
- Verify `RelatedEntries` renders on a verhaal/kennis entry that references a real duif.
- Confirm no raw/unprocessed Facebook export files or the `reactions.txt` names ended up committed.
- Standing gut check from the roadmap: would Henk send this link to another duivenliefhebber unprompted?
