import { defineConfig } from 'astro/config';
import tailwind from '@astrojs/tailwind';
import react from '@astrojs/react';
import sanity from '@sanity/astro';
import netlify from '@astrojs/netlify';

// https://astro.build/config
export default defineConfig({
  site: 'https://alajarven-lukio-dev.netlify.app',
  output: 'server',
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



