# Verwerkingsregister (intern, niet gepubliceerd)

Bijhouden bij elke nieuwe dataverwerking. Één regel toevoegen is genoeg — dit is geen
formeel juridisch document, maar een geheugensteun zodat `src/pages/privacyverklaring/`
niet uit de losse pols wordt bijgewerkt.

| Gegevenscategorie | Bron | Grondslag | Waar opgeslagen | Bewaartermijn | Verwerker (indien extern) |
|---|---|---|---|---|---|
| Naam, e-mail, onderwerp, bericht (contactformulier) | Bezoeker vult formulier in | Gerechtvaardigd belang (contact opnemen) | Nergens — `mailto:`-link, verzending gebeurt door bezoeker zelf vanuit eigen mailbox | N.v.t. (komt nooit op de server) | Geen |
| Familiegegevens (namen, geboortejaren, gezinssituatie, loopbaan) | Zelf aangeleverd door de familie | Toestemming / redactionele publicatie door de familie zelf | Git-repository (`src/content/fanciers/`), gepubliceerd op de site | Onbepaald, op verzoek aan te passen/verwijderen | Geen |
| IP-adres / verbindingsgegevens (bezoekers) | Elke sitebezoeker | Gerechtvaardigd belang (site laten werken) | Bij hostingpartij (GitHub Pages) | Bepaald door hostingpartij, niet door ons | GitHub (Pages hosting) |
| Geaggregeerde bezoekstatistieken (paginaweergaven, referrers, land) | Elke sitebezoeker, via Cloudflare Web Analytics-beacon in `src/layouts/BaseLayout.astro` | Gerechtvaardigd belang (inzicht in bezoek, siteverbetering) | Cloudflare (geen cookies, IP kort verwerkt voor aggregatie, niet herleidbaar naar individu) | Bepaald door Cloudflare, niet door ons | Cloudflare (Web Analytics) |

## Nog toe te voegen zodra live (zie plan GDPR-check)

- **Cloudflare** (zodra domein via Cloudflare geproxyt wordt, roadmap §C5): IP/verbindingsgegevens van elke bezoeker.
- **Resend / Formspree** (roadmap §C3, echte contactformulier-backend): naam, e-mail, bericht — zodra het `mailto`-formulier vervangen wordt door een serverside verzendfunctie.
- **Supabase** (roadmap Fase 3+, veiling/accounts): accountgegevens, biedingen, mogelijk betaalgegevens — losstaande, uitgebreidere privacy-toets nodig voordat dit gebouwd wordt, niet iets om nu alvast te documenteren.
