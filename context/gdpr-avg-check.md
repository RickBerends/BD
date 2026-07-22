# AVG (GDPR) check — berendsduiven.nl

Een controle van wat de site nu doet met bezoekersgegevens, en wat er nog moet
gebeuren zodra Cloudflare en het eigen domein volledig live gaan. Geschreven na een
scan van de hele codebase (juli 2026) — geen aannames, alleen wat er echt in de code
en configuratie staat.

## Korte conclusie

De site is op dit moment **laag risico**: geen tracking, geen cookies (op één
functioneel voorkeurs-item na), geen eigen server die bezoekersgegevens opslaat, en
het contactformulier stuurt gewoon een e-mail vanaf het eigen apparaat van de
bezoeker. De ene lacune die deze check opleverde — geen privacyverklaring, terwijl
er wel een contactformulier is en er straks (via Cloudflare/GitHub Pages)
IP-adressen van bezoekers verwerkt worden — staat inmiddels al live op
`/privacyverklaring/`. Wat resteert zijn twee kleine bijwerk-momenten later: zodra
Cloudflare meedoet en zodra er ooit analytics bijkomt (checklists hieronder).

## Wat er nu gebeurt met bezoekersdata

- **Cloudflare Web Analytics, cookievrij.** Sinds juli 2026 draait Cloudflare Web
  Analytics via Cloudflare's **automatische RUM-injectie** (aan te zetten in het
  Cloudflare-dashboard, geen script/token in de broncode) — gekozen omdat het geen
  cookies plaatst en geen individuele bezoekers volgt, alleen geaggregeerde
  statistiek bijhoudt. `document.cookie` wordt nergens in de code gebruikt.
- **`localStorage`, alleen functioneel.** `src/layouts/BaseLayout.astro` en
  `src/components/Nav.astro` gebruiken twee sleutels — `bd-theme` (licht/donker) en
  `bd-fontsize` (tekstgrootte) — puur om een voorkeur te onthouden in de browser
  van de bezoeker zelf. Er wordt niets naar een server gestuurd, geen
  identificeerbare gegevens, geen tracking. Dit valt onder "strikt noodzakelijke
  functionaliteit" en heeft geen cookiebanner/toestemming nodig.
- **Contactformulier is een mailto-link, geen server.** `src/pages/contact/index.astro`
  bouwt bij versturen een `mailto:`-link met de ingevulde naam/e-mail/bericht en
  opent daarmee het eigen e-mailprogramma van de bezoeker — het formulier stuurt
  niets naar een server die de site beheert. De ingevulde gegevens komen alleen aan
  in Henks eigen mailbox (`HenkBerends@ziggo.nl`), zoals wanneer iemand hem
  rechtstreeks zou mailen.
- **Lettertypen zijn zelf gehost** (`@fontsource-variable/*`, gebundeld tijdens de
  build) — geen aanroep naar Google Fonts, dus geen IP-adres dat naar een
  Amerikaanse CDN gaat via lettertypen (een veelvoorkomend AVG-probleempunt bij
  andere sites).
- **Geen database, geen bezoekersaccounts.** Alle content staat als
  Markdown-bestanden in de git-repository. De enige inlog is de `/admin/`
  CMS-pagina voor Henk en Rick zelf (GitHub-login), niet voor bezoekers, en staat op
  `noindex,nofollow`.

## Waar Cloudflare en GitHub Pages in beeld komen

Zodra het eigen domein en Cloudflare-proxying (zie `context/cloudflare-setup.md`)
volledig live staan, verwerken twee partijen automatisch bezoekersgegevens als
"verwerker": Cloudflare (IP-adres en verzoekgegevens, omdat al het verkeer via hun
netwerk loopt zolang de oranje wolk aanstaat) en GitHub/Microsoft (dezelfde
basale serverlogs die elke webhost bijhoudt). Dit zijn beide standaard
SaaS-verwerkers met een eigen verwerkersovereenkomst die automatisch geldt zodra je
hun dienst gebruikt — daar hoeft niets aparts voor getekend te worden. Het enige wat
nodig is: ze noemen in de privacyverklaring, voor de transparantie.

De GitHub OAuth-Cloudflare-Worker voor de CMS-login (`public/admin/config.yml`,
momenteel nog een niet-gebouwde placeholder-URL) is alleen relevant voor Henk en
Rick als redacteuren, niet voor bezoekers — geen actie nodig hiervoor.

## De ene echte actie: een privacyverklaring-pagina (al gedaan)

Deze stap is inmiddels al doorgevoerd: `src/pages/privacyverklaring/index.astro`
bevat een korte pagina met wie verantwoordelijk is, wat het contactformulier wel/niet
doet, hoe er met gepubliceerde familiegegevens wordt omgegaan, dat er geen
cookies/tracking zijn, wat hosting verwerkt, en hoe bezoekers een inzage-/
correctie-/verwijderverzoek kunnen doen. De footer linkt er al naar toe. Daarnaast
is er een intern (niet-gepubliceerd) `context/privacy-verwerkingsregister.md` dat
per dataverwerking bijhoudt: bron, grondslag, opslaglocatie, bewaartermijn en
eventuele externe verwerker — met alvast plaatsen klaarstaand voor Cloudflare,
analytics, een echte contactformulier-backend en een eventuele veiling/accounts,
zodat die er meteen bij kunnen zodra ze gebouwd worden.

## Checklist: als Cloudflare + eigen domein volledig live gaan

- [ ] Proxying ("oranje wolk") staat aan zoals gepland — bevestig dat er geen
      Cloudflare Web Analytics of extra cookies zijn aangezet die niet in dit
      document staan.
- [ ] SSL/TLS-modus staat op **Full** (al zo gedocumenteerd in
      `context/cloudflare-setup.md`).
- [ ] De privacyverklaring (hierboven) noemt Cloudflare en GitHub Pages als
      verwerkers.

## Checklist: als er ooit analytics bijkomt (roadmap §C4)

- [x] Kies een **cookievrije** optie — gekozen: **Cloudflare Web Analytics**,
      geen cookies, past bij de rustige uitstraling voor de doelgroep en hergebruikt
      het Cloudflare-account dat al voor DNS/CDN gebruikt wordt.
- [x] Werk de privacyverklaring bij zodra dit gebeurt, met welke tool en dat het
      cookievrij/geaggregeerd is — zie `src/pages/privacyverklaring/index.astro`,
      sectie "Cookies en analytics".

## Als er ooit een derde persoon in tekst of foto's voorkomt

Mocht iemand buiten de directe familie (bijvoorbeeld een andere liefhebber) willen
dat een naam of foto aangepast of verwijderd wordt: dat kan gewoon via het
bestaande contactadres — er hoeft geen apart mechanisme voor gebouwd te worden.
