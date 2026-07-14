import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';

const BASE = '/BD';

const legacyRedirects = {
  '/2.Historie.html': '/familie/',
  '/3.Duiven.html': '/duiven/',
  '/3.2.Doffers.html': '/duiven/',
  '/3.4.Vliegduiven.html': '/duiven/',
  '/4.Systeem.html': '/kennis/',
  '/4.1.Systeem.html': '/kennis/',
  '/4.2.Koppelen.html': '/kennis/koppelen/',
  '/4.3.Africhten.html': '/kennis/africhten/',
  '/4.4.Voeding.html': '/kennis/voeding/',
  '/4.5.Motivatie.html': '/kennis/motivatie/',
  '/4.6.Automatisering.html': '/kennis/',
  '/5.Resultaten.html': '/familie/',
  '/5.2010.html': '/familie/',
  '/5.2011.html': '/familie/',
  '/5.2012.html': '/familie/',
  '/5.2013.html': '/familie/',
  '/5.2014.html': '/familie/',
  '/5.2015.html': '/familie/',
  '/6.Artikelen.html': '/verhalen/',
  '/6.1.Start.html': '/verhalen/de-start/',
  '/6.2.Training.html': '/verhalen/training-voor-postduiven/',
  '/7.Media.html': '/media/',
  '/8.Contact.html': '/contact/',
  '/9.Verkoop.html': '/veiling/',
  '/10.VoorbeeldDuif.html': '/duiven/',
};

// De `redirects`-optie zet de destination letterlijk in de meta-refresh /
// canonical link, zonder automatisch `base` toe te voegen (in tegenstelling
// tot gewone interne links) — daarom hier handmatig met BASE geprefixt.
const redirects = Object.fromEntries(
  Object.entries(legacyRedirects).map(([from, to]) => [from, `${BASE}${to}`])
);

export default defineConfig({
  site: 'https://rickberends.github.io',
  base: BASE,
  trailingSlash: 'always',
  redirects,
  integrations: [
    sitemap({
      // Redirect-stubs van oude .html-URL's horen niet in de sitemap.
      filter: (page) => !page.includes('.html'),
    }),
  ],
});
