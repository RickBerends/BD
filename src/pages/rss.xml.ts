import rss from '@astrojs/rss';
import { getCollection } from 'astro:content';
import type { APIContext } from 'astro';

export async function GET(context: APIContext) {
  const verhalen = (await getCollection('verhalen')).sort(
    (a, b) => b.data.date.valueOf() - a.data.date.valueOf()
  );

  return rss({
    title: 'Berends Duiven — Verhalen',
    description:
      'Wedvluchtverslagen en beschouwingen over de duivensport, geschreven door Henk Berends.',
    site: new URL(import.meta.env.BASE_URL, context.site!),
    items: verhalen.map((verhaal) => ({
      title: verhaal.data.title,
      description: verhaal.data.excerpt,
      pubDate: verhaal.data.date,
      author: verhaal.data.author,
      link: `${import.meta.env.BASE_URL}verhalen/${verhaal.id}/`,
    })),
    customData: '<language>nl</language>',
  });
}
