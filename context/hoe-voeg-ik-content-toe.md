# Hoe voeg ik content toe aan de website?

Deze handleiding is voor Henk en Rick. Content toevoegen of aanpassen gaat via
een eigen beheerpagina — geen bestandjes, geen code, gewoon een formulier
invullen.

## Inloggen

1. Ga naar **https://berendsduiven.nl/admin/**.
2. Klik op **Login with GitHub** en meld je aan met je eigen GitHub-account
   (de eerste keer moet je de app even goedkeuren — dat hoeft daarna niet
   meer).
3. Je ziet nu een menu met alle onderdelen van de site: Duiven, Bloedlijnen,
   Verhalen, Kennisbank, Prestaties, Familie en Foto's.

> Alleen accounts die als "collaborator" op de repository staan (Henk en
> Rick) kunnen daadwerkelijk iets opslaan. Inloggen met een ander account kan
> geen schade aanrichten.

## Iets toevoegen of aanpassen

1. Kies links het onderdeel waar je iets wilt toevoegen (bijvoorbeeld
   **Duiven**) en klik op **New Duif** — of open een bestaand item om het aan
   te passen.
2. Vul de velden in. Bij elk veld staat een korte toelichting als dat nodig
   is.
3. Verwijzingen naar andere duiven, bloedlijnen of foto's (bijvoorbeeld
   "Vader", "Moeder" of "Bloedlijn") zijn een zoekveld: begin te typen en kies
   uit de lijst — je hoeft geen bestandsnamen te onthouden.
4. Een foto toevoegen: sleep de foto in het foto-veld, of klik erop om een
   bestand te kiezen. De site verkleint en optimaliseert de foto automatisch.
5. Klik rechtsboven op **Publish** (of **Save** om een concept te bewaren
   zonder te publiceren).
6. Klaar. Na een paar minuten staat de wijziging live op de site (de site
   bouwt zichzelf automatisch opnieuw op).

### Ouders koppelen (voor de stamboom)

- Vul bij "Vader" en "Moeder" de betreffende duif in via het zoekveld.
- Staat de ouder zelf ook als profiel op de site? Dan wordt de link tussen
  ouder en kind, én de lijst met nakomelingen, automatisch gelegd.
- Bestaat de ouder (nog) niet als eigen profiel? Geen probleem — laat het
  veld dan leeg, of voeg die duif later toe.

## Bang om iets kapot te maken?

Dat kan bijna niet. De velden worden gecontroleerd voordat iets gepubliceerd
wordt. Mocht er toch iets misgaan bij het bouwen van de site, dan blijft de
vorige, werkende versie gewoon online staan.

## Twijfel je? Vraag het Rick.

Voor de eerste paar keer is het handig om er samen bij te zitten. Daarna gaat
het vanzelf.

---

## Noodmethode (als de beheerpagina er even niet is)

Mocht de beheerpagina niet bereikbaar zijn, dan kan content ook nog steeds
rechtstreeks via bestandjes in de repository worden toegevoegd, net als
vroeger. Dat kan volledig via de website van GitHub, in de browser, zonder
installatie.

> Vuistregel: elke duif, elke bloedlijn en elk verhaal is één tekstbestandje.
> Een nieuw bestandje = een nieuw hoofdstuk op de site.

### Waar staat wat?

| Wat je wilt toevoegen | Map in de repository |
|---|---|
| Een duif | `src/content/duiven/` |
| Een bloedlijn/stam | `src/content/bloedlijnen/` |
| Een verhaal/artikel | `src/content/verhalen/` |
| Een prestatie (erelijst) | `src/content/prestaties/` |
| Een liefhebber (familie) | `src/content/fanciers/` |

De sjablonen met uitleg per veld staan klaar:
- `context/content-template-duif.md`
- `context/content-template-bloedlijn.md`

### Een duif toevoegen — stap voor stap (via github.com)

1. Ga naar de repository op github.com en open de map `src/content/duiven/`.
2. Klik rechtsboven op **Add file → Create new file**.
3. Geef als bestandsnaam het ringnummer, gevolgd door `.md` — bijvoorbeeld
   `nl24-1234567.md`. (Kleine letters, geen spaties.)
4. Plak de inhoud uit `context/content-template-duif.md` en vul de velden in.
5. Scroll naar beneden en klik op **Commit changes**.
6. Klaar. Na een paar minuten staat de duif live in de galerij op `/duiven/`.

#### Een foto bij een duif

1. Zet de foto (JPG of PNG, telefoonfoto is prima) in de map `src/assets/`
   via **Add file → Upload files**. Geef hem een duidelijke naam, bijv.
   `nl24-1234567.jpg`.
2. Zet in het duif-bestand bij `foto:` het pad ernaartoe:
   `foto: ../../assets/nl24-1234567.jpg`
3. De website verkleint en optimaliseert de foto automatisch — niets zelf
   bewerken nodig.

### Een bloedlijn toevoegen

Zelfde stappen, maar in de map `src/content/bloedlijnen/`, met het sjabloon
`context/content-template-bloedlijn.md`. Koppel een duif aan een bloedlijn
door in het duif-bestand `bloedlijn: "stam-giesbeek"` te zetten (de
bestandsnaam van de bloedlijn, zonder .md).

### Een prestatie aan een duif koppelen

Maak een bestand in `src/content/prestaties/` met o.a. het veld
`duif: "nl24-1234567"` (de bestandsnaam van de duif). De prestatie verschijnt
dan zowel op de erelijst als op het profiel van die duif.
