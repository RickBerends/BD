# AVG (GDPR) check — berendsduiven.nl

Een controle van wat de site nu doet met bezoekersgegevens, en wat er nog moet
gebeuren zodra Cloudflare en het eigen domein volledig live gaan. Geschreven na een
scan van de hele codebase (juli 2026) — geen aannames, alleen wat er echt in de code
en configuratie staat.

## Korte conclusie

De site is op dit moment **laag risico**: geen tracking, geen cookies (op één
functioneel voorkeurs-item na), geen eigen server die bezoekersgegevens opslaat, en
het contactformulier stuurt gewoon een e-mail vanaf het eigen apparaat van de
bezoeker. Er is precies **één echte lacune**: er staat nergens een
privacyverklaring, terwijl er wel een contactformulier is en er straks (via
Cloudflare/GitHub Pages) IP-adressen van bezoekers verwerkt worden. Dat is met één
pagina op te lossen — zie hieronder.

## Wat er nu gebeurt met bezoekersdata

- **Geen analytics, geen trackingscripts, geen cookies.** Doorzocht op
  Google Analytics, Plausible, GoatCounter, Facebook Pixel en vergelijkbare
  scripts — niets aanwezig op bezoeker-pagina's. `document.cookie` wordt nergens in
  de code gebruikt.
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

## De ene echte actie: een privacyverklaring-pagina

Maak een korte pagina (bijvoorbeeld `/privacy`) met:

- **Wie is verantwoordelijk** — Henk Berends, met het al bestaande contactadres.
- **Welke gegevens er verwerkt worden** — wat iemand zelf invult in het
  contactformulier (gaat direct als e-mail, niet opgeslagen op de site), en de
  IP-/verzoeklogs die Cloudflare en GitHub Pages standaard bijhouden.
- **Geen cookies, geen tracking** — alleen de functionele
  `localStorage`-voorkeuren, die niet gedeeld worden en nooit de browser verlaten.
- **Bewaartermijn** — logs bij Cloudflare/GitHub vervallen volgens hun eigen
  standaardtermijnen; er wordt verder niets bewaard.
- **Rechten van bezoekers** — inzage, correctie of verwijdering aanvragen kan via
  hetzelfde contactadres dat al op de site staat.

Zet een link naar deze pagina in de footer, naast Contact. Dit is de enige
concrete bouwstap uit deze check — niet in dit document zelf gebouwd, wel hier als
actiepunt genoteerd.

## Checklist: als Cloudflare + eigen domein volledig live gaan

- [ ] Proxying ("oranje wolk") staat aan zoals gepland — bevestig dat er geen
      Cloudflare Web Analytics of extra cookies zijn aangezet die niet in dit
      document staan.
- [ ] SSL/TLS-modus staat op **Full** (al zo gedocumenteerd in
      `context/cloudflare-setup.md`).
- [ ] De privacyverklaring (hierboven) noemt Cloudflare en GitHub Pages als
      verwerkers.

## Checklist: als er ooit analytics bijkomt (roadmap §C4)

- [ ] Kies een **cookievrije** optie (Cloudflare Web Analytics, GoatCounter, of
      Plausible zonder cookies) — dat is al de intentie in
      `context/roadmap.md`/`context/cloudflare-setup.md`, puur om geen
      cookiebanner nodig te hebben (past bij de rustige uitstraling voor de
      doelgroep).
- [ ] Werk de privacyverklaring bij zodra dit gebeurt, met welke tool en dat het
      cookievrij/geaggregeerd is.

## Als er ooit een derde persoon in tekst of foto's voorkomt

Mocht iemand buiten de directe familie (bijvoorbeeld een andere liefhebber) willen
dat een naam of foto aangepast of verwijderd wordt: dat kan gewoon via het
bestaande contactadres — er hoeft geen apart mechanisme voor gebouwd te worden.
