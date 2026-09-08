import type { APIRoute } from 'astro';
import { getAllNews } from '../lib/sanity';

// Static/known routes — mirrors the slug lists already hardcoded in each dynamic route's
// getStaticPaths (opiskelijalle/[slug].astro, kansainvalisyys/[slug].astro). Kept in sync
// manually since Sanity pages aren't namespaced by URL prefix, so we can't safely infer a
// new page's section from its slug alone.
const STATIC_ROUTES = [
  '/',
  '/hakijalle',
  '/ajankohtaista',
  '/yhteystiedot',
  '/tietosuoja',
  '/kansainvalisyys',
  '/kansainvalisyys/jiyu-gakuen',
  '/kansainvalisyys/mukawa',
  '/kansainvalisyys/muu',
  '/opiskelijalle/opinto-opas',
  '/opiskelijalle/opintotarjotin',
  '/opiskelijalle/tyoaika',
  '/opiskelijalle/opinto-ohjaus',
  '/opiskelijalle/opiskeluhuolto',
  '/opiskelijalle/yo-kirjoitukset',
  '/opiskelijalle/lomakkeet',
  '/opiskelijalle/kodin-ja-koulun-yhteistyo',
  '/opiskelijalle/opetussuunnitelma',
  '/opiskelijalle/ruokalista',
];

export const GET: APIRoute = async ({ site }) => {
  const baseUrl = (site?.toString() || 'https://alajarven-lukio-dev.netlify.app').replace(/\/$/, '');

  const posts = await getAllNews();
  const postRoutes = posts.map((p) => `/ajankohtaista/${p.slug.current}`);

  const urls = [...STATIC_ROUTES, ...postRoutes];

  const body = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls.map((path) => `  <url><loc>${baseUrl}${path}</loc></url>`).join('\n')}
</urlset>`;

  return new Response(body, {
    headers: { 'Content-Type': 'application/xml' },
  });
};
