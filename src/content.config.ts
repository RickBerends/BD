import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

// Contentmodel volgt de Familie -> Stam -> Duif -> Nakomelingen -> Prestaties
// keten, als lokale markdown-collecties (git-based, bewerkt via Decap CMS).

// gerelateerdeDuiven/gerelateerdeBloedlijn verwijzen naar entry-id's (bestandsnaam
// zonder extensie) in de duiven/bloedlijnen-collecties. Optioneel en leeg tot die
// collecties content hebben — zie RelatedEntries.astro, dat vanzelf niets toont
// zolang de verwezen id's nog niet bestaan.
const verhalen = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/verhalen' }),
  schema: z.object({
    title: z.string(),
    author: z.string(),
    date: z.coerce.date(),
    category: z.enum(['geschiedenis', 'training', 'wedvlucht-verslag', 'jaaroverzicht']),
    excerpt: z.string(),
    gerelateerdeDuiven: z.array(z.string()).optional(),
    gerelateerdeBloedlijn: z.string().optional(),
  }),
});

const kennis = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/kennis' }),
  schema: z.object({
    title: z.string(),
    order: z.number(),
    excerpt: z.string(),
    gerelateerdeDuiven: z.array(z.string()).optional(),
    gerelateerdeBloedlijn: z.string().optional(),
    // Entry-id's (bestandsnaam zonder .md) uit de media-collectie — echte
    // foto's uit de praktijk die dit artikel illustreren. Eerste item dient
    // ook als thumbnail op de kennisbank-indexpagina.
    gerelateerdeMedia: z.array(z.string()).optional(),
  }),
});

const prestaties = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/prestaties' }),
  schema: z.object({
    jaar: z.number().optional(),
    periode: z.string().optional(),
    titel: z.string(),
    niveau: z.string(),
    volgorde: z.number(),
    // Optioneel: entry-id van de duif die deze prestatie vloog (bestandsnaam in
    // src/content/duiven/). Koppelt de erelijst aan het duivenprofiel.
    duif: z.string().optional(),
  }),
});

const fanciers = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/fanciers' }),
  schema: z.object({
    naam: z.string(),
    slagnaam: z.string().optional(),
    periode: z.string(),
    rol: z.enum(['grondlegger', 'huidige generatie']),
  }),
});

const duiven = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/duiven' }),
  schema: ({ image }) =>
    z.object({
      ringnummer: z.string(),
      naam: z.string(),
      geslacht: z.enum(['doffer', 'duivin']),
      // Voor de galerij-filters: kweekduif, vliegduif of jonge duif.
      categorie: z.enum(['kweek', 'vlieg', 'jong']).optional(),
      kleur: z.string().optional(),
      geboortejaar: z.number().optional(),
      // Foto naast het md-bestand; wordt door Astro geoptimaliseerd. Optioneel
      // zodat een profiel ook zonder foto (nog) kan bestaan.
      foto: image().optional(),
      // vader/moeder verwijzen naar entry-id's (bestandsnaam) van andere duiven.
      vader: z.string().optional(),
      moeder: z.string().optional(),
      // bloedlijn verwijst naar een entry-id of naam in de bloedlijnen-collectie.
      bloedlijn: z.string().optional(),
      teKoop: z.boolean().default(false),
    }),
});

const bloedlijnen = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/bloedlijnen' }),
  schema: z.object({
    naam: z.string(),
    oorsprong: z.string(),
  }),
});

const media = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/media' }),
  schema: ({ image }) =>
    z.object({
      caption: z.string(),
      datum: z.coerce.date(),
      gerelateerdeDuif: z.string().optional(),
      gerelateerdeBloedlijn: z.string().optional(),
      gerelateerdePrestatie: z.string().optional(),
      foto: image(),
    }),
});

export const collections = { verhalen, kennis, prestaties, fanciers, duiven, bloedlijnen, media };
