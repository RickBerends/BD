# Sjabloon: nieuwe bloedlijn toevoegen

Kopieer het stuk hieronder naar een nieuw bestand in `src/content/bloedlijnen/`.
Gebruik als bestandsnaam een korte versie van de naam, bijvoorbeeld
`src/content/bloedlijnen/stam-giesbeek.md`.

---

```markdown
---
naam: "Naam van de bloedlijn/stam"
oorsprong: "Korte herkomst — waar komt deze lijn vandaan, wie heeft de basis gelegd"
---

Waarom is deze combinatie gemaakt, en welke eigenschappen worden doorgegeven? Dit
mag een korte alinea zijn — het belangrijkste is het "waarom", niet alleen de namen.
```

---

Als duiven bij deze bloedlijn horen, verwijs dan in het profiel van die duif
(`src/content/duiven/...`) naar deze bloedlijn via het veld `bloedlijn: "Naam van de
bloedlijn/stam"`.
