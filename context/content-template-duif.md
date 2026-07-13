# Sjabloon: nieuw duivenprofiel toevoegen

Kopieer het stuk hieronder (tussen de lijnen) naar een nieuw bestand in
`src/content/duiven/`. Gebruik als bestandsnaam het ringnummer of de naam van de
duif, bijvoorbeeld `src/content/duiven/nl24-1234567.md`.

Vul de velden in en verwijder de regels die beginnen met `#` (dat zijn alleen
toelichtingen, geen onderdeel van de gegevens).

---

```markdown
---
ringnummer: "NL24-1234567"       # zoals op de pootring
naam: "Naam van de duif"          # mag leeg/weg als de duif geen naam heeft
geslacht: doffer                  # doffer of duivin
kleur: "blauw"                    # optioneel
geboortejaar: 2024                # optioneel
vader: ""                         # optioneel — ringnummer/bestandsnaam van de vader, als die ook een profiel heeft
moeder: ""                        # optioneel — idem voor de moeder
bloedlijn: ""                     # optioneel — naam van de bloedlijn, als bekend
teKoop: false                     # true als deze duif te koop is (koppelt later aan de veiling)
---

Hier het verhaal van de duif: afkomst, wat deze duif bijzonder maakt, en de
belangrijkste prestaties. Twee tot vier zinnen is genoeg — het hoeft geen lang
artikel te zijn.
```

---

**Let op:** als `vader` of `moeder` verwijst naar een ringnummer, zorg dan dat die
duif ook als eigen bestand bestaat (dezelfde bestandsnaam als het ringnummer) —
dan wordt de link tussen ouder en kind automatisch op de website gelegd.
