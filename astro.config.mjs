import { defineConfig, envField } from 'astro/config';
import tailwind from '@astrojs/tailwind';
import react from '@astrojs/react';
import sanity from '@sanity/astro';
import netlify from '@astrojs/netlify';

// @sanity/astro aliases `sanity` and `styled-components` to their package folders by
// stripping "/package.json" from require.resolve() — which returns backslashes on Windows,
// so the alias ends up pointing at package.json itself and breaks Vite's dev dependency
// optimizer (embedded /studio and the visual editing overlay). Netlify builds on Linux
// aren't affected; this only repairs local `astro dev` on Windows.
const fixSanityWindowsAliases = {
  name: 'fix-sanity-windows-aliases',
  configResolved(config) {
    for (const entry of config.resolve.alias) {
      if (typeof entry.replacement === 'string' && /[\\/]package\.json$/.test(entry.replacement)) {
        entry.replacement = entry.replacement.replace(/[\\/]package\.json$/, '');
      }
    }
  },
};

// https://astro.build/config
export default defineConfig({
  vite: {
    plugins: [fixSanityWindowsAliases],
    // The visual editing overlay only renders in Studio preview mode, so Vite never sees
    // it during its startup scan and would serve it unbundled (its CommonJS deps such as
    // lodash then fail to load in the browser). Pre-bundle it explicitly — together with
    // React's JSX runtimes, which would otherwise be discovered late and re-optimized
    // mid-load, leaving the page with two React copies ("_jsxDEV is not a function").
    optimizeDeps: {
      include: [
        '@sanity/visual-editing/react',
        'react',
        'react-dom',
        'react-dom/client',
        'react/jsx-runtime',
        'react/jsx-dev-runtime',
      ],
    },
  },
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
  env: {
    schema: {
      // Viewer token for Sanity's visual editing (draft preview). A runtime secret: read
      // from the environment on each server start, never baked into the build output.
      SANITY_API_READ_TOKEN: envField.string({ context: 'server', access: 'secret', optional: true }),
    },
  },
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



