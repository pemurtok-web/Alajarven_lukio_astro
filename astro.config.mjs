import { defineConfig } from 'astro/config';
import tailwind from '@astrojs/tailwind';
import react from '@astrojs/react';
import sanity from '@sanity/astro';
import netlify from '@astrojs/netlify';

// https://astro.build/config
export default defineConfig({
  site: 'https://alajarven-lukio-dev.netlify.app',
  output: 'server',
  // Poistetut sähköiset lomakkeet (koulun linjaus 2026-09-23: vain YO-ilmoittautuminen sähköisenä)
  redirects: {
    '/opiskelijalle/loma-anomus': { status: 301, destination: '/opiskelijalle/lomakkeet' },
    '/opiskelijalle/loma-anomus/kiitos': { status: 301, destination: '/opiskelijalle/lomakkeet' },
    '/opiskelijalle/valokuvauslupa': { status: 301, destination: '/opiskelijalle/lomakkeet' },
    '/opiskelijalle/valokuvauslupa/kiitos': { status: 301, destination: '/opiskelijalle/lomakkeet' },
    '/opiskelijalle/ilmoittautuminen-uusintaan': { status: 301, destination: '/opiskelijalle/lomakkeet' },
    '/opiskelijalle/ilmoittautuminen-uusintaan/kiitos': { status: 301, destination: '/opiskelijalle/lomakkeet' },
  },
  adapter: netlify(),
  build: {
    inlineStylesheets: 'always',
  },
  integrations: [
    tailwind(),
    react(),
    sanity({
      projectId: '8idyoy2x',
      dataset: 'production',
      useCdn: false,
      apiVersion: '2024-01-01',
      studioBasePath: '/studio',
    }),
  ],
});



