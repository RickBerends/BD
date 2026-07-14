import { getCollection, getEntry, type CollectionEntry } from 'astro:content';

export type Duif = CollectionEntry<'duiven'>;

/** Nakomelingen: alle duiven die deze duif als vader of moeder hebben. */
export async function nakomelingen(id: string): Promise<Duif[]> {
  const all = await getCollection('duiven');
  return all
    .filter((d) => d.data.vader === id || d.data.moeder === id)
    .sort((a, b) => (b.data.geboortejaar ?? 0) - (a.data.geboortejaar ?? 0));
}

/** Prestaties die aan deze duif gekoppeld zijn, gesorteerd op volgorde. */
export async function prestatiesVanDuif(id: string) {
  const all = await getCollection('prestaties');
  return all
    .filter((p) => p.data.duif === id)
    .sort((a, b) => a.data.volgorde - b.data.volgorde);
}

/** Duiven die tot een bloedlijn behoren (match op entry-id of op naam). */
export async function duivenInBloedlijn(bloedlijn: {
  id: string;
  data: { naam: string };
}): Promise<Duif[]> {
  const all = await getCollection('duiven');
  return all
    .filter(
      (d) => d.data.bloedlijn === bloedlijn.id || d.data.bloedlijn === bloedlijn.data.naam
    )
    .sort((a, b) => a.data.naam.localeCompare(b.data.naam, 'nl'));
}

export interface PedigreeNode {
  duif?: Duif;
  naam: string;
  id?: string;
  vader?: PedigreeNode;
  moeder?: PedigreeNode;
}

async function buildNode(
  ref: string | undefined,
  depth: number
): Promise<PedigreeNode | undefined> {
  if (!ref) return undefined;
  const duif = await getEntry('duiven', ref).catch(() => undefined);
  // Ontbrekende ouder toch tonen op naam (ref), zodat de stamboom niet afbreekt.
  const node: PedigreeNode = {
    duif,
    id: duif?.id,
    naam: duif?.data.naam ?? ref,
  };
  if (depth > 0 && duif) {
    node.vader = await buildNode(duif.data.vader, depth - 1);
    node.moeder = await buildNode(duif.data.moeder, depth - 1);
  }
  return node;
}

/** Bouwt een stamboom van `generaties` generaties boven de gegeven duif. */
export async function pedigree(duif: Duif, generaties = 2): Promise<PedigreeNode> {
  return {
    duif,
    id: duif.id,
    naam: duif.data.naam,
    vader: await buildNode(duif.data.vader, generaties - 1),
    moeder: await buildNode(duif.data.moeder, generaties - 1),
  };
}
