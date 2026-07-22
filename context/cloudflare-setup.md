# Cloudflare instellen voor het eigen domein

Bewaar dit tot je achter een computer zit — via de mobiele Cloudflare-app kan
een deel hiervan ook, maar DNS/nameserver-wijzigingen gaan het prettigst op
een groot scherm.

## Waarom Cloudflare

De site draait nu op GitHub Pages onder `https://rickberends.github.io/BD/`.
Zodra er een eigen domein is (bijvoorbeeld `berendsduiven.nl`), regelt
Cloudflare drie dingen gratis:

- **DNS-beheer** — welk adres hoort bij het domein.
- **HTTPS/SSL** — een geldig slotje, automatisch vernieuwd.
- **CDN + bescherming** — snellere laadtijden wereldwijd en een laag
  bescherming tegen misbruik, zonder dat GitHub Pages dat zelf hoeft te doen.

GitHub Pages ondersteunt eigen domeinen ook zonder Cloudflare, maar Cloudflare
geeft meer controle (caching, redirects, statistieken) en is de aanpak die in
`context/roadmap.md` (§C5) als volgende stap staat.

## Wat je nodig hebt

- Een geregistreerd domein (bijvoorbeeld via TransIP, Vimexx of Namecheap) —
  dit is de enige stap die geld kost, ergens rond de €10&ndash;15 per jaar.
- Een gratis Cloudflare-account.
- Toegang tot de GitHub-repository `RickBerends/BD` (heb je al).

## Stap 1 — Domein registreren (indien nog niet gedaan)

Registreer het gewenste domein bij een willekeurige registrar. Nog niets
verder instellen — dat gebeurt via Cloudflare.

## Stap 2 — Cloudflare-account en site toevoegen

1. Ga naar [dash.cloudflare.com](https://dash.cloudflare.com) en maak een
   gratis account aan (of log in).
2. Klik op **Add a domain** / **Site toevoegen** en vul het geregistreerde
   domein in.
3. Kies het **Free**-plan.
4. Cloudflare scant de bestaande DNS-records bij de huidige registrar en
   toont een overzicht. Controleer dit, maar de records voor GitHub Pages
   worden hierna handmatig toegevoegd (stap 4).

## Stap 3 — Nameservers wijzigen bij de registrar

Cloudflare toont twee nameservers, bijvoorbeeld:

```
aisha.ns.cloudflare.com
walt.ns.cloudflare.com
```

1. Log in bij de registrar waar het domein geregistreerd is.
2. Zoek de instelling **Nameservers** (soms onder "DNS-instellingen" of
   "Domeinbeheer").
3. Vervang de bestaande nameservers door de twee die Cloudflare gaf.
4. Opslaan. Dit kan enkele uren tot 24 uur duren om overal door te werken —
   Cloudflare stuurt een e-mail zodra het domein actief is.

## Stap 4 — DNS-records instellen voor GitHub Pages

Zodra Cloudflare het domein actief meldt, ga naar **DNS** in het
Cloudflare-dashboard en voeg toe:

Voor het kale domein (`berendsduiven.nl`) — vier A-records naar de vaste
GitHub Pages-IP-adressen:

| Type | Naam | Waarde | Proxy |
|---|---|---|---|
| A | @ | 185.199.108.153 | Aan (oranje wolk) |
| A | @ | 185.199.109.153 | Aan |
| A | @ | 185.199.110.153 | Aan |
| A | @ | 185.199.111.153 | Aan |

Voor de `www`-versie (optioneel, aanbevolen):

| Type | Naam | Waarde | Proxy |
|---|---|---|---|
| CNAME | www | rickberends.github.io | Aan |

De oranje wolk ("Proxied") aan laten staan geeft de Cloudflare-voordelen
(CDN, bescherming); grijs ("DNS only") stuurt verkeer direct naar GitHub
zonder Cloudflare ertussen.

## Stap 5 — SSL/TLS-modus instellen

1. Ga naar **SSL/TLS** in het Cloudflare-dashboard.
2. Kies modus **Full** (niet "Flexible" — dat geeft redirect-loops in
   combinatie met GitHub Pages' eigen HTTPS-afdwinging).
3. Onder **Edge Certificates**: zet **Always Use HTTPS** aan.

## Stap 6 — Domein koppelen in GitHub Pages

1. Ga naar de repository-instellingen: `Settings → Pages`.
2. Vul bij **Custom domain** het domein in (bijvoorbeeld `berendsduiven.nl`).
3. GitHub controleert de DNS (kan een paar minuten duren) en maakt automatisch
   een `CNAME`-bestand aan in de root van de gepubliceerde site.
4. Zodra het vinkje **Enforce HTTPS** beschikbaar is, zet die aan.

## Stap 7 — Code aanpassen: base-pad verwijderen (al gedaan)

De site draaide eerst met `base: '/BD'` in `astro.config.mjs`, omdat GitHub
Pages zonder eigen domein de site op een subpad serveert
(`rickberends.github.io/BD/`). Deze stap is inmiddels al doorgevoerd: `site`
staat op `https://berendsduiven.nl`, `base` op `/`, en het `CNAME`-bestand
staat in de repo. Ook de losse verwijzingen in `public/site.webmanifest` en
`public/admin/config.yml` zijn meegenomen. Alleen de Cloudflare-kant
hieronder (stappen 1&ndash;5) en het instellen van het domein bij GitHub Pages
(stap 6) moeten dus nog gebeuren.

## Stap 8 — Controleren

- Bezoek `https://berendsduiven.nl` — moet de site tonen met geldig slotje.
- Bezoek `https://www.berendsduiven.nl` (als ingesteld) — moet ook werken of
  doorverwijzen naar het kale domein.
- Controleer in Cloudflare onder **SSL/TLS → Edge Certificates** dat het
  certificaat actief is (kan tot ~15 minuten duren na het instellen).
- Test een paar interne links om te controleren dat er geen dubbele
  `/BD/BD/`-paden ontstaan (zou wijzen op een gemiste stap 7).

## Later, optioneel

- **Page Rules / Cache Rules**: agressievere caching instellen voor
  `/_astro/*` (de gehashte, onveranderlijke build-assets) — versnelt
  herhaalbezoeken.
- **Web Analytics**: Cloudflare heeft gratis, cookieloze analytics — geen
  cookiebanner nodig, inmiddels ook al gedaan (zie roadmap §C4).
- **E-mailadres op het domein** (bijvoorbeeld `info@berendsduiven.nl`) kan
  via Cloudflare Email Routing, gratis, zonder eigen mailserver.
