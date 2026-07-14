# Hoe voeg ik content toe aan de website?

Deze handleiding is voor Henk en Rick. Er is (nog) geen aparte inlogomgeving —
content wordt toegevoegd door kleine tekstbestandjes in de repository te
zetten. Dat klinkt technischer dan het is: het kan volledig via de website van
GitHub, in de browser, zonder installatie.

> Vuistregel: elke duif, elke bloedlijn en elk verhaal is één tekstbestandje.
> Een nieuw bestandje = een nieuw hoofdstuk op de site. Zodra het is opgeslagen,
> bouwt de site zichzelf automatisch opnieuw op (dat duurt een paar minuten).

## Waar staat wat?

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

## Een duif toevoegen — stap voor stap (via github.com)

1. Ga naar de repository op github.com en open de map `src/content/duiven/`.
2. Klik rechtsboven op **Add file → Create new file**.
3. Geef als bestandsnaam het ringnummer, gevolgd door `.md` — bijvoorbeeld
   `nl24-1234567.md`. (Kleine letters, geen spaties.)
4. Plak de inhoud uit `context/content-template-duif.md` en vul de velden in.
5. Scroll naar beneden en klik op **Commit changes**.
6. Klaar. Na een paar minuten staat de duif live in de galerij op `/duiven/`.

### Een foto bij een duif

1. Zet de foto (JPG of PNG, telefoonfoto is prima) in de map `src/assets/`
   via **Add file → Upload files**. Geef hem een duidelijke naam, bijv.
   `nl24-1234567.jpg`.
2. Zet in het duif-bestand bij `foto:` het pad ernaartoe:
   `foto: ../../assets/nl24-1234567.jpg`
3. De website verkleint en optimaliseert de foto automatisch — niets zelf
   bewerken nodig.

### Ouders koppelen (voor de stamboom)

- Vul bij `vader:` en `moeder:` de **bestandsnaam zonder .md** in van die duif.
  Bijvoorbeeld: als de vader in `nl20-7654321.md` staat, schrijf je
  `vader: "nl20-7654321"`.
- Staat de ouder zelf ook als profiel op de site? Dan wordt de link tussen
  ouder en kind, én de lijst met nakomelingen, automatisch gelegd.
- Bestaat de ouder (nog) niet als eigen profiel? Geen probleem — laat vader/
  moeder dan leeg, of voeg die duif later toe.

## Een bloedlijn toevoegen

Zelfde stappen, maar in de map `src/content/bloedlijnen/`, met het sjabloon
`context/content-template-bloedlijn.md`. Koppel een duif aan een bloedlijn door
in het duif-bestand `bloedlijn: "stam-giesbeek"` te zetten (de bestandsnaam van
de bloedlijn, zonder .md).

## Een prestatie aan een duif koppelen

Maak een bestand in `src/content/prestaties/` met o.a. het veld
`duif: "nl24-1234567"` (de bestandsnaam van de duif). De prestatie verschijnt
dan zowel op de erelijst als op het profiel van die duif.

## Bang om iets kapot te maken?

Dat kan bijna niet. Als een bestand een fout bevat (bijvoorbeeld een vergeten
veld), dan **weigert de site simpelweg de nieuwe versie te bouwen** en blijft de
vorige, werkende versie online staan. Je ziet dan een rood kruisje bij de
betreffende wijziging op github.com. Corrigeer het bestand en het komt vanzelf
goed.

## Twijfel je? Vraag het Rick.

Voor de eerste paar duiven is het handig om even samen te zitten. Daarna gaat
het vanzelf.
