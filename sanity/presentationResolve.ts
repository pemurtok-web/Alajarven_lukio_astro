import { defineDocuments, defineLocations, type PresentationPluginOptions } from 'sanity/presentation';

// Pages that live at their own top-level route rather than under /opiskelijalle.
const OWN_ROUTE_SLUGS = new Set(['hakijalle', 'kansainvalisyys', 'yhteystiedot', 'tietosuoja', 'ajankohtaista']);
const INTERNATIONAL_SLUGS = new Set(['jiyu-gakuen', 'mukawa', 'muu']);

// Mirrors how the Astro routes pick a page (see Header.astro and src/pages/**), so the
// "Used on these pages" links in the Studio open the right URL in the preview.
function pageHref(slug?: string, menuPlacement?: string): string | null {
  if (!slug) return null;
  if (OWN_ROUTE_SLUGS.has(slug)) return `/${slug}`;
  if (menuPlacement === 'top') return `/${slug}`;
  if (menuPlacement === 'kansainvalisyys' || INTERNATIONAL_SLUGS.has(slug)) return `/kansainvalisyys/${slug}`;
  return `/opiskelijalle/${slug}`;
}

const everyPage = { title: 'Kaikilla sivuilla (ylä- ja alapalkki)', href: '/' };

export const resolve: PresentationPluginOptions['resolve'] = {
  // Which document opens next to the preview when the editor navigates to a URL.
  mainDocuments: defineDocuments([
    { route: '/', filter: `_id == "homepage"` },
    { route: '/ajankohtaista/:slug', filter: `_type == "post" && slug.current == $slug` },
    { route: '/opiskelijalle/lomakkeet', filter: `_id == "formsPage"` },
    { route: '/opiskelijalle/ruokalista', filter: `_id == "lunchMenu"` },
    { route: '/opiskelijalle/:slug', filter: `_type == "page" && slug.current == $slug` },
    { route: '/kansainvalisyys/:slug', filter: `_type == "page" && slug.current == $slug` },
    { route: '/:slug', filter: `_type == "page" && slug.current == $slug` },
  ]),
  // Where each document is shown on the site.
  locations: {
    homepage: defineLocations({
      message: 'Etusivu',
      locations: [{ title: 'Etusivu', href: '/' }],
    }),
    post: defineLocations({
      select: { title: 'title', slug: 'slug.current' },
      resolve: (doc) => ({
        locations: [
          doc?.slug && { title: doc.title || 'Uutinen', href: `/ajankohtaista/${doc.slug}` },
          { title: 'Ajankohtaista', href: '/ajankohtaista' },
          { title: 'Etusivu', href: '/' },
        ].filter(Boolean) as { title: string; href: string }[],
      }),
    }),
    event: defineLocations({
      locations: [{ title: 'Etusivu (tapahtumakalenteri)', href: '/' }],
    }),
    quicklink: defineLocations({
      locations: [everyPage],
    }),
    siteSettings: defineLocations({
      locations: [everyPage],
    }),
    contactInfo: defineLocations({
      locations: [{ title: 'Yhteystiedot', href: '/yhteystiedot' }],
    }),
    lunchMenu: defineLocations({
      locations: [{ title: 'Ruokalista', href: '/opiskelijalle/ruokalista' }],
    }),
    formsPage: defineLocations({
      locations: [{ title: 'Lomakkeet', href: '/opiskelijalle/lomakkeet' }],
    }),
    page: defineLocations({
      select: { title: 'title', slug: 'slug.current', menuPlacement: 'menuPlacement' },
      resolve: (doc) => {
        const href = pageHref(doc?.slug, doc?.menuPlacement);
        return href ? { locations: [{ title: doc?.title || 'Sivu', href }] } : null;
      },
    }),
  },
};
