# BerendsDuiven — van 2015-archief naar digitaal erfgoedplatform (2026)

## Context

BerendsDuiven is een volledig statische website uit ±2015 (25 kale HTML-bestanden, 6 bijna-identieke CSS-varianten, geen JS, geen build tooling, geen CMS) voor Henk Berends, een marathon-postduivenliefhebber uit Tilburg. `context/briefing.md` beschrijft de gewenste toekomst: geen "duivenwebsite" maar een **digitaal erfgoedplatform** voor de familie Berends — met de uitstraling van een Rolex Museum (vakmanschap, traditie), de presentatie van een Sotheby's veilinghuis (elke duif een stuk levende historie), de kennisstructuur van Wikipedia (Familie → Stam → Duif → Nakomelingen → Prestaties) en het persoonlijke gevoel van een eigen digitaal hok. Doelgroep: ervaren duivenliefhebbers van 50-70+, die rust, leesbaarheid, en vertrouwen belangrijker vinden dan spektakel.

**Wat de codebase-analyse opleverde (bepalend voor scope):**
- Slechts een handvol pagina's bevat echte, waardevolle inhoud: `index.html` (uitgebreid familieverhaal), de hele `4.x Systeem`-sectie (Koppelen, Africhten, Voeding, Motivatie — substantiële vakkennis over africhten/koppelen/voeding/motivatie), en twee artikelen (`6.1.Start.html`, `6.2.Training.html`).
- De meerderheid van de pagina's zijn nooit ingevulde placeholders: `2.Historie.html` ("geschiedenis"), alle zes `5.20XX.html`-jaarpagina's ("--"), `9.Verkoop.html` ("--"), `4.6.Automatisering.html` ("Work on road"), en de duiven-tabellen (`3.2.Doffers.html`, `3.4.Vliegduiven.html`) met verzonnen "Pietje duif"-dummydata.
- `10.VoorbeeldDuif.html` is een niet-gekoppeld sjabloon (Ringnummer/Naam/Kleur/Geslacht/Stamboom) dat exact aangeeft welke velden een individueel duivenprofiel nodig heeft — bruikbaar als basis voor het CMS-schema.
- Kapotte links: `3.3.Duivinnen.html`, `3.1.Duiven.html`–`3.11.Duiven.html`, `4.1.Systeem.html` (typo) bestaan niet. Contactformulier is ongeldige HTML met een vergeten placeholder-adres (`jouwemail@adres.nl`) naast het echte adres (`HenkBerends@ziggo.nl`). Afbeeldingen zijn extreem zwaar (HB1.png 8,4MB, image1/2.png ~3MB elk) en er is een bestandsnaam-hoofdlettergevoeligheid-bug (`Duifieduif.png` vs `duifieduif.png`).
- **Conclusie:** dit is geen migratie maar een greenfield bouw. De briefing's volledige visie (veiling, stambomen, meertaligheid, persoonlijke profielen) is het einddoel, niet de launch-scope — er is simpelweg nog te weinig data (duiven, prestaties) om functies als een stamboomvisualisatie nu al zinvol te vullen.

**Beslissingen die de scope vastleggen (met de gebruiker afgestemd):**
- De Veiling is een **echte toekomstige functie**, gebouwd als latere fase — het contentmodel wordt er nu al klaar voor gemaakt (een duif kan als "te koop" gemarkeerd worden), maar bied/betaallogica komt pas als er concrete verkoopbehoefte is.
- Techstack moet **budgetvriendelijk** zijn. Astro + Sanity + Vercel blijven op deze schaal (persoonlijke/kleinschalige archiefsite) ruim binnen de gratis tiers van alle drie diensten — verwacht **€0/maand** bij launch, met kosten die pas ontstaan bij een substantiële groei in verkeer/content (zie §1).
- Persoonlijke accounts/favorieten en meertaligheid worden **architecturaal voorbereid maar niet gebouwd** in v1 — latere fase, geen herbouw nodig.

---

## 1. Techstack

