import { createClient } from '@sanity/client';

const sanityClient = createClient({
  projectId: '8idyoy2x',
  dataset: 'production',
  useCdn: false,
  apiVersion: '2024-01-01',
});

async function main() {
  const siteSettings = await sanityClient.fetch(`*[_type == "siteSettings"][0]{
    ...,
    logoImage {
      ...,
      asset->
    }
  }`);
  console.log('SiteSettings:', JSON.stringify(siteSettings, null, 2));
}

main().catch(console.error);
