import { createClient } from '@sanity/client';

const sanityClient = createClient({
  projectId: '8idyoy2x',
  dataset: 'production',
  useCdn: false,
  apiVersion: '2024-01-01',
});

async function main() {
  const refs = await sanityClient.fetch(`*[_type == "siteSettings"]`);
  console.log('siteSettings doc:', JSON.stringify(refs, null, 2));
}

main().catch(console.error);