| Onderdeel | Keuze | Waarom / kosten |
|---|---|---|
| Frontend | **Astro** | Standaard geen JavaScript → snelste mogelijke laadtijd en beste SEO voor een contentsite. Open source, geen licentiekosten. Interactieve onderdelen (zoekfunctie, later stamboom/favorieten) worden losse "eilanden", de rest blijft statisch. |
| CMS | **Sanity.io** | Gratis tier (100k API-requests/maand, 3 gebruikers) is ruim voldoende voor deze schaal en blijft dat nog jaren. Henk kan zelf duiven/verhalen toevoegen zonder code. `reference`-velden modelleren precies de Familie→Stam→Duif→Nakomelingen-structuur die de briefing wil. Sterke, gratis afbeeldingsverwerking (compressie/crop) — direct een oplossing voor de huidige 8MB-fotobestanden. |
| Hosting | **Vercel** (Hobby-tier, gratis) | Naadloze Astro-integratie, preview-links per wijziging (handig als Henk feedback geeft), automatische rebuild via Sanity-webhook. Alleen betaald bij commercieel gebruik op schaal — niet aan de orde hier. |
| Zoekfunctie | **Pagefind** | Bouwt een statische zoekindex, geen aparte server/kosten nodig. |
| Contactformulier | **Astro API-route + Resend** (gratis tot 3.000 e-mails/maand) | Vervangt het kapotte mailto-formulier door een echte, betrouwbare verzendfunctie naar `HenkBerends@ziggo.nl`. |
| Analytics | **Plausible of Vercel Analytics** | Cookievrij — voorkomt een cookiebanner die niet past bij de rustige, vertrouwde uitstraling die de doelgroep (50-70+) nodig heeft. Kleine maandelijkse kosten (~€9) indien Plausible gekozen wordt; Vercel Analytics is gratis in de Hobby-tier. |
| Later (Fase 3+) | **Supabase** (Postgres + Auth, gratis tier) | Pas toevoegen zodra de veiling/accounts daadwerkelijk gebouwd worden. Sanity blijft de "waarheid" voor archiefcontent; Supabase houdt transactionele data (biedingen, accounts) — schone scheiding, geen herbouw van de contentlaag nodig. |

**Verwachte kosten:** €0/maand bij launch (alles binnen gratis tiers), enkel een domeinnaam (~€10-15/jaar) als kostenpost. Dit past ruim binnen "budgetvriendelijk."

---

## 2. Informatiearchitectuur (oud → nieuw)

