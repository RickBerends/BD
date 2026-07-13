import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

// Contentmodel volgt de Familie -> Stam -> Duif -> Nakomelingen -> Prestaties
// keten uit context/briefing.md, als lokale collecties (zie context/plan.md §3
// voor het toekomstige Sanity-schema waar dit 1-op-1 naar migreert).

const verhalen = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/verhalen' }),
  schema: z.object({
    title: z.string(),
    author: z.string(),
    date: z.coerce.date(),
    category: z.enum(['geschiedenis', 'training', 'wedvlucht-verslag']),
    excerpt: z.string(),
  }),
});

const kennis = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/kennis' }),
  schema: z.object({
    title: z.string(),
    order: z.number(),
    excerpt: z.string(),
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
  schema: z.object({
    ringnummer: z.string(),
    naam: z.string(),
    geslacht: z.enum(['doffer', 'duivin']),
    kleur: z.string().optional(),
    geboortejaar: z.number().optional(),
    vader: z.string().optional(),
    moeder: z.string().optional(),
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

export const collections = { verhalen, kennis, prestaties, fanciers, duiven, bloedlijnen };