| Oude pagina('s) | Nieuwe route | Toelichting |
|---|---|---|
| `index.html` | `/` (Home) | Herschreven als "toegangspoort" i.p.v. "Welkom" — kernverhaal, sfeerbeeld, belangrijkste momenten, huidige generatie. |
| `index.html` (bio), `2.Historie.html` (leeg) | `/familie` | Digitaal familieboek: oorsprong, grondlegger (vader Henk Berends sr., "H.J. Berends en Zoon"), generaties, huidige generatie (Henk jr.). Volledige biografie migreert hierheen. |
| `4.Systeem.html` + `4.2–4.5` (echte inhoud) | `/kennis` (of `/filosofie`) met subpagina's Koppelen/Africhten/Voeding/Motivatie | De vakkennis is te waardevol om te laten vervallen — wordt een "kennisbank/aanpak"-sectie die past bij de Wikipedia-achtige structuur uit de briefing, losgekoppeld van technische "systeem"-taal. |
| `3.Duiven.html`, `3.2.Doffers.html`, `3.4.Vliegduiven.html` (dummy tabellen) | `/duiven` + `/duiven/[slug]` | Eén filterbare galerij (op geslacht/categorie) vanuit het CMS, in plaats van drie losse pagina's met verzonnen data — lost het kapotte-linkprobleem structureel op. |
| *(nieuw, uit briefing)* | `/bloedlijnen` | v1: uitleg + "in opbouw"-status; groeit zodra er ≥3-5 duiven met ouder-referenties zijn ingevoerd. |
| `9.Verkoop.html` (leeg) | `/veiling` | Wordt de premium "De Veiling"-pagina uit de briefing. v1: verhaal + interesse-registratie (geen bieden); v2: echte biedmodule (Fase 3). |
| *(nieuw, uit briefing)* | `/generaties-van-morgen` | v1: huidige jonge/kweekduiven indien aanwezig, anders eerlijke "in opbouw"-tekst. |
| `6.Artikelen.html`, `6.1.Start.html`, `6.2.Training.html` | `/verhalen` + `/verhalen/[slug]` | Beide artikelen migreren volledig als "Verhaal"-items. |
| `5.Resultaten.html`, `5.2010–2015.html` (alle "--") | *(niet gemigreerd als pagina's)* → **Erelijst/Prestaties-tijdlijn op `/familie`** | Lege jaarpagina's worden vervangen door een groeibare "Prestatie"-inhoudstype, gevuld met de echte hoogtepunten uit de bio (Olympiade-top-10, WHZB beste duivin, Marathon Noord). |
| `7.Media.html` | `/media` | Bestaande 2 foto's (na compressie) blijven als starter; onderschriften later aan te vullen door Henk. |
| `8.Contact.html` | `/contact` | Eén geldig formulier → serverless endpoint, bug opgelost. |
| `10.VoorbeeldDuif.html` | *(niet meer als publieke pagina)* | Velden hergebruikt als basis voor het `Duif`-CMS-schema (zie §3). |

301-redirects van oude naar nieuwe URL's + een echte 404-pagina (bestond niet) worden ingericht bij livegang.

---

## 3. Contentmodel (Sanity schema's)

Operationaliseert de Familie→Stam→Duif→Nakomelingen→Prestaties-keten uit de briefing:

- **`fancier`** (Liefhebber) — naam, slagnaam (bv. "H.E.Th. Berends"), periode/generatie, foto, bio, rol (grondlegger/huidige generatie).
- **`duif`** (Duif) — ringnummer, naam, geslacht, kleur, geboortejaar, foto, `vader`/`moeder` (referentie naar `duif`), `eigenaar` (referentie naar `fancier`), verhaal/betekenis, `prestaties` (referenties), `bloedlijn` (referentie), status (in bezit/verkocht), `teKoop` (boolean — koppelt aan de veiling in Fase 3). **Nakomelingen** worden niet handmatig ingevoerd maar automatisch afgeleid via een omgekeerde zoekopdracht (wie verwijst er naar mij als ouder) — dit is precies het "elke nieuwe duif voegt een hoofdstuk toe"-effect uit de briefing, zonder extra werk.
- **`bloedlijn`** (Stam) — naam, oorsprong, beschrijving (waarom deze combinatie, welke eigenschappen worden doorgegeven).
- **`prestatie`** (Resultaat) — jaar, wedvlucht, positie, niveau, referentie naar `duif`.
- **`verhaal`** (Artikel/Kennisbank) — titel, auteur, datum, categorie (geschiedenis/training/wedvlucht-verslag), inhoud, gerelateerde duiven/bloedlijn.
- **`veiling`** *(schema nu al klaarzetten, functionaliteit in Fase 3)* — duif-referentie, verhaal, status.
- **`siteSettings`** — hero-inhoud homepage, contactgegevens, SEO-standaardwaarden.

---

## 4. Visuele richting

- **Kleuren:** warm donkerbruin/notenhout (primair), crème/perkament-achtergrond, gedempt messing/goud voor accenten en CTA's — vervangt het huidige hemelsblauw volledig.
- **Typografie:** een warme serif voor koppen (bv. Fraunces/Playfair Display — vakmanschap/erfgoedgevoel) gecombineerd met een rustige sans-serif voor lopende tekst (bv. Inter). Basis-lettergrootte 18-20px, ruime regelafstand — direct antwoord op de briefing's eis van "grote leesbare elementen" voor de 50-70+ doelgroep.
- **Beeldtaal:** warme kleurtoon op historische foto's, consistente portretkadrering, papiertextuur alleen als sectiescheiding (nooit achter leestekst, voor leesbaarheid).
- **Beweging:** rustige fade/scroll-animaties (150-300ms), respecteert "verminderde beweging"-instellingen. Geen parallax of opzichtige effecten.
- **Componenten:** rustige sticky navigatie met beeldmerk; duivenprofielkaart (foto, ringnummer+naam, kenmerken, verhaal-uittreksel, link naar bloedlijn); eenvoudige 3-generatie stamboomweergave (geen zware library totdat er genoeg echte data is); verticale tijdlijn voor "belangrijkste momenten" (goede match met de bestaande historische hoogtepunten); veilingkaart die het verhaal/de foto vooropstelt, bod ondergeschikt — nooit "Product X, prijs Y."

---

## 5. Contentmigratie: wat gaat live, wat wordt klaargezet, wat vervalt

**Gaat volledig live (bestaande, echte inhoud):**
- Familieverhaal/biografie (`index.html`) → `/familie` + verkorte versie op `/`.
- Prestatie-hoogtepunten uit de bio (Olympiade, WHZB, Marathon Noord) → nieuwe Prestaties-tijdlijn.
- Systeem-filosofie + Koppelen/Africhten/Voeding/Motivatie (`4.x`) → `/kennis`-sectie, volledig herschreven in de nieuwe toon.
- Beide artikelen (`6.1.Start.html`, `6.2.Training.html`) → `/verhalen`. *(Let op: `6.2.Training.html` eindigt met "de volgende keer zal ik verder ingaan" — vervolgstuk navragen bij Henk.)*
- Contactformulier → `/contact`, technisch volledig opnieuw gebouwd.

**Klaargezet maar leeg/minimaal bij launch (structuur staat, "in opbouw"):**
- `/duiven` — CMS-collectie live, eerste profielen worden na launch samen met Henk ingevoerd.
- `/bloedlijnen` — uitlegpagina tot er genoeg gekoppelde duiven zijn.
- `/generaties-van-morgen` — placeholder tenzij er nu al jonge kweekduiven te tonen zijn.
- `/media` — bestaande 2 foto's (gecomprimeerd), onderschriften later.

**Vervalt (geen waarde, niet meegenomen):**
- `2.Historie.html`, `3.Duiven.html`-tabellen, alle `5.20XX.html`, `9.Verkoop.html` (placeholder-inhoud).
- `10.VoorbeeldDuif.html` en `duifieduif.png` — sjabloon is verwerkt in het CMS-schema, pagina zelf vervalt.
- Alle kapotte links (`3.3.Duivinnen`, `3.1–3.11.Duiven`, `4.1.Systeem`) verdwijnen vanzelf doordat de onderliggende structuur (losse hardcoded subpagina's) niet wordt overgenomen.

---

## 6. Gefaseerd bouwplan

**Fase 0 — Fundament**
Astro-project + Sanity Studio opzetten, schema's definiëren, Vercel-hosting/domein/preview-deploys inrichten, ontwerptokens en basislayout (nav/footer) bouwen, **alle afbeeldingen comprimeren** (HB1.png 8,4MB → target <300KB via WebP), oude-URL→nieuwe-URL redirects + 404-pagina, oude site archiveren in een `legacy-site/`-map i.p.v. verwijderen.

**Fase 1 — Kernsite + echte content live**
Home, Familie, Kennis, Verhalen, Media, Contact bouwen + placeholder-pagina's voor Duiven/Bloedlijnen/Veiling/Generaties; alle echte content migreren (§5); Prestaties-tijdlijn; Pagefind-zoekfunctie; alle bugs oplossen (§7); mobiel-responsive en toegankelijkheid (bestond niet); **livegang, oude statische site vervangen.**

**Fase 2 — Duivenarchief & Bloedlijnen (na launch, doorlopend)**
`/duiven`-galerij + profielsjabloon met stamboom/prestaties-koppelingen bouwen; korte instructie ("hoe voeg ik een duif toe in Sanity") voor Henk; samen de eerste 5-10 echte duivenprofielen invoeren; eerste stamboomweergave zodra er genoeg gekoppelde data is.

**Fase 3 — Veilingmodule**
Supabase toevoegen naast Sanity (transactionele laag). Aanbevolen: **geen** geïntegreerde betaalverwerking (Stripe e.d.) voor wat waarschijnlijk fysieke overdrachten/bankoverschrijvingen blijven — een gestructureerd bied-/interesseregistratiesysteem dat Henk handmatig afrondt, om escrow-/compliance-complexiteit te vermijden totdat er echt volume is.

**Fase 4 — Persoonlijke accounts / meertaligheid**
Supabase Auth voor het "eigen digitaal hok"-gevoel (favoriete duiven/bloedlijnen/verhalen opslaan). Meertaligheid via Sanity's i18n-plugin + Astro's ingebouwde i18n-routing — talen (bv. Engels/Duits/Frans gezien de grensoverschrijdende duivensportgemeenschap) af te stemmen met Henk vóór start.

---

## 7. Concrete bugfixes (verwerkt in Fase 0/1, niet apart te plannen)

1. **Kapotte link `3.3.Duivinnen.html`** — structureel opgelost: hardcoded subpagina's vervangen door één filterbare `/duiven`-galerij.
2. **Contactformulier** (ongeldige geneste `<form>`-tags, placeholder-adres `jouwemail@adres.nl`) — volledig herbouwd als één geldig formulier naar `HenkBerends@ziggo.nl` via serverless endpoint.
3. **`duifieduif.png`/`Duifieduif.png` hoofdletterbug** — vervalt vanzelf: alle duivenfoto's lopen straks via Sanity's eigen asset-pipeline met gegenereerde URL's.
4. Overige kapotte links (`3.1–3.11.Duiven.html`, `4.1.Systeem.html`-typo) — vervallen samen met de oude hardcoded structuur.

---

## Openstaande vragen voor Henk (te bespreken vóór/tijdens Fase 1, niet blokkerend voor start)

- Is er meer historisch materiaal (foto's, verhalen) beschikbaar via een gesprek met Henk, om `/familie` verder te verrijken dan wat nu op `index.html` staat?
- Context/onderschriften voor de twee foto's op de Media-pagina?
- Gewenste talen voor de latere meertalige fase?

---

## Volgende stap (bij goedkeuring van dit plan)

1. Dit plan opslaan als `context/website-rebuild-plan.md` in de repository.
2. Fase 0 starten: Astro + Sanity + Vercel project opzetten.

## Verificatie

- Na Fase 1: site lokaal draaien (`astro dev`), elke nieuwe pagina doorlopen op mobiel + desktop, contactformulier daadwerkelijk een test-e-mail laten versturen, Lighthouse-score (performance/SEO/toegankelijkheid) controleren, alle oude URL's testen op correcte doorverwijzing.
- Voor livegang: eindcontrole door Henk op alle gemigreerde tekst (met name de familiegeschiedenis en vakkennis-artikelen) op juistheid.
